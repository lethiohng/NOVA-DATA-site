-- Migration 007: cờ Premium cho khóa học trả phí (SQL Intermediate, SQL Advanced).
-- Chạy trong Supabase SQL Editor sau migration_006. Bật Premium cho tài khoản bằng:
--   update profiles set is_premium = true where email = 'email@example.com';

alter table profiles add column if not exists is_premium boolean not null default false;

-- Người dùng tự sửa hồ sơ của mình (RLS "users update own profile"), nên chặn họ tự bật is_premium.
-- Chỉ chặn khi request đi qua vai trò authenticated; SQL Editor và service role vẫn sửa được.
create or replace function protect_is_premium()
returns trigger
language plpgsql
as $$
begin
  if current_setting('request.jwt.claim.role', true) = 'authenticated'
     and new.is_premium is distinct from old.is_premium then
    new.is_premium := old.is_premium;
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_protect_is_premium on profiles;
create trigger profiles_protect_is_premium
  before update on profiles
  for each row execute function protect_is_premium();
