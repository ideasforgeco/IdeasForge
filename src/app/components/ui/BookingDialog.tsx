"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { format } from "date-fns";
import Image from "next/image";
import Button from "./Button";

interface BookingDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedDate: Date;
    selectedTime: string;
    onConfirm: (email: string) => Promise<void>;
}

export default function BookingDialog({
    open,
    onOpenChange,
    selectedDate,
    selectedTime,
    onConfirm,
}: BookingDialogProps) {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSchedule = async () => {
        setError("");

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setIsLoading(true);
        try {
            await onConfirm(email);
            setEmail("");
            onOpenChange(false);
        } catch (err) {
            setError("Failed to schedule meeting. Please try again.");
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl !p-8 w-[90%] max-w-[500px] z-50 shadow-xl">
                    {/* Close Button */}
                    <Dialog.Close className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                        <Image
                            src="/images/icons/close_icon.svg"
                            alt="Close"
                            width={32}
                            height={32}
                            className="cursor-pointer"
                        />
                    </Dialog.Close>

                    {/* Title */}
                    <Dialog.Title className="text-2xl font-semibold text-[#4B4C4D] !mb-2">
                        Confirm Your Booking
                    </Dialog.Title>

                    {/* Description */}
                    <Dialog.Description className="text-[16px] text-gray-600 !mb-6">
                        You are scheduling a call for
                        <span className="font-semibold text-[#4B4C4D] !ml-1">
                            {format(selectedDate, "MMMM dd, yyyy")} at {selectedTime}
                        </span>
                    </Dialog.Description>

                    {/* Form */}
                    <div className="!space-y-4">
                        {/* Email Input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-[14px] font-medium text-[#4B4C4D] !mb-2"
                            >
                                Your Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full !px-4 !py-3 border-2 border-gray-200 rounded-lg focus:border-[#FECB32] focus:outline-none"
                                disabled={isLoading}
                            />
                            {error && (
                                <p className="text-red-500 text-sm !mt-2">{error}</p>
                            )}
                        </div>
                        <div className="w-full flex justify-center">
                            <Button
                                text={isLoading ? "Scheduling..." : "Schedule Call"}
                                variant="accent"
                                hasIcon={false}
                                onClick={handleSchedule}
                            />
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}