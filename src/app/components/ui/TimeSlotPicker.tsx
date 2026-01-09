"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { getAvailableSlots } from "@/app/actions/calendar";

interface TimeSlotPickerProps {
    selectedDate: Date | undefined;
    selectedTime: string;
    onSelectTime: (time: string) => void;
    timeFormat: "12h" | "24h";
    onTimeFormatChange: (format: "12h" | "24h") => void;
    timezone: string;
}

interface TimeSlot {
    time: string;
    available: boolean;
}

export default function TimeSlotPicker({
    selectedDate,
    selectedTime,
    onSelectTime,
    timeFormat,
    onTimeFormatChange,
    timezone,
}: TimeSlotPickerProps) {
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch available slots when date changes
    useEffect(() => {
        if (!selectedDate) {
            setSlots([]);
            return;
        }

        const fetchSlots = async () => {
            setIsLoading(true);
            const availableSlots = await getAvailableSlots(selectedDate, timezone);
            setSlots(availableSlots as TimeSlot[]);
            setIsLoading(false);
        };

        fetchSlots();
    }, [selectedDate, timezone]);

    const formatTime = (time24: string) => {
        if (timeFormat === "24h") return time24;

        const [hours] = time24.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
        const hour12 = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
        return `${hour12}:00 ${period}`;
    };

    if (!selectedDate) {
        return (
            <div className="flex items-center justify-center h-[453px]">
                <Image
                    src="/images/icons/company_icon.svg"
                    alt="Select Date"
                    width={100}
                    height={40}
                />
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center  text-gray-400 font-semibold text-lg h-[453px]">
                Loading slots...
            </div>
        );
    }

    const availableSlots = slots.filter(slot => slot.available);

    if (availableSlots.length === 0) {
        return (
            <div className="flex items-center justify-center h-[453px] text-gray-400 font-semibold text-lg text-center px-4">
                No available slots for this date
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Date and Time Format Toggle */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-[18px] font-semibold text-[#4B4C4D]">
                        {format(selectedDate, "EEE dd")}
                    </p>
                </div>

                {/* Time Format Switch */}
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg !p-1">
                    <button
                        onClick={() => onTimeFormatChange("12h")}
                        className={`cursor-pointer !px-3 !py-1 rounded-md text-[14px] font-medium transition-colors ${timeFormat === "12h"
                            ? "bg-white text-[#4B4C4D] shadow-sm"
                            : "text-gray-500"
                            }`}
                    >
                        12h
                    </button>
                    <button
                        onClick={() => onTimeFormatChange("24h")}
                        className={`cursor-pointer !px-3 !py-1 rounded-md text-[14px] font-medium transition-colors ${timeFormat === "24h"
                            ? "bg-white text-[#4B4C4D] shadow-sm"
                            : "text-gray-500"
                            }`}
                    >
                        24h
                    </button>
                </div>
            </div>

            {/* Time Slots */}
            <div className="hide-scrollbar flex flex-col gap-2 h-[400px] overflow-y-auto">
                {slots.map((slot) => (
                    <button
                        key={slot.time}
                        onClick={() => slot.available && onSelectTime(slot.time)}
                        disabled={!slot.available}
                        className={`cursor-pointer !px-4 !py-2 rounded-md border-2 text-[14px] font-medium transition-all ${selectedTime === slot.time
                            ? "border-white shadow-none bg-gradient-to-r from-[#FECB32] to-[#F55D22] text-white"
                            : slot.available
                                ? "border-gray-100 shadow-xs text-[#4B4C4D] hover:bg-gray-50"
                                : "border-gray-100 bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                            }`}
                    >
                        {formatTime(slot.time)}
                    </button>
                ))}
            </div>
        </div>
    );
}