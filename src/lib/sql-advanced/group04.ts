import type { AdvancedLesson } from "./types";

/* Nhóm 4 — Real-world BI Engineering: logic nghiệp vụ sản xuất và capstone dataset KPI (module 10 và 11). */

export const group04: AdvancedLesson[] = [
  {
    id: "19",
    module: 10,
    title: "Plan vs Actual, tỷ lệ đạt và phương sai",
    minutes: 55,
    objectives: [
      "So sánh sản lượng thực tế với kế hoạch theo đơn và theo dây chuyền.",
      "Tính tỷ lệ đạt (achievement rate) và chênh lệch (variance).",
      "Xếp hạng dây chuyền theo tỷ lệ đạt.",
    ],
    prerequisites: "Đã học JOIN, GROUP BY và CTE (khóa này, các bài đầu).",
    explanation: [
      "Kế hoạch nằm ở planned_qty của đơn, thực tế là tổng good_qty của các bản ghi thuộc đơn đó. Hai nguồn phải được tổng hợp về cùng grain (theo đơn) trước khi so sánh.",
      "Tỷ lệ đạt = thực tế chia kế hoạch, nhân 100. Phương sai (variance) = thực tế trừ kế hoạch: số âm là thiếu, số dương là vượt.",
      "Khi tổng hợp theo dây chuyền, phải cộng kế hoạch của mọi đơn trong dây chuyền đó. Nếu lấy kế hoạch ở cấp đơn rồi nối với bản ghi sản xuất, kế hoạch sẽ bị nhân dòng.",
    ],
    syntax: "ROUND(100.0 * thuc_te / ke_hoach, 1) AS ty_le_dat; thuc_te - ke_hoach AS chenh_lech",
    example: {
      sql: "SELECT o.order_code,\n       o.planned_qty,\n       SUM(r.good_qty) AS thuc_te,\n       SUM(r.good_qty) - o.planned_qty AS chenh_lech,\n       ROUND(100.0 * SUM(r.good_qty) / o.planned_qty, 1) AS ty_le_dat\nFROM production_orders o\nJOIN production_records r ON r.order_id = o.order_id\nGROUP BY o.order_code, o.planned_qty\nORDER BY ty_le_dat DESC\nLIMIT 10;",
      explain: [
        "Mỗi đơn có một dòng, kế hoạch được giữ nguyên vì chỉ GROUP BY theo đơn.",
        "Đơn có ty_le_dat dưới 100 là đơn chưa đạt kế hoạch.",
      ],
    },
    factory: "Trưởng ca cần biết đơn nào thiếu sản lượng để điều chỉnh ca tiếp theo.",
    practice: [
      {
        question: "Plan vs Actual theo đơn (order_code, planned_qty, thuc_te, chenh_lech), chỉ đơn có bản ghi sản xuất, sắp xếp theo order_code.",
        hint: "Giống ví dụ nhưng bỏ cột ty_le_dat và ORDER BY theo order_code.",
        solution:
          "SELECT o.order_code, o.planned_qty, SUM(r.good_qty) AS thuc_te, SUM(r.good_qty) - o.planned_qty AS chenh_lech FROM production_orders o JOIN production_records r ON r.order_id = o.order_id GROUP BY o.order_code, o.planned_qty ORDER BY o.order_code;",
      },
      {
        question: "Xếp hạng dây chuyền theo tỷ lệ đạt (line_code, ty_le_dat làm tròn 1 chữ số), tổng hợp kế hoạch và thực tế mỗi phía trong một CTE. Chỉ lấy dây chuyền có tỷ lệ đạt cao nhất.",
        hint: "CTE ke_hoach (SUM planned_qty theo line_id) và CTE thuc_te (SUM good_qty theo line_id), rồi tính 100.0 * act / plan và ORDER BY giảm dần LIMIT 1.",
        solution:
          "WITH ke_hoach AS (SELECT line_id, SUM(planned_qty) AS plan FROM production_orders GROUP BY line_id), thuc_te AS (SELECT o.line_id, SUM(r.good_qty) AS act FROM production_records r JOIN production_orders o ON o.order_id = r.order_id GROUP BY o.line_id) SELECT l.line_code, ROUND(100.0 * t.act / k.plan, 1) AS ty_le_dat FROM ke_hoach k JOIN thuc_te t ON t.line_id = k.line_id JOIN production_lines l ON l.line_id = k.line_id ORDER BY ty_le_dat DESC LIMIT 1;",
      },
    ],
    mistakes: [
      "Lấy planned_qty sau khi JOIN với bản ghi sản xuất, kế hoạch bị cộng nhiều lần.",
      "Tính tỷ lệ đạt bằng số nguyên, kết quả bị làm tròn xuống 0 hoặc 1.",
      "So sánh kế hoạch và thực tế khi đơn chưa có bản ghi nào, không tính đơn đó vào kết quả (dùng LEFT JOIN nếu cần).",
    ],
    summary: [
      "Tổng hợp kế hoạch và thực tế về cùng grain trước khi so sánh.",
      "Tỷ lệ đạt và phương sai là hai chỉ số chính của Plan vs Actual.",
      "Tránh nhân dòng khi nối kế hoạch với bản ghi sản xuất.",
    ],
  },
  {
    id: "20",
    module: 10,
    title: "Phân tích dừng máy và OEE",
    minutes: 55,
    objectives: [
      "Tổng hợp thời gian dừng theo loại và theo lý do.",
      "Tính tỷ lệ phần trăm trên tổng bằng window SUM() OVER ().",
      "Hiểu công thức OEE gồm Availability, Performance và Quality.",
    ],
    prerequisites: "Đã học GROUP BY, window function và JOIN (các bài trước).",
    explanation: [
      "Thời gian dừng nằm trong downtime_events, mỗi dòng có lý do trong downtime_reasons với loại (Planned, Breakdown, Changeover, Material, Quality, Other).",
      "OEE = Availability x Performance x Quality. Availability là thời gian chạy trên thời gian kế hoạch. Performance là sản lượng thực tế trên sản lượng lý thuyết. Quality là số tốt trên tổng số.",
      "Để tính tỷ lệ của từng loại trên tổng, dùng SUM(SUM(cột)) OVER (). Hai lớp SUM: lớp trong tổng hợp theo nhóm, lớp ngoài tổng toàn bộ nhóm.",
    ],
    syntax: "100.0 * SUM(phút) / SUM(SUM(phút)) OVER () AS ty_le_phan_tram",
    example: {
      sql: "SELECT r.reason_name,\n       COUNT(*) AS so_lan,\n       ROUND(SUM(d.duration_minutes), 1) AS tong_phut\nFROM downtime_events d\nJOIN downtime_reasons r ON r.reason_id = d.reason_id\nGROUP BY r.reason_name\nORDER BY tong_phut DESC\nLIMIT 5;",
      explain: [
        "Mỗi lý do dừng một dòng, kèm số lần và tổng phút.",
        "Các lý do đứng đầu là nguồn mất thời gian lớn nhất để ưu tiên xử lý.",
      ],
    },
    factory: "Bảo trì và sản xuất họp hằng tuần để chọn lý do dừng nào cần xử lý trước, dựa trên tỷ lệ thời gian mất.",
    practice: [
      {
        question: "Tổng thời gian dừng theo loại (category, tong_phut làm tròn 1 chữ số) kèm ty_le_phan_tram làm tròn 1 chữ số so với toàn bộ thời gian dừng, sắp xếp theo tong_phut giảm dần.",
        hint: "ROUND(100.0 * SUM(d.duration_minutes) / SUM(SUM(d.duration_minutes)) OVER (), 1).",
        solution:
          "SELECT r.category, ROUND(SUM(d.duration_minutes), 1) AS tong_phut, ROUND(100.0 * SUM(d.duration_minutes) / SUM(SUM(d.duration_minutes)) OVER (), 1) AS ty_le_phan_tram FROM downtime_events d JOIN downtime_reasons r ON r.reason_id = d.reason_id GROUP BY r.category ORDER BY tong_phut DESC;",
      },
      {
        question: "Lý do dừng xuất hiện nhiều lần nhất (reason_name, so_lan), chỉ một dòng.",
        hint: "COUNT(*) theo reason_name, ORDER BY so_lan DESC LIMIT 1.",
        solution:
          "SELECT r.reason_name, COUNT(*) AS so_lan FROM downtime_events d JOIN downtime_reasons r ON r.reason_id = d.reason_id GROUP BY r.reason_name ORDER BY so_lan DESC LIMIT 1;",
      },
    ],
    mistakes: [
      "Chia SUM cho SUM() OVER () ở cùng một mức tổng hợp làm lỗi cú pháp. Phải dùng SUM(SUM(...)) OVER ().",
      "Tính OEE bằng cách cộng ba tỷ lệ thay vì nhân.",
      "Coi thời gian dừng Planned (nghỉ theo kế hoạch) là tổn thất máy, làm Availability thấp giả.",
    ],
    summary: [
      "Tổng hợp dừng máy theo loại và theo lý do.",
      "Tỷ lệ trên tổng dùng SUM(SUM(...)) OVER ().",
      "OEE = Availability x Performance x Quality.",
    ],
  },
  {
    id: "21",
    module: 11,
    title: "Capstone: khảo sát nguồn và dựng KPI dataset theo dây chuyền",
    minutes: 65,
    objectives: [
      "Khảo sát nguồn dữ liệu: bảng nào chứa gì, khóa nối là gì.",
      "Dựng KPI dataset theo dây chuyền bằng nhiều CTE rõ ràng.",
      "Kiểm tra dataset sau khi dựng bằng các truy vấn đối chiếu.",
    ],
    prerequisites: "Đã học toàn bộ các bài trước trong nhóm 1 đến 4.",
    explanation: [
      "Bước đầu của capstone là khảo sát: liệt kê bảng nguồn, grain của từng bảng, và khóa nối. Ví dụ: production_records nối với production_orders bằng order_id, production_orders nối với production_lines bằng line_id.",
      "KPI dataset nên có grain rõ ràng, ở đây là một dòng mỗi dây chuyền. Mỗi chỉ số là một CTE riêng: sản lượng, dừng máy, số đơn. Cuối cùng mới ghép lại.",
      "Dây chuyền không có dừng máy vẫn phải có mặt trong dataset. Dùng LEFT JOIN và COALESCE để gán 0 thay vì để NULL làm mất dòng.",
    ],
    syntax: "WITH chi_so_1 AS (...), chi_so_2 AS (...) SELECT ... FROM dim LEFT JOIN chi_so_1 ... LEFT JOIN chi_so_2 ...",
    example: {
      sql: "WITH san_luong AS (\n  SELECT o.line_id,\n         SUM(r.good_qty) AS good,\n         SUM(r.ng_qty) AS ng,\n         SUM(r.total_qty) AS tong_mau\n  FROM production_records r\n  JOIN production_orders o ON o.order_id = r.order_id\n  GROUP BY o.line_id\n),\ndung_may AS (\n  SELECT o.line_id, ROUND(SUM(d.duration_minutes), 1) AS phut_dung\n  FROM downtime_events d\n  JOIN production_orders o ON o.order_id = d.order_id\n  GROUP BY o.line_id\n)\nSELECT l.line_code,\n       s.good,\n       ROUND(100.0 * s.ng / s.tong_mau, 2) AS ng_rate,\n       COALESCE(d.phut_dung, 0) AS phut_dung\nFROM production_lines l\nLEFT JOIN san_luong s ON s.line_id = l.line_id\nLEFT JOIN dung_may d ON d.line_id = l.line_id\nORDER BY l.line_code;",
      explain: [
        "Mỗi chỉ số được tính trong một CTE riêng, có grain là dây chuyền.",
        "Truy vấn chính bắt đầu từ production_lines, nên dây chuyền không có sản lượng vẫn xuất hiện.",
      ],
    },
    factory: "Dashboard giám sát cần một bảng duy nhất theo dây chuyền để hiển thị sản lượng, NG rate và thời gian dừng.",
    practice: [
      {
        question: "KPI dataset theo dây chuyền gồm line_code, good (sản lượng tốt), ng_rate (làm tròn 2 chữ số) và so_don (số đơn). Dùng CTE cho từng chỉ số, sắp xếp theo line_code.",
        hint: "CTE san_luong (SUM good, ng, total_qty theo line_id) và CTE so_don (COUNT theo line_id), rồi LEFT JOIN từ production_lines.",
        solution:
          "WITH san_luong AS (SELECT o.line_id, SUM(r.good_qty) AS good, SUM(r.ng_qty) AS ng, SUM(r.total_qty) AS tong_mau FROM production_records r JOIN production_orders o ON o.order_id = r.order_id GROUP BY o.line_id), so_don AS (SELECT line_id, COUNT(*) AS so_don FROM production_orders GROUP BY line_id) SELECT l.line_code, s.good, ROUND(100.0 * s.ng / s.tong_mau, 2) AS ng_rate, d.so_don FROM production_lines l LEFT JOIN san_luong s ON s.line_id = l.line_id LEFT JOIN so_don d ON d.line_id = l.line_id ORDER BY l.line_code;",
      },
      {
        question: "Kiểm tra dataset: đếm số dây chuyền không có đơn sản xuất nào (so_day_chuyen_trong).",
        hint: "LEFT JOIN production_orders và lọc order_id IS NULL, rồi COUNT(*).",
        solution:
          "SELECT COUNT(*) AS so_day_chuyen_trong FROM production_lines l LEFT JOIN production_orders o ON o.line_id = l.line_id WHERE o.order_id IS NULL;",
      },
    ],
    mistakes: [
      "Bắt đầu từ bảng sản lượng rồi LEFT JOIN, dây chuyền không có sản lượng bị mất khỏi dataset.",
      "Tổng hợp nhiều chỉ số trong một CTE làm nhân dòng khi JOIN các nguồn khác grain.",
      "Để NULL trong dataset rồi tính tổng sau đó, kết quả thiếu mà không báo lỗi.",
    ],
    summary: [
      "Khảo sát nguồn trước: bảng, grain, khóa nối.",
      "Mỗi chỉ số một CTE có cùng grain, rồi ghép ở cuối.",
      "Dùng LEFT JOIN và COALESCE để không mất dòng.",
    ],
  },
  {
    id: "22",
    module: 11,
    title: "Capstone: dashboard-ready dataset và tối ưu",
    minutes: 60,
    objectives: [
      "Tạo dataset theo ngày sẵn sàng cho dashboard, gồm chỉ số trượt 7 ngày.",
      "Dùng WINDOW clause để dùng lại một khung cho nhiều hàm.",
      "Kiểm tra dataset cuối bằng số liệu đếm và điều kiện cảnh báo.",
    ],
    prerequisites: "Đã học window function, CTE, NG rate và capstone bài trước.",
    explanation: [
      "Dashboard cần dataset theo ngày, mỗi ngày một dòng, sẵn sàng để vẽ biểu đồ mà không phải tính thêm.",
      "NG rate 7 ngày trượt nên tính bằng tổng NG trong 7 ngày chia tổng mẫu trong 7 ngày, không lấy trung bình của các tỷ lệ ngày.",
      "Tên WINDOW w AS (...) đặt một khung dùng chung cho nhiều hàm window trong cùng SELECT, giúp câu lệnh gọn và dễ sửa.",
    ],
    syntax: "SELECT ..., SUM(x) OVER w FROM bang WINDOW w AS (ORDER BY ngay ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)",
    example: {
      sql: "WITH ngay AS (\n  SELECT CAST(record_time AS date) AS ngay,\n         SUM(ng_qty) AS ng,\n         SUM(total_qty) AS tong_mau\n  FROM production_records\n  GROUP BY 1\n)\nSELECT ngay,\n       ROUND(100.0 * ng / tong_mau, 2) AS ng_rate,\n       ROUND(100.0 * SUM(ng) OVER w / SUM(tong_mau) OVER w, 2) AS ng_rate_7_ngay\nFROM ngay\nWINDOW w AS (ORDER BY ngay ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)\nORDER BY ngay\nLIMIT 10;",
      explain: [
        "ng_rate là NG rate của đúng ngày đó.",
        "ng_rate_7_ngay lấy tổng NG và tổng mẫu của 7 ngày gần nhất rồi chia, đúng cách tính tỷ lệ.",
      ],
    },
    factory: "Trưởng bộ phận chất lượng nhận cảnh báo khi NG rate 7 ngày vượt ngưỡng 2%, nên dataset cần có sẵn cột này.",
    practice: [
      {
        question: "Dataset dashboard theo ngày: ngay, good (sản lượng tốt của ngày) và ng_rate_7_ngay như ví dụ, làm tròn 2 chữ số, cho 10 ngày đầu tiên.",
        hint: "Tổng hợp theo ngày trong CTE, rồi SUM OVER w với WINDOW w AS (ORDER BY ngay ROWS BETWEEN 6 PRECEDING AND CURRENT ROW).",
        solution:
          "WITH ngay AS (SELECT CAST(record_time AS date) AS ngay, SUM(good_qty) AS good, SUM(ng_qty) AS ng, SUM(total_qty) AS tong_mau FROM production_records GROUP BY 1) SELECT ngay, good, ROUND(100.0 * SUM(ng) OVER w / SUM(tong_mau) OVER w, 2) AS ng_rate_7_ngay FROM ngay WINDOW w AS (ORDER BY ngay ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) ORDER BY ngay LIMIT 10;",
      },
      {
        question: "Kiểm tra cảnh báo: đếm tổng số ngày (so_ngay) và số ngày có NG rate của ngày đó lớn hơn 2% (so_ngay_canh_bao).",
        hint: "COUNT(*) và COUNT(*) FILTER (WHERE 100.0 * ng / tong_mau > 2) trong CTE ngay.",
        solution:
          "WITH ngay AS (SELECT CAST(record_time AS date) AS ngay, SUM(ng_qty) AS ng, SUM(total_qty) AS tong_mau FROM production_records GROUP BY 1) SELECT COUNT(*) AS so_ngay, COUNT(*) FILTER (WHERE 100.0 * ng / tong_mau > 2) AS so_ngay_canh_bao FROM ngay;",
      },
    ],
    mistakes: [
      "Lấy trung bình của ng_rate từng ngày thay vì tổng NG chia tổng mẫu của cả khoảng.",
      "Quên ORDER BY khi dùng LIMIT, nên tập 10 ngày không cố định.",
      "Dùng WINDOW clause nhưng quên khai báo trước khi ORDER BY trong câu lệnh, làm câu lệnh báo lỗi.",
    ],
    summary: [
      "Dataset dashboard có một dòng mỗi ngày, sẵn sàng vẽ biểu đồ.",
      "Tỷ lệ trượt tính từ tổng tử và tổng mẫu của cả khoảng.",
      "WINDOW clause giúp tái sử dụng khung window.",
    ],
  },
];
