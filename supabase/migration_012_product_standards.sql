-- Migration 012: UPH chuẩn và số người chuẩn trên dây chuyền, theo từng sản phẩm.
-- Chạy trong SQL Editor của Supabase trước khi chạy npm run manufacturing:load.
-- An toàn chạy lại nhiều lần (if not exists).

alter table products add column if not exists standard_uph numeric(8, 2);
alter table products add column if not exists standard_crew_size int;

alter table products drop constraint if exists products_standard_uph_check;
alter table products add constraint products_standard_uph_check check (standard_uph > 0);

alter table products drop constraint if exists products_standard_crew_size_check;
alter table products add constraint products_standard_crew_size_check check (standard_crew_size > 0);
