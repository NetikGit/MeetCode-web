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
    <div className="min-h-screen bg-black text-white relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 min-h-screen w-64 bg-stone-800 shadow-xl z-40 transition-transform duration-300 ease-in-out ${
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

      {/* Main Content Layout Wrapper */}
      <div className={`transition-all duration-300 ${showSideBar ? "ml-64" : "ml-0"} px-8 pt-16 pb-12 flex flex-col xl:flex-row gap-8`}>
        {/* Left Side: Problems Table */}
        <div className="flex-1 min-w-0">
          <Problems />
        </div>

        {/* Right Side: Widgets */}
        <div className="w-full xl:w-[280px] flex flex-col gap-6 shrink-0">
          <div>
            <Calendar />
          </div>
          <div className="flex justify-center xl:justify-start">
            <CompaniesBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

