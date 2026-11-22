// Sinh dữ liệu giả lập cho NOVA MANUFACTURING.
// Xác định (cùng seed → cùng dữ liệu), không dùng dữ liệu nội bộ hay thông tin thật.
// Thời gian: 60 ngày, 01/08/2026 – 30/09/2026, 4 dây chuyền, 12 máy, 3 ca.

export type Row = Record<string, string | number | null>;
export type Tables = Record<string, Row[]>;

/** Thứ tự nạp: bảng cha trước, bảng con sau (đúng khóa ngoại). */
export const MANUFACTURING_TABLES = [
  "departments",
  "shifts",
  "employees",
  "production_lines",
  "machines",
  "products",
  "production_orders",
  "production_records",
  "machine_cycles",
  "defect_types",
  "quality_inspections",
  "downtime_reasons",
  "downtime_events",
  "materials",
  "material_transactions",
] as const;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const HOUR = 3600_000;
const DAY_HOURS = 24;
const DAYS = 60;
const HOURS = DAYS * DAY_HOURS;
const BASE = Date.UTC(2026, 7, 1); // 01/08/2026 00:00

const ts = (ms: number) => new Date(ms).toISOString().slice(0, 19).replace("T", " ");
const dateStr = (ms: number) => new Date(ms).toISOString().slice(0, 10);

