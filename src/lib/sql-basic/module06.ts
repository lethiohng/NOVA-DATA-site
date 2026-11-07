import type { BasicLesson } from "./types";

/* Module 3 — SQL Aggregation: hàm tổng hợp, COUNT, SUM, AVG, MIN/MAX, GROUP BY, HAVING. */

export const module06: BasicLesson[] = [
  {
    id: "19",
    module: 6,
    title: "Hàm tổng hợp là gì?",
    minutes: 45,
    objectives: [
      "Hiểu hàm tổng hợp gộp nhiều dòng thành một giá trị.",
      "Kể được các hàm tổng hợp chính: COUNT, SUM, AVG, MIN, MAX.",
      "Viết được câu tổng hợp đơn giản.",
    ],
    prerequisites: "Đã học SELECT và WHERE (module 1, 2).",
    explanation: [
      "Hàm tổng hợp (aggregate function) nhận nhiều dòng và trả về một giá trị. Ví dụ đếm số bản ghi, tính tổng số lượng.",
      "Các hàm chính: COUNT đếm số dòng, SUM tính tổng, AVG tính trung bình, MIN và MAX tìm giá trị nhỏ nhất và lớn nhất.",
      "Có thể kết hợp với WHERE để tổng hợp trên một phần dữ liệu, ví dụ tổng số lượng của một loại máy.",
    ],
    syntax: "SELECT HÀM(cột) FROM tên_bảng WHERE điều_kiện;",
    example: {
      sql: "SELECT COUNT(*) AS so_may FROM machines;",
      explain: [
        "COUNT(*) đếm tất cả các dòng trong bảng machines.",
        "Kết quả là một dòng và một cột, là tổng số máy.",
      ],
    },
    factory: "Giám đốc sản xuất muốn biết nhà máy có tổng bao nhiêu máy, không cần xem từng máy một.",
    practice: [
      {
        question: "Đếm số dây chuyền có trong bảng production_lines.",
        hint: "Dùng SELECT COUNT(*) FROM tên_bảng.",
        solution: "SELECT COUNT(*) FROM production_lines;",
      },
      {
        question: "Đếm số sản phẩm có standard_cycle_sec lớn hơn 50.",
        hint: "Thêm WHERE trước khi đếm.",
        solution: "SELECT COUNT(*) FROM products WHERE standard_cycle_sec > 50;",
      },
    ],
    mistakes: [
      "Viết SELECT machine_code, COUNT(*) FROM machines mà không có GROUP BY. Câu này báo lỗi vì cột thường không đi cùng hàm tổng hợp (xem bài 25).",
      "Nhầm COUNT với SUM: COUNT đếm số dòng, SUM cộng giá trị.",
    ],
    quiz: [
      { q: "Hàm tổng hợp trả về bao nhiêu dòng?", a: "Thông thường là một dòng (khi chưa có GROUP BY)." },
      { q: "Kể tên 5 hàm tổng hợp chính.", a: "COUNT, SUM, AVG, MIN, MAX." },
    ],
    summary: [
      "Hàm tổng hợp gộp nhiều dòng thành một giá trị.",
      "COUNT, SUM, AVG, MIN, MAX là các hàm cơ bản.",
      "Có thể kết hợp với WHERE.",
    ],
    next: "Bài 20 đếm số dòng với COUNT.",
  },
  {
    id: "20",
    module: 6,
    title: "COUNT: đếm số dòng",
    minutes: 45,
    objectives: [
      "Dùng COUNT(*) để đếm số dòng.",
      "Đặt alias cho kết quả đếm.",
      "Đếm có điều kiện với WHERE.",
    ],
    prerequisites: "Đã học hàm tổng hợp (bài 19).",
    explanation: [
      "COUNT(*) đếm tất cả các dòng, kể cả dòng có giá trị NULL. Đây là cách đếm số bản ghi phổ biến nhất.",
      "Đặt alias sau kết quả để tên cột dễ đọc, ví dụ AS so_ban_ghi.",
      "Kết hợp WHERE để đếm theo điều kiện, ví dụ số nhân viên có role là Operator.",
    ],
    syntax: "SELECT COUNT(*) AS tên_hiển_thị FROM tên_bảng WHERE điều_kiện;",
    example: {
      sql: "SELECT COUNT(*) AS so_ban_ghi FROM production_records;",
      explain: [
        "Đếm tổng số bản ghi sản xuất đã được ghi nhận.",
        "Kết quả là một con số duy nhất, đặt tên cột là so_ban_ghi.",
      ],
    },
    factory: "Quản lý muốn biết đã có bao nhiêu lần ghi nhận sản lượng trong hệ thống để kiểm tra độ đầy đủ dữ liệu.",
    practice: [
      {
        question: "Đếm số nhân viên có role là 'Operator'.",
        hint: "Dùng COUNT(*) với WHERE role = 'Operator'.",
        solution: "SELECT COUNT(*) FROM employees WHERE role = 'Operator';",
      },
      {
        question: "Đếm số đơn sản xuất có status là 'Completed', đặt alias là so_don_hoan_thanh.",
        hint: "Thêm AS sau COUNT(*).",
        solution: "SELECT COUNT(*) AS so_don_hoan_thanh FROM production_orders WHERE status = 'Completed';",
      },
    ],
    mistakes: [
      "Dùng COUNT(*) khi chỉ muốn đếm giá trị khác NULL của một cột. Xem bài 21.",
      "Quên WHERE nên đếm toàn bộ bảng thay vì phần cần đếm.",
    ],
    quiz: [
      { q: "COUNT(*) có đếm dòng có NULL không?", a: "Có, COUNT(*) đếm mọi dòng." },
      { q: "Muốn đếm nhân viên ở role Supervisor thì viết thế nào?", a: "SELECT COUNT(*) FROM employees WHERE role = 'Supervisor';" },
    ],
    summary: [
      "COUNT(*) đếm số dòng.",
      "Đặt alias để tên kết quả rõ ràng.",
      "Kết hợp WHERE để đếm có điều kiện.",
    ],
    next: "Bài 21 phân biệt COUNT(cột) và COUNT(DISTINCT cột).",
  },
  {
    id: "21",
    module: 6,
    title: "COUNT(cột) và COUNT(DISTINCT): đếm giá trị khác NULL và duy nhất",
    minutes: 45,
    objectives: [
      "Phân biệt COUNT(*), COUNT(cột) và COUNT(DISTINCT cột).",
      "Hiểu COUNT(cột) bỏ qua các dòng NULL.",
      "Dùng COUNT(DISTINCT) để đếm giá trị duy nhất.",
    ],
    prerequisites: "Đã học COUNT(*) (bài 20) và NULL (bài 7).",
    explanation: [
      "COUNT(cột) chỉ đếm các dòng có giá trị khác NULL trong cột đó. COUNT(*) đếm mọi dòng.",
      "COUNT(DISTINCT cột) đếm số giá trị khác nhau, bỏ qua các giá trị trùng và NULL.",
      "Ví dụ: bảng employees có 12 người chưa có ca (shift_id NULL). COUNT(*) đếm mọi nhân viên, COUNT(shift_id) chỉ đếm người đã có ca.",
    ],
    syntax: "SELECT COUNT(*), COUNT(cột), COUNT(DISTINCT cột) FROM tên_bảng;",
    example: {
      sql: "SELECT COUNT(DISTINCT machine_id) AS so_may_co_san_xuat FROM production_records;",
      explain: [
        "Đếm số máy khác nhau đã xuất hiện trong bảng production_records.",
        "Mỗi máy được tính một lần, dù có nhiều bản ghi.",
      ],
    },
    factory: "Kỹ sư muốn biết có bao nhiêu máy thực sự có dữ liệu sản xuất, không tính các máy trùng lặp trong nhật ký.",
    practice: [
      {
        question: "Đếm số giá trị machine_type khác nhau trong bảng machines.",
        hint: "Dùng COUNT(DISTINCT machine_type).",
        solution: "SELECT COUNT(DISTINCT machine_type) FROM machines;",
      },
      {
        question: "Đếm số nhân viên đã có ca làm (shift_id không NULL) trong bảng employees.",
        hint: "Dùng COUNT(shift_id), vì COUNT cột bỏ qua NULL.",
        solution: "SELECT COUNT(shift_id) FROM employees;",
      },
    ],
    mistakes: [
      "Tưởng COUNT(cột) đếm cả NULL, dẫn tới số liệu lệch với COUNT(*).",
      "Dùng COUNT(DISTINCT) khi cần đếm tổng số dòng. Hai việc này khác nhau.",
    ],
    quiz: [
      { q: "COUNT(cột) có đếm dòng NULL không?", a: "Không, chỉ đếm dòng có giá trị khác NULL." },
      { q: "COUNT(DISTINCT cột) dùng để làm gì?", a: "Đếm số giá trị khác nhau trong cột." },
    ],
    summary: [
      "COUNT(*) đếm mọi dòng.",
      "COUNT(cột) bỏ qua NULL.",
      "COUNT(DISTINCT cột) đếm giá trị duy nhất.",
    ],
    next: "Bài 22 tính tổng với SUM.",
  },
  {
    id: "22",
    module: 6,
    title: "SUM: tính tổng",
    minutes: 45,
    objectives: [
      "Dùng SUM để cộng các giá trị số trong một cột.",
      "Hiểu SUM bỏ qua NULL.",
      "Tính tổng có điều kiện với WHERE.",
    ],
    prerequisites: "Đã học hàm tổng hợp và WHERE (bài 19, 10).",
    explanation: [
      "SUM(cột) cộng tất cả giá trị số trong cột. Các dòng NULL bị bỏ qua khi cộng.",
      "Trong sản xuất, SUM dùng để tính tổng sản lượng đạt, tổng phế phẩm, tổng số lượng kế hoạch.",
      "Chỉ dùng SUM cho cột số. SUM trên cột chữ sẽ báo lỗi.",
    ],
    syntax: "SELECT SUM(cột) AS tên_hiển_thị FROM tên_bảng WHERE điều_kiện;",
    example: {
      sql: "SELECT SUM(good_qty) AS tong_san_pham_dat FROM production_records;",
      explain: [
        "Cộng toàn bộ số lượng sản phẩm đạt trong bảng production_records.",
        "Kết quả là một con số tổng duy nhất.",
      ],
    },
    factory: "Giám đốc muốn biết tổng số sản phẩm đạt chất lượng đã sản xuất đến hôm nay.",
    practice: [
      {
        question: "Tính tổng total_qty của bảng production_records.",
        hint: "Dùng SUM(total_qty).",
        solution: "SELECT SUM(total_qty) FROM production_records;",
      },
      {
        question: "Tính tổng ng_qty (sản phẩm lỗi) của bảng production_records, đặt alias là tong_loi.",
        hint: "Thêm AS tong_loi sau SUM(ng_qty).",
        solution: "SELECT SUM(ng_qty) AS tong_loi FROM production_records;",
      },
    ],
    mistakes: [
      "Dùng SUM trên cột văn bản như full_name, gây lỗi kiểu dữ liệu.",
      "Quên WHERE nên tổng bao gồm cả dữ liệu không cần thiết.",
    ],
    quiz: [
      { q: "SUM có bỏ qua giá trị NULL không?", a: "Có, NULL không được cộng vào tổng." },
      { q: "Tổng sản lượng đạt có thể lấy từ cột nào?", a: "Cột good_qty trong production_records." },
    ],
    summary: [
      "SUM cộng các giá trị số.",
      "NULL bị bỏ qua.",
      "Kết hợp WHERE để tổng theo điều kiện.",
    ],
    next: "Bài 23 tính giá trị trung bình với AVG.",
  },
  {
    id: "23",
    module: 6,
    title: "AVG: tính trung bình",
    minutes: 45,
    objectives: [
      "Dùng AVG để tính trung bình một cột số.",
      "Làm tròn kết quả với ROUND.",
      "Hiểu AVG bỏ qua NULL khi tính.",
    ],
    prerequisites: "Đã học SUM (bài 22).",
    explanation: [
      "AVG(cột) tính trung bình cộng của các giá trị khác NULL trong cột.",
      "Kết quả AVG thường có nhiều chữ số thập phân. Dùng ROUND(giá_trị, số_chữ_số) để làm tròn, ví dụ ROUND(AVG(good_qty), 2).",
      "Trung bình không phải lúc nào cũng phản ánh đúng thực tế nếu có giá trị bất thường. Hãy kết hợp với MIN và MAX để kiểm tra.",
    ],
    syntax: "SELECT ROUND(AVG(cột), 2) AS tên_hiển_thị FROM tên_bảng;",
    example: {
      sql: "SELECT ROUND(AVG(standard_cycle_sec), 2) AS chu_ky_trung_binh FROM products;",
      explain: [
        "Tính chu kỳ chuẩn trung bình của các sản phẩm.",
        "ROUND(..., 2) làm tròn đến 2 chữ số sau dấu phẩy.",
      ],
    },
    factory: "Kỹ sư muốn so sánh chu kỳ gia công trung bình giữa các sản phẩm để đưa ra ước tính năng suất.",
    practice: [
      {
        question: "Tính trung bình good_qty của production_records, làm tròn 2 chữ số.",
        hint: "Dùng ROUND(AVG(good_qty), 2).",
        solution: "SELECT ROUND(AVG(good_qty), 2) FROM production_records;",
      },
      {
        question: "Tính trung bình planned_qty của các đơn có status là 'Running', làm tròn 2 chữ số.",
        hint: "Thêm WHERE status = 'Running' trước khi tính AVG.",
        solution: "SELECT ROUND(AVG(planned_qty), 2) FROM production_orders WHERE status = 'Running';",
      },
    ],
    mistakes: [
      "Tưởng AVG tính trên mọi dòng kể cả NULL. Thực tế NULL bị bỏ qua, nên trung bình có thể khác với kỳ vọng.",
      "Quên làm tròn nên kết quả có quá nhiều chữ số.",
    ],
    quiz: [
      { q: "Vì sao cần ROUND khi dùng AVG?", a: "Để làm tròn kết quả có quá nhiều chữ số thập phân." },
      { q: "AVG có bỏ qua NULL không?", a: "Có, các dòng NULL không được tính." },
    ],
    summary: [
      "AVG tính trung bình cộng.",
      "Dùng ROUND để làm tròn.",
      "NULL bị bỏ qua khi tính.",
    ],
    next: "Bài 24 tìm giá trị nhỏ nhất và lớn nhất với MIN và MAX.",
  },
  {
    id: "24",
    module: 6,
    title: "MIN và MAX: giá trị nhỏ nhất và lớn nhất",
    minutes: 45,
    objectives: [
      "Dùng MIN và MAX cho số, ngày và chuỗi.",
      "Kết hợp MIN và MAX trong một câu lệnh.",
      "Dùng MIN, MAX với điều kiện WHERE.",
    ],
    prerequisites: "Đã học hàm tổng hợp và WHERE (bài 19, 10).",
    explanation: [
      "MIN(cột) trả về giá trị nhỏ nhất, MAX(cột) trả về giá trị lớn nhất. Dùng được với số, ngày và chuỗi (chuỗi theo thứ tự bảng chữ cái).",
      "Có thể đặt MIN và MAX trong cùng một SELECT để xem khoảng giá trị của một cột.",
      "Trong sản xuất, MIN và MAX giúp phát hiện số liệu bất thường, ví dụ số lượng quá nhỏ hoặc ngày ghi nhận quá xa.",
    ],
    syntax: "SELECT MIN(cột), MAX(cột) FROM tên_bảng;",
    example: {
      sql: "SELECT MIN(hire_date) AS nhan_viec_som_nhat, MAX(hire_date) AS nhan_viec_gan_nhat FROM employees;",
      explain: [
        "MIN(hire_date) tìm ngày nhận việc sớm nhất.",
        "MAX(hire_date) tìm ngày nhận việc gần đây nhất.",
      ],
    },
    factory: "Phòng nhân sự muốn biết khoảng thời gian nhân viên được tuyển vào làm để lập báo cáo thâm niên.",
    practice: [
      {
        question: "Tìm giá trị planned_qty nhỏ nhất và lớn nhất trong bảng production_orders.",
        hint: "Viết MIN(planned_qty) và MAX(planned_qty) trong cùng một SELECT.",
        solution: "SELECT MIN(planned_qty), MAX(planned_qty) FROM production_orders;",
      },
      {
        question: "Tìm ngày nhận việc sớm nhất của nhân viên có role là 'Engineer'.",
        hint: "Dùng MIN(hire_date) với WHERE role = 'Engineer'.",
        solution: "SELECT MIN(hire_date) FROM employees WHERE role = 'Engineer';",
      },
    ],
    mistakes: [
      "Nhầm MIN với MAX khi đọc kết quả, dẫn đến kết luận sai.",
      "Dùng MIN hoặc MAX trên cột có NULL mà không nhận ra NULL đã bị bỏ qua.",
    ],
    quiz: [
      { q: "MIN và MAX dùng được với kiểu dữ liệu nào?", a: "Số, ngày và chuỗi." },
      { q: "Muốn biết ngày nhận việc gần đây nhất thì dùng hàm nào?", a: "MAX(hire_date)." },
    ],
    summary: [
      "MIN lấy giá trị nhỏ nhất, MAX lấy lớn nhất.",
      "Dùng được cho số, ngày và chuỗi.",
      "Kết hợp với WHERE để lọc trước khi tìm.",
    ],
    next: "Bài 25 chia dữ liệu thành nhóm với GROUP BY.",
  },
  {
    id: "25",
    module: 6,
    title: "GROUP BY: tổng hợp theo nhóm",
    minutes: 60,
    objectives: [
      "Dùng GROUP BY để tính hàm tổng hợp cho từng nhóm.",
      "Hiểu cột trong SELECT phải có trong GROUP BY nếu không dùng hàm tổng hợp.",
      "Đọc được kết quả theo từng nhóm.",
    ],
    prerequisites: "Đã học các hàm tổng hợp COUNT, SUM, AVG (bài 20 đến 22).",
    explanation: [
      "GROUP BY gom các dòng có cùng giá trị trong một cột thành một nhóm, sau đó hàm tổng hợp được tính cho từng nhóm.",
      "Mọi cột trong SELECT, nếu không nằm trong hàm tổng hợp, phải xuất hiện trong GROUP BY.",
      "Ví dụ: đếm đơn sản xuất theo status cho biết có bao nhiêu đơn đang chạy và bao nhiêu đơn đã hoàn thành.",
    ],
    syntax: "SELECT cột, HÀM(cột2) FROM tên_bảng GROUP BY cột;",
    example: {
      sql: "SELECT status, COUNT(*) AS so_don FROM production_orders GROUP BY status;",
      explain: [
        "GROUP BY status gom các đơn theo trạng thái.",
        "COUNT(*) đếm số đơn trong mỗi nhóm, kết quả có một dòng cho mỗi trạng thái.",
      ],
    },
    factory: "Quản lý sản xuất muốn biết có bao nhiêu đơn đang chạy và bao nhiêu đơn đã hoàn thành để theo dõi tiến độ.",
    practice: [
      {
        question: "Đếm số bản ghi production_records theo machine_id.",
        hint: "SELECT machine_id, COUNT(*) ... GROUP BY machine_id.",
        solution: "SELECT machine_id, COUNT(*) AS so_ban_ghi FROM production_records GROUP BY machine_id;",
      },
      {
        question: "Tính tổng good_qty theo machine_id trong production_records, đặt alias là tong_dat.",
        hint: "Dùng SUM(good_qty) và GROUP BY machine_id.",
        solution: "SELECT machine_id, SUM(good_qty) AS tong_dat FROM production_records GROUP BY machine_id;",
      },
    ],
    mistakes: [
      "Chọn cột không nằm trong GROUP BY mà cũng không dùng hàm tổng hợp, câu lệnh báo lỗi.",
      "Quên GROUP BY nên kết quả chỉ có một dòng tổng thay vì mỗi nhóm một dòng.",
    ],
    quiz: [
      { q: "GROUP BY làm gì?", a: "Gom các dòng có giá trị giống nhau thành một nhóm để tổng hợp." },
      { q: "Vì sao SELECT status, COUNT(*) FROM production_orders cần GROUP BY status?", a: "Vì status không nằm trong hàm tổng hợp nên phải có trong GROUP BY." },
    ],
    summary: [
      "GROUP BY gom dòng theo nhóm.",
      "Hàm tổng hợp được tính cho từng nhóm.",
      "Cột không tổng hợp phải nằm trong GROUP BY.",
    ],
    next: "Bài 26 lọc các nhóm với HAVING.",
  },
  {
    id: "26",
    module: 6,
    title: "HAVING: lọc nhóm sau khi tổng hợp",
    minutes: 45,
    objectives: [
      "Phân biệt WHERE (lọc dòng) và HAVING (lọc nhóm).",
      "Dùng HAVING với hàm tổng hợp.",
      "Viết câu có cả WHERE, GROUP BY và HAVING.",
    ],
    prerequisites: "Đã học GROUP BY (bài 25).",
    explanation: [
      "WHERE lọc các dòng trước khi gom nhóm. HAVING lọc các nhóm sau khi đã tính hàm tổng hợp.",
      "Vì HAVING làm việc trên nhóm, điều kiện trong HAVING thường chứa hàm tổng hợp, ví dụ HAVING COUNT(*) > 10.",
      "Thứ tự trong câu: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT.",
    ],
    syntax: "SELECT cột, HÀM(cột2) FROM bảng WHERE điều_kiện GROUP BY cột HAVING điều_kiện_nhóm;",
    example: {
      sql: "SELECT status, COUNT(*) AS so_don FROM production_orders GROUP BY status HAVING COUNT(*) > 10;",
      explain: [
        "GROUP BY status gom các đơn theo trạng thái và đếm từng nhóm.",
        "HAVING COUNT(*) > 10 chỉ giữ các nhóm có hơn 10 đơn.",
      ],
    },
    factory: "Quản lý chỉ muốn xem những nhóm máy có tổng sản lượng đủ lớn để đưa vào báo cáo nổi bật.",
    practice: [
      {
        question: "Lấy các product_family có nhiều hơn 1 sản phẩm: hiển thị product_family và số sản phẩm (đặt alias so_san_pham).",
        hint: "GROUP BY product_family, HAVING COUNT(*) > 1.",
        solution: "SELECT product_family, COUNT(*) AS so_san_pham FROM products GROUP BY product_family HAVING COUNT(*) > 1;",
      },
      {
        question: "Lấy các machine_id có tổng total_qty lớn hơn 50000 trong production_records.",
        hint: "Dùng HAVING SUM(total_qty) > 50000 sau GROUP BY machine_id.",
        solution: "SELECT machine_id, SUM(total_qty) AS tong_san_luong FROM production_records GROUP BY machine_id HAVING SUM(total_qty) > 50000;",
      },
    ],
    mistakes: [
      "Dùng WHERE COUNT(*) > 10. WHERE không dùng được hàm tổng hợp, phải dùng HAVING.",
      "Đặt HAVING trước GROUP BY, câu lệnh báo lỗi.",
    ],
    quiz: [
      { q: "Khác biệt chính giữa WHERE và HAVING?", a: "WHERE lọc dòng trước khi nhóm; HAVING lọc nhóm sau khi tổng hợp." },
      { q: "Vì sao không viết WHERE SUM(x) > 100?", a: "Vì WHERE không lọc được hàm tổng hợp; cần dùng HAVING." },
    ],
    summary: [
      "WHERE lọc dòng, HAVING lọc nhóm.",
      "HAVING thường chứa hàm tổng hợp.",
      "Thứ tự: WHERE, GROUP BY, HAVING.",
    ],
    next: "Bài 27 kết hợp nhiều hàm tổng hợp trong một câu lệnh.",
  },
  {
    id: "27",
    module: 6,
    title: "Nhiều hàm tổng hợp trong một câu lệnh",
    minutes: 60,
    objectives: [
      "Kết hợp COUNT, SUM, AVG, MIN, MAX trong cùng một SELECT.",
      "Đặt alias rõ ràng cho từng chỉ số.",
      "Đọc bảng tổng hợp để rút ra kết luận.",
    ],
    prerequisites: "Đã học GROUP BY và HAVING (bài 25, 25).",
    explanation: [
      "Một câu SELECT có thể chứa nhiều hàm tổng hợp cùng lúc, giúp một bảng báo cáo có nhiều chỉ số cho mỗi nhóm.",
      "Đặt alias cho mỗi cột để báo cáo dễ đọc. Kiểm tra lại từng chỉ số để chắc chắn đúng ý nghĩa, ví dụ AVG và SUM có thể không cùng ý nghĩa.",
      "Thêm ORDER BY để sắp xếp các nhóm theo chỉ số quan trọng nhất.",
    ],
    syntax: "SELECT cột, COUNT(*), SUM(cột2), AVG(cột2), MIN(cột2), MAX(cột2) FROM bảng GROUP BY cột;",
    example: {
      sql: "SELECT line_id, COUNT(*) AS so_don, SUM(planned_qty) AS tong_ke_hoach, ROUND(AVG(planned_qty), 0) AS tb_ke_hoach, MIN(planned_qty) AS nho_nhat, MAX(planned_qty) AS lon_nhat FROM production_orders GROUP BY line_id;",
      explain: [
        "Với mỗi dây chuyền, câu lệnh cho ra số đơn, tổng, trung bình, nhỏ nhất và lớn nhất.",
        "Mỗi dây chuyền là một dòng trong kết quả.",
      ],
    },
    factory: "Trưởng bộ phận lập kế hoạch cần một bảng tổng hợp để so sánh quy mô đơn hàng giữa các dây chuyền.",
    practice: [
      {
        question: "Theo role của nhân viên: đếm số người và tìm ngày nhận việc sớm nhất (đặt alias là vao_lam_som_nhat).",
        hint: "GROUP BY role; dùng COUNT(*) và MIN(hire_date).",
        solution: "SELECT role, COUNT(*) AS so_nguoi, MIN(hire_date) AS vao_lam_som_nhat FROM employees GROUP BY role;",
      },
      {
        question: "Theo product_id trong production_orders: đếm số đơn và tổng planned_qty, chỉ lấy nhóm có tổng lớn hơn 10000.",
        hint: "Thêm HAVING SUM(planned_qty) > 10000 sau GROUP BY product_id.",
        solution: "SELECT product_id, COUNT(*) AS so_don, SUM(planned_qty) AS tong_ke_hoach FROM production_orders GROUP BY product_id HAVING SUM(planned_qty) > 10000;",
      },
    ],
    mistakes: [
      "Đưa thêm một cột không có trong GROUP BY, câu lệnh báo lỗi.",
      "Đặt alias trùng tên với cột gốc, làm kết quả khó hiểu.",
    ],
    quiz: [
      { q: "Có thể dùng bao nhiêu hàm tổng hợp trong một SELECT?", a: "Nhiều hàm, mỗi hàm tính trên cùng nhóm đã GROUP BY." },
      { q: "Vì sao cần alias khi có nhiều hàm tổng hợp?", a: "Để tên cột trong kết quả rõ nghĩa và dễ đọc." },
    ],
    summary: [
      "Có thể kết hợp nhiều hàm tổng hợp trong một câu.",
      "Đặt alias rõ ràng cho từng chỉ số.",
      "Mỗi nhóm là một dòng trong kết quả.",
    ],
    next: "Bài 28 là bài tổng kết: viết báo cáo tổng hợp hoàn chỉnh.",
  },
  {
    id: "28",
    module: 6,
    title: "Tổng kết: báo cáo tổng hợp hoàn chỉnh",
    minutes: 60,
    objectives: [
      "Kết hợp WHERE, GROUP BY, HAVING, ORDER BY và LIMIT.",
      "Viết báo cáo theo nhóm với nhiều chỉ số.",
      "Kiểm tra kết quả có đúng yêu cầu hay không.",
    ],
    prerequisites: "Đã học toàn bộ module 1, 2 và 3.",
    explanation: [
      "Bài tổng kết này ghép các kỹ năng đã học. Thứ tự viết câu: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT.",
      "Với một yêu cầu báo cáo, hãy làm lần lượt: xác định nhóm (GROUP BY), chỉ số cần tính (hàm tổng hợp), điều kiện nhóm (HAVING), thứ tự hiển thị (ORDER BY) và số dòng cần lấy (LIMIT).",
      "Sau khi viết xong, kiểm tra số dòng và giá trị của một nhóm bằng tay để chắc chắn câu lệnh đúng.",
    ],
    syntax: "SELECT cột, HÀM(...) FROM bảng WHERE ... GROUP BY cột HAVING ... ORDER BY ... LIMIT n;",
    example: {
      sql: "SELECT machine_id, SUM(good_qty) AS tong_dat, SUM(ng_qty) AS tong_loi FROM production_records GROUP BY machine_id ORDER BY tong_dat DESC LIMIT 5;",
      explain: [
        "Gom các bản ghi theo máy, tính tổng sản phẩm đạt và lỗi cho từng máy.",
        "Sắp xếp giảm dần theo tổng đạt và chỉ giữ 5 máy đầu tiên.",
      ],
    },
    factory: "Buổi họp sản xuất hàng tuần: cần 5 máy có sản lượng đạt cao nhất, kèm số lượng lỗi để đối chiếu.",
    practice: [
      {
        question: "Báo cáo theo machine_id: số bản ghi (so_ban_ghi), tổng good_qty (tong_dat) và tổng ng_qty (tong_loi), sắp xếp tong_dat giảm dần.",
        hint: "GROUP BY machine_id, dùng COUNT(*), SUM(good_qty), SUM(ng_qty), ORDER BY tong_dat DESC.",
        solution: "SELECT machine_id, COUNT(*) AS so_ban_ghi, SUM(good_qty) AS tong_dat, SUM(ng_qty) AS tong_loi FROM production_records GROUP BY machine_id ORDER BY tong_dat DESC;",
      },
      {
        question: "Chỉ giữ các máy có tổng ng_qty lớn hơn 0 và tổng good_qty từ 1000 trở lên, sắp xếp giảm dần theo tong_dat, lấy 5 máy đầu.",
        hint: "Thêm HAVING với hai điều kiện nối bằng AND, rồi ORDER BY và LIMIT 5.",
        solution: "SELECT machine_id, SUM(good_qty) AS tong_dat, SUM(ng_qty) AS tong_loi FROM production_records GROUP BY machine_id HAVING SUM(ng_qty) > 0 AND SUM(good_qty) >= 1000 ORDER BY tong_dat DESC LIMIT 5;",
      },
    ],
    mistakes: [
      "Dùng WHERE thay cho HAVING khi điều kiện có hàm tổng hợp.",
      "Quên ORDER BY nên top 5 không đúng là top 5 theo tiêu chí.",
    ],
    quiz: [
      { q: "Thứ tự đầy đủ của một câu SQL tổng hợp là gì?", a: "SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT." },
      { q: "Vì sao nên kiểm tra kết quả bằng tay?", a: "Để chắc chắn câu lệnh trả đúng yêu cầu, tránh lỗi logic." },
    ],
    summary: [
      "Ghép WHERE, GROUP BY, HAVING, ORDER BY và LIMIT thành báo cáo hoàn chỉnh.",
      "Xác định nhóm, chỉ số, điều kiện nhóm và thứ tự hiển thị.",
      "Kiểm tra kết quả trước khi tin tưởng.",
    ],
    next: "Đã hoàn thành SQL Basic. Tiếp theo là module SQL Intermediate với JOIN và subquery.",
  },
];
