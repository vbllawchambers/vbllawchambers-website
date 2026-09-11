/**
 * Resumable, idempotent publishing state machine.
 *
 * Why this exists
 * ---------------
 * Meta and Pinterest publish in two steps: create a media *container* from a
 * public URL, then publish that container once the platform has finished
 * fetching and transcoding it. Transcoding a reel takes 30-60 seconds.
 *
 * Render's free tier sleeps after ~15 minutes of inactivity and can recycle a
 * container mid-request. A naive "create -> await -> publish" loop therefore
 * dies between those two steps sooner or later, and the retry creates a SECOND
 * container - posting the practice's video to a client-facing feed twice.
 *
 * The fix, taken from how Postiz structures its providers: never hold the
 * publish open. Persist { state, containerId } after step one, return, and let
 * a later poll advance it. Before publishing, re-check the container: if the
 * platform already reports it PUBLISHED, record that instead of publishing
 * again. That makes a crash at any point harmless.
 *
 * States
 *   queued     -> nothing sent yet
 *   pending    -> container created, platform still processing
 *   ready      -> container finished, safe to publish
 *   completed  -> live, postId recorded
 *   failed     -> terminal; needs a human (see classify.js for which kind)
 */

import { nextAction, AUTH_EXPIRED, FATAL_PAYLOAD } from './classify.js';

export const STATES = ['queued', 'pending', 'ready', 'completed', 'failed'];

export function emptyPlatformState(platform) {
  return {
    platform,
    state: 'queued',
    containerId: null,
    postId: null,
    releaseUrl: null,
    retryCount: 0,
    lastAttemptAt: null,
    failureKind: null,
    lastError: null
  };
}

/**
 * Reads the per-platform map off a content_calendar row, tolerating rows that
 * predate this feature.
 */
export function readPlatformStates(row) {
  const platforms = String(row?.Platforms || row?.platforms || '')
    .split(',')
    .map(p => p.trim().toLowerCase())
    .filter(Boolean);

  const stored = row?.platform_statuses || row?.platformStatuses || {};
  const out = {};
  platforms.forEach(p => {
    out[p] = { ...emptyPlatformState(p), ...(stored[p] || {}) };
  });
  return out;
}

/** A post is done when every platform has reached a terminal state. */
export function isSettled(states) {
  const all = Object.values(states);
  return all.length > 0 && all.every(s => s.state === 'completed' || s.state === 'failed');
}

export function rollupStatus(states) {
  const all = Object.values(states);
  if (all.length === 0) return 'Draft';
  if (all.every(s => s.state === 'completed')) return 'Posted';
  if (all.some(s => s.failureKind === AUTH_EXPIRED)) return 'Needs Reconnect';
  if (all.every(s => s.state === 'completed' || s.state === 'failed')) return 'Partially Posted';
  return 'Publishing';
}

/**
 * Whether this platform should be touched on this pass.
 *
 * Terminal states are never retried - that is the whole point. A pending
 * retry also has to wait out its backoff.
 */
export function isDue(platformState, now = Date.now()) {
  if (!platformState) return false;
  if (platformState.state === 'completed' || platformState.state === 'failed') return false;
  if (!platformState.retryAfter) return true;
  return now >= new Date(platformState.retryAfter).getTime();
}

/**
 * Advances one platform by one step.
 *
 * `driver` is the platform adapter and must provide:
 *   createContainer()                -> { containerId } | { postId, releaseUrl }
 *   checkContainer(containerId)      -> 'IN_PROGRESS' | 'FINISHED' | 'PUBLISHED' | 'ERROR'
 *   publishContainer(containerId)    -> { postId, releaseUrl }
 *
 * Returns the new platform state. Never throws for platform failures - those
 * are classified and recorded.
 */
export async function advance(platformState, driver, now = () => new Date()) {
  const state = { ...platformState, lastAttemptAt: now().toISOString() };

  try {
    switch (state.state) {
      case 'queued': {
        const created = await driver.createContainer();
        // Single-step platforms (LinkedIn, X, a YouTube resumable upload that
        // completed inline) come back already published.
        if (created?.postId) {
          return { ...state, state: 'completed', postId: created.postId, releaseUrl: created.releaseUrl || null };
        }
        return { ...state, state: 'pending', containerId: created.containerId };
      }

      case 'pending': {
        const status = await driver.checkContainer(state.containerId);

        // A previous pass published this and died before recording it. The post
        // is already live - publishing again would duplicate it on the feed.
        if (status === 'PUBLISHED') {
          const info = await driver.describePublished?.(state.containerId);
          return {
            ...state,
            state: 'completed',
            postId: info?.postId || state.containerId,
            releaseUrl: info?.releaseUrl || state.releaseUrl || null
          };
        }
        if (status === 'IN_PROGRESS') return state;
        if (status === 'ERROR' || status === 'EXPIRED') {
          return {
            ...state,
            state: 'failed',
            failureKind: FATAL_PAYLOAD,
            lastError: `container ${status}`
          };
        }
        return { ...state, state: 'ready' };
      }

      case 'ready': {
        // Re-check immediately before publishing. This closes the window where
        // the process died after publishing but before persisting 'completed'.
        const status = await driver.checkContainer(state.containerId);
        if (status === 'PUBLISHED') {
          const info = await driver.describePublished?.(state.containerId);
          return {
            ...state,
            state: 'completed',
            postId: info?.postId || state.containerId,
            releaseUrl: info?.releaseUrl || null
          };
        }

        const published = await driver.publishContainer(state.containerId);
        return {
          ...state,
          state: 'completed',
          postId: published.postId,
          releaseUrl: published.releaseUrl || null
        };
      }

      default:
        return state;
    }
  } catch (err) {
    const failure = {
      status: err.status ?? err.response?.status,
      code: err.code,
      body: err.body ?? err.response?.data,
      platform: state.platform
    };
    const decision = nextAction(failure, state.retryCount);

    if (decision.action === 'retry') {
      return {
        ...state,
        state: state.state === 'queued' ? 'queued' : state.state,
        retryCount: decision.retryCount,
        retryAfter: new Date(Date.now() + decision.retryInMs).toISOString(),
        failureKind: decision.kind,
        lastError: decision.reason
      };
    }

    return {
      ...state,
      state: 'failed',
      retryCount: decision.retryCount,
      failureKind: decision.kind,
      channelStatus: decision.channelStatus,
      lastError: decision.reason
    };
  }
}

/** Advances every due platform for one post. */
export async function advancePost(states, drivers, now = Date.now()) {
  const next = { ...states };
  for (const [platform, platformState] of Object.entries(states)) {
    const driver = drivers[platform];
    if (!driver || !isDue(platformState, now)) continue;
    next[platform] = await advance(platformState, driver);
  }
  return next;
}
