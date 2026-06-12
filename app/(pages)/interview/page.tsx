"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ── types & data ──────────────────────────────────────────────── */
interface Company {
  name: string;
  logo: string;
  openings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string[];
  questionsCount: number;
  acceptanceRate: string;
}

interface MockSession {
  id: number;
  title: string;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string[];
  questions: number;
  completedBy: number;
  rating: number;
}

interface PrepTrack {
  id: number;
  title: string;
  description: string;
  icon: string;
  totalProblems: number;
  completed: number;
  color: string;
}

const COMPANIES: Company[] = [
  { name: "Google", logo: "🔵", openings: 342, difficulty: "Hard", topics: ["Graphs", "DP", "System Design"], questionsCount: 892, acceptanceRate: "34%" },
  { name: "Meta", logo: "🔷", openings: 287, difficulty: "Hard", topics: ["Trees", "Arrays", "Strings"], questionsCount: 756, acceptanceRate: "38%" },
  { name: "Amazon", logo: "🟠", openings: 521, difficulty: "Medium", topics: ["BFS/DFS", "Greedy", "OOP Design"], questionsCount: 1021, acceptanceRate: "42%" },
  { name: "Apple", logo: "⚪", openings: 198, difficulty: "Medium", topics: ["Arrays", "Linked Lists", "Sorting"], questionsCount: 543, acceptanceRate: "45%" },
  { name: "Microsoft", logo: "🟦", openings: 412, difficulty: "Medium", topics: ["DP", "Binary Search", "Graphs"], questionsCount: 834, acceptanceRate: "40%" },
  { name: "Netflix", logo: "🔴", openings: 87, difficulty: "Hard", topics: ["System Design", "Distributed Systems", "Caching"], questionsCount: 234, acceptanceRate: "31%" },
  { name: "Uber", logo: "⬛", openings: 156, difficulty: "Medium", topics: ["Graphs", "Geometry", "Hashing"], questionsCount: 412, acceptanceRate: "39%" },
  { name: "Stripe", logo: "🟣", openings: 94, difficulty: "Hard", topics: ["System Design", "APIs", "Concurrency"], questionsCount: 187, acceptanceRate: "33%" },
];

const MOCK_SESSIONS: MockSession[] = [
  { id: 1, title: "Google Phone Screen Simulator", duration: "45 min", difficulty: "Hard", topics: ["Graphs", "DP"], questions: 2, completedBy: 12450, rating: 4.8 },
  { id: 2, title: "Meta Onsite — Coding Round", duration: "60 min", difficulty: "Hard", topics: ["Trees", "Strings", "Arrays"], questions: 3, completedBy: 9870, rating: 4.7 },
  { id: 3, title: "Amazon OA Practice", duration: "90 min", difficulty: "Medium", topics: ["BFS/DFS", "Greedy"], questions: 4, completedBy: 18230, rating: 4.6 },
  { id: 4, title: "System Design — URL Shortener", duration: "45 min", difficulty: "Medium", topics: ["System Design", "Databases"], questions: 1, completedBy: 7650, rating: 4.9 },
  { id: 5, title: "Behavioral Round Prep", duration: "30 min", difficulty: "Easy", topics: ["STAR Method", "Leadership"], questions: 8, completedBy: 21340, rating: 4.5 },
  { id: 6, title: "Microsoft Virtual Onsite", duration: "120 min", difficulty: "Medium", topics: ["DP", "Binary Search", "Design"], questions: 4, completedBy: 6540, rating: 4.7 },
];

const PREP_TRACKS: PrepTrack[] = [
  { id: 1, title: "Data Structures", description: "Arrays, Linked Lists, Trees, Graphs, Heaps", icon: "🏗️", totalProblems: 120, completed: 45, color: "from-blue-500/20 to-cyan-500/10" },
  { id: 2, title: "Algorithms", description: "Sorting, Searching, DP, Greedy, Backtracking", icon: "⚙️", totalProblems: 150, completed: 72, color: "from-purple-500/20 to-pink-500/10" },
  { id: 3, title: "System Design", description: "Scalability, Databases, Caching, Load Balancing", icon: "🏛️", totalProblems: 40, completed: 12, color: "from-orange-500/20 to-amber-500/10" },
  { id: 4, title: "Behavioral", description: "STAR Method, Leadership, Conflict Resolution", icon: "🎯", totalProblems: 30, completed: 8, color: "from-green-500/20 to-emerald-500/10" },
  { id: 5, title: "SQL & Databases", description: "Joins, Subqueries, Indexing, Normalization", icon: "🗄️", totalProblems: 60, completed: 22, color: "from-yellow-500/20 to-orange-500/10" },
  { id: 6, title: "Concurrency", description: "Threads, Locks, Async Patterns, Race Conditions", icon: "🔄", totalProblems: 35, completed: 5, color: "from-red-500/20 to-rose-500/10" },
];

