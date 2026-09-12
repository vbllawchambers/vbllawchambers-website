import express from 'express';
import cors from 'cors';
import multer from 'multer';
import FormData from 'form-data';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';
import os from 'os';
import crypto from 'crypto';
import * as db from './db.js';
import * as metaAdapters from './publishing/meta.js';
import * as publishState from './publishing/state.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
// PORT is injected by hosts like Render and must win; WEB_PORT is the local
// docker-compose setting.
const PORT = process.env.PORT || process.env.WEB_PORT || 3300;
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'vbl2026';

// Persistent Will Submissions Storage
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');

// Seed/demo records only. This file is tracked in version control, so it must
// NEVER contain real client details - names, phone numbers, addresses or
// privileged instructions. Live records live in data/submissions.json, which is
// gitignored.
const INITIAL_SUBMISSIONS = [
  {
    refId: 'VBL-475868',
    date: '2026-09-11 10:05 AM',
    fullName: 'Sample Submission (VBL-475868)',
    parentSpouseName: 'Testator / Family Representative',
    age: '55',
    phone: '+91 90000 00000',
    email: 'sample.enquiry@example.com',
    city: 'Kavali',
    address: 'Kavali, SPSR Nellore Dist. - 524201',
    serviceType: 'draft_new',
    serviceLabel: 'Fresh Will Drafting & Title Scrutiny',
    assetTypes: ['Agricultural / Farm Lands', 'Residential / Commercial Real Estate'],
    executorName: 'Designated Executor',
    specialInstructions: 'Instructions and documents submitted for personal review and statutory preparation by Smt. V. Bhagya Lakshmi.',
    documents: [
      { name: 'Title_Documents_Schedule.pdf', size: '2.1 MB', driveUrl: 'https://drive.google.com/drive/folders/1Q171pLkFgucgHO0bJ1lRWlxC3en-tHZz' },
    ],
    status: 'Under Scrutiny',
  },
  {
    refId: 'VBL-829104',
    date: '2026-09-10 11:30 AM',
    fullName: 'Sample Testator One',
    parentSpouseName: 'S/o Sample Parent',
    age: '64',
    phone: '+91 90000 00001',
    email: 'sample.one@example.com',
    city: 'Kavali',
    address: 'Sample Address, Kavali - 524201',
    serviceType: 'draft_new',
    serviceLabel: 'Fresh Will Drafting',
    assetTypes: ['Agricultural / Farm Lands', 'Residential / Commercial Real Estate'],
    executorName: 'Sample Executor (Son)',
    specialInstructions: 'Sample instruction: equal partition of agricultural land between two sons, with lifetime usufruct rights to spouse.',
    documents: [
      { name: 'Pattadar_Passbook_Musunuru.pdf', size: '2.4 MB', driveUrl: 'https://drive.google.com/drive/folders/1Q171pLkFgucgHO0bJ1lRWlxC3en-tHZz' },
      { name: 'Aadhaar_Card_Testator.pdf', size: '820 KB', driveUrl: 'https://drive.google.com/drive/folders/1Q171pLkFgucgHO0bJ1lRWlxC3en-tHZz' },
    ],
    status: 'Under Scrutiny',
  },
  {
    refId: 'VBL-741295',
    date: '2026-09-09 04:15 PM',
    fullName: 'Sample Testator Two',
    parentSpouseName: 'W/o Sample Spouse',
    age: '58',
    phone: '+91 90000 00002',
    email: 'sample.two@example.com',
    city: 'Singarayakonda',
    address: 'Sample Address, Singarayakonda, Prakasam Dist.',
    serviceType: 'review_existing',
    serviceLabel: 'Scrutiny of Existing Draft',
    assetTypes: ['Residential / Commercial Real Estate', 'Gold, Jewelry & Heirlooms'],
    executorName: 'Sample Executor (Eldest Son)',
    specialInstructions: 'Sample instruction: verify whether a registered gift deed affects an existing Telugu-language draft.',
    documents: [
      { name: 'Existing_Telugu_Will_Draft.pdf', size: '3.1 MB', driveUrl: 'https://drive.google.com/drive/folders/1Q171pLkFgucgHO0bJ1lRWlxC3en-tHZz' },
      { name: 'Commercial_Shop_SaleDeed.pdf', size: '4.8 MB', driveUrl: 'https://drive.google.com/drive/folders/1Q171pLkFgucgHO0bJ1lRWlxC3en-tHZz' },
    ],
    status: 'New Submission',
  }
];

function loadSubmissions() {
  try {
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading submissions file:', err);
  }
  saveSubmissions(INITIAL_SUBMISSIONS);
  return INITIAL_SUBMISSIONS;
}

