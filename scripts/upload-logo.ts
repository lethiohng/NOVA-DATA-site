// Tải logo lên Supabase Storage (bucket public "brand").
// Chạy: npx tsx --env-file=.env.local scripts/upload-logo.ts
import { readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import WebSocket from "ws";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const db = createClient(url, key, {
  auth: { persistSession: false },
  realtime: { transport: WebSocket as unknown as typeof globalThis.WebSocket },
});

async function main() {
  const { error: bucketErr } = await db.storage.createBucket("brand", { public: true, allowedMimeTypes: ["image/png", "image/svg+xml", "image/webp"] });
  if (bucketErr && !/already exists/i.test(bucketErr.message)) throw new Error(`tạo bucket: ${bucketErr.message}`);

  const file = readFileSync(path.join(process.cwd(), "public", "brand", "nova-logo-header.png"));
  const { error } = await db.storage.from("brand").upload("nova-logo-header.png", file, { contentType: "image/png", upsert: true });
  if (error) throw new Error(`upload: ${error.message}`);

  const { data } = db.storage.from("brand").getPublicUrl("nova-logo-header.png");
  console.log("Logo public URL:", data.publicUrl);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