const TIPS = [
  { icon: "💡", title: "Think aloud", desc: "Narrate your thought process. Interviewers want to see HOW you think, not just the answer." },
  { icon: "🎯", title: "Clarify first", desc: "Always ask clarifying questions before coding. It shows maturity and prevents mistakes." },
  { icon: "⏱️", title: "Time yourself", desc: "Practice with strict time limits. Most coding rounds are 30-45 minutes." },
  { icon: "🧪", title: "Test your code", desc: "Walk through edge cases. Null inputs, empty arrays, single elements, large inputs." },
  { icon: "📐", title: "Complexity analysis", desc: "Always state your time & space complexity. Optimize if asked." },
  { icon: "🔄", title: "Iterate", desc: "Start brute force, then optimize. Showing progression impresses interviewers." },
];

/* ── difficulty color helper ───────────────────────────────────── */
const diffColor = (d: string) =>
  d === "Easy" ? "text-green-400" : d === "Medium" ? "text-yellow-400" : "text-red-400";

const diffBg = (d: string) =>
  d === "Easy"
    ? "bg-green-500/15 border-green-500/30 text-green-400"
    : d === "Medium"
    ? "bg-yellow-500/15 border-yellow-500/30 text-yellow-400"
    : "bg-red-500/15 border-red-500/30 text-red-400";

