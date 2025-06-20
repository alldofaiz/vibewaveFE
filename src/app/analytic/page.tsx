import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";

const AnalyticSection = dynamic(
  () => import("@/components/analytic/analytic"),
  {
    ssr: false,
  }
);

export default function AnalyticPage() {
  return (
    <div className="flex p-0 m-0 bg-primary">
      <div className="sticky top-0 left-0 z-50 h-screen bg-primary">
        <Navbar />
      </div>
      <AnalyticSection />
    </div>
  );
}
