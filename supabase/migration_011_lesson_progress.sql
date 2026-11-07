-- Migration 011: tiến độ từng bài học của khóa đã đăng ký (SQL Intermediate, SQL Advanced).
-- Chạy sau migration_010. Người dùng chỉ đọc và ghi tiến độ của chính mình.

-- Khóa miễn phí cũng cần có trong bảng courses để lưu tiến độ.
insert into courses (key, title) values ('sql-basic', 'SQL Basic')
on conflict (key) do nothing;

create table if not exists lesson_progress (
  user_id      uuid not null references profiles(id) on delete cascade,
  course_key   text not null references courses(key),
  lesson_id    text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, course_key, lesson_id)
);

alter table lesson_progress enable row level security;

drop policy if exists "users read own lesson progress" on lesson_progress;
create policy "users read own lesson progress" on lesson_progress
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "users write own lesson progress" on lesson_progress;
create policy "users write own lesson progress" on lesson_progress
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "users delete own lesson progress" on lesson_progress;
create policy "users delete own lesson progress" on lesson_progress
  for delete to authenticated using (auth.uid() = user_id);
