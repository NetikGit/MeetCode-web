"use client";
import React, { useState } from "react";
import Problems from "@/app/components/problems";
import SideBar from "@/app/components/SideBar";
import Calendar from "@/app/components/calendar";
import CompaniesBox from "@/app/components/Company";

const Page = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const toggleSideBar = () => {
    setShowSideBar((prev) => !prev);
  };

  return (
    <div className=" flex relative min-h-screen bg-black text-white">
      <div
        className={`fixed top-0 left-0 min-h-screen w-1/6 bg-stone-800 shadow-xl z-40 transition-transform duration-300 ease-in-out ${
          showSideBar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar />
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSideBar}
        className="absolute top-4 left-64 z-50 bg-stone-700 text-sm text-white p-1 rounded-md"
      >
        ☰
      </button>

      <div className="ml-64 md:ml-72 px-4 pt-16">
        <Problems />
      </div>
      <div className="flex flex-col">
      <div className="h-[72px] w-[260px] ml-6 ">
        <Calendar />
      </div>
      <div className="mt-84 ml-6">
        <CompaniesBox />
      </div>
      </div>
    </div>
  );
};

export default Page;
