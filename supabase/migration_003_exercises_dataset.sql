-- Migration 003 — bài tập SQL: phân nhóm theo chủ đề và bộ dữ liệu.
-- Chạy trong SQL Editor của Supabase sau migration_002.

alter table exercises add column if not exists topic varchar(40);
alter table exercises add column if not exists dataset varchar(40);
alter table exercises add column if not exists position int not null default 0;
