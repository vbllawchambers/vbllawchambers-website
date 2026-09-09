import express from 'express';
import cors from 'cors';
import multer from 'multer';
import FormData from 'form-data';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.WEB_PORT || 3300;

// n8n Webhook URLs
const N8N_INTERNAL_URL = process.env.N8N_INTERNAL_URL || 'http://n8n-automation:5678';
const N8N_EXTERNAL_URL = process.env.N8N_EXTERNAL_URL || 'http://localhost:5678';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve built React assets in production
app.use(express.static(path.join(__dirname, 'dist')));

// Configure Multer for in-memory upload buffering (up to 250MB for video)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 250 * 1024 * 1024 }
});

// Helper to make resilient requests to n8n
async function sendToN8n(endpoint, options = {}) {
  const urls = [
    `http://127.0.0.1:5678${endpoint}`,
    `http://localhost:5678${endpoint}`,
    `${N8N_INTERNAL_URL}${endpoint}`,
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

// Fetch all posts from Google Sheet via n8n
app.get('/api/posts', async (req, res) => {
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

// Upload media & schedule post
app.post('/api/upload', upload.single('file'), async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`⚖️  VBL Law Chambers Content Publishing Suite (API)`);
  console.log(`🌐 Server running at: http://localhost:${PORT}`);
  console.log(`=======================================================`);
});
