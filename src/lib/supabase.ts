import { createClient } from "@supabase/supabase-js";
import WebSocket from "ws";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Client chỉ đọc (anon key), chỉ dùng trong server component (src/lib/data.ts).
 * Truyền transport WebSocket vì Node 20 chưa có WebSocket native.
 */
export const supabase =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: { persistSession: false },
        realtime: { transport: WebSocket as unknown as typeof globalThis.WebSocket },
      })
    : null;
