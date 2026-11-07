import type { IntermediateLesson } from "./types";

/* Module 07 — Joins: quan hệ giữa các bảng, INNER, LEFT, RIGHT/FULL, nhiều bảng, self join. */

export const module07: IntermediateLesson[] = [
  {
    id: "1",
    module: 7,
    title: "Hiểu quan hệ giữa các bảng",
    minutes: 45,
    objectives: [
      "Nhận biết khóa chính (PK) và khóa ngoại (FK) trong bộ dữ liệu nhà máy.",
      "Phân biệt quan hệ 1-1, 1-nhiều và nhiều-nhiều.",
      "Hiểu vì sao cần JOIN để ghép dữ liệu từ nhiều bảng.",
    ],
    prerequisites: "Đã học SELECT, WHERE và các hàm tổng hợp (khóa Basic).",
    explanation: [
      "Dữ liệu nhà máy được tách thành nhiều bảng để tránh lặp lại. Ví dụ bảng production_lines lưu thông tin dây chuyền, còn machines lưu máy và có cột line_id trỏ về dây chuyền.",
      "Cột trỏ về khóa chính của bảng khác gọi là khóa ngoại (foreign key). Ví dụ machines.line_id là khóa ngoại tham chiếu production_lines.line_id.",
      "Quan hệ 1-nhiều: một dây chuyền có nhiều máy. Quan hệ nhiều-nhiều (ví dụ nhân viên và dây chuyền) cần một bảng trung gian. JOIN là cách ghép các bảng này lại khi truy vấn.",
    ],
    syntax: "SELECT ... FROM bảng_a a JOIN bảng_b b ON a.khóa = b.khóa_ngoại;",
    example: {
      sql: "SELECT m.machine_code, l.line_name\nFROM machines m\nJOIN production_lines l ON m.line_id = l.line_id;",
      explain: [
        "FROM machines m: đặt bí danh m cho bảng máy.",
        "JOIN production_lines l ON m.line_id = l.line_id: ghép mỗi máy với dây chuyền có cùng line_id.",
        "Kết quả hiện mã máy kèm tên dây chuyền, dù hai thông tin nằm ở hai bảng.",
      ],
    },
    factory: "Trưởng ca muốn biết mỗi máy thuộc dây chuyền nào, nhưng thông tin này nằm ở hai bảng khác nhau.",
    practice: [
      {
        question: "Lấy machine_code và line_name của các máy, ghép với production_lines qua line_id.",
        hint: "Dùng JOIN production_lines ON machines.line_id = production_lines.line_id.",
        solution: "SELECT m.machine_code, l.line_name FROM machines m JOIN production_lines l ON m.line_id = l.line_id;",
      },
      {
        question: "Lấy product_name và order_code của các đơn sản xuất, ghép qua product_id.",
        hint: "Bảng production_orders có cột product_id trỏ về products.",
        solution: "SELECT p.product_name, o.order_code FROM production_orders o JOIN products p ON o.product_id = p.product_id;",
      },
    ],
    mistakes: [
      "Quên điều kiện ON nên ghép mọi dòng với mọi dòng (tích Descartes), số dòng bùng nổ.",
      "Nhầm khóa: ghép cột không có quan hệ thật, cho kết quả vô nghĩa.",
    ],
    quiz: [
      { q: "Khóa ngoại là gì?", a: "Cột trỏ về khóa chính của một bảng khác." },
      { q: "Vì sao thiếu ON là nguy hiểm?", a: "Vì mỗi dòng sẽ được ghép với mọi dòng, số dòng kết quả tăng rất nhanh." },
    ],
    summary: [
      "Khóa chính định danh một dòng; khóa ngoại trỏ về khóa chính.",
      "JOIN ghép các bảng qua điều kiện ON.",
      "Luôn kiểm tra điều kiện ON trước khi chạy.",
    ],
    next: "Bài 2 học INNER JOIN, kiểu JOIN phổ biến nhất.",
  },
  {
    id: "2",
    module: 7,
    title: "INNER JOIN: chỉ lấy dòng khớp",
    minutes: 45,
    objectives: [
      "Viết INNER JOIN với điều kiện ON.",
      "Hiểu INNER JOIN chỉ giữ các dòng có khớp ở cả hai bảng.",
      "Lọc kết quả JOIN bằng WHERE.",
    ],
    prerequisites: "Đã học JOIN cơ bản (bài 1).",
    explanation: [
      "INNER JOIN trả về các cặp dòng khớp nhau theo điều kiện ON. Dòng nào không có đối tác ở bảng còn lại sẽ bị bỏ.",
      "Từ khóa INNER là tùy chọn: JOIN một mình cũng là INNER JOIN.",
      "Có thể thêm WHERE sau JOIN để lọc kết quả, ví dụ chỉ lấy một dây chuyền hoặc một trạng thái đơn.",
    ],
    syntax: "SELECT ... FROM a INNER JOIN b ON a.khóa = b.khóa WHERE điều_kiện;",
    example: {
      sql: "SELECT o.order_code, p.product_name, o.planned_qty\nFROM production_orders o\nINNER JOIN products p ON o.product_id = p.product_id\nWHERE o.status = 'Completed';",
      explain: [
        "Ghép mỗi đơn sản xuất với sản phẩm của nó qua product_id.",
        "WHERE chỉ giữ các đơn đã hoàn thành.",
      ],
    },
    factory: "Quản lý muốn xem các đơn đã hoàn thành kèm tên sản phẩm để kiểm tra kế hoạch.",
    practice: [
      {
        question: "Lấy machine_code, machine_name và line_name của các máy thuộc dây chuyền LINE-A.",
        hint: "JOIN machines với production_lines, rồi WHERE line_code = 'LINE-A'.",
        solution: "SELECT m.machine_code, m.machine_name, l.line_name FROM machines m INNER JOIN production_lines l ON m.line_id = l.line_id WHERE l.line_code = 'LINE-A';",
      },
      {
        question: "Lấy order_code và product_name của các đơn có status là 'Running'.",
        hint: "JOIN production_orders với products rồi lọc status.",
        solution: "SELECT o.order_code, p.product_name FROM production_orders o INNER JOIN products p ON o.product_id = p.product_id WHERE o.status = 'Running';",
      },
    ],
    mistakes: [
      "Đặt điều kiện lọc ở ON thay vì WHERE, với INNER JOIN kết quả thường giống nhau nhưng dễ gây nhầm khi chuyển sang LEFT JOIN.",
      "Quên bí danh bảng nên tên cột bị mơ hồ khi hai bảng cùng có cột tên giống nhau.",
    ],
    quiz: [
      { q: "INNER JOIN trả về dòng nào?", a: "Chỉ các dòng khớp ở cả hai bảng." },
      { q: "Từ khóa INNER có bắt buộc không?", a: "Không, JOIN một mình mặc định là INNER JOIN." },
    ],
    summary: [
      "INNER JOIN giữ các dòng khớp hai bên.",
      "Dùng bí danh bảng để câu lệnh ngắn và rõ.",
      "Lọc kết quả bằng WHERE sau JOIN.",
    ],
    next: "Bài 3 học LEFT JOIN để giữ cả các dòng không có đối tác.",
  },
  {
    id: "3",
    module: 7,
    title: "LEFT JOIN: giữ dòng bên trái kể cả không khớp",
    minutes: 45,
    objectives: [
      "Viết LEFT JOIN và hiểu cách bảng bên trái được giữ lại.",
      "Tìm các dòng bên trái không có đối tác bằng IS NULL.",
      "Biết vì sao phải cẩn thận khi lọc bảng bên phải.",
    ],
    prerequisites: "Đã học INNER JOIN (bài 2) và NULL (khóa Basic).",
    explanation: [
      "LEFT JOIN giữ tất cả dòng của bảng bên trái. Nếu bảng bên phải không có dòng khớp, các cột của bảng bên phải hiện NULL.",
      "Cách dùng phổ biến: tìm dòng không có đối tác bằng LEFT JOIN rồi lọc IS NULL ở cột khóa của bảng bên phải.",
      "Nếu đặt điều kiện của bảng bên phải trong WHERE, các dòng NULL sẽ bị loại và LEFT JOIN thành INNER JOIN. Hãy đặt điều kiện đó trong ON khi cần giữ dòng bên trái.",
    ],
    syntax: "SELECT ... FROM a LEFT JOIN b ON a.khóa = b.khóa;",
    example: {
      sql: "SELECT l.line_code, COUNT(o.order_id) AS so_don\nFROM production_lines l\nLEFT JOIN production_orders o ON o.line_id = l.line_id\nGROUP BY l.line_code;",
      explain: [
        "Giữ mọi dây chuyền, kể cả dây chuyền chưa có đơn nào.",
        "COUNT(o.order_id) đếm đơn khớp; dây chuyền không có đơn sẽ có số 0.",
      ],
    },
    factory: "Kế hoạch muốn biết dây chuyền nào chưa được giao đơn sản xuất nào.",
    practice: [
      {
        question: "Liệt kê tất cả các dây chuyền và số máy của mỗi dây chuyền (dây chuyền không có máy vẫn hiện, với số 0).",
        hint: "LEFT JOIN production_lines với machines rồi GROUP BY dây chuyền; đếm máy bằng COUNT(machine_id).",
        solution: "SELECT l.line_code, COUNT(m.machine_id) AS so_may FROM production_lines l LEFT JOIN machines m ON m.line_id = l.line_id GROUP BY l.line_code;",
      },
      {
        question: "Liệt kê các dây chuyền có ít nhất một đơn sản xuất (dùng LEFT JOIN rồi lọc o.order_id IS NOT NULL, không trùng).",
        hint: "LEFT JOIN production_orders, WHERE o.order_id IS NOT NULL, dùng DISTINCT để không lặp mã.",
        solution: "SELECT DISTINCT l.line_code FROM production_lines l LEFT JOIN production_orders o ON o.line_id = l.line_id WHERE o.order_id IS NOT NULL;",
      },
    ],
    mistakes: [
      "Lọc bảng bên phải trong WHERE làm mất các dòng NULL, biến LEFT JOIN thành INNER JOIN.",
      "Dùng COUNT(*) thay COUNT(cột) nên dòng không khớp vẫn được đếm là 1.",
    ],
    quiz: [
      { q: "LEFT JOIN giữ dòng nào?", a: "Mọi dòng của bảng bên trái, kể cả không khớp." },
      { q: "Vì sao COUNT(cột bên phải) đếm đúng hơn COUNT(*)?", a: "Vì dòng không khớp có cột bên phải là NULL, COUNT(cột) bỏ qua NULL." },
    ],
    summary: [
      "LEFT JOIN giữ toàn bộ bảng bên trái.",
      "Tìm dòng không khớp bằng IS NULL.",
      "Điều kiện bảng bên phải đặt trong ON nếu cần giữ dòng.",
    ],
    next: "Bài 4 học RIGHT JOIN và FULL OUTER JOIN.",
  },
  {
    id: "4",
    module: 7,
    title: "RIGHT JOIN và FULL OUTER JOIN",
    minutes: 45,
    objectives: [
      "Hiểu RIGHT JOIN giữ bảng bên phải.",
      "Hiểu FULL OUTER JOIN giữ dòng của cả hai bảng.",
      "Chọn đúng loại JOIN theo câu hỏi.",
    ],
    prerequisites: "Đã học LEFT JOIN (bài 3).",
    explanation: [
      "RIGHT JOIN giống LEFT JOIN nhưng giữ bảng bên phải. Trong thực tế, người ta thường đổi thứ tự bảng và dùng LEFT JOIN để dễ đọc hơn.",
      "FULL OUTER JOIN giữ dòng của cả hai bảng: dòng nào không khớp ở phía nào thì phía đó hiện NULL. Dùng khi cần so sánh hai danh sách với nhau.",
      "Quy tắc chọn: muốn giữ bảng nào thì JOIN với bảng đó là bảng bên trái, hoặc dùng FULL OUTER JOIN khi cần thấy cả hai phía.",
    ],
    syntax: "SELECT ... FROM a RIGHT JOIN b ON ...;\nSELECT ... FROM a FULL OUTER JOIN b ON ...;",
    example: {
      sql: "SELECT l.line_code, o.order_code\nFROM production_orders o\nFULL OUTER JOIN production_lines l ON o.line_id = l.line_id;",
      explain: [
        "Giữ đơn không có dây chuyền hợp lệ (line_code NULL) và dây chuyền không có đơn (order_code NULL).",
        "Đây là cách so sánh hai danh sách để tìm phần không khớp ở cả hai phía.",
      ],
    },
    factory: "Kiểm tra dữ liệu: phát hiện đơn sản xuất gắn với dây chuyền không tồn tại, và dây chuyền chưa có đơn.",
    practice: [
      {
        question: "Dùng RIGHT JOIN để liệt kê tất cả dây chuyền (line_code) và các đơn sản xuất của chúng, kể cả dây chuyền không có đơn.",
        hint: "Viết production_orders RIGHT JOIN production_lines ON ... rồi chọn line_code, order_code.",
        solution: "SELECT l.line_code, o.order_code FROM production_orders o RIGHT JOIN production_lines l ON o.line_id = l.line_id;",
      },
      {
        question: "Dùng FULL OUTER JOIN để đếm số dòng kết quả khi ghép production_lines và production_orders theo line_id (đặt alias so_dong).",
        hint: "Dùng COUNT(*) trên kết quả FULL OUTER JOIN.",
        solution: "SELECT COUNT(*) AS so_dong FROM production_lines l FULL OUTER JOIN production_orders o ON o.line_id = l.line_id;",
      },
    ],
    mistakes: [
      "Nhầm chiều RIGHT và LEFT, dẫn đến giữ sai bảng.",
      "Dùng FULL OUTER JOIN khi chỉ cần một phía, làm kết quả thừa dòng NULL.",
    ],
    quiz: [
      { q: "RIGHT JOIN giữ bảng nào?", a: "Bảng bên phải của từ khóa JOIN." },
      { q: "FULL OUTER JOIN khác LEFT JOIN thế nào?", a: "FULL OUTER JOIN giữ dòng không khớp ở cả hai phía; LEFT JOIN chỉ giữ phía trái." },
    ],
    summary: [
      "RIGHT JOIN giữ bảng bên phải.",
      "FULL OUTER JOIN giữ dòng không khớp ở cả hai bảng.",
      "Chọn loại JOIN theo bảng cần giữ.",
    ],
    next: "Bài 5 ghép nhiều bảng trong một câu lệnh.",
  },
  {
    id: "5",
    module: 7,
    title: "Ghép nhiều bảng trong một câu lệnh",
    minutes: 60,
    objectives: [
      "Viết JOIN cho ba bảng trở lên theo đúng thứ tự.",
      "Đặt bí danh (alias) để câu lệnh gọn.",
      "Tránh nhân dòng khi ghép nhiều bảng.",
    ],
    prerequisites: "Đã học INNER JOIN và LEFT JOIN (bài 2, 3).",
    explanation: [
      "Có thể nối nhiều bảng bằng nhiều JOIN liên tiếp. Mỗi JOIN ghép thêm một bảng vào kết quả đang có.",
      "Đặt bí danh ngắn cho mỗi bảng (ví dụ o, m, l) và luôn ghi rõ bảng khi tên cột trùng giữa các bảng.",
      "Khi ghép bảng có quan hệ một-nhiều, số dòng có thể nhân lên. Ví dụ một đơn có nhiều bản ghi sản xuất. Hãy kiểm tra grain (một dòng ứng với cái gì) trước khi tổng hợp.",
    ],
    syntax: "SELECT ... FROM a JOIN b ON ... JOIN c ON ...;",
    example: {
      sql: "SELECT r.record_time, l.line_name, p.product_name, r.good_qty\nFROM production_records r\nJOIN machines m ON r.machine_id = m.machine_id\nJOIN production_lines l ON m.line_id = l.line_id\nJOIN production_orders o ON r.order_id = o.order_id\nJOIN products p ON o.product_id = p.product_id\nLIMIT 10;",
      explain: [
        "Từ bản ghi sản xuất, đi qua máy để lấy dây chuyền.",
        "Đi qua đơn sản xuất để lấy sản phẩm.",
        "Mỗi dòng kết quả vẫn là một bản ghi sản xuất, nên không bị nhân dòng.",
      ],
    },
    factory: "Dashboard sản xuất cần một bảng gồm ngày, dây chuyền, sản phẩm và số lượng đạt cho từng lần ghi nhận.",
    practice: [
      {
        question: "Lấy record_time, machine_name, line_name của 10 bản ghi production_records đầu tiên (theo record_id).",
        hint: "JOIN production_records với machines, rồi với production_lines; ORDER BY record_id LIMIT 10.",
        solution: "SELECT r.record_time, m.machine_name, l.line_name FROM production_records r JOIN machines m ON r.machine_id = m.machine_id JOIN production_lines l ON m.line_id = l.line_id ORDER BY r.record_id LIMIT 10;",
      },
      {
        question: "Lấy order_code, product_name và planned_qty của các đơn thuộc sản phẩm có product_family là 'Motor Bracket'.",
        hint: "JOIN production_orders với products rồi WHERE product_family = 'Motor Bracket'.",
        solution: "SELECT o.order_code, p.product_name, o.planned_qty FROM production_orders o JOIN products p ON o.product_id = p.product_id WHERE p.product_family = 'Motor Bracket';",
      },
    ],
    mistakes: [
      "Ghép bảng một-nhiều rồi tính SUM mà không hiểu grain, dẫn đến tổng bị nhân lên.",
      "Tên cột trùng giữa các bảng mà không ghi bí danh, gây lỗi 'ambiguous column'.",
    ],
    quiz: [
      { q: "Vì sao cần bí danh bảng khi JOIN nhiều bảng?", a: "Để câu lệnh gọn và tránh mơ hồ khi tên cột trùng." },
      { q: "Vì sao cần kiểm tra grain trước khi tổng hợp?", a: "Vì ghép bảng một-nhiều có thể nhân dòng, làm tổng sai." },
    ],
    summary: [
      "Ghép nhiều bảng bằng chuỗi JOIN.",
      "Dùng bí danh và ghi rõ bảng khi tên cột trùng.",
      "Kiểm tra grain khi ghép bảng một-nhiều.",
    ],
    next: "Bài 6 học self JOIN: ghép một bảng với chính nó.",
  },
  {
    id: "6",
    module: 7,
    title: "Self JOIN: ghép bảng với chính nó",
    minutes: 45,
    objectives: [
      "Hiểu self JOIN là ghép một bảng với chính nó qua hai bí danh.",
      "Tránh ghép một dòng với chính nó bằng điều kiện khác nhau.",
      "Dùng self JOIN để so sánh các dòng trong cùng bảng.",
    ],
    prerequisites: "Đã học JOIN nhiều bảng (bài 5).",
    explanation: [
      "Self JOIN dùng khi cần so sánh các dòng trong cùng một bảng. Ta đặt hai bí danh khác nhau cho cùng một bảng.",
      "Để tránh cặp dòng trùng lặp (A với B và B với A) hoặc một dòng ghép với chính nó, thêm điều kiện so sánh id, ví dụ e1.employee_id < e2.employee_id.",
      "Ví dụ thực tế: tìm các cặp nhân viên cùng phòng ban.",
    ],
    syntax: "SELECT ... FROM bảng a JOIN bảng b ON a.cột = b.cột AND a.id < b.id;",
    example: {
      sql: "SELECT e1.full_name AS nhan_vien_1, e2.full_name AS nhan_vien_2, e1.department_id\nFROM employees e1\nJOIN employees e2 ON e1.department_id = e2.department_id\nAND e1.employee_id < e2.employee_id;",
      explain: [
        "Ghép bảng employees với chính nó qua hai bí danh e1 và e2.",
        "Điều kiện e1.employee_id < e2.employee_id giúp mỗi cặp chỉ xuất hiện một lần.",
      ],
    },
    factory: "Quản lý muốn tìm các nhân viên cùng phòng ban để sắp xếp ca luân phiên.",
    practice: [
      {
        question: "Tìm các cặp nhân viên cùng ca làm (shift_id giống nhau), mỗi cặp một lần, lấy hai full_name.",
        hint: "Self JOIN employees theo shift_id, thêm điều kiện employee_id < employee_id.",
        solution: "SELECT e1.full_name, e2.full_name FROM employees e1 JOIN employees e2 ON e1.shift_id = e2.shift_id AND e1.employee_id < e2.employee_id;",
      },
      {
        question: "Tìm các cặp máy khác nhau cùng thuộc một dây chuyền, mỗi cặp một lần (lấy machine_code của hai máy).",
        hint: "Self JOIN machines theo line_id, điều kiện machine_id < machine_id.",
        solution: "SELECT m1.machine_code, m2.machine_code FROM machines m1 JOIN machines m2 ON m1.line_id = m2.line_id AND m1.machine_id < m2.machine_id;",
      },
    ],
    mistakes: [
      "Quên điều kiện so sánh id nên mỗi dòng ghép với chính nó và các cặp bị lặp.",
      "Dùng cùng một bí danh cho hai phía của self JOIN, câu lệnh báo lỗi.",
    ],
    quiz: [
      { q: "Self JOIN là gì?", a: "Ghép một bảng với chính nó bằng hai bí danh." },
      { q: "Điều kiện id < id dùng để làm gì?", a: "Tránh ghép dòng với chính nó và tránh cặp bị lặp." },
    ],
    summary: [
      "Self JOIN ghép bảng với chính nó qua hai bí danh.",
      "Dùng điều kiện id khác nhau để tránh cặp trùng.",
    ],
    next: "Module 08 học subquery: câu truy vấn lồng trong câu truy vấn.",
  },
];
