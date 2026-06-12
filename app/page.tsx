"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import GridDistortion from "./components/GridDistortion";
import Link from "next/link";

/* ── animated counter ──────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── data ──────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: "📝",
    title: "5,800+ Problems",
    description:
      "From easy warm-ups to hard brain-teasers — practice problems curated from real interviews at top companies.",
    color: "from-blue-500/20 to-cyan-500/10",
    borderColor: "hover:border-blue-500/30",
  },
  {
    icon: "🏆",
    title: "Weekly Contests",
    description:
      "Compete live against coders worldwide. Climb the global leaderboard and earn exclusive badges.",
    color: "from-orange-500/20 to-amber-500/10",
    borderColor: "hover:border-orange-500/30",
  },
  {
    icon: "🎭",
    title: "Mock Interviews",
    description:
      "Simulate real interview rounds — phone screens, onsites, and system design with timed pressure.",
    color: "from-purple-500/20 to-pink-500/10",
    borderColor: "hover:border-purple-500/30",
  },
  {
    icon: "🏢",
    title: "Company Prep",
    description:
      "Filter questions by Google, Meta, Amazon, and 200+ companies. Know exactly what to expect.",
    color: "from-green-500/20 to-emerald-500/10",
    borderColor: "hover:border-green-500/30",
  },
  {
    icon: "💬",
    title: "Community",
    description:
      "Discuss solutions, share approaches, and learn from 1.2 million+ developers worldwide.",
    color: "from-yellow-500/20 to-orange-500/10",
    borderColor: "hover:border-yellow-500/30",
  },
  {
    icon: "📊",
    title: "Progress Tracking",
    description:
      "Visual dashboards, streak calendars, and skill breakdowns to measure your growth over time.",
    color: "from-red-500/20 to-rose-500/10",
    borderColor: "hover:border-red-500/30",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "SDE @ Google",
    quote:
      "MeetCode was my go-to for 4 months before my Google interview. The company-specific filters saved me so much time. Landed L5!",
    avatar: "P",
  },
  {
    name: "Alex Chen",
    role: "Senior Engineer @ Meta",
    quote:
      "The weekly contests pushed me to think faster. I went from timing out on mediums to solving hards in 25 minutes.",
    avatar: "A",
  },
  {
    name: "Jordan Taylor",
    role: "Backend @ Stripe",
    quote:
      "The discussion forum is gold. Every problem has 5+ approaches explained by brilliant people. Better than any textbook.",
    avatar: "J",
  },
];

const COMPANIES = [
  "Google",
  "Meta",
  "Amazon",
  "Apple",
  "Microsoft",
  "Netflix",
  "Uber",
  "Stripe",
  "Spotify",
  "Tesla",
  "Adobe",
  "Oracle",
];

const LANGUAGES = [
  { name: "Python", icon: "🐍" },
  { name: "JavaScript", icon: "💛" },
  { name: "Java", icon: "☕" },
  { name: "C++", icon: "⚙️" },
  { name: "Go", icon: "🐹" },
  { name: "Rust", icon: "🦀" },
  { name: "TypeScript", icon: "🔷" },
  { name: "C#", icon: "🟣" },
];

/* ── page ──────────────────────────────────────────────────────── */
export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  return (
    <div className="bg-stone-950 text-white">
      {/* ═══════════ HERO ═══════════ */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative w-full h-[100vh] overflow-hidden"
      >
        {/* grid distortion background */}
        <div className="absolute inset-0 z-0">
          <GridDistortion
            imageSrc="./image.png"
            grid={12}
            mouse={0.12}
            strength={0.18}
            relaxation={0.92}
            className="w-full h-full"
          />
        </div>

        {/* dark overlay gradient for readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-stone-950/40 via-transparent to-stone-950" />

        {/* hero content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs tracking-[.3em] mb-6 backdrop-blur-sm"
          >
            🚀 WHERE DEVELOPERS LEVEL UP
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-widest text-orange-200 select-none drop-shadow-2xl mb-4"
          >
            MeetCode
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-stone-300/80 max-w-2xl tracking-wide leading-relaxed mb-8"
          >
            Master algorithms, ace interviews, and join a community of{" "}
            <span className="text-orange-300 font-medium">1.2 million+</span>{" "}
            developers pushing their limits every day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/problems">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl text-sm font-semibold tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 shadow-lg shadow-orange-500/25 cursor-pointer"
              >
                Start Solving — Free
              </motion.button>
            </Link>
            <Link href="/explore">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl text-sm font-semibold tracking-wider bg-stone-800/60 backdrop-blur border border-stone-600/50 text-stone-200 hover:border-orange-500/40 transition-colors cursor-pointer"
              >
                Explore Topics
              </motion.button>
            </Link>
          </motion.div>

          {/* scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] text-stone-500 tracking-[.3em] uppercase">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border border-stone-600/50 flex justify-center pt-1.5"
            >
              <div className="w-1 h-2 rounded-full bg-orange-400/60" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════════ STATS BAR ═══════════ */}
      <section className="relative z-10 -mt-1">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 bg-stone-900/70 backdrop-blur-xl border border-stone-800/60 rounded-2xl p-6 md:p-8 shadow-2xl"
          >
            {[
              { value: 5800, suffix: "+", label: "Problems", icon: "📝" },
              { value: 1200000, suffix: "+", label: "Developers", icon: "👥" },
              { value: 200, suffix: "+", label: "Companies", icon: "🏢" },
              { value: 412, suffix: "", label: "Contests", icon: "🏆" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <span className="text-xl mb-1 block">{stat.icon}</span>
                <p className="text-2xl md:text-3xl font-bold text-orange-200">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs text-stone-400 tracking-wider mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs uppercase tracking-[.35em] text-orange-400 block mb-3">
            Everything you need
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-orange-100 tracking-tight">
            Built for Developers Who Want More
          </h2>
          <p className="text-stone-400 text-sm mt-3 max-w-lg mx-auto">
            From your first &quot;Hello World&quot; to your FAANG offer — MeetCode has you
            covered at every step.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className={`group bg-gradient-to-br ${feat.color} backdrop-blur border border-stone-800/50 rounded-2xl p-6 ${feat.borderColor} transition-all cursor-pointer`}
            >
              <span className="text-3xl">{feat.icon}</span>
              <h3 className="text-lg font-semibold text-orange-100 mt-3 mb-2 group-hover:text-orange-200 transition-colors">
                {feat.title}
              </h3>
              <p className="text-sm text-stone-400 leading-relaxed">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/50 to-stone-950" />
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[100px]" />

        <div className="relative max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-xs uppercase tracking-[.35em] text-orange-400 block mb-3">
              How it works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-orange-100 tracking-tight">
              Three Steps to Your Dream Job
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Pick Your Path",
                desc: "Choose a study plan — by topic, company, or difficulty. We build a personalized roadmap.",
                icon: "🗺️",
              },
              {
                step: "02",
                title: "Practice Daily",
                desc: "Solve problems, join contests, and track your streak. Consistency beats intensity.",
                icon: "⚡",
              },
              {
                step: "03",
                title: "Land the Offer",
                desc: "Run mock interviews, review company-specific patterns, and walk in confident.",
                icon: "🎯",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                {/* connector line (desktop) */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-orange-500/30 to-transparent" />
                )}
                <div className="w-20 h-20 rounded-2xl bg-stone-800/60 border border-stone-700/40 flex items-center justify-center text-3xl mx-auto mb-4">
                  {item.icon}
                </div>
                <span className="text-xs text-orange-400/60 tracking-[.3em] font-mono">
                  STEP {item.step}
                </span>
                <h3 className="text-xl font-semibold text-orange-100 mt-2 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-400 leading-relaxed max-w-xs mx-auto">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ LANGUAGES ═══════════ */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs uppercase tracking-[.35em] text-orange-400 block mb-3">
            Code in your language
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-orange-100 tracking-tight">
            8+ Languages Supported
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {LANGUAGES.map((lang, i) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900/60 border border-stone-800/50 hover:border-orange-500/30 transition-colors cursor-pointer"
            >
              <span className="text-lg">{lang.icon}</span>
              <span className="text-sm text-stone-300 tracking-wider">
                {lang.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════ COMPANIES MARQUEE ═══════════ */}
      <section className="py-16 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs uppercase tracking-[.35em] text-stone-500 block mb-3">
            Trusted by developers at
          </span>
        </motion.div>

        <div className="relative">
          {/* fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-stone-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-stone-950 to-transparent z-10" />

          <div className="flex gap-12 animate-marquee">
            {[...COMPANIES, ...COMPANIES].map((company, i) => (
              <span
                key={`${company}-${i}`}
                className="text-2xl font-bold text-stone-700 tracking-widest whitespace-nowrap select-none"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs uppercase tracking-[.35em] text-orange-400 block mb-3">
            Success stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-orange-100 tracking-tight">
            Developers Love MeetCode
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-stone-900/50 backdrop-blur border border-stone-800/50 rounded-2xl p-6 hover:border-orange-500/20 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-sm font-bold text-stone-950">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-orange-100">
                    {t.name}
                  </p>
                  <p className="text-xs text-stone-500">{t.role}</p>
                </div>
              </div>
              <p className="text-sm text-stone-400 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex gap-0.5 mt-3 text-amber-400 text-xs">
                ★★★★★
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════ CTA SECTION ═══════════ */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/30 to-stone-950" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-orange-500/8 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto px-6 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-orange-100 tracking-tight mb-4">
            Ready to Level Up?
          </h2>
          <p className="text-stone-400 text-base md:text-lg mb-8 max-w-xl mx-auto">
            Join 1.2 million+ developers who are mastering algorithms, acing
            interviews, and building their dream careers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-xl text-sm font-semibold tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 shadow-lg shadow-orange-500/25 cursor-pointer"
              >
                Create Free Account
              </motion.button>
            </Link>
            <Link href="/contest">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-xl text-sm font-semibold tracking-wider bg-stone-800/60 border border-stone-600/50 text-stone-200 hover:border-orange-500/40 transition-colors cursor-pointer"
              >
                View Contests
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-stone-800/50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {/* brand */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-xl font-bold text-orange-200 tracking-widest mb-3">
                MeetCode
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                The best platform to sharpen your coding skills and prepare for
                technical interviews.
              </p>
            </div>

            {/* links */}
            {[
              {
                title: "Practice",
                links: ["Problems", "Explore", "Contest", "Discuss"],
              },
              {
                title: "Prepare",
                links: ["Interview", "Study Plans", "Company Tags", "Mock"],
              },
              {
                title: "More",
                links: ["Store", "Premium", "Blog", "Careers"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold text-stone-300 tracking-[.2em] uppercase mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <span className="text-sm text-stone-500 hover:text-orange-300 transition-colors cursor-pointer">
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-stone-800/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-600">
              © 2026 MeetCode. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-stone-600">
              <span className="hover:text-stone-400 transition-colors cursor-pointer">
                Privacy
              </span>
              <span className="hover:text-stone-400 transition-colors cursor-pointer">
                Terms
              </span>
              <span className="hover:text-stone-400 transition-colors cursor-pointer">
                Contact
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
