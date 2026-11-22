import type { Bi } from "./i18n";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type Status = "published" | "draft";

export type Topic = {
  slug: string;
  title: Bi;
  status: Status;
  thumbnail?: string; // ảnh bìa hiện ở thẻ chủ đề (chủ đề có bài viết thì lấy ảnh của bài)
  level?: Level; // cấp độ của chủ đề, dùng để gom thành khóa học (ví dụ khóa SQL)
};

export type Level = "Beginner" | "Intermediate" | "Advanced";

/* Khóa học gom theo cấp độ trong một danh mục. Intermediate và Advanced là khóa trả phí (nhãn Premium). */
/* Giá khóa học tính bằng đồng, hiển thị bằng formatVnd. */
export const formatVnd = (amount: number) => `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`;

export const sqlCourses: Record<Level, { title: Bi; description: Bi; cover: string; premium?: boolean; price?: number }> = {
  Beginner: {
    title: { vi: "SQL Basic", en: "SQL Basic" },
    description: {
      vi: "Viết câu truy vấn đầu tiên, lọc và sắp xếp dữ liệu với SELECT, WHERE, ORDER BY và GROUP BY.",
      en: "Write your first queries and filter and sort data with SELECT, WHERE, ORDER BY and GROUP BY.",
    },
    cover: "https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/Data%20Fundamentals/Courses_sql-beginner.jpg",
  },
  Intermediate: {
    title: { vi: "SQL Intermediate", en: "SQL Intermediate" },
    description: {
      vi: "Kết hợp nhiều bảng với JOIN, viết truy vấn lồng nhau và xử lý dữ liệu với CASE WHEN.",
      en: "Combine tables with JOIN, write nested queries and shape data with CASE WHEN.",
    },
    cover: "https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/Data%20Fundamentals/Courses_sql-intermediate.jpg",
    premium: true,
    price: 199000,
  },
  Advanced: {
    title: { vi: "SQL Advanced", en: "SQL Advanced" },
    description: {
      vi: "Window Functions, CTE và các kỹ thuật phân tích dữ liệu nâng cao.",
      en: "Window Functions, CTEs and advanced data analysis techniques.",
    },
    cover: "https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/Data%20Fundamentals/Courses_sql-advanced.jpg",
    premium: true,
    price: 199000,
  },
};

export type Category = {
  slug: string;
  title: Bi;
  description: Bi;
  topics: Topic[];
};

export type Article = {
  slug: string; // slug bài viết (cũng là ID nội bộ, không đổi khi dịch)
  categorySlug: string;
  title: Bi;
  summary: Bi;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  overview: Bi;
  objectives: Bi[];
  explanation: Bi;
  practicalExample: Bi;
  formula: { label: string; code: string }[];
  exercise: Bi;
  answer?: Bi; // đáp án bài tập, hiện khi người học bấm "Xem đáp án"
  extraSections?: { title: Bi; body: Bi }[]; // các mục bổ sung, hiện ngay sau phần Giải thích
  relatedTopics: string[];
  thumbnail?: string;
};

export type RoadmapModule = {
  title: Bi;
  knowledge: Bi;
  lessons: string[];
  practice: Bi;
  status: Status;
};

export type Roadmap = {
  slug: string;
  title: Bi;
  description: Bi;
  modules: RoadmapModule[];
};

export type SqlExercise = {
  id: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Manufacturing";
  topic?: string;
  title?: Bi;
  question: Bi;
  solution: string;
  explanation?: Bi;
};

export type Kpi = {
  slug: string;
  name: Bi;
  abbr: string;
  formula: string;
  unit: string;
  description: Bi;
  dataNeeded: string[];
};

export type Project = {
  slug: string;
  title: Bi;
  summary: Bi;
  businessProblem: Bi;
  dataStructure: Bi;
  solution: Bi;
  dashboard: Bi;
  businessValue: Bi;
  tags: string[];
};

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navItems: { href: string; label: Bi }[] = [
  { href: "/", label: { vi: "Trang chủ", en: "Home" } },
  { href: "/learn", label: { vi: "Learn", en: "Learn" } },
  { href: "/projects", label: { vi: "Projects", en: "Projects" } },
  { href: "/career", label: { vi: "Career", en: "Career" } },
  { href: "/about", label: { vi: "About", en: "About" } },
];

/* ------------------------------------------------------------------ */
/* 01. LEARN                                                           */
/* ------------------------------------------------------------------ */

export const categories: Category[] = [
  {
    slug: "data-fundamentals",
    title: { vi: "Data Fundamentals", en: "Data Fundamentals" },
    description: {
      vi: "Kiểu dữ liệu, ETL và Data Warehouse — nền tảng cho mọi công việc dữ liệu.",
      en: "Data types, ETL and Data Warehouse — the foundation of all data work.",
    },
    topics: [
      { slug: "database", title: { vi: "Giới thiệu về cơ sở dữ liệu", en: "Introduction to Database" }, status: "published" },
      { slug: "database-systems", title: { vi: "Hệ quản trị cơ sở dữ liệu (DBMS)", en: "Database Systems" }, status: "published" },
      { slug: "relational-database", title: { vi: "Cơ sở dữ liệu quan hệ", en: "Relational Database" }, status: "published" },
      { slug: "data-types", title: { vi: "Kiểu dữ liệu", en: "Data Types" }, status: "published" },
      { slug: "keys", title: { vi: "Khóa (Keys)", en: "Keys" }, status: "published" },
      { slug: "relationships", title: { vi: "Quan hệ giữa các bảng", en: "Relationships" }, status: "published" },
      { slug: "constraints", title: { vi: "Ràng buộc (Constraints)", en: "Constraints" }, status: "published" },
      { slug: "normalization", title: { vi: "Chuẩn hóa (Normalization)", en: "Normalization" }, status: "published" },
      { slug: "erd", title: { vi: "Sơ đồ ERD", en: "ERD" }, status: "published" },
      { slug: "database-design", title: { vi: "Thiết kế cơ sở dữ liệu", en: "Database Design" }, status: "published" },
      { slug: "etl", title: { vi: "ETL", en: "ETL" }, status: "published", thumbnail: "https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/Data%20Fundamentals/Data%20Fundamentals_etl.jpg" },
      { slug: "data-warehouse", title: { vi: "Data Warehouse", en: "Data Warehouse" }, status: "published", thumbnail: "https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/Data%20Fundamentals/Data%20Fundamentals_data-warehouse.jpg" },
    ],
  },
  {
    slug: "sql-database",
    title: { vi: "SQL & Database", en: "SQL & Database" },
    description: {
      vi: "SELECT, JOIN, CTE, Window Functions.",
      en: "SELECT, JOIN, CTE, Window Functions.",
    },
    topics: [
      { slug: "select", title: { vi: "SELECT", en: "SELECT" }, status: "draft", level: "Beginner" },
      { slug: "join", title: { vi: "JOIN", en: "JOIN" }, status: "draft", level: "Intermediate" },
      { slug: "cte", title: { vi: "CTE", en: "CTE" }, status: "draft", level: "Advanced" },
      { slug: "window-functions", title: { vi: "Window Functions", en: "Window Functions" }, status: "draft", level: "Advanced" },
    ],
  },
  {
    slug: "business-intelligence",
    title: { vi: "Business Intelligence", en: "Business Intelligence" },
    description: {
      vi: "Power BI, Grafana và KPI.",
      en: "Power BI, Grafana and KPIs.",
    },
    topics: [
      { slug: "power-bi", title: { vi: "Power BI", en: "Power BI" }, status: "draft" },
      { slug: "grafana", title: { vi: "Grafana", en: "Grafana" }, status: "draft" },
      { slug: "kpi", title: { vi: "KPI", en: "KPI" }, status: "draft" },
    ],
  },
  {
    slug: "manufacturing-analytics",
    title: { vi: "Manufacturing Analytics", en: "Manufacturing Analytics" },
    description: {
      vi: "OEE, UPH, Yield, Downtime — các chỉ số cốt lõi của sản xuất.",
      en: "OEE, UPH, Yield, Downtime — the core manufacturing metrics.",
    },
    topics: [
      { slug: "oee", title: { vi: "OEE (Overall Equipment Effectiveness)", en: "OEE (Overall Equipment Effectiveness)" }, status: "published" },
      { slug: "availability", title: { vi: "Availability: tỷ lệ thời gian máy chạy", en: "Availability: share of planned time the machine runs" }, status: "published" },
      { slug: "performance", title: { vi: "Performance: tốc độ chạy so với lý tưởng", en: "Performance: running speed against ideal" }, status: "published" },
      { slug: "quality-rate", title: { vi: "Quality Rate: tỷ lệ sản phẩm đạt", en: "Quality Rate: share of good output" }, status: "published" },
      { slug: "efficiency", title: { vi: "Efficiency", en: "Efficiency" }, status: "published" },
      { slug: "productivity", title: { vi: "Productivity: năng suất đầu ra trên đầu vào", en: "Productivity: output per unit of input" }, status: "published" },
      { slug: "uph", title: { vi: "UPH (Units Per Hour): sản lượng mỗi giờ", en: "UPH (Units Per Hour)" }, status: "published" },
      { slug: "takt-time", title: { vi: "Takt Time: nhịp sản xuất theo nhu cầu", en: "Takt Time: production pace set by demand" }, status: "published" },
      { slug: "cycle-time", title: { vi: "Thời gian chu kỳ (Cycle Time)", en: "Cycle Time" }, status: "published" },
      { slug: "lead-time", title: { vi: "Lead Time: tổng thời gian từ đầu đến cuối", en: "Lead Time: total time from start to finish" }, status: "published" },
      { slug: "yield", title: { vi: "Yield: hiệu suất thu hồi từ nguyên liệu", en: "Yield: good output from input material" }, status: "published" },
      { slug: "ng-rate", title: { vi: "Defect Rate: tỷ lệ lỗi (NG – No Good)", en: "Defect Rate (NG – No Good)" }, status: "published" },
      { slug: "fpy", title: { vi: "FPY (First Pass Yield): tỷ lệ đạt ngay lần đầu", en: "FPY (First Pass Yield)" }, status: "published" },
      { slug: "downtime-share", title: { vi: "Downtime Rate: tỷ lệ thời gian dừng máy", en: "Downtime Rate" }, status: "published" },
      { slug: "mtbf", title: { vi: "MTBF (Mean Time Between Failures): thời gian trung bình giữa các lần hỏng", en: "MTBF (Mean Time Between Failures)" }, status: "published" },
      { slug: "mttr", title: { vi: "MTTR (Mean Time To Repair): thời gian trung bình sửa chữa", en: "MTTR (Mean Time To Repair)" }, status: "published" },
      { slug: "attainment", title: { vi: "Attainment", en: "Attainment" }, status: "published" },
      { slug: "lean-fundamentals", title: { vi: "Lean Fundamentals: nguyên lý sản xuất tinh gọn", en: "Lean Fundamentals: core principles of lean" }, status: "published" },
      { slug: "5s", title: { vi: "5S (Sort, Set in Order, Shine, Standardize, Sustain): sắp xếp và duy trì nơi làm việc", en: "5S (Sort, Set in Order, Shine, Standardize, Sustain): organize and sustain the workplace" }, status: "published" },
      { slug: "kaizen", title: { vi: "Kaizen: cải tiến nhỏ và liên tục", en: "Kaizen: small, continuous improvement" }, status: "published" },
      { slug: "7-wastes", title: { vi: "7 Wastes: bảy loại lãng phí", en: "7 Wastes: the seven types of waste" }, status: "published" },
      { slug: "value-stream-mapping", title: { vi: "Value Stream Mapping: sơ đồ chuỗi giá trị", en: "Value Stream Mapping: map the flow of value" }, status: "published" },
      { slug: "just-in-time", title: { vi: "Just In Time: sản xuất đúng lúc", en: "Just In Time: produce what is needed, when needed" }, status: "published" },
      { slug: "kanban", title: { vi: "Kanban: quản lý luồng bằng thẻ tín hiệu", en: "Kanban: flow control with signal cards" }, status: "published" },
      { slug: "standard-work", title: { vi: "Standard Work: công việc tiêu chuẩn", en: "Standard Work: the agreed way of working" }, status: "published" },
      { slug: "poka-yoke", title: { vi: "Poka-Yoke: chống sai lỗi", en: "Poka-Yoke: mistake-proofing" }, status: "published" },
      { slug: "smed", title: { vi: "SMED (Single-Minute Exchange of Die): giảm thời gian chuyển đổi", en: "SMED (Single-Minute Exchange of Die): reduce changeover time" }, status: "published" },
      { slug: "jidoka", title: { vi: "Jidoka: tự động hóa có khả năng phát hiện bất thường", en: "Jidoka: automation with abnormality detection" }, status: "published" },
      { slug: "heijunka", title: { vi: "Heijunka: cân bằng sản xuất", en: "Heijunka: production leveling" }, status: "published" },
      { slug: "pdca", title: { vi: "PDCA (Plan, Do, Check, Act)", en: "PDCA (Plan, Do, Check, Act)" }, status: "published" },
      { slug: "dmaic", title: { vi: "DMAIC (Define, Measure, Analyze, Improve, Control): năm bước cải tiến dựa trên dữ liệu", en: "DMAIC (Define, Measure, Analyze, Improve, Control): five data-driven improvement steps" }, status: "published" },
      { slug: "5-whys", title: { vi: "5 Whys", en: "5 Whys" }, status: "published" },
      { slug: "ishikawa", title: { vi: "Ishikawa", en: "Ishikawa" }, status: "published" },
      { slug: "pareto", title: { vi: "Pareto", en: "Pareto" }, status: "published" },
      { slug: "a3-problem-solving", title: { vi: "A3 Problem Solving: giải quyết vấn đề trên một trang", en: "A3 Problem Solving: solve on one page" }, status: "published" },
      { slug: "8d", title: { vi: "8D (Eight Disciplines): tám bước xử lý vấn đề chất lượng", en: "8D (Eight Disciplines): eight-step quality problem solving" }, status: "published" },
      { slug: "fmea", title: { vi: "FMEA (Failure Mode and Effects Analysis): phân tích lỗi tiềm ẩn và rủi ro", en: "FMEA (Failure Mode and Effects Analysis): failure modes and risk analysis" }, status: "published" },
      { slug: "swot", title: { vi: "SWOT (Strengths, Weaknesses, Opportunities, Threats): điểm mạnh, điểm yếu, cơ hội, thách thức", en: "SWOT (Strengths, Weaknesses, Opportunities, Threats)" }, status: "published" },
      { slug: "gemba-walk", title: { vi: "Gemba Walk", en: "Gemba Walk" }, status: "published" },
      { slug: "qc", title: { vi: "QC (Quality Control): kiểm soát chất lượng", en: "QC (Quality Control)" }, status: "published" },
      { slug: "qa", title: { vi: "QA (Quality Assurance): đảm bảo chất lượng", en: "QA (Quality Assurance)" }, status: "published" },
      { slug: "tqm", title: { vi: "TQM (Total Quality Management): quản lý chất lượng toàn diện", en: "TQM (Total Quality Management)" }, status: "published" },
      { slug: "six-sigma", title: { vi: "Six Sigma: quản lý chất lượng bằng dữ liệu", en: "Six Sigma: data-driven quality management" }, status: "published" },
      { slug: "spc", title: { vi: "SPC (Statistical Process Control): kiểm soát quá trình bằng thống kê", en: "SPC (Statistical Process Control)" }, status: "published" },
      { slug: "control-chart", title: { vi: "Control Chart: biểu đồ kiểm soát", en: "Control Chart: monitoring a process over time" }, status: "published" },
      { slug: "cpk", title: { vi: "Cp và Cpk (Process Capability Indices): năng lực quá trình", en: "Cp and Cpk (Process Capability Indices)" }, status: "published" },
      { slug: "ppm", title: { vi: "PPM (Parts Per Million): số lỗi trên một triệu sản phẩm", en: "PPM (Parts Per Million): defects per million" }, status: "published" },
      { slug: "rty", title: { vi: "RTY (Rolled Throughput Yield): tỷ lệ đạt xuyên suốt quy trình", en: "RTY (Rolled Throughput Yield)" }, status: "published" },
      { slug: "defect-analysis", title: { vi: "Defect Analysis: phân tích lỗi", en: "Defect Analysis: finding why defects happen" }, status: "published" },
      { slug: "inspection-sampling", title: { vi: "Inspection & Sampling: kiểm tra và lấy mẫu", en: "Inspection & Sampling: checking and sampling" }, status: "published" },
      { slug: "traceability", title: { vi: "Traceability: truy xuất nguồn gốc", en: "Traceability: tracing product origin" }, status: "published" },
      { slug: "ncr-capa", title: { vi: "NCR (Non-Conformance Report) & CAPA (Corrective and Preventive Action): báo cáo không phù hợp và hành động khắc phục", en: "NCR (Non-Conformance Report) & CAPA (Corrective and Preventive Action)" }, status: "published" },
      { slug: "production-planning", title: { vi: "Production Planning: lập kế hoạch sản xuất", en: "Production Planning: plan output" }, status: "published" },
      { slug: "production-scheduling", title: { vi: "Production Scheduling: lập lịch sản xuất chi tiết", en: "Production Scheduling: detailed sequencing" }, status: "published" },
      { slug: "capacity-planning", title: { vi: "Capacity Planning: hoạch định năng lực", en: "Capacity Planning: match capacity to demand" }, status: "published" },
      { slug: "line-balancing", title: { vi: "Line Balancing: cân bằng chuyền", en: "Line Balancing: even out the work across stations" }, status: "published" },
      { slug: "bottleneck-analysis", title: { vi: "Bottleneck Analysis: phân tích điểm nghẽn", en: "Bottleneck Analysis: find the constraint" }, status: "published" },
      { slug: "wip", title: { vi: "WIP (Work In Process): sản phẩm dở dang", en: "WIP (Work In Process)" }, status: "published" },
      { slug: "work-order", title: { vi: "Work Order: quản lý lệnh sản xuất", en: "Work Order: managing production orders" }, status: "published" },
      { slug: "changeover", title: { vi: "Changeover: chuyển đổi sản phẩm", en: "Changeover: switching between products" }, status: "published" },
      { slug: "material-planning", title: { vi: "Material Planning: hoạch định nguyên vật liệu", en: "Material Planning: plan materials" }, status: "published" },
      { slug: "forecast-error", title: { vi: "Sai số dự báo và WMAPE (Weighted Mean Absolute Percentage Error)", en: "Forecast error and WMAPE (Weighted Mean Absolute Percentage Error)" }, status: "published" },
      { slug: "production-control", title: { vi: "Production Control: kiểm soát sản xuất", en: "Production Control: track plan vs actual" }, status: "published" },
      { slug: "shopfloor-management", title: { vi: "Shopfloor Management: quản lý hiện trường", en: "Shopfloor Management: run the floor with data" }, status: "published" },
      { slug: "inventory-turnover", title: { vi: "Vòng quay tồn kho (Inventory Turnover)", en: "Inventory turnover" }, status: "published" },
      { slug: "otif", title: { vi: "OTIF (On Time In Full): đúng hạn và đủ hàng", en: "OTIF (On Time In Full)" }, status: "published" },
      { slug: "time-study", title: { vi: "Time Study: nghiên cứu thời gian", en: "Time Study: measuring work content" }, status: "published" },
      { slug: "motion-study", title: { vi: "Motion Study: nghiên cứu chuyển động", en: "Motion Study: studying body movements" }, status: "published" },
      { slug: "work-measurement", title: { vi: "Work Measurement: đo lường công việc", en: "Work Measurement: measuring work" }, status: "published" },
      { slug: "standard-time", title: { vi: "Standard Time: thời gian tiêu chuẩn", en: "Standard Time: the time allowed for a task" }, status: "published" },
      { slug: "manpower-calculation", title: { vi: "Manpower Calculation: tính nhân lực", en: "Manpower Calculation: how many people" }, status: "published" },
      { slug: "yamazumi", title: { vi: "Yamazumi Chart: biểu đồ phân bổ công việc", en: "Yamazumi Chart: task-time stacked bars" }, status: "published" },
      { slug: "workstation-design", title: { vi: "Workstation Design: thiết kế trạm làm việc", en: "Workstation Design: arrange the station" }, status: "published" },
      { slug: "ergonomics", title: { vi: "Ergonomics: công thái học", en: "Ergonomics: designing work for people" }, status: "published" },
      { slug: "capacity-calculation", title: { vi: "Capacity Calculation: tính công suất", en: "Capacity Calculation: how much a line can make" }, status: "published" },
      { slug: "labor-productivity", title: { vi: "Labor Productivity: năng suất lao động", en: "Labor Productivity: output per labor hour" }, status: "published" },
      { slug: "labor-cost", title: { vi: "Labor Cost: chi phí nhân công", en: "Labor Cost: cost of people" }, status: "published" },
      { slug: "material-cost", title: { vi: "Material Cost: chi phí nguyên vật liệu", en: "Material Cost: cost of materials" }, status: "published" },
      { slug: "manufacturing-overhead", title: { vi: "Manufacturing Overhead: chi phí sản xuất chung", en: "Manufacturing Overhead: indirect plant cost" }, status: "published" },
      { slug: "conversion-cost", title: { vi: "Conversion Cost: chi phí chuyển đổi", en: "Conversion Cost: cost to transform material" }, status: "published" },
      { slug: "cost-per-unit", title: { vi: "Cost per Unit: chi phí trên mỗi sản phẩm", en: "Cost per Unit: cost of each product" }, status: "published" },
      { slug: "scrap-cost", title: { vi: "Scrap Cost: chi phí phế phẩm", en: "Scrap Cost: cost of scrapped product" }, status: "published" },
      { slug: "rework-cost", title: { vi: "Rework Cost: chi phí làm lại", en: "Rework Cost: cost of fixing defects" }, status: "published" },
      { slug: "variance-analysis", title: { vi: "Variance Analysis: phân tích chênh lệch", en: "Variance Analysis: explaining cost gaps" }, status: "published" },
      { slug: "budget-vs-actual", title: { vi: "Budget vs Actual: ngân sách so với thực tế", en: "Budget vs Actual: plan against spend" }, status: "published" },
      { slug: "roi", title: { vi: "ROI (Return on Investment): lợi nhuận trên vốn đầu tư", en: "ROI (Return on Investment)" }, status: "published" },
      { slug: "cash-to-cash", title: { vi: "Cash-to-Cash: chu kỳ tiền mặt", en: "Cash-to-cash cycle" }, status: "published" },
      { slug: "preventive-maintenance", title: { vi: "Preventive Maintenance: bảo trì phòng ngừa", en: "Preventive Maintenance: scheduled care" }, status: "published" },
      { slug: "predictive-maintenance", title: { vi: "Predictive Maintenance: bảo trì dự báo", en: "Predictive Maintenance: act on condition" }, status: "published" },
      { slug: "corrective-maintenance", title: { vi: "Corrective Maintenance: bảo trì sửa chữa", en: "Corrective Maintenance: fix and record" }, status: "published" },
      { slug: "breakdown-maintenance", title: { vi: "Breakdown Maintenance: sửa khi hỏng", en: "Breakdown Maintenance: repair after failure" }, status: "published" },
      { slug: "tpm", title: { vi: "TPM (Total Productive Maintenance): bảo trì năng suất toàn diện", en: "TPM (Total Productive Maintenance)" }, status: "published" },
      { slug: "equipment-availability", title: { vi: "Equipment Availability: tính sẵn sàng của thiết bị", en: "Equipment Availability: uptime from failure data" }, status: "published" },
      { slug: "maintenance-planning", title: { vi: "Maintenance Planning: lập kế hoạch bảo trì", en: "Maintenance Planning: schedule the work" }, status: "published" },
      { slug: "spare-parts", title: { vi: "Spare Parts Management: quản lý phụ tùng", en: "Spare Parts Management: keep the right parts" }, status: "published" },
      { slug: "mes", title: { vi: "MES (Manufacturing Execution System): hệ thống thực thi sản xuất", en: "MES (Manufacturing Execution System)" }, status: "published" },
      { slug: "erp", title: { vi: "ERP (Enterprise Resource Planning): hoạch định nguồn lực doanh nghiệp", en: "ERP (Enterprise Resource Planning)" }, status: "published" },
      { slug: "iot-iiot", title: { vi: "IoT (Internet of Things) & IIoT (Industrial Internet of Things): kết nối thiết bị trong công nghiệp", en: "IoT (Internet of Things) & IIoT (Industrial Internet of Things): connecting factory equipment" }, status: "published" },
      { slug: "andon", title: { vi: "Andon: hệ thống báo động tại hiện trường", en: "Andon: floor alert system" }, status: "published" },
      { slug: "digital-mdi", title: { vi: "Digital MDI: bảng quản lý hằng ngày dạng số", en: "Digital MDI: a digital daily management board" }, status: "published" },
      { slug: "production-dashboard", title: { vi: "Production Dashboard: bảng điều khiển sản xuất", en: "Production Dashboard: a view of key KPIs" }, status: "published" },
      { slug: "real-time-monitoring", title: { vi: "Real-time Monitoring: theo dõi thời gian thực", en: "Real-time Monitoring: watching the line live" }, status: "published" },
      { slug: "machine-data-collection", title: { vi: "Machine Data Collection: thu thập dữ liệu máy", en: "Machine Data Collection: capturing machine signals" }, status: "published" },
      { slug: "data-driven-decision", title: { vi: "Data-driven Decision Making: quyết định dựa trên dữ liệu", en: "Data-driven Decision Making: decide with evidence" }, status: "published" },
      { slug: "smart-factory", title: { vi: "Smart Factory & Industry 4.0: nhà máy thông minh", en: "Smart Factory & Industry 4.0" }, status: "published" },
      { slug: "manufacturing-analytics-overview", title: { vi: "Manufacturing Analytics: tổng quan phân tích sản xuất", en: "Manufacturing Analytics: overview" }, status: "published" },
      { slug: "sqdc", title: { vi: "SQDC (Safety, Quality, Delivery, Cost): an toàn, chất lượng, giao hàng, chi phí", en: "SQDC (Safety, Quality, Delivery, Cost)" }, status: "published" },
      { slug: "hse-ehs", title: { vi: "HSE / EHS (Health, Safety and Environment): sức khỏe, an toàn và môi trường", en: "HSE / EHS (Health, Safety and Environment)" }, status: "published" },
      { slug: "iso-9001", title: { vi: "ISO 9001 (International Organization for Standardization): hệ thống quản lý chất lượng", en: "ISO 9001 (International Organization for Standardization): quality management system" }, status: "published" },
      { slug: "iso-14001", title: { vi: "ISO 14001 (International Organization for Standardization): quản lý môi trường", en: "ISO 14001 (International Organization for Standardization): environmental management" }, status: "published" },
      { slug: "iso-45001", title: { vi: "ISO 45001 (International Organization for Standardization): an toàn và sức khỏe nghề nghiệp", en: "ISO 45001 (International Organization for Standardization): occupational health and safety" }, status: "published" },
      { slug: "apqp", title: { vi: "APQP (Advanced Product Quality Planning): hoạch định chất lượng sản phẩm nâng cao", en: "APQP (Advanced Product Quality Planning)" }, status: "published" },
      { slug: "ppap", title: { vi: "PPAP (Production Part Approval Process): phê duyệt sản phẩm sản xuất", en: "PPAP (Production Part Approval Process)" }, status: "published" },
      { slug: "msa", title: { vi: "MSA (Measurement System Analysis): phân tích hệ thống đo lường", en: "MSA (Measurement System Analysis)" }, status: "published" },
      { slug: "4m-5m1e", title: { vi: "4M / 5M1E (Man, Machine, Material, Method, Measurement, Environment): các yếu tố ảnh hưởng đến sản xuất", en: "4M / 5M1E (Man, Machine, Material, Method, Measurement, Environment): factors that affect production" }, status: "published" },
      { slug: "visual-management", title: { vi: "Visual Management", en: "Visual Management" }, status: "published" },
      { slug: "capacity-utilization", title: { vi: "Capacity Utilization: mức sử dụng công suất", en: "Capacity Utilization: how much capacity is used" }, status: "published" },
      { slug: "bottleneck-rate", title: { vi: "Bottleneck Rate: tỷ lệ đạt của điểm nghẽn", en: "Bottleneck Rate: achievement of the constraint" }, status: "published" },
    ],
  },
  {
    slug: "industrial-iot",
    title: { vi: "IIoT Data & Control Flow", en: "IIoT Data & Control Flow" },
    description: {
      vi: "",
      en: "",
    },
    topics: [
      { slug: "plc", title: { vi: "PLC", en: "PLC" }, status: "published" },
      { slug: "mqtt", title: { vi: "MQTT", en: "MQTT" }, status: "published" },
      { slug: "sensor", title: { vi: "Sensor", en: "Sensor" }, status: "published" },
      { slug: "scada", title: { vi: "SCADA", en: "SCADA" }, status: "published" },
    ],
  },
  {
    slug: "digital-manufacturing",
    title: { vi: "Digital Manufacturing", en: "Digital Manufacturing" },
    description: {
      vi: "MES, ERP, Andon và Smart Factory.",
      en: "MES, ERP, Andon and the Smart Factory.",
    },
    topics: [
      { slug: "mes", title: { vi: "MES", en: "MES" }, status: "draft" },
      { slug: "erp", title: { vi: "ERP", en: "ERP" }, status: "draft" },
      { slug: "andon", title: { vi: "Andon", en: "Andon" }, status: "draft" },
      { slug: "smart-factory", title: { vi: "Smart Factory", en: "Smart Factory" }, status: "draft" },
    ],
  },
];

export const articles: Article[] = [
  {
    slug: "database",
    categorySlug: "data-fundamentals",
    title: {
      vi: "Giới thiệu về cơ sở dữ liệu",
      en: "Introduction to Database",
    },
    summary: {
      vi: "Database là gì, khác gì với Data và DBMS, và vai trò của Database trong nhà máy và BI.",
      en: "What a database is, how it differs from data and DBMS, and its role in factories and BI.",
    },
    difficulty: "Beginner",
    thumbnail: "https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/Data%20Fundamentals/Data%20Fundamentals_database.jpg",
    overview: {
      vi: "Trong một nhà máy, mỗi ngày phát sinh hàng trăm con số: sản lượng từng ca, số sản phẩm lỗi, thời gian máy dừng. Nếu các con số này nằm rải rác trong nhiều file Excel, không ai trả lời nhanh được câu hỏi như 'hôm qua dây chuyền nào ra ít sản lượng nhất'. Bài này giúp bạn hình dung bức tranh tổng thể: dữ liệu là gì, database và DBMS khác nhau thế nào, và dữ liệu đi từ nhà máy đến báo cáo BI ra sao. Bài này không yêu cầu kiến thức trước.",
      en: "In a factory, hundreds of numbers are produced every day: output per shift, defective products, machine downtime. If these numbers sit in many scattered Excel files, nobody can quickly answer a question such as 'which line produced the least output yesterday'. This lesson gives you the big picture: what data is, how a database and a DBMS differ, and how data flows from the factory to BI reports. No prior knowledge is needed.",
    },
    objectives: [
      { vi: "Định nghĩa được dữ liệu (Data), cơ sở dữ liệu (Database) và hệ quản trị cơ sở dữ liệu (DBMS), và phân biệt ba khái niệm này.", en: "Define data, a database and a DBMS, and tell the three apart." },
      { vi: "Giải thích vì sao doanh nghiệp cần quản lý dữ liệu có hệ thống thay vì dùng nhiều file rời rạc.", en: "Explain why a business needs systematically managed data instead of many scattered files." },
      { vi: "So sánh vai trò của Excel và Database trong công việc hằng ngày.", en: "Compare the roles of Excel and a database in everyday work." },
      { vi: "Nhận biết table, row, column và SQL ở mức nhập môn.", en: "Recognize tables, rows, columns and SQL at an introductory level." },
      { vi: "Mô tả luồng dữ liệu cơ bản từ nhà máy đến báo cáo BI.", en: "Describe the basic data flow from the factory to BI reports." },
    ],
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
      { label: "PostgreSQL", code: "CREATE TABLE production_output (\n  id          INT PRIMARY KEY,\n  line        VARCHAR(10),\n  output_date DATE,\n  output      INT\n);\n\nINSERT INTO production_output (id, line, output_date, output) VALUES\n  (1, 'L01', '2026-11-01', 500),\n  (2, 'L01', '2026-11-02', 520),\n  (3, 'L02', '2026-11-01', 450),\n  (4, 'L03', '2026-11-01', 300),\n  (5, 'L03', '2026-11-02', 300);\n\nSELECT id, line, output_date, output\nFROM production_output\nORDER BY id;\n\nSELECT line, SUM(output) AS total_output\nFROM production_output\nGROUP BY line\nORDER BY line;" },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Phát biểu nào đúng?\nA. Database là phần mềm quản lý dữ liệu.\nB. DBMS là phần mềm quản lý database.\nC. Dữ liệu và database là một.\nD. Excel là một DBMS.\n2) (Đúng/Sai) Database tự động làm sạch dữ liệu nhập sai.\n3) (Tình huống) Quản lý hỏi: 'Hôm qua dây chuyền nào ra ít sản lượng nhất?' Vì sao câu trả lời nhanh hơn khi dữ liệu nằm trong database thay vì nhiều file Excel?\n4) (Truy vấn) Viết câu SELECT lấy toàn bộ dòng của bảng production_output có output lớn hơn 400.\n5) (Đọc kết quả) Với bảng mẫu của bài này, tổng sản lượng của L03 là bao nhiêu?",
      en: "1) (Multiple choice) Which statement is correct?\nA. A database is software that manages data.\nB. A DBMS is software that manages a database.\nC. Data and a database are the same thing.\nD. Excel is a DBMS.\n2) (True/False) A database automatically cleans wrongly entered data.\n3) (Scenario) A manager asks: 'Which line produced the least output yesterday?' Why is the answer faster when the data sits in a database than in many Excel files?\n4) (Query) Write a SELECT that returns all rows of production_output where output is greater than 400.\n5) (Read the result) In this lesson's sample table, what is the total output of L03?",
    },
    answer: {
      vi: "1) B. DBMS là phần mềm quản lý database; database là nơi chứa dữ liệu.\n2) Sai. Database không tự làm sạch dữ liệu; cần thiết kế bảng, ràng buộc và quy trình nhập liệu.\n3) Vì dữ liệu có cấu trúc (dây chuyền, ngày, sản lượng) nên có thể nhóm và tổng hợp bằng một câu SQL, không phải ghép nhiều file bằng tay.\n4) SELECT * FROM production_output WHERE output > 400; Kết quả: id 1, 2, 3.\n5) 600 (300 + 300).",
      en: "1) B. A DBMS is the software that manages a database; the database is where the data is stored.\n2) False. A database does not clean data by itself; it needs table design, constraints and entry procedures.\n3) Because the data has structure (line, date, output), one SQL statement can group and total it, instead of merging files by hand.\n4) SELECT * FROM production_output WHERE output > 400; Result: ids 1, 2, 3.\n5) 600 (300 + 300).",
    },
    relatedTopics: ["data-types", "etl", "data-warehouse"],
  },
  {
    slug: "oee",
    categorySlug: "manufacturing-analytics",
    title: {
      vi: "OEE (Overall Equipment Effectiveness) là gì? Hướng dẫn tính OEE trong nhà máy",
      en: "What is OEE (Overall Equipment Effectiveness)? How to Calculate OEE in Manufacturing",
    },
    summary: {
      vi: "OEE đo hiệu suất thực tế của một máy hoặc một line so với năng lực tối đa lý thuyết.",
      en: "OEE measures how well a machine or line performs compared with its theoretical maximum.",
    },
    difficulty: "Beginner",
    overview: {
      vi: "OEE (Overall Equipment Effectiveness) là chỉ số tổng hợp cho biết thời gian máy thực sự tạo ra sản phẩm tốt, tính theo tỷ lệ với thời gian kế hoạch. Đây là chỉ số phổ biến nhất trong sản xuất rời rạc và sản xuất liên tục.",
      en: "OEE (Overall Equipment Effectiveness) is a composite metric showing how much of the planned production time a machine actually spends making good parts. It is the most widely used metric in discrete and continuous manufacturing.",
    },
    objectives: [
      {
        vi: "Hiểu ba thành phần của OEE: Availability, Performance, Quality.",
        en: "Understand the three OEE components: Availability, Performance, Quality.",
      },
      {
        vi: "Tính được OEE từ dữ liệu máy và dữ liệu sản lượng.",
        en: "Calculate OEE from machine and production-count data.",
      },
      {
        vi: "Nhận biết tổn thất lớn nhất (Six Big Losses) trên một line.",
        en: "Identify the largest losses on a line (Six Big Losses).",
      },
    ],
    explanation: {
      vi: "OEE = Availability × Performance × Quality. Availability phản ánh thời gian dừng máy (hỏng, setup). Performance phản ánh tốc độ thực tế so với tốc độ lý tưởng (chạy chậm, dừng ngắn). Quality phản ánh tỷ lệ sản phẩm đạt (phế phẩm, làm lại). Ba yếu tố nhân với nhau nên chỉ cần một yếu tố thấp là OEE giảm mạnh.",
      en: "OEE = Availability × Performance × Quality. Availability captures time lost to stops (breakdowns, changeovers). Performance captures speed loss versus the ideal cycle time (slow running, minor stops). Quality captures defects and rework. Because the three are multiplied, one weak factor pulls the whole OEE down.",
    },
    practicalExample: {
      vi: "Một line có 480 phút kế hoạch, dừng 60 phút (hỏng + setup), ideal cycle time 1 phút/sản phẩm, sản xuất 380 sản phẩm, trong đó 360 sản phẩm đạt.\nAvailability = 420/480 = 87.5%.\nPerformance = (1 × 380) / 420 = 90.5%.\nQuality = 360/380 = 94.7%.\nOEE ≈ 75.0%.",
      en: "A line has 480 planned minutes, 60 minutes of stops (breakdown + changeover), an ideal cycle time of 1 minute per part, and produces 380 parts, of which 360 are good.\nAvailability = 420/480 = 87.5%.\nPerformance = (1 × 380) / 420 = 90.5%.\nQuality = 360/380 = 94.7%.\nOEE ≈ 75.0%.",
    },
    formula: [
      {
        label: "SQL",
        code: `-- OEE theo lệnh trên bộ dữ liệu NOVA MANUFACTURING
WITH base AS (
  SELECT order_id, COUNT(*) AS machine_hours,
         SUM(good_qty) AS good, SUM(total_qty) AS total
  FROM production_records
  GROUP BY order_id
),
dt AS (
  SELECT order_id, COALESCE(SUM(duration_minutes), 0) AS down_min
  FROM downtime_events
  GROUP BY order_id
)
SELECT b.order_id,
       ROUND((b.machine_hours * 60.0 - COALESCE(d.down_min, 0)) / (b.machine_hours * 60.0), 4) AS availability,
       ROUND((p.standard_cycle_sec * b.total) / ((b.machine_hours * 60.0 - COALESCE(d.down_min, 0)) * 60.0), 4) AS performance,
       ROUND(b.good * 1.0 / b.total, 4) AS quality,
       ROUND(
         (b.machine_hours * 60.0 - COALESCE(d.down_min, 0)) / (b.machine_hours * 60.0)
         * (p.standard_cycle_sec * b.total) / ((b.machine_hours * 60.0 - COALESCE(d.down_min, 0)) * 60.0)
         * (b.good * 1.0 / b.total),
         4
       ) AS oee
FROM base b
JOIN production_orders o ON o.order_id = b.order_id
JOIN products p ON p.product_id = o.product_id
LEFT JOIN dt d ON d.order_id = b.order_id
ORDER BY b.order_id;`,
      },
    ],
    exercise: {
      vi: "Một ca làm việc 8 giờ (480 phút) có 45 phút dừng máy, ideal cycle time 0.5 phút, sản xuất 700 sản phẩm, 665 sản phẩm đạt. Hãy tính Availability, Performance, Quality và OEE. Dữ liệu mẫu có thể tải tại trang Data Playground.",
      en: "An 8-hour shift (480 minutes) has 45 minutes of stops, an ideal cycle time of 0.5 minutes, produces 700 parts, and 665 are good. Calculate Availability, Performance, Quality and OEE. Sample data is available in the Data Playground.",
    },
    answer: {
      vi: "Availability = (480 - 45) / 480 = 435 / 480 ≈ 90.6%. Performance = (0.5 × 700) / 435 ≈ 80.5%. Quality = 665 / 700 = 95.0%. OEE = 0.906 × 0.805 × 0.950 ≈ 69.3%.",
      en: "Availability = (480 - 45) / 480 = 435 / 480 ≈ 90.6%. Performance = (0.5 × 700) / 435 ≈ 80.5%. Quality = 665 / 700 = 95.0%. OEE = 0.906 × 0.805 × 0.950 ≈ 69.3%.",
    },
    relatedTopics: ["uph", "yield", "downtime"],
  },
  {
    slug: "database-systems",
    categorySlug: "data-fundamentals",
    title: { vi: "Hệ quản trị cơ sở dữ liệu (DBMS)", en: "Database Systems" },
    thumbnail: "https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/Data%20Fundamentals/Data%20Fundamentals_database-systems.jpg",
    summary: {
      vi: "Các loại hệ quản trị CSDL phổ biến, và cách chọn loại phù hợp cho nhà máy và BI.",
      en: "Common database management systems, and how to choose the right type for a factory and BI.",
    },
    difficulty: "Beginner",
    overview: {
      vi: "Ở bài trước bạn đã biết database là nơi chứa dữ liệu. Phần mềm giữ cho dữ liệu đó luôn sẵn sàng, đúng và an toàn chính là DBMS. Khi MES ghi sản lượng hoặc công cụ BI đọc báo cáo, DBMS là bên nhận yêu cầu, kiểm tra quyền, thực hiện thao tác và trả kết quả. Hiểu DBMS giúp bạn biết vì sao không nên dùng chung một tài khoản quản trị cho mọi ứng dụng.",
      en: "In the previous lesson you learned that a database is where data is stored. The software that keeps that data available, correct and safe is the DBMS. When MES records output or a BI tool reads a report, the DBMS receives the request, checks permissions, performs the operation and returns the result. Understanding the DBMS explains why one administrator account should not be shared by every application.",
    },
    objectives: [
      { vi: "Giải thích DBMS là gì và nêu các chức năng chính của nó.", en: "Explain what a DBMS is and list its main functions." },
      { vi: "Phân biệt database với DBMS.", en: "Distinguish a database from a DBMS." },
      { vi: "Nhận biết client, server và database user ở mức cơ bản.", en: "Recognize client, server and database user at a basic level." },
      { vi: "So sánh khái quát PostgreSQL, MySQL, SQL Server và Oracle.", en: "Compare PostgreSQL, MySQL, SQL Server and Oracle at a high level." },
      { vi: "Hiểu transaction, phân quyền (access control) và backup ở mức nhập môn.", en: "Understand transactions, access control and backup at an introductory level." },
    ],
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
      { label: "PostgreSQL", code: "CREATE TABLE production_output (\n  id          INT PRIMARY KEY,\n  line        VARCHAR(10),\n  output_date DATE,\n  output      INT\n);\nINSERT INTO production_output (id, line, output_date, output) VALUES\n  (1, 'L01', '2026-11-01', 500),\n  (2, 'L01', '2026-11-02', 520),\n  (3, 'L02', '2026-11-01', 450),\n  (4, 'L03', '2026-11-01', 300),\n  (5, 'L03', '2026-11-02', 300);\n\n-- Vai trò chỉ đọc cho công cụ BI\nCREATE ROLE bi_reader;\nGRANT SELECT ON production_output TO bi_reader;\n\n-- Giao dịch: thêm một dòng rồi hủy\nBEGIN;\nINSERT INTO production_output (id, line, output_date, output)\n  VALUES (6, 'L02', '2026-11-02', 200);\nROLLBACK;\n\nSELECT COUNT(*) AS so_dong FROM production_output;" },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Thành phần nào của DBMS kiểm tra ai được đọc hoặc ghi bảng nào?\nA. Query processing\nB. Authorization (phân quyền)\nC. Backup\nD. Transaction log\n2) (Đúng/Sai) Công cụ BI nên dùng tài khoản admin để có đủ quyền đọc mọi bảng.\n3) (Tình huống) Hai máy cùng ghi sản lượng vào một bảng cùng lúc. DBMS làm gì để dữ liệu không bị hỏng?\n4) (Trắc nghiệm) ROLLBACK làm gì?\nA. Ghi thêm dữ liệu\nB. Hủy các thao tác trong giao dịch chưa COMMIT\nC. Xóa bảng\nD. Sao lưu database\n5) (Thảo luận) Nêu một điểm khác nhau giữa PostgreSQL và SQL Server, ngoài chi phí bản quyền.",
      en: "1) (Multiple choice) Which DBMS component decides who may read or write which table?\nA. Query processing\nB. Authorization\nC. Backup\nD. Transaction log\n2) (True/False) A BI tool should use an admin account so it can read every table.\n3) (Scenario) Two machines write output to the same table at the same time. What does the DBMS do so the data is not corrupted?\n4) (Multiple choice) What does ROLLBACK do?\nA. Adds data\nB. Cancels the operations of a transaction that has not been committed\nC. Deletes the table\nD. Backs up the database\n5) (Discussion) Name one difference between PostgreSQL and SQL Server other than licence cost.",
    },
    answer: {
      vi: "1) B. Phân quyền (authorization) quyết định tài khoản nào được làm gì trên bảng nào.\n2) Sai. Công cụ BI nên dùng tài khoản chỉ đọc; tài khoản admin có thể sửa hoặc xóa dữ liệu sản xuất.\n3) DBMS dùng kiểm soát đồng thời (concurrency control), ví dụ khóa ở mức dòng, để hai thao tác không ghi đè lên nhau một cách sai lệch.\n4) B. ROLLBACK hủy các thao tác trong giao dịch chưa COMMIT.\n5) Ví dụ: PostgreSQL là mã nguồn mở, SQL Server là phần mềm thương mại (có bản Express miễn phí); mỗi bên có ngôn ngữ thủ tục riêng (PL/pgSQL và T-SQL).",
      en: "1) B. Authorization decides which account may do what on which table.\n2) False. A BI tool should use a read-only account; an admin account can change or delete production data.\n3) The DBMS uses concurrency control, for example row-level locks, so two writes do not overwrite each other incorrectly.\n4) B. ROLLBACK cancels the operations of a transaction that has not been committed.\n5) For example: PostgreSQL is open source, SQL Server is commercial (with a free Express edition); each has its own procedural language (PL/pgSQL and T-SQL).",
    },
    relatedTopics: ["database", "relational-database", "data-warehouse"],
  },
  {
    slug: "relational-database",
    categorySlug: "data-fundamentals",
    title: { vi: "Cơ sở dữ liệu quan hệ", en: "Relational Database" },
    thumbnail: "https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/Data%20Fundamentals/Data%20Fundamentals_relational-database.jpg",
    summary: {
      vi: "Dữ liệu lưu trong bảng gồm hàng và cột, các bảng liên kết với nhau bằng khóa.",
      en: "Data is stored in tables of rows and columns, linked to each other by keys.",
    },
    difficulty: "Beginner",
    overview: {
      vi: "Trong nhà máy, dữ liệu sản xuất luôn gắn với các đối tượng khác: một lệnh sản xuất chạy trên một dây chuyền và làm ra một sản phẩm. Cơ sở dữ liệu quan hệ (relational database) lưu mỗi loại đối tượng vào một bảng riêng, rồi nối các bảng bằng mã. Cách làm này giúp không phải ghi lặp tên dây chuyền hay tên sản phẩm ở mỗi dòng, và khi tên thay đổi chỉ cần sửa một chỗ. Đây là mô hình được dùng nhiều nhất trong các hệ thống sản xuất và BI.",
      en: "In a factory, production data is always linked to other objects: a production order runs on one line and makes one product. A relational database stores each kind of object in its own table and links the tables through codes. This avoids writing the line name or product name on every row, and a rename only needs one change. It is the most widely used model in manufacturing systems and BI.",
    },
    objectives: [
      { vi: "Giải thích relational database: dữ liệu được tổ chức thành bảng và quan hệ.", en: "Explain a relational database: data organized into tables and relationships." },
      { vi: "Nhận biết schema, table, record (row), attribute (column) và domain.", en: "Recognize schema, table, record (row), attribute (column) and domain." },
      { vi: "Hiểu vì sao dữ liệu được tách thành nhiều bảng.", en: "Understand why data is split into several tables." },
      { vi: "Phân biệt bảng danh mục (master data) và bảng giao dịch (transaction data).", en: "Distinguish master data tables from transaction data tables." },
      { vi: "Đọc được ví dụ gồm nhiều bảng liên kết bằng mã.", en: "Read an example of several tables linked by codes." },
    ],
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
      { label: "PostgreSQL", code: "CREATE TABLE production_lines (\n  line_id   INT,\n  line_code VARCHAR(10),\n  line_name VARCHAR(50),\n  area      VARCHAR(20)\n);\nCREATE TABLE products (\n  product_id   INT,\n  product_code VARCHAR(10),\n  product_name VARCHAR(50)\n);\nCREATE TABLE production_orders (\n  order_id    INT,\n  order_no    VARCHAR(20),\n  line_id     INT,\n  product_id  INT,\n  planned_qty INT\n);\n\nINSERT INTO production_lines VALUES\n  (1, 'L01', 'Dây chuyền 01', 'Khu A'),\n  (2, 'L02', 'Dây chuyền 02', 'Khu A'),\n  (3, 'L03', 'Dây chuyền 03', 'Khu B');\nINSERT INTO products VALUES\n  (1, 'P-001', 'Vỏ nhựa A'),\n  (2, 'P-002', 'Nắp B'),\n  (3, 'P-003', 'Khung C');\nINSERT INTO production_orders VALUES\n  (1, 'ORD-001', 1, 1, 1000),\n  (2, 'ORD-002', 2, 2, 800),\n  (3, 'ORD-003', 3, 3, 600),\n  (4, 'ORD-004', 1, 2, 500);\n\nSELECT o.order_no, l.line_code, p.product_code, o.planned_qty\nFROM production_orders o\nJOIN production_lines l ON l.line_id = o.line_id\nJOIN products p ON p.product_id = o.product_id\nORDER BY o.order_id;" },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Trong bảng production_lines, mỗi hàng đại diện cho gì?\nA. Một cột thuộc tính\nB. Một dây chuyền\nC. Một sản phẩm\nD. Một lệnh sản xuất\n2) (Đúng/Sai) Nên ghi tên dây chuyền ở mọi dòng của production_orders để báo cáo nhanh hơn.\n3) (Tình huống) Dây chuyền L02 đổi tên thành 'Dây chuyền 02 - Mới'. Với thiết kế tách bảng, bạn cần sửa ở đâu?\n4) (Phân loại) products là bảng danh mục hay giao dịch? production_orders thì sao?\n5) (Truy vấn) Viết câu SELECT hiển thị order_no và line_code của các lệnh có planned_qty lớn hơn 700.",
      en: "1) (Multiple choice) In the production_lines table, what does each row represent?\nA. An attribute column\nB. A production line\nC. A product\nD. A production order\n2) (True/False) You should write the line name on every row of production_orders so that reports are faster.\n3) (Scenario) Line L02 is renamed 'Line 02 - New'. With the split-table design, where do you make the change?\n4) (Classify) Is products a master or a transaction table? What about production_orders?\n5) (Query) Write a SELECT that returns order_no and line_code for orders with planned_qty greater than 700.",
    },
    answer: {
      vi: "1) B.\n2) Sai. Ghi lặp làm khó sửa khi tên thay đổi; production_orders chỉ nên lưu line_id.\n3) Chỉ sửa một dòng trong bảng production_lines.\n4) products là bảng danh mục; production_orders là bảng giao dịch, được ghi liên tục.\n5) SELECT o.order_no, l.line_code FROM production_orders o JOIN production_lines l ON l.line_id = o.line_id WHERE o.planned_qty > 700; Kết quả: ORD-001 (L01) và ORD-002 (L02).",
      en: "1) B.\n2) False. Repeating names makes changes hard; production_orders should store only line_id.\n3) Change one row in the production_lines table.\n4) products is a master table; production_orders is a transaction table, recorded continuously.\n5) SELECT o.order_no, l.line_code FROM production_orders o JOIN production_lines l ON l.line_id = o.line_id WHERE o.planned_qty > 700; Result: ORD-001 (L01) and ORD-002 (L02).",
    },
    relatedTopics: ["database-systems", "keys", "relationships"],
  },
  {
    slug: "data-types",
    categorySlug: "data-fundamentals",
    title: { vi: "Kiểu dữ liệu", en: "Data Types" },
    thumbnail: "https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/Data%20Fundamentals/Data%20Fundamentals_data-types.jpg",
    summary: {
      vi: "Mỗi cột có một kiểu dữ liệu: số, chữ, ngày giờ, đúng/sai. Chọn đúng kiểu giúp dữ liệu chính xác và truy vấn nhanh hơn.",
      en: "Each column has a data type: number, text, date/time or boolean. Choosing the right type keeps data accurate and queries faster.",
    },
    difficulty: "Beginner",
    overview: {
      vi: "Mỗi cột trong bảng cần một kiểu dữ liệu: số lượng là số nguyên, mã dây chuyền là chữ, thời điểm ghi nhận là ngày giờ. Chọn đúng kiểu giúp dữ liệu được lưu chính xác, tính toán đúng và truy vấn nhanh hơn. Chọn sai có thể làm mã mất số 0 đầu, hoặc tính tiền bị lệch do sai số làm tròn. Bài này tập trung vào các nhóm kiểu phổ biến trong PostgreSQL và cách chọn kiểu cho dữ liệu sản xuất.",
      en: "Every column in a table needs a data type: quantities are whole numbers, line codes are text, and recording times are timestamps. The right type keeps values accurate, calculations correct and queries fast. A wrong type can strip the leading zeros of a code, or make money totals drift because of rounding. This lesson covers the common PostgreSQL type groups and how to choose types for production data.",
    },
    objectives: [
      { vi: "Giải thích Data Type là gì và vì sao mỗi cột cần một kiểu.", en: "Explain what a data type is and why every column needs one." },
      { vi: "Phân biệt nhóm số, chuỗi, ngày giờ và Boolean.", en: "Distinguish numeric, text, date/time and boolean types." },
      { vi: "Chọn kiểu dữ liệu PostgreSQL phù hợp cho dữ liệu sản xuất.", en: "Choose suitable PostgreSQL data types for production data." },
      { vi: "Nhận biết NULL khác 0, FALSE và chuỗi rỗng.", en: "Tell NULL apart from 0, FALSE and an empty string." },
      { vi: "Đọc khai báo kiểu trong CREATE TABLE và dùng CAST ở mức đơn giản.", en: "Read type declarations in CREATE TABLE and use CAST at a basic level." },
    ],
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
      { label: "PostgreSQL", code: "CREATE TABLE production_quality (\n  id              INT PRIMARY KEY,\n  line_code       VARCHAR(10),\n  output          INT,\n  yield_rate      NUMERIC(5,2),\n  production_date DATE,\n  event_time      TIMESTAMPTZ,\n  is_passed       BOOLEAN\n);\n\nINSERT INTO production_quality VALUES\n  (1, 'L01', 520, 98.75, '2026-11-01', '2026-11-01 08:30:00+07', TRUE),\n  (2, 'L02', 450, 95.10, '2026-11-01', '2026-11-01 09:15:00+07', TRUE),\n  (3, 'L03', 300, NULL,  '2026-11-02', '2026-11-02 10:00:00+07', FALSE);\n\nSELECT id, line_code, yield_rate FROM production_quality WHERE yield_rate IS NULL;\n\nSELECT COUNT(*) AS so_dong_dat FROM production_quality WHERE is_passed = TRUE;\n\nSELECT CAST('000123' AS INTEGER) AS ep_so, '000123'::VARCHAR AS giu_chuoi;" },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Kiểu nào phù hợp nhất để lưu số lượng sản phẩm đã làm ra?\nA. VARCHAR\nB. INTEGER\nC. BOOLEAN\nD. DATE\n2) (Đúng/Sai) NULL và 0 có cùng ý nghĩa: đều nghĩa là không có sản lượng.\n3) (Tình huống) Mã lô '000123' bị mất số 0 đầu khi lưu thành số. Nên chọn kiểu nào và vì sao?\n4) (Chọn kiểu) Chọn kiểu cho: tỷ lệ đạt 98.75%, thời điểm máy dừng có múi giờ, cờ đạt hay không đạt.\n5) (Truy vấn) Viết câu SELECT lấy các dòng có is_passed = FALSE trong bảng production_quality.",
      en: "1) (Multiple choice) Which type best stores the number of units produced?\nA. VARCHAR\nB. INTEGER\nC. BOOLEAN\nD. DATE\n2) (True/False) NULL and 0 mean the same thing: no output.\n3) (Scenario) Batch code '000123' loses its leading zeros when stored as a number. Which type should you use, and why?\n4) (Choose types) Choose types for: a 98.75% pass rate, a machine stop time with a time zone, a pass/fail flag.\n5) (Query) Write a SELECT that returns the rows of production_quality where is_passed = FALSE.",
    },
    answer: {
      vi: "1) B. INTEGER phù hợp cho số đếm.\n2) Sai. NULL nghĩa là chưa biết hoặc không có giá trị; 0 là một số cụ thể. Chưa đo được thì để NULL.\n3) VARCHAR, vì mã có số 0 đầu; chuyển sang số sẽ làm mất số 0.\n4) NUMERIC(5,2) cho tỷ lệ; TIMESTAMPTZ cho thời điểm có múi giờ; BOOLEAN cho cờ đạt hay không đạt.\n5) SELECT * FROM production_quality WHERE is_passed = FALSE; Kết quả: dòng id 3 (L03).",
      en: "1) B. INTEGER suits counts.\n2) False. NULL means unknown or no value; 0 is a specific number. If it was not measured, store NULL.\n3) VARCHAR, because the code has leading zeros; converting to a number removes them.\n4) NUMERIC(5,2) for the rate; TIMESTAMPTZ for a time with a time zone; BOOLEAN for the pass/fail flag.\n5) SELECT * FROM production_quality WHERE is_passed = FALSE; Result: row id 3 (L03).",
    },
    relatedTopics: ["database", "constraints", "keys"],
  },
  {
    slug: "keys",
    categorySlug: "data-fundamentals",
    title: { vi: "Khóa (Keys)", en: "Keys" },
    thumbnail: "https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/Data%20Fundamentals/Data%20Fundamentals_keys.jpg",
    summary: {
      vi: "Khóa chính, khóa ngoại, khóa ứng viên và khóa tổng hợp giúp nhận diện và liên kết bản ghi.",
      en: "Primary, foreign, candidate and composite keys identify records and link tables.",
    },
    difficulty: "Beginner",
    overview: {
      vi: "Trong bảng lệnh sản xuất, mỗi dòng phải được nhận diện rõ ràng. Nếu hai lệnh cùng một mã, báo cáo sản lượng sẽ cộng nhầm. Khóa (key) là cột hoặc nhóm cột dùng để nhận diện một bản ghi và để nối các bảng với nhau. Bài này giải thích khóa chính (primary key), khóa ngoại (foreign key), các loại khóa khác và cách chọn khóa cho bảng sản xuất.",
      en: "In a production order table, every row must be clearly identifiable. If two orders share a code, output reports will add up wrongly. A key is a column or group of columns that identifies a record and links tables together. This lesson explains primary keys, foreign keys, the other key types, and how to choose keys for production tables.",
    },
    objectives: [
      { vi: "Giải thích mục đích của khóa trong việc nhận diện và liên kết bản ghi.", en: "Explain the purpose of keys in identifying and linking records." },
      { vi: "Phân biệt primary key và foreign key.", en: "Distinguish a primary key from a foreign key." },
      { vi: "Nhận biết candidate key, alternate key và composite key.", en: "Recognize candidate, alternate and composite keys." },
      { vi: "Chọn được khóa phù hợp cho bảng lệnh sản xuất và bảng sản lượng.", en: "Choose suitable keys for production order and output tables." },
      { vi: "Hiểu vì sao khóa giúp tránh bản ghi trùng và hỗ trợ liên kết bảng.", en: "Understand how keys prevent duplicate records and support table links." },
    ],
    explanation: {
      vi: "1. Key là một hoặc nhiều thuộc tính dùng để nhận diện hoặc liên kết bản ghi. Ví dụ: order_id nhận diện một lệnh; production_output.order_id nối một dòng sản lượng với đúng lệnh của nó.\n2. Super key và candidate key: super key là bất kỳ tập thuộc tính nào nhận diện duy nhất một bản ghi. Candidate key là super key tối thiểu: bỏ bớt một cột là không còn duy nhất. Ví dụ: order_id là candidate key; (order_id, shift_code) là super key nhưng không tối thiểu.\n3. Primary key (khóa chính): candidate key được chọn làm khóa chính. Giá trị duy nhất và không NULL. Mỗi bảng có tối đa một primary key, nhưng primary key có thể gồm nhiều cột. Ví dụ: production_orders.order_id.\n4. Alternate key: candidate key không được chọn làm primary key. Ví dụ: order_no (mã lệnh) là duy nhất nhưng không phải primary key; thường được khai báo UNIQUE.\n5. Foreign key (khóa ngoại): cột tham chiếu đến khóa chính (hoặc khóa duy nhất) của bảng khác. Giá trị phải tồn tại ở bảng cha, hoặc NULL nếu cột cho phép. Ví dụ: production_output.order_id trỏ đến production_orders.order_id. Không thể ghi sản lượng cho một lệnh không tồn tại.\n6. Composite key (khóa ghép): khóa gồm nhiều cột. Ví dụ: (line_id, shift_date, shift_code) xác định một ca của một dây chuyền trong một ngày, nếu mỗi dây chuyền chỉ có một ca như vậy mỗi ngày.\n7. Natural key và surrogate key: natural key có ý nghĩa nghiệp vụ, ví dụ employee_code hay số CCCD. Surrogate key là số do hệ thống tạo ra, không mang nghĩa, ví dụ employee_id. Natural key có thể đổi hoặc nhập sai; surrogate key ổn định nhưng không tự có ý nghĩa.\nVì sao không dùng tên dây chuyền làm khóa: tên có thể đổi, mà khóa thì không nên đổi. Dùng line_id làm khóa, còn line_code là alternate key.",
      en: "1. A key is one or more attributes used to identify or link records. Example: order_id identifies an order; production_output.order_id links an output row to its own order.\n2. Super key and candidate key: a super key is any set of attributes that uniquely identifies a record. A candidate key is a minimal super key: remove any column and uniqueness is lost. Example: order_id is a candidate key; (order_id, shift_code) is a super key but not minimal.\n3. Primary key: the candidate key chosen as the main identifier. Values are unique and never NULL. A table has at most one primary key, which may span several columns. Example: production_orders.order_id.\n4. Alternate key: a candidate key that is not chosen as the primary key. Example: order_no is unique but not the primary key; it is usually declared UNIQUE.\n5. Foreign key: a column that refers to the primary (or unique) key of another table. The value must exist in the parent table, or be NULL where allowed. Example: production_output.order_id refers to production_orders.order_id. Output cannot be recorded for an order that does not exist.\n6. Composite key: a key made of several columns. Example: (line_id, shift_date, shift_code) identifies one shift of one line on one day, if each line has only one such shift per day.\n7. Natural and surrogate keys: a natural key has business meaning, for example an employee code or a national ID number. A surrogate key is a system-generated number with no meaning, for example employee_id. Natural keys can change or be mistyped; surrogate keys are stable but carry no meaning.\nWhy not use the line name as a key: names can change, and a key should not. Use line_id as the key, and line_code as an alternate key.",
    },
    extraSections: [
      {
        title: { vi: "Ứng dụng trong nhà máy", en: "Manufacturing application" },
        body: {
          vi: "Vấn đề nghiệp vụ: báo cáo sản lượng phải gắn đúng mỗi dòng ghi nhận với đúng lệnh sản xuất, và không được có hai lệnh cùng mã.\nDữ liệu có sẵn: production_orders (order_id, order_no, line_id, product_id, planned_qty) và production_output (output_id, order_id, output_time, shift_code, output_qty).\nLogic: order_id là primary key của production_orders; output_id là primary key của production_output; production_output.order_id là foreign key trỏ đến production_orders; order_no là alternate key, khai báo UNIQUE.\nKết quả mong đợi: không có dòng sản lượng nào thuộc lệnh không tồn tại; không có hai lệnh trùng mã.\nGiá trị kinh doanh: khi tên dây chuyền hay mã lệnh có thay đổi, khóa không đổi nên lịch sử sản lượng vẫn đúng.",
          en: "Business problem: output reports must attach each record to the right production order, and no two orders may share a code.\nAvailable data: production_orders (order_id, order_no, line_id, product_id, planned_qty) and production_output (output_id, order_id, output_time, shift_code, output_qty).\nLogic: order_id is the primary key of production_orders; output_id is the primary key of production_output; production_output.order_id is a foreign key to production_orders; order_no is an alternate key declared UNIQUE.\nExpected result: no output row belongs to a missing order; no two orders share a code.\nBusiness value: when a line name or order code changes, the keys stay the same, so output history remains correct.",
        },
      },
      {
        title: { vi: "Tổng kết và bài tiếp theo", en: "Key takeaways and what's next" },
        body: {
          vi: "Tổng kết:\n- Primary key nhận diện duy nhất mỗi dòng và không được NULL.\n- Foreign key nối bảng và bảo đảm giá trị tồn tại ở bảng cha.\n- Khóa tự nhiên có thể đổi, nên cân nhắc khóa thay thế.\nBài tiếp theo: Quan hệ giữa các bảng. Vị trí đặt khóa ngoại phụ thuộc vào loại quan hệ giữa hai bảng.",
          en: "Key takeaways:\n- A primary key identifies each row uniquely and is never NULL.\n- A foreign key links tables and guarantees the value exists in the parent table.\n- Natural keys can change, so consider surrogate keys.\nNext lesson: Table Relationships. Where the foreign key sits depends on the type of relationship between the two tables.",
        },
      },
    ],
    practicalExample: {
      vi: "Thực hành: (1) tạo production_orders với order_id làm primary key và order_no UNIQUE; (2) tạo production_output với output_id làm primary key và order_id làm foreign key; (3) thêm dữ liệu hợp lệ; (4) tính tổng sản lượng theo lệnh; (5) tạo bảng line_shift_plan có khóa ghép. Kết quả mong đợi: ORD-001 = 1020, ORD-002 = 450, ORD-003 = 600, ORD-004 = 210.",
      en: "Hands-on: (1) create production_orders with order_id as the primary key and order_no UNIQUE; (2) create production_output with output_id as the primary key and order_id as a foreign key; (3) insert valid data; (4) total output per order; (5) create the line_shift_plan table with a composite key. Expected result: ORD-001 = 1020, ORD-002 = 450, ORD-003 = 600, ORD-004 = 210.",
    },
    formula: [
      { label: "PostgreSQL", code: "CREATE TABLE production_orders (\n  order_id    INT PRIMARY KEY,\n  order_no    VARCHAR(20) UNIQUE,\n  line_id     INT,\n  product_id  INT,\n  planned_qty INT\n);\n\nCREATE TABLE production_output (\n  output_id   INT PRIMARY KEY,\n  order_id    INT REFERENCES production_orders(order_id),\n  output_time TIMESTAMP,\n  shift_code  VARCHAR(5),\n  output_qty  INT\n);\n\nINSERT INTO production_orders VALUES\n  (1, 'ORD-001', 1, 1, 1000),\n  (2, 'ORD-002', 2, 2, 800),\n  (3, 'ORD-003', 3, 3, 600),\n  (4, 'ORD-004', 1, 2, 500);\n\nINSERT INTO production_output VALUES\n  (1, 1, '2026-11-01 08:00', 'A', 500),\n  (2, 1, '2026-11-01 16:00', 'B', 520),\n  (3, 2, '2026-11-01 08:00', 'A', 450),\n  (4, 3, '2026-11-01 08:00', 'A', 300),\n  (5, 3, '2026-11-01 16:00', 'B', 300),\n  (6, 4, '2026-11-02 08:00', 'A', 210);\n\nSELECT o.order_no, SUM(p.output_qty) AS total_output\nFROM production_orders o\nJOIN production_output p ON p.order_id = o.order_id\nGROUP BY o.order_no\nORDER BY o.order_no;\n\n-- Khóa ghép: mỗi dây chuyền chỉ có một ca A hoặc B mỗi ngày\nCREATE TABLE line_shift_plan (\n  line_id    INT,\n  shift_date DATE,\n  shift_code VARCHAR(5),\n  PRIMARY KEY (line_id, shift_date, shift_code)\n);\nINSERT INTO line_shift_plan VALUES (1, '2026-11-01', 'A'), (1, '2026-11-01', 'B');" },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Primary key có đặc điểm nào?\nA. Có thể trùng nhau\nB. Có thể để NULL\nC. Duy nhất và không NULL\nD. Luôn là số tự tăng\n2) (Đúng/Sai) Foreign key bắt buộc phải duy nhất trong bảng chứa nó.\n3) (Tình huống) Mã nhân viên thay đổi khi chuyển bộ phận. Nên dùng natural key hay surrogate key làm primary key? Vì sao?\n4) (Phân loại) order_no (UNIQUE, không phải primary key) là loại khóa gì?\n5) (Giải thích) Vì sao một dòng sản lượng có order_id = 99 bị từ chối khi bảng production_orders không có lệnh 99?",
      en: "1) (Multiple choice) Which statement about a primary key is true?\nA. It can repeat\nB. It can be NULL\nC. It is unique and never NULL\nD. It is always an auto-increment number\n2) (True/False) A foreign key must be unique within the table that holds it.\n3) (Scenario) An employee code changes when someone moves department. Should the primary key be a natural key or a surrogate key? Why?\n4) (Classify) What kind of key is order_no (UNIQUE, not the primary key)?\n5) (Explain) Why is an output row with order_id = 99 rejected when production_orders has no order 99?",
    },
    answer: {
      vi: "1) C.\n2) Sai. Foreign key không cần duy nhất trong bảng chứa nó; nó chỉ phải trỏ tới khóa chính hoặc khóa duy nhất ở bảng cha.\n3) Surrogate key (ví dụ employee_id), vì khóa chính không nên phụ thuộc vào giá trị có thể thay đổi. Mã nhân viên vẫn giữ làm cột UNIQUE.\n4) Alternate key: candidate key không được chọn làm primary key.\n5) Vì foreign key yêu cầu giá trị phải tồn tại ở bảng cha; database từ chối để không ghi sản lượng cho một lệnh không tồn tại.",
      en: "1) C.\n2) False. A foreign key need not be unique in its own table; it only has to refer to a primary or unique key in the parent table.\n3) A surrogate key (for example employee_id), because a primary key should not depend on a value that can change. The employee code stays as a UNIQUE column.\n4) An alternate key: a candidate key not chosen as the primary key.\n5) Because a foreign key requires the value to exist in the parent table; the database refuses to record output for an order that does not exist.",
    },
    relatedTopics: ["relationships", "constraints", "relational-database"],
  },
  {
    slug: "relationships",
    categorySlug: "data-fundamentals",
    title: { vi: "Quan hệ giữa các bảng", en: "Relationships" },
    thumbnail: "https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/Data%20Fundamentals/Data%20Fundamentals_relationships.jpg",
    summary: {
      vi: "Ba loại quan hệ: một-một, một-nhiều và nhiều-nhiều, và cách biểu diễn bằng khóa ngoại.",
      en: "The three relationship types: one-to-one, one-to-many and many-to-many, and how to model them with foreign keys.",
    },
    difficulty: "Beginner",
    overview: {
      vi: "Một dây chuyền có nhiều lệnh sản xuất; một lệnh dùng nhiều loại vật tư; và một loại vật tư được dùng trong nhiều lệnh. Các mối quan hệ này được gọi là 1:1, 1:N và N:N. Hiểu đúng loại quan hệ quyết định bảng nào giữ khóa ngoại và có cần thêm bảng trung gian hay không. Bài này dạy cách đọc quan hệ, cách thiết kế và cách dùng JOIN để xem dữ liệu liên bảng.",
      en: "A production line runs many production orders; an order uses many materials; and a material is used in many orders. These are 1:1, 1:N and N:N relationships. Knowing the relationship type decides which table holds the foreign key and whether a junction table is needed. This lesson teaches how to read relationships, design them, and use JOINs to see data across tables.",
    },
    objectives: [
      { vi: "Giải thích relationship giữa các bảng.", en: "Explain relationships between tables." },
      { vi: "Phân biệt quan hệ 1:1, 1:N và N:N.", en: "Distinguish 1:1, 1:N and N:N relationships." },
      { vi: "Xác định bảng nào giữ khóa ngoại trong quan hệ thông dụng.", en: "Identify which table holds the foreign key in common relationships." },
      { vi: "Dùng bảng trung gian (junction table) cho quan hệ N:N.", en: "Use a junction table for an N:N relationship." },
      { vi: "Đọc ví dụ quan hệ nhà máy và dự đoán kết quả của INNER JOIN và LEFT JOIN.", en: "Read a factory relationship example and predict INNER JOIN and LEFT JOIN results." },
    ],
    explanation: {
      vi: "1. Quan hệ 1:1 (một với một): một bản ghi A tương ứng tối đa một bản ghi B. Ví dụ: mỗi dây chuyền có đúng một bản cài đặt (line_settings) chứa định mức UPH mục tiêu. Khóa ngoại thường đồng thời là primary key.\n2. Quan hệ 1:N (một với nhiều): một dây chuyền có nhiều lệnh sản xuất. Khóa ngoại đặt ở phía nhiều (production_orders.line_id). Đây là quan hệ phổ biến nhất trong nhà máy.\n3. Quan hệ N:N (nhiều với nhiều): một lệnh dùng nhiều vật tư, và một vật tư xuất hiện trong nhiều lệnh. Không thể đặt khóa ngoại vào một trong hai bảng, nên cần bảng trung gian order_materials với khóa ghép (order_id, material_id). Bảng trung gian còn chứa thông tin riêng của quan hệ, ví dụ planned_qty và actual_qty.\n4. Bắt buộc và không bắt buộc: mỗi lệnh phải thuộc một dây chuyền (bắt buộc, cột line_id không cho NULL); một dây chuyền có thể chưa có lệnh nào (không bắt buộc). Điều này thể hiện qua việc khóa ngoại có cho phép NULL hay không.\n5. Cardinality và hướng quan hệ: đọc quan hệ bằng hai câu hỏi: 'một dòng bên này liên quan tối đa bao nhiêu dòng bên kia?' và ngược lại. Đừng nhầm số bản ghi hiện có với quy tắc quan hệ: một dây chuyền hiện chỉ có một lệnh không có nghĩa quan hệ là 1:1.\n6. JOIN để xem dữ liệu liên bảng: INNER JOIN chỉ giữ dòng khớp ở cả hai bảng. LEFT JOIN giữ mọi dòng bên trái, kể cả khi bên phải không có dòng khớp (kết quả là NULL). Ví dụ: LEFT JOIN từ production_lines sang production_orders sẽ giữ dây chuyền chưa có lệnh.",
      en: "1. 1:1 (one to one): a record in table A corresponds to at most one record in table B. Example: each line has exactly one settings row (line_settings) with its target UPH. The foreign key is often also the primary key.\n2. 1:N (one to many): a line has many production orders. The foreign key sits on the many side (production_orders.line_id). This is the most common relationship in a factory.\n3. N:N (many to many): an order uses many materials, and a material appears in many orders. A foreign key cannot model this in either table, so a junction table order_materials with composite key (order_id, material_id) is needed. The junction table also holds attributes of the relationship, such as planned_qty and actual_qty.\n4. Mandatory and optional: each order must belong to a line (mandatory; line_id does not allow NULL), but a line may have no orders yet (optional). This is shown by whether the foreign key allows NULL.\n5. Cardinality and direction: read a relationship with two questions: 'how many rows on the other side can one row here relate to?' and the reverse. Do not confuse current row counts with the rule: a line that currently has one order does not make the relationship 1:1.\n6. JOINs to see linked data: an INNER JOIN keeps only rows that match on both sides. A LEFT JOIN keeps every row from the left table, even when there is no match on the right (the right columns become NULL). Example: a LEFT JOIN from production_lines to production_orders keeps lines that have no orders.",
    },
    extraSections: [
      {
        title: { vi: "Ứng dụng trong nhà máy", en: "Manufacturing application" },
        body: {
          vi: "Vấn đề nghiệp vụ: quản lý cần biết mỗi lệnh sản xuất dùng những vật tư nào và lượng dự kiến, đồng thời biết dây chuyền nào chưa có lệnh nào.\nDữ liệu có sẵn: production_lines, production_orders, materials và order_materials.\nLogic: quan hệ 1:N từ dây chuyền đến lệnh; quan hệ N:N giữa lệnh và vật tư qua order_materials; LEFT JOIN để giữ dây chuyền không có lệnh.\nKết quả mong đợi: danh sách vật tư theo từng lệnh; danh sách dây chuyền kèm số lệnh (có thể bằng 0).\nGiá trị kinh doanh: lập kế hoạch mua vật tư theo lệnh, và phát hiện dây chuyền đang rảnh để điều phối.",
          en: "Business problem: managers need to know which materials each order uses and in what planned quantities, and which lines have no orders this week.\nAvailable data: production_lines, production_orders, materials and order_materials.\nLogic: a 1:N link from lines to orders; an N:N link between orders and materials through order_materials; a LEFT JOIN keeps lines with no orders.\nExpected result: a material list per order, and a list of lines with their order counts (which may be zero).\nBusiness value: plan material purchases per order, and spot idle lines for scheduling.",
        },
      },
      {
        title: { vi: "Tổng kết và bài tiếp theo", en: "Key takeaways and what's next" },
        body: {
          vi: "Tổng kết:\n- Quan hệ 1:1 và 1:N dùng khóa ngoại; quan hệ N:N cần bảng trung gian.\n- Trong quan hệ 1:N, khóa ngoại nằm ở phía nhiều.\n- Thông tin riêng của một quan hệ N:N thuộc về bảng trung gian.\nBài tiếp theo: Ràng buộc (Constraints). Khi đã biết các bảng liên kết thế nào, bài sau cho thấy cách database tự kiểm tra dữ liệu.",
          en: "Key takeaways:\n- 1:1 and 1:N use foreign keys; N:N needs a junction table.\n- In a 1:N relationship the foreign key sits on the many side.\n- Information about an N:N relationship belongs in the junction table.\nNext lesson: Constraints. Once you know how tables link, the next lesson shows how the database checks data itself.",
        },
      },
    ],
    practicalExample: {
      vi: "Thực hành: (1) tạo production_lines, production_orders, materials, order_materials và line_settings; (2) thêm dữ liệu mẫu; (3) INNER JOIN để hiển thị lệnh cùng dây chuyền; (4) LEFT JOIN để liệt kê dây chuyền kèm số lệnh; (5) liệt kê vật tư theo lệnh; (6) xem cài đặt UPH của từng dây chuyền. Kết quả mong đợi: L03 có 0 lệnh; ORD-001 dùng M-01 (planned 1000, actual 980) và M-02 (50, 48); L03 chưa có cài đặt UPH (NULL).",
      en: "Hands-on: (1) create production_lines, production_orders, materials, order_materials and line_settings; (2) insert sample data; (3) use an INNER JOIN to show orders with their lines; (4) use a LEFT JOIN to list lines with their order counts; (5) list materials per order; (6) view each line's target UPH. Expected result: L03 has 0 orders; ORD-001 uses M-01 (planned 1000, actual 980) and M-02 (50, 48); L03 has no UPH setting (NULL).",
    },
    formula: [
      { label: "PostgreSQL", code: "CREATE TABLE production_lines (\n  line_id   INT PRIMARY KEY,\n  line_code VARCHAR(10) UNIQUE\n);\nCREATE TABLE production_orders (\n  order_id    INT PRIMARY KEY,\n  order_no    VARCHAR(20) UNIQUE,\n  line_id     INT NOT NULL REFERENCES production_lines(line_id),\n  planned_qty INT\n);\nCREATE TABLE materials (\n  material_id   INT PRIMARY KEY,\n  material_code VARCHAR(10) UNIQUE,\n  material_name VARCHAR(50)\n);\n-- Quan hệ N:N: bảng trung gian\nCREATE TABLE order_materials (\n  order_id     INT REFERENCES production_orders(order_id),\n  material_id  INT REFERENCES materials(material_id),\n  planned_qty  INT,\n  actual_qty   INT,\n  PRIMARY KEY (order_id, material_id)\n);\n-- Quan hệ 1:1: mỗi dây chuyền có đúng một bản cài đặt\nCREATE TABLE line_settings (\n  line_id    INT PRIMARY KEY REFERENCES production_lines(line_id),\n  target_uph NUMERIC(6,2)\n);\n\nINSERT INTO production_lines VALUES (1, 'L01'), (2, 'L02'), (3, 'L03');\nINSERT INTO production_orders VALUES (1, 'ORD-001', 1, 1000), (2, 'ORD-002', 2, 800), (3, 'ORD-004', 1, 500);\nINSERT INTO materials VALUES (1, 'M-01', 'Hạt nhựa PP'), (2, 'M-02', 'Keo dán'), (3, 'M-03', 'Bao bì');\nINSERT INTO order_materials VALUES (1, 1, 1000, 980), (1, 2, 50, 48), (2, 1, 800, 820), (3, 3, 500, 500);\nINSERT INTO line_settings VALUES (1, 120.00), (2, 95.50);\n\n-- INNER JOIN: lệnh kèm dây chuyền\nSELECT o.order_no, l.line_code\nFROM production_orders o\nINNER JOIN production_lines l ON l.line_id = o.line_id\nORDER BY o.order_no;\n\n-- LEFT JOIN: mọi dây chuyền kèm số lệnh (kể cả 0)\nSELECT l.line_code, COUNT(o.order_id) AS so_lenh\nFROM production_lines l\nLEFT JOIN production_orders o ON o.line_id = l.line_id\nGROUP BY l.line_code\nORDER BY l.line_code;\n\n-- Vật tư theo từng lệnh (quan hệ N:N)\nSELECT o.order_no, m.material_code, om.planned_qty, om.actual_qty\nFROM order_materials om\nJOIN production_orders o ON o.order_id = om.order_id\nJOIN materials m ON m.material_id = om.material_id\nORDER BY o.order_no, m.material_code;\n\n-- Cài đặt UPH của mỗi dây chuyền (1:1, LEFT JOIN giữ L03)\nSELECT l.line_code, s.target_uph\nFROM production_lines l\nLEFT JOIN line_settings s ON s.line_id = l.line_id\nORDER BY l.line_code;" },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Quan hệ giữa dây chuyền và lệnh sản xuất là gì?\nA. 1:1\nB. 1:N\nC. N:N\nD. Không có quan hệ\n2) (Đúng/Sai) Quan hệ N:N có thể biểu diễn bằng một khóa ngoại đặt ở một trong hai bảng.\n3) (Tình huống) Lệnh ORD-004 dùng vật tư M-03 với planned_qty 500. Thông tin 500 nên nằm ở bảng nào và vì sao?\n4) (Truy vấn) Viết câu SELECT liệt kê mọi dây chuyền kèm số lệnh, kể cả dây chuyền chưa có lệnh.\n5) (Phân tích) Nếu mỗi lệnh chỉ dùng đúng một loại vật tư, quan hệ lệnh–vật tư đổi thành loại gì? Có cần bảng trung gian không?",
      en: "1) (Multiple choice) What is the relationship between a production line and its production orders?\nA. 1:1\nB. 1:N\nC. N:N\nD. No relationship\n2) (True/False) An N:N relationship can be modeled with a single foreign key placed in one of the two tables.\n3) (Scenario) Order ORD-004 uses material M-03 with planned_qty 500. Which table should hold the 500, and why?\n4) (Query) Write a SELECT that lists every line with its order count, including lines with no orders.\n5) (Analysis) If each order used exactly one material, what type would the order–material relationship become? Is a junction table still needed?",
    },
    answer: {
      vi: "1) B.\n2) Sai. Một khóa ngoại chỉ trỏ đến một dòng, không đủ biểu diễn nhiều–nhiều; cần bảng trung gian.\n3) Bảng order_materials, vì 500 là thuộc tính của quan hệ giữa lệnh ORD-004 và vật tư M-03, không thuộc riêng lệnh hay riêng vật tư.\n4) SELECT l.line_code, COUNT(o.order_id) AS so_lenh FROM production_lines l LEFT JOIN production_orders o ON o.line_id = l.line_id GROUP BY l.line_code ORDER BY l.line_code; Kết quả: L01 = 2, L02 = 1, L03 = 0.\n5) Mỗi lệnh chỉ có một vật tư nên quan hệ trở thành N:1 từ lệnh đến vật tư; khóa ngoại material_id đặt ngay trong production_orders và không cần bảng trung gian.",
      en: "1) B.\n2) False. A single foreign key points to one row, which cannot model many-to-many; a junction table is needed.\n3) The order_materials table, because 500 is an attribute of the relationship between order ORD-004 and material M-03; it belongs to neither the order alone nor the material alone.\n4) SELECT l.line_code, COUNT(o.order_id) AS order_count FROM production_lines l LEFT JOIN production_orders o ON o.line_id = l.line_id GROUP BY l.line_code ORDER BY l.line_code; Result: L01 = 2, L02 = 1, L03 = 0.\n5) If each order has exactly one material, the relationship becomes N:1 from orders to materials; the foreign key material_id sits in production_orders and no junction table is needed.",
    },
    relatedTopics: ["keys", "erd", "normalization"],
  },
  {
    slug: "constraints",
    categorySlug: "data-fundamentals",
    title: { vi: "Ràng buộc (Constraints)", en: "Constraints" },
    thumbnail: "https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/Data%20Fundamentals/Data%20Fundamentals_constraints.jpg",
    summary: {
      vi: "Quy tắc do database áp dụng để chặn dữ liệu sai: NOT NULL, UNIQUE, CHECK, DEFAULT, PRIMARY KEY, FOREIGN KEY.",
      en: "Rules the database enforces to block bad data: NOT NULL, UNIQUE, CHECK, DEFAULT, PRIMARY KEY and FOREIGN KEY.",
    },
    difficulty: "Beginner",
    overview: {
      vi: "Một hệ thống sản xuất có thể nhận hàng nghìn dòng dữ liệu mỗi ngày, và chỉ một lỗi nhập như sản lượng âm hay mã ca 'D' cũng có thể làm sai báo cáo. Ràng buộc (constraint) là quy tắc gắn vào bảng hoặc cột để database từ chối dữ liệu sai ngay khi ghi. Bài này giới thiệu NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK và DEFAULT, và cách chúng khác với kiểm tra trong ứng dụng.",
      en: "A production system can receive thousands of rows a day, and a single bad entry, such as negative output or shift code 'D', can spoil a report. A constraint is a rule attached to a table or column so the database rejects bad data at the moment it is written. This lesson covers NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK and DEFAULT, and how they differ from application checks.",
    },
    objectives: [
      { vi: "Giải thích Database Constraint là gì.", en: "Explain what a database constraint is." },
      { vi: "Nhận biết NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK và DEFAULT.", en: "Recognize NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK and DEFAULT." },
      { vi: "Chọn constraint phù hợp cho một quy tắc nghiệp vụ đơn giản.", en: "Choose the right constraint for a simple business rule." },
      { vi: "Phân biệt kiểm tra ở ứng dụng với constraint trong database.", en: "Distinguish application validation from database constraints." },
      { vi: "Đọc được thông báo lỗi khi vi phạm constraint.", en: "Read the error message when a constraint is violated." },
    ],
    explanation: {
      vi: "1. Constraint là quy tắc áp dụng cho dữ liệu ở cấp database: dù dữ liệu được nhập từ ứng dụng, công cụ hay câu SQL, database vẫn kiểm tra.\n2. NOT NULL: cột bắt buộc có giá trị. Ví dụ: line_code không được để trống.\n3. UNIQUE: không có hai dòng trùng giá trị ở cột (hoặc tổ hợp cột) này. Ví dụ: serial_number của mỗi sản phẩm là duy nhất. Trong PostgreSQL, nhiều dòng có NULL ở cột UNIQUE vẫn được phép.\n4. PRIMARY KEY: kết hợp NOT NULL và UNIQUE; mỗi bảng có tối đa một khóa chính.\n5. FOREIGN KEY: giá trị phải tồn tại ở bảng cha. Ví dụ: production_output.order_id phải có trong production_orders. Có thể cấu hình hành vi khi xóa hoặc cập nhật bên cha (ON DELETE, ON UPDATE), ví dụ không cho xóa lệnh khi còn sản lượng.\n6. CHECK: điều kiện logic phải đúng. Ví dụ: output_qty >= 0; shift_code chỉ nhận 'A', 'B' hoặc 'C'.\n7. DEFAULT: giá trị tự điền khi không nhập. Ví dụ: inspection_status mặc định là 'HOLD'. DEFAULT không ghi đè giá trị người dùng đã nhập.\n8. Constraint và kiểm tra ứng dụng: ứng dụng nên kiểm tra để báo lỗi thân thiện cho người nhập. Database là lớp cuối cùng bảo đảm dữ liệu trong bảng luôn hợp lệ, dù ứng dụng nào ghi vào. Nên làm cả hai.\n9. Giới hạn: constraint không thay thế mọi kiểm tra nghiệp vụ. Quy tắc phụ thuộc nhiều bảng hoặc theo quy trình (ví dụ lệnh chỉ được đóng khi đã kiểm tra đủ mẫu) cần thiết kế riêng; bài này không đi sâu vào trigger hay thủ tục.\n10. Cân nhắc: quá nhiều ràng buộc phức tạp có thể làm việc ghi dữ liệu chậm hơn, nên cần cân nhắc khi thiết kế.",
      en: "1. A constraint is a rule applied to data at the database level: whether data comes from an application, a tool or a raw SQL statement, the database still checks it.\n2. NOT NULL: the column must have a value. Example: line_code cannot be empty.\n3. UNIQUE: no two rows may share a value (or combination of values) in this column. Example: each product's serial_number is unique. In PostgreSQL, several rows may hold NULL in a UNIQUE column.\n4. PRIMARY KEY: combines NOT NULL and UNIQUE; a table has at most one.\n5. FOREIGN KEY: the value must exist in the parent table. Example: production_output.order_id must exist in production_orders. You can set what happens on delete or update of the parent (ON DELETE, ON UPDATE), for example refusing to delete an order that still has output.\n6. CHECK: a logical condition that must be true. Example: output_qty >= 0; shift_code accepts only 'A', 'B' or 'C'.\n7. DEFAULT: a value filled in automatically when none is given. Example: inspection_status defaults to 'HOLD'. A DEFAULT never overrides a value the user has entered.\n8. Constraints and application checks: the application should check input to give friendly messages. The database is the last line of defence that keeps the table valid, whichever application writes to it. Do both.\n9. Limits: constraints do not replace every business check. Rules that span several tables or follow a process (for example, an order may close only after enough samples are inspected) need separate design; this lesson does not cover triggers or procedures in depth.\n10. Trade-off: many complex constraints can slow down writes, so weigh them during design.",
    },
    extraSections: [
      {
        title: { vi: "Ứng dụng trong nhà máy", en: "Manufacturing application" },
        body: {
          vi: "Vấn đề nghiệp vụ: dữ liệu sản lượng đôi khi có số âm do nhập nhầm, mã ca sai ('D'), hoặc hai sản phẩm trùng số serial. Báo cáo sẽ sai nếu không chặn từ đầu.\nDữ liệu có sẵn: production_output (output_qty, shift_code, order_id) và product_units (serial_number, inspection_status, order_id).\nLogic: output_qty có CHECK (>= 0); shift_code có CHECK (IN 'A','B','C'); serial_number là NOT NULL và UNIQUE; order_id là FOREIGN KEY; inspection_status có CHECK (IN 'OK','NG','HOLD') và DEFAULT 'HOLD'.\nKết quả mong đợi: dòng sai bị từ chối ngay khi ghi; báo cáo chỉ chứa dữ liệu hợp lệ.\nGiá trị kinh doanh: không phải rà soát tay từng dòng; mỗi serial truy vết được về đúng một lệnh.",
          en: "Business problem: output data sometimes contains negative numbers from typing mistakes, a wrong shift code ('D'), or two products with the same serial number. Reports are wrong unless this is blocked at the source.\nAvailable data: production_output (output_qty, shift_code, order_id) and product_units (serial_number, inspection_status, order_id).\nLogic: output_qty has CHECK (>= 0); shift_code has CHECK (IN 'A','B','C'); serial_number is NOT NULL and UNIQUE; order_id is a FOREIGN KEY; inspection_status has CHECK (IN 'OK','NG','HOLD') and DEFAULT 'HOLD'.\nExpected result: bad rows are rejected at the moment they are written; reports contain only valid data.\nBusiness value: no manual row-by-row review; every serial traces back to exactly one order.",
        },
      },
      {
        title: { vi: "Tổng kết và bài tiếp theo", en: "Key takeaways and what's next" },
        body: {
          vi: "Tổng kết:\n- Constraint là quy tắc để database tự chặn dữ liệu sai.\n- UNIQUE cho phép nhiều cột và thường chứa NULL; PRIMARY KEY chỉ có một và không bao giờ NULL.\n- CHECK là nơi đặt điều kiện nghiệp vụ đơn giản; DEFAULT điền giá trị khi không nhập.\nBài tiếp theo: Chuẩn hóa (Normalization). Khi bảng đã có ràng buộc, bài sau cho thấy cách tách bảng để không lặp dữ liệu.",
          en: "Key takeaways:\n- A constraint is a rule that lets the database block bad data itself.\n- UNIQUE allows several columns and usually allows NULL; PRIMARY KEY is one per table and never NULL.\n- CHECK holds simple business conditions; DEFAULT fills a value when none is given.\nNext lesson: Normalization. Once tables have constraints, the next lesson shows how to split tables so data is not repeated.",
        },
      },
    ],
    practicalExample: {
      vi: "Thực hành: (1) tạo production_orders, production_output và product_units với các ràng buộc; (2) thêm dữ liệu hợp lệ; (3) đọc trạng thái mặc định của serial; (4) tổng sản lượng theo lệnh. Kết quả mong đợi: SN-0001 có trạng thái OK, SN-0002 có trạng thái HOLD (mặc định); ORD-001 có tổng sản lượng 1020, ORD-002 có 450. Các thao tác bị từ chối (số âm, ca 'D', serial trùng, lệnh không tồn tại) được ghi chú trong code; khi chạy thật, database sẽ báo lỗi vi phạm ràng buộc tương ứng.",
      en: "Hands-on: (1) create production_orders, production_output and product_units with their constraints; (2) insert valid data; (3) read the default status of a serial; (4) total output per order. Expected result: SN-0001 has status OK, SN-0002 has status HOLD (the default); ORD-001 totals 1020 and ORD-002 totals 450. The rejected operations (negative quantity, shift 'D', duplicate serial, missing order) are noted in the code; when you run them for real, the database reports the matching constraint violation.",
    },
    formula: [
      { label: "PostgreSQL", code: "CREATE TABLE production_orders (\n  order_id    INT PRIMARY KEY,\n  order_no    VARCHAR(20) NOT NULL UNIQUE,\n  line_id     INT NOT NULL,\n  planned_qty INT CHECK (planned_qty > 0)\n);\n\nCREATE TABLE production_output (\n  output_id   INT PRIMARY KEY,\n  order_id    INT NOT NULL REFERENCES production_orders(order_id),\n  output_time TIMESTAMP NOT NULL,\n  shift_code  VARCHAR(5) NOT NULL CHECK (shift_code IN ('A', 'B', 'C')),\n  output_qty  INT NOT NULL CHECK (output_qty >= 0)\n);\n\nCREATE TABLE product_units (\n  unit_id           INT PRIMARY KEY,\n  serial_number     VARCHAR(30) NOT NULL UNIQUE,\n  order_id          INT NOT NULL REFERENCES production_orders(order_id),\n  inspection_status VARCHAR(10) NOT NULL DEFAULT 'HOLD'\n                    CHECK (inspection_status IN ('OK', 'NG', 'HOLD'))\n);\n\nINSERT INTO production_orders VALUES (1, 'ORD-001', 1, 1000), (2, 'ORD-002', 2, 800);\nINSERT INTO production_output VALUES\n  (1, 1, '2026-11-01 08:00', 'A', 500),\n  (2, 1, '2026-11-01 16:00', 'B', 520),\n  (3, 2, '2026-11-01 08:00', 'A', 450);\nINSERT INTO product_units (unit_id, serial_number, order_id, inspection_status)\n  VALUES (1, 'SN-0001', 1, 'OK');\n-- Dòng này dùng DEFAULT: inspection_status tự là 'HOLD'\nINSERT INTO product_units (unit_id, serial_number, order_id) VALUES (2, 'SN-0002', 1);\n\n-- Các thao tác sau bị từ chối khi chạy thật:\n-- INSERT ... VALUES (4, 1, '2026-11-02 08:00', 'D', 100);  -- ca 'D' không thuộc CHECK\n-- INSERT ... VALUES (5, 1, '2026-11-02 09:00', 'A', -10);   -- output_qty âm\n-- INSERT INTO product_units (...) VALUES (3, 'SN-0001', 2, 'OK');  -- serial trùng (UNIQUE)\n-- INSERT INTO production_output (...) VALUES (6, 99, ...);       -- lệnh 99 không tồn tại (FOREIGN KEY)\n\nSELECT serial_number, inspection_status FROM product_units ORDER BY unit_id;\nSELECT order_id, SUM(output_qty) AS total_output FROM production_output GROUP BY order_id ORDER BY order_id;" },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Ràng buộc nào chặn giá trị trùng nhưng vẫn cho phép để trống?\nA. PRIMARY KEY\nB. UNIQUE\nC. NOT NULL\nD. CHECK\n2) (Đúng/Sai) Constraint có thể thay thế hoàn toàn kiểm tra của ứng dụng.\n3) (Tình huống) Sản lượng đôi khi bị nhập âm. Viết ràng buộc chặn lỗi này trên cột output_qty của bảng production_output.\n4) (Đọc lỗi) Một dòng production_output có order_id = 99 bị từ chối. Ràng buộc nào đã chặn, và vì sao?\n5) (Truy vấn) Viết câu SELECT lấy các serial có inspection_status = 'HOLD'.",
      en: "1) (Multiple choice) Which constraint blocks duplicate values but still allows empty values?\nA. PRIMARY KEY\nB. UNIQUE\nC. NOT NULL\nD. CHECK\n2) (True/False) A constraint can fully replace application validation.\n3) (Scenario) Output is sometimes entered as a negative number. Write a constraint that blocks this on the output_qty column of production_output.\n4) (Read the error) An output row with order_id = 99 is rejected. Which constraint blocked it, and why?\n5) (Query) Write a SELECT that returns the serials with inspection_status = 'HOLD'.",
    },
    answer: {
      vi: "1) B. UNIQUE không cho trùng; cột UNIQUE vẫn cho phép NULL. PRIMARY KEY thì không được NULL.\n2) Sai. Database là lớp kiểm tra cuối cùng, còn ứng dụng nên kiểm tra để báo lỗi thân thiện. Cần cả hai.\n3) ALTER TABLE production_output ADD CONSTRAINT chk_output_qty CHECK (output_qty >= 0);\n4) FOREIGN KEY, vì lệnh 99 không tồn tại trong production_orders; database từ chối để không ghi sản lượng cho lệnh không có.\n5) SELECT serial_number FROM product_units WHERE inspection_status = 'HOLD'; Kết quả: SN-0002.",
      en: "1) B. UNIQUE blocks duplicates; a UNIQUE column still allows NULL. PRIMARY KEY never allows NULL.\n2) False. The database is the final check, while the application should validate to give friendly messages. You need both.\n3) ALTER TABLE production_output ADD CONSTRAINT chk_output_qty CHECK (output_qty >= 0);\n4) FOREIGN KEY, because order 99 does not exist in production_orders; the database refuses to record output for a missing order.\n5) SELECT serial_number FROM product_units WHERE inspection_status = 'HOLD'; Result: SN-0002.",
    },
    relatedTopics: ["keys", "data-types", "database-design"],
  },
  {
    slug: "normalization",
    categorySlug: "data-fundamentals",
    title: { vi: "Chuẩn hóa (Normalization)", en: "Normalization" },
    thumbnail: "https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/Data%20Fundamentals/Data%20Fundamentals_normalization.jpg",
    summary: {
      vi: "Tách bảng để mỗi thông tin chỉ lưu một lần, giảm trùng lặp và lỗi khi cập nhật. Gồm 1NF, 2NF và 3NF.",
      en: "Split tables so each fact is stored once, reducing duplication and update errors. Covers 1NF, 2NF and 3NF.",
    },
    difficulty: "Intermediate",
    overview: {
      vi: "Một bảng ghi cả lệnh, sản phẩm, vật tư và nhà cung cấp trên cùng một dòng sẽ lặp lại rất nhiều thông tin. Khi có thay đổi, dễ sửa sót; khi xóa một lệnh, có thể mất luôn thông tin nhà cung cấp. Chuẩn hóa (normalization) là sắp xếp lại bảng để mỗi thông tin chỉ được lưu ở một chỗ. Bài này giúp bạn nhận diện các lỗi do dữ liệu chưa chuẩn hóa và hiểu các dạng chuẩn 1NF, 2NF và 3NF.",
      en: "A table that records the order, product, material and supplier on the same row repeats a lot of information. Changes are easy to miss; deleting one order can erase supplier information. Normalization rearranges tables so each fact is stored in one place. This lesson shows you how to spot the problems of unnormalized data and explains the 1NF, 2NF and 3NF normal forms.",
    },
    objectives: [
      { vi: "Nhận biết dữ liệu dư thừa (data redundancy) và ba loại bất thường (anomaly).", en: "Recognize data redundancy and the three kinds of anomaly." },
      { vi: "Hiểu 1NF, 2NF và 3NF ở mức nhập môn.", en: "Understand 1NF, 2NF and 3NF at an introductory level." },
      { vi: "Phân tích một bảng chưa chuẩn hóa và xác định các nhóm thông tin lặp.", en: "Analyze an unnormalized table and identify repeating groups." },
      { vi: "Đề xuất cách tách bảng đơn giản và xác định khóa cho từng bảng.", en: "Propose a simple table split and identify the key of each table." },
      { vi: "Biết khi nào mô hình có chủ ý không chuẩn hóa để phục vụ báo cáo.", en: "Know when a deliberate denormalized design helps reporting." },
    ],
    explanation: {
      vi: "1. Dư thừa dữ liệu (data redundancy): cùng một thông tin lặp ở nhiều dòng. Trong bảng gốc, 'Hạt nhựa PP' và nhà cung cấp 'NCC-A' lặp ở nhiều lệnh.\n2. Ba loại bất thường:\n- Lỗi thêm (insert): không thêm được thông tin này nếu thiếu thông tin khác. Ví dụ: chưa có lệnh nào dùng 'Bao bì' thì không lưu được nhà cung cấp của nó.\n- Lỗi sửa (update): sửa một chỗ nhưng bỏ sót chỗ khác, dữ liệu mâu thuẫn. Ví dụ: đổi tên NCC-A phải sửa ở nhiều dòng.\n- Lỗi xóa (delete): xóa một dòng làm mất thông tin khác. Ví dụ: xóa lệnh ORD-004 làm mất thông tin nhà cung cấp của 'Bao bì'.\n3. 1NF (dạng 1): mỗi ô chỉ chứa một giá trị; không ghi nhiều mã trong một ô; không có nhóm cột lặp như Material1, Material2. Mỗi dòng có khóa riêng.\n4. 2NF (dạng 2): đạt 1NF và mọi cột không khóa phụ thuộc đầy đủ vào toàn bộ khóa. Chỉ quan trọng khi khóa là khóa ghép. Ví dụ: với khóa (order_id, material_id), quantity phụ thuộc vào cả hai cột.\n5. 3NF (dạng 3): đạt 2NF và không có phụ thuộc bắc cầu, tức cột không khóa không phụ thuộc vào cột không khóa khác. Ví dụ: order_no xác định product_id, và product_id xác định product_name; nên tên sản phẩm được tách sang bảng products. Tương tự, supplier_name được tách sang suppliers.\n6. Phụ thuộc hàm (functional dependency) X → Y: biết X thì xác định được Y. Ví dụ: order_no → product_id; material_code → supplier_id. Khái niệm này giúp quyết định tách bảng.\n7. Đánh đổi: chuẩn hóa giúp nhất quán, nhưng báo cáo đôi khi cần nối nhiều bảng. Với BI, có thể dùng mô hình gộp có chủ ý hoặc star schema (học ở bài Kho dữ liệu). Chuẩn hóa không có nghĩa là tạo càng nhiều bảng càng tốt.",
      en: "1. Data redundancy: the same information repeated on many rows. In the original table, 'Hạt nhựa PP' and supplier 'NCC-A' repeat across several orders.\n2. Three kinds of anomaly:\n- Insert anomaly: a fact cannot be stored without another, unrelated fact. Example: if no order uses 'Bao bì' yet, its supplier cannot be stored.\n- Update anomaly: a value is changed in one place but missed in another, so data contradicts itself. Example: renaming NCC-A requires editing several rows.\n- Delete anomaly: deleting one row also loses another fact. Example: deleting order ORD-004 also erases the supplier of 'Bao bì'.\n3. 1NF: each cell holds one value; no list of codes in one cell; no repeating column groups such as Material1, Material2. Each row has its own key.\n4. 2NF: already 1NF, and every non-key column depends on the whole key. This matters only for composite keys. Example: with the key (order_id, material_id), quantity depends on both columns.\n5. 3NF: already 2NF, and no transitive dependency, meaning a non-key column does not depend on another non-key column. Example: order_no determines product_id, and product_id determines product_name; so the product name moves to a products table. Likewise supplier_name moves to a suppliers table.\n6. Functional dependency X → Y: knowing X determines Y. Examples: order_no → product_id; material_code → supplier_id. This idea guides how tables are split.\n7. Trade-off: normalization keeps data consistent, but reports sometimes need to join several tables. For BI, a deliberately denormalized model or a star schema may be used (covered in the Data Warehouse lesson). Normalization does not mean more tables is always better.",
    },
    extraSections: [
      {
        title: { vi: "Ứng dụng trong nhà máy", en: "Manufacturing application" },
        body: {
          vi: "Vấn đề nghiệp vụ: bảng ghi vật tư theo lệnh đang lưu mọi thứ trên một dòng. Khi nhà cung cấp đổi tên hoặc xóa một lệnh, dữ liệu dễ sai hoặc mất.\nDữ liệu có sẵn: bảng gốc production_order_material (order_no, product_name, material_code, material_name, supplier_name, quantity) với bốn dòng mẫu.\nLogic: tách thành products (product_id, product_name), suppliers (supplier_id, supplier_name), materials (material_id, material_code, material_name, supplier_id), production_orders (order_id, order_no, product_id) và order_materials (order_id, material_id, quantity). Khóa: order_id và material_id là primary key; order_no và material_code là UNIQUE.\nKết quả mong đợi: khôi phục đầy đủ bốn dòng gốc bằng phép JOIN; đổi tên nhà cung cấp chỉ cần sửa một dòng.\nGiá trị kinh doanh: dữ liệu nhất quán, và có thể lưu thông tin vật tư trước khi có lệnh dùng nó.",
          en: "Business problem: the material-per-order table keeps everything on one row. When a supplier changes its name or an order is deleted, data is easily wrong or lost.\nAvailable data: the original table production_order_material (order_no, product_name, material_code, material_name, supplier_name, quantity) with four sample rows.\nLogic: split into products (product_id, product_name), suppliers (supplier_id, supplier_name), materials (material_id, material_code, material_name, supplier_id), production_orders (order_id, order_no, product_id) and order_materials (order_id, material_id, quantity). Keys: order_id and material_id are primary keys; order_no and material_code are UNIQUE.\nExpected result: a JOIN restores the four original rows; renaming a supplier requires one change.\nBusiness value: consistent data, and a material can be stored before any order uses it.",
        },
      },
      {
        title: { vi: "Tổng kết và bài tiếp theo", en: "Key takeaways and what's next" },
        body: {
          vi: "Tổng kết:\n- Dữ liệu chưa chuẩn hóa gây lỗi thêm, sửa và xóa.\n- 1NF: một giá trị mỗi ô, không có nhóm cột lặp. 2NF và 3NF: mỗi cột phụ thuộc đúng vào khóa.\n- Tách bảng và nối bằng khóa ngoại là cách chuẩn hóa thường dùng.\nBài tiếp theo: Sơ đồ ERD. Sau khi biết tách bảng, bạn cần một bản vẽ để nhìn toàn bộ các bảng và quan hệ cùng lúc.",
          en: "Key takeaways:\n- Unnormalized data causes insert, update and delete anomalies.\n- 1NF: one value per cell, no repeating column groups. 2NF and 3NF: each column depends on the right key.\n- Splitting tables and linking them with foreign keys is the usual way to normalize.\nNext lesson: ERD. Once you can split tables, you need a diagram to see all the tables and relationships at once.",
        },
      },
    ],
    practicalExample: {
      vi: "Thực hành: (1) tạo bảng gốc production_order_material và thêm bốn dòng mẫu; (2) tạo các bảng đã tách; (3) nạp lại dữ liệu; (4) dùng JOIN để khôi phục bảng gốc; (5) đổi tên nhà cung cấp NCC-A và xem kết quả. Kết quả mong đợi: bốn dòng khôi phục đúng; sau khi đổi tên, mọi dòng liên quan đều hiện tên mới mà không cần sửa nhiều chỗ.",
      en: "Hands-on: (1) create the original table production_order_material and insert four sample rows; (2) create the split tables; (3) load the data; (4) use JOINs to rebuild the original table; (5) rename supplier NCC-A and check the result. Expected result: the four rows are rebuilt correctly; after the rename, every related row shows the new name with a single update.",
    },
    formula: [
      { label: "PostgreSQL", code: "-- Bảng gốc chưa chuẩn hóa: thông tin lặp ở nhiều dòng\nCREATE TABLE production_order_material (\n  order_no      VARCHAR(20),\n  product_name  VARCHAR(50),\n  material_code VARCHAR(10),\n  material_name VARCHAR(50),\n  supplier_name VARCHAR(50),\n  quantity      INT\n);\nINSERT INTO production_order_material VALUES\n  ('ORD-001', 'Vỏ nhựa A', 'M-01', 'Hạt nhựa PP', 'NCC-A', 1000),\n  ('ORD-001', 'Vỏ nhựa A', 'M-02', 'Keo dán', 'NCC-B', 50),\n  ('ORD-002', 'Nắp B', 'M-01', 'Hạt nhựa PP', 'NCC-A', 800),\n  ('ORD-004', 'Nắp B', 'M-03', 'Bao bì', 'NCC-C', 500);\n\n-- Sau khi chuẩn hóa\nCREATE TABLE products (\n  product_id   INT PRIMARY KEY,\n  product_name VARCHAR(50)\n);\nCREATE TABLE suppliers (\n  supplier_id   INT PRIMARY KEY,\n  supplier_name VARCHAR(50) UNIQUE\n);\nCREATE TABLE materials (\n  material_id   INT PRIMARY KEY,\n  material_code VARCHAR(10) UNIQUE,\n  material_name VARCHAR(50),\n  supplier_id   INT REFERENCES suppliers(supplier_id)\n);\nCREATE TABLE production_orders (\n  order_id   INT PRIMARY KEY,\n  order_no   VARCHAR(20) UNIQUE,\n  product_id INT REFERENCES products(product_id)\n);\nCREATE TABLE order_materials (\n  order_id    INT REFERENCES production_orders(order_id),\n  material_id INT REFERENCES materials(material_id),\n  quantity    INT,\n  PRIMARY KEY (order_id, material_id)\n);\n\nINSERT INTO products VALUES (1, 'Vỏ nhựa A'), (2, 'Nắp B');\nINSERT INTO suppliers VALUES (1, 'NCC-A'), (2, 'NCC-B'), (3, 'NCC-C');\nINSERT INTO materials VALUES (1, 'M-01', 'Hạt nhựa PP', 1), (2, 'M-02', 'Keo dán', 2), (3, 'M-03', 'Bao bì', 3);\nINSERT INTO production_orders VALUES (1, 'ORD-001', 1), (2, 'ORD-002', 2), (3, 'ORD-004', 2);\nINSERT INTO order_materials VALUES (1, 1, 1000), (1, 2, 50), (2, 1, 800), (3, 3, 500);\n\n-- Khôi phục bảng gốc bằng JOIN\nSELECT o.order_no, p.product_name, m.material_code, m.material_name, s.supplier_name, om.quantity\nFROM order_materials om\nJOIN production_orders o ON o.order_id = om.order_id\nJOIN products p ON p.product_id = o.product_id\nJOIN materials m ON m.material_id = om.material_id\nJOIN suppliers s ON s.supplier_id = m.supplier_id\nORDER BY o.order_no, m.material_code;\n\nSELECT COUNT(*) AS so_dong FROM order_materials;" },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Lỗi nào xảy ra khi không thể lưu nhà cung cấp của một vật tư chưa được dùng trong lệnh nào?\nA. Lỗi sửa\nB. Lỗi thêm\nC. Lỗi xóa\nD. Lỗi khóa ngoại\n2) (Đúng/Sai) 1NF yêu cầu mỗi ô chỉ chứa một giá trị, nên ghi 'M-01, M-02' trong một ô là vi phạm 1NF.\n3) (Tình huống) Tên nhà cung cấp NCC-A cần đổi, và phải sửa ở ba dòng của bảng gốc. Đây là lỗi gì? Chuẩn hóa xử lý thế nào?\n4) (Phân tích) product_name phụ thuộc vào thuộc tính nào? Vì sao nên tách sang bảng products?\n5) (Truy vấn) Viết câu SELECT đếm số dòng trong bảng order_materials.",
      en: "1) (Multiple choice) Which anomaly occurs when you cannot store the supplier of a material that no order uses yet?\nA. Update anomaly\nB. Insert anomaly\nC. Delete anomaly\nD. Foreign key error\n2) (True/False) 1NF requires each cell to hold one value, so writing 'M-01, M-02' in one cell violates 1NF.\n3) (Scenario) Supplier NCC-A must be renamed, and the change has to be made on three rows of the original table. What anomaly is this? How does normalization fix it?\n4) (Analysis) What does product_name depend on? Why should it move to a products table?\n5) (Query) Write a SELECT that counts the rows in order_materials.",
    },
    answer: {
      vi: "1) B. Lỗi thêm: không thêm được thông tin này vì thiếu thông tin khác.\n2) Đúng. Ô chứa nhiều mã vi phạm 1NF.\n3) Lỗi sửa (update anomaly). Chuẩn hóa lưu tên nhà cung cấp một lần trong bảng suppliers, nên chỉ cần sửa một dòng.\n4) product_name phụ thuộc vào product_id, tức vào sản phẩm chứ không phải lệnh. Tách sang products để tên sản phẩm chỉ lưu một lần (dạng 3NF).\n5) SELECT COUNT(*) AS so_dong FROM order_materials; Kết quả: 4.",
      en: "1) B. Insert anomaly: the fact cannot be stored because another fact is missing.\n2) True. A cell with several codes violates 1NF.\n3) An update anomaly. Normalization stores the supplier name once in the suppliers table, so only one row needs changing.\n4) product_name depends on product_id, meaning on the product rather than the order. Moving it to products stores the product name once (3NF).\n5) SELECT COUNT(*) AS so_dong FROM order_materials; Result: 4.",
    },
    relatedTopics: ["relationships", "erd", "database-design"],
  },
  {
    slug: "erd",
    categorySlug: "data-fundamentals",
    title: { vi: "Sơ đồ ERD", en: "ERD" },
    thumbnail: "https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/Data%20Fundamentals/Data%20Fundamentals_erd.jpg",
    summary: {
      vi: "Sơ đồ mô tả thực thể, thuộc tính và quan hệ, là bản vẽ trước khi tạo bảng.",
      en: "A diagram of entities, attributes and relationships, drawn before creating tables.",
    },
    difficulty: "Intermediate",
    overview: {
      vi: "Trước khi viết lệnh CREATE TABLE, cần vẽ bản thiết kế để mọi người cùng thống nhất: có những đối tượng nào, mỗi đối tượng có thông tin gì, và chúng liên quan nhau ra sao. Đó là ERD (Entity Relationship Diagram). Giống bản vẽ nhà, người làm nghiệp vụ và người làm kỹ thuật cùng đọc và góp ý trước khi xây. Bài này dạy cách đọc ERD, vẽ ERD cho một bài toán nhà máy, và chuyển ERD thành bảng.",
      en: "Before writing CREATE TABLE commands, draw a blueprint so everyone agrees: which objects exist, what information each holds, and how they relate. That is an ERD (Entity Relationship Diagram). Like a house plan, business and technical staff read it and comment before anything is built. This lesson teaches how to read an ERD, draw one for a factory problem, and turn it into tables.",
    },
    objectives: [
      { vi: "Đọc được ký hiệu thực thể, thuộc tính, quan hệ và bản số trên một ERD.", en: "Read entity, attribute, relationship and cardinality symbols on an ERD." },
      { vi: "Phân biệt PK và FK trên sơ đồ.", en: "Tell PK and FK apart on a diagram." },
      { vi: "Đọc ERD của bộ dữ liệu nhà máy trong bài này.", en: "Read the ERD of the factory dataset used in this lesson." },
      { vi: "Chuyển một quan hệ trên ERD thành khóa ngoại hoặc bảng trung gian.", en: "Turn a relationship on an ERD into a foreign key or a junction table." },
    ],
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
      { label: "Mermaid", code: "erDiagram\n  PRODUCTION_LINES ||--o{ PRODUCTION_ORDERS : chay\n  PRODUCTS ||--o{ PRODUCTION_ORDERS : san_xuat\n  PRODUCTION_ORDERS ||--o{ PRODUCTION_OUTPUT : ghi_nhan\n  PRODUCTION_ORDERS ||--o{ ORDER_MATERIALS : dung\n  MATERIALS ||--o{ ORDER_MATERIALS : duoc_dung\n  PRODUCTION_LINES ||--|| LINE_SETTINGS : co" },
      { label: "PostgreSQL", code: "CREATE TABLE production_lines (\n  line_id   INT PRIMARY KEY,\n  line_code VARCHAR(10) UNIQUE,\n  line_name VARCHAR(50),\n  area      VARCHAR(20)\n);\nCREATE TABLE products (\n  product_id   INT PRIMARY KEY,\n  product_code VARCHAR(10) UNIQUE,\n  product_name VARCHAR(50)\n);\nCREATE TABLE production_orders (\n  order_id    INT PRIMARY KEY,\n  order_no    VARCHAR(20) UNIQUE,\n  line_id     INT NOT NULL REFERENCES production_lines(line_id),\n  product_id  INT NOT NULL REFERENCES products(product_id),\n  planned_qty INT CHECK (planned_qty > 0)\n);\nCREATE TABLE production_output (\n  output_id   INT PRIMARY KEY,\n  order_id    INT NOT NULL REFERENCES production_orders(order_id),\n  output_time TIMESTAMP NOT NULL,\n  shift_code  VARCHAR(5) CHECK (shift_code IN ('A', 'B', 'C')),\n  output_qty  INT CHECK (output_qty >= 0)\n);\nCREATE TABLE materials (\n  material_id   INT PRIMARY KEY,\n  material_code VARCHAR(10) UNIQUE,\n  material_name VARCHAR(50)\n);\nCREATE TABLE order_materials (\n  order_id    INT REFERENCES production_orders(order_id),\n  material_id INT REFERENCES materials(material_id),\n  planned_qty INT,\n  actual_qty  INT,\n  PRIMARY KEY (order_id, material_id)\n);\nCREATE TABLE line_settings (\n  line_id    INT PRIMARY KEY REFERENCES production_lines(line_id),\n  target_uph NUMERIC(6,2)\n);\n\nINSERT INTO production_lines VALUES (1, 'L01', 'Dây chuyền 01', 'Khu A'), (2, 'L02', 'Dây chuyền 02', 'Khu A');\nINSERT INTO products VALUES (1, 'P-001', 'Vỏ nhựa A'), (2, 'P-002', 'Nắp B');\nINSERT INTO production_orders VALUES (1, 'ORD-001', 1, 1, 1000), (2, 'ORD-002', 2, 2, 800);\nINSERT INTO production_output VALUES (1, 1, '2026-11-01 08:00', 'A', 500), (2, 1, '2026-11-01 16:00', 'B', 520);\nINSERT INTO materials VALUES (1, 'M-01', 'Hạt nhựa PP'), (2, 'M-02', 'Keo dán');\nINSERT INTO order_materials VALUES (1, 1, 1000, 980), (1, 2, 50, 48);\nINSERT INTO line_settings VALUES (1, 120.00), (2, 95.50);\n\n-- Kiểm tra: các khóa ngoại trong database\nSELECT tc.table_name, kcu.column_name\nFROM information_schema.table_constraints tc\nJOIN information_schema.key_column_usage kcu\n  ON kcu.constraint_name = tc.constraint_name AND kcu.table_schema = tc.table_schema\nWHERE tc.constraint_type = 'FOREIGN KEY'\nORDER BY tc.table_name, kcu.column_name;" },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Quan hệ N:N được triển khai trong cơ sở dữ liệu bằng gì?\nA. Khóa ngoại trong bảng cha\nB. Bảng trung gian có khóa ghép\nC. Khóa tự tăng\nD. Không thể triển khai\n2) (Đúng/Sai) ERD cho biết bảng hiện có bao nhiêu dòng dữ liệu.\n3) (Tình huống) Một máy thuộc đúng một dây chuyền, và một dây chuyền có nhiều máy. Đây là quan hệ nào, và khóa ngoại nằm ở bảng nào?\n4) (Chuyển đổi) Quan hệ 1:1 giữa production_lines và line_settings được ánh xạ thành bảng như thế nào?\n5) (Đọc kết quả) Truy vấn kiểm tra khóa ngoại trong phần thực hành trả về bao nhiêu dòng?",
      en: "1) (Multiple choice) How is an N:N relationship implemented in a database?\nA. A foreign key in the parent table\nB. A junction table with a composite key\nC. An auto-increment key\nD. It cannot be implemented\n2) (True/False) An ERD shows how many data rows a table currently holds.\n3) (Scenario) A machine belongs to exactly one line, and a line has many machines. What is the relationship, and which table holds the foreign key?\n4) (Convert) How is the 1:1 relationship between production_lines and line_settings mapped to tables?\n5) (Read the result) How many rows does the foreign key check query in the hands-on return?",
    },
    answer: {
      vi: "1) B. Bảng trung gian chứa hai khóa ngoại, khóa chính là cặp khóa ghép.\n2) Sai. ERD là bản thiết kế, không chứa số dòng dữ liệu.\n3) Quan hệ 1:N (một dây chuyền, nhiều máy); khóa ngoại line_id nằm ở bảng máy (phía nhiều).\n4) line_settings.line_id vừa là khóa chính vừa là khóa ngoại trỏ đến production_lines.line_id.\n5) 6 dòng.",
      en: "1) B. The junction table holds two foreign keys, and its primary key is the composite pair.\n2) False. An ERD is a design and does not hold row counts.\n3) A 1:N relationship (one line, many machines); the foreign key line_id sits in the machines table, on the many side.\n4) line_settings.line_id is both the primary key and a foreign key referring to production_lines.line_id.\n5) 6 rows.",
    },
    relatedTopics: ["relationships", "database-design", "normalization"],
  },
  {
    slug: "database-design",
    categorySlug: "data-fundamentals",
    title: { vi: "Thiết kế cơ sở dữ liệu", en: "Database Design" },
    thumbnail: "https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/Data%20Fundamentals/Data%20Fundamentals_database-design.jpg",
    summary: {
      vi: "Quy trình từ yêu cầu nghiệp vụ đến mô hình khái niệm, mô hình logic và bảng thực tế.",
      en: "The process from business requirements to conceptual model, logical model and physical tables.",
    },
    difficulty: "Intermediate",
    overview: {
      vi: "Thiết kế cơ sở dữ liệu là quá trình biến nhu cầu nghiệp vụ thành bảng, khóa, kiểu dữ liệu và ràng buộc. Điều quan trọng nhất là bắt đầu từ câu hỏi 'báo cáo cần gì, và một dòng dữ liệu đại diện cho điều gì', chứ không phải từ việc tạo bảng ngay. Thiết kế tốt giúp dữ liệu đúng, truy vấn nhanh và dễ mở rộng khi nhà máy thêm dây chuyền hoặc loại dữ liệu mới.",
      en: "Database design turns business needs into tables, keys, data types and constraints. The most important starting point is the question 'what must the reports show, and what does one row represent', not creating tables right away. A good design keeps data correct, queries fast, and makes it easy to add lines or new data types later.",
    },
    objectives: [
      { vi: "Mô tả các bước của quy trình thiết kế cơ sở dữ liệu.", en: "Describe the steps of the database design process." },
      { vi: "Thu thập và làm rõ yêu cầu nghiệp vụ.", en: "Gather and clarify business requirements." },
      { vi: "Xác định thực thể, thuộc tính và grain của bảng.", en: "Identify entities, attributes and the grain of each table." },
      { vi: "Thiết kế bảng với PK, FK, kiểu dữ liệu và ràng buộc.", en: "Design tables with PKs, FKs, data types and constraints." },
      { vi: "Kiểm thử thiết kế bằng dữ liệu mẫu và truy vấn kiểm tra.", en: "Test a design with sample data and check queries." },
      { vi: "Phân biệt database vận hành (OLTP) với kho dữ liệu.", en: "Distinguish operational databases (OLTP) from data warehouses." },
    ],
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
      { label: "PostgreSQL", code: "-- Data dictionary (một dòng = một lần ghi nhận sản lượng của một lệnh tại một thời điểm và ca)\nCREATE TABLE production_lines (\n  line_id   INT PRIMARY KEY,\n  line_code VARCHAR(10) UNIQUE,\n  line_name VARCHAR(50)\n);\nCREATE TABLE production_orders (\n  order_id    INT PRIMARY KEY,\n  order_no    VARCHAR(20) UNIQUE,\n  line_id     INT NOT NULL REFERENCES production_lines(line_id),\n  planned_qty INT CHECK (planned_qty > 0)\n);\nCREATE TABLE production_output (\n  output_id   INT PRIMARY KEY,\n  order_id    INT NOT NULL REFERENCES production_orders(order_id),\n  output_time TIMESTAMP NOT NULL,\n  shift_code  VARCHAR(5) NOT NULL CHECK (shift_code IN ('A', 'B', 'C')),\n  output_qty  INT NOT NULL CHECK (output_qty >= 0)\n);\n\nINSERT INTO production_lines VALUES (1, 'L01', 'Dây chuyền 01'), (2, 'L02', 'Dây chuyền 02');\nINSERT INTO production_orders VALUES (1, 'ORD-001', 1, 1000), (2, 'ORD-002', 2, 800);\nINSERT INTO production_output VALUES\n  (1, 1, '2026-11-01 08:00', 'A', 500),\n  (2, 1, '2026-11-01 08:00', 'A', 500),  -- ghi trùng do quét hai lần\n  (3, 1, '2026-11-01 16:00', 'B', 520),\n  (4, 2, '2026-11-01 08:00', 'A', 450);\n\n-- Truy vấn 1: lệnh thiếu dây chuyền (không có dòng nào nếu FK đúng)\nSELECT o.order_no\nFROM production_orders o\nLEFT JOIN production_lines l ON l.line_id = o.line_id\nWHERE l.line_id IS NULL;\n\n-- Truy vấn 2: sản lượng âm (không có dòng nếu CHECK đúng)\nSELECT COUNT(*) AS so_dong_am FROM production_output WHERE output_qty < 0;\n\n-- Truy vấn 3: dòng trùng theo lệnh, thời điểm và ca\nSELECT order_id, output_time, shift_code, COUNT(*) AS so_lan\nFROM production_output\nGROUP BY order_id, output_time, shift_code\nHAVING COUNT(*) > 1;" },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Bước đầu tiên khi thiết kế cơ sở dữ liệu là gì?\nA. Tạo bảng\nB. Thu thập yêu cầu nghiệp vụ\nC. Viết trigger\nD. Vẽ dashboard\n2) (Đúng/Sai) Có thể bỏ qua việc xác định grain nếu đã có ERD.\n3) (Tình huống) Một báo cáo cộng output_qty của cả bảng production_output cho ra con số quá lớn. Bạn kiểm tra gì trước tiên?\n4) (Phân loại) created_at và updated_at được gọi là gì, và dùng để làm gì?\n5) (Truy vấn) Viết câu SELECT đếm số lệnh có planned_qty nhỏ hơn hoặc bằng 0.",
      en: "1) (Multiple choice) What is the first step of database design?\nA. Create the tables\nB. Gather business requirements\nC. Write triggers\nD. Build the dashboard\n2) (True/False) You can skip defining the grain if you already have an ERD.\n3) (Scenario) A report sums output_qty over the whole production_output table and the total is far too large. What do you check first?\n4) (Classify) What are created_at and updated_at called, and what are they for?\n5) (Query) Write a SELECT that counts orders with planned_qty less than or equal to 0.",
    },
    answer: {
      vi: "1) B. Mọi quyết định thiết kế đều phải bắt nguồn từ yêu cầu báo cáo và quy tắc nghiệp vụ.\n2) Sai. ERD cho thấy cấu trúc, còn grain cho biết mỗi dòng đại diện cho gì; cả hai đều cần.\n3) Kiểm tra grain và dữ liệu trùng: có dòng bị ghi hai lần hoặc một dòng đang được hiểu sai grain. Kiểm tra bằng truy vấn GROUP BY và HAVING COUNT(*) > 1.\n4) Cột kiểm toán (audit fields), ghi thời điểm bản ghi được tạo và được sửa lần cuối.\n5) SELECT COUNT(*) AS so_lenh FROM production_orders WHERE planned_qty <= 0; Kết quả: 0 (CHECK đã chặn từ đầu).",
      en: "1) B. Every design decision must start from the report requirements and business rules.\n2) False. The ERD shows the structure, while the grain says what each row represents; you need both.\n3) Check the grain and duplicate data: a row may have been recorded twice, or the grain may be misunderstood. Check with GROUP BY and HAVING COUNT(*) > 1.\n4) Audit fields: they record when a row was created and last changed.\n5) SELECT COUNT(*) AS order_count FROM production_orders WHERE planned_qty <= 0; Result: 0 (the CHECK constraint blocks such rows).",
    },
    relatedTopics: ["constraints", "normalization", "erd"],
  },
  {
    slug: "etl",
    categorySlug: "data-fundamentals",
    title: { vi: "ETL là gì?", en: "What is ETL?" },
    summary: {
      vi: "Quy trình lấy dữ liệu từ nhiều nguồn, làm sạch, chuyển đổi rồi nạp vào kho dữ liệu hoặc database phân tích.",
      en: "The process of pulling data from many sources, cleaning and transforming it, then loading it into a warehouse or analytics database.",
    },
    difficulty: "Beginner",
    thumbnail: "https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/Data%20Fundamentals/Data%20Fundamentals_etl.jpg",
    overview: {
      vi: "Dữ liệu sản xuất nằm ở nhiều nơi: MES ghi sản lượng, hệ thống kiểm tra chất lượng ghi kết quả, ERP giữ lệnh sản xuất, và file CSV từ máy. Muốn làm báo cáo, phải đưa tất cả về một chỗ, làm sạch và chuẩn hóa. Quy trình này gọi là ETL: Extract (lấy), Transform (biến đổi) và Load (nạp). Bài này dạy các bước và các lỗi dữ liệu thường gặp. Kho dữ liệu, đích của quy trình, được học ở bài sau.",
      en: "Production data lives in many places: MES records output, the quality system records inspections, the ERP holds production orders, and machines produce CSV files. To build reports, everything must be brought to one place, cleaned and standardized. This process is ETL: Extract, Transform and Load. This lesson teaches the steps and the common data errors. The data warehouse, the usual target, is covered in the next lesson.",
    },
    objectives: [
      { vi: "Giải thích ba bước Extract, Transform và Load.", en: "Explain the Extract, Transform and Load steps." },
      { vi: "Nhận biết nguồn dữ liệu và hệ thống đích trong một pipeline.", en: "Identify source data and the target system in a pipeline." },
      { vi: "Phân biệt ETL và ELT ở mức cơ bản.", en: "Distinguish ETL from ELT at a basic level." },
      { vi: "Hiểu full load và incremental load.", en: "Understand full loads and incremental loads." },
      { vi: "Nhận biết các lỗi dữ liệu thường gặp và kiểm tra chất lượng.", en: "Recognize common data errors and quality checks." },
      { vi: "Đối soát số dòng sau mỗi lần chạy.", en: "Reconcile row counts after each run." },
    ],
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
      { label: "PostgreSQL", code: "-- Extract: dữ liệu thô từ file MES đã nạp vào vùng staging (giữ nguyên bản gốc)\nCREATE TABLE staging_output (\n  line_code   VARCHAR(20),\n  record_time TIMESTAMP,\n  output_qty  INT\n);\nINSERT INTO staging_output VALUES\n  ('L01', '2026-11-01 08:00', 500),\n  (' l01 ', '2026-11-01 16:00', 520),\n  ('L02', '2026-11-01 08:00', 450),\n  ('L02', '2026-11-01 08:00', 450),\n  ('L03', '2026-11-01 08:00', -20),\n  ('L03', '2026-11-01 16:00', 300);\n\n-- Transform + Load: chuẩn hóa mã, loại dòng trùng, loại sản lượng âm\nCREATE TABLE report_output AS\nSELECT DISTINCT UPPER(TRIM(line_code)) AS line_code, record_time, output_qty\nFROM staging_output\nWHERE output_qty >= 0;\n\n-- Đối soát: số dòng nguồn, số dòng đích, số dòng bị loại\nSELECT\n  (SELECT COUNT(*) FROM staging_output) AS dong_nguon,\n  (SELECT COUNT(*) FROM report_output) AS dong_dich,\n  (SELECT COUNT(*) FROM staging_output) - (SELECT COUNT(*) FROM report_output) AS dong_bi_loai;\n\nSELECT line_code, record_time, output_qty FROM report_output ORDER BY line_code, record_time;" },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Bước nào đọc dữ liệu từ hệ thống nguồn?\nA. Extract\nB. Transform\nC. Load\nD. Đối soát\n2) (Đúng/Sai) Nạp gia tăng (incremental load) luôn bảo đảm không thiếu dòng nào.\n3) (Tình huống) Sau khi chạy ETL, đích ít hơn nguồn 5 dòng. Bạn làm gì trước khi tin báo cáo?\n4) (Truy vấn) Viết câu SELECT chuẩn hóa line_code (viết hoa và bỏ khoảng trắng) từ bảng staging_output.\n5) (Phân tích) Vì sao nên lưu dữ liệu thô vào vùng staging trước khi biến đổi?",
      en: "1) (Multiple choice) Which step reads data from the source system?\nA. Extract\nB. Transform\nC. Load\nD. Reconciliation\n2) (True/False) An incremental load always guarantees that no row is missing.\n3) (Scenario) After an ETL run, the target has 5 fewer rows than the source. What do you do before trusting the report?\n4) (Query) Write a SELECT that standardizes line_code (uppercase and trimmed) from staging_output.\n5) (Analysis) Why store the raw data in staging before transforming it?",
    },
    answer: {
      vi: "1) A. Extract đọc dữ liệu từ nguồn.\n2) Sai. Nạp gia tăng phụ thuộc vào cách nhận biết dòng mới; nếu cơ chế đó sai, vẫn có thể thiếu dòng. Cần đối soát.\n3) Tìm nguyên nhân: dòng bị loại ở Transform, dòng trùng, lỗi kết nối khi Extract, hoặc mốc incremental bị sai. Ghi nhận, sửa, rồi đối soát lại trước khi dùng báo cáo.\n4) SELECT UPPER(TRIM(line_code)) AS line_code, record_time, output_qty FROM staging_output;\n5) Để kiểm tra, chạy lại được khi Transform lỗi, và không mất dữ liệu gốc. Bản gốc là căn cứ để đối soát.",
      en: "1) A. Extract reads data from the source.\n2) False. Incremental loading depends on how new rows are detected; if that logic is wrong, rows can still be missing. Reconcile to check.\n3) Find the cause: rows rejected in Transform, duplicates, a connection failure during Extract, or a wrong incremental marker. Record it, fix it, and reconcile again before using the report.\n4) SELECT UPPER(TRIM(line_code)) AS line_code, record_time, output_qty FROM staging_output;\n5) So the step can be checked and re-run if Transform fails, without losing the original data. The untouched copy is the basis for reconciliation.",
    },
    relatedTopics: ["data-warehouse", "database", "data-types"],
  },
  {
    slug: "data-warehouse",
    categorySlug: "data-fundamentals",
    title: { vi: "Kho dữ liệu (Data Warehouse)", en: "Data Warehouse" },
    summary: {
      vi: "Kho dữ liệu tập hợp dữ liệu lịch sử từ nhiều nguồn, tổ chức để phân tích và báo cáo BI.",
      en: "A data warehouse gathers historical data from many sources, organized for analysis and BI reporting.",
    },
    difficulty: "Intermediate",
    thumbnail: "https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/Data%20Fundamentals/Data%20Fundamentals_data-warehouse.jpg",
    overview: {
      vi: "Database hằng ngày được ghi liên tục khi máy chạy, còn câu hỏi như 'so sánh sản lượng quý này với cùng kỳ năm trước' cần đọc và tổng hợp rất nhiều dữ liệu lịch sử. Kho dữ liệu (Data Warehouse) gom dữ liệu từ nhiều nguồn, làm sạch, giữ lịch sử và được tổ chức để phân tích. Bài này giới thiệu OLTP và OLAP, mô hình sao gồm fact và dimension, và vai trò của kho trong BI.",
      en: "A daily database is written constantly while machines run, but a question such as 'compare this quarter's output with the same quarter last year' must read and aggregate a lot of historical data. A data warehouse gathers data from many sources, cleans it, keeps its history and is organized for analysis. This lesson introduces OLTP and OLAP, the star schema made of fact and dimension tables, and the warehouse's role in BI.",
    },
    objectives: [
      { vi: "Định nghĩa Data Warehouse và nêu bốn đặc điểm của nó.", en: "Define a data warehouse and state its four characteristics." },
      { vi: "Phân biệt operational database (OLTP) với Data Warehouse (OLAP).", en: "Distinguish an operational database (OLTP) from a data warehouse (OLAP)." },
      { vi: "Hiểu fact table, dimension table và star schema.", en: "Understand fact tables, dimension tables and the star schema." },
      { vi: "Nhận biết grain của một fact table.", en: "Recognize the grain of a fact table." },
      { vi: "Hiểu luồng dữ liệu từ hệ thống nguồn qua ETL vào kho.", en: "Understand the data flow from source systems through ETL into the warehouse." },
      { vi: "Liên hệ kho dữ liệu với Power BI và Manufacturing Analytics.", en: "Relate a data warehouse to Power BI and manufacturing analytics." },
    ],
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
      { label: "PostgreSQL", code: "CREATE TABLE dim_date (\n  date_key   INT PRIMARY KEY,\n  full_date  DATE,\n  year_month VARCHAR(7)\n);\nCREATE TABLE dim_line (\n  line_key  INT PRIMARY KEY,\n  line_code VARCHAR(10)\n);\nCREATE TABLE dim_product (\n  product_key  INT PRIMARY KEY,\n  product_code VARCHAR(10)\n);\nCREATE TABLE dim_shift (\n  shift_key  INT PRIMARY KEY,\n  shift_code VARCHAR(5)\n);\n-- Grain: một dòng = sản lượng của một dây chuyền, một sản phẩm, một ca, một ngày\nCREATE TABLE fact_production_output (\n  date_key    INT REFERENCES dim_date(date_key),\n  line_key    INT REFERENCES dim_line(line_key),\n  product_key INT REFERENCES dim_product(product_key),\n  shift_key   INT REFERENCES dim_shift(shift_key),\n  output_qty  INT,\n  ng_qty      INT\n);\n\nINSERT INTO dim_date VALUES (1, '2026-10-05', '2026-10'), (2, '2026-10-06', '2026-10');\nINSERT INTO dim_line VALUES (1, 'L01'), (2, 'L02');\nINSERT INTO dim_product VALUES (1, 'P-001'), (2, 'P-002');\nINSERT INTO dim_shift VALUES (1, 'A'), (2, 'B');\nINSERT INTO fact_production_output VALUES\n  (1, 1, 1, 1, 500, 10),\n  (1, 1, 1, 2, 460, 14),\n  (2, 1, 1, 1, 940, 22),\n  (1, 2, 2, 1, 450, 46),\n  (2, 2, 2, 2, 480, 40);\n\nSELECT l.line_code,\n       d.year_month,\n       SUM(f.output_qty) AS san_luong_tot,\n       ROUND(100.0 * SUM(f.ng_qty) / SUM(f.output_qty + f.ng_qty), 2) AS ty_le_ng_pct\nFROM fact_production_output f\nJOIN dim_line l ON l.line_key = f.line_key\nJOIN dim_date d ON d.date_key = f.date_key\nGROUP BY l.line_code, d.year_month\nORDER BY l.line_code;" },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Bảng nào trong mô hình sao chứa số đo như sản lượng?\nA. Bảng chiều (dimension)\nB. Bảng sự kiện (fact)\nC. Bảng nhật ký đăng nhập\nD. Bảng khóa chính\n2) (Đúng/Sai) Kho dữ liệu được tối ưu để ghi và cập nhật từng dòng liên tục.\n3) (Tình huống) Quản lý muốn xem xu hướng NG của một dây chuyền trong ba năm. Nên dùng database vận hành hay kho dữ liệu? Vì sao?\n4) (Phân tích) Có thể tính tỷ lệ NG của cả tháng bằng cách cộng các tỷ lệ NG theo ngày không? Vì sao?\n5) (Truy vấn) Viết câu SELECT tính tổng output_qty theo dây chuyền từ fact_production_output và dim_line.",
      en: "1) (Multiple choice) Which table in a star schema holds measures such as output?\nA. Dimension table\nB. Fact table\nC. Login log table\nD. Primary key table\n2) (True/False) A data warehouse is optimized for constant row-level writes and updates.\n3) (Scenario) Managers want the NG trend of one line over three years. Should you use an operational database or a warehouse, and why?\n4) (Analysis) Can you get the NG rate for a whole month by adding up the daily NG rates? Why?\n5) (Query) Write a SELECT that sums output_qty per line from fact_production_output and dim_line.",
    },
    answer: {
      vi: "1) B. Bảng fact chứa số đo; bảng dimension chứa ngữ cảnh để nhóm và lọc.\n2) Sai. Kho dữ liệu được tối ưu để đọc và tổng hợp; database vận hành mới được tối ưu cho ghi và cập nhật liên tục.\n3) Kho dữ liệu, vì cần lịch sử nhiều năm và truy vấn tổng hợp trên khối lượng lớn.\n4) Không. Tỷ lệ NG là non-additive. Phải tính lại từ tổng NG chia tổng mẫu của cả tháng, không lấy trung bình các tỷ lệ theo ngày.\n5) SELECT l.line_code, SUM(f.output_qty) AS san_luong_tot FROM fact_production_output f JOIN dim_line l ON l.line_key = f.line_key GROUP BY l.line_code ORDER BY l.line_code; Kết quả: L01 = 1900, L02 = 930.",
      en: "1) B. The fact table holds measures; dimension tables hold the context used to group and filter.\n2) False. A warehouse is optimized for reading and aggregation; an operational database is optimized for constant writes and updates.\n3) A data warehouse, because the question needs several years of history and aggregation over large volumes.\n4) No. An NG rate is non-additive. Recalculate it from the month's total NG divided by total sample, not by averaging the daily rates.\n5) SELECT l.line_code, SUM(f.output_qty) AS good_output FROM fact_production_output f JOIN dim_line l ON l.line_key = f.line_key GROUP BY l.line_code ORDER BY l.line_code; Result: L01 = 1900, L02 = 930.",
    },
    relatedTopics: ["etl", "database-systems", "normalization"],
  },
  {
    "slug": "efficiency",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Efficiency: hiệu suất lao động trong nhà máy",
      "en": "Efficiency: labor performance on the factory floor"
    },
    "summary": {
      "vi": "Efficiency so sánh giờ công tiêu chuẩn với giờ công thực tế để đo hiệu suất lao động của một dây chuyền hoặc một ca.",
      "en": "Efficiency compares standard man hours with actual man hours to measure the labor performance of a line or shift."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "OEE đo hiệu suất của máy. Efficiency đo hiệu suất của người: một dây chuyền làm ra đúng sản lượng với số giờ công mà tiêu chuẩn cho phép hay tốn nhiều hơn? Câu hỏi này giúp quản lý biết ca nào cần thêm đào tạo, line nào đang tốn giờ công và cần điều phối lại nhân sự. Bài này giải thích công thức, cách tính giờ công tiêu chuẩn và những lưu ý khi thu thập dữ liệu.",
      "en": "OEE measures machine performance. Efficiency measures labor performance: did a line produce the planned output in the standard number of man hours, or did it take more? This tells managers which shift needs training and which line is spending too many hours. This lesson explains the formula, how to calculate standard man hours and what to watch when collecting the data."
    },
    "objectives": [
      {
        "vi": "Viết được công thức Efficiency và giải thích từng thành phần.",
        "en": "Write the Efficiency formula and explain each component."
      },
      {
        "vi": "Tính được Standard Routing, Standard Hours và Efficiency từ dữ liệu giờ công và sản lượng.",
        "en": "Calculate Standard Routing, Standard Hours and Efficiency from man-hour and output data."
      },
      {
        "vi": "Đọc được ý nghĩa của kết quả trên, dưới và bằng 100%.",
        "en": "Interpret results above, below and equal to 100%."
      },
      {
        "vi": "Phân biệt Efficiency với OEE và xác định đúng phạm vi giờ công thực tế.",
        "en": "Distinguish Efficiency from OEE and define the scope of actual man hours correctly."
      }
    ],
    "explanation": {
      "vi": "1. Efficiency (hiệu suất lao động) so sánh số giờ công tiêu chuẩn cần để làm ra sản lượng thực tế với số giờ công thực tế đã bỏ ra.\n2. Công thức chính:\nEfficiency = (Standard Man Hours ÷ Actual Man Hours) × (Actual Output ÷ Standard Output) × 100%.\nTrong đó: Standard Man Hours là giờ công tiêu chuẩn; Actual Man Hours là giờ công thực tế; Standard Output là sản lượng tiêu chuẩn; Actual Output là sản lượng thực tế.\n3. Cách tính đơn giản hơn qua hai bước:\n- Standard Routing = Standard Man Hours ÷ Standard Output (giờ công tiêu chuẩn cho một sản phẩm, đơn vị giờ/sản phẩm).\n- Standard Hours = Standard Routing × Actual Output (giờ công lẽ ra cần để làm đúng sản lượng thực tế).\nKhi đó: Efficiency = Standard Hours ÷ Actual Man Hours × 100%.\n4. Ý nghĩa kết quả: bằng 100% nghĩa là làm đúng chuẩn; lớn hơn 100% nghĩa là dùng ít giờ công hơn chuẩn; nhỏ hơn 100% nghĩa là tốn nhiều giờ công hơn chuẩn.\n5. Lưu ý về giờ công thực tế: Actual Man Hours là tổng giờ công của mọi nhân viên tham gia sản xuất (vận hành, hỗ trợ, kiểm tra, sửa chữa tại chỗ), không chỉ thời gian máy chạy. Nếu chỉ tính giờ máy chạy, Efficiency sẽ bị đánh giá sai.\n6. Efficiency và OEE khác nhau: OEE đo hiệu suất thiết bị qua Availability, Performance và Quality; Efficiency đo hiệu suất lao động. Hai chỉ số bổ sung cho nhau: máy chạy tốt nhưng cần quá nhiều người thì Efficiency thấp.\n7. Đơn vị phải thống nhất: giờ công (man hours), sản lượng cùng loại sản phẩm, và cùng khoảng thời gian cho cả tử và mẫu.",
      "en": "1. Efficiency compares the standard man hours needed to make the actual output with the actual man hours spent.\n2. Main formula:\nEfficiency = (Standard Man Hours ÷ Actual Man Hours) × (Actual Output ÷ Standard Output) × 100%.\nWhere: Standard Man Hours is the standard labor time; Actual Man Hours is the labor time spent; Standard Output is the standard output; Actual Output is the actual output.\n3. A simpler two-step calculation:\n- Standard Routing = Standard Man Hours ÷ Standard Output (standard labor time per unit, in hours per unit).\n- Standard Hours = Standard Routing × Actual Output (the labor time that should have been needed for the actual output).\nThen: Efficiency = Standard Hours ÷ Actual Man Hours × 100%.\n4. Meaning of the result: 100% means exactly on standard; above 100% means fewer hours than standard; below 100% means more hours than standard.\n5. About actual man hours: this is the total labor time of everyone who took part in production (operators, support, inspection, on-site repair), not only the time the machine ran. Counting only machine run time gives a wrong Efficiency.\n6. Efficiency and OEE differ: OEE measures equipment performance through Availability, Performance and Quality; Efficiency measures labor performance. They complement each other: a machine can run well and still need too many people, giving low Efficiency.\n7. Units must match: man hours, the same product type for output, and the same period for numerator and denominator."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: quản lý muốn biết dây chuyền nào đang tốn nhiều giờ công hơn chuẩn để điều phối lại nhân sự.\nDữ liệu có sẵn: giờ công tiêu chuẩn của sản phẩm (từ định mức), sản lượng tiêu chuẩn và sản lượng thực tế của ca, và tổng giờ công thực tế từ hệ thống chấm công hoặc nhân sự.\nLogic: tính Standard Routing từ định mức, nhân với sản lượng thực tế để có Standard Hours, rồi chia cho giờ công thực tế của cùng ca.\nKết quả mong đợi: một Efficiency cho mỗi dây chuyền hoặc mỗi ca. Trong ví dụ, L01 đạt 100%, còn L02 đạt khoảng 73,85%, tức là L02 tốn nhiều giờ công hơn chuẩn.\nGiá trị kinh doanh: phát hiện ca hoặc line cần hỗ trợ, so sánh công bằng giữa các ca khi dùng cùng định mức, và giảm chi phí nhân công trên mỗi sản phẩm.",
          "en": "Business problem: managers want to know which line uses more labor hours than the standard, so they can rebalance staff.\nAvailable data: the standard labor time per product (from the standard), the standard and actual output for the shift, and total actual man hours from time-attendance or HR systems.\nLogic: calculate Standard Routing from the standard, multiply by actual output to get Standard Hours, then divide by the actual man hours for the same shift.\nExpected result: one Efficiency per line or per shift. In the example, L01 reaches 100% and L02 about 73.85%, meaning L02 uses more labor hours than the standard.\nBusiness value: find the shift or line that needs support, compare shifts fairly when they use the same standard, and reduce labor cost per unit."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- Efficiency = Standard Hours ÷ Actual Man Hours × 100%, với Standard Hours = Standard Routing × Actual Output.\n- 100% là đúng chuẩn; trên 100% là nhanh hơn chuẩn; dưới 100% là tốn giờ công.\n- Giờ công thực tế gồm mọi người tham gia sản xuất, không chỉ thời gian máy chạy.\nBài tiếp theo: tiếp tục với các công thức trong bài Công thức nhà máy, và các khóa SQL để tính các chỉ số này trên dữ liệu.",
          "en": "Key takeaways:\n- Efficiency = Standard Hours ÷ Actual Man Hours × 100%, where Standard Hours = Standard Routing × Actual Output.\n- 100% is on standard; above 100% is faster than standard; below 100% uses more labor hours.\n- Actual man hours include everyone who took part in production, not only machine run time.\nNext: the Manufacturing Formulas lesson for more formulas, and the SQL courses to calculate these metrics on data."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: (1) đọc ví dụ chuẩn: 80 giờ công cho 100 sản phẩm, làm 90 sản phẩm trong 72 giờ; (2) tính Standard Routing, Standard Hours và Efficiency; (3) chạy truy vấn SQL so sánh hai dây chuyền. Kết quả mong đợi: ví dụ chuẩn cho Efficiency 100%; dây chuyền L01 đạt 100,00%, L02 đạt 73,85%.",
      "en": "Hands-on: (1) read the standard example: 80 man hours for 100 units, 90 units made in 72 hours; (2) calculate Standard Routing, Standard Hours and Efficiency; (3) run the SQL query comparing two lines. Expected result: the standard example gives 100% efficiency; line L01 reaches 100.00% and L02 73.85%."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- Ví dụ chuẩn: 80 giờ công cho 100 sản phẩm; làm 90 sản phẩm trong 72 giờ\nWITH std AS (\n  SELECT 80.0 AS std_hours, 100 AS std_output, 90 AS actual_output, 72.0 AS actual_hours\n)\nSELECT ROUND(100.0 * ((std_hours / std_output) * actual_output) / actual_hours, 2) AS efficiency_pct\nFROM std;\n\n-- So sánh hai dây chuyền\nWITH lines_data (line_code, std_hours, std_output, actual_output, actual_hours) AS (\n  VALUES ('L01', 80.0, 100, 90, 72.0),\n         ('L02', 120.0, 150, 120, 130.0)\n)\nSELECT line_code,\n       ROUND(100.0 * ((std_hours / std_output) * actual_output) / actual_hours, 2) AS efficiency_pct\nFROM lines_data\nORDER BY line_code;"
      }
    ],
    "exercise": {
      "vi": "1) (Trắc nghiệm) Standard Routing là gì?\nA. Giờ công thực tế ÷ sản lượng thực tế\nB. Giờ công tiêu chuẩn ÷ sản lượng tiêu chuẩn\nC. Sản lượng ÷ giờ máy chạy\nD. Thời gian dừng ÷ thời gian kế hoạch\n2) (Tính) Giờ công tiêu chuẩn 60 giờ cho 120 sản phẩm. Ca làm 100 sản phẩm trong 55 giờ công. Efficiency là bao nhiêu? (làm tròn 2 chữ số)\n3) (Đúng/Sai) Efficiency vẫn đúng khi Actual Man Hours chỉ tính thời gian máy chạy.\n4) (Phân tích) Một ca có Efficiency 120%. Điều này có nghĩa gì?\n5) (Phân biệt) Efficiency khác OEE ở điểm nào?",
      "en": "1) (Multiple choice) What is Standard Routing?\nA. Actual man hours ÷ actual output\nB. Standard man hours ÷ standard output\nC. Output ÷ machine run hours\nD. Stop time ÷ planned time\n2) (Calculate) The standard is 60 man hours for 120 units. A shift makes 100 units in 55 man hours. What is the Efficiency? (round to 2 decimals)\n3) (True/False) Efficiency is still correct if Actual Man Hours only counts machine run time.\n4) (Analysis) A shift has an Efficiency of 120%. What does this mean?\n5) (Distinguish) How does Efficiency differ from OEE?"
    },
    "answer": {
      "vi": "1) B.\n2) Standard Routing = 60 ÷ 120 = 0,5 giờ/sản phẩm; Standard Hours = 0,5 × 100 = 50 giờ; Efficiency = 50 ÷ 55 × 100% = 90,91%.\n3) Sai. Actual Man Hours phải gồm giờ công của mọi người tham gia sản xuất, không chỉ thời gian máy chạy.\n4) Ca này dùng ít giờ công hơn chuẩn để làm ra sản lượng thực tế, tức là làm nhanh hơn chuẩn.\n5) Efficiency đo hiệu suất lao động (người); OEE đo hiệu suất thiết bị (máy) qua Availability, Performance và Quality.",
      "en": "1) B.\n2) Standard Routing = 60 ÷ 120 = 0.5 hour/unit; Standard Hours = 0.5 × 100 = 50 hours; Efficiency = 50 ÷ 55 × 100% = 90.91%.\n3) False. Actual Man Hours must include the labor of everyone who took part in production, not only machine run time.\n4) The shift used fewer labor hours than the standard to make the actual output, so it worked faster than standard.\n5) Efficiency measures labor performance; OEE measures equipment performance through Availability, Performance and Quality."
    },
    "relatedTopics": [
      "oee",
      "uph"
    ]
  },
  {
    "slug": "attainment",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Attainment: mức đạt kế hoạch sản lượng",
      "en": "Attainment: achievement of the output target"
    },
    "summary": {
      "vi": "Attainment so sánh sản lượng thực tế với sản lượng mục tiêu để biết một line hoặc một ca đã đạt kế hoạch đến đâu.",
      "en": "Attainment compares actual output with the target output to show how far a line or shift has met its plan."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Mỗi ca, mỗi dây chuyền đều có một mục tiêu sản lượng. Attainment trả lời câu hỏi đơn giản nhất: hôm nay đã làm được bao nhiêu so với kế hoạch? Đây là KPI quản lý thường xem đầu tiên, trước khi đi sâu vào nguyên nhân bằng OEE hay Efficiency. Bài này giải thích công thức, cách đọc kết quả và cách phân biệt Attainment với Efficiency.",
      "en": "Every shift and every line has an output target. Attainment answers the simplest question: how much did we produce compared with the plan? Managers usually check it first, before looking into causes with OEE or Efficiency. This lesson explains the formula, how to read the result, and how Attainment differs from Efficiency."
    },
    "objectives": [
      {
        "vi": "Viết được công thức Attainment và giải thích các thành phần.",
        "en": "Write the Attainment formula and explain its components."
      },
      {
        "vi": "Tính được Attainment từ sản lượng thực tế và sản lượng mục tiêu.",
        "en": "Calculate Attainment from actual output and target output."
      },
      {
        "vi": "Đọc được ý nghĩa của kết quả trên, dưới và bằng 100%.",
        "en": "Interpret results above, below and equal to 100%."
      },
      {
        "vi": "Phân biệt Attainment với Efficiency và giải thích vì sao một line có thể đạt Attainment nhưng Efficiency thấp.",
        "en": "Distinguish Attainment from Efficiency and explain why a line can reach Attainment but have low Efficiency."
      }
    ],
    "explanation": {
      "vi": "1. Attainment (mức đạt kế hoạch) là tỷ lệ giữa sản lượng thực tế và sản lượng mục tiêu.\n2. Công thức: Attainment = Actual Output ÷ Target Output × 100%.\nTrong đó: Actual Output là sản lượng thực tế; Target Output là sản lượng mục tiêu hoặc kế hoạch cho cùng khoảng thời gian.\n3. Ví dụ: mục tiêu 1.000 sản phẩm, thực tế 900 sản phẩm, thì Attainment = 900 ÷ 1.000 × 100% = 90%.\n4. Ý nghĩa kết quả: bằng 100% là đạt đúng mục tiêu; trên 100% là vượt mục tiêu; dưới 100% là chưa đạt mục tiêu.\n5. Lưu ý về đơn vị: tử và mẫu phải cùng loại sản phẩm và cùng khoảng thời gian (ví dụ cùng một ca hoặc cùng một ngày). Không cộng các Attainment theo ca để ra Attainment ngày; phải cộng sản lượng thực tế và sản lượng mục tiêu, rồi chia.\n6. Attainment và Efficiency khác nhau: Attainment đo mức hoàn thành sản lượng; Efficiency đo hiệu quả sử dụng giờ công. Một line có thể đạt Attainment 100% (làm đủ sản lượng) nhưng Efficiency chỉ 80% (làm đủ nhưng tốn nhiều giờ công hơn tiêu chuẩn). Vì vậy cần xem cả hai.\n7. Attainment cho biết có đạt hay không, chưa cho biết vì sao. Muốn tìm nguyên nhân khi chưa đạt, dùng OEE (máy), Efficiency (người), và phân tích dừng máy.",
      "en": "1. Attainment is the ratio of actual output to target output.\n2. Formula: Attainment = Actual Output ÷ Target Output × 100%.\nWhere: Actual Output is the output actually produced; Target Output is the planned or target output for the same period.\n3. Example: the target is 1,000 units and the actual output is 900 units, so Attainment = 900 ÷ 1,000 × 100% = 90%.\n4. Meaning: 100% means the target is met exactly; above 100% means the target is exceeded; below 100% means the target is not met.\n5. Units: numerator and denominator must be the same product and the same period (for example the same shift or the same day). Do not average shift attainments to get a daily attainment; add the actual outputs and the target outputs first, then divide.\n6. Attainment and Efficiency differ: Attainment measures how much output was completed; Efficiency measures how well labor hours were used. A line can reach 100% Attainment (enough output) with 80% Efficiency (enough output, but more labor hours than standard). So read both.\n7. Attainment shows whether the target was met, not why. To find causes when it is not met, use OEE (machines), Efficiency (labor) and downtime analysis."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: quản lý ca cần biết mỗi dây chuyền đã đạt bao nhiêu phần trăm kế hoạch sản lượng trong ca vừa rồi.\nDữ liệu có sẵn: sản lượng mục tiêu của ca (từ kế hoạch sản xuất) và sản lượng thực tế (từ bảng ghi nhận sản lượng).\nLogic: cộng sản lượng thực tế và sản lượng mục tiêu theo dây chuyền, rồi chia và nhân 100.\nKết quả mong đợi: một Attainment cho mỗi dây chuyền. Trong ví dụ, L01 đạt 90% và L02 đạt 110%.\nGiá trị kinh doanh: thấy ngay line nào đang chậm kế hoạch để xử lý trong ca, và line nào vượt kế hoạch để rút kinh nghiệm.",
          "en": "Business problem: shift managers need to know what percentage of the output plan each line reached during the last shift.\nAvailable data: the shift target output (from the production plan) and the actual output (from output records).\nLogic: sum actual and target output per line, divide, and multiply by 100.\nExpected result: one Attainment per line. In the example, L01 reaches 90% and L02 110%.\nBusiness value: see at once which line is behind plan so it can be handled during the shift, and which line exceeded plan so its practice can be shared."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- Attainment = Actual Output ÷ Target Output × 100%.\n- 100% là đạt mục tiêu; trên 100% là vượt; dưới 100% là chưa đạt.\n- Attainment cho biết có đạt hay không; Efficiency và OEE cho biết vì sao.\nBài tiếp theo: Efficiency, để xem cách đo hiệu quả sử dụng giờ công, và các công thức khác trong bài Công thức nhà máy.",
          "en": "Key takeaways:\n- Attainment = Actual Output ÷ Target Output × 100%.\n- 100% means on target; above 100% means exceeded; below 100% means not met.\n- Attainment shows whether the target was met; Efficiency and OEE help explain why.\nNext: Efficiency, to see how labor hours are used, and the other formulas in the Manufacturing Formulas lesson."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: (1) đọc ví dụ chuẩn: mục tiêu 1.000, thực tế 900, Attainment 90%; (2) chạy truy vấn SQL cho hai dây chuyền; (3) so sánh kết quả với Efficiency của cùng ca. Kết quả mong đợi: L01 đạt 90,00%, L02 đạt 110,00%.",
      "en": "Hands-on: (1) read the standard example: target 1,000, actual 900, Attainment 90%; (2) run the SQL query for two lines; (3) compare the result with the Efficiency of the same shift. Expected result: L01 reaches 90.00% and L02 110.00%."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- Ví dụ chuẩn: mục tiêu 1.000, thực tế 900\nSELECT ROUND(100.0 * 900 / 1000, 2) AS attainment_pct;\n\n-- So sánh hai dây chuyền\nWITH lines_data (line_code, target_output, actual_output) AS (\n  VALUES ('L01', 1000, 900),\n         ('L02', 800, 880)\n)\nSELECT line_code,\n       ROUND(100.0 * actual_output / target_output, 2) AS attainment_pct\nFROM lines_data\nORDER BY line_code;"
      }
    ],
    "exercise": {
      "vi": "1) (Trắc nghiệm) Attainment được tính thế nào?\nA. Sản lượng mục tiêu ÷ sản lượng thực tế × 100%\nB. Sản lượng thực tế ÷ sản lượng mục tiêu × 100%\nC. Giờ công tiêu chuẩn ÷ giờ công thực tế × 100%\nD. Sản lượng OK ÷ tổng sản lượng × 100%\n2) (Tính) Mục tiêu ca là 800 sản phẩm, thực tế 1.000 sản phẩm. Attainment là bao nhiêu?\n3) (Đúng/Sai) Attainment 100% nghĩa là line đã tiết kiệm được giờ công so với tiêu chuẩn.\n4) (Phân tích) Một line có Attainment 100% nhưng Efficiency 80%. Điều này có nghĩa gì?\n5) (Tình huống) Quản lý muốn xem Attainment của cả ngày từ ba ca. Nên cộng các Attainment của ba ca rồi chia 3 hay làm cách khác? Vì sao?",
      "en": "1) (Multiple choice) How is Attainment calculated?\nA. Target output ÷ actual output × 100%\nB. Actual output ÷ target output × 100%\nC. Standard man hours ÷ actual man hours × 100%\nD. Good output ÷ total output × 100%\n2) (Calculate) The shift target is 800 units and the actual output is 1,000 units. What is the Attainment?\n3) (True/False) Attainment of 100% means the line saved labor hours compared with the standard.\n4) (Analysis) A line has 100% Attainment but 80% Efficiency. What does this mean?\n5) (Scenario) A manager wants the daily Attainment from three shifts. Should you average the three shift Attainments and divide by 3? Why or why not?"
    },
    "answer": {
      "vi": "1) B.\n2) 1.000 ÷ 800 × 100% = 125%: vượt mục tiêu 25%.\n3) Sai. Attainment chỉ đo sản lượng so với mục tiêu. Tiết kiệm giờ công được đo bằng Efficiency.\n4) Line đã làm đủ sản lượng nhưng dùng nhiều giờ công hơn tiêu chuẩn. Cần xem lại phân công nhân sự hoặc phương pháp làm việc.\n5) Không nên lấy trung bình các Attainment. Phải cộng sản lượng thực tế và sản lượng mục tiêu của ba ca, rồi chia và nhân 100%, vì các ca có mục tiêu khác nhau.",
      "en": "1) B.\n2) 1,000 ÷ 800 × 100% = 125%: 25% above target.\n3) False. Attainment only measures output against target. Labor savings are measured by Efficiency.\n4) The line produced enough output but used more labor hours than the standard. Review staffing or the work method.\n5) Do not average the Attainments. Add the actual outputs and the target outputs of the three shifts, then divide and multiply by 100%, because the shifts have different targets."
    },
    "relatedTopics": [
      "efficiency",
      "oee"
    ]
  },
  {
    "slug": "pareto",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Pareto: chọn vài nguyên nhân quan trọng nhất",
      "en": "Pareto: pick the few causes that matter most"
    },
    "summary": {
      "vi": "Pareto xếp các nguyên nhân theo mức độ ảnh hưởng để tập trung nguồn lực vào phần lớn vấn đề.",
      "en": "Pareto ranks causes by impact so effort goes to the few that drive most of the problem."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Trong một ngày, nhà máy có thể gặp hàng chục lý do khiến máy dừng. Nếu xử lý từng lý do một cách ngẫu nhiên, nguồn lực sẽ bị phân tán. Pareto là công cụ giúp trả lời câu hỏi: nguyên nhân nào gây ra phần lớn thời gian dừng, để cải tiến đúng chỗ trước.",
      "en": "In one day a factory may see dozens of reasons for machine stops. Tackling them at random spreads effort thin. Pareto answers which causes create most of the lost time, so improvement starts in the right place."
    },
    "objectives": [
      {
        "vi": "Giải thích nguyên lý 80/20 và vì sao nó hữu ích.",
        "en": "Explain the 80/20 principle and why it is useful."
      },
      {
        "vi": "Lập bảng Pareto từ dữ liệu thời gian dừng theo nguyên nhân.",
        "en": "Build a Pareto table from stop time grouped by cause."
      },
      {
        "vi": "Đọc biểu đồ Pareto: cột và đường tích lũy.",
        "en": "Read a Pareto chart: bars and the cumulative line."
      },
      {
        "vi": "Nhận biết khi nào Pareto không cho thấy trọng tâm rõ ràng.",
        "en": "Recognize when Pareto does not reveal a clear focus."
      }
    ],
    "explanation": {
      "vi": "1. Pareto là gì: biểu đồ cột xếp các nguyên nhân theo mức độ giảm dần, kèm đường tích lũy (%) cho biết các nguyên nhân đầu chiếm bao nhiêu phần trăm tổng.\n2. Nguyên lý 80/20: thường một số ít nguyên nhân gây ra phần lớn vấn đề. Đây là quy tắc gần đúng, không phải luật, nên phải kiểm tra bằng dữ liệu.\n3. Cách lập bảng Pareto:\n- Bước 1: chọn đơn vị đo (phút dừng, số lỗi, số lần).\n- Bước 2: tổng hợp theo từng nguyên nhân.\n- Bước 3: sắp xếp từ lớn đến nhỏ.\n- Bước 4: tính tỷ lệ tích lũy = tổng các nguyên nhân đến hiện tại ÷ tổng tất cả × 100%.\n4. Cách đọc: tìm điểm mà đường tích lũy vượt 80%. Các nguyên nhân trước điểm đó là nhóm cần ưu tiên.\n5. Lưu ý: nên đo theo cùng một khoảng thời gian và cùng một đơn vị. Nếu tất cả nguyên nhân gần bằng nhau, Pareto cho thấy phải tìm thêm dữ liệu (ví dụ phân nhóm theo máy hoặc ca) trước khi quyết định.",
      "en": "1. What Pareto is: a bar chart that sorts causes from largest to smallest, with a cumulative (%) line showing what share the top causes make up.\n2. The 80/20 idea: often a few causes create most of the problem. It is a rough rule, not a law, so check it against data.\n3. How to build a Pareto:\n- Step 1: choose the unit (stop minutes, defects, occurrences).\n- Step 2: total each cause.\n- Step 3: sort from largest to smallest.\n- Step 4: cumulative share = total of causes up to this one ÷ grand total × 100%.\n4. How to read it: find where the cumulative line passes 80%. The causes before that point are the priority group.\n5. Note: use the same period and unit. If all causes are nearly equal, Pareto shows that you need more data (for example grouping by machine or shift) before deciding."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Hình minh họa",
          "en": "Illustration"
        },
        "body": {
          "vi": "Biểu đồ Pareto thời gian dừng máy theo nguyên nhân (dữ liệu mẫu). Hai nguyên nhân đầu chiếm 23,7% tổng thời gian dừng.\n![Biểu đồ Pareto thời gian dừng máy theo nguyên nhân](https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/brand/tools/pareto.png)",
          "en": "Pareto chart of machine stop time by cause (sample data). The top two causes make up 23.7% of the total stop time.\n![Pareto chart of machine stop time by cause](https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/brand/tools/pareto.png)"
        }
      },
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: nhà máy muốn giảm thời gian dừng máy nhưng chưa biết nên bắt đầu từ đâu.\nDữ liệu có sẵn: bảng downtime_events (phút dừng theo máy) và downtime_reasons (tên nguyên nhân).\nXử lý và logic: cộng phút dừng theo nguyên nhân, sắp xếp giảm dần, tính tỷ lệ tích lũy.\nKết quả mong đợi: danh sách nguyên nhân kèm tỷ lệ tích lũy. Trong dữ liệu mẫu, nguyên nhân đầu (Planned Maintenance) chiếm 12,4%, và hai nguyên nhân đầu chiếm 23,7%.\nGiá trị kinh doanh: chọn đúng nguyên nhân để đưa vào kế hoạch cải tiến, rồi dùng 5 Whys để tìm gốc.",
          "en": "Business problem: the factory wants to reduce machine downtime but does not know where to start.\nAvailable data: the downtime_events table (stop minutes per machine) and downtime_reasons (cause names).\nProcessing logic: sum stop minutes per cause, sort descending, compute the cumulative share.\nExpected result: a cause list with cumulative shares. In the sample data, the top cause (Planned Maintenance) is 12.4%, and the top two make up 23.7%.\nBusiness value: pick the right cause for the improvement plan, then use 5 Whys to find the root."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- Pareto xếp nguyên nhân theo mức độ ảnh hưởng.\n- Đường tích lũy cho biết phần trăm đóng góp của nhóm đầu.\n- Pareto cần đi kèm dữ liệu đủ tốt và cách đo nhất quán.\nBài tiếp theo: PDCA, vòng lặp để thử và kiểm tra một giải pháp cho nguyên nhân đã chọn.",
          "en": "Key takeaways:\n- Pareto ranks causes by impact.\n- The cumulative line shows the share contributed by the top group.\n- Pareto needs reliable data and consistent measurement.\nNext: PDCA, the loop for testing and checking a fix for the chosen cause."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: chạy truy vấn Pareto trên dữ liệu mẫu, đọc cột tỷ lệ tích lũy và xác định nhóm nguyên nhân chiếm khoảng 50% thời gian dừng. Kết quả mong đợi: Planned Maintenance 1501 phút (12,4%); bốn nguyên nhân đầu cộng lại 44,5%.",
      "en": "Hands-on: run the Pareto query on the sample data, read the cumulative share column, and find the causes that make up about 50% of stop time. Expected result: Planned Maintenance 1501 minutes (12.4%); the top four together 44.5%."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- Pareto: tổng phút dừng theo nguyên nhân và tỷ lệ tích lũy\nWITH per_reason AS (\n  SELECT r.reason_name, SUM(d.duration_minutes) AS minutes\n  FROM downtime_events d\n  JOIN downtime_reasons r ON r.reason_id = d.reason_id\n  GROUP BY r.reason_name\n)\nSELECT reason_name,\n       ROUND(minutes, 1) AS minutes,\n       ROUND(100.0 * SUM(minutes) OVER (ORDER BY minutes DESC ROWS UNBOUNDED PRECEDING)\n             / SUM(minutes) OVER (), 1) AS cumulative_pct\nFROM per_reason\nORDER BY minutes DESC;"
      }
    ],
    "exercise": {
      "vi": "1) (Trắc nghiệm) Pareto dùng để làm gì?\nA. Tìm nguyên nhân gốc bằng cách hỏi 'vì sao'\nB. Chọn các nguyên nhân quan trọng nhất để tập trung nguồn lực\nC. Vẽ sơ đồ xương cá\nD. Đo thời gian chu kỳ\n2) (Đúng/Sai) Quy tắc 80/20 là một luật tự nhiên luôn đúng.\n3) (Tính) Ba nguyên nhân có phút dừng 300, 200 và 100 (tổng 600). Tỷ lệ tích lũy của nguyên nhân thứ hai là bao nhiêu?\n4) (Phân tích) Khi nào Pareto không cho thấy trọng tâm rõ ràng?\n5) (Đọc kết quả) Theo dữ liệu mẫu, hai nguyên nhân đầu chiếm bao nhiêu phần trăm tổng thời gian dừng?",
      "en": "1) (Multiple choice) What is Pareto used for?\nA. Finding the root cause by asking 'why'\nB. Choosing the most important causes to focus effort\nC. Drawing a fishbone diagram\nD. Measuring cycle time\n2) (True/False) The 80/20 rule is a natural law that always holds.\n3) (Calculate) Three causes have 300, 200 and 100 minutes (total 600). What is the cumulative share at the second cause?\n4) (Analysis) When does Pareto fail to show a clear focus?\n5) (Read the result) In the sample data, what share of the total stop time do the top two causes make up?"
    },
    "answer": {
      "vi": "1) B.\n2) Sai. 80/20 là quy tắc gần đúng, cần kiểm tra bằng dữ liệu.\n3) (300 + 200) ÷ 600 × 100% = 83,3%.\n4) Khi các nguyên nhân gần bằng nhau, đường tích lũy tăng đều và không có nhóm nào nổi bật. Khi đó cần phân nhóm thêm (theo máy, ca) trước khi quyết định.\n5) 23,7% (Planned Maintenance 12,4% và Material Shortage 11,3%).",
      "en": "1) B.\n2) False. The 80/20 rule is approximate and must be checked against data.\n3) (300 + 200) ÷ 600 × 100% = 83.3%.\n4) When the causes are nearly equal, the cumulative line rises steadily and no group stands out. Then group further (by machine or shift) before deciding.\n5) 23.7% (Planned Maintenance 12.4% and Material Shortage 11.3%)."
    },
    "relatedTopics": [
      "5-whys",
      "pdca"
    ]
  },
  {
    "slug": "pdca",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "PDCA (Plan, Do, Check, Act): vòng lặp để cải tiến",
      "en": "PDCA (Plan, Do, Check, Act): the loop for improvement"
    },
    "summary": {
      "vi": "PDCA gồm Lập kế hoạch, Thực hiện, Kiểm tra và Điều chỉnh. Đây là vòng lặp, không phải làm một lần.",
      "en": "PDCA is Plan, Do, Check and Act. It is a loop, not a one-time task."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Nhiều cải tiến thất bại vì làm xong rồi thôi, không ai kiểm tra kết quả. PDCA là vòng lặp bốn bước giúp biến một ý tưởng thành thay đổi có đo lường: lập kế hoạch, thử, kiểm tra kết quả và quyết định giữ hay điều chỉnh.",
      "en": "Many improvements fail because nobody checks the result after the change. PDCA is a four-step loop that turns an idea into a measured change: plan, try, check the result, then decide whether to keep or adjust."
    },
    "objectives": [
      {
        "vi": "Mô tả bốn bước Plan, Do, Check, Act.",
        "en": "Describe the four steps Plan, Do, Check and Act."
      },
      {
        "vi": "Viết một kế hoạch cải tiến có mục tiêu đo được.",
        "en": "Write an improvement plan with a measurable target."
      },
      {
        "vi": "Dùng dữ liệu trước và sau để kiểm tra kết quả.",
        "en": "Use before and after data to check the result."
      },
      {
        "vi": "Quyết định khi nào chuẩn hóa và khi nào lặp lại vòng PDCA.",
        "en": "Decide when to standardize and when to repeat the cycle."
      }
    ],
    "explanation": {
      "vi": "1. Plan (lập kế hoạch): xác định vấn đề, mục tiêu đo được, giả thuyết nguyên nhân và cách thử. Ví dụ: 'Giảm số lần dừng do cảm biến từ 10 xuống 5 trong 2 tuần'.\n2. Do (thực hiện): thử giải pháp trên phạm vi nhỏ (một máy, một ca) để giảm rủi ro. Ghi lại những gì đã làm.\n3. Check (kiểm tra): đo kết quả và so sánh với mục tiêu. Dùng cùng cách đo với trước khi thay đổi.\n4. Act (điều chỉnh): nếu hiệu quả, chuẩn hóa (cập nhật quy trình, đào tạo). Nếu chưa, điều chỉnh giải pháp và bắt đầu vòng PDCA mới.\n5. Nguyên tắc: một vòng PDCA nên nhỏ và đo được. Thay đổi nhiều thứ cùng lúc khiến không biết cái nào có tác dụng.\n6. Lỗi thường gặp: bỏ qua bước Check; không có dữ liệu trước khi thay đổi; coi một vòng là đã xong mãi mãi.",
      "en": "1. Plan: define the problem, a measurable target, a hypothesis for the cause, and how to test it. Example: 'Cut sensor-related stops from 10 to 5 in two weeks'.\n2. Do: try the fix on a small scope (one machine, one shift) to limit risk. Record what was done.\n3. Check: measure the result and compare it with the target, using the same method as before the change.\n4. Act: if it works, standardize it (update the procedure, train people). If not, adjust the fix and start a new PDCA cycle.\n5. Principle: keep each cycle small and measurable. Changing many things at once hides which one worked.\n6. Common mistakes: skipping Check; no before data; treating one cycle as final forever."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Hình minh họa",
          "en": "Illustration"
        },
        "body": {
          "vi": "Vòng PDCA: bốn bước lặp lại để cải tiến liên tục.\n![Vòng PDCA](https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/brand/tools/pdca.png)",
          "en": "The PDCA cycle: four steps repeated for continuous improvement.\n![PDCA cycle](https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/brand/tools/pdca.png)"
        }
      },
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: số lần dừng máy do cảm biến tăng. Nhóm muốn thử thay lịch vệ sinh cảm biến và xem có giảm không.\nDữ liệu có sẵn: bảng downtime_events, lưu thời gian bắt đầu và phút dừng.\nXử lý và logic: so sánh số sự kiện và phút dừng trung bình trước và sau ngày thay đổi.\nKết quả mong đợi: một bảng so sánh hai giai đoạn để quyết định giữ hay điều chỉnh. Trong dữ liệu mẫu, số sự kiện tăng từ 306 lên 351 nhưng thời gian trung bình mỗi lần dừng không đổi (18,5 phút), nên chưa đủ bằng chứng để kết luận giải pháp có tác dụng.\nGiá trị kinh doanh: không kết luận cảm tính, mọi quyết định đều dựa trên số đo trước và sau.",
          "en": "Business problem: the number of sensor-related machine stops has increased. The team wants to test a new sensor cleaning schedule and see whether stops fall.\nAvailable data: the downtime_events table with start times and stop minutes.\nProcessing logic: compare the number of events and average stop minutes before and after the change date.\nExpected result: a two-period comparison to decide whether to keep or adjust the fix. In the sample data the event count rises from 306 to 351 while the average stop (18.5 minutes) does not change, so there is not yet enough evidence that the fix works.\nBusiness value: no decisions based on feeling; every decision uses before and after measurements."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- PDCA gồm Lập kế hoạch, Thực hiện, Kiểm tra và Điều chỉnh.\n- Luôn đo trước và sau khi thay đổi bằng cùng một cách.\n- Vòng PDCA nhỏ, lặp lại nhiều lần là cách an toàn nhất.\nBài tiếp theo: Gemba Walk, đi xem tận nơi để hiểu điều dữ liệu chưa cho thấy.",
          "en": "Key takeaways:\n- PDCA is Plan, Do, Check and Act.\n- Always measure before and after a change, the same way.\n- Small cycles repeated many times are the safest approach.\nNext: Gemba Walk, going to the place to see what the data does not show."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: so sánh số sự kiện và phút dừng trung bình trước và sau ngày 01/09 trên dữ liệu mẫu. Kết quả mong đợi: trước 01/09 có 306 sự kiện, trung bình 18,5 phút; từ 01/09 có 351 sự kiện, trung bình 18,5 phút.",
      "en": "Hands-on: compare the number of events and average stop minutes before and after 1 Sep in the sample data. Expected result: before 1 Sep there are 306 events averaging 18.5 minutes; from 1 Sep there are 351 events averaging 18.5 minutes."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- So sánh trước và sau một ngày thay đổi (PDCA: Check)\nSELECT CASE WHEN start_time < TIMESTAMP '2026-09-01' THEN 'Trước 01/09' ELSE 'Từ 01/09' END AS giai_doan,\n       COUNT(*) AS so_su_kien,\n       ROUND(AVG(duration_minutes), 1) AS phut_tb\nFROM downtime_events\nGROUP BY 1\nORDER BY 1;"
      }
    ],
    "exercise": {
      "vi": "1) (Trắc nghiệm) Bước nào của PDCA đo kết quả so với mục tiêu?\nA. Plan\nB. Do\nC. Check\nD. Act\n2) (Đúng/Sai) Nên thay đổi nhiều thứ cùng lúc để cải tiến nhanh hơn.\n3) (Tình huống) Sau khi thay đổi, số lần dừng giảm nhưng không có dữ liệu trước đó để so sánh. Vấn đề là gì?\n4) (Phân tích) Khi nào nên chuẩn hóa thay vì lặp lại vòng PDCA?\n5) (Đọc kết quả) Theo dữ liệu mẫu, số sự kiện từ 01/09 tăng bao nhiêu so với trước 01/09?",
      "en": "1) (Multiple choice) Which PDCA step measures the result against the target?\nA. Plan\nB. Do\nC. Check\nD. Act\n2) (True/False) You should change many things at once to improve faster.\n3) (Scenario) After a change, stops went down, but there is no earlier data to compare with. What is the problem?\n4) (Analysis) When should you standardize instead of repeating the PDCA cycle?\n5) (Read the result) In the sample data, how many more events are there from 1 Sep than before?"
    },
    "answer": {
      "vi": "1) C. Check là bước đo và so sánh.\n2) Sai. Thay đổi nhiều thứ cùng lúc khiến không biết cái nào có tác dụng.\n3) Không có dữ liệu trước khi thay đổi nên không biết giảm có thật hay do yếu tố khác (ví dụ ít sản lượng). Cần đo trước khi thay đổi.\n4) Khi kết quả đạt mục tiêu ổn định qua nhiều ngày, ta chuẩn hóa (cập nhật quy trình, đào tạo). Chưa đạt thì điều chỉnh và lặp vòng mới.\n5) 45 sự kiện (351 − 306).",
      "en": "1) C. Check is the step that measures and compares.\n2) False. Changing many things at once hides which one worked.\n3) There is no before data, so you cannot tell whether the drop is real or caused by something else (for example lower volume). Measure before any change.\n4) When the result meets the target and stays stable over several days, standardize it (update the procedure, train people). If not, adjust and start a new cycle.\n5) 45 more events (351 − 306)."
    },
    "relatedTopics": [
      "pareto",
      "gemba-walk"
    ]
  },
  {
    "slug": "gemba-walk",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Gemba Walk: đi xem tận nơi",
      "en": "Gemba Walk: go and see for yourself"
    },
    "summary": {
      "vi": "Gemba là nơi công việc thực sự diễn ra. Gemba Walk là đi xem, quan sát, hỏi và lắng nghe tại đó.",
      "en": "Gemba is where the work really happens. A Gemba Walk means going there to observe, ask and listen."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Báo cáo cho biết máy dừng bao lâu, nhưng không cho biết công nhân đang đợi gì, vật tư để ở đâu, hay dụng cụ có đủ không. Gemba Walk là thói quen lãnh đạo và kỹ sư đi đến nơi làm việc thực tế để thấy những điều dữ liệu không thể hiện.",
      "en": "A report shows how long a machine stopped, but not what the operator is waiting for, where materials are kept, or whether tools are ready. A Gemba Walk is the habit of leaders and engineers going to the real workplace to see what data cannot show."
    },
    "objectives": [
      {
        "vi": "Giải thích Gemba và Gemba Walk.",
        "en": "Explain Gemba and the Gemba Walk."
      },
      {
        "vi": "Thực hiện một buổi Gemba Walk có mục tiêu rõ ràng.",
        "en": "Run a Gemba Walk with a clear purpose."
      },
      {
        "vi": "Đặt câu hỏi và lắng nghe để tìm nguyên nhân thực tế.",
        "en": "Ask questions and listen to find the real cause."
      },
      {
        "vi": "Kết hợp Gemba Walk với dữ liệu để chọn nơi cần xem.",
        "en": "Combine a Gemba Walk with data to choose where to go."
      }
    ],
    "explanation": {
      "vi": "1. Gemba: tiếng Nhật nghĩa là nơi thực tế, nơi công việc diễn ra. Với nhà máy, đó là dây chuyền, kho, khu bảo trì.\n2. Gemba Walk: đi xem có chủ đích, không phải đi tuần tra để kiểm tra. Mục tiêu là hiểu vì sao việc đang diễn ra như vậy.\n3. Các bước:\n- Chuẩn bị: chọn nơi và mục tiêu, thường dựa trên dữ liệu (ví dụ máy có nhiều phút dừng nhất).\n- Quan sát: nhìn người làm, máy, vật tư, dụng cụ mà không kết luận ngay.\n- Đặt câu hỏi: hỏi người vận hành, không hỏi để bắt lỗi. Ví dụ: 'Bạn đang đợi gì lúc này?'\n- Lắng nghe: để người làm giải thích. Họ thường biết nguyên nhân mà báo cáo không ghi.\n- Hành động: cam kết việc cần làm và quay lại kiểm tra.\n4. Thái độ: người đi xem nên khuyến khích người làm chia sẻ. Trách mắng làm mất thông tin thật.\n5. Gemba Walk không thay thế dữ liệu. Dữ liệu chỉ ra nơi cần xem, đi xem giải thích vì sao.",
      "en": "1. Gemba means the actual place where work happens. In a factory that is the line, the warehouse or the maintenance area.\n2. Gemba Walk: a purposeful visit, not an inspection. The aim is to understand why things are happening the way they are.\n3. Steps:\n- Prepare: choose the place and purpose, often based on data (for example the machine with most stop minutes).\n- Observe: watch people, machines, materials and tools without jumping to conclusions.\n- Ask questions: ask operators, not to catch mistakes. Example: 'What are you waiting for right now?'\n- Listen: let people explain. They often know causes that reports do not record.\n- Act: agree on what to do and come back to check.\n4. Attitude: the visitor should encourage people to speak. Blame stops honest information.\n5. A Gemba Walk does not replace data. Data shows where to go; going there explains why."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Hình minh họa",
          "en": "Illustration"
        },
        "body": {
          "vi": "Các bước của một Gemba Walk, kèm ví dụ ghi chú tại ba máy có nhiều phút dừng nhất trong dữ liệu mẫu.\n![Các bước Gemba Walk](https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/brand/tools/gemba.png)",
          "en": "The steps of a Gemba Walk, with example notes at the three machines with the most stop minutes in the sample data.\n![Gemba Walk steps](https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/brand/tools/gemba.png)"
        }
      },
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: báo cáo cho thấy máy M-D1, M-C2, M-D3 dừng nhiều nhất, nhưng không rõ nguyên nhân tại chỗ.\nDữ liệu có sẵn: bảng downtime_events và machines.\nXử lý và logic: xếp máy theo tổng phút dừng để chọn nơi đi xem trước.\nKết quả mong đợi: danh sách ba máy cần đi xem. Trong dữ liệu mẫu: M-D1 1.290 phút, M-C2 1.270 phút, M-D3 1.212 phút.\nGiá trị kinh doanh: đi đúng chỗ, đúng lúc, và từ quan sát thực tế rút ra câu hỏi để đưa vào 5 Whys.",
          "en": "Business problem: the report shows M-D1, M-C2 and M-D3 stop most often, but not why on the spot.\nAvailable data: the downtime_events and machines tables.\nProcessing logic: rank machines by total stop minutes to choose where to go first.\nExpected result: a list of three machines to visit. In the sample data: M-D1 1,290 minutes, M-C2 1,270, M-D3 1,212.\nBusiness value: go to the right place at the right time, and turn what you see into questions for 5 Whys."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- Gemba là nơi công việc thực sự diễn ra.\n- Đi xem để quan sát, hỏi và lắng nghe, không để bắt lỗi.\n- Dùng dữ liệu để chọn nơi đi xem.\nBài tiếp theo: 5 Whys, hỏi vì sao liên tiếp để đi từ triệu chứng đến nguyên nhân gốc.",
          "en": "Key takeaways:\n- Gemba is where the work really happens.\n- Go to observe, ask and listen, not to catch mistakes.\n- Use data to choose where to go.\nNext: 5 Whys, asking why repeatedly to move from the symptom to the root cause."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: xếp hạng máy theo tổng phút dừng trên dữ liệu mẫu, chọn ba máy đứng đầu và lập một danh sách ba câu hỏi cho buổi đi xem. Kết quả mong đợi: M-D1 (1.290 phút), M-C2 (1.270 phút), M-D3 (1.212 phút).",
      "en": "Hands-on: rank machines by total stop minutes in the sample data, pick the top three, and write three questions for the visit. Expected result: M-D1 (1,290 minutes), M-C2 (1,270), M-D3 (1,212)."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- Chọn máy cần đi xem: tổng phút dừng cao nhất\nSELECT m.machine_code,\n       ROUND(SUM(d.duration_minutes), 1) AS phut_dung\nFROM downtime_events d\nJOIN machines m ON m.machine_id = d.machine_id\nGROUP BY m.machine_code\nORDER BY phut_dung DESC\nLIMIT 3;"
      }
    ],
    "exercise": {
      "vi": "1) (Trắc nghiệm) Gemba nghĩa là gì?\nA. Một loại báo cáo\nB. Nơi công việc thực sự diễn ra\nC. Một phần mềm\nD. Một chỉ số KPI\n2) (Đúng/Sai) Gemba Walk là đi kiểm tra để tìm người làm sai.\n3) (Tình huống) Công nhân nói họ đợi vật tư, nhưng báo cáo ghi lỗi máy. Bạn làm gì tiếp?\n4) (Đặt câu hỏi) Viết một câu hỏi mở để hiểu tình huống máy đang dừng.\n5) (Đọc kết quả) Theo dữ liệu mẫu, máy nào có nhiều phút dừng nhất?",
      "en": "1) (Multiple choice) What does Gemba mean?\nA. A type of report\nB. The place where work really happens\nC. A software\nD. A KPI\n2) (True/False) A Gemba Walk is an inspection to find people who make mistakes.\n3) (Scenario) An operator says they are waiting for material, but the report says machine fault. What do you do next?\n4) (Ask) Write one open question to understand why the machine is stopped.\n5) (Read the result) In the sample data, which machine has the most stop minutes?"
    },
    "answer": {
      "vi": "1) B.\n2) Sai. Gemba Walk là đi xem để hiểu, không phải để bắt lỗi người làm.\n3) Đi xem tận nơi để kiểm tra vật tư và ghi nhận. Cập nhật lại nguyên nhân trong báo cáo, và đưa vấn đề vật tư vào 5 Whys.\n4) Ví dụ: 'Lúc này bạn đang chờ điều gì để tiếp tục?'\n5) M-D1 (1.290 phút).",
      "en": "1) B.\n2) False. A Gemba Walk is to observe and understand, not to catch people making mistakes.\n3) Go and check the material situation and record it. Correct the cause in the report, and take the material issue into 5 Whys.\n4) For example: 'What are you waiting for right now before you can continue?'\n5) M-D1 (1,290 minutes)."
    },
    "relatedTopics": [
      "5-whys",
      "visual-management"
    ]
  },
  {
    "slug": "5-whys",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "5 Whys: hỏi vì sao đến gốc",
      "en": "5 Whys: keep asking why until the root"
    },
    "summary": {
      "vi": "Hỏi 'vì sao' liên tiếp khoảng năm lần để đi từ triệu chứng đến nguyên nhân gốc, thay vì sửa ngọn.",
      "en": "Ask 'why' about five times to move from the symptom to the root cause, instead of fixing the surface."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Khi máy dừng, người ta thường sửa ngay triệu chứng: thay vật tư, reset máy. Lần sau máy lại dừng vì cùng một lý do, vì gốc chưa được tìm ra. 5 Whys là kỹ thuật hỏi 'vì sao' liên tiếp để đi xuống tận gốc.",
      "en": "When a machine stops, people often fix the symptom: replace a part, reset the machine. Next time it stops for the same reason, because the root was never found. 5 Whys is the technique of asking 'why' repeatedly to reach the root."
    },
    "objectives": [
      {
        "vi": "Giải thích kỹ thuật 5 Whys và mục đích của nó.",
        "en": "Explain the 5 Whys technique and its purpose."
      },
      {
        "vi": "Thực hiện chuỗi hỏi 'vì sao' cho một vấn đề cụ thể.",
        "en": "Run a chain of 'why' questions on a specific problem."
      },
      {
        "vi": "Nhận biết khi nào đã đến nguyên nhân gốc.",
        "en": "Recognize when you have reached the root cause."
      },
      {
        "vi": "Phân biệt triệu chứng, nguyên nhân trực tiếp và nguyên nhân gốc.",
        "en": "Distinguish a symptom, a direct cause and a root cause."
      }
    ],
    "explanation": {
      "vi": "1. 5 Whys: hỏi 'vì sao' lặp lại khoảng năm lần. Số 5 chỉ là quy ước; có khi cần ít hơn hoặc nhiều hơn.\n2. Ba tầng cần phân biệt:\n- Triệu chứng: thứ mọi người nhìn thấy (máy dừng).\n- Nguyên nhân trực tiếp: điều gây ra triệu chứng (cảm biến lỗi).\n- Nguyên nhân gốc: lý do hệ thống để nguyên nhân trực tiếp xảy ra (không có lịch vệ sinh).\n3. Cách làm:\n- Viết vấn đề cụ thể, có số liệu.\n- Hỏi 'vì sao'? Trả lời bằng sự việc có thể kiểm chứng, không trả lời bằng cảm tính ('do bất cẩn').\n- Lặp lại với câu trả lời mới.\n- Dừng khi câu trả lời là một quy trình, hệ thống hoặc quyết định có thể thay đổi.\n4. Kiểm tra gốc: nếu sửa gốc này, vấn đề có không quay lại không? Nếu có, đó là gốc.\n5. Lỗi thường gặp: dừng ở câu trả lời 'người vận hành sai'; có nhiều nhánh nhưng chỉ đi một nhánh; trả lời bằng đổ lỗi.",
      "en": "1. 5 Whys: ask 'why' repeatedly, about five times. Five is a convention; sometimes fewer or more are needed.\n2. Three levels to tell apart:\n- Symptom: what people see (the machine stops).\n- Direct cause: what produces the symptom (a faulty sensor).\n- Root cause: why the system allows the direct cause to happen (no cleaning schedule).\n3. How to do it:\n- Write the specific problem with data.\n- Ask 'why?' and answer with verifiable facts, not feelings ('carelessness').\n- Repeat with the new answer.\n- Stop when the answer is a process, a system or a decision you can change.\n4. Root check: if you fix this, will the problem stop coming back? If yes, it is the root.\n5. Common mistakes: stopping at 'the operator was careless'; following only one branch; answering with blame."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Hình minh họa",
          "en": "Illustration"
        },
        "body": {
          "vi": "Chuỗi 5 Whys cho một ví dụ minh họa: máy dừng do thiếu vật liệu, và gốc nằm ở định mức tồn kho chưa được rà soát.\n![Chuỗi 5 Whys](https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/brand/tools/whys.png)",
          "en": "A 5 Whys chain for an illustrative example: the machine stops for lack of material, and the root is an inventory standard that was never reviewed.\n![5 Whys chain](https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/brand/tools/whys.png)"
        }
      },
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: máy M-D3 dừng nhiều lần vì thiếu vật liệu, và sửa xong lại dừng tiếp.\nDữ liệu có sẵn: bảng downtime_events và downtime_reasons, lọc nguyên nhân Material Shortage.\nXử lý và logic: xếp các máy theo phút dừng do thiếu vật liệu, chọn máy đứng đầu để đi sâu bằng 5 Whys.\nKết quả mong đợi: danh sách máy có nhiều sự kiện thiếu vật liệu. Trong dữ liệu mẫu: M-D3 có 10 lần (236 phút), M-B3 có 11 lần (230 phút), M-D1 có 9 lần (141 phút).\nGiá trị kinh doanh: thay vì sửa từng lần, tìm được quy trình cấp vật liệu cần thay đổi để không lặp lại.",
          "en": "Business problem: machine M-D3 keeps stopping for lack of material, and it stops again after each repair.\nAvailable data: the downtime_events and downtime_reasons tables, filtered to Material Shortage.\nProcessing logic: rank machines by stop minutes caused by material shortage, then take the top one into 5 Whys.\nExpected result: machines with the most material-shortage events. In the sample data: M-D3 has 10 events (236 minutes), M-B3 has 11 (230 minutes), M-D1 has 9 (141 minutes).\nBusiness value: instead of repairing each time, find the material-supply process to change so the stop does not repeat."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- 5 Whys đi từ triệu chứng đến nguyên nhân gốc bằng cách hỏi 'vì sao' lặp lại.\n- Trả lời bằng sự việc kiểm chứng được, không đổ lỗi cho người.\n- Gốc là thứ có thể thay đổi trong quy trình hoặc hệ thống.\nBài tiếp theo: Ishikawa, phân loại các nguyên nhân có thể trước khi đi sâu.",
          "en": "Key takeaways:\n- 5 Whys moves from the symptom to the root by asking why repeatedly.\n- Answer with verifiable facts, not blame.\n- The root is something in the process or system you can change.\nNext: Ishikawa, grouping possible causes before going deeper."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: lọc sự kiện do thiếu vật liệu, xếp máy theo phút dừng và chọn máy đứng đầu để viết chuỗi 5 Whys. Kết quả mong đợi: M-D3 (10 lần, 236 phút) là máy có tổng phút dừng cao nhất trong nhóm thiếu vật liệu.",
      "en": "Hands-on: filter the material-shortage events, rank machines by stop minutes, and pick the top one to write a 5 Whys chain. Expected result: M-D3 (10 events, 236 minutes) has the most stop minutes in the material-shortage group."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- Các máy có nhiều sự kiện thiếu vật liệu (đầu vào cho 5 Whys)\nSELECT m.machine_code,\n       COUNT(*) AS so_lan,\n       ROUND(SUM(d.duration_minutes), 1) AS phut\nFROM downtime_events d\nJOIN downtime_reasons r ON r.reason_id = d.reason_id\nJOIN machines m ON m.machine_id = d.machine_id\nWHERE r.reason_name = 'Material Shortage'\nGROUP BY m.machine_code\nORDER BY phut DESC\nLIMIT 3;"
      }
    ],
    "exercise": {
      "vi": "1) (Trắc nghiệm) Triệu chứng trong 5 Whys là gì?\nA. Nguyên nhân gốc\nB. Điều mọi người nhìn thấy\nC. Quy trình thay đổi được\nD. Kết quả cuối cùng\n2) (Đúng/Sai) Nên dừng ở câu trả lời 'người vận hành bất cẩn'.\n3) (Sắp xếp) Đặt theo thứ tự từ triệu chứng đến gốc: nguyên nhân gốc, triệu chứng, nguyên nhân trực tiếp.\n4) (Tình huống) Sau khi sửa cảm biến, máy vẫn dừng vì cùng lý do. Có nghĩa là gì?\n5) (Đọc kết quả) Theo dữ liệu mẫu, máy nào có nhiều phút dừng do thiếu vật liệu nhất?",
      "en": "1) (Multiple choice) What is a symptom in 5 Whys?\nA. The root cause\nB. What people can see\nC. A process you can change\nD. The final result\n2) (True/False) You should stop at the answer 'the operator was careless'.\n3) (Order) Put these from symptom to root: root cause, symptom, direct cause.\n4) (Scenario) After fixing the sensor, the machine stops again for the same reason. What does it mean?\n5) (Read the result) In the sample data, which machine has the most stop minutes from material shortage?"
    },
    "answer": {
      "vi": "1) B.\n2) Sai. 'Bất cẩn' là đổ lỗi, không phải gốc. Hỏi tiếp vì sao người đó làm như vậy trong hệ thống.\n3) Triệu chứng, nguyên nhân trực tiếp, nguyên nhân gốc.\n4) Đã sửa triệu chứng hoặc nguyên nhân trực tiếp, nhưng chưa tìm được gốc. Quay lại hỏi 'vì sao' tiếp.\n5) M-D3 (236 phút, 10 lần).",
      "en": "1) B.\n2) False. 'Careless' is blame, not a root. Keep asking why the system allowed it.\n3) Symptom, direct cause, root cause.\n4) You fixed the symptom or the direct cause, but not the root. Go back and ask why again.\n5) M-D3 (236 minutes, 10 events)."
    },
    "relatedTopics": [
      "ishikawa",
      "pareto"
    ]
  },
  {
    "slug": "ishikawa",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Ishikawa: sơ đồ xương cá",
      "en": "Ishikawa: the fishbone diagram"
    },
    "summary": {
      "vi": "Sơ đồ xương cá phân loại các nguyên nhân có thể của một vấn đề theo nhóm 4M để không bỏ sót.",
      "en": "The fishbone diagram groups possible causes of a problem into 4M categories so none is missed."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Khi một vấn đề xảy ra, người ta thường chỉ nghĩ đến một hai nguyên nhân. Ishikawa là sơ đồ giúp nhóm nhìn toàn bộ các nguyên nhân có thể theo từng nhóm, từ đó chọn nguyên nhân cần kiểm tra trước.",
      "en": "When a problem happens, people often think of only one or two causes. Ishikawa is a diagram that shows all possible causes grouped by category, so you can choose which to test first."
    },
    "objectives": [
      {
        "vi": "Vẽ được sơ đồ xương cá với đầu cá là vấn đề.",
        "en": "Draw a fishbone diagram with the problem as the head."
      },
      {
        "vi": "Phân loại nguyên nhân theo nhóm 4M (con người, máy, phương pháp, vật liệu).",
        "en": "Group causes into 4M categories (manpower, machine, method, material)."
      },
      {
        "vi": "Dùng dữ liệu để chọn nhóm nguyên nhân cần kiểm tra trước.",
        "en": "Use data to choose which cause group to test first."
      },
      {
        "vi": "Kết hợp Ishikawa với 5 Whys để đi sâu.",
        "en": "Combine Ishikawa with 5 Whys to go deeper."
      }
    ],
    "explanation": {
      "vi": "1. Ishikawa, còn gọi là sơ đồ xương cá vì hình dạng giống bộ xương cá: đầu cá là vấn đề, các xương là nhóm nguyên nhân.\n2. Nhóm 4M thường dùng:\n- Con người (Manpower): kỹ năng, đào tạo, số người, ca làm.\n- Máy (Machine): tình trạng, bảo trì, thông số, cảm biến.\n- Phương pháp (Method): quy trình, hướng dẫn công việc, thứ tự thao tác.\n- Vật liệu (Material): chất lượng, đúng loại, cấp đúng lúc.\nNhiều nơi thêm Đo lường (Measurement) và Môi trường (Environment).\n3. Cách làm:\n- Viết vấn đề ở đầu cá, có số liệu.\n- Với mỗi nhóm, liệt kê nguyên nhân có thể (brainstorm, không loại bỏ vội).\n- Dùng dữ liệu để xếp ưu tiên các nhóm.\n- Chọn một vài nguyên nhân để kiểm tra bằng 5 Whys hoặc thử nghiệm.\n4. Lưu ý: sơ đồ là công cụ gợi ý, không phải kết luận. Mỗi nguyên nhân phải được kiểm chứng.",
      "en": "1. Ishikawa is also called the fishbone diagram because of its shape: the head is the problem, the bones are cause groups.\n2. Common 4M groups:\n- Manpower: skills, training, staffing, shifts.\n- Machine: condition, maintenance, parameters, sensors.\n- Method: procedures, work instructions, step order.\n- Material: quality, right type, delivered on time.\nMany sites add Measurement and Environment.\n3. How to do it:\n- Write the problem at the head, with data.\n- For each group, list possible causes (brainstorm, do not reject too early).\n- Use data to rank the groups.\n- Pick a few causes to test with 5 Whys or a trial.\n4. Note: the diagram suggests, it does not conclude. Each cause must be verified."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Hình minh họa",
          "en": "Illustration"
        },
        "body": {
          "vi": "Sơ đồ xương cá với đầu cá là dừng máy, và nhóm 4M.\n![Sơ đồ xương cá](https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/brand/tools/ishikawa.png)",
          "en": "Fishbone diagram with machine stop as the head and the 4M groups as bones.\n![Fishbone diagram](https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/brand/tools/ishikawa.png)"
        }
      },
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: dừng máy nhiều lần trên toàn nhà máy, chưa biết nên tập trung nhóm nguyên nhân nào.\nDữ liệu có sẵn: bảng downtime_events và downtime_reasons, có cột category (Breakdown, Changeover, Material, Quality, Planned, Other).\nXử lý và logic: cộng phút dừng và số lần theo từng category, để xếp các nhóm nguyên nhân.\nKết quả mong đợi: nhóm Breakdown đứng đầu với 3.196 phút và 172 lần trong dữ liệu mẫu, tiếp theo là Other (2.485 phút) và Changeover (2.345 phút).\nGiá trị kinh doanh: tập trung kiểm tra vào nhóm có tác động lớn nhất trước khi đi sâu từng nguyên nhân.",
          "en": "Business problem: machines stop often across the factory, and the team does not know which cause group to focus on.\nAvailable data: the downtime_events and downtime_reasons tables, with a category column (Breakdown, Changeover, Material, Quality, Planned, Other).\nProcessing logic: sum stop minutes and event counts per category to rank the groups.\nExpected result: Breakdown ranks first with 3,196 minutes and 172 events in the sample data, then Other (2,485 minutes) and Changeover (2,345 minutes).\nBusiness value: focus checks on the group with the biggest impact before going deeper into each cause."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- Ishikawa phân loại nguyên nhân theo nhóm để không bỏ sót.\n- Nhóm 4M là điểm bắt đầu; có thể thêm đo lường và môi trường.\n- Dùng dữ liệu để xếp ưu tiên, rồi kiểm chứng bằng 5 Whys.\nBài tiếp theo: Visual Management, đưa KPI và trạng thái ra chỗ mọi người nhìn thấy.",
          "en": "Key takeaways:\n- Ishikawa groups causes so none is missed.\n- The 4M groups are a starting point; you can add measurement and environment.\n- Use data to rank, then verify with 5 Whys.\nNext: Visual Management, putting KPIs and status where everyone can see them."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: tổng hợp phút dừng và số lần theo category trên dữ liệu mẫu, xếp hạng các nhóm và chọn nhóm đứng đầu để liệt kê ba nguyên nhân có thể. Kết quả mong đợi: Breakdown 3.196 phút (172 lần), Other 2.485 phút (136 lần), Changeover 2.345 phút (126 lần).",
      "en": "Hands-on: total stop minutes and event counts by category in the sample data, rank the groups, and list three possible causes for the top group. Expected result: Breakdown 3,196 minutes (172 events), Other 2,485 minutes (136), Changeover 2,345 minutes (126)."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- Phân nhóm nguyên nhân dừng máy theo category (đầu vào cho sơ đồ xương cá)\nSELECT r.category,\n       ROUND(SUM(d.duration_minutes), 1) AS phut,\n       COUNT(*) AS so_lan\nFROM downtime_events d\nJOIN downtime_reasons r ON r.reason_id = d.reason_id\nGROUP BY r.category\nORDER BY phut DESC;"
      }
    ],
    "exercise": {
      "vi": "1) (Trắc nghiệm) Trong nhóm 4M, 'Phương pháp' nói về điều gì?\nA. Kỹ năng người vận hành\nB. Quy trình và thứ tự thao tác\nC. Tình trạng máy\nD. Chất lượng vật liệu\n2) (Đúng/Sai) Sơ đồ xương cá đưa ra kết luận nguyên nhân gốc.\n3) (Tình huống) Dữ liệu cho thấy nhóm Breakdown có nhiều phút dừng nhất. Nhóm nào trong 4M nên kiểm tra trước?\n4) (Phân tích) Vì sao nên dùng dữ liệu để xếp ưu tiên các nhóm?\n5) (Đọc kết quả) Theo dữ liệu mẫu, nhóm nào có nhiều lần dừng nhất?",
      "en": "1) (Multiple choice) In the 4M groups, what does 'Method' cover?\nA. Operator skills\nB. Procedures and the order of steps\nC. Machine condition\nD. Material quality\n2) (True/False) A fishbone diagram gives the root cause as a conclusion.\n3) (Scenario) Data shows the Breakdown category has the most stop minutes. Which 4M group should be checked first?\n4) (Analysis) Why use data to rank the groups?\n5) (Read the result) In the sample data, which category has the most events?"
    },
    "answer": {
      "vi": "1) B.\n2) Sai. Sơ đồ gợi ý nguyên nhân; mỗi nguyên nhân phải được kiểm chứng.\n3) Nhóm Máy (Machine), vì Breakdown liên quan đến hỏng máy; có thể kiểm tra thêm bảo trì và cảm biến.\n4) Để không kiểm tra mọi thứ cùng lúc. Dữ liệu cho biết nhóm nào tác động lớn nhất để tập trung nguồn lực.\n5) Breakdown (172 lần).",
      "en": "1) B.\n2) False. The diagram suggests causes; each one must be verified.\n3) The Machine group, because Breakdown relates to equipment failure; check maintenance and sensors further.\n4) So you do not check everything at once. Data shows which group has the biggest impact, to focus effort.\n5) Breakdown (172 events)."
    },
    "relatedTopics": [
      "5-whys",
      "visual-management"
    ]
  },
  {
    "slug": "visual-management",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Visual Management: KPI nhìn thấy ngay",
      "en": "Visual Management: KPIs visible at a glance"
    },
    "summary": {
      "vi": "Đưa KPI và trạng thái quy trình ra chỗ mọi người nhìn thấy, để bất thường được phát hiện ngay.",
      "en": "Put KPIs and process status where everyone can see them, so abnormal conditions are noticed at once."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Nếu muốn biết một dây chuyền đang ổn hay không, người quản lý phải chờ báo cáo cuối ngày. Visual Management đưa KPI và trạng thái ra ngay tại nơi làm việc, bằng màu sắc, bảng và đèn, để mọi người phản ứng ngay khi có bất thường.",
      "en": "To know whether a line is on track, a manager may have to wait for the end-of-day report. Visual Management puts KPIs and status right where the work happens, using colour, boards and lights, so everyone reacts as soon as something is abnormal."
    },
    "objectives": [
      {
        "vi": "Giải thích Visual Management và lợi ích của nó.",
        "en": "Explain Visual Management and its benefits."
      },
      {
        "vi": "Đặt mục tiêu và màu trạng thái cho một KPI.",
        "en": "Set a target and status colours for a KPI."
      },
      {
        "vi": "Thiết kế bảng KPI đơn giản cho một dây chuyền.",
        "en": "Design a simple KPI board for a line."
      },
      {
        "vi": "Hiểu vai trò của đèn Andon trong quản lý trực quan.",
        "en": "Understand the role of Andon lights in visual management."
      }
    ],
    "explanation": {
      "vi": "1. Visual Management: quản lý bằng hình ảnh và tín hiệu, để người xem hiểu nhanh tình trạng mà không cần đọc báo cáo.\n2. Thành phần thường gặp:\n- Bảng KPI: giá trị hiện tại so với mục tiêu, có màu theo trạng thái.\n- Quy ước màu: xanh (đạt), vàng (cần chú ý), đỏ (không đạt, cần xử lý).\n- Đèn Andon: tín hiệu máy hoặc dây chuyền. Xanh đang chạy, vàng cần hỗ trợ, đỏ dừng và cần xử lý.\n- Bảng quản lý hằng ngày: ghi lại vấn đề và người chịu trách nhiệm.\n3. Cách thiết kế KPI board:\n- Chọn ít KPI quan trọng (ví dụ NG rate, sản lượng so với kế hoạch).\n- Đặt mục tiêu rõ ràng.\n- Quy ước ngưỡng màu trước khi bắt đầu.\n- Cập nhật đúng giờ, ở nơi người làm việc đi qua.\n4. Lợi ích: phát hiện bất thường sớm, giảm phụ thuộc vào báo cáo, tạo thói quen cùng nhìn vào một con số.\n5. Lưu ý: bảng chỉ có ích khi có người đọc và hành động. Nếu không ai xử lý khi đỏ, bảng chỉ là trang trí.",
      "en": "1. Visual Management: managing with pictures and signals, so viewers understand the status quickly without reading a report.\n2. Common elements:\n- KPI board: current value against the target, coloured by status.\n- Colour rules: green (on target), yellow (watch), red (missed, act now).\n- Andon lights: a machine or line signal. Green running, yellow needs help, red stopped and needs action.\n- Daily management board: records problems and who owns them.\n3. How to design a KPI board:\n- Choose a few important KPIs (for example NG rate, output against plan).\n- Set clear targets.\n- Agree the colour thresholds before you start.\n- Update on time, in a place people pass by.\n4. Benefits: spot abnormal conditions early, rely less on reports, and build the habit of looking at one number together.\n5. Note: a board only helps when someone reads it and acts. If nobody responds to red, the board is just decoration."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Hình minh họa",
          "en": "Illustration"
        },
        "body": {
          "vi": "Bảng KPI NG rate của bốn dây chuyền (dữ liệu mẫu) và quy ước đèn Andon. Mục tiêu dưới 3%: cả bốn dây chuyền đều trên mục tiêu.\n![Bảng KPI và đèn Andon](https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/brand/tools/visual.png)",
          "en": "KPI board of NG rate for four lines (sample data) and the Andon light rules. Target below 3%: all four lines are above target.\n![KPI board and Andon lights](https://mvhzyhdwmhdgossmpblj.supabase.co/storage/v1/object/public/brand/tools/visual.png)"
        }
      },
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: quản lý muốn thấy ngay dây chuyền nào có tỷ lệ NG cao vượt mục tiêu, không cần chờ báo cáo cuối ngày.\nDữ liệu có sẵn: bảng production_records và production_orders, có số lượng NG và tổng số kiểm tra theo dây chuyền.\nXử lý và logic: tính NG rate theo dây chuyền, so với mục tiêu 3% và gán màu theo ngưỡng.\nKết quả mong đợi: LINE-A 3,53%, LINE-B 3,51%, LINE-C 3,49%, LINE-D 3,52%. Cả bốn đều trên mục tiêu, nên bảng sẽ hiện màu cảnh báo.\nGiá trị kinh doanh: nhìn một lần biết ngay dây chuyền nào cần chú ý, và số này được cập nhật từ cùng một công thức như mọi báo cáo khác.",
          "en": "Business problem: managers want to see at once which lines have NG rate above target, without waiting for the end-of-day report.\nAvailable data: the production_records and production_orders tables, with NG and total inspected quantities per line.\nProcessing logic: calculate NG rate per line, compare with the 3% target and assign colours by threshold.\nExpected result: LINE-A 3.53%, LINE-B 3.51%, LINE-C 3.49%, LINE-D 3.52%. All four are above target, so the board shows warning colours.\nBusiness value: one look shows which line needs attention, and the number uses the same formula as every other report."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- Visual Management đưa KPI và trạng thái ra nơi làm việc, dễ nhìn và phản ứng nhanh.\n- Đặt mục tiêu và quy ước màu trước khi bắt đầu.\n- Bảng chỉ có giá trị khi có người xử lý khi có bất thường.\nBạn đã xem xong sáu công cụ cải tiến. Có thể quay lại Pareto để chọn nguyên nhân, PDCA để thử giải pháp, và Gemba Walk để kiểm tra tận nơi.",
          "en": "Key takeaways:\n- Visual Management puts KPIs and status where the work happens, easy to see and quick to react to.\n- Set targets and colour rules before you start.\n- A board only helps when someone acts on abnormal conditions.\nYou have now read all six improvement tools. Go back to Pareto to pick a cause, PDCA to test a fix, and Gemba Walk to check on site."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: tính NG rate theo dây chuyền trên dữ liệu mẫu, so với mục tiêu 3% và gán trạng thái màu. Kết quả mong đợi: LINE-A 3,53%, LINE-B 3,51%, LINE-C 3,49%, LINE-D 3,52%; cả bốn trên mục tiêu.",
      "en": "Hands-on: calculate NG rate per line in the sample data, compare with the 3% target and assign a colour status. Expected result: LINE-A 3.53%, LINE-B 3.51%, LINE-C 3.49%, LINE-D 3.52%; all four are above target."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- NG rate theo dây chuyền để hiển thị trên bảng KPI\nSELECT l.line_code,\n       ROUND(100.0 * SUM(r.ng_qty) / SUM(r.total_qty), 2) AS ng_pct,\n       CASE WHEN 100.0 * SUM(r.ng_qty) / SUM(r.total_qty) <= 3 THEN 'Xanh'\n            WHEN 100.0 * SUM(r.ng_qty) / SUM(r.total_qty) <= 3.5 THEN 'Vàng'\n            ELSE 'Đỏ' END AS trang_thai\nFROM production_records r\nJOIN production_orders o ON o.order_id = r.order_id\nJOIN production_lines l ON l.line_id = o.line_id\nGROUP BY l.line_code\nORDER BY l.line_code;"
      }
    ],
    "exercise": {
      "vi": "1) (Trắc nghiệm) Đèn Andon màu đỏ thường có nghĩa là gì?\nA. Đang chạy bình thường\nB. Cần hỗ trợ\nC. Dừng và cần xử lý\nD. Hoàn thành kế hoạch\n2) (Đúng/Sai) Bảng KPI có ích ngay cả khi không ai đọc.\n3) (Tình huống) Mục tiêu NG là dưới 3%, một dây chuyền đạt 3,4%. Nên gán màu gì theo quy ước trong bài?\n4) (Thiết kế) Nêu hai KPI nên đặt lên bảng cho một dây chuyền.\n5) (Đọc kết quả) Theo dữ liệu mẫu, dây chuyền nào có NG rate thấp nhất?",
      "en": "1) (Multiple choice) What does a red Andon light usually mean?\nA. Running normally\nB. Needs help\nC. Stopped and needs action\nD. Plan completed\n2) (True/False) A KPI board is useful even if nobody reads it.\n3) (Scenario) The NG target is below 3%, and a line is at 3.4%. Which colour should it get under the rules in this lesson?\n4) (Design) Name two KPIs you would put on a line board.\n5) (Read the result) In the sample data, which line has the lowest NG rate?"
    },
    "answer": {
      "vi": "1) C.\n2) Sai. Bảng chỉ có ích khi có người đọc và xử lý khi bất thường.\n3) Vàng (3,4% nằm trong ngưỡng 3–3,5% theo quy ước mẫu) để cần chú ý.\n4) Ví dụ: NG rate và sản lượng so với kế hoạch.\n5) LINE-C (3,49%).",
      "en": "1) C.\n2) False. The board only helps when someone reads it and acts on abnormal conditions.\n3) Yellow (3.4% is inside the 3–3.5% band in the sample rules), so it needs attention.\n4) For example: NG rate and output against plan.\n5) LINE-C (3.49%)."
    },
    "relatedTopics": [
      "gemba-walk",
      "ishikawa"
    ]
  },
  {
    "slug": "cycle-time",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Thời gian chu kỳ (Cycle Time)",
      "en": "Cycle Time"
    },
    "summary": {
      "vi": "Thời gian để làm ra một sản phẩm, dùng để so sánh với chuẩn và tìm công đoạn chậm.",
      "en": "The time to make one product, used to compare with the standard and find slow steps."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Cycle time (CT) là thời gian thực tế để làm ra một sản phẩm. Đây là con số nền để tính năng suất, takt time và OEE. Nếu CT thực tế lớn hơn chuẩn, máy hoặc thao tác đang chậm.",
      "en": "Cycle time (CT) is the actual time to produce one unit. It is the base number for productivity, takt time and OEE. If actual CT is above standard, the machine or operation is slow."
    },
    "objectives": [
      {
        "vi": "Tính CT thực tế từ thời gian chạy và số sản phẩm.",
        "en": "Calculate actual CT from run time and units produced."
      },
      {
        "vi": "So sánh CT thực tế với CT chuẩn.",
        "en": "Compare actual CT with the standard CT."
      },
      {
        "vi": "Tìm máy có CT trung bình cao nhất.",
        "en": "Find the machine with the highest average CT."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: CT thực tế = thời gian chạy ÷ số sản phẩm đã làm ra. Đơn vị: giây hoặc phút mỗi sản phẩm.\n2. CT chuẩn (ideal/standard CT) là thời gian lý tưởng do kỹ thuật đặt ra. CT thực tế luôn lớn hơn hoặc bằng CT chuẩn.\n3. Đọc kết quả: CT thực tế gần CT chuẩn là tốt. Chênh lệch lớn cho thấy máy đang chờ, chạy chậm hoặc có lỗi nhỏ.\n4. Lưu ý: dùng cùng một đơn vị cho chuẩn và thực tế; tính trên cùng một sản phẩm.",
      "en": "1. Formula: actual CT = run time ÷ units produced. Unit: seconds or minutes per unit.\n2. Standard (ideal) CT is the theoretical time set by engineering. Actual CT is usually greater than or equal to it.\n3. Reading: actual close to standard is good. A large gap means waiting, slow running or minor faults.\n4. Note: use the same unit for standard and actual, and the same product."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: máy nào chậm hơn chuẩn để ưu tiên kiểm tra.\nDữ liệu có sẵn: bảng machine_cycles (thời gian chu kỳ đo được theo máy).\nXử lý và logic: trung bình cycle_time_sec theo máy, rồi so với chuẩn.\nKết quả mong đợi: CT trung bình của từng máy. Trong dữ liệu mẫu, các máy có CT gần nhau; máy nào lệch khỏi chuẩn sẽ cần xem.\nGiá trị kinh doanh: phát hiện máy chậm sớm, và đặt chuẩn đúng để so sánh công bằng.",
          "en": "Business problem: which machine is slower than standard and should be checked first.\nAvailable data: the machine_cycles table (measured cycle times per machine).\nProcessing logic: average cycle_time_sec per machine, compared with the standard.\nExpected result: average CT per machine. In the sample data the machines are close together; any that drift from standard need a look.\nBusiness value: spot slow machines early, and keep the standard right for fair comparison."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- CT = thời gian chạy ÷ số sản phẩm.\n- So sánh với CT chuẩn để thấy máy chậm.\nBài tiếp theo: Takt time, nhịp sản xuất theo nhu cầu khách hàng.",
          "en": "Key takeaways:\n- CT = run time ÷ units produced.\n- Compare with standard CT to find slow machines.\nNext: Takt time, the production pace set by customer demand."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: chạy truy vấn CT trung bình theo máy. Ví dụ tính tay: chạy 600 phút, làm 1.200 sản phẩm thì CT = 600 × 60 ÷ 1.200 = 30 giây mỗi sản phẩm.",
      "en": "Hands-on: run the average CT per machine query. Manual example: 600 minutes of run time and 1,200 units gives CT = 600 × 60 ÷ 1,200 = 30 seconds per unit."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- CT trung bình theo máy (giây mỗi chu kỳ)\nSELECT machine_id,\n       ROUND(AVG(cycle_time_sec), 2) AS avg_cycle_sec\nFROM machine_cycles\nGROUP BY machine_id\nORDER BY machine_id\nLIMIT 3;"
      }
    ],
    "exercise": {
      "vi": "1) (Trắc nghiệm) CT thực tế được tính thế nào?\nA. Số sản phẩm ÷ thời gian chạy\nB. Thời gian chạy ÷ số sản phẩm\nC. Thời gian dừng ÷ thời gian kế hoạch\n2) (Tính) Chạy 480 phút, làm 960 sản phẩm. CT là bao nhiêu giây mỗi sản phẩm?\n3) (Đúng/Sai) CT thực tế thường nhỏ hơn CT chuẩn.",
      "en": "1) (Multiple choice) How is actual CT calculated?\nA. Units ÷ run time\nB. Run time ÷ units\nC. Stop time ÷ planned time\n2) (Calculate) Run time 480 minutes, 960 units. What is the CT in seconds per unit?\n3) (True/False) Actual CT is usually smaller than standard CT."
    },
    "answer": {
      "vi": "1) B.\n2) 480 × 60 ÷ 960 = 30 giây mỗi sản phẩm.\n3) Sai. CT thực tế thường lớn hơn hoặc bằng CT chuẩn.",
      "en": "1) B.\n2) 480 × 60 ÷ 960 = 30 seconds per unit.\n3) False. Actual CT is usually greater than or equal to the standard."
    },
    "relatedTopics": [
      "takt-time",
      "uph"
    ]
  },
  {
    "slug": "takt-time",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Takt Time: nhịp sản xuất theo nhu cầu",
      "en": "Takt Time: production pace set by demand"
    },
    "summary": {
      "vi": "Takt time là thời gian cho phép giữa hai sản phẩm để đáp ứng đúng nhu cầu khách hàng.",
      "en": "Takt time is the allowed time between two products to meet customer demand exactly."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Takt time là nhịp cần thiết để đáp ứng nhu cầu. Nếu CT thực tế dài hơn takt time, dây chuyền không kịp giao hàng. Đây là con số để so sánh năng lực dây chuyền với yêu cầu.",
      "en": "Takt time is the pace needed to meet demand. If actual CT is longer than takt time, the line cannot keep up with orders. It compares line capacity with the requirement."
    },
    "objectives": [
      {
        "vi": "Tính takt time từ thời gian làm việc khả dụng và nhu cầu.",
        "en": "Calculate takt time from available working time and demand."
      },
      {
        "vi": "So sánh takt time với CT thực tế.",
        "en": "Compare takt time with actual CT."
      },
      {
        "vi": "Giải thích vì sao cần cân bằng dây chuyền theo takt.",
        "en": "Explain why the line should be balanced to takt."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: Takt time = thời gian làm việc khả dụng ÷ nhu cầu khách hàng trong cùng khoảng thời gian.\n2. Thời gian khả dụng là thời gian thực sự làm việc, đã trừ giờ nghỉ và thời gian dừng có kế hoạch.\n3. Đọc kết quả: CT thực tế nhỏ hơn takt là đáp ứng được nhu cầu. Lớn hơn takt là thiếu năng lực.\n4. Takt không phải là tốc độ tối đa; đó là nhịp cần để không thừa, không thiếu.",
      "en": "1. Formula: takt time = available working time ÷ customer demand for the same period.\n2. Available time is actual working time, after breaks and planned stops.\n3. Reading: actual CT below takt meets demand. Above takt means a capacity shortfall.\n4. Takt is not the maximum speed; it is the pace needed to avoid both overproduction and shortage."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: dây chuyền có đủ năng lực đáp ứng đơn hàng trong ca không.\nDữ liệu có sẵn: thời gian làm việc khả dụng của ca và nhu cầu đơn hàng.\nXử lý và logic: tính takt, so với CT thực tế của dây chuyền.\nKết quả mong đợi: takt time của ca. Ví dụ: 480 phút và nhu cầu 240 sản phẩm cho takt 2 phút mỗi sản phẩm.\nGiá trị kinh doanh: biết dây chuyền có kịp đơn hàng không trước khi nhận thêm đơn.",
          "en": "Business problem: whether the line has enough capacity for the orders in the shift.\nAvailable data: available working time of the shift and order demand.\nProcessing logic: calculate takt and compare it with the line's actual CT.\nExpected result: the shift takt. Example: 480 minutes and demand of 240 units gives a takt of 2 minutes per unit.\nBusiness value: know whether the line can meet orders before accepting more."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- Takt = thời gian khả dụng ÷ nhu cầu.\n- So sánh CT thực tế với takt để biết có đủ năng lực không.\nBài tiếp theo: UPH, sản lượng mỗi giờ.",
          "en": "Key takeaways:\n- Takt = available time ÷ demand.\n- Compare actual CT with takt to know whether capacity is enough.\nNext: UPH, units per hour."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: tính takt cho ca có 480 phút khả dụng và nhu cầu 240 sản phẩm. Kết quả mong đợi: 2,00 phút mỗi sản phẩm. Nếu CT thực tế là 2,5 phút thì dây chuyền không kịp.",
      "en": "Hands-on: calculate the takt for a shift with 480 available minutes and 240 units of demand. Expected result: 2.00 minutes per unit. If actual CT is 2.5 minutes, the line cannot keep up."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- Takt time: thời gian khả dụng ÷ nhu cầu (phút mỗi sản phẩm)\nSELECT ROUND(480.0 / 240, 2) AS takt_min_per_unit;"
      }
    ],
    "exercise": {
      "vi": "1) (Tính) Thời gian khả dụng 600 phút, nhu cầu 300 sản phẩm. Takt là bao nhiêu?\n2) (Đúng/Sai) Takt time là tốc độ tối đa của máy.\n3) (Tình huống) Takt 2 phút, CT thực tế 2,4 phút. Dây chuyền có kịp đơn không?",
      "en": "1) (Calculate) Available time 600 minutes, demand 300 units. What is the takt?\n2) (True/False) Takt time is the maximum speed of the machine.\n3) (Scenario) Takt is 2 minutes, actual CT is 2.4 minutes. Can the line meet the orders?"
    },
    "answer": {
      "vi": "1) 600 ÷ 300 = 2 phút mỗi sản phẩm.\n2) Sai. Takt là nhịp cần thiết theo nhu cầu, không phải tốc độ tối đa.\n3) Không kịp. CT 2,4 phút lớn hơn takt 2 phút.",
      "en": "1) 600 ÷ 300 = 2 minutes per unit.\n2) False. Takt is the pace needed for demand, not the maximum speed.\n3) No. CT of 2.4 minutes is greater than the takt of 2 minutes."
    },
    "relatedTopics": [
      "cycle-time",
      "uph"
    ]
  },
  {
    "slug": "uph",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "UPH (Units Per Hour): sản lượng mỗi giờ",
      "en": "UPH (Units Per Hour)"
    },
    "summary": {
      "vi": "UPH đo số sản phẩm làm ra trong mỗi giờ công hoặc giờ máy, để so sánh năng suất.",
      "en": "UPH measures units produced per labor or machine hour, to compare productivity."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "UPH (Units Per Hour) cho biết năng suất của một dây chuyền hoặc một máy theo giờ. Đây là chỉ số dễ hiểu nhất để so sánh giữa các ca và các line.",
      "en": "UPH (Units Per Hour) shows the productivity of a line or machine per hour. It is the easiest metric to compare between shifts and lines."
    },
    "objectives": [
      {
        "vi": "Tính UPH từ sản lượng và số giờ.",
        "en": "Calculate UPH from output and hours."
      },
      {
        "vi": "Phân biệt UPH theo giờ máy và theo giờ công.",
        "en": "Distinguish machine-hour UPH from labor-hour UPH."
      },
      {
        "vi": "Đọc UPH cùng với takt và CT.",
        "en": "Read UPH together with takt and CT."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: UPH = số sản phẩm ÷ số giờ chạy (hoặc số giờ công).\n2. Có hai cách tính: UPH theo giờ máy (đo năng suất thiết bị) và UPH theo giờ công (đo năng suất lao động).\n3. Đọc kết quả: UPH cao là tốt, nhưng cần so sánh với cùng một loại sản phẩm và cùng định nghĩa giờ.\n4. Lưu ý: UPH thay đổi khi đổi mã hàng, nên tính riêng cho từng mã.",
      "en": "1. Formula: UPH = units produced ÷ hours run (or labor hours).\n2. Two versions: machine-hour UPH (equipment productivity) and labor-hour UPH (labor productivity).\n3. Reading: higher is better, but compare the same product and the same hour definition.\n4. Note: UPH changes with product mix, so calculate it per product."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: ca nào có năng suất thấp hơn để điều phối lại.\nDữ liệu có sẵn: sản lượng của ca và số giờ chạy.\nXử lý và logic: sản lượng ÷ giờ chạy, tính theo từng ca hoặc từng line.\nKết quả mong đợi: UPH của từng ca. Ví dụ: 1.200 sản phẩm trong 40 giờ là UPH 30.\nGiá trị kinh doanh: so sánh công bằng giữa các ca và phát hiện ca cần hỗ trợ.",
          "en": "Business problem: which shift has lower productivity so it can be rebalanced.\nAvailable data: shift output and run hours.\nProcessing logic: output ÷ run hours, per shift or per line.\nExpected result: UPH per shift. Example: 1,200 units in 40 hours is a UPH of 30.\nBusiness value: compare shifts fairly and find the shift that needs support."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- UPH = sản lượng ÷ số giờ.\n- So sánh cùng một mã hàng và cùng định nghĩa giờ.\nBài tiếp theo: tỷ lệ NG.",
          "en": "Key takeaways:\n- UPH = output ÷ hours.\n- Compare the same product with the same hour definition.\nNext: NG rate."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: tính UPH cho ca làm 1.200 sản phẩm trong 40 giờ. Kết quả mong đợi: 30,00 sản phẩm mỗi giờ.",
      "en": "Hands-on: calculate UPH for a shift that makes 1,200 units in 40 hours. Expected result: 30.00 units per hour."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- UPH ví dụ: sản lượng ÷ số giờ\nSELECT 1200 AS san_pham,\n       40 AS gio_chay,\n       ROUND(1200.0 / 40, 2) AS uph;"
      }
    ],
    "exercise": {
      "vi": "1) (Tính) Ca làm 900 sản phẩm trong 30 giờ. UPH là bao nhiêu?\n2) (Trắc nghiệm) UPH theo giờ công đo điều gì?\nA. Năng suất thiết bị\nB. Năng suất lao động\nC. Tỷ lệ lỗi\n3) (Đúng/Sai) Có thể so sánh UPH của hai mã hàng khác nhau mà không cần điều chỉnh.",
      "en": "1) (Calculate) A shift makes 900 units in 30 hours. What is the UPH?\n2) (Multiple choice) What does labor-hour UPH measure?\nA. Equipment productivity\nB. Labor productivity\nC. Defect rate\n3) (True/False) You can compare UPH of two different products without adjustment."
    },
    "answer": {
      "vi": "1) 900 ÷ 30 = 30.\n2) B.\n3) Sai. UPH khác nhau theo mã hàng nên cần so sánh cùng loại.",
      "en": "1) 900 ÷ 30 = 30.\n2) B.\n3) False. UPH differs by product, so compare the same type."
    },
    "relatedTopics": [
      "takt-time",
      "efficiency"
    ]
  },
  {
    "slug": "ng-rate",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Tỷ lệ NG (NG – No Good)",
      "en": "NG Rate (No Good)"
    },
    "summary": {
      "vi": "Tỷ lệ sản phẩm lỗi (NG) trên tổng số kiểm tra, dùng để theo dõi chất lượng.",
      "en": "The share of defective (NG) units out of total inspected, used to track quality."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "NG rate là tỷ lệ sản phẩm không đạt trên tổng số kiểm tra. Đây là chỉ số chất lượng quan trọng nhất trên bảng KPI hằng ngày.",
      "en": "NG rate is the share of rejected units out of total inspected. It is the most important quality KPI on the daily board."
    },
    "objectives": [
      {
        "vi": "Tính NG rate từ số NG và tổng số kiểm tra.",
        "en": "Calculate NG rate from NG count and total inspected."
      },
      {
        "vi": "Tính NG rate đúng cách khi gộp nhiều ca.",
        "en": "Calculate NG rate correctly when combining shifts."
      },
      {
        "vi": "Viết truy vấn NG rate theo máy.",
        "en": "Write an NG rate query per machine."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: NG rate (%) = số NG ÷ tổng số kiểm tra × 100.\n2. Khi gộp nhiều ca hoặc nhiều ngày, phải cộng tổng NG và tổng kiểm tra rồi chia. Không lấy trung bình các tỷ lệ.\n3. Đọc kết quả: thấp hơn mục tiêu là tốt. So sánh với mục tiêu, không chỉ với các máy khác.\n4. NG rate khác FPY: NG rate đếm sản phẩm lỗi cuối cùng, FPY đếm sản phẩm đạt ngay lần đầu.",
      "en": "1. Formula: NG rate (%) = NG count ÷ total inspected × 100.\n2. When combining shifts or days, add the totals first, then divide. Do not average the rates.\n3. Reading: lower than target is good. Compare with the target, not only with other machines.\n4. NG rate differs from FPY: NG rate counts final rejects, FPY counts units passing first time."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: máy nào có chất lượng kém để kiểm tra trước.\nDữ liệu có sẵn: bảng production_records (ng_qty và total_qty theo máy).\nXử lý và logic: tổng NG ÷ tổng kiểm tra theo máy, nhân 100.\nKết quả mong đợi: NG rate từng máy. Trong dữ liệu mẫu, ba máy đầu có NG rate khoảng 3,4–3,6%.\nGiá trị kinh doanh: chọn đúng máy để kiểm tra, và theo dõi bằng cùng một công thức trên mọi báo cáo.",
          "en": "Business problem: which machine has poor quality and should be checked first.\nAvailable data: the production_records table (ng_qty and total_qty per machine).\nProcessing logic: total NG ÷ total inspected per machine, times 100.\nExpected result: NG rate per machine. In the sample data the first three machines are around 3.4–3.6%.\nBusiness value: pick the right machine to check, and track it with one formula in every report."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- NG rate = NG ÷ tổng kiểm tra × 100.\n- Gộp bằng tổng, không lấy trung bình tỷ lệ.\nBài tiếp theo: FPY, tỷ lệ đạt ngay lần đầu.",
          "en": "Key takeaways:\n- NG rate = NG ÷ total inspected × 100.\n- Combine with totals, not averages of rates.\nNext: FPY, first pass yield."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: chạy truy vấn NG rate theo máy. Kết quả mong đợi: M-A1 3,58%, M-A2 3,56%, M-A3 3,44%.",
      "en": "Hands-on: run the NG rate per machine query. Expected result: M-A1 3.58%, M-A2 3.56%, M-A3 3.44%."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- NG rate theo máy (3 máy đầu)\nSELECT m.machine_code,\n       ROUND(100.0 * SUM(r.ng_qty) / SUM(r.total_qty), 2) AS ng_pct\nFROM production_records r\nJOIN machines m ON m.machine_id = r.machine_id\nGROUP BY m.machine_code\nORDER BY m.machine_code\nLIMIT 3;"
      }
    ],
    "exercise": {
      "vi": "1) (Tính) Kiểm tra 500 sản phẩm, có 15 NG. NG rate là bao nhiêu?\n2) (Đúng/Sai) Có thể lấy trung bình NG rate của hai ngày để ra NG rate cả tuần.\n3) (Trắc nghiệm) NG rate khác FPY ở điểm nào?",
      "en": "1) (Calculate) 500 units inspected, 15 NG. What is the NG rate?\n2) (True/False) You can average the NG rates of two days to get the weekly NG rate.\n3) (Multiple choice) How does NG rate differ from FPY?"
    },
    "answer": {
      "vi": "1) 15 ÷ 500 × 100 = 3%.\n2) Sai. Phải cộng NG và tổng kiểm tra của cả tuần rồi chia.\n3) NG rate đếm sản phẩm lỗi cuối cùng; FPY đếm sản phẩm đạt ngay lần đầu.",
      "en": "1) 15 ÷ 500 × 100 = 3%.\n2) False. Add the weekly NG and total inspected, then divide.\n3) NG rate counts final rejects; FPY counts units passing first time."
    },
    "relatedTopics": [
      "fpy",
      "ppm"
    ]
  },
  {
    "slug": "fpy",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "FPY (First Pass Yield): tỷ lệ đạt ngay lần đầu",
      "en": "FPY (First Pass Yield)"
    },
    "summary": {
      "vi": "FPY là tỷ lệ sản phẩm đạt ngay lần đầu, không cần làm lại, tại một công đoạn.",
      "en": "FPY is the share of units passing a step on the first try, with no rework."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "FPY cho biết công đoạn làm đúng ngay từ đầu đến mức nào. FPY thấp nghĩa là phải làm lại nhiều, tốn thời gian và chi phí.",
      "en": "FPY shows how often a step is done right the first time. Low FPY means lots of rework, costing time and money."
    },
    "objectives": [
      {
        "vi": "Tính FPY cho một công đoạn.",
        "en": "Calculate FPY for one step."
      },
      {
        "vi": "Phân biệt FPY với NG rate.",
        "en": "Distinguish FPY from NG rate."
      },
      {
        "vi": "Hiểu FPY trong chuỗi nhiều công đoạn.",
        "en": "Understand FPY across several steps."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: FPY (%) = số sản phẩm đạt ngay lần đầu ÷ số sản phẩm đưa vào công đoạn × 100.\n2. Đầu vào là số sản phẩm đưa vào công đoạn, không phải số đã hoàn thành.\n3. Sản phẩm làm lại rồi đạt không được tính vào FPY, dù cuối cùng vẫn tốt.\n4. Dùng FPY để tìm công đoạn gây làm lại nhiều nhất.",
      "en": "1. Formula: FPY (%) = units passing first time ÷ units entering the step × 100.\n2. The denominator is units entering the step, not units completed.\n3. Units that pass only after rework do not count, even if they end up good.\n4. Use FPY to find the step that causes the most rework."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: công đoạn nào làm lại nhiều nhất.\nDữ liệu có sẵn: số sản phẩm đưa vào và số đạt ngay lần đầu của từng công đoạn.\nXử lý và logic: đạt lần đầu ÷ đầu vào × 100 cho từng công đoạn.\nKết quả mong đợi: FPY từng công đoạn. Công đoạn có FPY thấp nhất là điểm cần cải tiến trước.\nGiá trị kinh doanh: tập trung cải tiến đúng công đoạn, giảm làm lại và chi phí.",
          "en": "Business problem: which step causes the most rework.\nAvailable data: units entering and units passing first time, per step.\nProcessing logic: first-pass ÷ input × 100 for each step.\nExpected result: FPY per step. The step with the lowest FPY is the first improvement point.\nBusiness value: focus improvement on the right step, reducing rework and cost."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- FPY = đạt lần đầu ÷ đưa vào × 100.\n- Sản phẩm làm lại không tính vào FPY.\nBài tiếp theo: RTY, tỷ lệ đạt xuyên suốt nhiều công đoạn.",
          "en": "Key takeaways:\n- FPY = first-pass ÷ input × 100.\n- Reworked units do not count toward FPY.\nNext: RTY, the yield across several steps."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: tính FPY khi đưa vào 1.000 sản phẩm và 950 đạt ngay lần đầu. Kết quả mong đợi: 95,00%.",
      "en": "Hands-on: calculate FPY when 1,000 units enter and 950 pass first time. Expected result: 95.00%."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- FPY ví dụ: 1.000 đưa vào, 950 đạt ngay lần đầu\nSELECT 1000 AS dau_vao,\n       950 AS dat_lan_dau,\n       ROUND(100.0 * 950 / 1000, 2) AS fpy_pct;"
      }
    ],
    "exercise": {
      "vi": "1) (Tính) Đưa vào 800 sản phẩm, 720 đạt ngay lần đầu. FPY là bao nhiêu?\n2) (Tình huống) Sản phẩm bị lỗi, làm lại và đạt. Có tính vào FPY không?\n3) (Trắc nghiệm) FPY thấp cho biết điều gì?",
      "en": "1) (Calculate) 800 units enter, 720 pass first time. What is the FPY?\n2) (Scenario) A unit fails, is reworked and passes. Does it count toward FPY?\n3) (Multiple choice) What does a low FPY indicate?"
    },
    "answer": {
      "vi": "1) 720 ÷ 800 × 100 = 90%.\n2) Không. Chỉ tính sản phẩm đạt ngay lần đầu.\n3) Nhiều làm lại ở công đoạn đó.",
      "en": "1) 720 ÷ 800 × 100 = 90%.\n2) No. Only units passing first time count.\n3) Much rework at that step."
    },
    "relatedTopics": [
      "rty",
      "ng-rate"
    ]
  },
  {
    "slug": "rty",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "RTY (Rolled Throughput Yield): tỷ lệ đạt xuyên suốt quy trình",
      "en": "RTY (Rolled Throughput Yield)"
    },
    "summary": {
      "vi": "RTY là xác suất một sản phẩm đi qua toàn bộ quy trình mà không lỗi, bằng tích các FPY.",
      "en": "RTY is the probability a unit passes the whole process without a defect, the product of the step FPYs."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "FPY của từng công đoạn có thể cao, nhưng khi nhân lại qua nhiều công đoạn, tỷ lệ đạt cuối cùng thấp hơn nhiều. RTY cho thấy điều đó.",
      "en": "Each step's FPY may be high, but multiplied over many steps the final yield is much lower. RTY shows that."
    },
    "objectives": [
      {
        "vi": "Tính RTY từ các FPY của từng công đoạn.",
        "en": "Calculate RTY from the FPY of each step."
      },
      {
        "vi": "Giải thích vì sao RTY thấp hơn FPY từng công đoạn.",
        "en": "Explain why RTY is lower than each step's FPY."
      },
      {
        "vi": "Dùng RTY để đánh giá cả quy trình.",
        "en": "Use RTY to evaluate the whole process."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: RTY = FPY công đoạn 1 × FPY công đoạn 2 × … × FPY công đoạn n.\n2. Vì là tích nên RTY luôn nhỏ hơn FPY của bất kỳ công đoạn nào.\n3. Ví dụ: ba công đoạn với FPY 95%, 98%, 97% cho RTY khoảng 90%.\n4. Dùng RTY để thấy tổn thất tích lũy trên toàn bộ dây chuyền.",
      "en": "1. Formula: RTY = FPY of step 1 × FPY of step 2 × … × FPY of step n.\n2. Because it is a product, RTY is always below the FPY of any single step.\n3. Example: three steps with FPY 95%, 98% and 97% give an RTY of about 90%.\n4. Use RTY to see the cumulative loss across the whole line."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: tỷ lệ đạt cuối cùng của dây chuyền là bao nhiêu khi tính cả quy trình.\nDữ liệu có sẵn: FPY của từng công đoạn trong quy trình.\nXử lý và logic: nhân các FPY lại với nhau.\nKết quả mong đợi: RTY của quy trình. Ví dụ 95%, 98%, 97% cho RTY 90,3%.\nGiá trị kinh doanh: thấy tổn thất tích lũy và thuyết phục đầu tư cải tiến từng công đoạn.",
          "en": "Business problem: what the final yield of the line is across the whole process.\nAvailable data: the FPY of each step in the process.\nProcessing logic: multiply the FPYs together.\nExpected result: the process RTY. Example: 95%, 98% and 97% give an RTY of 90.3%.\nBusiness value: see the cumulative loss and justify improving each step."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- RTY = tích các FPY công đoạn.\n- RTY luôn thấp hơn FPY từng công đoạn.\nBài tiếp theo: PPM, số lỗi trên một triệu sản phẩm.",
          "en": "Key takeaways:\n- RTY = product of step FPYs.\n- RTY is always below each step's FPY.\nNext: PPM, defects per million."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: tính RTY cho ba công đoạn có FPY 95%, 98%, 97%. Kết quả mong đợi: 90,33%.",
      "en": "Hands-on: calculate RTY for three steps with FPY 95%, 98% and 97%. Expected result: 90.33%."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- RTY ví dụ: nhân FPY của ba công đoạn\nSELECT ROUND(100.0 * (0.95 * 0.98 * 0.97), 2) AS rty_pct;"
      }
    ],
    "exercise": {
      "vi": "1) (Tính) Hai công đoạn có FPY 90% và 90%. RTY là bao nhiêu?\n2) (Đúng/Sai) RTY lớn hơn FPY của từng công đoạn.\n3) (Phân tích) Vì sao nên xem RTY bên cạnh FPY?",
      "en": "1) (Calculate) Two steps with FPY 90% and 90%. What is the RTY?\n2) (True/False) RTY is greater than the FPY of each step.\n3) (Analysis) Why look at RTY alongside FPY?"
    },
    "answer": {
      "vi": "1) 0,90 × 0,90 = 81%.\n2) Sai. RTY luôn nhỏ hơn.\n3) FPY cho biết từng công đoạn, RTY cho biết tổn thất tích lũy của cả quy trình.",
      "en": "1) 0.90 × 0.90 = 81%.\n2) False. RTY is always smaller.\n3) FPY shows each step; RTY shows the cumulative loss across the process."
    },
    "relatedTopics": [
      "fpy",
      "ppm"
    ]
  },
  {
    "slug": "ppm",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "PPM (Parts Per Million): số lỗi trên một triệu sản phẩm",
      "en": "PPM (Parts Per Million): defects per million"
    },
    "summary": {
      "vi": "PPM quy đổi tỷ lệ lỗi về một triệu sản phẩm, dễ so sánh khi tỷ lệ lỗi rất nhỏ.",
      "en": "PPM converts the defect rate to per million units, easy to compare when rates are very small."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Khi tỷ lệ lỗi chỉ vài phần trăm nghìn, con số phần trăm khó đọc. PPM đổi về một triệu sản phẩm để dễ so sánh và đặt mục tiêu.",
      "en": "When the defect rate is a tiny fraction of a percent, percentages are hard to read. PPM converts to one million units for easy comparison and targets."
    },
    "objectives": [
      {
        "vi": "Tính PPM từ số lỗi và tổng sản phẩm.",
        "en": "Calculate PPM from defects and total units."
      },
      {
        "vi": "Chuyển đổi giữa PPM và phần trăm.",
        "en": "Convert between PPM and percentage."
      },
      {
        "vi": "Đặt mục tiêu chất lượng bằng PPM.",
        "en": "Set a quality target in PPM."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: PPM = số sản phẩm lỗi ÷ tổng số sản phẩm × 1.000.000.\n2. Chuyển sang phần trăm: 1% = 10.000 PPM.\n3. DPPM (Defective Parts Per Million) là cách gọi tương tự, dùng số sản phẩm lỗi.\n4. Đọc kết quả: PPM càng thấp càng tốt, và thường dùng cho khách hàng yêu cầu chất lượng rất cao.",
      "en": "1. Formula: PPM = defective units ÷ total units × 1,000,000.\n2. Conversion: 1% = 10,000 PPM.\n3. DPPM (defective parts per million) is a similar term.\n4. Reading: lower is better; often used with customers who need very high quality."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: chất lượng của một sản phẩm gửi khách có đạt mục tiêu không.\nDữ liệu có sẵn: số sản phẩm lỗi và tổng số sản phẩm đã giao.\nXử lý và logic: lỗi ÷ tổng × 1.000.000.\nKết quả mong đợi: PPM của lô hàng, so với mục tiêu. Ví dụ 25 lỗi trên 500.000 sản phẩm là 50 PPM.\nGiá trị kinh doanh: đặt mục tiêu chất lượng rõ ràng và dễ giải thích với khách hàng.",
          "en": "Business problem: whether the quality of a product shipped to a customer meets the target.\nAvailable data: defective units and total units shipped.\nProcessing logic: defects ÷ total × 1,000,000.\nExpected result: PPM of the lot, compared with the target. Example: 25 defects in 500,000 units is 50 PPM.\nBusiness value: set a clear quality target that is easy to explain to customers."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- PPM = lỗi ÷ tổng × 1.000.000.\n- 1% = 10.000 PPM.\nBài tiếp theo: MTBF, thời gian trung bình giữa các lần hỏng.",
          "en": "Key takeaways:\n- PPM = defects ÷ total × 1,000,000.\n- 1% = 10,000 PPM.\nNext: MTBF, mean time between failures."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: tính PPM khi có 25 lỗi trên 500.000 sản phẩm. Kết quả mong đợi: 50 PPM.",
      "en": "Hands-on: calculate PPM for 25 defects in 500,000 units. Expected result: 50 PPM."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- PPM ví dụ: 25 lỗi trên 500.000 sản phẩm\nSELECT 25 AS loi,\n       500000 AS tong,\n       ROUND(25.0 / 500000 * 1000000, 0) AS ppm;"
      }
    ],
    "exercise": {
      "vi": "1) (Tính) 8 lỗi trên 200.000 sản phẩm. PPM là bao nhiêu?\n2) (Tính) Tỷ lệ lỗi 0,5% tương đương bao nhiêu PPM?\n3) (Đúng/Sai) PPM cao hơn là tốt hơn.",
      "en": "1) (Calculate) 8 defects in 200,000 units. What is the PPM?\n2) (Calculate) A defect rate of 0.5% equals how many PPM?\n3) (True/False) A higher PPM is better."
    },
    "answer": {
      "vi": "1) 8 ÷ 200.000 × 1.000.000 = 40 PPM.\n2) 0,5% = 5.000 PPM.\n3) Sai. PPM càng thấp càng tốt.",
      "en": "1) 8 ÷ 200,000 × 1,000,000 = 40 PPM.\n2) 0.5% = 5,000 PPM.\n3) False. Lower PPM is better."
    },
    "relatedTopics": [
      "ng-rate",
      "rty"
    ]
  },
  {
    "slug": "mtbf",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "MTBF (Mean Time Between Failures): thời gian trung bình giữa các lần hỏng",
      "en": "MTBF (Mean Time Between Failures)"
    },
    "summary": {
      "vi": "MTBF đo độ tin cậy của thiết bị: trung bình chạy được bao lâu thì hỏng một lần.",
      "en": "MTBF measures equipment reliability: on average how long it runs before a failure."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "MTBF cho biết máy đáng tin đến mức nào. MTBF cao nghĩa là máy ít hỏng; MTBF thấp là dấu hiệu cần bảo trì phòng ngừa tốt hơn.",
      "en": "MTBF shows how reliable a machine is. High MTBF means few failures; low MTBF means preventive maintenance needs strengthening."
    },
    "objectives": [
      {
        "vi": "Tính MTBF từ tổng thời gian vận hành và số lần hỏng.",
        "en": "Calculate MTBF from total operating time and failures."
      },
      {
        "vi": "Hiểu MTBF dùng để đánh giá độ tin cậy.",
        "en": "Understand MTBF as a reliability measure."
      },
      {
        "vi": "Phân biệt MTBF với MTTR.",
        "en": "Distinguish MTBF from MTTR."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: MTBF = tổng thời gian vận hành ÷ số lần hỏng.\n2. Thời gian vận hành là thời gian máy thực sự sẵn sàng chạy, không tính thời gian đã dừng để sửa.\n3. MTBF đo độ tin cậy; MTTR đo tốc độ sửa. Hai chỉ số bổ sung nhau.\n4. Đọc kết quả: MTBF tăng khi bảo trì phòng ngừa tốt hơn.",
      "en": "1. Formula: MTBF = total operating time ÷ number of failures.\n2. Operating time is when the machine is actually ready to run, excluding repair stops.\n3. MTBF measures reliability; MTTR measures repair speed. They complement each other.\n4. Reading: MTBF rises when preventive maintenance improves."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: máy nào hỏng thường xuyên để ưu tiên bảo trì phòng ngừa.\nDữ liệu có sẵn: tổng thời gian vận hành và số lần hỏng của từng máy.\nXử lý và logic: thời gian vận hành ÷ số lần hỏng.\nKết quả mong đợi: MTBF từng máy. Ví dụ 1.200 giờ và 4 lần hỏng cho MTBF 300 giờ.\nGiá trị kinh doanh: lập lịch bảo trì phòng ngừa đúng máy, giảm dừng bất ngờ.",
          "en": "Business problem: which machine fails often so preventive maintenance can be prioritized.\nAvailable data: total operating time and failure count per machine.\nProcessing logic: operating time ÷ failures.\nExpected result: MTBF per machine. Example: 1,200 hours and 4 failures give an MTBF of 300 hours.\nBusiness value: schedule preventive maintenance on the right machines, reducing unexpected stops."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- MTBF = thời gian vận hành ÷ số lần hỏng.\n- MTBF đo độ tin cậy.\nBài tiếp theo: MTTR, thời gian trung bình sửa chữa.",
          "en": "Key takeaways:\n- MTBF = operating time ÷ failures.\n- MTBF measures reliability.\nNext: MTTR, mean time to repair."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: tính MTBF với 1.200 giờ vận hành và 4 lần hỏng. Kết quả mong đợi: 300 giờ.",
      "en": "Hands-on: calculate MTBF with 1,200 operating hours and 4 failures. Expected result: 300 hours."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- MTBF ví dụ: 1.200 giờ vận hành, 4 lần hỏng\nSELECT 1200 AS gio_van_hanh,\n       4 AS so_lan_hong,\n       ROUND(1200.0 / 4, 1) AS mtbf_gio;"
      }
    ],
    "exercise": {
      "vi": "1) (Tính) Máy vận hành 800 giờ và hỏng 2 lần. MTBF là bao nhiêu?\n2) (Trắc nghiệm) MTBF đo điều gì?\nA. Tốc độ sửa chữa\nB. Độ tin cậy\nC. Chi phí\n3) (Đúng/Sai) Thời gian đang sửa được tính vào thời gian vận hành của MTBF.",
      "en": "1) (Calculate) A machine runs 800 hours and fails twice. What is the MTBF?\n2) (Multiple choice) What does MTBF measure?\nA. Repair speed\nB. Reliability\nC. Cost\n3) (True/False) Repair time counts as operating time in MTBF."
    },
    "answer": {
      "vi": "1) 800 ÷ 2 = 400 giờ.\n2) B.\n3) Sai. Thời gian đang sửa không tính là vận hành.",
      "en": "1) 800 ÷ 2 = 400 hours.\n2) B.\n3) False. Repair time is not operating time."
    },
    "relatedTopics": [
      "mttr",
      "downtime-share"
    ]
  },
  {
    "slug": "mttr",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "MTTR (Mean Time To Repair): thời gian trung bình sửa chữa",
      "en": "MTTR (Mean Time To Repair)"
    },
    "summary": {
      "vi": "MTTR đo trung bình mất bao lâu để sửa một lần hỏng, từ lúc dừng đến khi chạy lại.",
      "en": "MTTR measures the average time to repair one failure, from stop to restart."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "MTTR cho biết đội bảo trì sửa nhanh đến đâu. MTTR thấp nghĩa là máy trở lại chạy nhanh sau mỗi lần hỏng.",
      "en": "MTTR shows how fast the maintenance team repairs. Low MTTR means the machine restarts quickly after each failure."
    },
    "objectives": [
      {
        "vi": "Tính MTTR từ tổng thời gian sửa và số lần sửa.",
        "en": "Calculate MTTR from total repair time and repairs."
      },
      {
        "vi": "Giải thích MTTR dùng để đánh giá đội bảo trì.",
        "en": "Explain MTTR as a measure of maintenance response."
      },
      {
        "vi": "Dùng MTBF và MTTR cùng nhau.",
        "en": "Use MTBF and MTTR together."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: MTTR = tổng thời gian sửa chữa ÷ số lần sửa chữa.\n2. Thời gian sửa tính từ lúc máy dừng đến lúc chạy lại (có thể gồm cả thời gian chờ phụ tùng, tùy cách đo).\n3. Đọc kết quả: MTTR thấp là tốt. Muốn giảm MTTR cần chuẩn bị phụ tùng, hướng dẫn sửa và đào tạo.\n4. MTTR và MTBF cùng giải thích tỷ lệ sẵn sàng của máy.",
      "en": "1. Formula: MTTR = total repair time ÷ number of repairs.\n2. Repair time runs from stop to restart (it may include waiting for parts, depending on how you measure).\n3. Reading: lower is better. To reduce MTTR, prepare spare parts, repair instructions and training.\n4. MTTR and MTBF together explain machine availability."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: đội bảo trì có sửa nhanh không, và máy nào mất nhiều thời gian nhất để sửa.\nDữ liệu có sẵn: tổng thời gian sửa và số lần sửa của từng máy.\nXử lý và logic: tổng thời gian sửa ÷ số lần sửa.\nKết quả mong đợi: MTTR từng máy. Ví dụ 6 giờ sửa trong 3 lần cho MTTR 2 giờ.\nGiá trị kinh doanh: xác định nơi cần chuẩn bị phụ tùng, giảm thời gian chờ sửa.",
          "en": "Business problem: whether the maintenance team repairs fast, and which machine takes the longest to fix.\nAvailable data: total repair time and repair count per machine.\nProcessing logic: total repair time ÷ number of repairs.\nExpected result: MTTR per machine. Example: 6 hours of repair over 3 repairs gives an MTTR of 2 hours.\nBusiness value: identify where spare parts are needed, reducing waiting time for repair."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- MTTR = thời gian sửa ÷ số lần sửa.\n- MTBF và MTTR cùng quyết định độ sẵn sàng của máy.\nBài tiếp theo: tỷ lệ thời gian dừng máy.",
          "en": "Key takeaways:\n- MTTR = repair time ÷ repairs.\n- MTBF and MTTR together set machine availability.\nNext: downtime share."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: tính MTTR với 6 giờ sửa và 3 lần sửa. Kết quả mong đợi: 2,0 giờ.",
      "en": "Hands-on: calculate MTTR with 6 hours of repair and 3 repairs. Expected result: 2.0 hours."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- MTTR ví dụ: 6 giờ sửa, 3 lần sửa\nSELECT 6 AS tong_gio_sua,\n       3 AS so_lan_sua,\n       ROUND(6.0 / 3, 1) AS mttr_gio;"
      }
    ],
    "exercise": {
      "vi": "1) (Tính) Tổng thời gian sửa 10 giờ, có 5 lần sửa. MTTR là bao nhiêu?\n2) (Trắc nghiệm) Cách giảm MTTR hiệu quả nhất?\nA. Kéo dài thời gian kiểm tra\nB. Chuẩn bị phụ tùng và hướng dẫn sửa\nC. Tăng số lần dừng\n3) (Đúng/Sai) MTTR cao là dấu hiệu máy hỏng ít.",
      "en": "1) (Calculate) Total repair time 10 hours, 5 repairs. What is the MTTR?\n2) (Multiple choice) What most effectively reduces MTTR?\nA. Lengthening inspection time\nB. Preparing spare parts and repair instructions\nC. Increasing stop count\n3) (True/False) A high MTTR means the machine fails rarely."
    },
    "answer": {
      "vi": "1) 10 ÷ 5 = 2 giờ.\n2) B.\n3) Sai. MTTR cao nghĩa là sửa lâu, không nói về số lần hỏng.",
      "en": "1) 10 ÷ 5 = 2 hours.\n2) B.\n3) False. A high MTTR means slow repairs; it does not describe failure frequency."
    },
    "relatedTopics": [
      "mtbf",
      "downtime-share"
    ]
  },
  {
    "slug": "downtime-share",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Tỷ lệ thời gian dừng máy",
      "en": "Downtime share"
    },
    "summary": {
      "vi": "Tỷ lệ thời gian dừng trên thời gian kế hoạch, cho biết máy mất bao nhiêu phần trăm thời gian.",
      "en": "Stop time as a share of planned time, showing how much of the planned time the machine lost."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Tỷ lệ dừng máy cho biết trong thời gian đáng lẽ máy chạy, bao nhiêu phần trăm bị mất. Đây là cách nhanh để thấy tổn thất thời gian.",
      "en": "Downtime share shows what percentage of planned run time was lost. It is a quick way to see time losses."
    },
    "objectives": [
      {
        "vi": "Tính tỷ lệ dừng máy từ thời gian dừng và thời gian kế hoạch.",
        "en": "Calculate downtime share from stop time and planned time."
      },
      {
        "vi": "Phân biệt dừng có kế hoạch và dừng bất ngờ.",
        "en": "Distinguish planned stops from unplanned stops."
      },
      {
        "vi": "Đọc tỷ lệ dừng cùng với OEE.",
        "en": "Read downtime share together with OEE."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: tỷ lệ dừng (%) = thời gian dừng ÷ thời gian kế hoạch × 100.\n2. Thời gian kế hoạch là thời gian máy đáng lẽ chạy trong ca, đã trừ giờ nghỉ theo lịch.\n3. Dừng có kế hoạch (thay ca, vệ sinh) và dừng bất ngờ (hỏng, thiếu vật liệu) nên được tách riêng.\n4. Tỷ lệ dừng là một phần của Availability trong OEE.",
      "en": "1. Formula: downtime share (%) = stop time ÷ planned time × 100.\n2. Planned time is the time the machine should run in the shift, after scheduled breaks.\n3. Planned stops (changeover, cleaning) and unplanned stops (failures, material shortage) should be separated.\n4. Downtime share is part of the Availability in OEE."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: máy nào mất nhiều thời gian nhất so với kế hoạch.\nDữ liệu có sẵn: bảng downtime_events (phút dừng) và thời gian kế hoạch của ca.\nXử lý và logic: phút dừng ÷ thời gian kế hoạch × 100.\nKết quả mong đợi: tỷ lệ dừng từng máy. Ví dụ 90 phút dừng trên 480 phút kế hoạch là 18,75%.\nGiá trị kinh doanh: so sánh tổn thất thời gian giữa các máy và ưu tiên cải tiến.",
          "en": "Business problem: which machine loses the most time against plan.\nAvailable data: the downtime_events table (stop minutes) and planned time of the shift.\nProcessing logic: stop minutes ÷ planned time × 100.\nExpected result: downtime share per machine. Example: 90 stop minutes on 480 planned minutes is 18.75%.\nBusiness value: compare time losses between machines and prioritize improvement."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- Tỷ lệ dừng = thời gian dừng ÷ thời gian kế hoạch × 100.\n- Tách dừng có kế hoạch và dừng bất ngờ.\nBài tiếp theo: tồn kho, các công thức chuỗi cung ứng.",
          "en": "Key takeaways:\n- Downtime share = stop time ÷ planned time × 100.\n- Separate planned and unplanned stops.\nNext: inventory formulas in the supply chain."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: tính tỷ lệ dừng với 90 phút dừng trên 480 phút kế hoạch. Kết quả mong đợi: 18,75%.",
      "en": "Hands-on: calculate downtime share for 90 stop minutes on 480 planned minutes. Expected result: 18.75%."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- Tỷ lệ dừng ví dụ: 90 phút dừng trên 480 phút kế hoạch\nSELECT 90 AS phut_dung,\n       480 AS phut_ke_hoach,\n       ROUND(100.0 * 90 / 480, 2) AS ty_le_dung_pct;"
      }
    ],
    "exercise": {
      "vi": "1) (Tính) 60 phút dừng trên 480 phút kế hoạch. Tỷ lệ dừng là bao nhiêu?\n2) (Phân loại) Thay khuôn theo lịch là dừng có kế hoạch hay bất ngờ?\n3) (Đúng/Sai) Tỷ lệ dừng là một phần của OEE.",
      "en": "1) (Calculate) 60 stop minutes on 480 planned minutes. What is the downtime share?\n2) (Classify) Is a scheduled mould change a planned or unplanned stop?\n3) (True/False) Downtime share is part of OEE."
    },
    "answer": {
      "vi": "1) 60 ÷ 480 × 100 = 12,5%.\n2) Có kế hoạch.\n3) Đúng. Nó liên quan đến Availability.",
      "en": "1) 60 ÷ 480 × 100 = 12.5%.\n2) Planned.\n3) True. It relates to Availability."
    },
    "relatedTopics": [
      "mtbf",
      "oee"
    ]
  },
  {
    "slug": "inventory-turnover",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Vòng quay tồn kho (Inventory Turnover)",
      "en": "Inventory turnover"
    },
    "summary": {
      "vi": "Vòng quay tồn kho cho biết hàng tồn kho được bán hoặc dùng bao nhiêu lần trong một kỳ.",
      "en": "Inventory turnover shows how many times stock is sold or used in a period."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Vòng quay tồn kho cho biết vốn đang nằm trong kho được luân chuyển nhanh đến đâu. Quay nhanh thường nghĩa là ít vốn bị giữ trong kho.",
      "en": "Inventory turnover shows how fast capital tied up in stock moves. Faster turns usually mean less cash held in the warehouse."
    },
    "objectives": [
      {
        "vi": "Tính vòng quay tồn kho từ giá vốn và tồn kho trung bình.",
        "en": "Calculate inventory turnover from COGS and average inventory."
      },
      {
        "vi": "Đọc vòng quay cao và thấp.",
        "en": "Read high and low turnover."
      },
      {
        "vi": "Liên hệ vòng quay với số ngày tồn kho.",
        "en": "Link turnover with days of supply."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: vòng quay tồn kho = giá vốn hàng bán (COGS) ÷ tồn kho trung bình.\n2. Tồn kho trung bình = (tồn đầu kỳ + tồn cuối kỳ) ÷ 2.\n3. Đọc kết quả: vòng quay cao nghĩa là hàng luân chuyển nhanh. Quá cao có thể gây thiếu hàng; quá thấp là tồn kho ứ đọng.\n4. Cùng một kỳ đo và cùng một đơn vị tiền.",
      "en": "1. Formula: inventory turnover = COGS ÷ average inventory.\n2. Average inventory = (opening + closing) ÷ 2.\n3. Reading: high turnover means fast movement. Too high may cause shortages; too low means stock sits idle.\n4. Use the same period and the same currency."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: vốn trong kho có đang bị ứ đọng không.\nDữ liệu có sẵn: giá vốn hàng bán và tồn kho đầu, cuối kỳ.\nXử lý và logic: COGS ÷ ((tồn đầu + tồn cuối) ÷ 2).\nKết quả mong đợi: vòng quay của kỳ. Ví dụ COGS 1.200 và tồn kho trung bình 300 cho vòng quay 4 lần.\nGiá trị kinh doanh: phát hiện vật tư tồn lâu, giảm vốn bị giữ trong kho.",
          "en": "Business problem: whether capital in the warehouse is sitting idle.\nAvailable data: COGS and opening and closing inventory.\nProcessing logic: COGS ÷ ((opening + closing) ÷ 2).\nExpected result: turnover for the period. Example: COGS 1,200 and average inventory 300 give 4 turns.\nBusiness value: find slow-moving materials and reduce cash tied up in stock."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- Vòng quay = COGS ÷ tồn kho trung bình.\n- Quay nhanh giảm vốn ứ đọng, nhưng cần đủ hàng.\nBài tiếp theo: dự báo và độ chính xác.",
          "en": "Key takeaways:\n- Turnover = COGS ÷ average inventory.\n- Faster turns reduce idle capital, but stock must still be sufficient.\nNext: forecast accuracy."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: tính vòng quay với COGS 1.200 và tồn kho trung bình 300. Kết quả mong đợi: 4,00 lần.",
      "en": "Hands-on: calculate turnover with COGS 1,200 and average inventory 300. Expected result: 4.00 turns."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- Vòng quay tồn kho ví dụ: COGS 1.200, tồn kho trung bình 300\nSELECT 1200 AS cogs,\n       300 AS ton_kho_tb,\n       ROUND(1200.0 / 300, 2) AS vong_quay;"
      }
    ],
    "exercise": {
      "vi": "1) (Tính) COGS 900, tồn kho trung bình 150. Vòng quay là bao nhiêu?\n2) (Đúng/Sai) Vòng quay càng thấp càng tốt.\n3) (Phân tích) Vòng quay quá cao có thể gây vấn đề gì?",
      "en": "1) (Calculate) COGS 900, average inventory 150. What is the turnover?\n2) (True/False) The lower the turnover, the better.\n3) (Analysis) What problem can a very high turnover cause?"
    },
    "answer": {
      "vi": "1) 900 ÷ 150 = 6 lần.\n2) Sai. Vòng quay thấp cho thấy tồn kho ứ đọng.\n3) Có thể thiếu hàng, không đáp ứng kịp đơn.",
      "en": "1) 900 ÷ 150 = 6 turns.\n2) False. Low turnover shows idle stock.\n3) It can cause shortages and missed orders."
    },
    "relatedTopics": [
      "cash-to-cash",
      "otif"
    ]
  },
  {
    "slug": "forecast-error",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Sai số dự báo và WMAPE (Weighted Mean Absolute Percentage Error)",
      "en": "Forecast error and WMAPE (Weighted Mean Absolute Percentage Error)"
    },
    "summary": {
      "vi": "Sai số dự báo là chênh lệch giữa nhu cầu thực tế và dự báo. WMAPE đo sai số trung bình có trọng số.",
      "en": "Forecast error is the gap between actual and forecast demand. WMAPE measures the weighted average error."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Dự báo luôn sai ở một mức độ nào đó. Điều quan trọng là đo mức sai và theo dõi để dự báo tốt hơn theo thời gian.",
      "en": "Forecasts are always wrong to some degree. What matters is measuring the error and tracking it to improve over time."
    },
    "objectives": [
      {
        "vi": "Tính sai số dự báo cho một kỳ.",
        "en": "Calculate the forecast error for a period."
      },
      {
        "vi": "Tính WMAPE từ tổng sai số tuyệt đối.",
        "en": "Calculate WMAPE from total absolute error."
      },
      {
        "vi": "Đọc WMAPE để so sánh độ chính xác.",
        "en": "Read WMAPE to compare forecast accuracy."
      }
    ],
    "explanation": {
      "vi": "1. Sai số dự báo = nhu cầu thực tế − nhu cầu dự báo. Số dương là dự báo thấp, số âm là dự báo cao.\n2. WMAPE = Σ|thực tế − dự báo| ÷ Σ thực tế × 100%.\n3. WMAPE dùng giá trị tuyệt đối để sai số dương và âm không bù trừ nhau.\n4. Đọc kết quả: WMAPE càng thấp càng chính xác. Mục tiêu tùy ngành, thường dưới 10–20%.",
      "en": "1. Forecast error = actual demand − forecast demand. Positive means under-forecast; negative means over-forecast.\n2. WMAPE = Σ|actual − forecast| ÷ Σ actual × 100%.\n3. WMAPE uses absolute values so positive and negative errors do not cancel.\n4. Reading: lower WMAPE is more accurate. Targets vary by industry, often below 10–20%."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: dự báo nhu cầu tháng này sai bao nhiêu so với thực tế.\nDữ liệu có sẵn: nhu cầu thực tế và nhu cầu dự báo theo tuần hoặc tháng.\nXử lý và logic: tổng |thực tế − dự báo| ÷ tổng thực tế × 100.\nKết quả mong đợi: WMAPE của kỳ. Ví dụ tổng sai số tuyệt đối 80 trên tổng thực tế 800 cho WMAPE 10%.\nGiá trị kinh doanh: biết dự báo có đủ tin cậy để đặt hàng vật tư hay không.",
          "en": "Business problem: how far this month's forecast was from actual demand.\nAvailable data: actual and forecast demand by week or month.\nProcessing logic: sum of |actual − forecast| ÷ sum of actual × 100.\nExpected result: WMAPE for the period. Example: total absolute error 80 on total actual 800 gives 10%.\nBusiness value: know whether the forecast is reliable enough to order materials."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- Sai số = thực tế − dự báo.\n- WMAPE dùng giá trị tuyệt đối để đo độ chính xác.\nBài tiếp theo: OTIF, giao đúng hạn và đủ hàng.",
          "en": "Key takeaways:\n- Error = actual − forecast.\n- WMAPE uses absolute values to measure accuracy.\nNext: OTIF, on time in full."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: tính WMAPE với tổng sai số tuyệt đối 80 và tổng thực tế 800. Kết quả mong đợi: 10%.",
      "en": "Hands-on: calculate WMAPE with total absolute error 80 and total actual 800. Expected result: 10%."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- WMAPE ví dụ: tổng sai số tuyệt đối 80 trên tổng thực tế 800\nSELECT 80 AS tong_sai_so_tuyet_doi,\n       800 AS tong_thuc_te,\n       ROUND(100.0 * 80 / 800, 2) AS wmape_pct;"
      }
    ],
    "exercise": {
      "vi": "1) (Tính) Thực tế 120, dự báo 100. Sai số là bao nhiêu?\n2) (Đúng/Sai) Sai số dương và âm bù trừ nhau trong WMAPE.\n3) (Phân tích) WMAPE thấp nói lên điều gì?",
      "en": "1) (Calculate) Actual 120, forecast 100. What is the error?\n2) (True/False) Positive and negative errors cancel out in WMAPE.\n3) (Analysis) What does a low WMAPE tell you?"
    },
    "answer": {
      "vi": "1) 120 − 100 = 20.\n2) Sai. WMAPE dùng giá trị tuyệt đối nên không bù trừ.\n3) Dự báo khá chính xác so với thực tế.",
      "en": "1) 120 − 100 = 20.\n2) False. WMAPE uses absolute values, so they do not cancel.\n3) The forecast is fairly accurate against actual demand."
    },
    "relatedTopics": [
      "inventory-turnover",
      "otif"
    ]
  },
  {
    "slug": "otif",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "OTIF (On Time In Full): đúng hạn và đủ hàng",
      "en": "OTIF (On Time In Full)"
    },
    "summary": {
      "vi": "OTIF là tỷ lệ đơn hàng được giao đúng hạn và đủ số lượng, chỉ số đánh giá cả chuỗi giao hàng.",
      "en": "OTIF is the share of orders delivered on time and in full, a metric for the whole delivery chain."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Khách hàng quan tâm hai điều: giao đúng hạn và giao đủ hàng. OTIF gộp cả hai thành một con số để đánh giá toàn bộ chuỗi từ kho đến giao hàng.",
      "en": "Customers care about two things: delivery on time and delivery in full. OTIF combines both into one number to judge the whole chain from warehouse to delivery."
    },
    "objectives": [
      {
        "vi": "Tính OTIF từ số đơn đạt đủ hai điều kiện.",
        "en": "Calculate OTIF from orders meeting both conditions."
      },
      {
        "vi": "Phân biệt đúng hạn, đủ hàng và OTIF.",
        "en": "Distinguish on time, in full and OTIF."
      },
      {
        "vi": "Tìm nguyên nhân làm OTIF thấp.",
        "en": "Find causes of low OTIF."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: OTIF (%) = số đơn giao đúng hạn và đủ hàng ÷ tổng số đơn × 100.\n2. Một đơn chỉ được tính khi cả hai điều kiện đều đạt. Giao đúng hạn nhưng thiếu hàng vẫn không tính.\n3. Đọc kết quả: OTIF càng cao càng tốt; mục tiêu thường cao, như trên 90%.\n4. Khi OTIF thấp, tách riêng tỷ lệ đúng hạn và tỷ lệ đủ hàng để biết nguyên nhân.",
      "en": "1. Formula: OTIF (%) = orders delivered on time and in full ÷ total orders × 100.\n2. An order counts only when both conditions are met. On time but short counts as a miss.\n3. Reading: higher is better; targets are often high, such as above 90%.\n4. When OTIF is low, split on-time rate and in-full rate to find the cause."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: khách hàng nhận đơn đúng hạn và đủ hàng bao nhiêu phần trăm.\nDữ liệu có sẵn: số đơn, ngày giao thực tế, ngày hẹn và số lượng giao so với đặt.\nXử lý và logic: đếm đơn thỏa cả hai điều kiện ÷ tổng đơn × 100.\nKết quả mong đợi: OTIF của kỳ. Ví dụ 180 đơn đạt trên 200 đơn cho OTIF 90%.\nGiá trị kinh doanh: đo được trải nghiệm giao hàng khách hàng và tìm chỗ cải thiện trong chuỗi.",
          "en": "Business problem: what percentage of customers receive orders on time and in full.\nAvailable data: order count, actual delivery date, promised date and quantity delivered vs ordered.\nProcessing logic: count orders meeting both conditions ÷ total orders × 100.\nExpected result: OTIF for the period. Example: 180 orders met out of 200 gives 90%.\nBusiness value: measure customer delivery experience and find where to improve in the chain."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- OTIF = đơn đúng hạn và đủ hàng ÷ tổng đơn × 100.\n- Một đơn thiếu một trong hai điều kiện không được tính.\nBài tiếp theo: Cash-to-cash, chu kỳ tiền mặt.",
          "en": "Key takeaways:\n- OTIF = orders on time and in full ÷ total orders × 100.\n- An order missing either condition does not count.\nNext: cash-to-cash cycle."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: tính OTIF với 180 đơn đạt trên 200 đơn. Kết quả mong đợi: 90%.",
      "en": "Hands-on: calculate OTIF with 180 orders met out of 200. Expected result: 90%."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- OTIF ví dụ: 180 đơn đạt trên 200 đơn\nSELECT 180 AS don_dat,\n       200 AS tong_don,\n       ROUND(100.0 * 180 / 200, 2) AS otif_pct;"
      }
    ],
    "exercise": {
      "vi": "1) (Tính) 450 đơn đạt trên 500 đơn. OTIF là bao nhiêu?\n2) (Đúng/Sai) Giao đúng hạn nhưng thiếu hàng vẫn được tính vào OTIF.\n3) (Phân tích) Làm sao biết OTIF thấp do trễ hay do thiếu hàng?",
      "en": "1) (Calculate) 450 orders met out of 500. What is the OTIF?\n2) (True/False) An order delivered on time but short counts toward OTIF.\n3) (Analysis) How do you tell whether low OTIF is due to lateness or shortage?"
    },
    "answer": {
      "vi": "1) 450 ÷ 500 × 100 = 90%.\n2) Sai.\n3) Tách tỷ lệ đúng hạn và tỷ lệ đủ hàng để so sánh.",
      "en": "1) 450 ÷ 500 × 100 = 90%.\n2) False.\n3) Split the on-time rate and the in-full rate and compare."
    },
    "relatedTopics": [
      "cash-to-cash",
      "inventory-turnover"
    ]
  },
  {
    "slug": "cash-to-cash",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Cash-to-Cash: chu kỳ tiền mặt",
      "en": "Cash-to-cash cycle"
    },
    "summary": {
      "vi": "Chu kỳ tiền mặt là số ngày từ lúc bỏ tiền mua hàng đến lúc thu được tiền bán hàng.",
      "en": "The cash cycle is the number of days from paying for materials to collecting cash from sales."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Doanh nghiệp có thể có lợi nhuận nhưng vẫn thiếu tiền nếu tiền bị giữ quá lâu trong kho và trong các khoản phải thu. Chu kỳ tiền mặt cho biết tiền quay lại nhanh đến đâu.",
      "en": "A business can be profitable yet short of cash if money is tied up in stock and receivables for too long. The cash cycle shows how fast money comes back."
    },
    "objectives": [
      {
        "vi": "Tính chu kỳ tiền mặt từ DIO, DSO và DPO.",
        "en": "Calculate the cash cycle from DIO, DSO and DPO."
      },
      {
        "vi": "Giải thích từng thành phần DIO, DSO, DPO.",
        "en": "Explain each component DIO, DSO and DPO."
      },
      {
        "vi": "Đọc chu kỳ tiền mặt để tìm cách rút ngắn.",
        "en": "Read the cash cycle to find ways to shorten it."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: Cash-to-cash = DIO + DSO − DPO.\n2. DIO (số ngày tồn kho): thời gian hàng nằm trong kho trước khi bán.\n3. DSO (số ngày thu tiền): thời gian từ lúc bán đến lúc thu được tiền.\n4. DPO (số ngày trả tiền): thời gian được trả nhà cung cấp sau khi mua.\n5. Đọc kết quả: chu kỳ càng ngắn càng tốt. Rút ngắn DIO và DSO, hoặc kéo dài DPO hợp lý, sẽ giảm nhu cầu vốn.",
      "en": "1. Formula: cash-to-cash = DIO + DSO − DPO.\n2. DIO (days inventory outstanding): how long stock sits before it is sold.\n3. DSO (days sales outstanding): time from sale to cash collection.\n4. DPO (days payable outstanding): time taken to pay suppliers.\n5. Reading: shorter is better. Reducing DIO and DSO, or reasonably extending DPO, lowers working capital needs."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Ứng dụng trong nhà máy",
          "en": "Manufacturing application"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: vốn lưu động có đang bị giữ quá lâu trong kho và công nợ không.\nDữ liệu có sẵn: số ngày tồn kho, số ngày thu tiền và số ngày trả tiền của kỳ.\nXử lý và logic: DIO + DSO − DPO.\nKết quả mong đợi: chu kỳ tiền mặt. Ví dụ DIO 42, DSO 31, DPO 27 cho chu kỳ 46 ngày.\nGiá trị kinh doanh: biết phải rút ngắn khâu nào (kho, thu tiền hay trả tiền) để giải phóng vốn.",
          "en": "Business problem: whether working capital is held too long in stock and receivables.\nAvailable data: days inventory, days sales and days payable for the period.\nProcessing logic: DIO + DSO − DPO.\nExpected result: cash cycle. Example: DIO 42, DSO 31, DPO 27 gives 46 days.\nBusiness value: know which stage (stock, collection or payment) to shorten to free up cash."
        }
      },
      {
        "title": {
          "vi": "Tổng kết và bài tiếp theo",
          "en": "Key takeaways and what's next"
        },
        "body": {
          "vi": "Tổng kết:\n- Cash-to-cash = DIO + DSO − DPO.\n- Rút ngắn DIO và DSO để giải phóng vốn.\nBạn đã đi qua các công thức chính. Có thể quay lại nhóm công thức để xem lại từng bài.",
          "en": "Key takeaways:\n- Cash-to-cash = DIO + DSO − DPO.\n- Shorten DIO and DSO to free up cash.\nYou have covered the main formulas. Go back to the formulas group to review each one."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: tính chu kỳ tiền mặt với DIO 42, DSO 31 và DPO 27. Kết quả mong đợi: 46 ngày.",
      "en": "Hands-on: calculate the cash cycle with DIO 42, DSO 31 and DPO 27. Expected result: 46 days."
    },
    "formula": [
      {
        "label": "PostgreSQL",
        "code": "-- Chu kỳ tiền mặt ví dụ: DIO 42, DSO 31, DPO 27\nSELECT 42 AS dio,\n       31 AS dso,\n       27 AS dpo,\n       42 + 31 - 27 AS cash_to_cash_ngay;"
      }
    ],
    "exercise": {
      "vi": "1) (Tính) DIO 50, DSO 40, DPO 30. Chu kỳ tiền mặt là bao nhiêu?\n2) (Trắc nghiệm) DPO tăng thì chu kỳ tiền mặt thay đổi thế nào?\nA. Tăng\nB. Giảm\nC. Không đổi\n3) (Đúng/Sai) Chu kỳ tiền mặt càng dài càng tốt.",
      "en": "1) (Calculate) DIO 50, DSO 40, DPO 30. What is the cash cycle?\n2) (Multiple choice) If DPO increases, how does the cash cycle change?\nA. Increases\nB. Decreases\nC. Stays the same\n3) (True/False) The longer the cash cycle, the better."
    },
    "answer": {
      "vi": "1) 50 + 40 − 30 = 60 ngày.\n2) B. DPO tăng làm chu kỳ giảm.\n3) Sai. Chu kỳ càng ngắn càng tốt.",
      "en": "1) 50 + 40 − 30 = 60 days.\n2) B. Higher DPO shortens the cycle.\n3) False. Shorter is better."
    },
    "relatedTopics": [
      "inventory-turnover",
      "otif"
    ]
  },
  {
    "slug": "plc",
    "categorySlug": "industrial-iot",
    "title": {
      "vi": "PLC: bộ điều khiển logic khả trình",
      "en": "PLC: Programmable Logic Controller"
    },
    "summary": {
      "vi": "PLC là máy tính công nghiệp đọc tín hiệu từ cảm biến, chạy logic điều khiển và xuất lệnh ra thiết bị chấp hành.",
      "en": "A PLC is an industrial computer that reads sensor signals, runs control logic and sends commands to actuators."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "PLC là bộ não của máy móc trên dây chuyền. Nó đọc trạng thái (cảm biến, nút bấm) và quyết định bật hay tắt động cơ, van, băng tải theo chương trình đã nạp.",
      "en": "A PLC is the control brain of machines on the line. It reads states (sensors, buttons) and decides when to switch motors, valves and conveyors on or off based on its loaded program."
    },
    "objectives": [
      {
        "vi": "Mô tả các thành phần chính của PLC: CPU, module vào, module ra.",
        "en": "Describe the main parts of a PLC: CPU, input modules and output modules."
      },
      {
        "vi": "Giải thích chu kỳ quét (scan cycle).",
        "en": "Explain the scan cycle."
      },
      {
        "vi": "Hiểu PLC cung cấp dữ liệu gì cho phân tích.",
        "en": "Understand what data a PLC provides for analysis."
      }
    ],
    "explanation": {
      "vi": "1. Thành phần: CPU chạy chương trình; module đầu vào (DI/AI) nhận tín hiệu từ cảm biến; module đầu ra (DO/AO) điều khiển thiết bị.\n2. Chu kỳ quét: PLC lặp lại ba bước liên tục: đọc đầu vào, chạy chương trình logic, ghi đầu ra. Thời gian một chu kỳ thường vài mili giây.\n3. Ngôn ngữ lập trình: Ladder Logic là phổ biến nhất, mô phỏng sơ đồ rơle.\n4. Ví dụ: băng tải chạy khi nút Start được bấm, cảm biến báo có hộp và cửa an toàn đóng.\n5. Với dữ liệu: PLC có các biến (tag) như nhiệt độ, trạng thái máy, số đếm. Các tag này được đọc ra SCADA hoặc máy chủ dữ liệu thông qua giao thức như OPC UA hoặc Modbus.",
      "en": "1. Parts: the CPU runs the program; input modules (DI/AI) receive sensor signals; output modules (DO/AO) drive equipment.\n2. Scan cycle: the PLC repeats three steps continuously: read inputs, run the logic program, write outputs. One cycle usually takes a few milliseconds.\n3. Programming: Ladder Logic is the most common, mimicking relay diagrams.\n4. Example: a conveyor runs when the Start button is pressed, a sensor reports a box is present, and the safety door is closed.\n5. For data: a PLC exposes tags such as temperature, machine state and counters. These are read by SCADA or a data server through protocols such as OPC UA or Modbus."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Liên hệ với dữ liệu BI",
          "en": "Connection to BI data"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: đếm sản lượng và thời gian dừng theo máy.\nDữ liệu có sẵn: tag trạng thái chạy/dừng và bộ đếm sản phẩm từ PLC.\nXử lý: ghi nhận sườn lên của tín hiệu chạy để tính thời gian chạy; cộng dồn bộ đếm theo ca.\nKết quả: sản lượng và thời gian dừng theo ca, làm đầu vào cho OEE.\nGiá trị: dữ liệu lấy trực tiếp từ máy, không phải nhập tay.",
          "en": "Business problem: count output and downtime per machine.\nAvailable data: run/stop state tags and part counters from the PLC.\nProcessing: record rising edges of the run signal to get run time; sum counters per shift.\nResult: output and downtime per shift, feeding OEE.\nValue: data comes straight from the machine, not manual entry."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: một PLC đếm 1.200 hộp trong ca 8 giờ, máy dừng tổng cộng 48 phút. Thời gian chạy là 480 − 48 = 432 phút. Với chu kỳ thực tế 0,3 phút mỗi hộp, số hộp có thể làm là 432 ÷ 0,3 = 1.440. Hiệu suất là 1.200 ÷ 1.440 = 83,3%.",
      "en": "Hands-on: a PLC counts 1,200 boxes in an 8-hour shift, with 48 minutes of stops. Run time is 480 − 48 = 432 minutes. At an actual cycle of 0.3 minutes per box, the possible output is 432 ÷ 0.3 = 1,440. Performance is 1,200 ÷ 1,440 = 83.3%."
    },
    "formula": [],
    "exercise": {
      "vi": "1) PLC thực hiện ba bước nào trong mỗi chu kỳ quét?\n2) Module nào của PLC nhận tín hiệu từ cảm biến?\n3) (Tính) Ca 480 phút, dừng 60 phút, sản xuất 1.000 hộp trong chu kỳ 0,3 phút mỗi hộp. Hiệu suất là bao nhiêu?",
      "en": "1) What three steps does a PLC perform in each scan cycle?\n2) Which PLC module receives sensor signals?\n3) (Calculate) A 480-minute shift with 60 minutes of stops and 1,000 boxes at 0.3 minutes per box. What is the performance?"
    },
    "answer": {
      "vi": "1) Đọc đầu vào, chạy chương trình, ghi đầu ra.\n2) Module đầu vào (DI/AI).\n3) Thời gian chạy 420 phút; khả năng 420 ÷ 0,3 = 1.400; hiệu suất 1.000 ÷ 1.400 = 71,4%.",
      "en": "1) Read inputs, run the program, write outputs.\n2) The input module (DI/AI).\n3) Run time 420 minutes; capacity 420 ÷ 0.3 = 1,400; performance 1,000 ÷ 1,400 = 71.4%."
    },
    "relatedTopics": [
      "sensor",
      "scada"
    ]
  },
  {
    "slug": "mqtt",
    "categorySlug": "industrial-iot",
    "title": {
      "vi": "MQTT: giao thức truyền dữ liệu IIoT",
      "en": "MQTT: messaging protocol for IIoT"
    },
    "summary": {
      "vi": "MQTT là giao thức publish/subscribe nhẹ, các thiết bị gửi dữ liệu theo chủ đề (topic) qua một broker trung gian.",
      "en": "MQTT is a lightweight publish/subscribe protocol where devices send data by topic through a broker."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Thiết bị IIoT cần gửi dữ liệu liên tục lên hệ thống mà không cần kết nối trực tiếp với từng nơi nhận. MQTT giải quyết việc này bằng mô hình broker và chủ đề.",
      "en": "IIoT devices must send data continuously to systems without connecting directly to each receiver. MQTT solves this with a broker and topics."
    },
    "objectives": [
      {
        "vi": "Giải thích mô hình publisher, subscriber và broker.",
        "en": "Explain the publisher, subscriber and broker model."
      },
      {
        "vi": "Đọc cấu trúc topic dạng phân cấp.",
        "en": "Read a hierarchical topic structure."
      },
      {
        "vi": "Hiểu ba mức QoS.",
        "en": "Understand the three QoS levels."
      }
    ],
    "explanation": {
      "vi": "1. Mô hình: thiết bị gửi (publisher) đăng dữ liệu lên một topic tới broker; các hệ thống quan tâm (subscriber) đăng ký topic đó và nhận dữ liệu. Hai bên không cần biết nhau.\n2. Topic phân cấp bằng dấu /, ví dụ factory/line1/machine3/temperature.\n3. Payload thường là JSON, ví dụ {\"value\": 72.5, \"unit\": \"C\", \"ts\": \"2026-11-07T08:00:00\"}.\n4. QoS: 0 gửi tối đa một lần (có thể mất); 1 gửi ít nhất một lần (có thể trùng); 2 gửi đúng một lần (chậm hơn).\n5. Với dữ liệu: bản ghi nên có thời gian (ts) và mã thiết bị, vì dữ liệu có thể đến không đúng thứ tự.",
      "en": "1. Model: a device (publisher) posts data to a topic on the broker; interested systems (subscribers) subscribe to that topic and receive the data. They do not need to know each other.\n2. Topics are hierarchical with /, for example factory/line1/machine3/temperature.\n3. Payloads are usually JSON, for example {\"value\": 72.5, \"unit\": \"C\", \"ts\": \"2026-11-07T08:00:00\"}.\n4. QoS: 0 means at most once (can be lost); 1 means at least once (can duplicate); 2 means exactly once (slower).\n5. For data: records should carry a timestamp and a device ID, because messages can arrive out of order."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Liên hệ với dữ liệu BI",
          "en": "Connection to BI data"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: nhận dữ liệu nhiệt độ từ nhiều máy vào một kho dữ liệu.\nDữ liệu có sẵn: thông điệp MQTT với topic theo máy và payload JSON.\nXử lý: tách mã máy từ topic, lưu payload kèm thời gian nhận; loại bản ghi trùng theo máy và thời gian.\nKết quả: bảng nhiệt độ theo máy theo thời gian, sẵn sàng cho báo cáo.\nGiá trị: một đường dữ liệu chung cho nhiều thiết bị, dễ mở rộng.",
          "en": "Business problem: receive temperature data from many machines into one data store.\nAvailable data: MQTT messages with per-machine topics and JSON payloads.\nProcessing: extract the machine ID from the topic, store the payload with receive time; remove duplicates per machine and time.\nResult: a time-series table of temperature per machine, ready for reports.\nValue: one common data path for many devices, easy to extend."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: topic factory/line1/machine3/temperature có mã máy là machine3. Một bản ghi có value 72,5 °C lúc 08:00. Nếu máy gửi lại cùng bản ghi (QoS 1 gây trùng), khi lưu cần loại bản ghi trùng theo cặp (mã máy, thời gian) để không đếm hai lần.",
      "en": "Hands-on: the topic factory/line1/machine3/temperature has machine ID machine3. A record with value 72.5 °C at 08:00. If the device resends the same record (QoS 1 can duplicate), deduplicate on the pair (machine ID, timestamp) so it is not counted twice."
    },
    "formula": [],
    "exercise": {
      "vi": "1) Thành phần nào trung gian nhận và phân phối thông điệp?\n2) Topic factory/line2/machine1/speed thuộc dây chuyền nào?\n3) (Trắc nghiệm) QoS nào có thể gửi trùng thông điệp?\nA. QoS 0\nB. QoS 1\nC. QoS 2",
      "en": "1) Which component receives and distributes messages?\n2) Which line does the topic factory/line2/machine1/speed belong to?\n3) (Multiple choice) Which QoS can deliver duplicate messages?\nA. QoS 0\nB. QoS 1\nC. QoS 2"
    },
    "answer": {
      "vi": "1) Broker.\n2) line2.\n3) B. QoS 1 gửi ít nhất một lần nên có thể trùng.",
      "en": "1) The broker.\n2) line2.\n3) B. QoS 1 delivers at least once, so duplicates are possible."
    },
    "relatedTopics": [
      "sensor",
      "scada"
    ]
  },
  {
    "slug": "sensor",
    "categorySlug": "industrial-iot",
    "title": {
      "vi": "Sensor: cảm biến và tín hiệu đo",
      "en": "Sensor: sensors and measurement signals"
    },
    "summary": {
      "vi": "Cảm biến chuyển đại lượng vật lý như nhiệt độ, áp suất thành tín hiệu điện để PLC và hệ thống đọc được.",
      "en": "A sensor converts a physical quantity such as temperature or pressure into an electrical signal that PLCs and systems can read."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Mọi dữ liệu máy móc bắt đầu từ cảm biến. Hiểu tín hiệu cảm biến giúp đọc đúng giá trị và nhận ra dữ liệu lỗi.",
      "en": "All machine data starts at a sensor. Understanding sensor signals helps you read values correctly and spot bad data."
    },
    "objectives": [
      {
        "vi": "Phân biệt tín hiệu số và tín hiệu tương tự.",
        "en": "Distinguish digital and analog signals."
      },
      {
        "vi": "Quy đổi tín hiệu 4–20 mA sang giá trị đo.",
        "en": "Convert a 4–20 mA signal to a measured value."
      },
      {
        "vi": "Nhận biết dữ liệu cảm biến bất thường.",
        "en": "Recognize abnormal sensor data."
      }
    ],
    "explanation": {
      "vi": "1. Tín hiệu số (bật/tắt) cho biết trạng thái, ví dụ có vật hay không. Tín hiệu tương tự cho giá trị liên tục, ví dụ nhiệt độ.\n2. Tín hiệu 4–20 mA là chuẩn công nghiệp phổ biến. 4 mA ứng với giá trị thấp nhất của thang đo, 20 mA ứng với giá trị cao nhất. Dòng 0 mA cho thấy đứt dây.\n3. Công thức tuyến tính: giá trị = (I − 4) ÷ 16 × (max − min) + min.\n4. Chất lượng dữ liệu: cần kiểm tra giá trị ngoài thang đo, giá trị đứng yên quá lâu (cảm biến treo), và khoảng trống do mất tín hiệu.\n5. Chu kỳ lấy mẫu quyết định độ chi tiết của dữ liệu; lấy mẫu quá thưa có thể bỏ sót đỉnh.",
      "en": "1. Digital signals (on/off) indicate state, for example whether a part is present. Analog signals give a continuous value, for example temperature.\n2. The 4–20 mA signal is a common industrial standard. 4 mA is the bottom of the range and 20 mA is the top. A 0 mA reading indicates a broken wire.\n3. Linear conversion: value = (I − 4) ÷ 16 × (max − min) + min.\n4. Data quality: check for values outside the range, readings stuck at one value for too long, and gaps where signal was lost.\n5. Sampling rate sets the detail of the data; sampling too slowly can miss peaks."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Liên hệ với dữ liệu BI",
          "en": "Connection to BI data"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: phát hiện máy quá nhiệt trong ca.\nDữ liệu có sẵn: tín hiệu 4–20 mA từ cảm biến nhiệt đã đổi sang °C.\nXử lý: đổi dòng sang nhiệt độ; đánh dấu giá trị vượt ngưỡng; loại bản ghi thiếu.\nKết quả: số lần vượt ngưỡng theo máy và theo ca.\nGiá trị: cảnh báo sớm và dữ liệu sạch cho phân tích.",
          "en": "Business problem: detect overheating during a shift.\nAvailable data: 4–20 mA signals from temperature sensors, converted to °C.\nProcessing: convert current to temperature; flag values above the threshold; drop missing records.\nResult: number of threshold breaches per machine and shift.\nValue: early warning and clean data for analysis."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: cảm biến nhiệt thang 0–100 °C gửi 12 mA. Nhiệt độ = (12 − 4) ÷ 16 × 100 = 50 °C. Nếu gửi 3,6 mA, đây là giá trị dưới 4 mA, cho thấy đứt dây hoặc lỗi cảm biến, không phải nhiệt độ thấp.",
      "en": "Hands-on: a temperature sensor with a 0–100 °C range sends 12 mA. Temperature = (12 − 4) ÷ 16 × 100 = 50 °C. If it sends 3.6 mA, that is below 4 mA, which indicates a broken wire or sensor fault, not a low temperature."
    },
    "formula": [],
    "exercise": {
      "vi": "1) (Tính) Cảm biến thang 0–200 °C gửi 20 mA. Nhiệt độ là bao nhiêu?\n2) (Tính) Cùng thang đo, gửi 8 mA. Nhiệt độ là bao nhiêu?\n3) (Đúng/Sai) Giá trị 0 mA là nhiệt độ thấp nhất của thang đo.",
      "en": "1) (Calculate) A sensor with a 0–200 °C range sends 20 mA. What is the temperature?\n2) (Calculate) Same range, 8 mA. What is the temperature?\n3) (True/False) A reading of 0 mA is the lowest temperature in the range."
    },
    "answer": {
      "vi": "1) (20 − 4) ÷ 16 × 200 = 200 °C.\n2) (8 − 4) ÷ 16 × 200 = 50 °C.\n3) Sai. 0 mA cho thấy đứt dây hoặc lỗi, không phải giá trị đo thấp nhất (4 mA mới là đáy thang).",
      "en": "1) (20 − 4) ÷ 16 × 200 = 200 °C.\n2) (8 − 4) ÷ 16 × 200 = 50 °C.\n3) False. 0 mA indicates a fault, not the lowest measured value (4 mA is the bottom of the range)."
    },
    "relatedTopics": [
      "plc",
      "mqtt"
    ]
  },
  {
    "slug": "scada",
    "categorySlug": "industrial-iot",
    "title": {
      "vi": "SCADA: giám sát và thu thập dữ liệu",
      "en": "SCADA: supervisory control and data acquisition"
    },
    "summary": {
      "vi": "SCADA là hệ thống giám sát tập trung: hiển thị trạng thái máy, cảnh báo và lưu lịch sử dữ liệu từ nhiều PLC.",
      "en": "SCADA is a central supervision system that shows machine status, raises alarms and stores history from many PLCs."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Người vận hành không đứng cạnh từng PLC. SCADA gom dữ liệu từ nhiều PLC về một nơi để giám sát, cảnh báo và lưu lịch sử.",
      "en": "Operators do not stand next to each PLC. SCADA brings data from many PLCs to one place for monitoring, alarms and history."
    },
    "objectives": [
      {
        "vi": "Mô tả các chức năng chính của SCADA: giám sát, cảnh báo, lịch sử.",
        "en": "Describe the main SCADA functions: monitoring, alarms and history."
      },
      {
        "vi": "Hiểu vai trò của HMI và historian.",
        "en": "Understand the roles of HMI and historian."
      },
      {
        "vi": "Vẽ luồng dữ liệu từ PLC đến BI.",
        "en": "Draw the data flow from PLC to BI."
      }
    ],
    "explanation": {
      "vi": "1. Giám sát: màn hình HMI hiển thị trạng thái và giá trị của máy theo thời gian thực.\n2. Cảnh báo: khi giá trị vượt ngưỡng, hệ thống ghi lại báo động kèm thời gian và mức độ.\n3. Historian: cơ sở dữ liệu chuỗi thời gian lưu toàn bộ lịch sử tag, là nguồn dữ liệu chính cho phân tích.\n4. Luồng dữ liệu điển hình: cảm biến → PLC → SCADA/Historian → kho dữ liệu → báo cáo BI.\n5. Lưu ý: SCADA chủ yếu phục vụ vận hành; phân tích sâu nên làm trên historian hoặc kho dữ liệu, không truy vấn trực tiếp hệ thống đang điều khiển máy.",
      "en": "1. Monitoring: HMI screens show machine status and values in near real time.\n2. Alarms: when a value crosses a limit, the system logs the alarm with time and severity.\n3. Historian: a time-series database that stores all tag history and is the main source for analysis.\n4. Typical data flow: sensor → PLC → SCADA/historian → data warehouse → BI reports.\n5. Note: SCADA mainly serves operations; deep analysis should run on the historian or a data warehouse, not query the live control system directly."
    },
    "extraSections": [
      {
        "title": {
          "vi": "Liên hệ với dữ liệu BI",
          "en": "Connection to BI data"
        },
        "body": {
          "vi": "Vấn đề nghiệp vụ: báo cáo số lần báo động theo máy trong tuần.\nDữ liệu có sẵn: nhật ký báo động và lịch sử tag trong historian.\nXử lý: gom báo động theo máy và ngày; tính số lần và thời gian kéo dài.\nKết quả: bảng báo động theo máy và ngày, dùng để tìm máy hay báo động.\nGiá trị: xác định máy cần bảo trì và đo hiệu quả sau cải tiến.",
          "en": "Business problem: report the number of alarms per machine in a week.\nAvailable data: alarm logs and tag history in the historian.\nProcessing: group alarms by machine and day; count them and measure duration.\nResult: alarm table per machine and day, to find machines that alarm often.\nValue: identify machines needing maintenance and measure the effect of improvements."
        }
      }
    ],
    "practicalExample": {
      "vi": "Thực hành: máy M1 có 6 báo động trong ngày, tổng thời gian báo động 90 phút. Số báo động trung bình mỗi lần là 90 ÷ 6 = 15 phút. Nếu sau cải tiến còn 2 báo động với tổng 20 phút, số lần giảm 67% và thời gian trung bình là 10 phút.",
      "en": "Hands-on: machine M1 has 6 alarms in a day, total alarm time 90 minutes. Average duration per alarm is 90 ÷ 6 = 15 minutes. If after improvement there are 2 alarms totaling 20 minutes, the count falls by 67% and average duration is 10 minutes."
    },
    "formula": [],
    "exercise": {
      "vi": "1) Chức năng nào của SCADA cho biết máy vượt ngưỡng lúc nào?\n2) Historian lưu gì?\n3) (Tính) Máy có 10 báo động tổng 150 phút. Thời gian trung bình mỗi báo động là bao nhiêu?",
      "en": "1) Which SCADA function tells when a machine crossed a limit?\n2) What does the historian store?\n3) (Calculate) A machine has 10 alarms totaling 150 minutes. What is the average duration per alarm?"
    },
    "answer": {
      "vi": "1) Cảnh báo (alarm).\n2) Lịch sử tag theo thời gian.\n3) 150 ÷ 10 = 15 phút.",
      "en": "1) Alarms.\n2) Tag history over time.\n3) 150 ÷ 10 = 15 minutes."
    },
    "relatedTopics": [
      "plc",
      "sensor"
    ]
  },
  {
    "slug": "availability",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Availability: tỷ lệ thời gian máy chạy",
      "en": "Availability: share of planned time the machine runs"
    },
    "summary": {
      "vi": "Availability cho biết máy chạy được bao nhiêu phần trăm thời gian kế hoạch.",
      "en": "Availability shows the percentage of planned time the machine actually runs."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Availability là thành phần đầu tiên của OEE. Nó đo thời gian mất do dừng máy.",
      "en": "Availability is the first factor of OEE. It measures time lost to stops."
    },
    "objectives": [
      {
        "vi": "Tính Availability từ thời gian chạy và thời gian kế hoạch.",
        "en": "Calculate Availability from run time and planned time."
      },
      {
        "vi": "Liên hệ Availability với các loại dừng máy.",
        "en": "Link Availability to the types of stops."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: Availability = Operating Time ÷ Planned Production Time × 100%.\n2. Operating Time = Planned Production Time − thời gian dừng (hỏng, thay khuôn, thiếu vật liệu).\n3. Dừng có kế hoạch như nghỉ giải lao không tính vào thời gian kế hoạch.",
      "en": "1. Formula: Availability = Operating Time ÷ Planned Production Time × 100%.\n2. Operating Time = Planned Production Time minus stop time (breakdowns, changeovers, material shortages).\n3. Planned breaks are usually excluded from planned production time."
    },
    "practicalExample": {
      "vi": "Ca 480 phút, dừng 48 phút: Operating Time = 432 phút, Availability = 432 ÷ 480 = 90%.",
      "en": "A 480-minute shift with 48 minutes of stops: operating time 432 minutes, Availability = 432 ÷ 480 = 90%."
    },
    "formula": [],
    "exercise": {
      "vi": "Ca 480 phút, dừng 60 phút. Availability là bao nhiêu?",
      "en": "A 480-minute shift with 60 minutes of stops. What is the Availability?"
    },
    "answer": {
      "vi": "(480 − 60) ÷ 480 = 87,5%.",
      "en": "(480 − 60) ÷ 480 = 87.5%."
    },
    "relatedTopics": []
  },
  {
    "slug": "performance",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Performance: tốc độ chạy so với lý tưởng",
      "en": "Performance: running speed against ideal"
    },
    "summary": {
      "vi": "Performance đo máy chạy nhanh đến đâu so với tốc độ lý tưởng.",
      "en": "Performance measures how fast the machine runs compared with its ideal speed."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Performance là thành phần thứ hai của OEE. Nó phát hiện máy chạy chậm hoặc dừng ngắn lặp lại.",
      "en": "Performance is the second factor of OEE. It catches slow running and repeated short stops."
    },
    "objectives": [
      {
        "vi": "Tính Performance từ Ideal Cycle Time, số lượng và thời gian chạy.",
        "en": "Calculate Performance from ideal cycle time, count and run time."
      },
      {
        "vi": "Hiểu vì sao Performance có thể bị thấp dù Availability cao.",
        "en": "Understand why Performance can be low even when Availability is high."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: Performance = (Ideal Cycle Time × Total Count) ÷ Operating Time × 100%.\n2. Ideal Cycle Time là thời gian lý tưởng để làm một sản phẩm.\n3. Máy chạy chậm, dừng ngắn (micro-stop) làm Performance thấp.",
      "en": "1. Formula: Performance = (Ideal Cycle Time × Total Count) ÷ Operating Time × 100%.\n2. Ideal Cycle Time is the theoretical time to make one unit.\n3. Slow running and micro-stops lower Performance."
    },
    "practicalExample": {
      "vi": "Ideal Cycle Time 0,5 phút, sản lượng 800, thời gian chạy 420 phút: Performance = (0,5 × 800) ÷ 420 = 95,2%.",
      "en": "Ideal cycle time 0.5 minutes, output 800, run time 420 minutes: Performance = (0.5 × 800) ÷ 420 = 95.2%."
    },
    "formula": [],
    "exercise": {
      "vi": "Ideal Cycle Time 0,4 phút, sản lượng 900, thời gian chạy 450 phút. Performance là bao nhiêu?",
      "en": "Ideal cycle time 0.4 minutes, output 900, run time 450 minutes. What is the Performance?"
    },
    "answer": {
      "vi": "(0,4 × 900) ÷ 450 = 80%.",
      "en": "(0.4 × 900) ÷ 450 = 80%."
    },
    "relatedTopics": []
  },
  {
    "slug": "quality-rate",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Quality Rate: tỷ lệ sản phẩm đạt",
      "en": "Quality Rate: share of good output"
    },
    "summary": {
      "vi": "Quality Rate là tỷ lệ sản phẩm tốt trên tổng sản phẩm đã làm.",
      "en": "Quality Rate is the share of good units out of all units produced."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Quality Rate là thành phần thứ ba của OEE, đo lượng sản phẩm lỗi và làm lại.",
      "en": "Quality Rate is the third factor of OEE, measuring defects and rework."
    },
    "objectives": [
      {
        "vi": "Tính Quality Rate từ số lượng tốt và tổng số.",
        "en": "Calculate Quality Rate from good count and total count."
      },
      {
        "vi": "Phân biệt Quality Rate với FPY.",
        "en": "Distinguish Quality Rate from FPY."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: Quality Rate = Good Count ÷ Total Count × 100%.\n2. Good Count là số sản phẩm đạt cuối cùng.\n3. Sản phẩm làm lại rồi đạt vẫn được tính là đạt trong Quality Rate, khác với FPY.",
      "en": "1. Formula: Quality Rate = Good Count ÷ Total Count × 100%.\n2. Good Count is the number of units that pass at the end.\n3. Units reworked and then passed count as good in Quality Rate, unlike FPY."
    },
    "practicalExample": {
      "vi": "Tổng 1.000 sản phẩm, 30 lỗi: Good Count 970, Quality Rate = 97%.",
      "en": "Total 1,000 units, 30 defects: Good Count 970, Quality Rate = 97%."
    },
    "formula": [],
    "exercise": {
      "vi": "Tổng 1.000 sản phẩm, 60 lỗi. Quality Rate là bao nhiêu?",
      "en": "Total 1,000 units, 60 defects. What is the Quality Rate?"
    },
    "answer": {
      "vi": "940 ÷ 1.000 = 94%.",
      "en": "940 ÷ 1,000 = 94%."
    },
    "relatedTopics": []
  },
  {
    "slug": "productivity",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Productivity: năng suất đầu ra trên đầu vào",
      "en": "Productivity: output per unit of input"
    },
    "summary": {
      "vi": "Productivity là tỷ số giữa sản lượng đầu ra và nguồn lực đầu vào.",
      "en": "Productivity is the ratio of output to the input resources used."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Productivity là chỉ số chung để so sánh hiệu quả sử dụng nguồn lực.",
      "en": "Productivity is a general metric for comparing how well resources are used."
    },
    "objectives": [
      {
        "vi": "Tính Productivity cho nhiều loại đầu vào.",
        "en": "Calculate Productivity for different inputs."
      },
      {
        "vi": "Phân biệt Productivity với UPH.",
        "en": "Distinguish Productivity from UPH."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: Productivity = Output ÷ Input.\n2. Input có thể là giờ công, nguyên liệu (kg), năng lượng (kWh) hoặc số máy.\n3. Khác UPH: UPH luôn dùng số giờ làm việc, còn Productivity có thể dùng bất kỳ đầu vào nào.",
      "en": "1. Formula: Productivity = Output ÷ Input.\n2. Input can be labor hours, material (kg), energy (kWh) or machine count.\n3. Unlike UPH, which always uses working hours, Productivity can use any input."
    },
    "practicalExample": {
      "vi": "Sản lượng 900 sản phẩm với 300 giờ công: Productivity = 3 sản phẩm mỗi giờ công.",
      "en": "Output 900 units with 300 labor hours: Productivity = 3 units per labor hour."
    },
    "formula": [],
    "exercise": {
      "vi": "Sản lượng 1.200 kg với 400 kWh điện. Productivity là bao nhiêu?",
      "en": "Output 1,200 kg with 400 kWh of electricity. What is the productivity?"
    },
    "answer": {
      "vi": "1.200 ÷ 400 = 3 kg mỗi kWh.",
      "en": "1,200 ÷ 400 = 3 kg per kWh."
    },
    "relatedTopics": []
  },
  {
    "slug": "lead-time",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Lead Time: tổng thời gian từ đầu đến cuối",
      "en": "Lead Time: total time from start to finish"
    },
    "summary": {
      "vi": "Lead Time là tổng thời gian từ khi bắt đầu đến khi hoàn thành một đơn hàng hoặc quy trình.",
      "en": "Lead Time is the total time from start to completion of an order or process."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Lead Time gồm cả thời gian chờ, không chỉ thời gian gia công. Đây là chỉ số khách hàng cảm nhận.",
      "en": "Lead Time includes waiting time, not only processing time. Customers feel this metric directly."
    },
    "objectives": [
      {
        "vi": "Phân biệt Lead Time với Cycle Time.",
        "en": "Distinguish Lead Time from Cycle Time."
      },
      {
        "vi": "Tính Lead Time từ thời gian xử lý và thời gian chờ.",
        "en": "Calculate Lead Time from processing and waiting times."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: Lead Time = tổng thời gian xử lý + tổng thời gian chờ + tổng thời gian vận chuyển.\n2. Cycle Time chỉ đo thời gian xử lý một đơn vị ở một công đoạn.\n3. Phần lớn Lead Time thường là thời gian chờ, đây là nơi cải tiến hiệu quả nhất.",
      "en": "1. Formula: Lead Time = total processing time + total waiting time + total transport time.\n2. Cycle Time measures only processing time for one unit at one step.\n3. Most Lead Time is usually waiting, which is where improvement pays off most."
    },
    "practicalExample": {
      "vi": "Ba công đoạn, mỗi công đoạn xử lý 0,5 ngày, tổng thời gian chờ 2 ngày: Lead Time = 3 × 0,5 + 2 = 3,5 ngày.",
      "en": "Three steps, each processing 0.5 days, with 2 days of total waiting: Lead Time = 3 × 0.5 + 2 = 3.5 days."
    },
    "formula": [],
    "exercise": {
      "vi": "Hai công đoạn, mỗi công đoạn xử lý 1 ngày, chờ 3 ngày. Lead Time là bao nhiêu?",
      "en": "Two steps, each processing 1 day, with 3 days of waiting. What is the Lead Time?"
    },
    "answer": {
      "vi": "2 × 1 + 3 = 5 ngày.",
      "en": "2 × 1 + 3 = 5 days."
    },
    "relatedTopics": []
  },
  {
    "slug": "yield",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Yield: hiệu suất thu hồi từ nguyên liệu",
      "en": "Yield: good output from input material"
    },
    "summary": {
      "vi": "Yield là tỷ lệ sản phẩm tốt thu được trên tổng đầu vào.",
      "en": "Yield is the share of good output obtained from total input."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Yield đo hiệu quả biến đổi nguyên liệu thành thành phẩm tốt, thường tính theo khối lượng.",
      "en": "Yield measures how efficiently input material becomes good product, often by weight."
    },
    "objectives": [
      {
        "vi": "Tính Yield theo khối lượng hoặc số lượng.",
        "en": "Calculate Yield by weight or count."
      },
      {
        "vi": "Phân biệt Yield với FPY.",
        "en": "Distinguish Yield from FPY."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: Yield = Good Output ÷ Total Input × 100%.\n2. Có thể tính theo kg, lít hoặc số lượng.\n3. FPY tính theo sản phẩm đạt lần đầu tại một công đoạn, còn Yield tính trên toàn bộ đầu vào.",
      "en": "1. Formula: Yield = Good Output ÷ Total Input × 100%.\n2. It can be measured in kg, liters or units.\n3. FPY counts units passing first time at one step, while Yield uses the whole input."
    },
    "practicalExample": {
      "vi": "Đầu vào 1.000 kg nguyên liệu, thành phẩm tốt 920 kg: Yield = 92%.",
      "en": "Input 1,000 kg of material, 920 kg of good product: Yield = 92%."
    },
    "formula": [],
    "exercise": {
      "vi": "Đầu vào 500 kg, thành phẩm tốt 470 kg. Yield là bao nhiêu?",
      "en": "Input 500 kg, good product 470 kg. What is the Yield?"
    },
    "answer": {
      "vi": "470 ÷ 500 = 94%.",
      "en": "470 ÷ 500 = 94%."
    },
    "relatedTopics": []
  },
  {
    "slug": "lean-fundamentals",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Lean Fundamentals: nguyên lý sản xuất tinh gọn",
      "en": "Lean Fundamentals: core principles of lean"
    },
    "summary": {
      "vi": "Lean là cách làm việc loại bỏ lãng phí và tạo giá trị cho khách hàng.",
      "en": "Lean is a way of working that removes waste and creates value for customers."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Lean xuất phát từ Toyota Production System. Mục tiêu là làm đúng, làm nhanh, với ít lãng phí nhất.",
      "en": "Lean comes from the Toyota Production System. The goal is to do things right, fast, with minimal waste."
    },
    "objectives": [
      {
        "vi": "Nêu các nguyên lý cốt lõi của Lean.",
        "en": "State the core principles of Lean."
      },
      {
        "vi": "Phân biệt giá trị gia tăng và không gia tăng.",
        "en": "Distinguish value-added from non-value-added work."
      }
    ],
    "explanation": {
      "vi": "1. Xác định giá trị từ góc nhìn khách hàng.\n2. Lập luồng sản xuất liên tục thay cho sản xuất theo lô lớn.\n3. Sản xuất theo kéo (pull) theo nhu cầu thực tế.\n4. Theo đuổi hoàn hảo bằng cải tiến liên tục.",
      "en": "1. Define value from the customer's view.\n2. Create continuous flow instead of large batches.\n3. Produce on pull, based on actual demand.\n4. Pursue perfection through continuous improvement."
    },
    "practicalExample": {
      "vi": "Một công đoạn chờ đợi 20 phút mỗi ca là lãng phí, dù nó không làm sản phẩm hỏng.",
      "en": "A 20-minute wait per shift at one step is waste, even though it does not create defects."
    },
    "formula": [],
    "exercise": {
      "vi": "Nêu hai nguyên lý của Lean.",
      "en": "Name two principles of Lean."
    },
    "answer": {
      "vi": "Ví dụ: xác định giá trị, luồng liên tục, sản xuất kéo, cải tiến liên tục.",
      "en": "For example: define value, continuous flow, pull production, continuous improvement."
    },
    "relatedTopics": []
  },
  {
    "slug": "5s",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "5S (Sort, Set in Order, Shine, Standardize, Sustain): sắp xếp và duy trì nơi làm việc",
      "en": "5S (Sort, Set in Order, Shine, Standardize, Sustain): organize and sustain the workplace"
    },
    "summary": {
      "vi": "5S gồm Sàng lọc, Sắp xếp, Sạch sẽ, Săn sóc (chuẩn hóa) và Sẵn sàng duy trì.",
      "en": "5S is Sort, Set in order, Shine, Standardize and Sustain."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "5S là nền tảng của mọi hệ thống Lean. Nơi làm việc gọn gàng giúp tìm đồ nhanh và phát hiện bất thường sớm.",
      "en": "5S is the base of every lean system. A tidy workplace makes things easy to find and abnormalities easy to spot."
    },
    "objectives": [
      {
        "vi": "Mô tả năm bước 5S.",
        "en": "Describe the five steps of 5S."
      },
      {
        "vi": "Đánh giá một khu vực theo 5S.",
        "en": "Audit an area against 5S."
      }
    ],
    "explanation": {
      "vi": "1. Sort (Seiri, Sàng lọc): bỏ đồ không dùng.\n2. Set in order (Seiton, Sắp xếp): mỗi thứ có vị trí cố định.\n3. Shine (Seiso, Sạch sẽ): vệ sinh và kiểm tra khi làm sạch.\n4. Standardize (Seiketsu, Chuẩn hóa): viết quy định thống nhất.\n5. Sustain (Shitsuke, Duy trì): kiểm tra định kỳ và giữ thói quen.",
      "en": "1. Sort (Seiri): remove items not needed.\n2. Set in order (Seiton): give each item a fixed place.\n3. Shine (Seiso): clean and inspect while cleaning.\n4. Standardize (Seiketsu): write common rules.\n5. Sustain (Shitsuke): audit regularly and keep the habit."
    },
    "practicalExample": {
      "vi": "Dụng cụ được vẽ khung bóng trên bảng: thiếu cây nào, nhìn là biết ngay.",
      "en": "Tools have outlined shadows on a board, so a missing tool is visible at a glance."
    },
    "formula": [],
    "exercise": {
      "vi": "Bước nào của 5S là viết quy định và tiêu chuẩn cho khu vực?",
      "en": "Which 5S step writes the rules and standards for an area?"
    },
    "answer": {
      "vi": "Standardize (Seiketsu, Chuẩn hóa).",
      "en": "Standardize (Seiketsu)."
    },
    "relatedTopics": []
  },
  {
    "slug": "kaizen",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Kaizen: cải tiến nhỏ và liên tục",
      "en": "Kaizen: small, continuous improvement"
    },
    "summary": {
      "vi": "Kaizen là cải tiến nhỏ, đều đặn, với sự tham gia của mọi người.",
      "en": "Kaizen is small, steady improvement with everyone involved."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Kaizen khác với cải tiến đột phá (kaikaku). Nhiều thay đổi nhỏ cộng lại tạo ra kết quả lớn.",
      "en": "Kaizen differs from breakthrough change (kaikaku). Many small changes add up to large results."
    },
    "objectives": [
      {
        "vi": "Phân biệt kaizen và kaikaku.",
        "en": "Distinguish kaizen from kaikaku."
      },
      {
        "vi": "Triển khai một vòng cải tiến nhỏ.",
        "en": "Run one small improvement cycle."
      }
    ],
    "explanation": {
      "vi": "1. Kaizen dựa trên người vận hành, không chỉ kỹ sư.\n2. Thay đổi nhỏ, thực hiện nhanh, đo kết quả.\n3. Kaikaku là thay đổi lớn, tốn đầu tư, ít lần.",
      "en": "1. Kaizen relies on operators, not only engineers.\n2. Small changes, done quickly, with results measured.\n3. Kaikaku is a large change, costly and infrequent."
    },
    "practicalExample": {
      "vi": "Một thợ đề xuất cố định tay cầm dụng cụ, tiết kiệm 5 giây mỗi lần, nhân 500 lần mỗi ca được 2.500 giây.",
      "en": "An operator proposes a fixed tool holder that saves 5 seconds per use, 500 uses per shift: 2,500 seconds saved."
    },
    "formula": [],
    "exercise": {
      "vi": "Thay đổi nào là kaizen: đầu tư robot mới hay đặt lại tủ dụng cụ gần trạm hơn?",
      "en": "Which change is kaizen: buying a new robot, or moving the tool cabinet closer to the station?"
    },
    "answer": {
      "vi": "Đặt lại tủ dụng cụ là kaizen; robot mới là kaikaku.",
      "en": "Moving the cabinet is kaizen; a new robot is kaikaku."
    },
    "relatedTopics": []
  },
  {
    "slug": "7-wastes",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "7 Wastes: bảy loại lãng phí",
      "en": "7 Wastes: the seven types of waste"
    },
    "summary": {
      "vi": "Bảy lãng phí gồm vận chuyển, tồn kho, di chuyển, chờ đợi, sản xuất thừa, xử lý thừa và lỗi.",
      "en": "The seven wastes are transport, inventory, motion, waiting, overproduction, overprocessing and defects."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Nhận ra lãng phí là bước đầu của Lean. Nhiều lãng phí không nhìn thấy nếu không quan sát tại hiện trường.",
      "en": "Recognizing waste is the first step of Lean. Many wastes are invisible unless you observe the floor."
    },
    "objectives": [
      {
        "vi": "Kể đủ bảy loại lãng phí.",
        "en": "List all seven wastes."
      },
      {
        "vi": "Phân loại một tình huống vào đúng loại lãng phí.",
        "en": "Classify a situation into the right waste."
      }
    ],
    "explanation": {
      "vi": "1. Transport: vận chuyển không cần thiết.\n2. Inventory: tồn kho thừa.\n3. Motion: di chuyển, cúi, với không cần thiết.\n4. Waiting: chờ máy, chờ người, chờ vật liệu.\n5. Overproduction: làm nhiều hơn nhu cầu.\n6. Overprocessing: làm thừa bước không tạo giá trị.\n7. Defects: sản phẩm lỗi, làm lại.",
      "en": "1. Transport: unnecessary moving of material.\n2. Inventory: excess stock.\n3. Motion: unnecessary movement of people.\n4. Waiting: waiting for machines, people or material.\n5. Overproduction: making more than needed.\n6. Overprocessing: doing steps that add no value.\n7. Defects: faulty products needing rework."
    },
    "practicalExample": {
      "vi": "Thợ đi 50 mét lấy dụng cụ mỗi giờ là lãng phí di chuyển (Motion).",
      "en": "A worker walks 50 meters per hour to fetch tools: this is motion waste."
    },
    "formula": [],
    "exercise": {
      "vi": "Chờ máy sửa 30 phút là lãng phí loại nào?",
      "en": "Waiting 30 minutes for a machine repair is which waste?"
    },
    "answer": {
      "vi": "Waiting (chờ đợi).",
      "en": "Waiting."
    },
    "relatedTopics": []
  },
  {
    "slug": "value-stream-mapping",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Value Stream Mapping: sơ đồ chuỗi giá trị",
      "en": "Value Stream Mapping: map the flow of value"
    },
    "summary": {
      "vi": "VSM vẽ luồng vật liệu và thông tin, tách thời gian có giá trị và không có giá trị.",
      "en": "VSM maps material and information flow, separating value-added from non-value-added time."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "VSM cho thấy toàn cảnh quy trình, từ nhà cung cấp đến khách hàng, và chỉ ra nơi lãng phí thời gian nhiều nhất.",
      "en": "VSM shows the whole process, from supplier to customer, and reveals where time is wasted most."
    },
    "objectives": [
      {
        "vi": "Vẽ sơ đồ chuỗi giá trị đơn giản.",
        "en": "Draw a simple value stream map."
      },
      {
        "vi": "Tính tỷ lệ thời gian có giá trị gia tăng.",
        "en": "Calculate the share of value-added time."
      }
    ],
    "explanation": {
      "vi": "1. Vẽ từng công đoạn, tồn kho giữa các công đoạn và luồng thông tin.\n2. Ghi thời gian gia công (Process Time) và thời gian chờ.\n3. Tỷ lệ giá trị gia tăng = tổng Process Time ÷ Lead Time × 100%.",
      "en": "1. Draw each step, inventory between steps and the information flow.\n2. Record processing time and waiting time.\n3. Value-added ratio = total processing time ÷ lead time × 100%."
    },
    "practicalExample": {
      "vi": "Lead Time 10 ngày, tổng thời gian gia công 2 giờ: tỷ lệ giá trị gia tăng = 2 ÷ 240 ≈ 0,8%.",
      "en": "Lead time 10 days, total processing time 2 hours: value-added ratio = 2 ÷ 240 ≈ 0.8%."
    },
    "formula": [],
    "exercise": {
      "vi": "Lead Time 5 ngày, gia công 4 giờ. Tỷ lệ giá trị gia tăng là bao nhiêu?",
      "en": "Lead time 5 days, processing 4 hours. What is the value-added ratio?"
    },
    "answer": {
      "vi": "4 ÷ 120 ≈ 3,3%.",
      "en": "4 ÷ 120 ≈ 3.3%."
    },
    "relatedTopics": []
  },
  {
    "slug": "just-in-time",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Just In Time: sản xuất đúng lúc",
      "en": "Just In Time: produce what is needed, when needed"
    },
    "summary": {
      "vi": "JIT là sản xuất và giao đúng số lượng, đúng lúc, để tồn kho gần bằng không.",
      "en": "JIT produces and delivers the right quantity at the right time, keeping inventory close to zero."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "JIT giảm vốn bị giữ trong kho, nhưng đòi hỏi nhà cung cấp ổn định và quy trình ổn định.",
      "en": "JIT reduces cash tied up in stock, but needs reliable suppliers and stable processes."
    },
    "objectives": [
      {
        "vi": "Nêu lợi ích và rủi ro của JIT.",
        "en": "State the benefits and risks of JIT."
      },
      {
        "vi": "Liên hệ JIT với takt time.",
        "en": "Link JIT to takt time."
      }
    ],
    "explanation": {
      "vi": "1. Sản xuất theo nhịp takt time, không làm trước quá nhiều.\n2. Nguyên liệu về đúng lúc cần dùng.\n3. Rủi ro: nhà cung cấp trễ hoặc máy hỏng sẽ dừng cả dây chuyền.",
      "en": "1. Produce to takt time, not far ahead.\n2. Material arrives just when it is needed.\n3. Risk: a late supplier or a breakdown stops the whole line."
    },
    "practicalExample": {
      "vi": "Nếu nhà cung cấp giao trễ một ngày, dây chuyền dừng ngay vì không có tồn kho đệm.",
      "en": "If a supplier is one day late, the line stops at once because there is no buffer stock."
    },
    "formula": [],
    "exercise": {
      "vi": "Nêu một lợi ích và một rủi ro của JIT.",
      "en": "Name one benefit and one risk of JIT."
    },
    "answer": {
      "vi": "Lợi ích: giảm tồn kho. Rủi ro: dễ thiếu hàng khi nhà cung cấp trễ.",
      "en": "Benefit: lower inventory. Risk: shortages when a supplier is late."
    },
    "relatedTopics": []
  },
  {
    "slug": "kanban",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Kanban: quản lý luồng bằng thẻ tín hiệu",
      "en": "Kanban: flow control with signal cards"
    },
    "summary": {
      "vi": "Kanban là hệ thống tín hiệu kéo: công đoạn sau lấy từ công đoạn trước khi cần, giới hạn WIP.",
      "en": "Kanban is a pull signal: the next step takes from the previous step when needed, with a WIP limit."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Kanban dùng thẻ hoặc tín hiệu để kiểm soát lượng sản phẩm dở dang trong quy trình.",
      "en": "Kanban uses cards or signals to control how much work is in progress."
    },
    "objectives": [
      {
        "vi": "Mô tả cách vận hành kanban.",
        "en": "Describe how kanban works."
      },
      {
        "vi": "Tính WIP tối đa theo số thẻ.",
        "en": "Calculate maximum WIP from the number of cards."
      }
    ],
    "explanation": {
      "vi": "1. Mỗi thẻ đại diện cho một lô sản phẩm (container).\n2. Công đoạn sau lấy thẻ và gửi thẻ về công đoạn trước khi lấy hàng.\n3. Số thẻ giới hạn WIP tối đa: WIP tối đa = số thẻ × số sản phẩm mỗi thẻ.",
      "en": "1. Each card represents one container of product.\n2. The next step takes material and sends the card back to the previous step.\n3. The number of cards sets maximum WIP: maximum WIP = number of cards × units per card."
    },
    "practicalExample": {
      "vi": "5 thẻ, mỗi thẻ 20 sản phẩm: WIP tối đa = 100 sản phẩm.",
      "en": "5 cards with 20 units each: maximum WIP = 100 units."
    },
    "formula": [],
    "exercise": {
      "vi": "8 thẻ, mỗi thẻ 25 sản phẩm. WIP tối đa là bao nhiêu?",
      "en": "8 cards with 25 units each. What is the maximum WIP?"
    },
    "answer": {
      "vi": "8 × 25 = 200.",
      "en": "8 × 25 = 200."
    },
    "relatedTopics": []
  },
  {
    "slug": "standard-work",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Standard Work: công việc tiêu chuẩn",
      "en": "Standard Work: the agreed way of working"
    },
    "summary": {
      "vi": "Standard Work là cách làm việc được thống nhất về trình tự, thời gian và tồn kho trong quy trình.",
      "en": "Standard Work is an agreed sequence, timing and in-process stock for each task."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Không có tiêu chuẩn thì không thể đo và cải tiến. Standard Work là nền tảng cho cải tiến.",
      "en": "Without a standard you cannot measure or improve. Standard Work is the base for improvement."
    },
    "objectives": [
      {
        "vi": "Nêu ba thành phần của Standard Work.",
        "en": "Name the three elements of Standard Work."
      },
      {
        "vi": "Viết một bảng công việc tiêu chuẩn đơn giản.",
        "en": "Write a simple standard work chart."
      }
    ],
    "explanation": {
      "vi": "1. Takt time: nhịp cần thiết cho sản phẩm.\n2. Trình tự công việc: thứ tự các thao tác.\n3. WIP chuẩn: số sản phẩm dở dang cần có tại trạm.",
      "en": "1. Takt time: the pace required for the product.\n2. Work sequence: the order of operations.\n3. Standard WIP: the work-in-process needed at the station."
    },
    "practicalExample": {
      "vi": "Trạm có takt 2 phút, 5 thao tác với tổng thời gian 1,8 phút: trình tự và thời gian được ghi trên bảng tại trạm.",
      "en": "A station with a 2-minute takt and 5 operations totaling 1.8 minutes: the sequence and times are posted at the station."
    },
    "formula": [],
    "exercise": {
      "vi": "Ba thành phần của Standard Work là gì?",
      "en": "What are the three elements of Standard Work?"
    },
    "answer": {
      "vi": "Takt time, trình tự công việc, WIP chuẩn.",
      "en": "Takt time, work sequence and standard WIP."
    },
    "relatedTopics": []
  },
  {
    "slug": "poka-yoke",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Poka-Yoke: chống sai lỗi",
      "en": "Poka-Yoke: mistake-proofing"
    },
    "summary": {
      "vi": "Poka-Yoke là thiết kế để không thể làm sai, thay vì chỉ kiểm tra sau khi làm.",
      "en": "Poka-Yoke designs the process so an error cannot be made, rather than checking after the fact."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Chống sai lỗi bằng thiết kế hiệu quả hơn kiểm tra thủ công, vì con người vẫn có thể quên.",
      "en": "Mistake-proofing by design beats manual inspection, because people can still forget."
    },
    "objectives": [
      {
        "vi": "Phân biệt chống sai lỗi với kiểm tra.",
        "en": "Distinguish mistake-proofing from inspection."
      },
      {
        "vi": "Đề xuất một biện pháp chống sai lỗi.",
        "en": "Propose one mistake-proofing measure."
      }
    ],
    "explanation": {
      "vi": "1. Biện pháp cơ khí: chốt, khuôn chỉ lắp được một chiều.\n2. Biện pháp cảm biến: báo hoặc dừng khi thiếu chi tiết.\n3. Biện pháp đếm: kiểm tra số lượng linh kiện trước khi đóng gói.",
      "en": "1. Mechanical: a pin or fixture that fits only one way.\n2. Sensor: alerts or stops when a part is missing.\n3. Counting: checks the number of parts before packing."
    },
    "practicalExample": {
      "vi": "Đầu cắm được thiết kế chỉ lắp đúng một chiều, không thể cắm ngược.",
      "en": "A connector designed to fit only one way, so it cannot be inserted backwards."
    },
    "formula": [],
    "exercise": {
      "vi": "Đề xuất một cách chống quên bước siết ốc.",
      "en": "Propose a way to prevent a worker from forgetting to tighten a bolt."
    },
    "answer": {
      "vi": "Ví dụ: cảm biến mô-men xoắn hoặc bộ đếm bắt buộc, không cho chuyển bước nếu chưa đủ.",
      "en": "For example: a torque sensor or a required counter that blocks the next step until the bolt is tightened."
    },
    "relatedTopics": []
  },
  {
    "slug": "smed",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "SMED (Single-Minute Exchange of Die): giảm thời gian chuyển đổi",
      "en": "SMED (Single-Minute Exchange of Die): reduce changeover time"
    },
    "summary": {
      "vi": "SMED là phương pháp đưa thời gian chuyển đổi xuống dưới 10 phút, tách việc làm khi máy dừng và khi máy chạy.",
      "en": "SMED aims to bring changeover below 10 minutes, separating work done while the machine is stopped and while it runs."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Chuyển đổi lâu làm tăng lô sản xuất và tồn kho. SMED giúp đổi sản phẩm nhanh và linh hoạt hơn.",
      "en": "Long changeovers force large batches and extra stock. SMED makes product changes fast and flexible."
    },
    "objectives": [
      {
        "vi": "Phân biệt chuyển đổi nội bộ và bên ngoài.",
        "en": "Distinguish internal and external setup."
      },
      {
        "vi": "Tính phần trăm thời gian giảm.",
        "en": "Calculate the percentage reduction."
      }
    ],
    "explanation": {
      "vi": "1. Internal setup: việc chỉ làm được khi máy dừng.\n2. External setup: việc có thể chuẩn bị trước khi máy dừng.\n3. Bước đầu là đưa càng nhiều việc càng tốt sang external setup, rồi đơn giản hóa phần còn lại.",
      "en": "1. Internal setup: tasks that can only be done with the machine stopped.\n2. External setup: tasks that can be prepared while the machine runs.\n3. First move as much as possible to external setup, then simplify what remains."
    },
    "practicalExample": {
      "vi": "Chuyển đổi từ 90 phút xuống 25 phút: giảm (90 − 25) ÷ 90 ≈ 72%.",
      "en": "Changeover reduced from 90 to 25 minutes: reduction = (90 − 25) ÷ 90 ≈ 72%."
    },
    "formula": [],
    "exercise": {
      "vi": "Chuyển đổi từ 60 phút xuống 15 phút. Giảm bao nhiêu phần trăm?",
      "en": "Changeover reduced from 60 to 15 minutes. What is the percentage reduction?"
    },
    "answer": {
      "vi": "(60 − 15) ÷ 60 = 75%.",
      "en": "(60 − 15) ÷ 60 = 75%."
    },
    "relatedTopics": []
  },
  {
    "slug": "jidoka",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Jidoka: tự động hóa có khả năng phát hiện bất thường",
      "en": "Jidoka: automation with abnormality detection"
    },
    "summary": {
      "vi": "Jidoka là máy tự dừng khi phát hiện bất thường, và người vận hành được báo ngay.",
      "en": "Jidoka means the machine stops itself when it detects an abnormality, and operators are alerted at once."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Jidoka ngăn sản phẩm lỗi đi tiếp. Máy dừng để người xử lý nguyên nhân, không để lỗi lan rộng.",
      "en": "Jidoka stops defective units from moving on. The machine stops so people can address the cause before defects spread."
    },
    "objectives": [
      {
        "vi": "Giải thích vì sao máy tự dừng có lợi.",
        "en": "Explain why self-stopping machines help."
      },
      {
        "vi": "Liên hệ Jidoka với andon.",
        "en": "Link Jidoka to andon."
      }
    ],
    "explanation": {
      "vi": "1. Máy hoặc cảm biến phát hiện bất thường (nhiệt cao, sai kích thước).\n2. Máy dừng và báo cho người vận hành, thường qua andon.\n3. Người vận hành xử lý nguyên nhân trước khi chạy lại.",
      "en": "1. A machine or sensor detects an abnormality (high temperature, wrong dimension).\n2. The machine stops and alerts the operator, often through andon.\n3. The operator addresses the cause before restarting."
    },
    "practicalExample": {
      "vi": "Cảm biến nhiệt phát hiện quá 80 °C, máy tự dừng và đèn đỏ bật sáng.",
      "en": "A temperature sensor detects above 80 °C; the machine stops and the red light turns on."
    },
    "formula": [],
    "exercise": {
      "vi": "Vì sao máy tự dừng khi lỗi tốt hơn máy chạy tiếp?",
      "en": "Why is stopping on error better than continuing to run?"
    },
    "answer": {
      "vi": "Để tránh tạo hàng loạt lỗi và cho phép xử lý nguyên nhân ngay.",
      "en": "It prevents a batch of defects and lets the cause be fixed immediately."
    },
    "relatedTopics": []
  },
  {
    "slug": "heijunka",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Heijunka: cân bằng sản xuất",
      "en": "Heijunka: production leveling"
    },
    "summary": {
      "vi": "Heijunka cân bằng khối lượng và loại sản phẩm theo thời gian, tránh sản xuất theo lô lớn.",
      "en": "Heijunka levels volume and product mix over time, avoiding large batches."
    },
    "difficulty": "Advanced",
    "overview": {
      "vi": "Sản xuất theo lô lớn làm tồn kho tăng và đáp ứng khách hàng chậm. Heijunka giúp sản xuất đều đặn hơn.",
      "en": "Large batches raise stock and slow customer response. Heijunka makes production steadier."
    },
    "objectives": [
      {
        "vi": "Mô tả cách chia lịch sản xuất đều theo mix.",
        "en": "Describe how to level a schedule by mix."
      },
      {
        "vi": "Giải thích lợi ích của sản xuất đều.",
        "en": "Explain the benefits of levelled production."
      }
    ],
    "explanation": {
      "vi": "1. Đo nhu cầu theo ngày và theo loại sản phẩm.\n2. Chia thành các lô nhỏ và xen kẽ các loại sản phẩm.\n3. Sản xuất đều theo nhịp, dễ dự báo và giảm tồn kho.",
      "en": "1. Measure demand per day and per product.\n2. Split into small batches and mix products.\n3. Produce at a steady pace, which is easier to forecast and keeps stock low."
    },
    "practicalExample": {
      "vi": "Nhu cầu 300 sản phẩm mỗi ngày: A 200, B 100. Thay vì làm 200 A rồi 100 B, xen kẽ theo tỷ lệ 2A:1B.",
      "en": "Demand 300 units per day, A 200 and B 100. Instead of 200 A then 100 B, alternate in a 2A:1B pattern."
    },
    "formula": [],
    "exercise": {
      "vi": "Nhu cầu 600 sản phẩm mỗi ngày, A 400, B 200. Tỷ lệ xen kẽ tối giản là bao nhiêu?",
      "en": "Demand 600 units per day, A 400 and B 200. What is the simplest alternating pattern?"
    },
    "answer": {
      "vi": "2A : 1B.",
      "en": "2A : 1B."
    },
    "relatedTopics": []
  },
  {
    "slug": "dmaic",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "DMAIC (Define, Measure, Analyze, Improve, Control): năm bước cải tiến dựa trên dữ liệu",
      "en": "DMAIC (Define, Measure, Analyze, Improve, Control): five data-driven improvement steps"
    },
    "summary": {
      "vi": "DMAIC gồm Define, Measure, Analyze, Improve, Control, là chu trình của Six Sigma.",
      "en": "DMAIC stands for Define, Measure, Analyze, Improve and Control, the Six Sigma cycle."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "DMAIC đưa cải tiến về quy trình có dữ liệu và kiểm soát, không dựa vào cảm tính.",
      "en": "DMAIC grounds improvement in data and control, not opinion."
    },
    "objectives": [
      {
        "vi": "Kể năm bước DMAIC.",
        "en": "List the five DMAIC steps."
      },
      {
        "vi": "Chọn công cụ phù hợp cho từng bước.",
        "en": "Choose the right tool for each step."
      }
    ],
    "explanation": {
      "vi": "1. Define: xác định vấn đề và mục tiêu.\n2. Measure: đo hiện trạng, lập baseline.\n3. Analyze: tìm nguyên nhân gốc bằng dữ liệu.\n4. Improve: thử và triển khai giải pháp.\n5. Control: duy trì bằng kiểm soát và giám sát.",
      "en": "1. Define: identify the problem and the goal.\n2. Measure: measure the current state and set a baseline.\n3. Analyze: find the root cause with data.\n4. Improve: test and roll out a solution.\n5. Control: sustain with control charts and monitoring."
    },
    "practicalExample": {
      "vi": "Lỗi hàn 4% được đo làm baseline, sau đó giảm còn 1,5% và đặt biểu đồ kiểm soát để theo dõi.",
      "en": "Solder defects at 4% are measured as the baseline, reduced to 1.5%, then tracked with a control chart."
    },
    "formula": [],
    "exercise": {
      "vi": "Bước nào thiết lập baseline và đo hiện trạng?",
      "en": "Which step sets the baseline and measures the current state?"
    },
    "answer": {
      "vi": "Measure.",
      "en": "Measure."
    },
    "relatedTopics": []
  },
  {
    "slug": "a3-problem-solving",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "A3 Problem Solving: giải quyết vấn đề trên một trang",
      "en": "A3 Problem Solving: solve on one page"
    },
    "summary": {
      "vi": "A3 là báo cáo một trang A3 theo PDCA, mô tả vấn đề, nguyên nhân, giải pháp và kế hoạch.",
      "en": "A3 is a one-page report following PDCA, describing the problem, cause, countermeasures and plan."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "A3 buộc người làm suy nghĩ rõ ràng trên một trang, dễ trao đổi và theo dõi.",
      "en": "A3 forces clear thinking on one page, easy to discuss and track."
    },
    "objectives": [
      {
        "vi": "Liệt kê các phần của báo cáo A3.",
        "en": "List the sections of an A3 report."
      },
      {
        "vi": "Viết một tóm tắt A3 ngắn cho một vấn đề.",
        "en": "Write a short A3 summary for one problem."
      }
    ],
    "explanation": {
      "vi": "1. Bối cảnh (Background): vì sao vấn đề quan trọng.\n2. Hiện trạng (Current condition): số liệu thực tế.\n3. Mục tiêu (Goal): con số cần đạt.\n4. Nguyên nhân gốc (Root cause).\n5. Giải pháp và kế hoạch (Countermeasures and plan).\n6. Kiểm tra kết quả (Follow-up).",
      "en": "1. Background: why the problem matters.\n2. Current condition: actual data.\n3. Goal: the target to reach.\n4. Root cause.\n5. Countermeasures and plan.\n6. Follow-up: check the results."
    },
    "practicalExample": {
      "vi": "A3 ghi lỗi 3% so với mục tiêu 1%, nguyên nhân là tay gá lỏng, giải pháp là đổi gá và kiểm tra mỗi ca.",
      "en": "A3 shows a 3% defect rate against a 1% goal; the cause is a loose fixture; the countermeasure is a new fixture and a check each shift."
    },
    "formula": [],
    "exercise": {
      "vi": "Phần nào của A3 ghi con số cần đạt?",
      "en": "Which A3 section states the target number?"
    },
    "answer": {
      "vi": "Goal (Mục tiêu).",
      "en": "Goal."
    },
    "relatedTopics": []
  },
  {
    "slug": "8d",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "8D (Eight Disciplines): tám bước xử lý vấn đề chất lượng",
      "en": "8D (Eight Disciplines): eight-step quality problem solving"
    },
    "summary": {
      "vi": "8D là phương pháp xử lý vấn đề có hệ thống, từ nhóm, mô tả, ngăn chặn đến phòng ngừa tái diễn.",
      "en": "8D is a structured method from forming a team and describing the problem to containment and recurrence prevention."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "8D thường dùng khi khách hàng báo lỗi. Mục tiêu là ngăn lỗi lan, tìm nguyên nhân gốc và ngăn tái diễn.",
      "en": "8D is often used after a customer complaint. The goal is to stop the spread, find the root cause and prevent recurrence."
    },
    "objectives": [
      {
        "vi": "Kể tên tám bước 8D.",
        "en": "Name the eight 8D steps."
      },
      {
        "vi": "Phân biệt ngăn chặn (containment) và khắc phục (corrective action).",
        "en": "Distinguish containment from corrective action."
      }
    ],
    "explanation": {
      "vi": "1. D1: thành lập nhóm.\n2. D2: mô tả vấn đề.\n3. D3: ngăn chặn tạm thời (containment).\n4. D4: tìm nguyên nhân gốc.\n5. D5: chọn giải pháp khắc phục.\n6. D6: triển khai và kiểm tra.\n7. D7: phòng ngừa tái diễn.\n8. D8: công nhận nhóm.",
      "en": "1. D1: form the team.\n2. D2: describe the problem.\n3. D3: interim containment.\n4. D4: find the root cause.\n5. D5: choose the corrective action.\n6. D6: implement and verify.\n7. D7: prevent recurrence.\n8. D8: recognize the team."
    },
    "practicalExample": {
      "vi": "Khách hàng báo lỗi, D3 kiểm tra 100% lô đang giao và giữ hàng tồn để không lỗi đến khách.",
      "en": "A customer complaint: in D3, 100% of the lot being shipped is checked and held stock is isolated so no defect reaches the customer."
    },
    "formula": [],
    "exercise": {
      "vi": "Bước D3 của 8D là gì?",
      "en": "What is step D3 of 8D?"
    },
    "answer": {
      "vi": "Ngăn chặn tạm thời (containment).",
      "en": "Interim containment."
    },
    "relatedTopics": []
  },
  {
    "slug": "fmea",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "FMEA (Failure Mode and Effects Analysis): phân tích lỗi tiềm ẩn và rủi ro",
      "en": "FMEA (Failure Mode and Effects Analysis): failure modes and risk analysis"
    },
    "summary": {
      "vi": "FMEA đánh giá các chế độ lỗi tiềm ẩn bằng chỉ số RPN = Severity × Occurrence × Detection.",
      "en": "FMEA assesses potential failure modes using RPN = Severity × Occurrence × Detection."
    },
    "difficulty": "Advanced",
    "overview": {
      "vi": "FMEA được làm trước khi sản xuất để phòng lỗi. Điểm RPN cao cho biết nên ưu tiên xử lý.",
      "en": "FMEA is done before production to prevent failures. A high RPN shows which risk to address first."
    },
    "objectives": [
      {
        "vi": "Tính RPN từ ba chỉ số.",
        "en": "Calculate RPN from three ratings."
      },
      {
        "vi": "Chọn hành động ưu tiên theo RPN.",
        "en": "Choose priority actions by RPN."
      }
    ],
    "explanation": {
      "vi": "1. Severity (S): mức nghiêm trọng của lỗi, 1 đến 10.\n2. Occurrence (O): khả năng xảy ra, 1 đến 10.\n3. Detection (D): khả năng phát hiện trước khi đến khách, 1 đến 10 (10 là khó phát hiện nhất).\n4. RPN = S × O × D.",
      "en": "1. Severity (S): how serious the failure is, 1 to 10.\n2. Occurrence (O): how likely it is, 1 to 10.\n3. Detection (D): how likely it is to be caught before reaching the customer, 1 to 10 (10 means hardest to detect).\n4. RPN = S × O × D."
    },
    "practicalExample": {
      "vi": "S = 8, O = 4, D = 5: RPN = 160.",
      "en": "S = 8, O = 4, D = 5: RPN = 160."
    },
    "formula": [],
    "exercise": {
      "vi": "S = 7, O = 3, D = 6. RPN là bao nhiêu?",
      "en": "S = 7, O = 3, D = 6. What is the RPN?"
    },
    "answer": {
      "vi": "7 × 3 × 6 = 126.",
      "en": "7 × 3 × 6 = 126."
    },
    "relatedTopics": []
  },
  {
    "slug": "swot",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "SWOT (Strengths, Weaknesses, Opportunities, Threats): điểm mạnh, điểm yếu, cơ hội, thách thức",
      "en": "SWOT (Strengths, Weaknesses, Opportunities, Threats)"
    },
    "summary": {
      "vi": "SWOT phân tích nội bộ (Strengths, Weaknesses) và bên ngoài (Opportunities, Threats).",
      "en": "SWOT looks at internal factors (strengths, weaknesses) and external factors (opportunities, threats)."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "SWOT giúp nhìn tổng thể trước khi chọn hướng cải tiến hoặc đầu tư.",
      "en": "SWOT gives a full picture before choosing an improvement or investment direction."
    },
    "objectives": [
      {
        "vi": "Phân loại yếu tố vào bốn ô SWOT.",
        "en": "Sort factors into the four SWOT boxes."
      },
      {
        "vi": "Đề xuất một hành động từ SWOT.",
        "en": "Propose one action from a SWOT."
      }
    ],
    "explanation": {
      "vi": "1. Strengths (điểm mạnh): yếu tố nội bộ có lợi.\n2. Weaknesses (điểm yếu): yếu tố nội bộ bất lợi.\n3. Opportunities (cơ hội): yếu tố bên ngoài có lợi.\n4. Threats (thách thức): yếu tố bên ngoài bất lợi.",
      "en": "1. Strengths: internal factors that help.\n2. Weaknesses: internal factors that hurt.\n3. Opportunities: external factors that help.\n4. Threats: external factors that hurt."
    },
    "practicalExample": {
      "vi": "Nhà máy có tay nghề thợ cao (S), nhưng máy cũ (W), khách hàng muốn giao nhanh hơn (O), chi phí nguyên liệu tăng (T).",
      "en": "A plant with skilled operators (S), old machines (W), customers asking for faster delivery (O), rising material costs (T)."
    },
    "formula": [],
    "exercise": {
      "vi": "Chi phí nguyên liệu tăng thuộc ô nào?",
      "en": "Rising material costs belong in which box?"
    },
    "answer": {
      "vi": "Threats (thách thức).",
      "en": "Threats."
    },
    "relatedTopics": []
  },
  {
    "slug": "qc",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "QC (Quality Control): kiểm soát chất lượng",
      "en": "QC (Quality Control)"
    },
    "summary": {
      "vi": "QC là hoạt động kiểm tra và đo lường sản phẩm để phát hiện lỗi.",
      "en": "QC is inspecting and measuring products to detect defects."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "QC tập trung vào sản phẩm đã làm xong, phát hiện lỗi trước khi đến khách hàng.",
      "en": "QC focuses on finished product and catches defects before they reach the customer."
    },
    "objectives": [
      {
        "vi": "Phân biệt QC với QA.",
        "en": "Distinguish QC from QA."
      },
      {
        "vi": "Nêu các hoạt động QC thường gặp.",
        "en": "List common QC activities."
      }
    ],
    "explanation": {
      "vi": "1. QC kiểm tra đầu ra: đo kích thước, ngoại quan, chức năng.\n2. QC phát hiện lỗi, nhưng không ngăn lỗi phát sinh.\n3. Kết quả QC là đầu vào cho phân tích lỗi và cải tiến.",
      "en": "1. QC inspects output: dimensions, appearance, function.\n2. QC finds defects but does not prevent them.\n3. QC results feed defect analysis and improvement."
    },
    "practicalExample": {
      "vi": "Kiểm tra 50 sản phẩm mỗi giờ bằng thước đo, ghi lại số lỗi theo loại.",
      "en": "Inspect 50 units per hour with gauges, and record defects by type."
    },
    "formula": [],
    "exercise": {
      "vi": "QC kiểm tra cái gì: quy trình hay sản phẩm?",
      "en": "Does QC check the process or the product?"
    },
    "answer": {
      "vi": "Sản phẩm (đầu ra).",
      "en": "The product (output)."
    },
    "relatedTopics": []
  },
  {
    "slug": "qa",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "QA (Quality Assurance): đảm bảo chất lượng",
      "en": "QA (Quality Assurance)"
    },
    "summary": {
      "vi": "QA là hệ thống quy trình và tiêu chuẩn nhằm ngăn lỗi ngay từ đầu.",
      "en": "QA is the system of processes and standards that prevents defects from the start."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "QA tập trung vào quy trình, khác với QC tập trung vào sản phẩm.",
      "en": "QA focuses on the process, while QC focuses on the product."
    },
    "objectives": [
      {
        "vi": "Phân biệt QA với QC.",
        "en": "Distinguish QA from QC."
      },
      {
        "vi": "Nêu ví dụ một hoạt động QA.",
        "en": "Give one example of a QA activity."
      }
    ],
    "explanation": {
      "vi": "1. QA xây dựng và duy trì hệ thống quản lý chất lượng.\n2. QA kiểm tra việc tuân thủ quy trình, đánh giá nhà cung cấp.\n3. QA cố gắng ngăn lỗi trước khi sản xuất.",
      "en": "1. QA builds and maintains the quality management system.\n2. QA audits process compliance and assesses suppliers.\n3. QA aims to prevent defects before production."
    },
    "practicalExample": {
      "vi": "QA kiểm tra nhà cung cấp trước khi nhận linh kiện mới và xem lại quy trình hàn.",
      "en": "QA audits a supplier before accepting a new component, and reviews the soldering process."
    },
    "formula": [],
    "exercise": {
      "vi": "Đánh giá nhà cung cấp là hoạt động QA hay QC?",
      "en": "Is assessing a supplier a QA or QC activity?"
    },
    "answer": {
      "vi": "QA.",
      "en": "QA."
    },
    "relatedTopics": []
  },
  {
    "slug": "tqm",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "TQM (Total Quality Management): quản lý chất lượng toàn diện",
      "en": "TQM (Total Quality Management)"
    },
    "summary": {
      "vi": "TQM là triết lý quản lý mà mọi người, mọi bộ phận cùng cải tiến chất lượng, lấy khách hàng làm trung tâm.",
      "en": "TQM is a management philosophy where everyone improves quality, with the customer at the centre."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "TQM mở rộng chất lượng ra toàn tổ chức, không chỉ là bộ phận kiểm tra.",
      "en": "TQM extends quality across the organisation, not only the inspection department."
    },
    "objectives": [
      {
        "vi": "Nêu các nguyên tắc chính của TQM.",
        "en": "State the main principles of TQM."
      },
      {
        "vi": "Phân biệt TQM với QC.",
        "en": "Distinguish TQM from QC."
      }
    ],
    "explanation": {
      "vi": "1. Khách hàng là trung tâm.\n2. Cải tiến liên tục.\n3. Mọi người tham gia.\n4. Quyết định dựa trên dữ liệu.",
      "en": "1. Customer focus.\n2. Continuous improvement.\n3. Involvement of everyone.\n4. Decisions based on data."
    },
    "practicalExample": {
      "vi": "Công nhân, kỹ sư và kho cùng họp để giảm lỗi giao hàng, không chỉ bộ phận QC.",
      "en": "Operators, engineers and warehouse staff meet to reduce delivery errors, not only the QC team."
    },
    "formula": [],
    "exercise": {
      "vi": "Nêu hai nguyên tắc của TQM.",
      "en": "Name two principles of TQM."
    },
    "answer": {
      "vi": "Ví dụ: khách hàng là trung tâm, cải tiến liên tục, mọi người tham gia, dựa trên dữ liệu.",
      "en": "For example: customer focus, continuous improvement, involvement of everyone, data-based decisions."
    },
    "relatedTopics": []
  },
  {
    "slug": "six-sigma",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Six Sigma: quản lý chất lượng bằng dữ liệu",
      "en": "Six Sigma: data-driven quality management"
    },
    "summary": {
      "vi": "Six Sigma là phương pháp giảm biến động và lỗi, mục tiêu khoảng 3,4 lỗi trên một triệu cơ hội (DPMO).",
      "en": "Six Sigma reduces variation and defects, targeting about 3.4 defects per million opportunities (DPMO)."
    },
    "difficulty": "Advanced",
    "overview": {
      "vi": "Six Sigma dùng thống kê và DMAIC để đưa quy trình về mức lỗi rất thấp.",
      "en": "Six Sigma uses statistics and DMAIC to bring processes to very low defect levels."
    },
    "objectives": [
      {
        "vi": "Hiểu ý nghĩa của DPMO.",
        "en": "Understand what DPMO means."
      },
      {
        "vi": "Tính DPMO từ số lỗi, số đơn vị và số cơ hội.",
        "en": "Calculate DPMO from defects, units and opportunities."
      }
    ],
    "explanation": {
      "vi": "1. DPMO = số lỗi ÷ (số đơn vị × số cơ hội lỗi mỗi đơn vị) × 1.000.000.\n2. Mức 6 sigma tương ứng khoảng 3,4 DPMO.\n3. Phương pháp chính là DMAIC.",
      "en": "1. DPMO = defects ÷ (units × defect opportunities per unit) × 1,000,000.\n2. Six sigma corresponds to about 3.4 DPMO.\n3. The main method is DMAIC."
    },
    "practicalExample": {
      "vi": "10 lỗi trên 1.000 sản phẩm, mỗi sản phẩm có 5 cơ hội lỗi: DPMO = 10 ÷ 5.000 × 1.000.000 = 2.000.",
      "en": "10 defects in 1,000 units, 5 opportunities per unit: DPMO = 10 ÷ 5,000 × 1,000,000 = 2,000."
    },
    "formula": [],
    "exercise": {
      "vi": "20 lỗi trên 1.000 sản phẩm, mỗi sản phẩm 4 cơ hội lỗi. DPMO là bao nhiêu?",
      "en": "20 defects in 1,000 units, 4 opportunities per unit. What is the DPMO?"
    },
    "answer": {
      "vi": "20 ÷ 4.000 × 1.000.000 = 5.000.",
      "en": "20 ÷ 4,000 × 1,000,000 = 5,000."
    },
    "relatedTopics": []
  },
  {
    "slug": "spc",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "SPC (Statistical Process Control): kiểm soát quá trình bằng thống kê",
      "en": "SPC (Statistical Process Control)"
    },
    "summary": {
      "vi": "SPC dùng thống kê và biểu đồ kiểm soát để phân biệt biến động bình thường và bất thường.",
      "en": "SPC uses statistics and control charts to separate normal variation from abnormal variation."
    },
    "difficulty": "Advanced",
    "overview": {
      "vi": "SPC cho phép phát hiện quá trình lệch trước khi tạo ra lỗi.",
      "en": "SPC detects a process drifting before it produces defects."
    },
    "objectives": [
      {
        "vi": "Phân biệt biến động thông thường và đặc biệt.",
        "en": "Distinguish common cause from special cause variation."
      },
      {
        "vi": "Nêu mục đích của SPC.",
        "en": "State the purpose of SPC."
      }
    ],
    "explanation": {
      "vi": "1. Biến động thông thường (common cause): nằm trong quy luật, là đặc tính của quá trình.\n2. Biến động đặc biệt (special cause): xuất hiện bất thường, cần tìm nguyên nhân.\n3. SPC giúp quyết định khi nào cần điều chỉnh và khi nào không.",
      "en": "1. Common cause variation: normal, built into the process.\n2. Special cause variation: unusual, requires finding a cause.\n3. SPC tells you when to adjust and when not to."
    },
    "practicalExample": {
      "vi": "Đường kính trục dao động quanh mức trung bình trong khoảng cho phép là biến động thông thường; một điểm vượt giới hạn là biến động đặc biệt.",
      "en": "Shaft diameter varies around the mean within limits is common cause; a point beyond the limit is special cause."
    },
    "formula": [],
    "exercise": {
      "vi": "Một điểm nằm ngoài giới hạn kiểm soát là loại biến động nào?",
      "en": "A point outside the control limits is which type of variation?"
    },
    "answer": {
      "vi": "Biến động đặc biệt (special cause).",
      "en": "Special cause."
    },
    "relatedTopics": []
  },
  {
    "slug": "control-chart",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Control Chart: biểu đồ kiểm soát",
      "en": "Control Chart: monitoring a process over time"
    },
    "summary": {
      "vi": "Biểu đồ kiểm soát vẽ giá trị theo thời gian với đường trung bình và giới hạn ±3 sigma.",
      "en": "A control chart plots values over time with a centre line and limits at ±3 sigma."
    },
    "difficulty": "Advanced",
    "overview": {
      "vi": "Biểu đồ kiểm soát là công cụ chính của SPC, dễ đọc khi có điểm bất thường.",
      "en": "Control charts are the main SPC tool and make abnormal points easy to see."
    },
    "objectives": [
      {
        "vi": "Tính giới hạn kiểm soát trên và dưới.",
        "en": "Calculate upper and lower control limits."
      },
      {
        "vi": "Nhận biết tín hiệu bất thường trên biểu đồ.",
        "en": "Recognize out-of-control signals."
      }
    ],
    "explanation": {
      "vi": "1. Đường trung bình (CL) là trung bình của dữ liệu.\n2. UCL = trung bình + 3σ; LCL = trung bình − 3σ.\n3. Tín hiệu bất thường: một điểm ngoài giới hạn, hoặc chuỗi bảy điểm liên tiếp cùng một phía.",
      "en": "1. The centre line (CL) is the mean of the data.\n2. UCL = mean + 3σ; LCL = mean − 3σ.\n3. Signals: one point beyond the limits, or seven points in a row on one side of the centre line."
    },
    "practicalExample": {
      "vi": "Trung bình 50, σ = 2: UCL = 56, LCL = 44.",
      "en": "Mean 50, σ = 2: UCL = 56, LCL = 44."
    },
    "formula": [],
    "exercise": {
      "vi": "Trung bình 80, σ = 3. UCL và LCL là bao nhiêu?",
      "en": "Mean 80, σ = 3. What are the UCL and LCL?"
    },
    "answer": {
      "vi": "UCL = 89, LCL = 71.",
      "en": "UCL = 89, LCL = 71."
    },
    "relatedTopics": []
  },
  {
    "slug": "cpk",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Cp và Cpk (Process Capability Indices): năng lực quá trình",
      "en": "Cp and Cpk (Process Capability Indices)"
    },
    "summary": {
      "vi": "Cp và Cpk đo quá trình có nằm trong dung sai hay không, Cpk tính đến cả độ lệch tâm.",
      "en": "Cp and Cpk measure whether a process fits within tolerance; Cpk also accounts for off-centre means."
    },
    "difficulty": "Advanced",
    "overview": {
      "vi": "Cpk cho biết quá trình có đủ khả năng đáp ứng dung sai khách hàng hay không.",
      "en": "Cpk shows whether a process can meet the customer's tolerance."
    },
    "objectives": [
      {
        "vi": "Tính Cpk từ giới hạn dung sai và độ lệch chuẩn.",
        "en": "Calculate Cpk from tolerance limits and standard deviation."
      },
      {
        "vi": "Đọc mức Cpk thông thường.",
        "en": "Read typical Cpk levels."
      }
    ],
    "explanation": {
      "vi": "1. Cpk = min[(USL − mean), (mean − LSL)] ÷ (3σ).\n2. USL và LSL là giới hạn trên và dưới của dung sai.\n3. Cpk ≥ 1,33 thường được coi là đủ năng lực.",
      "en": "1. Cpk = min[(USL − mean), (mean − LSL)] ÷ (3σ).\n2. USL and LSL are the upper and lower tolerance limits.\n3. Cpk of 1.33 or more is usually considered capable."
    },
    "practicalExample": {
      "vi": "USL 60, LSL 40, mean 52, σ = 2: (60 − 52) ÷ 6 = 1,33; (52 − 40) ÷ 6 = 2. Cpk = 1,33.",
      "en": "USL 60, LSL 40, mean 52, σ = 2: (60 − 52) ÷ 6 = 1.33; (52 − 40) ÷ 6 = 2. Cpk = 1.33."
    },
    "formula": [],
    "exercise": {
      "vi": "USL 60, LSL 40, mean 50, σ = 2. Cpk là bao nhiêu?",
      "en": "USL 60, LSL 40, mean 50, σ = 2. What is the Cpk?"
    },
    "answer": {
      "vi": "min(10/6, 10/6) = 1,67.",
      "en": "min(10/6, 10/6) = 1.67."
    },
    "relatedTopics": []
  },
  {
    "slug": "defect-analysis",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Defect Analysis: phân tích lỗi",
      "en": "Defect Analysis: finding why defects happen"
    },
    "summary": {
      "vi": "Phân tích lỗi gồm phân loại lỗi, tìm nguyên nhân và đo lại sau khi xử lý.",
      "en": "Defect analysis classifies defects, finds causes and measures again after the fix."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Phân tích lỗi là vòng lặp: đếm, phân loại, tìm nguyên nhân, xử lý và kiểm tra lại.",
      "en": "Defect analysis is a loop: count, classify, find causes, fix and recheck."
    },
    "objectives": [
      {
        "vi": "Phân loại lỗi theo loại và công đoạn.",
        "en": "Classify defects by type and step."
      },
      {
        "vi": "Kết nối phân tích lỗi với Pareto và 5 Whys.",
        "en": "Connect defect analysis to Pareto and 5 Whys."
      }
    ],
    "explanation": {
      "vi": "1. Ghi nhận lỗi theo loại, công đoạn, máy, ca.\n2. Dùng Pareto để chọn lỗi lớn nhất.\n3. Dùng 5 Whys hoặc Ishikawa để tìm nguyên nhân.\n4. Đo lại sau khi xử lý.",
      "en": "1. Record defects by type, step, machine and shift.\n2. Use Pareto to pick the biggest defect.\n3. Use 5 Whys or Ishikawa to find the cause.\n4. Measure again after the fix."
    },
    "practicalExample": {
      "vi": "Lỗi hàn chiếm 60% tổng lỗi, tập trung ở ca đêm, do nhiệt độ mỏ hàn thấp.",
      "en": "Solder defects are 60% of all defects, concentrated on the night shift, caused by low iron temperature."
    },
    "formula": [],
    "exercise": {
      "vi": "Bước nào của phân tích lỗi dùng Pareto?",
      "en": "Which defect analysis step uses Pareto?"
    },
    "answer": {
      "vi": "Chọn lỗi lớn nhất để ưu tiên xử lý.",
      "en": "Choosing the biggest defect to prioritise."
    },
    "relatedTopics": []
  },
  {
    "slug": "inspection-sampling",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Inspection & Sampling: kiểm tra và lấy mẫu",
      "en": "Inspection & Sampling: checking and sampling"
    },
    "summary": {
      "vi": "Kiểm tra 100% hay lấy mẫu theo kế hoạch lấy mẫu, dựa trên mức rủi ro và mức chấp nhận AQL.",
      "en": "Inspect 100% or sample by plan, based on risk and the AQL acceptance level."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Không phải lô nào cũng cần kiểm tra toàn bộ. Lấy mẫu đúng cách cân bằng chi phí và rủi ro.",
      "en": "Not every lot needs full inspection. Good sampling balances cost and risk."
    },
    "objectives": [
      {
        "vi": "Chọn giữa kiểm tra 100% và lấy mẫu.",
        "en": "Choose between 100% inspection and sampling."
      },
      {
        "vi": "Hiểu khái niệm AQL.",
        "en": "Understand AQL."
      }
    ],
    "explanation": {
      "vi": "1. Kiểm tra 100% dùng khi lỗi nghiêm trọng hoặc số lượng ít.\n2. Lấy mẫu dùng cho lô lớn, theo bảng lấy mẫu với AQL (mức chất lượng chấp nhận).\n3. Mẫu phải ngẫu nhiên để đại diện cho lô.",
      "en": "1. 100% inspection is used when defects are critical or quantities are small.\n2. Sampling suits large lots, using a sampling table with an AQL (acceptable quality level).\n3. Samples must be random to represent the lot."
    },
    "practicalExample": {
      "vi": "Lô 1.000 sản phẩm, bảng lấy mẫu chỉ định 80 mẫu, chấp nhận nếu lỗi không vượt số quy định.",
      "en": "A lot of 1,000 units; the sampling table specifies 80 samples, and the lot is accepted if defects do not exceed the limit."
    },
    "formula": [],
    "exercise": {
      "vi": "Lỗi gây nguy hiểm cho người dùng nên kiểm tra gì?",
      "en": "A defect that could harm the user should be checked how?"
    },
    "answer": {
      "vi": "Kiểm tra 100%.",
      "en": "100% inspection."
    },
    "relatedTopics": []
  },
  {
    "slug": "traceability",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Traceability: truy xuất nguồn gốc",
      "en": "Traceability: tracing product origin"
    },
    "summary": {
      "vi": "Truy xuất nguồn gốc liên kết sản phẩm với lô nguyên liệu, máy, người và thời gian sản xuất.",
      "en": "Traceability links a product to its material lots, machines, people and production times."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Khi có lỗi, truy xuất giúp tìm nhanh lô bị ảnh hưởng và thu hồi đúng phạm vi.",
      "en": "When a defect appears, traceability finds the affected lots quickly and limits any recall."
    },
    "objectives": [
      {
        "vi": "Mô tả dữ liệu cần ghi để truy xuất.",
        "en": "Describe the data needed for traceability."
      },
      {
        "vi": "Truy vết ngược từ thành phẩm về nguyên liệu.",
        "en": "Trace a finished product back to its material."
      }
    ],
    "explanation": {
      "vi": "1. Ghi mã lô hoặc số serial cho thành phẩm.\n2. Liên kết với lô nguyên liệu, máy, ca, người vận hành.\n3. Truy vết ngược giúp khoanh vùng khi có lỗi.",
      "en": "1. Record a lot or serial number for finished goods.\n2. Link it to material lots, machines, shifts and operators.\n3. Backward tracing narrows the scope when a defect appears."
    },
    "practicalExample": {
      "vi": "Lô thành phẩm L-240 liên kết với lô nguyên liệu N-18 và máy M3, giúp chỉ thu hồi đúng 200 sản phẩm.",
      "en": "Finished lot L-240 is linked to material lot N-18 and machine M3, so only 200 units need recall."
    },
    "formula": [],
    "exercise": {
      "vi": "Muốn tìm lô nguyên liệu gây lỗi, bạn truy vết theo chiều nào?",
      "en": "To find the material lot that caused a defect, which direction do you trace?"
    },
    "answer": {
      "vi": "Ngược từ thành phẩm về nguyên liệu.",
      "en": "Backwards, from finished product to material."
    },
    "relatedTopics": []
  },
  {
    "slug": "ncr-capa",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "NCR (Non-Conformance Report) & CAPA (Corrective and Preventive Action): báo cáo không phù hợp và hành động khắc phục",
      "en": "NCR (Non-Conformance Report) & CAPA (Corrective and Preventive Action)"
    },
    "summary": {
      "vi": "NCR ghi nhận sự không phù hợp; CAPA gồm hành động khắc phục (nguyên nhân đã xảy ra) và phòng ngừa (ngăn tái diễn).",
      "en": "NCR records a non-conformance; CAPA covers corrective action (cause of what happened) and preventive action (stop recurrence elsewhere)."
    },
    "difficulty": "Advanced",
    "overview": {
      "vi": "Ghi NCR và xử lý CAPA đúng cách giúp lỗi không lặp lại và có bằng chứng khi kiểm tra.",
      "en": "Logging NCRs and running CAPA properly stops repeat defects and gives evidence at audits."
    },
    "objectives": [
      {
        "vi": "Phân biệt hành động khắc phục và phòng ngừa.",
        "en": "Distinguish corrective from preventive action."
      },
      {
        "vi": "Nêu các trường cơ bản của một NCR.",
        "en": "List the basic fields of an NCR."
      }
    ],
    "explanation": {
      "vi": "1. NCR (Non-Conformance Report): mô tả lỗi, vị trí, số lượng, người phát hiện.\n2. Corrective action: sửa nguyên nhân đã gây ra lỗi.\n3. Preventive action: ngăn lỗi tương tự xảy ra ở nơi khác hoặc sản phẩm khác.",
      "en": "1. NCR (Non-Conformance Report): describes the defect, location, quantity and who found it.\n2. Corrective action: fix the cause that produced the defect.\n3. Preventive action: stop similar defects elsewhere or on other products."
    },
    "practicalExample": {
      "vi": "Lỗi ren ở lô 500 sản phẩm: NCR ghi lô đã cách ly, khắc phục là chỉnh máy ren, phòng ngừa là thêm kiểm tra ren ở mọi máy.",
      "en": "Thread defect in a 500-unit lot: the NCR records quarantine; corrective action is adjusting the tapping machine; preventive action is a thread check on every machine."
    },
    "formula": [],
    "exercise": {
      "vi": "Thêm kiểm tra ren ở máy khác là hành động gì?",
      "en": "Adding a thread check on other machines is which action?"
    },
    "answer": {
      "vi": "Preventive action (phòng ngừa).",
      "en": "Preventive action."
    },
    "relatedTopics": []
  },
  {
    "slug": "production-planning",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Production Planning: lập kế hoạch sản xuất",
      "en": "Production Planning: plan output"
    },
    "summary": {
      "vi": "Lập kế hoạch sản xuất chuyển dự báo và đơn hàng thành kế hoạch sản lượng theo tuần hoặc tháng, có so với năng lực.",
      "en": "Production planning turns forecast and orders into output plans by week or month, checked against capacity."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Kế hoạch sản xuất trả lời câu hỏi: làm gì, bao nhiêu, khi nào, với nguồn lực nào.",
      "en": "The plan answers: what, how much, when and with which resources."
    },
    "objectives": [
      {
        "vi": "Chuyển nhu cầu thành kế hoạch sản lượng.",
        "en": "Turn demand into an output plan."
      },
      {
        "vi": "So kế hoạch với năng lực.",
        "en": "Check the plan against capacity."
      }
    ],
    "explanation": {
      "vi": "1. Đầu vào: dự báo, đơn hàng, tồn kho thành phẩm.\n2. Tính nhu cầu sản xuất = nhu cầu − tồn kho hiện có.\n3. So với năng lực để phát hiện thiếu hoặc thừa.",
      "en": "1. Inputs: forecast, orders, finished-goods stock.\n2. Production need = demand − stock on hand.\n3. Compare with capacity to find shortfalls or surplus."
    },
    "practicalExample": {
      "vi": "Nhu cầu tháng 10.000 sản phẩm, tồn kho 2.000: sản xuất cần 8.000.",
      "en": "October demand is 10,000 units, stock 2,000: production needs 8,000."
    },
    "formula": [],
    "exercise": {
      "vi": "Nhu cầu 5.000, tồn kho 1.200. Cần sản xuất bao nhiêu?",
      "en": "Demand 5,000, stock 1,200. How much must be produced?"
    },
    "answer": {
      "vi": "3.800.",
      "en": "3,800."
    },
    "relatedTopics": []
  },
  {
    "slug": "production-scheduling",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Production Scheduling: lập lịch sản xuất chi tiết",
      "en": "Production Scheduling: detailed sequencing"
    },
    "summary": {
      "vi": "Lập lịch là xếp thứ tự lệnh sản xuất lên máy và người theo ngày hoặc ca.",
      "en": "Scheduling sequences work orders on machines and people by day or shift."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Lịch chi tiết biến kế hoạch thành việc làm cụ thể cho từng máy và từng ca.",
      "en": "A detailed schedule turns the plan into concrete work for each machine and shift."
    },
    "objectives": [
      {
        "vi": "Xếp thứ tự lệnh theo ưu tiên.",
        "en": "Sequence orders by priority."
      },
      {
        "vi": "Nhận biết xung đột về máy.",
        "en": "Spot machine conflicts."
      }
    ],
    "explanation": {
      "vi": "1. Xếp lệnh theo ngày giao, ưu tiên và thời gian chuyển đổi.\n2. Gom các lệnh cùng sản phẩm để giảm chuyển đổi.\n3. Kiểm tra máy và người có sẵn sàng không.",
      "en": "1. Sequence orders by due date, priority and changeover time.\n2. Group orders of the same product to reduce changeovers.\n3. Check machines and people are available."
    },
    "practicalExample": {
      "vi": "Hai lệnh cùng sản phẩm xếp liền nhau, giảm một lần chuyển đổi 40 phút.",
      "en": "Two orders of the same product run back to back, saving one 40-minute changeover."
    },
    "formula": [],
    "exercise": {
      "vi": "Vì sao gom lệnh cùng sản phẩm lại có lợi?",
      "en": "Why does grouping orders of the same product help?"
    },
    "answer": {
      "vi": "Giảm số lần chuyển đổi và thời gian mất.",
      "en": "It reduces the number of changeovers and lost time."
    },
    "relatedTopics": []
  },
  {
    "slug": "capacity-planning",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Capacity Planning: hoạch định năng lực",
      "en": "Capacity Planning: match capacity to demand"
    },
    "summary": {
      "vi": "Hoạch định năng lực so sánh nhu cầu giờ máy hoặc giờ công với năng lực hiện có.",
      "en": "Capacity planning compares machine or labour hours needed with the hours available."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Thiếu năng lực làm trễ đơn, thừa năng lực làm lãng phí chi phí cố định.",
      "en": "Too little capacity makes orders late; too much wastes fixed cost."
    },
    "objectives": [
      {
        "vi": "Tính số máy hoặc người cần thiết.",
        "en": "Calculate the number of machines or people needed."
      },
      {
        "vi": "Nhận biết khi nào cần làm thêm ca.",
        "en": "Recognize when extra shifts are needed."
      }
    ],
    "explanation": {
      "vi": "1. Nhu cầu giờ máy = số sản phẩm × thời gian chu kỳ.\n2. Năng lực một máy = thời gian khả dụng mỗi tháng.\n3. Số máy cần = nhu cầu ÷ năng lực mỗi máy, làm tròn lên.",
      "en": "1. Machine hours needed = units × cycle time.\n2. Capacity of one machine = available hours per month.\n3. Machines needed = need ÷ capacity per machine, rounded up."
    },
    "practicalExample": {
      "vi": "Nhu cầu 1.200 giờ máy mỗi tháng, mỗi máy có 200 giờ khả dụng: cần 6 máy.",
      "en": "Need 1,200 machine hours per month, each machine 200 available hours: 6 machines needed."
    },
    "formula": [],
    "exercise": {
      "vi": "Nhu cầu 900 giờ, mỗi máy 200 giờ. Cần bao nhiêu máy?",
      "en": "Need 900 hours, each machine 200 hours. How many machines are needed?"
    },
    "answer": {
      "vi": "900 ÷ 200 = 4,5, làm tròn lên thành 5 máy.",
      "en": "900 ÷ 200 = 4.5, rounded up to 5 machines."
    },
    "relatedTopics": []
  },
  {
    "slug": "line-balancing",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Line Balancing: cân bằng chuyền",
      "en": "Line Balancing: even out the work across stations"
    },
    "summary": {
      "vi": "Cân bằng chuyền phân công công việc đều giữa các trạm để không trạm nào quá tải hay nhàn rỗi.",
      "en": "Line balancing assigns work evenly across stations so none is overloaded or idle."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Chuyền không cân bằng có một trạm chậm, các trạm khác phải đợi.",
      "en": "An unbalanced line has one slow station while the others wait."
    },
    "objectives": [
      {
        "vi": "Tính hiệu suất cân bằng chuyền.",
        "en": "Calculate line balance efficiency."
      },
      {
        "vi": "Xác định trạm nghẽn.",
        "en": "Identify the bottleneck station."
      }
    ],
    "explanation": {
      "vi": "1. Hiệu suất cân bằng = tổng thời gian công việc ÷ (số trạm × thời gian chu kỳ lớn nhất) × 100%.\n2. Cycle time của chuyền là thời gian trạm chậm nhất.\n3. Mục tiêu: đưa mọi trạm về gần takt time.",
      "en": "1. Balance efficiency = total work time ÷ (number of stations × largest station time) × 100%.\n2. The line cycle time is set by the slowest station.\n3. Goal: bring every station close to takt time."
    },
    "practicalExample": {
      "vi": "4 trạm, tổng thời gian 36 phút, trạm chậm nhất 10 phút: hiệu suất = 36 ÷ 40 = 90%.",
      "en": "4 stations, total work 36 minutes, slowest station 10 minutes: efficiency = 36 ÷ 40 = 90%."
    },
    "formula": [],
    "exercise": {
      "vi": "3 trạm, tổng thời gian 24 phút, trạm chậm nhất 9 phút. Hiệu suất là bao nhiêu?",
      "en": "3 stations, total work 24 minutes, slowest station 9 minutes. What is the efficiency?"
    },
    "answer": {
      "vi": "24 ÷ 27 ≈ 88,9%.",
      "en": "24 ÷ 27 ≈ 88.9%."
    },
    "relatedTopics": []
  },
  {
    "slug": "bottleneck-analysis",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Bottleneck Analysis: phân tích điểm nghẽn",
      "en": "Bottleneck Analysis: find the constraint"
    },
    "summary": {
      "vi": "Điểm nghẽn là công đoạn có năng lực thấp nhất, quyết định sản lượng của cả dây chuyền.",
      "en": "The bottleneck is the step with the lowest capacity, which sets output for the whole line."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Cải tiến công đoạn không phải nghẽn không làm tăng sản lượng toàn chuyền.",
      "en": "Improving a step that is not the bottleneck does not raise line output."
    },
    "objectives": [
      {
        "vi": "Xác định điểm nghẽn từ năng lực các công đoạn.",
        "en": "Find the bottleneck from step capacities."
      },
      {
        "vi": "Giải thích vì sao cải tiến điểm nghẽn có lợi nhất.",
        "en": "Explain why improving the bottleneck pays most."
      }
    ],
    "explanation": {
      "vi": "1. Năng lực mỗi công đoạn = số sản phẩm mỗi giờ.\n2. Công đoạn có năng lực thấp nhất là điểm nghẽn.\n3. Tăng năng lực điểm nghẽn sẽ tăng sản lượng của cả chuyền.",
      "en": "1. Capacity of each step = units per hour.\n2. The step with the lowest capacity is the bottleneck.\n3. Raising bottleneck capacity raises the whole line's output."
    },
    "practicalExample": {
      "vi": "Ba công đoạn năng lực 60, 45 và 70 sản phẩm mỗi giờ: điểm nghẽn là công đoạn 45, sản lượng chuyền là 45.",
      "en": "Three steps with capacities 60, 45 and 70 units per hour: the bottleneck is 45, so line output is 45."
    },
    "formula": [],
    "exercise": {
      "vi": "Công đoạn nào là điểm nghẽn nếu năng lực là 80, 52, 64?",
      "en": "Which step is the bottleneck with capacities 80, 52 and 64?"
    },
    "answer": {
      "vi": "Công đoạn có 52.",
      "en": "The step with 52."
    },
    "relatedTopics": []
  },
  {
    "slug": "wip",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "WIP (Work In Process): sản phẩm dở dang",
      "en": "WIP (Work In Process)"
    },
    "summary": {
      "vi": "WIP (Work in Process) là sản phẩm đang nằm giữa các công đoạn, chưa hoàn thành.",
      "en": "WIP is product between steps that is not yet finished."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "WIP lớn làm lead time dài và che giấu vấn đề. Định luật Little liên hệ WIP, sản lượng và lead time.",
      "en": "High WIP stretches lead time and hides problems. Little's Law links WIP, throughput and lead time."
    },
    "objectives": [
      {
        "vi": "Tính WIP theo định luật Little.",
        "en": "Calculate WIP with Little's Law."
      },
      {
        "vi": "Hiểu tác động của WIP lên lead time.",
        "en": "Understand how WIP affects lead time."
      }
    ],
    "explanation": {
      "vi": "1. Little's Law: WIP = Throughput × Lead Time.\n2. Throughput là sản lượng mỗi đơn vị thời gian.\n3. Giảm WIP sẽ giảm lead time khi sản lượng giữ nguyên.",
      "en": "1. Little's Law: WIP = Throughput × Lead Time.\n2. Throughput is output per unit of time.\n3. With the same throughput, lower WIP means shorter lead time."
    },
    "practicalExample": {
      "vi": "Sản lượng 50 sản phẩm mỗi giờ, lead time 4 giờ: WIP = 200.",
      "en": "Throughput 50 units per hour, lead time 4 hours: WIP = 200."
    },
    "formula": [],
    "exercise": {
      "vi": "Sản lượng 30 mỗi giờ, lead time 6 giờ. WIP là bao nhiêu?",
      "en": "Throughput 30 per hour, lead time 6 hours. What is the WIP?"
    },
    "answer": {
      "vi": "180.",
      "en": "180."
    },
    "relatedTopics": []
  },
  {
    "slug": "work-order",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Work Order: quản lý lệnh sản xuất",
      "en": "Work Order: managing production orders"
    },
    "summary": {
      "vi": "Lệnh sản xuất ghi sản phẩm, số lượng, thời gian, công thức và trạng thái thực hiện.",
      "en": "A work order records product, quantity, timing, bill of materials and status."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Lệnh sản xuất là đơn vị theo dõi chính trên xưởng. Mỗi lệnh có một mã duy nhất.",
      "en": "The work order is the main tracking unit on the shop floor. Each has a unique code."
    },
    "objectives": [
      {
        "vi": "Liệt kê các trường chính của một lệnh sản xuất.",
        "en": "List the main fields of a work order."
      },
      {
        "vi": "Theo dõi trạng thái một lệnh.",
        "en": "Track the status of one order."
      }
    ],
    "explanation": {
      "vi": "1. Các trường chính: mã lệnh, sản phẩm, số lượng, ngày bắt đầu và kết thúc, BOM.\n2. Trạng thái: chờ, đang chạy, hoàn thành, đóng.\n3. So sánh số lượng thực tế với kế hoạch để đánh giá.",
      "en": "1. Main fields: order code, product, quantity, start and end dates, BOM.\n2. Statuses: waiting, running, completed, closed.\n3. Compare actual quantity with plan."
    },
    "practicalExample": {
      "vi": "Lệnh WO-1025: 800 sản phẩm, đã làm 620, trạng thái đang chạy.",
      "en": "Order WO-1025: 800 units, 620 done, status running."
    },
    "formula": [],
    "exercise": {
      "vi": "Lệnh WO-1025 còn bao nhiêu sản phẩm cần làm?",
      "en": "How many units are still to make on WO-1025?"
    },
    "answer": {
      "vi": "800 − 620 = 180.",
      "en": "800 − 620 = 180."
    },
    "relatedTopics": []
  },
  {
    "slug": "changeover",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Changeover: chuyển đổi sản phẩm",
      "en": "Changeover: switching between products"
    },
    "summary": {
      "vi": "Chuyển đổi là thời gian từ sản phẩm tốt cuối cùng của lô cũ đến sản phẩm tốt đầu tiên của lô mới.",
      "en": "Changeover is the time from the last good unit of the old run to the first good unit of the new one."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Thời gian chuyển đổi là thời gian máy không làm sản phẩm, cần đo và giảm.",
      "en": "Changeover time is time the machine makes no product, so it must be measured and reduced."
    },
    "objectives": [
      {
        "vi": "Tính tổng thời gian chuyển đổi mỗi ngày.",
        "en": "Calculate total changeover time per day."
      },
      {
        "vi": "Liên hệ chuyển đổi với SMED.",
        "en": "Link changeover to SMED."
      }
    ],
    "explanation": {
      "vi": "1. Đo từ sản phẩm tốt cuối cùng đến sản phẩm tốt đầu tiên.\n2. Tổng thời gian chuyển đổi = số lần chuyển × thời gian mỗi lần.\n3. Giảm thời gian bằng SMED.",
      "en": "1. Measure from the last good unit to the first good unit.\n2. Total changeover time = number of changeovers × time each.\n3. Reduce the time with SMED."
    },
    "practicalExample": {
      "vi": "3 lần chuyển mỗi ngày, mỗi lần 40 phút: mất 120 phút mỗi ngày.",
      "en": "3 changeovers per day at 40 minutes each: 120 minutes lost per day."
    },
    "formula": [],
    "exercise": {
      "vi": "4 lần chuyển, mỗi lần 25 phút. Tổng thời gian mất là bao nhiêu?",
      "en": "4 changeovers at 25 minutes each. How much time is lost?"
    },
    "answer": {
      "vi": "100 phút.",
      "en": "100 minutes."
    },
    "relatedTopics": []
  },
  {
    "slug": "material-planning",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Material Planning: hoạch định nguyên vật liệu",
      "en": "Material Planning: plan materials"
    },
    "summary": {
      "vi": "MRP tính nhu cầu nguyên vật liệu từ kế hoạch thành phẩm, BOM và tồn kho hiện có.",
      "en": "MRP calculates material need from the finished-goods plan, BOM and stock on hand."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Hoạch định nguyên vật liệu giúp mua đúng lượng, không thiếu hàng và không tồn thừa.",
      "en": "Material planning buys the right amount, avoiding shortages and excess stock."
    },
    "objectives": [
      {
        "vi": "Tính nhu cầu mua nguyên vật liệu.",
        "en": "Calculate the material purchase need."
      },
      {
        "vi": "Hiểu vai trò của BOM.",
        "en": "Understand the role of the BOM."
      }
    ],
    "explanation": {
      "vi": "1. Nhu cầu nguyên vật liệu = số thành phẩm × định mức (BOM).\n2. Cần mua = nhu cầu − tồn kho − hàng đang về.\n3. BOM (bill of materials) là danh sách nguyên vật liệu cho một sản phẩm.",
      "en": "1. Material need = finished units × BOM quantity.\n2. Buy = need − stock on hand − on order.\n3. The BOM (bill of materials) lists materials per product."
    },
    "practicalExample": {
      "vi": "500 sản phẩm, mỗi sản phẩm 2 kg: nhu cầu 1.000 kg. Tồn 300 kg, đang về 0 kg: cần mua 700 kg.",
      "en": "500 units at 2 kg each: need 1,000 kg. Stock 300 kg, none on order: buy 700 kg."
    },
    "formula": [],
    "exercise": {
      "vi": "400 sản phẩm, mỗi sản phẩm 3 kg. Tồn 500 kg, đang về 200 kg. Cần mua bao nhiêu?",
      "en": "400 units at 3 kg each. Stock 500 kg, 200 kg on order. How much to buy?"
    },
    "answer": {
      "vi": "1.200 − 500 − 200 = 500 kg.",
      "en": "1,200 − 500 − 200 = 500 kg."
    },
    "relatedTopics": []
  },
  {
    "slug": "production-control",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Production Control: kiểm soát sản xuất",
      "en": "Production Control: track plan vs actual"
    },
    "summary": {
      "vi": "Kiểm soát sản xuất so sánh kế hoạch và thực tế theo ngày, rồi xử lý chênh lệch.",
      "en": "Production control compares plan and actual daily, then deals with the gap."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Kiểm soát sản xuất giúp phát hiện trễ sớm trong ca, thay vì biết khi đã muộn.",
      "en": "It catches delays during the shift, rather than learning about them too late."
    },
    "objectives": [
      {
        "vi": "Tính chênh lệch kế hoạch và thực tế.",
        "en": "Calculate the gap between plan and actual."
      },
      {
        "vi": "Đề xuất hành động khi chênh lệch.",
        "en": "Propose action for a gap."
      }
    ],
    "explanation": {
      "vi": "1. Chênh lệch = thực tế − kế hoạch.\n2. Âm nghĩa là thiếu sản lượng so với kế hoạch.\n3. Ghi lý do và hành động cho mọi chênh lệch đáng kể.",
      "en": "1. Gap = actual − plan.\n2. A negative gap means output is below plan.\n3. Record the reason and action for each significant gap."
    },
    "practicalExample": {
      "vi": "Kế hoạch 500, thực tế 470: chênh lệch −30, nguyên nhân dừng máy 30 phút do thiếu dao.",
      "en": "Plan 500, actual 470: gap −30, caused by a 30-minute stop waiting for a tool."
    },
    "formula": [],
    "exercise": {
      "vi": "Kế hoạch 600, thực tế 630. Chênh lệch là bao nhiêu?",
      "en": "Plan 600, actual 630. What is the gap?"
    },
    "answer": {
      "vi": "+30.",
      "en": "+30."
    },
    "relatedTopics": []
  },
  {
    "slug": "shopfloor-management",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Shopfloor Management: quản lý hiện trường",
      "en": "Shopfloor Management: run the floor with data"
    },
    "summary": {
      "vi": "Quản lý hiện trường dùng họp ngắn tại chỗ, bảng KPI và xử lý vấn đề theo ca.",
      "en": "Shopfloor management uses short standing meetings, KPI boards and shift problem-solving."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Quản lý hiện trường đưa thông tin và quyết định về gần nơi làm việc nhất.",
      "en": "It brings information and decisions close to where work happens."
    },
    "objectives": [
      {
        "vi": "Mô tả nhịp họp đầu ca.",
        "en": "Describe a start-of-shift meeting rhythm."
      },
      {
        "vi": "Liệt kê các thành phần của bảng KPI hiện trường.",
        "en": "List the parts of a shopfloor KPI board."
      }
    ],
    "explanation": {
      "vi": "1. Họp ngắn 10 đến 15 phút ở đầu ca, đứng trước bảng.\n2. Bảng KPI hiển thị sản lượng, chất lượng, an toàn và dừng máy.\n3. Vấn đề được ghi, giao người xử lý và có ngày hoàn thành.",
      "en": "1. A short meeting of 10 to 15 minutes at the start of the shift, standing at the board.\n2. The board shows output, quality, safety and stops.\n3. Problems are logged, assigned, and given a due date."
    },
    "practicalExample": {
      "vi": "Đầu ca, tổ trưởng xem bảng: dừng máy 40 phút ca trước, giao kỹ thuật kiểm tra cảm biến trong ngày.",
      "en": "At shift start the team leader reviews the board: 40 minutes of stops last shift; engineering is asked to check a sensor that day."
    },
    "formula": [],
    "exercise": {
      "vi": "Thời lượng họp hiện trường thường là bao lâu?",
      "en": "How long is a typical shopfloor meeting?"
    },
    "answer": {
      "vi": "Khoảng 10 đến 15 phút.",
      "en": "About 10 to 15 minutes."
    },
    "relatedTopics": []
  },
  {
    "slug": "time-study",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Time Study: nghiên cứu thời gian",
      "en": "Time Study: measuring work content"
    },
    "summary": {
      "vi": "Đo thời gian thực tế của công việc nhiều lần, điều chỉnh theo tốc độ làm việc và cộng hệ số nới lỏng.",
      "en": "Measure actual work time several times, adjust for pace, and add an allowance."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Nghiên cứu thời gian là nền tảng để đặt thời gian tiêu chuẩn cho công việc.",
      "en": "Time study is the base for setting standard times."
    },
    "objectives": [
      {
        "vi": "Mô tả các bước đo thời gian.",
        "en": "Describe the steps of a time study."
      },
      {
        "vi": "Tính thời gian bình thường từ thời gian đo.",
        "en": "Calculate normal time from observed time."
      }
    ],
    "explanation": {
      "vi": "1. Đo thời gian thực tế nhiều lần, lấy trung bình.\n2. Thời gian bình thường = thời gian quan sát × hệ số đánh giá tốc độ (rating).\n3. Thời gian chuẩn = thời gian bình thường × (1 + hệ số nới lỏng).",
      "en": "1. Measure actual time several times and average it.\n2. Normal time = observed time × rating factor.\n3. Standard time = normal time × (1 + allowance)."
    },
    "practicalExample": {
      "vi": "Thời gian quan sát trung bình 2 phút, rating 100%: thời gian bình thường 2 phút.",
      "en": "Observed average 2 minutes, rating 100%: normal time 2 minutes."
    },
    "formula": [],
    "exercise": {
      "vi": "Quan sát 2 phút, rating 110%. Thời gian bình thường là bao nhiêu?",
      "en": "Observed 2 minutes, rating 110%. What is the normal time?"
    },
    "answer": {
      "vi": "2 × 1,1 = 2,2 phút.",
      "en": "2 × 1.1 = 2.2 minutes."
    },
    "relatedTopics": []
  },
  {
    "slug": "motion-study",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Motion Study: nghiên cứu chuyển động",
      "en": "Motion Study: studying body movements"
    },
    "summary": {
      "vi": "Phân tích từng chuyển động của tay và cơ thể để loại bỏ động tác thừa.",
      "en": "Analyse each hand and body movement to remove unnecessary motions."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Nghiên cứu chuyển động tìm các động tác lãng phí trong thao tác, thường bằng quay video.",
      "en": "Motion study finds wasted movement in work methods, often with video."
    },
    "objectives": [
      {
        "vi": "Phân biệt động tác có ích và không có ích.",
        "en": "Distinguish useful from non-useful movements."
      },
      {
        "vi": "Đề xuất cách giảm động tác thừa.",
        "en": "Propose ways to reduce unnecessary movements."
      }
    ],
    "explanation": {
      "vi": "1. Quay video thao tác và chia thành các chuyển động nhỏ.\n2. Tìm chuyển động không cần thiết: đi lại, với, tìm kiếm.\n3. Sắp xếp lại để hai tay làm việc đồng thời khi có thể.",
      "en": "1. Video the task and break it into small motions.\n2. Find movements that are not needed: walking, reaching, searching.\n3. Rearrange so both hands work together when possible."
    },
    "practicalExample": {
      "vi": "Thợ phải đi 3 bước để lấy vít. Đặt khay vít trong tầm tay làm giảm còn 0 bước.",
      "en": "A worker takes 3 steps to get screws. Placing the tray within reach removes the 3 steps."
    },
    "formula": [],
    "exercise": {
      "vi": "Động tác 'tìm dụng cụ' thuộc loại nào?",
      "en": "Which type of movement is 'searching for a tool'?"
    },
    "answer": {
      "vi": "Động tác không có ích, cần loại bỏ hoặc giảm.",
      "en": "Non-useful movement, to be removed or reduced."
    },
    "relatedTopics": []
  },
  {
    "slug": "work-measurement",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Work Measurement: đo lường công việc",
      "en": "Work Measurement: measuring work"
    },
    "summary": {
      "vi": "Đo lường công việc là nhóm phương pháp để đặt thời gian chuẩn, gồm đo thời gian, MTM và lấy mẫu công việc.",
      "en": "Work measurement is a family of methods to set standard times, including time study, MTM and work sampling."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Đo lường công việc giúp lập kế hoạch nhân lực và đánh giá năng suất có cơ sở.",
      "en": "It supports manpower planning and productivity assessment with a clear basis."
    },
    "objectives": [
      {
        "vi": "Kể các phương pháp đo lường công việc.",
        "en": "List the work measurement methods."
      },
      {
        "vi": "Chọn phương pháp phù hợp với công việc.",
        "en": "Choose a method that fits the job."
      }
    ],
    "explanation": {
      "vi": "1. Đo thời gian (time study): dùng cho công việc lặp lại.\n2. MTM (Methods-Time Measurement): dùng hệ thống thời gian chuẩn cho từng chuyển động.\n3. Lấy mẫu công việc (work sampling): quan sát ngẫu nhiên để ước lượng tỷ lệ thời gian.",
      "en": "1. Time study: for repetitive tasks.\n2. MTM (Methods-Time Measurement): uses predetermined times for each motion.\n3. Work sampling: random observations to estimate the share of time spent."
    },
    "practicalExample": {
      "vi": "Công việc lắp ráp lặp lại mỗi phút dùng đo thời gian; công việc bảo trì không đều dùng lấy mẫu công việc.",
      "en": "Repetitive assembly every minute uses time study; irregular maintenance work uses work sampling."
    },
    "formula": [],
    "exercise": {
      "vi": "Công việc bảo trì không đều nên dùng phương pháp nào?",
      "en": "Which method suits irregular maintenance work?"
    },
    "answer": {
      "vi": "Lấy mẫu công việc (work sampling).",
      "en": "Work sampling."
    },
    "relatedTopics": []
  },
  {
    "slug": "standard-time",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Standard Time: thời gian tiêu chuẩn",
      "en": "Standard Time: the time allowed for a task"
    },
    "summary": {
      "vi": "Thời gian tiêu chuẩn là thời gian hợp lý để một người làm xong một đơn vị công việc, đã cộng hệ số nới lỏng.",
      "en": "Standard time is the reasonable time for one person to complete one unit of work, including allowances."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Thời gian chuẩn dùng để tính nhân lực, giá thành và đánh giá năng suất.",
      "en": "Standard time is used for manpower, costing and productivity measurement."
    },
    "objectives": [
      {
        "vi": "Tính thời gian chuẩn từ thời gian bình thường.",
        "en": "Calculate standard time from normal time."
      },
      {
        "vi": "Hiểu vai trò của hệ số nới lỏng.",
        "en": "Understand the role of the allowance."
      }
    ],
    "explanation": {
      "vi": "1. Thời gian chuẩn = thời gian bình thường × (1 + hệ số nới lỏng).\n2. Hệ số nới lỏng bù cho mệt mỏi, nhu cầu cá nhân, sự chậm trễ không tránh được.\n3. Thời gian chuẩn là mốc để so sánh với thực tế.",
      "en": "1. Standard time = normal time × (1 + allowance).\n2. The allowance covers fatigue, personal needs and unavoidable delays.\n3. Standard time is the benchmark to compare with actual."
    },
    "practicalExample": {
      "vi": "Thời gian bình thường 2 phút, nới lỏng 15%: thời gian chuẩn = 2 × 1,15 = 2,3 phút.",
      "en": "Normal time 2 minutes, allowance 15%: standard time = 2 × 1.15 = 2.3 minutes."
    },
    "formula": [],
    "exercise": {
      "vi": "Thời gian bình thường 3 phút, nới lỏng 10%. Thời gian chuẩn là bao nhiêu?",
      "en": "Normal time 3 minutes, allowance 10%. What is the standard time?"
    },
    "answer": {
      "vi": "3,3 phút.",
      "en": "3.3 minutes."
    },
    "relatedTopics": []
  },
  {
    "slug": "manpower-calculation",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Manpower Calculation: tính nhân lực",
      "en": "Manpower Calculation: how many people"
    },
    "summary": {
      "vi": "Tính số người cần dựa trên tổng thời gian chuẩn, thời gian làm việc khả dụng và hiệu suất.",
      "en": "Calculate the people needed from total standard time, available working time and efficiency."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Tính nhân lực đúng giúp tránh vừa thiếu người gây trễ, vừa thừa người gây lãng phí.",
      "en": "Right manpower avoids both delays from too few people and waste from too many."
    },
    "objectives": [
      {
        "vi": "Tính số người cần cho một chuyền.",
        "en": "Calculate the people needed for a line."
      },
      {
        "vi": "Giải thích các yếu tố ảnh hưởng đến số người.",
        "en": "Explain the factors that affect headcount."
      }
    ],
    "explanation": {
      "vi": "1. Số người = tổng thời gian chuẩn ÷ (thời gian làm việc khả dụng × hiệu suất).\n2. Hiệu suất thực tế thường dưới 100%.\n3. Làm tròn lên để đảm bảo đủ năng lực.",
      "en": "1. People = total standard time ÷ (available working time × efficiency).\n2. Actual efficiency is usually below 100%.\n3. Round up to make sure capacity is enough."
    },
    "practicalExample": {
      "vi": "Tổng thời gian chuẩn 1.200 phút/ngày, thời gian làm việc 480 phút, hiệu suất 85%: số người = 1.200 ÷ (480 × 0,85) ≈ 2,94, làm tròn lên thành 3.",
      "en": "Total standard time 1,200 minutes per day, 480 minutes available, efficiency 85%: people = 1,200 ÷ (480 × 0.85) ≈ 2.94, rounded up to 3."
    },
    "formula": [],
    "exercise": {
      "vi": "Tổng thời gian chuẩn 900 phút, làm việc 480 phút, hiệu suất 90%. Cần bao nhiêu người?",
      "en": "Total standard time 900 minutes, 480 minutes available, efficiency 90%. How many people?"
    },
    "answer": {
      "vi": "900 ÷ 432 ≈ 2,08, làm tròn lên thành 3 người.",
      "en": "900 ÷ 432 ≈ 2.08, rounded up to 3 people."
    },
    "relatedTopics": []
  },
  {
    "slug": "yamazumi",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Yamazumi Chart: biểu đồ phân bổ công việc",
      "en": "Yamazumi Chart: task-time stacked bars"
    },
    "summary": {
      "vi": "Yamazumi là biểu đồ cột xếp chồng, cho thấy thời gian mỗi trạm so với takt time.",
      "en": "A Yamazumi chart is a stacked bar chart showing each station's work time against takt time."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Yamazumi giúp nhìn nhanh trạm nào quá tải, trạm nào nhàn rỗi để cân bằng chuyền.",
      "en": "It shows overloaded and idle stations quickly, to guide line balancing."
    },
    "objectives": [
      {
        "vi": "Đọc biểu đồ Yamazumi.",
        "en": "Read a Yamazumi chart."
      },
      {
        "vi": "Xác định trạm cần cân bằng lại.",
        "en": "Find stations that need rebalancing."
      }
    ],
    "explanation": {
      "vi": "1. Mỗi cột là một trạm, mỗi màu là một công việc.\n2. Đường ngang là takt time.\n3. Cột vượt đường là trạm quá tải; cột thấp là trạm nhàn rỗi.",
      "en": "1. Each bar is a station; each colour is a task.\n2. The horizontal line is takt time.\n3. Bars above the line are overloaded; short bars are idle."
    },
    "practicalExample": {
      "vi": "Trạm 3 có tổng 2,6 phút, takt 2 phút: trạm 3 quá tải 0,6 phút, cần chuyển một công việc sang trạm 4.",
      "en": "Station 3 totals 2.6 minutes against a 2-minute takt: 0.6 minutes overloaded, so move one task to station 4."
    },
    "formula": [],
    "exercise": {
      "vi": "Trạm có tổng 1,5 phút, takt 2 phút. Trạm này thế nào?",
      "en": "A station totals 1.5 minutes against a 2-minute takt. How does it look?"
    },
    "answer": {
      "vi": "Nhàn rỗi 0,5 phút mỗi chu kỳ.",
      "en": "Idle 0.5 minutes per cycle."
    },
    "relatedTopics": []
  },
  {
    "slug": "workstation-design",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Workstation Design: thiết kế trạm làm việc",
      "en": "Workstation Design: arrange the station"
    },
    "summary": {
      "vi": "Thiết kế trạm sắp đặt dụng cụ, vật liệu và chiều cao làm việc để giảm di chuyển và mệt mỏi.",
      "en": "Workstation design arranges tools, material and working height to reduce movement and fatigue."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Trạm được thiết kế tốt giúp làm nhanh hơn, ít lỗi hơn và an toàn hơn.",
      "en": "A well-designed station is faster, has fewer errors and is safer."
    },
    "objectives": [
      {
        "vi": "Nêu các yếu tố thiết kế trạm.",
        "en": "List the elements of workstation design."
      },
      {
        "vi": "Áp dụng nguyên tắc vùng tầm với.",
        "en": "Apply the reach zone principle."
      }
    ],
    "explanation": {
      "vi": "1. Vùng tầm với: đặt thường dùng trong tầm tay, hiếm dùng ở xa hơn.\n2. Chiều cao bàn phù hợp với người vận hành.\n3. Luồng vật liệu theo một chiều, không quay lại.",
      "en": "1. Reach zones: frequently used items within arm's reach, rarely used items further away.\n2. Working height suited to the operator.\n3. One-way material flow, without backtracking."
    },
    "practicalExample": {
      "vi": "Đưa khay linh kiện vào vùng tầm với 40 cm giúp bỏ bước đi và giảm thời gian chu kỳ 3 giây.",
      "en": "Placing the parts tray within a 40 cm reach removes a walking step and cuts 3 seconds from the cycle."
    },
    "formula": [],
    "exercise": {
      "vi": "Dụng cụ dùng mỗi chu kỳ nên đặt ở đâu?",
      "en": "Where should a tool used every cycle be placed?"
    },
    "answer": {
      "vi": "Trong vùng tầm với, gần tay người vận hành.",
      "en": "Within the reach zone, near the operator's hand."
    },
    "relatedTopics": []
  },
  {
    "slug": "ergonomics",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Ergonomics: công thái học",
      "en": "Ergonomics: designing work for people"
    },
    "summary": {
      "vi": "Công thái học thiết kế công việc phù hợp với cơ thể người để giảm mệt mỏi và chấn thương.",
      "en": "Ergonomics designs work to suit the human body, reducing fatigue and injury."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Chấn thương cơ xương (MSD) là nguyên nhân nghỉ việc phổ biến. Thiết kế đúng giảm rủi ro và tăng năng suất.",
      "en": "Musculoskeletal disorders (MSD) are a common cause of absence. Good design lowers risk and raises productivity."
    },
    "objectives": [
      {
        "vi": "Nhận biết tư thế làm việc có rủi ro.",
        "en": "Recognize risky working postures."
      },
      {
        "vi": "Đề xuất cải thiện công thái học.",
        "en": "Propose ergonomic improvements."
      }
    ],
    "explanation": {
      "vi": "1. Tư thế: tránh cúi, vặn người, nâng vật nặng quá tầm.\n2. Lực và lặp lại: giảm lực cần thiết và số lần lặp.\n3. Thiết bị hỗ trợ: bàn nâng, tay đòn, ghế điều chỉnh.",
      "en": "1. Posture: avoid bending, twisting and lifting above shoulder height.\n2. Force and repetition: reduce required force and repeats.\n3. Assist devices: lift tables, balancers, adjustable chairs."
    },
    "practicalExample": {
      "vi": "Thợ phải cúi 60 độ hàng trăm lần mỗi ca: nâng bàn làm việc và đặt hàng lên cao hơn giảm tư thế cúi.",
      "en": "A worker bends 60 degrees hundreds of times per shift: raising the table and the parts rack reduces the bending."
    },
    "formula": [],
    "exercise": {
      "vi": "Tư thế cúi nhiều lần là rủi ro loại nào?",
      "en": "Repeated bending is which kind of risk?"
    },
    "answer": {
      "vi": "Rủi ro tư thế (chấn thương cơ xương).",
      "en": "Posture risk (musculoskeletal)."
    },
    "relatedTopics": []
  },
  {
    "slug": "capacity-calculation",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Capacity Calculation: tính công suất",
      "en": "Capacity Calculation: how much a line can make"
    },
    "summary": {
      "vi": "Công suất lý thuyết là số sản phẩm tối đa mỗi kỳ; công suất thực tế nhân thêm hiệu suất.",
      "en": "Theoretical capacity is the maximum output per period; actual capacity applies efficiency."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Tính công suất cho biết chuyền có thể làm bao nhiêu trong một kỳ, làm cơ sở cho kế hoạch.",
      "en": "Capacity calculation shows how much a line can produce in a period, the basis for planning."
    },
    "objectives": [
      {
        "vi": "Tính công suất lý thuyết của chuyền.",
        "en": "Calculate theoretical line capacity."
      },
      {
        "vi": "Tính công suất thực tế có xét OEE.",
        "en": "Calculate actual capacity using OEE."
      }
    ],
    "explanation": {
      "vi": "1. Công suất lý thuyết = số trạm × (thời gian khả dụng ÷ thời gian chu kỳ).\n2. Công suất thực tế = công suất lý thuyết × OEE (hoặc hiệu suất đã biết).\n3. Dùng công suất thực tế để lập kế hoạch.",
      "en": "1. Theoretical capacity = number of stations × (available time ÷ cycle time).\n2. Actual capacity = theoretical capacity × OEE (or known efficiency).\n3. Use actual capacity for planning."
    },
    "practicalExample": {
      "vi": "2 trạm, 480 phút khả dụng, chu kỳ 1 phút: lý thuyết = 2 × 480 = 960. OEE 80%: thực tế = 768.",
      "en": "2 stations, 480 minutes available, 1-minute cycle: theoretical = 2 × 480 = 960. At OEE 80%: actual = 768."
    },
    "formula": [],
    "exercise": {
      "vi": "3 trạm, 480 phút, chu kỳ 2 phút, OEE 75%. Công suất thực tế là bao nhiêu?",
      "en": "3 stations, 480 minutes, 2-minute cycle, OEE 75%. What is the actual capacity?"
    },
    "answer": {
      "vi": "3 × 240 × 0,75 = 540.",
      "en": "3 × 240 × 0.75 = 540."
    },
    "relatedTopics": []
  },
  {
    "slug": "labor-productivity",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Labor Productivity: năng suất lao động",
      "en": "Labor Productivity: output per labor hour"
    },
    "summary": {
      "vi": "Năng suất lao động là sản lượng chia cho số giờ công bỏ ra.",
      "en": "Labour productivity is output divided by labour hours used."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Năng suất lao động là chỉ số để so sánh hiệu quả giữa các ca, tổ và chuyền.",
      "en": "It compares shifts, teams and lines on a common basis."
    },
    "objectives": [
      {
        "vi": "Tính năng suất lao động.",
        "en": "Calculate labour productivity."
      },
      {
        "vi": "So sánh năng suất giữa các ca.",
        "en": "Compare productivity between shifts."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: Năng suất lao động = Sản lượng ÷ Số giờ công.\n2. Dùng cùng định nghĩa giờ công và cùng loại sản phẩm khi so sánh.\n3. Năng suất tăng khi tự động hóa hoặc cải tiến quy trình.",
      "en": "1. Formula: labour productivity = output ÷ labour hours.\n2. Use the same definition of hours and product when comparing.\n3. Productivity rises with automation or process improvement."
    },
    "practicalExample": {
      "vi": "Ca A làm 2.400 sản phẩm với 80 giờ công: 30 sản phẩm mỗi giờ công.",
      "en": "Shift A makes 2,400 units with 80 labour hours: 30 units per labour hour."
    },
    "formula": [],
    "exercise": {
      "vi": "Ca B làm 2.000 sản phẩm với 80 giờ công. Năng suất là bao nhiêu?",
      "en": "Shift B makes 2,000 units with 80 labour hours. What is the productivity?"
    },
    "answer": {
      "vi": "25 sản phẩm mỗi giờ công.",
      "en": "25 units per labour hour."
    },
    "relatedTopics": []
  },
  {
    "slug": "labor-cost",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Labor Cost: chi phí nhân công",
      "en": "Labor Cost: cost of people"
    },
    "summary": {
      "vi": "Chi phí nhân công là tổng chi phí trả cho người lao động trực tiếp và gián tiếp trong sản xuất.",
      "en": "Labour cost is the total paid to direct and indirect workers in production."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Chi phí nhân công là một trong ba thành phần chính của giá thành. Cần tách trực tiếp và gián tiếp để phân tích.",
      "en": "Labour cost is one of the three main cost elements. Split direct and indirect to analyse it."
    },
    "objectives": [
      {
        "vi": "Tính chi phí nhân công theo giờ.",
        "en": "Calculate labour cost per hour."
      },
      {
        "vi": "Phân biệt nhân công trực tiếp và gián tiếp.",
        "en": "Distinguish direct and indirect labour."
      }
    ],
    "explanation": {
      "vi": "1. Nhân công trực tiếp: người làm trên dây chuyền sản phẩm.\n2. Nhân công gián tiếp: quản lý, kiểm tra, bảo trì.\n3. Chi phí = số giờ × đơn giá giờ công (kể cả phụ cấp, bảo hiểm).",
      "en": "1. Direct labour: people working on the product.\n2. Indirect labour: supervision, inspection, maintenance.\n3. Cost = hours × hourly rate (including allowances and insurance)."
    },
    "practicalExample": {
      "vi": "10 người làm 8 giờ, đơn giá 40.000 đ mỗi giờ: chi phí = 10 × 8 × 40.000 = 3.200.000 đ mỗi ca.",
      "en": "10 people for 8 hours at 40,000 VND per hour: cost = 10 × 8 × 40,000 = 3,200,000 VND per shift."
    },
    "formula": [],
    "exercise": {
      "vi": "5 người làm 8 giờ, đơn giá 50.000 đ mỗi giờ. Chi phí là bao nhiêu?",
      "en": "5 people for 8 hours at 50,000 VND per hour. What is the cost?"
    },
    "answer": {
      "vi": "2.000.000 đ.",
      "en": "2,000,000 VND."
    },
    "relatedTopics": []
  },
  {
    "slug": "material-cost",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Material Cost: chi phí nguyên vật liệu",
      "en": "Material Cost: cost of materials"
    },
    "summary": {
      "vi": "Chi phí nguyên vật liệu là số lượng nguyên liệu sử dụng nhân với đơn giá, kể cả hao hụt.",
      "en": "Material cost is quantity used times unit price, including scrap and losses."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Nguyên vật liệu thường là phần lớn nhất của giá thành. Hao hụt làm tăng chi phí thực tế.",
      "en": "Materials are often the largest share of cost. Losses raise the actual cost."
    },
    "objectives": [
      {
        "vi": "Tính chi phí nguyên vật liệu cho một sản phẩm.",
        "en": "Calculate material cost per product."
      },
      {
        "vi": "Tính tác động của hao hụt.",
        "en": "Calculate the effect of losses."
      }
    ],
    "explanation": {
      "vi": "1. Chi phí = số lượng dùng × đơn giá.\n2. Số lượng dùng = định mức × (1 + tỷ lệ hao hụt).\n3. Hao hụt cao làm giá thành tăng dù đơn giá không đổi.",
      "en": "1. Cost = quantity used × unit price.\n2. Quantity used = standard quantity × (1 + loss rate).\n3. High loss raises cost even when unit price is unchanged."
    },
    "practicalExample": {
      "vi": "Định mức 2 kg, đơn giá 50.000 đ/kg, hao hụt 5%: chi phí = 2 × 1,05 × 50.000 = 105.000 đ.",
      "en": "Standard 2 kg, price 50,000 VND per kg, loss 5%: cost = 2 × 1.05 × 50,000 = 105,000 VND."
    },
    "formula": [],
    "exercise": {
      "vi": "Định mức 3 kg, đơn giá 20.000 đ/kg, hao hụt 10%. Chi phí là bao nhiêu?",
      "en": "Standard 3 kg, price 20,000 VND per kg, loss 10%. What is the cost?"
    },
    "answer": {
      "vi": "3 × 1,1 × 20.000 = 66.000 đ.",
      "en": "3 × 1.1 × 20,000 = 66,000 VND."
    },
    "relatedTopics": []
  },
  {
    "slug": "manufacturing-overhead",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Manufacturing Overhead: chi phí sản xuất chung",
      "en": "Manufacturing Overhead: indirect plant cost"
    },
    "summary": {
      "vi": "Chi phí sản xuất chung là các chi phí gián tiếp của nhà máy như điện, khấu hao, bảo trì và nhà xưởng.",
      "en": "Overhead is indirect plant cost such as power, depreciation, maintenance and building costs."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Chi phí chung phải được phân bổ vào sản phẩm, thường theo giờ máy hoặc giờ công.",
      "en": "Overhead must be allocated to products, usually by machine or labour hours."
    },
    "objectives": [
      {
        "vi": "Kể các khoản chi phí sản xuất chung.",
        "en": "List the main overhead costs."
      },
      {
        "vi": "Tính tỷ lệ phân bổ theo giờ máy.",
        "en": "Calculate an allocation rate per machine hour."
      }
    ],
    "explanation": {
      "vi": "1. Các khoản: điện, khấu hao máy, bảo trì, vật tư phụ, nhà xưởng.\n2. Tỷ lệ phân bổ = tổng chi phí chung ÷ tổng giờ máy (hoặc giờ công).\n3. Chi phí chung cho một sản phẩm = tỷ lệ × giờ máy dùng cho sản phẩm đó.",
      "en": "1. Items: power, machine depreciation, maintenance, consumables, building.\n2. Allocation rate = total overhead ÷ total machine (or labour) hours.\n3. Overhead for one product = rate × machine hours used on it."
    },
    "practicalExample": {
      "vi": "Chi phí chung 60 triệu, tổng 3.000 giờ máy: tỷ lệ 20.000 đ mỗi giờ máy. Sản phẩm dùng 0,5 giờ máy chịu 10.000 đ.",
      "en": "Overhead 60 million VND, total 3,000 machine hours: rate 20,000 VND per hour. A product using 0.5 hours carries 10,000 VND."
    },
    "formula": [],
    "exercise": {
      "vi": "Chi phí chung 90 triệu, tổng 4.500 giờ máy. Tỷ lệ là bao nhiêu mỗi giờ?",
      "en": "Overhead 90 million VND, total 4,500 machine hours. What is the rate per hour?"
    },
    "answer": {
      "vi": "20.000 đ mỗi giờ máy.",
      "en": "20,000 VND per machine hour."
    },
    "relatedTopics": []
  },
  {
    "slug": "conversion-cost",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Conversion Cost: chi phí chuyển đổi",
      "en": "Conversion Cost: cost to transform material"
    },
    "summary": {
      "vi": "Chi phí chuyển đổi là chi phí biến nguyên liệu thành thành phẩm: nhân công trực tiếp cộng chi phí sản xuất chung.",
      "en": "Conversion cost is the cost of turning material into product: direct labour plus overhead."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Chi phí chuyển đổi cho biết chi phí để làm việc với nguyên liệu, không tính nguyên liệu.",
      "en": "Conversion cost shows what it costs to process material, excluding the material itself."
    },
    "objectives": [
      {
        "vi": "Tính chi phí chuyển đổi.",
        "en": "Calculate conversion cost."
      },
      {
        "vi": "So sánh chi phí chuyển đổi giữa hai chuyền.",
        "en": "Compare conversion cost between two lines."
      }
    ],
    "explanation": {
      "vi": "1. Chi phí chuyển đổi = nhân công trực tiếp + sản xuất chung.\n2. Không tính chi phí nguyên vật liệu.\n3. Dùng để so sánh hiệu quả vận hành giữa các nhà máy hoặc chuyền.",
      "en": "1. Conversion cost = direct labour + manufacturing overhead.\n2. Material cost is excluded.\n3. Used to compare operating efficiency between plants or lines."
    },
    "practicalExample": {
      "vi": "Nhân công trực tiếp 40 triệu, sản xuất chung 25 triệu: chi phí chuyển đổi = 65 triệu.",
      "en": "Direct labour 40 million VND, overhead 25 million VND: conversion cost = 65 million VND."
    },
    "formula": [],
    "exercise": {
      "vi": "Nhân công trực tiếp 30 triệu, sản xuất chung 18 triệu. Chi phí chuyển đổi là bao nhiêu?",
      "en": "Direct labour 30 million VND, overhead 18 million VND. What is the conversion cost?"
    },
    "answer": {
      "vi": "48 triệu.",
      "en": "48 million VND."
    },
    "relatedTopics": []
  },
  {
    "slug": "cost-per-unit",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Cost per Unit: chi phí trên mỗi sản phẩm",
      "en": "Cost per Unit: cost of each product"
    },
    "summary": {
      "vi": "Chi phí đơn vị là tổng chi phí chia cho số lượng sản phẩm.",
      "en": "Cost per unit is total cost divided by the number of units produced."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Chi phí đơn vị là chỉ số giá thành cơ bản để định giá và so sánh cải tiến.",
      "en": "Cost per unit is the basic cost metric for pricing and for judging improvements."
    },
    "objectives": [
      {
        "vi": "Tính chi phí đơn vị.",
        "en": "Calculate cost per unit."
      },
      {
        "vi": "Hiểu vì sao tăng sản lượng làm giảm chi phí đơn vị.",
        "en": "Understand why higher volume lowers unit cost."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: Chi phí đơn vị = Tổng chi phí ÷ Số lượng sản phẩm.\n2. Chi phí cố định chia cho nhiều sản phẩm hơn khi sản lượng tăng.\n3. Chi phí biến đổi trên mỗi sản phẩm giữ nguyên.",
      "en": "1. Formula: cost per unit = total cost ÷ units produced.\n2. Fixed cost is spread over more units as volume rises.\n3. Variable cost per unit stays the same."
    },
    "practicalExample": {
      "vi": "Tổng chi phí 100 triệu, sản xuất 20.000 sản phẩm: chi phí đơn vị = 5.000 đ.",
      "en": "Total cost 100 million VND, 20,000 units: cost per unit = 5,000 VND."
    },
    "formula": [],
    "exercise": {
      "vi": "Tổng chi phí 120 triệu, sản xuất 24.000 sản phẩm. Chi phí đơn vị là bao nhiêu?",
      "en": "Total cost 120 million VND, 24,000 units. What is the cost per unit?"
    },
    "answer": {
      "vi": "5.000 đ.",
      "en": "5,000 VND."
    },
    "relatedTopics": []
  },
  {
    "slug": "scrap-cost",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Scrap Cost: chi phí phế phẩm",
      "en": "Scrap Cost: cost of scrapped product"
    },
    "summary": {
      "vi": "Chi phí phế phẩm là giá trị đã bỏ ra cho sản phẩm không dùng được và không bán được.",
      "en": "Scrap cost is the value already spent on units that cannot be sold or used."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Phế phẩm mất cả nguyên liệu và chi phí chuyển đổi đã tích lũy đến công đoạn bị loại.",
      "en": "Scrap loses the material and the conversion cost accumulated up to the step where it was removed."
    },
    "objectives": [
      {
        "vi": "Tính chi phí phế phẩm.",
        "en": "Calculate scrap cost."
      },
      {
        "vi": "Hiểu vì sao phế phẩm ở công đoạn cuối tốn kém hơn.",
        "en": "Understand why late-stage scrap costs more."
      }
    ],
    "explanation": {
      "vi": "1. Chi phí phế = số phế × (giá nguyên liệu + chi phí chuyển đổi đã tích lũy).\n2. Phế ở công đoạn cuối mất nhiều chi phí hơn phế ở đầu.\n3. Giảm phế ở đầu chuyền là cách rẻ nhất.",
      "en": "1. Scrap cost = scrapped units × (material cost + conversion cost accumulated).\n2. Scrap late in the line costs more than scrap at the start.\n3. Reducing scrap early in the line is the cheapest fix."
    },
    "practicalExample": {
      "vi": "50 sản phẩm phế, mỗi sản phẩm đã chịu 80.000 đ: chi phí phế = 4.000.000 đ.",
      "en": "50 scrapped units, each carrying 80,000 VND of cost: scrap cost = 4,000,000 VND."
    },
    "formula": [],
    "exercise": {
      "vi": "30 sản phẩm phế, mỗi sản phẩm đã chịu 120.000 đ. Chi phí phế là bao nhiêu?",
      "en": "30 scrapped units, each carrying 120,000 VND. What is the scrap cost?"
    },
    "answer": {
      "vi": "3.600.000 đ.",
      "en": "3,600,000 VND."
    },
    "relatedTopics": []
  },
  {
    "slug": "rework-cost",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Rework Cost: chi phí làm lại",
      "en": "Rework Cost: cost of fixing defects"
    },
    "summary": {
      "vi": "Chi phí làm lại là nhân công và vật tư bỏ thêm để sửa sản phẩm lỗi cho đạt.",
      "en": "Rework cost is the extra labour and material spent to bring defective product up to standard."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Làm lại tốn thời gian, nhân công và có thể làm giảm năng lực của chuyền.",
      "en": "Rework takes time and labour, and reduces line capacity."
    },
    "objectives": [
      {
        "vi": "Tính chi phí làm lại.",
        "en": "Calculate rework cost."
      },
      {
        "vi": "Liên hệ làm lại với FPY.",
        "en": "Connect rework to FPY."
      }
    ],
    "explanation": {
      "vi": "1. Chi phí làm lại = giờ làm lại × đơn giá giờ công + vật tư bổ sung.\n2. Làm lại không tính vào FPY, nhưng vẫn là chi phí thật.\n3. Giảm làm lại là cải tiến trực tiếp cho giá thành.",
      "en": "1. Rework cost = rework hours × labour rate + extra material.\n2. Rework does not count against FPY, but it is a real cost.\n3. Reducing rework is a direct cost improvement."
    },
    "practicalExample": {
      "vi": "20 sản phẩm làm lại, mỗi sản phẩm 0,25 giờ công với đơn giá 40.000 đ, vật tư 5.000 đ mỗi sản phẩm: chi phí = 20 × (0,25 × 40.000 + 5.000) = 300.000 đ.",
      "en": "20 reworked units, each 0.25 labour hours at 40,000 VND, plus 5,000 VND of material per unit: cost = 20 × (0.25 × 40,000 + 5,000) = 300,000 VND."
    },
    "formula": [],
    "exercise": {
      "vi": "10 sản phẩm làm lại, mỗi sản phẩm 0,5 giờ công với đơn giá 40.000 đ, không có vật tư. Chi phí là bao nhiêu?",
      "en": "10 reworked units, each 0.5 labour hours at 40,000 VND, no material. What is the cost?"
    },
    "answer": {
      "vi": "10 × 0,5 × 40.000 = 200.000 đ.",
      "en": "10 × 0.5 × 40,000 = 200,000 VND."
    },
    "relatedTopics": []
  },
  {
    "slug": "variance-analysis",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Variance Analysis: phân tích chênh lệch",
      "en": "Variance Analysis: explaining cost gaps"
    },
    "summary": {
      "vi": "Phân tích chênh lệch so sánh chi phí thực tế với chi phí chuẩn, tách thành chênh lệch giá và chênh lệch lượng.",
      "en": "Variance analysis compares actual with standard cost and splits the gap into price and quantity effects."
    },
    "difficulty": "Advanced",
    "overview": {
      "vi": "Chênh lệch cho biết chi phí tăng do giá mua đắt hơn hay do dùng nhiều nguyên liệu hơn.",
      "en": "It shows whether cost rose because material was dearer or because more was used."
    },
    "objectives": [
      {
        "vi": "Tính chênh lệch tổng.",
        "en": "Calculate the total variance."
      },
      {
        "vi": "Tách chênh lệch giá và lượng.",
        "en": "Split variance into price and quantity."
      }
    ],
    "explanation": {
      "vi": "1. Chênh lệch tổng = Chi phí thực tế − Chi phí chuẩn.\n2. Chênh lệch giá = (Giá thực tế − Giá chuẩn) × Lượng thực tế.\n3. Chênh lệch lượng = (Lượng thực tế − Lượng chuẩn) × Giá chuẩn.",
      "en": "1. Total variance = actual cost − standard cost.\n2. Price variance = (actual price − standard price) × actual quantity.\n3. Quantity variance = (actual quantity − standard quantity) × standard price."
    },
    "practicalExample": {
      "vi": "Chuẩn 2 kg × 50.000 đ; thực tế 2,2 kg × 52.000 đ. Chênh lệch giá = (52.000 − 50.000) × 2,2 = 4.400 đ. Chênh lệch lượng = (2,2 − 2) × 50.000 = 10.000 đ.",
      "en": "Standard 2 kg at 50,000 VND; actual 2.2 kg at 52,000 VND. Price variance = (52,000 − 50,000) × 2.2 = 4,400 VND. Quantity variance = (2.2 − 2) × 50,000 = 10,000 VND."
    },
    "formula": [],
    "exercise": {
      "vi": "Chuẩn 2 kg × 50.000 đ; thực tế 2 kg × 55.000 đ. Chênh lệch giá là bao nhiêu?",
      "en": "Standard 2 kg at 50,000 VND; actual 2 kg at 55,000 VND. What is the price variance?"
    },
    "answer": {
      "vi": "(55.000 − 50.000) × 2 = 10.000 đ.",
      "en": "(55,000 − 50,000) × 2 = 10,000 VND."
    },
    "relatedTopics": []
  },
  {
    "slug": "budget-vs-actual",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Budget vs Actual: ngân sách so với thực tế",
      "en": "Budget vs Actual: plan against spend"
    },
    "summary": {
      "vi": "So sánh ngân sách và thực tế cho biết chi tiêu vượt hoặc thấp hơn kế hoạch bao nhiêu phần trăm.",
      "en": "Comparing budget and actual shows how much spending is above or below plan, in percent."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Đây là cách kiểm soát chi phí định kỳ, giúp phát hiện sớm khi vượt ngân sách.",
      "en": "It is a regular cost control that catches overruns early."
    },
    "objectives": [
      {
        "vi": "Tính phần trăm chênh lệch so với ngân sách.",
        "en": "Calculate the percentage variance from budget."
      },
      {
        "vi": "Nêu hành động khi vượt ngân sách.",
        "en": "Propose action when over budget."
      }
    ],
    "explanation": {
      "vi": "1. Chênh lệch % = (Thực tế − Ngân sách) ÷ Ngân sách × 100%.\n2. Dương là vượt, âm là tiết kiệm.\n3. Cần giải thích nguyên nhân cho mọi khoản vượt đáng kể.",
      "en": "1. Variance % = (actual − budget) ÷ budget × 100%.\n2. Positive means over budget; negative means under.\n3. Explain the cause of every significant overrun."
    },
    "practicalExample": {
      "vi": "Ngân sách 500 triệu, thực tế 530 triệu: chênh lệch = 30 ÷ 500 = +6%.",
      "en": "Budget 500 million VND, actual 530 million VND: variance = 30 ÷ 500 = +6%."
    },
    "formula": [],
    "exercise": {
      "vi": "Ngân sách 200 triệu, thực tế 190 triệu. Chênh lệch là bao nhiêu phần trăm?",
      "en": "Budget 200 million VND, actual 190 million VND. What is the variance percentage?"
    },
    "answer": {
      "vi": "−5%.",
      "en": "−5%."
    },
    "relatedTopics": []
  },
  {
    "slug": "roi",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "ROI (Return on Investment): lợi nhuận trên vốn đầu tư",
      "en": "ROI (Return on Investment)"
    },
    "summary": {
      "vi": "ROI đo lợi ích thu được so với vốn bỏ ra cho một khoản đầu tư.",
      "en": "ROI measures the benefit gained relative to the money invested."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "ROI giúp so sánh các dự án cải tiến hoặc mua máy có lợi nhuận khác nhau.",
      "en": "ROI helps compare improvement projects or machine purchases with different returns."
    },
    "objectives": [
      {
        "vi": "Tính ROI của một khoản đầu tư.",
        "en": "Calculate the ROI of an investment."
      },
      {
        "vi": "So sánh hai dự án bằng ROI.",
        "en": "Compare two projects by ROI."
      }
    ],
    "explanation": {
      "vi": "1. ROI = (Lợi ích − Chi phí đầu tư) ÷ Chi phí đầu tư × 100%.\n2. Lợi ích là tổng tiết kiệm hoặc doanh thu tăng thêm trong thời gian tính.\n3. Cần thống nhất cùng khoảng thời gian khi so sánh.",
      "en": "1. ROI = (benefit − investment cost) ÷ investment cost × 100%.\n2. Benefit is total savings or added revenue over the period.\n3. Use the same period when comparing projects."
    },
    "practicalExample": {
      "vi": "Đầu tư 200 triệu, tiết kiệm 60 triệu mỗi năm trong 5 năm (tổng 300 triệu): ROI = (300 − 200) ÷ 200 = 50%.",
      "en": "Investment 200 million VND, savings 60 million VND per year for 5 years (300 million total): ROI = (300 − 200) ÷ 200 = 50%."
    },
    "formula": [],
    "exercise": {
      "vi": "Đầu tư 100 triệu, tiết kiệm 40 triệu mỗi năm trong 3 năm. ROI là bao nhiêu?",
      "en": "Investment 100 million VND, savings 40 million VND per year for 3 years. What is the ROI?"
    },
    "answer": {
      "vi": "(120 − 100) ÷ 100 = 20%.",
      "en": "(120 − 100) ÷ 100 = 20%."
    },
    "relatedTopics": []
  },
  {
    "slug": "preventive-maintenance",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Preventive Maintenance: bảo trì phòng ngừa",
      "en": "Preventive Maintenance: scheduled care"
    },
    "summary": {
      "vi": "Bảo trì phòng ngừa là bảo dưỡng theo lịch cố định, theo thời gian hoặc số giờ chạy, trước khi hỏng.",
      "en": "Preventive maintenance is scheduled servicing by time or running hours, done before failure."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Bảo trì phòng ngừa giảm hỏng đột ngột, nhưng có thể thay linh kiện còn dùng được.",
      "en": "It reduces sudden breakdowns, but may replace parts that still have life."
    },
    "objectives": [
      {
        "vi": "Nêu cách lập lịch bảo trì phòng ngừa.",
        "en": "Describe how to set a PM schedule."
      },
      {
        "vi": "Phân biệt bảo trì phòng ngừa với bảo trì dự báo.",
        "en": "Distinguish PM from predictive maintenance."
      }
    ],
    "explanation": {
      "vi": "1. Lịch dựa trên thời gian (mỗi tháng) hoặc số giờ chạy (mỗi 500 giờ).\n2. Công việc: vệ sinh, bôi trơn, thay phụ tùng hao mòn.\n3. Ghi lại lịch sử để điều chỉnh tần suất.",
      "en": "1. Schedule by time (monthly) or running hours (every 500 hours).\n2. Tasks: cleaning, lubrication, replacing worn parts.\n3. Keep history to adjust the frequency."
    },
    "practicalExample": {
      "vi": "Máy chạy 500 giờ thì thay dây đai, vệ sinh và bôi trơn theo lịch.",
      "en": "After every 500 running hours, the belt is replaced and the machine is cleaned and lubricated."
    },
    "formula": [],
    "exercise": {
      "vi": "Lịch bảo trì dựa trên số giờ chạy là loại bảo trì nào?",
      "en": "A schedule based on running hours is which type of maintenance?"
    },
    "answer": {
      "vi": "Bảo trì phòng ngừa (PM).",
      "en": "Preventive maintenance (PM)."
    },
    "relatedTopics": []
  },
  {
    "slug": "predictive-maintenance",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Predictive Maintenance: bảo trì dự báo",
      "en": "Predictive Maintenance: act on condition"
    },
    "summary": {
      "vi": "Bảo trì dự báo theo dõi tình trạng máy (rung, nhiệt, dầu) và sửa khi có dấu hiệu sắp hỏng.",
      "en": "Predictive maintenance tracks machine condition (vibration, heat, oil) and acts when signs of failure appear."
    },
    "difficulty": "Advanced",
    "overview": {
      "vi": "Bảo trì dự báo chỉ làm khi cần, nhờ dữ liệu cảm biến và phân tích xu hướng.",
      "en": "It works only when needed, using sensor data and trend analysis."
    },
    "objectives": [
      {
        "vi": "Nêu các chỉ số tình trạng thường theo dõi.",
        "en": "List the condition indicators often tracked."
      },
      {
        "vi": "Giải thích khi nào nên dùng bảo trì dự báo.",
        "en": "Explain when predictive maintenance is worth it."
      }
    ],
    "explanation": {
      "vi": "1. Chỉ số: độ rung, nhiệt độ ổ bi, mức dầu, dòng điện.\n2. Đặt ngưỡng cảnh báo và ngưỡng dừng máy.\n3. Khi giá trị xu hướng tăng dần, lập kế hoạch sửa trước khi hỏng.",
      "en": "1. Indicators: vibration, bearing temperature, oil level, current draw.\n2. Set alarm and stop thresholds.\n3. When a trend rises steadily, plan the repair before failure."
    },
    "practicalExample": {
      "vi": "Độ rung ổ bi tăng từ 2 lên 4,5 mm/s qua 3 tuần, vượt ngưỡng cảnh báo 4: lập lịch thay ổ bi ở lần dừng kế tiếp.",
      "en": "Bearing vibration rises from 2 to 4.5 mm/s over three weeks, above an alarm of 4: schedule the bearing change at the next stop."
    },
    "formula": [],
    "exercise": {
      "vi": "Độ rung vượt ngưỡng cảnh báo nghĩa là gì?",
      "en": "What does a vibration above the alarm threshold mean?"
    },
    "answer": {
      "vi": "Cần lập kế hoạch kiểm tra và sửa sớm, trước khi hỏng.",
      "en": "Plan an early inspection and repair before failure."
    },
    "relatedTopics": []
  },
  {
    "slug": "corrective-maintenance",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Corrective Maintenance: bảo trì sửa chữa",
      "en": "Corrective Maintenance: fix and record"
    },
    "summary": {
      "vi": "Bảo trì sửa chữa là sửa máy sau khi phát hiện lỗi hoặc bất thường, có kế hoạch để sửa đúng nguyên nhân.",
      "en": "Corrective maintenance repairs equipment after a fault or abnormality is found, planned so the cause is fixed."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Sửa chữa có kế hoạch khác với sửa khi hỏng: có thời gian chuẩn bị, phụ tùng và người.",
      "en": "Planned repair differs from emergency repair: there is time to prepare parts and people."
    },
    "objectives": [
      {
        "vi": "Phân biệt sửa chữa có kế hoạch và đột xuất.",
        "en": "Distinguish planned from emergency repair."
      },
      {
        "vi": "Ghi nhận đúng công việc sửa chữa.",
        "en": "Record repair work correctly."
      }
    ],
    "explanation": {
      "vi": "1. Phát hiện lỗi qua kiểm tra hoặc cảnh báo.\n2. Lập lệnh sửa chữa với nguyên nhân, phụ tùng và thời gian dự kiến.\n3. Sau khi sửa, ghi nguyên nhân gốc để phòng tái diễn.",
      "en": "1. Detect the fault through inspection or alarm.\n2. Raise a repair order with cause, parts and expected time.\n3. After the fix, record the root cause to prevent recurrence."
    },
    "practicalExample": {
      "vi": "Cảnh báo nhiệt cao: lập lệnh sửa, thay quạt làm mát trong ca nghỉ, ghi lỗi do bụi bám.",
      "en": "High temperature alarm: raise a repair order, replace the cooling fan during the break, and record dust buildup as the cause."
    },
    "formula": [],
    "exercise": {
      "vi": "Sau khi sửa, cần ghi thông tin gì?",
      "en": "What should be recorded after the repair?"
    },
    "answer": {
      "vi": "Nguyên nhân gốc, phụ tùng đã thay và thời gian dừng.",
      "en": "Root cause, parts replaced and downtime."
    },
    "relatedTopics": []
  },
  {
    "slug": "breakdown-maintenance",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Breakdown Maintenance: sửa khi hỏng",
      "en": "Breakdown Maintenance: repair after failure"
    },
    "summary": {
      "vi": "Bảo trì khi hỏng là sửa sau khi máy đã dừng đột ngột, không có kế hoạch trước.",
      "en": "Breakdown maintenance is repair after the machine stops suddenly, with no plan."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Đây thường là cách tốn kém nhất: dừng lâu, sửa gấp và có thể làm hỏng thêm.",
      "en": "It is usually the most costly approach: long stops, rushed repairs and possible extra damage."
    },
    "objectives": [
      {
        "vi": "Nêu hậu quả của bảo trì khi hỏng.",
        "en": "State the consequences of breakdown maintenance."
      },
      {
        "vi": "Đề xuất cách giảm bảo trì khi hỏng.",
        "en": "Propose ways to reduce breakdowns."
      }
    ],
    "explanation": {
      "vi": "1. Máy dừng đột ngột, sản xuất bị gián đoạn.\n2. Sửa gấp thường tốn phí vận chuyển và làm thêm giờ.\n3. Giảm bằng bảo trì phòng ngừa và dự báo.",
      "en": "1. The machine stops suddenly and production is interrupted.\n2. Rushed repairs often cost more in freight and overtime.\n3. Reduce it with preventive and predictive maintenance."
    },
    "practicalExample": {
      "vi": "Băng tải hỏng giữa ca, dừng 3 giờ, phải chờ phụ tùng từ nhà cung cấp.",
      "en": "A conveyor fails mid-shift; it stops for 3 hours while parts are shipped from the supplier."
    },
    "formula": [],
    "exercise": {
      "vi": "Vì sao bảo trì khi hỏng thường tốn kém hơn?",
      "en": "Why is breakdown maintenance usually more costly?"
    },
    "answer": {
      "vi": "Dừng đột ngột, sửa gấp, chờ phụ tùng và có thể hỏng thêm.",
      "en": "Sudden stops, rushed repairs, waiting for parts and possible extra damage."
    },
    "relatedTopics": []
  },
  {
    "slug": "tpm",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "TPM (Total Productive Maintenance): bảo trì năng suất toàn diện",
      "en": "TPM (Total Productive Maintenance)"
    },
    "summary": {
      "vi": "TPM là bảo trì có sự tham gia của mọi người, đặc biệt người vận hành, nhằm tối đa hóa OEE.",
      "en": "TPM is maintenance with everyone involved, especially operators, aiming to maximise OEE."
    },
    "difficulty": "Advanced",
    "overview": {
      "vi": "TPM biến người vận hành thành người bảo vệ máy, làm vệ sinh, kiểm tra và báo lỗi sớm.",
      "en": "TPM makes operators guardians of their machines: cleaning, checking and reporting problems early."
    },
    "objectives": [
      {
        "vi": "Nêu vai trò của người vận hành trong TPM.",
        "en": "Describe the operator's role in TPM."
      },
      {
        "vi": "Liên hệ TPM với OEE.",
        "en": "Link TPM to OEE."
      }
    ],
    "explanation": {
      "vi": "1. Bảo trì tự chủ (Autonomous Maintenance): người vận hành làm vệ sinh, kiểm tra, bôi trơn hằng ngày.\n2. Bảo trì có kế hoạch và phòng ngừa do đội bảo trì thực hiện.\n3. Mục tiêu: giảm dừng máy và tăng OEE.",
      "en": "1. Autonomous maintenance: operators clean, check and lubricate daily.\n2. Planned and preventive maintenance by the maintenance team.\n3. Goal: fewer stops and higher OEE."
    },
    "practicalExample": {
      "vi": "Người vận hành kiểm tra 10 điểm mỗi ca theo danh sách, phát hiện rò dầu sớm trước khi hỏng.",
      "en": "Operators check 10 points per shift from a checklist, spotting an oil leak early."
    },
    "formula": [],
    "exercise": {
      "vi": "Mục tiêu chính của TPM là chỉ số nào?",
      "en": "What is the main goal of TPM?"
    },
    "answer": {
      "vi": "OEE.",
      "en": "OEE."
    },
    "relatedTopics": []
  },
  {
    "slug": "equipment-availability",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Equipment Availability: tính sẵn sàng của thiết bị",
      "en": "Equipment Availability: uptime from failure data"
    },
    "summary": {
      "vi": "Tính sẵn sàng của thiết bị cho biết thiết bị sẵn sàng hoạt động bao nhiêu phần trăm, dựa trên MTBF và MTTR.",
      "en": "Equipment availability is the share of time the equipment is ready to run, based on MTBF and MTTR."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Một máy hỏng ít nhưng sửa lâu vẫn có thể sẵn sàng thấp. Cần xem cả hai chỉ số.",
      "en": "A machine that fails rarely but takes long to fix can still have low availability. Look at both metrics."
    },
    "objectives": [
      {
        "vi": "Tính sẵn sàng từ MTBF và MTTR.",
        "en": "Calculate availability from MTBF and MTTR."
      },
      {
        "vi": "Nhận biết cải thiện nào tăng sẵn sàng nhiều hơn.",
        "en": "Recognize which improvement raises availability most."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: Availability = MTBF ÷ (MTBF + MTTR) × 100%.\n2. Tăng MTBF (ít hỏng) và giảm MTTR (sửa nhanh) đều làm tăng sẵn sàng.\n3. Đây là phần Availability trong OEE khi tính theo hỏng.",
      "en": "1. Formula: availability = MTBF ÷ (MTBF + MTTR) × 100%.\n2. Raising MTBF (fewer failures) and lowering MTTR (faster repair) both help.\n3. This is the availability element in OEE when driven by failures."
    },
    "practicalExample": {
      "vi": "MTBF 300 giờ, MTTR 2 giờ: sẵn sàng = 300 ÷ 302 ≈ 99,3%.",
      "en": "MTBF 300 hours, MTTR 2 hours: availability = 300 ÷ 302 ≈ 99.3%."
    },
    "formula": [],
    "exercise": {
      "vi": "MTBF 100 giờ, MTTR 10 giờ. Sẵn sàng là bao nhiêu?",
      "en": "MTBF 100 hours, MTTR 10 hours. What is the availability?"
    },
    "answer": {
      "vi": "100 ÷ 110 ≈ 90,9%.",
      "en": "100 ÷ 110 ≈ 90.9%."
    },
    "relatedTopics": []
  },
  {
    "slug": "maintenance-planning",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Maintenance Planning: lập kế hoạch bảo trì",
      "en": "Maintenance Planning: schedule the work"
    },
    "summary": {
      "vi": "Lập kế hoạch bảo trì sắp xếp lịch, nhân lực, phụ tùng và thời gian dừng máy cho các công việc bảo trì.",
      "en": "Maintenance planning schedules jobs, people, parts and machine stop windows."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Kế hoạch tốt giúp bảo trì đúng lúc, ít ảnh hưởng đến sản xuất.",
      "en": "Good planning makes repairs happen on time with little impact on production."
    },
    "objectives": [
      {
        "vi": "Lập lịch bảo trì phòng ngừa.",
        "en": "Schedule preventive maintenance."
      },
      {
        "vi": "Chọn thời điểm dừng máy phù hợp.",
        "en": "Choose a suitable stop window."
      }
    ],
    "explanation": {
      "vi": "1. Danh mục máy và lịch bảo trì cho từng máy.\n2. Ước tính thời gian và nhân lực cho mỗi công việc.\n3. Phối hợp với sản xuất để chọn cửa sổ dừng máy ít ảnh hưởng.",
      "en": "1. A machine list and maintenance schedule for each machine.\n2. Estimate time and people for each job.\n3. Agree with production on a stop window with little impact."
    },
    "practicalExample": {
      "vi": "Bảo trì lớn 6 giờ được đặt vào ca cuối tuần khi nhu cầu thấp, thay vì ca có đơn gấp.",
      "en": "A 6-hour major service is booked on a low-demand weekend shift instead of a shift with urgent orders."
    },
    "formula": [],
    "exercise": {
      "vi": "Vì sao cần phối hợp với sản xuất khi lập lịch bảo trì?",
      "en": "Why must maintenance planning be coordinated with production?"
    },
    "answer": {
      "vi": "Để chọn thời điểm dừng ít ảnh hưởng đến đơn hàng.",
      "en": "To choose a stop time that affects orders least."
    },
    "relatedTopics": []
  },
  {
    "slug": "spare-parts",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Spare Parts Management: quản lý phụ tùng",
      "en": "Spare Parts Management: keep the right parts"
    },
    "summary": {
      "vi": "Quản lý phụ tùng đảm bảo có đúng phụ tùng cần thiết với mức tồn kho hợp lý.",
      "en": "Spare parts management keeps the critical parts on hand at sensible stock levels."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Thiếu phụ tùng quan trọng làm kéo dài thời gian sửa (MTTR). Tồn quá nhiều làm tốn vốn.",
      "en": "Missing a critical part extends repair time (MTTR). Too much stock ties up cash."
    },
    "objectives": [
      {
        "vi": "Phân loại phụ tùng theo mức quan trọng.",
        "en": "Classify spare parts by criticality."
      },
      {
        "vi": "Đặt mức tồn tối thiểu và tối đa.",
        "en": "Set minimum and maximum stock levels."
      }
    ],
    "explanation": {
      "vi": "1. Phân loại: phụ tùng quan trọng (không được hết), phụ tùng thường dùng, phụ tùng ít dùng.\n2. Đặt mức tồn tối thiểu (min) để kích hoạt đặt hàng và tối đa (max).\n3. Theo dõi phụ tùng hao mòn để dự báo nhu cầu.",
      "en": "1. Classify: critical parts (never run out), common parts, slow-moving parts.\n2. Set a minimum (min) that triggers ordering and a maximum (max).\n3. Track worn parts to forecast demand."
    },
    "practicalExample": {
      "vi": "Ổ bi quan trọng có min 2, max 5: khi tồn còn 2 thì đặt thêm đến 5.",
      "en": "A critical bearing with min 2, max 5: when stock falls to 2, order up to 5."
    },
    "formula": [],
    "exercise": {
      "vi": "Phụ tùng tồn còn 1, min 2, max 5. Cần đặt thêm bao nhiêu?",
      "en": "Stock is 1, min 2, max 5. How many should be ordered?"
    },
    "answer": {
      "vi": "4 (đưa về max 5).",
      "en": "4 (bring stock back to max 5)."
    },
    "relatedTopics": []
  },
  {
    "slug": "mes",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "MES (Manufacturing Execution System): hệ thống thực thi sản xuất",
      "en": "MES (Manufacturing Execution System)"
    },
    "summary": {
      "vi": "MES quản lý thực thi sản xuất trên xưởng: lệnh, thu thập dữ liệu máy, truy xuất và KPI thời gian thực.",
      "en": "MES runs execution on the shop floor: orders, machine data collection, traceability and real-time KPIs."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "MES nối kế hoạch từ ERP với dữ liệu thực tế từ máy và thao tác của người.",
      "en": "MES connects the plan from ERP with actual data from machines and operators."
    },
    "objectives": [
      {
        "vi": "Phân biệt MES và ERP.",
        "en": "Distinguish MES from ERP."
      },
      {
        "vi": "Nêu dữ liệu MES thu thập từ xưởng.",
        "en": "List the data MES collects from the floor."
      }
    ],
    "explanation": {
      "vi": "1. ERP: kế hoạch, tài chính, mua hàng ở mức doanh nghiệp.\n2. MES: thực thi trên xưởng, theo dõi từng lệnh và từng máy.\n3. PLC/SCADA: điều khiển máy, cung cấp tín hiệu cho MES.",
      "en": "1. ERP: planning, finance and purchasing at company level.\n2. MES: execution on the floor, tracking each order and each machine.\n3. PLC/SCADA: control machines and provide signals to MES."
    },
    "practicalExample": {
      "vi": "ERP giao kế hoạch 1.000 sản phẩm, MES ghi lại đã làm 620 và số lỗi theo máy trong ngày.",
      "en": "ERP releases a plan of 1,000 units; MES records 620 done and defects by machine during the day."
    },
    "formula": [],
    "exercise": {
      "vi": "Hệ thống nào lập kế hoạch tài chính: MES hay ERP?",
      "en": "Which system handles financial planning: MES or ERP?"
    },
    "answer": {
      "vi": "ERP.",
      "en": "ERP."
    },
    "relatedTopics": []
  },
  {
    "slug": "erp",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "ERP (Enterprise Resource Planning): hoạch định nguồn lực doanh nghiệp",
      "en": "ERP (Enterprise Resource Planning)"
    },
    "summary": {
      "vi": "ERP là hệ thống tích hợp tài chính, mua hàng, kho, bán hàng và sản xuất trong một doanh nghiệp.",
      "en": "ERP integrates finance, purchasing, inventory, sales and production in one company system."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "ERP giữ dữ liệu chung cho toàn doanh nghiệp, là nguồn đáng tin cho đơn hàng và tồn kho.",
      "en": "ERP holds company-wide data and is the trusted source for orders and stock."
    },
    "objectives": [
      {
        "vi": "Nêu các mô-đun chính của ERP.",
        "en": "List the main ERP modules."
      },
      {
        "vi": "Hiểu vai trò của ERP với sản xuất.",
        "en": "Understand ERP's role in production."
      }
    ],
    "explanation": {
      "vi": "1. Các mô-đun: tài chính, mua hàng, kho, bán hàng, sản xuất, nhân sự.\n2. ERP cung cấp đơn hàng, công thức sản phẩm (BOM) và tồn kho.\n3. Dữ liệu từ MES và máy thường được đồng bộ về ERP.",
      "en": "1. Modules: finance, purchasing, inventory, sales, production, HR.\n2. ERP provides orders, bills of materials and stock.\n3. Data from MES and machines is often synchronised back to ERP."
    },
    "practicalExample": {
      "vi": "Đơn hàng khách hàng được nhập vào ERP, sinh lệnh sản xuất, rồi tồn kho được cập nhật khi giao.",
      "en": "A customer order is entered in ERP, creates a production order, and stock is updated on delivery."
    },
    "formula": [],
    "exercise": {
      "vi": "BOM thường được lưu ở hệ thống nào?",
      "en": "Where is the BOM usually stored?"
    },
    "answer": {
      "vi": "ERP (cùng với dữ liệu sản xuất).",
      "en": "In ERP, together with production data."
    },
    "relatedTopics": []
  },
  {
    "slug": "iot-iiot",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "IoT (Internet of Things) & IIoT (Industrial Internet of Things): kết nối thiết bị trong công nghiệp",
      "en": "IoT (Internet of Things) & IIoT (Industrial Internet of Things): connecting factory equipment"
    },
    "summary": {
      "vi": "IoT kết nối thiết bị qua mạng; IIoT là IoT trong công nghiệp, yêu cầu độ tin cậy và an toàn cao.",
      "en": "IoT connects devices over networks; IIoT applies IoT to industry with high reliability and safety."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Mọi dữ liệu máy hiện đại đi qua IIoT. Xem thêm nhóm IIoT Data & Control Flow để hiểu PLC, MQTT, cảm biến và SCADA.",
      "en": "Most modern machine data flows through IIoT. See the IIoT Data & Control Flow group for PLC, MQTT, sensors and SCADA."
    },
    "objectives": [
      {
        "vi": "Phân biệt IoT và IIoT.",
        "en": "Distinguish IoT from IIoT."
      },
      {
        "vi": "Nêu vai trò IIoT trong nhà máy.",
        "en": "State the role of IIoT in a factory."
      }
    ],
    "explanation": {
      "vi": "1. IoT: thiết bị gửi và nhận dữ liệu qua mạng.\n2. IIoT: dùng trong nhà máy, cần độ tin cậy, độ trễ thấp và an toàn.\n3. Dữ liệu IIoT đi từ cảm biến, qua PLC, đến nền tảng dữ liệu và BI.",
      "en": "1. IoT: devices send and receive data over a network.\n2. IIoT: used in factories, needing reliability, low latency and safety.\n3. IIoT data flows from sensors through the PLC to a data platform and BI."
    },
    "practicalExample": {
      "vi": "Cảm biến nhiệt trên máy gửi dữ liệu qua MQTT lên nền tảng để theo dõi và cảnh báo.",
      "en": "A temperature sensor on a machine sends data over MQTT to a platform for monitoring and alarms."
    },
    "formula": [],
    "exercise": {
      "vi": "Khác biệt chính giữa IIoT và IoT thông thường là gì?",
      "en": "What is the main difference between IIoT and general IoT?"
    },
    "answer": {
      "vi": "IIoT yêu cầu độ tin cậy, độ trễ thấp và an toàn cao hơn, cho môi trường công nghiệp.",
      "en": "IIoT requires higher reliability, lower latency and stronger safety for industrial settings."
    },
    "relatedTopics": []
  },
  {
    "slug": "andon",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Andon: hệ thống báo động tại hiện trường",
      "en": "Andon: floor alert system"
    },
    "summary": {
      "vi": "Andon là đèn và âm báo tại trạm, người vận hành bật khi cần hỗ trợ hoặc máy tự báo lỗi.",
      "en": "Andon is a light and sound signal at each station, switched on by operators or machines when help is needed."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Andon làm cho vấn đề nhìn thấy được ngay, người quản lý biết kịp thời để xử lý.",
      "en": "Andon makes problems visible at once, so managers can respond in time."
    },
    "objectives": [
      {
        "vi": "Mô tả ý nghĩa các màu đèn Andon.",
        "en": "Describe what each Andon colour means."
      },
      {
        "vi": "Liên hệ Andon với Jidoka.",
        "en": "Link Andon to Jidoka."
      }
    ],
    "explanation": {
      "vi": "1. Xanh: bình thường.\n2. Vàng: cảnh báo, cần chú ý.\n3. Đỏ: dừng hoặc cần hỗ trợ ngay.\n4. Andon gắn với Jidoka khi máy tự bật đèn đỏ.",
      "en": "1. Green: normal.\n2. Yellow: warning, needs attention.\n3. Red: stop or needs help now.\n4. Andon works with Jidoka when the machine switches on the red light itself."
    },
    "practicalExample": {
      "vi": "Trạm thiếu linh kiện, người vận hành bật đèn vàng; tổ trưởng đến trong 2 phút để xử lý.",
      "en": "A station runs short of parts, the operator switches on yellow; the team leader arrives within 2 minutes."
    },
    "formula": [],
    "exercise": {
      "vi": "Đèn đỏ Andon thường có ý nghĩa gì?",
      "en": "What does a red Andon light usually mean?"
    },
    "answer": {
      "vi": "Dừng hoặc cần hỗ trợ ngay.",
      "en": "Stop, or needs help immediately."
    },
    "relatedTopics": []
  },
  {
    "slug": "digital-mdi",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Digital MDI: bảng quản lý hằng ngày dạng số",
      "en": "Digital MDI: a digital daily management board"
    },
    "summary": {
      "vi": "Bảng quản lý hằng ngày dạng số ghi KPI, vấn đề và hành động theo ca, thay cho bảng giấy.",
      "en": "A digital daily management board records KPIs, problems and actions by shift, replacing a paper board."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Số hóa bảng quản lý giúp dữ liệu được cập nhật nhanh, lưu được lịch sử và dễ tổng hợp.",
      "en": "Digitising the board updates data faster, keeps history and makes it easier to summarise."
    },
    "objectives": [
      {
        "vi": "Nêu các nội dung chính của bảng quản lý hằng ngày.",
        "en": "List the main content of a daily management board."
      },
      {
        "vi": "Liệt kê lợi ích của bảng số.",
        "en": "List the benefits of a digital board."
      }
    ],
    "explanation": {
      "vi": "1. Nội dung: KPI sản lượng, chất lượng, an toàn, dừng máy.\n2. Vấn đề và hành động: ghi người phụ trách và hạn xử lý.\n3. Dữ liệu tự động đồng bộ từ MES, không nhập tay.",
      "en": "1. Content: output, quality, safety and stop KPIs.\n2. Problems and actions: record an owner and a due date.\n3. Data syncs automatically from MES, with no manual entry."
    },
    "practicalExample": {
      "vi": "Bảng số tự cập nhật sản lượng từ MES, công nhân ghi vấn đề và tổ trưởng giao việc trên màn hình.",
      "en": "The digital board updates output from MES automatically; workers log problems and the team leader assigns them on screen."
    },
    "formula": [],
    "exercise": {
      "vi": "Lợi ích lớn nhất của bảng số so với bảng giấy là gì?",
      "en": "What is the biggest benefit of a digital board over paper?"
    },
    "answer": {
      "vi": "Dữ liệu cập nhật nhanh, có lịch sử và dễ tổng hợp.",
      "en": "Faster updates, history kept and easier summaries."
    },
    "relatedTopics": []
  },
  {
    "slug": "production-dashboard",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Production Dashboard: bảng điều khiển sản xuất",
      "en": "Production Dashboard: a view of key KPIs"
    },
    "summary": {
      "vi": "Dashboard sản xuất hiển thị các KPI chính như OEE, sản lượng, lỗi và dừng máy theo thời gian thực hoặc theo ca.",
      "en": "A production dashboard shows key KPIs such as OEE, output, defects and stops, in real time or by shift."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Dashboard giúp mọi người thấy cùng một con số và phản ứng nhanh khi có vấn đề.",
      "en": "A dashboard lets everyone see the same numbers and react quickly to problems."
    },
    "objectives": [
      {
        "vi": "Chọn KPI chính cho dashboard sản xuất.",
        "en": "Choose the main KPIs for a production dashboard."
      },
      {
        "vi": "Thiết kế dashboard dễ đọc cho người vận hành.",
        "en": "Design a dashboard that operators can read."
      }
    ],
    "explanation": {
      "vi": "1. Chọn ít KPI, mỗi KPI có mục tiêu và màu trạng thái.\n2. Hiển thị theo ca, theo máy và theo xu hướng.\n3. Cùng định nghĩa KPI với báo cáo chính thức.",
      "en": "1. Choose few KPIs, each with a target and a status colour.\n2. Show by shift, by machine and as a trend.\n3. Use the same KPI definitions as the official reports."
    },
    "practicalExample": {
      "vi": "Dashboard hiện OEE từng máy so với mục tiêu 85%, máy dưới mục tiêu đổi sang màu đỏ.",
      "en": "The dashboard shows OEE per machine against an 85% target; machines below target turn red."
    },
    "formula": [],
    "exercise": {
      "vi": "Vì sao dashboard cần có mục tiêu cho mỗi KPI?",
      "en": "Why should each KPI on the dashboard have a target?"
    },
    "answer": {
      "vi": "Để người xem biết kết quả tốt hay xấu so với kỳ vọng.",
      "en": "So viewers can tell whether the result is good or poor against expectation."
    },
    "relatedTopics": []
  },
  {
    "slug": "real-time-monitoring",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Real-time Monitoring: theo dõi thời gian thực",
      "en": "Real-time Monitoring: watching the line live"
    },
    "summary": {
      "vi": "Theo dõi thời gian thực cập nhật dữ liệu máy trong vài giây đến vài phút và cảnh báo khi vượt ngưỡng.",
      "en": "Real-time monitoring updates machine data every few seconds to minutes and alerts when limits are exceeded."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Theo dõi thời gian thực giúp phản ứng khi vấn đề còn nhỏ, không đợi đến cuối ca.",
      "en": "It lets you react while a problem is still small, not at the end of the shift."
    },
    "objectives": [
      {
        "vi": "Đặt tần suất cập nhật phù hợp.",
        "en": "Set a suitable update frequency."
      },
      {
        "vi": "Thiết lập cảnh báo theo ngưỡng.",
        "en": "Set threshold-based alerts."
      }
    ],
    "explanation": {
      "vi": "1. Tần suất cập nhật tùy theo nhu cầu: vài giây cho trạng thái máy, vài phút cho sản lượng.\n2. Cảnh báo khi vượt ngưỡng hoặc máy dừng quá lâu.\n3. Dữ liệu thời gian thực cần được kiểm tra chất lượng.",
      "en": "1. Frequency depends on need: seconds for machine state, minutes for output.\n2. Alert when a limit is crossed or a machine stays stopped too long.\n3. Real-time data still needs quality checks."
    },
    "practicalExample": {
      "vi": "Máy dừng quá 10 phút thì gửi cảnh báo cho tổ trưởng qua màn hình và điện thoại.",
      "en": "If a machine is stopped for more than 10 minutes, a team leader gets an alert on screen and phone."
    },
    "formula": [],
    "exercise": {
      "vi": "Máy dừng quá bao lâu thì nên cảnh báo, theo ví dụ?",
      "en": "After how many minutes of stop would you alert, in this example?"
    },
    "answer": {
      "vi": "Ví dụ: 10 phút, tùy ngưỡng từng máy.",
      "en": "For example 10 minutes; the threshold depends on the machine."
    },
    "relatedTopics": []
  },
  {
    "slug": "machine-data-collection",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Machine Data Collection: thu thập dữ liệu máy",
      "en": "Machine Data Collection: capturing machine signals"
    },
    "summary": {
      "vi": "Thu thập dữ liệu máy lấy trạng thái, bộ đếm và cảnh báo từ PLC qua các giao thức như OPC UA, Modbus hoặc MQTT.",
      "en": "Machine data collection gathers state, counters and alarms from PLCs through protocols such as OPC UA, Modbus or MQTT."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Dữ liệu máy là nền tảng của OEE và mọi phân tích sản xuất. Dữ liệu sai sẽ cho kết luận sai.",
      "en": "Machine data underpins OEE and all production analysis. Bad data leads to wrong conclusions."
    },
    "objectives": [
      {
        "vi": "Nêu các loại dữ liệu cần thu thập từ máy.",
        "en": "List the data to collect from machines."
      },
      {
        "vi": "Nhận biết vấn đề chất lượng dữ liệu máy.",
        "en": "Recognize machine data quality problems."
      }
    ],
    "explanation": {
      "vi": "1. Dữ liệu cần: trạng thái chạy/dừng, bộ đếm sản phẩm, mã lỗi, thời gian.\n2. Giao thức: OPC UA, Modbus, MQTT tùy thiết bị.\n3. Vấn đề thường gặp: mất kết nối, bộ đếm bị reset, thời gian lệch múi giờ.",
      "en": "1. Data needed: run/stop state, part counter, fault codes, timestamps.\n2. Protocols: OPC UA, Modbus, MQTT depending on the equipment.\n3. Common problems: lost connection, counter reset, timestamp offset."
    },
    "practicalExample": {
      "vi": "Bộ đếm reset về 0 giữa ca do mất điện, dữ liệu sản lượng thấp hơn thực tế; cần lọc và ghi nhận sự kiện reset.",
      "en": "A counter resets to zero mid-shift after a power cut, so output looks low; the reset event must be filtered and logged."
    },
    "formula": [],
    "exercise": {
      "vi": "Bộ đếm bị reset giữa ca ảnh hưởng gì đến phân tích?",
      "en": "How does a mid-shift counter reset affect analysis?"
    },
    "answer": {
      "vi": "Sản lượng bị tính thấp, OEE sai nếu không xử lý.",
      "en": "Output is understated and OEE is wrong unless it is handled."
    },
    "relatedTopics": []
  },
  {
    "slug": "data-driven-decision",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Data-driven Decision Making: quyết định dựa trên dữ liệu",
      "en": "Data-driven Decision Making: decide with evidence"
    },
    "summary": {
      "vi": "Quyết định dựa trên dữ liệu dùng KPI thống nhất, dữ liệu sạch và so sánh với mục tiêu trước khi hành động.",
      "en": "Data-driven decisions use shared KPIs, clean data and comparison with targets before acting."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Quyết định bằng dữ liệu tránh cảm tính. Điều kiện đầu tiên là mọi người hiểu cùng một con số.",
      "en": "Decisions based on data avoid guesswork. The first condition is that everyone reads the same number."
    },
    "objectives": [
      {
        "vi": "Nêu các bước ra quyết định dựa trên dữ liệu.",
        "en": "List the steps of a data-driven decision."
      },
      {
        "vi": "Phân biệt dữ liệu và cảm tính.",
        "en": "Distinguish evidence from opinion."
      }
    ],
    "explanation": {
      "vi": "1. Xác định câu hỏi và KPI cần trả lời.\n2. Kiểm tra dữ liệu có đủ và đáng tin.\n3. So với mục tiêu và lịch sử.\n4. Quyết định, hành động và đo lại.",
      "en": "1. Define the question and the KPI to answer it.\n2. Check the data is complete and reliable.\n3. Compare with target and history.\n4. Decide, act and measure again."
    },
    "practicalExample": {
      "vi": "Tổ trưởng nghi máy B chậm, dữ liệu cho thấy OEE máy B 72% so với mục tiêu 85%: quyết định kiểm tra cảm biến trước khi thay máy.",
      "en": "A team leader suspects machine B is slow; data shows OEE 72% against an 85% target, so the sensor is checked before any machine change."
    },
    "formula": [],
    "exercise": {
      "vi": "Bước nào nên làm trước khi quyết định dựa trên một con số?",
      "en": "What should be checked before making a decision from one number?"
    },
    "answer": {
      "vi": "Kiểm tra dữ liệu có đáng tin và định nghĩa KPI có thống nhất không.",
      "en": "Whether the data is reliable and the KPI definition is agreed."
    },
    "relatedTopics": []
  },
  {
    "slug": "smart-factory",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Smart Factory & Industry 4.0: nhà máy thông minh",
      "en": "Smart Factory & Industry 4.0"
    },
    "summary": {
      "vi": "Nhà máy thông minh kết nối máy, dữ liệu, phân tích và tự động hóa trong chuỗi sản xuất, là bước của Industry 4.0.",
      "en": "A smart factory connects machines, data, analytics and automation across production, as part of Industry 4.0."
    },
    "difficulty": "Advanced",
    "overview": {
      "vi": "Industry 4.0 dựa trên dữ liệu kết nối. Nhà máy thông minh bắt đầu từ việc thu thập và dùng dữ liệu tốt, rồi mới tới tự động hóa phức tạp.",
      "en": "Industry 4.0 rests on connected data. A smart factory starts with collecting and trusting data, then adds complex automation."
    },
    "objectives": [
      {
        "vi": "Nêu các thành phần của nhà máy thông minh.",
        "en": "List the components of a smart factory."
      },
      {
        "vi": "Xác định bước đầu tiên hợp lý cho một nhà máy.",
        "en": "Identify a sensible first step for a factory."
      }
    ],
    "explanation": {
      "vi": "1. Kết nối: máy, cảm biến, hệ thống được nối mạng.\n2. Dữ liệu: thu thập, làm sạch và lưu trữ.\n3. Phân tích: KPI, dự báo, phát hiện bất thường.\n4. Tự động hóa: hành động theo dữ liệu.",
      "en": "1. Connect: machines, sensors and systems on a network.\n2. Data: collect, clean and store.\n3. Analyse: KPIs, forecasts, anomaly detection.\n4. Automate: act on the data."
    },
    "practicalExample": {
      "vi": "Nhà máy bắt đầu bằng thu thập dữ liệu OEE từ 5 máy, sau đó mới làm dự báo bảo trì.",
      "en": "A plant starts by collecting OEE data from five machines, and only then builds a maintenance forecast."
    },
    "formula": [],
    "exercise": {
      "vi": "Bước đầu tiên hợp lý cho một nhà máy chưa có dữ liệu là gì?",
      "en": "What is a sensible first step for a plant with no data yet?"
    },
    "answer": {
      "vi": "Kết nối và thu thập dữ liệu máy có chất lượng.",
      "en": "Connect machines and collect quality machine data."
    },
    "relatedTopics": []
  },
  {
    "slug": "manufacturing-analytics-overview",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Manufacturing Analytics: tổng quan phân tích sản xuất",
      "en": "Manufacturing Analytics: overview"
    },
    "summary": {
      "vi": "Phân tích sản xuất đi từ dữ liệu máy và hệ thống, qua KPI và dashboard, đến quyết định và hành động.",
      "en": "Manufacturing analytics runs from machine and system data, through KPIs and dashboards, to decisions and action."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Đây là bức tranh tổng thể của cả chủ đề: dữ liệu, chỉ số, công cụ và cách dùng để cải tiến.",
      "en": "This is the big picture of the topic: data, metrics, tools and how to use them to improve."
    },
    "objectives": [
      {
        "vi": "Mô tả chuỗi từ dữ liệu đến hành động.",
        "en": "Describe the chain from data to action."
      },
      {
        "vi": "Chọn nhóm kiến thức phù hợp cho một câu hỏi.",
        "en": "Choose the right knowledge for a question."
      }
    ],
    "explanation": {
      "vi": "1. Nguồn dữ liệu: PLC, MES, ERP, nhân công.\n2. Chỉ số: OEE, FPY, UPH, downtime, MTBF.\n3. Công cụ: Pareto, 5 Whys, Ishikawa để tìm nguyên nhân.\n4. Hành động: kiểm soát, cải tiến và đo lại.",
      "en": "1. Data sources: PLC, MES, ERP, labour records.\n2. Metrics: OEE, FPY, UPH, downtime, MTBF.\n3. Tools: Pareto, 5 Whys, Ishikawa to find causes.\n4. Action: control, improve and measure again."
    },
    "practicalExample": {
      "vi": "Câu hỏi 'vì sao OEE thấp' đi từ OEE sang Availability, Performance, Quality, rồi dùng Pareto để tìm tổn thất lớn nhất.",
      "en": "The question 'why is OEE low' moves from OEE to Availability, Performance and Quality, then uses Pareto to find the biggest loss."
    },
    "formula": [],
    "exercise": {
      "vi": "Câu hỏi 'vì sao có nhiều lỗi' nên bắt đầu bằng công cụ nào?",
      "en": "Which tool should start a question about why there are so many defects?"
    },
    "answer": {
      "vi": "Pareto, để tìm loại lỗi lớn nhất trước khi đi sâu.",
      "en": "Pareto, to find the biggest defect type before going deeper."
    },
    "relatedTopics": []
  },
  {
    "slug": "sqdc",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "SQDC (Safety, Quality, Delivery, Cost): an toàn, chất lượng, giao hàng, chi phí",
      "en": "SQDC (Safety, Quality, Delivery, Cost)"
    },
    "summary": {
      "vi": "SQDC là bốn trụ cột ưu tiên: Safety (an toàn), Quality (chất lượng), Delivery (giao hàng), Cost (chi phí).",
      "en": "SQDC is four priorities in order: Safety, Quality, Delivery, Cost."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Thứ tự SQDC thể hiện ưu tiên: không đánh đổi an toàn để đạt sản lượng.",
      "en": "The order shows priority: safety is never traded for output."
    },
    "objectives": [
      {
        "vi": "Kể bốn trụ cột SQDC.",
        "en": "Name the four SQDC pillars."
      },
      {
        "vi": "Giải thích thứ tự ưu tiên.",
        "en": "Explain the priority order."
      }
    ],
    "explanation": {
      "vi": "1. Safety: an toàn luôn đứng đầu.\n2. Quality: chất lượng không được hy sinh.\n3. Delivery: giao hàng đúng hạn và đủ.\n4. Cost: chi phí được tối ưu trong các ràng buộc trên.",
      "en": "1. Safety comes first.\n2. Quality cannot be sacrificed.\n3. Delivery must be on time and complete.\n4. Cost is optimised within those limits."
    },
    "practicalExample": {
      "vi": "Bảng quản lý ghi tai nạn, lỗi, OTIF và chi phí theo đúng thứ tự SQDC.",
      "en": "The management board shows accidents, defects, OTIF and cost in SQDC order."
    },
    "formula": [],
    "exercise": {
      "vi": "Trụ cột nào đứng đầu trong SQDC?",
      "en": "Which pillar comes first in SQDC?"
    },
    "answer": {
      "vi": "Safety (an toàn).",
      "en": "Safety."
    },
    "relatedTopics": []
  },
  {
    "slug": "hse-ehs",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "HSE / EHS (Health, Safety and Environment): sức khỏe, an toàn và môi trường",
      "en": "HSE / EHS (Health, Safety and Environment)"
    },
    "summary": {
      "vi": "HSE (hoặc EHS) là hệ thống quản lý sức khỏe nghề nghiệp, an toàn lao động và bảo vệ môi trường.",
      "en": "HSE (or EHS) is the management system for occupational health, safety and environmental protection."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "HSE bảo vệ người lao động và cộng đồng. Đây là điều kiện tiên quyết để sản xuất ổn định.",
      "en": "HSE protects workers and the community. It is a condition for stable production."
    },
    "objectives": [
      {
        "vi": "Nêu ba lĩnh vực của HSE.",
        "en": "Name the three areas of HSE."
      },
      {
        "vi": "Liệt kê các chỉ số an toàn thường theo dõi.",
        "en": "List common safety indicators."
      }
    ],
    "explanation": {
      "vi": "1. Health: sức khỏe nghề nghiệp, tiếp xúc hóa chất, tiếng ồn.\n2. Safety: an toàn lao động, tai nạn, sự cố suýt xảy ra.\n3. Environment: chất thải, khí thải, tiết kiệm năng lượng.\n4. Chỉ số: số tai nạn, số ngày không tai nạn, tỷ lệ sự cố.",
      "en": "1. Health: occupational health, chemical exposure, noise.\n2. Safety: work safety, accidents, near misses.\n3. Environment: waste, emissions, energy saving.\n4. Indicators: number of accidents, days without accident, near-miss rate."
    },
    "practicalExample": {
      "vi": "Nhà máy ghi nhận 45 ngày không tai nạn; mọi sự cố suýt xảy ra được báo cáo trong 24 giờ.",
      "en": "The plant records 45 days without an accident; every near miss is reported within 24 hours."
    },
    "formula": [],
    "exercise": {
      "vi": "Kể tên hai chỉ số an toàn thường dùng.",
      "en": "Name two common safety indicators."
    },
    "answer": {
      "vi": "Số tai nạn, số ngày không tai nạn, tỷ lệ sự cố.",
      "en": "Number of accidents, days without accident, near-miss rate."
    },
    "relatedTopics": []
  },
  {
    "slug": "iso-9001",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "ISO 9001 (International Organization for Standardization): hệ thống quản lý chất lượng",
      "en": "ISO 9001 (International Organization for Standardization): quality management system"
    },
    "summary": {
      "vi": "ISO 9001 là tiêu chuẩn quốc tế về hệ thống quản lý chất lượng, tập trung vào khách hàng và cải tiến liên tục.",
      "en": "ISO 9001 is the international standard for quality management systems, focused on customers and improvement."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "ISO 9001 không đảm bảo sản phẩm tốt, mà đảm bảo hệ thống có kiểm soát và cải tiến.",
      "en": "ISO 9001 does not guarantee good products; it ensures a controlled, improving system."
    },
    "objectives": [
      {
        "vi": "Nêu các nguyên tắc chính của ISO 9001.",
        "en": "List the main principles of ISO 9001."
      },
      {
        "vi": "Phân biệt chứng nhận và thực hành thực tế.",
        "en": "Distinguish certification from real practice."
      }
    ],
    "explanation": {
      "vi": "1. Tập trung khách hàng.\n2. Phương pháp tiếp cận quy trình.\n3. Cải tiến liên tục, thường dùng chu trình PDCA.\n4. Ra quyết định dựa trên bằng chứng.",
      "en": "1. Customer focus.\n2. Process approach.\n3. Continuous improvement, often with PDCA.\n4. Evidence-based decisions."
    },
    "practicalExample": {
      "vi": "Quy trình kiểm soát nhà cung cấp được ghi thành văn bản, có kiểm tra định kỳ và hành động khắc phục.",
      "en": "The supplier control procedure is documented, audited regularly, and has corrective actions."
    },
    "formula": [],
    "exercise": {
      "vi": "ISO 9001 tập trung vào đối tượng nào?",
      "en": "Which two things does ISO 9001 focus on?"
    },
    "answer": {
      "vi": "Hệ thống quản lý chất lượng và khách hàng.",
      "en": "The quality management system and customers."
    },
    "relatedTopics": []
  },
  {
    "slug": "iso-14001",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "ISO 14001 (International Organization for Standardization): quản lý môi trường",
      "en": "ISO 14001 (International Organization for Standardization): environmental management"
    },
    "summary": {
      "vi": "ISO 14001 là tiêu chuẩn về hệ thống quản lý môi trường, giúp kiểm soát tác động đến môi trường.",
      "en": "ISO 14001 is the standard for environmental management systems, helping control impact on the environment."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Tiêu chuẩn này giúp giảm chất thải, tiết kiệm năng lượng và tuân thủ quy định.",
      "en": "It helps reduce waste, save energy and meet regulations."
    },
    "objectives": [
      {
        "vi": "Nêu mục tiêu của ISO 14001.",
        "en": "State the aim of ISO 14001."
      },
      {
        "vi": "Liệt kê các khía cạnh môi trường trong nhà máy.",
        "en": "List environmental aspects of a factory."
      }
    ],
    "explanation": {
      "vi": "1. Xác định khía cạnh môi trường: chất thải, nước thải, khí thải, năng lượng.\n2. Đặt mục tiêu và theo dõi.\n3. Tuân thủ quy định pháp luật về môi trường.",
      "en": "1. Identify environmental aspects: waste, wastewater, emissions, energy.\n2. Set targets and track them.\n3. Comply with environmental regulations."
    },
    "practicalExample": {
      "vi": "Nhà máy theo dõi lượng phế liệu mỗi tháng và đặt mục tiêu giảm 10% trong năm.",
      "en": "The plant tracks scrap each month and sets a target to cut it by 10% over the year."
    },
    "formula": [],
    "exercise": {
      "vi": "Kể hai khía cạnh môi trường trong nhà máy.",
      "en": "Name two environmental aspects of a factory."
    },
    "answer": {
      "vi": "Ví dụ: chất thải, nước thải, khí thải, năng lượng.",
      "en": "For example: waste, wastewater, emissions, energy."
    },
    "relatedTopics": []
  },
  {
    "slug": "iso-45001",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "ISO 45001 (International Organization for Standardization): an toàn và sức khỏe nghề nghiệp",
      "en": "ISO 45001 (International Organization for Standardization): occupational health and safety"
    },
    "summary": {
      "vi": "ISO 45001 là tiêu chuẩn về hệ thống quản lý an toàn và sức khỏe nghề nghiệp.",
      "en": "ISO 45001 is the standard for occupational health and safety management systems."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Tiêu chuẩn này tập trung phòng ngừa tai nạn và bệnh nghề nghiệp, có sự tham gia của người lao động.",
      "en": "It focuses on preventing accidents and work-related illness, with worker participation."
    },
    "objectives": [
      {
        "vi": "Nêu mục tiêu của ISO 45001.",
        "en": "State the aim of ISO 45001."
      },
      {
        "vi": "Hiểu vai trò người lao động trong hệ thống.",
        "en": "Understand the role of workers in the system."
      }
    ],
    "explanation": {
      "vi": "1. Đánh giá rủi ro công việc.\n2. Kiểm soát rủi ro theo thứ tự: loại bỏ, thay thế, kỹ thuật, hành chính, bảo hộ cá nhân.\n3. Người lao động được tham gia và góp ý.",
      "en": "1. Assess job risks.\n2. Control risk in order: eliminate, substitute, engineer, administer, protect the person.\n3. Workers take part and give feedback."
    },
    "practicalExample": {
      "vi": "Trạm có nguy cơ bỏng được thay bằng gia nhiệt tự động (loại bỏ rủi ro), thay vì chỉ phát găng tay.",
      "en": "A station with a burn risk is redesigned with automatic heating (elimination), instead of only giving out gloves."
    },
    "formula": [],
    "exercise": {
      "vi": "Biện pháp nào tốt nhất trong thứ tự kiểm soát rủi ro?",
      "en": "Which control is best in the risk-control order?"
    },
    "answer": {
      "vi": "Loại bỏ rủi ro ở nguồn.",
      "en": "Eliminating the hazard at source."
    },
    "relatedTopics": []
  },
  {
    "slug": "apqp",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "APQP (Advanced Product Quality Planning): hoạch định chất lượng sản phẩm nâng cao",
      "en": "APQP (Advanced Product Quality Planning)"
    },
    "summary": {
      "vi": "APQP là quy trình hoạch định chất lượng sản phẩm mới qua các giai đoạn từ kế hoạch đến đánh giá sau sản xuất.",
      "en": "APQP is a structured process for planning quality of a new product, from planning through post-production review."
    },
    "difficulty": "Advanced",
    "overview": {
      "vi": "APQP đảm bảo sản phẩm mới và quy trình mới được kiểm soát ngay từ đầu, thường dùng trong ô tô.",
      "en": "APQP keeps new products and processes controlled from the start, common in automotive."
    },
    "objectives": [
      {
        "vi": "Kể các giai đoạn chính của APQP.",
        "en": "List the main APQP phases."
      },
      {
        "vi": "Hiểu vai trò của APQP với FMEA và MSA.",
        "en": "Understand how APQP uses FMEA and MSA."
      }
    ],
    "explanation": {
      "vi": "1. Lập kế hoạch và xác định yêu cầu khách hàng.\n2. Thiết kế sản phẩm và kiểm tra thiết kế.\n3. Thiết kế quy trình và sản xuất thử.\n4. Xác nhận sản phẩm và quy trình.\n5. Phản hồi, đánh giá và hành động.",
      "en": "1. Plan and define customer requirements.\n2. Design the product and review the design.\n3. Design the process and run trial production.\n4. Validate the product and process.\n5. Feedback, assessment and action."
    },
    "practicalExample": {
      "vi": "Trước khi sản xuất hàng loạt, APQP yêu cầu FMEA cho quy trình và đánh giá hệ thống đo bằng MSA.",
      "en": "Before mass production, APQP requires a process FMEA and a measurement-system check with MSA."
    },
    "formula": [],
    "exercise": {
      "vi": "APQP gồm mấy giai đoạn chính?",
      "en": "How many main phases does APQP have?"
    },
    "answer": {
      "vi": "Năm giai đoạn.",
      "en": "Five."
    },
    "relatedTopics": []
  },
  {
    "slug": "ppap",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "PPAP (Production Part Approval Process): phê duyệt sản phẩm sản xuất",
      "en": "PPAP (Production Part Approval Process)"
    },
    "summary": {
      "vi": "PPAP là bộ hồ sơ chứng minh quy trình có thể sản xuất sản phẩm đúng yêu cầu trước khi sản xuất hàng loạt.",
      "en": "PPAP is a file that proves a process can produce parts to specification before mass production."
    },
    "difficulty": "Advanced",
    "overview": {
      "vi": "PPAP thường là điều kiện để khách hàng chấp nhận nhà cung cấp và sản phẩm mới.",
      "en": "PPAP is often the condition for a customer to accept a new supplier or product."
    },
    "objectives": [
      {
        "vi": "Hiểu mục đích của PPAP.",
        "en": "Understand the purpose of PPAP."
      },
      {
        "vi": "Kể các loại hồ sơ thường có trong PPAP.",
        "en": "List typical PPAP records."
      }
    ],
    "explanation": {
      "vi": "1. Hồ sơ gồm kết quả đo kích thước, năng lực quá trình, MSA và mẫu sản xuất.\n2. Mục tiêu: chứng minh quy trình ổn định và đạt yêu cầu.\n3. Khách hàng xem xét và phê duyệt trước khi chuyển sang sản xuất hàng loạt.",
      "en": "1. Records include dimensional results, process capability, MSA and production samples.\n2. Goal: show the process is stable and meets requirements.\n3. The customer reviews and approves before mass production."
    },
    "practicalExample": {
      "vi": "Nhà cung cấp gửi bộ PPAP gồm đo kích thước 30 mẫu và đánh giá năng lực Cpk, rồi được duyệt.",
      "en": "A supplier submits a PPAP with dimensional results from 30 samples and a Cpk capability study, then gets approval."
    },
    "formula": [],
    "exercise": {
      "vi": "Mục đích chính của PPAP là gì?",
      "en": "What is the main purpose of PPAP?"
    },
    "answer": {
      "vi": "Chứng minh quy trình sản xuất đạt yêu cầu trước sản xuất hàng loạt.",
      "en": "To prove the production process meets requirements before mass production."
    },
    "relatedTopics": []
  },
  {
    "slug": "msa",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "MSA (Measurement System Analysis): phân tích hệ thống đo lường",
      "en": "MSA (Measurement System Analysis)"
    },
    "summary": {
      "vi": "MSA đánh giá độ lặp lại, độ tái lập và độ chệch của hệ thống đo, để biết số đo có đáng tin không.",
      "en": "MSA assesses repeatability, reproducibility and bias of a measurement system, to know whether the readings can be trusted."
    },
    "difficulty": "Advanced",
    "overview": {
      "vi": "Nếu hệ thống đo kém, mọi phân tích chất lượng đều sai. MSA kiểm tra điều này trước.",
      "en": "If the measurement system is poor, all quality analysis is wrong. MSA checks this first."
    },
    "objectives": [
      {
        "vi": "Nêu các thành phần của MSA.",
        "en": "List the parts of MSA."
      },
      {
        "vi": "Đọc chỉ số %GRR.",
        "en": "Read the %GRR value."
      }
    ],
    "explanation": {
      "vi": "1. Repeatability: một người đo cùng vật nhiều lần cho kết quả giống nhau không.\n2. Reproducibility: nhiều người đo cùng vật có giống nhau không.\n3. %GRR ≤ 10% thường được coi là tốt; 10–30% chấp nhận có điều kiện; trên 30% không chấp nhận.",
      "en": "1. Repeatability: the same person measuring the same part gives the same result.\n2. Reproducibility: different people measuring the same part agree.\n3. %GRR up to 10% is usually good; 10–30% is conditionally acceptable; above 30% is not acceptable."
    },
    "practicalExample": {
      "vi": "%GRR 8%: hệ thống đo được chấp nhận. %GRR 35%: cần sửa đồng hồ hoặc quy trình đo trước khi dùng số liệu.",
      "en": "%GRR 8%: the gauge is accepted. %GRR 35%: the gauge or method must be fixed before the data is used."
    },
    "formula": [],
    "exercise": {
      "vi": "%GRR 25% nên được đánh giá thế nào?",
      "en": "How should a %GRR of 25% be treated?"
    },
    "answer": {
      "vi": "Chấp nhận có điều kiện, cần cải thiện hệ thống đo.",
      "en": "Conditionally acceptable; the measurement system needs improvement."
    },
    "relatedTopics": []
  },
  {
    "slug": "4m-5m1e",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "4M / 5M1E (Man, Machine, Material, Method, Measurement, Environment): các yếu tố ảnh hưởng đến sản xuất",
      "en": "4M / 5M1E (Man, Machine, Material, Method, Measurement, Environment): factors that affect production"
    },
    "summary": {
      "vi": "4M gồm Man, Machine, Material, Method; 5M1E thêm Measurement và Environment, dùng để phân tích nguyên nhân.",
      "en": "4M is Man, Machine, Material, Method; 5M1E adds Measurement and Environment, to analyse causes."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Khi gặp lỗi, liệt kê nguyên nhân theo các nhóm 4M hoặc 5M1E để không bỏ sót.",
      "en": "When a defect appears, list causes under 4M or 5M1E so none is missed."
    },
    "objectives": [
      {
        "vi": "Kể các yếu tố 4M và 5M1E.",
        "en": "Name the 4M and 5M1E factors."
      },
      {
        "vi": "Dùng 4M để phân loại một nguyên nhân.",
        "en": "Use 4M to classify a cause."
      }
    ],
    "explanation": {
      "vi": "1. Man: con người, kỹ năng, đào tạo.\n2. Machine: máy móc, thiết bị, dụng cụ.\n3. Material: nguyên vật liệu, linh kiện.\n4. Method: phương pháp, quy trình, thông số.\n5. Measurement: đo lường. Environment: môi trường (nhiệt độ, độ ẩm, bụi).",
      "en": "1. Man: people, skills, training.\n2. Machine: equipment and tools.\n3. Material: raw material and components.\n4. Method: procedures and settings.\n5. Measurement: gauges and checks. Environment: temperature, humidity, dust."
    },
    "practicalExample": {
      "vi": "Lỗi lệch kích thước: nguyên nhân Method là thông số ép sai, Machine là khuôn mòn, Measurement là đồng hồ chưa hiệu chuẩn.",
      "en": "A dimension defect: Method is a wrong moulding setting, Machine is a worn die, Measurement is an uncalibrated gauge."
    },
    "formula": [],
    "exercise": {
      "vi": "Lỗi do thợ mới chưa được đào tạo thuộc nhóm nào?",
      "en": "A defect caused by an untrained new worker belongs to which group?"
    },
    "answer": {
      "vi": "Man (con người).",
      "en": "Man (people)."
    },
    "relatedTopics": []
  },
  {
    "slug": "capacity-utilization",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Capacity Utilization: mức sử dụng công suất",
      "en": "Capacity Utilization: how much capacity is used"
    },
    "summary": {
      "vi": "Capacity Utilization là tỷ lệ sản lượng thực tế trên công suất tối đa, cho biết dây chuyền đang dùng bao nhiêu năng lực.",
      "en": "Capacity Utilization is the ratio of actual output to maximum capacity, showing how much of the capacity is used."
    },
    "difficulty": "Beginner",
    "overview": {
      "vi": "Mức sử dụng thấp nghĩa là năng lực dư thừa; mức quá cao có thể làm máy quá tải và hỏng nhanh.",
      "en": "Low utilization means spare capacity; very high utilization can overload machines and cause faster wear."
    },
    "objectives": [
      {
        "vi": "Tính Capacity Utilization.",
        "en": "Calculate Capacity Utilization."
      },
      {
        "vi": "Đọc kết quả thấp và cao.",
        "en": "Read low and high results."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: Capacity Utilization = Actual Output ÷ Maximum Capacity × 100%.\n2. Actual Output là sản lượng thực tế của kỳ.\n3. Maximum Capacity là công suất tối đa của cùng kỳ.",
      "en": "1. Formula: Capacity Utilization = Actual Output ÷ Maximum Capacity × 100%.\n2. Actual Output is the output for the period.\n3. Maximum Capacity is the capacity for the same period."
    },
    "practicalExample": {
      "vi": "Công suất tối đa 480 sản phẩm, sản lượng thực tế 380: Capacity Utilization = 380 ÷ 480 = 79,2%.",
      "en": "Maximum capacity 480 units, actual output 380: Capacity Utilization = 380 ÷ 480 = 79.2%."
    },
    "formula": [],
    "exercise": {
      "vi": "Công suất tối đa 800 sản phẩm, sản lượng thực tế 600. Capacity Utilization là bao nhiêu?",
      "en": "Maximum capacity 800 units, actual output 600. What is the Capacity Utilization?"
    },
    "answer": {
      "vi": "600 ÷ 800 = 75%.",
      "en": "600 ÷ 800 = 75%."
    },
    "relatedTopics": []
  },
  {
    "slug": "bottleneck-rate",
    "categorySlug": "manufacturing-analytics",
    "title": {
      "vi": "Bottleneck Rate: tỷ lệ đạt của điểm nghẽn",
      "en": "Bottleneck Rate: achievement of the constraint"
    },
    "summary": {
      "vi": "Bottleneck Rate đo sản lượng của công đoạn nghẽn so với mục tiêu, vì nó quyết định sản lượng cả chuyền.",
      "en": "Bottleneck Rate compares the bottleneck step's output with its target, since that step sets the output of the whole line."
    },
    "difficulty": "Intermediate",
    "overview": {
      "vi": "Nếu điểm nghẽn đạt thấp hơn mục tiêu, cả chuyền sẽ không đạt mục tiêu dù các công đoạn khác tốt.",
      "en": "If the bottleneck is below target, the whole line misses target even if the other steps perform well."
    },
    "objectives": [
      {
        "vi": "Tính Bottleneck Rate.",
        "en": "Calculate Bottleneck Rate."
      },
      {
        "vi": "Liên hệ Bottleneck Rate với điểm nghẽn của chuyền.",
        "en": "Link Bottleneck Rate to the constraint of a line."
      }
    ],
    "explanation": {
      "vi": "1. Công thức: Bottleneck Rate = Bottleneck Output ÷ Target Output × 100%.\n2. Bottleneck Output là sản lượng thực tế của công đoạn nghẽn trong kỳ.\n3. Target Output là mục tiêu sản lượng của cùng kỳ.",
      "en": "1. Formula: Bottleneck Rate = Bottleneck Output ÷ Target Output × 100%.\n2. Bottleneck Output is the actual output of the bottleneck step in the period.\n3. Target Output is the target output for the same period."
    },
    "practicalExample": {
      "vi": "Mục tiêu 500 sản phẩm, công đoạn nghẽn làm 420: Bottleneck Rate = 420 ÷ 500 = 84%.",
      "en": "Target 500 units, bottleneck step made 420: Bottleneck Rate = 420 ÷ 500 = 84%."
    },
    "formula": [],
    "exercise": {
      "vi": "Mục tiêu 500 sản phẩm, công đoạn nghẽn làm 450. Bottleneck Rate là bao nhiêu?",
      "en": "Target 500 units, bottleneck step made 450. What is the Bottleneck Rate?"
    },
    "answer": {
      "vi": "450 ÷ 500 = 90%.",
      "en": "450 ÷ 500 = 90%."
    },
    "relatedTopics": []
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

/* ------------------------------------------------------------------ */
/* 02. LEARNING PATH                                                   */
/* ------------------------------------------------------------------ */

export const roadmaps: Roadmap[] = [
  {
    slug: "bi-engineer",
    title: { vi: "BI Engineer", en: "BI Engineer" },
    description: {
      vi: "SQL → Data Modeling → Power BI → ETL → Dashboard.",
      en: "SQL → Data Modeling → Power BI → ETL → Dashboard.",
    },
    modules: [
      {
        title: { vi: "SQL nâng cao", en: "Advanced SQL" },
        knowledge: { vi: "CTE, Window Functions.", en: "CTEs, window functions." },
        lessons: ["cte", "window-functions"],
        practice: { vi: "Tính lũy kế sản lượng theo ca.", en: "Compute running totals of output per shift." },
        status: "draft",
      },
      {
        title: { vi: "Data Modeling", en: "Data Modeling" },
        knowledge: { vi: "Star schema, fact và dimension.", en: "Star schema, fact and dimension tables." },
        lessons: ["data-warehouse"],
        practice: { vi: "Thiết kế star schema cho sản xuất.", en: "Design a star schema for production." },
        status: "draft",
      },
      {
        title: { vi: "Power BI", en: "Power BI" },
        knowledge: { vi: "Power Query, DAX cơ bản.", en: "Power Query, basic DAX." },
        lessons: ["power-bi"],
        practice: { vi: "Dựng báo cáo OEE theo ngày.", en: "Build a daily OEE report." },
        status: "draft",
      },
      {
        title: { vi: "ETL & Dashboard", en: "ETL & Dashboard" },
        knowledge: { vi: "Pipeline nạp dữ liệu, lịch làm mới.", en: "Ingestion pipelines and refresh schedules." },
        lessons: ["etl"],
        practice: { vi: "Xây pipeline từ CSV đến dashboard.", en: "Build a pipeline from CSV to dashboard." },
        status: "draft",
      },
    ],
  },
  {
    slug: "manufacturing-bi",
    title: { vi: "Manufacturing BI", en: "Manufacturing BI" },
    description: {
      vi: "Production Process → Manufacturing KPI → IoT → ERP → Production Dashboard.",
      en: "Production Process → Manufacturing KPI → IoT → ERP → Production Dashboard.",
    },
    modules: [
      {
        title: { vi: "Quy trình sản xuất", en: "Production Process" },
        knowledge: { vi: "Line, công đoạn, ca, lệnh sản xuất.", en: "Lines, stations, shifts, work orders." },
        lessons: ["mes"],
        practice: { vi: "Vẽ sơ đồ luồng sản phẩm của một line.", en: "Draw the product flow of one line." },
        status: "draft",
      },
      {
        title: { vi: "KPI sản xuất", en: "Manufacturing KPI" },
        knowledge: { vi: "OEE, UPH, Yield, Downtime.", en: "OEE, UPH, Yield, Downtime." },
        lessons: ["oee", "uph", "yield", "downtime"],
        practice: { vi: "Tính OEE từ dữ liệu mẫu.", en: "Calculate OEE from sample data." },
        status: "published",
      },
      {
        title: { vi: "IoT", en: "IoT" },
        knowledge: { vi: "PLC, cảm biến, MQTT.", en: "PLCs, sensors, MQTT." },
        lessons: ["plc", "mqtt", "sensor"],
        practice: { vi: "Đọc tín hiệu dừng máy từ PLC mô phỏng.", en: "Read machine-stop signals from a simulated PLC." },
        status: "draft",
      },
      {
        title: { vi: "ERP", en: "ERP" },
        knowledge: { vi: "Đơn hàng, tồn kho, định mức.", en: "Orders, inventory, bill of materials." },
        lessons: ["erp"],
        practice: { vi: "Đối chiếu sản lượng MES với đơn hàng ERP.", en: "Reconcile MES output with ERP orders." },
        status: "draft",
      },
      {
        title: { vi: "Production Dashboard", en: "Production Dashboard" },
        knowledge: { vi: "Thiết kế dashboard sản xuất theo vai trò.", en: "Design production dashboards per role." },
        lessons: ["andon"],
        practice: { vi: "Hoàn thiện dashboard sản xuất cuối khóa.", en: "Finish the production dashboard capstone." },
        status: "draft",
      },
    ],
  },
];

export function getRoadmap(slug: string) {
  return roadmaps.find((r) => r.slug === slug);
}

/* ------------------------------------------------------------------ */
/* 03. PRACTICE                                                        */
/* ------------------------------------------------------------------ */

export const kpis: Kpi[] = [
  {
    slug: "oee",
    name: { vi: "Overall Equipment Effectiveness", en: "Overall Equipment Effectiveness" },
    abbr: "OEE",
    formula: "Availability × Performance × Quality",
    unit: "%",
    description: {
      vi: "Hiệu suất tổng thể của thiết bị so với năng lực lý tưởng.",
      en: "Overall effectiveness of equipment against its ideal capacity.",
    },
    dataNeeded: ["run_time_min", "planned_time_min", "ideal_cycle_min", "total_count", "good_count"],
  },
  {
    slug: "uph",
    name: { vi: "Units Per Hour", en: "Units Per Hour" },
    abbr: "UPH",
    formula: "Số sản phẩm ÷ Số giờ công",
    unit: "units/h",
    description: {
      vi: "Năng suất lao động hoặc máy theo giờ.",
      en: "Output per labor or machine hour.",
    },
    dataNeeded: ["good_count", "labor_hours"],
  },
  {
    slug: "yield",
    name: { vi: "First Pass Yield", en: "First Pass Yield" },
    abbr: "Yield",
    formula: "Số sản phẩm đạt lần đầu ÷ Tổng số sản phẩm đầu vào",
    unit: "%",
    description: {
      vi: "Tỷ lệ sản phẩm đạt ngay lần đầu, không cần làm lại.",
      en: "Share of units passing on the first attempt without rework.",
    },
    dataNeeded: ["total_count", "good_count"],
  },
  {
    slug: "downtime",
    name: { vi: "Downtime", en: "Downtime" },
    abbr: "Downtime",
    formula: "Tổng thời gian dừng máy có kế hoạch sản xuất",
    unit: "min",
    description: {
      vi: "Thời gian máy không chạy trong ca sản xuất, gom theo nguyên nhân.",
      en: "Time the machine is not running during production, grouped by cause.",
    },
    dataNeeded: ["start_time", "end_time", "reason"],
  },
  {
    slug: "ng-rate",
    name: { vi: "NG Rate", en: "NG Rate" },
    abbr: "NG Rate",
    formula: "Số sản phẩm lỗi (NG) ÷ Tổng số sản phẩm",
    unit: "%",
    description: {
      vi: "Tỷ lệ sản phẩm không đạt (No Good).",
      en: "Share of no-good (NG) units.",
    },
    dataNeeded: ["total_count", "ng_count"],
  },
  {
    slug: "mttr",
    name: { vi: "Mean Time To Repair", en: "Mean Time To Repair" },
    abbr: "MTTR",
    formula: "Tổng thời gian sửa chữa ÷ Số lần hỏng",
    unit: "min",
    description: {
      vi: "Thời gian trung bình để khôi phục máy sau khi hỏng.",
      en: "Average time to restore a machine after a failure.",
    },
    dataNeeded: ["repair_minutes", "failure_count"],
  },
  {
    slug: "mtbf",
    name: { vi: "Mean Time Between Failures", en: "Mean Time Between Failures" },
    abbr: "MTBF",
    formula: "Tổng thời gian chạy ÷ Số lần hỏng",
    unit: "h",
    description: {
      vi: "Thời gian trung bình giữa hai lần hỏng.",
      en: "Average operating time between two failures.",
    },
    dataNeeded: ["run_time_min", "failure_count"],
  },
];

export const challenges = [
  {
    slug: "line-a-downtime",
    title: { vi: "Phân tích dừng máy Line A", en: "Line A Downtime Analysis" },
    brief: {
      vi: "Dữ liệu một tuần của Line A cho thấy OEE giảm vào ca đêm. Hãy tìm nguyên nhân chính và đề xuất hành động.",
      en: "A week of Line A data shows OEE dropping on night shifts. Find the main cause and propose an action.",
    },
    level: "Intermediate" as const,
  },
];

export const playgroundFiles = [
  {
    name: "nova_manufacturing_daily.csv",
    href: "/data/nova_manufacturing_daily.csv",
    description: {
      vi: "Sản lượng và dừng máy giả lập theo dây chuyền, ngày và ca (NOVA MANUFACTURING, đã ẩn danh).",
      en: "Simulated output and downtime by line, day and shift (NOVA MANUFACTURING, anonymized).",
    },
  },
];

/* ------------------------------------------------------------------ */
/* 04. PROJECTS                                                        */
/* ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    slug: "production-output-dashboard",
    title: { vi: "Production Output Dashboard", en: "Production Output Dashboard" },
    summary: {
      vi: "Theo dõi sản lượng theo line, ca và ngày so với kế hoạch.",
      en: "Track output by line, shift and day against plan.",
    },
    businessProblem: {
      vi: "Quản đốc chỉ biết sản lượng cuối ca, không biết line nào đang chậm tiến độ.",
      en: "Supervisors only see end-of-shift totals and cannot tell which line is falling behind.",
    },
    dataStructure: {
      vi: "production_records(order_id, machine_id, shift_id, record_time, good_qty, ng_qty, total_qty), nối production_orders(line_id, planned_qty).",
      en: "production_records(order_id, machine_id, shift_id, record_time, good_qty, ng_qty, total_qty), joined with production_orders(line_id, planned_qty).",
    },
    solution: {
      vi: "Tổng hợp sản lượng theo giờ, so sánh với planned_qty và tô màu cảnh báo khi dưới 90% kế hoạch.",
      en: "Aggregate output hourly, compare with planned_qty and flag lines below 90% of plan.",
    },
    dashboard: {
      vi: "Biểu đồ cột sản lượng theo line, đường lũy kế so với kế hoạch, bảng cảnh báo.",
      en: "Bar chart of output by line, cumulative line vs plan, alert table.",
    },
    businessValue: {
      vi: "Phát hiện chậm tiến độ trong ca thay vì đến cuối ngày.",
      en: "Catch schedule slippage during the shift instead of at end of day.",
    },
    tags: ["Output", "Plan vs Actual"],
  },
  {
    slug: "oee-monitoring",
    title: { vi: "OEE Monitoring", en: "OEE Monitoring" },
    summary: {
      vi: "Theo dõi OEE và ba thành phần của OEE theo máy.",
      en: "Monitor OEE and its three components by machine.",
    },
    businessProblem: {
      vi: "Không có một con số thống nhất để so sánh hiệu quả giữa các máy.",
      en: "There is no single consistent number to compare machine effectiveness.",
    },
    dataStructure: {
      vi: "production_records kết hợp machine_cycles và downtime_events (thời gian chạy, dừng, cycle time).",
      en: "production_records joined with machine_cycles and downtime_events (run time, stops, cycle time).",
    },
    solution: {
      vi: "Tính A × P × Q theo ngày, xếp hạng máy và xác định thành phần yếu nhất.",
      en: "Compute A × P × Q per day, rank machines and identify the weakest component.",
    },
    dashboard: {
      vi: "KPI card OEE, xu hướng 30 ngày, heatmap OEE theo máy × ngày.",
      en: "OEE KPI card, 30-day trend, machine × day heatmap.",
    },
    businessValue: {
      vi: "Ưu tiên cải tiến đúng máy và đúng thành phần tổn thất.",
      en: "Prioritize improvement on the right machine and loss component.",
    },
    tags: ["OEE", "Availability", "Performance", "Quality"],
  },
  {
    slug: "line-downtime-analysis",
    title: { vi: "Line Downtime Analysis", en: "Line Downtime Analysis" },
    summary: {
      vi: "Phân tích nguyên nhân dừng máy theo Pareto.",
      en: "Analyze stop causes with a Pareto view.",
    },
    businessProblem: {
      vi: "Dừng máy xảy ra thường xuyên nhưng không ai biết nguyên nhân nào chiếm phần lớn.",
      en: "Stops happen often, but nobody knows which causes account for most of the loss.",
    },
    dataStructure: {
      vi: "downtime_events(line_id, start_time, end_time, reason, category).",
      en: "downtime_events(line_id, start_time, end_time, reason, category).",
    },
    solution: {
      vi: "Gom theo reason, tính thời gian và tỷ lệ tích lũy, xếp biểu đồ Pareto.",
      en: "Group by reason, compute duration and cumulative share, plot a Pareto chart.",
    },
    dashboard: {
      vi: "Biểu đồ Pareto, bảng top 5 nguyên nhân, xu hướng theo ca.",
      en: "Pareto chart, top-5 causes table, trend by shift.",
    },
    businessValue: {
      vi: "Tập trung 20% nguyên nhân gây ra phần lớn thời gian dừng.",
      en: "Focus on the 20% of causes responsible for most of the downtime.",
    },
    tags: ["Downtime", "Pareto"],
  },
  {
    slug: "ng-yield-tracking",
    title: { vi: "NG & Yield Tracking", en: "NG & Yield Tracking" },
    summary: {
      vi: "Theo dõi tỷ lệ lỗi và yield theo công đoạn.",
      en: "Track defect rate and yield by station.",
    },
    businessProblem: {
      vi: "Tỷ lệ NG tăng nhưng không rõ công đoạn nào gây ra.",
      en: "NG rate rises, but the responsible station is unclear.",
    },
    dataStructure: {
      vi: "inspection_results(station_id, product_id, result, defect_code, inspected_at).",
      en: "inspection_results(station_id, product_id, result, defect_code, inspected_at).",
    },
    solution: {
      vi: "Tính NG rate và First Pass Yield theo station và defect_code.",
      en: "Compute NG rate and First Pass Yield by station and defect_code.",
    },
    dashboard: {
      vi: "Yield theo công đoạn, Pareto lỗi, xu hướng tuần.",
      en: "Yield by station, defect Pareto, weekly trend.",
    },
    businessValue: {
      vi: "Khoanh vùng công đoạn lỗi và giảm chi phí làm lại.",
      en: "Isolate the faulty station and reduce rework cost.",
    },
    tags: ["NG", "Yield", "Quality"],
  },
  {
    slug: "andon-monitoring",
    title: { vi: "Andon Monitoring", en: "Andon Monitoring" },
    summary: {
      vi: "Hiển thị trạng thái line theo thời gian thực bằng đèn Andon.",
      en: "Show live line status with Andon signals.",
    },
    businessProblem: {
      vi: "Khi có sự cố, công nhân phải chờ lâu mới có người hỗ trợ.",
      en: "When an issue occurs, operators wait a long time for support.",
    },
    dataStructure: {
      vi: "andon_events(line_id, call_type, raised_at, acknowledged_at, resolved_at).",
      en: "andon_events(line_id, call_type, raised_at, acknowledged_at, resolved_at).",
    },
    solution: {
      vi: "Đo thời gian phản hồi (acknowledged_at − raised_at) và thời gian xử lý.",
      en: "Measure response time (acknowledged_at − raised_at) and resolution time.",
    },
    dashboard: {
      vi: "Trạng thái line theo màu, thời gian phản hồi trung bình, số lần gọi theo ca.",
      en: "Line status by color, average response time, call count per shift.",
    },
    businessValue: {
      vi: "Rút ngắn thời gian chờ hỗ trợ và giảm dừng máy kéo dài.",
      en: "Shorten support wait time and reduce prolonged stops.",
    },
    tags: ["Andon", "Response time"],
  },
  {
    slug: "production-efficiency-analysis",
    title: { vi: "Production Efficiency Analysis", en: "Production Efficiency Analysis" },
    summary: {
      vi: "So sánh hiệu suất lao động và UPH giữa các ca.",
      en: "Compare labor efficiency and UPH across shifts.",
    },
    businessProblem: {
      vi: "Các ca có số người khác nhau nhưng chưa có cách so sánh công bằng.",
      en: "Shifts have different headcounts, with no fair way to compare them.",
    },
    dataStructure: {
      vi: "production_records kết hợp shifts và employees (ca, nhân viên vận hành).",
      en: "production_records joined with shifts and employees (shift, operators).",
    },
    solution: {
      vi: "Tính UPH theo giờ công và chuẩn hóa theo định mức.",
      en: "Compute UPH per labor hour and normalize against standard.",
    },
    dashboard: {
      vi: "UPH theo ca, so với định mức, phân bố theo ngày trong tuần.",
      en: "UPH by shift vs standard, distribution by weekday.",
    },
    businessValue: {
      vi: "Đánh giá hiệu suất công bằng và tìm ca cần hỗ trợ đào tạo.",
      en: "Evaluate efficiency fairly and find shifts needing training.",
    },
    tags: ["UPH", "Labor"],
  },
  {
    slug: "machine-data-monitoring",
    title: { vi: "Machine Data Monitoring", en: "Machine Data Monitoring" },
    summary: {
      vi: "Thu thập tín hiệu từ PLC/cảm biến để theo dõi trạng thái máy.",
      en: "Collect PLC and sensor signals to monitor machine state.",
    },
    businessProblem: {
      vi: "Trạng thái máy chỉ được ghi tay, dễ sai và trễ.",
      en: "Machine state is logged by hand, which is error-prone and delayed.",
    },
    dataStructure: {
      vi: "machine_signals(machine_id, signal_name, value, ts) qua MQTT.",
      en: "machine_signals(machine_id, signal_name, value, ts) received via MQTT.",
    },
    solution: {
      vi: "Chuẩn hóa tín hiệu thành trạng thái RUN / STOP / FAULT và lưu theo khoảng thời gian.",
      en: "Normalize signals into RUN / STOP / FAULT states and store them as time intervals.",
    },
    dashboard: {
      vi: "Timeline trạng thái máy, tỷ lệ RUN theo ca, cảnh báo FAULT.",
      en: "Machine state timeline, RUN share per shift, FAULT alerts.",
    },
    businessValue: {
      vi: "Dữ liệu tự động, chính xác và đủ để tính OEE tự động.",
      en: "Automatic, accurate data that is sufficient to calculate OEE automatically.",
    },
    tags: ["IoT", "MQTT", "PLC"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/* ------------------------------------------------------------------ */
/* 05. RESOURCES                                                       */
/* ------------------------------------------------------------------ */

export const resources = [
  {
    title: { vi: "Mẫu tính OEE (Excel)", en: "OEE calculator template (Excel)" },
    type: "Template",
    description: { vi: "Bảng tính sẵn Availability, Performance, Quality.", en: "Prebuilt sheet for Availability, Performance and Quality." },
  },
  {
    title: { vi: "SQL Cheat Sheet", en: "SQL Cheat Sheet" },
    type: "Cheat Sheet",
    description: { vi: "SELECT, JOIN, GROUP BY, window functions trong một trang.", en: "SELECT, JOIN, GROUP BY and window functions on one page." },
  },
  {
    title: { vi: "Dữ liệu mẫu sản xuất (CSV)", en: "Sample production data (CSV)" },
    type: "CSV",
    description: { vi: "Dữ liệu giả lập để luyện tập.", en: "Simulated data for practice." },
    href: "/data/nova_manufacturing_daily.csv",
  },
];

/* ------------------------------------------------------------------ */
/* 06. CAREER                                                          */
/* ------------------------------------------------------------------ */

export const careerRoadmap = [
  { vi: "Data Analyst (Excel, SQL cơ bản)", en: "Data Analyst (Excel, basic SQL)" },
  { vi: "BI Developer (Power BI, data modeling)", en: "BI Developer (Power BI, data modeling)" },
  { vi: "BI Engineer (ETL, pipeline, dashboard)", en: "BI Engineer (ETL, pipelines, dashboards)" },
  { vi: "Manufacturing BI Lead (KPI sản xuất, IoT, MES/ERP)", en: "Manufacturing BI Lead (manufacturing KPIs, IoT, MES/ERP)" },
] as Bi[];
