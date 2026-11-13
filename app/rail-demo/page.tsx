import type { Metadata } from "next";
import RailDemo from "./demo";

export const metadata: Metadata = {
  title: "Demo · Cabide de roupa",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <RailDemo />;
}
