-- Migration 009: quyền truy cập theo từng khóa (SQL Intermediate và SQL Advanced có giá riêng).
-- Chạy sau migration_008. Người dùng chỉ đọc được quyền của chính mình, không tự cấp quyền được.
-- Cờ profiles.is_premium vẫn có nghĩa là mở tất cả khóa (gói trọn bộ).

create table if not exists course_access (
  user_id     uuid not null references profiles(id) on delete cascade,
  course      text not null check (course in ('Intermediate', 'Advanced')),
  granted_at  timestamptz not null default now(),
  primary key (user_id, course)
);

alter table course_access enable row level security;

drop policy if exists "users read own access" on course_access;
create policy "users read own access" on course_access
  for select to authenticated using (auth.uid() = user_id);
-- Không có policy insert/update/delete cho người dùng: chỉ SQL Editor (quản trị) cấp quyền.

-- Giữ quyền cho những người đang có is_premium: mở cả hai khóa.
insert into course_access (user_id, course)
select p.id, c.course
from profiles p
cross join (values ('Intermediate'), ('Advanced')) as c(course)
where p.is_premium
on conflict do nothing;

-- Ghi sự kiện "vừa mua khóa ..." lên khung thông báo mỗi khi cấp quyền mới.
-- Tạo trigger SAU bước backfill ở trên để không ghi trùng sự kiện cũ.
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
         'SQL ' || new.course
  from profiles p
  where p.id = new.user_id;
  return new;
end;
$$;

drop trigger if exists course_access_log on course_access;
create trigger course_access_log
  after insert on course_access
  for each row execute function log_course_access();

-- Cấp quyền thủ công sau khi khách chuyển khoản (chạy trong SQL Editor):
--   insert into course_access (user_id, course)
--   select id, 'Intermediate' from profiles where email = 'email-khach@gmail.com'
--   on conflict do nothing;
