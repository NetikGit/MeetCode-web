"use client";
import React, { useState, useMemo } from "react";
import CompanyButton from "./CompanyButton";
import { Search, TrendingUp, X } from "lucide-react";

interface CompaniesBoxProps {
  selectedCompany: string;
  setSelectedCompany: (company: string) => void;
}

const COMPANIES_DATA = [
  { name: "Amazon", vacancy: 1928, id: 1 },
  { name: "Replit", vacancy: 1028, id: 2 },
  { name: "Google", vacancy: 1208, id: 3 },
  { name: "Flipkart", vacancy: 1632, id: 4 },
  { name: "BharatPay", vacancy: 193, id: 5 },
  { name: "Shopify", vacancy: 1288, id: 6 },
  { name: "Telegram", vacancy: 321, id: 7 },
  { name: "LeetCode", vacancy: 145, id: 8 },
  { name: "Spotify", vacancy: 108, id: 13 },
  { name: "Steam", vacancy: 1648, id: 14 },
];

const CompaniesBox: React.FC<CompaniesBoxProps> = ({
  selectedCompany,
  setSelectedCompany,
}) => {
  const [search, setSearch] = useState("");

  const filteredCompanies = useMemo(() => {
    return COMPANIES_DATA.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="flex flex-col w-[300px] bg-stone-900/40 border border-stone-850 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Title */}
      <div className="flex items-center gap-2 text-stone-200">
        <TrendingUp size={16} className="text-orange-400" />
        <span className="text-xs font-bold uppercase tracking-wider">Trending Companies</span>
      </div>

      {/* Search Input */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-600">
          <Search size={14} />
        </span>
        <input
          className="w-full bg-stone-950 border border-stone-800 rounded-xl py-1.5 pl-8 pr-7 text-xs text-stone-300 placeholder-stone-650 focus:outline-none focus:border-orange-500/40 transition-colors"
          placeholder="Search companies..."
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-500 hover:text-stone-300"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Grid of buttons */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <CompanyButton
          companies={filteredCompanies}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
        />
      </div>
    </div>
  );
};

export default CompaniesBox;
