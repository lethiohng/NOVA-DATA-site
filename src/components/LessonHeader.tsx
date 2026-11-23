import Link from "next/link";
import { Badge } from "@/components/ui";
import LessonTimer from "@/components/LessonTimer";

/* Đầu bài học: breadcrumb, nhãn (module, cấp độ, miễn phí hoặc premium, số bài, số phút) và tiêu đề. */
export default function LessonHeader({
  course,
  moduleLabel,
  number,
  title,
  minutes,
  level,
  access,
  totalLessons,
  totalMinutes,
  lang = "vi",
}: {
  course: { title: string; href: string };
  moduleLabel: string;
  number: number;
  title: string;
  minutes: number;
  level: string;
  access: { label: string; tone: "green" | "violet" };
  totalLessons: number;
  totalMinutes: number;
  lang?: "vi" | "en";
}) {
  const minutesLabel = lang === "en" ? "min" : "phút";
  const lessonsLabel = lang === "en" ? "lessons" : "bài";
  const thisLessonLabel = lang === "en" ? "min for this lesson" : "phút bài này";
  return (
    <>
      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/learn" className="hover:text-sky-600">
          Learn
        </Link>{" "}
        /{" "}
        <Link href={course.href} className="hover:text-sky-600">
          {course.title}
        </Link>
      </nav>
      <div className="mb-3 flex flex-wrap gap-2">
        <Badge tone={access.tone}>{access.label}</Badge>
        <Badge tone="sky">{moduleLabel}</Badge>
        <Badge>{level}</Badge>
        <Badge>
          {totalLessons} {lessonsLabel} · {totalMinutes} {minutesLabel}
        </Badge>
        <Badge>{minutes} {thisLessonLabel}</Badge>
      </div>
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        <span className="mr-3 font-mono text-xl text-slate-400">{number}</span>
        {title}
      </h1>
      <div className="mt-6">
        <LessonTimer minutes={minutes} />
      </div>
    </>
  );
}
