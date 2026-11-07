-- Migration 002 — bổ sung các trường nội dung còn thiếu sau schema.sql.
-- Chạy trong SQL Editor của Supabase, sau khi đã chạy schema.sql.

-- Danh mục song ngữ
create table if not exists category_translations (
  id             uuid primary key default gen_random_uuid(),
  category_id    uuid not null references categories(id) on delete cascade,
  language_code  varchar(5) not null check (language_code in ('vi', 'en')),
  title          text not null,
  description    text,
  unique (category_id, language_code)
);

-- Bài viết: cấu trúc 7 mục lưu dạng JSON theo từng ngôn ngữ
alter table content_translations add column if not exists sections jsonb;

-- Lộ trình: mô tả song ngữ
alter table learning_paths add column if not exists description_vi text;
alter table learning_paths add column if not exists description_en text;

-- Module lộ trình: bài học (slug), bài thực hành, trạng thái
alter table path_items add column if not exists title_vi text;
alter table path_items add column if not exists title_en text;
alter table path_items add column if not exists lessons text[] not null default '{}';
alter table path_items add column if not exists practice_vi text;
alter table path_items add column if not exists practice_en text;
alter table path_items add column if not exists status varchar(20) not null default 'Draft';

-- Bài tập: tiếng Anh, tên bài, độ khó, loại Challenge
alter table exercises add column if not exists title_vi text;
alter table exercises add column if not exists title_en text;
alter table exercises add column if not exists question_en text;
alter table exercises add column if not exists explanation_en text;
alter table exercises add column if not exists level varchar(20);
alter table exercises drop constraint if exists exercises_exercise_type_check;
alter table exercises add constraint exercises_exercise_type_check
  check (exercise_type in ('SQL', 'KPI', 'Challenge', 'Quiz'));

-- Dự án: tags và tóm tắt song ngữ
alter table projects add column if not exists tags text[] not null default '{}';
alter table project_translations add column if not exists summary text;

-- Tài nguyên: tiêu đề và mô tả song ngữ
alter table resources add column if not exists title_en text;
alter table resources add column if not exists description_vi text;
alter table resources add column if not exists description_en text;

-- KPI dictionary
create table if not exists kpis (
  id            uuid primary key default gen_random_uuid(),
  slug          varchar(80) not null unique,
  abbr          varchar(40) not null,
  name_vi       text not null,
  name_en       text not null,
  description_vi text,
  description_en text,
  formula       text not null,
  unit          varchar(20),
  data_needed   text[] not null default '{}',
  position      int not null default 0
);

-- Bước nghề nghiệp
create table if not exists career_steps (
  id        uuid primary key default gen_random_uuid(),
  position  int not null unique,
  text_vi   text not null,
  text_en   text not null
);

alter table category_translations enable row level security;
alter table kpis enable row level security;
alter table career_steps enable row level security;
create policy "public read category translations" on category_translations for select using (true);
create policy "public read kpis" on kpis for select using (true);
create policy "public read career steps" on career_steps for select using (true);

-- Chủ đề chưa có bài viết (Draft) vẫn hiển thị dạng "Coming soon",
-- nên cho đọc toàn bộ content_items và bản dịch. Không chứa dữ liệu nhạy cảm.
drop policy if exists "public read published content" on content_items;
create policy "public read content items" on content_items for select using (true);
drop policy if exists "public read published translations" on content_translations;
create policy "public read content translations" on content_translations for select using (true);
drop policy if exists "public read published paths" on learning_paths;
create policy "public read learning paths" on learning_paths for select using (true);
drop policy if exists "public read published projects" on projects;
create policy "public read projects" on projects for select using (true);

-- Thứ tự hiển thị
alter table categories add column if not exists position int not null default 0;
alter table content_items add column if not exists position int not null default 0;
alter table projects add column if not exists position int not null default 0;
