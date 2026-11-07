import { getCareerSteps } from "@/lib/data";
import CareerView from "./CareerView";

export default async function CareerPage() {
  return <CareerView careerRoadmap={await getCareerSteps()} />;
}

export const revalidate = 3600;
