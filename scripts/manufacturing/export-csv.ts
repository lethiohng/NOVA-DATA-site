// Xuất CSV mẫu cho Data Playground: sản lượng và dừng máy theo dây chuyền, ngày và ca.
// Chạy: npm run manufacturing:csv  → public/data/nova_manufacturing_daily.csv
import { writeFileSync } from "node:fs";
import path from "node:path";
import { generateManufacturingData, type Row } from "./data";

const tables = generateManufacturingData();
const orderLine = new Map<number, number>();
for (const o of tables.production_orders) orderLine.set(o.order_id as number, o.line_id as number);
const lineCode = new Map<number, string>();
for (const l of tables.production_lines) lineCode.set(l.line_id as number, l.line_code as string);
const shiftName = new Map<number, string>();
for (const s of tables.shifts) shiftName.set(s.shift_id as number, s.shift_name as string);
const machineLine = new Map<number, number>();
for (const m of tables.machines) machineLine.set(m.machine_id as number, m.line_id as number);

type Agg = { machineHours: number; good: number; ng: number; total: number; downMin: number };
const agg = new Map<string, Agg>();
const slot = (line: number, day: string, shift: string) => {
  const key = `${line}|${day}|${shift}`;
  let a = agg.get(key);
  if (!a) agg.set(key, (a = { machineHours: 0, good: 0, ng: 0, total: 0, downMin: 0 }));
  return a;
};

for (const r of tables.production_records as Row[]) {
  const line = orderLine.get(r.order_id as number)!;
  const day = String(r.record_time).slice(0, 10);
  const a = slot(line, day, shiftName.get(r.shift_id as number)!);
  a.machineHours += 1;
  a.good += r.good_qty as number;
  a.ng += r.ng_qty as number;
  a.total += r.total_qty as number;
}
for (const d of tables.downtime_events as Row[]) {
  const line = machineLine.get(d.machine_id as number)!;
  const day = String(d.start_time).slice(0, 10);
  const hour = Number(String(d.start_time).slice(11, 13));
  const shift = hour >= 6 && hour < 14 ? "Day" : hour >= 14 && hour < 22 ? "Afternoon" : "Night";
  slot(line, day, shift).downMin += d.duration_minutes as number;
}

const header = "line_code,work_date,shift_name,machine_hours,good_qty,ng_qty,total_qty,downtime_min";
const lines = [...agg.entries()]
  .map(([key, a]) => {
    const [line, day, shift] = key.split("|");
    return [lineCode.get(Number(line)), day, shift, a.machineHours, a.good, a.ng, a.total, Math.round(a.downMin)].join(",");
  })
  .sort();

const out = path.join(process.cwd(), "public", "data", "nova_manufacturing_daily.csv");
writeFileSync(out, [header, ...lines].join("\n") + "\n", "utf8");
console.log(`Đã ghi ${lines.length} dòng vào ${out}`);
