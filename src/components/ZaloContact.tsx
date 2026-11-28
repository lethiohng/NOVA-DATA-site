"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useLang } from "@/lib/i18n";

export const ZALO_PHONE = "0328772486";
export const ZALO_URL = `https://zalo.me/${ZALO_PHONE}`;
// WhatsApp dùng số quốc tế, bỏ số 0 đầu và thêm mã Việt Nam 84.
export const WHATSAPP_URL = `https://wa.me/84${ZALO_PHONE.slice(1)}`;
export const FACEBOOK_URL = "https://www.facebook.com/NovaManufacturingBIE";

/* Khối kết bạn Zalo: số điện thoại, mã QR và lý do nên kết bạn (hỗ trợ và nhóm học tập). */
export default function ZaloContact() {
  const { lang } = useLang();
  const vi = lang === "vi";
  const [qr, setQr] = useState<string | null>(null);

  // Tạo mã QR trên trình duyệt sau khi mount, nên không lệch với HTML từ server.
  useEffect(() => {
    QRCode.toDataURL(ZALO_URL, { width: 320, margin: 1, color: { dark: "#0f172a", light: "#ffffff" } }).then(setQr);
  }, []);

  return (
    <div className="mt-6 flex flex-col items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm sm:flex-row dark:border-slate-800 dark:bg-slate-900">
      {qr ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={qr} alt={vi ? "Mã QR kết bạn Zalo Nova Data" : "Nova Data Zalo QR code"} width={160} height={160} className="h-40 w-40 shrink-0 rounded-xl border border-slate-200" />
      ) : (
        <div aria-hidden className="h-40 w-40 shrink-0 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
      )}
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">Zalo</p>
        <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Nova Data</p>
        <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
          {vi ? "Số điện thoại" : "Phone"}: <span className="font-semibold">0328 772 486</span>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {vi
            ? "Kết bạn Zalo để được hỗ trợ nhanh hơn và được thêm vào nhóm học tập, trao đổi cùng cộng đồng."
            : "Add us on Zalo for faster support and an invitation to the study and discussion group."}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
          >
            {vi ? "Kết bạn trên Zalo" : "Add on Zalo"}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
          >
            {vi ? "Nhắn trên WhatsApp" : "Chat on WhatsApp"}
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            {vi ? "Nhắn tin Facebook" : "Message on Facebook"}
          </a>
        </div>
      </div>
    </div>
  );
}
