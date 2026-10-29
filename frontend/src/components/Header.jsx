import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Search, User, Heart, ShoppingBag, ChevronDown, Menu, X, Plus, Minus, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';
import col4 from '../assets/images/col-4.png';
import col5 from '../assets/images/col-5.png';
import product17 from '../assets/images/product-17.jpg';
import filler1 from '../assets/images/filler1.png';
import LoginModal from './LoginModal';

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState({});
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { wishlistItems } = useWishlist();
  const { cartCount, setIsCartOpen } = useCart();
  const { isLoggedIn, logout } = useAuth();

  const toggleSubmenu = (menu) => {
    setOpenMobileSubmenus(prev => {
      
      if (menu === 'currency' || menu === 'language') {
         return {
           ...prev,
           currency: menu === 'currency' ? !prev.currency : false,
           language: menu === 'language' ? !prev.language : false,
         }
      }
      return {
        ...prev,
        [menu]: !prev[menu]
      }
    });
  };

  return (
    <header className="w-full flex flex-col font-sans relative bg-white">
      
      <div className="w-full bg-gradient-to-r from-[#4e4991] to-[#ae3f4f] text-white text-[16px] font-medium tracking-wide py-2.5">
        <div className="container mx-auto px-8 lg:px-[70px] overflow-hidden relative flex">
          
          {[1, 2].map((key) => (
            <div key={key} className="flex animate-marquee whitespace-nowrap min-w-full shrink-0 items-center justify-around gap-10 px-10">
              <span className="flex items-center gap-4 shrink-0">
                Enjoy 20% off your entire order with the code SHOEFRESH20.
                <button className="underline hover:text-gray-200 transition-colors duration-fast ml-1">Dismiss</button>
              </span>
              <span className="flex items-center gap-4 shrink-0">
                Get 15% off your first purchase when you sign up for our newsletter.
                <button className="underline hover:text-gray-200 transition-colors duration-fast ml-1">Dismiss</button>
              </span>
            </div>
          ))}
        </div>
      </div>

      
      <div className="bg-[#fafafa] border-b border-gray-200">
        <div className="container mx-auto w-full px-5 lg:px-[70px] py-5 flex justify-center lg:justify-between items-center text-[15px]">
          <div className="text-center lg:text-left">
            <span className="text-text-primary font-medium tracking-wide">One Day Delivery Available</span>
          </div>
          <div className="hidden lg:flex items-center gap-6.5">
            {isLoggedIn ? (
              <div className="flex items-center gap-2 text-text-primary">
                <Link to="/account" className="hover:text-surface-raised transition-colors duration-fast">My Account</Link>
                <span className="text-gray-600">|</span>
                <button onClick={logout} className="hover:text-surface-raised transition-colors duration-fast focus-visible:outline-none">Log out</button>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-text-primary">
                <a href="#" onClick={(e) => { e.preventDefault(); setIsLoginModalOpen(true); }} className="hover:text-surface-raised transition-colors duration-fast">Login</a>
                <span className="text-gray-600">/</span>
                <Link to="/register" className="hover:text-surface-raised transition-colors duration-fast">Register</Link>
              </div>
            )}
            <div className="flex items-center gap-5.5">
              <a href="#" aria-label="Facebook" className="text-text-primary hover:text-surface-raised transition-colors duration-fast">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="black" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className="text-text-primary hover:text-surface-raised transition-colors duration-fast">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="black" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-text-primary hover:text-surface-raised transition-colors duration-fast">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      
      <div className="container mx-auto px-5 lg:px-[70px] py-8.5 lg:py-10 flex justify-between items-center relative">
        
        <div className="flex lg:hidden items-center gap-5.5 ms-5 md:ms-10">
          <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Menu" className="text-text-primary hover:text-surface-raised transition-colors duration-fast focus-visible:outline-none cursor-pointer">
            <Menu size={23} strokeWidth={1.5} />
          </button>
          <button onClick={() => setIsSearchOpen(true)} aria-label="Search" className="text-text-primary hover:text-surface-raised transition-colors duration-fast focus-visible:outline-none cursor-pointer">
            <Search size={23} strokeWidth={1.5} />
          </button>
        </div>

        
        <Link to="/" className="flex items-center absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 focus-visible:outline-2 focus-visible:outline-surface-strong focus-visible:outline-offset-2">
          <img src={logo} alt="SHOOZ" className="h-[23px] object-contain" />
        </Link>

        
        <nav className="hidden lg:flex items-center gap-10 text-[16px] font-semibold text-text-primary tracking-wide">
          <Link to="/" className="text-surface-raised relative group focus-visible:outline-none">
            <span className="transition-colors duration-fast">Home</span>
            <span className="absolute -bottom-2.5 left-0 w-full h-[2px] bg-surface-raised"></span>
          </Link>
          
          <div className="group static">
            <Link to="/shop" className="flex items-center gap-1 hover:text-surface-raised group-hover:text-surface-raised transition-colors duration-fast focus-visible:outline-none py-10 -my-10">
              <span className="relative flex items-center gap-1">
                Shop <ChevronDown size={16} className="mt-0.5 text-gray-400 group-hover:text-surface-raised transition-colors duration-fast" />
                <span className="absolute -bottom-2.5 left-0 w-full h-[2px] bg-surface-raised opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </span>
            </Link>
            
            
            <div className="absolute top-full left-0 w-full bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="container mx-auto px-8 lg:px-[70px] py-10 flex justify-between">
                
                <div className="flex gap-20">
                  <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-[16px] mb-2 text-text-primary">Layout</h3>
                    <ul className="flex flex-col gap-3 text-[14px] text-gray-500 font-normal">
                      <li><a href="#" className="hover:text-surface-raised transition-colors">1. Filter Sidebar</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">2. Filter Top</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">3. Filter Drawer</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">4. Without Filter</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">5. Collection - 2 columns</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">6. Collection - 3 columns</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">7. Collection - 4 columns</a></li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-[16px] mb-2 text-text-primary">Features</h3>
                    <ul className="flex flex-col gap-3 text-[14px] text-gray-500 font-normal">
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Banner Image</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Banner No Image</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Banner Split</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Collection List</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Sub Collection</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Pagination</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Infinity</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Load More</a></li>
                    </ul>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-[16px] mb-2 text-text-primary">Hover Style</h3>
                    <ul className="flex flex-col gap-3 text-[14px] text-gray-500 font-normal">
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Hover Style 1</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Hover Style 2</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Hover Style 3</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Hover Style 4</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Hover Style 5</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Hover Style 6</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Hover Style 7</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Hover Style 8</a></li>
                    </ul>
                  </div>
                </div>

                
                <div className="flex gap-8">
                  <div className="flex flex-col items-center group/card cursor-pointer">
                    <div className="overflow-hidden mb-4">
                      <img src={col5} alt="Athletic Footwear" className="w-[300px] h-[300px] object-cover group-hover/card:scale-105 transition-transform duration-500" />
                    </div>
                    <h4 className="font-bold text-[16px] text-text-primary mb-1">Athletic Footwear</h4>
                    <p className="text-gray-500 text-[14px] font-normal">8 products</p>
                  </div>
                  
                  <div className="flex flex-col items-center group/card cursor-pointer">
                    <div className="overflow-hidden mb-4">
                      <img src={col4} alt="Boots for Every Occasion" className="w-[300px] h-[300px] object-cover group-hover/card:scale-105 transition-transform duration-500" />
                    </div>
                    <h4 className="font-bold text-[16px] text-text-primary mb-1">Boots for Every Occasion</h4>
                    <p className="text-gray-500 text-[14px] font-normal">8 products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="group static">
            <a href="#" className="flex items-center gap-1 hover:text-surface-raised group-hover:text-surface-raised transition-colors duration-fast focus-visible:outline-none py-10 -my-10">
              <span className="relative flex items-center gap-1">
                Product <ChevronDown size={16} className="mt-0.5 text-gray-400 group-hover:text-surface-raised transition-colors duration-fast" />
                <span className="absolute -bottom-2.5 left-0 w-full h-[2px] bg-surface-raised opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </span>
            </a>
            
            
            <div className="absolute top-full left-0 w-full bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="container mx-auto px-8 lg:px-[70px] py-10 flex justify-between">
                
                <div className="flex gap-20">
                  <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-[16px] mb-2 text-text-primary">Product Layouts</h3>
                    <ul className="flex flex-col gap-3 text-[14px] text-gray-500 font-normal">
                      <li><a href="#" className="hover:text-surface-raised transition-colors">1. Thumbnails - bottom</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">2. Thumbnails - left</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">3. Thumbnails - right</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">4. Without Thumbnails</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">5. List - stacked</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">6. List - grid</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">7. Collage - style 1</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">8. Collage - style 2</a></li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-[16px] mb-2 text-text-primary">Product Type</h3>
                    <ul className="flex flex-col gap-3 text-[14px] text-gray-500 font-normal">
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Simple Product</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Variable Product</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">With Video</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Sold Out - Coming</a></li>
                    </ul>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-[16px] mb-2 text-text-primary">List Featured 1</h3>
                    <ul className="flex flex-col gap-3 text-[14px] text-gray-500 font-normal">
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Sticky ATC</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Frequently Bought Together</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Count Down</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Cross Selling</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Upsell Popup</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Low Stock Alert</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Pickup Store</a></li>
                    </ul>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-[16px] mb-2 text-text-primary">List Featured 2</h3>
                    <ul className="flex flex-col gap-3 text-[14px] text-gray-500 font-normal">
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Dropdown Variant</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Swatch Variant Color</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Swatch Variant Image</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Variant Image Square</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Size Guide</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Description Accordion</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Description Tab Center</a></li>
                    </ul>
                  </div>
                </div>

                
                <div className="flex gap-8">
                  <div className="flex flex-col group/card cursor-pointer">
                    <div className="overflow-hidden mb-4">
                      <img src={product17} alt="Waterproof Hiking Boots" className="w-[300px] h-[300px] object-cover group-hover/card:scale-105 transition-transform duration-500" />
                    </div>
                    <p className="text-gray-500 text-[14px] mb-1">$25.00</p>
                    <h4 className="font-bold text-[16px] text-text-primary mb-1">Waterproof Hiking Boots</h4>
                    <p className="text-gray-500 text-[14px] font-normal">TrailGear</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="group static">
            <a href="#" className="flex items-center gap-1 hover:text-surface-raised group-hover:text-surface-raised transition-colors duration-fast focus-visible:outline-none py-10 -my-10">
              <span className="relative flex items-center gap-1">
                Blog <ChevronDown size={16} className="mt-0.5 text-gray-400 group-hover:text-surface-raised transition-colors duration-fast" />
                <span className="absolute -bottom-2.5 left-0 w-full h-[2px] bg-surface-raised opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </span>
            </a>
            
            
            <div className="absolute top-full left-0 w-full bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="container mx-auto px-8 lg:px-[70px] py-10 flex justify-between">
                
                <div className="flex gap-50">
                  <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-[16px] mb-2 text-text-primary">List Layout</h3>
                    <ul className="flex flex-col gap-3 text-[14px] text-gray-500 font-normal">
                      <li><a href="#" className="hover:text-surface-raised transition-colors">List Left Sidebar</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">List Right Sidebar</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">List Item Basic</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">List Item Overlay</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">List Item Box</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">List Item Classic</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">List Item Classic Box</a></li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-[16px] mb-2 text-text-primary">Grid Layout</h3>
                    <ul className="flex flex-col gap-3 text-[14px] text-gray-500 font-normal">
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Grid Left Sidebar</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Grid Right Sidebar</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Grid Item Basic</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Grid Item Overlay</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Grid Item Box</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Grid Item Classic</a></li>
                    </ul>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-[16px] mb-2 text-text-primary">Article</h3>
                    <ul className="flex flex-col gap-3 text-[14px] text-gray-500 font-normal">
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Title in Image</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Title after image</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Title before image</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Left Sidebar</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Right Sidebar</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Title Center</a></li>
                      <li><a href="#" className="hover:text-surface-raised transition-colors">Article Video</a></li>
                    </ul>
                  </div>
                </div>

                
                <div className="flex gap-8">
                  <div className="flex flex-col group/card cursor-pointer w-[400px]">
                    <div className="overflow-hidden mb-4">
                      <img src={filler1} alt="Enjoy a 50% Price Slash" className="w-full h-auto object-cover group-hover/card:scale-105 transition-transform duration-500" />
                    </div>
                    <h4 className="font-bold text-[18px] text-text-primary mb-2">Enjoy a 50% Price Slash</h4>
                    <p className="text-gray-500 text-[14px] font-normal mb-4">Revamp Your Wardrobe at Jaw-Dropping Prices.</p>
                    <a href="#" className="text-text-primary font-bold text-[13px] tracking-wide underline underline-offset-4 hover:text-surface-raised transition-colors">SHOP NOW</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="group relative">
            <a href="#" className="flex items-center gap-1 hover:text-surface-raised group-hover:text-surface-raised transition-colors duration-fast focus-visible:outline-none py-10 -my-10">
              <span className="relative flex items-center gap-1">
                Pages <ChevronDown size={16} className="mt-0.5 text-gray-400 group-hover:text-surface-raised transition-colors duration-fast" />
                <span className="absolute -bottom-2.5 left-0 w-full h-[2px] bg-surface-raised opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </span>
            </a>
            
            
            <div className="absolute top-[calc(100%+40px)] left-0 w-[220px] bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-4">
              <ul className="flex flex-col text-[14px] text-gray-500 font-normal">
                <li><a href="#" className="block px-6 py-2.5 hover:text-surface-raised transition-colors">About Us 1</a></li>
                <li><a href="#" className="block px-6 py-2.5 hover:text-surface-raised transition-colors">About Us 2</a></li>
                <li><a href="#" className="block px-6 py-2.5 hover:text-surface-raised transition-colors">About Us 3</a></li>
                <li><a href="#" className="block px-6 py-2.5 hover:text-surface-raised transition-colors">Contact</a></li>
                <li><a href="#" className="block px-6 py-2.5 hover:text-surface-raised transition-colors">Faqs</a></li>
                <li><a href="#" className="block px-6 py-2.5 hover:text-surface-raised transition-colors">Lookbook</a></li>
                <li><a href="#" className="block px-6 py-2.5 hover:text-surface-raised transition-colors">sizeguide</a></li>
                <li><Link to="/wishlist" className="block px-6 py-2.5 hover:text-surface-raised transition-colors">Wishlist</Link></li>
              </ul>
            </div>
          </div>
          
          <a href="#" className="hover:text-surface-raised transition-colors duration-fast focus-visible:outline-none relative">
            Buy Now
            <span className="absolute h-[20px] -top-4.5 -right-8.5 bg-[#22c55e] text-white text-[10px] px-7 rounded-full flex items-center justify-center">Sale</span>
          </a>
        </nav>

        
        <div className="flex items-center gap-4.5 lg:gap-7 text-text-primary me-5 md:me-10 lg:me-0">
          <button onClick={() => setIsSearchOpen(true)} aria-label="Search" className="hidden lg:block hover:text-surface-raised transition-colors duration-fast focus-visible:outline-none cursor-pointer">
            <Search size={23} strokeWidth={1.5} />
          </button>
          <button aria-label="User Account" className="hover:text-surface-raised transition-colors duration-fast focus-visible:outline-none">
            <User size={23} strokeWidth={1.5} />
          </button>
          <Link to="/wishlist" aria-label="Wishlist" className="hover:text-surface-raised transition-colors duration-fast focus-visible:outline-none relative flex items-center">
            <Heart size={23} strokeWidth={1.5} />
            <span className="absolute -bottom-4 -right-5 w-4 h-4 bg-surface-raised text-white text-[10px] p-6 flex items-center justify-center rounded-full font-bold">{wishlistItems.length}</span>
          </Link>
          <button 
            onClick={() => setIsCartOpen(true)}
            aria-label="Cart" 
            className="hover:text-surface-raised transition-colors duration-fast focus-visible:outline-none flex items-center gap-1"
          >
            <ShoppingBag size={23} strokeWidth={1.5} />
            <span className="text-[13px] font-medium">({cartCount})</span>
          </button>
        </div>
      </div>

      
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-[100] lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      
      <div 
        className={`p-8 fixed inset-y-0 left-0 w-[320px] md:w-[420px] bg-white z-[110] transform transition-transform duration-300 flex flex-col lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-end p-4 shrink-0">
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-text-primary transition-colors focus-visible:outline-none">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        
        <div className="overflow-y-auto flex-grow flex flex-col bg-white">
           <div className="flex flex-col text-[16px] text-text-primary">
              <a href="#" className="px-5 py-3.5 border-b border-gray-200 hover:text-surface-raised transition-colors">Home</a>
              
              
              <div className="flex flex-col">
                <button 
                  onClick={() => toggleSubmenu('shop')}
                  className="w-full px-5 py-3.5 border-b border-gray-200 flex justify-between items-center hover:text-surface-raised transition-colors focus-visible:outline-none"
                >
                  Shop
                  {openMobileSubmenus['shop'] ? <Minus size={16} strokeWidth={1.5} className="text-gray-400" /> : <Plus size={16} strokeWidth={1.5} className="text-gray-400" />}
                </button>
                <div className={`flex flex-col bg-white overflow-hidden gap-7 transition-all duration-300 ${openMobileSubmenus['shop'] ? 'max-h-[1500px]' : 'max-h-0'}`}>
                   
                   <div className="flex flex-col">
                     <button onClick={() => toggleSubmenu('shop-layout')} className="w-full pl-10 pr-5 py-3 flex justify-between items-center text-[16px] text-gray-500 hover:text-text-primary transition-colors">
                        Layout
                        {openMobileSubmenus['shop-layout'] ? <Minus size={16} strokeWidth={1.5} className="text-gray-400" /> : <Plus size={16} strokeWidth={1.5} className="text-gray-400" />}
                     </button>
                     <div className={`flex flex-col overflow-hidden transition-all duration-300 ${openMobileSubmenus['shop-layout'] ? 'max-h-[500px]' : 'max-h-0'}`}>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">1. Filter Sidebar</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">2. Filter Top</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">3. Filter Drawer</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">4. Without Filter</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">5. Collection - 2 columns</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">6. Collection - 3 columns</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">7. Collection - 4 columns</a>
                     </div>
                   </div>
                   
                   <div className="flex flex-col">
                     <button onClick={() => toggleSubmenu('shop-features')} className="w-full pl-10 pr-5 py-3 flex justify-between items-center text-[16px] text-gray-500 hover:text-text-primary transition-colors font-normal">
                        Features
                        {openMobileSubmenus['shop-features'] ? <Minus size={16} strokeWidth={1.5} className="text-gray-400" /> : <Plus size={16} strokeWidth={1.5} className="text-gray-400" />}
                     </button>
                     <div className={`flex flex-col overflow-hidden transition-all duration-300 ${openMobileSubmenus['shop-features'] ? 'max-h-[500px]' : 'max-h-0'}`}>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Banner Image</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Banner No Image</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Banner Split</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Collection List</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Sub Collection</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Pagination</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Infinity</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Load More</a>
                     </div>
                   </div>
                   
                   <div className="flex flex-col">
                     <button onClick={() => toggleSubmenu('shop-hover')} className="w-full pl-10 pr-5 py-3 flex justify-between items-center text-[16px] text-gray-500 hover:text-text-primary transition-colors font-normal">
                        Hover Style
                        {openMobileSubmenus['shop-hover'] ? <Minus size={16} strokeWidth={1.5} className="text-gray-400" /> : <Plus size={16} strokeWidth={1.5} className="text-gray-400" />}
                     </button>
                     <div className={`flex flex-col overflow-hidden transition-all duration-300 ${openMobileSubmenus['shop-hover'] ? 'max-h-[500px]' : 'max-h-0'}`}>
                       {[1,2,3,4,5,6,7,8].map(num => (
                         <a key={num} href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Hover Style {num}</a>
                       ))}
                     </div>
                   </div>
                </div>
              </div>

              
              <div className="flex flex-col">
                <button 
                  onClick={() => toggleSubmenu('product')}
                  className="w-full px-5 py-3.5 border-b border-gray-200 flex justify-between items-center hover:text-surface-raised transition-colors focus-visible:outline-none"
                >
                  Product
                  {openMobileSubmenus['product'] ? <Minus size={16} strokeWidth={1.5} className="text-gray-400" /> : <Plus size={16} strokeWidth={1.5} className="text-gray-400" />}
                </button>
                <div className={`flex flex-col bg-white overflow-hidden gap-7 transition-all duration-300 ${openMobileSubmenus['product'] ? 'max-h-[1500px]' : 'max-h-0'}`}>
                   
                   <div className="flex flex-col">
                     <button onClick={() => toggleSubmenu('product-layouts')} className="w-full pl-10 pr-5 py-3 flex justify-between items-center text-[16px] text-gray-500 hover:text-text-primary transition-colors font-normal">
                        Product Layouts
                        {openMobileSubmenus['product-layouts'] ? <Minus size={16} strokeWidth={1.5} className="text-gray-400" /> : <Plus size={16} strokeWidth={1.5} className="text-gray-400" />}
                     </button>
                     <div className={`flex flex-col overflow-hidden transition-all duration-300 ${openMobileSubmenus['product-layouts'] ? 'max-h-[500px]' : 'max-h-0'}`}>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">1. Thumbnails - bottom</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">2. Thumbnails - left</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">3. Thumbnails - right</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">4. Without Thumbnails</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">5. List - stacked</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">6. List - grid</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">7. Collage - style 1</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">8. Collage - style 2</a>
                     </div>
                   </div>
                   
                   <div className="flex flex-col">
                     <button onClick={() => toggleSubmenu('product-type')} className="w-full pl-10 pr-5 py-3 flex justify-between items-center text-[16px] text-gray-500 hover:text-text-primary transition-colors font-normal">
                        Product Type
                        {openMobileSubmenus['product-type'] ? <Minus size={16} strokeWidth={1.5} className="text-gray-400" /> : <Plus size={16} strokeWidth={1.5} className="text-gray-400" />}
                     </button>
                     <div className={`flex flex-col overflow-hidden transition-all duration-300 ${openMobileSubmenus['product-type'] ? 'max-h-[500px]' : 'max-h-0'}`}>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Simple Product</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Variable Product</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">With Video</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Sold Out - Coming</a>
                     </div>
                   </div>
                   
                   <div className="flex flex-col">
                     <button onClick={() => toggleSubmenu('product-feat1')} className="w-full pl-10 pr-5 py-3 flex justify-between items-center text-[16px] text-gray-500 hover:text-text-primary transition-colors font-normal">
                        List Featured 1
                        {openMobileSubmenus['product-feat1'] ? <Minus size={16} strokeWidth={1.5} className="text-gray-400" /> : <Plus size={16} strokeWidth={1.5} className="text-gray-400" />}
                     </button>
                     <div className={`flex flex-col overflow-hidden transition-all duration-300 ${openMobileSubmenus['product-feat1'] ? 'max-h-[500px]' : 'max-h-0'}`}>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Sticky ATC</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Frequently Bought Together</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Count Down</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Cross Selling</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Upsell Popup</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Low Stock Alert</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Pickup Store</a>
                     </div>
                   </div>
                   
                   <div className="flex flex-col">
                     <button onClick={() => toggleSubmenu('product-feat2')} className="w-full pl-10 pr-5 py-3 flex justify-between items-center text-[16px] text-gray-500 hover:text-text-primary transition-colors font-normal">
                        List Featured 2
                        {openMobileSubmenus['product-feat2'] ? <Minus size={16} strokeWidth={1.5} className="text-gray-400" /> : <Plus size={16} strokeWidth={1.5} className="text-gray-400" />}
                     </button>
                     <div className={`flex flex-col overflow-hidden transition-all duration-300 ${openMobileSubmenus['product-feat2'] ? 'max-h-[500px]' : 'max-h-0'}`}>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Dropdown Variant</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Swatch Variant Color</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Swatch Variant Image</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Variant Image Square</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Size Guide</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Description Accordion</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Description Tab Center</a>
                     </div>
                   </div>
                </div>
              </div>

              
              <div className="flex flex-col">
                <button 
                  onClick={() => toggleSubmenu('blog')}
                  className="w-full px-5 py-3.5 border-b border-gray-200 flex justify-between items-center hover:text-surface-raised transition-colors focus-visible:outline-none"
                >
                  Blog
                  {openMobileSubmenus['blog'] ? <Minus size={16} strokeWidth={1.5} className="text-gray-400" /> : <Plus size={16} strokeWidth={1.5} className="text-gray-400" />}
                </button>
                <div className={`flex flex-col bg-white overflow-hidden gap-7 transition-all duration-300 ${openMobileSubmenus['blog'] ? 'max-h-[1500px]' : 'max-h-0'}`}>
                   
                   <div className="flex flex-col">
                     <button onClick={() => toggleSubmenu('blog-list')} className="w-full pl-10 pr-5 py-3 flex justify-between items-center text-[16px] text-gray-500 hover:text-text-primary transition-colors font-normal">
                        List Layout
                        {openMobileSubmenus['blog-list'] ? <Minus size={16} strokeWidth={1.5} className="text-gray-400" /> : <Plus size={16} strokeWidth={1.5} className="text-gray-400" />}
                     </button>
                     <div className={`flex flex-col overflow-hidden transition-all duration-300 ${openMobileSubmenus['blog-list'] ? 'max-h-[500px]' : 'max-h-0'}`}>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">List Left Sidebar</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">List Right Sidebar</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">List Item Basic</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">List Item Overlay</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">List Item Box</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">List Item Classic</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">List Item Classic Box</a>
                     </div>
                   </div>
                   
                   <div className="flex flex-col">
                     <button onClick={() => toggleSubmenu('blog-grid')} className="w-full pl-10 pr-5 py-3 flex justify-between items-center text-[16px] text-gray-500 hover:text-text-primary transition-colors font-normal">
                        Grid Layout
                        {openMobileSubmenus['blog-grid'] ? <Minus size={16} strokeWidth={1.5} className="text-gray-400" /> : <Plus size={16} strokeWidth={1.5} className="text-gray-400" />}
                     </button>
                     <div className={`flex flex-col overflow-hidden transition-all duration-300 ${openMobileSubmenus['blog-grid'] ? 'max-h-[500px]' : 'max-h-0'}`}>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Grid Left Sidebar</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Grid Right Sidebar</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Grid Item Basic</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Grid Item Overlay</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Grid Item Box</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Grid Item Classic</a>
                     </div>
                   </div>
                   
                   <div className="flex flex-col">
                     <button onClick={() => toggleSubmenu('blog-article')} className="w-full pl-10 pr-5 py-3 flex justify-between items-center text-[16px] text-gray-500 hover:text-text-primary transition-colors font-normal">
                        Article
                        {openMobileSubmenus['blog-article'] ? <Minus size={16} strokeWidth={1.5} className="text-gray-400" /> : <Plus size={16} strokeWidth={1.5} className="text-gray-400" />}
                     </button>
                     <div className={`flex flex-col overflow-hidden transition-all duration-300 ${openMobileSubmenus['blog-article'] ? 'max-h-[500px]' : 'max-h-0'}`}>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Title in Image</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Title after image</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Title before image</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Left Sidebar</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Right Sidebar</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Title Center</a>
                       <a href="#" className="block pl-14 pr-5 py-1.5 text-[14px] text-gray-400 hover:text-surface-raised transition-colors font-normal">Article Video</a>
                     </div>
                   </div>
                </div>
              </div>

              
              <div className="flex flex-col">
                <button 
                  onClick={() => toggleSubmenu('pages')}
                  className="w-full px-5 py-3.5 border-b border-gray-200 flex justify-between items-center hover:text-surface-raised transition-colors focus-visible:outline-none"
                >
                  Pages
                  {openMobileSubmenus['pages'] ? <Minus size={16} strokeWidth={1.5} className="text-gray-400" /> : <Plus size={16} strokeWidth={1.5} className="text-gray-400" />}
                </button>
                <div className={`flex flex-col bg-white overflow-hidden gap-3 transition-all duration-300 ${openMobileSubmenus['pages'] ? 'max-h-[500px]' : 'max-h-0'}`}>
                   <a href="#" className="block pl-10 pr-5 py-1.5 text-[16px] text-gray-500 hover:text-surface-raised transition-colors font-normal">About Us 1</a>
                   <a href="#" className="block pl-10 pr-5 py-1.5 text-[16px] text-gray-500 hover:text-surface-raised transition-colors font-normal">About Us 2</a>
                   <a href="#" className="block pl-10 pr-5 py-1.5 text-[16px] text-gray-500 hover:text-surface-raised transition-colors font-normal">About Us 3</a>
                   <a href="#" className="block pl-10 pr-5 py-1.5 text-[16px] text-gray-500 hover:text-surface-raised transition-colors font-normal">Contact</a>
                   <a href="#" className="block pl-10 pr-5 py-1.5 text-[16px] text-gray-500 hover:text-surface-raised transition-colors font-normal">Faqs</a>
                   <a href="#" className="block pl-10 pr-5 py-1.5 text-[16px] text-gray-500 hover:text-surface-raised transition-colors font-normal">Lookbook</a>
                   <a href="#" className="block pl-10 pr-5 py-1.5 text-[16px] text-gray-500 hover:text-surface-raised transition-colors font-normal">sizeguide</a>
                   <Link to="/wishlist" className="block pl-10 pr-5 py-1.5 text-[16px] text-gray-500 hover:text-surface-raised transition-colors font-normal">Wishlist</Link>
                </div>
              </div>

              <a href="#" className="px-5 py-3.5 border-b border-gray-200 flex items-center gap-4 hover:text-surface-raised transition-colors">
                Buy Now
                <span className="bg-[#22c55e] h-[20px] text-white text-[12px] px-5 py-0.5 rounded-full flex items-center justify-center">Sale</span>
              </a>
           </div>

           
           <div className="flex flex-col px-5 gap-4 text-gray-500 text-[16px]">
             <div className="flex items-center gap-2 border-b border-gray-200 py-3.5">
               <a href="#" className="hover:text-text-primary transition-colors">Login</a>
               <span className="text-gray-300">/</span>
               <a href="#" className="hover:text-text-primary transition-colors">Register</a>
             </div>
             
             
             <div className="flex items-start py-3.5 gap-6 border-b border-gray-200">
               <div className="flex flex-col">
                 <button onClick={() => toggleSubmenu('currency')} className="flex items-center gap-1 hover:text-text-primary transition-colors focus-visible:outline-none">
                   AUD $ {openMobileSubmenus['currency'] ? <ChevronDown size={14} className="rotate-180 transition-transform" /> : <ChevronDown size={14} className="transition-transform" />}
                 </button>
                 <div className={`overflow-hidden transition-all duration-300 border-gray-200 w-[120px] ${openMobileSubmenus['currency'] ? 'max-h-[200px] border mt-3' : 'max-h-0 border-0 mt-0'}`}>
                   <a href="#" className="block px-4 py-2 hover:bg-gray-50 text-text-primary flex justify-between items-center text-[14px]">AUD $ <span className="text-[12px]">✓</span></a>
                   <a href="#" className="block px-4 py-2 hover:bg-gray-50 text-[14px]">USD $</a>
                   <a href="#" className="block px-4 py-2 hover:bg-gray-50 text-[14px]">EUR €</a>
                 </div>
               </div>
               
               <div className="flex flex-col">
                 <button onClick={() => toggleSubmenu('language')} className="flex items-center gap-1 hover:text-text-primary transition-colors focus-visible:outline-none">
                   English {openMobileSubmenus['language'] ? <ChevronDown size={14} className="rotate-180 transition-transform" /> : <ChevronDown size={14} className="transition-transform" />}
                 </button>
                 <div className={`overflow-hidden transition-all duration-300 border-gray-200 w-[120px] ${openMobileSubmenus['language'] ? 'max-h-[200px] border mt-3' : 'max-h-0 border-0 mt-0'}`}>
                   <a href="#" className="block px-4 py-2 hover:bg-gray-50 text-text-primary flex justify-between items-center text-[14px]">English <span className="text-[12px]">✓</span></a>
                   <a href="#" className="block px-4 py-2 hover:bg-gray-50 text-[14px]">French</a>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

      {/* Modern Search Modal Dialog */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-start justify-center pt-24 px-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Search SHOOZ Catalog</span>
              <button onClick={() => setIsSearchOpen(false)} className="p-1 text-gray-400 hover:text-black cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  navigate(`/shop?keyword=${encodeURIComponent(searchQuery.trim())}`);
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }
              }}
              className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200"
            >
              <Search size={20} className="text-gray-400 shrink-0" />
              <input 
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for athletic sneakers, boots, running shoes..."
                className="w-full bg-transparent text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none"
              />
              <button type="submit" className="bg-[#ae3f4f] hover:bg-[#8f3240] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shrink-0 transition-colors cursor-pointer">
                Search
              </button>
            </form>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 flex-wrap text-xs text-gray-500">
              <span className="font-semibold text-gray-700">Popular:</span>
              {['Sneakers', 'Running', 'Athletic', 'Boots', 'Leather'].map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    navigate(`/shop?keyword=${encodeURIComponent(tag)}`);
                    setIsSearchOpen(false);
                  }}
                  className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
