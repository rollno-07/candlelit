-- ============================================================
-- Candlelit (one7app) Database Schema for Cloud Supabase
-- Copy and run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql/new
-- ============================================================

-- 1. Create the surprises table if it does not exist
CREATE TABLE IF NOT EXISTS public.surprises (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  template_id TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  sender_name TEXT,
  user_id UUID,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create index on slug for sub-millisecond lookups
CREATE INDEX IF NOT EXISTS idx_surprises_slug ON public.surprises (slug);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.surprises ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Anyone with the link can view/read a surprise
DROP POLICY IF EXISTS "Anyone can read surprises" ON public.surprises;
CREATE POLICY "Anyone can read surprises"
ON public.surprises
FOR SELECT
USING (true);

-- 5. Policy: Allow anyone (paying users and creators) to create surprises
DROP POLICY IF EXISTS "Anyone can insert surprises" ON public.surprises;
CREATE POLICY "Anyone can insert surprises"
ON public.surprises
FOR INSERT
WITH CHECK (true);

-- 6. Policy: Allow updating existing surprise
DROP POLICY IF EXISTS "Anyone can update surprises" ON public.surprises;
CREATE POLICY "Anyone can update surprises"
ON public.surprises
FOR UPDATE
USING (true);

