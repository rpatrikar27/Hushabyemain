import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        'Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY) are required. Please set them in the Secrets panel.'
      );
    }

    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseClient;
}

// Export a proxy or a getter-based object to maintain compatibility with existing imports if possible,
// but it's safer to update callers to use getSupabase().
// For now, let's provide a legacy export that throws a helpful error if accessed before initialization.
export const supabase = new Proxy({} as SupabaseClient, {
  get: (target, prop) => {
    return (getSupabase() as any)[prop];
  },
});
