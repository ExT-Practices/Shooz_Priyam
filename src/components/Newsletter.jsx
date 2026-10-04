import React from 'react';
import newsletterImage from '../assets/images/newslatter-image.jpg';

const Newsletter = () => {
  return (
    <section className="relative w-full overflow-hidden">
      
      <div className="absolute inset-0 z-0 flex flex-col">
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#F1EFE7]"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto md:px-8 pb-12">
        <div className="flex flex-col md:flex-row w-full border-y md:border border-gray-900">
          
          <div className="bg-[var(--color-surface-raised)] p-6 md:p-16 flex-1 flex flex-col justify-center text-white">
            <h2 className="text-center lg:text-start text-[22px] lg:text-5xl font-bold mb-6 tracking-wide leading-tight uppercase">
              Subscribe to our news articals
            </h2>
            <form className="flex lg:w-full md:w-[50%] mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-4 md:px-6 py-4 md:py-6 flex-1 border border-gray-900 text-gray-900 bg-white outline-none placeholder-gray-400"
                required
              />
              <button 
                type="submit" 
                className="bg-black text-white px-4 md:px-6 py-4 md:py-6 font-semibold text-sm md:text-sm hover:bg-gray-800 transition-colors duration-200 uppercase tracking-wider whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
          
          
          <div className="flex-1 hidden lg:block bg-gray-100">
            <img 
              src={newsletterImage} 
              alt="Newsletter Sneakers" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
