-- Migration 020: admin kích hoạt quyền truy cập cho người dùng ngay trên web (không cần SQL Editor).
-- Chạy trong SQL Editor sau migration_019. Chỉ admin (is_admin = true) được đổi quyền người khác.

-- Trigger chặn tự bật is_premium chỉ áp dụng cho người dùng thường; admin thì được phép.
create or replace function protect_is_premium()
returns trigger
language plpgsql
as $$
begin
  if current_setting('request.jwt.claim.role', true) = 'authenticated'
     and new.is_premium is distinct from old.is_premium
     and not is_admin() then
    new.is_premium := old.is_premium;
  end if;
  return new;
end;
$$;

-- Admin xem được danh sách người dùng.
drop policy if exists "admin read all profiles" on profiles;
create policy "admin read all profiles" on profiles
  for select to authenticated using (is_admin());

-- Admin bật/tắt Premium cho người dùng.
drop policy if exists "admin update profiles" on profiles;
create policy "admin update profiles" on profiles
  for update to authenticated using (is_admin()) with check (is_admin());

-- Admin xem, cấp và thu hồi quyền từng khóa.
drop policy if exists "admin read all course access" on course_access;
create policy "admin read all course access" on course_access
  for select to authenticated using (is_admin());

drop policy if exists "admin insert course access" on course_access;
create policy "admin insert course access" on course_access
  for insert to authenticated with check (is_admin());

drop policy if exists "admin delete course access" on course_access;
create policy "admin delete course access" on course_access
  for delete to authenticated using (is_admin());