/* ── page ──────────────────────────────────────────────────────── */
export default function InterviewPage() {
  const [activeTab, setActiveTab] = useState<"companies" | "mock" | "tracks">("companies");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  const filteredCompanies = COMPANIES.filter(
    (c) =>
      (!searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedDifficulty === "all" || c.difficulty === selectedDifficulty)
  );

  const filteredSessions = MOCK_SESSIONS.filter(
    (s) =>
      (!searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedDifficulty === "all" || s.difficulty === selectedDifficulty)
  );

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* ── HERO ─────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* animated gradient orbs */}
        <div className="absolute -top-32 -right-32 w-[450px] h-[450px] rounded-full bg-orange-500/8 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-20 -left-32 w-[350px] h-[350px] rounded-full bg-amber-400/6 blur-[100px] animate-pulse" />

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs tracking-widest mb-5"
          >
            🎯 INTERVIEW PREPARATION HUB
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-orange-100 mb-3"
          >
            Ace Your Next Interview
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-stone-400 text-sm tracking-wide max-w-lg mx-auto mb-8"
          >
            Company-specific prep, mock interviews, and structured study tracks
            — everything you need to land your dream job
          </motion.p>

          {/* search bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl mx-auto relative"
          >
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500">🔍</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies, topics, or mock sessions..."
              className="w-full bg-stone-900/70 backdrop-blur border border-stone-700/50 rounded-xl py-3 pl-11 pr-4 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 mb-10">
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { icon: "🏢", value: "200+", label: "Companies" },
            { icon: "📝", value: "5,800+", label: "Questions" },
            { icon: "🎭", value: "50+", label: "Mock Interviews" },
            { icon: "🎓", value: "850K+", label: "Users Prepped" },
          ].map((s) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -3, scale: 1.03 }}
              className="flex flex-col items-center justify-center rounded-2xl bg-stone-800/50 backdrop-blur-md border border-stone-700/40 px-6 py-4 min-w-[130px]"
            >
              <span className="text-xl mb-1">{s.icon}</span>
              <span className="text-xl font-bold text-orange-200">{s.value}</span>
              <span className="text-[10px] text-stone-400 tracking-wider mt-0.5">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MAIN TABS ────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        {/* tab bar */}
        <div className="flex gap-1 bg-stone-900 rounded-xl p-1 w-fit mx-auto mb-8">
          {([
            { key: "companies", label: "🏢 Companies", },
            { key: "mock", label: "🎭 Mock Interviews" },
            { key: "tracks", label: "📚 Study Tracks" },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`relative px-5 py-2.5 rounded-lg text-sm font-medium tracking-wider transition-colors ${
                activeTab === t.key ? "text-orange-200" : "text-stone-400 hover:text-stone-200"
              }`}
            >
              {activeTab === t.key && (
                <motion.div
                  layoutId="interviewTab"
                  className="absolute inset-0 bg-stone-800 rounded-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{t.label}</span>
            </button>
          ))}
        </div>

        {/* difficulty filter */}
        {activeTab !== "tracks" && (
          <div className="flex gap-2 justify-center mb-8">
            {["all", "Easy", "Medium", "Hard"].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all border ${
                  selectedDifficulty === d
                    ? d === "all"
                      ? "bg-orange-500/20 text-orange-300 border-orange-500/40"
                      : diffBg(d)
                    : "bg-stone-800/50 text-stone-500 border-stone-700/40 hover:text-stone-300"
                }`}
              >
                {d === "all" ? "All Levels" : d}
              </button>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* ── COMPANIES TAB ───────────────── */}
          {activeTab === "companies" && (
            <motion.div
              key="companies"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {filteredCompanies.map((company, i) => (
                <motion.div
                  key={company.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="group bg-stone-900/60 backdrop-blur border border-stone-800/50 rounded-2xl p-5 hover:border-orange-500/25 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    {/* logo */}
                    <div className="w-12 h-12 rounded-xl bg-stone-800 flex items-center justify-center text-2xl shrink-0">
                      {company.logo}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold text-orange-100 group-hover:text-orange-200 transition-colors">
                          {company.name}
                        </h3>
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${diffBg(company.difficulty)}`}>
                          {company.difficulty}
                        </span>
                      </div>

                      <p className="text-xs text-stone-500 mb-3">
                        {company.openings} open positions · {company.questionsCount} questions · {company.acceptanceRate} avg acceptance
                      </p>

                      {/* topic chips */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {company.topics.map((topic) => (
                          <span
                            key={topic}
                            className="px-2.5 py-0.5 rounded-full text-[10px] tracking-wider bg-stone-800/80 text-stone-400 border border-stone-700/40"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      {/* progress bar */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 rounded-full bg-stone-800 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.random() * 60 + 10}%` }}
                            transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500"
                          />
                        </div>
                        <span className="text-[10px] text-stone-500 tracking-wider">
                          {Math.floor(Math.random() * 40 + 5)}/{company.questionsCount} solved
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredCompanies.length === 0 && (
                <div className="col-span-2 text-center py-16 text-stone-600">
                  <p className="text-4xl mb-3">🔍</p>
                  <p className="text-sm tracking-wider">No companies match your search.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* ── MOCK INTERVIEWS TAB ─────────── */}
          {activeTab === "mock" && (
            <motion.div
              key="mock"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredSessions.map((session, i) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="group bg-stone-900/60 backdrop-blur border border-stone-800/50 rounded-2xl p-5 hover:border-orange-500/25 transition-all flex flex-col"
                >
                  {/* header */}
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${diffBg(session.difficulty)}`}>
                      {session.difficulty}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-amber-400">
                      ⭐ {session.rating}
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-orange-100 mb-2 group-hover:text-orange-200 transition-colors">
                    {session.title}
                  </h3>

                  {/* meta */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500 mb-4">
                    <span>⏱️ {session.duration}</span>
                    <span>📝 {session.questions} questions</span>
                    <span>👥 {session.completedBy.toLocaleString()} completed</span>
                  </div>

                  {/* topics */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {session.topics.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full text-[10px] tracking-wider bg-stone-800/80 text-stone-400 border border-stone-700/40"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-2.5 rounded-xl text-xs font-semibold tracking-wider bg-orange-500/15 text-orange-300 border border-orange-500/30 hover:bg-orange-500/25 transition-colors"
                    >
                      Start Mock Interview →
                    </motion.button>
                  </div>
                </motion.div>
              ))}

              {filteredSessions.length === 0 && (
                <div className="col-span-3 text-center py-16 text-stone-600">
                  <p className="text-4xl mb-3">🔍</p>
                  <p className="text-sm tracking-wider">No sessions match your filters.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* ── STUDY TRACKS TAB ────────────── */}
          {activeTab === "tracks" && (
            <motion.div
              key="tracks"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {PREP_TRACKS.map((track, i) => {
                const pct = Math.round((track.completed / track.totalProblems) * 100);
                return (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className={`group bg-gradient-to-br ${track.color} backdrop-blur border border-stone-800/50 rounded-2xl p-5 hover:border-orange-500/25 transition-all cursor-pointer`}
                  >
                    <div className="text-3xl mb-3">{track.icon}</div>
                    <h3 className="text-lg font-semibold text-orange-100 mb-1 group-hover:text-orange-200 transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-xs text-stone-400 mb-4 leading-relaxed">{track.description}</p>

                    {/* progress */}
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                      <span>{track.completed}/{track.totalProblems} completed</span>
                      <span className="text-orange-300 font-semibold">{pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-stone-800/80 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                      />
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      className="mt-4 w-full py-2 rounded-lg text-xs font-semibold tracking-wider text-stone-300 border border-stone-700/50 hover:border-orange-500/40 hover:text-orange-300 transition-colors"
                    >
                      {pct > 0 ? "Continue →" : "Start Track →"}
                    </motion.button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── INTERVIEW TIPS ───────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-stone-300 tracking-widest mb-8 text-center">
          INTERVIEW TIPS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TIPS.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="bg-stone-900/50 backdrop-blur border border-stone-800/50 rounded-2xl p-5 hover:border-orange-500/20 transition-colors"
            >
              <span className="text-2xl">{tip.icon}</span>
              <h3 className="text-sm font-semibold text-orange-200 mt-2 mb-1 tracking-wide">
                {tip.title}
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">{tip.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-r from-orange-500/15 to-amber-500/10 border border-orange-500/25 rounded-2xl p-8 md:p-12 text-center"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-orange-500/10 blur-[60px]" />
          <h2 className="text-2xl md:text-3xl font-bold text-orange-100 mb-3 tracking-tight">
            Ready to start your interview journey?
          </h2>
          <p className="text-sm text-stone-400 mb-6 max-w-md mx-auto">
            Join 850,000+ developers who have prepared for their dream roles on MeetCode
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-xl text-sm font-semibold tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 shadow-lg shadow-orange-500/20"
          >
            Start Preparing — Free
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
