"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ── types & data ──────────────────────────────────────────────── */
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  badge?: string;
  icon: string;
  rating: number;
  reviews: number;
  popular?: boolean;
}

interface PremiumPlan {
  id: number;
  name: string;
  price: string;
  period: string;
  features: string[];
  recommended?: boolean;
  icon: string;
  savings?: string;
}

const PRODUCTS: Product[] = [
  // Merchandise
  {
    id: 1, name: "MeetCode Hoodie — Dark Edition", description: "Premium cotton blend hoodie with embroidered logo. Ultra-soft, perfect for late-night coding sessions.",
    price: 59.99, originalPrice: 79.99, category: "merch", badge: "BESTSELLER", icon: "🧥", rating: 4.9, reviews: 2341, popular: true,
  },
  {
    id: 2, name: "Algorithm Tee — \"O(1) Vibes\"", description: "Minimalist black tee with subtle O(1) print. 100% organic cotton, unisex fit.",
    price: 29.99, category: "merch", icon: "👕", rating: 4.7, reviews: 1876,
  },
  {
    id: 3, name: "Binary Tree Mug", description: "Ceramic 350ml mug with a perfectly balanced binary tree design. Dishwasher safe.",
    price: 18.99, category: "merch", icon: "☕", rating: 4.8, reviews: 3210,
  },
  {
    id: 4, name: "MeetCode Sticker Pack (x12)", description: "Waterproof vinyl stickers featuring algorithms, data structures, and coding humor.",
    price: 9.99, category: "merch", icon: "🏷️", rating: 4.6, reviews: 5643,
  },
  {
    id: 5, name: "Dev Backpack — Stealth", description: "Sleek water-resistant backpack with padded laptop compartment. Hidden cable pass-through.",
    price: 89.99, originalPrice: 119.99, category: "merch", badge: "NEW", icon: "🎒", rating: 4.8, reviews: 892,
  },
  {
    id: 6, name: "Mechanical Keycap Set — Code", description: "Cherry MX compatible keycaps with coding symbols. PBT material, dye-sublimated legends.",
    price: 34.99, category: "merch", icon: "⌨️", rating: 4.5, reviews: 1234,
  },

  // Digital
  {
    id: 7, name: "Top Interview 150 — E-Book", description: "Curated collection of the 150 most-asked interview questions with detailed solutions and explanations.",
    price: 19.99, originalPrice: 29.99, category: "digital", badge: "POPULAR", icon: "📘", rating: 4.9, reviews: 8765, popular: true,
  },
  {
    id: 8, name: "System Design Masterclass", description: "12-hour video course covering 15 real system design problems. Includes diagrams and code templates.",
    price: 49.99, originalPrice: 89.99, category: "digital", badge: "44% OFF", icon: "🎬", rating: 4.8, reviews: 4321,
  },
  {
    id: 9, name: "DP Pattern Cards (PDF)", description: "Printable reference cards for 25 dynamic programming patterns. Color-coded by difficulty.",
    price: 12.99, category: "digital", icon: "📋", rating: 4.7, reviews: 2987,
  },
  {
    id: 10, name: "Mock Interview Credits (x5)", description: "Five 1-on-1 mock interview sessions with experienced engineers from top companies.",
    price: 99.99, originalPrice: 149.99, category: "digital", badge: "BEST VALUE", icon: "🎭", rating: 4.9, reviews: 1567,
  },

  // Coins & Credits
  {
    id: 11, name: "500 MeetCoins", description: "Use MeetCoins to unlock premium problems, hints, and editorial solutions.",
    price: 4.99, category: "coins", icon: "🪙", rating: 4.5, reviews: 12340,
  },
  {
    id: 12, name: "2000 MeetCoins", description: "Bulk pack — save 20% compared to buying individually. Unlock premium content faster.",
    price: 15.99, originalPrice: 19.96, category: "coins", badge: "SAVE 20%", icon: "💰", rating: 4.6, reviews: 8901, popular: true,
  },
];

