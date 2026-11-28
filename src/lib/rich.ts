/* Nội dung dạng văn bản có định dạng (HTML lọc sẵn), dùng cho bài viết, dự án, khóa học, bài tập và bước Career.
   Chỉ dùng regex, không phụ thuộc DOM, nên chạy được cả trên server lẫn trình duyệt.
   Nội dung cũ là văn bản thuần vẫn hiển thị được: xuống dòng thành ngắt dòng, dòng ![mô tả](đường-dẫn) thành ảnh. */

const ALLOWED = new Set(["b", "strong", "i", "em", "u", "br", "p", "ul", "ol", "li", "h3", "h4", "a", "img"]);

// Chỉ cho đường dẫn http, https hoặc nội bộ (không cho javascript: hay //domain khác).
const SAFE_URL = /^(https?:|mailto:|\/(?!\/))/i;

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeText(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Giữ lại các thẻ định dạng cơ bản, bỏ mọi thẻ và thuộc tính khác. */
export function sanitizeRich(html: string): string {
  const noScripts = html.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "");
  return noScripts.replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (match, rawTag: string, attrs: string) => {
    const tag = rawTag.toLowerCase();
    if (!ALLOWED.has(tag)) return "";
    if (match.startsWith("</")) return tag === "br" || tag === "img" ? "" : `</${tag}>`;
    if (tag === "a") {
      const href = /href\s*=\s*"([^"]*)"/i.exec(attrs)?.[1] ?? "";
      if (!SAFE_URL.test(href)) return "<a>";
      return `<a href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer">`;
    }
    if (tag === "img") {
      const src = /src\s*=\s*"([^"]*)"/i.exec(attrs)?.[1] ?? "";
      if (!SAFE_URL.test(src)) return "";
      const alt = /alt\s*=\s*"([^"]*)"/i.exec(attrs)?.[1] ?? "";
      return `<img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}">`;
    }
    if (tag === "br") return "<br>";
    return `<${tag}>`;
  });
}

// Có thẻ định dạng thì coi là HTML; ngược lại là văn bản thuần cũ.
const HTML_HINT = /<(p|br|ul|ol|li|b|strong|i|em|u|h3|h4|a|img)[\s/>]/i;

/** Chuyển nội dung bất kỳ (HTML hoặc văn bản thuần cũ) thành HTML an toàn để hiển thị. */
export function renderRichHtml(text: string): string {
  if (!text) return "";
  if (HTML_HINT.test(text)) return sanitizeRich(text);
  const lines = text.split("\n").map((line) => {
    const img = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (img) return `<img src="${escapeAttr(img[2])}" alt="${escapeAttr(img[1])}">`;
    return escapeText(line);
  });
  return sanitizeRich(lines.join("<br>"));
}

/** Nội dung dạng một dòng (tiêu đề, mô tả ngắn): bỏ định dạng, giữ chữ. */
export function stripHtml(text: string): string {
  return renderRichHtml(text)
    .replace(/<br>/gi, " ")
    .replace(/<img[^>]*>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .trim();
}