function saveSubmissions(list) {
  try {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(list, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing submissions file:', err);
  }
}

// Ensure file exists
loadSubmissions();

// The content calendar is read and written exclusively through db.js so that
// Supabase and the local cache never diverge. The local-only helpers that used
// to live here are gone; use db.getPosts / db.savePost / db.savePosts.

/**
 * Issues a fresh chambers reference, checking it is not already in use.
 *
 * Uses crypto rather than Math.random: references are the only credential a
 * testator holds for their file, so they must not be predictable from a
 * previously issued one.
 */
async function issueReferenceId() {
  for (let attempt = 0; attempt < 12; attempt++) {
    const candidate = 'VBL-' + String(crypto.randomInt(100000, 1000000));
    const existing = await db.getSubmissionByRef(candidate);
    if (!existing) return candidate;
  }
  // Exhausting twelve attempts means the six-digit space is crowded; widen it
  // rather than risk colliding with a live client file.
  return 'VBL-' + String(crypto.randomInt(100000, 1000000)) + '-' + crypto.randomBytes(2).toString('hex').toUpperCase();
}

// Google Drive vault. Heavy binaries (will PDFs, title deeds, pattadar
// passbooks) live here, never in Supabase - see automation/supabase/schema.sql.
// n8n creates the per-client "[RefId] - [ClientFullName]" subfolder and calls
// back with its real id/url; until that returns, a submission carries the vault
// root as a PENDING placeholder, not as the client's own folder.
const DRIVE_VAULT_ROOT_ID = process.env.GOOGLE_DRIVE_FOLDER_ID || '1Q171pLkFgucgHO0bJ1lRWlxC3en-tHZz';
const DRIVE_VAULT_ROOT_URL = `https://drive.google.com/drive/folders/${DRIVE_VAULT_ROOT_ID}`;

// Quiet warning tracker for offline n8n
let lastN8nOfflineNotice = 0;

// n8n Webhook URLs
const N8N_INTERNAL_URL = process.env.N8N_INTERNAL_URL || 'http://n8n-automation:5678';
const N8N_EXTERNAL_URL = process.env.N8N_EXTERNAL_URL || 'http://localhost:5678';

// Security Headers: Block Search Engine Crawlers & Prevent Clickjacking
app.use((req, res, next) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// Permissive CORS for chambers domains and localhost
const allowedOrigins = [
  'https://vbllawchambers.com',
  'https://www.vbllawchambers.com',
  'https://admin.vbllawchambers.com',
  'https://portal.vbllawchambers.com',
  'http://localhost:3300',
  'http://localhost:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.onrender.com') || origin.endsWith('.vbllawchambers.com')) {
      callback(null, true);
    } else {
      callback(null, true); // Permissive for initial setup
    }
  },
  credentials: true
}));

// Render (and any reverse proxy in deploy/) terminates TLS in front of this
// process. Without this, req.ip is the proxy's address for every request, so
// the per-client throttle below would lump all visitors into one bucket and
// rate-limit the whole practice at once.
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve built React assets in production
app.use(express.static(path.join(__dirname, 'dist')));

// Authentication Verification Middleware
function requireAdminAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const customKeyHeader = req.headers['x-admin-key'];

  let providedKey = customKeyHeader;
  if (!providedKey && authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const decoded = Buffer.from(authHeader.substring(7), 'base64').toString('utf-8');
      providedKey = decoded;
    } catch {
      providedKey = authHeader.substring(7);
    }
  }

  if (providedKey && providedKey.trim() === ADMIN_SECRET_KEY.trim()) {
    return next();
  }

  return res.status(401).json({
    success: false,
    error: 'Unauthorized',
    message: 'Valid chambers admin authentication token or secret key required.'
  });
}

// Auth API: Authenticate with chambers master passkey
app.post('/api/auth/login', (req, res) => {
  const { passcode } = req.body;
  if (!passcode) {
    return res.status(400).json({ success: false, message: 'Passcode is required.' });
  }

  if (passcode.trim() === ADMIN_SECRET_KEY.trim()) {
    const token = Buffer.from(passcode.trim()).toString('base64');
    return res.json({ success: true, token });
  }

  return res.status(401).json({ success: false, message: 'Invalid chambers passcode.' });
});

// Auth API: Verify token validity
app.get('/api/auth/verify', requireAdminAuth, (req, res) => {
  res.json({ success: true, authenticated: true });
});

// Canonical service types offered by the chambers. These ids must stay in sync
// with the wizard in website/src/pages/WillSubmission.jsx.
const SERVICE_LABELS = {
  draft_new: 'Fresh Will Drafting',
  review_existing: 'Scrutiny of Existing Draft',
  codicil: 'Codicil (Amendment)',
  family_settlement: 'Family Settlement Deed'
};

