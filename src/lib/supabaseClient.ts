import { supabase as client } from "@/integrations/supabase/client";

// Bridge file: reuse the configured Supabase client
// Ensures any legacy imports of "src/lib/supabaseClient" continue to work
export const supabase = client;
export default client;