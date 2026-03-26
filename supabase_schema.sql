-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_type TEXT NOT NULL, -- 'artist' or 'corporate'
  
  -- Artist fields
  artist_name TEXT,
  artist_email TEXT,
  artist_phone TEXT,
  session_type TEXT,
  preferred_date DATE,
  preferred_time TEXT,
  artist_message TEXT,
  
  -- Corporate fields
  corp_contact_name TEXT,
  corp_company TEXT,
  corp_email TEXT,
  corp_phone TEXT,
  corp_project_type TEXT,
  corp_budget TEXT,
  corp_timeline TEXT,
  corp_decision_maker TEXT,
  corp_project_scope TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional, but good practice)
-- For now, we assume service role or anon key with service role permissions is used from the server side.
-- If using anon key from server, you might need to enable insert for anon.
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
