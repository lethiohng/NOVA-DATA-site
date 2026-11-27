import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActivityToast from "@/components/ActivityToast";
import { LangProvider } from "@/lib/i18n";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

const font = Montserrat({ subsets: ["latin", "vietnamese"], weight: ["400", "500", "600", "700", "800"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Nova Data — Learn · Practice · Build",
    template: "%s | Nova Data",
  },
  description:
    "Nova Data: kiến thức BI, SQL và phân tích sản xuất (Manufacturing Analytics). Nova Data: BI, SQL and manufacturing analytics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${font.className} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      {/* Extension trình duyệt (Grammarly...) thêm thuộc tính vào <body> trước khi React hydrate */}
      <body suppressHydrationWarning className="flex min-h-full flex-col bg-slate-50 text-navy-900 dark:bg-slate-950 dark:text-slate-100">
        <LangProvider>
          <Header />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 md:py-16">{children}</main>
          <Footer />
          <ActivityToast />
        </LangProvider>
      </body>
    </html>
  );
}
