import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/* Chỉ cho xem nội dung khi đã đăng nhập: Kiến thức (learn), Dự án, Career, Luyện tập và các khóa SQL.
   Trang chủ, giới thiệu, liên hệ, đăng nhập và đăng ký vẫn mở. Chưa đăng nhập thì chuyển tới /login và quay lại sau khi đăng nhập. */

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({ request });

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // getUser kiểm tra với máy chủ Supabase, an toàn hơn getSession.
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = `?next=${encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search)}`;
    return NextResponse.redirect(url);
  }

  return response;
}

// Các mục cần đăng nhập: Kiến thức (learn), Dự án, Career, Luyện tập và khóa SQL. Viết cứng vì Next đọc lúc build.
export const config = {
  matcher: [
    "/learn",
    "/learn/:path*",
    "/projects",
    "/projects/:path*",
    "/career",
    "/career/:path*",
    "/practice",
    "/practice/:path*",
    "/sql-basic",
    "/sql-basic/:path*",
    "/sql-intermediate",
    "/sql-intermediate/:path*",
    "/sql-advanced",
    "/sql-advanced/:path*",
  ],
};
