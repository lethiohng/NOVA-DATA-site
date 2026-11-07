"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { addComment, deleteComment, fetchComments, type ExerciseComment } from "@/lib/comments";
import { useLang } from "@/lib/i18n";
import Avatar from "@/components/Avatar";

const MAX_LENGTH = 2000;
const COLLAPSE_AT = 300;

/** Khu bình luận của một bài tập SQL. Khách chỉ đọc; người đã đăng nhập mới viết và xóa bình luận của mình. */
export default function ExerciseComments({ exerciseId }: { exerciseId: string }) {
  const { lang } = useLang();
  const vi = lang === "vi";
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<ExerciseComment[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    let alive = true;
    fetchComments(supabase, exerciseId)
      .then((list) => {
        if (!alive) return;
        setComments(list);
        setLoaded(true);
      })
      .catch(() => {
        if (!alive) return;
        setError(vi ? "Không tải được bình luận." : "Could not load comments.");
        setLoaded(true);
      });
    return () => {
      alive = false;
    };
  }, [supabase, exerciseId, reloadKey, vi]);

  const send = async () => {
    const text = draft.trim();
    if (!text || busy) return;
    setBusy(true);
    setError(null);
    try {
      await addComment(supabase, exerciseId, text);
      setDraft("");
      setReloadKey((k) => k + 1);
    } catch {
      setError(vi ? "Không gửi được bình luận. Thử lại sau." : "Could not post the comment. Try again.");
    }
    setBusy(false);
  };

  const remove = async (id: string) => {
    setError(null);
    try {
      await deleteComment(supabase, id);
      setReloadKey((k) => k + 1);
    } catch {
      setError(vi ? "Không xóa được bình luận." : "Could not delete the comment.");
    }
  };

  return (
    <section className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
      <h4 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
        {comments.length} {vi ? "bình luận" : comments.length === 1 ? "comment" : "comments"}
      </h4>

      {user ? (
        <div className="mb-6">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                send();
              }
            }}
            maxLength={MAX_LENGTH}
            rows={3}
            aria-label={vi ? "Viết bình luận" : "Write a comment"}
            placeholder={vi ? "Chia sẻ cách làm, đặt câu hỏi hoặc gợi ý..." : "Share your approach, ask a question or give a hint..."}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm leading-relaxed focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
          />
          <div className="mt-2 flex items-center justify-between gap-3 text-xs text-slate-500">
            <span>
              {draft.length}/{MAX_LENGTH} · {vi ? "Ctrl + Enter để gửi" : "Ctrl + Enter to post"}
            </span>
            <button
              type="button"
              onClick={send}
              disabled={busy || !draft.trim()}
              className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-50"
            >
              {busy ? (vi ? "Đang gửi…" : "Posting…") : vi ? "Gửi bình luận" : "Post comment"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
          {vi ? "Đăng nhập để tham gia thảo luận về bài này." : "Sign in to join the discussion on this exercise."}{" "}
          <Link href="/login" className="font-semibold text-sky-600 hover:underline dark:text-sky-400">
            {vi ? "Đăng nhập" : "Sign in"}
          </Link>
        </div>
      )}

      {error && <p className="mb-4 text-sm text-rose-600">{error}</p>}

      {loaded && comments.length === 0 && !error && (
        <p className="text-sm text-slate-500">{vi ? "Chưa có bình luận nào. Hãy là người đầu tiên." : "No comments yet. Be the first."}</p>
      )}

      <ul className="space-y-6">
        {comments.map((c) => (
          <CommentItem key={c.id} comment={c} canDelete={user?.id === c.userId} onDelete={() => remove(c.id)} />
        ))}
      </ul>
    </section>
  );
}

function CommentItem({ comment, canDelete, onDelete }: { comment: ExerciseComment; canDelete: boolean; onDelete: () => void }) {
  const { lang } = useLang();
  const vi = lang === "vi";
  const [expanded, setExpanded] = useState(false);

  const long = comment.body.length > COLLAPSE_AT;
  const shown = long && !expanded ? `${comment.body.slice(0, COLLAPSE_AT)}…` : comment.body;
  // Bình luận có xuống dòng hoặc bắt đầu bằng SELECT/WITH/FROM thì hiển thị như mã.
  const looksLikeCode = /\n/.test(comment.body) || /^\s*(select|with|from)\b/i.test(comment.body);
  const name = comment.name || (vi ? "Người học" : "Learner");
  const date = new Date(comment.createdAt).toLocaleDateString(vi ? "vi-VN" : "en-US");

  return (
    <li className="flex gap-3">
      <Avatar src={comment.avatar} name={name} className="h-9 w-9 shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-slate-900 dark:text-white">{name}</span>
          <span className="text-xs text-slate-500">{date}</span>
          {canDelete && (
            <button type="button" onClick={onDelete} className="ml-auto text-xs font-medium text-slate-500 hover:text-rose-600">
              {vi ? "Xóa" : "Delete"}
            </button>
          )}
        </div>
        <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
          <p className={`whitespace-pre-wrap break-words text-sm leading-relaxed ${looksLikeCode ? "font-mono text-[13px]" : ""}`}>{shown}</p>
          {long && (
            <button type="button" onClick={() => setExpanded((v) => !v)} className="mt-2 text-sm font-medium text-sky-600 hover:underline dark:text-sky-400">
              {expanded ? (vi ? "Thu gọn" : "Show less") : vi ? "Xem thêm" : "Show more"}
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
