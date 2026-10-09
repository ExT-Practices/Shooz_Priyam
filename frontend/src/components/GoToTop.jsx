import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (scrollTotal > 0) {
        setProgress((currentScroll / scrollTotal) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div 
      className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div 
        onClick={scrollToTop}
        className="relative flex items-center justify-center w-[50px] h-[50px] bg-white rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
      >
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="25"
            cy="25"
            r={radius}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="2"
          />
          <circle
            cx="25"
            cy="25"
            r={radius}
            fill="none"
            stroke="#4b5563"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-[stroke-dashoffset] duration-100"
          />
        </svg>
        <ArrowUp size={20} className="text-gray-800 relative z-10" strokeWidth={1.5} />
      </div>
    </div>
  );
};

export default GoToTop;
