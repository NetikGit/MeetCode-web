"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ── mock data ─────────────────────────────────────────────────── */
const UPCOMING_CONTESTS = [
  {
    id: 1,
    title: "Weekly Contest 412",
    date: "2026-06-15T10:00:00",
    duration: "1h 30m",
    participants: 12847,
    difficulty: "Mixed",
    prizes: "Top 100 earn badges",
    registered: false,
  },
  {
    id: 2,
    title: "Biweekly Contest 145",
    date: "2026-06-21T14:30:00",
    duration: "1h 30m",
    participants: 8321,
    difficulty: "Mixed",
    prizes: "Top 50 earn premium",
    registered: false,
  },
  {
    id: 3,
    title: "MeetCode Cup — Summer 2026",
    date: "2026-07-05T09:00:00",
    duration: "3h 00m",
    participants: 34210,
    difficulty: "Hard",
    prizes: "Cash prizes & swag",
    registered: false,
  },
];

const PAST_CONTESTS = [
  {
    id: 101,
    title: "Weekly Contest 411",
    date: "2026-06-08",
    participants: 14203,
    winner: "algo_master",
    yourRank: 342,
  },
  {
    id: 102,
    title: "Biweekly Contest 144",
    date: "2026-06-01",
    participants: 9876,
    winner: "code_ninja",
    yourRank: 1205,
  },
  {
    id: 103,
    title: "Weekly Contest 410",
    date: "2026-05-25",
    participants: 13421,
    winner: "dp_wizard",
    yourRank: 789,
  },
  {
    id: 104,
    title: "Weekly Contest 409",
    date: "2026-05-18",
    participants: 11987,
    winner: "graph_guru",
    yourRank: null,
  },
  {
    id: 105,
    title: "Biweekly Contest 143",
    date: "2026-05-11",
    participants: 10543,
    winner: "string_lord",
    yourRank: 2034,
  },
];

const LEADERBOARD = [
  { rank: 1, user: "algo_master", rating: 3142, solved: 2847, country: "🇺🇸" },
  { rank: 2, user: "code_ninja", rating: 3098, solved: 2654, country: "🇯🇵" },
  { rank: 3, user: "dp_wizard", rating: 3054, solved: 2901, country: "🇮🇳" },
  { rank: 4, user: "graph_guru", rating: 2987, solved: 2543, country: "🇩🇪" },
  { rank: 5, user: "string_lord", rating: 2934, solved: 2398, country: "🇨🇳" },
  { rank: 6, user: "binary_boss", rating: 2891, solved: 2210, country: "🇰🇷" },
  { rank: 7, user: "tree_master", rating: 2856, solved: 2189, country: "🇬🇧" },
  { rank: 8, user: "hash_hero", rating: 2823, solved: 2067, country: "🇧🇷" },
  { rank: 9, user: "sort_king", rating: 2798, solved: 1987, country: "🇫🇷" },
  { rank: 10, user: "stack_queen", rating: 2765, solved: 1923, country: "🇨🇦" },
];

/* ── countdown hook ────────────────────────────────────────────── */
function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

/* ── sub-components ────────────────────────────────────────────── */
function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl md:text-4xl font-bold text-orange-300 tabular-nums tracking-wider">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] uppercase tracking-widest text-stone-400 mt-1">
        {label}
      </span>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: string;
  value: string;
  label: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.03 }}
      className="flex flex-col items-center justify-center rounded-2xl bg-stone-800/60 backdrop-blur-md border border-stone-700/40 px-6 py-5 min-w-[140px]"
    >
      <span className="text-2xl mb-1">{icon}</span>
      <span className="text-2xl font-bold text-orange-200">{value}</span>
      <span className="text-xs text-stone-400 tracking-wider mt-1">
        {label}
      </span>
    </motion.div>
  );
}

