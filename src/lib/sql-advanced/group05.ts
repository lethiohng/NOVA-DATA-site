import type { AdvancedLesson } from "./types";

/* Nhóm 5 — Bổ sung: thao tác dữ liệu nâng cao (module 12), hiệu năng, phân vùng và kiểm soát chất lượng dữ liệu (module 13).
   Sân chơi chạy mỗi câu lệnh trong transaction rồi ROLLBACK. Các bài DDL (CREATE) chỉ kiểm tra được là câu lệnh chạy không lỗi. */

export const group05: AdvancedLesson[] = [
  {
    id: "23",
    module: 12,
    title: "UPSERT nâng cao: INSERT ON CONFLICT với điều kiện",
    minutes: 50,
    objectives: [
      "Dùng INSERT ... ON CONFLICT DO UPDATE để thêm mới hoặc cập nhật theo khóa duy nhất.",
      "Dùng EXCLUDED để lấy giá trị đang cố thêm vào.",
      "Giới hạn cập nhật bằng WHERE trong DO UPDATE.",
    ],
    prerequisites: "Đã học INSERT, UPDATE và khóa duy nhất (SQL Intermediate, bài 32).",
    explanation: [
      "UPSERT là thêm mới nếu chưa có, cập nhật nếu đã có. Trong PostgreSQL, viết INSERT ... ON CONFLICT (cột_khóa) DO UPDATE SET ...",
      "Trong DO UPDATE, EXCLUDED là dòng đang cố thêm vào. Ví dụ SET unit_cost = EXCLUDED.unit_cost lấy giá mới của dòng đó.",
      "Có thể thêm WHERE trong DO UPDATE để chỉ cập nhật khi thật sự khác, tránh ghi đè không cần thiết. DO NOTHING bỏ qua dòng trùng mà không báo lỗi.",
    ],
    syntax: "INSERT INTO bảng (...) VALUES (...)\nON CONFLICT (cột_khóa) DO UPDATE SET cột = EXCLUDED.cột WHERE điều_kiện\nRETURNING ...;",
    example: {
      sql: "INSERT INTO materials (material_code, material_name, unit, unit_cost) VALUES ('M-MAT-001', 'Vật liệu 001', 'kg', 26000) ON CONFLICT (material_code) DO UPDATE SET unit_cost = EXCLUDED.unit_cost RETURNING material_code, unit_cost;",
      explain: [
        "Mã M-MAT-001 đã tồn tại, nên dòng không được thêm mới mà cập nhật unit_cost thành 26000.",
        "Nếu mã chưa tồn tại, câu lệnh sẽ thêm một dòng mới.",
      ],
    },
    factory: "Bảng giá vật liệu được cập nhật hằng ngày từ nhà cung cấp. Mã đã có thì cập nhật giá, mã mới thì thêm vào.",
    practice: [
      {
        question: "Cập nhật unit_cost của vật liệu 'M-MAT-002' thành 27000 bằng UPSERT. Dùng ON CONFLICT (material_code) DO UPDATE và RETURNING material_code, unit_cost. Các cột khác cần điền đủ (material_name 'Vật liệu 002', unit 'kg').",
        hint: "INSERT ... VALUES (...) ON CONFLICT (material_code) DO UPDATE SET unit_cost = EXCLUDED.unit_cost RETURNING ...",
        solution: "INSERT INTO materials (material_code, material_name, unit, unit_cost) VALUES ('M-MAT-002', 'Vật liệu 002', 'kg', 27000) ON CONFLICT (material_code) DO UPDATE SET unit_cost = EXCLUDED.unit_cost RETURNING material_code, unit_cost;",
      },
      {
        question: "Thử lại với 'M-MAT-003' và giá 27000, nhưng chỉ cập nhật khi giá mới khác giá cũ. Dùng WHERE trong DO UPDATE và RETURNING material_code, unit_cost.",
        hint: "Thêm WHERE materials.unit_cost <> EXCLUDED.unit_cost sau DO UPDATE SET ...",
        solution: "INSERT INTO materials (material_code, material_name, unit, unit_cost) VALUES ('M-MAT-003', 'Vật liệu 003', 'kg', 27000) ON CONFLICT (material_code) DO UPDATE SET unit_cost = EXCLUDED.unit_cost WHERE materials.unit_cost <> EXCLUDED.unit_cost RETURNING material_code, unit_cost;",
      },
    ],
    mistakes: [
      "Dùng ON CONFLICT với cột không có ràng buộc UNIQUE, khiến PostgreSQL báo lỗi.",
      "Quên EXCLUDED và viết lại giá trị cũ, nên không cập nhật được giá trị mới.",
      "Dùng DO UPDATE khi chỉ muốn bỏ qua dòng trùng. Trong trường hợp đó dùng DO NOTHING.",
    ],
    summary: [
      "INSERT ... ON CONFLICT (khóa) DO UPDATE cho upsert.",
      "EXCLUDED là dòng đang cố thêm vào.",
      "WHERE trong DO UPDATE giới hạn các dòng được cập nhật.",
    ],
  },
  {
    id: "24",
    module: 12,
    title: "Temporary Tables và staging: xử lý dữ liệu qua nhiều bước",
    minutes: 50,
    objectives: [
      "Tạo bảng tạm bằng CREATE TEMP TABLE để giữ dữ liệu trung gian.",
      "Hiểu vai trò của staging: giữ bản gốc, rồi biến đổi trong bước sau.",
      "Dùng CTE làm staging trong một câu lệnh khi không cần bảng tạm.",
    ],
    prerequisites: "Đã học CTE (SQL Intermediate, module 9) và GROUP BY.",
    explanation: [
      "Khi dữ liệu phải qua nhiều bước, nên lưu kết quả trung gian vào bảng tạm. Bảng tạm (TEMP TABLE) chỉ tồn tại trong phiên làm việc, và tự biến mất khi kết thúc phiên.",
      "Staging là vùng chứa dữ liệu thô đã được nạp, giữ nguyên bản gốc để có thể kiểm tra và làm lại. Các bước làm sạch và tính toán đọc từ staging, không sửa trực tiếp bản gốc.",
      "Trên sân chơi, mỗi lần chạy đều bị hoàn tác, nên bảng tạm chỉ dùng được trong một câu lệnh. Khi làm việc thật, bạn chạy các bước theo thứ tự trong cùng phiên. CTE là lựa chọn thay thế khi chỉ cần tách bước trong một câu lệnh.",
    ],
    syntax: "CREATE TEMP TABLE tên_tạm AS SELECT ...;\n-- hoặc\nWITH tên_tạm AS (SELECT ...) SELECT ... FROM tên_tạm;",
    example: {
      sql: "WITH staging AS (SELECT record_id, order_id, good_qty, ng_qty FROM production_records WHERE shift_id = 1) SELECT order_id, SUM(good_qty) AS tong_dat FROM staging GROUP BY order_id ORDER BY order_id LIMIT 5;",
      explain: [
        "Bước staging lấy các bản ghi ca 1 làm dữ liệu trung gian.",
        "Bước tổng hợp đọc từ staging, bản gốc production_records không thay đổi.",
      ],
    },
    factory: "Dữ liệu sản xuất từ hệ thống MES được nạp thô vào staging trước. Sau đó mới làm sạch và tính sản lượng, để có thể đối chiếu nếu có sai lệch.",
    practice: [
      {
        question: "Tạo bảng tạm stg_ca1 chứa record_id, order_id, good_qty của các bản ghi có shift_id = 1, bằng CREATE TEMP TABLE ... AS SELECT.",
        hint: "CREATE TEMP TABLE stg_ca1 AS SELECT record_id, order_id, good_qty FROM production_records WHERE shift_id = 1;",
        solution: "CREATE TEMP TABLE stg_ca1 AS SELECT record_id, order_id, good_qty FROM production_records WHERE shift_id = 1;",
      },
      {
        question: "Dùng CTE làm staging: lấy các bản ghi có shift_id = 1 làm bước staging, rồi tính tổng good_qty theo order_id (tong_dat) cho 5 đơn đầu theo order_id.",
        hint: "WITH staging AS (SELECT ... WHERE shift_id = 1) rồi SELECT order_id, SUM(good_qty) ... GROUP BY order_id.",
        solution: "WITH staging AS (SELECT order_id, good_qty FROM production_records WHERE shift_id = 1) SELECT order_id, SUM(good_qty) AS tong_dat FROM staging GROUP BY order_id ORDER BY order_id LIMIT 5;",
      },
    ],
    mistakes: [
      "Làm sạch trực tiếp trên bản gốc, khiến không còn dữ liệu để đối chiếu khi có lỗi.",
      "Nghĩ bảng tạm tồn tại mãi. Bảng tạm chỉ tồn tại trong phiên làm việc.",
      "Dùng bảng tạm khi một CTE đã đủ, làm quy trình thêm phức tạp.",
    ],
    summary: [
      "Bảng tạm giữ kết quả trung gian trong phiên làm việc.",
      "Staging giữ dữ liệu thô để kiểm tra và làm lại.",
      "CTE là cách tách bước trong một câu lệnh.",
    ],
  },
  {
    id: "25",
    module: 12,
    title: "UPDATE FROM và DELETE USING: sửa và xóa theo bảng khác",
    minutes: 45,
    objectives: [
      "Sửa dữ liệu bằng giá trị lấy từ bảng khác với UPDATE ... FROM.",
      "Xóa dòng dựa trên điều kiện nối với bảng khác bằng DELETE ... USING.",
      "Dùng RETURNING để kiểm tra kết quả.",
    ],
    prerequisites: "Đã học JOIN (SQL Intermediate, module 7) và UPDATE, DELETE (SQL Intermediate, bài 32).",
    explanation: [
      "UPDATE ... FROM cho phép nối với bảng khác trong câu lệnh UPDATE. Điều kiện nối đặt trong WHERE, giúp chỉ sửa đúng các dòng cần sửa.",
      "DELETE ... USING làm việc tương tự cho DELETE: bảng phụ đặt sau USING, điều kiện nối đặt trong WHERE.",
      "Cả hai đều cần điều kiện nối rõ ràng. Thiếu điều kiện nối, câu lệnh có thể nhân dòng hoặc sửa nhầm dữ liệu.",
    ],
    syntax: "UPDATE bảng_chính SET cột = bảng_phụ.cột FROM bảng_phụ WHERE điều_kiện_nối;\nDELETE FROM bảng_chính USING bảng_phụ WHERE điều_kiện_nối;",
    example: {
      sql: "UPDATE machines m SET ideal_cycle_sec = m.ideal_cycle_sec * 1.1 FROM production_lines l WHERE l.line_id = m.line_id AND l.line_code = 'LINE-A' RETURNING m.machine_code, m.ideal_cycle_sec;",
      explain: [
        "Điều kiện nối l.line_id = m.line_id chỉ sửa các máy thuộc LINE-A.",
        "RETURNING cho thấy các máy đã được cập nhật.",
      ],
    },
    factory: "Sau khi đổi mã dây chuyền, cần cập nhật chu kỳ của các máy thuộc dây chuyền đó, và xóa các sự kiện dừng có lý do không còn dùng.",
    practice: [
      {
        question: "Tăng ideal_cycle_sec thêm 10% cho các máy thuộc dây chuyền có line_code = 'LINE-B'. Dùng UPDATE ... FROM và RETURNING m.machine_code, m.ideal_cycle_sec.",
        hint: "UPDATE machines m SET ... FROM production_lines l WHERE l.line_id = m.line_id AND l.line_code = 'LINE-B' RETURNING ...",
        solution: "UPDATE machines m SET ideal_cycle_sec = m.ideal_cycle_sec * 1.1 FROM production_lines l WHERE l.line_id = m.line_id AND l.line_code = 'LINE-B' RETURNING m.machine_code, m.ideal_cycle_sec;",
      },
      {
        question: "Xóa các sự kiện dừng máy (downtime_events) có lý do thuộc category 'Other'. Dùng DELETE ... USING downtime_reasons và RETURNING d.downtime_id.",
        hint: "DELETE FROM downtime_events d USING downtime_reasons r WHERE r.reason_id = d.reason_id AND r.category = 'Other' RETURNING d.downtime_id;",
        solution: "DELETE FROM downtime_events d USING downtime_reasons r WHERE r.reason_id = d.reason_id AND r.category = 'Other' RETURNING d.downtime_id;",
      },
    ],
    mistakes: [
      "Quên điều kiện nối trong WHERE, khiến câu lệnh nhân tích hoặc sửa toàn bộ bảng.",
      "Dùng tên bảng phụ không đúng alias trong điều kiện nối.",
      "Chạy UPDATE hoặc DELETE mà chưa kiểm tra bằng SELECT với cùng điều kiện.",
    ],
    summary: [
      "UPDATE ... FROM sửa dữ liệu bằng giá trị từ bảng khác.",
      "DELETE ... USING xóa dòng theo điều kiện nối.",
      "Luôn có điều kiện nối rõ ràng và dùng RETURNING để kiểm tra.",
    ],
  },
  {
    id: "26",
    module: 12,
    title: "Stored Procedures và PL/pgSQL: đóng gói logic trong database",
    minutes: 50,
    objectives: [
      "Tạo hàm đơn giản bằng CREATE FUNCTION và dùng lại trong truy vấn.",
      "Hiểu khác nhau giữa FUNCTION (trả về giá trị) và PROCEDURE (gọi bằng CALL).",
      "Nhận biết khi nào nên đặt logic trong database, khi nào nên giữ ở tầng ứng dụng.",
    ],
    prerequisites: "Đã học SELECT, các hàm tổng hợp và CASE WHEN (khóa Basic và SQL Intermediate module 10).",
    explanation: [
      "Hàm do người dùng viết (user-defined function) đóng gói một phép tính để dùng lại nhiều lần. Ví dụ tính tỷ lệ NG từ số lượng lỗi và tổng số lượng.",
      "FUNCTION trả về giá trị và được gọi trong SELECT hoặc WHERE. PROCEDURE không trả về giá trị và được gọi bằng CALL. Procedure có thể chứa nhiều bước và điều khiển giao dịch.",
      "PL/pgSQL là ngôn ngữ thủ tục của PostgreSQL, có biến, IF và vòng lặp. Logic trong database giúp dùng chung, nhưng khó kiểm thử và thay đổi hơn mã ứng dụng, nên chỉ đưa vào khi thật cần.",
    ],
    syntax: "CREATE FUNCTION tên(tham_số kiểu) RETURNS kiểu AS $$ ... $$ LANGUAGE sql;\nCREATE PROCEDURE tên(...) LANGUAGE plpgsql AS $$ ... $$;",
    example: {
      sql: "CREATE OR REPLACE FUNCTION ty_le_ng(ng int, tong int) RETURNS numeric AS $$ SELECT ROUND(100.0 * ng / NULLIF(tong, 0), 2) $$ LANGUAGE sql;",
      explain: [
        "Hàm nhận số lỗi và tổng số lượng, trả về tỷ lệ phần trăm.",
        "NULLIF(tong, 0) tránh lỗi chia cho 0 khi tổng bằng 0.",
      ],
    },
    factory: "Nhiều báo cáo cần cùng một công thức tỷ lệ NG. Đặt công thức thành hàm để mọi báo cáo dùng một cách tính thống nhất.",
    practice: [
      {
        question: "Tạo hàm ty_le_loi(ng int, tong int) trả về tỷ lệ phần trăm ROUND(100.0 * ng / NULLIF(tong, 0), 2), bằng CREATE OR REPLACE FUNCTION ... LANGUAGE sql.",
        hint: "Viết hàm một câu lệnh SELECT trong dấu $$.",
        solution: "CREATE OR REPLACE FUNCTION ty_le_loi(ng int, tong int) RETURNS numeric AS $$ SELECT ROUND(100.0 * ng / NULLIF(tong, 0), 2) $$ LANGUAGE sql;",
      },
      {
        question: "Tạo procedure ghi_nhan_dung(ten text) bằng CREATE PROCEDURE ... LANGUAGE plpgsql, thân chỉ có BEGIN và END (chưa cần làm gì thêm).",
        hint: "CREATE PROCEDURE ghi_nhan_dung(ten text) LANGUAGE plpgsql AS $$ BEGIN END $$;",
        solution: "CREATE PROCEDURE ghi_nhan_dung(ten text) LANGUAGE plpgsql AS $$ BEGIN END $$;",
      },
    ],
    mistakes: [
      "Gọi PROCEDURE bằng SELECT thay vì CALL.",
      "Quên NULLIF nên gặp lỗi chia cho 0 khi tổng bằng 0.",
      "Đặt quá nhiều logic nghiệp vụ trong database, khiến khó bảo trì và kiểm thử.",
    ],
    summary: [
      "FUNCTION trả về giá trị, dùng trong SELECT và WHERE.",
      "PROCEDURE gọi bằng CALL, có thể nhiều bước.",
      "Đặt logic trong database khi cần dùng chung, và cân nhắc khả năng bảo trì.",
    ],
  },
  {
    id: "27",
    module: 13,
    title: "Table Partitioning: chia bảng lớn theo thời gian",
    minutes: 50,
    objectives: [
      "Hiểu partitioning là chia một bảng lớn thành nhiều phần theo khóa.",
      "Tạo bảng phân vùng theo khoảng thời gian bằng PARTITION BY RANGE.",
      "Biết vì sao truy vấn có điều kiện thời gian chạy nhanh hơn trên bảng phân vùng.",
    ],
    prerequisites: "Đã học WHERE với khoảng thời gian (khóa Basic, bài 15) và chỉ mục (SQL Advanced, module 8 trong khóa Advanced).",
    explanation: [
      "Partitioning chia một bảng lớn thành nhiều bảng con (partition) theo một cột, thường là thời gian. Dữ liệu vẫn truy vấn như một bảng duy nhất.",
      "Với PARTITION BY RANGE (record_time), mỗi partition chứa một khoảng thời gian, ví dụ từng tháng. Khi truy vấn có điều kiện theo thời gian, PostgreSQL chỉ đọc partition liên quan (partition pruning).",
      "Partitioning hữu ích khi bảng rất lớn và dữ liệu cũ ít được truy vấn, ví dụ để xóa nhanh cả tháng cũ bằng cách bỏ một partition. Với bảng vài chục nghìn dòng như bộ dữ liệu này, lợi ích chưa rõ, nhưng cú pháp và cách nghĩ giống hệt khi dữ liệu lớn.",
    ],
    syntax: "CREATE TABLE tên (...) PARTITION BY RANGE (cột_thời_gian);\nCREATE TABLE tên_partition PARTITION OF tên FOR VALUES FROM ('2026-08-01') TO ('2026-09-01');",
    example: {
      sql: "SELECT COUNT(*) AS so_ban_ghi_thang_8 FROM production_records WHERE record_time >= '2026-08-01' AND record_time < '2026-09-01';",
      explain: [
        "Điều kiện khoảng thời gian chỉ lấy dữ liệu tháng 8.",
        "Trên bảng phân vùng theo tháng, PostgreSQL chỉ đọc partition của tháng 8.",
      ],
    },
    factory: "Bảng bản ghi sản xuất nhiều năm sẽ rất lớn. Phân vùng theo tháng giúp truy vấn báo cáo tháng nhanh và dễ lưu trữ dữ liệu cũ.",
    practice: [
      {
        question: "Tạo bảng production_records_part (record_id bigint, record_time timestamp, good_qty int, ng_qty int, total_qty int) được phân vùng theo khoảng của record_time bằng PARTITION BY RANGE (record_time).",
        hint: "CREATE TABLE production_records_part (...) PARTITION BY RANGE (record_time);",
        solution: "CREATE TABLE production_records_part (record_id bigint, record_time timestamp, good_qty int, ng_qty int, total_qty int) PARTITION BY RANGE (record_time);",
      },
      {
        question: "Đếm số bản ghi trong production_records có record_time thuộc tháng 9/2026 (từ 2026-09-01 đến trước 2026-10-01), đặt alias so_ban_ghi_thang_9.",
        hint: "Dùng điều kiện khoảng: record_time >= '2026-09-01' AND record_time < '2026-10-01'.",
        solution: "SELECT COUNT(*) AS so_ban_ghi_thang_9 FROM production_records WHERE record_time >= '2026-09-01' AND record_time < '2026-10-01';",
      },
    ],
    mistakes: [
      "Chọn cột phân vùng không thường được dùng trong điều kiện truy vấn, nên không tận dụng được partition pruning.",
      "Dùng hàm lên cột phân vùng trong WHERE, khiến PostgreSQL không loại được partition không cần thiết.",
      "Tạo partition thiếu khoảng thời gian, dẫn đến lỗi khi có dòng nằm ngoài phạm vi.",
    ],
    summary: [
      "Partitioning chia bảng lớn thành các bảng con theo khóa.",
      "PARTITION BY RANGE phù hợp với dữ liệu theo thời gian.",
      "Truy vấn có điều kiện theo cột phân vùng nhanh hơn nhờ partition pruning.",
    ],
  },
  {
    id: "28",
    module: 13,
    title: "EXPLAIN ANALYZE: đọc execution plan để tối ưu truy vấn",
    minutes: 50,
    objectives: [
      "Dùng EXPLAIN để xem kế hoạch thực thi của truy vấn.",
      "Dùng EXPLAIN ANALYZE để xem thời gian thực tế của từng bước.",
      "Nhận biết Seq Scan và Index Scan trong kế hoạch.",
    ],
    prerequisites: "Đã học chỉ mục B-tree và composite index (SQL Advanced, bài 15).",
    explanation: [
      "EXPLAIN hiển thị kế hoạch PostgreSQL dự định dùng để chạy truy vấn, mà không thực sự chạy nó. EXPLAIN ANALYZE thì chạy truy vấn thật và báo thời gian thực tế, nên cẩn thận với câu lệnh thay đổi dữ liệu.",
      "Seq Scan là quét toàn bộ bảng. Index Scan là đi qua chỉ mục để tìm nhanh các dòng cần. Với bảng nhỏ, PostgreSQL có thể chọn Seq Scan vì nhanh hơn.",
      "Khi đọc kế hoạch, chú ý các bước tốn thời gian nhất (cost và actual time) và số dòng ước tính khác số dòng thật nhiều lần. Đó thường là dấu hiệu thống kê cần cập nhật bằng ANALYZE.",
    ],
    syntax: "EXPLAIN SELECT ...;\nEXPLAIN ANALYZE SELECT ...;",
    example: {
      sql: "EXPLAIN ANALYZE SELECT COUNT(*) FROM production_records WHERE machine_id = 3;",
      explain: [
        "Kết quả có kế hoạch và thời gian thực tế của từng bước.",
        "Nếu thấy Seq Scan trên bảng lớn với điều kiện chọn lọc, cân nhắc thêm chỉ mục.",
      ],
    },
    factory: "Báo cáo sản lượng theo máy chạy chậm dần khi dữ liệu tăng. Đọc kế hoạch truy vấn để tìm bước tốn thời gian và quyết định có cần chỉ mục không.",
    practice: [
      {
        question: "Xem kế hoạch (không chạy thật) của truy vấn đếm bản ghi có machine_id = 3 trong production_records. Dùng EXPLAIN, không dùng ANALYZE.",
        hint: "EXPLAIN SELECT COUNT(*) FROM production_records WHERE machine_id = 3;",
        solution: "EXPLAIN SELECT COUNT(*) FROM production_records WHERE machine_id = 3;",
      },
      {
        question: "Xem kế hoạch (không ANALYZE) của truy vấn lấy bản ghi có record_id = 10 từ production_records (SELECT *).",
        hint: "EXPLAIN SELECT * FROM production_records WHERE record_id = 10;",
        solution: "EXPLAIN SELECT * FROM production_records WHERE record_id = 10;",
      },
    ],
    mistakes: [
      "Dùng EXPLAIN ANALYZE với câu lệnh UPDATE hoặc DELETE trên dữ liệu thật, vì câu lệnh sẽ thực sự chạy.",
      "Kết luận vội từ một lần chạy. Thời gian có thể dao động, nên so sánh nhiều lần.",
      "Nghĩ Seq Scan luôn xấu. Với bảng nhỏ hoặc điều kiện ít chọn lọc, Seq Scan là lựa chọn hợp lý.",
    ],
    summary: [
      "EXPLAIN xem kế hoạch, EXPLAIN ANALYZE chạy thật và đo thời gian.",
      "Seq Scan quét toàn bảng, Index Scan đi qua chỉ mục.",
      "So sánh số dòng ước tính và thực tế để phát hiện thống kê lỗi thời.",
    ],
  },
  {
    id: "29",
    module: 13,
    title: "Advanced Indexing: GIN, GiST và BRIN",
    minutes: 45,
    objectives: [
      "Biết các loại chỉ mục ngoài B-tree: GIN, GiST và BRIN, và khi nào dùng từng loại.",
      "Tạo chỉ mục BRIN cho cột thời gian có thứ tự tăng dần.",
      "Hiểu GIN dùng cho dữ liệu JSON, mảng và tìm kiếm văn bản.",
    ],
    prerequisites: "Đã học B-tree và composite index (SQL Advanced, bài 15).",
    explanation: [
      "B-tree phù hợp với so sánh bằng và khoảng trên các giá trị đơn giản, là loại chỉ mục mặc định.",
      "GIN lập chỉ mục cho các giá trị chứa nhiều phần tử, như mảng, JSONB và văn bản. Ví dụ tìm bản ghi có một khóa trong JSONB.",
      "BRIN lưu tóm tắt theo từng khối dữ liệu, rất nhỏ gọn cho bảng lớn mà giá trị cột tăng dần theo thời gian, như record_time. GiST hỗ trợ dữ liệu không gian và tìm kiếm gần đúng.",
    ],
    syntax: "CREATE INDEX tên ON bảng USING BRIN (cột_thời_gian);\nCREATE INDEX tên ON bảng USING GIN (cột_jsonb);",
    example: {
      sql: "CREATE INDEX idx_orders_start_brin ON production_orders USING BRIN (start_time);",
      explain: [
        "Chỉ mục BRIN trên start_time, phù hợp vì thời gian của lệnh tăng dần theo thứ tự tạo.",
        "Chỉ mục nhỏ hơn đáng kể so với B-tree trên cùng cột, nhưng hiệu quả với điều kiện theo khoảng thời gian.",
      ],
    },
    factory: "Bảng bản ghi sản xuất tăng liên tục theo thời gian. Chỉ mục BRIN giúp truy vấn theo khoảng thời gian mà không tốn nhiều dung lượng như B-tree.",
    practice: [
      {
        question: "Tạo chỉ mục BRIN tên idx_records_time_brin trên cột record_time của bảng production_records.",
        hint: "CREATE INDEX idx_records_time_brin ON production_records USING BRIN (record_time);",
        solution: "CREATE INDEX idx_records_time_brin ON production_records USING BRIN (record_time);",
      },
      {
        question: "Tạo chỉ mục B-tree tên idx_records_order_btree trên cột order_id của production_records, để so sánh với BRIN.",
        hint: "CREATE INDEX idx_records_order_btree ON production_records (order_id);",
        solution: "CREATE INDEX idx_records_order_btree ON production_records (order_id);",
      },
    ],
    mistakes: [
      "Dùng BRIN cho cột có giá trị ngẫu nhiên, không tăng dần. Khi đó BRIN gần như không giúp gì.",
      "Chọn GIN cho cột số đơn giản. GIN phù hợp với giá trị chứa nhiều phần tử.",
      "Tạo quá nhiều chỉ mục làm chậm thao tác INSERT, UPDATE và DELETE.",
    ],
    summary: [
      "B-tree là loại chỉ mục mặc định cho so sánh đơn giản.",
      "GIN cho JSONB, mảng và văn bản; GiST cho dữ liệu không gian.",
      "BRIN nhỏ gọn cho cột thời gian tăng dần trên bảng lớn.",
    ],
  },
  {
    id: "30",
    module: 13,
    title: "PIVOT và UNPIVOT: chuyển đổi bảng cho báo cáo",
    minutes: 50,
    objectives: [
      "Đổi giá trị hàng thành cột (PIVOT) bằng Conditional Aggregation.",
      "Đổi cột thành hàng (UNPIVOT) bằng VALUES và LATERAL.",
      "Chọn cấu trúc bảng phù hợp với công cụ báo cáo.",
    ],
    prerequisites: "Đã học PIVOT bằng Conditional Aggregation (SQL Intermediate, bài 34) và JOIN.",
    explanation: [
      "PIVOT đổi các giá trị của một cột thành nhiều cột. PostgreSQL không có từ khóa PIVOT chuẩn, nên dùng SUM(CASE WHEN ...) hoặc COUNT FILTER như đã học.",
      "UNPIVOT làm ngược lại: đổi nhiều cột thành nhiều dòng với hai cột mới, tên và giá trị. Cách phổ biến là CROSS JOIN LATERAL (VALUES ...) để liệt kê các cột.",
      "Báo cáo thường cần dạng rộng (pivot) để đọc, còn công cụ phân tích thường cần dạng dài (unpivot) để lọc và gom nhóm. Chọn cấu trúc theo mục đích.",
    ],
    syntax: "PIVOT: SUM(CASE WHEN điều_kiện THEN giá_trị ELSE 0 END) AS cột\nUNPIVOT: CROSS JOIN LATERAL (VALUES ('tên', cột_1), ('tên2', cột_2)) AS v(ten, gia_tri)",
    example: {
      sql: "SELECT o.status, COUNT(*) FILTER (WHERE o.line_id = 1) AS day_a, COUNT(*) FILTER (WHERE o.line_id = 2) AS day_b FROM production_orders o GROUP BY o.status ORDER BY o.status;",
      explain: [
        "Mỗi trạng thái lệnh là một dòng, các dây chuyền thành cột.",
        "Đây là PIVOT bằng FILTER, cùng ý tưởng với Conditional Aggregation.",
      ],
    },
    factory: "Báo cáo cuối tuần cần sản lượng ca 1, ca 2, ca 3 theo dây chuyền ở dạng rộng để đọc. Phân tích thêm cần dạng dài để lọc theo ca.",
    practice: [
      {
        question: "Với mỗi trạng thái lệnh (status), đếm số lệnh thuộc dây chuyền 1 (day_1) và dây chuyền 2 (day_2) bằng FILTER. Sắp xếp theo status.",
        hint: "COUNT(*) FILTER (WHERE line_id = 1) AS day_1, và tương tự cho line_id = 2.",
        solution: "SELECT status, COUNT(*) FILTER (WHERE line_id = 1) AS day_1, COUNT(*) FILTER (WHERE line_id = 2) AS day_2 FROM production_orders GROUP BY status ORDER BY status;",
      },
      {
        question: "UNPIVOT: với mỗi dây chuyền (line_code), tính tổng good_qty của ca 1, ca 2, ca 3 rồi đổi thành các dòng có cột ca (ten_ca) và san_luong. Sắp xếp theo line_code, ten_ca.",
        hint: "Tính ba cột trong một subquery, rồi CROSS JOIN LATERAL (VALUES ('Ca 1', ca_1), ('Ca 2', ca_2), ('Ca 3', ca_3)) AS v(ten_ca, san_luong).",
        solution: "SELECT t.line_code, v.ten_ca, v.san_luong FROM (SELECT l.line_code, SUM(CASE WHEN r.shift_id = 1 THEN r.good_qty ELSE 0 END) AS ca_1, SUM(CASE WHEN r.shift_id = 2 THEN r.good_qty ELSE 0 END) AS ca_2, SUM(CASE WHEN r.shift_id = 3 THEN r.good_qty ELSE 0 END) AS ca_3 FROM production_records r JOIN production_orders o ON o.order_id = r.order_id JOIN production_lines l ON l.line_id = o.line_id GROUP BY l.line_code) t CROSS JOIN LATERAL (VALUES ('Ca 1', t.ca_1), ('Ca 2', t.ca_2), ('Ca 3', t.ca_3)) AS v(ten_ca, san_luong) ORDER BY t.line_code, v.ten_ca;",
      },
    ],
    mistakes: [
      "Tìm từ khóa PIVOT chuẩn trong PostgreSQL. Dùng Conditional Aggregation hoặc FILTER thay thế.",
      "Quên ORDER BY khi đổi cột thành hàng, khiến thứ tự các dòng không ổn định.",
      "Dùng UNPIVOT khi báo cáo chỉ cần dạng rộng, làm truy vấn thêm phức tạp không cần thiết.",
    ],
    summary: [
      "PIVOT đổi giá trị thành cột bằng Conditional Aggregation hoặc FILTER.",
      "UNPIVOT đổi cột thành hàng bằng VALUES và LATERAL.",
      "Chọn dạng rộng cho báo cáo và dạng dài cho phân tích.",
    ],
  },
  {
    id: "31",
    module: 13,
    title: "Data Validation và Data Reconciliation: kiểm tra tính toàn vẹn dữ liệu",
    minutes: 50,
    objectives: [
      "Viết truy vấn kiểm tra dữ liệu không hợp lệ theo quy tắc nghiệp vụ.",
      "Đối chiếu dữ liệu giữa hai nguồn hoặc hai bước xử lý.",
      "Ghi lại kết quả kiểm tra để theo dõi chất lượng dữ liệu theo thời gian.",
    ],
    prerequisites: "Đã học GROUP BY, HAVING, JOIN và CASE WHEN.",
    explanation: [
      "Data validation là kiểm tra dữ liệu có đúng quy tắc không, ví dụ total_qty phải bằng good_qty + ng_qty. Truy vấn kiểm tra nên trả về số dòng vi phạm, và kỳ vọng là 0.",
      "Data reconciliation là đối chiếu hai nguồn với nhau, ví dụ sản lượng đạt theo bản ghi phải khớp với báo cáo tổng hợp. Chênh lệch cho thấy có dữ liệu bị mất, trùng hoặc sai.",
      "Nên tách kiểm tra thành các truy vấn có tên rõ ràng và chạy định kỳ. Khi có vi phạm, xác định nguyên nhân trước khi sửa dữ liệu.",
    ],
    syntax: "SELECT COUNT(*) AS so_dong_loi FROM bảng WHERE điều_kiện_vi_phạm;\nSELECT ... FROM nguồn_1 FULL OUTER JOIN nguồn_2 ... WHERE chênh_lệch <> 0;",
    example: {
      sql: "SELECT COUNT(*) AS so_dong_loi FROM production_records WHERE total_qty <> good_qty + ng_qty;",
      explain: [
        "Điều kiện tìm các dòng vi phạm quy tắc total_qty = good_qty + ng_qty.",
        "Kết quả 0 nghĩa là dữ liệu đạt kiểm tra này.",
      ],
    },
    factory: "Trước khi báo cáo sản lượng gửi ban giám đốc, cần kiểm tra dữ liệu MES và đối chiếu với lệnh sản xuất để chắc chắn các số khớp nhau.",
    practice: [
      {
        question: "Đếm số bản ghi trong production_records vi phạm quy tắc total_qty = good_qty + ng_qty. Đặt alias so_dong_loi.",
        hint: "WHERE total_qty <> good_qty + ng_qty.",
        solution: "SELECT COUNT(*) AS so_dong_loi FROM production_records WHERE total_qty <> good_qty + ng_qty;",
      },
      {
        question: "Đối chiếu: đếm số lệnh sản xuất có tổng good_qty của các bản ghi vượt planned_qty. Đặt alias so_lenh_vuot. Dùng subquery có GROUP BY và HAVING.",
        hint: "Gom production_records theo order_id, HAVING SUM(good_qty) > planned_qty, rồi COUNT trên kết quả đó.",
        solution: "SELECT COUNT(*) AS so_lenh_vuot FROM (SELECT o.order_id FROM production_orders o JOIN production_records r ON r.order_id = o.order_id GROUP BY o.order_id, o.planned_qty HAVING SUM(r.good_qty) > o.planned_qty) t;",
      },
    ],
    mistakes: [
      "Kiểm tra một lần rồi tin mãi, không chạy lại khi dữ liệu mới được nạp.",
      "Đối chiếu bằng cách so sánh tổng mà không dùng cùng phạm vi thời gian hoặc cùng mức chi tiết.",
      "Sửa dữ liệu ngay khi thấy lỗi mà chưa tìm nguyên nhân, làm mất dấu vết.",
    ],
    summary: [
      "Validation kiểm tra quy tắc, kỳ vọng số vi phạm bằng 0.",
      "Reconciliation đối chiếu hai nguồn, tìm chênh lệch.",
      "Tìm nguyên nhân trước khi sửa dữ liệu.",
    ],
  },
];
