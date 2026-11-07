/** Hình minh họa trang trí cho tiêu đề khóa SQL: laptop với dòng lệnh, khối cơ sở dữ liệu, biểu đồ và đường bay. Chỉ mang tính thị giác. */
export default function SqlHeaderArt() {
  return (
    <svg viewBox="0 0 320 180" className="h-auto w-full" aria-hidden="true">
      {/* đường bay đứt nét */}
      <path d="M40 120 C 90 70, 120 150, 160 110" fill="none" stroke="#f87171" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" />
      <path d="M205 30 L240 18 L222 44 Z" fill="#60a5fa" />
      <path d="M205 30 L222 44" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 4" fill="none" />

      {/* khối cơ sở dữ liệu */}
      <ellipse cx="50" cy="108" rx="34" ry="10" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1.5" />
      <rect x="16" y="108" width="68" height="36" fill="#93c5fd" />
      <ellipse cx="50" cy="144" rx="34" ry="10" fill="#93c5fd" stroke="#60a5fa" strokeWidth="1.5" />
      <path d="M16 126 A34 10 0 0 0 84 126" fill="none" stroke="#60a5fa" strokeWidth="1.5" />

      {/* laptop */}
      <rect x="120" y="34" width="132" height="88" rx="8" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
      <text x="134" y="60" fill="#f1f5f9" fontFamily="monospace" fontSize="13" fontWeight="700">SQL&gt;</text>
      <rect x="134" y="70" width="70" height="4" rx="2" fill="#f87171" />
      <rect x="134" y="80" width="96" height="4" rx="2" fill="#34d399" />
      <rect x="134" y="90" width="58" height="4" rx="2" fill="#60a5fa" />
      <rect x="134" y="100" width="84" height="4" rx="2" fill="#fbbf24" />
      <rect x="104" y="122" width="160" height="12" rx="6" fill="#cbd5e1" />
      <rect x="150" y="124" width="28" height="4" rx="2" fill="#94a3b8" />

      {/* thẻ biểu đồ */}
      <rect x="268" y="14" width="46" height="54" rx="6" fill="#ffffff" stroke="#e2e8f0" />
      <rect x="276" y="44" width="6" height="16" fill="#60a5fa" />
      <rect x="287" y="36" width="6" height="24" fill="#f87171" />
      <rect x="298" y="28" width="6" height="32" fill="#60a5fa" />
    </svg>
  );
}
