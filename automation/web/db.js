/**
 * VBL Law Chambers - Hybrid Persistence Layer
 *
 * Supabase PostgreSQL holds relational METADATA only (testator particulars,
 * reference ids, scrutiny stages, document descriptors + Google Drive ids).
 * Every heavy binary lives in the Google Drive vault. See
 * automation/supabase/schema.sql for the full storage contract.
 *
 * Local JSON under ./data is a write-through cache, not a second database:
 * it keeps the chambers suite usable when the network or Supabase is down,
 * and it is reconciled back into Supabase as soon as the link returns.
 *
 * Failure policy: Supabase errors are reported, never swallowed. supabase-js
 * RESOLVES with an { error } object instead of throwing, so a bare try/catch
 * around these calls silently loses schema mismatches, RLS denials and failed
 * writes - which is exactly how a submission can appear saved while never
 * reaching the database.
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');

const IST_DATE_FORMAT = {
  timeZone: 'Asia/Kolkata',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
};

// Render/containers run in UTC. Without an explicit timeZone the chambers
// suite would show every submission in UTC while the practice works in IST.
function formatIst(value) {
  const d = value ? new Date(value) : new Date();
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString('en-IN', IST_DATE_FORMAT);
}

// ==============================================================================
// Client bootstrap
// ==============================================================================
let SUPABASE_URL = process.env.SUPABASE_URL || '';
let SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || '';

// Local developer convenience: automation/secrets/ is git-ignored, so reading
// the key from there never risks committing it.
if (!SUPABASE_KEY) {
  const secretPath = path.join(__dirname, '../secrets/supabase.txt');
  if (fs.existsSync(secretPath)) {
    try {
      const content = fs.readFileSync(secretPath, 'utf8');
      const secretMatch = content.match(/Secret keys?\s*:\s*([^\r\n\s]+)/i);
      const projectMatch = content.match(/project id\s*:\s*([^\r\n\s]+)/i);
      if (secretMatch) SUPABASE_KEY = secretMatch[1].trim();
      if (projectMatch && !SUPABASE_URL) {
        SUPABASE_URL = `https://${projectMatch[1].trim()}.supabase.co`;
      }
    } catch (err) {
      console.warn('[Database] Could not read local Supabase secret:', err.message);
    }
  }
}

let supabase = null;
if (SUPABASE_URL && SUPABASE_KEY) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });
    console.log('[Database] Supabase client initialised.');
  } catch (err) {
    console.warn('[Database] Failed to initialise Supabase client:', err.message);
  }
} else {
  console.warn('[Database] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set - running on local cache only.');
}

// Live backend state, surfaced through /api/health so a silent demotion to the
// local cache is visible instead of looking like normal operation.
const state = {
  configured: Boolean(supabase),
  reachable: false,
  schemaReady: false,
  lastError: null,
  lastErrorAt: null,
  reconciled: false
};

// PGRST205 = table missing from the schema cache, i.e. schema.sql was never
// applied. That is a provisioning problem, not a transient outage, so it is
// called out distinctly rather than logged as a generic failure.
function noteFailure(operation, error) {
  const message = error?.message || String(error);
  state.lastError = `${operation}: ${message}`;
  state.lastErrorAt = new Date().toISOString();

  if (error?.code === 'PGRST205' || /schema cache/i.test(message)) {
    state.reachable = true;
    state.schemaReady = false;
    if (!noteFailure._warnedSchema) {
      noteFailure._warnedSchema = true;
      console.error(
        '[Database] Supabase reachable but the tables do not exist. ' +
        'Apply automation/supabase/schema.sql (Supabase dashboard -> SQL Editor). ' +
        'Serving the local cache until then.'
      );
    }
    return;
  }

  state.reachable = false;
  console.error(`[Database] Supabase ${operation} failed - falling back to local cache:`, message);
}

function noteSuccess() {
  state.reachable = true;
  state.schemaReady = true;
  state.lastError = null;
}

export function getBackendStatus() {
  return {
    backend: state.schemaReady && state.reachable ? 'supabase' : 'local-cache',
    supabaseConfigured: state.configured,
    supabaseReachable: state.reachable,
    schemaReady: state.schemaReady,
    lastError: state.lastError,
    lastErrorAt: state.lastErrorAt
  };
}

// ==============================================================================
// Local write-through cache
// ==============================================================================
function readJsonArray(file, label) {
  try {
    if (fs.existsSync(file)) {
      const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn(`[Database] Error reading local ${label}:`, err.message);
  }
  return [];
}

function writeJsonArray(file, list, label) {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(list, null, 2), 'utf8');
  } catch (err) {
    console.warn(`[Database] Error writing local ${label}:`, err.message);
  }
}

export const loadLocalSubmissions = () => readJsonArray(SUBMISSIONS_FILE, 'submissions');
export const saveLocalSubmissions = (list) => writeJsonArray(SUBMISSIONS_FILE, list, 'submissions');
export const loadLocalPosts = () => readJsonArray(POSTS_FILE, 'posts');
export const saveLocalPosts = (list) => writeJsonArray(POSTS_FILE, list, 'posts');

// ==============================================================================
// Row <-> application shape
// ==============================================================================
function parseSizeToBytes(size) {
  if (typeof size === 'number' && Number.isFinite(size)) return Math.max(0, Math.round(size));
  if (typeof size !== 'string') return 0;
  const match = size.trim().match(/^([\d.]+)\s*(B|KB|MB|GB)?$/i);
  if (!match) return 0;
  const scale = { b: 1, kb: 1024, mb: 1024 ** 2, gb: 1024 ** 3 };
  return Math.round(parseFloat(match[1]) * (scale[(match[2] || 'b').toLowerCase()] || 1));
}

function rowToSubmission(row) {
  return {
    refId: row.ref_id,
    date: formatIst(row.created_at),
    createdAt: row.created_at,
    fullName: row.full_name,
    parentSpouseName: row.parent_spouse_name,
    age: row.age,
    phone: row.phone,
    email: row.email,
    city: row.city,
    address: row.address,
    serviceType: row.service_type,
    serviceLabel: row.service_label,
    assetTypes: row.asset_types || [],
    executorName: row.executor_name,
    specialInstructions: row.special_instructions,
    folderName: row.folder_name,
    driveFolderName: row.folder_name,
    driveFolderId: row.drive_folder_id || '',
    driveFolderUrl: row.drive_folder_url || '',
    driveProvisionState: row.drive_provision_state || 'pending',
    status: row.status,
    documents: (row.documents || []).map(doc => ({
      name: doc.file_name,
      size: doc.file_size,
      sizeBytes: doc.file_size_bytes || 0,
      mimeType: doc.mime_type || '',
      url: doc.url,
      driveFileId: doc.drive_file_id || '',
      driveUrl: doc.drive_url || row.drive_folder_url || '',
      driveFolderUrl: row.drive_folder_url || ''
    }))
  };
}

function submissionToRow(record) {
  return {
    ref_id: record.refId,
    full_name: record.fullName,
    parent_spouse_name: record.parentSpouseName || '',
    age: record.age || 'N/A',
    phone: record.phone,
    email: record.email || '',
    city: record.city || 'Kavali',
    address: record.address || '',
    service_type: record.serviceType,
    service_label: record.serviceLabel,
    asset_types: record.assetTypes || [],
    executor_name: record.executorName || '',
    special_instructions: record.specialInstructions || '',
    folder_name: record.folderName,
    drive_folder_id: record.driveFolderId || '',
    drive_folder_url: record.driveFolderUrl || '',
    drive_provision_state: record.driveProvisionState || 'pending',
    status: record.status || 'New Submission'
  };
}

function documentRows(record) {
  const docs = Array.isArray(record.documents) ? record.documents : [];
  // The unique key is (submission_ref_id, file_name); duplicates within a single
  // submission would make the upsert fail as "affects row a second time".
  const seen = new Set();
  return docs
    .filter(d => d && d.name && !seen.has(d.name) && seen.add(d.name) !== false)
    .map(d => ({
      submission_ref_id: record.refId,
      file_name: d.name,
      file_size: typeof d.size === 'string' ? d.size : String(d.size ?? ''),
      file_size_bytes: d.sizeBytes ?? parseSizeToBytes(d.size),
      mime_type: d.mimeType || 'application/octet-stream',
      url: d.url || '',
      drive_file_id: d.driveFileId || '',
      drive_url: d.driveUrl || record.driveFolderUrl || '',
      folder_name: record.folderName || ''
    }));
}

// ==============================================================================
// One-time reconciliation
// ==============================================================================
/**
 * Pushes locally cached submissions into Supabase the first time the database
 * is reachable with the schema in place.
 *
 * Without this, switching the source of truth to Supabase would make existing
 * records disappear from the chambers suite the moment the tables are created,
 * because the database starts empty.
 */
