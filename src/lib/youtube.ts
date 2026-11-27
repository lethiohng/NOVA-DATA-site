/* Đọc mã video YouTube từ nhiều dạng link và tạo link nhúng. Trả về null nếu không nhận ra link. */

const ID_PATTERN = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

export function youtubeId(url: string): string | null {
  const m = url.trim().match(ID_PATTERN);
  return m ? m[1] : null;
}

export function youtubeEmbed(url: string): string | null {
  const id = youtubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}
