"use client";

import { useEffect, useRef, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { renderRichHtml, sanitizeRich } from "@/lib/rich";

/* Trình soạn thảo kiểu Word: chọn chữ rồi bấm nút định dạng, hoặc chèn ảnh từ máy (lưu lên kho ảnh Supabase).
   Lưu dưới dạng HTML đã lọc. Nội dung cũ là văn bản thuần vẫn hiển thị đúng xuống dòng. */

const IMAGE_BUCKET = "content-images";
const MAX_IMAGE_MB = 5;

/* Tải ảnh lên kho ảnh và trả về đường dẫn công khai. */
export async function uploadContentImage(file: File): Promise<string> {
  const supabase = createSupabaseBrowserClient();
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
  const path = `content/${Date.now()}-${safeName}`;
  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw new Error(error.message);
  return supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

const BTN = "rounded-md border border-slate-300 bg-white px-2.5 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800";

export default function RichTextEditor({ value, onChange, label, minRows = 4 }: { value: string; onChange: (html: string) => void; label: string; minRows?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const emitted = useRef<string | null>(null); // giá trị gần nhất do chính ô này gửi lên
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Chỉ đặt lại nội dung khi giá trị đến từ bên ngoài (không phải do đang gõ), tránh nhảy con trỏ.
  useEffect(() => {
    if (!ref.current || value === emitted.current) return;
    ref.current.innerHTML = renderRichHtml(value);
    emitted.current = value;
  }, [value]);

  const emit = () => {
    const html = sanitizeRich(ref.current?.innerHTML ?? "");
    emitted.current = html;
    onChange(html);
  };

  const run = (command: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    emit();
  };

  // Đặt con trỏ cuối nội dung nếu trước đó chưa có vùng chọn trong ô (ví dụ sau khi chọn file ảnh).
  const placeCaretAtEnd = () => {
    const el = ref.current;
    if (!el) return;
    el.focus();
    const sel = window.getSelection();
    if (sel && sel.rangeCount && el.contains(sel.anchorNode)) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  const addLink = () => {
    const url = window.prompt("Đường dẫn (bắt đầu bằng https:// hoặc /):", "https://");
    if (!url) return;
    run("createLink", url);
  };

  const pickImage = async (file: File) => {
    setErr(null);
    if (!file.type.startsWith("image/")) return setErr("Chỉ chọn file ảnh.");
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) return setErr(`Ảnh tối đa ${MAX_IMAGE_MB} MB.`);
    setBusy(true);
    try {
      const url = await uploadContentImage(file);
      const alt = file.name.replace(/\.[^.]+$/, "").replace(/[<>"&]/g, "");
      placeCaretAtEnd();
      document.execCommand("insertHTML", false, `<img src="${url}" alt="${alt}"><br>`);
      emit();
    } catch (e) {
      setErr(`Không tải được ảnh: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  };

  // Giữ vùng chọn khi bấm nút trên thanh công cụ.
  const keep = (e: React.MouseEvent) => e.preventDefault();

  return (
    <div className="block text-sm">
      <span className="mb-1 block font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <div className="mb-1 flex flex-wrap items-center gap-1.5">
        <button type="button" className={BTN} onMouseDown={keep} onClick={() => run("bold")} title="In đậm">
          <b>B</b>
        </button>
        <button type="button" className={BTN} onMouseDown={keep} onClick={() => run("italic")} title="In nghiêng">
          <i>I</i>
        </button>
        <button type="button" className={BTN} onMouseDown={keep} onClick={() => run("underline")} title="Gạch chân">
          <u>U</u>
        </button>
        <button type="button" className={BTN} onMouseDown={keep} onClick={() => run("formatBlock", "h3")} title="Tiêu đề">
          H
        </button>
        <button type="button" className={BTN} onMouseDown={keep} onClick={() => run("insertUnorderedList")} title="Danh sách chấm">
          • List
        </button>
        <button type="button" className={BTN} onMouseDown={keep} onClick={() => run("insertOrderedList")} title="Danh sách số">
          1. List
        </button>
        <button type="button" className={BTN} onMouseDown={keep} onClick={addLink} title="Chèn liên kết">
          Link
        </button>
        <label className={`${BTN} cursor-pointer ${busy ? "pointer-events-none opacity-60" : ""}`} title="Chèn ảnh từ máy">
          {busy ? "Đang tải ảnh…" : "Ảnh"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={busy}
            onChange={(e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (f) void pickImage(f);
            }}
          />
        </label>
        <button type="button" className={BTN} onMouseDown={keep} onClick={() => run("removeFormat")} title="Xóa định dạng">
          Xóa định dạng
        </button>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        onBlur={emit}
        style={{ minHeight: `${minRows * 1.6}rem` }}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 leading-relaxed focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 [&_a]:text-sky-600 [&_a]:underline [&_h3]:my-2 [&_h3]:text-lg [&_h3]:font-bold [&_img]:my-2 [&_img]:max-w-full [&_img]:rounded-lg [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
      />
      {err && <span className="mt-1 block text-xs text-rose-600">{err}</span>}
      <span className="mt-1 block text-xs text-slate-500">Chọn chữ rồi bấm nút định dạng, giống Word. Bấm “Ảnh” để chèn ảnh từ máy.</span>
    </div>
  );
}
