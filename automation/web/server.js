import express from 'express';
import cors from 'cors';
import multer from 'multer';
import FormData from 'form-data';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

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

const INITIAL_SUBMISSIONS = [
  {
    refId: 'VBL-475868',
    date: '2026-09-11 10:05 AM',
    fullName: 'Client Submission (VBL-475868)',
    parentSpouseName: 'Testator / Family Representative',
    age: '55',
    phone: '+91 94402 81736',
    email: 'client.inquiry@vbllawchambers.com',
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
    fullName: 'P. Venkata Ramana Rao',
    parentSpouseName: 'S/o Late Subba Rao',
    age: '64',
    phone: '+91 94402 81736',
    email: 'pvramana.kavali@gmail.com',
    city: 'Kavali',
    address: 'Plot 42, RTC Colony, Kavali - 524201',
    serviceType: 'draft_new',
    serviceLabel: 'Fresh Will Drafting',
    assetTypes: ['Agricultural / Farm Lands', 'Residential / Commercial Real Estate'],
    executorName: 'P. Krishna Chaitanya (Son)',
    specialInstructions: 'Need equal partition of 4.5 acres agricultural land at Musunuru between two sons, with lifetime usufruct rights to wife.',
    documents: [
      { name: 'Pattadar_Passbook_Musunuru.pdf', size: '2.4 MB', driveUrl: 'https://drive.google.com/drive/folders/1Q171pLkFgucgHO0bJ1lRWlxC3en-tHZz' },
      { name: 'Aadhaar_Card_Testator.pdf', size: '820 KB', driveUrl: 'https://drive.google.com/drive/folders/1Q171pLkFgucgHO0bJ1lRWlxC3en-tHZz' },
    ],
    status: 'Under Scrutiny',
  },
  {
    refId: 'VBL-741295',
    date: '2026-09-09 04:15 PM',
    fullName: 'K. Lakshmi Narasamma',
    parentSpouseName: 'W/o K. Venkateswarlu',
    age: '58',
    phone: '+91 98480 39281',
    email: 'lakshmi.narasamma58@yahoo.com',
    city: 'Singarayakonda',
    address: 'Near Old Bus Stand, Singarayakonda, Prakasam Dist.',
    serviceType: 'review_existing',
    serviceLabel: 'Scrutiny of Existing Draft',
    assetTypes: ['Residential / Commercial Real Estate', 'Gold, Jewelry & Heirlooms'],
    executorName: 'K. Sridhar (Eldest Son)',
    specialInstructions: 'Existing draft written in 2018 in Telugu. Want to verify whether registered gift deed of commercial shop affects this draft.',
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

// Configure Multer for in-memory upload buffering (up to 250MB for video)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 250 * 1024 * 1024 }
});

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

// Health check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    practice: 'VBL Law Chambers',
    client: 'Advocate in Kavali, AP',
    focus: 'Will Drafting & Legal Presence',
    framework: 'React + Vite + Express',
    timestamp: new Date().toISOString()
  });
});

