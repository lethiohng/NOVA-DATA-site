-- Migration 017: link YouTube cho bài viết, dự án và khóa học chủ đề.
-- Chạy trong SQL Editor sau migration_016. Khách xem được link qua trang công khai; chỉ admin sửa được.

alter table content_items add column if not exists youtube_url text;
alter table projects add column if not exists youtube_url text;
alter table categories add column if not exists youtube_url text;

-- Admin được sửa khóa học (danh mục). Bài viết và dự án đã có quyền sửa ở migration_013.
drop policy if exists "admin update categories" on categories;
create policy "admin update categories" on categories
  for update to authenticated
  using (is_admin())
  with check (is_admin());
