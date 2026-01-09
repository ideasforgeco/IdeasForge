"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ProjectCard from "../ui/ProjectCard";
import projectsData from "../../data/projects.json";
import { ProjectsData } from "../../types";

const typedProjectsData: ProjectsData = projectsData;

const CARD_WIDTH = 550;
const CARD_SPACING = 50;

export default function Projects() {
    const [currentIndex, setCurrentIndex] = useState(1);
    const projects = typedProjectsData.projects;

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    };

    // Calculate x position for scrolling effect
    const calculateX = (index: number) => {
        const position = index - currentIndex;
        return position * (CARD_WIDTH + CARD_SPACING);
    };

    // Calculate scale based on distance from center
    const calculateScale = (index: number) => {
        const distance = Math.abs(index - currentIndex);
        if (distance === 0) return 1;
        if (distance === 1) return 0.8;
        return 0.6;
    };

    // Calculate opacity
    const calculateOpacity = (index: number) => {
        const distance = Math.abs(index - currentIndex);
        if (distance === 0) return 1;
        if (distance === 1) return 0.7;
        if (distance === 2) return 0.4;
        return 0;
    };

    return (
        <section
            id="projects"
            className="relative max-w-[1920px] min-h-[60vh] bg-white  !px-2 sm:!px-10 !pt-25 xl:!pt-10  flex justify-center items-center flex-col gap-6"
        >
            {/* Heading */}
            <h2 className="font-semibold text-3xl sm:text-5xl xl:text-6xl text-[#4B4C4D] text-center">
                {typedProjectsData.heading.part1}{" "}
                <span className="bg-gradient-to-r from-[#B352F4] to-[#EF3AA5] bg-clip-text text-transparent">
                    {typedProjectsData.heading.part2}
                </span>
            </h2>

            {/* Subheading */}
            <p className="text-sm sm:text-lg md:text-[22px] leading-tight capitalize text-[#4B4C4D] text-center">
                {typedProjectsData.subheading}
            </p>

            {/* Carousel Container */}
            <div className="relative w-full  flex items-center justify-center">
                {/* Left Arrow */}
                <button
                    onClick={handlePrevious}
                    className="absolute left-0 z-40 hover:scale-105 cursor-pointer"
                >
                    <Image
                        src="/images/icons/arrow_icon.svg"
                        alt="Previous"
                        width={24}
                        height={24}
                        className="rotate-180"
                    />
                </button>

                {/* Cards Container */}
                <div className="relative w-full h-[650px] flex items-center justify-center overflow-hidden">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="absolute"
                            animate={{
                                x: calculateX(index),
                                scale: calculateScale(index),
                                opacity: calculateOpacity(index),
                                zIndex: currentIndex === index ? 30 : 10,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                bounce: 0.4,
                            }}
                        >
                            <ProjectCard
                                name={project.name}
                                description={project.description}
                                image={project.image}
                                tags={project.tags}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={handleNext}
                    className="absolute right-0 z-40 hover:scale-105 cursor-pointer"
                >
                    <Image
                        src="/images/icons/arrow_icon.svg"
                        alt="Next"
                        width={24}
                        height={24}
                    />
                </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex gap-2">
                {projects.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                            ? "bg-gradient-to-r from-[#B352F4] to-[#EF3AA5] w-8"
                            : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}