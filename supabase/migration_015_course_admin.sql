-- Migration 015: admin sửa tên và mô tả khóa học (danh mục) trên web.
-- Chạy trong SQL Editor sau migration_014. Admin được sửa category_translations; khách vẫn chỉ đọc.

drop policy if exists "admin update category translations" on category_translations;
create policy "admin update category translations" on category_translations
  for update to authenticated
  using (is_admin())
  with check (is_admin());
