import type { AdvancedLesson } from "./types";

/* Nhóm 1 — Advanced Query Engineering: JOIN phức tạp, CTE, window function, đệ quy và cấu trúc phân cấp (module 1 đến 3). */

export const group01: AdvancedLesson[] = [
  {
    id: "1",
    module: 1,
    title: "JOIN nhiều bảng và tránh nhân dòng",
    minutes: 50,
    objectives: [
      "Nối 3 đến 4 bảng theo quan hệ khóa ngoại.",
      "Nhận biết vì sao JOIN một-nhiều làm nhân dòng khi cộng dồn.",
      "Tổng hợp bên nhiều trước khi nối để số liệu đúng.",
      "Dùng LEFT JOIN kèm IS NULL để tìm dòng thiếu dữ liệu.",
    ],
    prerequisites: "Đã học JOIN, LEFT JOIN và GROUP BY (khóa Intermediate, module 1 và khóa Basic).",
    explanation: [
      "Khi nối bảng một-nhiều, mỗi dòng bên một gặp nhiều dòng bên nhiều. Nếu cộng dồn một cột của bên một sau khi nối, giá trị đó bị tính lặp.",
      "Ví dụ: một đơn sản xuất (production_orders) có nhiều bản ghi (production_records). Nối đơn với bản ghi rồi SUM(planned_qty) sẽ cộng kế hoạch của đơn nhiều lần.",
      "Cách tránh: tổng hợp bảng bên nhiều trước (GROUP BY order_id), rồi mới nối với bảng bên một. Mỗi đơn chỉ còn một dòng trước khi nối tiếp.",
      "LEFT JOIN ... WHERE cột_khóa IS NULL là mẫu anti-join: giữ các dòng bên trái và lọc ra những dòng không có bản ghi bên phải.",
    ],
    syntax: "SELECT ... FROM bang_a a JOIN bang_b b ON b.khoa = a.khoa LEFT JOIN bang_c c ON c.khoa = b.khoa",
    example: {
      sql: "SELECT o.order_code, p.product_code, o.planned_qty\nFROM production_orders o\nJOIN products p ON p.product_id = o.product_id\nJOIN production_lines l ON l.line_id = o.line_id\nWHERE l.line_code = 'LINE-A'\nORDER BY o.order_code;",
      explain: [
        "Mỗi đơn được nối với đúng một sản phẩm và một dây chuyền (quan hệ nhiều-một), nên không nhân dòng.",
        "Không có bảng bên nhiều nào được nối vào, nên planned_qty giữ nguyên giá trị.",
      ],
    },
    factory: "Quản lý muốn xem từng đơn sản xuất của LINE-A kèm mã sản phẩm, và không muốn đơn nào bị lặp.",
    practice: [
      {
        question: "Liệt kê các sản phẩm (product_code) không có đơn nào đang chạy (status = 'Running').",
        hint: "LEFT JOIN production_orders và đặt điều kiện status = 'Running' trong ON, rồi lọc order_id IS NULL.",
        solution:
          "SELECT p.product_code FROM products p LEFT JOIN production_orders o ON o.product_id = p.product_id AND o.status = 'Running' WHERE o.order_id IS NULL ORDER BY p.product_code;",
      },
      {
        question: "Tính tổng good_qty của từng sản phẩm (product_code, tong_tot) mà không bị nhân dòng: tổng hợp bản ghi theo đơn trong một CTE trước, rồi mới nối.",
        hint: "WITH san_luong_don AS (SELECT order_id, SUM(good_qty) ... GROUP BY order_id), sau đó JOIN production_orders và products.",
        solution:
          "WITH san_luong_don AS (SELECT order_id, SUM(good_qty) AS tot FROM production_records GROUP BY order_id) SELECT p.product_code, SUM(s.tot) AS tong_tot FROM san_luong_don s JOIN production_orders o ON o.order_id = s.order_id JOIN products p ON p.product_id = o.product_id GROUP BY p.product_code ORDER BY p.product_code;",
      },
    ],
    mistakes: [
      "Cộng planned_qty sau khi JOIN với production_records, làm kế hoạch của đơn bị nhân lên theo số bản ghi.",
      "Dùng INNER JOIN khi cần tìm dòng thiếu dữ liệu: dòng thiếu bị loại mất nên không thấy được.",
      "Lọc bảng bên phải trong WHERE sau LEFT JOIN, làm LEFT JOIN thành INNER JOIN mà không biết.",
    ],
    summary: [
      "Nối nhiều bảng theo quan hệ khóa ngoại.",
      "Tổng hợp bảng bên nhiều trước khi nối để tránh nhân dòng.",
      "LEFT JOIN kèm IS NULL tìm dòng thiếu dữ liệu.",
    ],
  },
  {
    id: "2",
    module: 1,
    title: "Nhiều CTE và tách truy vấn phức tạp",
    minutes: 50,
    objectives: [
      "Viết nhiều CTE trong một câu WITH, mỗi CTE là một bước xử lý.",
      "Dùng CTE sau để tham chiếu CTE trước.",
      "Tách một bài toán lớn thành các bước dễ kiểm tra từng bước.",
    ],
    prerequisites: "Đã học WITH (CTE) đơn và nhiều CTE trong khóa Intermediate (module 3).",
    explanation: [
      "Một truy vấn lớn nên tách thành các bước: bước 1 tính sản lượng theo dây chuyền, bước 2 tìm giá trị lớn nhất, bước 3 lấy tên dây chuyền.",
      "Mỗi CTE có tên riêng nên dễ đọc và dễ kiểm tra. Có thể chạy thử từng CTE bằng cách thay phần còn lại bằng SELECT * FROM tên_cte.",
      "CTE sau có thể dùng CTE trước. Không cần viết lại cùng một subquery nhiều lần.",
    ],
    syntax: "WITH cte_1 AS (...), cte_2 AS (SELECT ... FROM cte_1 ...) SELECT ... FROM cte_2",
    example: {
      sql: "WITH san_luong_line AS (\n  SELECT o.line_id, SUM(r.good_qty) AS tong_tot\n  FROM production_records r\n  JOIN production_orders o ON o.order_id = r.order_id\n  GROUP BY o.line_id\n),\nmax_line AS (\n  SELECT MAX(tong_tot) AS max_tot FROM san_luong_line\n)\nSELECT l.line_code, s.tong_tot\nFROM san_luong_line s\nJOIN production_lines l ON l.line_id = s.line_id\nCROSS JOIN max_line m\nWHERE s.tong_tot = m.max_tot;",
      explain: [
        "san_luong_line tính tổng sản lượng tốt của từng dây chuyền.",
        "max_line dùng kết quả của san_luong_line để lấy giá trị lớn nhất.",
        "Truy vấn chính nối các bước lại và giữ dây chuyền có giá trị bằng giá trị lớn nhất.",
      ],
    },
    factory: "Quản lý cần biết dây chuyền nào có sản lượng tốt cao nhất để ưu tiên phân bổ đơn mới.",
    practice: [
      {
        question: "Tìm dây chuyền có tổng good_qty cao nhất: hiện line_code và tong_tot, chỉ một dòng.",
        hint: "Dùng CTE san_luong_line như ví dụ, rồi ORDER BY tong_tot DESC LIMIT 1.",
        solution:
          "WITH san_luong_line AS (SELECT o.line_id, SUM(r.good_qty) AS tong_tot FROM production_records r JOIN production_orders o ON o.order_id = r.order_id GROUP BY o.line_id) SELECT l.line_code, s.tong_tot FROM san_luong_line s JOIN production_lines l ON l.line_id = s.line_id ORDER BY s.tong_tot DESC LIMIT 1;",
      },
      {
        question: "Tìm các đơn có tỷ lệ NG lớn hơn 2% (order_code, ty_le_ng làm tròn 2 chữ số), tính NG theo đơn trong một CTE rồi nối với production_orders.",
        hint: "Trong CTE: SUM(ng_qty) và SUM(total_qty) theo order_id. Tỷ lệ = 100.0 * ng / tong.",
        solution:
          "WITH ng_don AS (SELECT order_id, SUM(ng_qty) AS ng, SUM(total_qty) AS tong FROM production_records GROUP BY order_id) SELECT o.order_code, ROUND(100.0 * n.ng / n.tong, 2) AS ty_le_ng FROM ng_don n JOIN production_orders o ON o.order_id = n.order_id WHERE 100.0 * n.ng / n.tong > 2 ORDER BY ty_le_ng DESC, o.order_code;",
      },
    ],
    mistakes: [
      "Viết một CTE quá dài làm nhiều việc cùng lúc, khó tìm lỗi. Nên tách mỗi bước một CTE.",
      "Chia cho số nguyên làm kết quả bị cắt phần thập phân. Nhân với 100.0 trước khi chia.",
      "Quên rằng CTE chỉ tồn tại trong đúng một câu lệnh, nên không dùng lại được ở câu lệnh sau.",
    ],
    summary: [
      "Mỗi CTE là một bước có tên rõ ràng.",
      "CTE sau được dùng CTE trước trong cùng câu WITH.",
      "Tách bước giúp kiểm tra và sửa lỗi dễ hơn.",
    ],
  },
  {
    id: "3",
    module: 2,
    title: "Xếp hạng với ROW_NUMBER, RANK và DENSE_RANK",
    minutes: 50,
    objectives: [
      "Phân biệt ROW_NUMBER, RANK và DENSE_RANK khi có giá trị trùng.",
      "Xếp hạng trên kết quả đã tổng hợp.",
      "Lấy bản ghi đứng đầu trong từng nhóm bằng PARTITION BY.",
    ],
    prerequisites: "Đã học window function cơ bản: OVER và PARTITION BY (khóa Intermediate, module 5).",
    explanation: [
      "ROW_NUMBER đánh số 1, 2, 3 cho mọi dòng, kể cả khi hai dòng có giá trị bằng nhau. Thứ tự giữa hai dòng bằng nhau là không xác định nếu ORDER BY không đủ.",
      "RANK cho các dòng bằng nhau cùng một hạng, rồi bỏ qua số tiếp theo (1, 1, 3). DENSE_RANK cùng hạng nhưng không bỏ số (1, 1, 2).",
      "Có thể xếp hạng trên kết quả GROUP BY: đặt RANK() OVER (ORDER BY SUM(...)) trong cùng câu SELECT có GROUP BY.",
      "Để lấy dòng đứng đầu mỗi nhóm, đánh số bằng ROW_NUMBER() OVER (PARTITION BY nhóm ORDER BY ...) trong CTE, rồi lọc số = 1 ở truy vấn ngoài.",
    ],
    syntax: "ROW_NUMBER() | RANK() | DENSE_RANK() OVER (PARTITION BY nhóm ORDER BY giá_trị DESC)",
    example: {
      sql: "SELECT p.product_code,\n       SUM(r.good_qty) AS tong_tot,\n       RANK() OVER (ORDER BY SUM(r.good_qty) DESC) AS hang\nFROM production_records r\nJOIN production_orders o ON o.order_id = r.order_id\nJOIN products p ON p.product_id = o.product_id\nGROUP BY p.product_code\nORDER BY hang;",
      explain: [
        "SUM(r.good_qty) được tính theo từng sản phẩm, rồi RANK xếp hạng trên chính kết quả tổng hợp đó.",
        "Hai sản phẩm có cùng tổng sẽ có cùng hạng, và hạng tiếp theo sẽ nhảy cách.",
      ],
    },
    factory: "Quản lý muốn xếp hạng sản phẩm theo sản lượng tốt để chọn sản phẩm chủ lực.",
    practice: [
      {
        question: "Top 5 sản phẩm theo sản lượng tốt: hiện product_code, tong_tot, hang (dùng RANK). Lọc hang <= 5.",
        hint: "Đặt truy vấn tổng hợp và RANK trong CTE, rồi lọc hang <= 5 ở truy vấn ngoài, vì WHERE không đọc được cột window.",
        solution:
          "WITH xep_hang AS (SELECT p.product_code, SUM(r.good_qty) AS tong_tot, RANK() OVER (ORDER BY SUM(r.good_qty) DESC) AS hang FROM production_records r JOIN production_orders o ON o.order_id = r.order_id JOIN products p ON p.product_id = o.product_id GROUP BY p.product_code) SELECT product_code, tong_tot, hang FROM xep_hang WHERE hang <= 5 ORDER BY hang, product_code;",
      },
      {
        question: "Với mỗi dây chuyền, lấy đơn có planned_qty lớn nhất (line_code, order_code, planned_qty), dùng ROW_NUMBER. Nếu trùng kế hoạch thì lấy order_code nhỏ hơn.",
        hint: "ROW_NUMBER() OVER (PARTITION BY l.line_id ORDER BY o.planned_qty DESC, o.order_code), rồi lọc stt = 1.",
        solution:
          "WITH xep_don AS (SELECT l.line_code, o.order_code, o.planned_qty, ROW_NUMBER() OVER (PARTITION BY l.line_id ORDER BY o.planned_qty DESC, o.order_code) AS stt FROM production_orders o JOIN production_lines l ON l.line_id = o.line_id) SELECT line_code, order_code, planned_qty FROM xep_don WHERE stt = 1 ORDER BY line_code;",
      },
    ],
    mistakes: [
      "Dùng ROW_NUMBER khi cần xếp hạng bằng nhau: hai dòng bằng nhau vẫn có số thứ tự khác nhau.",
      "Viết WHERE hang <= 5 ngay trong câu có RANK: WHERE chạy trước window nên báo lỗi. Phải đưa vào CTE hoặc subquery.",
      "Không thêm cột phụ vào ORDER BY của window khi có giá trị trùng, làm kết quả thay đổi giữa các lần chạy.",
    ],
    summary: [
      "ROW_NUMBER đánh số duy nhất, RANK và DENSE_RANK cho hạng bằng nhau.",
      "Lọc theo kết quả window bằng CTE hoặc subquery.",
      "PARTITION BY lấy bản ghi đứng đầu trong từng nhóm.",
    ],
  },
  {
    id: "4",
    module: 2,
    title: "LAG, LEAD, khung cửa sổ và trung bình trượt",
    minutes: 55,
    objectives: [
      "Dùng LAG và LEAD để so sánh với dòng trước và dòng sau.",
      "Hiểu ROWS BETWEEN để định nghĩa khung cửa sổ.",
      "Tính tổng lũy kế và trung bình trượt 7 ngày.",
    ],
    prerequisites: "Đã học window function cơ bản và ROWS BETWEEN trong khóa Intermediate (module 5).",
    explanation: [
      "LAG(cột, n) lấy giá trị của dòng trước n dòng trong cùng cửa sổ, còn LEAD lấy dòng sau. Dòng đầu tiên của cửa sổ có LAG là NULL.",
      "Khung ROWS BETWEEN 6 PRECEDING AND CURRENT ROW lấy 6 dòng trước và dòng hiện tại. Với dữ liệu theo ngày, đây là cửa sổ 7 ngày nếu không có ngày nào bị thiếu.",
      "ROWS đếm số dòng. RANGE đếm theo giá trị: hai dòng có cùng giá trị ORDER BY sẽ nằm chung khung. Khi làm trung bình theo ngày thì nên đảm bảo mỗi ngày chỉ có một dòng trước khi dùng ROWS.",
    ],
    syntax: "LAG(cột, 1) OVER (PARTITION BY nhóm ORDER BY thời_gian) | SUM(cột) OVER (ORDER BY ngày ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)",
    example: {
      sql: "WITH ngay AS (\n  SELECT CAST(record_time AS date) AS ngay, SUM(good_qty) AS tong_tot\n  FROM production_records\n  GROUP BY 1\n)\nSELECT ngay, tong_tot,\n       AVG(tong_tot) OVER (ORDER BY ngay ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS tb_7_ngay\nFROM ngay\nORDER BY ngay;",
      explain: [
        "CTE ngay gom sản lượng tốt theo từng ngày, mỗi ngày còn đúng một dòng.",
        "AVG ... ROWS BETWEEN 6 PRECEDING tính trung bình của ngày hiện tại và 6 ngày trước đó.",
        "Với 6 ngày đầu tiên, khung chưa đủ 7 dòng nên trung bình chỉ tính trên số dòng có sẵn.",
      ],
    },
    factory: "Quản lý muốn xem xu hướng sản lượng, nên dùng trung bình 7 ngày để giảm dao động từng ngày.",
    practice: [
      {
        question: "Sản lượng tốt mỗi ngày (ngay, tong_tot) kèm tổng lũy kế tong_luy_ke theo ngày, sắp xếp theo ngày.",
        hint: "Tổng hợp theo ngày trong CTE, rồi SUM(tong_tot) OVER (ORDER BY ngay ROWS UNBOUNDED PRECEDING).",
        solution:
          "WITH ngay AS (SELECT CAST(record_time AS date) AS ngay, SUM(good_qty) AS tong_tot FROM production_records GROUP BY 1) SELECT ngay, tong_tot, SUM(tong_tot) OVER (ORDER BY ngay ROWS UNBOUNDED PRECEDING) AS tong_luy_ke FROM ngay ORDER BY ngay;",
      },
      {
        question: "Chênh lệch good_qty của mỗi bản ghi so với bản ghi trước cùng máy (record_id, machine_id, chenh_lech), chỉ lấy 10 dòng đầu theo record_id.",
        hint: "good_qty - LAG(good_qty) OVER (PARTITION BY machine_id ORDER BY record_time, record_id).",
        solution:
          "SELECT record_id, machine_id, good_qty - LAG(good_qty) OVER (PARTITION BY machine_id ORDER BY record_time, record_id) AS chenh_lech FROM production_records ORDER BY record_id LIMIT 10;",
      },
    ],
    mistakes: [
      "Quên PARTITION BY máy, nên LAG lấy bản ghi của máy khác.",
      "Thiếu record_id trong ORDER BY, làm thứ tự bản ghi cùng thời điểm không ổn định.",
      "Tính trung bình trượt trên bảng chi tiết chưa gom theo ngày, nên một ngày có nhiều dòng làm khung bị lệch.",
    ],
    summary: [
      "LAG và LEAD lấy dòng trước và dòng sau trong cùng nhóm.",
      "ROWS BETWEEN định nghĩa khung tính cho window.",
      "Gom theo ngày trước khi tính trung bình trượt.",
    ],
  },
  {
    id: "5",
    module: 3,
    title: "WITH RECURSIVE: sinh chuỗi và duyệt cấu trúc",
    minutes: 50,
    objectives: [
      "Hiểu cấu trúc của CTE đệ quy: phần neo và phần đệ quy.",
      "Sinh chuỗi số hoặc chuỗi ngày bằng WITH RECURSIVE.",
      "Biết khi nào đệ quy dừng để không lặp vô hạn.",
    ],
    prerequisites: "Đã học CTE và UNION ALL (khóa Intermediate, module 2 và 3).",
    explanation: [
      "CTE đệ quy có hai phần nối bằng UNION ALL. Phần neo (anchor) là dòng khởi đầu. Phần đệ quy (recursive) tham chiếu chính CTE đó để sinh dòng tiếp theo.",
      "Truy vấn lặp cho đến khi phần đệ quy không sinh thêm dòng. Vì vậy luôn có điều kiện dừng như WHERE n < 5.",
      "Đệ quy hữu ích khi cần tạo khung dữ liệu: danh sách ngày để tìm ngày không có sản xuất, hoặc 24 giờ trong ngày để gắn sản lượng theo giờ.",
    ],
    syntax: "WITH RECURSIVE ten_cte AS (SELECT giá_trị_ban_đầu UNION ALL SELECT ... FROM ten_cte WHERE điều_kiện_dừng) SELECT ... FROM ten_cte",
    example: {
      sql: "WITH RECURSIVE so AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM so WHERE n < 5\n)\nSELECT n FROM so;",
      explain: [
        "Phần neo cho dòng n = 1.",
        "Phần đệ quy lấy n hiện tại, cộng 1, và chỉ chạy khi n nhỏ hơn 5.",
        "Kết quả là 5 dòng: 1, 2, 3, 4, 5.",
      ],
    },
    factory: "Để tính sản lượng theo giờ, cần khung 24 giờ đầy đủ kể cả giờ không có bản ghi nào.",
    practice: [
      {
        question: "Liệt kê các ngày từ ngày có bản ghi sớm nhất đến ngày có bản ghi muộn nhất trong production_records (cột ngay), dùng WITH RECURSIVE.",
        hint: "Phần neo là MIN của ngày, phần đệ quy cộng 1 ngày cho đến MAX của ngày.",
        solution:
          "WITH RECURSIVE ngay AS (SELECT (SELECT MIN(CAST(record_time AS date)) FROM production_records) AS ngay UNION ALL SELECT ngay + 1 FROM ngay WHERE ngay < (SELECT MAX(CAST(record_time AS date)) FROM production_records)) SELECT ngay FROM ngay ORDER BY ngay;",
      },
      {
        question: "Tạo khung 24 giờ trong ngày (cột gio, từ 0 đến 23) bằng WITH RECURSIVE.",
        hint: "Phần neo gio = 0, phần đệ quy cộng 1 khi gio < 23.",
        solution:
          "WITH RECURSIVE gio AS (SELECT 0 AS gio UNION ALL SELECT gio + 1 FROM gio WHERE gio < 23) SELECT gio FROM gio ORDER BY gio;",
      },
    ],
    mistakes: [
      "Quên điều kiện dừng trong phần đệ quy, khiến truy vấn chạy mãi không kết thúc.",
      "Dùng UNION thay vì UNION ALL trong đệ quy: UNION loại dòng trùng nên có thể dừng sớm không như mong muốn.",
      "Tham chiếu CTE đệ quy nhiều lần hoặc dùng hàm tổng hợp trong phần đệ quy, PostgreSQL sẽ báo lỗi.",
    ],
    summary: [
      "CTE đệ quy gồm phần neo và phần đệ quy nối bằng UNION ALL.",
      "Luôn có điều kiện dừng.",
      "Dùng để sinh khung ngày hoặc khung giờ đầy đủ.",
    ],
  },
  {
    id: "6",
    module: 3,
    title: "Cấu trúc phân cấp: BOM, đường đi và chu trình",
    minutes: 55,
    objectives: [
      "Duyệt cấu trúc cha-con nhiều tầng bằng WITH RECURSIVE.",
      "Tính cấp độ (depth) và đường đi từ thành phẩm xuống linh kiện.",
      "Biết cách phát hiện chu trình bằng mảng đường đi.",
    ],
    prerequisites: "Đã học WITH RECURSIVE trong bài trước và mảng cơ bản.",
    explanation: [
      "BOM (Bill of Materials) là cây: một thành phẩm gồm nhiều bán thành phẩm, mỗi bán thành phẩm gồm nhiều linh kiện. Bộ dữ liệu NOVA chưa có bảng BOM nên bài này dựng dữ liệu mẫu bằng VALUES.",
      "Phần neo chọn thành phẩm gốc. Phần đệ quy đi từ cha sang con, cộng thêm cấp độ và nối đường đi.",
      "Chu trình xảy ra khi linh kiện là tổ tiên của chính nó (A chứa B, B chứa A). Để phát hiện, lưu danh sách đã đi qua trong một mảng và chỉ đi tiếp khi con chưa có trong mảng đó.",
    ],
    syntax: "WITH RECURSIVE cay AS (SELECT ... WHERE cha = gốc UNION ALL SELECT ... FROM cay JOIN bom ON bom.cha = cay.con)",
    example: {
      sql: "WITH RECURSIVE bom(cha, con, so_luong) AS (\n  VALUES ('THANH_PHAM', 'BAN_MACH', 1), ('THANH_PHAM', 'VO', 1),\n         ('BAN_MACH', 'CHIP', 2), ('BAN_MACH', 'DIEN_TRO', 10), ('VO', 'OC_VIT', 4)\n),\ncay AS (\n  SELECT con, so_luong, 1 AS cap, cha || ' > ' || con AS duong_di\n  FROM bom WHERE cha = 'THANH_PHAM'\n  UNION ALL\n  SELECT b.con, b.so_luong, c.cap + 1, c.duong_di || ' > ' || b.con\n  FROM bom b JOIN cay c ON b.cha = c.con\n)\nSELECT cap, con, so_luong, duong_di FROM cay ORDER BY duong_di;",
      explain: [
        "Bảng bom là dữ liệu mẫu: mỗi dòng là một quan hệ cha - con và số lượng.",
        "cap tăng dần theo tầng, duong_di ghi lại toàn bộ đường đi từ thành phẩm.",
        "Với BOM không có chu trình, truy vấn luôn kết thúc khi đến linh kiện lá.",
      ],
    },
    factory: "Kỹ sư cần biết một linh kiện nằm ở tầng nào trong sản phẩm và tổng số lượng cần dùng khi thiếu hàng.",
    practice: [
      {
        question: "Với cùng BOM mẫu như ví dụ, đếm số linh kiện ở mỗi cấp (cap, so_linh_kien), sắp xếp theo cap.",
        hint: "Giữ nguyên CTE bom và cay, rồi GROUP BY cap và COUNT(*).",
        solution:
          "WITH RECURSIVE bom(cha, con, so_luong) AS (VALUES ('THANH_PHAM', 'BAN_MACH', 1), ('THANH_PHAM', 'VO', 1), ('BAN_MACH', 'CHIP', 2), ('BAN_MACH', 'DIEN_TRO', 10), ('VO', 'OC_VIT', 4)), cay AS (SELECT con, so_luong, 1 AS cap FROM bom WHERE cha = 'THANH_PHAM' UNION ALL SELECT b.con, b.so_luong, c.cap + 1 FROM bom b JOIN cay c ON b.cha = c.con) SELECT cap, COUNT(*) AS so_linh_kien FROM cay GROUP BY cap ORDER BY cap;",
      },
      {
        question: "Với cùng BOM mẫu, lấy đường đi sâu nhất (duong_di và cap), chỉ một dòng.",
        hint: "Sắp xếp theo cap giảm dần rồi LIMIT 1.",
        solution:
          "WITH RECURSIVE bom(cha, con, so_luong) AS (VALUES ('THANH_PHAM', 'BAN_MACH', 1), ('THANH_PHAM', 'VO', 1), ('BAN_MACH', 'CHIP', 2), ('BAN_MACH', 'DIEN_TRO', 10), ('VO', 'OC_VIT', 4)), cay AS (SELECT con, 1 AS cap, cha || ' > ' || con AS duong_di FROM bom WHERE cha = 'THANH_PHAM' UNION ALL SELECT b.con, c.cap + 1, c.duong_di || ' > ' || b.con FROM bom b JOIN cay c ON b.cha = c.con) SELECT duong_di, cap FROM cay ORDER BY cap DESC, duong_di LIMIT 1;",
      },
    ],
    mistakes: [
      "Không có điều kiện dừng khi dữ liệu có chu trình (A chứa B, B chứa A), truy vấn lặp vô hạn.",
      "Quên cộng cấp độ ở phần đệ quy, nên mọi dòng đều có cùng cap.",
      "Nhầm chiều cha và con khi JOIN, kết quả đi ngược từ linh kiện lên thành phẩm.",
    ],
    summary: [
      "Cây cha-con được duyệt bằng WITH RECURSIVE.",
      "Ghi cấp độ và đường đi trong quá trình đệ quy.",
      "Dùng mảng đường đi để phát hiện chu trình.",
    ],
  },
];
