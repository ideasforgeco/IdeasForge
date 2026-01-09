"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Carousel from "../ui/Carousel";
import Button from "../ui/Button";
import heroData from "../../data/hero.json";
import navbarData from "../../data/navbar.json";
import { HeroData, NavbarData } from "../../types";

const typedHeroData: HeroData = heroData;
const typedNavbarData: NavbarData = navbarData;

export default function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    projects: 0,
    industries: 0,
    satisfaction: 0,
  });

  const handleStartProject = () => {
    const bookCallSection = document.getElementById("bookcall");
    if (bookCallSection) {
      bookCallSection.scrollIntoView();
    }
  };

  const handleSeeWork = () => {
    const workSection = document.getElementById("projects");
    if (workSection) {
      workSection.scrollIntoView();
    }
  };

  const handleCtaClick = () => {
    const bookCallSection = document.getElementById("bookcall");
    if (bookCallSection) {
      bookCallSection.scrollIntoView();
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = 150;
      const targetPosition = section.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
      });
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds animation
    const steps = 60; // 60 steps for smooth animation
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStats({
        projects: Math.floor(progress * typedHeroData.stats.projects),
        industries: Math.floor(progress * typedHeroData.stats.industries),
        satisfaction: Math.floor(progress * typedHeroData.stats.satisfaction),
      });

      if (currentStep >= steps) {
        setStats({
          projects: typedHeroData.stats.projects,
          industries: typedHeroData.stats.industries,
          satisfaction: typedHeroData.stats.satisfaction,
        });
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative max-w-[1920px] min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/assets/hero_bg_2.svg"
          alt="Hero Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Navbar in Hero - Not fixed */}
      <nav className="relative top-8 z-50 flex justify-center">
        <div className="relative">
          <div
            className="rounded-[14px] flex items-center justify-between h-[70px] w-[92vw] max-w-[1400px] shadow-sm"
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
                    className="font-medium text-[16px] leading-[120%] text-[#4B4C4D] hover:underline cursor-pointer transition-all"
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
              onClick={() => setIsMobileMenuOpen(true)}
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

      {/* Content */}
      <div className="absolute top-[130px] left-0 right-0 bottom-0 z-10 flex flex-col items-center justify-center !px-10 gap-10">
        <div>
          {/* Main Heading */}
          <h1 className="text-center">
            <span className="block text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] xl:text-[84px] font-extrabold text-[#4B4C4D] leading-tight">
              {typedHeroData.heading.line1}
            </span>
          </h1>

          {/* "Through" + Carousel */}
          <div className="flex flex-wrap flex-col items-center xl:flex-row  xl:items-baseline justify-center gap-4 sm:gap-6">
            <span className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] xl:text-[84px] font-extrabold text-[#4B4C4D] leading-tight">
              {typedHeroData.heading.line2}
            </span>

            {/* Carousel */}
            <Carousel
              items={typedHeroData.carouselTexts}
              direction="vertical"
              autoplayDelay={2000}
              effect="slide"
              containerClassName="h-[60px] sm:h-[75px] md:h-[90px] lg:h-[105px] xl:h-[120px] w-auto overflow-hidden flex items-center text-center xl:text-left"
              renderItem={(text) => (
                <span className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] xl:text-[84px] font-extrabold bg-gradient-to-r from-[#FECB32] to-[#F55D22] bg-clip-text text-transparent leading-tight whitespace-nowrap">
                  {text}
                </span>
              )}
            />
          </div>
        </div>

        {/* Subheading */}
        <p className="text-center text-[#4B4C4D] font-medium text-[18px] sm:text-[20px] md:text-[24px] lg:text-[26px] leading-[1.08] mt-8 px-4 whitespace-normal">
          {typedHeroData.subheading}
        </p>

        {/* Buttons */}
        <div className="my-12 flex flex-wrap gap-6 justify-center">
          <Button
            text={typedHeroData.buttons.primary}
            variant="primary"
            hasIcon={false}
            onClick={handleStartProject}
          />
          <Button
            text={typedHeroData.buttons.secondary}
            variant="accentOutline"
            hasIcon={false}
            onClick={handleSeeWork}
          />
        </div>

        {/* Stats Subheading */}
        <p className="text-center text-[#757575] font-medium text-[13px] sm:text-[15px] md:text-[17px] lg:text-[20px] leading-[1.08] mt-6 px-4 whitespace-nowrap">
          <span className="inline-block text-center">{stats.projects}</span>+
          Projects |{" "}
          <span className="inline-block w-[15px] sm:w-[25px] text-center">
            {stats.industries}
          </span>
          + Industries |{" "}
          <span className="inline-block w-[20px] sm:w-[30px] text-center">
            {stats.satisfaction}
          </span>
          % Client Satisfaction
        </p>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Slide-in */}
      <div
        className="fixed top-0 right-0 h-full w-[80%] max-w-[400px] z-50 lg:hidden overflow-hidden bg-white transition-transform duration-300 ease-in-out"
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
            onClick={() => setIsMobileMenuOpen(false)}
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
                  className="font-medium text-[20px] text-[#4B4C4D] hover:underline cursor-pointer transition-all"
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
    </section>
  );
}