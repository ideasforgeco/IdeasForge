"use client";

import ProcessCard from "../ui/ProcessCard";
import processData from "../../data/process.json";
import { ProcessData } from "../../types";

const typedProcessData: ProcessData = processData;

export default function Process() {
    return (
        <section id="process" className="relative max-w-[1920px] min-h-[80vh]  bg-white !px-5 sm:!px-10 !pt-20 xl:!pt-10 flex justify-center items-center flex-col gap-6 ">

            {/* Heading */}
            <h2 className="font-semibold text-3xl sm:text-5xl xl:text-6xl text-[#4B4C4D] text-center ">
                {typedProcessData.heading.part1}{" "}
                <span className="bg-gradient-to-r from-[#B352F4] to-[#EF3AA5] bg-clip-text text-transparent">
                    {typedProcessData.heading.part2}
                </span>
            </h2>

            {/* Subheading */}
            <p className="text-sm sm:text-lg md:text-[22px] leading-tight capitalize text-[#4B4C4D]  text-center">
                {typedProcessData.subheading}
            </p>

            {/* Cards */}
            <div className="flex flex-col xl:flex-row gap-4 justify-center items-stretch justify-items-stretch !mt-5 xl:!mt-10">
                {typedProcessData.cards.map((card, index) => (
                    <ProcessCard
                        key={index}
                        index={index}
                        icon={card.icon}
                        title={card.title}
                        description={card.description}
                    />
                ))}
            </div>

        </section>
    );
}