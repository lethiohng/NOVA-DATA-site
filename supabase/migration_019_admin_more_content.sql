-- Migration 019: admin thêm và sửa dự án mới, bước Career, bài tập SQL.
-- Chạy trong SQL Editor sau migration_018. Chỉ admin (is_admin = true) mới ghi được; khách vẫn chỉ đọc.

-- Dự án mới
drop policy if exists "admin insert projects" on projects;
create policy "admin insert projects" on projects
  for insert to authenticated with check (is_admin());

drop policy if exists "admin insert project translations" on project_translations;
create policy "admin insert project translations" on project_translations
  for insert to authenticated with check (is_admin());

-- Bước Career
drop policy if exists "admin insert career steps" on career_steps;
create policy "admin insert career steps" on career_steps
  for insert to authenticated with check (is_admin());

drop policy if exists "admin update career steps" on career_steps;
create policy "admin update career steps" on career_steps
  for update to authenticated using (is_admin()) with check (is_admin());

drop policy if exists "admin delete career steps" on career_steps;
create policy "admin delete career steps" on career_steps
  for delete to authenticated using (is_admin());

-- Bài tập SQL (Luyện tập)
drop policy if exists "admin insert exercises" on exercises;
create policy "admin insert exercises" on exercises
  for insert to authenticated with check (is_admin());

drop policy if exists "admin update exercises" on exercises;
create policy "admin update exercises" on exercises
  for update to authenticated using (is_admin()) with check (is_admin());

drop policy if exists "admin delete exercises" on exercises;
create policy "admin delete exercises" on exercises
  for delete to authenticated using (is_admin());
