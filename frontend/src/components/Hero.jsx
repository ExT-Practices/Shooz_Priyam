import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import banner1 from '../assets/images/bann-1.png';
import banner2 from '../assets/images/bann-2.png';
import banner3 from '../assets/images/bann-3.png';

const slides = [
  {
    id: 1,
    image: banner1,
    subtitle: "STEP INTO STYLE",
    title: "Discover The Latest\nTrends In Footwear",
    description: "From classic sneakers to trendy boots, our\ncollection has something for everyone.",
    position: "right",
  },
  {
    id: 2,
    image: banner2,
    subtitle: "ELEVATE YOUR LOOK",
    title: "Find The Perfect Pair Of Shoes To Complete.",
    description: "Explore our wide range of styles, colors, and\nmaterials to find the perfect shoes for any occasion.",
    position: "right",
  },
  {
    id: 3,
    image: banner3,
    subtitle: "COMFORT MEETS FASHION",
    title: "Discover Shoes That Look Great And Feel Even Better.",
    description: "Our collection features comfortable and stylish footwear\ndesigned to keep your feet happy all day long.",
    position: "left",
  }
];

const Hero = () => {
  return (
    <div className="relative w-full flex-1 min-h-[600px] lg:min-h-[800px] hero-swiper-container overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={700}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="h-full">
            <div
              className="relative w-full h-full min-h-[600px] lg:min-h-[750px]"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/10"></div>
              <div className={`absolute inset-0 z-20 container mx-auto px-8 lg:px-[70px] flex items-center ${slide.position === 'right' ? 'justify-end' : 'justify-start'
                }`}>
                <div className="max-w-[600px] text-white animate-fade-in-up">
                  <h5 className="text-[14px] font-bold tracking-[0.2em] uppercase mb-4 text-gray-200">
                    {slide.subtitle}
                  </h5>
                  <h1 className="text-[42px] lg:text-[60px] leading-[1.1] font-bold mb-6 whitespace-pre-line">
                    {slide.title}
                  </h1>
                  <p className="text-[18px] lg:text-[18px] text-gray-200 mb-10 leading-relaxed whitespace-pre-line">
                    {slide.description}
                  </p>
                  <button className="bg-surface-raised hover:bg-surface-strong text-white font-semibold text-[14px] px-10 py-8 tracking-wide transition-colors duration-fast flex items-center gap-3">
                    SHOP NOW <ArrowRight size={18} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
