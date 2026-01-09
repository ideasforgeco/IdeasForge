"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import navbarData from "../../data/navbar.json";
import { NavbarData } from "../../types";

const typedNavbarData: NavbarData = navbarData;

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const rafRef = useRef<number | null>(null);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            // Cancel previous RAF if it exists
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            // Use requestAnimationFrame for smoother performance
            rafRef.current = requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;

                // Only update if scroll position changed significantly
                if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
                    const heroSection = document.getElementById("hero");
                    if (heroSection) {
                        const heroBottom = heroSection.offsetHeight;
                        setIsVisible(currentScrollY > heroBottom - 100);
                    }

                    lastScrollY.current = currentScrollY;
                }
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const navbarHeight = 50;
            const targetPosition = section.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
            });

            setIsMobileMenuOpen(false);
        }
    };

    const handleCtaClick = () => {
        const bookCallSection = document.getElementById("bookcall");
        if (bookCallSection) {
            bookCallSection.scrollIntoView();
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Sliding Navbar (only visible after hero) */}
            <nav
                className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out will-change-transform ${isVisible ? "translate-y-4 opacity-100" : "-translate-y-[200px] opacity-0 pointer-events-none"
                    }`}
                style={{
                    top: 0,
                }}
            >
                <div
                    className="absolute rounded-[16px] !p-[20px] h-[79px] w-[calc(92vw+4px)] max-w-[1404px] top-[-2px] left-[-2px]"
                    style={{
                        background: "linear-gradient(to right, #B352F4, #EF3AA5)",
                    }}
                ></div>
                <div className="relative">
                    <div
                        className="rounded-[14px] flex items-center justify-between h-[75px] w-[92vw] max-w-[1400px]"
                        style={{
                            background: "linear-gradient(to right, #FCE2B8, #FCDED2)",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            paddingTop: "20px",
                            paddingBottom: "20px",
                        }}
                    >
                        {/* Logo */}
                        <div className="flex items-center">
                            <Image
                                src={typedNavbarData.logo}
                                alt="Company Logo"
                                width={200}
                                height={70}
                                className="cursor-pointer"
                                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            />
                        </div>

                        {/* Desktop Menu */}
                        <ul className="hidden lg:flex items-center gap-8">
                            {typedNavbarData.menuItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => scrollToSection(item.id)}
                                        className={`font-medium text-[16px] leading-[120%] text-[#4B4C4D] hover:underline cursor-pointer transition-all 
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Desktop CTA Button */}
                        <div className="hidden lg:block">
                            <Button
                                text={typedNavbarData.ctaButton}
                                variant="secondary"
                                hasIcon={true}
                                onClick={handleCtaClick}
                            />
                        </div>

                        {/* Mobile Burger Icon */}
                        <button
                            className="lg:hidden cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Image
                                src="/images/icons/burger_icon.svg"
                                alt="Menu"
                                width={32}
                                height={32}
                            />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Slide-in */}
            <div
                className={`fixed top-0 right-0 h-full w-[80%] max-w-[400px] z-50 transform transition-transform duration-300 lg:hidden overflow-hidden bg-white`}
                style={{
                    transform: isMobileMenuOpen ? "translateX(0)" : "translateX(100%)",
                }}
            >
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/assets/hero_bg_1.svg"
                        alt="Menu Background"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="relative z-10 flex flex-col !p-8 gap-8">
                    {/* Close Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMobileMenuOpen(false);
                        }}
                        className="self-end w-[32px] h-[32px] cursor-pointer flex items-center justify-center"
                        type="button"
                    >
                        <Image
                            src="/images/icons/close_icon.svg"
                            alt="Close"
                            width={32}
                            height={32}
                            className="pointer-events-none"
                        />
                    </button>

                    {/* Mobile Menu Items */}
                    <ul className="flex flex-col gap-6">
                        {typedNavbarData.menuItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => scrollToSection(item.id)}
                                    className={`font-medium text-[20px] text-[#4B4C4D] hover:underline cursor-pointer transition-all
                                        }`}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile CTA Button */}
                    <div className="mt-4">
                        <Button
                            text={typedNavbarData.ctaButton}
                            variant="secondary"
                            hasIcon={true}
                            onClick={handleCtaClick}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}