// Cắt logo gốc: bỏ tagline, giữ biểu tượng + chữ NOVA DATA, cắt sát nội dung.
// Chạy: npx tsx scripts/make-logo.ts
import path from "node:path";
import sharp from "sharp";

const src = path.join(process.cwd(), "public", "brand", "nova-logo.png");
const out = path.join(process.cwd(), "public", "brand", "nova-logo-header.png");
const REGION = { left: 90, top: 110, width: 1500, height: 490 }; // bỏ tagline ở dưới

async function main() {
  const { data, info } = await sharp(src).extract(REGION).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Tìm hộp bao quanh các pixel tối (nội dung logo), bỏ qua nền trắng.
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      if (data[i] < 200 || data[i + 1] < 200 || data[i + 2] < 200) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  const pad = 12;
  const box = {
    left: Math.max(0, minX - pad),
    top: Math.max(0, minY - pad),
    width: Math.min(width, maxX - minX + 1 + pad * 2),
    height: Math.min(height, maxY - minY + 1 + pad * 2),
  };
  console.log("Hộp nội dung:", box);

  await sharp(src)
    .extract({ left: REGION.left + box.left, top: REGION.top + box.top, width: box.width, height: box.height })
    .resize({ height: 160, fit: "inside" })
    .png({ compressionLevel: 9, palette: true })
    .toFile(out);
  const meta = await sharp(out).metadata();
  console.log("Đã tạo", out, meta.width, "x", meta.height);
}
main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
