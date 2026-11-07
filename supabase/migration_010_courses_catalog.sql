-- Migration 010: danh mục khóa học trong database, để thêm khóa mới (Python, SQL, ...) không cần sửa ràng buộc.
-- Chạy sau migration_009. Mỗi khóa có một mã (key) dùng xuyên suốt: bảng courses, course_access và đường dẫn.
-- Thêm khóa mới: insert một dòng vào courses, rồi cấp quyền bằng course_access với mã đó.

create table if not exists courses (
  key         text primary key,
  title       text not null,
  created_at  timestamptz not null default now()
);

alter table courses enable row level security;

drop policy if exists "public read courses" on courses;
create policy "public read courses" on courses
  for select to anon, authenticated using (true);

insert into courses (key, title) values
  ('sql-intermediate', 'SQL Intermediate'),
  ('sql-advanced', 'SQL Advanced')
on conflict (key) do nothing;

-- Đổi mã cũ ('Intermediate', 'Advanced') sang mã mới, rồi gắn khóa ngoại để không cấp quyền cho khóa không tồn tại.
alter table course_access drop constraint if exists course_access_course_check;
update course_access set course = 'sql-' || lower(course) where course in ('Intermediate', 'Advanced');
alter table course_access drop constraint if exists course_access_course_fk;
alter table course_access
  add constraint course_access_course_fk foreign key (course) references courses(key);

-- Khung thông báo lấy tên khóa từ bảng courses.
create or replace function log_course_access()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into activity_events (kind, display_name, course)
  select 'course',
         mask_display_name(coalesce(p.display_name, split_part(p.email, '@', 1))),
         c.title
  from profiles p
  join courses c on c.key = new.course
  where p.id = new.user_id;
  return new;
end;
$$;

-- Cấp quyền thủ công sau khi khách chuyển khoản (SQL Editor). Mã khóa: sql-intermediate, sql-advanced, ...
--   insert into course_access (user_id, course)
--   select id, 'sql-intermediate' from profiles where email = 'email-khach@gmail.com'
--   on conflict do nothing;
