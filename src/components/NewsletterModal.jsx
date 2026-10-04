import React, { useState, useEffect } from 'react';
import product17 from '../assets/images/product-17.jpg';
import { X, Minus } from 'lucide-react';

const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={() => setIsOpen(false)}
      ></div>

      
      <div className="relative z-10 bg-white w-full max-w-[800px] flex flex-col md:flex-row overflow-hidden shadow-2xl animate-modal-fade-in-up">
        
        <div className="w-full md:w-1/2 p-10 lg:p-12 flex flex-col justify-center">
          <h2 className="text-[32px] leading-[1.1] font-bold text-text-primary mb-6">
            Stay Styled, Stay<br/>Informed!
          </h2>
          <p className="text-gray-600 text-[15px] mb-8 leading-[1.6]">
            Unlock Fashion Secrets and Exclusive<br className="hidden lg:block"/>
            Offers! Join our fashion community and<br className="hidden lg:block"/>
            be the first to know about the latest<br className="hidden lg:block"/>
            trends, exclusive collections, and insider<br className="hidden lg:block"/>
            deals.
          </p>
          
          <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full border border-gray-200 px-5 py-5 focus:outline-none focus:border-surface-strong text-[15px]"
              required
            />
            <button 
              type="submit" 
              className="w-max bg-surface-raised hover:bg-surface-strong text-white font-medium text-[14px] px-10 py-5 tracking-wide transition-colors duration-fast uppercase"
            >
              Subscribe
            </button>
          </form>
        </div>

        
        <div className="w-full md:w-1/2 relative h-[300px] md:h-auto">
          <img 
            src={product17} 
            alt="Newsletter Promotional" 
            className="w-full h-full object-cover object-center"
          />
          
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-0 right-0 bg-white border-l border-b border-gray-100 text-gray-500 hover:text-black w-10 h-10 flex items-center justify-center transition-colors duration-fast"
            aria-label="Close modal"
          >
            <Minus size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;
