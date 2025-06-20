"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";
export default function WelcomeSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  return (
    <div className=" relative flex flex-col lg:flex-row lg:gap-10 h-full mx-auto max-w-[1440px] bg-primary w-full text-sm xl:text-base text-secondary px-5 lg:px-10 py-10 items-center">
      {/* left */}
      <div className=" w-full lg:w-[50%] flex flex-col gap-5">
        <Image
          data-aos="fade-right"
          src="/home/introduction.webp"
          alt="logo"
          width={9999}
          height={9999}
          className=" object-contain w-[500px] h-[500px] xl:w-[700px] xl:h-[700px] floating"
        />
      </div>
      {/* right */}
      <div className=" w-full lg:w-[50%] flex flex-col gap-5 font-bold">
        <h1
          data-aos="fade-down"
          className=" text-4xl lg:text-5xl xl:text-7xl  text-gradient"
        >
          Optimizing the Power of AI to Drive Your Fashion Business
        </h1>
        <p data-aos="fade-left" className=" text-xs md:text-base">
          People have dreams of opening a fashion business. VibeWeave Web helps
          bring these dreams to life by providing AI-driven insights and
          practical business ideas.
        </p>
        <Link
          href={"/generate"}
          data-aos="fade-up"
          className=" relative bg-primary border-2 border-third hover:bg-third font-bold hover:text-primary text-sm text-white w-[200px] text-center py-2 rounded-2xl"
        >
          Get Started{" "}
          {/* <span className=" absolute -bottom-3 left-0 text-xl text-third ">
            <BsFillCursorFill />
          </span> */}
        </Link>
      </div>
      <Image
        src="/home/bottom-right.webp"
        alt="logo"
        width={9999}
        height={9999}
        className=" absolute right-0 bottom-0 w-[200px] h-[200px] xl:w-[350px] xl:h-[350px] "
      />
    </div>
  );
}
