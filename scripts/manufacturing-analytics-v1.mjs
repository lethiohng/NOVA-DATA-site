// Hai bài mới cho danh mục Manufacturing Analytics: cải tiến liên tục với dữ liệu, và công thức tính trong nhà máy.
// Được chèn vào src/lib/content.ts bởi scripts/insert-manufacturing-analytics.mjs.
export const MA_TOPICS = [
  { slug: "continuous-improvement", title: { vi: "Cải tiến liên tục", en: "Continuous Improvement" }, status: "published" },
  { slug: "manufacturing-formulas", title: { vi: "Công thức nhà máy", en: "Manufacturing Formulas" }, status: "published" },
];

export const MA_ARTICLES = [
  {
    slug: "continuous-improvement",
    categorySlug: "manufacturing-analytics",
    title: { vi: "Cải tiến liên tục với dữ liệu", en: "Continuous Improvement with Data" },
    summary: {
      vi: "Sáu công cụ cải tiến (Pareto, PDCA, Gemba Walk, 5 Whys, Ishikawa, Visual Management) và cách dùng dữ liệu để chạy chúng đều đặn.",
      en: "Six improvement tools (Pareto, PDCA, Gemba Walk, 5 Whys, Ishikawa, Visual Management) and how data keeps them running.",
    },
    difficulty: "Intermediate",
    overview: {
      vi: "Cải tiến liên tục (Continuous Improvement) là thói quen tìm và giải quyết vấn đề nhỏ mỗi ngày, thay vì chờ đến khi có sự cố lớn. Trên sàn sản xuất, những vấn đề như máy dừng lâu, lỗi lặp lại hay sản lượng thấp đều cần một phương pháp để xác định đâu là vấn đề quan trọng nhất và xử lý tận gốc. Bài này giới thiệu sáu công cụ thường dùng và vai trò của dữ liệu trong việc áp dụng chúng.",
      en: "Continuous improvement is the habit of finding and solving small problems every day, instead of waiting for a major incident. On the shop floor, problems such as long machine stops, recurring defects or low output need a method to identify the most important one and fix its root cause. This lesson introduces six common tools and the role data plays in applying them.",
    },
    objectives: {
      vi: [
        "Giải thích mục đích của sáu công cụ: Pareto, PDCA, Gemba Walk, 5 Whys, Ishikawa và Visual Management.",
        "Dùng Pareto để chọn ra các nguyên nhân quan trọng nhất từ dữ liệu dừng máy.",
        "Áp dụng vòng PDCA và 5 Whys cho một vấn đề cụ thể.",
        "Giải thích vai trò của dữ liệu: chính xác, thường xuyên, tập trung và nhanh.",
      ],
      en: [
        "Explain the purpose of six tools: Pareto, PDCA, Gemba Walk, 5 Whys, Ishikawa and Visual Management.",
        "Use a Pareto analysis to select the most important causes from downtime data.",
        "Apply the PDCA cycle and 5 Whys to a specific problem.",
        "Explain the role of data: accuracy, frequency, focus and speed.",
      ],
    },
    explanation: {
      vi: "1. Pareto (quy tắc 80/20): công cụ ưu tiên, giúp tập trung vào vài nguyên nhân gây ra phần lớn vấn đề. Cách làm: xếp nguyên nhân theo thời gian hoặc số lần giảm dần, rồi tính tỷ lệ tích lũy. Lưu ý: 80/20 là quy tắc gần đúng, không phải luật. Nếu các nguyên nhân gần như bằng nhau, Pareto sẽ không cho thấy rõ trọng tâm.\n2. PDCA (Plan – Do – Check – Act): vòng lặp bốn bước để giải quyết vấn đề và tạo thay đổi. Plan: lập kế hoạch cải tiến. Do: thử thực hiện. Check: đo kết quả so với mục tiêu. Act: chuẩn hóa nếu hiệu quả, hoặc điều chỉnh rồi lặp lại. PDCA là vòng lặp, không phải làm một lần rồi thôi.\n3. Gemba Walk: lãnh đạo và kỹ sư đi đến nơi làm việc thực tế (gemba), quan sát, đặt câu hỏi và lắng nghe. Khác với họp báo cáo, Gemba Walk giúp thấy điều dữ liệu không thể hiện, ví dụ người vận hành chờ vật tư vì thiếu xe đẩy.\n4. 5 Whys: hỏi 'vì sao' liên tiếp khoảng năm lần để đi từ triệu chứng đến nguyên nhân gốc. Ví dụ: máy dừng → vì sao? → cảm biến lỗi → vì sao? → bụi bám vào cảm biến → vì sao? → không có lịch vệ sinh. Tránh dừng ở câu trả lời đầu tiên.\n5. Ishikawa (biểu đồ xương cá): phân loại các nguyên nhân có thể của một vấn đề theo nhóm: con người (manpower), máy (machines), phương pháp (methods), vật liệu (materials). Nhiều nơi thêm đo lường (measurement) và môi trường (environment).\n6. Visual Management (quản lý trực quan): đưa KPI và trạng thái quy trình ra chỗ mọi người nhìn thấy, như bảng KPI tại dây chuyền hoặc đèn Andon. Bất thường được thấy ngay, không bị bỏ qua.\n7. Vai trò của dữ liệu: dữ liệu chính xác giúp phân tích nguyên nhân gốc thay vì đoán (Accuracy); dữ liệu cập nhật thường xuyên giúp áp dụng công cụ đều đặn (Frequency); dữ liệu chỉ ra vấn đề có tác động lớn nhất (Focus); dữ liệu tự động giúp phát hiện và xử lý nhanh hơn (Speed).",
      en: "1. Pareto (80/20 principle): a prioritization tool that focuses effort on the few causes behind most of the problem. Method: sort causes by time or count, largest first, then compute the cumulative share. Note: 80/20 is a rough guide, not a law. When the causes are almost equal, Pareto does not reveal a clear focus.\n2. PDCA (Plan – Do – Check – Act): a four-step cycle for solving problems and driving change. Plan: design the improvement. Do: try it. Check: measure the result against the goal. Act: standardize it if it works, or adjust and repeat. PDCA is a loop, not a one-time task.\n3. Gemba Walk: leaders and engineers visit the actual workplace (gemba), observe, ask questions and listen. Unlike a report meeting, it shows what data cannot, for example an operator waiting for material because there is no trolley.\n4. 5 Whys: ask 'why' repeatedly, about five times, to move from the symptom to the root cause. Example: the machine stops → why? → a sensor fails → why? → dust builds up on it → why? → there is no cleaning schedule. Do not stop at the first answer.\n5. Ishikawa (fishbone diagram): groups the possible causes of a problem into categories: manpower, machines, methods, materials. Many sites add measurement and environment.\n6. Visual Management: makes KPIs and process status visible where people work, such as a KPI board at the line or an Andon light. Abnormal conditions are seen immediately and not ignored.\n7. The role of data: accurate data supports root cause analysis instead of guessing (accuracy); regular data lets teams apply the tools on a schedule (frequency); data points to the problems with the biggest impact (focus); automated data speeds up detection and resolution (speed).",
    },
    extraSections: [
      {
        title: { vi: "Ứng dụng trong nhà máy", en: "Manufacturing application" },
        body: {
          vi: "Vấn đề nghiệp vụ: nhà máy muốn giảm thời gian dừng máy. Nhóm cải tiến cần biết nguyên nhân nào gây dừng nhiều nhất để tập trung nguồn lực.\nDữ liệu có sẵn: bảng downtime_events (thời gian dừng theo máy) và downtime_reasons (tên nguyên nhân).\nLogic: tổng số phút dừng theo nguyên nhân, xếp giảm dần, tính tỷ lệ tích lũy (Pareto). Sau đó chọn nguyên nhân đầu bảng, dùng 5 Whys để tìm gốc, dùng PDCA để thử giải pháp, và Gemba Walk để xác nhận tại dây chuyền.\nKết quả mong đợi: danh sách nguyên nhân có tỷ lệ tích lũy, và một kế hoạch cải tiến cho nguyên nhân được chọn.\nLưu ý từ dữ liệu mẫu: mười nguyên nhân có số phút dừng khá đều nhau (nguyên nhân lớn nhất chiếm khoảng 12%). Trong trường hợp này, Pareto không cho thấy một vài nguyên nhân áp đảo, nên cần kết hợp thêm tần suất và tác động đến sản lượng trước khi chọn.\nGiá trị kinh doanh: đầu tư cải tiến vào đúng vấn đề, và đo được kết quả trước và sau bằng cùng một bộ dữ liệu.",
          en: "Business problem: the factory wants to cut machine downtime. The improvement team must know which causes stop the lines most often, to focus its effort.\nAvailable data: the downtime_events table (stop time per machine) and downtime_reasons (cause names).\nLogic: sum the stop minutes per cause, sort from largest to smallest, and compute the cumulative share (Pareto). Then take the top cause, use 5 Whys to find its root, use PDCA to test a fix, and use a Gemba Walk to confirm on the line.\nExpected result: a cause list with cumulative shares, and an improvement plan for the chosen cause.\nNote from the sample data: ten causes have fairly similar stop minutes (the largest is about 12%). Here Pareto does not show a few dominant causes, so combine it with frequency and impact on output before choosing.\nBusiness value: invest improvement effort in the right problem, and measure before and after with the same data.",
        },
      },
      {
        title: { vi: "Tổng kết và bài tiếp theo", en: "Key takeaways and what's next" },
        body: {
          vi: "Tổng kết:\n- Pareto chọn nguyên nhân quan trọng; PDCA là vòng lặp cải tiến; 5 Whys tìm nguyên nhân gốc.\n- Gemba Walk và Visual Management đưa dữ liệu về đúng nơi làm việc.\n- Dữ liệu chính xác, cập nhật và tự động giúp áp dụng các công cụ này nhanh và đều đặn.\nBài tiếp theo: Công thức nhà máy. Bài này cung cấp các công thức đo hiệu suất, chất lượng và bảo trì dùng cùng với các công cụ trên.",
          en: "Key takeaways:\n- Pareto selects the important causes; PDCA is the improvement loop; 5 Whys finds the root cause.\n- Gemba Walk and Visual Management bring the data to where the work happens.\n- Accurate, regular and automated data makes these tools fast and consistent.\nNext lesson: Manufacturing Formulas. It gives the formulas for measuring performance, quality and maintenance that you use with these tools.",
        },
      },
    ],
    practicalExample: {
      vi: "Thực hành: (1) chạy truy vấn Pareto trên bảng downtime_events và downtime_reasons; (2) đọc cột tỷ lệ tích lũy và xác định các nguyên nhân chiếm đến khoảng 50% tổng thời gian dừng; (3) viết kế hoạch PDCA cho nguyên nhân đầu tiên. Kết quả mong đợi từ dữ liệu mẫu: nguyên nhân đầu tiên là Planned Maintenance (1501 phút, 12,4%); bốn nguyên nhân đầu tiên cộng lại chiếm khoảng 44,5%.",
      en: "Hands-on: (1) run the Pareto query on downtime_events and downtime_reasons; (2) read the cumulative share column and find the causes that make up about 50% of total stop time; (3) write a PDCA plan for the first cause. Expected result from the sample data: the first cause is Planned Maintenance (1501 minutes, 12.4%); the first four causes together make up about 44.5%.",
    },
    formula: [
      {
        label: "PostgreSQL",
        code: "-- Pareto: tổng phút dừng theo nguyên nhân và tỷ lệ tích lũy\nWITH per_reason AS (\n  SELECT r.reason_name, SUM(d.duration_minutes) AS minutes\n  FROM downtime_events d\n  JOIN downtime_reasons r ON r.reason_id = d.reason_id\n  GROUP BY r.reason_name\n)\nSELECT reason_name,\n       ROUND(minutes, 1) AS minutes,\n       ROUND(100.0 * SUM(minutes) OVER (ORDER BY minutes DESC ROWS UNBOUNDED PRECEDING)\n             / SUM(minutes) OVER (), 1) AS cumulative_pct\nFROM per_reason\nORDER BY minutes DESC;",
      },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) Pareto được dùng để làm gì?\nA. Tìm nguyên nhân gốc bằng cách hỏi 'vì sao'\nB. Chọn các nguyên nhân quan trọng nhất để tập trung nguồn lực\nC. Vẽ sơ đồ xương cá\nD. Đo thời gian chu kỳ\n2) (Trắc nghiệm) Trong PDCA, bước Check làm gì?\nA. Lập kế hoạch cải tiến\nB. Thử giải pháp\nC. Đo kết quả so với mục tiêu\nD. Chuẩn hóa giải pháp\n3) (Đúng/Sai) Gemba Walk chỉ cần xem báo cáo trong phòng họp là đủ.\n4) (Tình huống) Sau câu hỏi 'vì sao' thứ hai, nhóm dừng lại ở 'cảm biến bị lỗi'. Vấn đề là gì?\n5) (Đọc kết quả) Theo truy vấn Pareto trên dữ liệu mẫu, hai nguyên nhân đầu tiên chiếm bao nhiêu phần trăm tổng thời gian dừng?",
      en: "1) (Multiple choice) What is Pareto used for?\nA. Finding the root cause by asking 'why'\nB. Selecting the most important causes to focus effort\nC. Drawing a fishbone diagram\nD. Measuring cycle time\n2) (Multiple choice) In PDCA, what does Check do?\nA. Plan the improvement\nB. Try the fix\nC. Measure the result against the goal\nD. Standardize the fix\n3) (True/False) A Gemba Walk is enough if you review reports in a meeting room.\n4) (Scenario) After the second 'why', the team stops at 'the sensor is faulty'. What is the problem?\n5) (Read the result) In the Pareto query on the sample data, what percentage of total stop time do the first two causes make up?",
    },
    answer: {
      vi: "1) B. Pareto chọn nguyên nhân quan trọng nhất; A là 5 Whys.\n2) C. Check đo kết quả so với mục tiêu.\n3) Sai. Gemba Walk là quan sát tại nơi làm việc thực tế, mang lại thông tin mà báo cáo không có.\n4) Nhóm dừng ở triệu chứng, chưa tìm đến nguyên nhân gốc. Cần tiếp tục hỏi 'vì sao' để tìm vì sao cảm biến bị lỗi (ví dụ bụi, không có lịch vệ sinh).\n5) Khoảng 23,7% (12,4% + 11,3%, tức Planned Maintenance và Material Shortage).",
      en: "1) B. Pareto selects the most important causes; A describes 5 Whys.\n2) C. Check measures the result against the goal.\n3) False. A Gemba Walk means observing the actual workplace, which gives information that reports do not.\n4) The team stopped at a symptom and has not reached the root cause. Keep asking 'why' to find why the sensor failed (for example dust, with no cleaning schedule).\n5) About 23.7% (12.4% + 11.3%, that is Planned Maintenance and Material Shortage).",
    },
    relatedTopics: ["oee", "downtime"],
  },
  {
    slug: "manufacturing-formulas",
    categorySlug: "manufacturing-analytics",
    title: { vi: "Công thức tính trong nhà máy", en: "Manufacturing Formulas" },
    summary: {
      vi: "Các công thức đo sản xuất, chất lượng, bảo trì và chuỗi cung ứng thường dùng trong nhà máy, kèm ví dụ tính.",
      en: "Common formulas for production, quality, maintenance and supply chain in a factory, with worked examples.",
    },
    difficulty: "Intermediate",
    overview: {
      vi: "Một con số chỉ có ý nghĩa khi biết nó được tính thế nào. Bài này tập hợp các công thức thường dùng trên sàn sản xuất: thời gian chu kỳ, sản lượng mỗi giờ, tỷ lệ đạt, lỗi, thời gian giữa các lần hỏng, và nhóm công thức của chuỗi cung ứng. Với mỗi công thức, hãy hiểu đơn vị, dữ liệu cần có và cách đọc kết quả.",
      en: "A number only means something when you know how it was calculated. This lesson gathers the formulas used most often on the shop floor: cycle time, units per hour, pass rates, defect rates, time between failures, and supply chain formulas. For each one, understand its unit, the data it needs and how to read the result.",
    },
    objectives: {
      vi: [
        "Tính được thời gian chu kỳ, takt time, UPH và tỷ lệ đạt kế hoạch.",
        "Tính được tỷ lệ NG, FPY, PPM và RTY.",
        "Tính được MTBF, MTTR và tỷ lệ thời gian dừng.",
        "Nhận biết một số công thức chuỗi cung ứng: tồn kho, dự báo, OTIF và cash-to-cash.",
        "Viết được truy vấn SQL tính tỷ lệ NG theo máy từ bảng sản xuất.",
      ],
      en: [
        "Calculate cycle time, takt time, UPH and plan attainment.",
        "Calculate NG rate, FPY, PPM and RTY.",
        "Calculate MTBF, MTTR and downtime share.",
        "Recognize key supply chain formulas: inventory, forecast, OTIF and cash-to-cash.",
        "Write a SQL query that calculates the NG rate per machine from production records.",
      ],
    },
    explanation: {
      vi: "A. Sản xuất và hiệu suất\n- Thời gian chu kỳ thực tế (CT) = thời gian chạy ÷ số sản phẩm đã làm ra.\n- Takt time = thời gian làm việc khả dụng ÷ nhu cầu khách hàng trong cùng khoảng thời gian. Đây là nhịp cần thiết để đáp ứng nhu cầu.\n- UPH (sản lượng mỗi giờ) = số sản phẩm ÷ số giờ chạy.\n- Plan attainment (đạt kế hoạch) = sản lượng thực tế ÷ sản lượng kế hoạch × 100%.\n- OEE = Availability × Performance × Quality (chi tiết ở bài OEE). Availability = (thời gian kế hoạch − thời gian dừng) ÷ thời gian kế hoạch; Performance = (thời gian chu kỳ lý tưởng × số sản phẩm) ÷ thời gian chạy; Quality = số sản phẩm tốt ÷ tổng số sản phẩm.\nB. Chất lượng\n- Tỷ lệ NG (%) = số NG ÷ tổng số kiểm tra × 100.\n- FPY (tỷ lệ đạt lần đầu) = số đạt ngay lần đầu ÷ số đưa vào công đoạn × 100.\n- RTY (tỷ lệ đạt xuyên suốt) = FPY công đoạn 1 × FPY công đoạn 2 × … × FPY công đoạn n.\n- PPM = số sản phẩm lỗi ÷ tổng số sản phẩm × 1.000.000.\nC. Bảo trì\n- MTBF (thời gian trung bình giữa các lần hỏng) = tổng thời gian vận hành ÷ số lần hỏng.\n- MTTR (thời gian trung bình sửa chữa) = tổng thời gian sửa chữa ÷ số lần sửa chữa.\n- Tỷ lệ dừng máy (%) = thời gian dừng ÷ thời gian kế hoạch × 100.\nD. Chuỗi cung ứng (chọn lọc)\n- Vòng quay tồn kho = giá vốn hàng bán ÷ tồn kho trung bình.\n- Số ngày tồn kho (days of supply) = tồn kho hiện có ÷ mức dùng trung bình mỗi ngày.\n- Tồn kho an toàn (SS) = Z × σ × √LT, với σ là độ lệch chuẩn nhu cầu mỗi ngày và LT là thời gian cung ứng tính theo ngày.\n- Điểm đặt hàng lại (ROP) = nhu cầu trung bình mỗi ngày × thời gian cung ứng + tồn kho an toàn.\n- Số lượng đặt hàng kinh tế (EOQ) = căn bậc hai của (2 × nhu cầu năm × chi phí đặt hàng ÷ chi phí lưu kho mỗi đơn vị).\n- Sai số dự báo = nhu cầu thực tế − nhu cầu dự báo. MAD = Σ|thực tế − dự báo| ÷ n.\n- WMAPE = Σ|thực tế − dự báo| ÷ Σ thực tế × 100.\n- Độ lệch dự báo (bias) = Σ(dự báo − thực tế) ÷ Σ thực tế × 100.\n- OTIF (đúng hạn và đủ hàng) = số đơn giao đúng hạn và đủ ÷ tổng số đơn × 100.\n- Cash-to-cash = DIO + DSO − DPO (số ngày tồn kho + số ngày thu tiền − số ngày trả tiền).\nLưu ý: Các công thức cần cùng đơn vị và cùng khoảng thời gian. Một tỷ lệ không được cộng trực tiếp với tỷ lệ khác mà phải tính lại từ tổng tử và tổng mẫu.",
      en: "A. Production and performance\n- Actual cycle time (CT) = run time ÷ units produced.\n- Takt time = available working time ÷ customer demand in the same period. It is the pace needed to meet demand.\n- UPH (units per hour) = units produced ÷ running hours.\n- Plan attainment = actual output ÷ planned output × 100%.\n- OEE = Availability × Performance × Quality (see the OEE lesson). Availability = (planned time − stop time) ÷ planned time; Performance = (ideal cycle time × units) ÷ run time; Quality = good units ÷ total units.\nB. Quality\n- NG rate (%) = NG count ÷ total inspected × 100.\n- FPY (first pass yield) = units passed first time ÷ units entering the step × 100.\n- RTY (rolled throughput yield) = FPY of step 1 × FPY of step 2 × … × FPY of step n.\n- PPM = defective units ÷ total units × 1,000,000.\nC. Maintenance\n- MTBF (mean time between failures) = total operating time ÷ number of failures.\n- MTTR (mean time to repair) = total repair time ÷ number of repairs.\n- Downtime share (%) = stop time ÷ planned time × 100.\nD. Supply chain (selected)\n- Inventory turnover = COGS ÷ average inventory.\n- Days of supply = on-hand inventory ÷ average daily usage.\n- Safety stock (SS) = Z × σ × √LT, where σ is the standard deviation of daily demand and LT the lead time in days.\n- Reorder point (ROP) = average daily demand × lead time + safety stock.\n- Economic order quantity (EOQ) = square root of (2 × annual demand × order cost ÷ holding cost per unit).\n- Forecast error = actual demand − forecast demand. MAD = Σ|actual − forecast| ÷ n.\n- WMAPE = Σ|actual − forecast| ÷ Σ actual × 100.\n- Forecast bias = Σ(forecast − actual) ÷ Σ actual × 100.\n- OTIF (on time, in full) = orders delivered on time and in full ÷ total orders × 100.\n- Cash-to-cash = DIO + DSO − DPO (days inventory + days sales outstanding − days payable outstanding).\nNote: formulas need the same unit and the same period. Do not add one rate to another rate; recalculate it from the total numerator and total denominator.",
    },
    extraSections: [
      {
        title: { vi: "Ứng dụng trong nhà máy", en: "Manufacturing application" },
        body: {
          vi: "Vấn đề nghiệp vụ: quản lý muốn biết máy nào có tỷ lệ NG cao để kiểm tra trước.\nDữ liệu có sẵn: bảng production_records (số lượng đạt, NG và tổng) và bảng machines.\nLogic: tổng NG chia tổng số kiểm tra theo từng máy, nhân 100. Tính từ tổng, không lấy trung bình các tỷ lệ theo bản ghi.\nKết quả mong đợi: tỷ lệ NG của từng máy. Trong dữ liệu mẫu, ba máy đầu (M-A1, M-A2, M-A3) có tỷ lệ NG khoảng 3,4–3,6%.\nGiá trị kinh doanh: xác định máy cần kiểm tra trước, và theo dõi tỷ lệ NG theo cùng một công thức trên mọi báo cáo.",
          en: "Business problem: management wants to know which machines have a high NG rate so they can be checked first.\nAvailable data: the production_records table (good, NG and total quantities) and the machines table.\nLogic: total NG divided by total inspected per machine, times 100. Calculate from totals, not by averaging per-record rates.\nExpected result: the NG rate of each machine. In the sample data, the first three machines (M-A1, M-A2, M-A3) have NG rates of about 3.4–3.6%.\nBusiness value: identify which machines to check first, and track NG rate with the same formula in every report.",
        },
      },
      {
        title: { vi: "Tổng kết và bài tiếp theo", en: "Key takeaways and what's next" },
        body: {
          vi: "Tổng kết:\n- Mỗi công thức cần đơn vị, dữ liệu và khoảng thời gian rõ ràng.\n- Tỷ lệ tính từ tổng tử và tổng mẫu, không cộng các tỷ lệ với nhau.\n- Công thức OEE, UPH, NG, FPY, MTBF và MTTR cùng dùng để đo một dây chuyền từ nhiều góc.\nBài tiếp theo: các khóa SQL (Basic, Intermediate, Advanced) để viết các truy vấn này trên dữ liệu nhà máy.",
          en: "Key takeaways:\n- Each formula needs a clear unit, data source and time period.\n- Rates are calculated from total numerator and total denominator, never by adding rates.\n- OEE, UPH, NG, FPY, MTBF and MTTR together measure a line from several angles.\nNext step: the SQL courses (Basic, Intermediate, Advanced), where you write these queries on factory data.",
        },
      },
    ],
    practicalExample: {
      vi: "Thực hành: (1) chạy truy vấn tỷ lệ NG theo máy; (2) so sánh với công thức trên; (3) tính MTBF cho một máy nếu có dữ liệu thời gian hoạt động và số lần hỏng. Kết quả mong đợi từ dữ liệu mẫu: M-A1 3,58%, M-A2 3,56%, M-A3 3,44%.",
      en: "Hands-on: (1) run the NG rate per machine query; (2) compare it with the formula above; (3) calculate MTBF for one machine if you have operating-time and failure-count data. Expected result from the sample data: M-A1 3.58%, M-A2 3.56%, M-A3 3.44%.",
    },
    formula: [
      {
        label: "PostgreSQL",
        code: "-- Tỷ lệ NG (%) theo máy: tính từ tổng NG chia tổng số kiểm tra\nSELECT m.machine_code,\n       ROUND(100.0 * SUM(r.ng_qty) / SUM(r.total_qty), 2) AS ng_pct\nFROM production_records r\nJOIN machines m ON m.machine_id = r.machine_id\nGROUP BY m.machine_code\nORDER BY m.machine_code\nLIMIT 3;",
      },
    ],
    exercise: {
      vi: "1) (Trắc nghiệm) FPY được tính thế nào?\nA. Số sản phẩm tốt ÷ thời gian chạy\nB. Số đạt ngay lần đầu ÷ số đưa vào công đoạn × 100\nC. Tổng NG ÷ tổng sản lượng × 1.000.000\nD. Thời gian dừng ÷ thời gian kế hoạch\n2) (Tính) Một dây chuyền có thời gian làm việc khả dụng 480 phút và nhu cầu khách hàng 240 sản phẩm. Takt time là bao nhiêu?\n3) (Tính) Một máy vận hành tổng cộng 1200 giờ và hỏng 4 lần. MTBF là bao nhiêu?\n4) (Tính) Chuỗi cung ứng có DIO = 42 ngày, DSO = 31 ngày, DPO = 27 ngày. Cash-to-cash là bao nhiêu?\n5) (Phân tích) Vì sao không nên lấy trung bình các tỷ lệ NG theo ngày để ra tỷ lệ NG của cả tháng?",
      en: "1) (Multiple choice) How is FPY calculated?\nA. Good units ÷ run time\nB. Units passed first time ÷ units entering the step × 100\nC. Total NG ÷ total output × 1,000,000\nD. Stop time ÷ planned time\n2) (Calculate) A line has 480 minutes of available time and customer demand of 240 units. What is the takt time?\n3) (Calculate) A machine runs for 1200 hours in total and fails 4 times. What is its MTBF?\n4) (Calculate) A supply chain has DIO = 42 days, DSO = 31 days and DPO = 27 days. What is the cash-to-cash cycle?\n5) (Analysis) Why should you not average the daily NG rates to get the monthly NG rate?",
    },
    answer: {
      vi: "1) B.\n2) 480 ÷ 240 = 2 phút mỗi sản phẩm.\n3) 1200 ÷ 4 = 300 giờ.\n4) 42 + 31 − 27 = 46 ngày.\n5) Vì tỷ lệ NG là non-additive: mỗi ngày có tổng sản lượng khác nhau, nên trung bình các tỷ lệ không cho ra đúng tỷ lệ của cả tháng. Phải tính lại từ tổng NG chia tổng số kiểm tra của cả tháng.",
      en: "1) B.\n2) 480 ÷ 240 = 2 minutes per unit.\n3) 1200 ÷ 4 = 300 hours.\n4) 42 + 31 − 27 = 46 days.\n5) Because the NG rate is non-additive: each day has a different total, so averaging the daily rates does not give the monthly rate. Recalculate from the month's total NG divided by the month's total inspected.",
    },
    relatedTopics: ["oee", "uph", "yield", "downtime"],
  },
];
