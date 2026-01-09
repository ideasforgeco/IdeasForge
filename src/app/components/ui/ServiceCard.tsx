"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useState } from "react";

interface ServiceCardProps {
    service: {
        id: number;
        name: string;
        detailedDescription: string;
    };
    index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Dynamic variants based on screen size
    const badgeVariants: Variants = {
        offscreen: {
            y: 250,
            opacity: 0,
            rotate: 0,
        },
        onscreen: {
            y: isMobile ? 10 : -10, // 10 on mobile, -20 on desktop
            opacity: 1,
            rotate: -2,
            transition: {
                type: "spring",
                bounce: 0.5,
                duration: 0.9,
                delay: 0.1,
            },
        },
    };

    // Gradient colors for badges
    const gradients = [
        "linear-gradient(135deg, #FECB32, #F55D22)", // Web Dev - Orange gradient
        "linear-gradient(135deg, #B352F4, #EF3AA5)", // Mobile - Purple/Pink gradient
        "linear-gradient(135deg, #EF3AA5, #FECB32)", // UI/UX - Pink/Gold gradient
        "linear-gradient(135deg, #F55D22, #B352F4)", // Cloud - Orange/Purple gradient
        "linear-gradient(135deg, #FECB32, #EF3AA5)", // Backend - Gold/Pink gradient
    ];

    const badgeBackground = gradients[index % gradients.length];

    return (
        <motion.div
            className="card-container"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* Floating Gradient Badge with Service Name */}
            <motion.div
                className="service-name-badge"
                style={{
                    background: badgeBackground,
                }}
                variants={badgeVariants}
            >
                <h3 className="text-[18px] sm:text-[28px] font-bold text-white">
                    {service.name}
                </h3>
            </motion.div>

            {/* White Card with Gradient Border */}
            <motion.div
                className="service-card-wrapper"
                variants={cardVariants}
            >
                <div className="service-card">
                    <div className="card-content">
                        <p className="text-[14px] sm:text-[16px] text-[#757575] leading-relaxed">
                            {service.detailedDescription}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

const cardVariants: Variants = {
    offscreen: {
        y: 300,
        opacity: 0,
    },
    onscreen: {
        y: 0,
        opacity: 1,
        rotate: -2,
        transition: {
            type: "spring",
            bounce: 0.5,
            duration: 0.9,
        },
    },
};
