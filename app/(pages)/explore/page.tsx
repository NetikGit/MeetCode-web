"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel-1";
import Link from "next/link";
import Image from "next/image";

/* ── data ──────────────────────────────────────────────────────── */
interface Card {
  id: number;
  title: string;
  description: string;
  image: string;
  difficulty?: string;
  problems?: number;
  progress?: number;
  tag?: string;
}

const FEATURED_CARDS: Card[] = [
  { id: 1, title: "Top Interview 150", description: "Must-do problems selected by industry experts for coding interviews", image: "/poster1.png", problems: 150, difficulty: "Mixed", tag: "🔥 Popular" },
  { id: 2, title: "MeetCode 75", description: "Ace coding interviews with 75 carefully curated problems", image: "/poster2.png", problems: 75, difficulty: "Mixed", tag: "⭐ Essential" },
  { id: 3, title: "SQL 50", description: "Master SQL queries with 50 progressively challenging problems", image: "/poster3.png", problems: 50, difficulty: "Medium", tag: "📊 Database" },
  { id: 4, title: "Daily Challenge", description: "A new problem every day to keep your skills sharp and consistent", image: "/poster4.png", problems: 365, difficulty: "Mixed", tag: "📅 Daily" },
  { id: 5, title: "30 Days of JavaScript", description: "Build a solid JavaScript foundation in just one month", image: "/poster5.png", problems: 30, difficulty: "Easy", tag: "🟢 Beginner" },
];

const INTERVIEW_CARDS: Card[] = [
  { id: 1, title: "Google Interview Prep", description: "Most frequently asked questions at Google across all levels", image: "/poster4.png", problems: 234, difficulty: "Hard" },
  { id: 2, title: "Meta Interview Prep", description: "Curated problems based on Meta's recent interview patterns", image: "/poster3.png", problems: 198, difficulty: "Hard" },
  { id: 3, title: "Amazon Interview Prep", description: "OA and onsite questions frequently seen at Amazon", image: "/poster5.png", problems: 312, difficulty: "Medium" },
  { id: 4, title: "System Design Primer", description: "Learn to design scalable systems with real-world examples", image: "/poster1.png", problems: 40, difficulty: "Hard" },
  { id: 5, title: "Behavioral Interview Guide", description: "Master the STAR method and common behavioral questions", image: "/poster2.png", problems: 25, difficulty: "Easy" },
];

const LEARN_CARDS: Card[] = [
  { id: 1, title: "Introduction to Algorithms", description: "Start your journey with fundamental sorting, searching, and analysis", image: "/poster3.png", problems: 45, difficulty: "Easy" },
  { id: 2, title: "Dynamic Programming", description: "Master DP from memoization to tabulation with visual explanations", image: "/poster2.png", problems: 60, difficulty: "Medium" },
  { id: 3, title: "Graph Theory", description: "BFS, DFS, shortest paths, and advanced graph algorithms", image: "/poster1.png", problems: 55, difficulty: "Medium" },
  { id: 4, title: "Binary Search Mastery", description: "Learn to apply binary search beyond sorted arrays", image: "/poster4.png", problems: 35, difficulty: "Medium" },
  { id: 5, title: "Advanced Data Structures", description: "Segment trees, tries, union-find, and more", image: "/poster5.png", problems: 40, difficulty: "Hard" },
];

const TOPICS = [
  { name: "Arrays", count: 1243, icon: "📦", color: "from-blue-500/15 to-cyan-500/5" },
  { name: "Strings", count: 654, icon: "🔤", color: "from-green-500/15 to-emerald-500/5" },
  { name: "Dynamic Programming", count: 487, icon: "🧩", color: "from-purple-500/15 to-pink-500/5" },
  { name: "Trees", count: 398, icon: "🌳", color: "from-orange-500/15 to-amber-500/5" },
  { name: "Graphs", count: 356, icon: "🕸️", color: "from-red-500/15 to-rose-500/5" },
  { name: "Binary Search", count: 234, icon: "🔍", color: "from-yellow-500/15 to-orange-500/5" },
  { name: "Two Pointers", count: 198, icon: "👆", color: "from-cyan-500/15 to-blue-500/5" },
  { name: "Stack", count: 176, icon: "📚", color: "from-pink-500/15 to-purple-500/5" },
  { name: "Sliding Window", count: 143, icon: "🪟", color: "from-emerald-500/15 to-green-500/5" },
  { name: "Greedy", count: 234, icon: "💰", color: "from-amber-500/15 to-yellow-500/5" },
  { name: "Backtracking", count: 123, icon: "↩️", color: "from-indigo-500/15 to-blue-500/5" },
  { name: "Hash Table", count: 567, icon: "#️⃣", color: "from-rose-500/15 to-red-500/5" },
];

