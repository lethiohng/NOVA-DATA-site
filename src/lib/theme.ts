/* Chế độ giao diện: sáng, tối, hoặc theo cài đặt của hệ điều hành. Lưu trong localStorage (khóa nova-theme). */

export type Theme = "system" | "light" | "dark";

export const THEME_KEY = "nova-theme";

export function readTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === "light" || saved === "dark" ? saved : "system";
  } catch {
    return "system"; // localStorage có thể bị chặn
  }
}

export function applyTheme(theme: Theme) {
  const dark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}

export function saveTheme(theme: Theme) {
  try {
    if (theme === "system") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* bỏ qua — giao diện vẫn đổi trong phiên hiện tại */
  }
  applyTheme(theme);
}

/* Đoạn script chạy trước khi trang vẽ, để không bị nháy sáng rồi mới chuyển tối. Giữ đồng bộ với applyTheme. */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");var d=t==="dark"||((t!=="light")&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;
