"use client";

import { Section } from "@/components/ui";
import { useLang } from "@/lib/i18n";

/* Mô tả bộ dữ liệu NOVA MANUFACTURING, hiển thị ở các trang khóa học SQL. Có cả tiếng Việt và tiếng Anh. */
const TEXT = {
  vi: {
    title: "Bộ dữ liệu NOVA MANUFACTURING",
    paragraphs: [
      "NOVA MANUFACTURING mô phỏng hoạt động của một nhà máy gia công cơ khí, chuyên sản xuất các chi tiết như vỏ cảm biến, giá đỡ động cơ, nắp bánh răng và thân van.",
      "Nhà máy có 4 dây chuyền, 12 máy móc (CNC, lắp ráp, dập), 3 ca làm việc và 36 nhân viên. Bộ dữ liệu bao gồm 8 sản phẩm, 80 lệnh sản xuất và 60 ngày hoạt động, từ 01/08/2026 đến 30/09/2026.",
      "Dữ liệu được thiết kế để thực hành SQL, Power BI và phân tích các hoạt động sản xuất như sản lượng, hiệu suất máy móc, tiến độ sản xuất và chất lượng sản phẩm.",
      "Lưu ý: Dữ liệu được tạo tự động phục vụ học tập, hoàn toàn giả lập và không đại diện cho bất kỳ doanh nghiệp thực tế nào.",
    ],
  },
  en: {
    title: "NOVA MANUFACTURING dataset",
    paragraphs: [
      "NOVA MANUFACTURING simulates a mechanical machining plant that produces parts such as sensor housings, motor brackets, gear covers and valve bodies.",
      "The plant has 4 production lines, 12 machines (CNC, assembly, press), 3 shifts and 36 employees. The dataset includes 8 products, 80 production orders and 60 days of operation, from 01/08/2026 to 30/09/2026.",
      "The data is designed for practicing SQL, Power BI, and analyzing production activity such as output, machine performance, production progress and product quality.",
      "Note: The data is generated automatically for learning purposes. It is entirely simulated and does not represent any real company.",
    ],
  },
};

export function DatasetNote() {
  const { lang } = useLang();
  const T = TEXT[lang];
  return (
    <Section title={T.title}>
      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        {T.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </Section>
  );
}
