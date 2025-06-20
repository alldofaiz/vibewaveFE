/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ApexCharts from "react-apexcharts";
import Link from "next/link";
import { MostSaved, ContextTotalResponse } from "@/api/stats";

export default function StockSection() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
    });
  }, []);

  const [, setIsMostSaved] = useState<ContextTotalResponse[] | null>(null);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchMostSaved = async () => {
      try {
        const response = await MostSaved();

        setIsMostSaved(response);

        const topSeven = [...response]
          .sort((a, b) => b.total - a.total)
          .slice(0, 7);

        const categories = topSeven.map((item) => item.context);
        const dataSeries = topSeven.map((item) => item.total);

        setChartData({
          options: {
            chart: {
              type: "bar",
              height: 350,
            },
            plotOptions: {
              bar: {
                horizontal: true,
                endingShape: "rounded",
                columnWidth: "50%",
              },
            },
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              categories,
            },
            yaxis: {
              title: {
                text: "Quantity",
                style: {
                  fontSize: "18px",
                  fontWeight: "bold",
                },
              },
            },
            title: {
              text: "7 Most People Generated",
              align: "center",
              style: {
                fontSize: "24px",
                fontWeight: "bold",
              },
            },
          },
          series: [
            {
              name: "Quantity Generate",
              data: dataSeries,
            },
          ],
        });
      } catch (err: any) {
        console.error("Failed to fetch context total:", err);
      }
    };

    fetchMostSaved();
  }, []);
  return (
    <div className=" relative flex flex-col lg:flex-row gap-5 lg:gap-10 h-full font-bold mx-auto max-w-[1440px] bg-primary w-full text-sm xl:text-base text-secondary px-5 lg:px-10 py-10 items-center">
      {/* left */}
      <div className=" w-full lg:w-[50%] flex flex-col gap-5 font-bold">
        <p
          data-aos="fade-down"
          className="text-4xl lg:text-5xl xl:text-7xl  text-gradient"
        >
          Who&apos;s Joined Us
        </p>
        <p data-aos="fade-right" className=" text-xs md:text-base">
          Individuals and teams from various fields use our platform to boost
          productivity and innovation.
        </p>
        <Link
          href="/auth/login"
          data-aos="fade-up"
          className=" relative bg-primary border-2 border-third hover:bg-third font-bold hover:text-primary text-sm text-white w-[200px] text-center py-2 rounded-2xl"
        >
          Login{" "}
          {/* <span className=" absolute -bottom-3 left-0 text-xl text-third ">
            <BsFillCursorFill />
          </span> */}
        </Link>
      </div>
      {/* right */}
      <div className="w-full lg:w-[50%] flex flex-col gap-5 bg-white h-full rounded-2xl p-5">
        {chartData && (
          <ApexCharts
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={450}
            width={"100%"}
          />
        )}
      </div>
    </div>
  );
}
