import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://uvxqpydkaevqbrgoppkz.supabase.co";
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "sb_publishable_Zby6o2uZeBQKc19Tco6YHw_kAIANpv6";

  return createBrowserClient(supabaseUrl, supabaseKey);
}

// Browser singleton
export const supabase = createClient();
