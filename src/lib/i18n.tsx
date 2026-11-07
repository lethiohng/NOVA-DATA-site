"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

export type Lang = "vi" | "en";

/** Một chuỗi có hai bản dịch. Nội dung chỉ có một ID, nhiều bản dịch. */
export type Bi = { vi: string; en: string };

const STORAGE_KEY = "nova-lang";
const DEFAULT_LANG: Lang = "vi";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextValue>({
  lang: DEFAULT_LANG,
  setLang: () => {},
});

// Lưu ngôn ngữ trong localStorage và đồng bộ qua useSyncExternalStore.
// Server và lần render đầu luôn dùng DEFAULT_LANG để tránh lệch hydration.
const listeners = new Set<() => void>();

function readStoredLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "en" ? "en" : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG; // localStorage có thể bị chặn
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readStoredLang, () => DEFAULT_LANG);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* bỏ qua — ngôn ngữ vẫn đổi trong phiên hiện tại */
    }
    listeners.forEach((cb) => cb());
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** Lấy chuỗi theo ngôn ngữ hiện tại. */
export function useT() {
  const { lang } = useLang();
  return (text: Bi) => text[lang];
}
