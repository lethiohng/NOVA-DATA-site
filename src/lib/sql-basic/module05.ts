import type { BasicLesson } from "./types";

/* Module 2 — Filtering & Sorting: WHERE, so sánh, AND/OR/NOT, IN, BETWEEN, LIKE/ILIKE, ORDER BY. */

export const module05: BasicLesson[] = [
  {
    id: "11",
    module: 5,
    title: "WHERE: lọc dòng theo điều kiện",
    minutes: 45,
    objectives: [
      "Dùng WHERE để chỉ lấy các dòng thỏa một điều kiện.",
      "Viết điều kiện với giá trị số, chuỗi và ngày.",
      "Nhớ chuỗi phải nằm trong dấu nháy đơn.",
    ],
    prerequisites: "Đã học SELECT, chọn cột và NULL (module 1).",
    explanation: [
      "WHERE đặt sau FROM và chỉ giữ lại các dòng làm điều kiện đúng. Các dòng không thỏa điều kiện bị bỏ qua.",
      "Giá trị số viết trực tiếp, ví dụ 100. Giá trị chuỗi và ngày phải đặt trong dấu nháy đơn, ví dụ 'Press'. Đừng dùng nháy kép cho giá trị chuỗi.",
      "Kiểu dữ liệu quan trọng: so sánh chuỗi '100' với số 100 có thể cho kết quả khác. Chọn đúng kiểu cho cột khi viết điều kiện.",
    ],
    syntax: "SELECT ... FROM tên_bảng WHERE điều_kiện;",
    example: {
      sql: "SELECT machine_code, machine_name FROM machines WHERE machine_type = 'Press';",
      explain: [
        "WHERE machine_type = 'Press' giữ lại các máy thuộc loại Press.",
        "Các máy CNC và Assembly không xuất hiện trong kết quả.",
      ],
    },
    factory: "Bảo trì muốn lên lịch kiểm tra riêng cho các máy dập (Press).",
    practice: [
      {
        question: "Lấy product_code và product_name của sản phẩm thuộc product_family 'Motor Bracket'.",
        hint: "Viết WHERE product_family = 'Motor Bracket' sau tên bảng.",
        solution: "SELECT product_code, product_name FROM products WHERE product_family = 'Motor Bracket';",
      },
      {
        question: "Lấy full_name của nhân viên có role là 'Supervisor'.",
        hint: "Điều kiện là role = 'Supervisor', nhớ dấu nháy đơn.",
        solution: "SELECT full_name FROM employees WHERE role = 'Supervisor';",
      },
    ],
    mistakes: [
      "Dùng nháy kép cho giá trị chuỗi: WHERE role = \"Supervisor\". Trong PostgreSQL, nháy kép là tên cột, nên câu lệnh sẽ báo lỗi.",
      "Viết WHERE sau ORDER BY. Thứ tự đúng là WHERE trước ORDER BY.",
    ],
    quiz: [
      { q: "Giá trị chuỗi trong WHERE đặt trong dấu gì?", a: "Dấu nháy đơn, ví dụ 'Press'." },
      { q: "WHERE có làm thay đổi bảng gốc không?", a: "Không, chỉ lọc các dòng trong kết quả." },
    ],
    summary: [
      "WHERE lọc các dòng theo điều kiện.",
      "Chuỗi đặt trong nháy đơn.",
      "WHERE nằm sau FROM.",
    ],
    next: "Bài 12 dùng các toán tử so sánh như >, <, = trong WHERE.",
  },
  {
    id: "12",
    module: 5,
    title: "Toán tử so sánh: =, <>, <, >, <=, >=",
    minutes: 45,
    objectives: [
      "Dùng các toán tử so sánh trong điều kiện.",
      "Phân biệt <> (khác) với =.",
      "Biết cách so sánh số lượng và chu kỳ thời gian.",
    ],
    prerequisites: "Đã học WHERE (bài 11).",
    explanation: [
      "Các toán tử: = (bằng), <> (khác, cũng viết được là !=), < (nhỏ hơn), > (lớn hơn), <= (nhỏ hơn hoặc bằng), >= (lớn hơn hoặc bằng).",
      "Các toán tử này dùng được với số, chuỗi và ngày. Với chuỗi, so sánh theo thứ tự bảng chữ cái.",
      "Trong sản xuất, các điều kiện thường gặp là số lượng vượt ngưỡng (>), chu kỳ thời gian không đạt (>) hoặc đơn hàng nhỏ (<=).",
    ],
    syntax: "WHERE cột > giá_trị;\nWHERE cột <> giá_trị;",
    example: {
      sql: "SELECT product_code, standard_cycle_sec FROM products WHERE standard_cycle_sec >= 50;",
      explain: [
        "Chỉ lấy các sản phẩm có chu kỳ chuẩn từ 50 giây trở lên.",
        "Điều kiện >= bao gồm cả giá trị 50.",
      ],
    },
    factory: "Kỹ sư quy trình muốn tìm các sản phẩm có chu kỳ gia công dài để xem xét tối ưu.",
    practice: [
      {
        question: "Lấy order_code và planned_qty của các đơn sản xuất (production_orders) có planned_qty lớn hơn 3500.",
        hint: "Dùng WHERE planned_qty > 3500.",
        solution: "SELECT order_code, planned_qty FROM production_orders WHERE planned_qty > 3500;",
      },
      {
        question: "Lấy product_code và standard_cycle_sec của các sản phẩm có standard_cycle_sec nhỏ hơn 45.",
        hint: "Dùng toán tử < với cột standard_cycle_sec.",
        solution: "SELECT product_code, standard_cycle_sec FROM products WHERE standard_cycle_sec < 45;",
      },
    ],
    mistakes: [
      "Dùng = khi cần khác, ví dụ WHERE role = 'Operator' thay vì <> 'Operator'.",
      "Nhầm >= với >, làm mất các dòng có giá trị bằng ngưỡng.",
    ],
    quiz: [
      { q: "Toán tử nào nghĩa là khác?", a: "<> (hoặc !=)." },
      { q: "WHERE standard_cycle_sec >= 50 có lấy dòng có giá trị 50 không?", a: "Có, vì >= bao gồm cả bằng." },
    ],
    summary: [
      "Dùng =, <>, <, >, <=, >= để so sánh.",
      "<> nghĩa là khác.",
      ">= và <= bao gồm cả giá trị ngưỡng.",
    ],
    next: "Bài 13 kết hợp nhiều điều kiện bằng AND, OR và NOT.",
  },
  {
    id: "13",
    module: 5,
    title: "Kết hợp điều kiện: AND, OR, NOT",
    minutes: 60,
    objectives: [
      "Dùng AND khi cả hai điều kiện đều phải đúng.",
      "Dùng OR khi chỉ cần một điều kiện đúng.",
      "Dùng NOT để phủ định điều kiện và kiểm soát thứ tự bằng dấu ngoặc.",
    ],
    prerequisites: "Đã học WHERE và các toán tử so sánh (bài 11, 11).",
    explanation: [
      "AND yêu cầu mọi điều kiện đều đúng. OR chỉ cần một điều kiện đúng. NOT đảo ngược điều kiện đứng sau nó.",
      "AND có độ ưu tiên cao hơn OR. Khi trộn cả hai, dùng dấu ngoặc đơn () để nhóm điều kiện và tránh kết quả sai.",
      "Ví dụ: (role = 'Operator' OR role = 'Inspector') AND shift_id = 1 khác với role = 'Operator' OR (role = 'Inspector' AND shift_id = 1).",
    ],
    syntax: "WHERE điều_kiện1 AND điều_kiện2;\nWHERE điều_kiện1 OR điều_kiện2;\nWHERE NOT điều_kiện;",
    example: {
      sql: "SELECT full_name, role, shift_id FROM employees WHERE role = 'Operator' AND shift_id = 1;",
      explain: [
        "Chỉ lấy nhân viên vừa là Operator vừa thuộc ca 1 (Day).",
        "Một người là Operator ở ca 2 sẽ không có trong kết quả.",
      ],
    },
    factory: "Phòng nhân sự cần danh sách kỹ thuật viên kiểm tra chất lượng hoặc kỹ sư để phân công xử lý sự cố.",
    practice: [
      {
        question: "Lấy full_name và role của nhân viên có role là 'Inspector' hoặc 'Engineer'.",
        hint: "Viết hai điều kiện so sánh nối bằng OR.",
        solution: "SELECT full_name, role FROM employees WHERE role = 'Inspector' OR role = 'Engineer';",
      },
      {
        question: "Lấy full_name và role của nhân viên không phải Operator và chưa được xếp ca (shift_id là NULL).",
        hint: "Dùng NOT với role = 'Operator' và IS NULL với shift_id, nối bằng AND.",
        solution: "SELECT full_name, role FROM employees WHERE NOT role = 'Operator' AND shift_id IS NULL;",
      },
    ],
    mistakes: [
      "Quên dấu ngoặc khi trộn AND và OR, dẫn tới kết quả khác ý định.",
      "Dùng AND cho hai giá trị khác nhau của cùng một cột, ví dụ role = 'A' AND role = 'B'. Câu này không trả về dòng nào.",
    ],
    quiz: [
      { q: "Khi nào AND cho kết quả?", a: "Khi tất cả các điều kiện đều đúng." },
      { q: "Vì sao nên dùng dấu ngoặc khi trộn AND và OR?", a: "Để nhóm điều kiện đúng thứ tự và tránh hiểu sai ưu tiên." },
    ],
    summary: [
      "AND: cả hai đều đúng; OR: một trong hai đúng.",
      "NOT đảo ngược điều kiện.",
      "Dùng ngoặc đơn để kiểm soát thứ tự.",
    ],
    next: "Bài 14 lọc theo một danh sách giá trị với IN.",
  },
  {
    id: "14",
    module: 5,
    title: "IN và NOT IN: lọc theo danh sách giá trị",
    minutes: 45,
    objectives: [
      "Dùng IN thay cho nhiều điều kiện OR cùng một cột.",
      "Dùng NOT IN để loại trừ một danh sách.",
      "Nhớ cẩn thận khi danh sách có NULL.",
    ],
    prerequisites: "Đã học AND, OR (bài 13).",
    explanation: [
      "IN kiểm tra giá trị có nằm trong một danh sách hay không. Viết gọn hơn nhiều điều kiện OR nối nhau.",
      "NOT IN loại trừ các giá trị trong danh sách. Lưu ý: nếu danh sách chứa NULL, NOT IN có thể không trả về dòng nào, nên tránh đưa NULL vào danh sách.",
      "Danh sách trong IN đặt trong ngoặc đơn, các giá trị cách nhau bằng dấu phẩy.",
    ],
    syntax: "WHERE cột IN (giá_trị1, giá_trị2);\nWHERE cột NOT IN (giá_trị1, giá_trị2);",
    example: {
      sql: "SELECT line_code, line_name FROM production_lines WHERE line_code IN ('LINE-A', 'LINE-B');",
      explain: [
        "Chỉ lấy dây chuyền có mã LINE-A hoặc LINE-B.",
        "Kết quả tương đương WHERE line_code = 'LINE-A' OR line_code = 'LINE-B'.",
      ],
    },
    factory: "Trưởng ca chỉ quản lý hai dây chuyền A và B, cần danh sách máy thuộc các loại CNC hoặc Press để kiểm tra hàng tuần.",
    practice: [
      {
        question: "Lấy machine_code và machine_type của các máy có machine_type là 'CNC' hoặc 'Press'.",
        hint: "Dùng IN với danh sách ('CNC', 'Press').",
        solution: "SELECT machine_code, machine_type FROM machines WHERE machine_type IN ('CNC', 'Press');",
      },
      {
        question: "Lấy full_name và role của nhân viên có role không thuộc ('Operator', 'Inspector').",
        hint: "Dùng NOT IN.",
        solution: "SELECT full_name, role FROM employees WHERE role NOT IN ('Operator', 'Inspector');",
      },
    ],
    mistakes: [
      "Đặt chuỗi trong IN bằng nháy kép thay vì nháy đơn.",
      "Quên ngoặc đơn bao quanh danh sách sau IN.",
    ],
    quiz: [
      { q: "WHERE role IN ('A','B') tương đương với điều kiện nào?", a: "role = 'A' OR role = 'B'." },
      { q: "NOT IN dùng để làm gì?", a: "Loại trừ các giá trị có trong danh sách." },
    ],
    summary: [
      "IN lọc theo danh sách giá trị.",
      "NOT IN loại trừ danh sách.",
      "Danh sách nằm trong ngoặc đơn.",
    ],
    next: "Bài 15 lọc theo khoảng giá trị với BETWEEN.",
  },
  {
    id: "15",
    module: 5,
    title: "BETWEEN: lọc theo khoảng giá trị",
    minutes: 45,
    objectives: [
      "Dùng BETWEEN để lấy giá trị trong một khoảng.",
      "Hiểu BETWEEN bao gồm cả hai đầu mút.",
      "Áp dụng BETWEEN cho số lượng và ngày.",
    ],
    prerequisites: "Đã học WHERE và so sánh (bài 11, 11).",
    explanation: [
      "BETWEEN a AND b lấy các giá trị từ a đến b, bao gồm cả a và b. Tương đương với cột >= a AND cột <= b.",
      "BETWEEN dùng được với số, ngày và chuỗi. Với ngày, viết ngày trong nháy đơn, ví dụ '2026-01-01'.",
      "Trong báo cáo sản xuất, BETWEEN thường dùng để lấy đơn hàng trong một khoảng số lượng hoặc một kỳ thời gian.",
    ],
    syntax: "WHERE cột BETWEEN giá_trị_đầu AND giá_trị_cuối;",
    example: {
      sql: "SELECT order_code, planned_qty FROM production_orders WHERE planned_qty BETWEEN 3000 AND 3500;",
      explain: [
        "Lấy các đơn có số lượng kế hoạch từ 3000 đến 3500.",
        "Đơn có đúng 3000 hoặc 3500 cũng nằm trong kết quả.",
      ],
    },
    factory: "Kế hoạch sản xuất muốn xem các đơn cỡ vừa, số lượng kế hoạch trong một khoảng nhất định, để phân bổ máy.",
    practice: [
      {
        question: "Lấy product_code và standard_cycle_sec của các sản phẩm có standard_cycle_sec từ 45 đến 55.",
        hint: "Dùng BETWEEN 45 AND 55.",
        solution: "SELECT product_code, standard_cycle_sec FROM products WHERE standard_cycle_sec BETWEEN 45 AND 55;",
      },
      {
        question: "Lấy record_id và total_qty của các bản ghi production_records có total_qty từ 20 đến 40.",
        hint: "Cấu trúc giống câu trên, đổi tên cột và bảng.",
        solution: "SELECT record_id, total_qty FROM production_records WHERE total_qty BETWEEN 20 AND 40;",
      },
    ],
    mistakes: [
      "Tưởng BETWEEN không bao gồm đầu mút, dẫn tới thiếu dòng.",
      "Đảo thứ tự, viết BETWEEN 55 AND 45 làm kết quả rỗng.",
    ],
    quiz: [
      { q: "BETWEEN 10 AND 20 có lấy giá trị 10 và 20 không?", a: "Có, vì bao gồm cả hai đầu mút." },
      { q: "BETWEEN tương đương với điều kiện nào?", a: "cột >= giá_trị_đầu AND cột <= giá_trị_cuối." },
    ],
    summary: [
      "BETWEEN lọc trong một khoảng.",
      "Bao gồm cả hai đầu mút.",
      "Đặt giá trị nhỏ trước, lớn sau.",
    ],
    next: "Bài 16 tìm chuỗi theo mẫu với LIKE và ILIKE.",
  },
  {
    id: "16",
    module: 5,
    title: "LIKE và ILIKE: tìm chuỗi theo mẫu",
    minutes: 45,
    objectives: [
      "Dùng % để đại diện cho nhiều ký tự và _ cho một ký tự.",
      "Phân biệt LIKE (phân biệt hoa thường) với ILIKE (không phân biệt).",
      "Tìm chuỗi bắt đầu, kết thúc hoặc chứa một từ.",
    ],
    prerequisites: "Đã học WHERE (bài 11).",
    explanation: [
      "Khi nào dùng = (bằng)? Khi bạn biết chính xác giá trị cần tìm, ví dụ mã sản phẩm 'Motor Bracket' hoặc trạng thái 'Completed'. So sánh = cho kết quả đúng từng ký tự, rõ nghĩa và nhanh hơn với bảng lớn.",
      "Khi nào dùng LIKE? Khi bạn chỉ nhớ một phần của giá trị, ví dụ tên bắt đầu bằng 'Motor' hoặc có chứa 'press'. Ví dụ: product_family = 'Motor' không khớp dòng nào, nhưng LIKE 'Motor%' khớp 'Motor Bracket'.",
      "LIKE tìm chuỗi theo mẫu. % thay cho bất kỳ chuỗi ký tự nào (kể cả rỗng), _ thay cho đúng một ký tự.",
      "'Motor%' tìm chuỗi bắt đầu bằng Motor; '%press%' tìm chuỗi có chứa press ở bất kỳ vị trí nào.",
      "LIKE phân biệt chữ hoa và chữ thường. ILIKE là phiên bản không phân biệt, đây là lựa chọn an toàn hơn khi tìm tên.",
    ],
    syntax: "WHERE cột LIKE 'mẫu%';\nWHERE cột ILIKE '%mẫu%';",
    example: {
      sql: "-- Dùng = khi biết đúng giá trị\nSELECT product_code, product_family FROM products WHERE product_family = 'Motor Bracket';\n\n-- Dùng LIKE khi chỉ nhớ một phần\nSELECT product_code, product_family FROM products WHERE product_family LIKE 'Motor%';",
      explain: [
        "Lấy các sản phẩm có họ bắt đầu bằng Motor, như Motor Bracket.",
        "Dấu % đứng sau Motor nghĩa là phần còn lại có thể là bất kỳ chuỗi nào.",
      ],
    },
    factory: "Bảo trì cần tìm tất cả các máy dập có tên chứa chữ Press, không cần nhớ chính xác viết hoa hay thường.",
    practice: [
      {
        question: "Lấy machine_code và machine_name của các máy có machine_name chứa 'press' (không phân biệt hoa thường), dùng ILIKE.",
        hint: "Dùng ILIKE '%press%'.",
        solution: "SELECT machine_code, machine_name FROM machines WHERE machine_name ILIKE '%press%';",
      },
      {
        question: "Lấy full_name của nhân viên có tên bắt đầu bằng 'Inspector'.",
        hint: "Dùng LIKE 'Inspector%'.",
        solution: "SELECT full_name FROM employees WHERE full_name LIKE 'Inspector%';",
      },
    ],
    mistakes: [
      "Dùng LIKE khi cần tìm không phân biệt hoa thường, nên kết quả thiếu dòng.",
      "Quên dấu % khi cần tìm chuỗi chứa một từ, ví dụ LIKE 'press' chỉ khớp đúng chữ press.",
    ],
    quiz: [
      { q: "% trong LIKE có nghĩa gì?", a: "Đại diện cho bất kỳ chuỗi ký tự nào." },
      { q: "Khác biệt chính giữa LIKE và ILIKE là gì?", a: "ILIKE không phân biệt chữ hoa và chữ thường." },
    ],
    summary: [
      "% đại diện cho nhiều ký tự, _ cho một ký tự.",
      "ILIKE không phân biệt hoa thường.",
      "Dùng cho tên, mã và mô tả.",
    ],
    next: "Bài 17 sắp xếp kết quả với ORDER BY.",
  },
  {
    id: "17",
    module: 5,
    title: "ORDER BY: sắp xếp kết quả",
    minutes: 45,
    objectives: [
      "Sắp xếp kết quả tăng dần (ASC) và giảm dần (DESC).",
      "Sắp xếp theo nhiều cột.",
      "Hiểu vì sao sắp xếp giúp phân trang ổn định.",
    ],
    prerequisites: "Đã học SELECT và LIMIT (bài 6).",
    explanation: [
      "ORDER BY sắp xếp các dòng kết quả theo một hoặc nhiều cột. ASC là tăng dần (mặc định), DESC là giảm dần.",
      "Khi có nhiều cột, SQL sắp xếp theo cột đầu tiên, các dòng bằng nhau thì xét cột thứ hai.",
      "ORDER BY đặt ở cuối câu, sau WHERE. Kết hợp với LIMIT để lấy top N theo một tiêu chí.",
    ],
    syntax: "SELECT ... FROM tên_bảng ORDER BY cột1 ASC|DESC, cột2 ASC|DESC;",
    example: {
      sql: "SELECT product_code, standard_cycle_sec FROM products ORDER BY standard_cycle_sec DESC;",
      explain: [
        "Các sản phẩm có chu kỳ chuẩn dài nhất hiện lên đầu tiên.",
        "DESC nghĩa là giảm dần, từ lớn đến nhỏ.",
      ],
    },
    factory: "Quản lý muốn xem các đơn sản xuất có số lượng kế hoạch lớn nhất để ưu tiên nguồn lực.",
    practice: [
      {
        question: "Lấy order_code và planned_qty của 10 đơn đầu tiên khi sắp xếp planned_qty giảm dần.",
        hint: "Dùng ORDER BY planned_qty DESC và LIMIT 10.",
        solution: "SELECT order_code, planned_qty FROM production_orders ORDER BY planned_qty DESC LIMIT 10;",
      },
      {
        question: "Lấy full_name và hire_date của nhân viên, sắp xếp theo hire_date tăng dần.",
        hint: "Dùng ORDER BY hire_date ASC (hoặc không ghi ASC vì đây là mặc định).",
        solution: "SELECT full_name, hire_date FROM employees ORDER BY hire_date ASC;",
      },
    ],
    mistakes: [
      "Quên DESC nên kết quả đi theo thứ tự tăng dần, ngược với mong muốn.",
      "Đặt ORDER BY trước WHERE, làm câu lệnh bị lỗi cú pháp.",
    ],
    quiz: [
      { q: "ASC và DESC khác nhau thế nào?", a: "ASC tăng dần, DESC giảm dần." },
      { q: "Muốn sắp xếp theo hai cột, viết thế nào?", a: "ORDER BY cột1 ..., cột2 ... (cách nhau bằng dấu phẩy)." },
    ],
    summary: [
      "ORDER BY sắp xếp kết quả.",
      "ASC tăng dần, DESC giảm dần.",
      "Có thể sắp xếp theo nhiều cột.",
    ],
    next: "Bài 18 kết hợp WHERE, ORDER BY và LIMIT trong một câu lệnh.",
  },
  {
    id: "18",
    module: 5,
    title: "Kết hợp WHERE, ORDER BY và LIMIT",
    minutes: 60,
    objectives: [
      "Viết một câu lệnh có đủ WHERE, ORDER BY và LIMIT.",
      "Hiểu thứ tự thực hiện: lọc trước, sắp xếp sau, rồi giới hạn số dòng.",
      "Lấy được top N theo một điều kiện.",
    ],
    prerequisites: "Đã học WHERE, ORDER BY và LIMIT (bài 11, 16, 6).",
    explanation: [
      "Thứ tự viết là SELECT, FROM, WHERE, ORDER BY, LIMIT. Thứ tự xử lý cũng tương tự: lọc dòng, sắp xếp, rồi lấy n dòng đầu.",
      "Đây là mẫu truy vấn cơ bản nhất để trả lời câu hỏi kiểu 'top 10 ... có điều kiện'.",
    ],
    syntax: "SELECT cột FROM bảng WHERE điều_kiện ORDER BY cột DESC LIMIT n;",
    example: {
      sql: "SELECT record_id, total_qty FROM production_records WHERE total_qty > 50 ORDER BY total_qty DESC LIMIT 10;",
      explain: [
        "WHERE lấy các bản ghi có total_qty lớn hơn 50.",
        "ORDER BY total_qty DESC xếp các bản ghi này từ lớn đến nhỏ, LIMIT 10 chỉ giữ 10 dòng đầu.",
      ],
    },
    factory: "Quản lý chất lượng muốn xem 10 lần ghi nhận có số lượng sản xuất lớn nhất để kiểm tra ngược.",
    practice: [
      {
        question: "Lấy 10 bản ghi production_records có good_qty lớn hơn 0, sắp xếp theo total_qty giảm dần, hiển thị record_id, good_qty và total_qty.",
        hint: "Viết WHERE good_qty > 0, ORDER BY total_qty DESC và LIMIT 10.",
        solution: "SELECT record_id, good_qty, total_qty FROM production_records WHERE good_qty > 0 ORDER BY total_qty DESC LIMIT 10;",
      },
      {
        question: "Top 5 sản phẩm có standard_cycle_sec lớn nhất, chỉ hiển thị product_code và standard_cycle_sec.",
        hint: "Không cần WHERE; dùng ORDER BY giảm dần và LIMIT 5.",
        solution: "SELECT product_code, standard_cycle_sec FROM products ORDER BY standard_cycle_sec DESC LIMIT 5;",
      },
    ],
    mistakes: [
      "Đặt LIMIT trước ORDER BY, câu lệnh bị lỗi.",
      "Quên ORDER BY nên top N không đúng là top: database chọn ngẫu nhiên các dòng.",
    ],
    quiz: [
      { q: "Muốn lấy top 5 theo một cột thì cần những gì?", a: "ORDER BY cột DESC và LIMIT 5." },
      { q: "WHERE, ORDER BY, LIMIT được thực hiện theo thứ tự nào?", a: "Lọc dòng (WHERE), sắp xếp (ORDER BY), rồi lấy n dòng (LIMIT)." },
    ],
    summary: [
      "Thứ tự câu: WHERE, ORDER BY, LIMIT.",
      "Lọc, sắp xếp rồi giới hạn số dòng.",
      "Mẫu top N theo điều kiện.",
    ],
    next: "Module 3 học các hàm tổng hợp như COUNT, SUM, AVG, MIN, MAX và GROUP BY.",
  },
];
