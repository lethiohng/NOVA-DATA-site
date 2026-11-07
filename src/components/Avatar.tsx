"use client";

import { useState } from "react";

/* Ảnh đại diện từ Google. Gửi referrerPolicy="no-referrer" để Google không chặn ảnh, và hiện chữ cái đầu nếu ảnh vẫn lỗi. */
export default function Avatar({ src, name, className }: { src?: string | null; name: string; className: string }) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={`rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 ${className}`}
      />
    );
  }

  return (
    <span className={`flex items-center justify-center rounded-full bg-navy-100 text-xs font-semibold text-navy-800 dark:bg-navy-900 dark:text-navy-100 ${className}`}>
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
