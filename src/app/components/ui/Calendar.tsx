"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isBefore,
  startOfDay,
} from "date-fns";
import { getBookedDates } from "@/app/actions/calendar";

interface CalendarProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  timezone: string;
}

export default function Calendar({ selectedDate, onSelectDate, timezone }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch booked dates when month changes
  useEffect(() => {
    const fetchBookedDates = async () => {
      setIsLoading(true);
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(currentMonth);

      const dates = await getBookedDates(monthStart, monthEnd, timezone);
      setBookedDates(dates as string[]);
      setIsLoading(false);
    };

    fetchBookedDates();
  }, [currentMonth, timezone]);

  const isBooked = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return bookedDates.includes(dateStr);
  };

  const isPastDate = (date: Date) => {
    return isBefore(startOfDay(date), startOfDay(new Date()));
  };

  const isDisabled = (date: Date) => {
    return isPastDate(date) || isBooked(date);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  const days = generateCalendarDays();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date) => {
    if (!isDisabled(date) && isSameMonth(date, currentMonth)) {
      onSelectDate(date);
    }
  };

  return (
    <div className="w-full h-full flex flex-col !p-0 sm:!p-4">
      {/* Header */}
      <div className="flex justify-between items-center !mb-6">
        <h3 className="text-[22px] font-semibold text-[#4B4C4D]">
          {format(currentMonth, "MMMM yyyy")}
        </h3>

        <div className="flex gap-2">
          {/* Previous Month */}
          <button
            onClick={handlePrevMonth}
            disabled={isLoading}
            className="w-10 h-10 cursor-pointer flex items-center justify-center disabled:opacity-50"
          >
            <Image
              src="/images/icons/next_arrow_icon.svg"
              alt="Previous"
              width={40}
              height={18}
              style={{ transform: "rotate(180deg)" }}
            />
          </button>

          {/* Next Month */}
          <button
            onClick={handleNextMonth}
            disabled={isLoading}
            className="w-10 h-10 cursor-pointer flex items-center justify-center disabled:opacity-50"
          >
            <Image
              src="/images/icons/next_arrow_icon.svg"
              alt="Next"
              width={40}
              height={40}
            />
          </button>
        </div>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-2 !mb-3">
        {dayNames.map((dayName) => (
          <div
            key={dayName}
            className="text-center text-[15px] font-semibold text-[#6B7280] uppercase !py-2"
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 flex-1">
        {days.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isToday = isSameDay(day, new Date());
          const disabled = isDisabled(day);

          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              disabled={disabled || !isCurrentMonth}
              className={`
                flex items-center justify-center rounded-sm text-[16px] font-medium cursor-pointer
                h-[40px]
                ${!isCurrentMonth ? "invisible" : ""}
                ${isSelected
                  ? "bg-gradient-to-r from-[#FECB32] to-[#F55D22] text-white font-semibold shadow-md"
                  : ""
                }
                ${!isSelected && isToday
                  ? "border-2 border-[#FECB32] text-[#4B4C4D]"
                  : ""
                }
                ${disabled && !isSelected
                  ? "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                  : ""
                }
                ${!disabled && !isSelected && !isToday && isCurrentMonth
                  ? "text-[#4B4C4D] hover:bg-gray-100"
                  : ""
                }
              `}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}