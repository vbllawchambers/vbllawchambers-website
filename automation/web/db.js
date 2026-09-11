/**
 * VBL Law Chambers — Hybrid Database Layer (Supabase + Local Registry Fallback)
 * Project: cmjhgvhtlpayjcrsqgox (https://cmjhgvhtlpayjcrsqgox.supabase.co)
 * Seamlessly transitions between Supabase PostgreSQL and local JSON cache.
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

// Supabase Configuration from Environment or local uncommitted secrets
let SUPABASE_URL = process.env.SUPABASE_URL || '';
let SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || '';

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
    } catch {
      // Graceful fallback
    }
  }
}

let supabase = null;
if (SUPABASE_URL && SUPABASE_KEY) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false }
    });
    console.log('[Database] Supabase client initialized for project: cmjhgvhtlpayjcrsqgox');
  } catch (err) {
    console.warn('[Database] Failed to initialize Supabase client:', err.message);
  }
}

// ==============================================================================
// Local JSON Storage Helpers
// ==============================================================================
export function loadLocalSubmissions() {
  try {
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn('[Database] Error reading local submissions:', err.message);
  }
  return [];
}

export function saveLocalSubmissions(list) {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(list, null, 2), 'utf8');
  } catch (err) {
    console.warn('[Database] Error writing local submissions:', err.message);
  }
}

export function loadLocalPosts() {
  try {
    if (fs.existsSync(POSTS_FILE)) {
      const data = fs.readFileSync(POSTS_FILE, 'utf8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn('[Database] Error reading local posts:', err.message);
  }
  return [];
}

export function saveLocalPosts(list) {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(POSTS_FILE, JSON.stringify(list, null, 2), 'utf8');
  } catch (err) {
    console.warn('[Database] Error writing local posts:', err.message);
  }
}

// ==============================================================================
// Hybrid Will Submissions Service
// ==============================================================================
export async function getSubmissions() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('will_submissions')
        .select('*, documents:submission_documents(*)')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        // Map relational Supabase rows to chambers frontend schema
        const mapped = data.map(row => ({
          refId: row.ref_id,
          date: new Date(row.created_at).toLocaleString('en-IN', {
            month: 'short', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
          }),
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
          driveFolderUrl: row.drive_folder_url,
          status: row.status,
          documents: (row.documents || []).map(doc => ({
            name: doc.file_name,
            size: doc.file_size,
            url: doc.url,
            driveUrl: doc.drive_url || row.drive_folder_url
          }))
        }));
        saveLocalSubmissions(mapped); // keep local cache in sync
        return mapped;
      }
    } catch (sbErr) {
      // Graceful fallback to local cache if table not created yet or network offline
    }
  }
  return loadLocalSubmissions();
}

export async function getSubmissionByRef(refId) {
  if (!refId) return null;
  const cleanRef = refId.trim().toUpperCase();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('will_submissions')
        .select('*, documents:submission_documents(*)')
        .eq('ref_id', cleanRef)
        .maybeSingle();

      if (!error && data) {
        return {
          refId: data.ref_id,
          date: new Date(data.created_at).toLocaleString('en-IN', {
            month: 'short', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
          }),
          fullName: data.full_name,
          parentSpouseName: data.parent_spouse_name,
          age: data.age,
          phone: data.phone,
          email: data.email,
          city: data.city,
          address: data.address,
          serviceType: data.service_type,
          serviceLabel: data.service_label,
          assetTypes: data.asset_types || [],
          executorName: data.executor_name,
          specialInstructions: data.special_instructions,
          folderName: data.folder_name,
          driveFolderName: data.folder_name,
          driveFolderUrl: data.drive_folder_url,
          status: data.status,
          documents: (data.documents || []).map(doc => ({
            name: doc.file_name,
            size: doc.file_size,
            url: doc.url,
            driveUrl: doc.drive_url || data.drive_folder_url
          }))
        };
      }
    } catch (sbErr) {
      // Fallback to local
    }
  }

  const local = loadLocalSubmissions();
  return local.find(s => s.refId && s.refId.toUpperCase() === cleanRef) || null;
}

export async function saveSubmission(record) {
  // Always update local cache for zero-downtime resilience
  const current = loadLocalSubmissions();
  const updated = [record, ...current.filter(s => s.refId !== record.refId)];
  saveLocalSubmissions(updated);

  // Sync to Supabase if available
  if (supabase) {
    try {
      const { error: subErr } = await supabase
        .from('will_submissions')
        .upsert({
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
          drive_folder_url: record.driveFolderUrl || '',
          status: record.status || 'New Submission'
        }, { onConflict: 'ref_id' });

      if (!subErr && Array.isArray(record.documents) && record.documents.length > 0) {
        const docRows = record.documents.map(d => ({
          submission_ref_id: record.refId,
          file_name: d.name,
          file_size: d.size,
          url: d.url || '',
          drive_url: d.driveUrl || record.driveFolderUrl || '',
          folder_name: record.folderName
        }));
        await supabase.from('submission_documents').insert(docRows);
      }
    } catch (sbErr) {
      console.warn('[Database] Supabase save deferred (local cache active):', sbErr.message);
    }
  }

  return record;
}

export async function updateSubmissionStatus(refId, newStatus) {
  const current = loadLocalSubmissions();
  const target = current.find(s => s.refId === refId);
  if (target) {
    target.status = newStatus;
    saveLocalSubmissions(current);
  }

  if (supabase) {
    try {
      await supabase
        .from('will_submissions')
        .update({ status: newStatus })
        .eq('ref_id', refId);
    } catch (sbErr) {
      console.warn('[Database] Supabase status update deferred:', sbErr.message);
    }
  }

  return target;
}

// ==============================================================================
// Hybrid Content Calendar Posts Service
// ==============================================================================
export async function getPosts() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('content_calendar')
        .select('*')
        .order('scheduled_datetime', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        const mapped = data.map(row => ({
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
        }));
        saveLocalPosts(mapped);
        return mapped;
      }
    } catch (sbErr) {
      // Fallback
    }
  }
  return loadLocalPosts();
}

export async function savePost(postRecord) {
  const current = loadLocalPosts();
  const id = postRecord['Content ID'];
  const updated = [postRecord, ...current.filter(p => p['Content ID'] !== id)];
  saveLocalPosts(updated);

  if (supabase) {
    try {
      await supabase
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
    } catch (sbErr) {
      console.warn('[Database] Supabase post save deferred:', sbErr.message);
    }
  }

  return postRecord;
}

export { supabase };