/* ── page ──────────────────────────────────────────────────────── */
export default function ContestPage() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [registrations, setRegistrations] = useState<Record<number, boolean>>(
    {}
  );

  const nextContest = UPCOMING_CONTESTS[0];
  const countdown = useCountdown(nextContest.date);

  const toggleRegister = (id: number) => {
    setRegistrations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* ── HERO ─────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* animated gradient orbs */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-amber-400/10 blur-[100px] animate-pulse delay-1000" />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs uppercase tracking-[.35em] text-orange-400 mb-3"
          >
            Next Contest
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-orange-100 mb-6"
          >
            {nextContest.title}
          </motion.h1>

          {/* countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className="flex gap-6 md:gap-10 bg-stone-900/60 backdrop-blur-lg border border-stone-700/50 rounded-2xl px-8 py-6"
          >
            <CountdownUnit value={countdown.d} label="Days" />
            <span className="text-3xl text-stone-600 self-start mt-1">:</span>
            <CountdownUnit value={countdown.h} label="Hours" />
            <span className="text-3xl text-stone-600 self-start mt-1">:</span>
            <CountdownUnit value={countdown.m} label="Mins" />
            <span className="text-3xl text-stone-600 self-start mt-1">:</span>
            <CountdownUnit value={countdown.s} label="Secs" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-5 text-stone-400 text-sm tracking-wide"
          >
            {nextContest.duration} &middot; {nextContest.difficulty} &middot;{" "}
            {nextContest.participants.toLocaleString()} registered
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => toggleRegister(nextContest.id)}
            className={`mt-6 px-8 py-3 rounded-xl text-sm font-semibold tracking-wider transition-colors ${
              registrations[nextContest.id]
                ? "bg-stone-700 text-stone-300 border border-stone-600"
                : "bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950"
            }`}
          >
            {registrations[nextContest.id] ? "✓  Registered" : "Register Now"}
          </motion.button>
        </div>
      </section>

      {/* ── STATS ROW ────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 -mt-2 mb-14">
        <div className="flex flex-wrap justify-center gap-4">
          <StatCard icon="🏆" value="412" label="Contests Held" />
          <StatCard icon="👥" value="1.2M+" label="Participants" />
          <StatCard icon="⚡" value="98%" label="Uptime" />
          <StatCard icon="🌍" value="190+" label="Countries" />
        </div>
      </section>

      {/* ── TABS ─────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="flex gap-1 bg-stone-900 rounded-xl p-1 w-fit mx-auto mb-8">
          {(["upcoming", "past"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-6 py-2.5 rounded-lg text-sm font-medium tracking-wider transition-colors ${
                tab === t ? "text-orange-200" : "text-stone-400 hover:text-stone-200"
              }`}
            >
              {tab === t && (
                <motion.div
                  layoutId="contestTab"
                  className="absolute inset-0 bg-stone-800 rounded-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 capitalize">{t}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "upcoming" ? (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="grid gap-4"
            >
              {UPCOMING_CONTESTS.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: 6 }}
                  className="group flex flex-col md:flex-row md:items-center justify-between gap-4 bg-stone-900/70 backdrop-blur border border-stone-800/60 rounded-2xl px-6 py-5 hover:border-orange-500/30 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <h3 className="text-lg font-semibold text-orange-100 truncate">
                        {c.title}
                      </h3>
                    </div>
                    <p className="text-sm text-stone-400 tracking-wide">
                      {new Date(c.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      &middot; {c.duration} &middot; {c.difficulty}
                    </p>
                    <p className="text-xs text-stone-500 mt-1">{c.prizes}</p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-sm text-stone-400">
                      {c.participants.toLocaleString()} joined
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleRegister(c.id)}
                      className={`px-5 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                        registrations[c.id]
                          ? "bg-stone-700 text-stone-300 border border-stone-600"
                          : "bg-orange-500/20 text-orange-300 border border-orange-500/40 hover:bg-orange-500/30"
                      }`}
                    >
                      {registrations[c.id] ? "✓ Registered" : "Register"}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="past"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="overflow-x-auto"
            >
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs text-stone-500 uppercase tracking-widest border-b border-stone-800">
                    <th className="pb-3 pr-4">Contest</th>
                    <th className="pb-3 pr-4">Date</th>
                    <th className="pb-3 pr-4">Participants</th>
                    <th className="pb-3 pr-4">Winner</th>
                    <th className="pb-3">Your Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {PAST_CONTESTS.map((c, i) => (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.06 }}
                      className="border-b border-stone-800/50 hover:bg-stone-900/60 transition-colors"
                    >
                      <td className="py-4 pr-4">
                        <span className="text-orange-200 font-medium">
                          {c.title}
                        </span>
                      </td>
                      <td className="py-4 pr-4 text-sm text-stone-400">
                        {c.date}
                      </td>
                      <td className="py-4 pr-4 text-sm text-stone-400">
                        {c.participants.toLocaleString()}
                      </td>
                      <td className="py-4 pr-4">
                        <span className="text-amber-400 text-sm font-medium">
                          🏆 {c.winner}
                        </span>
                      </td>
                      <td className="py-4 text-sm">
                        {c.yourRank ? (
                          <span className="text-stone-300">
                            #{c.yourRank.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-stone-600 italic">—</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── LEADERBOARD ──────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-stone-300 tracking-widest mb-8 text-center">
          GLOBAL LEADERBOARD
        </h2>

        <div className="bg-stone-900/50 backdrop-blur-md border border-stone-800/60 rounded-2xl overflow-hidden">
          {LEADERBOARD.map((u, i) => (
            <motion.div
              key={u.rank}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-4 px-6 py-4 transition-colors hover:bg-stone-800/40 ${
                i !== LEADERBOARD.length - 1 ? "border-b border-stone-800/40" : ""
              }`}
            >
              {/* rank badge */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  u.rank === 1
                    ? "bg-gradient-to-br from-yellow-400 to-amber-600 text-stone-950"
                    : u.rank === 2
                    ? "bg-gradient-to-br from-stone-300 to-stone-500 text-stone-950"
                    : u.rank === 3
                    ? "bg-gradient-to-br from-orange-600 to-orange-800 text-orange-100"
                    : "bg-stone-800 text-stone-400"
                }`}
              >
                {u.rank}
              </div>

              {/* avatar placeholder */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-stone-700 to-stone-600 flex items-center justify-center text-sm text-stone-300 font-semibold shrink-0">
                {u.user[0].toUpperCase()}
              </div>

              {/* name + country */}
              <div className="flex-1 min-w-0">
                <span className="text-orange-100 font-medium truncate block">
                  {u.user}
                </span>
              </div>

              <span className="text-lg shrink-0">{u.country}</span>

              {/* stats */}
              <div className="hidden sm:flex gap-6 shrink-0 text-sm">
                <div className="text-right">
                  <p className="text-orange-300 font-semibold">{u.rating}</p>
                  <p className="text-[10px] text-stone-500 uppercase tracking-wider">
                    Rating
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-stone-300">{u.solved}</p>
                  <p className="text-[10px] text-stone-500 uppercase tracking-wider">
                    Solved
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
