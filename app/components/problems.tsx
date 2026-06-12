"use client";
import React, { useMemo } from "react";
import Data from "../Data";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel-1";
import { Search, CheckCircle, Circle, HelpCircle, X, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface ProblemsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
  selectedStatus: string;
  selectedCompany: string;
  setSelectedCompany: (company: string) => void;
}

const CAROUSEL_PLANS = [
  { id: 1, name: "MeetCode 75", solved: 34, total: 75, desc: "Handpicked essential interview questions", icon: "🔥", difficulty: "Mixed" },
  { id: 2, name: "Top SQL 50", solved: 12, total: 50, desc: "Complete query optimization problems", icon: "📊", difficulty: "Medium" },
  { id: 3, name: "Dynamic Programming", solved: 5, total: 25, desc: "From basic recursion to memoization", icon: "🧩", difficulty: "Hard" },
  { id: 4, name: "Google Top 30", solved: 18, total: 30, desc: "Highly repeating Google onsites", icon: "🔍", difficulty: "Hard" },
  { id: 5, name: "Linked List Warmup", solved: 15, total: 15, desc: "Pointers, recursion, and structures", icon: "🏗️", difficulty: "Easy" },
];

const Problems: React.FC<ProblemsProps> = ({
  searchQuery,
  setSearchQuery,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedStatus,
  selectedCompany,
  setSelectedCompany,
}) => {
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/question/${id}`);
  };

  // Helper to map companies to question IDs
  const getCompaniesForId = (id: number) => {
    const list = [];
    if (id % 2 === 0) list.push("Amazon");
    if (id % 3 === 0) list.push("Google");
    if (id % 4 === 1) list.push("Meta");
    if (id % 5 === 2) list.push("Replit");
    if (id % 6 === 3) list.push("Flipkart");
    if (list.length === 0) list.push("LeetCode");
    return list;
  };

  // Filter questions dynamically
  const filteredProblems = useMemo(() => {
    return Data.filter((item) => {
      // 1. Search Query
      const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toString() === searchQuery;
      
      // 2. Difficulty
      const matchesDifficulty = selectedDifficulty === "all" || item.difficulty === selectedDifficulty;
      
      // 3. Status (id % 3 === 0 is solved, others are todo)
      const isSolved = item.id % 3 === 0;
      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "solved" && isSolved) ||
        (selectedStatus === "unsolved" && !isSolved);

      // 4. Company
      const companies = getCompaniesForId(item.id);
      const matchesCompany = selectedCompany === "all" || companies.includes(selectedCompany);

      return matchesSearch && matchesDifficulty && matchesStatus && matchesCompany;
    });
  }, [searchQuery, selectedDifficulty, selectedStatus, selectedCompany]);

  return (
    <div className="space-y-10">
      {/* ── CURATED STUDY PLANS ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-orange-400 w-5 h-5 animate-pulse" />
          <h3 className="text-lg font-bold text-stone-200 tracking-wider">Curated Study Paths</h3>
        </div>
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {CAROUSEL_PLANS.map((plan) => {
              const pct = Math.round((plan.solved / plan.total) * 100);
              return (
                <CarouselItem key={plan.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3">
                  <div className="group relative bg-stone-900/40 border border-stone-850 p-5 rounded-2xl shadow-lg hover:border-orange-500/20 transition-all duration-300 overflow-hidden cursor-pointer select-none">
                    {/* Glowing highlight */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="flex items-center justify-between mb-3 relative z-10">
                      <span className="text-2xl">{plan.icon}</span>
                      <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full ${
                        plan.difficulty === "Easy" ? "bg-green-500/10 text-green-400" :
                        plan.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-400"
                      }`}>
                        {plan.difficulty}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-stone-200 group-hover:text-orange-300 transition-colors duration-200 relative z-10">
                      {plan.name}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed relative z-10">
                      {plan.desc}
                    </p>

                    <div className="mt-5 relative z-10">
                      <div className="flex justify-between text-[10px] text-stone-400 font-medium mb-1">
                        <span>Progress</span>
                        <span>{plan.solved}/{plan.total} Solved ({pct}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>

      {/* ── TABLE ACTIONS / SEARCH BAR ── */}
      <div className="bg-stone-900/30 border border-stone-850 p-6 rounded-2xl shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search box */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
              <Search size={16} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID or question title..."
              className="w-full bg-stone-950 border border-stone-800 rounded-xl py-2 pl-9 pr-4 text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-500 hover:text-stone-300"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 text-xs text-stone-400">
            <div>
              Total Found: <span className="text-orange-400 font-semibold">{filteredProblems.length}</span>
            </div>
            {selectedDifficulty !== "all" && (
              <div className="flex items-center gap-1 bg-stone-800/80 px-2 py-0.5 rounded-lg border border-stone-750">
                <span>Diff: {selectedDifficulty}</span>
                <X size={12} className="cursor-pointer text-stone-500 hover:text-stone-300" onClick={() => setSelectedDifficulty("all")} />
              </div>
            )}
            {selectedCompany !== "all" && (
              <div className="flex items-center gap-1 bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-lg border border-orange-500/20">
                <span>Company: {selectedCompany}</span>
                <X size={12} className="cursor-pointer text-orange-400/80 hover:text-orange-200" onClick={() => setSelectedCompany("all")} />
              </div>
            )}
          </div>
        </div>

        {/* ── DATA TABLE ── */}
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-stone-850 text-left">
                <th className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.25em] px-6 py-4">
                  Status
                </th>
                <th className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.25em] px-6 py-4">
                  Problems
                </th>
                <th className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.25em] px-6 py-4 text-center">
                  Acceptance
                </th>
                <th className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.25em] px-6 py-4">
                  Difficulty
                </th>
                <th className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.25em] px-6 py-4 text-right">
                  Companies
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.length > 0 ? (
                filteredProblems.map((item) => {
                  const isSolved = item.id % 3 === 0;
                  const companies = getCompaniesForId(item.id);
                  return (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="border-b border-stone-850 hover:bg-stone-900/30 transition-colors cursor-pointer select-none group"
                      onClick={() => handleClick(item.id)}
                    >
                      <td className="px-6 py-4.5">
                        {isSolved ? (
                          <CheckCircle size={16} className="text-green-500 fill-green-500/10" />
                        ) : (
                          <Circle size={16} className="text-stone-600" />
                        )}
                      </td>
                      <td className="px-6 py-4.5 font-medium text-stone-200 group-hover:text-orange-400 transition-colors">
                        <span className="text-stone-500 mr-2 font-mono text-xs">{item.id}.</span>
                        {item.question}
                      </td>
                      <td className="px-6 py-4.5 text-center font-mono text-xs text-stone-400">
                        {item.acceptance}
                      </td>
                      <td className="px-6 py-4.5">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                          item.difficulty === "Easy" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                          item.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
                          "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}>
                          {item.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 text-right">
                        <div className="flex gap-1 justify-end flex-wrap max-w-[200px] ml-auto">
                          {companies.slice(0, 2).map((comp) => (
                            <span
                              key={comp}
                              className="text-[9px] bg-stone-800 text-stone-400 px-1.5 py-0.5 rounded border border-stone-700/60"
                            >
                              {comp}
                            </span>
                          ))}
                          {companies.length > 2 && (
                            <span className="text-[9px] bg-stone-850 text-stone-500 px-1 py-0.5 rounded">
                              +{companies.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-stone-500 text-sm">
                    <HelpCircle className="w-8 h-8 mx-auto mb-2 text-stone-600" />
                    No problems found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problems;
