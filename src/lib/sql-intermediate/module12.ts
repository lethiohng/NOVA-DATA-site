import type { IntermediateLesson } from "./types";

/* Module 12 — Thao tác dữ liệu, chuỗi ngày, PIVOT, ép kiểu, CASE WHEN và FILTER nâng cao.
   Lưu ý: sân chơi chạy mỗi câu lệnh trong transaction rồi ROLLBACK, nên INSERT/UPDATE/DELETE chỉ thử được an toàn khi có RETURNING. */

export const module12: IntermediateLesson[] = [
  {
    id: "32",
    module: 12,
    title: "DML: INSERT, UPDATE, DELETE",
    minutes: 50,
    objectives: [
      "Thêm dòng mới bằng INSERT ... VALUES.",
      "Sửa dòng có điều kiện bằng UPDATE ... WHERE.",
      "Xóa dòng có điều kiện bằng DELETE ... WHERE và xem kết quả với RETURNING.",
    ],
    prerequisites: "Đã học WHERE (khóa Basic, bài 11) và điều kiện nhiều cột.",
    explanation: [
      "DML (Data Manipulation Language) là nhóm lệnh thay đổi dữ liệu: INSERT thêm dòng, UPDATE sửa dòng, DELETE xóa dòng.",
      "UPDATE và DELETE phải luôn có WHERE. Nếu quên WHERE, lệnh áp dụng cho toàn bộ bảng. Trước khi chạy trên dữ liệu thật, hãy viết SELECT với cùng điều kiện để kiểm tra trước.",
      "RETURNING trả về các dòng vừa được thêm, sửa hoặc xóa. Nhờ đó bạn thấy ngay kết quả mà không cần SELECT riêng. Trên sân chơi, mọi thay đổi đều bị hoàn tác, nên bạn có thể thử an toàn.",
    ],
    syntax: "INSERT INTO bảng (cột, ...) VALUES (...) RETURNING cột;\nUPDATE bảng SET cột = giá_trị WHERE điều_kiện RETURNING cột;\nDELETE FROM bảng WHERE điều_kiện RETURNING cột;",
    example: {
      sql: "UPDATE machines SET ideal_cycle_sec = ideal_cycle_sec * 1.05 WHERE machine_type = 'Press' RETURNING machine_code, ideal_cycle_sec;",
      explain: [
        "WHERE machine_type = 'Press' giới hạn cập nhật vào các máy dập.",
        "RETURNING cho thấy giá trị mới của ideal_cycle_sec ngay sau khi sửa.",
      ],
    },
    factory: "Kỹ thuật tăng chu kỳ lý tưởng của máy dập thêm 5% sau khi cải tiến, và cần kiểm tra lại danh sách máy đã đổi.",
    practice: [
      {
        question: "Tăng ideal_cycle_sec thêm 5% cho các máy có machine_type = 'CNC'. Dùng UPDATE ... RETURNING để hiển thị machine_code và ideal_cycle_sec mới.",
        hint: "UPDATE machines SET ideal_cycle_sec = ideal_cycle_sec * 1.05 WHERE machine_type = 'CNC' RETURNING ...",
        solution: "UPDATE machines SET ideal_cycle_sec = ideal_cycle_sec * 1.05 WHERE machine_type = 'CNC' RETURNING machine_code, ideal_cycle_sec;",
      },
      {
        question: "Thêm dây chuyền mới có line_id 5, line_code 'LINE-E', line_name 'Line E', department_id 1 và location 'Building 3'. Dùng INSERT ... RETURNING line_code, location.",
        hint: "INSERT INTO production_lines (line_id, line_code, line_name, department_id, location) VALUES (5, ...) RETURNING ...",
        solution: "INSERT INTO production_lines (line_id, line_code, line_name, department_id, location) VALUES (5, 'LINE-E', 'Line E', 1, 'Building 3') RETURNING line_code, location;",
      },
      {
        question: "Xóa các sự kiện dừng máy (downtime_events) có duration_minutes nhỏ hơn 6. Dùng DELETE ... RETURNING downtime_id.",
        hint: "DELETE FROM downtime_events WHERE duration_minutes < 6 RETURNING downtime_id;",
        solution: "DELETE FROM downtime_events WHERE duration_minutes < 6 RETURNING downtime_id;",
      },
    ],
    mistakes: [
      "Quên WHERE trong UPDATE hoặc DELETE, khiến lệnh áp dụng cho cả bảng.",
      "Dùng = NULL trong WHERE thay vì IS NULL, nên không dòng nào được sửa hoặc xóa.",
      "Thêm dòng mà không đủ cột bắt buộc (NOT NULL), hoặc vi phạm khóa duy nhất như line_code đã có.",
      "INSERT không ghi ID dễ bị trùng khóa chính khi dữ liệu được nạp với ID cố định. Lúc đó bộ đếm tự tăng chưa cập nhật, nên cần ghi rõ ID hoặc đồng bộ bộ đếm.",
    ],
    quiz: [
      { q: "Vì sao nên viết SELECT với cùng điều kiện trước khi UPDATE hoặc DELETE?", a: "Để kiểm tra đúng những dòng sẽ bị ảnh hưởng, tránh sửa hoặc xóa nhầm." },
      { q: "RETURNING dùng để làm gì?", a: "Trả về các dòng vừa được thêm, sửa hoặc xóa, để kiểm tra kết quả ngay." },
    ],
    summary: [
      "INSERT thêm dòng, UPDATE sửa dòng, DELETE xóa dòng.",
      "UPDATE và DELETE luôn cần WHERE.",
      "RETURNING cho thấy kết quả thay đổi.",
    ],
    next: "Bài 33 tạo dãy ngày và thời gian bằng GENERATE_SERIES.",
  },
  {
    id: "33",
    module: 12,
    title: "GENERATE_SERIES: tạo dãy ngày và thời gian",
    minutes: 45,
    objectives: [
      "Tạo dãy số và dãy ngày bằng GENERATE_SERIES.",
      "Dùng dãy ngày để tìm các ngày không có dữ liệu.",
      "Ghép dãy ngày với bảng dữ liệu bằng LEFT JOIN và COALESCE.",
    ],
    prerequisites: "Đã học LEFT JOIN (bài 3 khóa Intermediate) và ép kiểu ::date (khóa Basic, bài 31).",
    explanation: [
      "GENERATE_SERIES(bắt_đầu, kết_thúc, bước) tạo ra một dãy giá trị liên tiếp. Với số, dùng GENERATE_SERIES(1, 5). Với ngày, dùng bước là INTERVAL '1 day'.",
      "Dãy ngày rất hữu ích để báo cáo: nếu chỉ GROUP BY theo ngày, những ngày không có dữ liệu sẽ bị thiếu. Ghép dãy ngày với dữ liệu bằng LEFT JOIN để giữ mọi ngày.",
      "Khi ngày không có dữ liệu, SUM trả về NULL. Dùng COALESCE(SUM(...), 0) để hiển thị 0.",
    ],
    syntax: "SELECT generate_series(bắt_đầu, kết_thúc, INTERVAL '1 day')::date AS ngay;",
    example: {
      sql: "SELECT generate_series('2026-07-30'::date, '2026-08-02'::date, INTERVAL '1 day')::date AS ngay;",
      explain: [
        "Kết quả có 4 dòng: từ 30/07/2026 đến 02/08/2026.",
        "Ngày 30/07 và 31/07 có trong dãy dù không có dữ liệu sản xuất.",
      ],
    },
    factory: "Quản lý cần biểu đồ sản lượng theo ngày cho đủ mọi ngày, kể cả ngày máy không chạy, để thấy rõ các khoảng nghỉ.",
    practice: [
      {
        question: "Tạo dãy số từ 1 đến 5, đặt alias là so.",
        hint: "SELECT generate_series(1, 5) AS so;",
        solution: "SELECT generate_series(1, 5) AS so;",
      },
      {
        question: "Tạo dãy ngày từ 30/07/2026 đến 02/08/2026 (cột ngay), sắp xếp theo ngay.",
        hint: "Dùng generate_series với INTERVAL '1 day' và ép kết quả sang ::date.",
        solution: "SELECT generate_series('2026-07-30'::date, '2026-08-02'::date, INTERVAL '1 day')::date AS ngay ORDER BY ngay;",
      },
      {
        question: "Với dãy ngày từ 30/07/2026 đến 02/08/2026, tính sản lượng đạt good_qty theo từng ngày (san_luong), ngày không có dữ liệu hiển thị 0. Sắp xếp theo ngay.",
        hint: "WITH lich AS (dãy ngày) rồi LEFT JOIN với production_records theo CAST(record_time AS date), dùng COALESCE(SUM(good_qty), 0).",
        solution: "WITH lich AS (SELECT generate_series('2026-07-30'::date, '2026-08-02'::date, INTERVAL '1 day')::date AS ngay) SELECT lich.ngay, COALESCE(SUM(r.good_qty), 0) AS san_luong FROM lich LEFT JOIN production_records r ON CAST(r.record_time AS date) = lich.ngay GROUP BY lich.ngay ORDER BY lich.ngay;",
      },
    ],
    mistakes: [
      "GROUP BY theo ngày mà không có dãy ngày, nên các ngày không có dữ liệu biến mất khỏi báo cáo.",
      "Dùng INNER JOIN thay LEFT JOIN, khiến ngày không có dữ liệu bị loại.",
      "Quên COALESCE, nên ngày không có dữ liệu hiện NULL thay vì 0.",
    ],
    quiz: [
      { q: "Vì sao cần dãy ngày khi làm báo cáo theo ngày?", a: "Để giữ các ngày không có dữ liệu, nếu không chúng sẽ bị thiếu trong báo cáo." },
      { q: "Vì sao dùng LEFT JOIN thay vì INNER JOIN với dãy ngày?", a: "LEFT JOIN giữ mọi ngày của dãy, còn INNER JOIN loại các ngày không khớp." },
    ],
    summary: [
      "GENERATE_SERIES tạo dãy số hoặc dãy ngày.",
      "Ghép dãy ngày bằng LEFT JOIN để không thiếu ngày.",
      "COALESCE(SUM(...), 0) hiển thị 0 cho ngày trống.",
    ],
    next: "Bài 34 chuyển dữ liệu từ hàng thành cột bằng Conditional Aggregation (PIVOT).",
  },
  {
    id: "34",
    module: 12,
    title: "PIVOT bằng Conditional Aggregation: đổi hàng thành cột",
    minutes: 50,
    objectives: [
      "Hiểu PIVOT là đổi giá trị của một cột thành nhiều cột kết quả.",
      "Viết PIVOT bằng SUM(CASE WHEN ...) hoặc COUNT FILTER.",
      "Đặt tên cột rõ ràng cho từng nhóm giá trị.",
    ],
    prerequisites: "Đã học GROUP BY (khóa Basic, bài 25), CASE WHEN (module 10) và JOIN (module 7).",
    explanation: [
      "PostgreSQL không có từ khóa PIVOT chuẩn như một số hệ quản trị khác. Cách phổ biến là Conditional Aggregation: với mỗi giá trị cần đưa thành cột, dùng SUM(CASE WHEN điều_kiện THEN giá_trị ELSE 0 END).",
      "Mỗi cột mới ứng với một điều kiện. Ví dụ ca 1 có cột riêng, ca 2 có cột riêng, và cứ thế. Các dòng vẫn được gom theo nhóm như GROUP BY thông thường.",
      "Có thể dùng FILTER thay cho CASE: SUM(giá_trị) FILTER (WHERE điều_kiện). Hai cách cho cùng kết quả, FILTER dễ đọc hơn khi chỉ có một điều kiện.",
    ],
    syntax: "SELECT nhóm,\n       SUM(CASE WHEN điều_kiện_1 THEN giá_trị ELSE 0 END) AS cột_1,\n       SUM(CASE WHEN điều_kiện_2 THEN giá_trị ELSE 0 END) AS cột_2\nFROM bảng GROUP BY nhóm;",
    example: {
      sql: "SELECT shift_id, SUM(CASE WHEN ng_qty = 0 THEN 1 ELSE 0 END) AS ban_ghi_khong_loi, SUM(CASE WHEN ng_qty > 0 THEN 1 ELSE 0 END) AS ban_ghi_co_loi FROM production_records GROUP BY shift_id ORDER BY shift_id;",
      explain: [
        "Mỗi ca là một dòng kết quả, còn hai cột thể hiện số bản ghi không lỗi và có lỗi.",
        "Dữ liệu hàng (từng bản ghi) đã được đổi thành cột (đếm theo nhóm).",
      ],
    },
    factory: "Báo cáo cuối ca cần sản lượng của từng ca nằm trên cùng một dòng cho mỗi dây chuyền, để quản lý so sánh ca 1, ca 2 và ca 3 trực tiếp.",
    practice: [
      {
        question: "Với mỗi dây chuyền (line_code), tính tổng good_qty theo ca thành ba cột ca_1, ca_2, ca_3. Sắp xếp theo line_code.",
        hint: "Nối production_records với production_orders và production_lines, rồi dùng SUM(CASE WHEN shift_id = 1 THEN good_qty ELSE 0 END) cho từng ca.",
        solution: "SELECT l.line_code, SUM(CASE WHEN r.shift_id = 1 THEN r.good_qty ELSE 0 END) AS ca_1, SUM(CASE WHEN r.shift_id = 2 THEN r.good_qty ELSE 0 END) AS ca_2, SUM(CASE WHEN r.shift_id = 3 THEN r.good_qty ELSE 0 END) AS ca_3 FROM production_records r JOIN production_orders o ON o.order_id = r.order_id JOIN production_lines l ON l.line_id = o.line_id GROUP BY l.line_code ORDER BY l.line_code;",
      },
      {
        question: "Với mỗi product_family, tính tổng total_qty theo ca thành ba cột ca_1, ca_2, ca_3. Sắp xếp theo product_family.",
        hint: "Nối production_records với production_orders và products, GROUP BY product_family.",
        solution: "SELECT p.product_family, SUM(CASE WHEN r.shift_id = 1 THEN r.total_qty ELSE 0 END) AS ca_1, SUM(CASE WHEN r.shift_id = 2 THEN r.total_qty ELSE 0 END) AS ca_2, SUM(CASE WHEN r.shift_id = 3 THEN r.total_qty ELSE 0 END) AS ca_3 FROM production_records r JOIN production_orders o ON o.order_id = r.order_id JOIN products p ON p.product_id = o.product_id GROUP BY p.product_family ORDER BY p.product_family;",
      },
    ],
    mistakes: [
      "Quên ELSE 0 trong CASE, nên nhóm không khớp trả về NULL và SUM bỏ qua, gây hiểu nhầm.",
      "Đặt tên cột trùng nhau hoặc không rõ ràng, khiến người đọc không biết cột nào là ca nào.",
      "Quên GROUP BY nhóm, nên kết quả có một dòng duy nhất cho cả bảng.",
    ],
    quiz: [
      { q: "PIVOT trong PostgreSQL thường được viết bằng cách nào?", a: "Conditional Aggregation: SUM(CASE WHEN ... THEN ... ELSE 0 END) cho mỗi cột mới." },
      { q: "Vì sao cần ELSE 0 trong CASE khi pivot?", a: "Để các dòng không khớp điều kiện được cộng 0, thay vì NULL, nên tổng không bị thiếu." },
    ],
    summary: [
      "PIVOT trong PostgreSQL viết bằng Conditional Aggregation.",
      "Mỗi cột kết quả ứng với một điều kiện CASE.",
      "Dùng ELSE 0 để tránh NULL khi tổng hợp.",
    ],
    next: "Bài 35 ép kiểu và định dạng ngày với CAST, TO_CHAR, TO_DATE và TO_TIMESTAMP.",
  },
  {
    id: "35",
    module: 12,
    title: "Type Conversion: CAST, TO_CHAR, TO_DATE, TO_TIMESTAMP",
    minutes: 45,
    objectives: [
      "Định dạng ngày thành chuỗi bằng TO_CHAR.",
      "Đọc chuỗi ngày theo định dạng bằng TO_DATE và TO_TIMESTAMP.",
      "Chọn đúng cách ép kiểu cho từng tình huống báo cáo.",
    ],
    prerequisites: "Đã học CAST và :: (khóa Basic, bài 31) và GROUP BY.",
    explanation: [
      "TO_CHAR(giá_trị, định_dạng) đổi ngày hoặc số thành chuỗi theo mẫu. Ví dụ 'YYYY-MM' cho năm và tháng, 'DD/MM/YYYY' cho ngày kiểu Việt Nam.",
      "TO_DATE(chuỗi, định_dạng) đọc một chuỗi thành ngày theo đúng mẫu. TO_TIMESTAMP làm việc tương tự nhưng cho cả ngày và giờ.",
      "Khi gom nhóm theo tháng, TO_CHAR(record_time, 'YYYY-MM') cho một nhóm cho mỗi tháng. Cách này dễ đọc hơn việc ghép năm và tháng thủ công.",
    ],
    syntax: "TO_CHAR(giá_trị, 'YYYY-MM-DD');  TO_DATE('15/09/2026', 'DD/MM/YYYY');  TO_TIMESTAMP('2026-08-01 06:00', 'YYYY-MM-DD HH24:MI');",
    example: {
      sql: "SELECT TO_CHAR(record_time, 'YYYY-MM') AS thang, SUM(good_qty) AS san_luong FROM production_records GROUP BY 1 ORDER BY 1;",
      explain: [
        "TO_CHAR đổi record_time thành chuỗi dạng năm-tháng, rồi GROUP BY gom theo tháng.",
        "Mỗi dòng kết quả là một tháng với tổng sản lượng đạt.",
      ],
    },
    factory: "Báo cáo tháng gửi ban giám đốc cần nhãn tháng rõ ràng, và ngày nhập tay từ file Excel cần được đọc đúng định dạng 15/09/2026.",
    practice: [
      {
        question: "Tính tổng good_qty theo tháng, nhãn tháng dạng 'YYYY-MM' (cột thang) và tổng là san_luong. Sắp xếp theo thang.",
        hint: "TO_CHAR(record_time, 'YYYY-MM') và GROUP BY nhãn đó.",
        solution: "SELECT TO_CHAR(record_time, 'YYYY-MM') AS thang, SUM(good_qty) AS san_luong FROM production_records GROUP BY 1 ORDER BY 1;",
      },
      {
        question: "Đọc chuỗi '15/09/2026' thành ngày bằng TO_DATE và đặt alias ngay.",
        hint: "TO_DATE('15/09/2026', 'DD/MM/YYYY').",
        solution: "SELECT TO_DATE('15/09/2026', 'DD/MM/YYYY') AS ngay;",
      },
      {
        question: "Đổi ngày '2026-09-15' sang chuỗi theo định dạng 'DD/MM/YYYY' bằng TO_CHAR (cột ngay_viet).",
        hint: "Đọc chuỗi bằng TO_DATE trước, rồi định dạng bằng TO_CHAR.",
        solution: "SELECT TO_CHAR(TO_DATE('2026-09-15', 'YYYY-MM-DD'), 'DD/MM/YYYY') AS ngay_viet;",
      },
    ],
    mistakes: [
      "Dùng sai mẫu định dạng, ví dụ 'MM/DD/YYYY' cho ngày kiểu Việt Nam, khiến ngày bị đọc sai.",
      "Nhầm MM (tháng) với mm (phút). Trong TO_CHAR, MM là tháng, MI là phút.",
      "Gom nhóm theo cột timestamp thay vì theo chuỗi đã định dạng, nên mỗi giây là một nhóm.",
    ],
    quiz: [
      { q: "Trong định dạng PostgreSQL, MM và MI khác nhau thế nào?", a: "MM là tháng, MI là phút." },
      { q: "Để gom sản lượng theo tháng, nên làm gì với record_time?", a: "Dùng TO_CHAR(record_time, 'YYYY-MM') rồi GROUP BY nhãn đó." },
    ],
    summary: [
      "TO_CHAR đổi ngày hoặc số thành chuỗi theo mẫu.",
      "TO_DATE và TO_TIMESTAMP đọc chuỗi theo mẫu.",
      "Chọn mẫu định dạng đúng với dữ liệu đầu vào.",
    ],
    next: "Bài 36 viết CASE WHEN lồng nhau để phân nhóm phức tạp hơn.",
  },
  {
    id: "36",
    module: 12,
    title: "CASE WHEN nâng cao: CASE lồng nhau và nhiều điều kiện",
    minutes: 45,
    objectives: [
      "Viết CASE WHEN có nhiều nhánh điều kiện theo thứ tự.",
      "Lồng một CASE trong một CASE khác.",
      "Đặt thứ tự điều kiện đúng để tránh nhánh bị bỏ qua.",
    ],
    prerequisites: "Đã học CASE WHEN cơ bản (module 10, bài 24).",
    explanation: [
      "CASE WHEN xét các điều kiện từ trên xuống. Khi một điều kiện đúng, kết quả được chọn và các nhánh còn lại không chạy. Vì vậy điều kiện cụ thể hơn phải đứng trước.",
      "Có thể lồng CASE trong nhánh của một CASE khác. Cách này hữu ích khi phân loại theo hai tiêu chí, ví dụ theo ca rồi theo mức sản lượng.",
      "Luôn có ELSE để xử lý các trường hợp còn lại. Nếu không có ELSE, kết quả là NULL cho những dòng không khớp nhánh nào.",
    ],
    syntax: "CASE\n  WHEN điều_kiện_1 THEN kết_quả_1\n  WHEN điều_kiện_2 THEN kết_quả_2\n  ELSE kết_quả_khác\nEND",
    example: {
      sql: "SELECT record_id, CASE WHEN ng_qty = 0 THEN 'Không lỗi' WHEN ng_qty <= 2 THEN 'Lỗi ít' ELSE 'Lỗi nhiều' END AS muc_loi FROM production_records ORDER BY record_id LIMIT 10;",
      explain: [
        "Điều kiện ng_qty = 0 được xét trước, nên dòng không lỗi luôn vào nhánh đầu tiên.",
        "Dòng không khớp nhánh nào thì nhận giá trị ở ELSE.",
      ],
    },
    factory: "Quản lý muốn phân loại mỗi bản ghi theo ca và theo sản lượng đạt, để xem ca nào thường có sản lượng thấp.",
    practice: [
      {
        question: "Với 10 bản ghi đầu theo record_id, gắn nhãn muc_loi: 'Không lỗi' khi ng_qty = 0, 'Lỗi ít' khi ng_qty <= 2, còn lại 'Lỗi nhiều'.",
        hint: "Viết CASE với các điều kiện theo thứ tự từ cụ thể đến chung, có ELSE.",
        solution: "SELECT record_id, CASE WHEN ng_qty = 0 THEN 'Không lỗi' WHEN ng_qty <= 2 THEN 'Lỗi ít' ELSE 'Lỗi nhiều' END AS muc_loi FROM production_records ORDER BY record_id LIMIT 10;",
      },
      {
        question: "Với 10 bản ghi đầu theo record_id, gắn nhãn nhan: nếu shift_id = 1 thì 'Ca 1 - đạt cao' khi good_qty >= 300, còn lại 'Ca 1 - thường'; nếu không phải ca 1 thì 'Ca khác'.",
        hint: "Đặt một CASE lồng trong nhánh shift_id = 1.",
        solution: "SELECT record_id, CASE WHEN shift_id = 1 THEN CASE WHEN good_qty >= 300 THEN 'Ca 1 - đạt cao' ELSE 'Ca 1 - thường' END ELSE 'Ca khác' END AS nhan FROM production_records ORDER BY record_id LIMIT 10;",
      },
    ],
    mistakes: [
      "Đặt điều kiện chung trước điều kiện cụ thể, khiến nhánh cụ thể không bao giờ được chọn.",
      "Quên ELSE, dẫn đến giá trị NULL bất ngờ cho các dòng không khớp.",
      "Lồng quá nhiều CASE làm câu lệnh khó đọc. Khi phức tạp, cân nhắc tách thành CTE.",
    ],
    quiz: [
      { q: "Vì sao điều kiện cụ thể phải đứng trước trong CASE?", a: "Vì CASE dừng ở nhánh đầu tiên đúng, nên nhánh chung đứng trước sẽ chặn nhánh cụ thể." },
      { q: "Dòng không khớp nhánh nào trong CASE nhận giá trị gì nếu không có ELSE?", a: "NULL." },
    ],
    summary: [
      "CASE xét điều kiện từ trên xuống, dừng ở nhánh đúng đầu tiên.",
      "CASE có thể lồng trong nhánh của một CASE khác.",
      "Luôn có ELSE để tránh NULL ngoài ý muốn.",
    ],
    next: "Bài 37 dùng FILTER để kết hợp nhiều hàm tổng hợp trong một câu lệnh.",
  },
  {
    id: "37",
    module: 12,
    title: "FILTER kết hợp nhiều hàm tổng hợp",
    minutes: 45,
    objectives: [
      "Dùng FILTER để tổng hợp có điều kiện cho từng hàm, như COUNT, SUM và AVG.",
      "Viết nhiều chỉ số trong một câu lệnh GROUP BY.",
      "So sánh FILTER với CASE để chọn cách viết dễ đọc.",
    ],
    prerequisites: "Đã học GROUP BY, hàm tổng hợp và CASE WHEN (khóa Basic và module 10).",
    explanation: [
      "FILTER (WHERE điều_kiện) đặt sau một hàm tổng hợp để chỉ tính các dòng thỏa điều kiện đó. Ví dụ COUNT(*) FILTER (WHERE ng_qty > 0) đếm số bản ghi có lỗi.",
      "Mỗi hàm có thể có FILTER riêng trong cùng một câu SELECT, nên một câu lệnh có thể tính nhiều chỉ số khác nhau theo nhiều điều kiện.",
      "FILTER tương đương SUM(CASE WHEN điều_kiện THEN giá_trị ELSE 0 END), nhưng gọn hơn khi mỗi hàm chỉ có một điều kiện.",
    ],
    syntax: "SELECT nhóm,\n       COUNT(*) FILTER (WHERE điều_kiện_1) AS chỉ_số_1,\n       SUM(cột) FILTER (WHERE điều_kiện_2) AS chỉ_số_2\nFROM bảng GROUP BY nhóm;",
    example: {
      sql: "SELECT shift_id, COUNT(*) FILTER (WHERE ng_qty > 0) AS ban_ghi_co_loi, SUM(good_qty) FILTER (WHERE good_qty > 0) AS tong_dat FROM production_records GROUP BY shift_id ORDER BY shift_id;",
      explain: [
        "Mỗi ca có số bản ghi có lỗi và tổng sản lượng đạt, tính trong cùng một câu lệnh.",
        "FILTER giữ điều kiện đi cùng hàm tổng hợp nó áp dụng.",
      ],
    },
    factory: "Báo cáo chất lượng theo dây chuyền cần số bản ghi có lỗi, sản lượng đạt ca 2 và sản lượng trung bình ca 1, tất cả trên một dòng mỗi dây chuyền.",
    practice: [
      {
        question: "Với mỗi dây chuyền (line_code), đếm số bản ghi có ng_qty > 0 (so_ban_ghi_co_ng), tính tổng good_qty của ca 2 (tot_ca_2) và trung bình total_qty của ca 1 (tb_ca_1). Dùng FILTER. Sắp xếp theo line_code.",
        hint: "Viết COUNT(*) FILTER (WHERE ...), SUM(...) FILTER (WHERE shift_id = 2) và AVG(...) FILTER (WHERE shift_id = 1), rồi GROUP BY line_code.",
        solution: "SELECT l.line_code, COUNT(*) FILTER (WHERE r.ng_qty > 0) AS so_ban_ghi_co_ng, SUM(r.good_qty) FILTER (WHERE r.shift_id = 2) AS tot_ca_2, AVG(r.total_qty) FILTER (WHERE r.shift_id = 1) AS tb_ca_1 FROM production_records r JOIN production_orders o ON o.order_id = r.order_id JOIN production_lines l ON l.line_id = o.line_id GROUP BY l.line_code ORDER BY l.line_code;",
      },
      {
        question: "Với mỗi product_family, đếm bản ghi có ng_qty > 0 (ban_ghi_co_ng) và tổng ng_qty chỉ tính ca 2 và ca 3 (ng_ca_2_3). Sắp xếp theo product_family.",
        hint: "Dùng COUNT(*) FILTER (WHERE ng_qty > 0) và SUM(ng_qty) FILTER (WHERE shift_id IN (2, 3)).",
        solution: "SELECT p.product_family, COUNT(*) FILTER (WHERE r.ng_qty > 0) AS ban_ghi_co_ng, SUM(r.ng_qty) FILTER (WHERE r.shift_id IN (2, 3)) AS ng_ca_2_3 FROM production_records r JOIN production_orders o ON o.order_id = r.order_id JOIN products p ON p.product_id = o.product_id GROUP BY p.product_family ORDER BY p.product_family;",
      },
    ],
    mistakes: [
      "Đặt FILTER sai chỗ, ví dụ viết WHERE chung cho cả câu thay vì FILTER cho từng hàm, khiến mọi chỉ số bị giới hạn theo cùng một điều kiện.",
      "Dùng COUNT(*) FILTER nhưng quên rằng COUNT(*) đếm dòng, không đếm giá trị khác NULL. Dùng COUNT(cột) khi cần đếm giá trị có thật.",
      "Quên GROUP BY, khiến các chỉ số tính trên toàn bảng.",
    ],
    quiz: [
      { q: "FILTER khác WHERE ở điểm nào?", a: "FILTER áp dụng riêng cho một hàm tổng hợp, còn WHERE giới hạn toàn bộ các dòng trước khi gom nhóm." },
      { q: "FILTER tương đương với cách viết nào bằng CASE?", a: "SUM(CASE WHEN điều_kiện THEN giá_trị ELSE 0 END) cho hàm SUM." },
    ],
    summary: [
      "FILTER gắn một điều kiện vào một hàm tổng hợp.",
      "Một câu lệnh có thể tính nhiều chỉ số với điều kiện khác nhau.",
      "Dùng GROUP BY để mỗi nhóm có một dòng kết quả.",
    ],
    next: "Đã hết các bài bổ sung ưu tiên Cao và Trung bình của SQL Intermediate.",
  },
];
