import React from 'react';
import img1 from '../assets/images/five-col-banner-1.png';
import img2 from '../assets/images/five-col-banner-2.png';
import img3 from '../assets/images/five-col-banner-3.png';
import img4 from '../assets/images/five-col-banner-4.png';
import img5 from '../assets/images/five-col-banner-5.png';

const banners = [
  {
    id: 1,
    image: img1,
    category: 'COMFORT MEETS FASHION',
    title: 'Discover shoes\nthat look great',
    colSpan: 'md:col-span-2'
  },
  {
    id: 2,
    image: img2,
    category: 'ELEVATE YOUR LOOK',
    title: 'Find the perfect pair of\nshoes',
    colSpan: 'md:col-span-2'
  },
  {
    id: 3,
    image: img3,
    category: 'STEP INTO STYLE',
    title: 'The latest trends in\nfootwear',
    colSpan: 'md:col-span-2'
  },
  {
    id: 4,
    image: img4,
    category: 'SHOP BY BRAND',
    title: 'Find your favorite\nbrands and styles',
    colSpan: 'md:col-span-3'
  },
  {
    id: 5,
    image: img5,
    category: 'SALE AND CLEARANCE',
    title: 'Shop our latest deals\nand discounts',
    colSpan: 'md:col-span-3'
  }
];

const FiveColBanner = () => {
  return (
    <section className="bg-[#303030] py-16 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-gray-400 text-sm font-bold tracking-[0.2em] uppercase mb-7">Fashion Sneakers</p>
          <h2 className="text-white text-2xl md:text-5xl font-bold mb-7">Timeless styles for everyday wear</h2>
          <p className="text-gray-300 text-xl max-w-xl mx-auto">
            High-performance footwear for sports and workouts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {banners.map((banner) => (
            <div 
              key={banner.id} 
              className={`relative overflow-hidden group cursor-pointer rounded ${banner.colSpan} h-[300px] md:h-[350px] lg:h-[400px] mx-7 my-5`}
            >
              <img 
                src={banner.image} 
                alt={banner.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-10">
                <p className="text-white text-[10px] sm:text-sm font-bold tracking-[0.15em] uppercase mb-5">
                  {banner.category}
                </p>
                <h3 className="text-white text-3xl sm:text-2xl md:text-[30px] font-bold leading-tight mb-6 whitespace-pre-line">
                  {banner.title}
                </h3>
                <div>
                  <a 
                    href="#" 
                    className="text-white text-sm sm:text-md font-bold uppercase border-b-2 border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-colors"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FiveColBanner;