const PREMIUM_PLANS: PremiumPlan[] = [
  {
    id: 1,
    name: "Monthly",
    price: "$35",
    period: "/month",
    icon: "⚡",
    features: [
      "All premium problems",
      "Video solutions",
      "Company-specific lists",
      "Ad-free experience",
      "Priority support",
    ],
  },
  {
    id: 2,
    name: "Annual",
    price: "$159",
    period: "/year",
    icon: "🌟",
    recommended: true,
    savings: "Save $261/yr",
    features: [
      "Everything in Monthly",
      "Mock interview credits (2/mo)",
      "Early contest access",
      "Exclusive study plans",
      "Profile badges",
      "Resume review (1/yr)",
    ],
  },
  {
    id: 3,
    name: "Lifetime",
    price: "$299",
    period: "one-time",
    icon: "💎",
    savings: "Best value ever",
    features: [
      "Everything in Annual — forever",
      "Unlimited mock interviews",
      "Beta features access",
      "Lifetime badge",
      "Priority contest registration",
      "Community mentor status",
    ],
  },
];

/* ── page ──────────────────────────────────────────────────────── */
export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [showCart, setShowCart] = useState(false);

  const categories = [
    { key: "all", label: "All", icon: "✨" },
    { key: "merch", label: "Merchandise", icon: "👕" },
    { key: "digital", label: "Digital", icon: "📘" },
    { key: "coins", label: "Coins & Credits", icon: "🪙" },
  ];

  const filteredProducts = PRODUCTS.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

  const addToCart = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[id] > 1) newCart[id]--;
      else delete newCart[id];
      return newCart;
    });
  };

  const cartItems = Object.entries(cart).map(([id, qty]) => ({
    product: PRODUCTS.find((p) => p.id === Number(id))!,
    qty,
  }));

  const cartTotal = cartItems.reduce((sum, { product, qty }) => sum + product.price * qty, 0);
  const cartCount = Object.values(cart).reduce((s, q) => s + q, 0);

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* ── HERO ─────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-40 left-1/3 w-[500px] h-[400px] rounded-full bg-orange-500/8 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-32 right-1/4 w-[350px] h-[350px] rounded-full bg-amber-400/6 blur-[100px] animate-pulse" />

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs tracking-widest mb-5"
          >
            🛍️ MEETCODE STORE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-orange-100 mb-3"
          >
            Gear Up for Greatness
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-stone-400 text-sm tracking-wide max-w-lg mx-auto"
          >
            Premium merchandise, digital resources, and credits to supercharge your coding journey
          </motion.p>
        </div>
      </section>

      {/* ── PREMIUM PLANS ────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <h2 className="text-xl font-bold text-stone-300 tracking-widest mb-6 text-center">
          PREMIUM MEMBERSHIP
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PREMIUM_PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col rounded-2xl p-6 backdrop-blur transition-all ${
                plan.recommended
                  ? "bg-gradient-to-b from-orange-500/15 to-amber-500/5 border-2 border-orange-500/40 shadow-lg shadow-orange-500/10"
                  : "bg-stone-900/60 border border-stone-800/50 hover:border-stone-700"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 text-[10px] font-bold tracking-widest">
                  RECOMMENDED
                </div>
              )}

              <div className="text-center mb-4">
                <span className="text-3xl">{plan.icon}</span>
                <h3 className="text-lg font-semibold text-orange-100 mt-2">{plan.name}</h3>
                {plan.savings && (
                  <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-[10px] tracking-wider">
                    {plan.savings}
                  </span>
                )}
              </div>

              <div className="text-center mb-5">
                <span className="text-4xl font-bold text-orange-200">{plan.price}</span>
                <span className="text-sm text-stone-500 ml-1">{plan.period}</span>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-stone-400">
                    <span className="text-orange-400 mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3 rounded-xl text-sm font-semibold tracking-wider transition-colors ${
                  plan.recommended
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 shadow-md shadow-orange-500/20"
                    : "bg-stone-800 text-stone-300 border border-stone-700 hover:border-orange-500/40 hover:text-orange-300"
                }`}
              >
                Get {plan.name}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── DIVIDER ──────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent" />
      </div>

      {/* ── SHOP ─────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        {/* header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all border ${
                  activeCategory === cat.key
                    ? "bg-orange-500/20 text-orange-300 border-orange-500/40"
                    : "bg-stone-800/50 text-stone-400 border-stone-700/40 hover:text-stone-200 hover:border-stone-600"
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* cart button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCart(!showCart)}
            className="relative px-5 py-2 rounded-xl bg-stone-800 border border-stone-700/50 text-sm text-stone-300 hover:border-orange-500/40 transition-colors flex items-center gap-2"
          >
            🛒 Cart
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-orange-500 text-stone-950 text-[10px] font-bold flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
        </div>

        {/* cart drawer */}
        <AnimatePresence>
          {showCart && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-stone-900/70 backdrop-blur border border-stone-800/50 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-orange-200 tracking-wider mb-4">
                  🛒 Your Cart
                </h3>
                {cartItems.length === 0 ? (
                  <p className="text-xs text-stone-500 text-center py-4">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-3 mb-4">
                      {cartItems.map(({ product, qty }) => (
                        <div key={product.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{product.icon}</span>
                            <div>
                              <p className="text-sm text-stone-200">{product.name}</p>
                              <p className="text-xs text-stone-500">${product.price.toFixed(2)} × {qty}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-orange-200">
                              ${(product.price * qty).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(product.id)}
                              className="text-xs text-stone-500 hover:text-red-400 transition-colors px-2"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-stone-800/50">
                      <span className="text-sm text-stone-300">Total</span>
                      <span className="text-lg font-bold text-orange-200">${cartTotal.toFixed(2)}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-4 py-3 rounded-xl text-sm font-semibold tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 shadow-md shadow-orange-500/20"
                    >
                      Checkout →
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* product grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -6 }}
                className="group bg-stone-900/60 backdrop-blur border border-stone-800/50 rounded-2xl overflow-hidden hover:border-orange-500/25 transition-all flex flex-col"
              >
                {/* image area */}
                <div className="relative h-40 bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {product.icon}
                  </span>
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-orange-500/90 text-stone-950 text-[10px] font-bold tracking-wider">
                      {product.badge}
                    </span>
                  )}
                  {product.popular && (
                    <span className="absolute top-3 right-3 text-lg">🔥</span>
                  )}
                </div>

                {/* content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-semibold text-orange-100 mb-1 group-hover:text-orange-200 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-stone-500 leading-relaxed mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* rating */}
                  <div className="flex items-center gap-2 mb-3 text-xs">
                    <span className="text-amber-400">
                      {"★".repeat(Math.floor(product.rating))}
                      {product.rating % 1 !== 0 && "½"}
                    </span>
                    <span className="text-stone-500">
                      {product.rating} ({product.reviews.toLocaleString()})
                    </span>
                  </div>

                  {/* price + add */}
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-orange-200">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-stone-600 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addToCart(product.id)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all ${
                        cart[product.id]
                          ? "bg-orange-500 text-stone-950"
                          : "bg-stone-800 text-stone-400 border border-stone-700 hover:border-orange-500/40 hover:text-orange-300"
                      }`}
                    >
                      {cart[product.id] ? cart[product.id] : "+"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── FEATURES BAR ─────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🚚", title: "Free Shipping", desc: "On orders $50+" },
            { icon: "🔄", title: "Easy Returns", desc: "30-day guarantee" },
            { icon: "🔒", title: "Secure Checkout", desc: "Encrypted payments" },
            { icon: "💬", title: "24/7 Support", desc: "We're here to help" },
          ].map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-stone-900/40 backdrop-blur border border-stone-800/40 rounded-2xl p-4 text-center"
            >
              <span className="text-2xl">{feat.icon}</span>
              <h4 className="text-xs font-semibold text-orange-200 mt-2 tracking-wide">{feat.title}</h4>
              <p className="text-[10px] text-stone-500 mt-0.5">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
