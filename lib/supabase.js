import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://ktsxrgqrlubjcuhplksk.supabase.co";

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseKey &&
    !supabaseKey.includes("your_") &&
    supabaseKey.length > 10
);

export const supabase = isSupabaseConfigured
  ? typeof window !== "undefined"
    ? createBrowserClient(supabaseUrl, supabaseKey)
    : createSupabaseClient(supabaseUrl, supabaseKey)
  : null;

export const createClient = () => {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(supabaseUrl, supabaseKey);
};
