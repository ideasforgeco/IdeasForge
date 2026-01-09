import { ReactNode } from "react";
import { SwiperOptions } from "swiper/types";

export type CarouselDirection = "vertical" | "horizontal";
export type CarouselEffect = "fade" | "slide";

export interface CarouselProps<T = string> {
  items: T[];
  direction?: CarouselDirection;
  autoplayDelay?: number;
  effect?: CarouselEffect;
  loop?: boolean;
  speed?: number;
  renderItem?: (item: T, index: number) => ReactNode;
  containerClassName?: string;
  itemClassName?: string;
  swiperOptions?: SwiperOptions;
}
