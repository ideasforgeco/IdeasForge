"use client";

import Image from "next/image";
import { ButtonProps } from "../../types";

const variantStyles = {
    primary: {
        background: 'bg-gradient-to-r from-[#FECB32] to-[#F55D22]',
        border: 'border-2 border-transparent bg-gradient-to-r from-[#FECB32] to-[#F55D22]',
        text: 'text-white',
        borderGradient: '',
        hover: 'hover:opacity-90'
    },
    secondary: {
        background: 'bg-transparent',
        border: 'border-2 border-transparent',
        borderGradient: 'before:absolute before:inset-0 before:rounded-[10px] before:p-[2px] before:bg-gradient-to-r before:from-[#FECB32] before:to-[#F55D22] before:-z-10 before:m-[-2px]',
        text: 'text-[#4B4C4D]',
        hover: 'hover:bg-gray-50'
    },
    accent: {
        background: 'bg-gradient-to-r from-[#B352F4] to-[#EF3AA5]',
        border: 'border-2 border-transparent bg-gradient-to-r from-[#B352F4] to-[#EF3AA5]',
        text: 'text-white',
        borderGradient: '',
        hover: 'hover:opacity-90'
    },
    accentOutline: {
        background: 'bg-transparent',
        border: 'border-2 border-transparent',
        borderGradient: 'before:absolute before:inset-0 before:rounded-[10px] before:p-[2px] before:bg-gradient-to-r before:from-[#B352F4] before:to-[#EF3AA5] before:-z-10 before:m-[-2px]',
        text: 'text-[#4B4C4D]',
        hover: 'hover:bg-gray-50'
    }
};

export default function Button({
    text,
    variant,
    hasIcon = false,
    onClick,
    className = ''
}: ButtonProps) {
    const styles = variantStyles[variant];
    const isOutline = variant === 'secondary' || variant === 'accentOutline';

    return (
        <button
            onClick={onClick}
            className={`
        relative
        cursor-pointer
   ${isOutline && 'borderGradient' in styles ? styles.borderGradient : ''}
        ${isOutline ? 'bg-white' : styles.background}
        ${styles.text}
        ${styles.hover}
        rounded-[9px]
        font-bold
        transition-all
        duration-200
        flex
        items-center
        justify-center
        gap-[10px]
        min-w-[200px] sm:min-w-[230px] lg:min-w-[260px]
        h-[48px]
        ${hasIcon ? '!px-[16px] sm:px-[20px] lg:px-[24px]' : 'px-[20px] sm:px-[24px] lg:px-[28px]'}
        py-[12px] sm:py-[14px] lg:py-[16px]
        text-[16px]
        leading-[28px]
        whitespace-nowrap
        shadow-md
        ${className}
      `}
        >
            <span className="relative z-10 text-center">{text}</span>
            {hasIcon && (
                <Image
                    src="/images/icons/arrow_icon.svg"
                    alt="Arrow"
                    width={20}
                    height={20}
                    className="relative z-10 flex-shrink-0"
                />
            )}
        </button>
    );
}