"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { youtubeEmbed } from "@/lib/youtube";
import { Section } from "@/components/ui";

/* Video YouTube của bài học, lấy từ bảng lesson_videos. Không có link thì không hiện gì. */
export default function LessonVideo({ courseKey, lessonId, title }: { courseKey: string; lessonId: string; title?: string }) {
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    supabase
      .from("lesson_videos")
      .select("youtube_url")
      .eq("course_key", courseKey)
      .eq("lesson_id", lessonId)
      .maybeSingle()
      .then(({ data }) => {
        if (alive) setSrc(data?.youtube_url ? youtubeEmbed(data.youtube_url) : null);
      });
    return () => {
      alive = false;
    };
  }, [supabase, courseKey, lessonId]);

  if (!src) return null;

  return (
    <Section title="Video bài học">
      <div className="aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-sm dark:border-slate-800">
        <iframe
          src={src}
          title={title ?? "Video bài học"}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </Section>
  );
}
