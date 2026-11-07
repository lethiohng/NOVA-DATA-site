import type { IntermediateLesson } from "./types";

/* Module 11 — Window functions: OVER/PARTITION BY, ROW_NUMBER/RANK, LAG/LEAD, tổng lũy kế, FIRST/LAST_VALUE, bản ghi mới nhất. */

export const module11: IntermediateLesson[] = [
  {
    id: "26",
    module: 11,
    title: "Window function là gì? OVER và PARTITION BY",
    minutes: 45,
    objectives: [
      "Phân biệt window function với GROUP BY.",
      "Dùng OVER để tính trên một nhóm mà vẫn giữ từng dòng.",
      "Dùng PARTITION BY để chia nhóm trong window.",
    ],
    prerequisites: "Đã học GROUP BY và hàm tổng hợp (khóa Basic, module 06).",
    explanation: [
      "GROUP BY gom các dòng thành một dòng mỗi nhóm. Window function tính trên một nhóm nhưng giữ nguyên tất cả các dòng.",
      "OVER () tính trên toàn bộ bảng. OVER (PARTITION BY cột) tính riêng cho từng nhóm theo cột đó.",
      "Ví dụ: SUM(good_qty) OVER (PARTITION BY machine_id) cho mỗi bản ghi kèm tổng sản lượng của máy đó.",
    ],
    syntax: "HÀM(cột) OVER (PARTITION BY cột_nhóm)",
    example: {
      sql: "SELECT record_id, machine_id, good_qty,\n       SUM(good_qty) OVER (PARTITION BY machine_id) AS tong_may\nFROM production_records\nLIMIT 10;",
      explain: [
        "Mỗi dòng vẫn là một bản ghi sản xuất.",
        "Cột tong_may cho biết tổng sản lượng của máy đó, lặp lại trên mỗi dòng của máy.",
      ],
    },
    factory: "Mỗi bản ghi cần hiện thêm tổng sản lượng của máy để thấy tỷ trọng đóng góp.",
    practice: [
      {
        question: "Lấy order_id, machine_id, good_qty và tổng good_qty theo đơn (alias tong_don) cho 10 bản ghi đầu tiên.",
        hint: "SUM(good_qty) OVER (PARTITION BY order_id) AS tong_don, ORDER BY record_id LIMIT 10.",
        solution: "SELECT order_id, machine_id, good_qty, SUM(good_qty) OVER (PARTITION BY order_id) AS tong_don FROM production_records ORDER BY record_id LIMIT 10;",
      },
      {
        question: "Lấy full_name, role và số nhân viên cùng role (COUNT(*) OVER (PARTITION BY role) AS so_cung_role) cho tất cả nhân viên.",
        hint: "COUNT(*) OVER (PARTITION BY role).",
        solution: "SELECT full_name, role, COUNT(*) OVER (PARTITION BY role) AS so_cung_role FROM employees;",
      },
    ],
    mistakes: [
      "Nhầm window với GROUP BY, nên mong kết quả ít dòng hơn.",
      "Quên PARTITION BY nên tính trên toàn bảng thay vì theo nhóm.",
    ],
    quiz: [
      { q: "Window function khác GROUP BY ở điểm nào?", a: "Window giữ nguyên các dòng; GROUP BY gom thành một dòng mỗi nhóm." },
      { q: "PARTITION BY làm gì?", a: "Chia các dòng thành nhóm để tính riêng từng nhóm." },
    ],
    summary: [
      "Window function giữ nguyên dòng.",
      "OVER định nghĩa cửa sổ tính toán.",
      "PARTITION BY chia nhóm.",
    ],
    next: "Bài 27 xếp hạng dòng với ROW_NUMBER, RANK và DENSE_RANK.",
  },
  {
    id: "27",
    module: 11,
    title: "ROW_NUMBER, RANK và DENSE_RANK",
    minutes: 60,
    objectives: [
      "Đánh số thứ tự dòng với ROW_NUMBER.",
      "Hiểu RANK và DENSE_RANK xử lý dòng đồng hạng khác nhau.",
      "Xếp hạng theo nhóm bằng PARTITION BY.",
    ],
    prerequisites: "Đã học window function (bài 26) và ORDER BY (khóa Basic).",
    explanation: [
      "ROW_NUMBER() đánh số 1, 2, 3... không quan tâm đồng hạng. Hai dòng bằng nhau vẫn có số khác nhau.",
      "RANK() cho các dòng đồng hạng cùng số, và bỏ qua số tiếp theo (1, 1, 3). DENSE_RANK() cho cùng số nhưng không bỏ qua (1, 1, 2).",
      "Kết hợp PARTITION BY để xếp hạng trong từng nhóm, ví dụ từng dây chuyền. ORDER BY trong OVER quyết định thứ tự xếp hạng.",
    ],
    syntax: "ROW_NUMBER() OVER (PARTITION BY nhóm ORDER BY cột DESC)",
    example: {
      sql: "SELECT machine_id, record_id, good_qty,\n       ROW_NUMBER() OVER (PARTITION BY machine_id ORDER BY good_qty DESC) AS stt\nFROM production_records\nORDER BY machine_id, stt\nLIMIT 10;",
      explain: [
        "Trong mỗi máy, các bản ghi được sắp theo good_qty từ lớn đến nhỏ.",
        "stt = 1 là bản ghi có sản lượng cao nhất của máy đó.",
      ],
    },
    factory: "Xếp hạng dây chuyền theo sản lượng để tìm dây chuyền dẫn đầu và dây chuyền cần hỗ trợ.",
    practice: [
      {
        question: "Với mỗi máy, lấy bản ghi có good_qty cao nhất (dùng ROW_NUMBER, lọc stt = 1 trong CTE). Lấy machine_id, record_id, good_qty.",
        hint: "CTE đánh số bằng ROW_NUMBER() OVER (PARTITION BY machine_id ORDER BY good_qty DESC), câu chính WHERE stt = 1.",
        solution: "WITH xep AS (SELECT machine_id, record_id, good_qty, ROW_NUMBER() OVER (PARTITION BY machine_id ORDER BY good_qty DESC) AS stt FROM production_records) SELECT machine_id, record_id, good_qty FROM xep WHERE stt = 1;",
      },
      {
        question: "Xếp hạng nhân viên theo ngày nhận việc (hire_date tăng dần) trong từng role bằng RANK. Lấy full_name, role, hang.",
        hint: "RANK() OVER (PARTITION BY role ORDER BY hire_date).",
        solution: "SELECT full_name, role, RANK() OVER (PARTITION BY role ORDER BY hire_date) AS hang FROM employees;",
      },
    ],
    mistakes: [
      "Dùng ROW_NUMBER khi có đồng hạng và cần giữ cả hai dòng; khi đó nên dùng RANK.",
      "Không lọc được top N vì không đặt window trong CTE hoặc subquery.",
    ],
    quiz: [
      { q: "ROW_NUMBER khác RANK ở điểm nào?", a: "ROW_NUMBER đánh số khác nhau cho mọi dòng; RANK cho đồng hạng cùng số." },
      { q: "DENSE_RANK khác RANK thế nào?", a: "DENSE_RANK không bỏ qua số sau khi có đồng hạng." },
    ],
    summary: [
      "ROW_NUMBER đánh số duy nhất.",
      "RANK và DENSE_RANK xử lý đồng hạng.",
      "Lọc top N bằng CTE.",
    ],
    next: "Bài 28 so sánh dòng với dòng trước và sau bằng LAG và LEAD.",
  },
  {
    id: "28",
    module: 11,
    title: "LAG và LEAD: so sánh với dòng trước và sau",
    minutes: 45,
    objectives: [
      "Lấy giá trị của dòng trước bằng LAG.",
      "Lấy giá trị của dòng sau bằng LEAD.",
      "Tính chênh lệch giữa các dòng liên tiếp.",
    ],
    prerequisites: "Đã học window function và ORDER BY (bài 26, 27).",
    explanation: [
      "LAG(cột, n) lấy giá trị của cột ở n dòng trước trong cùng cửa sổ. LEAD lấy n dòng sau.",
      "Phải có ORDER BY trong OVER để biết dòng nào là trước, dòng nào là sau.",
      "Dòng đầu tiên sẽ có LAG là NULL (và cuối cùng có LEAD là NULL). Có thể đặt giá trị mặc định làm tham số thứ ba.",
    ],
    syntax: "LAG(cột, 1) OVER (PARTITION BY nhóm ORDER BY thứ_tự)",
    example: {
      sql: "SELECT machine_id, record_time, good_qty,\n       LAG(good_qty) OVER (PARTITION BY machine_id ORDER BY record_time) AS truoc,\n       good_qty - LAG(good_qty) OVER (PARTITION BY machine_id ORDER BY record_time) AS chenh_lech\nFROM production_records\nORDER BY machine_id, record_time\nLIMIT 10;",
      explain: [
        "truoc là good_qty của bản ghi trước đó cùng máy.",
        "chenh_lech là sự thay đổi so với lần trước.",
      ],
    },
    factory: "So sánh sản lượng ca hiện tại với ca trước để phát hiện bất thường.",
    practice: [
      {
        question: "Với mỗi đơn (order_id), lấy record_id, good_qty và good_qty của dòng trước (LAG) theo record_time, cho 10 dòng đầu.",
        hint: "LAG(good_qty) OVER (PARTITION BY order_id ORDER BY record_time), LIMIT 10.",
        solution: "SELECT order_id, record_id, good_qty, LAG(good_qty) OVER (PARTITION BY order_id ORDER BY record_time) AS truoc FROM production_records ORDER BY order_id, record_time LIMIT 10;",
      },
      {
        question: "Lấy order_code, planned_qty và planned_qty của đơn kế tiếp (LEAD) theo start_time, cho 5 dòng đầu.",
        hint: "LEAD(planned_qty) OVER (ORDER BY start_time).",
        solution: "SELECT order_code, planned_qty, LEAD(planned_qty) OVER (ORDER BY start_time) AS ke_tiep FROM production_orders ORDER BY start_time LIMIT 5;",
      },
    ],
    mistakes: [
      "Quên ORDER BY trong OVER nên LAG trả về dòng bất kỳ.",
      "Không xử lý dòng đầu có LAG là NULL khi tính chênh lệch.",
    ],
    quiz: [
      { q: "LAG lấy giá trị ở đâu?", a: "Dòng trước trong cùng cửa sổ." },
      { q: "Vì sao cần ORDER BY trong OVER?", a: "Để xác định thứ tự trước và sau." },
    ],
    summary: [
      "LAG lấy dòng trước, LEAD lấy dòng sau.",
      "Cần ORDER BY để có thứ tự.",
    ],
    next: "Bài 29 tính tổng lũy kế và trung bình trượt với frame.",
  },
  {
    id: "29",
    module: 11,
    title: "Tổng lũy kế và trung bình trượt: ROWS BETWEEN",
    minutes: 60,
    objectives: [
      "Tính tổng lũy kế (running total) bằng SUM OVER với ORDER BY.",
      "Hiểu frame ROWS BETWEEN để giới hạn cửa sổ.",
      "Tính trung bình trượt 7 dòng.",
    ],
    prerequisites: "Đã học LAG/LEAD và window (bài 26 đến 28).",
    explanation: [
      "SUM(cột) OVER (ORDER BY thứ_tự) cho tổng lũy kế từ đầu đến dòng hiện tại.",
      "ROWS BETWEEN n PRECEDING AND CURRENT ROW giới hạn cửa sổ trong n dòng trước và dòng hiện tại, dùng cho trung bình trượt.",
      "Cần sắp xếp đúng theo thời gian để tổng lũy kế và trung bình trượt có ý nghĩa.",
    ],
    syntax: "SUM(cột) OVER (ORDER BY thứ_tự)\nAVG(cột) OVER (ORDER BY thứ_tự ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)",
    example: {
      sql: "SELECT production_date, qty, SUM(qty) OVER (ORDER BY production_date) AS luy_ke\nFROM (SELECT DATE(record_time) AS production_date, SUM(good_qty) AS qty FROM production_records GROUP BY DATE(record_time)) t\nORDER BY production_date\nLIMIT 7;",
      explain: [
        "Derived table tính sản lượng theo ngày.",
        "SUM OVER (ORDER BY ...) cộng dồn từ ngày đầu đến ngày hiện tại.",
      ],
    },
    factory: "Theo dõi sản lượng lũy kế trong tháng và trung bình 7 ngày để nhìn xu hướng.",
    practice: [
      {
        question: "Tính tổng lũy kế good_qty theo record_id cho 10 bản ghi đầu tiên (alias luy_ke).",
        hint: "SUM(good_qty) OVER (ORDER BY record_id), LIMIT 10.",
        solution: "SELECT record_id, good_qty, SUM(good_qty) OVER (ORDER BY record_id) AS luy_ke FROM production_records ORDER BY record_id LIMIT 10;",
      },
      {
        question: "Tính trung bình trượt good_qty của 3 bản ghi gần nhất (dòng hiện tại và 2 dòng trước) theo record_id, cho 10 dòng đầu.",
        hint: "AVG(good_qty) OVER (ORDER BY record_id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW).",
        solution: "SELECT record_id, good_qty, ROUND(AVG(good_qty) OVER (ORDER BY record_id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS tb_truot FROM production_records ORDER BY record_id LIMIT 10;",
      },
    ],
    mistakes: [
      "Quên ORDER BY nên tổng lũy kế không theo thời gian.",
      "Nhầm số dòng trong ROWS BETWEEN: 6 PRECEDING cộng dòng hiện tại là 7 dòng.",
    ],
    quiz: [
      { q: "ROWS BETWEEN 6 PRECEDING AND CURRENT ROW gồm bao nhiêu dòng?", a: "7 dòng (6 dòng trước và dòng hiện tại)." },
      { q: "Tổng lũy kế cần ORDER BY để làm gì?", a: "Để cộng dồn theo đúng thứ tự thời gian." },
    ],
    summary: [
      "SUM OVER (ORDER BY) cho tổng lũy kế.",
      "ROWS BETWEEN giới hạn cửa sổ trượt.",
    ],
    next: "Bài 30 lấy giá trị đầu và cuối trong nhóm bằng FIRST_VALUE và LAST_VALUE.",
  },
  {
    id: "30",
    module: 11,
    title: "FIRST_VALUE và LAST_VALUE",
    minutes: 45,
    objectives: [
      "Lấy giá trị đầu tiên trong cửa sổ bằng FIRST_VALUE.",
      "Lấy giá trị cuối cùng bằng LAST_VALUE và hiểu vì sao cần frame đầy đủ.",
      "Áp dụng cho chuỗi dữ liệu theo nhóm.",
    ],
    prerequisites: "Đã học window và frame (bài 26, 29).",
    explanation: [
      "FIRST_VALUE(cột) trả về giá trị đầu tiên của cửa sổ theo thứ tự ORDER BY.",
      "LAST_VALUE(cột) trả về giá trị cuối cùng, nhưng mặc định frame chỉ đến dòng hiện tại nên thường cần ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING.",
      "Hai hàm này hữu ích khi so sánh một dòng với giá trị đầu hoặc cuối của nhóm, như trạng thái đầu và cuối ca.",
    ],
    syntax: "FIRST_VALUE(cột) OVER (PARTITION BY nhóm ORDER BY thứ_tự)\nLAST_VALUE(cột) OVER (PARTITION BY nhóm ORDER BY thứ_tự ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)",
    example: {
      sql: "SELECT order_id, record_id, good_qty,\n       FIRST_VALUE(good_qty) OVER (PARTITION BY order_id ORDER BY record_time) AS dau_tien\nFROM production_records\nORDER BY order_id, record_time\nLIMIT 10;",
      explain: [
        "Mỗi đơn có một giá trị đầu tiên, lặp lại trên mọi dòng của đơn đó.",
        "So sánh good_qty hiện tại với bản ghi đầu tiên của đơn.",
      ],
    },
    factory: "So sánh sản lượng từng lần ghi nhận với lần đầu tiên của cùng đơn sản xuất.",
    practice: [
      {
        question: "Với mỗi máy, lấy good_qty của bản ghi cuối cùng theo record_time (LAST_VALUE với frame đầy đủ), cho 10 dòng đầu.",
        hint: "LAST_VALUE(good_qty) OVER (PARTITION BY machine_id ORDER BY record_time ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING).",
        solution: "SELECT machine_id, record_time, good_qty, LAST_VALUE(good_qty) OVER (PARTITION BY machine_id ORDER BY record_time ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS cuoi_cung FROM production_records ORDER BY machine_id, record_time LIMIT 10;",
      },
      {
        question: "Với mỗi dây chuyền (line_id), lấy planned_qty của đơn đầu tiên theo start_time (FIRST_VALUE), cho tất cả đơn.",
        hint: "FIRST_VALUE(planned_qty) OVER (PARTITION BY line_id ORDER BY start_time).",
        solution: "SELECT line_id, order_code, planned_qty, FIRST_VALUE(planned_qty) OVER (PARTITION BY line_id ORDER BY start_time) AS dau_tien FROM production_orders;",
      },
    ],
    mistakes: [
      "Dùng LAST_VALUE mặc định nên lấy đúng dòng hiện tại, không phải cuối nhóm.",
      "Quên ORDER BY nên FIRST_VALUE không xác định.",
    ],
    quiz: [
      { q: "Vì sao LAST_VALUE cần frame đầy đủ?", a: "Vì frame mặc định chỉ đến dòng hiện tại." },
      { q: "FIRST_VALUE trả về gì?", a: "Giá trị đầu tiên của cửa sổ theo ORDER BY." },
    ],
    summary: [
      "FIRST_VALUE lấy giá trị đầu nhóm.",
      "LAST_VALUE cần frame đầy đủ.",
    ],
    next: "Bài 31 là bài tổng kết: lấy bản ghi mới nhất của từng nhóm.",
  },
  {
    id: "31",
    module: 11,
    title: "Bản ghi mới nhất của từng nhóm",
    minutes: 60,
    objectives: [
      "Lấy bản ghi mới nhất của từng nhóm bằng ROW_NUMBER.",
      "Hiểu cách dùng DISTINCT ON trong PostgreSQL.",
      "Kết hợp window function với CTE để trả lời câu hỏi báo cáo.",
    ],
    prerequisites: "Đã học ROW_NUMBER (bài 27) và CTE (module 09).",
    explanation: [
      "Câu hỏi 'trạng thái mới nhất của từng máy' là mẫu rất phổ biến. Cách làm: đánh số các bản ghi trong mỗi nhóm theo thời gian giảm dần, rồi giữ số 1.",
      "PostgreSQL có DISTINCT ON (cột) ORDER BY ... giúp lấy dòng đầu tiên của mỗi nhóm, viết ngắn hơn nhưng chỉ dùng được trong PostgreSQL.",
      "Đây là bài tổng kết module: kết hợp CTE, window function và lọc để trả lời một câu hỏi thật.",
    ],
    syntax: "WITH moi_nhat AS (\n  SELECT ..., ROW_NUMBER() OVER (PARTITION BY nhóm ORDER BY thời_gian DESC) AS stt FROM bảng\n)\nSELECT ... FROM moi_nhat WHERE stt = 1;",
    example: {
      sql: "WITH moi_nhat AS (\n  SELECT machine_id, record_time, good_qty,\n         ROW_NUMBER() OVER (PARTITION BY machine_id ORDER BY record_time DESC) AS stt\n  FROM production_records\n)\nSELECT machine_id, record_time, good_qty\nFROM moi_nhat\nWHERE stt = 1;",
      explain: [
        "Mỗi máy có các bản ghi được đánh số từ mới nhất (1) đến cũ hơn.",
        "WHERE stt = 1 giữ đúng bản ghi mới nhất của từng máy.",
      ],
    },
    factory: "Quản lý cần biết trạng thái và sản lượng gần nhất của từng máy để ra quyết định ngay.",
    practice: [
      {
        question: "Với mỗi đơn (order_id), lấy record_id và record_time của bản ghi mới nhất theo record_time (dùng CTE và ROW_NUMBER).",
        hint: "WITH ... ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY record_time DESC) ..., WHERE stt = 1.",
        solution: "WITH xep AS (SELECT order_id, record_id, record_time, ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY record_time DESC) AS stt FROM production_records) SELECT order_id, record_id, record_time FROM xep WHERE stt = 1;",
      },
      {
        question: "Với mỗi dây chuyền (line_id), lấy đơn sản xuất có start_time mới nhất (dùng DISTINCT ON trong PostgreSQL).",
        hint: "SELECT DISTINCT ON (line_id) line_id, order_code, start_time FROM production_orders ORDER BY line_id, start_time DESC.",
        solution: "SELECT DISTINCT ON (line_id) line_id, order_code, start_time FROM production_orders ORDER BY line_id, start_time DESC;",
      },
    ],
    mistakes: [
      "Quên DESC trong ORDER BY nên lấy bản ghi cũ nhất thay vì mới nhất.",
      "Với DISTINCT ON, phần ORDER BY phải bắt đầu bằng cùng cột trong DISTINCT ON.",
    ],
    quiz: [
      { q: "Để lấy bản ghi mới nhất, ORDER BY theo chiều nào?", a: "Giảm dần (DESC) theo thời gian." },
      { q: "DISTINCT ON làm gì?", a: "Giữ một dòng đầu tiên cho mỗi giá trị của cột trong DISTINCT ON." },
    ],
    summary: [
      "Đánh số theo nhóm rồi giữ số 1 để lấy bản ghi mới nhất.",
      "DISTINCT ON là cách ngắn trong PostgreSQL.",
      "Đây là mẫu báo cáo trạng thái hiện tại.",
    ],
    next: "Đã hoàn thành khóa SQL Intermediate. Các bài tập tổng hợp (Challenge) có thể làm tiếp.",
  },
];
