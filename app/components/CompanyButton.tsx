"use client";
import React from "react";

interface Company {
  name: string;
  vacancy: number;
  id: number;
}

interface CompanyButtonProps {
  companies: Company[];
  selectedCompany: string;
  setSelectedCompany: (company: string) => void;
}

const CompanyButton: React.FC<CompanyButtonProps> = ({
  companies,
  selectedCompany,
  setSelectedCompany,
}) => {
  return (
    <>
      {companies.map((item) => {
        const isActive = selectedCompany === item.name;
        return (
          <button
            key={item.id}
            onClick={() => setSelectedCompany(isActive ? "all" : item.name)}
            className={`flex items-center justify-between w-full p-2 rounded-xl border transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                : "bg-stone-900/40 border-stone-850 text-stone-300 hover:border-orange-500/25"
            }`}
          >
            <span className="text-xs font-medium truncate">{item.name}</span>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
              isActive ? "bg-orange-500 text-stone-950" : "bg-stone-800 text-stone-400 group-hover:bg-stone-705"
            }`}>
              {item.vacancy}
            </span>
          </button>
        );
      })}
    </>
  );
};

export default CompanyButton;
