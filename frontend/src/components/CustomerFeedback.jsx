import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import logo1 from '../assets/images/text-logo-1.png';
import logo2 from '../assets/images/text-logo-2.png';
import logo3 from '../assets/images/text-logo-3.png';
import logo5 from '../assets/images/text-logo-5.png';
import logo6 from '../assets/images/text-logo-6.png';
import logo7 from '../assets/images/text-logo-7.png';
import logo8 from '../assets/images/text-logo-8.png';
import logo9 from '../assets/images/text-logo-9.png';
import logo10 from '../assets/images/text-logo-10.png';
import logo11 from '../assets/images/text-logo-11.png';
import logo12 from '../assets/images/text-logo-12.png';
import logo13 from '../assets/images/text-logo-13.png';

const logos = [
  logo1, logo2, logo3, logo5, logo6, logo7, 
  logo8, logo9, logo10, logo11, logo12, logo13
];

const CustomerFeedback = () => {
  
  const groupedLogos = [];
  for (let i = 0; i < logos.length; i += 2) {
    groupedLogos.push([logos[i], logos[i + 1]]);
  }

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-8 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-[40px] font-bold text-gray-900 mb-5">
            Customer Feedback Highlights
          </h2>
          <p className="text-gray-500 text-sm md:text-base mx-auto">
            Laoreet ridiculus congue magna malesuada phasellus condimentum taciti mus primis.
          </p>
        </div>

        <Swiper
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          className="w-full"
        >
          {groupedLogos.map((pair, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-center py-6 group cursor-pointer transition-all duration-300">
                  <img 
                    src={pair[0]} 
                    alt={`Feedback Logo ${idx * 2 + 1}`} 
                    className="h-auto object-contain transition-all duration-300 group-hover:scale-110 opacity-50 group-hover:opacity-100 mix-blend-multiply grayscale group-hover:grayscale-0"
                  />
                </div>
                {pair[1] && (
                  <div className="flex items-center justify-center py-6 group cursor-pointer transition-all duration-300">
                    <img 
                      src={pair[1]} 
                      alt={`Feedback Logo ${idx * 2 + 2}`} 
                      className="h-auto object-contain transition-all duration-300 group-hover:scale-110 opacity-50 group-hover:opacity-100 mix-blend-multiply grayscale group-hover:grayscale-0"
                    />
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CustomerFeedback;
