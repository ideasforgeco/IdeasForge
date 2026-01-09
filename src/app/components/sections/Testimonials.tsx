"use client";

import { motion } from "framer-motion";
import TestimonialCard from "../ui/TestimonialCard";
import testimonialsData from "../../data/testimonials.json";
import { TestimonialsData } from "../../types";
import Button from "../ui/Button";

const typedTestimonialsData: TestimonialsData = testimonialsData;

export default function Testimonials() {
  const row = typedTestimonialsData.testimonials;

  const handleStartProject = () => {
    const bookCallSection = document.getElementById("bookcall");
    if (bookCallSection) {
      bookCallSection.scrollIntoView();
    }
  };

  return (
    <section
      id="testimonials"
      className="relative max-w-[1920px] min-h-[60vh] bg-white !mx-5 sm:!mx-10 !px-5 sm:!px-10 !py-10 !mt-25 lg:!mt-30 xl:!mt-35 shadow-md rounded-2xl"
      style={{ backgroundColor: "#9926B5" }}
    >
      {/* Header Section */}
      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 !mb-16">
        {/* Left: Badge, Heading, Subheading */}
        <div className="flex flex-col gap-4 max-w-2xl">
          {/* Heading */}
          <h2 className="font-semibold text-3xl sm:text-5xl xl:text-6xl text-white">
            {typedTestimonialsData.heading}
          </h2>

          {/* Subheading */}
          <p className="text-sm sm:text-lg md:text-[22px] leading-tight capitalize text-white/90 ">
            {typedTestimonialsData.subheading}
          </p>
        </div>

        {/* Right: Book a Call Button */}

        <Button
          text={"Book a Call"}
          variant="primary"
          hasIcon={false}
          onClick={handleStartProject}
        />
      </div>

      {/* Scrolling Testimonials */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 5,
            ease: "linear",
          }}
        >
          {[...row, ...row].map((testimonial, index) => (
            <TestimonialCard
              key={`testimonial-${index}`}
              clientName={testimonial.clientName}
              testimonial={testimonial.testimonial}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
