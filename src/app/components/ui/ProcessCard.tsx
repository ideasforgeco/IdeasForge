"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ProcessCardProps {
    icon: string;
    title: string;
    description: string;
    index: number;
}

export default function ProcessCard({ icon, title, description, index }: ProcessCardProps) {
    return (
        <motion.div
            className="rounded-[17px] bg-white shadow-md cursor-default"
            style={{
                border: '0.8px solid transparent',
                borderBottom: '2.5px solid transparent',
                backgroundImage: 'linear-gradient(white, white), linear-gradient(to right, #FECB32, #F55D22)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                padding: '20px',
                minWidth: '300px',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}
            // Slide in from right with bounce
            initial={{
                opacity: 0,
                x: 100
            }}
            whileInView={{
                opacity: 1,
                x: 0
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                delay: index * 0.15,
                type: "spring",
                stiffness: 300,
                damping: 20,
                bounce: 0.4,
            }}
        >
            <div className="flex items-center gap-3">
                <Image
                    src={icon}
                    alt={title}
                    width={40}
                    height={40}
                />
                <h3 className="font-semibold text-[20px] leading-[120%] tracking-[-0.02em] capitalize text-[#4B4C4D]">
                    {title}
                </h3>
            </div>
            <p className="text-sm sm:text-[16px] leading-[140%] text-[#4B4C4D]">
                {description}
            </p>
        </motion.div>
    );
}