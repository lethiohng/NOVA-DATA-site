# Nova Data

Website kiến thức BI, SQL và phân tích sản xuất (Manufacturing Analytics).
Next.js (App Router) + Tailwind CSS + Supabase.

## Chạy local

```bash
npm install
cp .env.example .env.local   # điền các biến Supabase (xem bên dưới)
npm run dev                  # http://localhost:3000
```

Node 22+ được khuyến nghị (Supabase sẽ bỏ hỗ trợ Node 20).

## Biến môi trường (.env.local)

| Biến | Dùng ở đâu |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Website và script |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Website (chỉ đọc, qua RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Script seed/nạp dữ liệu trên máy local. Không đưa vào code client, không commit. |

## Thiết lập cơ sở dữ liệu

Chạy các file SQL trong SQL Editor của Supabase, đúng thứ tự, mỗi file copy toàn bộ nội dung rồi Run:

1. `supabase/schema.sql` — nội dung website (danh mục, bài viết, lộ trình, dự án).
2. `supabase/migration_002_content_fields.sql` — bổ sung trường song ngữ và cột còn thiếu.
3. `supabase/migration_003_exercises_dataset.sql` — chủ đề và bộ dữ liệu cho bài tập SQL.
4. `supabase/manufacturing_schema.sql` — 15 bảng NOVA MANUFACTURING.

Sau đó chạy các lệnh seed (cần `SUPABASE_SERVICE_ROLE_KEY`):

```bash
npm run seed                 # nội dung website + 100 bài tập SQL
npm run manufacturing:load   # nạp ~29.000 dòng dữ liệu sản xuất giả lập
```

## Bộ dữ liệu NOVA MANUFACTURING

- `scripts/manufacturing/data.ts` — sinh dữ liệu xác định (cùng seed → cùng kết quả), 60 ngày, 4 dây chuyền, 12 máy, 3 ca.
- `scripts/manufacturing/exercises.ts` — 100 bài tập: 30 Beginner, 30 Intermediate, 25 Advanced, 15 Manufacturing Analytics.
- `npm run manufacturing:verify` — chạy toàn bộ đáp án trên PostgreSQL trong bộ nhớ (PGlite) để kiểm tra.
- `npm run manufacturing:csv` — xuất `public/data/nova_manufacturing_daily.csv` cho Data Playground.

## Cấu trúc

- `src/lib/content.ts` — nguồn nội dung gốc (song ngữ vi/en, một ID cho nhiều bản dịch). Script seed đọc từ đây.
- `src/lib/data.ts` — lớp đọc dữ liệu từ Supabase, dùng trong server component.
- `src/lib/i18n.tsx` — chuyển ngôn ngữ VI / EN, lưu trong localStorage.
- `src/app/` — các route theo IA: learn, roadmap, practice, projects, resources, career, about, contact.
- `scripts/seed.ts` — đưa nội dung website lên Supabase.

## Lệnh

| Lệnh | Mô tả |
|---|---|
| `npm run dev` | Chạy môi trường phát triển |
| `npm run build` | Build production |
| `npm run start` | Chạy bản build |
| `npm run lint` | Kiểm tra lint |
| `npm run seed` | Đưa nội dung website lên Supabase |
| `npm run manufacturing:load` | Nạp dữ liệu NOVA MANUFACTURING lên Supabase |
| `npm run manufacturing:verify` | Kiểm tra 100 đáp án bài tập |
| `npm run manufacturing:csv` | Xuất CSV mẫu cho Data Playground |

## Ghi chú

- Dữ liệu trong repo là giả lập. Không đưa dữ liệu nội bộ hay thông tin khách hàng vào đây.
- Trang được cache theo route với `revalidate = 3600`: thay đổi dữ liệu trên Supabase sẽ hiện sau tối đa 1 giờ.
