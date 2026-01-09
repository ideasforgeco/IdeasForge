"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { CarouselProps } from '../../types';
import { ReactNode, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-fade';

export default function Carousel<T = string>({
    items,
    direction = 'horizontal',
    autoplayDelay = 3000,
    effect = 'slide',
    loop = true,
    speed = 700,
    renderItem,
    containerClassName = '',
    itemClassName = '',
    swiperOptions = {},
}: CarouselProps<T>) {
    const [isInitialized, setIsInitialized] = useState(false);

    const defaultRenderItem = (item: T): ReactNode => {
        if (typeof item === 'string') {
            return <span className={itemClassName}>{item}</span>;
        }
        return item as ReactNode;
    };

    const render = renderItem || defaultRenderItem;

    const handleSwiperInit = (swiper: SwiperType) => {
        // Swiper is fully initialized and centered
        setIsInitialized(true);
    };

    return (
        <>
            {!isInitialized &&
                <span className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] xl:text-[84px] font-extrabold bg-gradient-to-r from-[#FECB32] to-[#F55D22] bg-clip-text text-transparent leading-tight whitespace-nowrap">
                    Web Development
                </span>
            }
            <div className={`${containerClassName} ${!isInitialized ? 'hidden' : 'block'} transition-opacity duration-200`}>
                <Swiper
                    direction={direction}
                    loop={loop}
                    autoplay={{
                        delay: autoplayDelay,
                        disableOnInteraction: false,
                    }}
                    speed={speed}
                    effect={effect === 'fade' ? 'fade' : undefined}
                    fadeEffect={effect === 'fade' ? { crossFade: true } : undefined}
                    modules={effect === 'fade' ? [Autoplay, EffectFade] : [Autoplay]}
                    className="h-full w-full"
                    initialSlide={0}
                    onInit={handleSwiperInit}
                    {...swiperOptions}
                >
                    {items.map((item, index) => (
                        <SwiperSlide key={index} className="flex items-center justify-center">
                            {render(item, index)}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}