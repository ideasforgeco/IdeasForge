"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ParticlesBackgroundProps {
    children?: React.ReactNode;
    icons: string[];
}

interface IconPosition {
    id: string;
    icon: string;
    x: number;
    y: number;
    size: number;
    rotation: number;
}

// Function to check if two positions overlap
const isOverlapping = (
    x1: number,
    y1: number,
    size1: number,
    x2: number,
    y2: number,
    size2: number,
    padding: number = 10
) => {
    // Calculate the distance between centers
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    // Calculate minimum safe distance based on icon sizes
    // Convert pixel sizes to approximate percentage (assuming ~600px container)
    const radius1 = (size1 / 600) * 100 / 2;
    const radius2 = (size2 / 600) * 100 / 2;
    const minDistance = radius1 + radius2 + padding;

    return distance < minDistance;
};

export default function ParticlesBackground({ children, icons }: ParticlesBackgroundProps) {
    const [iconPositions, setIconPositions] = useState<IconPosition[]>([]);

    // CUSTOMIZE THESE VALUES TO CHANGE THE AREA
    const AREA_LEFT = 10;   // Left boundary (percentage) - smaller = more left
    const AREA_RIGHT = 90;  // Right boundary (percentage) - bigger = more right
    const AREA_TOP = 10;    // Top boundary (percentage) - smaller = higher
    const AREA_BOTTOM = 90; // Bottom boundary (percentage) - bigger = lower

    useEffect(() => {
        // Generate non-overlapping positions
        const positions: IconPosition[] = [];
        const maxAttempts = 100; // Prevent infinite loops

        icons.forEach((icon) => {
            let x = 0;
            let y = 0;
            const size = 60 + Math.random() * 20;
            let attempts = 0;
            let overlapping = true;

            // Keep trying until we find a non-overlapping position
            while (overlapping && attempts < maxAttempts) {
                x = Math.random() * (AREA_RIGHT - AREA_LEFT) + AREA_LEFT;
                y = Math.random() * (AREA_BOTTOM - AREA_TOP) + AREA_TOP;

                // Check if this position overlaps with existing icons
                overlapping = positions.some(pos =>
                    isOverlapping(x, y, size, pos.x, pos.y, pos.size)
                );

                attempts++;
            }

            positions.push({
                id: `${icon}-${Math.random()}`,
                icon: icon,
                x: x,
                y: y,
                size: size,
                rotation: Math.random() * 0,
            });
        });

        setIconPositions(positions);
    }, [icons]);

    return (
        <div className="relative w-[400px] h-[400px] mx-auto flex items-center justify-center !mt-[-50px]">

            {/* Icon Container - Centered */}
            <div className="relative w-full h-full">

                {/* Popping Icons */}
                {iconPositions.map((position, index) => (
                    <motion.div
                        key={position.id}
                        className="absolute z-10"
                        style={{
                            left: `${position.x}%`,
                            top: `${position.y}%`,
                            transform: 'translate(-50%, -50%)',
                            width: `${position.size}px`,
                            height: `${position.size}px`,
                        }}
                        initial={{
                            scale: 0,
                            rotate: position.rotation,
                            opacity: 0,
                        }}
                        animate={{
                            scale: 1,
                            rotate: position.rotation,
                            opacity: 1,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 15,
                            delay: index * 0.1,
                        }}
                    >
                        <Image
                            src={position.icon}
                            alt="Tech Icon"
                            width={position.size}
                            height={position.size}
                            className="w-full h-full object-contain"
                        />
                    </motion.div>
                ))}

                {/* Children */}
                {children}
            </div>
        </div>
    );
}