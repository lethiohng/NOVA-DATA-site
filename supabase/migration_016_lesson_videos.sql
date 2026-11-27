-- Migration 016: link YouTube cho từng bài học SQL (Basic, Intermediate, Advanced).
-- Chạy trong SQL Editor sau migration_015. Nội dung bài vẫn nằm trong code; chỉ link video được lưu ở đây.
-- Khách đọc được link (để hiện video trên trang bài học); chỉ admin mới thêm, sửa hoặc xóa.

create table if not exists lesson_videos (
  course_key   text not null references courses(key),
  lesson_id    text not null,
  youtube_url  text not null,
  updated_at   timestamptz not null default now(),
  primary key (course_key, lesson_id)
);

alter table lesson_videos enable row level security;

drop policy if exists "public read lesson videos" on lesson_videos;
create policy "public read lesson videos" on lesson_videos
  for select using (true);

drop policy if exists "admin insert lesson videos" on lesson_videos;
create policy "admin insert lesson videos" on lesson_videos
  for insert to authenticated with check (is_admin());

drop policy if exists "admin update lesson videos" on lesson_videos;
create policy "admin update lesson videos" on lesson_videos
  for update to authenticated using (is_admin()) with check (is_admin());

drop policy if exists "admin delete lesson videos" on lesson_videos;
create policy "admin delete lesson videos" on lesson_videos
  for delete to authenticated using (is_admin());