const DAILY_CHALLENGE = {
  id: 42,
  title: "Maximum Subarray Sum",
  difficulty: "Medium",
  acceptance: "63%",
  streak: 12,
  description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
};

const STUDY_PLANS = [
  { name: "Algorithm I", duration: "14 days", problems: 31, icon: "🏃", progress: 68 },
  { name: "Algorithm II", duration: "14 days", problems: 31, icon: "🏃‍♂️", progress: 23 },
  { name: "Data Structure I", duration: "14 days", problems: 30, icon: "🏗️", progress: 85 },
  { name: "Data Structure II", duration: "14 days", problems: 31, icon: "🏛️", progress: 45 },
  { name: "Programming Skills I", duration: "10 days", problems: 27, icon: "💻", progress: 100 },
  { name: "Programming Skills II", duration: "15 days", problems: 32, icon: "🧑‍💻", progress: 12 },
];

/* ── helpers ───────────────────────────────────────────────────── */
const diffBg = (d: string) =>
  d === "Easy"
    ? "bg-green-500/15 border-green-500/30 text-green-400"
    : d === "Medium"
    ? "bg-yellow-500/15 border-yellow-500/30 text-yellow-400"
    : d === "Hard"
    ? "bg-red-500/15 border-red-500/30 text-red-400"
    : "bg-orange-500/15 border-orange-500/30 text-orange-400";

