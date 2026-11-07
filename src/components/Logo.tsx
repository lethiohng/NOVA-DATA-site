/* Logo NovaData: ảnh logo (biểu tượng + chữ) lưu trên Supabase Storage, bucket public "brand". */

const LOGO_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/brand/nova-logo-header.png`;

export default function Logo({ height = 40 }: { height?: number }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src={LOGO_URL} alt="Nova Data" height={height} style={{ height, width: "auto" }} className="block" />
  );
}
