/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import data from "@/dataset/data.json";
import { IoIosArrowDown } from "react-icons/io";
import { GoTrash } from "react-icons/go";
import Swal from "sweetalert2";
import {
  GenerateIdea,
  SaveIdea,
  GenerateResponse,
  HistoriesIdea,
} from "@/api/generate";
import { useRouter } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { MdDataSaverOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

interface Data {
  fashion_types: { id: number; name: string; src: string }[];
  brand_prices: { id: number; name: string }[];
  regions: { id: number; name: string; value: string; src: string }[];
  cultures: { id: number; name: string; value: string; src: string }[];
  seasons: { id: number; name: string; value: string; src: string }[];
  weathers: string[];
  platforms: { id: number; name: string; value: string; src: string }[];
}

export default function GenerateSection() {
  const router = useRouter();

  const [fashionData, setFashionData] = useState<Data | null>(null);
  const [isVisibleFashion, setIsVisibleFashion] = useState(true);
  const [isVisibleRegions, setIsVisibleRegions] = useState("");
  const [isVisibleCultures, setIsVisibleCultures] = useState(false);
  const [isVisibleSeasons, setIsVisibleSeasons] = useState(false);
  const [isVisiblePlaforms, setIsVisiblePlatforms] = useState(false);
  const [isVisibleBrandPrice, setIsVisibleBrandPrice] = useState(false);

  const [selectedFashionType, setSelectedFashionType] = useState<string | null>(
    null
  );
  const [selectedRegions, setSelectedRegions] = useState<string | null>(null);
  const [selectedCultures, setSelectedCultures] = useState<string | null>(null);
  const [selectedSeasons, setSelectedSeasons] = useState<string | null>(null);
  const [selectedPlaforms, setSelectedPlaforms] = useState<string | null>(null);
  const [selectedBrandPrice, setSelectedBrandPrice] = useState<string | null>(
    null
  );

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegions(event.target.value);
  };

  const handleButtonClickFashionType = (name: string) => {
    setSelectedFashionType(name === selectedFashionType ? null : name);
    setIsVisibleFashion(false);
    setIsVisibleRegions(true);
  };

  const handleResetFashionType = () => {
    setSelectedFashionType(null);
    setIsVisibleFashion(true);
    setIsVisibleRegions(false);
    setIsVisibleCultures(false);
    setIsVisibleSeasons(false);
    setIsVisiblePlatforms(false);
  };

  // const handleButtonClickRegionsType = (name: string) => {
  //   setSelectedRegions(name === selectedRegions ? null : name);
  //   setIsVisibleRegions(false);
  //   setIsVisibleCultures(true);
  // };

  useEffect(() => {
    if (selectedRegions) {
      setIsVisibleCultures(true);
    } else {
      setIsVisibleCultures(false);
    }
  }, [selectedRegions]);

  const handleResetRegionsType = () => {
    setSelectedRegions(null);
    setIsVisibleFashion(false);
    setIsVisibleRegions(true);
    setIsVisibleCultures(false);
    setIsVisibleSeasons(false);
    setIsVisiblePlatforms(false);
  };

  const handleButtonClickCulturesType = (name: string) => {
    setSelectedCultures(name === selectedCultures ? null : name);
    setIsVisibleCultures(false);
    setIsVisibleSeasons(true);
  };

  const handleResetCulturesType = () => {
    setSelectedCultures(null);
    setIsVisibleFashion(false);
    setIsVisibleRegions(false);
    setIsVisibleCultures(true);
    setIsVisibleSeasons(false);
    setIsVisiblePlatforms(false);
  };

  const handleButtonClickSeasonsType = (name: string) => {
    setSelectedSeasons(name === selectedSeasons ? null : name);
    setIsVisibleSeasons(false);
    setIsVisiblePlatforms(true);
  };

  const handleResetSeasonsType = () => {
    setSelectedSeasons(null);
    setIsVisibleFashion(false);
    setIsVisibleRegions(false);
    setIsVisibleCultures(false);
    setIsVisibleSeasons(true);
    setIsVisiblePlatforms(false);
  };

  const handleButtonClickPlatformsType = (name: string) => {
    setSelectedPlaforms(name === selectedPlaforms ? null : name);
    setIsVisiblePlatforms(false);
    setIsVisibleBrandPrice(true);
  };

  const handleResetPlatformsType = () => {
    setSelectedPlaforms(null);
    setIsVisibleFashion(false);
    setIsVisibleRegions(false);
    setIsVisibleCultures(false);
    setIsVisibleSeasons(false);
    setIsVisiblePlatforms(true);
  };

  const handleButtonClickBrandPriceType = (name: string) => {
    setSelectedBrandPrice(name === selectedBrandPrice ? null : name);
    setIsVisiblePlatforms(false);
  };

  const handleResetBrandPriceType = () => {
    setSelectedBrandPrice(null);
    setIsVisibleFashion(false);
    setIsVisibleRegions(false);
    setIsVisibleCultures(false);
    setIsVisibleSeasons(false);
    setIsVisiblePlatforms(false);
    setIsVisibleBrandPrice(true);
  };

  const handleResetAll = () => {
    setSelectedPlaforms(null);
    setSelectedSeasons(null);
    setSelectedCultures(null);
    setSelectedRegions(null);
    setSelectedFashionType(null);
    setSelectedBrandPrice(null);
    setIsVisibleFashion(true);
    setIsVisibleRegions(false);
    setIsVisibleCultures(false);
    setIsVisibleSeasons(false);
    setIsVisiblePlatforms(false);
    setIsVisibleBrandPrice(false);
  };

  useEffect(() => {
    setFashionData(data);
  }, []);

  const [username, setUsername] = useState("");
  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
    }
  });

  const [generateIdea, setGenerateIdea] = useState<string>("");
  const [, setSaveIdea] = useState<GenerateResponse | null>(null);
  const [materialIdea, setMaterialIdea] = useState<string>("");
  const [ideaName, setIdeaName] = useState<string>("");
  const [historiesId, setHistoriesId] = useState<string>("");
  const [, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const materialList = [
    "Cotton",
    "Wool",
    "Silk",
    "Linen",
    "Polyester",
    "Denim",
    "Leather",
    "Nylon",
    "Rayon",
    "Synthetic",
  ];

  function extractMaterialIdea(
    findWords: string[],
    text: string
  ): { material: string; range_price: string; selling_price: string }[] {
    if (typeof text !== "string") return [];

    const results: {
      material: string;
      range_price: string;
      selling_price: string;
    }[] = [];
    const seen = new Set<string>();

    // Ambil semua <b>...</b> tags
    const boldPattern = /<b>(.*?)<\/b>/gi;
    const boldMatches = [...text.matchAll(boldPattern)].map((m) => m[1]);

    for (const material of findWords) {
      // Cari semua <b>material</b>
      const materialIndex = boldMatches.findIndex(
        (bold) => bold.toLowerCase() === material.toLowerCase()
      );

      if (materialIndex !== -1) {
        let range_price = "";
        let selling_price = "";

        // Cari dua <b>$X to $Y</b> setelah <b>material</b>
        for (let i = materialIndex + 1; i < boldMatches.length; i++) {
          const priceMatch = boldMatches[i].match(
            /\$([\d,]+)\s*(?:to|–|-)\s*\$([\d,]+)/i
          );
          if (priceMatch) {
            if (!range_price) {
              range_price = `$${priceMatch[1]} to $${priceMatch[2]}`;
            } else if (!selling_price) {
              selling_price = `$${priceMatch[1]} to $${priceMatch[2]}`;
              break;
            }
          }
        }

        const key = `${material}:${range_price}:${selling_price}`;
        if (!seen.has(key)) {
          results.push({ material, range_price, selling_price });
          seen.add(key);
        }
      }
    }

    return results;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await GenerateIdea({
        fashion_type: selectedFashionType || "",
        region: selectedRegions || "",
        culture: selectedCultures || "",
        season: selectedSeasons || "",
        platform: selectedPlaforms || "",
        username: username,
        brand_price: selectedBrandPrice || "",
      });

      const responsehistories = await HistoriesIdea({
        fashion_type: selectedFashionType || "",
        region: selectedRegions || "",
        culture: selectedCultures || "",
        season: selectedSeasons || "",
        platform: selectedPlaforms || "",
        brand_price: selectedBrandPrice || "",
      });

      const historiesId = responsehistories?.data?.id;
      setHistoriesId(historiesId || "");

      const rawText = response?.data || "";
      setGenerateIdea(rawText);

      const extractedMaterialList = extractMaterialIdea(materialList, rawText);
      setMaterialIdea(extractedMaterialList);

      // const formattedMaterial = extractedMaterialList
      //   .map((item) => `${item.material} (${item.range_price})`)
      //   .join(", ");

      setLoading(false);

      Swal.fire({
        icon: "success",
        title: "Idea Generated!",
        text: "Your fashion idea has been successfully generated.",
        confirmButtonColor: "#4ade80",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data.");
      setLoading(false);

      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: "Unable to generate idea. Please try again later.",
        confirmButtonColor: "#f87171",
      });
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!historiesId) {
      setError("No histories ID found. Please generate idea first.");
      setLoading(false);
      return;
    }

    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await SaveIdea({
        full_idea: generateIdea || "",
        material_idea: materialIdea,
        name_idea: ideaName,
        histories_id: historiesId,
      });

      setSaveIdea(response);
      setLoading(false);

      Swal.fire({
        icon: "success",
        title: "Idea Saved!",
        text: "Your fashion idea has been successfully saved.",
        confirmButtonColor: "#4ade80",
      });

      router.push("/history");
    } catch (error) {
      console.error("Error saving data:", error);
      setError("An error occurred while saving idea.");
      setLoading(false);

      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: "Unable to save idea. Please try again later.",
        confirmButtonColor: "#f87171",
      });
    }
  };

  const finalRawIdea = generateIdea || "";

  const sanitizedIdea = DOMPurify.sanitize(
    finalRawIdea.replace(/\n/g, "<br />")
  );

  return (
    <div className=" relative flex flex-col gap-10 min-h-screen h-full mx-auto max-w-[1400px] bg-primary w-full text-sm xl:text-base text-secondary px-5 lg:px-10 py-10">
      <div className=" flex flex-col gap-2">
        <h1 className=" text-3xl md:text-4xl xl:text-5xl font-bold text-gradient text-center pb-1">
          Generate your business
        </h1>
        <p className="  text-center">
          {" "}
          Generate your business with AI—find the best materials and the right
          prices in seconds.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col gap-5 px-10 w-full "
      >
        {/* Fashion Type */}
        <div className=" flex flex-col gap-3">
          <div className=" flex justify-between items-center py-1">
            <button
              type="button"
              onClick={() => setIsVisibleFashion(!isVisibleFashion)}
              className="flex gap-2 items-center"
              disabled
            >
              <p className="font-semibold">Fashion Type</p>
              <IoIosArrowDown
                className={`transition-transform duration-300 ${
                  isVisibleFashion ? "rotate-180" : ""
                }`}
              />
            </button>
            <div className=" flex items-center gap-3">
              {selectedFashionType && selectedFashionType.length > 0 && (
                <p className="capitalize font-bold bg-gradient  px-3 py-1 rounded-full text-primary">
                  {selectedFashionType}
                </p>
              )}
              <button
                type="button"
                hidden={!selectedFashionType}
                onClick={() => handleResetFashionType(selectedFashionType)}
                className="  text-base text-red-500"
              >
                <GoTrash />
              </button>
            </div>
          </div>
          {isVisibleFashion && (
            <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 place-items-center w-full">
              {fashionData ? (
                fashionData.fashion_types.map((item) => (
                  <button
                    type="button"
                    className={`border px-5 py-3 rounded-2xl flex flex-col gap-1 
                    ${
                      selectedFashionType === item.name
                        ? "bg-third"
                        : "bg-secondary"
                    } 
                    hover:bg-third`}
                    key={item.id}
                    onClick={() => handleButtonClickFashionType(item.name)}
                  >
                    <div className=" flex justify-between">
                      {" "}
                      <p className=" font-semibold capitalize text-primary">
                        {item.name}
                      </p>
                    </div>
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={100}
                      height={100}
                      className=" hover:scale-110 transition-transform duration-300"
                    />
                  </button>
                ))
              ) : (
                <p>No fashion data available</p>
              )}
            </div>
          )}
        </div>
        {/* Regions */}
        <div className=" flex flex-col gap-3">
          <div className=" flex justify-between items-center py-1">
            <button
              type="button"
              onClick={() => setIsVisibleRegions(!isVisibleRegions)}
              className="flex gap-2 items-center"
              disabled
            >
              <p className="font-semibold">Regions</p>
              <IoIosArrowDown
                className={`transition-transform duration-300 ${
                  isVisibleRegions ? "rotate-180" : ""
                }`}
              />
            </button>
            <div className=" flex items-center gap-3">
              {selectedRegions && selectedRegions.length > 0 && (
                <p className="capitalize font-bold bg-gradient  px-3 py-1 rounded-full text-primary">
                  {selectedRegions}
                </p>
              )}
              <button
                type="button"
                hidden={!selectedRegions}
                onClick={() => handleResetRegionsType(selectedRegions)}
                className="  text-base text-red-500"
              >
                <GoTrash />
              </button>
            </div>
          </div>
          {isVisibleRegions && (
            <div className="  place-items-center w-full">
              <select
                className=" w-fit border px-5 py-2 text-primary  rounded-2xl"
                name="regions"
                id="selectedRegions"
                value={selectedRegions}
                onChange={handleRegionChange}
              >
                <option value="All" disabled selected>
                  Select Regions
                </option>
                {fashionData?.regions_new.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        {/* Cultures */}
        <div className=" flex flex-col gap-3">
          <div className=" flex justify-between items-center py-1">
            <button
              type="button"
              onClick={() => setIsVisibleCultures(!isVisibleCultures)}
              className="flex gap-2 items-center"
            >
              <p className="font-semibold">Cultures</p>
              <IoIosArrowDown
                className={`transition-transform duration-300 ${
                  isVisibleCultures ? "rotate-180" : ""
                }`}
              />
            </button>
            <div className=" flex items-center gap-3">
              {selectedCultures && selectedCultures.length > 0 && (
                <p className="capitalize font-bold bg-gradient  px-3 py-1 rounded-full text-primary">
                  {selectedCultures}
                </p>
              )}
              <button
                type="button"
                hidden={!selectedCultures}
                onClick={() => handleResetCulturesType(selectedCultures)}
                className="  text-base text-red-500"
              >
                <GoTrash />
              </button>
            </div>
          </div>
          {isVisibleCultures && (
            <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 place-items-center w-full">
              {fashionData ? (
                fashionData.cultures.map((item) => (
                  <button
                    type="button"
                    className={`border px-5 py-3 rounded-2xl flex flex-col gap-1 
                    ${
                      selectedCultures === item.name
                        ? "bg-third"
                        : "bg-secondary"
                    } 
                    hover:bg-third`}
                    key={item.id}
                    onClick={() => handleButtonClickCulturesType(item.name)}
                  >
                    <div className=" flex justify-between">
                      {" "}
                      <p className=" text-xs font-semibold capitalize text-primary">
                        {item.name}
                      </p>
                    </div>
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={100}
                      height={100}
                      className=" hover:scale-110 transition-transform duration-300"
                    />
                  </button>
                ))
              ) : (
                <p>No cultures data available</p>
              )}
            </div>
          )}
        </div>
        {/* Seasons */}
        <div className=" flex flex-col gap-3">
          <div className=" flex justify-between items-center py-1">
            <button
              type="button"
              onClick={() => setIsVisibleSeasons(!isVisibleSeasons)}
              className="flex gap-2 items-center"
              disabled
            >
              <p className="font-semibold">Seasons</p>
              <IoIosArrowDown
                className={`transition-transform duration-300 ${
                  isVisibleSeasons ? "rotate-180" : ""
                }`}
              />
            </button>
            <div className=" flex items-center gap-3">
              {selectedSeasons && selectedSeasons.length > 0 && (
                <p className="capitalize font-bold bg-gradient  px-3 py-1 rounded-full text-primary">
                  {selectedSeasons}
                </p>
              )}
              <button
                type="button"
                hidden={!selectedSeasons}
                onClick={() => handleResetSeasonsType(selectedSeasons)}
                className="  text-base text-red-500"
              >
                <GoTrash />
              </button>
            </div>
          </div>
          {isVisibleSeasons && (
            <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 place-items-center w-full">
              {fashionData ? (
                fashionData.seasons.map((item) => (
                  <button
                    type="button"
                    className={`border px-5 py-3 rounded-2xl flex flex-col gap-1 
                    ${
                      selectedSeasons === item.name
                        ? "bg-third"
                        : "bg-secondary"
                    } 
                    hover:bg-third`}
                    key={item.id}
                    onClick={() => handleButtonClickSeasonsType(item.name)}
                  >
                    <div className=" flex justify-between">
                      {" "}
                      <p className=" text-xs font-semibold capitalize text-primary">
                        {item.name}
                      </p>
                    </div>
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={100}
                      height={100}
                      className=" hover:scale-110 transition-transform duration-300"
                    />
                  </button>
                ))
              ) : (
                <p>No seasons data available</p>
              )}
            </div>
          )}
        </div>
        {/* Platforms */}
        <div className=" flex flex-col gap-3">
          <div className=" flex justify-between items-center py-1">
            <button
              type="button"
              onClick={() => setIsVisiblePlatforms(!isVisiblePlaforms)}
              className="flex gap-2 items-center"
              disabled
            >
              <p className="font-semibold">Platforms</p>
              <IoIosArrowDown
                className={`transition-transform duration-300 ${
                  isVisiblePlaforms ? "rotate-180" : ""
                }`}
              />
            </button>
            <div className=" flex items-center gap-3">
              {selectedPlaforms && selectedPlaforms.length > 0 && (
                <p className="capitalize font-bold bg-gradient  px-3 py-1 rounded-full text-primary">
                  {selectedPlaforms}
                </p>
              )}
              <button
                type="button"
                hidden={!selectedPlaforms}
                onClick={() => handleResetPlatformsType(selectedPlaforms)}
                className="  text-base text-red-500"
              >
                <GoTrash />
              </button>
            </div>
          </div>
          {isVisiblePlaforms && (
            <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 place-items-center w-full">
              {fashionData ? (
                fashionData.platforms.map((item) => (
                  <button
                    type="button"
                    className={`border px-5 py-3 rounded-2xl flex flex-col gap-1 
                    ${
                      selectedPlaforms === item.name
                        ? "bg-third"
                        : "bg-secondary"
                    } 
                    hover:bg-third`}
                    key={item.id}
                    onClick={() => handleButtonClickPlatformsType(item.name)}
                  >
                    <div className=" flex justify-between">
                      {" "}
                      <p className=" text-xs font-semibold capitalize text-primary">
                        {item.name}
                      </p>
                    </div>
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={100}
                      height={100}
                      className=" hover:scale-110 transition-transform duration-300"
                    />
                  </button>
                ))
              ) : (
                <p>No platforms data available</p>
              )}
            </div>
          )}
        </div>
        {/* Brand Price */}
        <div className=" flex flex-col gap-3">
          <div className=" flex justify-between items-center py-1">
            <button
              type="button"
              onClick={() => setIsVisibleBrandPrice(!isVisibleBrandPrice)}
              className="flex gap-2 items-center"
              disabled
            >
              <p className="font-semibold">Brand Price</p>
              <IoIosArrowDown
                className={`transition-transform duration-300 ${
                  isVisiblePlaforms ? "rotate-180" : ""
                }`}
              />
            </button>
            <div className=" flex items-center gap-3">
              {selectedBrandPrice && selectedBrandPrice.length > 0 && (
                <p className="capitalize font-bold bg-gradient  px-3 py-1 rounded-full text-primary">
                  {selectedBrandPrice}
                </p>
              )}
              <button
                type="button"
                hidden={!selectedBrandPrice}
                onClick={() => handleResetBrandPriceType(selectedBrandPrice)}
                className="  text-base text-red-500"
              >
                <GoTrash />
              </button>
            </div>
          </div>
          {isVisibleBrandPrice && (
            <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 place-items-center w-full">
              {fashionData ? (
                fashionData.brand_prices.map((item) => (
                  <button
                    className={`border px-5 py-3 rounded-2xl flex flex-col gap-1 
                    ${
                      selectedBrandPrice === item.name
                        ? "bg-third"
                        : "bg-secondary"
                    } 
                    hover:bg-third`}
                    key={item.id}
                    onClick={() => handleButtonClickBrandPriceType(item.name)}
                  >
                    <div className=" flex justify-between">
                      {" "}
                      <p className=" text-xs font-semibold capitalize text-primary">
                        {item.name}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <p>No platforms data available</p>
              )}
            </div>
          )}
        </div>
        {selectedBrandPrice && (
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient px-5 py-3 rounded-2xl w-full font-bold hover:bg-secondary"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        )}
        {selectedFashionType && (
          <button
            type="button"
            onClick={() => handleResetAll(selectedFashionType)}
            disabled={loading}
            className=" bg-secondary text-primary px-5 py-3 rounded-2xl w-full font-bold hover:bg-third"
          >
            Reset
          </button>
        )}
      </form>
      {/* result */}
      {generateIdea && (
        <div className="flex flex-col gap-10 text-primary">
          <p className="text-2xl font-bold text-center text-secondary">
            Your Result Fashion Idea
          </p>
          {/* result */}
          <div
            className="prose prose-sm md:prose-base max-w-none bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-200"
            dangerouslySetInnerHTML={{ __html: sanitizedIdea }}
          />
          {/* modal  */}
          <div className=" flex flex-col gap-5">
            <p className="text-2xl font-bold text-center text-secondary">
              Save Idea
            </p>
            <form
              onSubmit={handleSave}
              className="flex flex-col lg:flex-row justify-between gap-3 "
            >
              <input
                type="text"
                placeholder="Please Enter Idea Name"
                name="idea_name"
                onChange={(e) => setIdeaName(e.target.value)}
                className=" rounded-2xl py-3 px-5 w-full text-primary bg-secondary capitalize"
              />
              <div className=" flex justify-center items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className=" flex gap-2 items-center justify-center bg-red-500 border-2 border-red-500 hover:bg-red-500 font-bold hover:text-primary text-sm text-secondary w-[200px] text-center py-2 rounded-2xl"
                >
                  <p> Discard Idea</p> <FaTrash />
                </button>
                <button
                  type="submit"
                  className=" flex gap-2 items-center justify-center bg-secondary border-2 border-secondary hover:bg-third font-bold hover:text-primary text-sm text-primary w-[200px] text-center py-2 rounded-2xl"
                >
                  <p>Save Idea</p> <MdDataSaverOn />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
