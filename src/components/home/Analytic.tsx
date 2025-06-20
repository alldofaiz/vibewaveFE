"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

import Link from "next/link";
export default function AnalyticSection() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
    });
  }, []);
  return (
    <div className=" relative flex  flex-col-reverse lg:flex-row lg:gap-10 h-full font-bold mx-auto max-w-[1440px] bg-primary w-full text-sm xl:text-base text-secondary px-5 lg:px-10 py-10 items-center">
      <Image
        src="/home/top-left.webp"
        alt="logo"
        width={9999}
        height={9999}
        className=" absolute left-0 top-0 w-[200px] h-[200px] xl:w-[350px] xl:h-[350px] "
      />
      {/* left */}
      <div className=" lg:w-[50%] flex flex-col gap-5 font-bold">
        <p
          data-aos="fade-down"
          className=" text-4xl lg:text-5xl xl:text-7xl  text-gradient"
        >
          Analyze Your Fashion Business Performance with Powerful Insights
        </p>
        <p data-aos="fade-right" className=" text-xs md:text-base">
          VibeWeave Web provides comprehensive sales analysis tools that help
          you understand your product performance, track sales trends, and make
          data-driven decisions to optimize your business strategy. Stay ahead
          of the competition with detailed analytics.
        </p>
        <Link
          href="/analytic"
          data-aos="fade-up"
          className=" relative bg-primary border-2 border-third hover:bg-third font-bold hover:text-primary text-sm text-white w-[200px] text-center py-2 rounded-2xl"
        >
          Get Analytics{" "}
          {/* <span className=" absolute -bottom-3 left-0 text-xl text-third ">
            <BsFillCursorFill />
          </span> */}
        </Link>
      </div>
      {/* right */}
      <div className=" lg:w-[50%] flex flex-col gap-5">
        <Image
          data-aos="fade-right"
          src="/home/analytic.webp"
          alt="logo"
          width={9999}
          height={9999}
          className=" object-contain w-[500px] h-[500px] xl:w-[700px] xl:h-[700px] floating"
        />
      </div>
    </div>
  );
}
