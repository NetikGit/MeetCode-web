"use client"
import React, { useState } from "react";
import dayjs from "dayjs";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(today);

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
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

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-stone-800 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-xl">&larr;</button>
        <h2 className="text-xl font-semibold">
          {currentMonth.format("MMMM YYYY")}
        </h2>
        <button onClick={nextMonth} className="text-xl">&rarr;</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-200">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mt-2 text-center">
        {generateDays().map((day, idx) => {
          const isToday =
            day === today.date() &&
            currentMonth.isSame(today, "month") &&
            currentMonth.isSame(today, "year");

          return (
            <div
              key={idx}
              className={`h-10 flex items-center justify-center rounded-full ${
                isToday ? "bg-stone-500 text-white" : "text-gray-200"
              }`}
            >
              {day || ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}
