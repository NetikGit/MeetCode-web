"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ── types ─────────────────────────────────────────────────────── */
interface Reply {
  id: number;
  user: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
}

interface Post {
  id: number;
  user: string;
  avatar: string;
  time: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  views: number;
  replies: Reply[];
  pinned?: boolean;
}

/* ── mock data ─────────────────────────────────────────────────── */
const CATEGORIES = [
  { key: "all", label: "All", icon: "💬" },
  { key: "general", label: "General", icon: "🗣️" },
  { key: "interview", label: "Interview", icon: "🎯" },
  { key: "solutions", label: "Solutions", icon: "💡" },
  { key: "feedback", label: "Feedback", icon: "📝" },
];

const TRENDING_TAGS = [
  "Dynamic Programming",
  "Binary Search",
  "Graph",
  "Two Pointers",
  "Greedy",
  "Stack",
  "BFS/DFS",
  "Sliding Window",
  "Recursion",
  "Hash Map",
];

const POSTS: Post[] = [
  {
    id: 1,
    user: "algo_master",
    avatar: "A",
    time: "2 hours ago",
    title: "📌 MeetCode Community Guidelines — Read Before Posting",
    content:
      "Welcome to MeetCode Discuss! Please be respectful, use code formatting for solutions, and tag your posts appropriately. No spam or self-promotion. Help each other grow! 🚀",
    tags: ["general", "pinned"],
    likes: 1243,
    views: 54210,
    replies: [
      {
        id: 1,
        user: "code_ninja",
        avatar: "C",
        time: "1 hour ago",
        content: "Great guidelines! Thanks for keeping the community organized.",
        likes: 45,
      },
    ],
    pinned: true,
  },
  {
    id: 2,
    user: "dp_wizard",
    avatar: "D",
    time: "35 min ago",
    title: "How to approach DP problems systematically?",
    content:
      "I've been struggling with dynamic programming for weeks. I can solve easy ones but medium/hard always gets me stuck. My current approach is:\n\n1. Try brute force recursion\n2. Identify overlapping subproblems\n3. Memoize\n4. Convert to bottom-up\n\nBut I keep failing at step 2. Any tips on identifying the state properly? What mental models do you use?",
    tags: ["Dynamic Programming", "interview", "tips"],
    likes: 342,
    views: 4521,
    replies: [
      {
        id: 1,
        user: "tree_master",
        avatar: "T",
        time: "20 min ago",
        content:
          "I always start by asking: \"What decisions do I make at each step?\" and \"What information do I need to make that decision?\" — the answers define your state. Also, draw the recursion tree for small inputs. The repeated nodes ARE your overlapping subproblems.",
        likes: 89,
      },
      {
        id: 2,
        user: "hash_hero",
        avatar: "H",
        time: "10 min ago",
        content:
          "Try the \"dimensions\" approach: for each variable that changes across recursive calls, that's a dimension in your DP. e.g., index i, remaining capacity → 2D DP. Also, Neetcode's roadmap is excellent for building intuition.",
        likes: 67,
      },
    ],
  },
  {
    id: 3,
    user: "graph_guru",
    avatar: "G",
    time: "1 hour ago",
    title: "My experience at Google's coding interview (L4) — 2026",
    content:
      "Just had my on-site at Google last week and got the offer! 🎉 Here's my preparation journey:\n\n• 6 months of daily practice (2-3 problems/day)\n• Focused heavily on graphs, trees, and system design\n• Used MeetCode's company-specific filters extensively\n• Mock interviews were crucial — did 15+ on Pramp\n\nHappy to answer any questions about the process!",
    tags: ["interview", "Google", "experience"],
    likes: 892,
    views: 12340,
    replies: [
      {
        id: 1,
        user: "binary_boss",
        avatar: "B",
        time: "45 min ago",
        content:
          "Congrats! 🎉 What level of difficulty were the coding questions? And did they ask any behavioral questions?",
        likes: 34,
      },
      {
        id: 2,
        user: "sort_king",
        avatar: "S",
        time: "30 min ago",
        content:
          "Amazing! How did you handle the system design round? Any specific resources you'd recommend?",
        likes: 28,
      },
      {
        id: 3,
        user: "stack_queen",
        avatar: "Q",
        time: "15 min ago",
        content:
          "Did you use any specific study plan on MeetCode? I'm targeting Meta and wondering if there's overlap in topics.",
        likes: 19,
      },
    ],
  },
  {
    id: 4,
    user: "string_lord",
    avatar: "S",
    time: "3 hours ago",
    title: "Clean O(n) solution for \"Longest Substring Without Repeating Chars\"",
    content:
      "Sharing my sliding window approach that runs in O(n) time and O(min(m,n)) space.\n\nThe key insight is maintaining a hash set of characters in the current window. When we encounter a duplicate, we shrink the window from the left until the duplicate is removed.\n\nThis avoids the common mistake of jumping the left pointer too far.",
    tags: ["solutions", "Sliding Window", "strings"],
    likes: 567,
    views: 8910,
    replies: [
      {
        id: 1,
        user: "algo_master",
        avatar: "A",
        time: "2 hours ago",
        content:
          "Nice! You can also use a HashMap to store the last seen index, which lets you jump the left pointer directly instead of shrinking one by one. Same complexity but fewer iterations.",
        likes: 102,
      },
    ],
  },
  {
    id: 5,
    user: "tree_master",
    avatar: "T",
    time: "5 hours ago",
    title: "Is grinding 500+ problems actually necessary?",
    content:
      "Seeing a lot of people say you need 300-500 problems to crack FAANG. But I've seen folks who did 150 focused problems and got offers at top companies. Quality over quantity?\n\nWhat's your experience — did the NUMBER of problems matter, or was it pattern recognition and understanding?",
    tags: ["general", "discussion", "career"],
    likes: 1023,
    views: 23450,
    replies: [
      {
        id: 1,
        user: "dp_wizard",
        avatar: "D",
        time: "4 hours ago",
        content:
          "I did around 200 problems but focused on understanding patterns. I can now solve most mediums in 20-30 min. It's about recognizing which pattern to apply, not memorizing solutions.",
        likes: 156,
      },
      {
        id: 2,
        user: "code_ninja",
        avatar: "C",
        time: "3 hours ago",
        content:
          "Depends on your baseline. If you have a strong CS foundation, 100-150 targeted problems is enough. If self-taught, you might need more to build the intuition.",
        likes: 89,
      },
    ],
  },
  {
    id: 6,
    user: "hash_hero",
    avatar: "H",
    time: "6 hours ago",
    title: "Weekly Contest 411 — Post-contest Discussion",
    content:
      "How did everyone find this week's contest? I thought Q3 was deceptively tricky — seemed like a simple BFS but had edge cases with negative weights.\n\nQ4 was a beautiful segment tree problem. Solved it with lazy propagation but curious if there's a simpler approach?",
    tags: ["contest", "solutions", "Weekly Contest"],
    likes: 234,
    views: 5670,
    replies: [
      {
        id: 1,
        user: "graph_guru",
        avatar: "G",
        time: "5 hours ago",
        content:
          "Q3 could also be solved with Dijkstra if you transform the weights. The negative weights were actually bounded, so you could offset them. Much cleaner than modified BFS.",
        likes: 45,
      },
    ],
  },
];

