/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";

import { GenerateHistoryResponse, HistoryIdea } from "@/api/generate";
import DOMPurify from "isomorphic-dompurify";
import { useEffect, useState } from "react";

export default function HistorySection() {
  const [historyIdea, setHistoryIdea] = useState<GenerateHistoryResponse[]>([]);

  useEffect(() => {
    const fetchHistoryIdea = async () => {
      try {
        const response = await HistoryIdea();
        setHistoryIdea(response);
      } catch (error) {
        console.error("Failed to fetch history idea:", error);
      }
    };

    fetchHistoryIdea();
  }, []);

  return (
    <div className="flex flex-col capitalize items-center gap-10 min-h-screen mx-auto max-w-[1400px] bg-primary w-full text-sm xl:text-base text-primary px-5 lg:px-10 py-10">
      <h1 className="text-2xl font-bold text-center text-secondary">
        Your History Idea
      </h1>

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
        {historyIdea.map((item) => (
          <div
            key={item.id}
            className=" flex flex-col gap-5 bg-secondary text-primary p-5 rounded-2xl"
          >
            <p className=" text-xl font-bold"> {item.name_idea}</p>
            <div className=" flex flex-col gap-5 text-base">
              <div className="  flex flex-col">
                <p className=" font-bold">Full Idea :</p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      item.full_idea.replace(/\n/g, "<br />")
                    ),
                  }}
                ></div>
              </div>
              <div className=" grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="  flex flex-col">
                  <p className=" font-bold">Fashion Type :</p>
                  <p>{item.fashion_type}</p>
                </div>
                <div className="  flex flex-col">
                  <p className=" font-bold">Regions :</p>
                  <p>{item.region}</p>
                </div>
                <div className="  flex flex-col">
                  <p className=" font-bold">Cultures :</p>
                  <p>{item.culture}</p>
                </div>
                <div className="  flex flex-col">
                  <p className=" font-bold">Season :</p>
                  <p>{item.season}</p>
                </div>
                <div className="  flex flex-col">
                  <p className=" font-bold">Platform :</p>
                  <p>{item.platform}</p>
                </div>
                <div className="  flex flex-col">
                  <p className=" font-bold">Brand Price :</p>
                  <p>{item.brand_price}</p>
                </div>
                <div className="  flex flex-col">
                  <p className=" font-bold">Material Idea :</p>
                  {item.material_idea.map((item) => (
                    <div
                      key={item.id}
                      className=" flex flex-col border-b-2 w-fit border-primary"
                    >
                      <p className=" font-bold">{item.material}</p>{" "}
                      <div className=" flex flex-col ">
                        {" "}
                        <p className=" text-sm font-bold">
                          Material Price:
                        </p>{" "}
                        <p>{item.range_price}</p>
                      </div>
                      <div className=" flex flex-col ">
                        {" "}
                        <p className="text-sm font-bold">Selling Price:</p>{" "}
                        <p>{item.selling_price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* result */}
    </div>
  );
}
