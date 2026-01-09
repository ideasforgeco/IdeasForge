"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when scrolled down 300px
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full hidden lg:flex items-center justify-center shadow-lg cursor-pointer border-2 border-amber-600 bg-white"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                    }}
                >
                    <Image
                        src="/images/icons/arrow_icon.svg"
                        alt="Back to top"
                        width={20}
                        height={20}
                        className="rotate-[-90deg]"
                    />
                </motion.button>
            )}
        </AnimatePresence>
    );
}