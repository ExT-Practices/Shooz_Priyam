import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-[#EFEFE7] pt-12 md:pt-16 pb-8 px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:grid md:grid-cols-5 gap-6 md:gap-8 lg:gap-12 mb-16">
          
          <div className="text-left">
            <div 
              className="flex justify-between items-center cursor-pointer md:cursor-auto py-2 md:py-0"
              onClick={() => toggleSection('information')}
            >
              <h4 className="text-gray-900 md:mb-9 uppercase text-lg md:text-xl font-bold tracking-wider">Information</h4>
              {openSection === 'information' ? (
                <Minus className="md:hidden w-[20px] h-[20px] text-gray-900" />
              ) : (
                <Plus className="md:hidden w-[20px] h-[20px] text-gray-900" />
              )}
            </div>
            <ul className={`space-y-4 text-[16px] text-gray-700 mt-4 md:mt-0 ${openSection === 'information' ? 'block' : 'hidden md:block'}`}>
              <li><a href="#" className="hover:text-black transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Returns Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          
          <div className="text-left">
            <div 
              className="flex justify-between items-center cursor-pointer md:cursor-auto py-2 md:py-0"
              onClick={() => toggleSection('quickLinks')}
            >
              <h4 className="text-gray-900 md:mb-9 uppercase text-lg md:text-xl font-bold tracking-wider">Quick Links</h4>
              {openSection === 'quickLinks' ? (
                <Minus className="md:hidden w-[20px] h-[20px] text-gray-900" />
              ) : (
                <Plus className="md:hidden w-[20px] h-[20px] text-gray-900" />
              )}
            </div>
            <ul className={`space-y-4 text-[16px] text-gray-700 mt-4 md:mt-0 ${openSection === 'quickLinks' ? 'block' : 'hidden md:block'}`}>
              <li><a href="#" className="hover:text-black transition-colors">My Account</a></li>
              <li><a href="#" className="hover:text-black transition-colors">My Cart</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Size Chart</a></li>
              <li><Link to="/wishlist" className="hover:text-black transition-colors">Wishlist</Link></li>
              <li><a href="#" className="hover:text-black transition-colors">Gift Card</a></li>
            </ul>
          </div>

          
          <div className="flex flex-col items-start text-left py-9 md:py-0">
            <img src={logo} alt="Shooz Logo" className="h-6.5 mb-9" />
            <div className="text-[16px] text-gray-700 space-y-2">
              <p>T: + (08) 9055 0269</p>
              <p className="break-all">E: example@example.com</p>
              <p>50 Porana Place, West Casuarinas,</p>
              <p>Western Australia, Australia.</p>
            </div>
          </div>

          
          <div className="text-left">
            <div 
              className="flex justify-between items-center cursor-pointer md:cursor-auto py-2 md:py-0"
              onClick={() => toggleSection('categories')}
            >
              <h4 className="text-gray-900 md:mb-9 uppercase text-lg md:text-xl font-bold tracking-wider">Categories</h4>
              {openSection === 'categories' ? (
                <Minus className="md:hidden w-[20px] h-[20px] text-gray-900" />
              ) : (
                <Plus className="md:hidden w-[20px] h-[20px] text-gray-900" />
              )}
            </div>
            <ul className={`space-y-4 text-[16px] text-gray-700 mt-4 md:mt-0 ${openSection === 'categories' ? 'block' : 'hidden md:block'}`}>
              <li><a href="#" className="hover:text-black transition-colors">Athletic Footwear</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Boots for Every Occasion</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Luxury Leather Shoes</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Sandals & Slides</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Sneakerhead's Haven</a></li>
            </ul>
          </div>

          
          <div className="text-left">
            <div 
              className="flex justify-between items-center cursor-pointer md:cursor-auto py-2 md:py-0"
              onClick={() => toggleSection('support')}
            >
              <h4 className="text-gray-900 md:mb-9 uppercase text-lg md:text-xl font-bold tracking-wider">Support</h4>
              {openSection === 'support' ? (
                <Minus className="md:hidden w-[20px] h-[20px] text-gray-900" />
              ) : (
                <Plus className="md:hidden w-[20px] h-[20px] text-gray-900" />
              )}
            </div>
            <ul className={`space-y-4 text-[16px] text-gray-700 mt-4 md:mt-0 ${openSection === 'support' ? 'block' : 'hidden md:block'}`}>
              <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Newsletter</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Gift Cards</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Sign In</a></li>
              <li><a href="#" className="hover:text-black transition-colors">My Account</a></li>
            </ul>
          </div>
        </div>

        
        <div className="flex flex-col md:flex-row justify-between items-center py-9 border-t border-gray-300/50 gap-6">
          <p className="text-gray-700 text-lg md:text-xl text-center md:text-left">
            Copyright © 2024 <span className="text-[#ae3f4f]">Shooz</span>. All rights reserved
          </p>
          
          
          <div className="flex items-center gap-2 justify-center">
            <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Visa" className="w-[35px] h-[25px] rounded bg-[#1434CB] shrink-0">
              <path d="M12 16.5l2.6-11h4l-2.6 11h-4zm20.8-10.7c-.5-.2-1.3-.4-2.2-.4-2.4 0-4.1 1.3-4.1 3.1 0 1.3 1.2 2 2.1 2.5 1 .4 1.3.7 1.3 1.1 0 .6-.7 1-1.8 1-1.5 0-2.3-.3-3.1-.6l-.4 1.9c.7.4 2 .7 3.3.7 2.6 0 4.2-1.3 4.2-3.2 0-1-.6-1.7-2-2.4-.9-.4-1.4-.7-1.4-1.1 0-.4.5-.8 1.6-.8 1.1 0 1.9.2 2.4.5l.3-1.3zM25 16.5h-3.4c-.4 0-.8-.2-.9-.7l-1.3-6.5c-.1-.4-.2-.5-.6-.7l-2.1-.8.3-1.4c.5 0 2.2.1 3.4.1.5 0 1 .3 1.1.9l1.1 5.3 3.3-6.2h4L25 16.5zM13.2 5.5l-3.3 7.8-1-5.1C8.7 6.3 8 5.7 7.2 5.5L3 4.6l.1 1c1.2.3 2.5.8 3 1.4.3.4.6 1 .7 1.8l1.3 7.7h4.1l6.3-11h-5.3z" fill="#FFF" />
            </svg>
            <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mastercard" className="w-[35px] h-[25px] rounded bg-[#141413] shrink-0">
              <circle cx="15.5" cy="12" r="5.5" fill="#FF5F00" />
              <circle cx="22.5" cy="12" r="5.5" fill="#EB001B" />
              <path d="M19 16.6c1.6-1.1 2.6-2.9 2.6-4.6s-1-3.5-2.6-4.6c-1.6 1.1-2.6 2.9-2.6 4.6s1 3.5 2.6 4.6z" fill="#F79E1B" />
            </svg>
            <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="American Express" className="w-[35px] h-[25px] rounded bg-[#2671B9] shrink-0">
              <path d="M28.4 12.3l-2.7-3.9h-3v8.5h3.1v-4.2l2.3 4.2h3.3l-3.3-4.6 3-4h-2.7zm-9.3.9l-1.6-4.8h-4.3v8.5h2v-4.8l1.3 4 1-.2 1.3-4v4.8h2.1V8.4h-1.8zm-9.8-4.8h-4.8L2 16.9h2.2l.6-1.5h3.6l.6 1.5h2.2l-2-8.5z" fill="#FFF" />
              <path d="M7 14l-1-2.8h2.1L7 14z" fill="#2671B9" />
            </svg>
            <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Apple Pay" className="w-[35px] h-[25px] rounded bg-black shrink-0">
              <path d="M14.6 10.3c0-1.5.8-2.8 2-3.5-1.2-1.3-2.9-1.5-3.5-1.5-1.5-.1-2.9.9-3.7.9-.8 0-1.9-.9-3.1-.9-1.6 0-3.1.9-4 2.4-1.8 3.1-.4 7.7 1.3 10.2.8 1.2 1.8 2.5 3.1 2.5 1.2-.1 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3.1 2.1-1.1 2.9-2.3 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.8-1-2.8-4.1zM13 7.8c.7-.8 1.1-1.9 1-3-.9.1-2.1.6-2.8 1.5-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.8-1.4z" fill="#FFF" />
              <path d="M19.7 16V8.1h1.9c1 0 1.7.3 2.1.8.4.5.6 1.3.6 2.3 0 1.1-.2 1.9-.6 2.4-.4.5-1.1.8-2.1.8h-1.1V16h-.8zm.9-4.8H21c1.2 0 1.8-.6 1.8-1.8 0-.5-.1-.9-.3-1.2-.2-.3-.7-.4-1.3-.4h-1v3.4zM26.2 16h-.9l2.7-8h1.1l2.7 8h-.9l-.7-2h-3.4l-.6 2zm1.2-3.1h2.7l-1-2.9c-.2-.6-.3-1-.4-1.3-.1.4-.2.8-.4 1.3l-.9 2.9zM30.6 16v-2.3l-2.6-5.6h1l1.6 3.6c.2.6.4 1.1.5 1.5.1-.4.2-.8.5-1.5l1.6-3.6h1l-2.7 5.6V16h-.9z" fill="#FFF" />
            </svg>
            <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Discover" className="w-[35px] h-[25px] rounded bg-[#F1F1F1] border border-gray-300 shrink-0">
              <path d="M12 9.5c0-.9-.7-1.5-1.6-1.5H8.7v5.6h1.7c.9 0 1.6-.6 1.6-1.5v-2.6zM7 7.2h3.4c1.4 0 2.5 1 2.5 2.3v2.6c0 1.3-1.1 2.3-2.5 2.3H7V7.2zM15.4 7.2H14v7.2h1.4V7.2zM21 7.2v.9h-1.9v2h1.6v.9h-1.6v2.5h1.9v.9h-2.9v-7.2H21zM24 7.2h1.4v7.2H24V7.2zM28.4 7.2h1.6L28 14.4h-1.2l-2-7.2h1.5l1.2 4.8 1-4.8z" fill="#FF6600" />
              <circle cx="16" cy="10.8" r="3.2" fill="#F1F1F1" />
              <path d="M16 13c-1.2 0-2.2-.9-2.2-2.2 0-1.2.9-2.2 2.2-2.2 1.2 0 2.2.9 2.2 2.2 0 1.3-1 2.2-2.2 2.2z" fill="#FF6600" />
            </svg>
            <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="JCB" className="w-[35px] h-[25px] rounded bg-[#0F72B5] shrink-0">
              <path d="M12 12c0 2-1 3-2.5 3S7 14 7 12V8H5.5v4.5c0 2.5 1.5 4 4 4s4-1.5 4-4V8H12v4zm13.5-3.5c0-1.5-.8-2.5-2.5-2.5H19v9h4c1.8 0 2.5-1 2.5-2.5v-4zm-1.5 4c0 .8-.5 1-1.5 1h-2v-4h2c1 0 1.5.2 1.5 1v2zm6-4c0-1.5-.8-2.5-2.5-2.5H23v9h4.5c1.8 0 2.5-1 2.5-2.5v-4zm-1.5 4c0 .8-.5 1-1.5 1h-3v-4h3c1 0 1.5.2 1.5 1v2z" fill="#FFF" />
              <path d="M30 15h1.5v3H30v-3z" fill="#FFF" />
            </svg>
            <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diners Club" className="w-[35px] h-[25px] rounded bg-[#0079C1] shrink-0">
              <path d="M21.5 7c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm-8-3.5c0-2.8-2.2-5-5-5S3.5 9.2 3.5 12s2.2 5 5 5 5-2.2 5-5zm-5 3.5C6.6 15.5 5 13.9 5 12s1.6-3.5 3.5-3.5S12 10.1 12 12s-1.6 3.5-3.5 3.5z" fill="#FFF" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
