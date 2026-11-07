import type { IntermediateLesson } from "./types";

/* Module 09 — CTE: WITH, CTE đơn, nhiều CTE, CTE với JOIN, CTE với tổng hợp, so với subquery. */

export const module09: IntermediateLesson[] = [
  {
    id: "14",
    module: 9,
    title: "Giới thiệu CTE: đặt tên cho các bước",
    minutes: 45,
    objectives: [
      "Hiểu CTE là bảng tạm có tên, khai báo bằng WITH.",
      "Viết được một CTE đơn và dùng nó trong câu SELECT chính.",
      "Thấy lợi ích về dễ đọc so với subquery lồng nhau.",
    ],
    prerequisites: "Đã học subquery và derived table (module 08).",
    explanation: [
      "CTE (Common Table Expression) khai báo bằng WITH tên AS (SELECT ...). Sau đó có thể dùng tên đó như một bảng trong câu lệnh.",
      "CTE giúp chia một câu truy vấn phức tạp thành các bước có tên, dễ đọc và dễ sửa hơn subquery lồng nhau.",
      "CTE chỉ tồn tại trong câu lệnh đó.",
    ],
    syntax: "WITH ten_cte AS (\n  SELECT ... FROM ...\n)\nSELECT ... FROM ten_cte;",
    example: {
      sql: "WITH san_luong AS (\n  SELECT machine_id, SUM(good_qty) AS tong_dat\n  FROM production_records\n  GROUP BY machine_id\n)\nSELECT machine_id, tong_dat\nFROM san_luong\nWHERE tong_dat > 10000;",
      explain: [
        "CTE san_luong tính tổng sản phẩm đạt theo máy và đặt tên cho bước đó.",
        "Câu chính chỉ lọc các máy trên 10000, đọc dễ hơn subquery lồng.",
      ],
    },
    factory: "Dashboard sản xuất có nhiều bước tính. Đặt tên cho từng bước giúp người khác kiểm tra logic.",
    practice: [
      {
        question: "Dùng CTE tên don_dang_chay chọn các đơn có status 'Running', rồi lấy order_code và planned_qty từ CTE đó.",
        hint: "WITH don_dang_chay AS (SELECT ... FROM production_orders WHERE status = 'Running') SELECT ... FROM don_dang_chay.",
        solution: "WITH don_dang_chay AS (SELECT order_code, planned_qty FROM production_orders WHERE status = 'Running') SELECT order_code, planned_qty FROM don_dang_chay;",
      },
      {
        question: "Dùng CTE tên may_ca_nhan chọn máy có machine_type là 'CNC', rồi đếm số máy đó.",
        hint: "Đếm bằng COUNT(*) FROM may_ca_nhan.",
        solution: "WITH may_ca_nhan AS (SELECT machine_id FROM machines WHERE machine_type = 'CNC') SELECT COUNT(*) AS so_may FROM may_ca_nhan;",
      },
    ],
    mistakes: [
      "Quên dấu phẩy khi có nhiều CTE (sẽ học ở bài 16).",
      "Nghĩ CTE lưu dữ liệu lâu dài; thực tế nó chỉ tồn tại trong một câu lệnh.",
    ],
    quiz: [
      { q: "CTE khai báo bằng từ khóa nào?", a: "WITH." },
      { q: "CTE tồn tại trong phạm vi nào?", a: "Chỉ trong câu lệnh đó." },
    ],
    summary: [
      "CTE là bảng tạm có tên khai báo bằng WITH.",
      "Chia câu phức tạp thành các bước có tên.",
    ],
    next: "Bài 15 dùng CTE với JOIN để kết hợp dữ liệu.",
  },
  {
    id: "15",
    module: 9,
    title: "CTE đơn và cách tham chiếu",
    minutes: 45,
    objectives: [
      "Viết CTE dựa trên một bảng và lọc kết quả.",
      "Tham chiếu CTE nhiều lần trong câu chính.",
      "Đặt alias cho CTE khi cần.",
    ],
    prerequisites: "Đã học giới thiệu CTE (bài 14).",
    explanation: [
      "Một CTE có thể được tham chiếu nhiều lần trong cùng câu lệnh, giúp tránh lặp lại cùng một subquery.",
      "Có thể đặt alias khi FROM tên CTE, ví dụ FROM san_luong s, để viết gọn hơn.",
      "Mỗi CTE có thể có tên cột riêng nếu đặt trong ngoặc sau tên CTE.",
    ],
    syntax: "WITH ten AS (SELECT ...) SELECT ... FROM ten a JOIN ten b ON ...;",
    example: {
      sql: "WITH tong AS (\n  SELECT line_id, COUNT(*) AS so_don FROM production_orders GROUP BY line_id\n)\nSELECT l.line_code, t.so_don\nFROM tong t\nJOIN production_lines l ON l.line_id = t.line_id;",
      explain: [
        "CTE tong đếm đơn theo dây chuyền.",
        "Câu chính ghép kết quả đó với tên dây chuyền.",
      ],
    },
    factory: "Báo cáo muốn hiện mã dây chuyền bên cạnh số đơn để dễ so sánh.",
    practice: [
      {
        question: "Dùng CTE đếm số bản ghi production_records theo machine_id, rồi lấy machine_id có hơn 1000 bản ghi.",
        hint: "CTE GROUP BY machine_id với COUNT(*), câu chính WHERE so_ban_ghi > 1000.",
        solution: "WITH dem AS (SELECT machine_id, COUNT(*) AS so_ban_ghi FROM production_records GROUP BY machine_id) SELECT machine_id, so_ban_ghi FROM dem WHERE so_ban_ghi > 1000;",
      },
      {
        question: "Dùng CTE tên ds để lấy product_id và product_name từ products, rồi đếm số dòng của CTE.",
        hint: "WITH ds AS (SELECT product_id, product_name FROM products) SELECT COUNT(*) FROM ds.",
        solution: "WITH ds AS (SELECT product_id, product_name FROM products) SELECT COUNT(*) AS so_san_pham FROM ds;",
      },
    ],
    mistakes: [
      "Tham chiếu CTE trước khi khai báo, câu lệnh báo lỗi.",
      "Đặt tên CTE trùng với tên bảng thật, gây nhầm lẫn khi đọc.",
    ],
    quiz: [
      { q: "CTE có tham chiếu được nhiều lần không?", a: "Có, trong cùng câu lệnh." },
      { q: "Có thể đặt alias cho CTE không?", a: "Có, như một bảng thường." },
    ],
    summary: [
      "CTE có thể tham chiếu nhiều lần.",
      "Đặt alias để viết gọn.",
    ],
    next: "Bài 16 khai báo nhiều CTE liên tiếp.",
  },
  {
    id: "16",
    module: 9,
    title: "Nhiều CTE: chuỗi các bước phụ thuộc",
    minutes: 60,
    objectives: [
      "Khai báo nhiều CTE cách nhau bằng dấu phẩy.",
      "Hiểu CTE sau có thể dùng CTE trước.",
      "Tách bước tính theo từng nguồn dữ liệu.",
    ],
    prerequisites: "Đã học CTE đơn (bài 14, 15).",
    explanation: [
      "Có thể khai báo nhiều CTE sau một WITH, cách nhau bằng dấu phẩy. Mỗi CTE có thể dùng CTE khai báo trước đó.",
      "Cách này phù hợp với các báo cáo tính từ nhiều nguồn: tách production, quality và downtime thành từng bước, rồi ghép lại.",
      "Mỗi CTE nên làm một việc rõ ràng, để khi có lỗi dễ tìm.",
    ],
    syntax: "WITH a AS (...),\n     b AS (SELECT ... FROM a)\nSELECT ... FROM b;",
    example: {
      sql: "WITH san_luong AS (\n  SELECT order_id, SUM(good_qty) AS dat FROM production_records GROUP BY order_id\n),\ndon AS (\n  SELECT s.order_id, s.dat, o.planned_qty\n  FROM san_luong s JOIN production_orders o ON o.order_id = s.order_id\n)\nSELECT COUNT(*) AS don_vuot_ke_hoach FROM don WHERE dat > planned_qty;",
      explain: [
        "CTE san_luong tính sản phẩm đạt theo đơn.",
        "CTE don ghép với kế hoạch; CTE này dùng kết quả của CTE trước.",
      ],
    },
    factory: "Đếm số đơn vượt kế hoạch cần hai bước: tính sản lượng thực tế, rồi so với kế hoạch.",
    practice: [
      {
        question: "Dùng hai CTE: tinh_loi tính SUM(ng_qty) theo machine_id, và may_loi chọn machine_id có tổng ng_qty trên 0 từ tinh_loi; đếm số máy đó.",
        hint: "Khai báo tinh_loi, rồi may_loi dùng tinh_loi, cuối cùng COUNT(*) FROM may_loi.",
        solution: "WITH tinh_loi AS (SELECT machine_id, SUM(ng_qty) AS tong_loi FROM production_records GROUP BY machine_id), may_loi AS (SELECT machine_id FROM tinh_loi WHERE tong_loi > 0) SELECT COUNT(*) AS so_may FROM may_loi;",
      },
      {
        question: "Dùng hai CTE tính tổng planned_qty theo product_id (CTE 1) rồi lấy product_id có tổng lớn hơn 10000 (CTE 2).",
        hint: "CTE 1 dùng GROUP BY product_id; CTE 2 WHERE tong > 10000.",
        solution: "WITH theo_sp AS (SELECT product_id, SUM(planned_qty) AS tong FROM production_orders GROUP BY product_id), sp_lon AS (SELECT product_id FROM theo_sp WHERE tong > 10000) SELECT product_id FROM sp_lon;",
      },
    ],
    mistakes: [
      "Quên dấu phẩy giữa các CTE nên câu lệnh báo lỗi cú pháp.",
      "Đặt CTE sau tham chiếu đến CTE chưa khai báo.",
    ],
    quiz: [
      { q: "Các CTE cách nhau bằng gì?", a: "Dấu phẩy, sau một WITH duy nhất." },
      { q: "CTE sau có dùng được CTE trước không?", a: "Có, miễn là CTE trước được khai báo trước." },
    ],
    summary: [
      "Nhiều CTE cách nhau bằng dấu phẩy.",
      "CTE sau dùng được CTE trước.",
    ],
    next: "Bài 17 ghép CTE với JOIN.",
  },
  {
    id: "17",
    module: 9,
    title: "CTE kết hợp JOIN",
    minutes: 45,
    objectives: [
      "JOIN một CTE với bảng thật.",
      "Chuẩn hóa dữ liệu trước khi ghép.",
      "Đọc được câu lệnh có CTE và JOIN.",
    ],
    prerequisites: "Đã học JOIN (module 07) và CTE (bài 14 đến 16).",
    explanation: [
      "CTE có thể được JOIN với bảng thật hoặc CTE khác, giống như một bảng bình thường.",
      "Cách này hữu ích khi cần tổng hợp trước rồi mới lấy thêm tên, như tên dây chuyền.",
      "Thường nên đặt điều kiện lọc trong CTE để giảm dữ liệu trước khi JOIN.",
    ],
    syntax: "WITH cte AS (...)\nSELECT ... FROM cte JOIN bảng ON ...;",
    example: {
      sql: "WITH don_theo_line AS (\n  SELECT line_id, COUNT(*) AS so_don FROM production_orders GROUP BY line_id\n)\nSELECT l.line_name, d.so_don\nFROM don_theo_line d\nJOIN production_lines l ON l.line_id = d.line_id;",
      explain: [
        "CTE đếm đơn theo dây chuyền.",
        "JOIN với production_lines để hiện tên dây chuyền.",
      ],
    },
    factory: "Báo cáo muốn hiện tên dây chuyền và số đơn để trưởng chuyền so sánh tải công việc.",
    practice: [
      {
        question: "Dùng CTE đếm số máy theo line_id, rồi JOIN với production_lines để lấy line_name và so_may.",
        hint: "WITH may_theo_line AS (SELECT line_id, COUNT(*) AS so_may FROM machines GROUP BY line_id) rồi JOIN.",
        solution: "WITH may_theo_line AS (SELECT line_id, COUNT(*) AS so_may FROM machines GROUP BY line_id) SELECT l.line_name, m.so_may FROM may_theo_line m JOIN production_lines l ON l.line_id = m.line_id;",
      },
      {
        question: "Dùng CTE tổng ng_qty theo order_id, rồi JOIN với production_orders để lấy order_code và tổng lỗi.",
        hint: "JOIN CTE với production_orders ON order_id.",
        solution: "WITH loi_theo_don AS (SELECT order_id, SUM(ng_qty) AS tong_loi FROM production_records GROUP BY order_id) SELECT o.order_code, l.tong_loi FROM loi_theo_don l JOIN production_orders o ON o.order_id = l.order_id;",
      },
    ],
    mistakes: [
      "JOIN CTE đã tổng hợp với bảng chi tiết nên số dòng bị nhân lên.",
      "Quên đặt bí danh cho CTE, khiến cột bị mơ hồ.",
    ],
    quiz: [
      { q: "CTE có JOIN với bảng thật được không?", a: "Có, như một bảng bình thường." },
      { q: "Nên lọc ở đâu để hiệu quả?", a: "Lọc sớm trong CTE để giảm dữ liệu trước khi JOIN." },
    ],
    summary: [
      "CTE JOIN được với bảng thật.",
      "Lọc sớm trong CTE.",
    ],
    next: "Bài 18 dùng CTE với tổng hợp (GROUP BY).",
  },
  {
    id: "18",
    module: 9,
    title: "CTE với tổng hợp (GROUP BY)",
    minutes: 45,
    objectives: [
      "Dùng GROUP BY bên trong CTE.",
      "Tính thêm chỉ số từ kết quả tổng hợp ở câu chính.",
      "Tính tỷ lệ NG rate từ hai tổng.",
    ],
    prerequisites: "Đã học GROUP BY và hàm tổng hợp (khóa Basic, module 06).",
    explanation: [
      "Khi tính chỉ số phức tạp như tỷ lệ, thường cần tổng hợp trước (tổng OK, tổng NG) trong CTE, rồi tính tỷ lệ ở câu chính.",
      "Tách bước này giúp kiểm tra từng tổng trước khi tính tỷ lệ.",
      "Nhớ xử lý mẫu số bằng 0 (sẽ học ở module 10).",
    ],
    syntax: "WITH tong AS (SELECT cột, SUM(...) AS a, SUM(...) AS b FROM ... GROUP BY cột)\nSELECT cột, a, b, a * 1.0 / b FROM tong;",
    example: {
      sql: "WITH tong AS (\n  SELECT machine_id, SUM(good_qty) AS dat, SUM(total_qty) AS tong\n  FROM production_records\n  GROUP BY machine_id\n)\nSELECT machine_id, dat, tong, ROUND(dat * 1.0 / tong, 4) AS ty_le_dat\nFROM tong;",
      explain: [
        "CTE tính tổng sản phẩm đạt và tổng sản phẩm theo máy.",
        "Câu chính chia hai tổng để có tỷ lệ đạt; nhân 1.0 để không bị chia số nguyên.",
      ],
    },
    factory: "Dashboard cần tỷ lệ đạt của từng máy để so sánh máy nào đang hoạt động kém.",
    practice: [
      {
        question: "Dùng CTE tính SUM(ng_qty) và SUM(total_qty) theo machine_id, rồi lấy machine_id và tỷ lệ NG = tổng_lỗi * 1.0 / tổng_total.",
        hint: "CTE GROUP BY machine_id, câu chính tính ROUND(tong_loi * 1.0 / tong_total, 4).",
        solution: "WITH t AS (SELECT machine_id, SUM(ng_qty) AS tong_loi, SUM(total_qty) AS tong_total FROM production_records GROUP BY machine_id) SELECT machine_id, ROUND(tong_loi * 1.0 / tong_total, 4) AS ty_le_ng FROM t;",
      },
      {
        question: "Dùng CTE đếm số đơn theo status, rồi tính tỷ lệ số đơn 'Completed' trên tổng số đơn.",
        hint: "CTE GROUP BY status với COUNT(*); câu chính dùng SUM(CASE ...) hoặc WHERE để tính tỷ lệ.",
        solution: "WITH t AS (SELECT status, COUNT(*) AS so FROM production_orders GROUP BY status) SELECT ROUND(MAX(CASE WHEN status = 'Completed' THEN so END) * 1.0 / SUM(so), 4) AS ty_le_hoan_thanh FROM t;",
      },
    ],
    mistakes: [
      "Chia hai số nguyên nên kết quả bị làm tròn xuống 0; hãy nhân với 1.0 trước.",
      "Quên mẫu số có thể bằng 0 khi tổng bằng 0.",
    ],
    quiz: [
      { q: "Vì sao cần nhân 1.0 khi tính tỷ lệ?", a: "Để phép chia là chia số thực, tránh làm tròn xuống số nguyên." },
      { q: "Nên tính gì trong CTE?", a: "Các tổng cần thiết (tổng đạt, tổng lỗi, tổng chung)." },
    ],
    summary: [
      "Tổng hợp trong CTE, tính tỷ lệ ở câu chính.",
      "Nhân 1.0 để chia số thực.",
    ],
    next: "Bài 19 so sánh CTE với subquery để chọn cách viết phù hợp.",
  },
  {
    id: "19",
    module: 9,
    title: "CTE hay subquery: chọn cách viết dễ bảo trì",
    minutes: 45,
    objectives: [
      "So sánh CTE với subquery về độ dễ đọc.",
      "Hiểu khi nào CTE có thể được tái sử dụng trong một câu lệnh.",
      "Chọn cách viết phù hợp cho dashboard.",
    ],
    prerequisites: "Đã học CTE (bài 14 đến 18) và subquery (module 08).",
    explanation: [
      "Subquery và CTE cho kết quả giống nhau trong nhiều trường hợp. CTE dễ đọc hơn khi có nhiều bước, và có thể tham chiếu nhiều lần.",
      "Subquery gọn hơn khi chỉ dùng một lần và đơn giản. Đừng lạm dụng CTE cho câu đơn giản.",
      "Trong PostgreSQL, một CTE đôi khi được tính một lần và lưu tạm; đây là chi tiết tối ưu hóa, nên đo bằng EXPLAIN khi cần hiệu năng.",
    ],
    syntax: "-- Subquery\nSELECT ... FROM (SELECT ...) t;\n-- CTE\nWITH t AS (SELECT ...) SELECT ... FROM t;",
    example: {
      sql: "-- Cùng kết quả, viết theo hai cách\nSELECT l.line_code FROM production_lines l\nWHERE l.line_id IN (SELECT line_id FROM production_orders);\n\nWITH co_don AS (SELECT DISTINCT line_id FROM production_orders)\nSELECT l.line_code FROM production_lines l JOIN co_don c ON c.line_id = l.line_id;",
      explain: [
        "Cách 1 dùng subquery trong WHERE, gọn cho câu đơn giản.",
        "Cách 2 dùng CTE, tách rõ bước 'dây chuyền có đơn', dễ mở rộng.",
      ],
    },
    factory: "Nhóm phân tích dữ liệu cần viết truy vấn dễ đọc để đồng đội kiểm tra và sửa lại khi có thay đổi.",
    practice: [
      {
        question: "Viết lại bằng CTE: lấy product_code của các sản phẩm có ít nhất một đơn sản xuất (dùng CTE co_don DISTINCT product_id).",
        hint: "WITH co_don AS (SELECT DISTINCT product_id FROM production_orders) rồi JOIN với products.",
        solution: "WITH co_don AS (SELECT DISTINCT product_id FROM production_orders) SELECT p.product_code FROM products p JOIN co_don c ON c.product_id = p.product_id;",
      },
      {
        question: "Viết lại bằng subquery: lấy machine_code của các máy có bản ghi trong production_records.",
        hint: "WHERE machine_id IN (SELECT machine_id FROM production_records).",
        solution: "SELECT machine_code FROM machines WHERE machine_id IN (SELECT machine_id FROM production_records);",
      },
    ],
    mistakes: [
      "Dùng CTE cho câu quá đơn giản, làm câu lệnh dài không cần thiết.",
      "Nghĩ CTE luôn nhanh hơn subquery; cần kiểm tra bằng EXPLAIN.",
    ],
    quiz: [
      { q: "Khi nào nên chọn CTE?", a: "Khi có nhiều bước, cần đặt tên hoặc tham chiếu nhiều lần." },
      { q: "Muốn biết câu lệnh chạy thế nào thì dùng gì?", a: "EXPLAIN." },
    ],
    summary: [
      "CTE dễ đọc khi có nhiều bước.",
      "Subquery gọn cho câu đơn giản.",
      "Đo hiệu năng khi cần.",
    ],
    next: "Module 10 học các hàm xử lý chuỗi, ngày, số và NULL.",
  },
];