async function reconcileLocalIntoSupabase() {
  if (!supabase || state.reconciled || !state.schemaReady) return;
  state.reconciled = true;

  const local = loadLocalSubmissions();
  if (local.length === 0) return;

  const { data: existing, error } = await supabase
    .from('will_submissions')
    .select('ref_id');
  if (error) {
    state.reconciled = false;
    noteFailure('reconcile/select', error);
    return;
  }

  const known = new Set((existing || []).map(r => r.ref_id));
  const missing = local.filter(r => r.refId && !known.has(r.refId));
  if (missing.length === 0) return;

  console.log(`[Database] Reconciling ${missing.length} cached submission(s) into Supabase.`);
  for (const record of missing) {
    await writeSubmissionToSupabase(record, 'reconcile');
  }
}

async function writeSubmissionToSupabase(record, operation) {
  const { error: subErr } = await supabase
    .from('will_submissions')
    .upsert(submissionToRow(record), { onConflict: 'ref_id' });

  if (subErr) {
    noteFailure(`${operation}/will_submissions`, subErr);
    return false;
  }

  const rows = documentRows(record);
  if (rows.length > 0) {
    const { error: docErr } = await supabase
      .from('submission_documents')
      .upsert(rows, { onConflict: 'submission_ref_id,file_name' });
    if (docErr) {
      noteFailure(`${operation}/submission_documents`, docErr);
      return false;
    }
  }

  noteSuccess();
  return true;
}

