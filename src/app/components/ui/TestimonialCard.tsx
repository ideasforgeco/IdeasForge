import React from "react";

interface TestimonialCardProps {
    clientName: string;
    testimonial: string;
}

export default function TestimonialCard({
    clientName,
    testimonial,
}: TestimonialCardProps) {
    return (
        <div className="bg-white rounded-xl !p-5 shadow-xl min-w-[350px] max-w-[400px] h-auto">
            {/* Client Name & Company */}
            <div className="!mb-2">
                <h4 className="font-bold text-[18px] text-[#4B4C4D]">{clientName}</h4>
            </div>

            {/* Testimonial Text - Ellipsis after 4 lines */}
            <p className="text-[14px] sm:text-[16px] text-[#4B4C4D]  line-clamp-3">
                {testimonial}
            </p>
        </div>
    );
}