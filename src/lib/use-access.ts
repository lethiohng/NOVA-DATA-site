"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

/* Quyền xem nội dung:
   - Mục được admin đánh dấu miễn phí (bảng free_items) thì mọi người đã đăng nhập xem được.
   - Pro (is_premium, gói trọn đời) xem hết.
   - Khóa đã mua riêng (course_access) xem hết khóa đó.
   Các mục còn lại khóa với tài khoản thường. */

export type ItemType = "lesson" | "article" | "exercise" | "project";

export type Access = {
  ready: boolean;
  signedIn: boolean;
  pro: boolean;
  /** Mục này được admin mở miễn phí. */
  isFree: (type: ItemType, key: string) => boolean;
  /** Có quyền xem toàn bộ khóa này (Pro hoặc đã mua khóa đó). */
  hasCourse: (courseKey: string) => boolean;
  /** Mục này có bị khóa với người dùng hiện tại không. courseKey dùng cho bài học của khóa trả phí. */
  isLocked: (type: ItemType, key: string, courseKey?: string | null) => boolean;
};

export function lessonKey(courseKey: string, lessonId: string): string {
  return `${courseKey}|${lessonId}`;
}

export function useAccess(): Access {
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [state, setState] = useState<{ ready: boolean; signedIn: boolean; pro: boolean; courses: Set<string>; free: Set<string> }>({
    ready: false,
    signedIn: false,
    pro: false,
    courses: new Set(),
    free: new Set(),
  });

  useEffect(() => {
    let alive = true;
    (async () => {
      const [{ data: free }, { data: auth }] = await Promise.all([
        supabase.from("free_items").select("item_type, item_key"),
        supabase.auth.getUser(),
      ]);
      const freeSet = new Set((free ?? []).map((r: { item_type: string; item_key: string }) => `${r.item_type}|${r.item_key}`));
      if (!auth.user) {
        if (alive) setState({ ready: true, signedIn: false, pro: false, courses: new Set(), free: freeSet });
        return;
      }
      const [{ data: profile }, { data: rows }] = await Promise.all([
        supabase.from("profiles").select("is_premium").eq("id", auth.user.id).maybeSingle(),
        supabase.from("course_access").select("course").eq("user_id", auth.user.id),
      ]);
      if (alive) {
        setState({
          ready: true,
          signedIn: true,
          pro: Boolean(profile?.is_premium),
          courses: new Set((rows ?? []).map((r: { course: string }) => r.course)),
          free: freeSet,
        });
      }
    })();
    return () => {
      alive = false;
    };
  }, [supabase]);

  const isFree = (type: ItemType, key: string) => state.free.has(`${type}|${key}`);
  const hasCourse = (courseKey: string) => state.pro || state.courses.has(courseKey);
  const isLocked = (type: ItemType, key: string, courseKey?: string | null) => {
    if (isFree(type, key)) return false;
    if (courseKey && hasCourse(courseKey)) return false;
    return !state.pro;
  };

  return { ready: state.ready, signedIn: state.signedIn, pro: state.pro, isFree, hasCourse, isLocked };
}
