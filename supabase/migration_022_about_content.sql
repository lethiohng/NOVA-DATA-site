-- Migration 022: nội dung trang About (các mốc hành trình và đoạn Sứ mệnh) lưu trên database để admin sửa.
-- Chạy trong SQL Editor sau migration_021. Khách đọc được; chỉ admin thêm, sửa, xóa.
-- Nếu bảng còn trống, trang About dùng nội dung mặc định trong mã nguồn; admin có thể nạp nội dung mặc định từ tab About.

create table if not exists about_milestones (
  id         uuid primary key default gen_random_uuid(),
  position   int not null,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists about_mission (
  id       uuid primary key default gen_random_uuid(),
  position int not null,
  vi       text not null,
  en       text not null
);

alter table about_milestones enable row level security;
alter table about_mission enable row level security;

drop policy if exists "public read about milestones" on about_milestones;
create policy "public read about milestones" on about_milestones for select using (true);

drop policy if exists "admin write about milestones" on about_milestones;
create policy "admin write about milestones" on about_milestones
  for all to authenticated using (is_admin()) with check (is_admin());

drop policy if exists "public read about mission" on about_mission;
create policy "public read about mission" on about_mission for select using (true);

drop policy if exists "admin write about mission" on about_mission;
create policy "admin write about mission" on about_mission
  for all to authenticated using (is_admin()) with check (is_admin());
