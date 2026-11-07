-- Migration 008: nhật ký hoạt động công khai (đăng ký mới, mua Premium, mua khóa học) hiện ở góc web.
-- Chạy sau migration_007. Tên người dùng đã được che trước khi lưu (vd "Lê Hồng Hạnh" -> "Lê H."),
-- nên bảng này không lộ email hay tên đầy đủ qua API.

create table if not exists activity_events (
  id           bigint generated always as identity primary key,
  kind         text not null check (kind in ('signup', 'premium', 'course')),
  display_name text not null,
  course       text,
  created_at   timestamptz not null default now()
);

alter table activity_events enable row level security;

drop policy if exists "public read activity" on activity_events;
create policy "public read activity" on activity_events
  for select to anon, authenticated using (true);
-- Không có policy insert/update/delete: chỉ trigger và SQL Editor ghi vào bảng này.

-- Che tên: "Lê Hồng Hạnh" -> "Lê H.", tên một từ "Hanh" -> "H***", rỗng -> "Thành viên".
create or replace function mask_display_name(n text)
returns text
language sql
immutable
as $$
  select case
    when n is null or btrim(n) = '' then 'Thành viên'
    when position(' ' in btrim(n)) = 0 then left(btrim(n), 1) || '***'
    else split_part(btrim(n), ' ', 1) || ' ' || left(regexp_replace(btrim(n), '^.* ', ''), 1) || '.'
  end;
$$;

-- Đăng ký mới: mỗi hồ sơ mới trong profiles là một sự kiện.
create or replace function log_signup()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into activity_events (kind, display_name)
  values ('signup', mask_display_name(coalesce(new.display_name, split_part(new.email, '@', 1))));
  return new;
end;
$$;

drop trigger if exists profiles_log_signup on profiles;
create trigger profiles_log_signup
  after insert on profiles
  for each row execute function log_signup();

-- Mua Premium: khi is_premium chuyển từ false sang true.
create or replace function log_premium()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.is_premium and not old.is_premium then
    insert into activity_events (kind, display_name)
    values ('premium', mask_display_name(coalesce(new.display_name, split_part(new.email, '@', 1))));
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_log_premium on profiles;
create trigger profiles_log_premium
  after update of is_premium on profiles
  for each row execute function log_premium();

-- Hồ sơ đã có từ trước: ghi một lần các đăng ký cũ để khung thông báo không trống.
insert into activity_events (kind, display_name, created_at)
select 'signup', mask_display_name(coalesce(display_name, split_part(email, '@', 1))), created_at
from profiles
where not exists (select 1 from activity_events);

-- Mua khóa Advanced (hoặc khóa khác) chưa có cổng thanh toán, nên ghi tay khi có đơn, ví dụ:
--   insert into activity_events (kind, display_name, course)
--   values ('course', mask_display_name('Nguyễn Văn An'), 'SQL Advanced');
