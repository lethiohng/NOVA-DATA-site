import { notFound } from "next/navigation";
import { BASIC_LESSONS, getBasicLesson } from "@/lib/sql-basic";
import samples from "@/lib/sql-basic/sample-tables.json";
import BasicLessonView from "./BasicLessonView";

type SampleTable = { table: string; columns: { name: string; type: string }[]; rows: string[][] };
const SAMPLES = samples as Record<string, SampleTable[]>;

// Chỉ dựng các bài có trong danh sách; mã bài khác trả về 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return BASIC_LESSONS.map((l) => ({ id: l.id }));
}

export default async function SqlBasicLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = getBasicLesson(id);
  if (!lesson) notFound();

  const idx = BASIC_LESSONS.findIndex((l) => l.id === id);
  const prev = BASIC_LESSONS[idx - 1];
  const next = BASIC_LESSONS[idx + 1];

  return <BasicLessonView lesson={lesson} prev={prev} next={next} samples={SAMPLES[lesson.id] ?? []} />;
}
