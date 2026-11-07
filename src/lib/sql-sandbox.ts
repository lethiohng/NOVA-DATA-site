import { PGlite } from "@electric-sql/pglite";

/*
 * Sân chơi SQL chạy ngay trên trình duyệt (PostgreSQL qua PGlite).
 * Mỗi truy vấn chạy trong một transaction rồi ROLLBACK, nên người dùng thử DELETE/CREATE
 * mà không làm thay đổi dữ liệu mẫu cho người khác.
 */

export type QueryResult = {
  columns: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
  ms: number;
  error?: string;
};

export type TableInfo = {
  name: string;
  rowCount: number;
  columns: { name: string; type: string }[];
  sample: Record<string, unknown>[];
};

export function createSandbox(loadSql: () => Promise<string>) {
  let dbPromise: Promise<PGlite> | null = null;

  const get = () => {
    if (!dbPromise) {
      dbPromise = (async () => {
        const db = new PGlite();
        await db.exec(await loadSql());
        return db;
      })();
    }
    return dbPromise;
  };

  async function run(sql: string): Promise<QueryResult> {
    const db = await get();
    const started = performance.now();
    try {
      await db.exec("BEGIN");
      const results = await db.exec(sql);
      const last = results[results.length - 1];
      const rows = (last?.rows ?? []) as Record<string, unknown>[];
      return {
        columns: (last?.fields ?? []).map((f) => f.name),
        rows,
        rowCount: rows.length,
        ms: Math.round(performance.now() - started),
      };
    } catch (err) {
      return { columns: [], rows: [], rowCount: 0, ms: Math.round(performance.now() - started), error: (err as Error).message };
    } finally {
      await db.exec("ROLLBACK").catch(() => {});
    }
  }

  async function listTables(): Promise<TableInfo[]> {
    const db = await get();
    const cols = await db.query<{ table_name: string; column_name: string; data_type: string }>(
      `SELECT table_name, column_name, data_type FROM information_schema.columns
       WHERE table_schema = 'public' ORDER BY table_name, ordinal_position`,
    );
    const byTable = new Map<string, { name: string; type: string }[]>();
    for (const c of cols.rows) {
      const list = byTable.get(c.table_name) ?? [];
      list.push({ name: c.column_name, type: c.data_type });
      byTable.set(c.table_name, list);
    }
    const infos: TableInfo[] = [];
    for (const [name, columns] of byTable) {
      const count = await db.query<{ n: number }>(`SELECT COUNT(*)::int AS n FROM ${name}`);
      const sample = await db.query<Record<string, unknown>>(`SELECT * FROM ${name} LIMIT 5`);
      infos.push({ name, rowCount: count.rows[0].n, columns, sample: sample.rows });
    }
    return infos;
  }

  /**
   * Chấm bài: chạy cả câu của người dùng và đáp án, rồi so kết quả.
   * So theo giá trị từng cột (không cần đúng tên alias). Nếu đáp án có ORDER BY thì so theo thứ tự dòng.
   */
  async function check(userSql: string, expectedSql: string): Promise<Verdict> {
    const user = await run(userSql);
    if (user.error) return { status: "error", message: user.error };

    const expected = await run(expectedSql);
    if (expected.error) return { status: "wrong", message: "" };

    // Đáp án không trả về bảng (ví dụ CREATE VIEW): chỉ cần câu của người dùng chạy được.
    if (!expected.columns.length) return { status: "ok-no-result", message: "" };

    if (user.columns.length !== expected.columns.length) {
      return { status: "wrong", message: `${user.columns.length} cột, đáp án có ${expected.columns.length} cột` };
    }
    if (user.rowCount !== expected.rowCount) {
      return { status: "wrong", message: `${user.rowCount} dòng, đáp án có ${expected.rowCount} dòng` };
    }

    const normalize = (rows: Record<string, unknown>[], columns: string[]) =>
      rows.map((row) => columns.map((c) => normValue(row[c])).join("|"));
    const userRows = normalize(user.rows, user.columns);
    const expectedRows = normalize(expected.rows, expected.columns);
    const ordered = /\bORDER\s+BY\b/i.test(expectedSql);
    const sortedUser = ordered ? userRows : [...userRows].sort();
    const sortedExpected = ordered ? expectedRows : [...expectedRows].sort();
    const same = sortedUser.every((r, i) => r === sortedExpected[i]);

    return same ? { status: "ok", message: "" } : { status: "wrong", message: "Số dòng và số cột khớp, nhưng giá trị khác đáp án" };
  }

  return { run, listTables, check };
}

/** Sân chơi dùng chung cho trang web: nạp file SQL từ public/data một lần. */
export const sandbox = createSandbox(() => fetch("/data/manufacturing.sql").then((r) => r.text()));

export type Verdict = {
  status: "ok" | "wrong" | "error" | "ok-no-result";
  message: string;
};

/** Chuẩn hóa một giá trị để so sánh: số làm tròn 4 chữ số, NULL thống nhất. */
function normValue(v: unknown): string {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "number") return v.toFixed(4);
  if (typeof v === "string" && /^-?\d+(\.\d+)?$/.test(v)) return Number(v).toFixed(4);
  return String(v);
}
