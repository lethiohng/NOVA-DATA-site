-- Nova Data — schema PostgreSQL cho Supabase
-- Nguyên tắc: một nội dung = một ID, nhiều bản dịch (content_translations).

create extension if not exists "pgcrypto";

-- ============================================================
-- Nhóm 1 – Content Management
-- ============================================================

create table if not exists categories (
  id          uuid primary key default gen_random_uuid(),
  slug        varchar(120) not null unique,
  created_at  timestamptz not null default now()
);

create table if not exists content_items (
  id              uuid primary key default gen_random_uuid(),
  slug            varchar(160) not null unique,
  category_id     uuid references categories(id) on delete set null,
  content_type    varchar(20) not null check (content_type in ('Article', 'Lesson', 'Case Study')),
  thumbnail_url   text,
  difficulty      varchar(20) check (difficulty in ('Beginner', 'Intermediate', 'Advanced')),
  status          varchar(20) not null default 'Draft' check (status in ('Draft', 'Published')),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table if not exists content_translations (
  id               uuid primary key default gen_random_uuid(),
  content_id       uuid not null references content_items(id) on delete cascade,
  language_code    varchar(5) not null check (language_code in ('vi', 'en')),
  title            text not null,
  summary          text,
  body             text,
  seo_title        text,
  seo_description  text,
  unique (content_id, language_code)
);

create table if not exists tags (
  id    uuid primary key default gen_random_uuid(),
  name  varchar(80) not null unique
);

create table if not exists content_tags (
  content_id  uuid not null references content_items(id) on delete cascade,
  tag_id      uuid not null references tags(id) on delete cascade,
  primary key (content_id, tag_id)
);

-- ============================================================
-- Nhóm 2 – Learning Management
-- ============================================================

create table if not exists learning_paths (
  id           uuid primary key default gen_random_uuid(),
  slug         varchar(120) not null unique,
  status       varchar(20) not null default 'Draft' check (status in ('Draft', 'Published')),
  title_vi     text not null,
  title_en     text not null,
  created_at   timestamptz not null default now()
);

create table if not exists path_items (
  id             uuid primary key default gen_random_uuid(),
  path_id        uuid not null references learning_paths(id) on delete cascade,
  content_id     uuid references content_items(id) on delete set null,
  position       int not null,
  expected_knowledge_vi text,
  expected_knowledge_en text,
  unique (path_id, position)
);

create table if not exists exercises (
  id            uuid primary key default gen_random_uuid(),
  content_id    uuid references content_items(id) on delete cascade,
  exercise_type varchar(20) not null check (exercise_type in ('SQL', 'KPI', 'Challenge', 'Quiz')),
  question      text not null,
  solution      text,
  explanation   text,
  created_at    timestamptz not null default now()
);

create table if not exists exercise_options (
  id           uuid primary key default gen_random_uuid(),
  exercise_id  uuid not null references exercises(id) on delete cascade,
  option_text  text not null,
  is_correct   boolean not null default false,
  position     int not null default 0
);

-- ============================================================
-- Nhóm 3 – Project & Resources
-- ============================================================

create table if not exists projects (
  id           uuid primary key default gen_random_uuid(),
  slug         varchar(160) not null unique,
  status       varchar(20) not null default 'Draft' check (status in ('Draft', 'Published')),
  created_at   timestamptz not null default now()
);

create table if not exists project_translations (
  id                 uuid primary key default gen_random_uuid(),
  project_id         uuid not null references projects(id) on delete cascade,
  language_code      varchar(5) not null check (language_code in ('vi', 'en')),
  title              text not null,
  business_problem   text,
  data_structure     text,
  solution           text,
  dashboard          text,
  business_value     text,
  unique (project_id, language_code)
);

create table if not exists resources (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  resource_type varchar(30) not null check (resource_type in ('SQL', 'Excel', 'CSV', 'PDF', 'Template', 'Cheat Sheet')),
  file_url     text not null,
  project_id   uuid references projects(id) on delete set null,
  created_at   timestamptz not null default now()
);

-- ============================================================
-- Nhóm 4 – User Management
-- ============================================================

create table if not exists profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  display_name  text,
  language_code varchar(5) not null default 'vi' check (language_code in ('vi', 'en')),
  created_at    timestamptz not null default now()
);

create table if not exists learning_progress (
  user_id      uuid not null references profiles(id) on delete cascade,
  path_item_id uuid not null references path_items(id) on delete cascade,
  completed_at timestamptz,
  primary key (user_id, path_item_id)
);

create table if not exists bookmarks (
  user_id     uuid not null references profiles(id) on delete cascade,
  content_id  uuid not null references content_items(id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (user_id, content_id)
);

-- ============================================================
-- Row Level Security
-- Khách chỉ đọc nội dung đã xuất bản; người dùng chỉ thấy dữ liệu của mình.
-- ============================================================

alter table categories             enable row level security;
alter table content_items          enable row level security;
alter table content_translations   enable row level security;
alter table tags                   enable row level security;
alter table content_tags           enable row level security;
alter table learning_paths         enable row level security;
alter table path_items             enable row level security;
alter table exercises              enable row level security;
alter table exercise_options       enable row level security;
alter table projects               enable row level security;
alter table project_translations   enable row level security;
alter table resources              enable row level security;
alter table profiles               enable row level security;
alter table learning_progress      enable row level security;
alter table bookmarks              enable row level security;

create policy "public read categories" on categories
  for select using (true);

create policy "public read published content" on content_items
  for select using (status = 'Published');

create policy "public read published translations" on content_translations
  for select using (
    exists (
      select 1 from content_items c
      where c.id = content_translations.content_id and c.status = 'Published'
    )
  );

create policy "public read tags" on tags for select using (true);
create policy "public read content_tags" on content_tags for select using (true);

create policy "public read published paths" on learning_paths
  for select using (status = 'Published');

create policy "public read path items" on path_items for select using (true);
create policy "public read exercises" on exercises for select using (true);
create policy "public read exercise options" on exercise_options for select using (true);

create policy "public read published projects" on projects
  for select using (status = 'Published');

create policy "public read project translations" on project_translations for select using (true);
create policy "public read resources" on resources for select using (true);

create policy "users read own profile" on profiles
  for select using (auth.uid() = id);
create policy "users update own profile" on profiles
  for update using (auth.uid() = id);

create policy "users manage own progress" on learning_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "users manage own bookmarks" on bookmarks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
