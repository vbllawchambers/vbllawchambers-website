/**
 * Channel registry — the single place that knows which platforms exist, what
 * each needs to be considered configured, and how to build its driver.
 *
 * server.js previously carried its own inline channel list. Keeping two lists
 * in sync by hand is how a channel ends up "connected" in the UI while having
 * no adapter behind it, so both /api/channels and /api/engine/preflight now
 * read from here.
 */

import { facebookAdapter, instagramAdapter, threadsAdapter } from './meta.js';
import { linkedinAdapter } from './linkedin.js';
import { pinterestAdapter } from './pinterest.js';

/**
 * CORE vs OPTIONAL.
 *
 * The engine is armed on the core four only. LinkedIn and Pinterest are
 * optional: a failure there must never block the practice from publishing,
 * because neither is currently a live channel for the chambers.
 */
export const CORE_PLATFORMS = ['facebook', 'instagram', 'threads', 'youtube'];
export const OPTIONAL_PLATFORMS = ['linkedin', 'pinterest'];
export const ALL_PLATFORMS = [...CORE_PLATFORMS, ...OPTIONAL_PLATFORMS];

/** Native = published directly by our own adapters; others go through n8n. */
export const NATIVE_PLATFORMS = ['facebook', 'instagram', 'threads', 'linkedin', 'pinterest'];

const DEFS = {
  facebook: {
    label: 'Facebook Page',
    native: true,
    requires: ['FACEBOOK_PAGE_ID', 'FACEBOOK_PAGE_ACCESS_TOKEN'],
    account: (e) => e.FACEBOOK_PAGE_NAME || null,
    accountId: (e) => e.FACEBOOK_PAGE_ID || null,
    build: (post, e, f) => facebookAdapter({
      pageId: e.FACEBOOK_PAGE_ID, pageAccessToken: e.FACEBOOK_PAGE_ACCESS_TOKEN, post, fetchImpl: f
    })
  },
  instagram: {
    label: 'Instagram',
    native: true,
    requires: ['INSTAGRAM_BUSINESS_ACCOUNT_ID', 'FACEBOOK_PAGE_ACCESS_TOKEN'],
    account: (e) => (e.INSTAGRAM_USERNAME ? `@${e.INSTAGRAM_USERNAME}` : null),
    accountId: (e) => e.INSTAGRAM_BUSINESS_ACCOUNT_ID || null,
    build: (post, e, f) => instagramAdapter({
      igUserId: e.INSTAGRAM_BUSINESS_ACCOUNT_ID, accessToken: e.FACEBOOK_PAGE_ACCESS_TOKEN, post, fetchImpl: f
    })
  },
  threads: {
    label: 'Threads',
    native: true,
    requires: ['THREADS_USER_ID', 'THREADS_ACCESS_TOKEN'],
    account: (e) => (e.INSTAGRAM_USERNAME ? `@${e.INSTAGRAM_USERNAME}` : null),
    accountId: (e) => e.THREADS_USER_ID || null,
    build: (post, e, f) => threadsAdapter({
      userId: e.THREADS_USER_ID, accessToken: e.THREADS_ACCESS_TOKEN, post, fetchImpl: f
    })
  },
  youtube: {
    label: 'YouTube',
    native: false,
    via: 'n8n YouTube Publisher',
    // Publishing runs in the n8n workflow, which holds the Google OAuth
    // credential. There is no server-side token to check here, so readiness is
    // expressed as "the bridge is configured", not "a token is valid".
    requires: [],
    account: (e) => e.YOUTUBE_CHANNEL_TITLE || null,
    accountId: (e) => e.YOUTUBE_CHANNEL_ID || null,
    build: () => null
  },
  linkedin: {
    label: 'LinkedIn',
    native: true,
    requires: ['LINKEDIN_ACCESS_TOKEN', 'LINKEDIN_AUTHOR_URN'],
    account: (e) => e.LINKEDIN_AUTHOR_URN || null,
    accountId: (e) => e.LINKEDIN_AUTHOR_URN || null,
    build: (post, e, f) => linkedinAdapter({
      accessToken: e.LINKEDIN_ACCESS_TOKEN, authorUrn: e.LINKEDIN_AUTHOR_URN, post, fetchImpl: f
    })
  },
  pinterest: {
    label: 'Pinterest',
    native: true,
    requires: ['PINTEREST_ACCESS_TOKEN', 'PINTEREST_BOARD_ID'],
    account: (e) => e.PINTEREST_USERNAME || null,
    accountId: (e) => e.PINTEREST_BOARD_ID || null,
    build: (post, e, f) => pinterestAdapter({
      accessToken: e.PINTEREST_ACCESS_TOKEN, boardId: e.PINTEREST_BOARD_ID, post, fetchImpl: f
    })
  }
};

export function isConfigured(platform, env = process.env) {
  const def = DEFS[platform];
  if (!def) return false;
  if (platform === 'youtube') return env.YOUTUBE_BRIDGE_ENABLED !== 'false';
  return def.requires.every((k) => Boolean(env[k]));
}

/** Which env keys a platform is still missing — never their values. */
export function missingKeys(platform, env = process.env) {
  const def = DEFS[platform];
  if (!def) return [];
  return def.requires.filter((k) => !env[k]);
}

export function channelInventory(env = process.env) {
  return ALL_PLATFORMS.map((id) => {
    const def = DEFS[id];
    const connected = isConfigured(id, env);
    return {
      id,
      label: def.label,
      native: def.native,
      core: CORE_PLATFORMS.includes(id),
      connected,
      account: connected ? def.account(env) : null,
      accountId: connected ? def.accountId(env) : null,
      via: def.via || null,
      requires: def.requires.join(' + ') || null,
      missing: connected ? [] : missingKeys(id, env)
    };
  });
}

/**
 * Builds drivers for the requested platforms.
 * A platform without credentials is omitted rather than stubbed, so a missing
 * channel is visible instead of silently "succeeding".
 */
export function buildAllDrivers(post, platforms = ALL_PLATFORMS, env = process.env, fetchImpl = fetch) {
  const drivers = {};
  for (const id of platforms) {
    const def = DEFS[id];
    if (!def || !isConfigured(id, env)) continue;
    const driver = def.build(post, env, fetchImpl);
    if (driver) drivers[id] = driver;
  }
  return drivers;
}

/**
 * Validates a caller-supplied platform list.
 * The frontend is never trusted: unknown names are rejected outright rather
 * than silently ignored, so a typo surfaces instead of quietly skipping a
 * channel the operator believed they were publishing to.
 */
export function validatePlatforms(requested, env = process.env) {
  if (!Array.isArray(requested) || requested.length === 0) {
    return { valid: false, error: 'platforms must be a non-empty array' };
  }
  const normalised = requested.map((p) => String(p).trim().toLowerCase());
  const unknown = normalised.filter((p) => !ALL_PLATFORMS.includes(p));
  if (unknown.length) {
    return { valid: false, error: `unknown platform(s): ${unknown.join(', ')}` };
  }
  const unique = [...new Set(normalised)];
  return {
    valid: true,
    platforms: unique,
    configured: unique.filter((p) => isConfigured(p, env)),
    unconfigured: unique.filter((p) => !isConfigured(p, env))
  };
}

export { DEFS as PLATFORM_DEFS };
