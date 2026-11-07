// Bài Attainment (mức đạt kế hoạch sản lượng) cho danh mục Manufacturing Analytics.
// Được chèn vào src/lib/content.ts bởi scripts/insert-attainment.mjs.
export const ATT_TOPIC = { slug: "attainment", title: { vi: "Attainment", en: "Attainment" }, status: "published" };

export const ATT_ARTICLE = {
  slug: "attainment",
  categorySlug: "manufacturing-analytics",
  title: { vi: "Attainment: mức đạt kế hoạch sản lượng", en: "Attainment: achievement of the output target" },
  summary: {
    vi: "Attainment so sánh sản lượng thực tế với sản lượng mục tiêu để biết một line hoặc một ca đã đạt kế hoạch đến đâu.",
    en: "Attainment compares actual output with the target output to show how far a line or shift has met its plan.",
  },
  difficulty: "Beginner",
  overview: {
    vi: "Mỗi ca, mỗi dây chuyền đều có một mục tiêu sản lượng. Attainment trả lời câu hỏi đơn giản nhất: hôm nay đã làm được bao nhiêu so với kế hoạch? Đây là KPI quản lý thường xem đầu tiên, trước khi đi sâu vào nguyên nhân bằng OEE hay Efficiency. Bài này giải thích công thức, cách đọc kết quả và cách phân biệt Attainment với Efficiency.",
    en: "Every shift and every line has an output target. Attainment answers the simplest question: how much did we produce compared with the plan? Managers usually check it first, before looking into causes with OEE or Efficiency. This lesson explains the formula, how to read the result, and how Attainment differs from Efficiency.",
  },
  objectives: [
    { vi: "Viết được công thức Attainment và giải thích các thành phần.", en: "Write the Attainment formula and explain its components." },
    { vi: "Tính được Attainment từ sản lượng thực tế và sản lượng mục tiêu.", en: "Calculate Attainment from actual output and target output." },
    { vi: "Đọc được ý nghĩa của kết quả trên, dưới và bằng 100%.", en: "Interpret results above, below and equal to 100%." },
    { vi: "Phân biệt Attainment với Efficiency và giải thích vì sao một line có thể đạt Attainment nhưng Efficiency thấp.", en: "Distinguish Attainment from Efficiency and explain why a line can reach Attainment but have low Efficiency." },
  ],
  explanation: {
    vi: "1. Attainment (mức đạt kế hoạch) là tỷ lệ giữa sản lượng thực tế và sản lượng mục tiêu.\n2. Công thức: Attainment = Actual Output ÷ Target Output × 100%.\nTrong đó: Actual Output là sản lượng thực tế; Target Output là sản lượng mục tiêu hoặc kế hoạch cho cùng khoảng thời gian.\n3. Ví dụ: mục tiêu 1.000 sản phẩm, thực tế 900 sản phẩm, thì Attainment = 900 ÷ 1.000 × 100% = 90%.\n4. Ý nghĩa kết quả: bằng 100% là đạt đúng mục tiêu; trên 100% là vượt mục tiêu; dưới 100% là chưa đạt mục tiêu.\n5. Lưu ý về đơn vị: tử và mẫu phải cùng loại sản phẩm và cùng khoảng thời gian (ví dụ cùng một ca hoặc cùng một ngày). Không cộng các Attainment theo ca để ra Attainment ngày; phải cộng sản lượng thực tế và sản lượng mục tiêu, rồi chia.\n6. Attainment và Efficiency khác nhau: Attainment đo mức hoàn thành sản lượng; Efficiency đo hiệu quả sử dụng giờ công. Một line có thể đạt Attainment 100% (làm đủ sản lượng) nhưng Efficiency chỉ 80% (làm đủ nhưng tốn nhiều giờ công hơn tiêu chuẩn). Vì vậy cần xem cả hai.\n7. Attainment cho biết có đạt hay không, chưa cho biết vì sao. Muốn tìm nguyên nhân khi chưa đạt, dùng OEE (máy), Efficiency (người), và phân tích dừng máy.",
    en: "1. Attainment is the ratio of actual output to target output.\n2. Formula: Attainment = Actual Output ÷ Target Output × 100%.\nWhere: Actual Output is the output actually produced; Target Output is the planned or target output for the same period.\n3. Example: the target is 1,000 units and the actual output is 900 units, so Attainment = 900 ÷ 1,000 × 100% = 90%.\n4. Meaning: 100% means the target is met exactly; above 100% means the target is exceeded; below 100% means the target is not met.\n5. Units: numerator and denominator must be the same product and the same period (for example the same shift or the same day). Do not average shift attainments to get a daily attainment; add the actual outputs and the target outputs first, then divide.\n6. Attainment and Efficiency differ: Attainment measures how much output was completed; Efficiency measures how well labor hours were used. A line can reach 100% Attainment (enough output) with 80% Efficiency (enough output, but more labor hours than standard). So read both.\n7. Attainment shows whether the target was met, not why. To find causes when it is not met, use OEE (machines), Efficiency (labor) and downtime analysis.",
  },
  extraSections: [
    {
      title: { vi: "Ứng dụng trong nhà máy", en: "Manufacturing application" },
      body: {
        vi: "Vấn đề nghiệp vụ: quản lý ca cần biết mỗi dây chuyền đã đạt bao nhiêu phần trăm kế hoạch sản lượng trong ca vừa rồi.\nDữ liệu có sẵn: sản lượng mục tiêu của ca (từ kế hoạch sản xuất) và sản lượng thực tế (từ bảng ghi nhận sản lượng).\nLogic: cộng sản lượng thực tế và sản lượng mục tiêu theo dây chuyền, rồi chia và nhân 100.\nKết quả mong đợi: một Attainment cho mỗi dây chuyền. Trong ví dụ, L01 đạt 90% và L02 đạt 110%.\nGiá trị kinh doanh: thấy ngay line nào đang chậm kế hoạch để xử lý trong ca, và line nào vượt kế hoạch để rút kinh nghiệm.",
        en: "Business problem: shift managers need to know what percentage of the output plan each line reached during the last shift.\nAvailable data: the shift target output (from the production plan) and the actual output (from output records).\nLogic: sum actual and target output per line, divide, and multiply by 100.\nExpected result: one Attainment per line. In the example, L01 reaches 90% and L02 110%.\nBusiness value: see at once which line is behind plan so it can be handled during the shift, and which line exceeded plan so its practice can be shared.",
      },
    },
    {
      title: { vi: "Tổng kết và bài tiếp theo", en: "Key takeaways and what's next" },
      body: {
        vi: "Tổng kết:\n- Attainment = Actual Output ÷ Target Output × 100%.\n- 100% là đạt mục tiêu; trên 100% là vượt; dưới 100% là chưa đạt.\n- Attainment cho biết có đạt hay không; Efficiency và OEE cho biết vì sao.\nBài tiếp theo: Efficiency, để xem cách đo hiệu quả sử dụng giờ công, và các công thức khác trong bài Công thức nhà máy.",
        en: "Key takeaways:\n- Attainment = Actual Output ÷ Target Output × 100%.\n- 100% means on target; above 100% means exceeded; below 100% means not met.\n- Attainment shows whether the target was met; Efficiency and OEE help explain why.\nNext: Efficiency, to see how labor hours are used, and the other formulas in the Manufacturing Formulas lesson.",
      },
    },
  ],
  practicalExample: {
    vi: "Thực hành: (1) đọc ví dụ chuẩn: mục tiêu 1.000, thực tế 900, Attainment 90%; (2) chạy truy vấn SQL cho hai dây chuyền; (3) so sánh kết quả với Efficiency của cùng ca. Kết quả mong đợi: L01 đạt 90,00%, L02 đạt 110,00%.",
    en: "Hands-on: (1) read the standard example: target 1,000, actual 900, Attainment 90%; (2) run the SQL query for two lines; (3) compare the result with the Efficiency of the same shift. Expected result: L01 reaches 90.00% and L02 110.00%.",
  },
  formula: [
    {
      label: "PostgreSQL",
      code: "-- Ví dụ chuẩn: mục tiêu 1.000, thực tế 900\nSELECT ROUND(100.0 * 900 / 1000, 2) AS attainment_pct;\n\n-- So sánh hai dây chuyền\nWITH lines_data (line_code, target_output, actual_output) AS (\n  VALUES ('L01', 1000, 900),\n         ('L02', 800, 880)\n)\nSELECT line_code,\n       ROUND(100.0 * actual_output / target_output, 2) AS attainment_pct\nFROM lines_data\nORDER BY line_code;",
    },
  ],
  exercise: {
    vi: "1) (Trắc nghiệm) Attainment được tính thế nào?\nA. Sản lượng mục tiêu ÷ sản lượng thực tế × 100%\nB. Sản lượng thực tế ÷ sản lượng mục tiêu × 100%\nC. Giờ công tiêu chuẩn ÷ giờ công thực tế × 100%\nD. Sản lượng OK ÷ tổng sản lượng × 100%\n2) (Tính) Mục tiêu ca là 800 sản phẩm, thực tế 1.000 sản phẩm. Attainment là bao nhiêu?\n3) (Đúng/Sai) Attainment 100% nghĩa là line đã tiết kiệm được giờ công so với tiêu chuẩn.\n4) (Phân tích) Một line có Attainment 100% nhưng Efficiency 80%. Điều này có nghĩa gì?\n5) (Tình huống) Quản lý muốn xem Attainment của cả ngày từ ba ca. Nên cộng các Attainment của ba ca rồi chia 3 hay làm cách khác? Vì sao?",
    en: "1) (Multiple choice) How is Attainment calculated?\nA. Target output ÷ actual output × 100%\nB. Actual output ÷ target output × 100%\nC. Standard man hours ÷ actual man hours × 100%\nD. Good output ÷ total output × 100%\n2) (Calculate) The shift target is 800 units and the actual output is 1,000 units. What is the Attainment?\n3) (True/False) Attainment of 100% means the line saved labor hours compared with the standard.\n4) (Analysis) A line has 100% Attainment but 80% Efficiency. What does this mean?\n5) (Scenario) A manager wants the daily Attainment from three shifts. Should you average the three shift Attainments and divide by 3? Why or why not?",
  },
  answer: {
    vi: "1) B.\n2) 1.000 ÷ 800 × 100% = 125%: vượt mục tiêu 25%.\n3) Sai. Attainment chỉ đo sản lượng so với mục tiêu. Tiết kiệm giờ công được đo bằng Efficiency.\n4) Line đã làm đủ sản lượng nhưng dùng nhiều giờ công hơn tiêu chuẩn. Cần xem lại phân công nhân sự hoặc phương pháp làm việc.\n5) Không nên lấy trung bình các Attainment. Phải cộng sản lượng thực tế và sản lượng mục tiêu của ba ca, rồi chia và nhân 100%, vì các ca có mục tiêu khác nhau.",
    en: "1) B.\n2) 1,000 ÷ 800 × 100% = 125%: 25% above target.\n3) False. Attainment only measures output against target. Labor savings are measured by Efficiency.\n4) The line produced enough output but used more labor hours than the standard. Review staffing or the work method.\n5) Do not average the Attainments. Add the actual outputs and the target outputs of the three shifts, then divide and multiply by 100%, because the shifts have different targets.",
  },
  relatedTopics: ["efficiency", "oee"],
};
