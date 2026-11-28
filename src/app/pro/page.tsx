import type { Metadata } from "next";
import ProView from "./ProView";

export const metadata: Metadata = {
  title: "Pro trọn đời",
  description: "Pay once, learn forever: gói Pro trọn đời 499.000đ.",
};

export default function ProPage() {
  return <ProView />;
}
