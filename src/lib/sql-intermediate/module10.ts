import type { IntermediateLesson } from "./types";

/* Module 10 — Functions: chuỗi, ngày giờ, số, NULL, CASE WHEN, tổng hợp có điều kiện. */

export const module10: IntermediateLesson[] = [
  {
    id: "20",
    module: 10,
    title: "Hàm xử lý chuỗi: UPPER, LOWER, TRIM, REPLACE, CONCAT",
    minutes: 45,
    objectives: [
      "Chuẩn hóa chữ hoa, chữ thường với UPPER và LOWER.",
      "Bỏ khoảng trắng thừa bằng TRIM.",
      "Ghép và thay thế chuỗi bằng CONCAT và REPLACE.",
    ],
    prerequisites: "Đã học SELECT, WHERE và LIKE (khóa Basic).",
    explanation: [
      "Dữ liệu nhập tay thường có khoảng trắng thừa hoặc viết hoa không thống nhất. UPPER và LOWER chuẩn hóa chữ, TRIM bỏ khoảng trắng đầu cuối.",
      "CONCAT ghép nhiều chuỗi lại với nhau. REPLACE thay một đoạn chuỗi bằng đoạn khác.",
      "Chuẩn hóa trước khi so sánh giúp các giá trị giống nhau không bị coi là khác nhau.",
    ],
    syntax: "UPPER(chuỗi), LOWER(chuỗi), TRIM(chuỗi), CONCAT(a, b), REPLACE(chuỗi, cũ, mới)",
    example: {
      sql: "SELECT UPPER(TRIM('  line a  ')) AS chuan_hoa,\n       CONCAT('LINE-', 'A') AS ghep,\n       REPLACE('LINE-A', 'LINE', 'L') AS thay_the;",
      explain: [
        "TRIM bỏ khoảng trắng, UPPER đổi thành chữ hoa.",
        "CONCAT ghép hai chuỗi; REPLACE đổi LINE thành L.",
      ],
    },
    factory: "Mã sản phẩm nhập từ nhiều nguồn có khoảng trắng hoặc chữ thường; cần chuẩn hóa để đối chiếu.",
    practice: [
      {
        question: "Lấy product_code đã chuyển thành chữ hoa và bỏ khoảng trắng đầu cuối, đặt alias ma_chuan.",
        hint: "UPPER(TRIM(product_code)) AS ma_chuan.",
        solution: "SELECT UPPER(TRIM(product_code)) AS ma_chuan FROM products;",
      },
      {
        question: "Lấy full_name của nhân viên, thay từ 'Engineer' trong họ tên bằng 'Kỹ sư' (dùng REPLACE, đặt alias ten_moi).",
        hint: "REPLACE(full_name, 'Engineer', 'Kỹ sư').",
        solution: "SELECT REPLACE(full_name, 'Engineer', 'Kỹ sư') AS ten_moi FROM employees;",
      },
    ],
    mistakes: [
      "Quên TRIM nên khoảng trắng làm so sánh sai.",
      "Nhầm REPLACE thay mọi chỗ xuất hiện, không chỉ chỗ đầu.",
    ],
    quiz: [
      { q: "TRIM làm gì?", a: "Bỏ khoảng trắng ở đầu và cuối chuỗi." },
      { q: "REPLACE thay bao nhiêu chỗ?", a: "Tất cả các chỗ khớp trong chuỗi." },
    ],
    summary: [
      "Chuẩn hóa chữ bằng UPPER, LOWER.",
      "Bỏ khoảng trắng bằng TRIM.",
      "Ghép và thay bằng CONCAT, REPLACE.",
    ],
    next: "Bài 21 xử lý ngày giờ với EXTRACT và DATE_TRUNC.",
  },
  {
    id: "21",
    module: 10,
    title: "Hàm ngày giờ: EXTRACT, DATE_TRUNC, INTERVAL",
    minutes: 60,
    objectives: [
      "Lấy năm, tháng, ngày từ một thời điểm bằng EXTRACT.",
      "Gom thời gian theo ngày, tuần, tháng bằng DATE_TRUNC.",
      "Cộng trừ khoảng thời gian bằng INTERVAL.",
    ],
    prerequisites: "Đã học GROUP BY và hàm tổng hợp (khóa Basic).",
    explanation: [
      "Cột thời gian như record_time chứa cả ngày và giờ. EXTRACT lấy một phần của nó, ví dụ tháng hoặc giờ.",
      "DATE_TRUNC làm tròn thời gian xuống mốc đầu kỳ, ví dụ đầu ngày hoặc đầu tháng. Dùng để gom nhóm báo cáo theo kỳ.",
      "INTERVAL biểu diễn khoảng thời gian, ví dụ '7 days', dùng để cộng hoặc trừ thời điểm.",
    ],
    syntax: "EXTRACT(MONTH FROM cột_thời_gian)\nDATE_TRUNC('day', cột_thời_gian)\ncột_thời_gian - INTERVAL '7 days'",
    example: {
      sql: "SELECT DATE_TRUNC('day', record_time) AS ngay,\n       SUM(good_qty) AS san_luong\nFROM production_records\nGROUP BY DATE_TRUNC('day', record_time)\nORDER BY ngay\nLIMIT 5;",
      explain: [
        "DATE_TRUNC đưa mọi thời điểm trong một ngày về cùng một mốc.",
        "GROUP BY theo mốc đó để cộng sản lượng từng ngày.",
      ],
    },
    factory: "Báo cáo sản lượng theo ngày, tuần và tháng để so sánh xu hướng.",
    practice: [
      {
        question: "Lấy số bản ghi production_records theo tháng (dùng DATE_TRUNC('month', record_time)), 5 tháng đầu tiên.",
        hint: "SELECT DATE_TRUNC('month', record_time) AS thang, COUNT(*) ... GROUP BY ... ORDER BY thang LIMIT 5.",
        solution: "SELECT DATE_TRUNC('month', record_time) AS thang, COUNT(*) AS so_ban_ghi FROM production_records GROUP BY DATE_TRUNC('month', record_time) ORDER BY thang LIMIT 5;",
      },
      {
        question: "Lấy số bản ghi production_records có record_time trong 7 ngày gần nhất của mốc record_time lớn nhất (dùng INTERVAL '7 days').",
        hint: "Tìm MAX(record_time) bằng subquery, rồi WHERE record_time >= max - INTERVAL '7 days'.",
        solution: "SELECT COUNT(*) AS so_ban_ghi FROM production_records WHERE record_time >= (SELECT MAX(record_time) FROM production_records) - INTERVAL '7 days';",
      },
    ],
    mistakes: [
      "Nhóm theo cột thời gian gốc thay vì mốc đã làm tròn, nên mỗi giây là một nhóm.",
      "Nhầm EXTRACT trả về số, còn DATE_TRUNC trả về thời điểm.",
    ],
    quiz: [
      { q: "DATE_TRUNC('month', ...) trả về gì?", a: "Thời điểm đầu tháng của giá trị đó." },
      { q: "INTERVAL dùng để làm gì?", a: "Biểu diễn khoảng thời gian để cộng hoặc trừ." },
    ],
    summary: [
      "EXTRACT lấy một phần thời gian.",
      "DATE_TRUNC gom theo kỳ.",
      "INTERVAL cộng trừ khoảng thời gian.",
    ],
    next: "Bài 22 dùng các hàm số: ROUND, CEIL, FLOOR, ABS.",
  },
  {
    id: "22",
    module: 10,
    title: "Hàm số: ROUND, CEIL, FLOOR, ABS",
    minutes: 45,
    objectives: [
      "Làm tròn số với ROUND và chọn số chữ số thập phân.",
      "Phân biệt CEIL (làm tròn lên) và FLOOR (làm tròn xuống).",
      "Lấy giá trị tuyệt đối với ABS.",
    ],
    prerequisites: "Đã học SELECT và các phép tính (khóa Basic).",
    explanation: [
      "ROUND(số, n) làm tròn đến n chữ số sau dấu phẩy. CEIL làm tròn lên số nguyên gần nhất, FLOOR làm tròn xuống.",
      "ABS trả về giá trị tuyệt đối, hữu ích khi tính chênh lệch không quan tâm dấu.",
      "Trong sản xuất, làm tròn đúng quy tắc giúp số liệu báo cáo nhất quán.",
    ],
    syntax: "ROUND(số, n), CEIL(số), FLOOR(số), ABS(số)",
    example: {
      sql: "SELECT ROUND(42.567, 2) AS lam_tron,\n       CEIL(42.1) AS len,\n       FLOOR(42.9) AS xuong,\n       ABS(-5) AS tuyet_doi;",
      explain: [
        "ROUND giữ 2 chữ số thập phân.",
        "CEIL lên 43, FLOOR xuống 42, ABS đổi -5 thành 5.",
      ],
    },
    factory: "Chu kỳ chuẩn và thời gian thực tế cần làm tròn để so sánh gọn trên báo cáo.",
    practice: [
      {
        question: "Lấy product_code và standard_cycle_sec làm tròn 1 chữ số thập phân.",
        hint: "ROUND(standard_cycle_sec, 1).",
        solution: "SELECT product_code, ROUND(standard_cycle_sec, 1) AS chu_ky FROM products;",
      },
      {
        question: "Lấy chênh lệch tuyệt đối giữa planned_qty và 3000 cho mỗi đơn (dùng ABS).",
        hint: "ABS(planned_qty - 3000).",
        solution: "SELECT order_code, ABS(planned_qty - 3000) AS lech FROM production_orders;",
      },
    ],
    mistakes: [
      "Nhầm CEIL với ROUND: CEIL luôn làm tròn lên.",
      "Làm tròn quá sớm trong chuỗi phép tính làm lệch kết quả cuối.",
    ],
    quiz: [
      { q: "CEIL(4.1) bằng bao nhiêu?", a: "5." },
      { q: "ABS dùng khi nào?", a: "Khi cần khoảng cách không có dấu." },
    ],
    summary: [
      "ROUND làm tròn đến n chữ số.",
      "CEIL lên, FLOOR xuống.",
      "ABS lấy giá trị tuyệt đối.",
    ],
    next: "Bài 23 xử lý NULL với COALESCE và NULLIF.",
  },
  {
    id: "23",
    module: 10,
    title: "Xử lý NULL: COALESCE và NULLIF",
    minutes: 45,
    objectives: [
      "Thay NULL bằng giá trị mặc định với COALESCE.",
      "Tránh chia cho 0 bằng NULLIF.",
      "Đọc được câu lệnh có xử lý NULL.",
    ],
    prerequisites: "Đã học NULL và chuỗi rỗng (khóa Basic, bài 7 và 8).",
    explanation: [
      "COALESCE(a, b, ...) trả về giá trị đầu tiên khác NULL. Dùng để hiện giá trị thay thế khi dữ liệu thiếu.",
      "NULLIF(a, b) trả về NULL khi a bằng b, ngược lại trả về a. Dùng để biến 0 thành NULL, tránh lỗi chia cho 0.",
      "Ví dụ: tỷ lệ = tổng_lỗi / NULLIF(tổng_total, 0) sẽ trả về NULL thay vì báo lỗi khi tổng bằng 0.",
    ],
    syntax: "COALESCE(cột, giá_trị_thay_thế)\nNULLIF(mẫu_số, 0)",
    example: {
      sql: "SELECT line_code,\n       COALESCE(location, 'Chưa xác định') AS vi_tri\nFROM production_lines;",
      explain: [
        "Dây chuyền có location là NULL hoặc rỗng hiện 'Chưa xác định'.",
        "COALESCE chỉ thay NULL; chuỗi rỗng cần xử lý riêng bằng NULLIF(location, '').",
      ],
    },
    factory: "Báo cáo tỷ lệ NG không được lỗi khi một ca chưa có sản phẩm nào.",
    practice: [
      {
        question: "Lấy line_code và vi_tri (location thay NULL hoặc chuỗi rỗng bằng 'Chưa xác định').",
        hint: "COALESCE(NULLIF(location, ''), 'Chưa xác định').",
        solution: "SELECT line_code, COALESCE(NULLIF(location, ''), 'Chưa xác định') AS vi_tri FROM production_lines;",
      },
      {
        question: "Tính tỷ lệ NG cho từng máy: SUM(ng_qty) / NULLIF(SUM(total_qty), 0), làm tròn 4 chữ số.",
        hint: "GROUP BY machine_id; dùng NULLIF để tránh chia cho 0.",
        solution: "SELECT machine_id, ROUND(SUM(ng_qty) * 1.0 / NULLIF(SUM(total_qty), 0), 4) AS ty_le_ng FROM production_records GROUP BY machine_id;",
      },
    ],
    mistakes: [
      "Tưởng COALESCE thay được chuỗi rỗng, thực tế chỉ thay NULL.",
      "Quên NULLIF nên chia cho 0 gây lỗi cả câu lệnh.",
    ],
    quiz: [
      { q: "COALESCE trả về gì?", a: "Giá trị đầu tiên khác NULL trong danh sách." },
      { q: "NULLIF(x, 0) dùng để làm gì?", a: "Biến 0 thành NULL, tránh chia cho 0." },
    ],
    summary: [
      "COALESCE thay NULL bằng giá trị mặc định.",
      "NULLIF tránh chia cho 0.",
    ],
    next: "Bài 24 viết điều kiện rẽ nhánh với CASE WHEN.",
  },
  {
    id: "24",
    module: 10,
    title: "CASE WHEN: phân loại theo điều kiện",
    minutes: 45,
    objectives: [
      "Viết CASE WHEN với nhiều điều kiện và ELSE.",
      "Dùng CASE để tạo cột phân loại mới.",
      "Dùng CASE trong GROUP BY hoặc ORDER BY.",
    ],
    prerequisites: "Đã học WHERE và các toán tử so sánh (khóa Basic).",
    explanation: [
      "CASE WHEN kiểm tra các điều kiện theo thứ tự. Điều kiện đúng đầu tiên sẽ cho kết quả, nếu không có điều kiện nào đúng thì trả về ELSE.",
      "Dùng CASE để phân loại dữ liệu, ví dụ phân loại chu kỳ chuẩn là nhanh, vừa hoặc chậm.",
      "Thứ tự các điều kiện quan trọng: đặt điều kiện cụ thể trước, điều kiện chung sau.",
    ],
    syntax: "CASE\n  WHEN điều_kiện_1 THEN kết_quả_1\n  WHEN điều_kiện_2 THEN kết_quả_2\n  ELSE kết_quả_khác\nEND",
    example: {
      sql: "SELECT product_code,\n       standard_cycle_sec,\n       CASE\n         WHEN standard_cycle_sec < 45 THEN 'Nhanh'\n         WHEN standard_cycle_sec <= 55 THEN 'Vừa'\n         ELSE 'Chậm'\n       END AS phan_loai\nFROM products;",
      explain: [
        "Điều kiện được kiểm tra theo thứ tự từ trên xuống.",
        "ELSE xử lý các trường hợp còn lại, ví dụ chu kỳ trên 55.",
      ],
    },
    factory: "Phân loại sản phẩm theo chu kỳ gia công để lập kế hoạch dây chuyền.",
    practice: [
      {
        question: "Phân loại từng đơn sản xuất: 'Lớn' nếu planned_qty >= 3500, 'Vừa' nếu từ 3000 đến dưới 3500, còn lại 'Nhỏ'. Lấy order_code và nhom.",
        hint: "CASE WHEN planned_qty >= 3500 THEN 'Lớn' WHEN planned_qty >= 3000 THEN 'Vừa' ELSE 'Nhỏ' END.",
        solution: "SELECT order_code, CASE WHEN planned_qty >= 3500 THEN 'Lớn' WHEN planned_qty >= 3000 THEN 'Vừa' ELSE 'Nhỏ' END AS nhom FROM production_orders;",
      },
      {
        question: "Đếm số sản phẩm theo phân loại chu kỳ (Nhanh: dưới 45, Chậm: từ 55 trở lên, còn lại Vừa) bằng CASE trong GROUP BY.",
        hint: "Đặt CASE vào GROUP BY và SELECT, đếm bằng COUNT(*).",
        solution: "SELECT CASE WHEN standard_cycle_sec < 45 THEN 'Nhanh' WHEN standard_cycle_sec >= 55 THEN 'Chậm' ELSE 'Vừa' END AS phan_loai, COUNT(*) AS so_sp FROM products GROUP BY CASE WHEN standard_cycle_sec < 45 THEN 'Nhanh' WHEN standard_cycle_sec >= 55 THEN 'Chậm' ELSE 'Vừa' END;",
      },
    ],
    mistakes: [
      "Đặt điều kiện chung trước, điều kiện cụ thể sau nên nhánh cụ thể không bao giờ chạy.",
      "Quên ELSE nên các dòng không khớp có giá trị NULL.",
    ],
    quiz: [
      { q: "CASE kiểm tra điều kiện theo thứ tự nào?", a: "Từ trên xuống, dừng ở điều kiện đúng đầu tiên." },
      { q: "Nếu không có ELSE và không điều kiện nào đúng thì sao?", a: "Kết quả là NULL." },
    ],
    summary: [
      "CASE WHEN phân loại theo điều kiện.",
      "Điều kiện kiểm tra theo thứ tự.",
      "Có thể dùng trong GROUP BY.",
    ],
    next: "Bài 25 kết hợp CASE với tổng hợp để tính nhiều chỉ số có điều kiện.",
  },
  {
    id: "25",
    module: 10,
    title: "Tổng hợp có điều kiện: SUM(CASE WHEN) và COUNT FILTER",
    minutes: 60,
    objectives: [
      "Tính tổng có điều kiện bằng SUM(CASE WHEN ...).",
      "Đếm có điều kiện bằng COUNT(*) FILTER (WHERE ...).",
      "Tính nhiều chỉ số trong một lần GROUP BY.",
    ],
    prerequisites: "Đã học CASE WHEN (bài 24) và GROUP BY (khóa Basic).",
    explanation: [
      "SUM(CASE WHEN điều_kiện THEN giá_trị ELSE 0 END) cộng có điều kiện trong cùng một lần quét dữ liệu.",
      "COUNT(*) FILTER (WHERE điều_kiện) đếm các dòng thỏa điều kiện, viết gọn hơn trong PostgreSQL.",
      "Cách này giúp tính OK, NG và tổng trong một câu lệnh, không cần nhiều truy vấn.",
    ],
    syntax: "SUM(CASE WHEN điều_kiện THEN cột ELSE 0 END)\nCOUNT(*) FILTER (WHERE điều_kiện)",
    example: {
      sql: "SELECT line_id,\n       COUNT(*) FILTER (WHERE status = 'Completed') AS don_hoan_thanh,\n       COUNT(*) FILTER (WHERE status = 'Running') AS don_dang_chay,\n       COUNT(*) AS tong_don\nFROM production_orders\nGROUP BY line_id;",
      explain: [
        "Mỗi dây chuyền có một dòng với ba chỉ số đếm khác nhau.",
        "FILTER chỉ đếm các dòng thỏa điều kiện trong từng cột.",
      ],
    },
    factory: "Một dòng báo cáo cho mỗi dây chuyền gồm số đơn hoàn thành, đang chạy và tổng số đơn.",
    practice: [
      {
        question: "Theo machine_id: tổng good_qty (SUM(good_qty)) và tổng ng_qty chỉ tính các bản ghi có ng_qty > 0 (dùng SUM(CASE WHEN ng_qty > 0 THEN ng_qty ELSE 0 END)).",
        hint: "GROUP BY machine_id; hai cột SUM, một cột có CASE.",
        solution: "SELECT machine_id, SUM(good_qty) AS tong_dat, SUM(CASE WHEN ng_qty > 0 THEN ng_qty ELSE 0 END) AS tong_loi_co_ng FROM production_records GROUP BY machine_id;",
      },
      {
        question: "Theo product_family: đếm số đơn có status 'Completed' và số đơn 'Running' bằng COUNT(*) FILTER.",
        hint: "Đếm theo product_family qua JOIN products với production_orders.",
        solution: "SELECT p.product_family, COUNT(*) FILTER (WHERE o.status = 'Completed') AS hoan_thanh, COUNT(*) FILTER (WHERE o.status = 'Running') AS dang_chay FROM production_orders o JOIN products p ON p.product_id = o.product_id GROUP BY p.product_family;",
      },
    ],
    mistakes: [
      "Quên ELSE 0 trong SUM(CASE) nên giá trị NULL làm tổng không đúng ý.",
      "Dùng COUNT(cột) với CASE mà không để ý NULL bị bỏ qua.",
    ],
    quiz: [
      { q: "SUM(CASE WHEN ... ELSE 0 END) làm gì?", a: "Cộng có điều kiện trong cùng một lần tổng hợp." },
      { q: "COUNT(*) FILTER (WHERE ...) đếm gì?", a: "Số dòng thỏa điều kiện trong nhóm." },
    ],
    summary: [
      "SUM(CASE WHEN) tổng có điều kiện.",
      "COUNT FILTER đếm có điều kiện.",
      "Tính nhiều chỉ số trong một câu.",
    ],
    next: "Module 11 học window functions: tính toán trên một nhóm dòng mà vẫn giữ từng dòng.",
  },
];
