import { getKpis } from "@/lib/data";
import KpiDictionaryView from "./KpiView";

export default async function KpiDictionaryPage() {
  return <KpiDictionaryView kpis={await getKpis()} />;
}

export const revalidate = 3600;
