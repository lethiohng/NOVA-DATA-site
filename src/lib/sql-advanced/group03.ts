import type { AdvancedLesson } from "./types";

/* Nhóm 3 — Database & Performance: mô hình hóa cho BI, chỉ mục và tối ưu truy vấn, view và giao dịch (module 7 đến 9). */

export const group03: AdvancedLesson[] = [
  {
    id: "13",
    module: 7,
    title: "Fact, Dimension và Star Schema",
    minutes: 55,
    objectives: [
      "Phân biệt bảng fact (số đo, sự kiện) và bảng dimension (ngữ cảnh mô tả).",
      "Xác định độ chi tiết (grain) của một bảng fact.",
      "Dựng truy vấn dạng star: một fact nối với nhiều dimension.",
    ],
    prerequisites: "Đã học JOIN nhiều bảng và GROUP BY (khóa này, bài 1).",
    explanation: [
      "Bảng fact ghi lại sự kiện đo được, như sản lượng tốt và lỗi của một bản ghi sản xuất. Bảng dimension mô tả ngữ cảnh: dây chuyền, sản phẩm, ca, ngày.",
      "Grain là độ chi tiết của một dòng fact. Ví dụ: một dòng là một bản ghi sản xuất, hoặc một dòng là tổng theo ngày, dây chuyền và sản phẩm. Phải xác định grain trước khi tính, vì cộng dồn sai grain sẽ làm số liệu bị nhân.",
      "Star schema có một fact ở giữa, các dimension nối quanh. Snowflake schema tách dimension thành nhiều bảng nhỏ hơn, ví dụ dây chuyền nối với nhà máy. Với BI, star thường dễ truy vấn hơn.",
    ],
    syntax: "FACT (khóa_dimension_1, khóa_dimension_2, số_đo) ↔ DIM_LINE, DIM_PRODUCT, DIM_DATE",
    example: {
      sql: "SELECT DATE_TRUNC('day', r.record_time) AS ngay,\n       l.line_code,\n       p.product_code,\n       SUM(r.good_qty) AS tong_tot\nFROM production_records r\nJOIN production_orders o ON o.order_id = r.order_id\nJOIN production_lines l ON l.line_id = o.line_id\nJOIN products p ON p.product_id = o.product_id\nGROUP BY 1, 2, 3\nORDER BY 1, 2, 3\nLIMIT 10;",
      explain: [
        "production_records đóng vai trò fact, các bảng line và product là dimension.",
        "Grain của kết quả là ngày, dây chuyền và sản phẩm: mỗi tổ hợp một dòng.",
      ],
    },
    factory: "Bộ phận BI cần một bảng phẳng để kéo vào dashboard: mỗi dòng là sản lượng của một ngày, một dây chuyền và một sản phẩm.",
    practice: [
      {
        question: "Dựng bảng phẳng dạng star: ngay (kiểu date), line_code, product_code, good_qty và ng_qty, nhóm theo ngày, dây chuyền và sản phẩm. Lấy 10 dòng đầu.",
        hint: "CAST(record_time AS date) AS ngay, SUM(good_qty), SUM(ng_qty), GROUP BY 1, 2, 3.",
        solution:
          "SELECT CAST(r.record_time AS date) AS ngay, l.line_code, p.product_code, SUM(r.good_qty) AS good_qty, SUM(r.ng_qty) AS ng_qty FROM production_records r JOIN production_orders o ON o.order_id = r.order_id JOIN production_lines l ON l.line_id = o.line_id JOIN products p ON p.product_id = o.product_id GROUP BY 1, 2, 3 ORDER BY 1, 2, 3 LIMIT 10;",
      },
      {
        question: "Kiểm tra grain: đếm số dòng của bảng tổng hợp theo ngày, dây chuyền và sản phẩm (so_dong).",
        hint: "Đặt truy vấn GROUP BY trong subquery rồi COUNT(*) ở ngoài.",
        solution:
          "SELECT COUNT(*) AS so_dong FROM (SELECT CAST(r.record_time AS date), o.line_id, o.product_id FROM production_records r JOIN production_orders o ON o.order_id = r.order_id GROUP BY 1, 2, 3) t;",
      },
    ],
    mistakes: [
      "Cộng số đo ở grain sai, ví dụ cộng good_qty của bảng đã tổng hợp theo ngày rồi tổng hợp lại theo tháng vẫn đúng, nhưng cộng dimension vào fact làm nhân dòng.",
      "Không ghi rõ grain khi thiết kế, các truy vấn sau đó tính khác nhau.",
      "Đưa thuộc tính mô tả (tên, mã) vào bảng fact thay vì dimension, làm bảng phình to và khó đổi.",
    ],
    summary: [
      "Fact chứa số đo, dimension chứa ngữ cảnh mô tả.",
      "Xác định grain trước khi tổng hợp.",
      "Star schema: một fact nối với nhiều dimension.",
    ],
  },
  {
    id: "14",
    module: 7,
    title: "Lịch sử dữ liệu và Slowly Changing Dimensions",
    minutes: 50,
    objectives: [
      "Hiểu vì sao dimension cần lưu lịch sử khi thuộc tính thay đổi.",
      "Dùng khoảng hiệu lực (từ ngày, đến ngày) để tìm phiên bản đúng tại một thời điểm.",
      "Phân biệt SCD loại 1 (ghi đè) và loại 2 (giữ lịch sử).",
    ],
    prerequisites: "Đã học fact và dimension (bài trước) và điều kiện BETWEEN.",
    explanation: [
      "Ví dụ: dây chuyền LINE-A chuyển từ Building 1 sang Building 2 ngày 1/7. Nếu chỉ ghi đè vị trí mới, báo cáo quý 1 sẽ bị tính sai vị trí.",
      "SCD loại 1 ghi đè giá trị cũ, không giữ lịch sử. SCD loại 2 thêm một dòng mới, với khoảng hiệu lực từ ngày và đến ngày, để giữ cả phiên bản cũ.",
      "Để tìm phiên bản tại ngày X, lọc X nằm trong khoảng từ ngày đến ngày. Bộ dữ liệu NOVA không có bảng lịch sử, nên bài này dựng dữ liệu mẫu bằng VALUES.",
    ],
    syntax: "WHERE ngày_cần_xem BETWEEN hiệu_lực_từ AND hiệu_lực_đến",
    example: {
      sql: "WITH lich_su (line_code, vi_tri, hieu_luc_tu, hieu_luc_den) AS (\n  VALUES ('LINE-A', 'Building 1', DATE '2025-01-01', DATE '2025-06-30'),\n         ('LINE-A', 'Building 2', DATE '2025-07-01', DATE '9999-12-31')\n)\nSELECT line_code, vi_tri\nFROM lich_su\nWHERE DATE '2025-03-15' BETWEEN hieu_luc_tu AND hieu_luc_den;",
      explain: [
        "Ngày 15/3/2025 nằm trong khoảng của phiên bản Building 1, nên kết quả là Building 1.",
        "Đầu cuối 9999-12-31 là quy ước cho phiên bản đang hiệu lực.",
      ],
    },
    factory: "Báo cáo sản lượng quý 1 phải gắn đúng vị trí dây chuyền tại thời điểm đó, không dùng vị trí hiện tại.",
    practice: [
      {
        question: "Với lịch sử mẫu của LINE-A (Building 1 từ 2025-01-01 đến 2025-06-30, Building 2 từ 2025-07-01 đến 9999-12-31), tìm vị trí của LINE-A ngày 2025-08-01 (vi_tri).",
        hint: "Giữ bảng VALUES như ví dụ và lọc DATE '2025-08-01' BETWEEN hieu_luc_tu AND hieu_luc_den.",
        solution:
          "WITH lich_su (line_code, vi_tri, hieu_luc_tu, hieu_luc_den) AS (VALUES ('LINE-A', 'Building 1', DATE '2025-01-01', DATE '2025-06-30'), ('LINE-A', 'Building 2', DATE '2025-07-01', DATE '9999-12-31')) SELECT vi_tri FROM lich_su WHERE line_code = 'LINE-A' AND DATE '2025-08-01' BETWEEN hieu_luc_tu AND hieu_luc_den;",
      },
      {
        question: "Đếm số phiên bản lịch sử của mỗi dây chuyền (line_code, so_phien_ban), dùng lịch sử mẫu gồm LINE-A (2 phiên bản) và LINE-B (1 phiên bản: Building 2 từ 2025-01-01 đến 9999-12-31).",
        hint: "Viết VALUES với 3 dòng, rồi GROUP BY line_code.",
        solution:
          "WITH lich_su (line_code, vi_tri, hieu_luc_tu, hieu_luc_den) AS (VALUES ('LINE-A', 'Building 1', DATE '2025-01-01', DATE '2025-06-30'), ('LINE-A', 'Building 2', DATE '2025-07-01', DATE '9999-12-31'), ('LINE-B', 'Building 2', DATE '2025-01-01', DATE '9999-12-31')) SELECT line_code, COUNT(*) AS so_phien_ban FROM lich_su GROUP BY line_code ORDER BY line_code;",
      },
    ],
    mistakes: [
      "Dùng SCD loại 1 cho dữ liệu cần báo cáo lịch sử, làm số liệu quá khứ bị đổi theo.",
      "Dùng < và > thay vì BETWEEN với biên bao gồm, làm mất những ngày bằng ngày bắt đầu hoặc kết thúc.",
      "Không có quy ước cho phiên bản hiện tại (ngày kết thúc rỗng hoặc xa), khiến truy vấn bỏ sót dòng.",
    ],
    summary: [
      "SCD loại 2 giữ lịch sử bằng khoảng hiệu lực.",
      "Tìm phiên bản đúng bằng điều kiện ngày nằm trong khoảng.",
      "Báo cáo quá khứ phải dùng phiên bản đang có hiệu lực tại thời điểm đó.",
    ],
  },
  {
    id: "15",
    module: 8,
    title: "Chỉ mục B-tree, composite index và EXPLAIN",
    minutes: 50,
    objectives: [
      "Hiểu vì sao chỉ mục B-tree giúp tìm và sắp xếp nhanh.",
      "Tạo composite index đúng thứ tự cột.",
      "Đọc kế hoạch truy vấn bằng EXPLAIN.",
    ],
    prerequisites: "Đã học WHERE, ORDER BY và LIMIT (khóa Basic).",
    explanation: [
      "Chỉ mục B-tree là cấu trúc sắp xếp giúp PostgreSQL tìm dòng theo điều kiện bằng hoặc khoảng mà không phải đọc cả bảng.",
      "Composite index gồm nhiều cột, ví dụ (machine_id, record_time). Cột đầu tiên nên là cột thường được lọc bằng dấu bằng, cột sau là cột dùng để sắp xếp hoặc lọc khoảng.",
      "EXPLAIN cho biết kế hoạch: quét toàn bảng (Seq Scan) hay dùng chỉ mục (Index Scan). EXPLAIN ANALYZE chạy thật và cho thêm thời gian thực tế.",
    ],
    syntax: "CREATE INDEX ten_index ON bang (cot_1, cot_2); EXPLAIN SELECT ...",
    example: {
      sql: "EXPLAIN\nSELECT record_id, record_time, good_qty\nFROM production_records\nWHERE machine_id = 3\nORDER BY record_time DESC\nLIMIT 10;",
      explain: [
        "Với chỉ mục (machine_id, record_time), PostgreSQL lấy đúng bản ghi của máy 3 theo thứ tự thời gian và dừng sau 10 dòng.",
        "Không có chỉ mục, kế hoạch sẽ quét toàn bảng rồi sắp xếp.",
      ],
    },
    factory: "Màn hình giám sát máy phải hiện 10 bản ghi mới nhất của một máy trong vài mili giây, kể cả khi bảng có hàng triệu dòng.",
    practice: [
      {
        question: "Liệt kê 10 bản ghi mới nhất của máy có machine_id = 1 (record_id, record_time, good_qty), viết để phù hợp với chỉ mục (machine_id, record_time).",
        hint: "WHERE machine_id = 1 ORDER BY record_time DESC LIMIT 10.",
        solution:
          "SELECT record_id, record_time, good_qty FROM production_records WHERE machine_id = 1 ORDER BY record_time DESC LIMIT 10;",
      },
      {
        question: "Đếm bản ghi của ngày đầu tiên có dữ liệu (so_ban_ghi). Viết điều kiện dạng khoảng thời gian, không đặt hàm lên cột record_time.",
        hint: "record_time >= ngày_đầu AND record_time < ngày_đầu + 1, ngày đầu lấy bằng MIN(record_time)::date.",
        solution:
          "SELECT COUNT(*) AS so_ban_ghi FROM production_records WHERE record_time >= (SELECT MIN(record_time)::date FROM production_records) AND record_time < (SELECT MIN(record_time)::date + 1 FROM production_records);",
      },
    ],
    mistakes: [
      "Đặt cột sắp xếp lên trước cột lọc bằng trong composite index, PostgreSQL không tận dụng được đầy đủ.",
      "Đặt hàm lên cột như CAST(record_time AS date) = ..., làm chỉ mục không dùng được.",
      "Tạo quá nhiều chỉ mục: mỗi chỉ mục làm INSERT và UPDATE chậm hơn.",
    ],
    summary: [
      "Chỉ mục B-tree giúp lọc và sắp xếp nhanh.",
      "Thứ tự cột trong composite index quan trọng.",
      "EXPLAIN đọc kế hoạch truy vấn, EXPLAIN ANALYZE đo thời gian thật.",
    ],
  },
  {
    id: "16",
    module: 8,
    title: "Partial index, EXISTS và viết truy vấn dễ tối ưu",
    minutes: 50,
    objectives: [
      "Tạo partial index chỉ cho các dòng thỏa một điều kiện.",
      "Chọn EXISTS hoặc NOT EXISTS thay cho IN khi kiểm tra sự tồn tại.",
      "Viết điều kiện để PostgreSQL dùng được chỉ mục.",
    ],
    prerequisites: "Đã học chỉ mục B-tree (bài trước) và subquery EXISTS (khóa Intermediate, module 8).",
    explanation: [
      "Partial index chỉ lưu các dòng thỏa điều kiện WHERE khi tạo chỉ mục. Ví dụ, chỉ mục cho kiểm tra có result = 'NG' nhỏ hơn và nhanh hơn chỉ mục cho toàn bộ kiểm tra.",
      "EXISTS dừng ngay khi tìm thấy một dòng khớp, nên phù hợp để kiểm tra sự tồn tại. NOT EXISTS là phiên bản phủ định.",
      "Đừng đặt hàm lên cột được lọc. Viết điều kiện theo khoảng hoặc so sánh trực tiếp để giữ được khả năng dùng chỉ mục.",
    ],
    syntax: "CREATE INDEX ten ON bang (cot) WHERE điều_kiện; WHERE EXISTS (SELECT 1 FROM ... WHERE ...)",
    example: {
      sql: "SELECT o.order_code\nFROM production_orders o\nWHERE EXISTS (\n  SELECT 1 FROM quality_inspections q\n  WHERE q.order_id = o.order_id AND q.result = 'NG'\n)\nORDER BY o.order_code;",
      explain: [
        "Mỗi đơn chỉ cần một kiểm tra NG là đủ để xuất hiện trong kết quả.",
        "Partial index phù hợp: CREATE INDEX ... ON quality_inspections (order_id) WHERE result = 'NG'.",
      ],
    },
    factory: "Trang chất lượng cần liệt kê nhanh các đơn đã từng có lỗi NG để điều tra.",
    practice: [
      {
        question: "Liệt kê các đơn có ít nhất một kiểm tra NG (order_code), dùng EXISTS.",
        hint: "Giống ví dụ, lọc result = 'NG' trong subquery EXISTS.",
        solution:
          "SELECT o.order_code FROM production_orders o WHERE EXISTS (SELECT 1 FROM quality_inspections q WHERE q.order_id = o.order_id AND q.result = 'NG') ORDER BY o.order_code;",
      },
      {
        question: "Đếm số đơn không có kiểm tra NG nào (so_don), dùng NOT EXISTS.",
        hint: "NOT EXISTS với cùng subquery, rồi COUNT(*).",
        solution:
          "SELECT COUNT(*) AS so_don FROM production_orders o WHERE NOT EXISTS (SELECT 1 FROM quality_inspections q WHERE q.order_id = o.order_id AND q.result = 'NG');",
      },
    ],
    mistakes: [
      "Dùng NOT IN với subquery có NULL: kết quả thành rỗng. NOT EXISTS an toàn hơn.",
      "Tạo partial index nhưng viết truy vấn với điều kiện khác, PostgreSQL không dùng được chỉ mục.",
      "Dùng DISTINCT để khử trùng thay vì EXISTS, làm truy vấn chậm hơn.",
    ],
    summary: [
      "Partial index chỉ lưu các dòng cần thiết.",
      "EXISTS và NOT EXISTS kiểm tra sự tồn tại hiệu quả.",
      "Giữ cột lọc không bị bọc trong hàm.",
    ],
  },
  {
    id: "17",
    module: 9,
    title: "View và view báo cáo",
    minutes: 45,
    objectives: [
      "Hiểu view là truy vấn được đặt tên, không lưu dữ liệu.",
      "Viết truy vấn định nghĩa một view báo cáo sản lượng và chất lượng.",
      "Dùng view như một bảng khi truy vấn tiếp.",
    ],
    prerequisites: "Đã học JOIN, GROUP BY và CTE (các bài đầu của khóa này).",
    explanation: [
      "View là một truy vấn được lưu dưới một tên. Mỗi lần gọi view, PostgreSQL chạy lại truy vấn gốc, nên dữ liệu luôn mới nhất.",
      "View giúp dashboard và người dùng cuối không phải viết lại phần JOIN và tính toán phức tạp. Chỉ cần đảm bảo định nghĩa đúng grain.",
      "Với truy vấn chậm mà không cần dữ liệu luôn mới nhất, nên dùng materialized view (bài sau).",
    ],
    syntax: "CREATE VIEW ten_view AS SELECT ...; SELECT * FROM ten_view;",
    example: {
      sql: "SELECT l.line_code,\n       SUM(r.good_qty) AS good_qty,\n       SUM(r.ng_qty) AS ng_qty,\n       ROUND(100.0 * SUM(r.ng_qty) / SUM(r.total_qty), 2) AS ty_le_ng\nFROM production_records r\nJOIN production_orders o ON o.order_id = r.order_id\nJOIN production_lines l ON l.line_id = o.line_id\nGROUP BY l.line_code\nORDER BY l.line_code;",
      explain: [
        "Phần SELECT này là định nghĩa của view bao_cao_san_luong nếu viết thành CREATE VIEW.",
        "Mỗi dây chuyền một dòng, grain được giữ rõ ràng.",
      ],
    },
    factory: "Các dashboard cần cùng một định nghĩa NG rate. View giúp mọi báo cáo dùng chung một công thức.",
    practice: [
      {
        question: "Viết truy vấn định nghĩa báo cáo theo dây chuyền (line_code, good_qty, ng_qty, ty_le_ng) như trong ví dụ.",
        hint: "Giống ví dụ, nhóm theo line_code.",
        solution:
          "SELECT l.line_code, SUM(r.good_qty) AS good_qty, SUM(r.ng_qty) AS ng_qty, ROUND(100.0 * SUM(r.ng_qty) / SUM(r.total_qty), 2) AS ty_le_ng FROM production_records r JOIN production_orders o ON o.order_id = r.order_id JOIN production_lines l ON l.line_id = o.line_id GROUP BY l.line_code ORDER BY l.line_code;",
      },
      {
        question: "Dùng báo cáo trên (CTE bao_cao): lấy các dây chuyền có ty_le_ng cao hơn trung bình ty_le_ng của tất cả dây chuyền (line_code).",
        hint: "WHERE ty_le_ng > (SELECT AVG(ty_le_ng) FROM bao_cao).",
        solution:
          "WITH bao_cao AS (SELECT l.line_code, SUM(r.good_qty) AS good_qty, SUM(r.ng_qty) AS ng_qty, ROUND(100.0 * SUM(r.ng_qty) / SUM(r.total_qty), 2) AS ty_le_ng FROM production_records r JOIN production_orders o ON o.order_id = r.order_id JOIN production_lines l ON l.line_id = o.line_id GROUP BY l.line_code) SELECT line_code FROM bao_cao WHERE ty_le_ng > (SELECT AVG(ty_le_ng) FROM bao_cao) ORDER BY line_code;",
      },
    ],
    mistakes: [
      "Nghĩ view lưu dữ liệu: view chỉ lưu câu truy vấn, nên view chậm thì vẫn chậm.",
      "Định nghĩa view không ghi rõ grain, người dùng sau đó tổng hợp lại sai.",
      "Đặt ORDER BY trong view rồi mong thứ tự được giữ khi gọi view, thứ tự không được đảm bảo.",
    ],
    summary: [
      "View là truy vấn được đặt tên, luôn chạy lại trên dữ liệu mới.",
      "Một định nghĩa view dùng chung giúp các báo cáo thống nhất.",
      "Ghi rõ grain của view.",
    ],
  },
  {
    id: "18",
    module: 9,
    title: "Materialized view, INSERT ON CONFLICT và giao dịch",
    minutes: 55,
    objectives: [
      "Dùng materialized view để lưu kết quả và làm mới theo lịch.",
      "Ghi snapshot KPI bằng INSERT ... ON CONFLICT để không bị trùng.",
      "Hiểu COMMIT và ROLLBACK để giữ dữ liệu nhất quán (ACID).",
    ],
    prerequisites: "Đã học view (bài trước) và GROUP BY.",
    explanation: [
      "Materialized view lưu kết quả truy vấn thành dữ liệu thật. Cần REFRESH MATERIALIZED VIEW để cập nhật, phù hợp với báo cáo chạy theo lịch như mỗi đêm.",
      "INSERT ... ON CONFLICT (khóa) DO UPDATE giúp ghi snapshot theo ngày: nếu ngày đã có thì cập nhật, nếu chưa có thì thêm mới. Nhờ vậy chạy lại không tạo dòng trùng.",
      "Giao dịch (BEGIN, COMMIT, ROLLBACK) gom nhiều thao tác thành một đơn vị. ACID đảm bảo hoặc tất cả thành công, hoặc không thao tác nào được ghi. Khi giao dịch khác đang giữ khóa một dòng, thao tác khác phải chờ.",
    ],
    syntax: "CREATE MATERIALIZED VIEW ten AS SELECT ...; REFRESH MATERIALIZED VIEW ten; INSERT ... ON CONFLICT (ngay) DO UPDATE SET ...",
    example: {
      sql: "SELECT CAST(record_time AS date) AS ngay,\n       SUM(good_qty) AS good_qty,\n       SUM(ng_qty) AS ng_qty\nFROM production_records\nGROUP BY 1\nORDER BY 1\nLIMIT 7;",
      explain: [
        "Kết quả này là nội dung của một snapshot KPI theo ngày.",
        "Khi đưa vào bảng snapshot, khóa là ngay, nên ON CONFLICT (ngay) cập nhật đúng dòng của ngày đó.",
      ],
    },
    factory: "Mỗi đêm hệ thống chốt KPI của ngày. Nếu job chạy lại, số liệu phải được cập nhật chứ không bị nhân đôi.",
    practice: [
      {
        question: "Tạo snapshot KPI của 7 ngày đầu tiên (ngay, good_qty, ng_qty), sắp xếp theo ngày.",
        hint: "Giống ví dụ, GROUP BY ngày, ORDER BY ngày, LIMIT 7.",
        solution:
          "SELECT CAST(record_time AS date) AS ngay, SUM(good_qty) AS good_qty, SUM(ng_qty) AS ng_qty FROM production_records GROUP BY 1 ORDER BY 1 LIMIT 7;",
      },
      {
        question: "Tính NG rate theo ngày (ngay, ng_rate làm tròn 2 chữ số), cho 7 ngày đầu tiên, tính bằng tổng NG chia tổng mẫu.",
        hint: "ROUND(100.0 * SUM(ng_qty) / SUM(total_qty), 2).",
        solution:
          "SELECT CAST(record_time AS date) AS ngay, ROUND(100.0 * SUM(ng_qty) / SUM(total_qty), 2) AS ng_rate FROM production_records GROUP BY 1 ORDER BY 1 LIMIT 7;",
      },
    ],
    mistakes: [
      "Quên REFRESH nên materialized view hiển thị dữ liệu cũ.",
      "Dùng INSERT thường cho snapshot hằng ngày, chạy lại sẽ báo lỗi trùng khóa hoặc nhân đôi dữ liệu.",
      "Thực hiện nhiều thao tác mà không có BEGIN và COMMIT, một bước lỗi làm dữ liệu nửa vời.",
    ],
    summary: [
      "Materialized view lưu kết quả và cần REFRESH.",
      "INSERT ... ON CONFLICT giúp ghi snapshot không trùng.",
      "Giao dịch đảm bảo tính nhất quán theo ACID.",
    ],
  },
];
