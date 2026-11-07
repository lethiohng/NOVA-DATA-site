// Bốn bài cho danh mục IIoT Data & Control Flow: PLC, MQTT, Sensor, SCADA.
const bi = (vi, en) => ({ vi, en });

const make = (o) => ({
  slug: o.slug,
  categorySlug: "industrial-iot",
  title: bi(o.titleVi, o.titleEn),
  summary: o.summary,
  difficulty: "Beginner",
  overview: o.overview,
  objectives: o.objectives,
  explanation: o.explanation,
  extraSections: [{ title: bi("Liên hệ với dữ liệu BI", "Connection to BI data"), body: o.bi }],
  practicalExample: o.practical,
  formula: [],
  exercise: o.exercise,
  answer: o.answer,
  relatedTopics: o.related,
});

export const IIOT_ARTICLES = [
  make({
    slug: "plc",
    titleVi: "PLC: bộ điều khiển logic khả trình",
    titleEn: "PLC: Programmable Logic Controller",
    summary: bi("PLC là máy tính công nghiệp đọc tín hiệu từ cảm biến, chạy logic điều khiển và xuất lệnh ra thiết bị chấp hành.", "A PLC is an industrial computer that reads sensor signals, runs control logic and sends commands to actuators."),
    overview: bi("PLC là bộ não của máy móc trên dây chuyền. Nó đọc trạng thái (cảm biến, nút bấm) và quyết định bật hay tắt động cơ, van, băng tải theo chương trình đã nạp.", "A PLC is the control brain of machines on the line. It reads states (sensors, buttons) and decides when to switch motors, valves and conveyors on or off based on its loaded program."),
    objectives: [
      bi("Mô tả các thành phần chính của PLC: CPU, module vào, module ra.", "Describe the main parts of a PLC: CPU, input modules and output modules."),
      bi("Giải thích chu kỳ quét (scan cycle).", "Explain the scan cycle."),
      bi("Hiểu PLC cung cấp dữ liệu gì cho phân tích.", "Understand what data a PLC provides for analysis."),
    ],
    explanation: bi(
      "1. Thành phần: CPU chạy chương trình; module đầu vào (DI/AI) nhận tín hiệu từ cảm biến; module đầu ra (DO/AO) điều khiển thiết bị.\n2. Chu kỳ quét: PLC lặp lại ba bước liên tục: đọc đầu vào, chạy chương trình logic, ghi đầu ra. Thời gian một chu kỳ thường vài mili giây.\n3. Ngôn ngữ lập trình: Ladder Logic là phổ biến nhất, mô phỏng sơ đồ rơle.\n4. Ví dụ: băng tải chạy khi nút Start được bấm, cảm biến báo có hộp và cửa an toàn đóng.\n5. Với dữ liệu: PLC có các biến (tag) như nhiệt độ, trạng thái máy, số đếm. Các tag này được đọc ra SCADA hoặc máy chủ dữ liệu thông qua giao thức như OPC UA hoặc Modbus.",
      "1. Parts: the CPU runs the program; input modules (DI/AI) receive sensor signals; output modules (DO/AO) drive equipment.\n2. Scan cycle: the PLC repeats three steps continuously: read inputs, run the logic program, write outputs. One cycle usually takes a few milliseconds.\n3. Programming: Ladder Logic is the most common, mimicking relay diagrams.\n4. Example: a conveyor runs when the Start button is pressed, a sensor reports a box is present, and the safety door is closed.\n5. For data: a PLC exposes tags such as temperature, machine state and counters. These are read by SCADA or a data server through protocols such as OPC UA or Modbus."
    ),
    bi: bi(
      "Vấn đề nghiệp vụ: đếm sản lượng và thời gian dừng theo máy.\nDữ liệu có sẵn: tag trạng thái chạy/dừng và bộ đếm sản phẩm từ PLC.\nXử lý: ghi nhận sườn lên của tín hiệu chạy để tính thời gian chạy; cộng dồn bộ đếm theo ca.\nKết quả: sản lượng và thời gian dừng theo ca, làm đầu vào cho OEE.\nGiá trị: dữ liệu lấy trực tiếp từ máy, không phải nhập tay.",
      "Business problem: count output and downtime per machine.\nAvailable data: run/stop state tags and part counters from the PLC.\nProcessing: record rising edges of the run signal to get run time; sum counters per shift.\nResult: output and downtime per shift, feeding OEE.\nValue: data comes straight from the machine, not manual entry."
    ),
    practical: bi("Thực hành: một PLC đếm 1.200 hộp trong ca 8 giờ, máy dừng tổng cộng 48 phút. Thời gian chạy là 480 − 48 = 432 phút. Với chu kỳ thực tế 0,3 phút mỗi hộp, số hộp có thể làm là 432 ÷ 0,3 = 1.440. Hiệu suất là 1.200 ÷ 1.440 = 83,3%.", "Hands-on: a PLC counts 1,200 boxes in an 8-hour shift, with 48 minutes of stops. Run time is 480 − 48 = 432 minutes. At an actual cycle of 0.3 minutes per box, the possible output is 432 ÷ 0.3 = 1,440. Performance is 1,200 ÷ 1,440 = 83.3%."),
    exercise: bi("1) PLC thực hiện ba bước nào trong mỗi chu kỳ quét?\n2) Module nào của PLC nhận tín hiệu từ cảm biến?\n3) (Tính) Ca 480 phút, dừng 60 phút, sản xuất 1.000 hộp trong chu kỳ 0,3 phút mỗi hộp. Hiệu suất là bao nhiêu?", "1) What three steps does a PLC perform in each scan cycle?\n2) Which PLC module receives sensor signals?\n3) (Calculate) A 480-minute shift with 60 minutes of stops and 1,000 boxes at 0.3 minutes per box. What is the performance?"),
    answer: bi("1) Đọc đầu vào, chạy chương trình, ghi đầu ra.\n2) Module đầu vào (DI/AI).\n3) Thời gian chạy 420 phút; khả năng 420 ÷ 0,3 = 1.400; hiệu suất 1.000 ÷ 1.400 = 71,4%.", "1) Read inputs, run the program, write outputs.\n2) The input module (DI/AI).\n3) Run time 420 minutes; capacity 420 ÷ 0.3 = 1,400; performance 1,000 ÷ 1,400 = 71.4%."),
    related: ["sensor", "scada"],
  }),
  make({
    slug: "mqtt",
    titleVi: "MQTT: giao thức truyền dữ liệu IIoT",
    titleEn: "MQTT: messaging protocol for IIoT",
    summary: bi("MQTT là giao thức publish/subscribe nhẹ, các thiết bị gửi dữ liệu theo chủ đề (topic) qua một broker trung gian.", "MQTT is a lightweight publish/subscribe protocol where devices send data by topic through a broker."),
    overview: bi("Thiết bị IIoT cần gửi dữ liệu liên tục lên hệ thống mà không cần kết nối trực tiếp với từng nơi nhận. MQTT giải quyết việc này bằng mô hình broker và chủ đề.", "IIoT devices must send data continuously to systems without connecting directly to each receiver. MQTT solves this with a broker and topics."),
    objectives: [
      bi("Giải thích mô hình publisher, subscriber và broker.", "Explain the publisher, subscriber and broker model."),
      bi("Đọc cấu trúc topic dạng phân cấp.", "Read a hierarchical topic structure."),
      bi("Hiểu ba mức QoS.", "Understand the three QoS levels."),
    ],
    explanation: bi(
      "1. Mô hình: thiết bị gửi (publisher) đăng dữ liệu lên một topic tới broker; các hệ thống quan tâm (subscriber) đăng ký topic đó và nhận dữ liệu. Hai bên không cần biết nhau.\n2. Topic phân cấp bằng dấu /, ví dụ factory/line1/machine3/temperature.\n3. Payload thường là JSON, ví dụ {\"value\": 72.5, \"unit\": \"C\", \"ts\": \"2026-11-07T08:00:00\"}.\n4. QoS: 0 gửi tối đa một lần (có thể mất); 1 gửi ít nhất một lần (có thể trùng); 2 gửi đúng một lần (chậm hơn).\n5. Với dữ liệu: bản ghi nên có thời gian (ts) và mã thiết bị, vì dữ liệu có thể đến không đúng thứ tự.",
      "1. Model: a device (publisher) posts data to a topic on the broker; interested systems (subscribers) subscribe to that topic and receive the data. They do not need to know each other.\n2. Topics are hierarchical with /, for example factory/line1/machine3/temperature.\n3. Payloads are usually JSON, for example {\"value\": 72.5, \"unit\": \"C\", \"ts\": \"2026-11-07T08:00:00\"}.\n4. QoS: 0 means at most once (can be lost); 1 means at least once (can duplicate); 2 means exactly once (slower).\n5. For data: records should carry a timestamp and a device ID, because messages can arrive out of order."
    ),
    bi: bi(
      "Vấn đề nghiệp vụ: nhận dữ liệu nhiệt độ từ nhiều máy vào một kho dữ liệu.\nDữ liệu có sẵn: thông điệp MQTT với topic theo máy và payload JSON.\nXử lý: tách mã máy từ topic, lưu payload kèm thời gian nhận; loại bản ghi trùng theo máy và thời gian.\nKết quả: bảng nhiệt độ theo máy theo thời gian, sẵn sàng cho báo cáo.\nGiá trị: một đường dữ liệu chung cho nhiều thiết bị, dễ mở rộng.",
      "Business problem: receive temperature data from many machines into one data store.\nAvailable data: MQTT messages with per-machine topics and JSON payloads.\nProcessing: extract the machine ID from the topic, store the payload with receive time; remove duplicates per machine and time.\nResult: a time-series table of temperature per machine, ready for reports.\nValue: one common data path for many devices, easy to extend."
    ),
    practical: bi("Thực hành: topic factory/line1/machine3/temperature có mã máy là machine3. Một bản ghi có value 72,5 °C lúc 08:00. Nếu máy gửi lại cùng bản ghi (QoS 1 gây trùng), khi lưu cần loại bản ghi trùng theo cặp (mã máy, thời gian) để không đếm hai lần.", "Hands-on: the topic factory/line1/machine3/temperature has machine ID machine3. A record with value 72.5 °C at 08:00. If the device resends the same record (QoS 1 can duplicate), deduplicate on the pair (machine ID, timestamp) so it is not counted twice."),
    exercise: bi("1) Thành phần nào trung gian nhận và phân phối thông điệp?\n2) Topic factory/line2/machine1/speed thuộc dây chuyền nào?\n3) (Trắc nghiệm) QoS nào có thể gửi trùng thông điệp?\nA. QoS 0\nB. QoS 1\nC. QoS 2", "1) Which component receives and distributes messages?\n2) Which line does the topic factory/line2/machine1/speed belong to?\n3) (Multiple choice) Which QoS can deliver duplicate messages?\nA. QoS 0\nB. QoS 1\nC. QoS 2"),
    answer: bi("1) Broker.\n2) line2.\n3) B. QoS 1 gửi ít nhất một lần nên có thể trùng.", "1) The broker.\n2) line2.\n3) B. QoS 1 delivers at least once, so duplicates are possible."),
    related: ["sensor", "scada"],
  }),
  make({
    slug: "sensor",
    titleVi: "Sensor: cảm biến và tín hiệu đo",
    titleEn: "Sensor: sensors and measurement signals",
    summary: bi("Cảm biến chuyển đại lượng vật lý như nhiệt độ, áp suất thành tín hiệu điện để PLC và hệ thống đọc được.", "A sensor converts a physical quantity such as temperature or pressure into an electrical signal that PLCs and systems can read."),
    overview: bi("Mọi dữ liệu máy móc bắt đầu từ cảm biến. Hiểu tín hiệu cảm biến giúp đọc đúng giá trị và nhận ra dữ liệu lỗi.", "All machine data starts at a sensor. Understanding sensor signals helps you read values correctly and spot bad data."),
    objectives: [
      bi("Phân biệt tín hiệu số và tín hiệu tương tự.", "Distinguish digital and analog signals."),
      bi("Quy đổi tín hiệu 4–20 mA sang giá trị đo.", "Convert a 4–20 mA signal to a measured value."),
      bi("Nhận biết dữ liệu cảm biến bất thường.", "Recognize abnormal sensor data."),
    ],
    explanation: bi(
      "1. Tín hiệu số (bật/tắt) cho biết trạng thái, ví dụ có vật hay không. Tín hiệu tương tự cho giá trị liên tục, ví dụ nhiệt độ.\n2. Tín hiệu 4–20 mA là chuẩn công nghiệp phổ biến. 4 mA ứng với giá trị thấp nhất của thang đo, 20 mA ứng với giá trị cao nhất. Dòng 0 mA cho thấy đứt dây.\n3. Công thức tuyến tính: giá trị = (I − 4) ÷ 16 × (max − min) + min.\n4. Chất lượng dữ liệu: cần kiểm tra giá trị ngoài thang đo, giá trị đứng yên quá lâu (cảm biến treo), và khoảng trống do mất tín hiệu.\n5. Chu kỳ lấy mẫu quyết định độ chi tiết của dữ liệu; lấy mẫu quá thưa có thể bỏ sót đỉnh.",
      "1. Digital signals (on/off) indicate state, for example whether a part is present. Analog signals give a continuous value, for example temperature.\n2. The 4–20 mA signal is a common industrial standard. 4 mA is the bottom of the range and 20 mA is the top. A 0 mA reading indicates a broken wire.\n3. Linear conversion: value = (I − 4) ÷ 16 × (max − min) + min.\n4. Data quality: check for values outside the range, readings stuck at one value for too long, and gaps where signal was lost.\n5. Sampling rate sets the detail of the data; sampling too slowly can miss peaks."
    ),
    bi: bi(
      "Vấn đề nghiệp vụ: phát hiện máy quá nhiệt trong ca.\nDữ liệu có sẵn: tín hiệu 4–20 mA từ cảm biến nhiệt đã đổi sang °C.\nXử lý: đổi dòng sang nhiệt độ; đánh dấu giá trị vượt ngưỡng; loại bản ghi thiếu.\nKết quả: số lần vượt ngưỡng theo máy và theo ca.\nGiá trị: cảnh báo sớm và dữ liệu sạch cho phân tích.",
      "Business problem: detect overheating during a shift.\nAvailable data: 4–20 mA signals from temperature sensors, converted to °C.\nProcessing: convert current to temperature; flag values above the threshold; drop missing records.\nResult: number of threshold breaches per machine and shift.\nValue: early warning and clean data for analysis."
    ),
    practical: bi("Thực hành: cảm biến nhiệt thang 0–100 °C gửi 12 mA. Nhiệt độ = (12 − 4) ÷ 16 × 100 = 50 °C. Nếu gửi 3,6 mA, đây là giá trị dưới 4 mA, cho thấy đứt dây hoặc lỗi cảm biến, không phải nhiệt độ thấp.", "Hands-on: a temperature sensor with a 0–100 °C range sends 12 mA. Temperature = (12 − 4) ÷ 16 × 100 = 50 °C. If it sends 3.6 mA, that is below 4 mA, which indicates a broken wire or sensor fault, not a low temperature."),
    exercise: bi("1) (Tính) Cảm biến thang 0–200 °C gửi 20 mA. Nhiệt độ là bao nhiêu?\n2) (Tính) Cùng thang đo, gửi 8 mA. Nhiệt độ là bao nhiêu?\n3) (Đúng/Sai) Giá trị 0 mA là nhiệt độ thấp nhất của thang đo.", "1) (Calculate) A sensor with a 0–200 °C range sends 20 mA. What is the temperature?\n2) (Calculate) Same range, 8 mA. What is the temperature?\n3) (True/False) A reading of 0 mA is the lowest temperature in the range."),
    answer: bi("1) (20 − 4) ÷ 16 × 200 = 200 °C.\n2) (8 − 4) ÷ 16 × 200 = 50 °C.\n3) Sai. 0 mA cho thấy đứt dây hoặc lỗi, không phải giá trị đo thấp nhất (4 mA mới là đáy thang).", "1) (20 − 4) ÷ 16 × 200 = 200 °C.\n2) (8 − 4) ÷ 16 × 200 = 50 °C.\n3) False. 0 mA indicates a fault, not the lowest measured value (4 mA is the bottom of the range)."),
    related: ["plc", "mqtt"],
  }),
  make({
    slug: "scada",
    titleVi: "SCADA: giám sát và thu thập dữ liệu",
    titleEn: "SCADA: supervisory control and data acquisition",
    summary: bi("SCADA là hệ thống giám sát tập trung: hiển thị trạng thái máy, cảnh báo và lưu lịch sử dữ liệu từ nhiều PLC.", "SCADA is a central supervision system that shows machine status, raises alarms and stores history from many PLCs."),
    overview: bi("Người vận hành không đứng cạnh từng PLC. SCADA gom dữ liệu từ nhiều PLC về một nơi để giám sát, cảnh báo và lưu lịch sử.", "Operators do not stand next to each PLC. SCADA brings data from many PLCs to one place for monitoring, alarms and history."),
    objectives: [
      bi("Mô tả các chức năng chính của SCADA: giám sát, cảnh báo, lịch sử.", "Describe the main SCADA functions: monitoring, alarms and history."),
      bi("Hiểu vai trò của HMI và historian.", "Understand the roles of HMI and historian."),
      bi("Vẽ luồng dữ liệu từ PLC đến BI.", "Draw the data flow from PLC to BI."),
    ],
    explanation: bi(
      "1. Giám sát: màn hình HMI hiển thị trạng thái và giá trị của máy theo thời gian thực.\n2. Cảnh báo: khi giá trị vượt ngưỡng, hệ thống ghi lại báo động kèm thời gian và mức độ.\n3. Historian: cơ sở dữ liệu chuỗi thời gian lưu toàn bộ lịch sử tag, là nguồn dữ liệu chính cho phân tích.\n4. Luồng dữ liệu điển hình: cảm biến → PLC → SCADA/Historian → kho dữ liệu → báo cáo BI.\n5. Lưu ý: SCADA chủ yếu phục vụ vận hành; phân tích sâu nên làm trên historian hoặc kho dữ liệu, không truy vấn trực tiếp hệ thống đang điều khiển máy.",
      "1. Monitoring: HMI screens show machine status and values in near real time.\n2. Alarms: when a value crosses a limit, the system logs the alarm with time and severity.\n3. Historian: a time-series database that stores all tag history and is the main source for analysis.\n4. Typical data flow: sensor → PLC → SCADA/historian → data warehouse → BI reports.\n5. Note: SCADA mainly serves operations; deep analysis should run on the historian or a data warehouse, not query the live control system directly."
    ),
    bi: bi(
      "Vấn đề nghiệp vụ: báo cáo số lần báo động theo máy trong tuần.\nDữ liệu có sẵn: nhật ký báo động và lịch sử tag trong historian.\nXử lý: gom báo động theo máy và ngày; tính số lần và thời gian kéo dài.\nKết quả: bảng báo động theo máy và ngày, dùng để tìm máy hay báo động.\nGiá trị: xác định máy cần bảo trì và đo hiệu quả sau cải tiến.",
      "Business problem: report the number of alarms per machine in a week.\nAvailable data: alarm logs and tag history in the historian.\nProcessing: group alarms by machine and day; count them and measure duration.\nResult: alarm table per machine and day, to find machines that alarm often.\nValue: identify machines needing maintenance and measure the effect of improvements."
    ),
    practical: bi("Thực hành: máy M1 có 6 báo động trong ngày, tổng thời gian báo động 90 phút. Số báo động trung bình mỗi lần là 90 ÷ 6 = 15 phút. Nếu sau cải tiến còn 2 báo động với tổng 20 phút, số lần giảm 67% và thời gian trung bình là 10 phút.", "Hands-on: machine M1 has 6 alarms in a day, total alarm time 90 minutes. Average duration per alarm is 90 ÷ 6 = 15 minutes. If after improvement there are 2 alarms totaling 20 minutes, the count falls by 67% and average duration is 10 minutes."),
    exercise: bi("1) Chức năng nào của SCADA cho biết máy vượt ngưỡng lúc nào?\n2) Historian lưu gì?\n3) (Tính) Máy có 10 báo động tổng 150 phút. Thời gian trung bình mỗi báo động là bao nhiêu?", "1) Which SCADA function tells when a machine crossed a limit?\n2) What does the historian store?\n3) (Calculate) A machine has 10 alarms totaling 150 minutes. What is the average duration per alarm?"),
    answer: bi("1) Cảnh báo (alarm).\n2) Lịch sử tag theo thời gian.\n3) 150 ÷ 10 = 15 phút.", "1) Alarms.\n2) Tag history over time.\n3) 150 ÷ 10 = 15 minutes."),
    related: ["plc", "sensor"],
  }),
];
