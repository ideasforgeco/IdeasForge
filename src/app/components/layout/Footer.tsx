"use client";

import Image from "next/image";
import Link from "next/link";
import footerData from "../../data/footer.json";
import { FooterData } from "../../types";

const typedFooterData: FooterData = footerData;

export default function Footer() {
    return (
        <footer className="!px-5 sm:!px-10 !pt-30 !pb-10 max-w-[1920px] flex justify-center items-center">
            <div
                className="rounded-[40px] !p-10  shadow-md w-full"
                style={{
                    border: '1px solid transparent',
                    borderBottom: '6px solid transparent',
                    backgroundImage: 'linear-gradient(#FEEEE3, #F9E7EF), linear-gradient(to right, #FECB32, #F55D22)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                }}
            >
                {/* First Floor - Heading & Logo */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 !mb-8">
                    <h2 className="font-semibold text-3xl sm:text-5xl xl:text-6xl  text-[#4B4C4D]">
                        {typedFooterData.heading.line1}<br />
                        {typedFooterData.heading.line2}
                    </h2>
                    <Image
                        src={typedFooterData.logo}
                        alt="Company Logo"
                        width={85}
                        height={134}
                        className="hidden sm:block"
                    />
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gray-300 !mb-8"></div>

                {/* Second Floor - Contact & Social */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 !mb-8">
                    {/* Contact Info */}
                    <div className="flex flex-col sm:flex-row gap-8">
                        {/* Email */}
                        <div>
                            <h3 className="font-semibold text-[20px] leading-[120%] tracking-[-0.02em] text-[#044340CC] !mb-2">
                                {typedFooterData.contact.email.label}
                            </h3>
                            <p className="text-[16px] text-[#4B4C4D]">
                                {typedFooterData.contact.email.value}
                            </p>
                        </div>

                        {/* Phone */}
                        {/* <div>
                            <h3 className="font-semibold text-[20px] leading-[120%] tracking-[-0.02em] text-[#044340CC] !mb-2">
                                {typedFooterData.contact.phone.label}
                            </h3>
                            <p className="text-[16px] text-[#4B4C4D]">
                                {typedFooterData.contact.phone.value}
                            </p>
                        </div> */}
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4">
                        {typedFooterData.social.map((social, index) => (
                            <Link key={index} href={social.url} target="_blank" rel="noopener noreferrer">
                                <Image
                                    src={social.icon}
                                    alt={social.name}
                                    width={32}
                                    height={32}
                                    className="hover:opacity-70 transition-opacity cursor-pointer"
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gray-300 !mb-8"></div>

                {/* Third Floor - Services & Copyright */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                    {/* Services */}
                    <div>
                        <h3 className="font-semibold text-[20px] leading-[120%] tracking-[-0.02em] text-[#044340CC] !mb-4">
                            {typedFooterData.servicesHeading}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {typedFooterData.services.map((service, index) => (
                                <span key={index} className="text-[16px] text-[#4B4C4D]">
                                    {service}
                                    {index < typedFooterData.services.length - 1 && ","}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Copyright */}
                    <p className="text-[16px] text-[#4B4C4D]">
                        {typedFooterData.copyright}
                    </p>
                </div>
            </div>

        </footer>
    );
}