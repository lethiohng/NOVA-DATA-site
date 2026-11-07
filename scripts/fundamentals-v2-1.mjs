// Data Fundamentals theo Blueprint v1.0 (đợt 1: bài 01 đến 04). Vietnamese là nội dung chính; English tương ứng.
export const E1 = {
  database: {
    overview: {
      vi: "Trong một nhà máy, mỗi ngày phát sinh hàng trăm con số: sản lượng từng ca, số sản phẩm lỗi, thời gian máy dừng. Nếu các con số này nằm rải rác trong nhiều file Excel, không ai trả lời nhanh được câu hỏi như 'hôm qua dây chuyền nào ra ít sản lượng nhất'. Bài này giúp bạn hình dung bức tranh tổng thể: dữ liệu là gì, database và DBMS khác nhau thế nào, và dữ liệu đi từ nhà máy đến báo cáo BI ra sao. Bài này không yêu cầu kiến thức trước.",
      en: "In a factory, hundreds of numbers are produced every day: output per shift, defective products, machine downtime. If these numbers sit in many scattered Excel files, nobody can quickly answer a question such as 'which line produced the least output yesterday'. This lesson gives you the big picture: what data is, how a database and a DBMS differ, and how data flows from the factory to BI reports. No prior knowledge is needed.",
    },
    objectives: {
      vi: [
        "Định nghĩa được dữ liệu (Data), cơ sở dữ liệu (Database) và hệ quản trị cơ sở dữ liệu (DBMS), và phân biệt ba khái niệm này.",
        "Giải thích vì sao doanh nghiệp cần quản lý dữ liệu có hệ thống thay vì dùng nhiều file rời rạc.",
        "So sánh vai trò của Excel và Database trong công việc hằng ngày.",
        "Nhận biết table, row, column và SQL ở mức nhập môn.",
        "Mô tả luồng dữ liệu cơ bản từ nhà máy đến báo cáo BI.",
      ],
      en: [
        "Define data, a database and a DBMS, and tell the three apart.",
        "Explain why a business needs systematically managed data instead of many scattered files.",
        "Compare the roles of Excel and a database in everyday work.",
        "Recognize tables, rows, columns and SQL at an introductory level.",
        "Describe the basic data flow from the factory to BI reports.",
      ],
    },
    explanation: {
      vi: "1. Dữ liệu (Data) là thông tin thô được ghi lại từ máy móc, ERP, MES, kiểm tra chất lượng, cảm biến và nhân viên vận hành. Ví dụ: 'Dây chuyền L01 làm được 520 sản phẩm tốt ngày 02/11/2026'.\nLưu ý: một con số đứng riêng như 520 chưa đủ để ra quyết định. Cần biết nó thuộc dây chuyền nào, ngày nào và ca nào.\n2. Cơ sở dữ liệu (Database) là tập hợp dữ liệu được tổ chức có hệ thống, để có thể lưu trữ, truy xuất, cập nhật và quản lý khi cần. Ví dụ: một bảng ghi sản lượng với các cột line, output_date và output là một phần của database.\n3. Hệ quản trị cơ sở dữ liệu (DBMS) là phần mềm quản lý database: tạo cấu trúc, ghi dữ liệu, truy vấn, kiểm soát quyền truy cập và bảo vệ dữ liệu. Ví dụ: PostgreSQL, MySQL, SQL Server, Oracle.\nPhân biệt: database là nơi chứa dữ liệu, còn DBMS là phần mềm quản lý nơi chứa đó. Trong thực tế, người ta hay gọi chung là database.\n4. Vì sao cần database thay cho nhiều file Excel:\n- Nhiều người cùng dùng: Excel dễ ghi đè lẫn nhau; database có cơ chế kiểm soát khi nhiều người làm việc cùng lúc.\n- Khối lượng: Excel chậm khi có hàng trăm nghìn dòng; database xử lý dữ liệu lớn hơn nhiều.\n- Tính nhất quán: database có thể chặn dữ liệu sai ngay khi nhập (học ở bài Constraints).\n- Tích hợp: dữ liệu từ nhiều nguồn được gom về một chỗ để so sánh.\nLưu ý: database không tự làm sạch dữ liệu hay tự đảm bảo chất lượng. Chất lượng đến từ thiết kế bảng, quy tắc nhập liệu và quy trình quản lý.\n5. Table, row, column: bảng (table) gồm các cột (column) mô tả thuộc tính, và mỗi hàng (row) là một bản ghi. Khóa chính và kiểu dữ liệu sẽ học ở các bài sau.\n6. SQL (Structured Query Language) là ngôn ngữ làm việc với database: SELECT để đọc, INSERT để thêm, UPDATE để sửa, DELETE để xóa và CREATE để tạo bảng.",
      en: "1. Data is raw information recorded from machines, ERP, MES, quality checks, sensors and operators. Example: 'Line L01 produced 520 good units on 2 Nov 2026'.\nNote: a single number such as 520 is not enough for a decision. You also need to know which line, which day and which shift it belongs to.\n2. A database is a systematically organized collection of data, stored so it can be retrieved, updated and managed when needed. Example: a table of output records with the columns line, output_date and output is part of a database.\n3. A DBMS (Database Management System) is the software that manages a database: it creates structures, writes data, runs queries, controls access and protects data. Examples: PostgreSQL, MySQL, SQL Server, Oracle.\nDistinction: the database is where the data is kept; the DBMS is the software that manages that storage. In practice people often say 'database' for both.\n4. Why use a database instead of many Excel files:\n- Many users: Excel files overwrite each other easily; a database controls simultaneous work.\n- Volume: Excel slows down at hundreds of thousands of rows; a database handles far more data.\n- Consistency: a database can reject wrong data at entry (covered in the Constraints lesson).\n- Integration: data from several sources is gathered in one place for comparison.\nNote: a database does not clean data or guarantee quality by itself. Quality comes from table design, entry rules and management processes.\n5. Table, row, column: a table holds columns that describe attributes, and each row is one record. Keys and data types are covered in later lessons.\n6. SQL (Structured Query Language) works with databases: SELECT reads, INSERT adds, UPDATE changes, DELETE removes and CREATE builds tables.",
    },
    extraSections: [
      {
        title: { vi: "Ứng dụng trong nhà máy", en: "Manufacturing application" },
        body: {
          vi: "Vấn đề nghiệp vụ: quản lý ca muốn biết sản lượng của từng dây chuyền trong ngày để điều chỉnh kế hoạch ca sau.\nDữ liệu có sẵn: sản lượng được ghi theo dây chuyền và ngày vào bảng production_output (id, line, output_date, output).\nLogic xử lý: nhóm các dòng theo line và cộng cột output; kết quả là tổng sản lượng của từng dây chuyền.\nKết quả mong đợi: một dòng cho mỗi dây chuyền, kèm tổng sản lượng.\nGiá trị kinh doanh: báo cáo có trong vài giây thay vì ghép nhiều file Excel. Dữ liệu này cũng là nguồn cho dashboard BI.\nLuồng dữ liệu: máy và MES ghi sản lượng → database lưu bảng production_output → SQL tổng hợp theo dây chuyền → dashboard BI → quyết định điều chỉnh ca.",
          en: "Business problem: the shift manager wants each line's output for the day to adjust the next shift's plan.\nAvailable data: output is recorded per line and per day in the production_output table (id, line, output_date, output).\nProcessing logic: group the rows by line and sum the output column; the result is the total output of each line.\nExpected result: one row per line with its total output.\nBusiness value: the report is ready in seconds instead of merging several Excel files. The same data feeds BI dashboards.\nData flow: machines and MES record output → the database stores the production_output table → SQL aggregates by line → BI dashboard → decision to adjust the shift.",
        },
      },
      {
        title: { vi: "Tổng kết và bài tiếp theo", en: "Key takeaways and what's next" },
        body: {
          vi: "Tổng kết:\n- Dữ liệu là thông tin thô; database tổ chức dữ liệu để dùng lại.\n- DBMS là phần mềm quản lý database.\n- Excel phù hợp với phân tích nhỏ; database phù hợp khi nhiều người cùng dùng và dữ liệu lớn.\n- Mọi báo cáo BI đều bắt đầu từ dữ liệu có cấu trúc.\nBài tiếp theo: Hệ quản trị cơ sở dữ liệu (DBMS). Bài sau giải thích DBMS làm những việc gì, và vì sao công cụ BI nên dùng tài khoản chỉ đọc.",
          en: "Key takeaways:\n- Data is raw information; a database organizes it so it can be reused.\n- A DBMS is the software that manages a database.\n- Excel suits small analyses; a database suits many users and large data.\n- Every BI report starts from structured data.\nNext lesson: Database Management Systems (DBMS). It explains what a DBMS does, and why a BI tool should use a read-only account.",
        },
      },
    ],
    practicalExample: {
      vi: "Thực hành: (1) tạo bảng production_output với bốn cột id, line, output_date, output; (2) thêm năm dòng dữ liệu mẫu; (3) xem toàn bộ bảng; (4) tính tổng sản lượng theo dây chuyền bằng GROUP BY. Kết quả mong đợi: L01 = 1020 (500 + 520), L02 = 450, L03 = 600. Bảng này là phiên bản đơn giản để làm quen; từ bài 03 trở đi, dữ liệu được tách thành nhiều bảng.",
      en: "Hands-on: (1) create the production_output table with four columns: id, line, output_date, output; (2) insert five sample rows; (3) view the whole table; (4) sum output per line with GROUP BY. Expected result: L01 = 1020 (500 + 520), L02 = 450, L03 = 600. This table is a simplified version for getting started; from lesson 03 onward the data is split into several tables.",
    },
    formula: [
      {
        label: "PostgreSQL",
        code: "CREATE TABLE production_output (\n  id          INT PRIMARY KEY,\n  line        VARCHAR(10),\n  output_date DATE,\n  output      INT\n);\n\nINSERT INTO production_output (id, line, output_date, output) VALUES\n  (1, 'L01', '2026-11-01', 500),\n  (2, 'L01', '2026-11-02', 520),\n  (3, 'L02', '2026-11-01', 450),\n  (4, 'L03', '2026-11-01', 300),\n  (5, 'L03', '2026-11-02', 300);\n\nSELECT id, line, output_date, output\nFROM production_output\nORDER BY id;\n\nSELECT line, SUM(output) AS total_output\nFROM production_output\nGROUP BY line\nORDER BY line;",
      },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Phát biểu nào đúng?\nA. Database là phần mềm quản lý dữ liệu.\nB. DBMS là phần mềm quản lý database.\nC. Dữ liệu và database là một.\nD. Excel là một DBMS.\n2) (Đúng/Sai) Database tự động làm sạch dữ liệu nhập sai.\n3) (Tình huống) Quản lý hỏi: 'Hôm qua dây chuyền nào ra ít sản lượng nhất?' Vì sao câu trả lời nhanh hơn khi dữ liệu nằm trong database thay vì nhiều file Excel?\n4) (Truy vấn) Viết câu SELECT lấy toàn bộ dòng của bảng production_output có output lớn hơn 400.\n5) (Đọc kết quả) Với bảng mẫu của bài này, tổng sản lượng của L03 là bao nhiêu?",
      en: "1) (Multiple choice) Which statement is correct?\nA. A database is software that manages data.\nB. A DBMS is software that manages a database.\nC. Data and a database are the same thing.\nD. Excel is a DBMS.\n2) (True/False) A database automatically cleans wrongly entered data.\n3) (Scenario) A manager asks: 'Which line produced the least output yesterday?' Why is the answer faster when the data sits in a database than in many Excel files?\n4) (Query) Write a SELECT that returns all rows of production_output where output is greater than 400.\n5) (Read the result) In this lesson's sample table, what is the total output of L03?",
    },
    answer: {
      vi: "1) B. DBMS là phần mềm quản lý database; database là nơi chứa dữ liệu.\n2) Sai. Database không tự làm sạch dữ liệu; cần thiết kế bảng, ràng buộc và quy trình nhập liệu.\n3) Vì dữ liệu có cấu trúc (dây chuyền, ngày, sản lượng) nên có thể nhóm và tổng hợp bằng một câu SQL, không phải ghép nhiều file bằng tay.\n4) SELECT * FROM production_output WHERE output > 400; Kết quả: id 1, 2, 3.\n5) 600 (300 + 300).",
      en: "1) B. A DBMS is the software that manages a database; the database is where the data is stored.\n2) False. A database does not clean data by itself; it needs table design, constraints and entry procedures.\n3) Because the data has structure (line, date, output), one SQL statement can group and total it, instead of merging files by hand.\n4) SELECT * FROM production_output WHERE output > 400; Result: ids 1, 2, 3.\n5) 600 (300 + 300).",
    },
  },

  "database-systems": {
    overview: {
      vi: "Ở bài trước bạn đã biết database là nơi chứa dữ liệu. Phần mềm giữ cho dữ liệu đó luôn sẵn sàng, đúng và an toàn chính là DBMS. Khi MES ghi sản lượng hoặc công cụ BI đọc báo cáo, DBMS là bên nhận yêu cầu, kiểm tra quyền, thực hiện thao tác và trả kết quả. Hiểu DBMS giúp bạn biết vì sao không nên dùng chung một tài khoản quản trị cho mọi ứng dụng.",
      en: "In the previous lesson you learned that a database is where data is stored. The software that keeps that data available, correct and safe is the DBMS. When MES records output or a BI tool reads a report, the DBMS receives the request, checks permissions, performs the operation and returns the result. Understanding the DBMS explains why one administrator account should not be shared by every application.",
    },
    objectives: {
      vi: [
        "Giải thích DBMS là gì và nêu các chức năng chính của nó.",
        "Phân biệt database với DBMS.",
        "Nhận biết client, server và database user ở mức cơ bản.",
        "So sánh khái quát PostgreSQL, MySQL, SQL Server và Oracle.",
        "Hiểu transaction, phân quyền (access control) và backup ở mức nhập môn.",
      ],
      en: [
        "Explain what a DBMS is and list its main functions.",
        "Distinguish a database from a DBMS.",
        "Recognize client, server and database user at a basic level.",
        "Compare PostgreSQL, MySQL, SQL Server and Oracle at a high level.",
        "Understand transactions, access control and backup at an introductory level.",
      ],
    },
    explanation: {
      vi: "1. DBMS là lớp phần mềm quản lý việc tạo, lưu trữ, truy vấn, cập nhật và bảo vệ dữ liệu.\n2. Các chức năng chính:\n- Định nghĩa dữ liệu (data definition): tạo bảng và cột (CREATE TABLE).\n- Thao tác dữ liệu (data manipulation): thêm, sửa, xóa và đọc (INSERT, UPDATE, DELETE, SELECT).\n- Xử lý truy vấn (query processing): tìm cách thực hiện câu lệnh hiệu quả.\n- Quản lý giao dịch (transaction): nhóm nhiều thao tác thành một đơn vị, thành công cả hoặc không ghi gì.\n- Kiểm soát đồng thời (concurrency control): nhiều người cùng ghi và đọc mà không làm hỏng dữ liệu của nhau.\n- Phân quyền (authorization): ai được đọc hoặc ghi bảng nào.\n- Sao lưu và khôi phục (backup/recovery).\n3. Kiến trúc client–server: ứng dụng hoặc công cụ BI (client) gửi câu lệnh đến DBMS (server). Server kiểm tra quyền, thực hiện và trả kết quả. Người dùng không cần biết dữ liệu nằm ở ổ đĩa nào.\n4. Các thuật ngữ (theo PostgreSQL): server là tiến trình DBMS đang chạy; database là một kho dữ liệu trong server; schema là nhóm bảng trong database (mặc định là public); table là bảng. Mỗi DBMS dùng thuật ngữ hơi khác nhau, nên khi đọc tài liệu cần đối chiếu.\n5. Transaction và ACID (mức khái niệm): A (Atomicity) làm hết hoặc không làm gì; C (Consistency) luôn đúng quy tắc; I (Isolation) các giao dịch không làm sai nhau; D (Durability) đã ghi thì không mất. Chi tiết sẽ được học ở các bài sau.\n6. Các nhóm DBMS: quan hệ (PostgreSQL, MySQL, SQL Server, Oracle) và phi quan hệ (MongoDB, Redis). Bài này chỉ định hướng, không đi sâu NoSQL.\nSo sánh nhanh (mang tính định hướng): PostgreSQL và MySQL có bản mã nguồn mở; SQL Server và Oracle là phần mềm thương mại. Khi chọn, hãy xem chi phí, kỹ năng của đội ngũ và công cụ đã có.",
      en: "1. A DBMS is the software layer that creates, stores, queries, updates and protects data.\n2. Main functions:\n- Data definition: creating tables and columns (CREATE TABLE).\n- Data manipulation: adding, changing, deleting and reading rows (INSERT, UPDATE, DELETE, SELECT).\n- Query processing: choosing an efficient way to run a statement.\n- Transaction management: grouping several operations into one unit that either completes fully or writes nothing.\n- Concurrency control: many users reading and writing at once without damaging each other's data.\n- Authorization: deciding who may read or write which table.\n- Backup and recovery.\n3. Client–server architecture: an application or BI tool (the client) sends statements to the DBMS (the server). The server checks permissions, runs the statement and returns the result. Users do not need to know which disk the data sits on.\n4. Terms (PostgreSQL): the server is the running DBMS process; a database is one data store inside the server; a schema is a group of tables inside a database (default public); a table is a table. Each DBMS uses slightly different terms, so check the documentation.\n5. Transactions and ACID (concept only): A (Atomicity) all or nothing; C (Consistency) rules always hold; I (Isolation) concurrent transactions do not interfere; D (Durability) committed data is not lost. Details come in later lessons.\n6. DBMS families: relational (PostgreSQL, MySQL, SQL Server, Oracle) and non-relational (MongoDB, Redis). This lesson only orients you; NoSQL is not covered in depth.\nQuick comparison (orientation only): PostgreSQL and MySQL have open-source editions; SQL Server and Oracle are commercial products. When choosing, consider cost, team skills and the tools you already have.",
    },
    extraSections: [
      {
        title: { vi: "Ứng dụng trong nhà máy", en: "Manufacturing application" },
        body: {
          vi: "Vấn đề nghiệp vụ: hệ thống MES ghi sản lượng liên tục, còn công cụ BI cần đọc dữ liệu để vẽ dashboard.\nDữ liệu có sẵn: bảng production_output được MES ghi mỗi khi có sản phẩm hoàn thành.\nLogic: MES dùng tài khoản có quyền ghi; công cụ BI dùng tài khoản chỉ đọc (read-only), chỉ được chạy SELECT.\nKết quả mong đợi: BI vẽ được báo cáo, nhưng không thể vô tình xóa hay sửa dữ liệu sản xuất.\nGiá trị kinh doanh: giảm rủi ro dữ liệu sản xuất bị sửa sai do công cụ báo cáo, và dễ kiểm soát ai đã truy cập dữ liệu. Vì vậy không nên dùng chung một tài khoản quản trị cho mọi ứng dụng.",
          en: "Business problem: the MES records output continuously, while the BI tool must read the data to draw dashboards.\nAvailable data: the production_output table is written by MES each time a product is completed.\nLogic: MES uses an account with write rights; the BI tool uses a read-only account that may only run SELECT.\nExpected result: BI can draw reports but cannot accidentally delete or change production data.\nBusiness value: less risk of production data being corrupted by a reporting tool, and clear control over who accessed the data. This is why one admin account should not be shared by every application.",
        },
      },
      {
        title: { vi: "Tổng kết và bài tiếp theo", en: "Key takeaways and what's next" },
        body: {
          vi: "Tổng kết:\n- DBMS quản lý việc tạo, lưu, truy vấn, cập nhật và bảo vệ dữ liệu.\n- Ứng dụng và công cụ BI giao tiếp với DBMS theo mô hình client–server.\n- Cấp quyền tối thiểu cần thiết: công cụ BI thường chỉ cần quyền đọc.\n- Transaction giúp một chuỗi thao tác không bị ghi dở dang.\nBài tiếp theo: Cơ sở dữ liệu quan hệ. Bài này cho thấy cách tổ chức dữ liệu thành các bảng liên kết với nhau, và vì sao không nên lặp tên dây chuyền ở mọi dòng sản lượng.",
          en: "Key takeaways:\n- A DBMS manages creating, storing, querying, updating and protecting data.\n- Applications and BI tools talk to the DBMS in a client–server model.\n- Grant the minimum rights needed: a BI tool usually only needs read access.\n- A transaction prevents a chain of operations from being half-written.\nNext lesson: Relational Databases. It shows how data is organized into linked tables, and why a line name should not be repeated on every output row.",
        },
      },
    ],
    practicalExample: {
      vi: "Thực hành (PostgreSQL): (1) tạo bảng production_output như bài 01 và thêm năm dòng mẫu; (2) tạo vai trò chỉ đọc bi_reader và cấp quyền SELECT trên bảng; (3) minh họa transaction: thêm một dòng trong giao dịch rồi ROLLBACK; (4) đếm số dòng. Kết quả mong đợi: sau ROLLBACK, bảng vẫn có 5 dòng. Nếu môi trường của bạn không cho phép tạo vai trò, hãy đọc phần minh họa và xem kết quả mẫu.",
      en: "Hands-on (PostgreSQL): (1) create the production_output table as in lesson 01 and insert five sample rows; (2) create a read-only role bi_reader and grant it SELECT on the table; (3) demonstrate a transaction: insert one row inside BEGIN, then ROLLBACK; (4) count the rows. Expected result: after ROLLBACK the table still has 5 rows. If your environment does not allow creating roles, read through the demonstration and compare with the expected result.",
    },
    formula: [
      {
        label: "PostgreSQL",
        code: "CREATE TABLE production_output (\n  id          INT PRIMARY KEY,\n  line        VARCHAR(10),\n  output_date DATE,\n  output      INT\n);\nINSERT INTO production_output (id, line, output_date, output) VALUES\n  (1, 'L01', '2026-11-01', 500),\n  (2, 'L01', '2026-11-02', 520),\n  (3, 'L02', '2026-11-01', 450),\n  (4, 'L03', '2026-11-01', 300),\n  (5, 'L03', '2026-11-02', 300);\n\n-- Vai trò chỉ đọc cho công cụ BI\nCREATE ROLE bi_reader;\nGRANT SELECT ON production_output TO bi_reader;\n\n-- Giao dịch: thêm một dòng rồi hủy\nBEGIN;\nINSERT INTO production_output (id, line, output_date, output)\n  VALUES (6, 'L02', '2026-11-02', 200);\nROLLBACK;\n\nSELECT COUNT(*) AS so_dong FROM production_output;",
      },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Thành phần nào của DBMS kiểm tra ai được đọc hoặc ghi bảng nào?\nA. Query processing\nB. Authorization (phân quyền)\nC. Backup\nD. Transaction log\n2) (Đúng/Sai) Công cụ BI nên dùng tài khoản admin để có đủ quyền đọc mọi bảng.\n3) (Tình huống) Hai máy cùng ghi sản lượng vào một bảng cùng lúc. DBMS làm gì để dữ liệu không bị hỏng?\n4) (Trắc nghiệm) ROLLBACK làm gì?\nA. Ghi thêm dữ liệu\nB. Hủy các thao tác trong giao dịch chưa COMMIT\nC. Xóa bảng\nD. Sao lưu database\n5) (Thảo luận) Nêu một điểm khác nhau giữa PostgreSQL và SQL Server, ngoài chi phí bản quyền.",
      en: "1) (Multiple choice) Which DBMS component decides who may read or write which table?\nA. Query processing\nB. Authorization\nC. Backup\nD. Transaction log\n2) (True/False) A BI tool should use an admin account so it can read every table.\n3) (Scenario) Two machines write output to the same table at the same time. What does the DBMS do so the data is not corrupted?\n4) (Multiple choice) What does ROLLBACK do?\nA. Adds data\nB. Cancels the operations of a transaction that has not been committed\nC. Deletes the table\nD. Backs up the database\n5) (Discussion) Name one difference between PostgreSQL and SQL Server other than licence cost.",
    },
    answer: {
      vi: "1) B. Phân quyền (authorization) quyết định tài khoản nào được làm gì trên bảng nào.\n2) Sai. Công cụ BI nên dùng tài khoản chỉ đọc; tài khoản admin có thể sửa hoặc xóa dữ liệu sản xuất.\n3) DBMS dùng kiểm soát đồng thời (concurrency control), ví dụ khóa ở mức dòng, để hai thao tác không ghi đè lên nhau một cách sai lệch.\n4) B. ROLLBACK hủy các thao tác trong giao dịch chưa COMMIT.\n5) Ví dụ: PostgreSQL là mã nguồn mở, SQL Server là phần mềm thương mại (có bản Express miễn phí); mỗi bên có ngôn ngữ thủ tục riêng (PL/pgSQL và T-SQL).",
      en: "1) B. Authorization decides which account may do what on which table.\n2) False. A BI tool should use a read-only account; an admin account can change or delete production data.\n3) The DBMS uses concurrency control, for example row-level locks, so two writes do not overwrite each other incorrectly.\n4) B. ROLLBACK cancels the operations of a transaction that has not been committed.\n5) For example: PostgreSQL is open source, SQL Server is commercial (with a free Express edition); each has its own procedural language (PL/pgSQL and T-SQL).",
    },
  },

  "relational-database": {
    overview: {
      vi: "Trong nhà máy, dữ liệu sản xuất luôn gắn với các đối tượng khác: một lệnh sản xuất chạy trên một dây chuyền và làm ra một sản phẩm. Cơ sở dữ liệu quan hệ (relational database) lưu mỗi loại đối tượng vào một bảng riêng, rồi nối các bảng bằng mã. Cách làm này giúp không phải ghi lặp tên dây chuyền hay tên sản phẩm ở mỗi dòng, và khi tên thay đổi chỉ cần sửa một chỗ. Đây là mô hình được dùng nhiều nhất trong các hệ thống sản xuất và BI.",
      en: "In a factory, production data is always linked to other objects: a production order runs on one line and makes one product. A relational database stores each kind of object in its own table and links the tables through codes. This avoids writing the line name or product name on every row, and a rename only needs one change. It is the most widely used model in manufacturing systems and BI.",
    },
    objectives: {
      vi: [
        "Giải thích relational database: dữ liệu được tổ chức thành bảng và quan hệ.",
        "Nhận biết schema, table, record (row), attribute (column) và domain.",
        "Hiểu vì sao dữ liệu được tách thành nhiều bảng.",
        "Phân biệt bảng danh mục (master data) và bảng giao dịch (transaction data).",
        "Đọc được ví dụ gồm nhiều bảng liên kết bằng mã.",
      ],
      en: [
        "Explain a relational database: data organized into tables and relationships.",
        "Recognize schema, table, record (row), attribute (column) and domain.",
        "Understand why data is split into several tables.",
        "Distinguish master data tables from transaction data tables.",
        "Read an example of several tables linked by codes.",
      ],
    },
    explanation: {
      vi: "1. Mô hình quan hệ: dữ liệu được biểu diễn thành các bảng (relation). Mỗi hàng (row, hay tuple) là một bản ghi; mỗi cột (column, hay attribute) là một thuộc tính.\nVí dụ: bảng production_lines có các cột line_id, line_code, line_name, area; mỗi hàng là một dây chuyền.\n2. Schema và instance: schema là cấu trúc (tên bảng, cột, kiểu dữ liệu, quan hệ). Instance là dữ liệu tại một thời điểm. Schema thay đổi chậm, còn instance thay đổi liên tục khi có ghi nhận mới.\n3. Domain: tập giá trị hợp lệ của một cột. Ví dụ: cột shift_code chỉ nhận A, B hoặc C. Domain được kiểm soát bằng kiểu dữ liệu và ràng buộc (học ở các bài sau).\n4. Vì sao tách bảng: nếu ghi tên dây chuyền ở mọi dòng sản lượng, khi đổi tên phải sửa rất nhiều dòng và dễ sót. Tách thành bảng production_lines riêng, các bảng khác chỉ giữ line_id.\n5. Liên kết bằng mã: một bảng tham chiếu bảng khác qua một mã. Ví dụ production_orders.line_id trỏ đến production_lines.line_id. Định nghĩa chi tiết khóa chính và khóa ngoại sẽ học ở bài Keys.\n6. Danh mục và giao dịch: bảng danh mục (master data) như dây chuyền, sản phẩm thay đổi ít. Bảng giao dịch (transaction data) như lệnh sản xuất, sản lượng được ghi liên tục.\n7. Khác với spreadsheet: một file Excel có nhiều sheet không tự có quy tắc quan hệ. Relational database có cấu trúc và quy tắc rõ ràng cho các bảng và liên kết giữa chúng.",
      en: "1. Relational model: data is represented as tables (relations). Each row (or tuple) is a record; each column (or attribute) is a property.\nExample: the production_lines table has line_id, line_code, line_name and area; each row is one line.\n2. Schema and instance: the schema is the structure (table names, columns, data types, relationships). The instance is the data at a point in time. The schema changes slowly; the instance changes constantly as new records arrive.\n3. Domain: the set of valid values for a column. Example: the shift_code column accepts only A, B or C. Domains are enforced with data types and constraints (covered later).\n4. Why split tables: if the line name is written on every output row, a rename means editing many rows and easily missing some. With a separate production_lines table, other tables keep only line_id.\n5. Linking by codes: one table refers to another through a code. Example: production_orders.line_id points to production_lines.line_id. Primary and foreign keys are defined in the Keys lesson.\n6. Master and transaction data: master data such as lines and products changes rarely. Transaction data such as production orders and output is recorded continuously.\n7. Compared with a spreadsheet: an Excel file with many sheets has no built-in relationship rules. A relational database has clear structure and rules for its tables and the links between them.",
    },
    extraSections: [
      {
        title: { vi: "Ứng dụng trong nhà máy", en: "Manufacturing application" },
        body: {
          vi: "Vấn đề nghiệp vụ: báo cáo cần hiển thị tên dây chuyền và tên sản phẩm cho từng lệnh sản xuất, nhưng tên đó chỉ nên được lưu ở một chỗ.\nDữ liệu có sẵn: bảng production_lines (dây chuyền), products (sản phẩm), production_orders (lệnh sản xuất, có line_id và product_id).\nLogic: lệnh sản xuất chỉ lưu mã liên kết; khi cần tên, nối các bảng lại với nhau.\nKết quả mong đợi: danh sách lệnh kèm tên dây chuyền và sản phẩm, không lặp dữ liệu danh mục.\nGiá trị kinh doanh: đổi tên dây chuyền một lần là mọi báo cáo đều đúng, và giảm lỗi do nhập lặp.",
          en: "Business problem: reports must show the line name and product name for each production order, but each name should be stored in only one place.\nAvailable data: the production_lines (lines), products (products) and production_orders (orders, with line_id and product_id) tables.\nLogic: an order stores only the link codes; when a name is needed, the tables are joined.\nExpected result: a list of orders with their line and product names, with no repeated master data.\nBusiness value: renaming a line once makes every report correct, and repeated-entry errors are reduced.",
        },
      },
      {
        title: { vi: "Tổng kết và bài tiếp theo", en: "Key takeaways and what's next" },
        body: {
          vi: "Tổng kết:\n- Dữ liệu được tổ chức thành bảng; mỗi hàng là một bản ghi, mỗi cột là một thuộc tính.\n- Tách bảng và liên kết bằng mã giúp mỗi thông tin chỉ được lưu một lần.\n- Phân biệt bảng danh mục (ít thay đổi) và bảng giao dịch (ghi liên tục).\nBài tiếp theo: Kiểu dữ liệu. Mỗi cột cần một kiểu dữ liệu phù hợp để giá trị được lưu và tính toán đúng.",
          en: "Key takeaways:\n- Data is organized into tables: each row is a record, each column an attribute.\n- Splitting tables and linking them by codes means each fact is stored once.\n- Distinguish master data (changes rarely) from transaction data (recorded continuously).\nNext lesson: Data Types. Each column needs a suitable data type so values are stored and calculated correctly.",
        },
      },
    ],
    practicalExample: {
      vi: "Thực hành: (1) tạo bảng production_lines, products và production_orders; (2) thêm dữ liệu mẫu gồm 3 dây chuyền, 3 sản phẩm và 4 lệnh; (3) xem từng bảng; (4) nối production_orders với hai bảng danh mục để hiển thị tên. Kết quả mong đợi: bốn dòng, ví dụ ORD-001 thuộc dây chuyền L01, sản phẩm P-001, kế hoạch 1000; ORD-004 thuộc L01, P-002, kế hoạch 500.",
      en: "Hands-on: (1) create the production_lines, products and production_orders tables; (2) insert sample data: 3 lines, 3 products and 4 orders; (3) view each table; (4) join production_orders with the two master tables to show names. Expected result: four rows, for example ORD-001 is on L01 with product P-001 and a plan of 1000; ORD-004 is on L01 with P-002 and a plan of 500.",
    },
    formula: [
      {
        label: "PostgreSQL",
        code: "CREATE TABLE production_lines (\n  line_id   INT,\n  line_code VARCHAR(10),\n  line_name VARCHAR(50),\n  area      VARCHAR(20)\n);\nCREATE TABLE products (\n  product_id   INT,\n  product_code VARCHAR(10),\n  product_name VARCHAR(50)\n);\nCREATE TABLE production_orders (\n  order_id    INT,\n  order_no    VARCHAR(20),\n  line_id     INT,\n  product_id  INT,\n  planned_qty INT\n);\n\nINSERT INTO production_lines VALUES\n  (1, 'L01', 'Dây chuyền 01', 'Khu A'),\n  (2, 'L02', 'Dây chuyền 02', 'Khu A'),\n  (3, 'L03', 'Dây chuyền 03', 'Khu B');\nINSERT INTO products VALUES\n  (1, 'P-001', 'Vỏ nhựa A'),\n  (2, 'P-002', 'Nắp B'),\n  (3, 'P-003', 'Khung C');\nINSERT INTO production_orders VALUES\n  (1, 'ORD-001', 1, 1, 1000),\n  (2, 'ORD-002', 2, 2, 800),\n  (3, 'ORD-003', 3, 3, 600),\n  (4, 'ORD-004', 1, 2, 500);\n\nSELECT o.order_no, l.line_code, p.product_code, o.planned_qty\nFROM production_orders o\nJOIN production_lines l ON l.line_id = o.line_id\nJOIN products p ON p.product_id = o.product_id\nORDER BY o.order_id;",
      },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Trong bảng production_lines, mỗi hàng đại diện cho gì?\nA. Một cột thuộc tính\nB. Một dây chuyền\nC. Một sản phẩm\nD. Một lệnh sản xuất\n2) (Đúng/Sai) Nên ghi tên dây chuyền ở mọi dòng của production_orders để báo cáo nhanh hơn.\n3) (Tình huống) Dây chuyền L02 đổi tên thành 'Dây chuyền 02 - Mới'. Với thiết kế tách bảng, bạn cần sửa ở đâu?\n4) (Phân loại) products là bảng danh mục hay giao dịch? production_orders thì sao?\n5) (Truy vấn) Viết câu SELECT hiển thị order_no và line_code của các lệnh có planned_qty lớn hơn 700.",
      en: "1) (Multiple choice) In the production_lines table, what does each row represent?\nA. An attribute column\nB. A production line\nC. A product\nD. A production order\n2) (True/False) You should write the line name on every row of production_orders so that reports are faster.\n3) (Scenario) Line L02 is renamed 'Line 02 - New'. With the split-table design, where do you make the change?\n4) (Classify) Is products a master or a transaction table? What about production_orders?\n5) (Query) Write a SELECT that returns order_no and line_code for orders with planned_qty greater than 700.",
    },
    answer: {
      vi: "1) B.\n2) Sai. Ghi lặp làm khó sửa khi tên thay đổi; production_orders chỉ nên lưu line_id.\n3) Chỉ sửa một dòng trong bảng production_lines.\n4) products là bảng danh mục; production_orders là bảng giao dịch, được ghi liên tục.\n5) SELECT o.order_no, l.line_code FROM production_orders o JOIN production_lines l ON l.line_id = o.line_id WHERE o.planned_qty > 700; Kết quả: ORD-001 (L01) và ORD-002 (L02).",
      en: "1) B.\n2) False. Repeating names makes changes hard; production_orders should store only line_id.\n3) Change one row in the production_lines table.\n4) products is a master table; production_orders is a transaction table, recorded continuously.\n5) SELECT o.order_no, l.line_code FROM production_orders o JOIN production_lines l ON l.line_id = o.line_id WHERE o.planned_qty > 700; Result: ORD-001 (L01) and ORD-002 (L02).",
    },
  },

  "data-types": {
    overview: {
      vi: "Mỗi cột trong bảng cần một kiểu dữ liệu: số lượng là số nguyên, mã dây chuyền là chữ, thời điểm ghi nhận là ngày giờ. Chọn đúng kiểu giúp dữ liệu được lưu chính xác, tính toán đúng và truy vấn nhanh hơn. Chọn sai có thể làm mã mất số 0 đầu, hoặc tính tiền bị lệch do sai số làm tròn. Bài này tập trung vào các nhóm kiểu phổ biến trong PostgreSQL và cách chọn kiểu cho dữ liệu sản xuất.",
      en: "Every column in a table needs a data type: quantities are whole numbers, line codes are text, and recording times are timestamps. The right type keeps values accurate, calculations correct and queries fast. A wrong type can strip the leading zeros of a code, or make money totals drift because of rounding. This lesson covers the common PostgreSQL type groups and how to choose types for production data.",
    },
    objectives: {
      vi: [
        "Giải thích Data Type là gì và vì sao mỗi cột cần một kiểu.",
        "Phân biệt nhóm số, chuỗi, ngày giờ và Boolean.",
        "Chọn kiểu dữ liệu PostgreSQL phù hợp cho dữ liệu sản xuất.",
        "Nhận biết NULL khác 0, FALSE và chuỗi rỗng.",
        "Đọc khai báo kiểu trong CREATE TABLE và dùng CAST ở mức đơn giản.",
      ],
      en: [
        "Explain what a data type is and why every column needs one.",
        "Distinguish numeric, text, date/time and boolean types.",
        "Choose suitable PostgreSQL data types for production data.",
        "Tell NULL apart from 0, FALSE and an empty string.",
        "Read type declarations in CREATE TABLE and use CAST at a basic level.",
      ],
    },
    explanation: {
      vi: "1. Vì sao cần kiểu dữ liệu: kiểu quy định giá trị hợp lệ (validation), phép toán được phép (cộng số, so sánh ngày) và cách lưu trữ.\n2. Nhóm số:\n- Số nguyên: SMALLINT, INTEGER (INT), BIGINT. Dùng cho số đếm, ví dụ output = 520 sản phẩm.\n- Số thập phân chính xác: NUMERIC(p,s). p là tổng số chữ số, s là số chữ số sau dấu phẩy. Ví dụ yield_rate NUMERIC(5,2) lưu 98.75.\n- Số thực xấp xỉ: REAL, DOUBLE PRECISION. Dùng cho đo lường, không dùng cho tiền vì có sai số làm tròn.\nPhân biệt: số đếm (số sản phẩm) dùng INTEGER; tỷ lệ và tiền cần thập phân chính xác dùng NUMERIC.\n3. Nhóm chuỗi: VARCHAR(n) (tối đa n ký tự), TEXT (không giới hạn độ dài cố định), CHAR(n) (độ dài cố định). Mã dây chuyền 'L01' hoặc mã lô '000123' nên là chuỗi vì có chữ và số 0 đầu; không cộng trừ được mã.\n4. Ngày giờ:\n- DATE: chỉ ngày, ví dụ 2026-11-01.\n- TIME: chỉ giờ, ví dụ 08:30:00.\n- TIMESTAMP: ngày và giờ, không có múi giờ.\n- TIMESTAMPTZ: ngày và giờ có múi giờ; nên dùng khi hệ thống có nhiều nhà máy ở nhiều múi giờ.\n5. Boolean: TRUE, FALSE hoặc NULL. Dùng cho cờ như is_passed (đạt hay không đạt).\n6. NULL nghĩa là chưa biết hoặc không có giá trị. NULL không phải 0, không phải FALSE, không phải chuỗi rỗng ''. Ví dụ: chưa đo được tỷ lệ đạt thì để NULL, không để 0, vì 0 sẽ làm trung bình báo cáo bị sai.\n7. Ép kiểu (CAST) và lỗi thường gặp: CAST('123' AS INTEGER) cho 123; ép 'abc' sang số sẽ báo lỗi. Định dạng ngày không nhất quán (01/11/2026 và 2026-11-01) gây lỗi khi so sánh.\n8. Kiểu dữ liệu không thay thế kiểm tra nghiệp vụ: kiểu chỉ bảo đảm đúng loại. Việc số lượng không được âm cần ràng buộc (học ở bài Constraints).",
      en: "1. Why data types matter: a type defines valid values (validation), the operations allowed (adding numbers, comparing dates) and how the value is stored.\n2. Numeric types:\n- Integers: SMALLINT, INTEGER (INT), BIGINT. Use for counts, for example output = 520 units.\n- Exact decimals: NUMERIC(p,s), where p is the total number of digits and s the digits after the decimal point. Example: yield_rate NUMERIC(5,2) stores 98.75.\n- Approximate reals: REAL, DOUBLE PRECISION. Use for measurements; do not use for money because of rounding error.\nDistinction: counts (units produced) use INTEGER; rates and money need exact decimals, so NUMERIC.\n3. Text types: VARCHAR(n) (up to n characters), TEXT (no fixed length limit), CHAR(n) (fixed length). Line codes such as 'L01' or batch codes such as '000123' are text, because they contain letters and leading zeros; you do not do arithmetic on codes.\n4. Date and time:\n- DATE: date only, for example 2026-11-01.\n- TIME: time of day only, for example 08:30:00.\n- TIMESTAMP: date and time, without a time zone.\n- TIMESTAMPTZ: date and time with a time zone; use it when several plants in different time zones share a system.\n5. Boolean: TRUE, FALSE or NULL. Use for flags such as is_passed.\n6. NULL means unknown or no value. NULL is not 0, not FALSE and not an empty string ''. Example: if a pass rate was not measured, store NULL, not 0, because 0 would wrongly pull down the average in a report.\n7. Casting (CAST) and common errors: CAST('123' AS INTEGER) gives 123; casting 'abc' to a number raises an error. Inconsistent date formats (01/11/2026 and 2026-11-01) cause comparison errors.\n8. A data type does not replace business checks: a type only guarantees the right kind of value. Requiring quantities to be non-negative needs a constraint (covered in the Constraints lesson).",
    },
    extraSections: [
      {
        title: { vi: "Ứng dụng trong nhà máy", en: "Manufacturing application" },
        body: {
          vi: "Vấn đề nghiệp vụ: bảng chất lượng cần lưu sản lượng, tỷ lệ đạt, ngày sản xuất, thời điểm ghi nhận và trạng thái đạt.\nDữ liệu có sẵn: output (số nguyên), yield_rate (phần trăm có hai chữ số thập phân), production_date (ngày), event_time (thời điểm có múi giờ), line_code (mã chữ), is_passed (đạt hay không đạt).\nLogic: chọn kiểu phù hợp cho từng cột. yield_rate dùng NUMERIC(5,2) để không sai số; line_code dùng VARCHAR vì giữ đúng mã.\nKết quả mong đợi: dữ liệu lưu đúng, tỷ lệ đạt trung bình tính chính xác, mã dây chuyền không bị mất ký tự.\nGiá trị kinh doanh: báo cáo chất lượng đáng tin cậy, không lệch vì làm tròn, và truy vết được dữ liệu theo đúng ngày và giờ.",
          en: "Business problem: the quality table must store output, pass rate, production date, event time and the pass flag.\nAvailable data: output (integer), yield_rate (percentage with two decimals), production_date (date), event_time (timestamp with time zone), line_code (text code), is_passed (pass or fail).\nLogic: choose a suitable type for each column. yield_rate uses NUMERIC(5,2) to avoid rounding error; line_code uses VARCHAR so the code stays intact.\nExpected result: values are stored correctly, average pass rates are exact, and line codes keep all their characters.\nBusiness value: reliable quality reports that do not drift because of rounding, and traceability to the exact date and time.",
        },
      },
      {
        title: { vi: "Tổng kết và bài tiếp theo", en: "Key takeaways and what's next" },
        body: {
          vi: "Tổng kết:\n- Chọn kiểu theo bản chất dữ liệu: số để đếm, NUMERIC để tỷ lệ và tiền, chuỗi để nhận diện, ngày giờ để so sánh theo thời gian.\n- Mã có số 0 đầu phải là chuỗi.\n- NULL không đồng nghĩa với 0.\nBài tiếp theo: Khóa (Keys). Khóa là các cột đặc biệt dùng để nhận diện bản ghi và nối bảng.",
          en: "Key takeaways:\n- Choose the type from the nature of the data: integers to count, NUMERIC for rates and money, text to identify, timestamps to compare over time.\n- Codes with leading zeros must be text.\n- NULL is not the same as 0.\nNext lesson: Keys. Keys are special columns that identify records and link tables.",
        },
      },
    ],
    practicalExample: {
      vi: "Thực hành: (1) tạo bảng production_quality với các kiểu dữ liệu đã chọn; (2) thêm ba dòng, trong đó một dòng chưa có yield_rate (NULL); (3) tìm dòng có yield_rate NULL; (4) đếm số dòng đạt; (5) ép kiểu mã. Kết quả mong đợi: dòng id 3 (L03) có yield_rate NULL; có 2 dòng đạt; CAST('000123' AS INTEGER) cho 123 còn '000123' vẫn giữ nguyên khi là VARCHAR.",
      en: "Hands-on: (1) create the production_quality table with the chosen types; (2) insert three rows, one with no yield_rate (NULL); (3) find the row where yield_rate is NULL; (4) count the passing rows; (5) cast a code. Expected result: row id 3 (L03) has a NULL yield_rate; there are 2 passing rows; CAST('000123' AS INTEGER) gives 123, while '000123' stays unchanged as VARCHAR.",
    },
    formula: [
      {
        label: "PostgreSQL",
        code: "CREATE TABLE production_quality (\n  id              INT PRIMARY KEY,\n  line_code       VARCHAR(10),\n  output          INT,\n  yield_rate      NUMERIC(5,2),\n  production_date DATE,\n  event_time      TIMESTAMPTZ,\n  is_passed       BOOLEAN\n);\n\nINSERT INTO production_quality VALUES\n  (1, 'L01', 520, 98.75, '2026-11-01', '2026-11-01 08:30:00+07', TRUE),\n  (2, 'L02', 450, 95.10, '2026-11-01', '2026-11-01 09:15:00+07', TRUE),\n  (3, 'L03', 300, NULL,  '2026-11-02', '2026-11-02 10:00:00+07', FALSE);\n\nSELECT id, line_code, yield_rate FROM production_quality WHERE yield_rate IS NULL;\n\nSELECT COUNT(*) AS so_dong_dat FROM production_quality WHERE is_passed = TRUE;\n\nSELECT CAST('000123' AS INTEGER) AS ep_so, '000123'::VARCHAR AS giu_chuoi;",
      },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Kiểu nào phù hợp nhất để lưu số lượng sản phẩm đã làm ra?\nA. VARCHAR\nB. INTEGER\nC. BOOLEAN\nD. DATE\n2) (Đúng/Sai) NULL và 0 có cùng ý nghĩa: đều nghĩa là không có sản lượng.\n3) (Tình huống) Mã lô '000123' bị mất số 0 đầu khi lưu thành số. Nên chọn kiểu nào và vì sao?\n4) (Chọn kiểu) Chọn kiểu cho: tỷ lệ đạt 98.75%, thời điểm máy dừng có múi giờ, cờ đạt hay không đạt.\n5) (Truy vấn) Viết câu SELECT lấy các dòng có is_passed = FALSE trong bảng production_quality.",
      en: "1) (Multiple choice) Which type best stores the number of units produced?\nA. VARCHAR\nB. INTEGER\nC. BOOLEAN\nD. DATE\n2) (True/False) NULL and 0 mean the same thing: no output.\n3) (Scenario) Batch code '000123' loses its leading zeros when stored as a number. Which type should you use, and why?\n4) (Choose types) Choose types for: a 98.75% pass rate, a machine stop time with a time zone, a pass/fail flag.\n5) (Query) Write a SELECT that returns the rows of production_quality where is_passed = FALSE.",
    },
    answer: {
      vi: "1) B. INTEGER phù hợp cho số đếm.\n2) Sai. NULL nghĩa là chưa biết hoặc không có giá trị; 0 là một số cụ thể. Chưa đo được thì để NULL.\n3) VARCHAR, vì mã có số 0 đầu; chuyển sang số sẽ làm mất số 0.\n4) NUMERIC(5,2) cho tỷ lệ; TIMESTAMPTZ cho thời điểm có múi giờ; BOOLEAN cho cờ đạt hay không đạt.\n5) SELECT * FROM production_quality WHERE is_passed = FALSE; Kết quả: dòng id 3 (L03).",
      en: "1) B. INTEGER suits counts.\n2) False. NULL means unknown or no value; 0 is a specific number. If it was not measured, store NULL.\n3) VARCHAR, because the code has leading zeros; converting to a number removes them.\n4) NUMERIC(5,2) for the rate; TIMESTAMPTZ for a time with a time zone; BOOLEAN for the pass/fail flag.\n5) SELECT * FROM production_quality WHERE is_passed = FALSE; Result: row id 3 (L03).",
    },
  },
};
