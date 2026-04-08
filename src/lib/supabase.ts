import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn(
        'Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY) are missing. Falling back to local data.'
      );
      return null;
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
    const client = getSupabase();
    if (client) {
      return (client as any)[prop];
    }

    // Return a dummy object that doesn't crash on common calls and supports chaining
    const chainable = {
      select: () => chainable,
      insert: () => chainable,
      update: () => chainable,
      delete: () => chainable,
      eq: () => chainable,
      order: () => chainable,
      limit: () => chainable,
      // Support for async/await
      then: (onfulfilled: any) => {
        return Promise.resolve(onfulfilled({ data: null, error: new Error('Supabase not configured') }));
      },
    };

    const mock: any = {
      from: () => chainable,
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
    };

    return mock[prop as keyof typeof target];
  },
});
