import AdminView from "./AdminView";

// Trang quản trị: không lập chỉ mục, dữ liệu lấy trực tiếp từ Supabase theo tài khoản đăng nhập.
export const metadata = { title: "Quản trị", robots: { index: false, follow: false } };

export default function AdminPage() {
  return <AdminView />;
}
