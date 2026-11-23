import type { BasicLesson } from "./types";

/* Module 7 — Toán tử và kiểu dữ liệu: toán tử số học, IS NULL / IS NOT NULL, ép kiểu CAST và ::. */

export const module07: BasicLesson[] = [
  {
    id: "29",
    module: 7,
    title: "Toán tử số học: +, -, *, /, %",
    minutes: 45,
    objectives: [
      "Dùng + - * / % để tính trên các cột số trong SELECT.",
      "Biết phép chia giữa hai số nguyên luôn cho kết quả nguyên.",
      "Đặt alias cho cột tính toán để kết quả dễ đọc.",
    ],
    prerequisites: "Đã học SELECT, chọn cột và alias (module 1).",
    explanation: [
      "Bạn có thể viết phép tính ngay trong SELECT: + cộng, - trừ, * nhân, / chia, % lấy phần dư. Kết quả là một cột mới, bảng gốc không đổi.",
      "Lưu ý quan trọng: nếu cả hai vế đều là số nguyên, PostgreSQL chia lấy phần nguyên. Ví dụ 7 / 2 cho 3, không phải 3,5. Muốn có phần thập phân, dùng 7.0 / 2 hoặc ép kiểu số.",
      "Có thể dùng cả cột và số trong cùng một phép tính, ví dụ good_qty * 100.0 / total_qty để ra tỷ lệ phần trăm.",
    ],
    syntax: "SELECT cột1 + cột2 AS tên_mới, cột1 * 100.0 / cột2 AS tỷ_lệ FROM tên_bảng;",
    example: {
      sql: "SELECT record_id, good_qty, ng_qty, good_qty + ng_qty AS tong_so FROM production_records ORDER BY record_id LIMIT 5;",
      explain: [
        "Cột tong_so là tổng của good_qty và ng_qty trên từng dòng.",
        "Bảng production_records không thay đổi, chỉ có thêm một cột trong kết quả.",
      ],
    },
    factory: "Quản lý muốn biết mỗi bản ghi sản xuất có bao nhiêu sản phẩm, rồi quy đổi số lượng ra tỷ lệ để so sánh giữa các ca.",
    practice: [
      {
        question: "Lấy record_id, good_qty, ng_qty và cột tong_so = good_qty + ng_qty cho 5 bản ghi đầu theo record_id.",
        hint: "Viết phép cộng hai cột trong SELECT và đặt alias tong_so.",
        solution: "SELECT record_id, good_qty, ng_qty, good_qty + ng_qty AS tong_so FROM production_records ORDER BY record_id LIMIT 5;",
      },
      {
        question: "Lấy product_code, standard_cycle_sec và uph_theo_chu_ky = 3600 / standard_cycle_sec (làm tròn 1 chữ số thập phân), sắp xếp theo product_code.",
        hint: "Dùng ROUND(3600 / standard_cycle_sec, 1). Cột standard_cycle_sec là số thập phân nên phép chia cho kết quả có phần lẻ.",
        solution: "SELECT product_code, standard_cycle_sec, ROUND(3600 / standard_cycle_sec, 1) AS uph_theo_chu_ky FROM products ORDER BY product_code;",
      },
      {
        question: "Lấy record_id của các bản ghi có total_qty chia hết cho 10, 5 dòng đầu theo record_id.",
        hint: "Dùng toán tử % để lấy phần dư, điều kiện là total_qty % 10 = 0.",
        solution: "SELECT record_id FROM production_records WHERE total_qty % 10 = 0 ORDER BY record_id LIMIT 5;",
      },
    ],
    mistakes: [
      "Chia hai số nguyên rồi ngạc nhiên vì kết quả không có phần thập phân. Ví dụ 7 / 2 cho 3. Dùng 7.0 / 2 để có 3.5.",
      "Quên đặt alias nên tên cột là một biểu thức dài, khó đọc trong báo cáo.",
    ],
    quiz: [
      { q: "Kết quả của 7 / 2 trong PostgreSQL là bao nhiêu?", a: "3, vì cả hai vế là số nguyên nên phép chia lấy phần nguyên." },
      { q: "Toán tử % dùng để làm gì?", a: "Lấy phần dư của phép chia. Ví dụ 12 % 5 cho 2." },
    ],
    summary: [
      "+, -, *, /, % tính trên cột và số trong SELECT.",
      "Chia hai số nguyên cho kết quả nguyên. Dùng số thập phân như 7.0 khi cần phần lẻ.",
      "Đặt alias cho cột tính toán để báo cáo dễ đọc.",
    ],
    next: "Bài 30 xử lý giá trị NULL bằng IS NULL và IS NOT NULL.",
  },
  {
    id: "30",
    module: 7,
    title: "IS NULL và IS NOT NULL: kiểm tra giá trị thiếu",
    minutes: 45,
    objectives: [
      "Dùng IS NULL để tìm dòng có giá trị thiếu.",
      "Dùng IS NOT NULL để loại các dòng thiếu giá trị.",
      "Hiểu vì sao = NULL không cho kết quả đúng.",
    ],
    prerequisites: "Đã học NULL và chuỗi rỗng (bài 7 và 8), WHERE (bài 11).",
    explanation: [
      "NULL nghĩa là chưa có giá trị, không phải là số 0 hay chuỗi rỗng. Để kiểm tra NULL, dùng IS NULL. Để kiểm tra có giá trị, dùng IS NOT NULL.",
      "Đừng viết = NULL hoặc <> NULL. Trong SQL, mọi phép so sánh với NULL đều cho kết quả không xác định, nên câu lệnh không trả về dòng nào như bạn mong đợi.",
      "Chuỗi rỗng '' là một giá trị có thật, khác NULL. Dòng có location = '' không được tìm bằng IS NULL.",
    ],
    syntax: "SELECT ... FROM tên_bảng WHERE cột IS NULL;  -- hoặc IS NOT NULL",
    example: {
      sql: "SELECT line_code, location FROM production_lines WHERE location IS NULL;",
      explain: [
        "Chỉ dây chuyền có location là NULL xuất hiện trong kết quả.",
        "Dây chuyền có location là chuỗi rỗng không xuất hiện, vì chuỗi rỗng khác NULL.",
      ],
    },
    factory: "Đội bảo trì cần danh sách lệnh sản xuất đang chạy, tức các lệnh chưa có end_time, để theo dõi tiến độ trong ngày.",
    practice: [
      {
        question: "Lấy order_code và start_time của các lệnh sản xuất chưa có end_time, sắp xếp theo order_code.",
        hint: "Điều kiện là end_time IS NULL, không viết = NULL.",
        solution: "SELECT order_code, start_time FROM production_orders WHERE end_time IS NULL ORDER BY order_code;",
      },
      {
        question: "Lấy full_name và role của nhân viên chưa được gán ca (shift_id IS NULL), sắp xếp theo full_name.",
        hint: "Dùng WHERE shift_id IS NULL.",
        solution: "SELECT full_name, role FROM employees WHERE shift_id IS NULL ORDER BY full_name;",
      },
      {
        question: "Đếm số lệnh sản xuất đã có end_time. Đặt alias là so_lenh_ket_thuc.",
        hint: "Dùng IS NOT NULL và COUNT(*).",
        solution: "SELECT COUNT(*) AS so_lenh_ket_thuc FROM production_orders WHERE end_time IS NOT NULL;",
      },
    ],
    mistakes: [
      "Viết WHERE end_time = NULL. Điều kiện này không trả về dòng nào. Phải dùng IS NULL.",
      "Nhầm chuỗi rỗng với NULL. Dòng có location = '' không được coi là thiếu giá trị theo IS NULL.",
    ],
    quiz: [
      { q: "Viết điều kiện đúng để lấy các dòng có end_time chưa có giá trị?", a: "WHERE end_time IS NULL." },
      { q: "Vì sao WHERE location = NULL không trả về dòng nào?", a: "Mọi phép so sánh với NULL cho kết quả không xác định, nên không dòng nào thỏa điều kiện. Phải dùng IS NULL." },
    ],
    summary: [
      "IS NULL tìm giá trị thiếu, IS NOT NULL tìm giá trị có sẵn.",
      "Không dùng = NULL hay <> NULL.",
      "Chuỗi rỗng '' khác NULL.",
    ],
    next: "Bài 31 ép kiểu dữ liệu bằng CAST và ::.",
  },
  {
    id: "31",
    module: 7,
    title: "Ép kiểu dữ liệu: CAST và ::",
    minutes: 45,
    objectives: [
      "Đổi kiểu dữ liệu bằng CAST(giá_trị AS kiểu) và bằng cú pháp giá_trị::kiểu.",
      "Lấy phần ngày từ một cột timestamp.",
      "Biết khi nào cần ép kiểu trước khi tính toán hoặc so sánh.",
    ],
    prerequisites: "Đã học SELECT, WHERE và các hàm tổng hợp (module 1, 2 và 3).",
    explanation: [
      "Ép kiểu là đổi một giá trị từ kiểu này sang kiểu khác. Có hai cách viết tương đương: CAST(giá_trị AS kiểu) và giá_trị::kiểu. Hai cách cho cùng kết quả.",
      "Ép kiểu thường dùng khi cần so sánh chuỗi với số, lấy ngày từ timestamp, hoặc đổi kết quả sang số thập phân để tính tỷ lệ chính xác hơn.",
      "record_time có kiểu timestamp, chứa cả ngày và giờ. Ép sang date (record_time::date) để chỉ lấy phần ngày khi đếm hoặc gom theo ngày.",
    ],
    syntax: "CAST(giá_trị AS kiểu)   hoặc   giá_trị::kiểu",
    example: {
      sql: "SELECT full_name, CAST(hire_date AS VARCHAR) AS ngay_vao_lam, hire_date::text AS ngay_chuoi FROM employees ORDER BY employee_id LIMIT 3;",
      explain: [
        "CAST(hire_date AS VARCHAR) và hire_date::text đều đổi ngày thành chuỗi.",
        "Bảng employees không thay đổi, chỉ cách hiển thị kết quả thay đổi.",
      ],
    },
    factory: "Báo cáo xuất ra file cần ngày dưới dạng chuỗi, và cần đếm số ngày có dữ liệu sản xuất thay vì số bản ghi.",
    practice: [
      {
        question: "Lấy full_name và hire_date chuyển thành chuỗi với alias ngay_vao_lam, cho 5 nhân viên đầu theo employee_id. Dùng CAST.",
        hint: "CAST(hire_date AS VARCHAR) AS ngay_vao_lam.",
        solution: "SELECT full_name, CAST(hire_date AS VARCHAR) AS ngay_vao_lam FROM employees ORDER BY employee_id LIMIT 5;",
      },
      {
        question: "Tính tổng good_qty của bảng production_records và đổi kết quả sang kiểu numeric bằng ::numeric. Đặt alias tong_tot.",
        hint: "SUM(good_qty)::numeric AS tong_tot.",
        solution: "SELECT SUM(good_qty)::numeric AS tong_tot FROM production_records;",
      },
      {
        question: "Đếm số ngày khác nhau có dữ liệu trong production_records, dựa trên phần ngày của record_time. Đặt alias so_ngay_co_du_lieu.",
        hint: "Ép record_time sang date rồi dùng COUNT(DISTINCT ...).",
        solution: "SELECT COUNT(DISTINCT record_time::date) AS so_ngay_co_du_lieu FROM production_records;",
      },
    ],
    mistakes: [
      "Ép kiểu sai làm mất dữ liệu, ví dụ ép số thập phân sang số nguyên làm mất phần lẻ.",
      "Quên ép kiểu khi so sánh một cột ngày với chuỗi, dẫn đến kết quả khác mong đợi.",
    ],
    quiz: [
      { q: "Hai cách viết nào cho cùng kết quả khi ép kiểu?", a: "CAST(giá_trị AS kiểu) và giá_trị::kiểu." },
      { q: "Muốn đếm số ngày từ một cột timestamp, cần làm gì?", a: "Ép record_time::date rồi đếm các giá trị khác nhau bằng COUNT(DISTINCT ...)." },
    ],
    summary: [
      "CAST(giá_trị AS kiểu) và giá_trị::kiểu cho cùng kết quả.",
      "Dùng record_time::date để lấy phần ngày.",
      "Ép kiểu trước khi tính toán khi cần giữ phần lẻ.",
    ],
    next: "Bài 32 nối chuỗi và xử lý giá trị với ||, CONCAT và COALESCE.",
  },
  {
    id: "32",
    module: 7,
    title: "Nối chuỗi và xử lý giá trị: ||, CONCAT, COALESCE",
    minutes: 40,
    objectives: [
      "Nối nhiều cột và chuỗi bằng toán tử || hoặc hàm CONCAT.",
      "Thay giá trị NULL bằng một giá trị khác với COALESCE.",
      "Biết CONCAT bỏ qua NULL, còn || trả về NULL nếu có một vế là NULL.",
    ],
    prerequisites: "Đã học SELECT, alias (module 1) và IS NULL (bài 30).",
    explanation: [
      "Toán tử || nối các chuỗi lại với nhau. Ví dụ 'Mã: ' || line_code tạo ra một chuỗi mới cho mỗi dòng.",
      "CONCAT(a, b, ...) cũng nối chuỗi. Khác biệt quan trọng: CONCAT coi NULL như chuỗi rỗng, còn || trả về NULL nếu một vế là NULL.",
      "COALESCE(a, b, ...) trả về giá trị đầu tiên không NULL. Dùng COALESCE(location, 'Chưa rõ') để hiển thị chữ thay cho ô trống khi báo cáo.",
    ],
    syntax: "SELECT cột1 || ' - ' || cột2 AS tên_ghép, CONCAT(cột1, cột2) AS tên_ghép2, COALESCE(cột, 'mặc định') FROM tên_bảng;",
    example: {
      sql: "SELECT line_code || ' - ' || line_name AS ten_day_du, COALESCE(location, 'Chưa rõ') AS vi_tri FROM production_lines ORDER BY line_code;",
      explain: [
        "Cột ten_day_du ghép mã và tên dây chuyền bằng || và dấu gạch ngang.",
        "Cột vi_tri thay location là NULL bằng 'Chưa rõ'. Dòng có location là chuỗi rỗng vẫn giữ nguyên chuỗi rỗng.",
      ],
    },
    factory: "Báo cáo gửi quản lý cần một dòng mô tả đầy đủ cho mỗi dây chuyền và không hiển thị ô trống khi chưa có thông tin vị trí.",
    practice: [
      {
        question: "Lấy line_code và cột ten_day_du = line_code || ' - ' || line_name của các dây chuyền, sắp xếp theo line_code.",
        hint: "Dùng toán tử || và chuỗi ' - ' ở giữa.",
        solution: "SELECT line_code, line_code || ' - ' || line_name AS ten_day_du FROM production_lines ORDER BY line_code;",
      },
      {
        question: "Lấy line_code và vi_tri, trong đó vi_tri là location nhưng hiển thị 'Chưa rõ' khi location là NULL. Sắp xếp theo line_code.",
        hint: "Dùng COALESCE(location, 'Chưa rõ').",
        solution: "SELECT line_code, COALESCE(location, 'Chưa rõ') AS vi_tri FROM production_lines ORDER BY line_code;",
      },
      {
        question: "Lấy machine_code và cột nhan = CONCAT(machine_code, ' (', machine_type, ')') cho 5 máy đầu theo machine_id.",
        hint: "CONCAT nhận nhiều đối số, chuỗi ' (' và ')' là đối số riêng.",
        solution: "SELECT machine_code, CONCAT(machine_code, ' (', machine_type, ')') AS nhan FROM machines ORDER BY machine_id LIMIT 5;",
      },
    ],
    mistakes: [
      "Nối với một cột có thể là NULL bằng || rồi bất ngờ kết quả là NULL. Dùng COALESCE trước khi nối.",
      "Quên dấu nháy đơn quanh chuỗi cố định, ví dụ viết - thay vì ' - ', khiến PostgreSQL hiểu nhầm là tên cột.",
    ],
    quiz: [
      { q: "Nếu location là NULL, 'Mã: ' || location cho kết quả gì?", a: "NULL, vì || trả về NULL khi một vế là NULL. Dùng COALESCE để tránh." },
      { q: "COALESCE(location, 'Chưa rõ') làm gì?", a: "Trả về location nếu có giá trị, nếu là NULL thì trả về 'Chưa rõ'." },
    ],
    summary: [
      "|| nối chuỗi, trả về NULL nếu một vế là NULL.",
      "CONCAT coi NULL như chuỗi rỗng.",
      "COALESCE thay NULL bằng giá trị mặc định.",
    ],
    next: "Khóa SQL Basic đã đủ các bài nền tảng. Tiếp theo là SQL Intermediate với JOIN và subquery.",
  },
];
