"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { RiAiGenerate2 } from "react-icons/ri";
import { GrAnalytics } from "react-icons/gr";

export default function ServicesSection() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
    });
  }, []);
  return (
    <div className=" relative flex flex-col lg:flex-row lg:gap-10 h-full font-bold mx-auto max-w-[1440px] bg-primary w-full text-sm xl:text-base text-secondary px-5 lg:px-10 py-10 items-center">
      <Image
        src="/home/top-right.webp"
        alt="logo"
        width={9999}
        height={9999}
        className=" absolute right-0 top-0 w-[200px] h-[200px] xl:w-[350px] xl:h-[350px] "
      />
      <div className=" relative z-10 w-full flex flex-col gap-10 items-center justify-center">
        <div className=" max-w-[700px] text-center flex flex-col gap-3 items-center justify-center">
          {" "}
          <p
            data-aos="fade-down"
            className=" text-4xl lg:text-5xl xl:text-7xl  text-gradient"
          >
            Our Services
          </p>
          <p data-aos="fade-up" className=" text-xs md:text-base">
            Providing AI-generated business ideas based on key input factors
            (such as target audience, trends, and budget)
          </p>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {/* card-1 */}
          <div
            data-aos="fade-right"
            className=" w-[300px] flex flex-col gap-3 bg-secondary  rounded-2xl text-primary hover:shadow-lg  shadow-third hover:scale-105 transition delay-150 duration-300 ease-in-out"
          >
            <Image
              src="/home/generate.jpg"
              alt="logo"
              width={500}
              height={500}
              className=" w-full h-[200px] object-cover rounded-t-2xl "
            />
            <div className=" pb-5 px-5 flex flex-col gap-3">
              <div className=" text-center uppercase flex items-center gap-2 justify-center text-xs md:text-base">
                {" "}
                <p>Generate</p>
                <RiAiGenerate2 />
              </div>
              <p className=" text-xs md:text-base  font-light">
                {" "}
                We provide services to help you start your fashion business,
                offering ideas that suit the right first steps.
              </p>
            </div>
          </div>
          {/* card-2 */}
          <div
            data-aos="fade-up"
            className=" w-[300px] flex flex-col gap-3 bg-secondary  rounded-2xl text-primary hover:shadow-lg  shadow-third hover:scale-105 transition-all ease-in-out duration-500"
          >
            <Image
              src="/home/analytic.jpg"
              alt="logo"
              width={500}
              height={500}
              className=" w-full h-[200px] object-cover rounded-t-2xl "
            />
            <div className=" pb-5 px-5 flex flex-col gap-3">
              <div className=" text-center uppercase flex items-center gap-2 justify-center text-xs md:text-base">
                {" "}
                <p>Analytic</p>
                <GrAnalytics />
              </div>
              <p className=" text-xs md:text-base  font-light">
                {" "}
                We provide analytics features to analyze the activity of users
                who have performed the generate process.
              </p>
            </div>
          </div>
          {/* card-3 */}
          {/* <div
            data-aos="fade-left"
            className=" w-[300px] flex flex-col gap-3 bg-secondary  rounded-2xl text-primary hover:shadow-lg  shadow-third hover:scale-105 transition-all ease-in-out duration-500"
          >
            <Image
              src="/home/container.jpg"
              alt="logo"
              width={500}
              height={500}
              className=" w-full h-[200px] object-cover rounded-t-2xl "
            />
            <div className=" pb-5 px-5 flex flex-col gap-3">
              <div className=" text-center uppercase flex items-center gap-2 justify-center text-xs md:text-base">
                {" "}
                <p>Automation Stock</p>
                <SiGooglecontaineroptimizedos />
              </div>
              <p className=" text-xs md:text-base  font-light">
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptate suscipit minima iure architecto nemo placeat unde,
                sunt hic quo possimus! Inventore provident, ad placeat veritatis
                odio molestias modi tempora quis?
              </p>
            </div>
          </div> */}
        </div>
      </div>
      <Image
        src="/home/bottom-left.webp"
        alt="logo"
        width={9999}
        height={9999}
        className=" absolute left-0 bottom-0 w-[200px] h-[200px] xl:w-[350px] xl:h-[350px] "
      />
    </div>
  );
}
