-- Migration 005 — bình luận cho từng bài tập SQL.
-- Chạy trong SQL Editor của Supabase sau migration_004.

create table if not exists exercise_comments (
  id          uuid primary key default gen_random_uuid(),
  exercise_id uuid not null references exercises(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  body        text not null check (char_length(body) between 1 and 2000),
  created_at  timestamptz not null default now()
);

create index if not exists exercise_comments_exercise_idx on exercise_comments (exercise_id, created_at desc);

alter table exercise_comments enable row level security;

-- Ai cũng đọc được bình luận; chỉ người đã đăng nhập mới viết, và chỉ xóa được bình luận của mình.
drop policy if exists "comments are readable" on exercise_comments;
create policy "comments are readable" on exercise_comments
  for select using (true);

drop policy if exists "users add own comments" on exercise_comments;
create policy "users add own comments" on exercise_comments
  for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "users delete own comments" on exercise_comments;
create policy "users delete own comments" on exercise_comments
  for delete to authenticated
  using (auth.uid() = user_id);

-- Chỉ lộ tên và ảnh đại diện để hiển thị bình luận, không lộ email trong bảng profiles.
create or replace view public_profiles as
  select id, display_name, avatar_url from profiles;

grant select on public_profiles to anon, authenticated;
grant select on exercise_comments to anon, authenticated;
grant insert, delete on exercise_comments to authenticated;
