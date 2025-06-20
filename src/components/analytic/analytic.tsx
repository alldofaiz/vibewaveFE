/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";
import { useState, useEffect, useMemo, ReactNode, Key } from "react";
import data from "@/dataset/data.json";
import ApexCharts from "react-apexcharts";
import { Tabs, Tab, Box } from "@mui/material";
import { ContextTotal } from "@/api/stats";
import Image from "next/image";

interface Data {
  total_calculated: ReactNode;
  total: ReactNode;
  id: Key | null | undefined;
  src: string | undefined;
  name: string | undefined;
  fashion_types: {
    id: number;
    name: string;
    src: string;
    totalGenerate: number;
  }[];
  brand_prices: string[];
  regions: { id: number; name: string; value: string; src: string }[];
  cultures: { id: number; name: string; value: string; src: string }[];
  seasons: { id: number; name: string; value: string; src: string }[];
  weathers: string[];
  platforms: { id: number; name: string; value: string; src: string }[];
}

export default function AnalyticSection() {
  const [fashionData, setFashionData] = useState<Data | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [activeTab, setActiveTab] = useState("fashion_types");
  const [fashionChartData, setFashionChartData] = useState<unknown>(null);
  const [regionChartData, setRegionChartData] = useState<unknown>(null);
  const [cultureChartData, setCultureChartData] = useState<unknown>(null);
  const [seasonChartData, setSeasonChartData] = useState<unknown>(null);
  const [platformChartData, setPlatformChartData] = useState<unknown>(null);

  const [fashionTypeJson, setFashionTypeJson] = useState<Data[] | null>(null);
  const [regionTypeJson, setRegionTypeJson] = useState<Data[] | null>(null);
  const [cultureTypeJson, setCultureTypeJson] = useState<Data[] | null>(null);
  const [seasonTypeJson, setSeasonTypeJson] = useState<Data[] | null>(null);
  const [platformTypeJson, setPlatformTypeJson] = useState<Data[] | null>(null);

  useEffect(() => {
    setFashionData(data);
    setFashionTypeJson(data.fashion_types);
    setCultureTypeJson(data.cultures);
    setSeasonTypeJson(data.seasons);
    setPlatformTypeJson(data.platforms);
  }, []);

  // fetchFashionType
  useEffect(() => {
    const fetchFashionType = async () => {
      try {
        const totalData = await ContextTotal("fashion_type");

        if (!fashionData || !fashionData.fashion_types) {
          throw new Error("fashionData not found");
        }

        const merged = fashionData.fashion_types.map((item: any) => {
          const contextItem = totalData.find(
            (c: any) => c.context === item.name
          );
          return {
            ...item,
            total: contextItem ? contextItem.total : 0,
          };
        });

        const total_calculated = merged.reduce(
          (acc: number, item: any) => acc + item.total,
          0
        );

        const mergedWithTotal = merged.map((item: any) => ({
          ...item,
          total_calculated,
        }));

        setFashionTypeJson(mergedWithTotal);

        const topSeven = [...merged]
          .sort((a, b) => b.total - a.total)
          .slice(0, 7);

        const categories = topSeven.map((item) => item.name);
        const dataSeries = topSeven.map((item) => item.total);

        setFashionChartData({
          options: {
            chart: {
              type: "bar",
              height: 350,
            },
            plotOptions: {
              bar: {
                horizontal: false,
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
              text: "7 Most Generate Fashion Type",
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

    fetchFashionType();
  }, [fashionData]);

  // region
  useEffect(() => {
    const fetchRegionType = async () => {
      try {
        const totalData = await ContextTotal("region");

        if (!fashionData || !fashionData.regions_new) {
          throw new Error("Region not found");
        }

        const normalize = (str: string) =>
          str
            .trim()
            .toLowerCase()
            .replace(/[\s_]+/g, "");

        const merged = fashionData.regions_new.map((item: any) => {
          const contextItem = totalData.find(
            (c: any) => normalize(c.context) === normalize(item.value)
          );

          return {
            ...item,
            total: contextItem ? contextItem.total : 0,
          };
        });

        const total_calculated = merged.reduce(
          (acc: number, item: any) => acc + item.total,
          0
        );

        const mergedWithTotal = merged.map((item: any) => ({
          ...item,
          total_calculated,
        }));

        setRegionTypeJson(mergedWithTotal);

        const topSeven = [...merged]
          .sort((a, b) => b.total - a.total)
          .slice(0, 7);

        const categories = topSeven.map((item) => item.name);
        const dataSeries = topSeven.map((item) => item.total);

        setRegionChartData({
          options: {
            chart: {
              type: "bar",
              height: 350,
            },
            plotOptions: {
              bar: {
                horizontal: false,
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
              text: "7 Most Generate Region",
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

    fetchRegionType();
  }, [fashionData]);

  // culture
  useEffect(() => {
    const fetchCultureType = async () => {
      try {
        const totalData = await ContextTotal("culture");

        if (!fashionData || !fashionData.cultures) {
          throw new Error("Culture not found");
        }

        const normalize = (str: string) =>
          str
            .trim()
            .toLowerCase()
            .replace(/[\s_]+/g, "");

        const merged = fashionData.cultures.map((item: any) => {
          const contextItem = totalData.find(
            (c: any) => normalize(c.context) === normalize(item.value)
          );

          return {
            ...item,
            total: contextItem ? contextItem.total : 0,
          };
        });

        const total_calculated = merged.reduce(
          (acc: number, item: any) => acc + item.total,
          0
        );

        const mergedWithTotal = merged.map((item: any) => ({
          ...item,
          total_calculated,
        }));

        setCultureTypeJson(mergedWithTotal);

        const topSeven = [...merged]
          .sort((a, b) => b.total - a.total)
          .slice(0, 7);

        const categories = topSeven.map((item) => item.name);
        const dataSeries = topSeven.map((item) => item.total);

        setCultureChartData({
          options: {
            chart: {
              type: "bar",
              height: 350,
            },
            plotOptions: {
              bar: {
                horizontal: false,
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
              text: "7 Most Generate Culture",
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

    fetchCultureType();
  }, [fashionData]);

  // season
  useEffect(() => {
    const fetchSeasonType = async () => {
      try {
        const totalData = await ContextTotal("season");

        if (!fashionData || !fashionData.seasons) {
          throw new Error("Season not found");
        }

        const merged = fashionData.seasons.map((item: any) => {
          const contextItem = totalData.find(
            (c: any) => c.context === item.value
          );
          return {
            ...item,
            total: contextItem ? contextItem.total : 0,
          };
        });

        const total_calculated = merged.reduce(
          (acc: number, item: any) => acc + item.total,
          0
        );

        const mergedWithTotal = merged.map((item: any) => ({
          ...item,
          total_calculated,
        }));

        setSeasonTypeJson(mergedWithTotal);

        const topFour = [...merged]
          .sort((a, b) => b.total - a.total)
          .slice(0, 4);

        const categories = topFour.map((item) => item.name);
        const dataSeries = topFour.map((item) => item.total);

        setSeasonChartData({
          options: {
            chart: {
              type: "line",
              height: 350,
            },
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            xaxis: {
              categories,
              title: {
                text: "Season",
                style: {
                  fontSize: "16px",
                  fontWeight: "bold",
                },
              },
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
              text: "Statistik Generate Season",
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

    fetchSeasonType();
  }, [fashionData]);

  // platform
  useEffect(() => {
    const fetchPlatformType = async () => {
      try {
        const totalData = await ContextTotal("platform");

        if (!fashionData || !fashionData.platforms) {
          throw new Error("Platform not found");
        }

        const merged = fashionData.platforms.map((item: any) => {
          const contextItem = totalData.find(
            (c: any) => c.context.toLowerCase() === item.value.toLowerCase()
          );
          return {
            ...item,
            total: contextItem ? contextItem.total : 0,
          };
        });

        const total_calculated = merged.reduce(
          (acc: number, item: any) => acc + item.total,
          0
        );

        const mergedWithTotal = merged.map((item: any) => ({
          ...item,
          total_calculated,
        }));

        setPlatformTypeJson(mergedWithTotal);

        const topFour = [...merged]
          .sort((a, b) => b.total - a.total)
          .slice(0, 2);

        const categories = topFour.map((item) => item.name);
        const dataSeries = topFour.map((item) => item.total);

        setPlatformChartData({
          options: {
            chart: {
              type: "pie",
              height: 350,
            },
            labels: categories,
            title: {
              text: "Statistik Generate Platform",
              align: "center",
              style: {
                fontSize: "24px",
                fontWeight: "bold",
              },
            },
            legend: {
              position: "bottom",
            },
            dataLabels: {
              enabled: true,
              style: {
                fontSize: "16px",
                fontWeight: "bold",
              },
            },
          },
          series: dataSeries,
        });
      } catch (err: any) {
        console.error("Failed to fetch context total:", err);
      }
    };

    fetchPlatformType();
  }, [fashionData]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    setCurrentPage(1);
  };

  const itemsPerPage = 7;

  const handleSort = (column: string) => {
    setSortColumn(column);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedItems = useMemo(() => {
    let data: Data[] | null = null;

    if (activeTab === "fashion_types") {
      data = fashionTypeJson;
    } else if (activeTab === "regions") {
      data = regionTypeJson;
    } else if (activeTab === "cultures") {
      data = cultureTypeJson;
    } else if (activeTab === "seasons") {
      data = seasonTypeJson;
    } else if (activeTab === "platform") {
      data = platformTypeJson;
    }

    if (!data) return [];

    const sortedData = [...data];
    if (sortColumn) {
      sortedData.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortColumn] > b[sortColumn] ? 1 : -1;
        } else {
          return a[sortColumn] < b[sortColumn] ? 1 : -1;
        }
      });
    }

    return sortedData;
  }, [
    fashionTypeJson,
    regionTypeJson,
    cultureTypeJson,
    seasonTypeJson,
    platformTypeJson,
    activeTab,
    sortColumn,
    sortOrder,
  ]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col gap-10 h-full mx-auto max-w-[1400px] bg-primary w-full text-sm xl:text-base text-secondary px-5 lg:px-10 py-10">
      {/* <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gradient text-center pb-1">
        Dashboard Analytic
      </h1> */}
      <Box sx={{ width: "100%" }} className="flex flex-col gap-5">
        <div className=" w-full flex flex-col-reverse lg:flex-row lg:justify-between gap-5  overflow-x-hidden">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="inherit"
            aria-label="tabs example"
            variant="scrollable"
            scrollButtons="auto"
            className="flex flex-row gap-2 overflow-x-auto w-[80%]"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#00f4fe",
              },
              justifyContent: "flex-start",
            }}
          >
            <Tab
              label="Fashion Types"
              value="fashion_types"
              sx={{
                fontSize: "0.8rem",
                color: activeTab === "fashion_types" ? "#e3e8f3" : "#e3e8f3",
                fontWeight: "bold",
                borderBottom:
                  activeTab === "fashion_types"
                    ? "2px solid #00f4fe"
                    : "2px solid #00f4fe",
                "&.MuiTab-root": {
                  borderBottom:
                    activeTab === "fashion_types"
                      ? "2px solid #fff"
                      : "2px solid #fff",
                },
                "&.Mui-selected": {
                  backgroundColor: "",
                },
              }}
            />
            <Tab
              label="Regions"
              value="regions"
              sx={{
                fontSize: "0.8rem",
                color: activeTab === "regions" ? "#e3e8f3" : "#e3e8f3",
                fontWeight: "bold",
                borderBottom:
                  activeTab === "regions"
                    ? "2px solid #00f4fe"
                    : "2px solid #00f4fe",
                "&.MuiTab-root": {
                  borderBottom:
                    activeTab === "regions"
                      ? "2px solid #fff"
                      : "2px solid #fff",
                },
                "&.Mui-selected": {
                  backgroundColor: "",
                },
              }}
            />
            <Tab
              label="Cultures"
              value="cultures"
              sx={{
                fontSize: "0.8rem",
                color: activeTab === "cultures" ? "#e3e8f3" : "#e3e8f3",
                fontWeight: "bold",
                borderBottom:
                  activeTab === "cultures"
                    ? "2px solid #00f4fe"
                    : "2px solid #00f4fe",
                "&.MuiTab-root": {
                  borderBottom:
                    activeTab === "cultures"
                      ? "2px solid #fff"
                      : "2px solid #fff",
                },
                "&.Mui-selected": {
                  backgroundColor: "",
                },
              }}
            />
            <Tab
              label="Seasons"
              value="seasons"
              sx={{
                fontSize: "0.8rem",
                color: activeTab === "seasons" ? "#e3e8f3" : "#e3e8f3",
                fontWeight: "bold",
                borderBottom:
                  activeTab === "seasons"
                    ? "2px solid #00f4fe"
                    : "2px solid #00f4fe",
                "&.MuiTab-root": {
                  borderBottom:
                    activeTab === "seasons"
                      ? "2px solid #fff"
                      : "2px solid #fff",
                },
                "&.Mui-selected": {
                  backgroundColor: "",
                },
              }}
            />
            <Tab
              label="Platform"
              value="platform"
              sx={{
                fontSize: "0.8rem",
                color: activeTab === "platform" ? "#e3e8f3" : "#e3e8f3",
                fontWeight: "bold",
                borderBottom:
                  activeTab === "platform"
                    ? "2px solid #00f4fe"
                    : "2px solid #00f4fe",
                "&.MuiTab-root": {
                  borderBottom:
                    activeTab === "platform"
                      ? "2px solid #fff"
                      : "2px solid #fff",
                },
                "&.Mui-selected": {
                  backgroundColor: "",
                },
              }}
            />
          </Tabs>
          <div className=" flex flex-col gap-2">
            <p className=" text-secondary text-3xl font-bold">Analytic</p>
            {currentItems[0] && (
              <p className="">
                Total Generate : {currentItems[0].total_calculated}
              </p>
            )}
          </div>
        </div>
        {/* Fashion Type */}
        {activeTab === "fashion_types" && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="w-full flex flex-col gap-3 lg:w-[50%]">
                {/* table */}
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    {/* head */}
                    <thead>
                      <tr>
                        <th
                          className="border-b-2 border-gray-300 cursor-pointer pb-2"
                          onClick={() => handleSort("name")}
                        >
                          Type{" "}
                          {sortColumn === "name"
                            ? sortOrder === "asc"
                              ? "↑"
                              : "↓"
                            : ""}
                        </th>
                        <th
                          className="border-b-2 border-gray-300 cursor-pointer pb-2"
                          onClick={() => handleSort("total")}
                        >
                          Total Generate{" "}
                          {sortColumn === "total"
                            ? sortOrder === "asc"
                              ? "↑"
                              : "↓"
                            : ""}
                        </th>
                        <th className="border-b-2 border-gray-300"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12 bg-background p-2 rounded-xl">
                                  <Image
                                    src={item.src}
                                    alt={item.name}
                                    width={100}
                                    height={100}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">{item.total}</td>
                          <th className="py-4 px-6">
                            {/* <button className="btn btn-ghost btn-xs bg-button text-primary p-2 rounded-full text-sm">
                              Details
                            </button> */}
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="flex bg-background_secondary font-bold  rounded-xl w-fit">
                  <button
                    className="btn btn-ghost btn-xs hover:bg-button hover:text-primary px-3 py-2 rounded-l-xl"
                    onClick={() =>
                      paginate(currentPage > 1 ? currentPage - 1 : currentPage)
                    }
                  >
                    Prev
                  </button>
                  <div className="mx-3 px-3 py-2">
                    {currentPage} of {totalPages}
                  </div>
                  <button
                    className="btn btn-ghost btn-xs hover:bg-button hover:text-primary px-3 py-2 rounded-r-xl"
                    onClick={() =>
                      paginate(
                        currentPage < totalPages ? currentPage + 1 : currentPage
                      )
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-[70%] text-primary bg-white h-full rounded-2xl p-5">
                {fashionChartData && (
                  <ApexCharts
                    options={fashionChartData.options}
                    series={fashionChartData.series}
                    type="bar"
                    height={450}
                    width={"100%"}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* regions */}
        {activeTab === "regions" && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="w-full flex flex-col gap-3 lg:w-[50%]">
                {/* table */}
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    {/* head */}
                    <thead>
                      <tr>
                        <th
                          className="border-b-2 border-gray-300 cursor-pointer pb-2"
                          onClick={() => handleSort("name")}
                        >
                          Type{" "}
                          {sortColumn === "name"
                            ? sortOrder === "asc"
                              ? "↑"
                              : "↓"
                            : ""}
                        </th>
                        <th
                          className="border-b-2 border-gray-300 cursor-pointer pb-2"
                          onClick={() => handleSort("total")}
                        >
                          Total Generate{" "}
                          {sortColumn === "total"
                            ? sortOrder === "asc"
                              ? "↑"
                              : "↓"
                            : ""}
                        </th>
                        <th className="border-b-2 border-gray-300"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="font-bold">{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">{item.total}</td>
                          <th className="py-4 px-6">
                            {/* <button className="btn btn-ghost btn-xs bg-button text-primary p-2 rounded-full text-sm">
                              Details
                            </button> */}
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="flex bg-background_secondary font-bold  rounded-xl w-fit">
                  <button
                    className="btn btn-ghost btn-xs hover:bg-button hover:text-primary px-3 py-2 rounded-l-xl"
                    onClick={() =>
                      paginate(currentPage > 1 ? currentPage - 1 : currentPage)
                    }
                  >
                    Prev
                  </button>
                  <div className="mx-3 px-3 py-2">
                    {currentPage} of {totalPages}
                  </div>
                  <button
                    className="btn btn-ghost btn-xs hover:bg-button hover:text-primary px-3 py-2 rounded-r-xl"
                    onClick={() =>
                      paginate(
                        currentPage < totalPages ? currentPage + 1 : currentPage
                      )
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-[70%] text-primary bg-white h-full rounded-2xl p-5">
                {regionChartData && (
                  <ApexCharts
                    options={regionChartData.options}
                    series={regionChartData.series}
                    type="bar"
                    height={450}
                    width={"100%"}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* cultures */}
        {activeTab === "cultures" && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="w-full flex flex-col gap-3 lg:w-[50%]">
                {/* table */}
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    {/* head */}
                    <thead>
                      <tr>
                        <th
                          className="border-b-2 border-gray-300 cursor-pointer pb-2"
                          onClick={() => handleSort("name")}
                        >
                          Type{" "}
                          {sortColumn === "name"
                            ? sortOrder === "asc"
                              ? "↑"
                              : "↓"
                            : ""}
                        </th>
                        <th
                          className="border-b-2 border-gray-300 cursor-pointer pb-2"
                          onClick={() => handleSort("total")}
                        >
                          Total Generate{" "}
                          {sortColumn === "total"
                            ? sortOrder === "asc"
                              ? "↑"
                              : "↓"
                            : ""}
                        </th>
                        <th className="border-b-2 border-gray-300"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12 bg-background p-2 rounded-xl">
                                  <Image
                                    src={item.src}
                                    alt={item.name}
                                    width={100}
                                    height={100}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">{item.total}</td>
                          <th className="py-4 px-6">
                            {/* <button className="btn btn-ghost btn-xs bg-button text-primary p-2 rounded-full text-sm">
                              Details
                            </button> */}
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="flex bg-background_secondary font-bold  rounded-xl w-fit">
                  <button
                    className="btn btn-ghost btn-xs hover:bg-button hover:text-primary px-3 py-2 rounded-l-xl"
                    onClick={() =>
                      paginate(currentPage > 1 ? currentPage - 1 : currentPage)
                    }
                  >
                    Prev
                  </button>
                  <div className="mx-3 px-3 py-2">
                    {currentPage} of {totalPages}
                  </div>
                  <button
                    className="btn btn-ghost btn-xs hover:bg-button hover:text-primary px-3 py-2 rounded-r-xl"
                    onClick={() =>
                      paginate(
                        currentPage < totalPages ? currentPage + 1 : currentPage
                      )
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-[70%] text-primary bg-white h-full rounded-2xl p-5">
                {cultureChartData && (
                  <ApexCharts
                    options={cultureChartData.options}
                    series={cultureChartData.series}
                    type="bar"
                    height={450}
                    width={"100%"}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* seasons */}
        {activeTab === "seasons" && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="w-full flex flex-col gap-3 lg:w-[50%]">
                {/* table */}
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    {/* head */}
                    <thead>
                      <tr>
                        <th
                          className="border-b-2 border-gray-300 cursor-pointer pb-2"
                          onClick={() => handleSort("name")}
                        >
                          Type{" "}
                          {sortColumn === "name"
                            ? sortOrder === "asc"
                              ? "↑"
                              : "↓"
                            : ""}
                        </th>
                        <th
                          className="border-b-2 border-gray-300 cursor-pointer pb-2"
                          onClick={() => handleSort("total")}
                        >
                          Total Generate{" "}
                          {sortColumn === "total"
                            ? sortOrder === "asc"
                              ? "↑"
                              : "↓"
                            : ""}
                        </th>
                        <th className="border-b-2 border-gray-300"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12 bg-background p-2 rounded-xl">
                                  <Image
                                    src={item.src}
                                    alt={item.name}
                                    width={100}
                                    height={100}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">{item.total}</td>
                          <th className="py-4 px-6">
                            {/* <button className="btn btn-ghost btn-xs bg-button text-primary p-2 rounded-full text-sm">
                              Details
                            </button> */}
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="flex bg-background_secondary font-bold  rounded-xl w-fit">
                  <button
                    className="btn btn-ghost btn-xs hover:bg-button hover:text-primary px-3 py-2 rounded-l-xl"
                    onClick={() =>
                      paginate(currentPage > 1 ? currentPage - 1 : currentPage)
                    }
                  >
                    Prev
                  </button>
                  <div className="mx-3 px-3 py-2">
                    {currentPage} of {totalPages}
                  </div>
                  <button
                    className="btn btn-ghost btn-xs hover:bg-button hover:text-primary px-3 py-2 rounded-r-xl"
                    onClick={() =>
                      paginate(
                        currentPage < totalPages ? currentPage + 1 : currentPage
                      )
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-[70%] text-primary bg-white h-full rounded-2xl p-5">
                {activeTab === "seasons" && seasonChartData && (
                  <ApexCharts
                    options={seasonChartData.options}
                    series={seasonChartData.series}
                    type="line"
                    height={450}
                    width={"100%"}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* platform */}
        {activeTab === "platform" && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="w-full flex flex-col gap-3 lg:w-[50%]">
                {/* table */}
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    {/* head */}
                    <thead>
                      <tr>
                        <th
                          className="border-b-2 border-gray-300 cursor-pointer pb-2"
                          onClick={() => handleSort("name")}
                        >
                          Type{" "}
                          {sortColumn === "name"
                            ? sortOrder === "asc"
                              ? "↑"
                              : "↓"
                            : ""}
                        </th>
                        <th
                          className="border-b-2 border-gray-300 cursor-pointer pb-2"
                          onClick={() => handleSort("total")}
                        >
                          Total Generate{" "}
                          {sortColumn === "total"
                            ? sortOrder === "asc"
                              ? "↑"
                              : "↓"
                            : ""}
                        </th>
                        <th className="border-b-2 border-gray-300"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12 bg-background p-2 rounded-xl">
                                  <Image
                                    src={item.src}
                                    alt={item.name}
                                    width={100}
                                    height={100}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">{item.total}</td>
                          <th className="py-4 px-6">
                            {/* <button className="btn btn-ghost btn-xs bg-button text-primary p-2 rounded-full text-sm">
                              Details
                            </button> */}
                          </th>
                        </tr>
                      ))}
                    </tbody>
                    {/* foot */}
                  </table>
                </div>
                {/* Pagination */}
                <div className="flex bg-background_secondary font-bold  rounded-xl w-fit">
                  <button
                    className="btn btn-ghost btn-xs hover:bg-button hover:text-primary px-3 py-2 rounded-l-xl"
                    onClick={() =>
                      paginate(currentPage > 1 ? currentPage - 1 : currentPage)
                    }
                  >
                    Prev
                  </button>
                  <div className="mx-3 px-3 py-2">
                    {currentPage} of {totalPages}
                  </div>
                  <button
                    className="btn btn-ghost btn-xs hover:bg-button hover:text-primary px-3 py-2 rounded-r-xl"
                    onClick={() =>
                      paginate(
                        currentPage < totalPages ? currentPage + 1 : currentPage
                      )
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-[70%] text-primary bg-white h-full rounded-2xl p-5">
                {activeTab === "platform" && seasonChartData && (
                  <ApexCharts
                    options={platformChartData.options}
                    series={platformChartData.series}
                    type="pie"
                    height={400}
                    width={"100%"}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}
