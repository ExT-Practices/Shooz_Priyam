import React from 'react';
import { Link } from 'react-router-dom';
import bannerImg from '../assets/images/bann-2.png';

const PromoBanner = () => {
  return (
    <section className="w-full flex flex-col">
      
      <div 
        className="w-full relative bg-cover bg-center bg-no-repeat min-h-[500px] lg:min-h-[650px] flex items-center px-5 md:px-10 lg:px-20"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="flex flex-col item-center lg:items-end text-center lg:text-right ml-auto lg:mr-0 xl:mr-30 mt-10 md:mt-0">
          <p className="text-sm tracking-[0.25em] uppercase text-black mb-4">
            Comfort Meets Fashion
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-5xl text-black leading-tight mb-6">
            Discover shoes that look great <br className="hidden lg:block" /> and feel even better
          </h2>
          <p className="text-gray-800 text-xl mb-8">
            Our collection features comfortable and stylish footwear designed to keep your feet happy all day long.
          </p>
          <Link to="/shop" className="w-fit mx-auto lg:mx-0 bg-[#b44858] text-white px-10 py-3 text-sm font-bold tracking-wider hover:bg-black transition-colors duration-300 flex items-center gap-2">
            SHOP NOW <span className="text-xl font-bold">&rarr;</span>
          </Link>
        </div>
      </div>

      
      <div className="w-full bg-gradient-to-r from-[#927829] via-[#c6552a] to-[#d63a32] text-white py-8 relative">
        <div className="overflow-hidden relative flex">
          
          {[1, 2].map((group) => (
            <div key={group} className="flex text-2xl animate-marquee whitespace-nowrap min-w-full shrink-0 items-center justify-around gap-10 px-10">
              <span className="flex items-center gap-10 shrink-0">
                <span className="w-7 h-7 rounded-full bg-yellow-400"></span>
                Buy one pair of shoes, get the second pair 50% off. Use code BOGO50
              </span>
              <span className="flex items-center gap-10 shrink-0">
                <span className="w-7 h-7 rounded-full bg-yellow-400"></span>
                Enjoy 20% off your entire order with the code SHOEFRESH20
              </span>
              <span className="flex items-center gap-10 shrink-0">
                <span className="w-7 h-7 rounded-full bg-yellow-400"></span>
                Get 15% off your first purchase when you sign up for our newsletter
              </span>
            </div>
          ))}
        </div>
      </div>


    </section>
  );
};

export default PromoBanner;
