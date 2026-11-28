import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui";
import ZaloContact from "@/components/ZaloContact";

export const metadata: Metadata = {
  title: "Gói Pro trọn đời",
  description: "Gói Pro trọn đời 499.000đ: xem toàn bộ bài SQL, Learn, Luyện tập và dự án.",
};

const BENEFITS = [
  "Xem toàn bộ bài học SQL Basic, Intermediate và Advanced",
  "Xem toàn bộ bài viết trong Kiến thức và các khóa chủ đề",
  "Làm toàn bộ bài tập SQL trong mục Luyện tập",
  "Xem toàn bộ dự án",
  "Truy cập trọn đời, không gia hạn",
];

export default function ProPage() {
  return (
    <>
      <PageHeader eyebrow="Pro" title="Gói Pro trọn đời" description="Một lần thanh toán, học mọi nội dung của Nova Data mãi mãi." />

      <div className="mb-10 rounded-2xl border border-violet-200 bg-violet-50 p-6 dark:border-violet-900 dark:bg-violet-950/40">
        <p className="text-sm font-semibold text-violet-700 dark:text-violet-300">Giá trọn đời</p>
        <p className="mt-1 text-4xl font-bold text-slate-900 dark:text-white">499.000đ</p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Không thu phí định kỳ. Tài khoản thường vẫn xem được 5 mục đầu của mỗi danh sách.</p>
      </div>

      <Section title="Bạn nhận được">
        <ul className="list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300">
          {BENEFITS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </Section>

      <Section title="Cách đăng ký">
        <ol className="list-decimal space-y-2 pl-6 text-slate-700 dark:text-slate-300">
          <li>Đăng nhập bằng Google để có tài khoản.</li>
          <li>Nhắn Zalo cho Nova Data (số hoặc mã QR bên dưới) và cho biết email tài khoản của bạn.</li>
          <li>Chuyển khoản 499.000đ theo hướng dẫn. Nova Data sẽ kích hoạt Pro cho tài khoản của bạn sau khi nhận được thanh toán.</li>
        </ol>
        <div className="mt-6">
          <ZaloContact />
        </div>
      </Section>
    </>
  );
}
