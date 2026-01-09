"use client";

import FAQItem from "../ui/FAQItem";
import faqData from "../../data/faq.json";
import { FAQData } from "../../types";

const typedFAQData: FAQData = faqData;

export default function FAQ() {
    return (
        <section id="faq" className="relative max-w-[1920px] min-h-[65vh] bg-white !px-5 sm:!px-10 !pt-25 sm:!pt-30 lg:!pt-35 xl:!pt-40">

            {/* Content */}
            <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-16 w-full">

                {/* Left Column - Thinner */}
                <div className="xl:col-span-4 flex flex-col gap-10">
                    {/* Badge */}
                    <span className="font-semibold bg-gradient-to-r from-[#FECB32] to-[#F55D22] text-white text-nowrap text-center !py-2 !px-5 rounded-md w-min shadow-md">
                        {typedFAQData.badge}
                    </span>

                    {/* Heading */}
                    <h2 className="font-semibold text-3xl sm:text-5xl xl:text-6xl">
                        <span className="text-[#4B4C4D]">
                            {typedFAQData.heading.line1}
                        </span>
                        <br />
                        <span className="text-[#4B4C4D]">
                            {typedFAQData.heading.line2}
                        </span>
                    </h2>

                    {/* Subheading */}
                    <p className="text-sm sm:text-lg md:text-[22px] leading-tight capitalize text-[#4B4C4D]">
                        {typedFAQData.subheading}
                    </p>
                </div>

                {/* Right Column - FAQs */}
                <div className="xl:col-span-8 flex flex-col gap-4">
                    {typedFAQData.faqs.map((faq) => (
                        <FAQItem
                            key={faq.id}
                            question={faq.question}
                            answer={faq.answer}
                        />
                    ))}
                </div>
            </div>

        </section>
    );
}