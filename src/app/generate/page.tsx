import GenerateSection from "@/components/generate/Generate";
import Navbar from "@/components/Navbar";

export default function GeneratePage() {
  return (
    <div className="flex p-0 m-0 bg-primary">
      <div className="sticky top-0 left-0 z-50 h-screen bg-primary">
        {" "}
        <Navbar />
      </div>
      <div className=" flex flex-col">
        <GenerateSection />{" "}
      </div>
    </div>
  );
}
