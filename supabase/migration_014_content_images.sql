-- Migration 014: kho ảnh cho nội dung bài viết (Supabase Storage).
-- Chạy trong SQL Editor sau migration_013. Bucket công khai: ai cũng xem được ảnh qua đường dẫn,
-- nhưng chỉ admin (is_admin = true) mới tải lên, sửa hoặc xóa được.

insert into storage.buckets (id, name, public)
values ('content-images', 'content-images', true)
on conflict (id) do update set public = true;

drop policy if exists "admin upload content images" on storage.objects;
create policy "admin upload content images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'content-images' and is_admin());

drop policy if exists "admin update content images" on storage.objects;
create policy "admin update content images" on storage.objects
  for update to authenticated
  using (bucket_id = 'content-images' and is_admin())
  with check (bucket_id = 'content-images' and is_admin());

drop policy if exists "admin delete content images" on storage.objects;
create policy "admin delete content images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'content-images' and is_admin());
