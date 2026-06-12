"use client";
import React from "react";
import { BookOpen, Map, Bookmark, CheckCircle, Circle, HelpCircle } from "lucide-react";

interface SideBarProps {
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({
  selectedDifficulty,
  setSelectedDifficulty,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <div className="flex flex-col h-full bg-stone-900/40 text-stone-300 p-4 pt-8 select-none">
      {/* Primary Section */}
      <div className="space-y-1.5 mb-8">
        <div className="flex items-center gap-3 text-sm font-medium text-stone-200 px-4 py-2.5 rounded-xl border border-stone-800/80 bg-stone-900/60 shadow-inner hover:text-orange-400 cursor-pointer transition-colors duration-200">
          <BookOpen size={16} className="text-orange-400" />
          <span>Library</span>
        </div>

        <div className="flex items-center gap-3 text-sm font-medium text-stone-400 hover:text-stone-200 px-4 py-2.5 rounded-xl border border-transparent hover:bg-stone-800/40 cursor-pointer transition-all duration-200">
          <Map size={16} />
          <span>Study Plan</span>
        </div>

        <div className="flex items-center gap-3 text-sm font-medium text-stone-400 hover:text-stone-200 px-4 py-2.5 rounded-xl border border-transparent hover:bg-stone-800/40 cursor-pointer transition-all duration-200">
          <Bookmark size={16} />
          <span>My List</span>
        </div>
      </div>

      <hr className="border-stone-800 mb-6" />

      {/* Difficulty Filters */}
      <div className="mb-6">
        <h4 className="text-[10px] font-semibold text-stone-500 uppercase tracking-[0.2em] px-4 mb-3">
          Difficulty
        </h4>
        <div className="space-y-1">
          {[
            { id: "all", label: "All Difficulties", color: "bg-stone-400" },
            { id: "Easy", label: "Easy", color: "bg-green-400" },
            { id: "Medium", label: "Medium", color: "bg-yellow-400" },
            { id: "Hard", label: "Hard", color: "bg-red-400" },
          ].map((item) => {
            const isActive = selectedDifficulty === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedDifficulty(item.id)}
                className={`w-full flex items-center gap-3 text-xs font-medium px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-orange-500/10 border border-orange-500/20 text-orange-400 shadow-sm"
                    : "border border-transparent hover:bg-stone-800/30 text-stone-400 hover:text-stone-200"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${item.color}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Status Filters */}
      <div>
        <h4 className="text-[10px] font-semibold text-stone-500 uppercase tracking-[0.2em] px-4 mb-3">
          Status
        </h4>
        <div className="space-y-1">
          {[
            { id: "all", label: "All Problems", icon: HelpCircle },
            { id: "solved", label: "Solved", icon: CheckCircle },
            { id: "unsolved", label: "Todo", icon: Circle },
          ].map((item) => {
            const isActive = selectedStatus === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedStatus(item.id)}
                className={`w-full flex items-center gap-3 text-xs font-medium px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-orange-500/10 border border-orange-500/20 text-orange-400 shadow-sm"
                    : "border border-transparent hover:bg-stone-800/30 text-stone-400 hover:text-stone-200"
                }`}
              >
                <Icon size={14} className={isActive ? "text-orange-400" : "text-stone-500"} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
