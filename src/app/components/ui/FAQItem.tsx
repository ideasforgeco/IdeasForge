"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItemProps {
    question: string;
    answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="rounded-[10px] !p-[2px] shadow-sm"
            style={{
                background: "linear-gradient(to right, #B352F4, #EF3AA5)",
            }}
        >
            <div className="bg-white rounded-[8px] overflow-hidden">
                {/* Question Header */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between gap-4 !px-6 !py-4 text-left cursor-pointer "
                >
                    <span className="font-semibold text-[16px] sm:text-[18px] text-[#4B4C4D] leading-[140%]">
                        {question}
                    </span>

                    {/* Plus/Minus Icon */}
                    <motion.div
                        className="flex-shrink-0"
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.1, ease: "easeInOut" }}
                    >
                        <Image
                            src="/images/icons/plus_icon.svg"
                            alt={isOpen ? "Collapse" : "Expand"}
                            width={24}
                            height={24}
                        />
                    </motion.div>
                </button>

                {/* Answer with Bouncy Spring Animation */}
                <AnimatePresence initial={false} mode="wait">
                    {isOpen && (
                        <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                                height: "auto",
                                opacity: 1,
                                transition: {
                                    height: {
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 25,
                                        bounce: 0.4,
                                    },
                                    opacity: {
                                        duration: 0.1,
                                    },
                                },
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                                transition: {
                                    height: {
                                        duration: 0.1,
                                    },
                                    opacity: {
                                        duration: 0.1,
                                    },
                                },
                            }}
                            className="overflow-hidden"
                        >
                            <motion.div
                                className="!px-6 !pb-4 !pt-2"
                                initial={{ scale: 0.95 }}
                                animate={{
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 20,
                                    }
                                }}
                                exit={{
                                    scale: 0.95,
                                    transition: {
                                        duration: 0.1,
                                    }
                                }}
                            >
                                <p className="text-[14px] sm:text-[16px] text-[#757575]">
                                    {answer}
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}