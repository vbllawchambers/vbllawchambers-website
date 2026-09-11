/**
 * Client-side access to the chambers will-submission registry.
 *
 * This replaces the former `sampleSubmissions.js`, which had two defects that
 * must not come back:
 *
 *  1. It held an array of complete client records - names, phone numbers,
 *     email addresses, home addresses and privileged drafting instructions -
 *     which Vite compiled into the public JavaScript bundle. Anyone loading the
 *     site received every one of those records.
 *
 *  2. Its lookup FABRICATED a result. Any string shaped like `VBL-######`
 *     returned a confident "Verified Testator Record / Under Scrutiny" with an
 *     invented document attached. A testator mistyping one digit was told their
 *     will was being scrutinised when no such file existed.
 *
 * The registry now lives only behind the chambers API. An unknown reference
 * reports honestly that no record was found.
 */

const LOCAL_KEY = 'vbl_will_submissions';

// Fields a testator may see about their own application. Deliberately narrow:
// the local echo below is written to localStorage, so it must not carry the
// full privileged instruction set around on the device.
const TRACKABLE_FIELDS = [
  'refId',
  'date',
  'fullName',
  'city',
  'serviceLabel',
  'status',
  'assetTypes',
  'folderName',
  'driveFolderName',
  // Released by the API only once the client has a Drive folder of their own;
  // the shared vault root is never surfaced to a testator.
  'driveFolderProvisioned',
  'driveFolderUrl',
  'documentCount',
  'documents'
];

function pickTrackable(record) {
  if (!record || typeof record !== 'object') return null;
  const out = {};
  TRACKABLE_FIELDS.forEach((key) => {
    if (record[key] !== undefined) out[key] = record[key];
  });
  return out;
}

/**
 * Submissions made from THIS browser.
 *
 * Purely a convenience echo so a testator who has just submitted still sees
 * their reference if the chambers API is momentarily unreachable. It is never
 * a substitute for the registry and is never treated as authoritative status.
 */
export function getStoredSubmissions() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('Error reading locally stored submissions:', e);
    return [];
  }
}

export function saveSubmission(submission) {
  try {
    const safe = pickTrackable(submission);
    if (!safe || !safe.refId) return getStoredSubmissions();
    const current = getStoredSubmissions().filter((s) => s.refId !== safe.refId);
    const updated = [safe, ...current];
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Error saving submission locally:', e);
    return [];
  }
}

/**
 * Looks a reference up in the chambers registry.
 *
 * Resolves to the submission, or to null when no such record exists. Callers
 * must distinguish "not found" (null) from "could not reach chambers"
 * (rejected promise) so the testator is never shown an invented status.
 */
export async function getSubmissionByRef(queryRef) {
  if (!queryRef) return null;
  const clean = String(queryRef).trim().toUpperCase();

  let response;
  try {
    response = await fetch(`/api/will-submissions/${encodeURIComponent(clean)}`, {
      headers: { Accept: 'application/json' }
    });
  } catch (networkError) {
    // Offline: fall back to this browser's own echo, if it holds the reference.
    const echo = getStoredSubmissions().find(
      (s) => s.refId && s.refId.toUpperCase() === clean
    );
    if (echo) return echo;
    throw new Error('OFFLINE');
  }

  if (response.status === 404) return null;

  if (!response.ok) {
    const echo = getStoredSubmissions().find(
      (s) => s.refId && s.refId.toUpperCase() === clean
    );
    if (echo) return echo;
    throw new Error('OFFLINE');
  }

  const data = await response.json().catch(() => null);
  if (data && data.success && data.submission) return data.submission;
  return null;
}
