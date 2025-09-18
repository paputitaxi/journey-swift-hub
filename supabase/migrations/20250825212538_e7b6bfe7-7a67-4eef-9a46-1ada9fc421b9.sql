-- Create usernames table to store unique usernames
CREATE TABLE public.usernames (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.usernames ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read usernames (to check availability)
CREATE POLICY "Anyone can view usernames" 
ON public.usernames 
FOR SELECT 
USING (true);

-- Allow anyone to create usernames
CREATE POLICY "Anyone can create usernames" 
ON public.usernames 
FOR INSERT 
WITH CHECK (true);

-- Update rides table to include username instead of user_id
ALTER TABLE public.rides DROP COLUMN user_id;
ALTER TABLE public.rides ADD COLUMN username TEXT NOT NULL DEFAULT '';

-- Enable realtime for rides table
ALTER TABLE public.rides REPLICA IDENTITY FULL;

-- Add rides table to realtime publication
BEGIN;
  -- Remove the table from realtime (if it exists)
  DROP PUBLICATION IF EXISTS supabase_realtime;
  -- Create the publication and add the table
  CREATE PUBLICATION supabase_realtime FOR TABLE rides;
COMMIT;