// An unrecognised serviceType must NEVER be silently recorded as some specific
// service - that puts the wrong legal instruction on a client's file. The
// submission is still accepted (never discard a client's documents); it is
// flagged for the advocate to classify manually.
function resolveServiceLabel(serviceType) {
  const key = (serviceType || 'draft_new').trim();
  if (SERVICE_LABELS[key]) return SERVICE_LABELS[key];
  console.warn(`[Will Submission] Unrecognised serviceType "${serviceType}" - flagged for manual classification.`);
  return 'Unspecified — requires chambers review';
}

// Uploads stream straight to disk.
//
// memoryStorage() held every uploaded file whole in RAM. Combined with the
// 250MB limit and `upload.array('documents', 10)` a single will submission
// could ask for 2.5GB of heap, which OOM-kills a 512MB Render container long
// before the request completes. Streaming to disk makes peak memory
// independent of file size.
//
// Staging lives OUTSIDE uploads/, because uploads/ is served statically -
// staging files inside it would be publicly fetchable mid-request.
const STAGING_DIR = path.join(os.tmpdir(), 'vbl-upload-staging');
if (!fs.existsSync(STAGING_DIR)) fs.mkdirSync(STAGING_DIR, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, STAGING_DIR),
    filename: (req, file, cb) =>
      cb(null, `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`)
  }),
  limits: {
    fileSize: 250 * 1024 * 1024,
    files: 10,
    fields: 40
  }
});

// Staged files must not accumulate: the container has a small ephemeral disk
// and these are confidential client documents.
function discardStaged(files) {
  (Array.isArray(files) ? files : [files]).forEach(file => {
    if (!file || !file.path) return;
    fs.promises.unlink(file.path).catch(() => {});
  });
}

