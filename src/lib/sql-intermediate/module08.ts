import type { IntermediateLesson } from "./types";

/* Module 08 — Subqueries: scalar và multi-row, WHERE, FROM, correlated, EXISTS, UNION, INTERSECT/EXCEPT. */

export const module08: IntermediateLesson[] = [
  {
    id: "7",
    module: 8,
    title: "Subquery là gì? Scalar và multi-row",
    minutes: 45,
    objectives: [
      "Hiểu subquery là câu SELECT nằm trong ngoặc, dùng làm giá trị cho câu lớn.",
      "Phân biệt subquery trả về một giá trị (scalar) và nhiều dòng.",
      "Viết subquery scalar trong WHERE.",
    ],
    prerequisites: "Đã học JOIN và các hàm tổng hợp (module 07 và khóa Basic).",
    explanation: [
      "Subquery là một câu SELECT đặt trong ngoặc đơn bên trong câu lệnh khác. SQL chạy subquery trước rồi dùng kết quả cho câu bên ngoài.",
      "Subquery scalar trả về đúng một giá trị, ví dụ AVG(...). Có thể dùng nó như một số bình thường, ví dụ so sánh với planned_qty.",
      "Subquery multi-row trả về nhiều dòng, thường dùng với IN hoặc EXISTS (xem các bài sau).",
    ],
    syntax: "SELECT ... FROM bảng WHERE cột > (SELECT AVG(cột) FROM bảng);",
    example: {
      sql: "SELECT order_code, planned_qty\nFROM production_orders\nWHERE planned_qty > (SELECT AVG(planned_qty) FROM production_orders);",
      explain: [
        "Subquery (SELECT AVG(planned_qty) ...) tính một số: sản lượng kế hoạch trung bình.",
        "Câu ngoài lấy các đơn có kế hoạch lớn hơn con số đó.",
      ],
    },
    factory: "Kế hoạch muốn tìm các đơn có sản lượng kế hoạch cao hơn mức trung bình để ưu tiên.",
    practice: [
      {
        question: "Lấy product_code và standard_cycle_sec của các sản phẩm có chu kỳ chuẩn lớn hơn mức trung bình.",
        hint: "Dùng WHERE standard_cycle_sec > (SELECT AVG(standard_cycle_sec) FROM products).",
        solution: "SELECT product_code, standard_cycle_sec FROM products WHERE standard_cycle_sec > (SELECT AVG(standard_cycle_sec) FROM products);",
      },
      {
        question: "Lấy full_name của nhân viên được tuyển sau ngày nhận việc sớm nhất trong bảng employees.",
        hint: "Dùng WHERE hire_date > (SELECT MIN(hire_date) FROM employees).",
        solution: "SELECT full_name FROM employees WHERE hire_date > (SELECT MIN(hire_date) FROM employees);",
      },
    ],
    mistakes: [
      "Subquery scalar trả về nhiều dòng sẽ báo lỗi; khi cần nhiều giá trị hãy dùng IN.",
      "Quên ngoặc đơn bao quanh subquery.",
    ],
    quiz: [
      { q: "Subquery scalar trả về bao nhiêu giá trị?", a: "Đúng một giá trị." },
      { q: "Subquery được chạy theo thứ tự nào?", a: "Thường chạy trước, rồi kết quả được dùng cho câu bên ngoài." },
    ],
    summary: [
      "Subquery là SELECT nằm trong ngoặc.",
      "Scalar subquery trả về một giá trị.",
      "Dùng so sánh như với một số thông thường.",
    ],
    next: "Bài 8 dùng subquery trong WHERE với IN và NOT IN.",
  },
  {
    id: "8",
    module: 8,
    title: "Subquery trong WHERE với IN và NOT IN",
    minutes: 45,
    objectives: [
      "Dùng IN với subquery để lọc theo một tập giá trị.",
      "Dùng NOT IN để loại trừ tập giá trị.",
      "Hiểu lỗi thường gặp khi subquery có NULL trong NOT IN.",
    ],
    prerequisites: "Đã học subquery scalar (bài 7) và IN (khóa Basic).",
    explanation: [
      "Khi subquery trả về nhiều dòng, dùng IN để kiểm tra giá trị có nằm trong danh sách đó hay không.",
      "NOT IN loại các dòng có giá trị nằm trong danh sách. Cẩn thận: nếu subquery trả về NULL, NOT IN có thể không trả về dòng nào. Hãy loại NULL bằng WHERE cột IS NOT NULL trong subquery.",
      "IN với subquery thường dễ đọc hơn JOIN khi chỉ cần kiểm tra sự tồn tại của giá trị.",
    ],
    syntax: "SELECT ... FROM bảng WHERE cột IN (SELECT cột FROM bảng_khác WHERE điều_kiện);",
    example: {
      sql: "SELECT machine_code, machine_name\nFROM machines\nWHERE line_id IN (SELECT line_id FROM production_lines WHERE line_code IN ('LINE-A', 'LINE-B'));",
      explain: [
        "Subquery lấy danh sách line_id của hai dây chuyền LINE-A và LINE-B.",
        "Câu ngoài lấy các máy thuộc các dây chuyền trong danh sách đó.",
      ],
    },
    factory: "Trưởng ca chỉ phụ trách một số dây chuyền; cần lấy danh sách máy thuộc các dây chuyền đó.",
    practice: [
      {
        question: "Lấy order_code của các đơn có product_id thuộc những sản phẩm có product_family là 'Motor Bracket'.",
        hint: "WHERE product_id IN (SELECT product_id FROM products WHERE product_family = 'Motor Bracket').",
        solution: "SELECT order_code FROM production_orders WHERE product_id IN (SELECT product_id FROM products WHERE product_family = 'Motor Bracket');",
      },
      {
        question: "Lấy full_name của nhân viên không làm ở ca nào thuộc danh sách ca có shift_name là 'Night'.",
        hint: "WHERE shift_id NOT IN (SELECT shift_id FROM shifts WHERE shift_name = 'Night').",
        solution: "SELECT full_name FROM employees WHERE shift_id NOT IN (SELECT shift_id FROM shifts WHERE shift_name = 'Night');",
      },
    ],
    mistakes: [
      "NOT IN với subquery có NULL làm kết quả rỗng; hãy thêm IS NOT NULL vào subquery.",
      "Subquery trả về nhiều cột nhưng IN chỉ so một cột.",
    ],
    quiz: [
      { q: "IN với subquery kiểm tra điều gì?", a: "Giá trị có nằm trong danh sách trả về của subquery hay không." },
      { q: "Vì sao NOT IN có thể cho kết quả rỗng?", a: "Vì subquery có NULL, so sánh với NULL không xác định nên không có dòng nào thỏa." },
    ],
    summary: [
      "IN với subquery kiểm tra thuộc danh sách.",
      "NOT IN cẩn thận với NULL.",
    ],
    next: "Bài 9 dùng subquery trong FROM, gọi là derived table.",
  },
  {
    id: "9",
    module: 8,
    title: "Subquery trong FROM: derived table",
    minutes: 45,
    objectives: [
      "Viết subquery trong FROM và đặt alias cho nó.",
      "Dùng derived table để tổng hợp hai bước.",
      "Hiểu vì sao cần alias cho derived table.",
    ],
    prerequisites: "Đã học GROUP BY và subquery (module 06 khóa Basic, bài 7 và 8).",
    explanation: [
      "Subquery đặt trong FROM được gọi là derived table: một bảng tạm có tên (alias) chỉ tồn tại trong câu lệnh đó.",
      "Dùng derived table khi cần tổng hợp trước rồi mới lọc hoặc JOIN kết quả. Ví dụ: tính tổng sản lượng theo máy, rồi lấy các máy vượt mức.",
      "Derived table bắt buộc có alias ở cuối ngoặc.",
    ],
    syntax: "SELECT ... FROM (SELECT ... FROM bảng GROUP BY ...) AS alias WHERE ...;",
    example: {
      sql: "SELECT t.machine_id, t.tong_dat\nFROM (\n  SELECT machine_id, SUM(good_qty) AS tong_dat\n  FROM production_records\n  GROUP BY machine_id\n) AS t\nWHERE t.tong_dat > 10000;",
      explain: [
        "Bên trong: tính tổng sản phẩm đạt cho từng máy.",
        "Bên ngoài: lọc các máy có tổng trên 10000. Alias t là bắt buộc.",
      ],
    },
    factory: "Báo cáo cần tổng sản lượng từng máy trước, rồi chỉ hiển thị các máy vượt mục tiêu.",
    practice: [
      {
        question: "Tính tổng good_qty theo order_id trong production_records, rồi chỉ lấy các đơn có tổng trên 5000 (dùng derived table tên t).",
        hint: "Viết SELECT order_id, SUM(good_qty) ... GROUP BY order_id trong ngoặc, đặt alias t, rồi WHERE t.tong > 5000.",
        solution: "SELECT t.order_id, t.tong FROM (SELECT order_id, SUM(good_qty) AS tong FROM production_records GROUP BY order_id) AS t WHERE t.tong > 5000;",
      },
      {
        question: "Đếm số máy có tổng ng_qty lớn hơn 0 (dùng derived table tổng hợp theo machine_id).",
        hint: "Bên trong tính SUM(ng_qty) theo machine_id; bên ngoài COUNT(*) với WHERE.",
        solution: "SELECT COUNT(*) AS so_may FROM (SELECT machine_id, SUM(ng_qty) AS tong_loi FROM production_records GROUP BY machine_id) AS t WHERE t.tong_loi > 0;",
      },
    ],
    mistakes: [
      "Quên alias cho derived table nên câu lệnh báo lỗi.",
      "Cố dùng cột của derived table ở ngoài mà không ghi alias, gây mơ hồ.",
    ],
    quiz: [
      { q: "Derived table là gì?", a: "Subquery trong FROM, coi như một bảng tạm có alias." },
      { q: "Vì sao cần alias cho derived table?", a: "Vì SQL cần tên để tham chiếu tới các cột của bảng tạm." },
    ],
    summary: [
      "Derived table là subquery trong FROM.",
      "Dùng để tổng hợp hai bước.",
      "Luôn đặt alias.",
    ],
    next: "Bài 10 học correlated subquery: subquery tham chiếu dòng của câu ngoài.",
  },
  {
    id: "10",
    module: 8,
    title: "Correlated subquery: tham chiếu dòng bên ngoài",
    minutes: 60,
    objectives: [
      "Hiểu correlated subquery chạy lại cho từng dòng của câu ngoài.",
      "Viết subquery so sánh với giá trị của dòng hiện tại.",
      "Biết khi nào nên dùng JOIN hoặc window function thay thế.",
    ],
    prerequisites: "Đã học subquery trong WHERE và FROM (bài 8, 9).",
    explanation: [
      "Correlated subquery là subquery có tham chiếu tới cột của câu ngoài. Với mỗi dòng bên ngoài, subquery được tính lại với giá trị của dòng đó.",
      "Ví dụ: với mỗi máy, lấy bản ghi sản xuất có good_qty lớn nhất của chính máy đó.",
      "Cách này dễ hiểu nhưng có thể chậm với bảng lớn. Khi đó hãy cân nhắc window function (module 11).",
    ],
    syntax: "SELECT ... FROM bảng a WHERE cột > (SELECT MAX(cột) FROM bảng b WHERE b.khóa = a.khóa);",
    example: {
      sql: "SELECT r.machine_id, r.record_id, r.good_qty\nFROM production_records r\nWHERE r.good_qty = (\n  SELECT MAX(r2.good_qty)\n  FROM production_records r2\n  WHERE r2.machine_id = r.machine_id\n)\nORDER BY r.machine_id\nLIMIT 10;",
      explain: [
        "Subquery trong ngoặc dùng r.machine_id của dòng bên ngoài.",
        "Kết quả: bản ghi có good_qty lớn nhất của từng máy.",
      ],
    },
    factory: "Với mỗi máy, quản lý muốn xem lần ghi nhận có sản lượng đạt cao nhất để đối chiếu.",
    practice: [
      {
        question: "Lấy employee_id và full_name của nhân viên có hire_date sớm nhất trong cùng role của họ.",
        hint: "WHERE hire_date = (SELECT MIN(e2.hire_date) FROM employees e2 WHERE e2.role = employees.role).",
        solution: "SELECT e.employee_id, e.full_name FROM employees e WHERE e.hire_date = (SELECT MIN(e2.hire_date) FROM employees e2 WHERE e2.role = e.role);",
      },
      {
        question: "Lấy machine_id và cycle_time_sec của các bản ghi machine_cycles có cycle_time_sec lớn nhất trong cùng máy (tên bảng machine_cycles).",
        hint: "Dùng subquery MAX(cycle_time_sec) với điều kiện machine_id bằng máy của dòng ngoài.",
        solution: "SELECT c.machine_id, c.cycle_time_sec FROM machine_cycles c WHERE c.cycle_time_sec = (SELECT MAX(c2.cycle_time_sec) FROM machine_cycles c2 WHERE c2.machine_id = c.machine_id);",
      },
    ],
    mistakes: [
      "Quên điều kiện tham chiếu nên subquery không còn là correlated và cho kết quả sai.",
      "Dùng correlated subquery trên bảng lớn mà không kiểm tra tốc độ.",
    ],
    quiz: [
      { q: "Correlated subquery khác subquery thường ở điểm nào?", a: "Nó tham chiếu cột của câu ngoài và được tính lại cho từng dòng." },
      { q: "Khi bảng lớn, có cách nào thay thế không?", a: "Có: dùng JOIN với derived table hoặc window function." },
    ],
    summary: [
      "Correlated subquery tham chiếu dòng bên ngoài.",
      "Tính lại cho từng dòng.",
      "Cân nhắc tốc độ với bảng lớn.",
    ],
    next: "Bài 11 dùng EXISTS và NOT EXISTS để kiểm tra sự tồn tại.",
  },
  {
    id: "11",
    module: 8,
    title: "EXISTS và NOT EXISTS: kiểm tra sự tồn tại",
    minutes: 45,
    objectives: [
      "Dùng EXISTS để kiểm tra có dòng khớp hay không.",
      "Dùng NOT EXISTS để tìm dòng không có đối tác.",
      "Hiểu EXISTS chỉ cần biết có dòng, không cần giá trị.",
    ],
    prerequisites: "Đã học correlated subquery (bài 10).",
    explanation: [
      "EXISTS trả về đúng nếu subquery có ít nhất một dòng. Nó không quan tâm giá trị trả về nên thường viết SELECT 1 bên trong.",
      "NOT EXISTS là phủ định: tìm các dòng mà subquery không có dòng nào khớp. Đây là cách viết dễ hiểu cho câu hỏi 'chưa có'.",
      "EXISTS thường nhanh và an toàn với NULL hơn NOT IN.",
    ],
    syntax: "SELECT ... FROM a WHERE EXISTS (SELECT 1 FROM b WHERE b.khóa = a.khóa);",
    example: {
      sql: "SELECT l.line_code\nFROM production_lines l\nWHERE NOT EXISTS (\n  SELECT 1 FROM production_orders o WHERE o.line_id = l.line_id\n);",
      explain: [
        "Với mỗi dây chuyền, kiểm tra có đơn sản xuất nào không.",
        "NOT EXISTS giữ các dây chuyền không có đơn nào.",
      ],
    },
    factory: "Kế hoạch muốn biết dây chuyền nào hiện không được giao đơn sản xuất nào.",
    practice: [
      {
        question: "Lấy machine_code của các máy có ít nhất một bản ghi trong production_records (dùng EXISTS).",
        hint: "WHERE EXISTS (SELECT 1 FROM production_records r WHERE r.machine_id = machines.machine_id).",
        solution: "SELECT machine_code FROM machines m WHERE EXISTS (SELECT 1 FROM production_records r WHERE r.machine_id = m.machine_id);",
      },
      {
        question: "Lấy full_name của nhân viên không phải là Operator nhưng không có ca làm (shift_id IS NULL), dùng NOT EXISTS để kiểm tra bảng production_records theo operator_id.",
        hint: "WHERE role <> 'Operator' và NOT EXISTS (SELECT 1 FROM production_records r WHERE r.operator_id = e.employee_id).",
        solution: "SELECT e.full_name FROM employees e WHERE e.role <> 'Operator' AND NOT EXISTS (SELECT 1 FROM production_records r WHERE r.operator_id = e.employee_id);",
      },
    ],
    mistakes: [
      "Quên điều kiện tham chiếu trong subquery, khi đó EXISTS luôn đúng.",
      "Nhầm EXISTS với IN khi cần kiểm tra theo cặp khóa.",
    ],
    quiz: [
      { q: "EXISTS kiểm tra điều gì?", a: "Subquery có ít nhất một dòng hay không." },
      { q: "Khi nào NOT EXISTS hữu ích?", a: "Khi cần tìm các dòng không có đối tác, ví dụ chưa có đơn nào." },
    ],
    summary: [
      "EXISTS kiểm tra có dòng khớp.",
      "NOT EXISTS tìm dòng không có đối tác.",
      "Thường an toàn hơn NOT IN với NULL.",
    ],
    next: "Bài 12 kết hợp kết quả bằng UNION và UNION ALL.",
  },
  {
    id: "12",
    module: 8,
    title: "UNION và UNION ALL: gộp kết quả",
    minutes: 45,
    objectives: [
      "Gộp kết quả của hai câu SELECT bằng UNION và UNION ALL.",
      "Hiểu UNION loại dòng trùng, UNION ALL giữ mọi dòng.",
      "Đảm bảo số cột và kiểu dữ liệu khớp nhau.",
    ],
    prerequisites: "Đã học SELECT và WHERE (khóa Basic).",
    explanation: [
      "UNION gộp kết quả của hai câu SELECT thành một bảng và loại các dòng trùng hoàn toàn.",
      "UNION ALL gộp và giữ mọi dòng, kể cả trùng. Nhanh hơn UNION vì không cần kiểm tra trùng.",
      "Hai câu SELECT phải có cùng số cột, và các cột tương ứng phải có kiểu tương thích.",
    ],
    syntax: "SELECT cột FROM bảng_1\nUNION [ALL]\nSELECT cột FROM bảng_2;",
    example: {
      sql: "SELECT line_code AS ma FROM production_lines\nUNION ALL\nSELECT machine_code AS ma FROM machines;",
      explain: [
        "Gộp mã dây chuyền và mã máy vào cùng một cột tên ma.",
        "UNION ALL giữ tất cả các dòng, không loại trùng.",
      ],
    },
    factory: "Báo cáo cần một danh sách mã gồm cả dây chuyền và máy để đối chiếu với hệ thống khác.",
    practice: [
      {
        question: "Gộp product_code và machine_code thành một cột ma (dùng UNION, không cần giữ trùng).",
        hint: "SELECT product_code AS ma FROM products UNION SELECT machine_code AS ma FROM machines.",
        solution: "SELECT product_code AS ma FROM products UNION SELECT machine_code AS ma FROM machines;",
      },
      {
        question: "Gộp full_name của nhân viên Operator và Inspector bằng UNION ALL, cột tên là ten.",
        hint: "Hai SELECT có WHERE role khác nhau, nối bằng UNION ALL.",
        solution: "SELECT full_name AS ten FROM employees WHERE role = 'Operator' UNION ALL SELECT full_name AS ten FROM employees WHERE role = 'Inspector';",
      },
    ],
    mistakes: [
      "Số cột của hai SELECT khác nhau, câu lệnh báo lỗi.",
      "Dùng UNION khi muốn giữ dòng trùng, làm mất dữ liệu.",
    ],
    quiz: [
      { q: "UNION khác UNION ALL ở điểm nào?", a: "UNION loại dòng trùng, UNION ALL giữ mọi dòng." },
      { q: "Yêu cầu nào bắt buộc khi gộp?", a: "Cùng số cột và kiểu dữ liệu tương thích." },
    ],
    summary: [
      "UNION gộp và loại trùng; UNION ALL gộp giữ trùng.",
      "Số cột phải khớp nhau.",
    ],
    next: "Bài 13 học INTERSECT và EXCEPT để tìm phần chung và phần khác nhau.",
  },
  {
    id: "13",
    module: 8,
    title: "INTERSECT và EXCEPT: phần chung và phần khác",
    minutes: 45,
    objectives: [
      "Dùng INTERSECT để lấy các dòng chung của hai kết quả.",
      "Dùng EXCEPT để lấy các dòng có ở kết quả thứ nhất nhưng không có ở kết quả thứ hai.",
      "Hiểu hai phép này cũng loại dòng trùng.",
    ],
    prerequisites: "Đã học UNION (bài 12).",
    explanation: [
      "INTERSECT trả về các dòng xuất hiện ở cả hai kết quả. EXCEPT trả về các dòng ở kết quả đầu nhưng không có ở kết quả sau.",
      "Giống UNION, hai phép này loại dòng trùng. Có thể thêm ALL (INTERSECT ALL, EXCEPT ALL) để giữ số lần xuất hiện.",
      "Các phép này tương đương với EXISTS hoặc NOT EXISTS, nhưng viết ngắn hơn khi so sánh nguyên cột.",
    ],
    syntax: "SELECT ... INTERSECT SELECT ...;\nSELECT ... EXCEPT SELECT ...;",
    example: {
      sql: "SELECT machine_type FROM machines\nINTERSECT\nSELECT machine_type FROM machines WHERE line_id = 1;",
      explain: [
        "Lấy các loại máy có ở cả toàn bộ máy và máy thuộc dây chuyền 1.",
        "Kết quả là các loại máy xuất hiện ở dây chuyền 1.",
      ],
    },
    factory: "Kỹ thuật muốn biết loại máy nào có ở dây chuyền A nhưng không có ở dây chuyền B.",
    practice: [
      {
        question: "Lấy các role có trong employees nhưng không xuất hiện trong danh sách employee thuộc ca Day (shift_id = 1), dùng EXCEPT.",
        hint: "SELECT role FROM employees EXCEPT SELECT role FROM employees WHERE shift_id = 1.",
        solution: "SELECT role FROM employees EXCEPT SELECT role FROM employees WHERE shift_id = 1;",
      },
      {
        question: "Lấy các product_family xuất hiện trong products và cũng có trong danh sách các sản phẩm của đơn sản xuất (dùng INTERSECT).",
        hint: "SELECT product_family FROM products INTERSECT SELECT p.product_family FROM products p JOIN production_orders o ON o.product_id = p.product_id.",
        solution: "SELECT product_family FROM products INTERSECT SELECT p.product_family FROM products p JOIN production_orders o ON o.product_id = p.product_id;",
      },
    ],
    mistakes: [
      "Quên các phép này cũng loại trùng, nên số dòng ít hơn dự kiến.",
      "Đổi thứ tự EXCEPT làm kết quả khác: EXCEPT không đối xứng.",
    ],
    quiz: [
      { q: "INTERSECT trả về gì?", a: "Các dòng có ở cả hai kết quả." },
      { q: "EXCEPT có đối xứng không?", a: "Không. A EXCEPT B khác B EXCEPT A." },
    ],
    summary: [
      "INTERSECT lấy phần chung.",
      "EXCEPT lấy phần chỉ có ở vế đầu.",
      "EXCEPT không đối xứng.",
    ],
    next: "Module 09 học CTE: đặt tên cho các bước của câu truy vấn.",
  },
];
