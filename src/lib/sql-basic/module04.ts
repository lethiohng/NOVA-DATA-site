import type { BasicLesson } from "./types";

/* Module 1 — SQL Basic Queries: SELECT, chọn cột, DISTINCT, alias, LIMIT, NULL, comment. */

export const module04: BasicLesson[] = [
  {
    id: "1",
    module: 4,
    title: "Giới thiệu SQL và câu truy vấn đầu tiên",
    minutes: 45,
    objectives: [
      "Hiểu SQL là ngôn ngữ để hỏi dữ liệu trong database.",
      "Nhận biết statement, keyword, identifier và dấu chấm phẩy.",
      "Viết và chạy được câu SELECT đầu tiên.",
    ],
    prerequisites: "Chưa cần kiến thức SQL trước đó. Biết dùng máy tính và trình duyệt là đủ.",
    explanation: [
      "SQL (Structured Query Language) là ngôn ngữ dùng để giao tiếp với database. Bạn đặt câu hỏi bằng một câu lệnh, database trả về một bảng kết quả.",
      "Một câu lệnh SQL gọi là statement. Trong đó có keyword (từ khóa như SELECT, FROM) do SQL định nghĩa sẵn, identifier (tên bảng, tên cột như products, product_name) do bạn hoặc hệ thống đặt, và literal (giá trị cụ thể như 'LINE-A' hoặc 100). Câu lệnh kết thúc bằng dấu chấm phẩy ;.",
      "Câu lệnh cơ bản nhất có dạng SELECT ... FROM ...: SELECT chọn cái gì để xem, FROM cho biết lấy từ bảng nào. Viết SQL giống như đọc câu tiếng Anh: 'chọn cột này, từ bảng kia'.",
    ],
    syntax: "SELECT tên_cột FROM tên_bảng;",
    example: {
      sql: "SELECT line_code, line_name FROM production_lines;",
      explain: [
        "SELECT line_code, line_name: lấy hai cột mã dây chuyền và tên dây chuyền.",
        "FROM production_lines: lấy dữ liệu từ bảng production_lines.",
        "Kết quả là một bảng có một dòng cho mỗi dây chuyền.",
      ],
    },
    factory: "Nếu có người hỏi bạn muốn xem nhanh danh sách dây chuyền đang có. Đây là câu hỏi SQL đơn giản nhất bạn có thể viết.",
    practice: [
      {
        question: "Lấy toàn bộ dữ liệu của bảng products (sản phẩm).",
        hint: "Dùng SELECT * FROM tên_bảng; dấu * nghĩa là tất cả các cột.",
        solution: "SELECT * FROM products;",
      },
      {
        question: "Lấy mã dây chuyền (line_number) và tên dây chuyền (line_name) từ bảng production_lines.",
        hint: "Liệt kê hai tên cột, cách nhau bằng dấu phẩy, sau SELECT.",
        solution: "SELECT line_code, line_name FROM production_lines;",
      },
    ],
    mistakes: [
      "Quên dấu chấm phẩy ở cuối câu (nhiều công cụ vẫn chạy được, nhưng nên quen viết).",
      "Gõ sai tên bảng hoặc tên cột. Database báo lỗi 'does not exist'; kiểm tra lại chính tả.",
      "Viết FROM trước SELECT. SQL bắt buộc theo thứ tự SELECT rồi FROM.",
    ],
    quiz: [
      { q: "Keyword nào dùng để chọn cột và keyword nào cho biết bảng nguồn?", a: "SELECT chọn cột; FROM chỉ bảng nguồn." },
      { q: "Dấu * trong SELECT * FROM products nghĩa là gì?", a: "Lấy tất cả các cột của bảng products." },
    ],
    summary: [
      "SQL là ngôn ngữ hỏi dữ liệu trong database.",
      "Câu cơ bản: SELECT cột FROM bảng;",
      "Dùng * để lấy tất cả các cột.",
    ],
    next: "Bài 2 xem toàn bộ dữ liệu của một bảng, và cách đọc kết quả.",
  },
  {
    id: "2",
    module: 4,
    title: "SELECT * và đọc kết quả truy vấn",
    minutes: 45,
    objectives: [
      "Dùng SELECT * để xem toàn bộ bảng.",
      "Đọc được kết quả gồm tên cột và các dòng dữ liệu.",
      "Biết khi nào nên dùng SELECT * và khi nào nên tránh.",
    ],
    prerequisites: "Đã học bài 1 về câu SELECT ... FROM.",
    explanation: [
      "SELECT * lấy tất cả các cột của bảng. Đây là cách nhanh nhất để xem cấu trúc và dữ liệu mẫu của một bảng lạ.",
      "Kết quả gồm một hàng tiêu đề (tên các cột) và các dòng dữ liệu. Mỗi dòng là một bản ghi, ví dụ một máy, một nhân viên.",
      "Trong công việc thật, tránh SELECT * khi bảng có nhiều cột hoặc rất nhiều dòng, vì kết quả chậm và khó đọc. Khi đó chỉ chọn các cột cần dùng (bài 3).",
    ],
    syntax: "SELECT * FROM tên_bảng;",
    example: {
      sql: "SELECT * FROM machines;",
      explain: [
        "Lấy toàn bộ cột của bảng machines: mã máy, tên máy, dây chuyền, loại máy và chu kỳ lý tưởng.",
        "Mỗi dòng là một máy trong nhà máy.",
      ],
    },
    factory: "Kỹ sư mới vào nhà máy muốn xem bảng máy để biết có những thông tin gì trước khi viết báo cáo.",
    practice: [
      {
        question: "Xem toàn bộ bảng employees (nhân viên).",
        hint: "Dùng SELECT * FROM tên_bảng;",
        solution: "SELECT * FROM employees;",
      },
      {
        question: "Xem toàn bộ bảng downtime_reasons (lý do dừng máy).",
        hint: "Cấu trúc giống hệt câu trên, chỉ đổi tên bảng.",
        solution: "SELECT * FROM downtime_reasons;",
      },
    ],
    mistakes: [
      "Dùng SELECT * trên bảng production_records (hàng chục nghìn dòng) mà không giới hạn số dòng, làm kết quả rất dài.",
      "Nhầm tên bảng số nhiều và số ít (ví dụ machine thay vì machines).",
    ],
    quiz: [
      { q: "SELECT * có ý nghĩa gì?", a: "Lấy tất cả các cột của bảng." },
      { q: "Vì sao không nên dùng SELECT * trên mọi bảng?", a: "Vì bảng lớn trả về quá nhiều dữ liệu, chậm và khó đọc; chỉ nên chọn cột cần dùng." },
    ],
    summary: [
      "SELECT * FROM bảng lấy toàn bộ cột.",
      "Kết quả có tên cột ở đầu và mỗi dòng là một bản ghi.",
      "Với bảng lớn, chỉ chọn cột cần thiết.",
    ],
    next: "Bài 3 chọn đúng những cột bạn cần.",
  },
  {
    id: "3",
    module: 4,
    title: "Chọn cột cần thiết và thứ tự cột",
    minutes: 45,
    objectives: [
      "Liệt kê các cột cụ thể sau SELECT.",
      "Hiểu thứ tự cột trong SELECT quyết định thứ tự hiển thị.",
      "Đặt tên cột trong SELECT đúng chính tả.",
    ],
    prerequisites: "Đã học SELECT và FROM (bài 1, 2).",
    explanation: [
      "Thay vì dùng *, bạn liệt kê tên các cột cần lấy, cách nhau bằng dấu phẩy. Kết quả chỉ có những cột đó.",
      "Thứ tự cột trong SELECT chính là thứ tự hiển thị. Nếu viết SELECT product_name, product_code thì tên sản phẩm sẽ hiện trước mã.",
      "Lấy ít cột giúp kết quả gọn và truy vấn nhanh hơn. Đây là thói quen tốt khi làm việc với bảng lớn.",
    ],
    syntax: "SELECT cột1, cột2, cột3 FROM tên_bảng;",
    example: {
      sql: "SELECT machine_code, machine_name, ideal_cycle_sec FROM machines;",
      explain: [
        "Chỉ lấy ba cột: mã máy, tên máy và chu kỳ lý tưởng.",
        "Các cột hiện đúng theo thứ tự đã viết trong SELECT.",
      ],
    },
    factory: "Trưởng ca cần danh sách máy kèm chu kỳ lý tưởng để so với thực tế, không cần các thông tin khác.",
    practice: [
      {
        question: "Lấy product_code và product_name từ bảng products.",
        hint: "Viết hai tên cột sau SELECT, cách nhau bằng dấu phẩy.",
        solution: "SELECT product_code, product_name FROM products;",
      },
      {
        question: "Lấy full_name và role của nhân viên từ bảng employees.",
        hint: "Tương tự, nhưng bảng là employees.",
        solution: "SELECT full_name, role FROM employees;",
      },
    ],
    mistakes: [
      "Quên dấu phẩy giữa các cột, ví dụ SELECT line_code line_name.",
      "Dấu phẩy thừa ở cuối danh sách cột, trước FROM.",
    ],
    quiz: [
      { q: "Thứ tự cột trong SELECT ảnh hưởng gì?", a: "Ảnh hưởng thứ tự các cột hiện ra trong kết quả." },
      { q: "Muốn lấy hai cột line_code và location thì viết thế nào?", a: "SELECT line_code, location FROM production_lines;" },
    ],
    summary: [
      "Liệt kê cột cụ thể thay vì dùng *.",
      "Các cột cách nhau bằng dấu phẩy.",
      "Thứ tự trong SELECT là thứ tự hiển thị.",
    ],
    next: "Bài 4 loại bỏ các giá trị trùng lặp với DISTINCT.",
  },
  {
    id: "4",
    module: 4,
    title: "DISTINCT: loại bỏ giá trị trùng lặp",
    minutes: 45,
    objectives: [
      "Dùng DISTINCT để lấy các giá trị khác nhau.",
      "Hiểu DISTINCT trên nhiều cột xét theo tổ hợp các cột.",
      "Phân biệt kết quả có và không có DISTINCT.",
    ],
    prerequisites: "Đã học chọn cột với SELECT (bài 3).",
    explanation: [
      "Khi một cột có nhiều giá trị lặp lại, DISTINCT giúp chỉ hiện mỗi giá trị một lần. Ví dụ bảng máy có nhiều máy cùng loại Press.",
      "Đặt DISTINCT ngay sau SELECT. Nếu viết DISTINCT trên nhiều cột thì SQL so sánh theo tổ hợp: hai dòng chỉ bị coi là trùng khi tất cả các cột được chọn đều giống nhau.",
      "DISTINCT đôi khi làm kết quả chậm hơn với bảng rất lớn, nên chỉ dùng khi cần danh sách giá trị duy nhất.",
    ],
    syntax: "SELECT DISTINCT tên_cột FROM tên_bảng;",
    example: {
      sql: "SELECT DISTINCT machine_type FROM machines;",
      explain: [
        "Kết quả chỉ có ba loại máy: Assembly, CNC và Press, mỗi loại một dòng.",
        "Nếu bỏ DISTINCT, mỗi máy sẽ có một dòng và giá trị bị lặp lại.",
      ],
    },
    factory: "Bộ phận bảo trì muốn biết nhà máy có những loại máy nào để lập kế hoạch dự phòng.",
    practice: [
      {
        question: "Liệt kê các location khác nhau của dây chuyền trong bảng production_lines.",
        hint: "Thêm DISTINCT ngay sau SELECT.",
        solution: "SELECT DISTINCT location FROM production_lines;",
      },
      {
        question: "Liệt kê các role duy nhất của nhân viên trong bảng employees.",
        hint: "Bảng là employees, cột là role.",
        solution: "SELECT DISTINCT role FROM employees;",
      },
    ],
    mistakes: [
      "Tưởng DISTINCT xóa dữ liệu gốc. Nó chỉ lọc kết quả hiển thị, bảng không thay đổi.",
      "Viết DISTINCT sau tên cột thay vì trước, ví dụ SELECT machine_type DISTINCT.",
    ],
    quiz: [
      { q: "DISTINCT có làm thay đổi dữ liệu trong bảng không?", a: "Không. Nó chỉ loại trùng trong kết quả trả về." },
      { q: "Câu SELECT DISTINCT line_code FROM production_orders trả về gì?", a: "Danh sách các mã dây chuyền khác nhau có đơn sản xuất." },
    ],
    summary: [
      "DISTINCT loại bỏ các dòng trùng trong kết quả.",
      "Đặt DISTINCT ngay sau SELECT.",
      "Không làm thay đổi dữ liệu gốc.",
    ],
    next: "Bài 5 đặt tên hiển thị mới cho cột bằng alias.",
  },
  {
    id: "5",
    module: 4,
    title: "Alias: đặt tên hiển thị cho cột",
    minutes: 45,
    objectives: [
      "Đặt alias cho cột bằng từ khóa AS.",
      "Dùng dấu nháy kép khi tên alias có khoảng trắng hoặc tiếng Việt.",
      "Phân biệt tên cột gốc và tên hiển thị.",
    ],
    prerequisites: "Đã học chọn cột với SELECT (bài 3).",
    explanation: [
      "Alias là tên tạm thời hiển thị trong kết quả. Viết tên_cột AS tên_mới. Alias không đổi tên cột trong bảng gốc.",
      "Nếu tên alias có khoảng trắng hoặc dấu tiếng Việt, đặt trong dấu nháy kép, ví dụ AS \"Tên sản phẩm\".",
      "Alias giúp báo cáo dễ đọc hơn. Bạn cũng có thể dùng alias để đặt tên cho các phép tính, sẽ gặp lại ở module tổng hợp.",
      "Bí danh bảng (table alias) là tên ngắn đặt cho một bảng ngay sau tên bảng trong FROM, ví dụ FROM production_records r. Từ đó, r.record_id nghĩa là cột record_id của bảng production_records. Bí danh bảng giúp câu lệnh ngắn hơn, nhất là khi sau này bạn ghép nhiều bảng bằng JOIN.",
      "Ví dụ: SELECT r.record_id, r.total_qty FROM production_records r WHERE r.total_qty > 50; Ở đây r là bí danh của production_records, và cả câu lệnh chỉ cần viết r. trước mỗi tên cột.",
    ],
    syntax: "SELECT tên_cột AS tên_hiển_thị FROM tên_bảng;",
    example: {
      sql: "SELECT product_name AS ten_san_pham, standard_cycle_sec AS chu_ky_chuan FROM products;",
      explain: [
        "Cột product_name hiện với tên ten_san_pham, cột standard_cycle_sec hiện với tên chu_ky_chuan.",
        "Bảng products không thay đổi, chỉ tên hiển thị trong kết quả thay đổi.",
      ],
    },
    factory: "Báo cáo gửi cho ban giám đốc cần tên cột rõ ràng bằng tiếng Việt, không dùng tên kỹ thuật trong database.",
    practice: [
      {
        question: "Hiển thị cột full_name với tên \"Họ tên\" trong bảng employees.",
        hint: "Dùng AS và đặt \"Họ tên\" trong dấu nháy kép.",
        solution: 'SELECT full_name AS "Họ tên" FROM employees;',
      },
      {
        question: "Lấy machine_name là \"Máy\" và ideal_cycle_sec là \"Chu kỳ lý tưởng\" từ bảng machines.",
        hint: "Hai cột, mỗi cột một AS riêng.",
        solution: 'SELECT machine_name AS "Máy", ideal_cycle_sec AS "Chu kỳ lý tưởng" FROM machines;',
      },
    ],
    mistakes: [
      "Dùng dấu nháy đơn cho alias ('Họ tên'). Dấu nháy đơn dùng cho giá trị chuỗi, còn tên cột dùng nháy kép.",
      "Nghĩ alias đổi tên cột trong bảng. Thực tế chỉ đổi tên hiển thị.",
    ],
    quiz: [
      { q: "Khi nào phải đặt alias trong nháy kép?", a: "Khi tên có khoảng trắng hoặc ký tự đặc biệt như dấu tiếng Việt." },
      { q: "Alias có đổi tên cột trong bảng gốc không?", a: "Không, chỉ đổi tên hiển thị trong kết quả." },
    ],
    summary: [
      "AS đặt tên hiển thị cho cột.",
      "Dùng nháy kép cho alias có khoảng trắng hoặc tiếng Việt.",
      "Bảng gốc không thay đổi.",
      "Bí danh bảng đặt sau tên bảng trong FROM, ví dụ FROM production_records r, rồi dùng r.tên_cột.",
    ],
    next: "Bài 6 giới hạn số dòng với LIMIT và OFFSET.",
  },
  {
    id: "6",
    module: 4,
    title: "LIMIT và OFFSET: giới hạn số dòng",
    minutes: 45,
    objectives: [
      "Dùng LIMIT để lấy một số dòng nhất định.",
      "Dùng OFFSET để bỏ qua các dòng đầu.",
      "Hiểu vì sao cần ORDER BY khi phân trang.",
    ],
    prerequisites: "Đã học SELECT và chọn cột (bài 1 đến 3).",
    explanation: [
      "LIMIT n chỉ lấy n dòng đầu tiên của kết quả. Rất hữu ích khi bảng có hàng chục nghìn dòng, như production_records.",
      "OFFSET m bỏ qua m dòng đầu, thường dùng với LIMIT để phân trang: trang 2 với 10 dòng mỗi trang là LIMIT 10 OFFSET 10.",
      "Muốn kết quả ổn định khi phân trang, thêm ORDER BY để xác định thứ tự dòng. Không có ORDER BY, database có thể trả về các dòng theo thứ tự bất kỳ. Bài 17 sẽ học ORDER BY chi tiết.",
    ],
    syntax: "SELECT ... FROM tên_bảng ORDER BY cột LIMIT n OFFSET m;",
    example: {
      sql: "SELECT record_id, record_time, total_qty FROM production_records ORDER BY record_id LIMIT 10;",
      explain: [
        "ORDER BY record_id sắp xếp các bản ghi theo mã tăng dần.",
        "LIMIT 10 chỉ lấy 10 dòng đầu tiên sau khi sắp xếp.",
      ],
    },
    factory: "Kỹ sư kiểm tra dữ liệu sản xuất chỉ cần xem 10 bản ghi đầu tiên để kiểm tra định dạng, không cần tải toàn bộ bảng.",
    practice: [
      {
        question: "Lấy 5 dòng đầu của bảng products, sắp xếp theo product_id.",
        hint: "Dùng ORDER BY product_id rồi LIMIT 5.",
        solution: "SELECT * FROM products ORDER BY product_id LIMIT 5;",
      },
      {
        question: "Bỏ qua 2 dòng đầu, lấy 3 dòng tiếp theo của products, sắp xếp theo product_id.",
        hint: "Thêm OFFSET 2 sau LIMIT 3.",
        solution: "SELECT * FROM products ORDER BY product_id LIMIT 3 OFFSET 2;",
      },
    ],
    mistakes: [
      "Dùng LIMIT mà không có ORDER BY rồi tưởng kết quả luôn cố định.",
      "Đặt OFFSET trước LIMIT. Thứ tự đúng là LIMIT rồi OFFSET.",
    ],
    quiz: [
      { q: "LIMIT 10 OFFSET 20 trả về những dòng nào?", a: "Các dòng từ 21 đến 30 (sau khi sắp xếp)." },
      { q: "Vì sao cần ORDER BY khi dùng LIMIT để phân trang?", a: "Để thứ tự dòng ổn định giữa các lần truy vấn." },
    ],
    summary: [
      "LIMIT giới hạn số dòng trả về.",
      "OFFSET bỏ qua các dòng đầu.",
      "Thêm ORDER BY để kết quả ổn định.",
    ],
    next: "Bài 7 làm việc với giá trị NULL, tức là dữ liệu bị thiếu.",
  },
  {
    id: "7",
    module: 4,
    title: "NULL: giá trị bị thiếu",
    minutes: 60,
    objectives: [
      "Hiểu NULL là giá trị thiếu hoặc chưa biết, khác với 0 và chuỗi rỗng.",
      "Kiểm tra NULL bằng IS NULL và IS NOT NULL.",
      "Biết vì sao không dùng = NULL.",
    ],
    prerequisites: "Đã học SELECT và FROM. Bài này dùng WHERE, sẽ học chi tiết ở bài 11.",
    explanation: [
      "NULL nghĩa là không có giá trị, chưa biết hoặc chưa nhập. NULL không phải số 0 và cũng không phải chuỗi rỗng ''.",
      "Không so sánh NULL bằng dấu =, vì kết quả của NULL = NULL là không xác định. Thay vào đó dùng IS NULL để tìm giá trị thiếu, và IS NOT NULL để tìm giá trị có.",
      "Trong bảng employees, nhân viên chưa được xếp ca có shift_id là NULL. Khi tính toán, NULL thường bị bỏ qua trong các hàm tổng hợp (sẽ học ở module 3).",
    ],
    syntax: "SELECT ... FROM tên_bảng WHERE cột IS NULL;\nSELECT ... FROM tên_bảng WHERE cột IS NOT NULL;",
    example: {
      sql: "-- Nhân viên chưa có ca\nSELECT full_name, shift_id FROM employees WHERE shift_id IS NULL;\n\n-- Nhân viên đã có ca\nSELECT full_name, shift_id FROM employees WHERE shift_id IS NOT NULL;",
      explain: [
        "IS NULL: lấy các dòng có shift_id là NULL, tức là nhân viên chưa có ca. Cột shift_id hiện trống.",
        "IS NOT NULL: lấy các dòng có shift_id có giá trị, tức là nhân viên đã được xếp ca.",
        "Không viết WHERE shift_id = NULL vì câu đó không trả về dòng nào.",
      ],
    },
    factory: "Phòng nhân sự cần tìm những nhân viên chưa được xếp ca làm để sắp xếp lại lịch trước tuần mới.",
    practice: [
      {
        question: "Tìm nhân viên chưa có ca làm (shift_id là NULL) trong bảng employees, chỉ lấy cột full_name.",
        hint: "Dùng WHERE shift_id IS NULL.",
        solution: "SELECT full_name FROM employees WHERE shift_id IS NULL;",
      },
      {
        question: "Liệt kê machine_code của các máy có machine_type không NULL (có giá trị).",
        hint: "Dùng IS NOT NULL thay cho IS NULL.",
        solution: "SELECT machine_code FROM machines WHERE machine_type IS NOT NULL;",
      },
    ],
    mistakes: [
      "Viết WHERE shift_id = NULL. Câu này không trả về dòng nào; phải dùng IS NULL.",
      "Nhầm NULL với 0 hoặc chuỗi rỗng, dẫn tới kết quả sai khi lọc.",
    ],
    quiz: [
      { q: "Vì sao không viết WHERE cột = NULL?", a: "Vì so sánh với NULL không cho kết quả đúng; phải dùng IS NULL." },
      { q: "NULL có bằng 0 không?", a: "Không. NULL nghĩa là không có giá trị, khác với số 0." },
    ],
    summary: [
      "NULL là giá trị thiếu, không phải 0 hay chuỗi rỗng.",
      "Dùng IS NULL và IS NOT NULL để kiểm tra.",
      "Không dùng dấu = với NULL.",
    ],
    next: "Bài 9 ghi chú trong câu lệnh bằng comment.",
  },
  {
    id: "8",
    module: 4,
    title: "Chuỗi rỗng (blank) khác NULL thế nào?",
    minutes: 45,
    objectives: [
      "Phân biệt chuỗi rỗng '' với NULL.",
      "Tìm được cả ô rỗng và ô NULL trong một cột.",
      "Hiểu khoảng trắng không phải là chuỗi rỗng.",
    ],
    prerequisites: "Đã học NULL (bài 7) và WHERE (bài 11).",
    explanation: [
      "Chuỗi rỗng '' là một giá trị có thật: đó là chuỗi không có ký tự nào. Nó khác NULL, vì NULL nghĩa là không có giá trị gì cả.",
      "Trong dữ liệu nhập tay, một ô để trống có thể được lưu là '' hoặc NULL tùy hệ thống. Vì vậy, khi tìm ô trống, nên kiểm tra cả hai trường hợp.",
      "So sánh với chuỗi rỗng dùng dấu =. So sánh với NULL dùng IS NULL. Khoảng trắng ' ' cũng không phải chuỗi rỗng: dùng TRIM để bỏ khoảng trắng trước khi so sánh.",
    ],
    syntax: "SELECT ... FROM tên_bảng WHERE cột = '';\nSELECT ... FROM tên_bảng WHERE cột IS NULL OR cột = '';",
    example: {
      sql: "SELECT '' = '' AS hai_chuoi_rong_giong_nhau,\n       '' IS NULL AS chuoi_rong_la_null,\n       NULL IS NULL AS null_la_null;",
      explain: [
        "'' = '' cho kết quả TRUE vì hai chuỗi rỗng giống nhau.",
        "'' IS NULL cho kết quả FALSE: chuỗi rỗng có tồn tại, không phải NULL.",
        "NULL IS NULL cho kết quả TRUE.",
      ],
    },
    factory: "Nhân viên nhập liệu có người để trống ô ghi chú, có hệ thống lưu thành NULL. Báo cáo kiểm tra thiếu dữ liệu phải đếm được cả hai trường hợp.",
    practice: [
      {
        question: "Đếm số dây chuyền có location là NULL hoặc chuỗi rỗng trong bảng production_lines.",
        hint: "Dùng WHERE location IS NULL OR location = ''.",
        solution: "SELECT COUNT(*) FROM production_lines WHERE location IS NULL OR location = '';",
      },
      {
        question: "Viết câu trả về một dòng gồm: chuỗi rỗng (AS chuoi_rong), độ dài của nó (AS do_dai) và kết quả '' IS NULL (AS la_null).",
        hint: "Liệt kê ba biểu thức cách nhau bằng dấu phẩy sau SELECT, đặt AS cho từng cột. Độ dài dùng hàm LENGTH.",
        solution: "SELECT '' AS chuoi_rong, LENGTH('') AS do_dai, '' IS NULL AS la_null;",
      },
    ],
    mistakes: [
      "Tưởng '' và NULL giống nhau, nên tìm ô rỗng bằng IS NULL và bỏ sót các dòng là ''.",
      "Viết WHERE cột = NULL: câu này không trả về dòng nào; phải dùng IS NULL.",
      "Quên TRIM: ô chỉ có khoảng trắng ' ' không phải chuỗi rỗng, nên không khớp với = ''.",
    ],
    quiz: [
      { q: "'' có bằng NULL không?", a: "Không. '' là chuỗi rỗng có thật; NULL là không có giá trị." },
      { q: "Muốn tìm cả ô NULL và ô rỗng thì viết điều kiện thế nào?", a: "WHERE cột IS NULL OR cột = ''." },
    ],
    summary: [
      "Chuỗi rỗng '' khác NULL.",
      "Tìm cả hai bằng IS NULL OR cột = ''.",
      "Khoảng trắng cần TRIM trước khi so sánh.",
    ],
    next: "Bài tiếp theo là các toán tử so sánh trong WHERE.",
  },
  {
    id: "9",
    module: 4,
    title: "Comment: ghi chú trong câu lệnh",
    minutes: 30,
    objectives: [
      "Viết comment một dòng với --.",
      "Viết comment nhiều dòng với /* */.",
      "Biết comment không ảnh hưởng đến kết quả truy vấn.",
    ],
    prerequisites: "Đã học câu SELECT cơ bản (bài 1).",
    explanation: [
      "Comment là ghi chú trong câu SQL, database bỏ qua và không chạy phần đó. Dùng comment để ghi mục đích câu truy vấn, để đồng đội hiểu nhanh.",
      "Comment một dòng bắt đầu bằng hai dấu gạch --, đến cuối dòng. Comment nhiều dòng đặt trong /* và */.",
      "Nên comment các truy vấn dùng lại nhiều lần, hoặc các câu có điều kiện phức tạp.",
    ],
    syntax: "-- ghi chú một dòng\n/* ghi chú nhiều dòng */",
    example: {
      sql: "-- Danh sách dây chuyền\nSELECT line_code, line_name FROM production_lines;\n/* Câu trên chỉ lấy mã và tên,\n   không lấy địa điểm */",
      explain: [
        "Dòng đầu là comment một dòng, mô tả câu truy vấn.",
        "Khối /* */ là comment nhiều dòng; database bỏ qua toàn bộ nội dung trong đó.",
      ],
    },
    factory: "Một truy vấn báo cáo OEE được nhiều người dùng lại. Ghi chú rõ ràng giúp người mới hiểu công thức và nguồn dữ liệu.",
    practice: [
      {
        question: "Thêm comment -- Danh sách sản phẩm phía trên câu lấy toàn bộ bảng products.",
        hint: "Dòng đầu là comment bắt đầu bằng --, dòng sau là câu SELECT.",
        solution: "-- Danh sách sản phẩm\nSELECT * FROM products;",
      },
      {
        question: "Dùng /* */ để comment toàn bộ câu lấy machine_code, machine_name từ machines, và câu vẫn chạy được.",
        hint: "Đặt /* ở đầu và */ ở cuối một đoạn, nhưng đừng bỏ phần SELECT thật.",
        solution: "/* Danh sách máy */ SELECT machine_code, machine_name FROM machines;",
      },
    ],
    mistakes: [
      "Comment cả câu SELECT nên không có gì để chạy. Chỉ comment phần chú thích, giữ lại câu lệnh.",
      "Quên đóng */ sau comment nhiều dòng, làm câu lệnh bị lỗi.",
    ],
    quiz: [
      { q: "Comment một dòng viết thế nào?", a: "Bắt đầu bằng hai dấu gạch --." },
      { q: "Comment có ảnh hưởng đến kết quả truy vấn không?", a: "Không. Database bỏ qua phần comment." },
    ],
    summary: [
      "-- là comment một dòng.",
      "/* */ là comment nhiều dòng.",
      "Comment giúp người khác hiểu câu lệnh.",
    ],
    next: "Bài 10 ôn tập toàn bộ module SELECT.",
  },
  {
    id: "10",
    module: 4,
    title: "Ôn tập SELECT: mini challenge",
    minutes: 60,
    objectives: [
      "Kết hợp SELECT, DISTINCT, alias, LIMIT, NULL và comment trong một câu.",
      "Tự viết truy vấn từ yêu cầu nghiệp vụ.",
      "Kiểm tra kết quả có đúng yêu cầu hay không.",
    ],
    prerequisites: "Đã học các bài 1 đến 8.",
    explanation: [
      "Bài ôn tập này không có lý thuyết mới. Bạn sẽ kết hợp các kiến thức đã học để trả lời các yêu cầu nghiệp vụ thực tế.",
      "Khi gặp một yêu cầu, hãy làm theo thứ tự: xác định bảng cần lấy, liệt kê cột cần hiển thị, quyết định có cần DISTINCT, alias, LIMIT hay không.",
    ],
    syntax: "-- Mẫu tổng hợp\nSELECT DISTINCT cột AS tên_hiển_thị FROM bảng ORDER BY cột LIMIT n;",
    example: {
      sql: "-- Các loại gia đình sản phẩm đang có\nSELECT DISTINCT product_family AS ho_san_pham FROM products;",
      explain: [
        "Kết hợp DISTINCT để loại trùng và alias để đặt tên hiển thị.",
        "Kết quả là danh sách các họ sản phẩm khác nhau.",
      ],
    },
    factory: "Trước cuộc họp đầu tuần, trưởng ca cần nhanh chóng biết các ca làm đang có và một vài bản ghi sản xuất mới nhất.",
    practice: [
      {
        question: "Liệt kê các tên ca (shift_name) có trong bảng shifts, không trùng.",
        hint: "Dùng SELECT DISTINCT shift_name FROM shifts.",
        solution: "SELECT DISTINCT shift_name FROM shifts;",
      },
      {
        question: "Lấy 10 bản ghi production_records đầu tiên (theo record_id), chỉ hiển thị record_id, record_time và total_qty, đặt alias total_qty là \"Tổng số lượng\".",
        hint: "Dùng ORDER BY record_id, LIMIT 10 và AS cho cột total_qty.",
        solution: 'SELECT record_id, record_time, total_qty AS "Tổng số lượng" FROM production_records ORDER BY record_id LIMIT 10;',
      },
    ],
    mistakes: [
      "Quên ORDER BY khi dùng LIMIT, khiến kết quả không ổn định.",
      "Dùng DISTINCT trên quá nhiều cột, làm mất ý nghĩa của phép loại trùng.",
    ],
    quiz: [
      { q: "Muốn lấy 5 dòng đầu có thứ tự ổn định, cần kết hợp những gì?", a: "ORDER BY và LIMIT 5." },
      { q: "Khi nào nên đặt alias trong nháy kép?", a: "Khi tên hiển thị có khoảng trắng hoặc dấu tiếng Việt." },
    ],
    summary: [
      "Kết hợp các câu lệnh cơ bản để giải một yêu cầu.",
      "Luôn kiểm tra lại cột, số dòng và thứ tự trong kết quả.",
    ],
    next: "Module 2 học cách lọc dữ liệu bằng WHERE và sắp xếp bằng ORDER BY.",
  },
];