// Helper to make resilient requests to n8n
async function sendToN8n(endpoint, options = {}) {
  // Docker service name first: it resolves instantly inside the compose network,
  // and fails fast with ENOTFOUND on the host so the localhost fallbacks still work.
  const urls = [
    `${N8N_INTERNAL_URL}${endpoint}`,
    `http://127.0.0.1:5678${endpoint}`,
    `http://localhost:5678${endpoint}`,
    `${N8N_EXTERNAL_URL}${endpoint}`
  ];

  let lastError;
  for (const url of urls) {
    try {
      const response = await axios({ url, ...options, timeout: 60000 });
      return response.data;
    } catch (err) {
      lastError = err;
      if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}

/**
 * Creates the client's "[RefId] - [ClientFullName]" folder inside the Drive
 * vault and records the real ids on the submission.
 *
 * The Drive credentials live in n8n (the chambers reconnected Google Drive
 * there), so n8n performs the actual Drive calls; this function is the
 * retryable wrapper around that. Documents are streamed from the client's
 * folder on disk, which means a retry works long after the original request
 * ended - the uploaded bytes are still there.
 *
 * Returns true when the record now has a dedicated folder.
 */
async function provisionDriveFolder(record) {
  const refId = record.refId;
  const clientDir = path.join(UPLOADS_DIR, record.folderName || '');

  const form = new FormData();
  form.append('refId', refId);
  form.append('fullName', record.fullName || '');
  form.append('phone', record.phone || '');
  form.append('email', record.email || '');
  form.append('serviceType', record.serviceType || 'draft_new');
  form.append('folderName', record.folderName || '');
  form.append('vaultRootId', DRIVE_VAULT_ROOT_ID);

  // Re-read from the client's folder rather than holding buffers: this is what
  // makes the operation replayable on a later attempt.
  let attached = 0;
  if (fs.existsSync(clientDir)) {
    fs.readdirSync(clientDir).forEach((name) => {
      const full = path.join(clientDir, name);
      let stat;
      try { stat = fs.statSync(full); } catch { return; }
      if (!stat.isFile()) return;
      form.append(`document_${attached++}`, fs.createReadStream(full), {
        filename: name,
        knownLength: stat.size
      });
    });
  }

  const n8nRes = await sendToN8n('/webhook/will-submission', {
    method: 'POST',
    data: form,
    headers: form.getHeaders(),
    timeout: 25000
  });

  if (!n8nRes || !(n8nRes.driveFolderUrl || n8nRes.driveFolderId)) {
    await db.patchSubmission(refId, { driveProvisionState: 'pending' });
    return false;
  }

  console.log(`[Drive] Provisioned folder for ${refId}: ${n8nRes.driveFolderUrl || n8nRes.driveFolderId}`);

  // Must go through db.patchSubmission, not the local-only helpers: this is
  // the moment the placeholder vault link becomes the client's real folder,
  // and Supabase has to receive it too.
  const patch = {
    previousDriveUrl: DRIVE_VAULT_ROOT_URL,
    driveProvisionState: 'provisioned'
  };
  if (n8nRes.driveFolderUrl) patch.driveFolderUrl = n8nRes.driveFolderUrl;
  if (n8nRes.driveFolderId) patch.driveFolderId = n8nRes.driveFolderId;
  if (n8nRes.folderName) patch.driveFolderName = n8nRes.folderName;
  if (n8nRes.driveFileIds) patch.driveFileIds = n8nRes.driveFileIds;

  await db.patchSubmission(refId, patch);
  return true;
}

// Drains the provisioning backlog. Every submission taken while n8n was in
// standby still has only the placeholder vault link; this retries them all.
// PROTECTED: it walks the whole client registry.
app.post('/api/drive/provision-pending', requireAdminAuth, async (req, res) => {
  try {
    const all = await db.getSubmissions();
    const pending = all.filter(r => !hasDedicatedDriveFolder(r));

    const results = { attempted: pending.length, provisioned: 0, stillPending: 0, errors: [] };
    for (const record of pending) {
      try {
        if (await provisionDriveFolder(record)) results.provisioned++;
        else results.stillPending++;
      } catch (err) {
        results.stillPending++;
        results.errors.push({ refId: record.refId, error: err.message });
      }
    }

    console.log(`[Drive] Backlog drain: ${results.provisioned}/${results.attempted} provisioned.`);
    return res.json({ success: true, ...results });
  } catch (err) {
    console.error('[Drive] Backlog drain failed:', err.message);
    return res.status(500).json({ success: false, message: 'Drive provisioning sweep failed.' });
  }
});

// Health check API
// Reports which persistence backend is actually serving requests. Without this
// a silent demotion from Supabase to the local cache looks identical to normal
// operation, and records quietly stop being durable.
app.get('/api/health', async (req, res) => {
  // Probe rather than report the last thing we happened to see: straight after
  // a restart no query has run yet, and the cached state would say
  // "local-cache" while Supabase is healthy.
  const storage = await db.ensureProbed();
  res.json({
    status: 'ok',
    practice: 'VBL Law Chambers',
    client: 'Advocate in Kavali, AP',
    focus: 'Will Drafting & Legal Presence',
    framework: 'React + Vite + Express',
    storage,
    driveVaultRootId: DRIVE_VAULT_ROOT_ID,
    timestamp: new Date().toISOString()
  });
});

// Fetch all posts from Google Sheet via n8n with local fallback (Protected)
app.get('/api/posts', requireAdminAuth, async (req, res) => {
  try {
    const data = await sendToN8n('/webhook/content-list', { method: 'GET' });
    if (data && data.posts && Array.isArray(data.posts) && data.posts.length > 0) {
      await db.savePosts(data.posts);
      return res.json({ success: true, offline: false, ...data });
    }
    const cachedPosts = await db.getPosts();
    return res.json({
      success: true,
      offline: false,
      count: (data && data.posts) ? data.posts.length : cachedPosts.length,
      posts: (data && data.posts && data.posts.length > 0) ? data.posts : cachedPosts
    });
  } catch (err) {
    // When n8n is in standby/offline mode, gracefully serve the local chambers content calendar
    const now = Date.now();
    if (now - lastN8nOfflineNotice > 60000) {
      console.log('[Content Calendar] n8n pipeline is offline/standby. Serving chambers local content calendar.');
      lastN8nOfflineNotice = now;
    }

    // n8n being in standby is normal operation, not an error: the calendar is
    // still served from the hybrid registry, so this must never surface as a 500.
    const cachedPosts = await db.getPosts();
    return res.json({
      success: true,
      offline: true,
      pipelineStatus: 'standby',
      count: cachedPosts.length,
      posts: cachedPosts,
      message: 'Automation pipeline (n8n) is in standby. Showing chambers content calendar.'
    });
  }
});

// ---------------------------------------------------------------------------
// Native publishing channels
// ---------------------------------------------------------------------------
/**
 * Reports which channels can actually publish right now.
 *
 * "Connected" means credentials are present for the native adapters in
 * publishing/meta.js - not that a token was validated this second. A token can
 * still be revoked upstream, which surfaces as AUTH_EXPIRED on the next publish
 * and flips the channel to "Needs Reconnect"; that state is read back from the
 * calendar rather than guessed here.
 */
function channelInventory() {
  const e = process.env;
  const native = [
    {
      id: 'facebook',
      label: 'Facebook Page',
      connected: Boolean(e.FACEBOOK_PAGE_ID && e.FACEBOOK_PAGE_ACCESS_TOKEN),
      account: e.FACEBOOK_PAGE_NAME || null,
      accountId: e.FACEBOOK_PAGE_ID || null,
      requires: 'FACEBOOK_PAGE_ID + FACEBOOK_PAGE_ACCESS_TOKEN'
    },
    {
      id: 'instagram',
      label: 'Instagram',
      connected: Boolean(e.INSTAGRAM_BUSINESS_ACCOUNT_ID && e.FACEBOOK_PAGE_ACCESS_TOKEN),
      account: e.INSTAGRAM_USERNAME ? `@${e.INSTAGRAM_USERNAME}` : null,
      accountId: e.INSTAGRAM_BUSINESS_ACCOUNT_ID || null,
      requires: 'INSTAGRAM_BUSINESS_ACCOUNT_ID + FACEBOOK_PAGE_ACCESS_TOKEN'
    },
    {
      id: 'threads',
      label: 'Threads',
      connected: Boolean(e.THREADS_USER_ID && e.THREADS_ACCESS_TOKEN),
      account: e.INSTAGRAM_USERNAME ? `@${e.INSTAGRAM_USERNAME}` : null,
      accountId: e.THREADS_USER_ID || null,
      requires: 'THREADS_USER_ID + THREADS_ACCESS_TOKEN'
    }
  ].map(c => ({ ...c, native: true }));

  // Published through n8n rather than the native adapters. Listed so the suite
  // never implies the chambers has more reach than it actually does.
  const viaPipeline = [
    { id: 'youtube', label: 'YouTube', native: false, connected: true, account: null, via: 'n8n YouTube Publisher' },
    { id: 'linkedin', label: 'LinkedIn', native: false, connected: false, account: null, via: 'not configured' },
    { id: 'pinterest', label: 'Pinterest', native: false, connected: false, account: null, via: 'trial access denied' }
  ];

  return [...native, ...viaPipeline];
}

app.get('/api/channels', requireAdminAuth, (req, res) => {
  const channels = channelInventory();
  res.json({
    success: true,
    channels,
    nativeReady: channels.filter(c => c.native && c.connected).map(c => c.id),
    graphVersion: process.env.META_GRAPH_VERSION || 'v21.0'
  });
});

/**
 * Advances one calendar entry through the publishing state machine.
 *
 * Deliberately does NOT block until every channel is live. Instagram
 * transcoding takes 30-60s, and holding the request open is exactly what lets
 * a sleeping container die mid-publish and duplicate the post on retry. One
 * pass runs here; /api/publish/tick carries it the rest of the way.
 */
async function advanceCalendarEntry(contentId, passes = 1) {
  const posts = await db.getPosts();
  const row = posts.find(p => p['Content ID'] === contentId);
  if (!row) return null;

  const stored = await db.getPublishState(contentId);
  const states = publishState.readPlatformStates({
    Platforms: row.Platforms,
    platform_statuses: stored?.platform_statuses || {}
  });

  const drivers = metaAdapters.buildDrivers({
    caption: row.Caption || row.Title || '',
    mediaUrl: row['Public Media URL'] || row.mediaUrl || '',
    mediaType: row.mediaType || (row['Public Media URL'] ? 'image' : 'text')
  });

  let next = states;
  for (let i = 0; i < passes; i++) {
    next = await publishState.advancePost(next, drivers);
    if (publishState.isSettled(next)) break;
  }

  const settled = publishState.isSettled(next);
  const allDone = Object.values(next).every(s => s.state === 'completed');
  await db.savePublishState(contentId, next, {
    publishState: settled ? (allDone ? 'completed' : 'failed') : 'pending',
    status: publishState.rollupStatus(next),
    failureKind: Object.values(next).find(s => s.failureKind)?.failureKind || null
  });

  return { contentId, states: next, settled, rollup: publishState.rollupStatus(next) };
}

app.post('/api/posts/:contentId/publish', requireAdminAuth, async (req, res) => {
  try {
    const result = await advanceCalendarEntry(req.params.contentId, 1);
    if (!result) {
      return res.status(404).json({ success: false, message: `No calendar entry ${req.params.contentId}` });
    }
    return res.json({ success: true, ...result });
  } catch (err) {
    console.error('[Publish] Failed:', err.message);
    return res.status(500).json({ success: false, message: 'Publish dispatch failed.' });
  }
});

/**
 * Carries every in-flight post one step further. This is the endpoint a
 * scheduler (n8n, cron, or an external ping) calls a few times a day - it is
 * what makes the pipeline survive the instance sleeping between steps.
 */
app.post('/api/publish/tick', requireAdminAuth, async (req, res) => {
  try {
    const posts = await db.getPosts();
    const due = posts.filter(p => {
      const s = String(p.Status || '').toLowerCase();
      return s === 'approved' || s === 'publishing' || p.publishState === 'pending';
    });

    const advanced = [];
    for (const row of due) {
      const r = await advanceCalendarEntry(row['Content ID'], 1);
      if (r) advanced.push({ contentId: r.contentId, rollup: r.rollup, settled: r.settled });
    }
    return res.json({ success: true, examined: due.length, advanced });
  } catch (err) {
    console.error('[Publish tick] Failed:', err.message);
    return res.status(500).json({ success: false, message: 'Publish tick failed.' });
  }
});

// Upload media & schedule post (Protected)
app.post('/api/upload', requireAdminAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No media file provided. Please attach an image or video.'
      });
    }

    // Remove the staged copy however this request ends - success, validation
    // failure or thrown error.
    res.on('finish', () => discardStaged(req.file));

    const {
      title,
      caption,
      platforms,
      scheduledDateTime,
      pinterestBoardId,
      status
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Post title is required.'
      });
    }

    // Build multipart/form-data payload for n8n Webhook.
    // Streamed from the staged file rather than buffered, so a 200MB video
    // never has to fit in the container's heap.
    const form = new FormData();
    form.append('data', fs.createReadStream(req.file.path), {
      filename: req.file.originalname || `upload_${Date.now()}.mp4`,
      contentType: req.file.mimetype || 'video/mp4',
      knownLength: req.file.size
    });
    form.append('title', title.trim());
    form.append('caption', caption ? caption.trim() : '');
    form.append('platforms', platforms || 'instagram,facebook,youtube');
    form.append('scheduledDateTime', scheduledDateTime || new Date().toISOString());
    form.append('pinterestBoardId', pinterestBoardId || '');
    form.append('status', status || 'Pending Review');

    // Send to n8n Webhook or fallback to local registry
    try {
      const result = await sendToN8n('/webhook/content-upload', {
        method: 'POST',
        data: form,
        headers: form.getHeaders(),
        timeout: 20000
      });
      return res.json(result);
    } catch (n8nErr) {
      console.warn('[Upload Media] n8n offline, queuing post in local calendar:', n8nErr.message);
      const newPostId = 'W-' + String(Date.now()).slice(-6);
      const newLocalPost = {
        'Content ID': newPostId,
        'Title': title.trim(),
        'Caption': caption ? caption.trim() : '',
        'Platforms': platforms || 'instagram,facebook,youtube',
        'Scheduled DateTime': scheduledDateTime || new Date().toISOString(),
        'Status': status || 'Pending Review',
        'Retry Count': 0,
        'Posted At': '',
        'Error': '',
        'Drive File ID': 'queued_local_' + Date.now(),
        'Instagram Status': 'Queued (n8n Standby)',
        'Facebook Status': 'Queued (n8n Standby)',
        'YouTube Status': 'Queued (n8n Standby)',
        'LinkedIn Status': 'Queued (n8n Standby)',
        'Pinterest Status': pinterestBoardId ? 'Queued' : 'Skipped',
        'Threads Status': 'Queued (n8n Standby)'
      };
      await db.savePost(newLocalPost);
      return res.json({
        success: true,
        offline: true,
        contentId: newPostId,
        message: 'Post queued in Chambers Content Calendar. Will synchronize to channels once n8n is active.'
      });
    }
  } catch (err) {
    console.error('Upload error:', err.message);
    return res.status(500).json({
      success: false,
      error: err.response?.data?.message || err.message,
      message: 'Failed to process upload and update Content Calendar.'
    });
  }
});