// ==============================================================================
// Will submissions
// ==============================================================================
export async function getSubmissions() {
  if (supabase) {
    const { data, error } = await supabase
      .from('will_submissions')
      .select('*, documents:submission_documents(*)')
      .order('created_at', { ascending: false });

    if (error) {
      noteFailure('getSubmissions', error);
    } else {
      noteSuccess();
      await reconcileLocalIntoSupabase();

      // Re-read only when reconciliation actually pushed rows, so the caller
      // never sees a database that looks empty purely because of first-run
      // timing.
      let rows = data;
      if ((data || []).length === 0 && loadLocalSubmissions().length > 0) {
        const retry = await supabase
          .from('will_submissions')
          .select('*, documents:submission_documents(*)')
          .order('created_at', { ascending: false });
        if (!retry.error) rows = retry.data;
      }

      const mapped = (rows || []).map(rowToSubmission);
      saveLocalSubmissions(mapped);
      return mapped;
    }
  }
  return loadLocalSubmissions();
}

export async function getSubmissionByRef(refId) {
  if (!refId) return null;
  const cleanRef = String(refId).trim().toUpperCase();

  if (supabase) {
    const { data, error } = await supabase
      .from('will_submissions')
      .select('*, documents:submission_documents(*)')
      .eq('ref_id', cleanRef)
      .maybeSingle();

    if (error) {
      noteFailure('getSubmissionByRef', error);
    } else {
      noteSuccess();
      if (data) return rowToSubmission(data);
      // A clean "not found" is authoritative only once the cache has been
      // reconciled; before that the record may exist locally and not yet
      // upstream.
    }
  }

  return loadLocalSubmissions().find(
    s => s.refId && s.refId.toUpperCase() === cleanRef
  ) || null;
}

export async function saveSubmission(record) {
  // Cache first: a submission must never be lost because the network blinked.
  const current = loadLocalSubmissions();
  saveLocalSubmissions([record, ...current.filter(s => s.refId !== record.refId)]);

  if (supabase) {
    await writeSubmissionToSupabase(record, 'saveSubmission');
  }
  return record;
}

/**
 * Merges fields into an existing submission in BOTH stores.
 *
 * Used by the n8n callback that returns the real per-client Drive folder.
 * That callback previously wrote through the local-only helpers in server.js,
 * so the Drive ids never reached Supabase and the row kept pointing at the
 * shared vault root.
 */
export async function patchSubmission(refId, patch) {
  const current = loadLocalSubmissions();
  const target = current.find(s => s.refId === refId);
  if (!target) return null;

  Object.assign(target, patch);
  if (patch.driveFolderUrl || patch.driveFileIds) {
    (target.documents || []).forEach(doc => {
      if (patch.driveFolderUrl) {
        doc.driveFolderUrl = patch.driveFolderUrl;
        if (!doc.driveUrl || doc.driveUrl === patch.previousDriveUrl) {
          doc.driveUrl = patch.driveFolderUrl;
        }
      }
      const fileId = patch.driveFileIds?.[doc.name];
      if (fileId) doc.driveFileId = fileId;
    });
  }
  delete target.previousDriveUrl;
  saveLocalSubmissions(current);

  if (supabase) {
    await writeSubmissionToSupabase(target, 'patchSubmission');
  }
  return target;
}

export async function updateSubmissionStatus(refId, newStatus) {
  const current = loadLocalSubmissions();
  const target = current.find(s => s.refId === refId);
  if (target) {
    target.status = newStatus;
    saveLocalSubmissions(current);
  }

  if (supabase) {
    const { error } = await supabase
      .from('will_submissions')
      .update({ status: newStatus })
      .eq('ref_id', refId);
    if (error) noteFailure('updateSubmissionStatus', error);
    else noteSuccess();
  }

  return target;
}

// ==============================================================================
// Content calendar
// ==============================================================================
function rowToPost(row) {
  return {
    'Content ID': row.content_id,
    Title: row.title,
    Caption: row.caption,
    Platforms: row.platforms,
    'Scheduled DateTime': row.scheduled_datetime,
    Status: row.status,
    'Drive File ID': row.drive_file_id,
    'Retry Count': row.retry_count,
    'Posted At': row.posted_at,
    Error: row.error_log
  };
}

