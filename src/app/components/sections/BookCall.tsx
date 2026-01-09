"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import Calendar from "../ui/Calendar";
import TimeSlotPicker from "../ui/TimeSlotPicker";
import bookCallData from "../../data/bookcall.json";
import { BookCallData } from "../../types";
import Button from "../ui/Button";
import BookingDialog from "../ui/BookingDialog";
import { createBooking } from "@/app/actions/booking";
import { format } from "date-fns";

const typedBookCallData: BookCallData = bookCallData;

export default function BookCall() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [timezone, setTimezone] = useState(typedBookCallData.defaultTimezone);
    const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("12h");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);

    // Click outside to close timezone dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.timezone-dropdown')) {
                setIsTimezoneOpen(false);
            }
        };

        if (isTimezoneOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isTimezoneOpen]);

    // Handle Schedule Button Click
    const handleScheduleClick = () => {
        if (!selectedDate || !selectedTime) {
            toast.error("Please select a Date and Time!", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    fontWeight: '600',
                    fontSize: '15px',
                    padding: '16px 20px',
                },
            });
            return;
        }
        setDialogOpen(true);
    };

    // Handle Confirm Booking
    const handleConfirmBooking = async (email: string) => {
        if (!selectedDate || !selectedTime) return;

        try {
            await createBooking({
                email,
                date: format(selectedDate, "yyyy-MM-dd"),
                time: selectedTime,
                timezone,
            });

            toast.success("Booking confirmed! Check your email.", {
                style: {
                    borderRadius: '10px',
                    background: 'linear-gradient(to right, #FECB32, #F55D22)',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '15px',
                    padding: '16px 24px',
                    minWidth: 'fit-content',
                    whiteSpace: 'nowrap',
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#FECB32',
                },
            });

            // Reset selections
            setSelectedDate(undefined);
            setSelectedTime("");
        } catch (error) {
            toast.error("Failed to schedule. Please try again.", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    fontWeight: '600',
                    fontSize: '15px',
                    padding: '16px 20px',
                },
            });
            throw error;
        }
    };

    useEffect(() => {
        // Auto-detect user's timezone on mount
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const availableTimezones = typedBookCallData.timezones;

        // If user's timezone is in our list, use it
        if (availableTimezones.includes(userTimezone)) {
            setTimezone(userTimezone);
        }
    }, []);

    return (
        <section id="bookcall" className="relative max-w-[1920px] min-h-[80vh] bg-white !px-5 sm:!px-10  flex justify-center items-center  flex-col gap-6 !pt-25 md:!pt-30 ">
            <Toaster position="top-center" />

            {/* Heading */}
            <h2 className="font-semibold text-3xl sm:text-5xl xl:text-6xl text-[#4B4C4D] text-center !mb-0 lg:!mb-10">
                {typedBookCallData.heading.part1}
                <span className="bg-gradient-to-r from-[#B352F4] to-[#EF3AA5] bg-clip-text text-transparent !ml-2">
                    {typedBookCallData.heading.part2}
                </span>
            </h2>

            {/* Main Container */}
            <div className="border-2 border-[#E5E7EB] rounded-2xl !py-5 !px-5 sm:!px-10 shadow-md">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                    {/* Left Column */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <Image
                            src={typedBookCallData.leftColumn.logo}
                            alt="Company Logo"
                            width={250}
                            height={60}
                            className="mb-4"
                        />

                        <h3 className="font-semibold text-sm sm:text-lg md:text-[22px] leading-tight capitalize text-[#4B4C4D] text-left">
                            {typedBookCallData.leftColumn.title}
                        </h3>

                        <p className="text-sm sm:text-[16px] text-[#4B4C4D] whitespace-pre-line font-semibold">
                            {typedBookCallData.leftColumn.description}
                        </p>

                        {/* Google Meet */}
                        <div className="flex items-center gap-2">
                            <Image
                                src={typedBookCallData.leftColumn.meetIcon}
                                alt="Google Meet"
                                width={25}
                                height={25}
                            />
                            <span className="text-[16px] text-[#4B4C4D] font-semibold">
                                {typedBookCallData.leftColumn.meetText}
                            </span>
                        </div>

                        {/* Timezone Dropdown */}
                        <div className="relative timezone-dropdown">
                            <div
                                className="rounded-md !p-[2px] !-ml-1"
                                style={{
                                    background: "linear-gradient(to right, #FECB32, #F55D22)"
                                }}
                            >
                                <button
                                    onClick={() => setIsTimezoneOpen(!isTimezoneOpen)}
                                    className="w-full bg-white rounded-sm flex items-center justify-between gap-2 !px-3 !py-2 cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={typedBookCallData.leftColumn.globeIcon}
                                            alt="Timezone"
                                            width={20}
                                            height={20}
                                        />
                                        <span className="text-[14px] text-[#4B4C4D] font-medium">
                                            {timezone}
                                        </span>
                                    </div>

                                    {/* Arrow Icon */}
                                    <Image
                                        src="/images/icons/next_arrow_icon.svg"
                                        alt="Toggle"
                                        width={30}
                                        height={16}
                                        className={`transition-transform duration-300 ${isTimezoneOpen ? '-rotate-90' : 'rotate-90'
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* Dropdown Menu */}
                            {isTimezoneOpen && (
                                <div className="absolute top-full left-0 right-0 !mt-2 bg-white rounded-md border-2 border-gray-100  z-50 max-h-60 overflow-y-auto">
                                    {typedBookCallData.timezones.map((tz) => (
                                        <button
                                            key={tz}
                                            onClick={() => {
                                                setTimezone(tz);
                                                setIsTimezoneOpen(false);
                                            }}
                                            className={`w-full text-left !px-4 !py-3 text-[14px]  first:rounded-t-sm last:rounded-b-sm cursor-pointer ${timezone === tz
                                                ? 'bg-gradient-to-r from-[#FECB32] to-[#F55D22] text-white font-semibold'
                                                : 'text-[#4B4C4D] hover:bg-gray-50'
                                                }`}
                                        >
                                            {tz}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Middle Column - Calendar */}
                    <div className="lg:col-span-4">
                        <Calendar
                            selectedDate={selectedDate}
                            onSelectDate={setSelectedDate}
                            timezone={timezone}
                        />
                    </div>

                    {/* Right Column - Time Slots */}
                    <div className="lg:col-span-4">
                        <TimeSlotPicker
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            onSelectTime={setSelectedTime}
                            timeFormat={timeFormat}
                            onTimeFormatChange={setTimeFormat}
                            timezone={timezone}
                        />
                    </div>
                </div>
            </div>

            {/* Book Button */}
            <div className="w-full flex justify-end">
                <Button
                    text={"Schedule Call"}
                    variant="primary"
                    hasIcon={false}
                    onClick={handleScheduleClick}
                />
            </div>

            {/* Booking Dialog */}
            {selectedDate && selectedTime && (
                <BookingDialog
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    onConfirm={handleConfirmBooking}
                />
            )}
        </section>
    );
}