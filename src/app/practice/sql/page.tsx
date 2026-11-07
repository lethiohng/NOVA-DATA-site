import { getSqlExercises } from "@/lib/data";
import SqlExercisesView from "./SqlView";

export default async function SqlExercisesPage() {
  return <SqlExercisesView sqlExercises={await getSqlExercises()} />;
}

export const revalidate = 3600;