// Fetch all posts from Google Sheet via n8n (Protected)
app.get('/api/posts', requireAdminAuth, async (req, res) => {
  try {
    const data = await sendToN8n('/webhook/content-list', { method: 'GET' });
    return res.json(data);
  } catch (err) {
    console.error('Error fetching posts from n8n:', err.message);
    return res.status(500).json({
      success: false,
      error: err.response?.data?.message || err.message,
      message: 'Failed to retrieve posts from Content Calendar.'
    });
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

    // Build multipart/form-data payload for n8n Webhook
    const form = new FormData();
    form.append('data', req.file.buffer, {
      filename: req.file.originalname || `upload_${Date.now()}.mp4`,
      contentType: req.file.mimetype || 'video/mp4'
    });
    form.append('title', title.trim());
    form.append('caption', caption ? caption.trim() : '');
    form.append('platforms', platforms || 'instagram,facebook,youtube');
    form.append('scheduledDateTime', scheduledDateTime || new Date().toISOString());
    form.append('pinterestBoardId', pinterestBoardId || '');
    form.append('status', status || 'Pending Review');

    // Send to n8n Webhook
    const result = await sendToN8n('/webhook/content-upload', {
      method: 'POST',
      data: form,
      headers: form.getHeaders()
    });

    return res.json(result);
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

    if (!fullName || !phone) {
      return res.status(400).json({ success: false, message: 'Full name and phone number are required.' });
    }

    const generatedRef = (refId && refId.trim()) ? refId.trim().toUpperCase() : ('VBL-' + Math.floor(100000 + Math.random() * 900000));
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

    const defaultDriveFolderUrl = 'https://drive.google.com/drive/folders/1Q171pLkFgucgHO0bJ1lRWlxC3en-tHZz';

    // Persist uploaded files into the client's dedicated folder
    const docRecords = files.map((file, index) => {
      const safeFilename = `${index + 1}_${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const filePath = path.join(clientUploadDir, safeFilename);
      try {
        fs.writeFileSync(filePath, file.buffer);
      } catch (writeErr) {
        console.warn('[Will Submission] Failed to write file to disk:', writeErr.message);
      }

      return {
        name: file.originalname,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        url: `/uploads/${encodeURIComponent(folderName)}/${encodeURIComponent(safeFilename)}`,
        folderName: folderName,
        driveFolderName: folderName,
        driveUrl: defaultDriveFolderUrl,
        driveFolderUrl: defaultDriveFolderUrl
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
      serviceLabel: serviceType === 'draft_new' ? 'Fresh Will Drafting' :
                    serviceType === 'review_existing' ? 'Scrutiny of Existing Draft' :
                    serviceType === 'codicil' ? 'Codicil (Amendment)' : 'Family Settlement Deed',
      assetTypes: parsedAssets,
      executorName: (executorName || '').trim(),
      specialInstructions: (specialInstructions || '').trim(),
      folderName: folderName,
      driveFolderName: folderName,
      driveFolderUrl: defaultDriveFolderUrl,
      documents: docRecords.length > 0 ? docRecords : [
        {
          name: 'Confidential_Will_Instructions.pdf',
          size: '120 KB',
          folderName: folderName,
          driveFolderName: folderName,
          driveUrl: defaultDriveFolderUrl,
          driveFolderUrl: defaultDriveFolderUrl
        }
      ],
      status: 'New Submission'
    };

    // Save to persistent file
    const currentSubmissions = loadSubmissions();
    const updatedSubmissions = [newRecord, ...currentSubmissions.filter(s => s.refId !== generatedRef)];
    saveSubmissions(updatedSubmissions);

    // Build form data payload for n8n Webhook (creates dedicated folder in Drive & logs sheet)
    try {
      const form = new FormData();
      form.append('refId', generatedRef);
      form.append('fullName', fullName);
      form.append('phone', phone);
      form.append('email', email || '');
      form.append('serviceType', serviceType || 'draft_new');
      files.forEach((file, index) => {
        form.append(`document_${index}`, file.buffer, {
          filename: file.originalname,
          contentType: file.mimetype
        });
      });

      sendToN8n('/webhook/will-submission', {
        method: 'POST',
        data: form,
        headers: form.getHeaders(),
        timeout: 25000
      }).then((n8nRes) => {
        if (n8nRes && (n8nRes.driveFolderUrl || n8nRes.folderName)) {
          console.log(`[Will Submission] n8n created organized Drive folder for ${generatedRef}: ${n8nRes.driveFolderUrl || n8nRes.folderName}`);
          const liveSubs = loadSubmissions();
          const target = liveSubs.find(s => s.refId === generatedRef);
          if (target) {
            if (n8nRes.driveFolderUrl) target.driveFolderUrl = n8nRes.driveFolderUrl;
            if (n8nRes.driveFolderId) target.driveFolderId = n8nRes.driveFolderId;
            if (n8nRes.folderName) target.driveFolderName = n8nRes.folderName;
            if (target.documents) {
              target.documents.forEach(d => {
                if (n8nRes.driveFolderUrl) d.driveFolderUrl = n8nRes.driveFolderUrl;
                if (n8nRes.driveUrl) d.driveUrl = n8nRes.driveUrl;
              });
            }
            saveSubmissions(liveSubs);
          }
        }
      }).catch((n8nErr) => {
        console.warn('[Will Submission] n8n webhook notification offline:', n8nErr.message);
      });
    } catch (dispatchErr) {
      console.warn('[Will Submission] Background n8n dispatch skipped:', dispatchErr.message);
    }

    return res.status(200).json({
      success: true,
      refId: generatedRef,
      folderName: folderName,
      driveFolderName: folderName,
      driveFolderUrl: defaultDriveFolderUrl,
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
app.get('/api/will-submissions', (req, res) => {
  try {
    const list = loadSubmissions();
    return res.json({ success: true, count: list.length, submissions: list });
  } catch (err) {
    console.error('[Will Submissions] Error fetching submissions:', err.message);
    return res.status(500).json({ success: false, message: 'Failed to fetch submissions.' });
  }
});

// Retrieve single will submission by reference ID
app.get('/api/will-submissions/:refId', (req, res) => {
  try {
    const { refId } = req.params;
    const list = loadSubmissions();
    const match = list.find(s => s.refId && s.refId.toUpperCase() === refId.trim().toUpperCase());
    if (match) {
      return res.json({ success: true, submission: match });
    }
    return res.status(404).json({ success: false, message: `No submission found with ID ${refId}` });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Update will submission status (Chambers Admin)
app.patch('/api/will-submissions/:refId/status', (req, res) => {
  try {
    const { refId } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required.' });
    }

    const list = loadSubmissions();
    const index = list.findIndex(s => s.refId && s.refId.toUpperCase() === refId.trim().toUpperCase());
    if (index === -1) {
      return res.status(404).json({ success: false, message: `No submission found with ID ${refId}` });
    }

    list[index].status = status;
    saveSubmissions(list);

    console.log(`[Will Status] ${refId} updated to "${status}"`);
    return res.json({ success: true, submission: list[index] });
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
