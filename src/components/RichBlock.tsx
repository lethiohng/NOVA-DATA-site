import { renderRichHtml } from "@/lib/rich";

/* Khối nội dung có định dạng (đậm, nghiêng, tiêu đề, danh sách, liên kết, ảnh). Dùng được ở server và client. */
export default function RichBlock({ text, className = "leading-relaxed" }: { text: string; className?: string }) {
  if (!text) return null;
  return (
    <div
      className={`rich ${className} [&_a]:text-sky-600 [&_a]:underline [&_h3]:mt-4 [&_h3]:text-lg [&_h3]:font-bold [&_img]:mt-4 [&_img]:w-full [&_img]:rounded-2xl [&_img]:border [&_img]:border-slate-200 [&_img]:bg-white [&_img]:p-2 [&_img]:shadow-sm dark:[&_img]:border-slate-800 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-6`}
      dangerouslySetInnerHTML={{ __html: renderRichHtml(text) }}
    />
  );
}