// Serve uploaded documents statically
app.use('/uploads', express.static(UPLOADS_DIR));

// Will Submission & Document Ingestion endpoint (Public)
app.post('/api/will-submission', upload.array('documents', 10), async (req, res) => {
  try {
    const {
      refId,
      fullName,
      parentSpouseName,
      age,
      phone,
      email,
      address,
      city,
      serviceType,
      assetTypes,
      executorName,
      specialInstructions
    } = req.body;

    // Sweep any staged leftovers once the response is done. Files that were
    // successfully renamed into the client folder are already gone, so this
    // only catches validation failures and copy-fallback duplicates.
    res.on('finish', () => discardStaged(req.files));

    if (!fullName || !phone) {
      return res.status(400).json({ success: false, message: 'Full name and phone number are required.' });
    }

    // The reference is issued by the chambers, never accepted from the caller.
    // This endpoint is public and db.saveSubmission upserts on refId, so
    // honouring a submitted refId let anyone overwrite an existing client's
    // record simply by posting that reference. The client's optimistic guess is
    // ignored; it adopts the reference returned in this response.
    if (refId) {
      console.warn('[Will Submission] Ignoring caller-supplied refId - references are issued server-side.');
    }
    const generatedRef = await issueReferenceId();
    const files = req.files || [];

    console.log(`[Will Submission] Received application ${generatedRef} for ${fullName} (${phone}) with ${files.length} documents.`);

    let parsedAssets = [];
    if (assetTypes) {
      try {
        parsedAssets = typeof assetTypes === 'string' ? JSON.parse(assetTypes) : assetTypes;
      } catch {
        parsedAssets = [String(assetTypes)];
      }
    }

    // Organize uploaded files into a dedicated client subfolder in local vault & Drive
    const cleanClientName = (fullName || 'Client').replace(/[/\\?%*:|"<>]/g, '').trim() || 'Client';
    const folderName = `${generatedRef} - ${cleanClientName}`;
    const clientUploadDir = path.join(UPLOADS_DIR, folderName);

    try {
      if (!fs.existsSync(clientUploadDir)) {
        fs.mkdirSync(clientUploadDir, { recursive: true });
      }
    } catch (dirErr) {
      console.warn('[Will Submission] Error creating client directory:', dirErr.message);
    }

    const pendingDriveFolderUrl = DRIVE_VAULT_ROOT_URL;

    // Move each staged upload into the client's dedicated folder. The bytes are
    // already on disk (diskStorage), so this is a rename rather than a
    // buffer-and-write; rename can fail across devices, hence the copy fallback.
    const docRecords = files.map((file, index) => {
      const safeFilename = `${index + 1}_${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const filePath = path.join(clientUploadDir, safeFilename);
      try {
        fs.renameSync(file.path, filePath);
      } catch (renameErr) {
        try {
          fs.copyFileSync(file.path, filePath);
        } catch (copyErr) {
          console.warn('[Will Submission] Failed to store file on disk:', copyErr.message);
        }
      }
      // n8n reads from the final location below; record it so the staged path
      // is never used again.
      file.storedPath = filePath;

      return {
        name: file.originalname,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        sizeBytes: file.size,
        mimeType: file.mimetype || 'application/octet-stream',
        url: `/uploads/${encodeURIComponent(folderName)}/${encodeURIComponent(safeFilename)}`,
        folderName: folderName,
        driveFolderName: folderName,
        driveUrl: pendingDriveFolderUrl,
        driveFolderUrl: pendingDriveFolderUrl
      };
    });

    const newRecord = {
      refId: generatedRef,
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      fullName: fullName.trim(),
      parentSpouseName: (parentSpouseName || '').trim(),
      age: age || 'N/A',
      phone: phone.trim(),
      email: (email || '').trim(),
      city: (city || 'Kavali').trim(),
      address: (address || '').trim(),
      serviceType: serviceType || 'draft_new',
      serviceLabel: resolveServiceLabel(serviceType),
      assetTypes: parsedAssets,
      executorName: (executorName || '').trim(),
      specialInstructions: (specialInstructions || '').trim(),
      folderName: folderName,
      driveFolderName: folderName,
      driveFolderUrl: pendingDriveFolderUrl,
      driveFolderId: '',
      driveProvisionState: 'pending',
      // A submission with no uploads has no documents. This used to fabricate a
      // "Confidential_Will_Instructions.pdf, 120 KB" entry, so the tracker told
      // the testator a document was held in the vault when none existed.
      documents: docRecords,
      status: 'New Submission'
    };

    // Save to persistent storage (Supabase PostgreSQL + local cache)
    await db.saveSubmission(newRecord);

    // Provision the client's Drive folder in the background. Failure here must
    // never fail the submission - the documents are already safely on disk and
    // provisioning is retryable (see /api/drive/provision-pending).
    provisionDriveFolder(newRecord).catch(err =>
      console.warn(`[Drive] Provisioning deferred for ${generatedRef}:`, err.message)
    );

    return res.status(200).json({
      success: true,
      refId: generatedRef,
      folderName: folderName,
      driveFolderName: folderName,
      driveFolderUrl: pendingDriveFolderUrl,
      submission: newRecord,
      message: 'Will submission recorded successfully in Chambers Registry.'
    });
  } catch (err) {
    console.error('[Will Submission] Error processing submission:', err.message);
    return res.status(500).json({
      success: false,
      error: err.message,
      message: 'Failed to process will submission.'
    });
  }
});

// Retrieve all will submissions (Chambers Staff / Admin)
// PROTECTED: returns every client's PII (name, phone, address), privileged
// drafting instructions and document vault links. Must never be public.
app.get('/api/will-submissions', requireAdminAuth, async (req, res) => {
  try {
    const list = await db.getSubmissions();
    return res.json({ success: true, count: list.length, submissions: list });
  } catch (err) {
    console.error('[Will Submissions] Error fetching submissions:', err.message);
    return res.status(500).json({ success: false, message: 'Failed to fetch submissions.' });
  }
});

// Fields a testator may see about their own application.
//
// The full record is deliberately NOT returned here. A reference is only six
// digits, so the whole space is enumerable by anyone; the blast radius of a
// guessed reference must therefore be "someone learns an application exists
// and what stage it is at", never the testator's address, executor, asset
// schedule or privileged drafting instructions.
const TRACKER_PUBLIC_FIELDS = [
  'refId', 'date', 'fullName', 'city', 'serviceLabel',
  'status', 'assetTypes', 'folderName', 'driveFolderName'
];

/**
 * True only when this submission has its OWN Drive subfolder.
 *
 * Until n8n creates "[RefId] - [ClientFullName]" and calls back, a record
 * carries the vault root as a placeholder. The root contains every client's
 * folder, so handing that link to a testator would expose the whole vault the
 * moment its sharing is loosened.
 */
function hasDedicatedDriveFolder(record) {
  const id = (record.driveFolderId || '').trim();
  const url = (record.driveFolderUrl || '').trim();
  if (!id && !url) return false;
  if (id && id !== DRIVE_VAULT_ROOT_ID) return true;
  return Boolean(url) && !url.includes(DRIVE_VAULT_ROOT_ID);
}

function toTrackerView(record) {
  const view = {};
  TRACKER_PUBLIC_FIELDS.forEach(key => {
    if (record[key] !== undefined) view[key] = record[key];
  });
  // Document names can themselves be sensitive ("Divorce_Decree.pdf"), so the
  // tracker confirms the count and leaves the detail to the chambers.
  view.documentCount = Array.isArray(record.documents) ? record.documents.length : 0;

  // The client's folder link is released only once it is genuinely theirs.
  view.driveFolderProvisioned = hasDedicatedDriveFolder(record);
  if (view.driveFolderProvisioned) {
    view.driveFolderUrl = record.driveFolderUrl;
  }
  return view;
}

// Fixed-window throttle for the public tracker. Enumerating VBL-###### is
// otherwise free; this makes a full sweep take days rather than minutes.
const trackerHits = new Map();
const TRACKER_WINDOW_MS = 60 * 1000;
const TRACKER_MAX_PER_WINDOW = 20;

// A dual-stack client reaches localhost as both ::1 and 127.0.0.1, and Node
// reports IPv4 over IPv6 as ::ffff:127.0.0.1. Normalising keeps one caller in
// one bucket instead of silently granting them several budgets.
function clientBucket(req) {
  const raw = req.ip || req.socket?.remoteAddress || 'unknown';
  const v4 = raw.replace(/^::ffff:/, '');
  return v4 === '::1' ? '127.0.0.1' : v4;
}

function throttleTracker(req, res, next) {
  const now = Date.now();
  const ip = clientBucket(req);
  const entry = trackerHits.get(ip);

  if (!entry || now - entry.start > TRACKER_WINDOW_MS) {
    trackerHits.set(ip, { start: now, count: 1 });
  } else if (++entry.count > TRACKER_MAX_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      message: 'Too many lookups. Please wait a minute and try again, or contact our chambers.'
    });
  }

  // Bounded cleanup so the map cannot grow without limit on a long-lived
  // process (this runs in a 512MB container).
  if (trackerHits.size > 5000) {
    for (const [key, value] of trackerHits) {
      if (now - value.start > TRACKER_WINDOW_MS) trackerHits.delete(key);
    }
  }
  next();
}

// Retrieve single will submission by reference ID
// Intentionally PUBLIC: clients track their own application by reference ID
// without an account, so this cannot require the admin key. It returns only the
// tracker projection above - do not widen it to the full record, and do not add
// auth here without also reworking the client tracker in WillSubmission.jsx.
app.get('/api/will-submissions/:refId', throttleTracker, async (req, res) => {
  try {
    const { refId } = req.params;
    const match = await db.getSubmissionByRef(refId);
    if (match) {
      return res.json({ success: true, submission: toTrackerView(match) });
    }
    return res.status(404).json({ success: false, message: `No submission found with ID ${refId}` });
  } catch (err) {
    console.error('[Will Tracker] Lookup failed:', err.message);
    return res.status(500).json({ success: false, message: 'Registry lookup failed.' });
  }
});

// Update will submission status (Chambers Admin)
// PROTECTED: mutates a client's statutory scrutiny stage.
app.patch('/api/will-submissions/:refId/status', requireAdminAuth, async (req, res) => {
  try {
    const { refId } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required.' });
    }

    const updated = await db.updateSubmissionStatus(refId, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: `No submission found with ID ${refId}` });
    }

    console.log(`[Will Status] ${refId} updated to "${status}"`);
    return res.json({ success: true, submission: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`⚖️  VBL Law Chambers Content Publishing Suite (API)`);
  console.log(`🌐 Server running at: http://localhost:${PORT}`);
  console.log(`=======================================================`);
});
