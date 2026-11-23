"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

const FLOWERS = ["🌸", "🌼", "🌷", "🌺", "💮"];
const COUNT = 36;

/* Hiệu ứng hoa rơi khi người học hoàn thành bài. Mỗi lần `trigger` tăng lên sẽ bắn lại, tự tắt sau khoảng 3 giây. */
export default function FlowerBurst({ trigger }: { trigger: number }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    setActive(true);
    const id = window.setTimeout(() => setActive(false), 3200);
    return () => window.clearTimeout(id);
  }, [trigger]);

  // Vị trí và hướng ngẫu nhiên, tạo lại mỗi lần bắn.
  const petals = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        id: `${trigger}-${i}`,
        emoji: FLOWERS[i % FLOWERS.length],
        left: 35 + Math.random() * 30,
        dx: (Math.random() - 0.5) * 60,
        dy: 40 + Math.random() * 45,
        rot: (Math.random() - 0.5) * 720,
        size: 18 + Math.random() * 14,
        delay: Math.random() * 0.25,
      })),
    [trigger],
  );

  if (!active) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="flower-petal"
          style={
            {
              left: `${p.left}%`,
              top: "40%",
              fontSize: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              "--dx": `${p.dx}vw`,
              "--dy": `${p.dy}vh`,
              "--rot": `${p.rot}deg`,
            } as CSSProperties
          }
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
