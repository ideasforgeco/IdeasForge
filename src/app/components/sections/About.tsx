"use client";

import Image from "next/image";
import StatsCard from "../ui/StatsCard";
import aboutData from "../../data/about.json";
import heroData from "../../data/hero.json";
import { AboutData } from "../../types";

const typedAboutData: AboutData = aboutData;

export default function About() {
    return (
        <section id="about" className="relative max-w-[1920px] min-h-[80vh] bg-white !px-5 sm:!px-10 xl:!px-45  !pt-10 flex justify-center items-center ">

            <div className="flex flex-col lg:flex-row h-full w-full items-center justify-center ">
                {/* Left side - 50% */}
                <div className="w-full h-[100%] lg:w-[50%] flex flex-col justify-center  gap-7 sm:gap-10 ">
                    {/* Heading */}
                    <h2 className="font-semibold text-3xl sm:text-5xl xl:text-6xl text-[#4B4C4D] text-center lg:text-left">
                        {typedAboutData.heading.part1}{" "}
                        <span className="bg-gradient-to-r from-[#B352F4] to-[#EF3AA5] bg-clip-text text-transparent">
                            {typedAboutData.heading.part2}{" "}
                            {typedAboutData.heading.part3}
                        </span>
                    </h2>

                    {/* Description */}
                    <p className="text-sm sm:text-lg md:text-[22px] leading-tight capitalize text-[#4B4C4D] text-center lg:text-left">
                        {typedAboutData.description}
                    </p>

                    {/* Cards */}
                    <div className="flex gap-3 sm:gap-6 items-center justify-center lg:justify-start">
                        <StatsCard
                            value={`${heroData.stats.projects}+`}
                            label="Projects Completed"
                        />
                        <StatsCard
                            value={`${heroData.stats.satisfaction}%`}
                            label="Client Satisfaction"
                        />
                    </div>
                </div>

                {/* Right side - 50% */}
                <div className="w-full h-[100%]  lg:w-[50%] flex items-center justify-center">
                    <Image
                        src={typedAboutData.gif}
                        alt="Broken Bulb Animation"
                        width={800}
                        height={800}
                        className="w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[600px] object-cover"
                        unoptimized
                    />
                </div>

            </div>

        </section>
    );
}