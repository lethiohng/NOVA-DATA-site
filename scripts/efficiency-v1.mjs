// Bài Efficiency (hiệu suất lao động) cho danh mục Manufacturing Analytics.
// Được chèn vào src/lib/content.ts bởi scripts/insert-efficiency.mjs.
export const EFF_TOPIC = { slug: "efficiency", title: { vi: "Efficiency", en: "Efficiency" }, status: "published" };

export const EFF_ARTICLE = {
  slug: "efficiency",
  categorySlug: "manufacturing-analytics",
  title: { vi: "Efficiency: hiệu suất lao động trong nhà máy", en: "Efficiency: labor performance on the factory floor" },
  summary: {
    vi: "Efficiency so sánh giờ công tiêu chuẩn với giờ công thực tế để đo hiệu suất lao động của một dây chuyền hoặc một ca.",
    en: "Efficiency compares standard man hours with actual man hours to measure the labor performance of a line or shift.",
  },
  difficulty: "Intermediate",
  overview: {
    vi: "OEE đo hiệu suất của máy. Efficiency đo hiệu suất của người: một dây chuyền làm ra đúng sản lượng với số giờ công mà tiêu chuẩn cho phép hay tốn nhiều hơn? Câu hỏi này giúp quản lý biết ca nào cần thêm đào tạo, line nào đang tốn giờ công và cần điều phối lại nhân sự. Bài này giải thích công thức, cách tính giờ công tiêu chuẩn và những lưu ý khi thu thập dữ liệu.",
    en: "OEE measures machine performance. Efficiency measures labor performance: did a line produce the planned output in the standard number of man hours, or did it take more? This tells managers which shift needs training and which line is spending too many hours. This lesson explains the formula, how to calculate standard man hours and what to watch when collecting the data.",
  },
  objectives: [
    { vi: "Viết được công thức Efficiency và giải thích từng thành phần.", en: "Write the Efficiency formula and explain each component." },
    { vi: "Tính được Standard Routing, Standard Hours và Efficiency từ dữ liệu giờ công và sản lượng.", en: "Calculate Standard Routing, Standard Hours and Efficiency from man-hour and output data." },
    { vi: "Đọc được ý nghĩa của kết quả trên, dưới và bằng 100%.", en: "Interpret results above, below and equal to 100%." },
    { vi: "Phân biệt Efficiency với OEE và xác định đúng phạm vi giờ công thực tế.", en: "Distinguish Efficiency from OEE and define the scope of actual man hours correctly." },
  ],
  explanation: {
    vi: "1. Efficiency (hiệu suất lao động) so sánh số giờ công tiêu chuẩn cần để làm ra sản lượng thực tế với số giờ công thực tế đã bỏ ra.\n2. Công thức chính:\nEfficiency = (Standard Man Hours ÷ Actual Man Hours) × (Actual Output ÷ Standard Output) × 100%.\nTrong đó: Standard Man Hours là giờ công tiêu chuẩn; Actual Man Hours là giờ công thực tế; Standard Output là sản lượng tiêu chuẩn; Actual Output là sản lượng thực tế.\n3. Cách tính đơn giản hơn qua hai bước:\n- Standard Routing = Standard Man Hours ÷ Standard Output (giờ công tiêu chuẩn cho một sản phẩm, đơn vị giờ/sản phẩm).\n- Standard Hours = Standard Routing × Actual Output (giờ công lẽ ra cần để làm đúng sản lượng thực tế).\nKhi đó: Efficiency = Standard Hours ÷ Actual Man Hours × 100%.\n4. Ý nghĩa kết quả: bằng 100% nghĩa là làm đúng chuẩn; lớn hơn 100% nghĩa là dùng ít giờ công hơn chuẩn; nhỏ hơn 100% nghĩa là tốn nhiều giờ công hơn chuẩn.\n5. Lưu ý về giờ công thực tế: Actual Man Hours là tổng giờ công của mọi nhân viên tham gia sản xuất (vận hành, hỗ trợ, kiểm tra, sửa chữa tại chỗ), không chỉ thời gian máy chạy. Nếu chỉ tính giờ máy chạy, Efficiency sẽ bị đánh giá sai.\n6. Efficiency và OEE khác nhau: OEE đo hiệu suất thiết bị qua Availability, Performance và Quality; Efficiency đo hiệu suất lao động. Hai chỉ số bổ sung cho nhau: máy chạy tốt nhưng cần quá nhiều người thì Efficiency thấp.\n7. Đơn vị phải thống nhất: giờ công (man hours), sản lượng cùng loại sản phẩm, và cùng khoảng thời gian cho cả tử và mẫu.",
    en: "1. Efficiency compares the standard man hours needed to make the actual output with the actual man hours spent.\n2. Main formula:\nEfficiency = (Standard Man Hours ÷ Actual Man Hours) × (Actual Output ÷ Standard Output) × 100%.\nWhere: Standard Man Hours is the standard labor time; Actual Man Hours is the labor time spent; Standard Output is the standard output; Actual Output is the actual output.\n3. A simpler two-step calculation:\n- Standard Routing = Standard Man Hours ÷ Standard Output (standard labor time per unit, in hours per unit).\n- Standard Hours = Standard Routing × Actual Output (the labor time that should have been needed for the actual output).\nThen: Efficiency = Standard Hours ÷ Actual Man Hours × 100%.\n4. Meaning of the result: 100% means exactly on standard; above 100% means fewer hours than standard; below 100% means more hours than standard.\n5. About actual man hours: this is the total labor time of everyone who took part in production (operators, support, inspection, on-site repair), not only the time the machine ran. Counting only machine run time gives a wrong Efficiency.\n6. Efficiency and OEE differ: OEE measures equipment performance through Availability, Performance and Quality; Efficiency measures labor performance. They complement each other: a machine can run well and still need too many people, giving low Efficiency.\n7. Units must match: man hours, the same product type for output, and the same period for numerator and denominator.",
  },
  extraSections: [
    {
      title: { vi: "Ứng dụng trong nhà máy", en: "Manufacturing application" },
      body: {
        vi: "Vấn đề nghiệp vụ: quản lý muốn biết dây chuyền nào đang tốn nhiều giờ công hơn chuẩn để điều phối lại nhân sự.\nDữ liệu có sẵn: giờ công tiêu chuẩn của sản phẩm (từ định mức), sản lượng tiêu chuẩn và sản lượng thực tế của ca, và tổng giờ công thực tế từ hệ thống chấm công hoặc nhân sự.\nLogic: tính Standard Routing từ định mức, nhân với sản lượng thực tế để có Standard Hours, rồi chia cho giờ công thực tế của cùng ca.\nKết quả mong đợi: một Efficiency cho mỗi dây chuyền hoặc mỗi ca. Trong ví dụ, L01 đạt 100%, còn L02 đạt khoảng 73,85%, tức là L02 tốn nhiều giờ công hơn chuẩn.\nGiá trị kinh doanh: phát hiện ca hoặc line cần hỗ trợ, so sánh công bằng giữa các ca khi dùng cùng định mức, và giảm chi phí nhân công trên mỗi sản phẩm.",
        en: "Business problem: managers want to know which line uses more labor hours than the standard, so they can rebalance staff.\nAvailable data: the standard labor time per product (from the standard), the standard and actual output for the shift, and total actual man hours from time-attendance or HR systems.\nLogic: calculate Standard Routing from the standard, multiply by actual output to get Standard Hours, then divide by the actual man hours for the same shift.\nExpected result: one Efficiency per line or per shift. In the example, L01 reaches 100% and L02 about 73.85%, meaning L02 uses more labor hours than the standard.\nBusiness value: find the shift or line that needs support, compare shifts fairly when they use the same standard, and reduce labor cost per unit.",
      },
    },
    {
      title: { vi: "Tổng kết và bài tiếp theo", en: "Key takeaways and what's next" },
      body: {
        vi: "Tổng kết:\n- Efficiency = Standard Hours ÷ Actual Man Hours × 100%, với Standard Hours = Standard Routing × Actual Output.\n- 100% là đúng chuẩn; trên 100% là nhanh hơn chuẩn; dưới 100% là tốn giờ công.\n- Giờ công thực tế gồm mọi người tham gia sản xuất, không chỉ thời gian máy chạy.\nBài tiếp theo: tiếp tục với các công thức trong bài Công thức nhà máy, và các khóa SQL để tính các chỉ số này trên dữ liệu.",
        en: "Key takeaways:\n- Efficiency = Standard Hours ÷ Actual Man Hours × 100%, where Standard Hours = Standard Routing × Actual Output.\n- 100% is on standard; above 100% is faster than standard; below 100% uses more labor hours.\n- Actual man hours include everyone who took part in production, not only machine run time.\nNext: the Manufacturing Formulas lesson for more formulas, and the SQL courses to calculate these metrics on data.",
      },
    },
  ],
  practicalExample: {
    vi: "Thực hành: (1) đọc ví dụ chuẩn: 80 giờ công cho 100 sản phẩm, làm 90 sản phẩm trong 72 giờ; (2) tính Standard Routing, Standard Hours và Efficiency; (3) chạy truy vấn SQL so sánh hai dây chuyền. Kết quả mong đợi: ví dụ chuẩn cho Efficiency 100%; dây chuyền L01 đạt 100,00%, L02 đạt 73,85%.",
    en: "Hands-on: (1) read the standard example: 80 man hours for 100 units, 90 units made in 72 hours; (2) calculate Standard Routing, Standard Hours and Efficiency; (3) run the SQL query comparing two lines. Expected result: the standard example gives 100% efficiency; line L01 reaches 100.00% and L02 73.85%.",
  },
  formula: [
    {
      label: "PostgreSQL",
      code: "-- Ví dụ chuẩn: 80 giờ công cho 100 sản phẩm; làm 90 sản phẩm trong 72 giờ\nWITH std AS (\n  SELECT 80.0 AS std_hours, 100 AS std_output, 90 AS actual_output, 72.0 AS actual_hours\n)\nSELECT ROUND(100.0 * ((std_hours / std_output) * actual_output) / actual_hours, 2) AS efficiency_pct\nFROM std;\n\n-- So sánh hai dây chuyền\nWITH lines_data (line_code, std_hours, std_output, actual_output, actual_hours) AS (\n  VALUES ('L01', 80.0, 100, 90, 72.0),\n         ('L02', 120.0, 150, 120, 130.0)\n)\nSELECT line_code,\n       ROUND(100.0 * ((std_hours / std_output) * actual_output) / actual_hours, 2) AS efficiency_pct\nFROM lines_data\nORDER BY line_code;",
    },
  ],
  exercise: {
    vi: "1) (Trắc nghiệm) Standard Routing là gì?\nA. Giờ công thực tế ÷ sản lượng thực tế\nB. Giờ công tiêu chuẩn ÷ sản lượng tiêu chuẩn\nC. Sản lượng ÷ giờ máy chạy\nD. Thời gian dừng ÷ thời gian kế hoạch\n2) (Tính) Giờ công tiêu chuẩn 60 giờ cho 120 sản phẩm. Ca làm 100 sản phẩm trong 55 giờ công. Efficiency là bao nhiêu? (làm tròn 2 chữ số)\n3) (Đúng/Sai) Efficiency vẫn đúng khi Actual Man Hours chỉ tính thời gian máy chạy.\n4) (Phân tích) Một ca có Efficiency 120%. Điều này có nghĩa gì?\n5) (Phân biệt) Efficiency khác OEE ở điểm nào?",
    en: "1) (Multiple choice) What is Standard Routing?\nA. Actual man hours ÷ actual output\nB. Standard man hours ÷ standard output\nC. Output ÷ machine run hours\nD. Stop time ÷ planned time\n2) (Calculate) The standard is 60 man hours for 120 units. A shift makes 100 units in 55 man hours. What is the Efficiency? (round to 2 decimals)\n3) (True/False) Efficiency is still correct if Actual Man Hours only counts machine run time.\n4) (Analysis) A shift has an Efficiency of 120%. What does this mean?\n5) (Distinguish) How does Efficiency differ from OEE?",
  },
  answer: {
    vi: "1) B.\n2) Standard Routing = 60 ÷ 120 = 0,5 giờ/sản phẩm; Standard Hours = 0,5 × 100 = 50 giờ; Efficiency = 50 ÷ 55 × 100% = 90,91%.\n3) Sai. Actual Man Hours phải gồm giờ công của mọi người tham gia sản xuất, không chỉ thời gian máy chạy.\n4) Ca này dùng ít giờ công hơn chuẩn để làm ra sản lượng thực tế, tức là làm nhanh hơn chuẩn.\n5) Efficiency đo hiệu suất lao động (người); OEE đo hiệu suất thiết bị (máy) qua Availability, Performance và Quality.",
    en: "1) B.\n2) Standard Routing = 60 ÷ 120 = 0.5 hour/unit; Standard Hours = 0.5 × 100 = 50 hours; Efficiency = 50 ÷ 55 × 100% = 90.91%.\n3) False. Actual Man Hours must include the labor of everyone who took part in production, not only machine run time.\n4) The shift used fewer labor hours than the standard to make the actual output, so it worked faster than standard.\n5) Efficiency measures labor performance; OEE measures equipment performance through Availability, Performance and Quality.",
  },
  relatedTopics: ["oee", "uph"],
};
