"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

import Link from "next/link";
export default function PromptSection() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
    });
  }, []);
  return (
    <div className=" relative flex flex-col lg:flex-row lg:gap-10 h-full font-bold mx-auto max-w-[1440px] bg-primary w-full text-sm xl:text-base text-secondary px-5 lg:px-10 py-10 items-center">
      {/* left */}
      <div className=" lg:w-[50%] flex flex-col gap-5">
        <Image
          data-aos="fade-right"
          src="/home/generate.webp"
          alt="logo"
          width={9999}
          height={9999}
          className=" object-contain w-[500px] h-[500px] xl:w-[700px] xl:h-[700px] floating"
        />
      </div>

      {/* right */}
      <div className=" lg:w-[50%] flex flex-col gap-5 font-bold">
        <p
          data-aos="fade-down"
          className="text-4xl lg:text-5xl xl:text-7xl  text-gradient"
        >
          Unlock Your Fashion Business Potential with AI-Driven Prompts
        </p>
        <p data-aos="fade-right" className=" text-xs md:text-base">
          Let VibeWeave Web&apos;s AI-powered prompts guide you towards
          actionable business results. Whether it&apos;s refining your product
          offerings, improving marketing strategies, or identifying profitable
          niches, our AI suggests tailored solutions based on your goals and
          market trends. Empower your business decisions with intelligent
          prompts that turn ideas into profitable outcomes.
        </p>
        <Link
          href="/generate"
          data-aos="fade-up"
          className=" relative bg-primary border-2 border-third hover:bg-third font-bold hover:text-primary text-sm text-white w-[200px] text-center py-2 rounded-2xl"
        >
          Generate{" "}
          {/* <span className=" absolute -bottom-3 left-0 text-xl text-third ">
            <BsFillCursorFill />
          </span> */}
        </Link>
      </div>
    </div>
  );
}
