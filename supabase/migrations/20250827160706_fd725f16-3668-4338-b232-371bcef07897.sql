-- Ensure one identity per username (case-insensitive)
CREATE UNIQUE INDEX IF NOT EXISTS usernames_username_ci_unique
ON public.usernames (lower(username));