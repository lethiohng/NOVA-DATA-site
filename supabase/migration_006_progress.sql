-- Migration 006 — tiến độ học viên: chủ đề đã học xong, bài SQL đã giải, và thống kê số học viên hoàn thành khóa.
-- Chạy trong SQL Editor của Supabase sau migration_005.

-- Chủ đề đã học xong của từng người.
create table if not exists topic_progress (
  user_id      uuid not null references auth.users(id) on delete cascade,
  topic_slug   text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, topic_slug)
);

-- Bài SQL đã giải đúng của từng người.
create table if not exists exercise_progress (
  user_id     uuid not null references auth.users(id) on delete cascade,
  exercise_id uuid not null references exercises(id) on delete cascade,
  solved_at   timestamptz not null default now(),
  primary key (user_id, exercise_id)
);

-- Chủ đề thuộc từng khóa học (điền bằng npm run seed). Một khóa hoàn thành khi người học học xong mọi chủ đề trong đó.
create table if not exists course_topics (
  course_key text not null,
  topic_slug text not null,
  primary key (course_key, topic_slug)
);

alter table topic_progress enable row level security;
alter table exercise_progress enable row level security;
alter table course_topics enable row level security;

drop policy if exists "own topic progress" on topic_progress;
create policy "own topic progress" on topic_progress
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "own exercise progress" on exercise_progress;
create policy "own exercise progress" on exercise_progress
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "course topics are readable" on course_topics;
create policy "course topics are readable" on course_topics
  for select using (true);

grant select, insert, delete on topic_progress, exercise_progress to authenticated;
grant select on course_topics to anon, authenticated;

-- Số học viên đã hoàn thành từng khóa. Chỉ trả về con số tổng hợp, không lộ dữ liệu từng người.
create or replace function course_completion_counts()
returns table (course_key text, learners bigint)
language sql
stable
security definer
set search_path = public
as $$
  select d.course_key, count(*)::bigint
  from (
    select ct.course_key, tp.user_id
    from topic_progress tp
    join course_topics ct on ct.topic_slug = tp.topic_slug
    group by ct.course_key, tp.user_id
    having count(*) = (select count(*) from course_topics c2 where c2.course_key = ct.course_key)
  ) d
  group by d.course_key;
$$;

grant execute on function course_completion_counts() to anon, authenticated;
