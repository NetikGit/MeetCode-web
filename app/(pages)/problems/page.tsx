"use client";
import React, { useState } from "react";
import Problems from "@/app/components/problems";
import SideBar from "@/app/components/SideBar";
import Calendar from "@/app/components/calendar";
import CompaniesBox from "@/app/components/Company";
import { PanelLeftClose, PanelLeft } from "lucide-react";

const Page = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState("all");

  const toggleSideBar = () => {
    setShowSideBar((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white relative">
      {/* Sidebar */}
      <div
        className={`fixed top-[46px] left-0 bottom-0 w-64 bg-stone-900 border-r border-stone-850 shadow-2xl z-40 transition-transform duration-300 ease-in-out ${
          showSideBar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSideBar}
        className={`fixed top-16 z-50 bg-stone-800/80 hover:bg-stone-700 border border-stone-700 text-stone-300 p-2 rounded-lg backdrop-blur-md transition-all duration-300 shadow-md ${
          showSideBar ? "left-[272px]" : "left-4"
        }`}
        title={showSideBar ? "Collapse Sidebar" : "Expand Sidebar"}
      >
        {showSideBar ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
      </button>

      {/* Main Content Layout Wrapper */}
      <div
        className={`transition-all duration-300 ${
          showSideBar ? "lg:pl-64" : "pl-0"
        } px-4 md:px-8 pt-8 pb-16 flex flex-col xl:flex-row gap-8`}
      >
        {/* Left Side: Problems Section */}
        <div className="flex-1 min-w-0">
          <Problems
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            selectedStatus={selectedStatus}
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
          />
        </div>

        {/* Right Side: Widgets */}
        <div className="w-full xl:w-[300px] flex flex-col gap-6 shrink-0 mt-12 xl:mt-0">
          <Calendar />
          <CompaniesBox
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;

