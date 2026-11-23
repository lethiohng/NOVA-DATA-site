import { Section } from "@/components/ui";

/** Mô tả bộ dữ liệu NOVA MANUFACTURING, hiển thị ở các trang khóa học SQL. */
const PARAGRAPHS = [
  "NOVA MANUFACTURING mô phỏng hoạt động của một nhà máy gia công cơ khí, chuyên sản xuất các chi tiết như vỏ cảm biến, giá đỡ động cơ, nắp bánh răng và thân van.",
  "Nhà máy có 4 dây chuyền, 12 máy móc (CNC, lắp ráp, dập), 3 ca làm việc và 36 nhân viên. Bộ dữ liệu bao gồm 8 sản phẩm, 80 lệnh sản xuất và 60 ngày hoạt động, từ 01/08/2026 đến 30/09/2026.",
  "Dữ liệu được thiết kế để thực hành SQL, Power BI và phân tích các hoạt động sản xuất như sản lượng, hiệu suất máy móc, tiến độ sản xuất và chất lượng sản phẩm.",
  "Lưu ý: Dữ liệu được tạo tự động phục vụ học tập, hoàn toàn giả lập và không đại diện cho bất kỳ doanh nghiệp thực tế nào.",
];

export function DatasetNote() {
  return (
    <Section title="Bộ dữ liệu NOVA MANUFACTURING">
      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        {PARAGRAPHS.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </Section>
  );
}
