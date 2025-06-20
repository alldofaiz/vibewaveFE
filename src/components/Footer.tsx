import Link from "next/link";

export default function Footer() {
  return (
    <div className=" flex flex-col gap-5 w-full h-full bg-primary_dark text-secondary p-10">
      <div className=" flex gap-5">
        <Link href={"/"}>Home</Link>
        <Link href={"/generate"}>Generate</Link>
        <Link href={"/analytic"}>Analytic</Link>
      </div>
      <div className=" text-xs">
        <p>© 2025 VibeWave - Technology AI for Fashion Business</p>
      </div>
    </div>
  );
}