export function generateManufacturingData(): Tables {
  const rnd = mulberry32(20260801);
  // Bộ sinh riêng cho phút và giây của record_time, để không làm thay đổi các số liệu khác.
  const timeRnd = mulberry32(20260802);
  const between = (lo: number, hi: number) => lo + Math.floor(rnd() * (hi - lo + 1));
  const pick = <T,>(arr: T[]): T => arr[Math.floor(rnd() * arr.length)];

  // ---------- A. Master data ----------
  const departments: Row[] = [
    { department_id: 1, department_code: "PROD", department_name: "Production" },
    { department_id: 2, department_code: "QC", department_name: "Quality Control" },
    { department_id: 3, department_code: "MNT", department_name: "Maintenance" },
    { department_id: 4, department_code: "WH", department_name: "Warehouse" },
  ];

  const shifts: Row[] = [
    { shift_id: 1, shift_name: "Day", start_hour: 6, end_hour: 14 },
    { shift_id: 2, shift_name: "Afternoon", start_hour: 14, end_hour: 22 },
    { shift_id: 3, shift_name: "Night", start_hour: 22, end_hour: 6 },
  ];

  const employees: Row[] = [];
  const operatorsByShift: Record<number, number[]> = { 1: [], 2: [], 3: [] };
  const inspectorIds: number[] = [];
  const roleSpecs: [string, number, number][] = [
    ["Operator", 24, 1],
    ["Supervisor", 3, 1],
    ["Inspector", 6, 2],
    ["Engineer", 3, 3],
  ];
  for (const [role, count, dept] of roleSpecs) {
    for (let i = 1; i <= count; i++) {
      const id = employees.length + 1;
      const shiftId = role === "Operator" ? between(1, 3) : null;
      employees.push({
        employee_id: id,
        department_id: dept,
        shift_id: shiftId,
        full_name: `${role} ${String(i).padStart(2, "0")}`,
        role,
        hire_date: dateStr(Date.UTC(2018, 0, 1) + between(0, 2500) * 86_400_000),
      });
      if (role === "Operator" && shiftId) operatorsByShift[shiftId].push(id);
      if (role === "Inspector") inspectorIds.push(id);
    }
  }

  const lineLetters = ["A", "B", "C", "D"];
  const productionLines: Row[] = lineLetters.map((letter, i) => ({
    line_id: i + 1,
    line_code: `LINE-${letter}`,
    line_name: `Line ${letter}`,
    department_id: 1,
    // LINE-C để chuỗi rỗng, LINE-D để NULL: dùng cho bài học về NULL và chuỗi rỗng.
    location: i === 2 ? "" : i === 3 ? null : i < 2 ? "Building 1" : "Building 2",
  }));

  const machineTypes = ["CNC", "Assembly", "Press"];
  const machines: Row[] = [];
  lineLetters.forEach((letter, li) => {
    machineTypes.forEach((type, j) => {
      machines.push({
        machine_id: li * 3 + j + 1,
        machine_code: `M-${letter}${j + 1}`,
        machine_name: `${type} ${letter}${j + 1}`,
        line_id: li + 1,
        machine_type: type,
        ideal_cycle_sec: 45,
      });
    });
  });

  const standardCycles = [42, 45, 48, 50, 52, 55, 58, 60];
  const families = ["Sensor Housing", "Motor Bracket", "Gear Cover", "Valve Body"];
  const products: Row[] = standardCycles.map((cycle, i) => ({
    product_id: i + 1,
    product_code: `P-${String(i + 1).padStart(3, "0")}`,
    product_name: `Product ${String(i + 1).padStart(3, "0")}`,
    product_family: families[i % families.length],
    standard_cycle_sec: cycle,
  }));

  const defectTypes: Row[] = [
    { defect_type_id: 1, defect_code: "D01", defect_name: "Scratch", severity: "Minor" },
    { defect_type_id: 2, defect_code: "D02", defect_name: "Dimension Out", severity: "Major" },
    { defect_type_id: 3, defect_code: "D03", defect_name: "Crack", severity: "Critical" },
    { defect_type_id: 4, defect_code: "D04", defect_name: "Missing Part", severity: "Major" },
    { defect_type_id: 5, defect_code: "D05", defect_name: "Burr", severity: "Minor" },
    { defect_type_id: 6, defect_code: "D06", defect_name: "Porosity", severity: "Critical" },
  ];

  const downtimeReasons: Row[] = [
    { reason_id: 1, reason_code: "R01", reason_name: "Planned Maintenance", category: "Planned" },
    { reason_id: 2, reason_code: "R02", reason_name: "Changeover", category: "Changeover" },
    { reason_id: 3, reason_code: "R03", reason_name: "Motor Breakdown", category: "Breakdown" },
    { reason_id: 4, reason_code: "R04", reason_name: "Sensor Fault", category: "Breakdown" },
    { reason_id: 5, reason_code: "R05", reason_name: "Tool Change", category: "Changeover" },
    { reason_id: 6, reason_code: "R06", reason_name: "Material Shortage", category: "Material" },
    { reason_id: 7, reason_code: "R07", reason_name: "Waiting Operator", category: "Other" },
    { reason_id: 8, reason_code: "R08", reason_name: "Quality Check", category: "Quality" },
    { reason_id: 9, reason_code: "R09", reason_name: "Jam", category: "Breakdown" },
    { reason_id: 10, reason_code: "R10", reason_name: "Power Outage", category: "Other" },
  ];

  const materialUnits = ["pcs", "kg", "m", "L"];
  const materials: Row[] = Array.from({ length: 12 }, (_, i) => ({
    material_id: i + 1,
    material_code: `M-MAT-${String(i + 1).padStart(3, "0")}`,
    material_name: `Material ${String(i + 1).padStart(3, "0")}`,
    unit: materialUnits[i % materialUnits.length],
    unit_cost: Math.round((0.5 + rnd() * 150) * 100) / 100,
  }));

  // ---------- B. Production orders: mỗi dây chuyền chạy lệnh 72 giờ liên tiếp ----------
  const orderAt: number[][] = lineLetters.map(() => new Array(HOURS).fill(0));
  const orderProduct = new Map<number, number>();
  const productionOrders: Row[] = [];
  lineLetters.forEach((_, li) => {
    for (let k = 0; k < 20; k++) {
      const orderId = li * 20 + k + 1;
      const startH = k * 72 + 6;
      const endH = startH + 72;
      const startMs = BASE + startH * HOUR;
      const running = endH > HOURS;
      const productId = between(1, products.length);
      orderProduct.set(orderId, productId);
      productionOrders.push({
        order_id: orderId,
        order_code: `ORD-2608-${String(orderId).padStart(4, "0")}`,
        product_id: productId,
        line_id: li + 1,
        planned_qty: between(2500, 4000),
        start_time: ts(startMs),
        end_time: running ? null : ts(startMs + 72 * HOUR),
        status: running ? "Running" : "Completed",
      });
      for (let h = startH; h < Math.min(endH, HOURS); h++) orderAt[li][h] = orderId;
    }
  });

  // ---------- Downtime trước (cần để tính sản lượng từng giờ) ----------
  const downtimeEvents: Row[] = [];
  const downMinutes = new Map<string, number>();
  lineLetters.forEach((_, li) => {
    for (let h = 0; h < HOURS; h++) {
      const orderId = orderAt[li][h];
      if (!orderId) continue;
      for (let j = 0; j < 3; j++) {
        const machineId = li * 3 + j + 1;
        if (rnd() >= 0.04) continue; // khoảng 1 sự kiện/ngày/máy
        const startMin = between(0, 54);
        const dur = between(5, 60 - startMin);
        const startMs = BASE + h * HOUR + startMin * 60_000;
        downtimeEvents.push({
          downtime_id: downtimeEvents.length + 1,
          machine_id: machineId,
          order_id: orderId,
          reason_id: between(1, downtimeReasons.length),
          start_time: ts(startMs),
          end_time: ts(startMs + dur * 60_000),
          duration_minutes: dur,
        });
        const key = `${machineId}:${h}`;
        downMinutes.set(key, (downMinutes.get(key) ?? 0) + dur);
      }
    }
  });

  // ---------- Sản lượng theo giờ, máy, cycle time, kiểm tra chất lượng ----------
  const productionRecords: Row[] = [];
  const machineCycles: Row[] = [];
  const qualityInspections: Row[] = [];
  lineLetters.forEach((_, li) => {
    for (let h = 0; h < HOURS; h++) {
      const orderId = orderAt[li][h];
      if (!orderId) continue;
      const product = products[(orderProduct.get(orderId) ?? 1) - 1];
      const hourMs = BASE + h * HOUR;
      const hourOfDay = (h % 24);
      const shiftId = hourOfDay >= 6 && hourOfDay < 14 ? 1 : hourOfDay >= 14 && hourOfDay < 22 ? 2 : 3;
      const pool = operatorsByShift[shiftId];

      for (let j = 0; j < 3; j++) {
        const machineId = li * 3 + j + 1;
        const down = downMinutes.get(`${machineId}:${h}`) ?? 0;
        const runSec = (60 - down) * 60;
        const cycle = product.standard_cycle_sec as number;
        const actualCycle = cycle * (1 + rnd() * 0.08);
        const total = Math.floor((runSec / actualCycle) * (0.92 + rnd() * 0.08));
        const ng = Math.round(total * (0.01 + rnd() * 0.05));
        productionRecords.push({
          record_id: productionRecords.length + 1,
          order_id: orderId,
          machine_id: machineId,
          shift_id: shiftId,
          operator_id: pool.length ? pick(pool) : null,
          // Giữ nguyên giờ, thêm phút và giây ngẫu nhiên trong giờ đó (ví dụ 06:14:37).
          record_time: ts(hourMs + Math.floor(timeRnd() * HOUR)),
          good_qty: total - ng,
          ng_qty: ng,
          total_qty: total,
        });
        if (h % 2 === 0) {
          machineCycles.push({
            cycle_id: machineCycles.length + 1,
            machine_id: machineId,
            order_id: orderId,
            cycle_start: ts(hourMs),
            cycle_time_sec: Math.round(actualCycle * 100) / 100,
          });
        }
      }

      if (h % 4 === 0) {
        const defect = Math.floor(rnd() * 6);
        qualityInspections.push({
          inspection_id: qualityInspections.length + 1,
          order_id: orderId,
          defect_type_id: defect > 0 ? between(1, defectTypes.length) : null,
          inspector_id: pick(inspectorIds),
          inspected_at: ts(hourMs + 30 * 60_000),
          sample_qty: 50,
          defect_qty: defect,
          result: defect >= 3 ? "NG" : "OK",
        });
      }
    }
  });

  // ---------- Nguyên vật liệu ----------
  const materialTransactions: Row[] = [];
  for (let d = 0; d < DAYS; d += 7) {
    for (const m of materials) {
      materialTransactions.push({
        txn_id: materialTransactions.length + 1,
        material_id: m.material_id as number,
        order_id: null,
        txn_type: "IN",
        qty: between(500, 2000),
        txn_time: ts(BASE + d * 24 * HOUR + 6 * HOUR),
      });
    }
  }
  for (let d = 0; d < DAYS; d++) {
    lineLetters.forEach((_, li) => {
      const orderId = orderAt[li][d * 24 + 8] || null;
      const m1 = between(1, materials.length);
      let m2 = between(1, materials.length);
      if (m2 === m1) m2 = (m1 % materials.length) + 1;
      for (const m of [m1, m2]) {
        materialTransactions.push({
          txn_id: materialTransactions.length + 1,
          material_id: m,
          order_id: orderId,
          txn_type: "USE",
          qty: between(20, 200),
          txn_time: ts(BASE + d * 24 * HOUR + 8 * HOUR),
        });
      }
      materialTransactions.push({
        txn_id: materialTransactions.length + 1,
        material_id: between(1, materials.length),
        order_id: orderId,
        txn_type: "OUT",
        qty: between(10, 100),
        txn_time: ts(BASE + d * 24 * HOUR + 20 * HOUR),
      });
    });
  }

  return {
    departments,
    shifts,
    employees,
    production_lines: productionLines,
    machines,
    products,
    production_orders: productionOrders,
    production_records: productionRecords,
    machine_cycles: machineCycles,
    defect_types: defectTypes,
    quality_inspections: qualityInspections,
    downtime_reasons: downtimeReasons,
    downtime_events: downtimeEvents,
    materials,
    material_transactions: materialTransactions,
  };
}

/** Tổng số dòng — dùng để kiểm tra khoảng 10.000–50.000 dòng. */
export function countRows(tables: Tables) {
  return Object.values(tables).reduce((n, rows) => n + rows.length, 0);
}
