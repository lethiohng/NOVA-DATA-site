import { youtubeEmbed } from "@/lib/youtube";

/* Khung video YouTube tỉ lệ 16:9. Không có link hợp lệ thì không hiện gì. Dùng được ở server và client. */
export default function YouTubeEmbed({ url, title = "Video" }: { url?: string | null; title?: string }) {
  const src = url ? youtubeEmbed(url) : null;
  if (!src) return null;
  return (
    <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-sm dark:border-slate-800">
      <iframe
        src={src}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
