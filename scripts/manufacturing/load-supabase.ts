// Nạp dữ liệu NOVA MANUFACTURING lên Supabase (project hiện tại).
// Yêu cầu: đã chạy supabase/manufacturing_schema.sql trong SQL Editor.
// Chạy: npm run manufacturing:load   (cần SUPABASE_SERVICE_ROLE_KEY trong .env.local)
// Lưu ý: nạp lại sẽ xóa dữ liệu cũ của 15 bảng này rồi ghi mới.
import { createClient } from "@supabase/supabase-js";
import WebSocket from "ws";
import { countRows, generateManufacturingData, MANUFACTURING_TABLES } from "./data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Thiếu NEXT_PUBLIC_SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY");

const db = createClient(url, key, {
  auth: { persistSession: false },
  realtime: { transport: WebSocket as unknown as typeof globalThis.WebSocket },
});

/** Khóa chính của từng bảng, dùng để xóa toàn bộ dòng. */
const PRIMARY_KEY: Record<string, string> = {
  departments: "department_id",
  shifts: "shift_id",
  employees: "employee_id",
  production_lines: "line_id",
  machines: "machine_id",
  products: "product_id",
  production_orders: "order_id",
  production_records: "record_id",
  machine_cycles: "cycle_id",
  defect_types: "defect_type_id",
  quality_inspections: "inspection_id",
  downtime_reasons: "reason_id",
  downtime_events: "downtime_id",
  materials: "material_id",
  material_transactions: "txn_id",
};

const BATCH = 500;

async function main() {
  const tables = generateManufacturingData();
  console.log(`Đã sinh ${countRows(tables)} dòng.`);

  // Xóa từ bảng con đến bảng cha để không vi phạm khóa ngoại.
  for (const name of [...MANUFACTURING_TABLES].reverse()) {
    const { error } = await db.from(name).delete().gte(PRIMARY_KEY[name], 0);
    if (error) throw new Error(`xóa ${name}: ${error.message}`);
  }
  console.log("Đã xóa dữ liệu cũ.");

  // Ghi từ bảng cha đến bảng con.
  for (const name of MANUFACTURING_TABLES) {
    const rows = tables[name];
    for (let i = 0; i < rows.length; i += BATCH) {
      const { error } = await db.from(name).insert(rows.slice(i, i + BATCH));
      if (error) throw new Error(`ghi ${name} (dòng ${i}): ${error.message}`);
    }
    console.log(`${name.padEnd(24)} ${rows.length}`);
  }
  console.log("Nạp xong NOVA MANUFACTURING.");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
