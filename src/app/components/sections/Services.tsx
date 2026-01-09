"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ParticlesBackground from "../ui/ParticlesBackground";
import ServiceCard from "../ui/ServiceCard";
import servicesData from "../../data/services.json";
import { ServicesData } from "../../types";

const typedServicesData: ServicesData = servicesData;

export default function Services() {
    const [activeService, setActiveService] = useState(0);

    const handleServiceClick = (index: number) => {
        setActiveService(index);
    };

    return (
        <section id="services" className="relative max-w-[1920px] min-h-[80vh] bg-white !px-5 sm:!px-10 !pt-10 lg:!pt-15 flex justify-center items-center flex-col gap-25">

            {/* Heading */}
            <div className="text-center">
                {/* Badge */}
                <span className="font-semibold text-lg bg-gradient-to-r from-[#FECB32] to-[#F55D22] text-white text-nowrap text-center !py-2 !px-5 rounded-md shadow-md">
                    OUR OFFERINGS
                </span>
                <h2 className="font-semibold text-3xl sm:text-5xl xl:text-6xl text-[#4B4C4D] !my-6">
                    {typedServicesData.heading}
                </h2>

                {/* Subheading */}
                <p className="text-sm sm:text-lg md:text-[22px] leading-tight capitalize text-[#4B4C4D] text-center">
                    {typedServicesData.subheading}
                </p>
            </div>

            {/* Desktop: Two Columns (≥1240px) */}
            <div className="hidden xl:grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px] w-full">

                {/* Left Column - Services List */}
                <div className="flex flex-col">
                    {typedServicesData.services.map((service, index) => (
                        <div key={service.id}>
                            <button
                                onClick={() => handleServiceClick(index)}
                                className="cursor-pointer w-full flex items-center justify-between !py-6 !px-4 hover:bg-[#00000004]"
                            >
                                <span
                                    className={`text-[32px] sm:text-[40px] font-semibold whitespace-nowrap ${activeService === index
                                        ? "bg-gradient-to-r from-[#B352F4] to-[#EF3AA5] bg-clip-text text-transparent"
                                        : "text-[#4B4C4D]"
                                        }`}
                                >
                                    {service.name}
                                </span>

                                {/* Arrow - Only show when active */}
                                {activeService === index && (
                                    <Image
                                        src="/images/icons/services_arrow_icon.svg"
                                        alt="Active Service"
                                        width={35}
                                        height={35}
                                    />
                                )}
                            </button>

                            {/* Divider - Gradient when active, gray when not */}
                            {index < typedServicesData.services.length && (
                                <div
                                    className={`h-[1px] transition-all ${activeService === index
                                        ? "bg-gradient-to-r from-[#B352F4] to-[#EF3AA5]"
                                        : "bg-gray-300"
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Right Column - Floating Tech Icons & Description */}
                <div className="relative rounded-2xl overflow-hidden flex items-center justify-center min-h-[600px]">
                    {/* Background Image */}
                    <Image
                        src="/images/assets/services_bg.svg"
                        alt="Services Background"
                        fill
                        className="object-cover opacity-50"
                    />

                    {/* Floating Icons */}
                    <ParticlesBackground
                        icons={typedServicesData.services[activeService].icons}
                    />

                    {/* Description Card */}
                    <motion.div
                        key={typedServicesData.services[activeService].description}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                        }}
                        className="absolute bottom-1 left-6 right-6 z-30"
                    >
                        <p className="text-[14px] sm:text-[16px] text-[#4B4C4D] text-center leading-relaxed !p-1 font-semibold">
                            {typedServicesData.services[activeService].description}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Mobile & Tablet: Service Cards (<1240px) */}
            <div className="xl:hidden w-full">
                {/* 2 cards per row on tablet, 1 card per row on mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-15 lg:gap-6 w-full items-stretch">
                    {typedServicesData.services.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            index={index}
                        />
                    ))}
                </div>
            </div>

        </section>
    );
}