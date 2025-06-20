"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { IoAnalyticsSharp, IoHome } from "react-icons/io5";
import { RiAiGenerateText } from "react-icons/ri";
import { SiLitecoin } from "react-icons/si";
import { motion } from "framer-motion";
import { Profile, ProfileResponse } from "@/api/auth";
import { LuHistory } from "react-icons/lu";
import Cookies from "js-cookie";

export default function Navbar() {
  const pathname = usePathname() ?? "";
  const [isOpen, setIsOpen] = useState(false);
  const [isProfile, setIsProfile] = useState<ProfileResponse | null>(null);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const data = await Profile();
        sessionStorage.setItem("username", data.data.username || "");
        setIsProfile(data);
      } catch (err) {
        setError(err as string);
        console.error("Error Fetching Profile:", err);
      }
    };

    getProfileData();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const LogoutHandle = () => {
    Cookies.remove("access_token", { path: "/" });
    Cookies.remove("refresh_token", { path: "/" });
    sessionStorage.removeItem("username");
    window.location.href = "/auth/login";
  };

  return (
    <div className=" bg-primary border-b-2 border-r-2 border-primary_dark justify-between  text-2xl items-center font-bold ">
      {/* isClosed state (default state) */}
      {!isOpen && (
        <motion.div
          className="flex flex-col w-full justify-between h-screen px-3 py-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 0 : 1 }} // Smooth transition for opacity
          transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col gap-10 items-center">
            <button onClick={toggleMenu}>
              <FaBars />
            </button>
            <div className="bg-secondary h-[1px] w-full"></div>
            <div className=" flex flex-col items-center">
              <p className=" text-base">Token</p>
              <div className=" flex text-lg items-center gap-2">
                <SiLitecoin className=" text-yellow-500" />
                <p>{isProfile?.data.limit_token}</p>
              </div>
            </div>

            <div className="bg-background_secondary rounded-2xl flex flex-col">
              <Link
                href={"/"}
                className={`hover: w-full p-5 rounded-2xl flex gap-2 items-center  ${
                  pathname === `/` ? "bg-[#384a71] " : ""
                }`}
              >
                <IoHome />
              </Link>

              <Link
                href={"/generate"}
                className={`hover: w-full p-5 rounded-2xl flex gap-2 items-center  ${
                  pathname === `/generate` ? "bg-[#384a71] " : ""
                }`}
              >
                <RiAiGenerateText />
              </Link>
              <Link
                href={"/history"}
                className={`hover: w-full p-5 rounded-2xl flex gap-2 items-center  ${
                  pathname === `/history` ? "bg-[#384a71] " : ""
                }`}
              >
                <LuHistory />
              </Link>
              <Link
                href={"/analytic"}
                className={`hover: w-full p-5 rounded-2xl flex gap-2 items-center  ${
                  pathname === `/analytic` ? "bg-[#384a71] " : ""
                }`}
              >
                <IoAnalyticsSharp />
              </Link>
            </div>
          </div>
          <div className="bg-background_secondary rounded-2xl flex flex-col gap-3 items-center">
            {isProfile && (
              <Image
                src="/profile.jpg"
                alt="logo"
                width={500}
                height={500}
                className=" w-[50px] h-[50px] rounded-full mt-3"
              />
            )}
            {!isProfile && (
              <Link
                href={"/auth/login"}
                className="hover:bg-[#384a71] w-full p-5 rounded-2xl"
              >
                <IoMdLogIn />
              </Link>
            )}
            {isProfile && (
              <button
                onClick={() => {
                  LogoutHandle();
                }}
                className="hover:bg-[#384a71] w-full p-5 rounded-2xl flex gap-2 items-center"
              >
                <IoMdLogOut className="text-red-500" />{" "}
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* isOpen state */}
      {isOpen && (
        <motion.div
          className="flex flex-col w-full justify-between h-screen px-3 py-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }} // Smooth transition for opacity
          transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col gap-10 items-center">
            <button onClick={toggleMenu}>
              <FaBarsStaggered />
            </button>
            <div className="bg-secondary h-[1px] w-full"></div>
            <div className=" flex flex-col items-center">
              <p className=" text-base">Token</p>
              <div className=" flex text-lg items-center gap-2">
                <SiLitecoin className=" text-yellow-500" />
                <p>{isProfile?.data.limit_token}</p>
              </div>
            </div>

            <div className="bg-background_secondary rounded-2xl flex flex-col">
              <Link
                href={"/"}
                className={`hover: w-full p-5 rounded-2xl flex gap-2 items-center  ${
                  pathname === `/` ? "bg-[#384a71] " : ""
                }`}
              >
                <IoHome /> <span className="text-base">Home</span>
              </Link>
              <Link
                href={"/generate"}
                className={`hover: w-full p-5 rounded-2xl flex gap-2 items-center  ${
                  pathname === `/generate` ? "bg-[#384a71] " : ""
                }`}
              >
                <RiAiGenerateText /> <span className="text-base">Generate</span>
              </Link>
              <Link
                href={"/history"}
                className={`hover: w-full p-5 rounded-2xl flex gap-2 items-center  ${
                  pathname === `/history` ? "bg-[#384a71] " : ""
                }`}
              >
                <LuHistory /> <span className="text-base">History</span>
              </Link>
              <Link
                href={"/analytic"}
                className={`hover: w-full p-5 rounded-2xl flex gap-2 items-center  ${
                  pathname === `/analytic` ? "bg-[#384a71] " : ""
                }`}
              >
                <IoAnalyticsSharp /> <span className="text-base">Analytic</span>
              </Link>
            </div>
          </div>
          <div className="bg-background_secondary rounded-2xl flex flex-col  items-center">
            <div className=" flex flex-col gap-2 items-center w-full">
              {isProfile && (
                <Image
                  src="/profile.jpg"
                  alt="logo"
                  width={500}
                  height={500}
                  className=" w-[50px] h-[50px] rounded-full mt-3"
                />
              )}
              <p className=" text-sm">{isProfile?.data.username}</p>
            </div>
            {!isProfile && (
              <Link
                href={"/auth/login"}
                className="hover:bg-[#384a71] w-full p-5 rounded-2xl flex gap-2 items-center"
              >
                <IoMdLogIn /> <span className="text-base">Login</span>
              </Link>
            )}
            {isProfile && (
              <button
                onClick={() => {
                  LogoutHandle();
                }}
                className="hover:bg-[#384a71] w-full p-5 rounded-2xl flex gap-2 items-center"
              >
                <IoMdLogOut className="text-red-500" />{" "}
                <span className="text-base ">Logout</span>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
