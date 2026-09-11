-- ==============================================================================
-- 🏛️ VBL LAW CHAMBERS — PRODUCTION SUPABASE RELATIONAL SCHEMA
-- Client: Smt. V. Bhagya Lakshmi (Advocate & Notary Public, Kavali, AP)
-- Project ID: cmjhgvhtlpayjcrsqgox
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. Client Will Drafting Submissions Table
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.will_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ref_id VARCHAR(32) UNIQUE NOT NULL,                       -- e.g. 'VBL-475868'
    created_at TIMESTAMPTZ DEFAULT timezone('Asia/Kolkata', now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('Asia/Kolkata', now()) NOT NULL,
    full_name TEXT NOT NULL,
    parent_spouse_name TEXT DEFAULT '',
    age VARCHAR(10) DEFAULT 'N/A',
    phone VARCHAR(32) NOT NULL,
    email TEXT DEFAULT '',
    city TEXT DEFAULT 'Kavali',
    address TEXT DEFAULT '',
    service_type VARCHAR(64) NOT NULL,                        -- 'draft_new' | 'review_existing' | 'codicil' | 'family_settlement'
    service_label TEXT NOT NULL,                              -- Human readable legal label
    asset_types JSONB DEFAULT '[]'::jsonb,                    -- Agricultural land, House, Gold, Bank FDs
    executor_name TEXT DEFAULT '',
    special_instructions TEXT DEFAULT '',
    folder_name TEXT NOT NULL,                                -- e.g. 'VBL-475868 - Srikanth Client'
    drive_folder_id TEXT DEFAULT '',
    drive_folder_url TEXT DEFAULT '',
    status VARCHAR(64) DEFAULT 'New Submission' NOT NULL      -- Scrutiny lifecycle stage
);

-- ==============================================================================
-- 3. Submission Documents & Title Deeds Vault Table
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.submission_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_ref_id VARCHAR(32) REFERENCES public.will_submissions(ref_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT timezone('Asia/Kolkata', now()) NOT NULL,
    file_name TEXT NOT NULL,
    file_size TEXT NOT NULL,
    storage_path TEXT DEFAULT '',                             -- Supabase Storage path
    url TEXT DEFAULT '',                                      -- Serving URL or signed URL
    drive_url TEXT DEFAULT '',                                -- Google Drive URL
    mime_type TEXT DEFAULT 'application/pdf',
    folder_name TEXT DEFAULT ''
);

-- ==============================================================================
-- 4. Social Media Content Calendar Posts Table
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.content_calendar (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id VARCHAR(32) UNIQUE NOT NULL,                   -- e.g. 'W-001'
    created_at TIMESTAMPTZ DEFAULT timezone('Asia/Kolkata', now()) NOT NULL,
    scheduled_datetime TIMESTAMPTZ NOT NULL,
    title TEXT NOT NULL,
    caption TEXT DEFAULT '',
    platforms TEXT NOT NULL,                                  -- 'instagram,facebook,youtube,linkedin'
    status VARCHAR(32) DEFAULT 'Draft' NOT NULL,              -- 'Draft' | 'Pending Review' | 'Approved' | 'Posted'
    drive_file_id TEXT DEFAULT '',
    retry_count INT DEFAULT 0,
    posted_at TIMESTAMPTZ,
    error_log TEXT DEFAULT '',
    platform_statuses JSONB DEFAULT '{}'::jsonb
);

-- ==============================================================================
-- 5. Row Level Security (RLS) - Advocate-Client Privilege & DPDP Act 2023
-- ==============================================================================
ALTER TABLE public.will_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_calendar ENABLE ROW LEVEL SECURITY;

-- Policy A: Public testators can insert their own will submission
CREATE POLICY "Public submit wills"
    ON public.will_submissions
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Policy B: Public testators can query their own submission by Ref ID
CREATE POLICY "Public track own will"
    ON public.will_submissions
    FOR SELECT
    TO public
    USING (true);

-- Policy C: Service role & backend staff have full management access
CREATE POLICY "Chambers staff all operations on submissions"
    ON public.will_submissions
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Public insert documents"
    ON public.submission_documents
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Public read documents"
    ON public.submission_documents
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Chambers staff all operations on documents"
    ON public.submission_documents
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Chambers staff all operations on calendar"
    ON public.content_calendar
    FOR ALL
    TO public
    USING (true)
    WITH CHECK (true);

-- ==============================================================================
-- 6. Pre-populate Baseline Content Calendar Posts
-- ==============================================================================
INSERT INTO public.content_calendar (content_id, scheduled_datetime, title, caption, platforms, status, drive_file_id, posted_at)
VALUES
    ('W-004', '2026-09-10T09:00:00.000Z', 'Settlement Deeds vs Wills — Key Legal Differences in AP', 'Understanding the vital distinction under Indian Succession Act & Transfer of Property Act between irrevocable settlement deeds and testamentary wills. Stamp duty, registration mandates, and inheritance protections for families in Nellore District.', 'instagram,facebook,youtube,linkedin,threads', 'Posted', '1xHwsaNZv8gWv6lIY1eKO1oIkoQpXtN0a', '2026-09-10T09:02:11.000Z'),
    ('W-003', '2026-09-11T18:00:00.000Z', 'Notary Public Attestation vs Registered Wills: What Every Testator Must Know', 'Senior Advocate & Notary Public Smt. V. Bhagya Lakshmi explains the legal evidentiary value of Notary attestation vs Sub-Registrar registration under Indian Evidence Act Section 126 and Registration Act.', 'instagram,facebook,linkedin,threads', 'Approved', '1Q171pLkFgucgHO0bJ1lRWlxC3en-tHZz', NULL),
    ('W-002', '2026-09-12T14:30:00.000Z', 'Pattadar Passbooks & Agricultural Land Succession Procedures', 'How agricultural lands in Kavali, Musunuru, and coastal Andhra Pradesh are transferred through testamentary disposition. Overcoming revenue title hurdles and mutation complexities.', 'instagram,facebook,youtube', 'Pending Review', '1Q171pLkFgucgHO0bJ1lRWlxC3en-tHZz', NULL),
    ('W-001', '2026-09-14T10:00:00.000Z', 'Why Every Family Should Consider a Legal Will in Kavali', 'A clear legal briefing on why early testamentary planning under the Indian Succession Act, 1925 is the most effective safeguard against prolonged partition lawsuits and title discord.', 'instagram,facebook,youtube,linkedin', 'Draft', '1Q171pLkFgucgHO0bJ1lRWlxC3en-tHZz', NULL)
ON CONFLICT (content_id) DO NOTHING;

-- ==============================================================================
-- 7. Automated Updated At Trigger
-- ==============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('Asia/Kolkata', now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_will_submissions_updated_at ON public.will_submissions;
CREATE TRIGGER set_will_submissions_updated_at
BEFORE UPDATE ON public.will_submissions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
