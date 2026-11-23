"use client";

import { useEffect, useState } from "react";

/* Nút sao chép đoạn code vào clipboard. Đổi thành "Đã chép" trong 2 giây. */
export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Trình duyệt không cho phép truy cập clipboard: người dùng vẫn có thể chọn và chép thủ công.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="ml-auto rounded-md border border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:border-sky-500 hover:text-white"
    >
      {copied ? "Đã chép ✓" : "Sao chép"}
    </button>
  );
}
