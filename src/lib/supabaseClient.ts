import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supports both Vite (VITE_*) and CRA (REACT_APP_*) env variables
function getEnv(nameVite: string, nameCRA: string): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const im: any = typeof import.meta !== 'undefined' ? import.meta : {};
  return im.env?.[nameVite] || (typeof process !== 'undefined' ? (process as any).env?.[nameCRA] : undefined);
}

const SUPABASE_URL = getEnv('VITE_SUPABASE_URL', 'REACT_APP_SUPABASE_URL');
const SUPABASE_ANON_KEY = getEnv('VITE_SUPABASE_ANON_KEY', 'REACT_APP_SUPABASE_ANON_KEY');

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Log a clear error once in development
  // Do not throw to avoid crashing the app UI; operations will fail gracefully
  // You should set env vars: VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY (Vite)
  // or REACT_APP_SUPABASE_URL / REACT_APP_SUPABASE_ANON_KEY (CRA)
  // console.error('Supabase env vars are missing. Please configure your Supabase URL and anon key.');
}

const supabase: SupabaseClient = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

export default supabase;
