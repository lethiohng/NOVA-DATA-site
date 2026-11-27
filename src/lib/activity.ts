/* Ngày học và chuỗi ngày liên tiếp, tính từ thời điểm hoàn thành bài, chủ đề và bài tập (theo giờ của trình duyệt). */

const DAY_MS = 86400000;

/** Khóa ngày dạng YYYY-MM-DD theo giờ địa phương. */
export function dayKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

/** Tập các ngày có hoạt động học từ danh sách thời điểm. */
export function activeDaySet(timestamps: string[]): Set<string> {
  return new Set(timestamps.map((t) => dayKey(new Date(t))));
}

/** Số ngày liên tiếp kết thúc hôm nay. Nếu hôm nay chưa học thì tính từ hôm qua, để chuỗi không bị coi là đứt ngay trong ngày. */
export function currentStreak(days: Set<string>, today: Date = new Date()): number {
  const d = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12);
  if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (days.has(dayKey(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

/** Chuỗi ngày liên tiếp dài nhất từng có. */
export function longestStreak(days: Set<string>): number {
  const sorted = [...days].sort();
  let best = 0;
  let run = 0;
  let prev: Date | null = null;
  for (const k of sorted) {
    const [y, m, dd] = k.split("-").map(Number);
    const cur = new Date(y, m - 1, dd, 12);
    run = prev && Math.round((cur.getTime() - prev.getTime()) / DAY_MS) === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    prev = cur;
  }
  return best;
}

/** Lưới lịch tháng, tuần bắt đầu từ thứ Hai. Ô trống là null. */
export function monthWeeks(year: number, month: number): (number | null)[][] {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [...Array<null>(offset).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}
