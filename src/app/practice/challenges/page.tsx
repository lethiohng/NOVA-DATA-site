import { getChallenges, getPlaygroundFiles } from "@/lib/data";
import ChallengesView from "./ChallengesView";

export default async function ChallengesPage() {
  const [challenges, playgroundFiles] = await Promise.all([getChallenges(), getPlaygroundFiles()]);
  return <ChallengesView challenges={challenges} playgroundFiles={playgroundFiles} />;
}

export const revalidate = 3600;