/* ── page ──────────────────────────────────────────────────────── */
export default function DiscussPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [sortBy, setSortBy] = useState<"hot" | "new" | "top">("hot");

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const filteredPosts = POSTS.filter((p) => {
    const matchCategory =
      activeCategory === "all" ||
      p.tags.some((t) => t.toLowerCase() === activeCategory);
    const matchSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  }).sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    if (sortBy === "top") return b.likes - a.likes;
    if (sortBy === "new") return a.id > b.id ? -1 : 1;
    return b.views - a.views; // hot
  });

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* ── HERO ─────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-orange-500/8 blur-[100px]" />

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-orange-100 mb-3"
          >
            Discuss
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-stone-400 text-sm tracking-wide max-w-md mx-auto"
          >
            Share solutions, ask questions, and learn from the community
          </motion.p>

          {/* search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-8 max-w-xl mx-auto relative"
          >
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500">
              🔍
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search discussions..."
              className="w-full bg-stone-900/70 backdrop-blur border border-stone-700/50 rounded-xl py-3 pl-11 pr-4 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
          </motion.div>
        </div>
      </section>

      {/* ── MAIN LAYOUT ──────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-24 flex flex-col lg:flex-row gap-8">
        {/* ── LEFT: Posts Feed ──────────────── */}
        <div className="flex-1 min-w-0">
          {/* category pills + sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all ${
                    activeCategory === cat.key
                      ? "bg-orange-500/20 text-orange-300 border border-orange-500/40"
                      : "bg-stone-800/60 text-stone-400 border border-stone-700/40 hover:text-stone-200 hover:border-stone-600"
                  }`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>

            <div className="flex gap-1 bg-stone-900 rounded-lg p-0.5">
              {(["hot", "new", "top"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`px-3 py-1 rounded-md text-xs tracking-wider transition-colors ${
                    sortBy === s
                      ? "bg-stone-800 text-orange-200"
                      : "text-stone-500 hover:text-stone-300"
                  }`}
                >
                  {s === "hot" ? "🔥" : s === "new" ? "🕐" : "⬆️"}{" "}
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* new post button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mb-6 py-3 rounded-xl border border-dashed border-stone-700/60 text-stone-500 text-sm tracking-wider hover:text-orange-300 hover:border-orange-500/40 transition-colors bg-stone-900/30"
          >
            ✏️ Start a new discussion...
          </motion.button>

          {/* posts */}
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {filteredPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.04 }}
                  className={`bg-stone-900/60 backdrop-blur border rounded-2xl overflow-hidden transition-colors ${
                    post.pinned
                      ? "border-orange-500/30"
                      : "border-stone-800/50 hover:border-stone-700"
                  }`}
                >
                  {/* post header */}
                  <div
                    className="px-5 py-4 cursor-pointer"
                    onClick={() =>
                      setExpandedPost(
                        expandedPost === post.id ? null : post.id
                      )
                    }
                  >
                    <div className="flex items-start gap-3">
                      {/* avatar */}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                          post.pinned
                            ? "bg-gradient-to-br from-orange-500 to-amber-600 text-stone-950"
                            : "bg-gradient-to-br from-stone-700 to-stone-600 text-stone-300"
                        }`}
                      >
                        {post.avatar}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* meta */}
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-orange-200">
                            {post.user}
                          </span>
                          <span className="text-xs text-stone-600">·</span>
                          <span className="text-xs text-stone-500">
                            {post.time}
                          </span>
                        </div>

                        {/* title */}
                        <h3 className="text-[15px] font-semibold text-stone-100 leading-snug mb-2">
                          {post.title}
                        </h3>

                        {/* excerpt */}
                        <p
                          className={`text-sm text-stone-400 leading-relaxed ${
                            expandedPost !== post.id ? "line-clamp-2" : ""
                          }`}
                        >
                          {post.content}
                        </p>

                        {/* tags */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {post.tags
                            .filter((t) => t !== "pinned")
                            .map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-0.5 rounded-full text-[10px] tracking-wider bg-stone-800/80 text-stone-400 border border-stone-700/40"
                              >
                                {tag}
                              </span>
                            ))}
                        </div>

                        {/* stats bar */}
                        <div className="flex items-center gap-5 mt-3 text-xs text-stone-500">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(post.id);
                            }}
                            className={`flex items-center gap-1 transition-colors ${
                              likedPosts[post.id]
                                ? "text-orange-400"
                                : "hover:text-orange-300"
                            }`}
                          >
                            {likedPosts[post.id] ? "🧡" : "🤍"}{" "}
                            {post.likes + (likedPosts[post.id] ? 1 : 0)}
                          </button>
                          <span className="flex items-center gap-1">
                            💬 {post.replies.length}
                          </span>
                          <span className="flex items-center gap-1">
                            👁️ {post.views.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* replies */}
                  <AnimatePresence>
                    {expandedPost === post.id && post.replies.length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-stone-800/50 overflow-hidden"
                      >
                        <div className="px-5 py-3 space-y-3 bg-stone-950/40">
                          {post.replies.map((reply) => (
                            <div
                              key={reply.id}
                              className="flex items-start gap-3"
                            >
                              <div className="w-7 h-7 rounded-full bg-stone-800 flex items-center justify-center text-xs font-bold text-stone-400 shrink-0 mt-0.5">
                                {reply.avatar}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="text-xs font-medium text-orange-200/80">
                                    {reply.user}
                                  </span>
                                  <span className="text-[10px] text-stone-600">
                                    {reply.time}
                                  </span>
                                </div>
                                <p className="text-xs text-stone-400 leading-relaxed">
                                  {reply.content}
                                </p>
                                <span className="text-[10px] text-stone-600 mt-1 block">
                                  🤍 {reply.likes}
                                </span>
                              </div>
                            </div>
                          ))}

                          {/* reply input */}
                          <div className="flex gap-2 pt-2 border-t border-stone-800/30">
                            <input
                              placeholder="Write a reply..."
                              className="flex-1 bg-stone-800/60 border border-stone-700/40 rounded-lg py-2 px-3 text-xs text-stone-300 placeholder-stone-600 focus:outline-none focus:border-orange-500/40 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <button className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-lg text-xs font-medium border border-orange-500/30 hover:bg-orange-500/30 transition-colors">
                              Reply
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              ))}
            </AnimatePresence>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16 text-stone-600">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-sm tracking-wider">
                  No discussions found. Try a different search or category.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Sidebar ─────────────────── */}
        <aside className="w-full lg:w-72 shrink-0 space-y-6">
          {/* community stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-stone-900/60 backdrop-blur border border-stone-800/50 rounded-2xl p-5"
          >
            <h3 className="text-xs uppercase tracking-[.25em] text-stone-500 mb-4">
              Community Stats
            </h3>
            <div className="space-y-3">
              {[
                { label: "Members", value: "1.2M+", icon: "👥" },
                { label: "Discussions", value: "845K", icon: "💬" },
                { label: "Solutions Shared", value: "2.3M", icon: "💡" },
                { label: "Online Now", value: "4,521", icon: "🟢" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-stone-400">
                    {stat.icon} {stat.label}
                  </span>
                  <span className="text-sm font-semibold text-orange-200">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* trending tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-stone-900/60 backdrop-blur border border-stone-800/50 rounded-2xl p-5"
          >
            <h3 className="text-xs uppercase tracking-[.25em] text-stone-500 mb-4">
              Trending Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {TRENDING_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1 rounded-full text-[11px] tracking-wider bg-stone-800/60 text-stone-400 border border-stone-700/40 hover:text-orange-300 hover:border-orange-500/30 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          {/* top contributors */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-stone-900/60 backdrop-blur border border-stone-800/50 rounded-2xl p-5"
          >
            <h3 className="text-xs uppercase tracking-[.25em] text-stone-500 mb-4">
              Top Contributors
            </h3>
            <div className="space-y-3">
              {[
                { user: "algo_master", posts: 342, rank: 1 },
                { user: "dp_wizard", posts: 287, rank: 2 },
                { user: "graph_guru", posts: 231, rank: 3 },
                { user: "string_lord", posts: 198, rank: 4 },
                { user: "tree_master", posts: 176, rank: 5 },
              ].map((contrib) => (
                <div
                  key={contrib.user}
                  className="flex items-center gap-3 group"
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      contrib.rank === 1
                        ? "bg-gradient-to-br from-yellow-400 to-amber-600 text-stone-950"
                        : contrib.rank === 2
                        ? "bg-gradient-to-br from-stone-300 to-stone-500 text-stone-950"
                        : contrib.rank === 3
                        ? "bg-gradient-to-br from-orange-600 to-orange-800 text-orange-100"
                        : "bg-stone-800 text-stone-500"
                    }`}
                  >
                    {contrib.rank}
                  </span>
                  <span className="text-sm text-stone-300 group-hover:text-orange-200 transition-colors flex-1 truncate">
                    {contrib.user}
                  </span>
                  <span className="text-xs text-stone-600">
                    {contrib.posts} posts
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* quick links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 backdrop-blur border border-orange-500/20 rounded-2xl p-5"
          >
            <h3 className="text-xs uppercase tracking-[.25em] text-orange-400/70 mb-3">
              Quick Links
            </h3>
            <div className="space-y-2">
              {[
                "📚 MeetCode Study Plans",
                "🎯 Interview Prep Guide",
                "🏆 Contest Calendar",
                "📖 Editorial Archive",
              ].map((link) => (
                <button
                  key={link}
                  className="block w-full text-left text-sm text-stone-400 hover:text-orange-200 transition-colors py-1"
                >
                  {link}
                </button>
              ))}
            </div>
          </motion.div>
        </aside>
      </section>
    </div>
  );
}
