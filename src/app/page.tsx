// Home.tsx
import Footer from "@/components/Footer";
import AnalyticSection from "@/components/home/Analytic";
import PromptSection from "@/components/home/Prompt";
import ServicesSection from "@/components/home/Services";
import WelcomeSection from "@/components/home/Welcome";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";

const StockSection = dynamic(() => import("@/components/home/Stock"), {
  ssr: false,
  loading: () => <p>Loading chart...</p>,
});

export default function Home() {
  return (
    <div className="flex p-0 m-0 bg-primary">
      <div className="sticky top-0 left-0 z-50 h-screen bg-primary">
        <Navbar />
      </div>
      <div className="flex flex-col">
        <WelcomeSection />
        <ServicesSection />
        <AnalyticSection />
        <PromptSection />
        <StockSection />
        <Footer />
      </div>
    </div>
  );
}
