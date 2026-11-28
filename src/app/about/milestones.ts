import type { Bi } from "@/lib/i18n";

/* Các mốc trong hành trình nghề nghiệp. Chỉ ghi những gì đã có trong mô tả; không thêm thành tích hay số liệu. */

export type MilestoneDetail = {
  overview: Bi;
  workTitle: Bi; // "What I Worked On" hoặc "What I Learned"
  work: Bi[];
  projects?: { name: Bi; points: Bi[] }[];
  skills: string[];
  learning: Bi;
};

export type Milestone = {
  period: Bi;
  title: Bi; // tiêu đề trên thẻ
  sub: Bi; // dòng phụ: vai trò hoặc nhóm kỹ năng
  short: Bi; // mô tả ngắn trên thẻ
  detail?: MilestoneDetail; // có thì thẻ bấm được và mở chi tiết
};

export const MILESTONES: Milestone[] = [
  {
    period: { vi: "2020 – 2024", en: "2020 – 2024" },
    title: { vi: "Đào tạo Tự động hóa", en: "Automation Education" },
    sub: { vi: "PLC · Điều khiển · Tự động hóa", en: "PLC · Control · Automation" },
    short: {
      vi: "Học và xây dựng nền tảng về PLC, hệ thống điều khiển và tự động hóa công nghiệp.",
      en: "Studied and built a foundation in PLC, control systems, and industrial automation.",
    },
    detail: {
      overview: {
        vi: "Bắt đầu hành trình trong lĩnh vực Kỹ thuật Tự động hóa và Điều khiển, xây dựng nền tảng kỹ thuật về tự động hóa công nghiệp và hệ thống sản xuất.",
        en: "Started my journey in Automation and Control Engineering Technology, developing a technical foundation in industrial automation and manufacturing systems.",
      },
      workTitle: { vi: "Những gì tôi đã học", en: "What I Learned" },
      work: [
        { vi: "Bộ điều khiển logic khả trình (PLC)", en: "Programmable Logic Controllers (PLC)" },
        { vi: "Tự động hóa công nghiệp", en: "Industrial Automation" },
        { vi: "Hệ thống điều khiển", en: "Control Systems" },
        { vi: "SCADA & HMI", en: "SCADA & HMI" },
        { vi: "Truyền thông công nghiệp", en: "Industrial Communication" },
        { vi: "Hệ thống điện và tự động hóa", en: "Electrical and Automation Systems" },
      ],
      skills: ["Siemens PLC", "SCADA", "HMI", "AutoCAD", "MATLAB", "C++", "C#", "Python"],
      learning: {
        vi: "Hiểu cách máy móc, hệ thống điều khiển và quy trình công nghiệp vận hành cùng nhau trong môi trường sản xuất.",
        en: "Developed an understanding of how machines, control systems, and industrial processes work together in a manufacturing environment.",
      },
    },
  },
  {
    period: { vi: "2023 – 2024", en: "2023 – 2024" },
    title: { vi: "Unilever Vietnam", en: "Unilever Vietnam" },
    sub: { vi: "Thực tập sinh Kỹ thuật Quy trình", en: "Process Engineering Intern" },
    short: {
      vi: "Power BI, Dashboard 5S và Lập kế hoạch bảo trì.",
      en: "Power BI, 5S Dashboard, and Maintenance Planning.",
    },
    detail: {
      overview: {
        vi: "Được tiếp cận thực tế với vận hành sản xuất và kỹ thuật quy trình trong một môi trường sản xuất toàn cầu.",
        en: "Gained practical exposure to manufacturing operations and process engineering in a global manufacturing environment.",
      },
      workTitle: { vi: "Công việc đã tham gia", en: "What I Worked On" },
      work: [
        { vi: "Hỗ trợ các hoạt động kỹ thuật quy trình.", en: "Supported process engineering activities." },
        { vi: "Làm việc với Power BI để báo cáo liên quan đến sản xuất.", en: "Worked with Power BI for manufacturing-related reporting." },
        { vi: "Xây dựng Dashboard 5S.", en: "Developed a 5S Dashboard." },
        { vi: "Tiếp cận công tác lập kế hoạch bảo trì.", en: "Gained exposure to maintenance planning." },
        { vi: "Tìm hiểu cách dữ liệu hỗ trợ vận hành sản xuất.", en: "Learned how data supports manufacturing operations." },
      ],
      skills: ["Power BI", "Data Visualization", "5S", "Maintenance Planning", "Process Engineering"],
      learning: {
        vi: "Bắt đầu thấy cách phân tích và trực quan hóa dữ liệu có thể giúp cải thiện quy trình sản xuất và hỗ trợ quyết định vận hành.",
        en: "Started seeing how data analytics and visualization could help improve manufacturing processes and support operational decisions.",
      },
    },
  },
  {
    period: { vi: "2024", en: "2024" },
    title: { vi: "Milwaukee Tool", en: "Milwaukee Tool" },
    sub: { vi: "Thực tập sinh BI", en: "BI Intern" },
    short: {
      vi: "Phân tích dữ liệu sản xuất và Dashboard Power BI.",
      en: "Production Data Analysis and Power BI Dashboards.",
    },
    detail: {
      overview: {
        vi: "Lần đầu làm việc thực tế với Business Intelligence trong môi trường sản xuất.",
        en: "My first hands-on experience working with Business Intelligence in a manufacturing environment.",
      },
      workTitle: { vi: "Công việc đã tham gia", en: "What I Worked On" },
      work: [
        { vi: "Phân tích dữ liệu sản xuất.", en: "Analyzed production data." },
        { vi: "Xây dựng Dashboard Power BI.", en: "Developed Power BI dashboards." },
        { vi: "Làm việc với dữ liệu liên quan đến sản xuất.", en: "Worked with production-related data." },
        { vi: "Tìm hiểu KPI sản xuất và theo dõi hiệu suất.", en: "Explored manufacturing KPIs and performance monitoring." },
        { vi: "Phối hợp với các bên liên quan trong sản xuất.", en: "Collaborated with manufacturing stakeholders." },
      ],
      skills: ["SQL", "Power BI", "Data Analysis", "Manufacturing KPIs", "Production Data"],
      learning: {
        vi: "Kết nối nền tảng Tự động hóa với Phân tích dữ liệu, và tìm thấy sự quan tâm của tôi đối với Business Intelligence trong sản xuất.",
        en: "Connected my Automation background with Data Analytics and discovered my interest in Manufacturing Business Intelligence.",
      },
    },
  },
  {
    period: { vi: "2025 – Hiện tại", en: "2025 – Present" },
    title: { vi: "Kỹ sư BI", en: "BI Engineering" },
    sub: { vi: "Milwaukee Tool Vietnam · Kỹ sư Business Intelligence", en: "Milwaukee Tool Vietnam · Business Intelligence Engineer" },
    short: {
      vi: "Phân tích sản xuất – Andon, Total Yield và Digital MDI.",
      en: "Manufacturing Analytics – Andon, Total Yield, and Digital MDI.",
    },
    detail: {
      overview: {
        vi: "Hiện làm việc trong lĩnh vực Business Intelligence tại môi trường sản xuất, tập trung vào dữ liệu sản xuất, giải pháp phân tích và các sáng kiến sản xuất số.",
        en: "Currently working in Business Intelligence within a manufacturing environment, focusing on production data, analytics solutions, and digital manufacturing initiatives.",
      },
      workTitle: { vi: "Trách nhiệm khác", en: "Other Responsibilities" },
      work: [
        { vi: "Phát triển và duy trì các dashboard sản xuất.", en: "Develop and maintain manufacturing dashboards." },
        { vi: "Phân tích hiệu suất sản xuất và KPI vận hành.", en: "Analyze production performance and operational KPIs." },
        { vi: "Làm việc với dữ liệu ERP và dữ liệu sản xuất.", en: "Work with ERP and production data." },
        { vi: "Phối hợp với bộ phận Sản xuất, Kỹ thuật và các bên liên quan khác.", en: "Collaborate with Production, Engineering, and other stakeholders." },
        { vi: "Hỗ trợ ra quyết định dựa trên dữ liệu.", en: "Support data-driven decision-making." },
      ],
      projects: [
        {
          name: { vi: "Andon", en: "Andon" },
          points: [
            { vi: "Theo dõi tình trạng dây chuyền sản xuất.", en: "Production line monitoring." },
            { vi: "Theo dõi và trực quan hóa thời gian dừng máy.", en: "Downtime tracking and visualization." },
            { vi: "Hỗ trợ minh bạch sản xuất qua các giải pháp giám sát số.", en: "Supporting production visibility through digital monitoring solutions." },
          ],
        },
        {
          name: { vi: "Total Yield", en: "Total Yield" },
          points: [
            { vi: "Theo dõi sản lượng đạt (yield).", en: "Production yield monitoring." },
            { vi: "Phân tích hiệu suất chất lượng.", en: "Quality performance analysis." },
            { vi: "Hỗ trợ minh bạch các chỉ số chất lượng sản xuất.", en: "Supporting visibility into production quality metrics." },
          ],
        },
        {
          name: { vi: "Digital MDI", en: "Digital MDI" },
          points: [
            { vi: "Hỗ trợ các sáng kiến sản xuất số.", en: "Supporting digital manufacturing initiatives." },
            { vi: "Tìm hướng số hóa các quy trình sản xuất.", en: "Exploring opportunities to digitize manufacturing processes." },
            { vi: "Xây dựng giải pháp nâng cao minh bạch và hiệu quả vận hành.", en: "Developing solutions to improve operational visibility and efficiency." },
          ],
        },
      ],
      skills: ["SQL", "Power BI", "Grafana", "PostgreSQL", "ERP", "Manufacturing Analytics", "Data Visualization", "Production KPIs"],
      learning: {
        vi: "Kỹ năng kỹ thuật thôi chưa đủ. Hiểu quy trình sản xuất, yêu cầu nghiệp vụ và các thách thức vận hành cũng quan trọng không kém khi xây dựng giải pháp dữ liệu có ý nghĩa.",
        en: "Technical skills alone are not enough. Understanding manufacturing processes, business requirements, and operational challenges is equally important when building meaningful data solutions.",
      },
    },
  },
  {
    period: { vi: "2026 – Về sau", en: "2026 – Future" },
    title: { vi: "NOVA DATA", en: "NOVA DATA" },
    sub: { vi: "Chia sẻ & cộng đồng", en: "Sharing & community" },
    short: {
      vi: "Chia sẻ kiến thức, xây dựng tài liệu và phát triển cộng đồng học Data.",
      en: "Sharing knowledge, building learning materials and growing a community of Data learners.",
    },
  },
];

/* Đoạn Sứ mệnh mặc định. Đoạn cuối cùng hiển thị đậm. */
export const MISSION: { vi: string; en: string }[] = [
  {
    vi: "Từ Automation đến Data, từ những kiến thức cơ bản đến các ứng dụng thực tế trong nhà máy, mình muốn hệ thống lại mọi thứ thành những bài học dễ hiểu, có lộ trình và có thể thực hành.",
    en: "From Automation to Data, from basic knowledge to real applications in the factory, I want to organize everything into easy-to-follow lessons with a clear path that you can practice.",
  },
  {
    vi: "Mình hy vọng NOVA DATA sẽ trở thành một nơi mà bạn có thể bắt đầu học Data, tìm thấy tài liệu hữu ích và cùng mình tiến bộ từng ngày.",
    en: "I hope NOVA DATA becomes a place where you can start learning Data, find useful materials, and grow with me day by day.",
  },
  {
    vi: "Không cần biết tất cả mới bắt đầu. Chúng ta có thể vừa học, vừa làm và cùng nhau phát triển. ❤️",
    en: "You do not need to know everything before you start. We can learn, practice and grow together. ❤️",
  },
];
