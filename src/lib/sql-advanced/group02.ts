import type { AdvancedLesson } from "./types";

/* Nhóm 2 — Advanced Data Processing: biến đổi dữ liệu, làm sạch và chất lượng dữ liệu, xử lý ngày giờ (module 4 đến 6). */

export const group02: AdvancedLesson[] = [
  {
    id: "7",
    module: 4,
    title: "Tổng hợp có điều kiện và FILTER",
    minutes: 50,
    objectives: [
      "Tính tổng hợp chỉ trên một tập con bằng CASE WHEN hoặc FILTER.",
      "Chuyển dữ liệu dạng dòng thành cột (pivot) bằng tổng hợp có điều kiện.",
      "Tính tỷ lệ như NG rate đúng cách: tổng tử chia tổng mẫu.",
    ],
    prerequisites: "Đã học CASE WHEN và tổng hợp có điều kiện trong khóa Intermediate (module 10).",
    explanation: [
      "Tổng hợp có điều kiện đặt CASE WHEN bên trong hàm tổng hợp: SUM(CASE WHEN ... THEN ... END). PostgreSQL còn có mệnh đề FILTER: SUM(cột) FILTER (WHERE điều_kiện), ngắn và dễ đọc hơn.",
      "PIVOT đúng nghĩa không có sẵn trong PostgreSQL. Thay vào đó, mỗi giá trị cần thành cột được viết thành một tổng hợp có FILTER. Cách này giữ được kết quả trên một dòng mỗi nhóm.",
      "Tỷ lệ NG phải tính bằng tổng NG chia tổng mẫu, không lấy trung bình các tỷ lệ theo bản ghi. Trung bình tỷ lệ cho kết quả sai khi các bản ghi có kích thước khác nhau.",
    ],
    syntax: "SUM(cột) FILTER (WHERE điều_kiện) | SUM(CASE WHEN điều_kiện THEN cột ELSE 0 END)",
    example: {
      sql: "SELECT p.product_code,\n       SUM(r.ng_qty) AS tong_ng,\n       SUM(r.total_qty) AS tong_mau,\n       ROUND(100.0 * SUM(r.ng_qty) / SUM(r.total_qty), 2) AS ng_rate\nFROM production_records r\nJOIN production_orders o ON o.order_id = r.order_id\nJOIN products p ON p.product_id = o.product_id\nGROUP BY p.product_code\nORDER BY ng_rate DESC;",
      explain: [
        "NG rate được tính từ tổng, không phải trung bình của các tỷ lệ.",
        "Đưa 100.0 vào trước để phép chia không bị cắt phần thập phân.",
      ],
    },
    factory: "Quản lý chất lượng muốn so sánh NG rate giữa các dây chuyền và xem từng ca đóng góp bao nhiêu sản lượng tốt.",
    practice: [
      {
        question: "NG rate theo dây chuyền (line_code, ng_rate làm tròn 2 chữ số), tính bằng tổng ng_qty chia tổng total_qty.",
        hint: "JOIN production_orders và production_lines, rồi GROUP BY line_code.",
        solution:
          "SELECT l.line_code, ROUND(100.0 * SUM(r.ng_qty) / SUM(r.total_qty), 2) AS ng_rate FROM production_records r JOIN production_orders o ON o.order_id = r.order_id JOIN production_lines l ON l.line_id = o.line_id GROUP BY l.line_code ORDER BY l.line_code;",
      },
      {
        question: "Mỗi dây chuyền một dòng với hai cột: tot_ca1 là tổng good_qty của ca có shift_id = 1, tot_ca2 là của ca có shift_id = 2, dùng FILTER.",
        hint: "SUM(r.good_qty) FILTER (WHERE r.shift_id = 1) AS tot_ca1.",
        solution:
          "SELECT l.line_code, SUM(r.good_qty) FILTER (WHERE r.shift_id = 1) AS tot_ca1, SUM(r.good_qty) FILTER (WHERE r.shift_id = 2) AS tot_ca2 FROM production_records r JOIN production_orders o ON o.order_id = r.order_id JOIN production_lines l ON l.line_id = o.line_id GROUP BY l.line_code ORDER BY l.line_code;",
      },
    ],
    mistakes: [
      "Lấy AVG của ng_rate theo bản ghi thay vì tổng NG chia tổng mẫu, kết quả bị lệch.",
      "Chia số nguyên làm mất phần thập phân, NG rate thành 0.",
      "Quên điều kiện trong FILTER nên tổng hợp lấy cả dữ liệu không mong muốn.",
    ],
    summary: [
      "Tổng hợp có điều kiện bằng CASE WHEN hoặc FILTER.",
      "Pivot bằng nhiều tổng hợp có FILTER trên một dòng mỗi nhóm.",
      "Tỷ lệ = tổng tử / tổng mẫu, không lấy trung bình tỷ lệ.",
    ],
  },
  {
    id: "8",
    module: 4,
    title: "JSON/JSONB, ARRAY và UNNEST",
    minutes: 50,
    objectives: [
      "Tạo đối tượng JSONB bằng jsonb_build_object.",
      "Gom giá trị thành mảng bằng ARRAY_AGG.",
      "Tách mảng thành từng dòng bằng UNNEST.",
    ],
    prerequisites: "Đã học JOIN và GROUP BY. Chưa cần biết trước về JSON.",
    explanation: [
      "JSONB là kiểu dữ liệu lưu dạng văn bản có cấu trúc. jsonb_build_object tạo một đối tượng từ cặp tên và giá trị, rất hữu ích khi cần đóng gói một bản tóm tắt để gửi sang hệ thống khác.",
      "ARRAY_AGG gom các giá trị trong một nhóm thành một mảng. DISTINCT và ORDER BY bên trong ARRAY_AGG giúp mảng không trùng và có thứ tự.",
      "UNNEST làm ngược lại: tách một mảng thành nhiều dòng. Khi kết hợp với CROSS JOIN LATERAL, mỗi dòng gốc được nhân ra theo số phần tử trong mảng của nó.",
    ],
    syntax: "jsonb_build_object('khóa', giá_trị, ...) | ARRAY_AGG(DISTINCT cột ORDER BY cột) | CROSS JOIN LATERAL UNNEST(mảng) AS u(cột)",
    example: {
      sql: "SELECT p.product_code,\n       jsonb_build_object('tong_tot', SUM(r.good_qty), 'tong_ng', SUM(r.ng_qty)) AS tom_tat\nFROM production_records r\nJOIN production_orders o ON o.order_id = r.order_id\nJOIN products p ON p.product_id = o.product_id\nGROUP BY p.product_code\nORDER BY p.product_code\nLIMIT 5;",
      explain: [
        "Mỗi sản phẩm có một cột tom_tat là đối tượng JSON với hai khóa.",
        "Để đọc một khóa, dùng toán tử ->> , ví dụ tom_tat ->> 'tong_tot'.",
      ],
    },
    factory: "Hệ thống dashboard nhận mỗi sản phẩm dưới dạng một đối tượng JSON. Các mã lỗi phát sinh cũng cần gom thành danh sách cho từng sản phẩm.",
    practice: [
      {
        question: "Với mỗi sản phẩm, gom các mã lỗi đã ghi nhận thành một mảng không trùng, có thứ tự (product_code, ma_loi), chỉ tính các kiểm tra có defect_type_id.",
        hint: "ARRAY_AGG(DISTINCT d.defect_code ORDER BY d.defect_code), nối quality_inspections với production_orders, products và defect_types.",
        solution:
          "SELECT p.product_code, ARRAY_AGG(DISTINCT d.defect_code ORDER BY d.defect_code) AS ma_loi FROM quality_inspections q JOIN production_orders o ON o.order_id = q.order_id JOIN products p ON p.product_id = o.product_id JOIN defect_types d ON d.defect_type_id = q.defect_type_id GROUP BY p.product_code ORDER BY p.product_code;",
      },
      {
        question: "Tách mảng mã lỗi của từng sản phẩm thành từng dòng (product_code, ma_loi), sắp xếp theo product_code rồi ma_loi.",
        hint: "Gom mảng trong subquery theo product_id, rồi CROSS JOIN LATERAL UNNEST.",
        solution:
          "SELECT p.product_code, u.ma_loi FROM (SELECT o.product_id, ARRAY_AGG(DISTINCT d.defect_code ORDER BY d.defect_code) AS ds FROM quality_inspections q JOIN production_orders o ON o.order_id = q.order_id JOIN defect_types d ON d.defect_type_id = q.defect_type_id GROUP BY o.product_id) t JOIN products p ON p.product_id = t.product_id CROSS JOIN LATERAL UNNEST(t.ds) AS u(ma_loi) ORDER BY p.product_code, u.ma_loi;",
      },
    ],
    mistakes: [
      "Dùng -> thay vì ->> khi cần giá trị dạng văn bản, kết quả là JSON chứ không phải chữ.",
      "Quên DISTINCT khi gom mảng nên một mã lỗi xuất hiện nhiều lần.",
      "Dùng UNNEST mà không có LATERAL khi mảng nằm trong cùng dòng, câu lệnh báo lỗi.",
    ],
    summary: [
      "jsonb_build_object đóng gói dữ liệu thành JSON.",
      "ARRAY_AGG gom giá trị thành mảng, UNNEST tách mảng ra dòng.",
      "CROSS JOIN LATERAL nối mỗi dòng với các phần tử của mảng.",
    ],
  },
  {
    id: "9",
    module: 5,
    title: "Phát hiện trùng, chọn bản ghi mới nhất và xử lý NULL",
    minutes: 55,
    objectives: [
      "Tìm dữ liệu bị thiếu hoặc rỗng bằng IS NULL và TRIM.",
      "Phát hiện bản ghi trùng bằng GROUP BY và HAVING COUNT(*) > 1.",
      "Chọn bản ghi mới nhất cho mỗi nhóm bằng DISTINCT ON.",
    ],
    prerequisites: "Đã học NULL, COALESCE và HAVING (khóa Intermediate module 10 và khóa Basic).",
    explanation: [
      "Dữ liệu thật thường có ba trạng thái thiếu: NULL, chuỗi rỗng và giá trị không hợp lệ. Chuỗi rỗng không phải NULL nên IS NULL không bắt được; phải kiểm tra thêm TRIM(cột) = ''.",
      "Trùng dữ liệu thường thấy khi một đơn có nhiều bản ghi kiểm tra. Đếm theo khóa rồi lọc bằng HAVING COUNT(*) > 1 để tìm các khóa bị lặp.",
      "DISTINCT ON (cột) giữ một dòng cho mỗi giá trị cột, dòng giữ lại là dòng đầu tiên theo ORDER BY. Đây là cách ngắn để lấy bản ghi mới nhất theo nhóm trong PostgreSQL.",
    ],
    syntax: "SELECT DISTINCT ON (khóa) ... ORDER BY khóa, thời_gian DESC",
    example: {
      sql: "SELECT DISTINCT ON (order_id)\n       order_id, inspected_at, result\nFROM quality_inspections\nORDER BY order_id, inspected_at DESC;",
      explain: [
        "Với mỗi đơn, chỉ giữ một kiểm tra, là kiểm tra có inspected_at mới nhất.",
        "DISTINCT ON phải đi cùng ORDER BY bắt đầu bằng cùng cột khóa.",
      ],
    },
    factory: "Dữ liệu vị trí dây chuyền bị thiếu sẽ làm báo cáo theo khu vực sai. Cần liệt kê để nhập bổ sung trước khi chạy báo cáo.",
    practice: [
      {
        question: "Liệt kê các dây chuyền thiếu vị trí: location là NULL hoặc chỉ có khoảng trắng (line_code).",
        hint: "WHERE location IS NULL OR TRIM(location) = ''.",
        solution:
          "SELECT line_code FROM production_lines WHERE location IS NULL OR TRIM(location) = '' ORDER BY line_code;",
      },
      {
        question: "Tìm các đơn có nhiều hơn một lần kiểm tra chất lượng (order_code, so_lan), sắp xếp theo so_lan giảm dần rồi order_code.",
        hint: "JOIN quality_inspections với production_orders, GROUP BY order_code, HAVING COUNT(*) > 1.",
        solution:
          "SELECT o.order_code, COUNT(*) AS so_lan FROM quality_inspections q JOIN production_orders o ON o.order_id = q.order_id GROUP BY o.order_code HAVING COUNT(*) > 1 ORDER BY so_lan DESC, o.order_code;",
      },
    ],
    mistakes: [
      "Chỉ kiểm tra IS NULL và bỏ sót chuỗi rỗng, nên báo cáo vẫn thiếu dữ liệu.",
      "Dùng DISTINCT ON nhưng ORDER BY không bắt đầu bằng cột khóa, PostgreSQL báo lỗi.",
      "Dùng WHERE COUNT(*) > 1 thay vì HAVING, vì WHERE không đọc được hàm tổng hợp.",
    ],
    summary: [
      "Kiểm tra cả NULL và chuỗi rỗng khi tìm dữ liệu thiếu.",
      "HAVING COUNT(*) > 1 tìm khóa bị trùng.",
      "DISTINCT ON lấy bản ghi mới nhất cho mỗi nhóm.",
    ],
  },
  {
    id: "10",
    module: 5,
    title: "Kiểm tra dữ liệu không hợp lệ và đối chiếu",
    minutes: 50,
    objectives: [
      "Viết quy tắc kiểm tra dữ liệu thành điều kiện WHERE.",
      "Đếm số dòng vi phạm để đưa vào báo cáo kiểm tra.",
      "Đối chiếu tổng của hai nguồn để tìm chênh lệch.",
    ],
    prerequisites: "Đã học COUNT, GROUP BY và JOIN (khóa Basic và Intermediate).",
    explanation: [
      "Mỗi quy tắc nghiệp vụ là một điều kiện. Ví dụ: total_qty phải bằng good_qty cộng ng_qty; defect_qty không được lớn hơn sample_qty. Dòng vi phạm là dòng thỏa điều kiện sai.",
      "Đếm số dòng vi phạm trả về một con số. Con số 0 là kết quả tốt, và vẫn là một dòng kết quả để báo cáo.",
      "Đối chiếu là so sánh cùng một đại lượng tính từ hai nguồn hoặc hai cách khác nhau. Chênh lệch khác 0 là dấu hiệu cần kiểm tra.",
    ],
    syntax: "SELECT COUNT(*) FROM bang WHERE điều_kiện_vi_phạm",
    example: {
      sql: "SELECT COUNT(*) AS so_ban_ghi_sai\nFROM production_records\nWHERE total_qty <> good_qty + ng_qty;",
      explain: [
        "Điều kiện WHERE chọn các bản ghi vi phạm quy tắc tổng bằng tốt cộng lỗi.",
        "Kết quả 0 nghĩa là không có bản ghi nào vi phạm.",
      ],
    },
    factory: "Trước khi đưa số liệu lên dashboard, bộ phận BI kiểm tra số lượng bản ghi không hợp lệ và đối chiếu sản lượng của đơn.",
    practice: [
      {
        question: "Đếm số kiểm tra chất lượng vi phạm quy tắc defect_qty lớn hơn sample_qty (so_ban_ghi_sai).",
        hint: "COUNT(*) với WHERE defect_qty > sample_qty.",
        solution: "SELECT COUNT(*) AS so_ban_ghi_sai FROM quality_inspections WHERE defect_qty > sample_qty;",
      },
      {
        question: "Đối chiếu từng đơn: order_code, planned_qty và tổng total_qty thực tế (tong_thuc_te), chỉ lấy đơn có tổng thực tế khác kế hoạch.",
        hint: "Tổng hợp total_qty theo order_id trong CTE, rồi nối với production_orders và lọc các dòng khác nhau.",
        solution:
          "WITH thuc_te AS (SELECT order_id, SUM(total_qty) AS tong_thuc_te FROM production_records GROUP BY order_id) SELECT o.order_code, o.planned_qty, t.tong_thuc_te FROM production_orders o JOIN thuc_te t ON t.order_id = o.order_id WHERE t.tong_thuc_te <> o.planned_qty ORDER BY o.order_code;",
      },
    ],
    mistakes: [
      "Dùng <> nhưng quên xử lý NULL: so sánh với NULL cho kết quả NULL và dòng bị bỏ qua.",
      "Đếm số dòng sau JOIN nhân dòng, kết quả đối chiếu không đúng.",
      "Coi kết quả 0 dòng là lỗi câu lệnh, trong khi nó có thể là dữ liệu sạch.",
    ],
    summary: [
      "Mỗi quy tắc nghiệp vụ là một điều kiện vi phạm trong WHERE.",
      "Đếm dòng vi phạm để báo cáo chất lượng dữ liệu.",
      "Đối chiếu hai nguồn bằng CTE và JOIN, rồi lọc chênh lệch.",
    ],
  },
  {
    id: "11",
    module: 6,
    title: "Ngày giờ: cắt theo kỳ, ca và ca đêm qua nửa đêm",
    minutes: 50,
    objectives: [
      "Gom dữ liệu theo ngày, tuần, tháng bằng DATE_TRUNC.",
      "Xác định ca theo giờ, kể cả ca đêm qua nửa đêm.",
      "Biết vì sao cần khoảng giờ đóng vòng (ví dụ 22 đến 6) khi ca kéo qua ngày.",
    ],
    prerequisites: "Đã học hàm ngày giờ và EXTRACT trong khóa Intermediate (module 10).",
    explanation: [
      "DATE_TRUNC('day', thời_gian) đưa mọi thời điểm trong cùng một ngày về cùng một mốc. Thay 'day' bằng 'week' hoặc 'month' để gom theo kỳ khác.",
      "Ca đêm bắt đầu ở 22 giờ hôm trước và kết thúc ở 6 giờ hôm sau. Điều kiện giờ phải là OR (hoặc >= 22, hoặc < 6), không phải AND, vì không có giờ nào vừa lớn hơn 22 vừa nhỏ hơn 6.",
      "Khi gom theo ngày, một ca đêm bị tách thành hai ngày theo lịch. Cần thống nhất quy tắc gán ca, ví dụ gán theo ngày bắt đầu ca.",
    ],
    syntax: "DATE_TRUNC('day' | 'week' | 'month', thời_gian) | EXTRACT(HOUR FROM thời_gian)",
    example: {
      sql: "SELECT DATE_TRUNC('day', record_time) AS ngay,\n       SUM(good_qty) AS tong_tot\nFROM production_records\nGROUP BY 1\nORDER BY 1\nLIMIT 5;",
      explain: [
        "Mỗi bản ghi được gán vào ngày của thời điểm ghi nhận.",
        "GROUP BY 1 là cách viết ngắn cho GROUP BY biểu thức đầu tiên trong SELECT.",
      ],
    },
    factory: "Quản lý ca muốn xem sản lượng theo tuần, và biết bao nhiêu bản ghi rơi vào ca đêm để sắp xếp nhân sự.",
    practice: [
      {
        question: "Sản lượng tốt theo tuần (tuan, tong_tot), sắp xếp theo tuần.",
        hint: "DATE_TRUNC('week', record_time) và GROUP BY biểu thức đó.",
        solution:
          "SELECT DATE_TRUNC('week', record_time) AS tuan, SUM(good_qty) AS tong_tot FROM production_records GROUP BY 1 ORDER BY 1;",
      },
      {
        question: "Đếm số bản ghi rơi vào ca đêm, tức record_time từ 22 giờ đến trước 6 giờ sáng (so_ban_ghi_ca_dem).",
        hint: "WHERE EXTRACT(HOUR FROM record_time) >= 22 OR EXTRACT(HOUR FROM record_time) < 6.",
        solution:
          "SELECT COUNT(*) AS so_ban_ghi_ca_dem FROM production_records WHERE EXTRACT(HOUR FROM record_time) >= 22 OR EXTRACT(HOUR FROM record_time) < 6;",
      },
    ],
    mistakes: [
      "Dùng AND cho khoảng giờ ca đêm, điều kiện không bao giờ đúng.",
      "Gom theo ngày lịch khi ca đêm kéo qua nửa đêm, làm một ca bị tách làm hai.",
      "Quên ORDER BY khi dùng LIMIT, kết quả 5 dòng có thể khác nhau giữa các lần chạy.",
    ],
    summary: [
      "DATE_TRUNC gom thời gian theo kỳ.",
      "Ca đêm cần điều kiện OR theo giờ.",
      "Thống nhất quy tắc gán ca khi ca kéo qua ngày.",
    ],
  },
  {
    id: "12",
    module: 6,
    title: "Thời lượng sự kiện và phát hiện khoảng trống",
    minutes: 55,
    objectives: [
      "Tính thời lượng sự kiện từ thời điểm bắt đầu và kết thúc.",
      "Dùng LAG để tìm khoảng cách giữa hai sự kiện liên tiếp.",
      "Lọc khoảng trống bất thường trong chuỗi thời gian.",
    ],
    prerequisites: "Đã học LAG và window function (bài 4 của khóa này) và tính toán ngày giờ (bài 11).",
    explanation: [
      "Hiệu hai thời điểm là một khoảng thời gian. EXTRACT(EPOCH FROM (end_time - start_time)) / 60 cho số phút.",
      "Khoảng trống là thời gian giữa lúc kết thúc sự kiện trước và lúc bắt đầu sự kiện sau trên cùng một máy. LAG(end_time) OVER (PARTITION BY máy ORDER BY start_time) lấy thời điểm kết thúc của sự kiện trước.",
      "Khoảng trống âm nghĩa là hai sự kiện chồng lấn, cần kiểm tra lại dữ liệu. Dòng đầu tiên của mỗi máy không có sự kiện trước nên khoảng trống là NULL.",
    ],
    syntax: "EXTRACT(EPOCH FROM (end_time - start_time)) / 60 | start_time - LAG(end_time) OVER (PARTITION BY máy ORDER BY start_time)",
    example: {
      sql: "SELECT machine_id, start_time, end_time,\n       ROUND(EXTRACT(EPOCH FROM (end_time - start_time)) / 60, 1) AS thoi_luong_phut\nFROM downtime_events\nORDER BY machine_id, start_time\nLIMIT 5;",
      explain: [
        "Thời lượng được tính lại từ thời điểm, đối chiếu với cột duration_minutes trong dữ liệu.",
        "Kết quả làm tròn một chữ số thập phân để dễ đọc.",
      ],
    },
    factory: "Bộ phận bảo trì muốn biết giữa hai lần dừng của cùng một máy có bao lâu máy chạy bình thường.",
    practice: [
      {
        question: "Với mỗi máy, khoảng cách (phút) giữa lúc kết thúc downtime trước và lúc bắt đầu downtime sau (machine_id, khoang_cach_phut, làm tròn 1 chữ số). Bỏ dòng đầu tiên của mỗi máy.",
        hint: "Tính LAG(end_time) trong subquery, rồi lọc khoang_cach_phut IS NOT NULL ở truy vấn ngoài.",
        solution:
          "SELECT machine_id, khoang_cach_phut FROM (SELECT machine_id, ROUND(EXTRACT(EPOCH FROM (start_time - LAG(end_time) OVER (PARTITION BY machine_id ORDER BY start_time))) / 60, 1) AS khoang_cach_phut FROM downtime_events) t WHERE khoang_cach_phut IS NOT NULL ORDER BY machine_id, khoang_cach_phut;",
      },
      {
        question: "Tổng thời gian dừng theo máy (machine_code, tong_phut, làm tròn 1 chữ số), chỉ lấy máy có tổng lớn hơn 60 phút.",
        hint: "JOIN machines, GROUP BY machine_code, HAVING SUM(duration_minutes) > 60.",
        solution:
          "SELECT m.machine_code, ROUND(SUM(d.duration_minutes), 1) AS tong_phut FROM downtime_events d JOIN machines m ON m.machine_id = d.machine_id GROUP BY m.machine_code HAVING SUM(d.duration_minutes) > 60 ORDER BY tong_phut DESC;",
      },
    ],
    mistakes: [
      "Trừ giờ bằng số thay vì dùng EXTRACT(EPOCH), kết quả sai khi khoảng thời gian qua ngày.",
      "Quên PARTITION BY máy nên khoảng trống lấy sự kiện của máy khác.",
      "Bỏ qua khoảng trống âm, dẫn đến không phát hiện hai sự kiện chồng lấn.",
    ],
    summary: [
      "EXTRACT(EPOCH FROM ...) cho thời lượng bằng giây hoặc phút.",
      "LAG theo máy để tìm khoảng trống giữa các sự kiện.",
      "Khoảng trống âm là dấu hiệu dữ liệu cần kiểm tra.",
    ],
  },
];
