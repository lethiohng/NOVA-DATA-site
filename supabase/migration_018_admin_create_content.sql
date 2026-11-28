-- Migration 018: admin tạo bài viết mới trong một khóa học.
-- Chạy trong SQL Editor sau migration_017. Chỉ admin (is_admin = true) mới thêm được bài và bản dịch.

drop policy if exists "admin insert content" on content_items;
create policy "admin insert content" on content_items
  for insert to authenticated
  with check (is_admin());

drop policy if exists "admin insert content translations" on content_translations;
create policy "admin insert content translations" on content_translations
  for insert to authenticated
  with check (is_admin());
