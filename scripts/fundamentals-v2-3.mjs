// Data Fundamentals theo Blueprint v1.0 (đợt 3: bài 09 đến 12). Vietnamese là nội dung chính; English tương ứng.
export const E3 = {
  erd: {
    overview: {
      vi: "Trước khi viết lệnh CREATE TABLE, cần vẽ bản thiết kế để mọi người cùng thống nhất: có những đối tượng nào, mỗi đối tượng có thông tin gì, và chúng liên quan nhau ra sao. Đó là ERD (Entity Relationship Diagram). Giống bản vẽ nhà, người làm nghiệp vụ và người làm kỹ thuật cùng đọc và góp ý trước khi xây. Bài này dạy cách đọc ERD, vẽ ERD cho một bài toán nhà máy, và chuyển ERD thành bảng.",
      en: "Before writing CREATE TABLE commands, draw a blueprint so everyone agrees: which objects exist, what information each holds, and how they relate. That is an ERD (Entity Relationship Diagram). Like a house plan, business and technical staff read it and comment before anything is built. This lesson teaches how to read an ERD, draw one for a factory problem, and turn it into tables.",
    },
    objectives: {
      vi: [
        "Đọc được ký hiệu thực thể, thuộc tính, quan hệ và bản số trên một ERD.",
        "Phân biệt PK và FK trên sơ đồ.",
        "Đọc ERD của bộ dữ liệu nhà máy trong bài này.",
        "Chuyển một quan hệ trên ERD thành khóa ngoại hoặc bảng trung gian.",
      ],
      en: [
        "Read entity, attribute, relationship and cardinality symbols on an ERD.",
        "Tell PK and FK apart on a diagram.",
        "Read the ERD of the factory dataset used in this lesson.",
        "Turn a relationship on an ERD into a foreign key or a junction table.",
      ],
    },
    explanation: {
      vi: "1. Thực thể (entity): đối tượng cần lưu dữ liệu, ví dụ Dây chuyền, Sản phẩm, Lệnh sản xuất, Vật tư. Trong sơ đồ, thực thể là hình chữ nhật.\n2. Thuộc tính (attribute): thông tin mô tả thực thể, ví dụ line_code và line_name của Dây chuyền. Thuộc tính định danh (như line_id) khác với thuộc tính mô tả (như line_name).\n3. Quan hệ (relationship): liên kết giữa các thực thể, ví dụ Dây chuyền chạy Lệnh sản xuất. Quan hệ được vẽ bằng đường nối kèm tên.\n4. Bản số (cardinality) và tính bắt buộc (optionality): đầu mỗi đường nối cho biết mỗi bên liên quan đến bao nhiêu thực thể và có bắt buộc hay không. Ký hiệu Crow's Foot: vạch đứng là 'một', chân chim là 'nhiều', vòng tròn là 'không'.\n5. Ba loại quan hệ như đã học: 1:1, 1:N và N:N. Quan hệ N:N khi chuyển thành bảng cần một bảng trung gian.\n6. Ba mức mô hình: khái niệm (chỉ thực thể và quan hệ), logic (thêm thuộc tính và khóa, không phụ thuộc DBMS) và vật lý (chọn kiểu dữ liệu cụ thể của một DBMS). Bài này tập trung mô hình logic và cách ánh xạ sang bảng.\n7. Quy ước đặt tên: tên bảng và cột viết thường, dùng dấu gạch dưới (snake_case); chọn một cách đặt tên số ít hoặc số nhiều và giữ nhất quán; đánh dấu PK và FK rõ ràng.\n8. Chuyển ERD thành bảng: mỗi thực thể thành một bảng; thuộc tính thành cột; quan hệ 1:N thành khóa ngoại ở phía nhiều; quan hệ N:N thành bảng trung gian với khóa ghép; quan hệ 1:1 thành khóa ngoại đồng thời là khóa chính ở một bên.\n9. Công cụ: draw.io hoặc dbdiagram.io để vẽ; DBeaver hoặc pgAdmin có thể vẽ ERD từ database đã có.\nLưu ý: ERD là bản thiết kế, không phải database đang chạy. ERD không cho biết bảng có bao nhiêu dòng dữ liệu.",
      en: "1. Entity: an object you store data about, for example Production Line, Product, Production Order or Material. It is drawn as a rectangle.\n2. Attribute: information describing an entity, for example line_code and line_name of a line. Identifying attributes (such as line_id) differ from descriptive ones (such as line_name).\n3. Relationship: a link between entities, for example a Production Line runs Production Orders. It is drawn as a line with a label.\n4. Cardinality and optionality: at each end of a line, the marker shows how many entities are involved and whether the relationship is mandatory. Crow's Foot notation: a bar means 'one', a crow's foot means 'many', a circle means 'zero'.\n5. The three relationship types covered earlier: 1:1, 1:N and N:N. An N:N relationship becomes a junction table when converted to tables.\n6. Three levels of model: conceptual (entities and relationships only), logical (adds attributes and keys, independent of any DBMS) and physical (chooses concrete data types for one DBMS). This lesson focuses on the logical model and how it maps to tables.\n7. Naming conventions: table and column names in lowercase with underscores (snake_case); pick singular or plural and stay consistent; mark PK and FK clearly.\n8. Turning an ERD into tables: each entity becomes a table; attributes become columns; a 1:N relationship becomes a foreign key on the many side; an N:N relationship becomes a junction table with a composite key; a 1:1 relationship becomes a foreign key that is also the primary key on one side.\n9. Tools: draw.io or dbdiagram.io for drawing; DBeaver or pgAdmin can draw an ERD from an existing database.\nNote: an ERD is a design, not a running database. It does not tell you how many rows a table holds.",
    },
    extraSections: [
      {
        title: { vi: "Sơ đồ ERD của bộ dữ liệu nhà máy", en: "ERD of the factory dataset" },
        body: {
          vi: "Sơ đồ dưới đây mô tả các đối tượng dùng trong bài này: dây chuyền, sản phẩm, lệnh sản xuất, sản lượng, vật tư và cài đặt dây chuyền.\nDây chuyền chạy nhiều lệnh (1:N). Sản phẩm được sản xuất qua nhiều lệnh (1:N). Lệnh ghi nhận nhiều dòng sản lượng (1:N). Lệnh dùng nhiều vật tư và vật tư nằm trong nhiều lệnh (N:N, qua bảng order_materials). Mỗi dây chuyền có đúng một cài đặt (1:1).\n![Sơ đồ ERD bộ dữ liệu nhà máy](/images/erd-manufacturing.svg)",
          en: "The diagram below shows the objects used in this lesson: lines, products, production orders, output, materials and line settings.\nA line runs many orders (1:N). A product is made through many orders (1:N). An order records many output rows (1:N). An order uses many materials and a material appears in many orders (N:N, through order_materials). Each line has exactly one settings row (1:1).\n![ERD of the factory dataset](/images/erd-manufacturing.svg)",
        },
      },
      {
        title: { vi: "Ứng dụng trong nhà máy", en: "Manufacturing application" },
        body: {
          vi: "Vấn đề nghiệp vụ: trước khi xây báo cáo OEE theo dây chuyền, nhóm phân tích và đội kỹ thuật cần thống nhất các đối tượng và khóa nối, để tránh phải đổi cấu trúc khi báo cáo đã chạy.\nDữ liệu có sẵn: mô tả nghiệp vụ gồm dây chuyền, sản phẩm, lệnh sản xuất, sản lượng, vật tư và dừng máy.\nLogic: vẽ ERD với các quan hệ: dây chuyền 1–N lệnh; sản phẩm 1–N lệnh; lệnh 1–N sản lượng; lệnh N–N vật tư (qua bảng trung gian); dây chuyền 1–1 cài đặt (UPH mục tiêu).\nKết quả mong đợi: cả hai nhóm đọc và đồng ý với sơ đồ; khóa nối của mỗi bảng rõ trước khi viết truy vấn.\nGiá trị kinh doanh: ít phải đổi cấu trúc bảng sau khi báo cáo đã dùng; sai sót về quan hệ được phát hiện trên bản vẽ, rẻ hơn nhiều so với sửa trên dữ liệu thật.",
          en: "Business problem: before building an OEE report by line, the analytics group and the technical team must agree on the objects and join keys, so the structure does not have to change once reports are running.\nAvailable data: a business description covering lines, products, production orders, output, materials and downtime.\nLogic: draw an ERD with these relationships: line 1–N orders; product 1–N orders; order 1–N output; order N–N materials (through a junction table); line 1–1 settings (target UPH).\nExpected result: both groups read the diagram and agree; the join keys of each table are clear before any query is written.\nBusiness value: fewer table changes after reports are in use; relationship mistakes are caught on the drawing, which costs far less than fixing real data.",
        },
      },
      {
        title: { vi: "Tổng kết và bài tiếp theo", en: "Key takeaways and what's next" },
        body: {
          vi: "Tổng kết:\n- ERD gồm thực thể, thuộc tính, quan hệ và bản số.\n- Khóa ngoại nằm ở phía nhiều của quan hệ 1:N; quan hệ N:N cần bảng trung gian.\n- ERD là bản thiết kế logic, không chứa dữ liệu.\nBài tiếp theo: Thiết kế cơ sở dữ liệu. Từ ERD, bài sau hướng dẫn quy trình đầy đủ để biến yêu cầu nghiệp vụ thành một thiết kế hoàn chỉnh.",
          en: "Key takeaways:\n- An ERD contains entities, attributes, relationships and cardinality.\n- In a 1:N relationship the foreign key sits on the many side; an N:N relationship needs a junction table.\n- An ERD is a logical design and holds no data.\nNext lesson: Database Design. Starting from an ERD, the next lesson gives the full process for turning business requirements into a complete design.",
        },
      },
    ],
    practicalExample: {
      vi: "Thực hành: (1) đọc sơ đồ Mermaid bên dưới và liệt kê thực thể, quan hệ và bản số; (2) chạy các câu CREATE TABLE và INSERT; (3) kiểm tra danh sách khóa ngoại trong database. Kết quả mong đợi: có 6 khóa ngoại: production_orders (line_id, product_id), production_output (order_id), order_materials (order_id, material_id) và line_settings (line_id).",
      en: "Hands-on: (1) read the Mermaid diagram below and list the entities, relationships and cardinality; (2) run the CREATE TABLE and INSERT statements; (3) list the foreign keys in the database. Expected result: 6 foreign keys: production_orders (line_id, product_id), production_output (order_id), order_materials (order_id, material_id) and line_settings (line_id).",
    },
    formula: [
      {
        label: "Mermaid",
        code: "erDiagram\n  PRODUCTION_LINES ||--o{ PRODUCTION_ORDERS : chay\n  PRODUCTS ||--o{ PRODUCTION_ORDERS : san_xuat\n  PRODUCTION_ORDERS ||--o{ PRODUCTION_OUTPUT : ghi_nhan\n  PRODUCTION_ORDERS ||--o{ ORDER_MATERIALS : dung\n  MATERIALS ||--o{ ORDER_MATERIALS : duoc_dung\n  PRODUCTION_LINES ||--|| LINE_SETTINGS : co",
      },
      {
        label: "PostgreSQL",
        code: "CREATE TABLE production_lines (\n  line_id   INT PRIMARY KEY,\n  line_code VARCHAR(10) UNIQUE,\n  line_name VARCHAR(50),\n  area      VARCHAR(20)\n);\nCREATE TABLE products (\n  product_id   INT PRIMARY KEY,\n  product_code VARCHAR(10) UNIQUE,\n  product_name VARCHAR(50)\n);\nCREATE TABLE production_orders (\n  order_id    INT PRIMARY KEY,\n  order_no    VARCHAR(20) UNIQUE,\n  line_id     INT NOT NULL REFERENCES production_lines(line_id),\n  product_id  INT NOT NULL REFERENCES products(product_id),\n  planned_qty INT CHECK (planned_qty > 0)\n);\nCREATE TABLE production_output (\n  output_id   INT PRIMARY KEY,\n  order_id    INT NOT NULL REFERENCES production_orders(order_id),\n  output_time TIMESTAMP NOT NULL,\n  shift_code  VARCHAR(5) CHECK (shift_code IN ('A', 'B', 'C')),\n  output_qty  INT CHECK (output_qty >= 0)\n);\nCREATE TABLE materials (\n  material_id   INT PRIMARY KEY,\n  material_code VARCHAR(10) UNIQUE,\n  material_name VARCHAR(50)\n);\nCREATE TABLE order_materials (\n  order_id    INT REFERENCES production_orders(order_id),\n  material_id INT REFERENCES materials(material_id),\n  planned_qty INT,\n  actual_qty  INT,\n  PRIMARY KEY (order_id, material_id)\n);\nCREATE TABLE line_settings (\n  line_id    INT PRIMARY KEY REFERENCES production_lines(line_id),\n  target_uph NUMERIC(6,2)\n);\n\nINSERT INTO production_lines VALUES (1, 'L01', 'Dây chuyền 01', 'Khu A'), (2, 'L02', 'Dây chuyền 02', 'Khu A');\nINSERT INTO products VALUES (1, 'P-001', 'Vỏ nhựa A'), (2, 'P-002', 'Nắp B');\nINSERT INTO production_orders VALUES (1, 'ORD-001', 1, 1, 1000), (2, 'ORD-002', 2, 2, 800);\nINSERT INTO production_output VALUES (1, 1, '2026-11-01 08:00', 'A', 500), (2, 1, '2026-11-01 16:00', 'B', 520);\nINSERT INTO materials VALUES (1, 'M-01', 'Hạt nhựa PP'), (2, 'M-02', 'Keo dán');\nINSERT INTO order_materials VALUES (1, 1, 1000, 980), (1, 2, 50, 48);\nINSERT INTO line_settings VALUES (1, 120.00), (2, 95.50);\n\n-- Kiểm tra: các khóa ngoại trong database\nSELECT tc.table_name, kcu.column_name\nFROM information_schema.table_constraints tc\nJOIN information_schema.key_column_usage kcu\n  ON kcu.constraint_name = tc.constraint_name AND kcu.table_schema = tc.table_schema\nWHERE tc.constraint_type = 'FOREIGN KEY'\nORDER BY tc.table_name, kcu.column_name;",
      },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Quan hệ N:N được triển khai trong cơ sở dữ liệu bằng gì?\nA. Khóa ngoại trong bảng cha\nB. Bảng trung gian có khóa ghép\nC. Khóa tự tăng\nD. Không thể triển khai\n2) (Đúng/Sai) ERD cho biết bảng hiện có bao nhiêu dòng dữ liệu.\n3) (Tình huống) Một máy thuộc đúng một dây chuyền, và một dây chuyền có nhiều máy. Đây là quan hệ nào, và khóa ngoại nằm ở bảng nào?\n4) (Chuyển đổi) Quan hệ 1:1 giữa production_lines và line_settings được ánh xạ thành bảng như thế nào?\n5) (Đọc kết quả) Truy vấn kiểm tra khóa ngoại trong phần thực hành trả về bao nhiêu dòng?",
      en: "1) (Multiple choice) How is an N:N relationship implemented in a database?\nA. A foreign key in the parent table\nB. A junction table with a composite key\nC. An auto-increment key\nD. It cannot be implemented\n2) (True/False) An ERD shows how many data rows a table currently holds.\n3) (Scenario) A machine belongs to exactly one line, and a line has many machines. What is the relationship, and which table holds the foreign key?\n4) (Convert) How is the 1:1 relationship between production_lines and line_settings mapped to tables?\n5) (Read the result) How many rows does the foreign key check query in the hands-on return?",
    },
    answer: {
      vi: "1) B. Bảng trung gian chứa hai khóa ngoại, khóa chính là cặp khóa ghép.\n2) Sai. ERD là bản thiết kế, không chứa số dòng dữ liệu.\n3) Quan hệ 1:N (một dây chuyền, nhiều máy); khóa ngoại line_id nằm ở bảng máy (phía nhiều).\n4) line_settings.line_id vừa là khóa chính vừa là khóa ngoại trỏ đến production_lines.line_id.\n5) 6 dòng.",
      en: "1) B. The junction table holds two foreign keys, and its primary key is the composite pair.\n2) False. An ERD is a design and does not hold row counts.\n3) A 1:N relationship (one line, many machines); the foreign key line_id sits in the machines table, on the many side.\n4) line_settings.line_id is both the primary key and a foreign key referring to production_lines.line_id.\n5) 6 rows.",
    },
  },

  "database-design": {
    overview: {
      vi: "Thiết kế cơ sở dữ liệu là quá trình biến nhu cầu nghiệp vụ thành bảng, khóa, kiểu dữ liệu và ràng buộc. Điều quan trọng nhất là bắt đầu từ câu hỏi 'báo cáo cần gì, và một dòng dữ liệu đại diện cho điều gì', chứ không phải từ việc tạo bảng ngay. Thiết kế tốt giúp dữ liệu đúng, truy vấn nhanh và dễ mở rộng khi nhà máy thêm dây chuyền hoặc loại dữ liệu mới.",
      en: "Database design turns business needs into tables, keys, data types and constraints. The most important starting point is the question 'what must the reports show, and what does one row represent', not creating tables right away. A good design keeps data correct, queries fast, and makes it easy to add lines or new data types later.",
    },
    objectives: {
      vi: [
        "Mô tả các bước của quy trình thiết kế cơ sở dữ liệu.",
        "Thu thập và làm rõ yêu cầu nghiệp vụ.",
        "Xác định thực thể, thuộc tính và grain của bảng.",
        "Thiết kế bảng với PK, FK, kiểu dữ liệu và ràng buộc.",
        "Kiểm thử thiết kế bằng dữ liệu mẫu và truy vấn kiểm tra.",
        "Phân biệt database vận hành (OLTP) với kho dữ liệu.",
      ],
      en: [
        "Describe the steps of the database design process.",
        "Gather and clarify business requirements.",
        "Identify entities, attributes and the grain of each table.",
        "Design tables with PKs, FKs, data types and constraints.",
        "Test a design with sample data and check queries.",
        "Distinguish operational databases (OLTP) from data warehouses.",
      ],
    },
    explanation: {
      vi: "Quy trình gồm tám bước:\n1. Thu thập yêu cầu: ai dùng dữ liệu, để làm gì, cần báo cáo nào (ví dụ OEE theo dây chuyền theo ngày), quy tắc nghiệp vụ nào (ví dụ mỗi lệnh thuộc đúng một dây chuyền).\n2. Xác định grain: một dòng đại diện cho điều gì? Ví dụ: một dòng trong production_output là một lần ghi nhận sản lượng của một lệnh tại một thời điểm và ca. Grain sai dẫn đến cộng nhầm. Hãy ghi grain của mỗi bảng vào data dictionary.\n3. Xác định thực thể và thuộc tính: liệt kê đối tượng và thông tin cần lưu.\n4. Xác định khóa và quan hệ: PK cho mỗi bảng, FK cho quan hệ 1:N, bảng trung gian cho N:N.\n5. Chọn kiểu dữ liệu và ràng buộc: kiểu phù hợp, NOT NULL, UNIQUE, CHECK, DEFAULT và FK.\n6. Chuẩn hóa và rà soát dư thừa: kiểm tra có lặp thông tin và có bất thường không. Với bảng giao dịch, thường đạt đến 3NF.\n7. Vẽ ERD và lập schema: ERD để thống nhất; câu lệnh CREATE TABLE để triển khai.\n8. Kiểm thử bằng dữ liệu mẫu và câu hỏi nghiệp vụ: chạy các truy vấn báo cáo thật, kiểm tra trùng lặp, khóa ngoại thiếu, số âm và grain sai.\nCác điểm cần nhớ thêm:\n- Quy ước đặt tên: snake_case, tên rõ nghĩa, không viết tắt khó hiểu, thống nhất số ít hoặc số nhiều.\n- Cột kiểm toán (audit fields): created_at và updated_at cho biết bản ghi được tạo và sửa khi nào.\n- Giá trị trạng thái (status): dùng tập giá trị cố định, ví dụ 'Planned', 'Running', 'Completed', kiểm soát bằng CHECK.\n- Lịch sử thay đổi: khi cần biết giá trị cũ, phải có cách lưu lịch sử. Bài này chỉ giới thiệu khái niệm.\n- OLTP và kho dữ liệu: database vận hành (OLTP) tối ưu cho ghi và cập nhật từng dòng; kho dữ liệu tối ưu cho đọc và phân tích (bài sau).\n- Đừng bắt đầu bằng việc tạo bảng ngay: nếu chưa có grain và yêu cầu báo cáo, bảng sẽ phải sửa nhiều lần.",
      en: "The process has eight steps:\n1. Gather requirements: who uses the data, for what, which reports are needed (for example OEE by line by day), and which business rules apply (for example each order belongs to exactly one line).\n2. Define the grain: what does one row represent? Example: one row in production_output is one output record of an order at one time and shift. A wrong grain leads to wrong totals. Record the grain of each table in a data dictionary.\n3. Identify entities and attributes: list the objects and the information to keep.\n4. Define keys and relationships: a PK for each table, a FK for each 1:N relationship, a junction table for each N:N.\n5. Choose data types and constraints: suitable types, NOT NULL, UNIQUE, CHECK, DEFAULT and foreign keys.\n6. Normalize and review redundancy: check for repeated facts and anomalies. Transaction tables are usually brought to 3NF.\n7. Draw the ERD and write the schema: the ERD gives agreement; CREATE TABLE statements implement it.\n8. Test with sample data and business questions: run the real report queries and check duplicates, missing foreign keys, negative quantities and wrong grain.\nPoints to remember:\n- Naming convention: snake_case, clear names, no hard-to-read abbreviations, singular or plural used consistently.\n- Audit fields: created_at and updated_at record when a row was created and changed.\n- Status values: use a fixed set, for example 'Planned', 'Running', 'Completed', enforced with CHECK.\n- Change history: if old values must be known, the design needs a way to keep history. This lesson introduces the idea only.\n- OLTP and data warehouses: an operational database (OLTP) is optimized for constant writes and updates; a data warehouse is optimized for reading and analysis (next lesson).\n- Do not start by creating tables: without the grain and the report requirements, tables will need repeated changes.",
    },
    extraSections: [
      {
        title: { vi: "Ứng dụng trong nhà máy", en: "Manufacturing application" },
        body: {
          vi: "Vấn đề nghiệp vụ: nhà máy cần theo dõi lệnh sản xuất, sản lượng theo ca, lỗi chất lượng và thời gian dừng máy, để lập báo cáo OEE theo dây chuyền theo ngày.\nDữ liệu có sẵn: production_lines, products, production_orders, production_output, quality_inspections và downtime_events.\nLogic: grain của production_output là một lần ghi nhận sản lượng của một lệnh tại một thời điểm và ca; quality_inspections là một lần kiểm tra của một lệnh; downtime_events là một sự kiện dừng máy của một dây chuyền. Mỗi bảng có PK, FK và ràng buộc riêng.\nKết quả mong đợi: báo cáo sản lượng và thời gian dừng theo ngày và dây chuyền, không có dòng trùng hay tham chiếu thiếu.\nGiá trị kinh doanh: báo cáo đúng ngay từ đầu, truy vết được lỗi nhập, và mở rộng thêm dây chuyền mà không phải đổi cấu trúc.",
          en: "Business problem: the factory needs to track production orders, output by shift, quality defects and machine downtime, so it can produce an OEE report by line by day.\nAvailable data: production_lines, products, production_orders, production_output, quality_inspections and downtime_events.\nLogic: the grain of production_output is one output record of an order at one time and shift; quality_inspections is one inspection of an order; downtime_events is one downtime event of a line. Each table has its own PK, FKs and constraints.\nExpected result: output and downtime reports by day and line, with no duplicate rows and no missing references.\nBusiness value: correct reports from the start, traceability of entry mistakes, and room to add lines without changing the structure.",
        },
      },
      {
        title: { vi: "Tổng kết và bài tiếp theo", en: "Key takeaways and what's next" },
        body: {
          vi: "Tổng kết:\n- Xác định grain và yêu cầu báo cáo trước khi tạo bảng.\n- Mỗi bảng cần PK, FK, kiểu dữ liệu và ràng buộc được chọn có chủ ý.\n- Kiểm thử bằng dữ liệu mẫu và truy vấn báo cáo thật trước khi đưa vào dùng.\nBài tiếp theo: ETL. Sau khi có thiết kế, dữ liệu từ máy và phần mềm cần được đưa vào các bảng này bằng quy trình ETL.",
          en: "Key takeaways:\n- Define the grain and the report requirements before creating tables.\n- Each table needs deliberately chosen PKs, FKs, data types and constraints.\n- Test with sample data and real report queries before going live.\nNext lesson: ETL. Once the design is ready, data from machines and software must be loaded into these tables through an ETL process.",
        },
      },
    ],
    practicalExample: {
      vi: "Thực hành: (1) viết data dictionary cho production_output, gồm grain và ý nghĩa mỗi cột; (2) chạy DDL và thêm dữ liệu mẫu, trong đó có một dòng bị ghi trùng (double-scan); (3) chạy ba truy vấn kiểm tra: lệnh thiếu dây chuyền, sản lượng âm và dòng trùng theo lệnh, thời điểm và ca. Kết quả mong đợi: truy vấn 1 trả về 0 dòng, truy vấn 2 trả về 0 dòng, truy vấn 3 trả về một dòng: lệnh 1, lúc 2026-11-01 08:00, ca A, xuất hiện 2 lần.",
      en: "Hands-on: (1) write a data dictionary for production_output, covering the grain and the meaning of each column; (2) run the DDL and insert sample data, including one row recorded twice (a double scan); (3) run three check queries: orders without a valid line, negative output, and duplicate rows by order, time and shift. Expected result: query 1 returns 0 rows, query 2 returns 0 rows, query 3 returns one row: order 1, at 2026-11-01 08:00, shift A, appearing 2 times.",
    },
    formula: [
      {
        label: "PostgreSQL",
        code: "-- Data dictionary (một dòng = một lần ghi nhận sản lượng của một lệnh tại một thời điểm và ca)\nCREATE TABLE production_lines (\n  line_id   INT PRIMARY KEY,\n  line_code VARCHAR(10) UNIQUE,\n  line_name VARCHAR(50)\n);\nCREATE TABLE production_orders (\n  order_id    INT PRIMARY KEY,\n  order_no    VARCHAR(20) UNIQUE,\n  line_id     INT NOT NULL REFERENCES production_lines(line_id),\n  planned_qty INT CHECK (planned_qty > 0)\n);\nCREATE TABLE production_output (\n  output_id   INT PRIMARY KEY,\n  order_id    INT NOT NULL REFERENCES production_orders(order_id),\n  output_time TIMESTAMP NOT NULL,\n  shift_code  VARCHAR(5) NOT NULL CHECK (shift_code IN ('A', 'B', 'C')),\n  output_qty  INT NOT NULL CHECK (output_qty >= 0)\n);\n\nINSERT INTO production_lines VALUES (1, 'L01', 'Dây chuyền 01'), (2, 'L02', 'Dây chuyền 02');\nINSERT INTO production_orders VALUES (1, 'ORD-001', 1, 1000), (2, 'ORD-002', 2, 800);\nINSERT INTO production_output VALUES\n  (1, 1, '2026-11-01 08:00', 'A', 500),\n  (2, 1, '2026-11-01 08:00', 'A', 500),  -- ghi trùng do quét hai lần\n  (3, 1, '2026-11-01 16:00', 'B', 520),\n  (4, 2, '2026-11-01 08:00', 'A', 450);\n\n-- Truy vấn 1: lệnh thiếu dây chuyền (không có dòng nào nếu FK đúng)\nSELECT o.order_no\nFROM production_orders o\nLEFT JOIN production_lines l ON l.line_id = o.line_id\nWHERE l.line_id IS NULL;\n\n-- Truy vấn 2: sản lượng âm (không có dòng nếu CHECK đúng)\nSELECT COUNT(*) AS so_dong_am FROM production_output WHERE output_qty < 0;\n\n-- Truy vấn 3: dòng trùng theo lệnh, thời điểm và ca\nSELECT order_id, output_time, shift_code, COUNT(*) AS so_lan\nFROM production_output\nGROUP BY order_id, output_time, shift_code\nHAVING COUNT(*) > 1;",
      },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Bước đầu tiên khi thiết kế cơ sở dữ liệu là gì?\nA. Tạo bảng\nB. Thu thập yêu cầu nghiệp vụ\nC. Viết trigger\nD. Vẽ dashboard\n2) (Đúng/Sai) Có thể bỏ qua việc xác định grain nếu đã có ERD.\n3) (Tình huống) Một báo cáo cộng output_qty của cả bảng production_output cho ra con số quá lớn. Bạn kiểm tra gì trước tiên?\n4) (Phân loại) created_at và updated_at được gọi là gì, và dùng để làm gì?\n5) (Truy vấn) Viết câu SELECT đếm số lệnh có planned_qty nhỏ hơn hoặc bằng 0.",
      en: "1) (Multiple choice) What is the first step of database design?\nA. Create the tables\nB. Gather business requirements\nC. Write triggers\nD. Build the dashboard\n2) (True/False) You can skip defining the grain if you already have an ERD.\n3) (Scenario) A report sums output_qty over the whole production_output table and the total is far too large. What do you check first?\n4) (Classify) What are created_at and updated_at called, and what are they for?\n5) (Query) Write a SELECT that counts orders with planned_qty less than or equal to 0.",
    },
    answer: {
      vi: "1) B. Mọi quyết định thiết kế đều phải bắt nguồn từ yêu cầu báo cáo và quy tắc nghiệp vụ.\n2) Sai. ERD cho thấy cấu trúc, còn grain cho biết mỗi dòng đại diện cho gì; cả hai đều cần.\n3) Kiểm tra grain và dữ liệu trùng: có dòng bị ghi hai lần hoặc một dòng đang được hiểu sai grain. Kiểm tra bằng truy vấn GROUP BY và HAVING COUNT(*) > 1.\n4) Cột kiểm toán (audit fields), ghi thời điểm bản ghi được tạo và được sửa lần cuối.\n5) SELECT COUNT(*) AS so_lenh FROM production_orders WHERE planned_qty <= 0; Kết quả: 0 (CHECK đã chặn từ đầu).",
      en: "1) B. Every design decision must start from the report requirements and business rules.\n2) False. The ERD shows the structure, while the grain says what each row represents; you need both.\n3) Check the grain and duplicate data: a row may have been recorded twice, or the grain may be misunderstood. Check with GROUP BY and HAVING COUNT(*) > 1.\n4) Audit fields: they record when a row was created and last changed.\n5) SELECT COUNT(*) AS order_count FROM production_orders WHERE planned_qty <= 0; Result: 0 (the CHECK constraint blocks such rows).",
    },
  },

  etl: {
    overview: {
      vi: "Dữ liệu sản xuất nằm ở nhiều nơi: MES ghi sản lượng, hệ thống kiểm tra chất lượng ghi kết quả, ERP giữ lệnh sản xuất, và file CSV từ máy. Muốn làm báo cáo, phải đưa tất cả về một chỗ, làm sạch và chuẩn hóa. Quy trình này gọi là ETL: Extract (lấy), Transform (biến đổi) và Load (nạp). Bài này dạy các bước và các lỗi dữ liệu thường gặp. Kho dữ liệu, đích của quy trình, được học ở bài sau.",
      en: "Production data lives in many places: MES records output, the quality system records inspections, the ERP holds production orders, and machines produce CSV files. To build reports, everything must be brought to one place, cleaned and standardized. This process is ETL: Extract, Transform and Load. This lesson teaches the steps and the common data errors. The data warehouse, the usual target, is covered in the next lesson.",
    },
    objectives: {
      vi: [
        "Giải thích ba bước Extract, Transform và Load.",
        "Nhận biết nguồn dữ liệu và hệ thống đích trong một pipeline.",
        "Phân biệt ETL và ELT ở mức cơ bản.",
        "Hiểu full load và incremental load.",
        "Nhận biết các lỗi dữ liệu thường gặp và kiểm tra chất lượng.",
        "Đối soát số dòng sau mỗi lần chạy.",
      ],
      en: [
        "Explain the Extract, Transform and Load steps.",
        "Identify source data and the target system in a pipeline.",
        "Distinguish ETL from ELT at a basic level.",
        "Understand full loads and incremental loads.",
        "Recognize common data errors and quality checks.",
        "Reconcile row counts after each run.",
      ],
    },
    explanation: {
      vi: "1. Extract (lấy dữ liệu): đọc dữ liệu từ nguồn như ERP, MES, cơ sở dữ liệu SQL, file CSV, API hoặc nền tảng IoT. Cần lưu ý quyền truy cập và tần suất lấy.\n2. Transform (làm sạch và biến đổi): chuẩn hóa định dạng ngày; ánh xạ mã (ví dụ 'Line 1' thành 'L01'); xử lý NULL (để trống có chủ ý hoặc gán giá trị mặc định); loại dòng trùng; tính cột mới (ví dụ tỷ lệ NG); kiểm tra quy tắc nghiệp vụ (sản lượng không âm).\n3. Load (nạp): ghi vào bảng đích, theo lô (batch) hoặc gần thời gian thực. Thường nạp qua vùng staging trước.\n4. Staging: vùng tạm lưu dữ liệu ngay sau khi Extract, trước khi Transform. Giúp kiểm tra và chạy lại mà không ảnh hưởng đích, và giữ được bản gốc.\n5. ETL và ELT: ETL biến đổi trước khi nạp vào đích; ELT nạp dữ liệu thô vào kho rồi biến đổi bên trong kho. Lựa chọn phụ thuộc kiến trúc và công cụ, không có cách nào luôn tốt hơn.\n6. Full load và incremental load: full load nạp lại toàn bộ dữ liệu; incremental load chỉ nạp phần mới hoặc thay đổi, dựa trên một mốc như cột thời gian cập nhật (watermark). Incremental nhanh hơn nhưng cần cơ chế nhận biết thay đổi đúng.\n7. Lỗi thường gặp: cùng một dây chuyền được viết khác nhau ('L01', 'l01', ' L01'); ngày giờ theo hai múi giờ; số lượng âm do nhập sai; dòng trùng do gửi lại khi mất mạng; giá trị NULL không được xử lý.\n8. Đối soát (reconciliation): sau mỗi lần chạy, so số dòng nguồn với số dòng đã nạp và số dòng bị loại. Nếu không khớp, phải tìm nguyên nhân trước khi tin báo cáo.\n9. ETL không chỉ là sao chép dữ liệu. Phần Transform cần định nghĩa nghiệp vụ thống nhất, ví dụ 'sản lượng tốt' nghĩa là gì và tính thế nào.\nBài này không hướng dẫn một công cụ điều phối (orchestration) cụ thể.",
      en: "1. Extract: read data from sources such as ERP, MES, SQL databases, CSV files, APIs or IoT platforms. Consider access rights and how often to pull.\n2. Transform: standardize date formats; map codes (for example 'Line 1' to 'L01'); handle NULLs (leave them empty on purpose or assign a default); remove duplicate rows; compute new columns (for example an NG rate); check business rules (output is not negative).\n3. Load: write into the target table, in batches or near real time. Data is often loaded through a staging area first.\n4. Staging: a temporary area that holds data right after Extract and before Transform. It allows checks and re-runs without touching the target, and keeps an untouched copy of the source.\n5. ETL and ELT: ETL transforms before loading into the target; ELT loads raw data into the warehouse and transforms inside it. The choice depends on architecture and tools; neither is always better.\n6. Full load and incremental load: a full load reloads all the data; an incremental load loads only new or changed rows, based on a marker such as an update timestamp (a watermark). Incremental loads are faster but need a reliable way to detect changes.\n7. Common errors: the same line written in different ways ('L01', 'l01', ' L01'); timestamps in two time zones; negative quantities from entry mistakes; duplicate rows from resends after a network drop; NULLs that were never handled.\n8. Reconciliation: after each run, compare source row counts with loaded rows and rejected rows. If they do not match, find the cause before trusting the report.\n9. ETL is more than copying data. The Transform step needs agreed business definitions, for example what 'good output' means and how it is calculated.\nThis lesson does not teach a specific orchestration tool.",
    },
    extraSections: [
      {
        title: { vi: "Ứng dụng trong nhà máy", en: "Manufacturing application" },
        body: {
          vi: "Vấn đề nghiệp vụ: báo cáo sản lượng theo ca phải có sẵn mỗi sáng. Dữ liệu từ MES có mã dây chuyền viết không thống nhất, và có dòng trùng do gửi lại khi mất mạng.\nDữ liệu có sẵn: file xuất từ MES mỗi ca (line_code, record_time, output_qty) và bảng danh mục production_lines.\nLogic: Extract lấy các dòng mới của ca trước (incremental). Staging giữ nguyên bản. Transform đưa mã về dạng chuẩn (viết hoa, bỏ khoảng trắng), loại dòng trùng, loại dòng có sản lượng âm và ghi lại để rà soát. Load vào bảng báo cáo. Đối soát: số dòng nguồn bằng số dòng nạp cộng số dòng bị loại.\nKết quả mong đợi: báo cáo sáng có đủ sản lượng ca trước, mã dây chuyền thống nhất.\nGiá trị kinh doanh: quản lý có số liệu đúng cho họp đầu ca, và biết chính xác dòng nào đã bị loại để xử lý.",
          en: "Business problem: the shift output report must be ready every morning. MES data uses inconsistent line codes and contains duplicate rows from resends after network drops.\nAvailable data: a MES export per shift (line_code, record_time, output_qty) and the production_lines master table.\nLogic: Extract takes only the new rows of the previous shift (incremental). Staging keeps an untouched copy. Transform standardizes codes (uppercase, trimmed), removes duplicate rows, removes rows with negative output and logs them for review. Load writes to the report table. Reconciliation: source rows equal loaded rows plus rejected rows.\nExpected result: the morning report has the full output of the previous shift, with consistent line codes.\nBusiness value: managers have correct numbers for the start-of-shift meeting, and know exactly which rows were rejected and why.",
        },
      },
      {
        title: { vi: "Tổng kết và bài tiếp theo", en: "Key takeaways and what's next" },
        body: {
          vi: "Tổng kết:\n- ETL gồm Extract, Transform và Load; phần Transform quyết định chất lượng dữ liệu.\n- Nạp gia tăng nhanh hơn nạp toàn bộ, nhưng cần cơ chế nhận biết dòng mới.\n- Luôn đối soát số dòng sau mỗi lần chạy.\nBài tiếp theo: Kho dữ liệu (Data Warehouse). Dữ liệu sau ETL được lưu ở đâu, và cấu trúc nào giúp báo cáo nhanh.",
          en: "Key takeaways:\n- ETL is Extract, Transform and Load; the Transform step decides data quality.\n- Incremental loads are faster than full loads but need a way to detect new rows.\n- Always reconcile row counts after each run.\nNext lesson: Data Warehouse. Where the data goes after ETL, and which structure makes reports fast.",
        },
      },
    ],
    practicalExample: {
      vi: "Thực hành: (1) tạo bảng staging_output và nạp sáu dòng thô (có mã không chuẩn, một dòng trùng, một dòng âm); (2) tạo bảng báo cáo bằng SQL biến đổi; (3) đối soát số dòng. Kết quả mong đợi: vùng staging có 6 dòng; bảng báo cáo có 4 dòng (L01 lúc 08:00 = 500, L01 lúc 16:00 = 520, L02 lúc 08:00 = 450, L03 lúc 16:00 = 300); số dòng bị loại là 2 (một dòng trùng, một dòng âm).",
      en: "Hands-on: (1) create the staging_output table and load six raw rows (non-standard codes, one duplicate, one negative); (2) build the report table with a transforming SQL statement; (3) reconcile row counts. Expected result: staging has 6 rows; the report table has 4 rows (L01 at 08:00 = 500, L01 at 16:00 = 520, L02 at 08:00 = 450, L03 at 16:00 = 300); 2 rows are rejected (one duplicate, one negative).",
    },
    formula: [
      {
        label: "PostgreSQL",
        code: "-- Extract: dữ liệu thô từ file MES đã nạp vào vùng staging (giữ nguyên bản gốc)\nCREATE TABLE staging_output (\n  line_code   VARCHAR(20),\n  record_time TIMESTAMP,\n  output_qty  INT\n);\nINSERT INTO staging_output VALUES\n  ('L01', '2026-11-01 08:00', 500),\n  (' l01 ', '2026-11-01 16:00', 520),\n  ('L02', '2026-11-01 08:00', 450),\n  ('L02', '2026-11-01 08:00', 450),\n  ('L03', '2026-11-01 08:00', -20),\n  ('L03', '2026-11-01 16:00', 300);\n\n-- Transform + Load: chuẩn hóa mã, loại dòng trùng, loại sản lượng âm\nCREATE TABLE report_output AS\nSELECT DISTINCT UPPER(TRIM(line_code)) AS line_code, record_time, output_qty\nFROM staging_output\nWHERE output_qty >= 0;\n\n-- Đối soát: số dòng nguồn, số dòng đích, số dòng bị loại\nSELECT\n  (SELECT COUNT(*) FROM staging_output) AS dong_nguon,\n  (SELECT COUNT(*) FROM report_output) AS dong_dich,\n  (SELECT COUNT(*) FROM staging_output) - (SELECT COUNT(*) FROM report_output) AS dong_bi_loai;\n\nSELECT line_code, record_time, output_qty FROM report_output ORDER BY line_code, record_time;",
      },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Bước nào đọc dữ liệu từ hệ thống nguồn?\nA. Extract\nB. Transform\nC. Load\nD. Đối soát\n2) (Đúng/Sai) Nạp gia tăng (incremental load) luôn bảo đảm không thiếu dòng nào.\n3) (Tình huống) Sau khi chạy ETL, đích ít hơn nguồn 5 dòng. Bạn làm gì trước khi tin báo cáo?\n4) (Truy vấn) Viết câu SELECT chuẩn hóa line_code (viết hoa và bỏ khoảng trắng) từ bảng staging_output.\n5) (Phân tích) Vì sao nên lưu dữ liệu thô vào vùng staging trước khi biến đổi?",
      en: "1) (Multiple choice) Which step reads data from the source system?\nA. Extract\nB. Transform\nC. Load\nD. Reconciliation\n2) (True/False) An incremental load always guarantees that no row is missing.\n3) (Scenario) After an ETL run, the target has 5 fewer rows than the source. What do you do before trusting the report?\n4) (Query) Write a SELECT that standardizes line_code (uppercase and trimmed) from staging_output.\n5) (Analysis) Why store the raw data in staging before transforming it?",
    },
    answer: {
      vi: "1) A. Extract đọc dữ liệu từ nguồn.\n2) Sai. Nạp gia tăng phụ thuộc vào cách nhận biết dòng mới; nếu cơ chế đó sai, vẫn có thể thiếu dòng. Cần đối soát.\n3) Tìm nguyên nhân: dòng bị loại ở Transform, dòng trùng, lỗi kết nối khi Extract, hoặc mốc incremental bị sai. Ghi nhận, sửa, rồi đối soát lại trước khi dùng báo cáo.\n4) SELECT UPPER(TRIM(line_code)) AS line_code, record_time, output_qty FROM staging_output;\n5) Để kiểm tra, chạy lại được khi Transform lỗi, và không mất dữ liệu gốc. Bản gốc là căn cứ để đối soát.",
      en: "1) A. Extract reads data from the source.\n2) False. Incremental loading depends on how new rows are detected; if that logic is wrong, rows can still be missing. Reconcile to check.\n3) Find the cause: rows rejected in Transform, duplicates, a connection failure during Extract, or a wrong incremental marker. Record it, fix it, and reconcile again before using the report.\n4) SELECT UPPER(TRIM(line_code)) AS line_code, record_time, output_qty FROM staging_output;\n5) So the step can be checked and re-run if Transform fails, without losing the original data. The untouched copy is the basis for reconciliation.",
    },
  },

  "data-warehouse": {
    overview: {
      vi: "Database hằng ngày được ghi liên tục khi máy chạy, còn câu hỏi như 'so sánh sản lượng quý này với cùng kỳ năm trước' cần đọc và tổng hợp rất nhiều dữ liệu lịch sử. Kho dữ liệu (Data Warehouse) gom dữ liệu từ nhiều nguồn, làm sạch, giữ lịch sử và được tổ chức để phân tích. Bài này giới thiệu OLTP và OLAP, mô hình sao gồm fact và dimension, và vai trò của kho trong BI.",
      en: "A daily database is written constantly while machines run, but a question such as 'compare this quarter's output with the same quarter last year' must read and aggregate a lot of historical data. A data warehouse gathers data from many sources, cleans it, keeps its history and is organized for analysis. This lesson introduces OLTP and OLAP, the star schema made of fact and dimension tables, and the warehouse's role in BI.",
    },
    objectives: {
      vi: [
        "Định nghĩa Data Warehouse và nêu bốn đặc điểm của nó.",
        "Phân biệt operational database (OLTP) với Data Warehouse (OLAP).",
        "Hiểu fact table, dimension table và star schema.",
        "Nhận biết grain của một fact table.",
        "Hiểu luồng dữ liệu từ hệ thống nguồn qua ETL vào kho.",
        "Liên hệ kho dữ liệu với Power BI và Manufacturing Analytics.",
      ],
      en: [
        "Define a data warehouse and state its four characteristics.",
        "Distinguish an operational database (OLTP) from a data warehouse (OLAP).",
        "Understand fact tables, dimension tables and the star schema.",
        "Recognize the grain of a fact table.",
        "Understand the data flow from source systems through ETL into the warehouse.",
        "Relate a data warehouse to Power BI and manufacturing analytics.",
      ],
    },
    explanation: {
      vi: "1. Data Warehouse là hệ thống dữ liệu được tổ chức cho phân tích và báo cáo, với bốn đặc điểm: hướng chủ đề (theo sản xuất, chất lượng, nhân sự chứ không theo phần mềm nguồn); tích hợp (một tên chung cho mã dây chuyền từ mọi hệ thống); giữ lịch sử theo thời gian; và ít khi sửa dữ liệu đã nạp.\n2. OLTP và OLAP: OLTP (xử lý giao dịch) là database vận hành, có nhiều thao tác ghi nhỏ, cập nhật từng dòng, cần nhanh và đúng từng giao dịch. OLAP (xử lý phân tích) là kho dữ liệu, ít ghi, nhiều truy vấn đọc và tổng hợp trên khối lượng lớn.\n3. Fact table (bảng sự kiện): chứa số đo, ví dụ fact_production_output với output_qty và ng_qty, fact_downtime với số phút dừng.\n4. Dimension table (bảng chiều): chứa ngữ cảnh để nhóm và lọc, ví dụ dim_date, dim_line, dim_product, dim_shift.\n5. Star schema (mô hình sao): fact ở trung tâm, các dimension xung quanh. Đơn giản, dễ truy vấn, phù hợp với công cụ BI.\n6. Grain: mỗi dòng của fact đại diện cho điều gì, ví dụ một dòng là sản lượng của một dây chuyền, một sản phẩm, một ca và một ngày. Phải xác định grain trước khi chọn số đo và dimension. Cộng số đo sai grain sẽ cho kết quả sai.\n7. Các loại số đo: additive (cộng được theo mọi chiều, như output_qty); semi-additive (cộng được theo một số chiều, như tồn kho cộng theo sản phẩm nhưng không cộng theo thời gian); non-additive (không cộng được, như tỷ lệ NG: phải tính lại từ tổng NG chia tổng mẫu).\n8. Lịch sử thay đổi và slowly changing dimension: khi thuộc tính dimension đổi (ví dụ dây chuyền chuyển khu), kho có thể ghi đè hoặc giữ lịch sử. Bài này chỉ giới thiệu khái niệm.\n9. Data mart và tầng báo cáo: data mart là phần nhỏ của kho cho một bộ phận, ví dụ Data Mart Sản xuất. Tầng báo cáo định nghĩa các chỉ số thống nhất để mọi dashboard dùng chung một công thức.\n10. Không phải database lớn nào cũng là kho dữ liệu. Điều quyết định là mục đích: phân tích, giữ lịch sử và tích hợp nhiều nguồn.",
      en: "1. A data warehouse is a data system organized for analysis and reporting, with four characteristics: subject-oriented (organized around production, quality or staffing rather than the source software); integrated (one shared name for a line code across all systems); time-variant (keeps history); and rarely changed once loaded.\n2. OLTP and OLAP: OLTP (transaction processing) is an operational database with many small writes and row-level updates, where each transaction must be fast and correct. OLAP (analytical processing) is a warehouse with few writes and many reads that aggregate large volumes.\n3. Fact table: holds measures, for example fact_production_output with output_qty and ng_qty, or fact_downtime with stop minutes.\n4. Dimension table: holds the context used to group and filter, for example dim_date, dim_line, dim_product, dim_shift.\n5. Star schema: facts in the centre, dimensions around them. Simple, easy to query and well suited to BI tools.\n6. Grain: what one fact row represents, for example one line, one product, one shift and one day. Define the grain before choosing measures and dimensions. Adding measures at the wrong grain gives wrong results.\n7. Types of measures: additive (can be summed across every dimension, such as output_qty); semi-additive (summed across some dimensions only, such as stock levels, which can be summed across products but not across time); non-additive (cannot be summed, such as an NG rate: recalculate it from total NG divided by total sample).\n8. Change history and slowly changing dimensions: when a dimension attribute changes (for example a line moves to another area), the warehouse can overwrite the old value or keep history. This lesson introduces the idea only.\n9. Data marts and the reporting layer: a data mart is a smaller part of the warehouse for one department, for example a Production data mart. The reporting layer defines shared metrics so every dashboard uses the same formula.\n10. Not every large database is a data warehouse. What matters is the purpose: analysis, history and integration of several sources.",
    },
    extraSections: [
      {
        title: { vi: "Ứng dụng trong nhà máy", en: "Manufacturing application" },
        body: {
          vi: "Vấn đề nghiệp vụ: quản lý muốn so sánh sản lượng và tỷ lệ NG theo dây chuyền, theo tháng, qua nhiều ngày và ca.\nDữ liệu có sẵn: sản lượng từ MES, kết quả kiểm tra từ hệ thống chất lượng, và các danh mục dây chuyền, sản phẩm, ca, ngày.\nLogic: fact_production_output có grain là một dòng = sản lượng của một dây chuyền, một sản phẩm, một ca và một ngày; liên kết với dim_date, dim_line, dim_product và dim_shift. Tỷ lệ NG được tính từ tổng NG chia tổng mẫu (non-additive).\nKết quả mong đợi: bảng so sánh theo tháng và dây chuyền, sẵn sàng vẽ biểu đồ.\nGiá trị kinh doanh: thấy xu hướng qua nhiều tháng mà không cần ghép file thủ công; mọi dashboard dùng cùng một định nghĩa tỷ lệ NG.",
          en: "Business problem: managers want to compare output and NG rate by line and by month, across many days and shifts.\nAvailable data: output from MES, inspection results from the quality system, and the master lists of lines, products, shifts and dates.\nLogic: fact_production_output has the grain of one row = the output of one line, one product, one shift and one day; it links to dim_date, dim_line, dim_product and dim_shift. The NG rate is calculated from total NG divided by total sample (non-additive).\nExpected result: a comparison table by month and line, ready to chart.\nBusiness value: trends over several months without merging files by hand; every dashboard uses the same NG rate definition.",
        },
      },
      {
        title: { vi: "Tổng kết và bài tiếp theo", en: "Key takeaways and what's next" },
        body: {
          vi: "Tổng kết:\n- Kho dữ liệu gom, làm sạch và giữ lịch sử để phân tích.\n- Mô hình sao gồm bảng fact (số đo) và bảng dimension (ngữ cảnh).\n- Kho được tối ưu để đọc; database vận hành được tối ưu để ghi.\nBạn đã hoàn thành khóa Data Fundamentals. Bước tiếp theo là khóa SQL Basic, nơi bạn thực hành các truy vấn trên dữ liệu nhà máy.",
          en: "Key takeaways:\n- A data warehouse gathers, cleans and keeps history for analysis.\n- The star schema has fact tables (measures) and dimension tables (context).\n- A warehouse is optimized for reading; an operational database is optimized for writing.\nYou have completed Data Fundamentals. The next step is the SQL Basic course, where you practice these queries on factory data.",
        },
      },
    ],
    practicalExample: {
      vi: "Thực hành: (1) tạo ba bảng dimension và một bảng fact theo mô hình sao; (2) nạp năm dòng fact; (3) tính sản lượng tốt và tỷ lệ NG theo dây chuyền và tháng. Kết quả mong đợi: L01 tháng 2026-10 có sản lượng tốt 1900, tỷ lệ NG 2.36%; L02 tháng 2026-10 có sản lượng tốt 930, tỷ lệ NG 8.46%.",
      en: "Hands-on: (1) create three dimension tables and one fact table as a star schema; (2) load five fact rows; (3) compute good output and NG rate by line and month. Expected result: L01 in 2026-10 has good output 1900 and NG rate 2.36%; L02 in 2026-10 has good output 930 and NG rate 8.46%.",
    },
    formula: [
      {
        label: "PostgreSQL",
        code: "CREATE TABLE dim_date (\n  date_key   INT PRIMARY KEY,\n  full_date  DATE,\n  year_month VARCHAR(7)\n);\nCREATE TABLE dim_line (\n  line_key  INT PRIMARY KEY,\n  line_code VARCHAR(10)\n);\nCREATE TABLE dim_product (\n  product_key  INT PRIMARY KEY,\n  product_code VARCHAR(10)\n);\nCREATE TABLE dim_shift (\n  shift_key  INT PRIMARY KEY,\n  shift_code VARCHAR(5)\n);\n-- Grain: một dòng = sản lượng của một dây chuyền, một sản phẩm, một ca, một ngày\nCREATE TABLE fact_production_output (\n  date_key    INT REFERENCES dim_date(date_key),\n  line_key    INT REFERENCES dim_line(line_key),\n  product_key INT REFERENCES dim_product(product_key),\n  shift_key   INT REFERENCES dim_shift(shift_key),\n  output_qty  INT,\n  ng_qty      INT\n);\n\nINSERT INTO dim_date VALUES (1, '2026-10-05', '2026-10'), (2, '2026-10-06', '2026-10');\nINSERT INTO dim_line VALUES (1, 'L01'), (2, 'L02');\nINSERT INTO dim_product VALUES (1, 'P-001'), (2, 'P-002');\nINSERT INTO dim_shift VALUES (1, 'A'), (2, 'B');\nINSERT INTO fact_production_output VALUES\n  (1, 1, 1, 1, 500, 10),\n  (1, 1, 1, 2, 460, 14),\n  (2, 1, 1, 1, 940, 22),\n  (1, 2, 2, 1, 450, 46),\n  (2, 2, 2, 2, 480, 40);\n\nSELECT l.line_code,\n       d.year_month,\n       SUM(f.output_qty) AS san_luong_tot,\n       ROUND(100.0 * SUM(f.ng_qty) / SUM(f.output_qty + f.ng_qty), 2) AS ty_le_ng_pct\nFROM fact_production_output f\nJOIN dim_line l ON l.line_key = f.line_key\nJOIN dim_date d ON d.date_key = f.date_key\nGROUP BY l.line_code, d.year_month\nORDER BY l.line_code;",
      },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Bảng nào trong mô hình sao chứa số đo như sản lượng?\nA. Bảng chiều (dimension)\nB. Bảng sự kiện (fact)\nC. Bảng nhật ký đăng nhập\nD. Bảng khóa chính\n2) (Đúng/Sai) Kho dữ liệu được tối ưu để ghi và cập nhật từng dòng liên tục.\n3) (Tình huống) Quản lý muốn xem xu hướng NG của một dây chuyền trong ba năm. Nên dùng database vận hành hay kho dữ liệu? Vì sao?\n4) (Phân tích) Có thể tính tỷ lệ NG của cả tháng bằng cách cộng các tỷ lệ NG theo ngày không? Vì sao?\n5) (Truy vấn) Viết câu SELECT tính tổng output_qty theo dây chuyền từ fact_production_output và dim_line.",
      en: "1) (Multiple choice) Which table in a star schema holds measures such as output?\nA. Dimension table\nB. Fact table\nC. Login log table\nD. Primary key table\n2) (True/False) A data warehouse is optimized for constant row-level writes and updates.\n3) (Scenario) Managers want the NG trend of one line over three years. Should you use an operational database or a warehouse, and why?\n4) (Analysis) Can you get the NG rate for a whole month by adding up the daily NG rates? Why?\n5) (Query) Write a SELECT that sums output_qty per line from fact_production_output and dim_line.",
    },
    answer: {
      vi: "1) B. Bảng fact chứa số đo; bảng dimension chứa ngữ cảnh để nhóm và lọc.\n2) Sai. Kho dữ liệu được tối ưu để đọc và tổng hợp; database vận hành mới được tối ưu cho ghi và cập nhật liên tục.\n3) Kho dữ liệu, vì cần lịch sử nhiều năm và truy vấn tổng hợp trên khối lượng lớn.\n4) Không. Tỷ lệ NG là non-additive. Phải tính lại từ tổng NG chia tổng mẫu của cả tháng, không lấy trung bình các tỷ lệ theo ngày.\n5) SELECT l.line_code, SUM(f.output_qty) AS san_luong_tot FROM fact_production_output f JOIN dim_line l ON l.line_key = f.line_key GROUP BY l.line_code ORDER BY l.line_code; Kết quả: L01 = 1900, L02 = 930.",
      en: "1) B. The fact table holds measures; dimension tables hold the context used to group and filter.\n2) False. A warehouse is optimized for reading and aggregation; an operational database is optimized for constant writes and updates.\n3) A data warehouse, because the question needs several years of history and aggregation over large volumes.\n4) No. An NG rate is non-additive. Recalculate it from the month's total NG divided by total sample, not by averaging the daily rates.\n5) SELECT l.line_code, SUM(f.output_qty) AS good_output FROM fact_production_output f JOIN dim_line l ON l.line_key = f.line_key GROUP BY l.line_code ORDER BY l.line_code; Result: L01 = 1900, L02 = 930.",
    },
  },
};
