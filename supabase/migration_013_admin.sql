-- Migration 013: vai trò admin để chỉnh sửa nội dung bài viết và dự án trên web.
-- Chạy trong Supabase SQL Editor sau migration_012. Sau đó bật admin cho tài khoản bằng:
--   update profiles set is_admin = true where email = 'email@example.com';

alter table profiles add column if not exists is_admin boolean not null default false;

-- Người dùng tự sửa hồ sơ của mình, nên chặn họ tự bật is_admin (cùng cách với is_premium).
create or replace function protect_is_admin()
returns trigger
language plpgsql
as $$
begin
  if current_setting('request.jwt.claim.role', true) = 'authenticated'
     and new.is_admin is distinct from old.is_admin then
    new.is_admin := old.is_admin;
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_protect_is_admin on profiles;
create trigger profiles_protect_is_admin
  before update on profiles
  for each row execute function protect_is_admin();

-- Kiểm tra admin. security definer để không bị RLS của profiles chặn khi kiểm tra trong policy.
create or replace function is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select p.is_admin from profiles p where p.id = auth.uid()), false);
$$;

-- Admin đọc được cả bản nháp.
drop policy if exists "admin read all content" on content_items;
create policy "admin read all content" on content_items
  for select to authenticated using (is_admin());

drop policy if exists "admin read all content translations" on content_translations;
create policy "admin read all content translations" on content_translations
  for select to authenticated using (is_admin());

drop policy if exists "admin read all projects" on projects;
create policy "admin read all projects" on projects
  for select to authenticated using (is_admin());

-- Admin sửa nội dung.
drop policy if exists "admin update content" on content_items;
create policy "admin update content" on content_items
  for update to authenticated using (is_admin()) with check (is_admin());

drop policy if exists "admin update content translations" on content_translations;
create policy "admin update content translations" on content_translations
  for update to authenticated using (is_admin()) with check (is_admin());

drop policy if exists "admin update projects" on projects;
create policy "admin update projects" on projects
  for update to authenticated using (is_admin()) with check (is_admin());

drop policy if exists "admin update project translations" on project_translations;
create policy "admin update project translations" on project_translations
  for update to authenticated using (is_admin()) with check (is_admin());
