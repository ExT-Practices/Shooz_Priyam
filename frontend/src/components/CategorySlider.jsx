import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import col1 from '../assets/images/col-1.png';
import col2 from '../assets/images/col-2.png';
import col3 from '../assets/images/col-3.png';
import col6 from '../assets/images/col-6.png';

const categories = [
  {
    id: 1,
    title: 'Athletic Footwear 8',
    image: col1,
  },
  {
    id: 2,
    title: 'Luxury Leather Shoes 8',
    image: col2,
  },
  {
    id: 3,
    title: 'Sustainable Footwear 8',
    image: col3,
  },
  {
    id: 4,
    title: 'Sandals & Slides 8',
    image: col6,
  },
];

const CategorySlider = () => {
  return (
    <section className="py-16 container mx-auto px-5 lg:px-10">
      <div className="text-center mb-12 flex flex-col items-center">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
          Stylish and comfortable for every season
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
          Boots & Booties
        </h2>
        <p className="text-gray-500 max-w-md text-[15px]">
          Check out our collection of the top New Products that encourage conversion.
        </p>
      </div>

      <Swiper
        spaceBetween={5}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
        className="pb-10"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="group relative overflow-hidden cursor-pointer m-8">
              
              <div className="w-full aspect-square overflow-hidden bg-gray-100">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-[280px]">
                <div className="bg-white text-black font-semibold text-center py-3.5 px-4 text-xl tracking-wide transition-colors duration-300 group-hover:bg-[#ae3f4f] group-hover:text-white">
                  {category.title}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CategorySlider;
