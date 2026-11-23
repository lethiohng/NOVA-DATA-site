/* Tiếng chúc mừng tạo bằng Web Audio, không cần file âm thanh: arpeggio trưởng vui tươi rồi hợp âm ngân. Lỗi thì bỏ qua. */
let ctx: AudioContext | null = null;

function note(ac: AudioContext, freq: number, start: number, dur: number, peak: number, type: OscillatorType) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(gain).connect(ac.destination);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

export function playChime() {
  try {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx ??= new AC();
    if (ctx.state === "suspended") void ctx.resume();
    const ac = ctx;
    const t0 = ac.currentTime;

    // Arpeggio đi lên: C5, E5, G5, C6, mỗi nốt cách nhau 70 ms.
    const arp = [523.25, 659.25, 783.99, 1046.5];
    arp.forEach((f, i) => note(ac, f, t0 + i * 0.07, 0.25, 0.18, "triangle"));

    // Hợp âm C trưởng ngân ở cuối, có thêm lớp sóng sine cho ấm.
    const end = t0 + 0.3;
    [523.25, 659.25, 783.99, 1046.5].forEach((f) => {
      note(ac, f, end, 0.9, 0.09, "sine");
      note(ac, f * 2, end, 0.6, 0.02, "triangle"); // ánh sáng trên cao
    });
  } catch {
    // Không phát được âm thanh thì thôi, không ảnh hưởng chức năng.
  }
}
