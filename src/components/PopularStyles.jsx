import React from 'react';
import videoPic from '../assets/images/video-pic.png';

const PopularStyles = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto py-20 px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-bold tracking-[0.2em] uppercase mb-6">
            OUR MOST POPULAR STYLES
          </p>
          <h2 className="text-4xl md:text-[50px] leading-tight font-bold text-gray-900 mb-8">
            Save big on shoes <br className="hidden md:block" /> from last season
          </h2>
          <p className="text-gray-600 text-sm md:text-[16px] leading-relaxed mb-7.5">
            Morbi natoque id finibus natoque sapien turpis elementum maximus. Sociosqu auctor a urna consequat laoreet nisi accumsan magna. Adipiscing vulputate nec euismod, a aliquam enim. Mi facilisi ex est habitant lacus sagittis vitae.
          </p>
          <p className="text-gray-600 text-sm md:text-[16px] leading-relaxed mb-10">
            Molestie dolor mus vitae penatibus sed lectus convallis ut neque. Leo elementum euismod penatibus cras sociosqu aliquet tellus.
          </p>
          
          <button className="bg-[#ac4252] text-white px-10 py-3.5 text-sm font-bold tracking-wider hover:bg-black transition-colors duration-300 flex items-center gap-3 cursor-pointer">
            SHOP NOW <span className="text-3xl leading-none mb-5">&rarr;</span>
          </button>
        </div>

        <div className="flex-1 w-full flex justify-center lg:justify-end">
          <div className="relative cursor-pointer group">
            <img 
              src={videoPic} 
              alt="Popular Styles Video" 
              className="max-w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      <div className="w-full bg-gradient-to-r from-[#885f9c] via-[#a34c71] to-[#b8384a] py-9 px-4 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white text-lg md:text-2xl font-medium ml-0 lg:ml-20">
            Discover Our Stores: Your Local Shoe Haven
          </p>
          <button className="bg-[#485387] hover:bg-[#39426f] transition-colors text-white text-md font-bold tracking-[0.1em] px-10 py-6 mr-0 lg:mr-20 uppercase cursor-pointer">
            FIND STORE
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularStyles;