/* ── carousel section component ────────────────────────────────── */
function ExploreCarousel({
  title,
  subtitle,
  cards,
  delay = 0,
}: {
  title: string;
  subtitle: string;
  cards: Card[];
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-stone-200 tracking-widest">
            {title}
          </h2>
          <p className="text-xs text-stone-500 tracking-wide mt-1">{subtitle}</p>
        </div>
        <button className="text-xs text-orange-400 tracking-wider hover:text-orange-300 transition-colors">
          View All →
        </button>
      </div>

      <Carousel opts={{ align: "start" }}>
        <CarouselContent>
          {cards.map((card) => (
            <CarouselItem key={card.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group cursor-pointer"
              >
                {/* image */}
                <div className="relative h-44 rounded-xl overflow-hidden mb-3">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  {/* tag */}
                  {card.tag && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-stone-950/70 backdrop-blur text-[10px] text-orange-300 tracking-wider border border-stone-700/50">
                      {card.tag}
                    </span>
                  )}
                  {/* difficulty */}
                  {card.difficulty && (
                    <span
                      className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-medium border ${diffBg(card.difficulty)}`}
                    >
                      {card.difficulty}
                    </span>
                  )}
                  {/* problem count badge */}
                  {card.problems && (
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-stone-950/70 backdrop-blur text-[10px] text-stone-300 border border-stone-700/50">
                      {card.problems} problems
                    </span>
                  )}
                </div>

                {/* text */}
                <h3 className="text-sm font-semibold text-orange-100 group-hover:text-orange-200 transition-colors line-clamp-1">
                  {card.title}
                </h3>
                <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </motion.div>
  );
}

/* ── page ──────────────────────────────────────────────────────── */
export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllTopics, setShowAllTopics] = useState(false);

  const visibleTopics = showAllTopics ? TOPICS : TOPICS.slice(0, 8);

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* ── HERO ─────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* animated orbs */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[400px] rounded-full bg-orange-500/6 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-20 right-1/4 w-[350px] h-[350px] rounded-full bg-amber-400/5 blur-[100px] animate-pulse" />

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* left text */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-orange-400 tracking-[.35em] uppercase mb-3"
              >
                Welcome to
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold tracking-tight text-orange-100 mb-3"
              >
                MeetCode Explore
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-stone-400 text-sm tracking-wide max-w-md"
              >
                Discover curated study plans, topic-wise collections, and guided paths to accelerate your learning
              </motion.p>
            </div>

            {/* search */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full lg:w-96 relative"
            >
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500">🔍</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, plans, collections..."
                className="w-full bg-stone-900/70 backdrop-blur border border-stone-700/50 rounded-xl py-3 pl-11 pr-4 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DAILY CHALLENGE BANNER ────────────── */}
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-r from-orange-500/10 via-amber-500/8 to-orange-500/10 border border-orange-500/20 rounded-2xl p-6 md:p-8"
        >
          <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-orange-500/10 blur-[60px]" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-2xl shrink-0">
                📅
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-semibold text-orange-100">
                    Daily Challenge
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${diffBg(DAILY_CHALLENGE.difficulty)}`}>
                    {DAILY_CHALLENGE.difficulty}
                  </span>
                </div>
                <p className="text-sm text-stone-300">{DAILY_CHALLENGE.title}</p>
                <p className="text-xs text-stone-500 mt-1">
                  {DAILY_CHALLENGE.acceptance} acceptance · 🔥 {DAILY_CHALLENGE.streak} day streak
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-2xl font-bold text-orange-300">{DAILY_CHALLENGE.streak}</p>
                <p className="text-[10px] text-stone-500 tracking-wider">DAY STREAK</p>
              </div>
              <Link href={`/question/${DAILY_CHALLENGE.id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 cursor-pointer"
                >
                  Solve Now →
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── STUDY PLANS ──────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-stone-200 tracking-widest">
              STUDY PLANS
            </h2>
            <p className="text-xs text-stone-500 tracking-wide mt-1">
              Structured paths to build your skills systematically
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {STUDY_PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group bg-stone-900/60 backdrop-blur border border-stone-800/50 rounded-xl p-4 hover:border-orange-500/25 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{plan.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-orange-100 group-hover:text-orange-200 transition-colors truncate">
                    {plan.name}
                  </h3>
                  <p className="text-[10px] text-stone-500">
                    {plan.duration} · {plan.problems} problems
                  </p>
                </div>
                {plan.progress === 100 && (
                  <span className="text-green-400 text-xs font-bold">✓</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 rounded-full bg-stone-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${plan.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.3, duration: 0.8, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      plan.progress === 100
                        ? "bg-green-500"
                        : "bg-gradient-to-r from-orange-500 to-amber-500"
                    }`}
                  />
                </div>
                <span className="text-[10px] text-stone-500 font-medium tabular-nums w-8 text-right">
                  {plan.progress}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURED CAROUSEL ────────────────── */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <ExploreCarousel
          title="FEATURED"
          subtitle="Handpicked collections by the MeetCode team"
          cards={FEATURED_CARDS}
        />
      </section>

      {/* ── TOPICS GRID ──────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-stone-200 tracking-widest">
              TOPICS
            </h2>
            <p className="text-xs text-stone-500 tracking-wide mt-1">
              Browse problems by topic and difficulty
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <AnimatePresence>
            {visibleTopics.map((topic, i) => (
              <motion.div
                key={topic.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`group bg-gradient-to-br ${topic.color} backdrop-blur border border-stone-800/50 rounded-xl p-4 hover:border-orange-500/25 transition-all cursor-pointer`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-stone-200 group-hover:text-orange-200 transition-colors truncate">
                      {topic.name}
                    </h3>
                    <p className="text-[10px] text-stone-500">
                      {topic.count} problems
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {TOPICS.length > 8 && (
          <div className="flex justify-center mt-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowAllTopics(!showAllTopics)}
              className="px-5 py-2 rounded-lg text-xs text-stone-400 border border-stone-700/40 hover:border-orange-500/30 hover:text-orange-300 transition-colors tracking-wider"
            >
              {showAllTopics ? "Show Less" : `Show All ${TOPICS.length} Topics`}
            </motion.button>
          </div>
        )}
      </section>

      {/* ── INTERVIEW CAROUSEL ───────────────── */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <ExploreCarousel
          title="INTERVIEW"
          subtitle="Company-specific preparation and system design guides"
          cards={INTERVIEW_CARDS}
          delay={0.1}
        />
      </section>

      {/* ── LEARNING PATHS CAROUSEL ──────────── */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <ExploreCarousel
          title="LEARN"
          subtitle="Topic-focused deep dives from fundamentals to advanced"
          cards={LEARN_CARDS}
          delay={0.15}
        />
      </section>

      {/* ── QUICK STATS ──────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: "📝", value: "5,800+", label: "Total Problems" },
            { icon: "📚", value: "45+", label: "Study Plans" },
            { icon: "🏢", value: "200+", label: "Company Tags" },
            { icon: "🎯", value: "12", label: "Core Topics" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="bg-stone-900/50 backdrop-blur border border-stone-800/50 rounded-2xl p-5 text-center"
            >
              <span className="text-xl">{stat.icon}</span>
              <p className="text-2xl font-bold text-orange-200 mt-1">{stat.value}</p>
              <p className="text-[10px] text-stone-400 tracking-wider mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-r from-orange-500/12 to-amber-500/8 border border-orange-500/20 rounded-2xl p-8 md:p-12 text-center"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-orange-500/10 blur-[60px]" />
          <h2 className="text-2xl md:text-3xl font-bold text-orange-100 mb-3 tracking-tight">
            Start Your Learning Journey
          </h2>
          <p className="text-sm text-stone-400 mb-6 max-w-md mx-auto">
            Pick a plan, solve daily, and watch your skills grow. Over 850,000 developers have started here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/problems">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3 rounded-xl text-sm font-semibold tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 shadow-lg shadow-orange-500/20 cursor-pointer"
              >
                Start Solving →
              </motion.button>
            </Link>
            <Link href="/interview">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3 rounded-xl text-sm font-semibold tracking-wider bg-stone-800/60 border border-stone-600/50 text-stone-200 hover:border-orange-500/40 transition-colors cursor-pointer"
              >
                Interview Prep
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}