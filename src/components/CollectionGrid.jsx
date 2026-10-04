import React from 'react';
import img1 from '../assets/images/grid-three-1.png';
import img2 from '../assets/images/grid-three-2.png';
import img3 from '../assets/images/grid-three-3.png';

const collections = [
  {
    id: 1,
    subtitle: 'TRENDING',
    title: 'Men\nCollections',
    image: img1,
    link: '#'
  },
  {
    id: 2,
    subtitle: 'LATEST',
    title: 'Women\nCollections',
    image: img2,
    link: '#'
  },
  {
    id: 3,
    subtitle: 'COMFORT',
    title: 'Kid\nCollections',
    image: img3,
    link: '#'
  }
];

const CollectionGrid = () => {
  return (
    <section className="pt-10 lg:pt-5 pb-10 md:pb-10 container mx-auto px-5.5 lg:px-[10px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8">
        {collections.map((item) => (
          <div key={item.id} className="relative group overflow-hidden rounded-md h-[300px] lg:h-[350px] bg-gray-100">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
            <div className="relative z-10 p-8 lg:p-12 h-full flex flex-col justify-center items-start pointer-events-none">
              <span className="text-[12px] font-bold tracking-[0.15em] uppercase mb-4 text-gray-900">
                {item.subtitle}
              </span>
              <h3 className="text-3xl lg:text-[32px] leading-[1.2] font-bold mb-6 text-gray-900 whitespace-pre-line">
                {item.title}
              </h3>
              <a 
                href={item.link} 
                className="text-[#f15f6f] hover:text-[#ae3f4f] text-[14px] font-semibold tracking-wide border-b border-[#f15f6f] hover:border-[#ae3f4f] pb-1 transition-colors duration-300 pointer-events-auto cursor-pointer"
              >
                SHOP NOW
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionGrid;
