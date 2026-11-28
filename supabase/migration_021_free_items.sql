-- Migration 021: admin chọn mục nào mở miễn phí cho tài khoản thường.
-- Chạy trong SQL Editor sau migration_020. Khách và mọi người đăng nhập đọc được danh sách; chỉ admin sửa.
-- item_type: 'lesson' (item_key = "mã-khóa|mã-bài"), 'article' (slug bài viết), 'exercise' (id bài tập), 'project' (slug dự án).

create table if not exists free_items (
  item_type  text not null check (item_type in ('lesson', 'article', 'exercise', 'project')),
  item_key   text not null,
  created_at timestamptz not null default now(),
  primary key (item_type, item_key)
);

alter table free_items enable row level security;

drop policy if exists "public read free items" on free_items;
create policy "public read free items" on free_items
  for select using (true);

drop policy if exists "admin insert free items" on free_items;
create policy "admin insert free items" on free_items
  for insert to authenticated with check (is_admin());

drop policy if exists "admin delete free items" on free_items;
create policy "admin delete free items" on free_items
  for delete to authenticated using (is_admin());
