import { getPlaygroundFiles } from "@/lib/data";
import PlaygroundView from "./PlaygroundView";

export default async function PlaygroundPage() {
  return <PlaygroundView playgroundFiles={await getPlaygroundFiles()} />;
}

export const revalidate = 3600;
