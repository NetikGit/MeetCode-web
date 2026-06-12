"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import { Flame, Calendar as CalendarIcon, Award } from "lucide-react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(today);

  const startOfMonth = currentMonth.startOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = currentMonth.daysInMonth();

  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const nextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  const generateDays = () => {
    const calendarDays = [];
    for (let i = 0; i < startDay; i++) {
      calendarDays.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i);
    }
    return calendarDays;
  };

  // Mock solved helper
  const getSolvedCount = (day: number | null) => {
    if (!day) return 0;
    if (day % 3 === 0) return 1;
    if (day % 7 === 0) return 3;
    return 0;
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-stone-900/40 border border-stone-850 rounded-2xl shadow-xl space-y-5">
      {/* ── STREAK HEADER WIDGET ── */}
      <div className="flex items-center justify-between bg-stone-900/80 p-3 rounded-xl border border-stone-800">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500/20 animate-pulse" />
          <div>
            <div className="text-[10px] text-stone-500 uppercase tracking-widest">Active Streak</div>
            <div className="text-sm font-bold text-stone-200">15 Days</div>
          </div>
        </div>
        <div className="flex items-center gap-2 border-l border-stone-800 pl-4">
          <Award className="w-5 h-5 text-amber-400" />
          <div>
            <div className="text-[10px] text-stone-500 uppercase tracking-widest">Rank</div>
            <div className="text-sm font-bold text-stone-200">Top 5%</div>
          </div>
        </div>
      </div>

      {/* ── CALENDAR INNER ── */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={prevMonth}
            className="text-stone-500 hover:text-stone-300 transition-colors p-1"
          >
            &larr;
          </button>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-300">
            <CalendarIcon size={12} className="text-orange-400" />
            <span>{currentMonth.format("MMMM YYYY")}</span>
          </div>
          <button
            onClick={nextMonth}
            className="text-stone-500 hover:text-stone-300 transition-colors p-1"
          >
            &rarr;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-2">
          {days.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
          {generateDays().map((day, idx) => {
            if (!day) return <div key={`empty-${idx}`} />;

            const isToday =
              day === today.date() &&
              currentMonth.isSame(today, "month") &&
              currentMonth.isSame(today, "year");

            const solvedCount = getSolvedCount(day);

            return (
              <div
                key={idx}
                className={`relative h-9 flex flex-col items-center justify-center rounded-lg border transition-all duration-200 cursor-pointer ${
                  isToday
                    ? "bg-orange-500/10 border-orange-500 text-orange-300 shadow-sm shadow-orange-500/5"
                    : solvedCount > 0
                    ? "bg-stone-900 border-stone-800 text-stone-300 hover:border-orange-500/20"
                    : "border-transparent text-stone-600 hover:bg-stone-900/30 hover:text-stone-400"
                }`}
                title={solvedCount > 0 ? `${solvedCount} problems solved` : "No problems solved"}
              >
                <span>{day}</span>
                {solvedCount > 0 && (
                  <span
                    className={`absolute bottom-1 w-1 h-1 rounded-full ${
                      solvedCount >= 3 ? "bg-orange-400" : "bg-orange-500/60"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
