"use client";

import { useLang, useT, type Bi } from "@/lib/i18n";
import { PageHeader, Section } from "@/components/ui";
import { sanitizeRich } from "@/lib/rich";

export default function CareerView({ careerRoadmap }: { careerRoadmap: Bi[] }) {
  const { lang } = useLang();
  const t = useT();
  return (
    <>
      <PageHeader eyebrow="06 · Career" title="BI Career Roadmap" description={lang === "vi" ? "Lộ trình nghề nghiệp từ Data Analyst đến Manufacturing BI Lead." : "Career path from Data Analyst to Manufacturing BI Lead."} />
      <Section title={lang === "vi" ? "Các bước" : "Steps"}>
        <ol className="list-decimal space-y-2 pl-6">
          {careerRoadmap.map((step) => (
            <li key={step.vi} dangerouslySetInnerHTML={{ __html: sanitizeRich(t(step)) }} />
          ))}
        </ol>
      </Section>
      <Section title={lang === "vi" ? "Sắp có" : "Coming soon"}>
        <ul className="list-disc space-y-1 pl-6 text-slate-600 dark:text-slate-400">
          <li>{lang === "vi" ? "Interview Preparation — câu hỏi phỏng vấn BI và SQL" : "Interview Preparation — BI and SQL interview questions"}</li>
          <li>{lang === "vi" ? "Skills & Certifications" : "Skills & Certifications"}</li>
          <li>{lang === "vi" ? "Career Stories — hành trình của các thành viên" : "Career Stories — member journeys"}</li>
        </ul>
      </Section>
    </>
  );
}