export async function getPosts() {
  if (supabase) {
    const { data, error } = await supabase
      .from('content_calendar')
      .select('*')
      .order('scheduled_datetime', { ascending: false });

    if (error) {
      noteFailure('getPosts', error);
    } else if ((data || []).length > 0) {
      noteSuccess();
      const mapped = data.map(rowToPost);
      saveLocalPosts(mapped);
      return mapped;
    } else {
      // Calendar seeds ship with schema.sql; an empty table means the seed
      // block has not run, so the local baseline is still the better answer.
      noteSuccess();
    }
  }
  return loadLocalPosts();
}

export async function savePost(postRecord) {
  const current = loadLocalPosts();
  const id = postRecord['Content ID'];
  saveLocalPosts([postRecord, ...current.filter(p => p['Content ID'] !== id)]);

  if (supabase) {
    const { error } = await supabase
      .from('content_calendar')
      .upsert({
        content_id: id,
        title: postRecord.Title,
        caption: postRecord.Caption || '',
        platforms: postRecord.Platforms,
        scheduled_datetime: postRecord['Scheduled DateTime'] || new Date().toISOString(),
        status: postRecord.Status || 'Draft',
        drive_file_id: postRecord['Drive File ID'] || ''
      }, { onConflict: 'content_id' });
    if (error) noteFailure('savePost', error);
    else noteSuccess();
  }

  return postRecord;
}

/**
 * Reads the resumable publish state for one calendar entry.
 *
 * Returned to the dispatcher so it can resume a publish that was interrupted -
 * on Render the container can sleep between creating a media container and
 * publishing it. See automation/web/publishing/state.js.
 */
export async function getPublishState(contentId) {
  if (supabase) {
    const { data, error } = await supabase
      .from('content_calendar')
      .select('content_id, platforms, platform_statuses, publish_state, retry_count, last_attempt_at, failure_kind')
      .eq('content_id', contentId)
      .maybeSingle();
    if (error) noteFailure('getPublishState', error);
    else if (data) { noteSuccess(); return data; }
  }

  const local = loadLocalPosts().find(p => p['Content ID'] === contentId);
  if (!local) return null;
  return {
    content_id: contentId,
    platforms: local.Platforms || '',
    platform_statuses: local.platformStatuses || {},
    publish_state: local.publishState || 'queued',
    retry_count: local['Retry Count'] || 0,
    last_attempt_at: local.lastAttemptAt || null,
    failure_kind: local.failureKind || null
  };
}

/**
 * Persists per-channel publish state. This is the durable half of the
 * idempotency guarantee: the container id recorded here is what a later pass
 * checks before publishing, so a crash cannot cause a second post.
 */
export async function savePublishState(contentId, platformStates, rollup) {
  const posts = loadLocalPosts();
  const target = posts.find(p => p['Content ID'] === contentId);
  if (target) {
    target.platformStatuses = platformStates;
    target.publishState = rollup.publishState;
    target.Status = rollup.status || target.Status;
    target.failureKind = rollup.failureKind || null;
    target.lastAttemptAt = new Date().toISOString();
    saveLocalPosts(posts);
  }

  if (supabase) {
    const { error } = await supabase
      .from('content_calendar')
      .update({
        platform_statuses: platformStates,
        publish_state: rollup.publishState,
        status: rollup.status,
        failure_kind: rollup.failureKind || null,
        last_attempt_at: new Date().toISOString(),
        ...(rollup.publishState === 'completed' ? { posted_at: new Date().toISOString() } : {})
      })
      .eq('content_id', contentId);
    if (error) noteFailure('savePublishState', error);
    else noteSuccess();
  }

  return platformStates;
}

/**
 * Bulk-syncs the calendar returned by n8n (whose source of truth is the
 * Google Sheet) into both stores in one round trip.
 */
export async function savePosts(list) {
  if (!Array.isArray(list) || list.length === 0) return [];
  saveLocalPosts(list);

  if (supabase) {
    const rows = list
      .filter(p => p && p['Content ID'])
      .map(p => ({
        content_id: p['Content ID'],
        title: p.Title || '',
        caption: p.Caption || '',
        platforms: p.Platforms || '',
        scheduled_datetime: p['Scheduled DateTime'] || new Date().toISOString(),
        status: p.Status || 'Draft',
        drive_file_id: p['Drive File ID'] || ''
      }));
    if (rows.length > 0) {
      const { error } = await supabase
        .from('content_calendar')
        .upsert(rows, { onConflict: 'content_id' });
      if (error) noteFailure('savePosts', error);
      else noteSuccess();
    }
  }
  return list;
}

export { supabase, parseSizeToBytes, formatIst };
