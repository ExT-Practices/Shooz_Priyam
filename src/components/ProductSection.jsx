import React, { useState, useEffect } from 'react';
import { ShoppingCart, Eye, Heart, ArrowLeftRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import p1 from '../assets/images/product-1.jpg';
import p2 from '../assets/images/product-2.jpg';
import p3 from '../assets/images/product-3.jpg';
import p4 from '../assets/images/product-4.jpg';
import p7 from '../assets/images/product-7.jpg';
import p8 from '../assets/images/product-8.jpg';
import p11 from '../assets/images/product-11.jpg';
import p15 from '../assets/images/product-15.jpg';
import p16 from '../assets/images/product-16.jpg';
import p17 from '../assets/images/product-17.jpg';
import p18 from '../assets/images/product-18.jpg';
import p19 from '../assets/images/product-19.jpg';
import p20 from '../assets/images/product-20.jpg';
import p21 from '../assets/images/product-21.jpg';
import p22 from '../assets/images/product-22.jpg';
import p23 from '../assets/images/product-23.jpg';
import p26 from '../assets/images/product-26.jpg';

const products = [
  {
    id: 1,
    name: 'Classic White Tennis Sneakers',
    brand: 'SportyFeet',
    price: 25.0,
    image1: p1,
    image2: p2,
  },
  {
    id: 2,
    name: 'Waterproof Hiking Boots',
    brand: 'TrailGear',
    price: 25.0,
    image1: p3,
    image2: p4,
    countdown: { days: 1526, hours: 2, mins: 28, secs: 21 },
    colors: ['#000', '#666', '#333'],
  },
  {
    id: 3,
    name: 'Classic Leather Sneakers',
    brand: 'UrbanStep',
    price: 21.0,
    image1: p7,
    image2: p8,
  },
  {
    id: 4,
    name: 'High-Top Canvas Sneakers',
    brand: 'TrendyFeet',
    price: 25.0,
    image1: p11,
    image2: p15,
  },
  {
    id: 5,
    name: 'Running Performance Shoes',
    brand: 'PaceMaker',
    price: 35.0,
    image1: p16,
    image2: p17,
  },
  {
    id: 6,
    name: 'Casual Slip-on Kicks',
    brand: 'ComfyWalk',
    price: 18.0,
    image1: p18,
    image2: p19,
  },
  {
    id: 7,
    name: 'Urban Trail Runners',
    brand: 'TrailGear',
    price: 45.0,
    image1: p20,
    image2: p21,
  },
  {
    id: 8,
    name: 'Vintage Skate Sneakers',
    brand: 'BoardWalk',
    price: 28.0,
    image1: p22,
    image2: p23,
    colors: ['#8b0000', '#00008b'],
  },
  {
    id: 9,
    name: 'Premium Gym Training Shoes',
    brand: 'SportyFeet',
    price: 55.0,
    image1: p26,
    image2: p1,
  },
  {
    id: 10,
    name: 'Lightweight Walking Sneakers',
    brand: 'UrbanStep',
    price: 32.0,
    image1: p2,
    image2: p3,
  },
];

const CountdownTimer = ({ initialCountdown }) => {
  const [timeLeft, setTimeLeft] = useState(initialCountdown);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, mins, secs } = prev;
        
        if (secs > 0) {
          secs--;
        } else {
          secs = 59;
          if (mins > 0) {
            mins--;
          } else {
            mins = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              } else {
                clearInterval(timer);
                return prev;
              }
            }
          }
        }
        
        return { days, hours, mins, secs };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="invisible lg:visible absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-7 bg-white/90 p-5 rounded text-center">
      <div className="flex flex-col px-3">
        <span className="text-lg">{timeLeft.days}</span>
        <span className="text-[12px] text-gray-500">Days</span>
      </div>
      <div className="flex flex-col px-3">
        <span className="text-lg">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-[12px] text-gray-500">Hours</span>
      </div>
      <div className="flex flex-col px-3">
        <span className="text-lg">{String(timeLeft.mins).padStart(2, '0')}</span>
        <span className="text-[12px] text-gray-500">Mins</span>
      </div>
      <div className="flex flex-col px-3">
        <span className="text-lg">{String(timeLeft.secs).padStart(2, '0')}</span>
        <span className="text-[12px] text-gray-500">Secs</span>
      </div>
    </div>
  );
};

const ProductSection = () => {
  const [activeTab, setActiveTab] = useState('FEATURED');
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <section className="py-10 lg:py-16 container mx-auto px-5 lg:px-10">
      <div className="text-center mb-10">
        <p className="text-[12px] tracking-[0.15em] uppercase text-gray-400 mb-8">
          The Latest Trends In Athletic Footwear
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          Sneakers & Kicks
        </h2>

        <div className="flex justify-center gap-10 text-sm md:text-base">
          <div className="relative pb-2 before:absolute before:-bottom-0 before:left-10 before:h-[1px] before:w-[330px] md:before:w-[400px] before:bg-gray-200 -z-1"></div>
          {['FEATURED', 'NEW ARRIVALS', 'BEST SELLER'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 uppercase tracking-wide transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
        className="pb-10"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="group flex flex-col h-full bg-white relative px-7 cursor-pointer">
              <div className="relative bg-[#f8f8f8] w-full aspect-square overflow-hidden mb-4">
                <img
                  src={product.image1}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                />
                <img
                  src={product.image2}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                />

                
                {product.countdown && (
                  <CountdownTimer initialCountdown={product.countdown} />
                )}
              </div>

              
              <div className="flex flex-col px-2 bg-white relative z-10 transition-transform duration-300 ease-in-out lg:group-hover:-translate-y-[60px]">
                {product.colors && (
                  <div className="flex gap-1.5 mb-3">
                    {product.colors.map((color, i) => (
                      <span
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-gray-300 cursor-pointer"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                )}

                <div className="text-gray-500 text-xl my-5">${product.price.toFixed(2)}</div>
                <h3 className="text-3xl mb-1 truncate text-gray-900">{product.name}</h3>
                <p className="text-gray-400 text-xl my-5">{product.brand}</p>

                
                <div className="flex items-center justify-between transition-all duration-300 ease-in-out
                                pt-4 mt-2 border-t border-dashed border-gray-200
                                lg:absolute lg:top-full lg:left-0 lg:right-0 lg:px-2 lg:pb-4 lg:bg-white 
                                lg:opacity-0 lg:pointer-events-none lg:group-hover:opacity-100 lg:group-hover:pointer-events-auto">
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
                    className="flex items-center gap-5 text-lg hover:text-[#f15f6f] transition-colors"
                  >
                    <ShoppingCart size={20} />
                    <span className="hidden md:inline">ADD TO CART</span>
                  </button>
                  <div className="flex items-center gap-3.5">
                    <button className="hover:text-black transition-colors" title="Quick View"><Eye size={20} /></button>
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
                      className={`transition-colors ${isInWishlist(product.id) ? 'text-black' : 'hover:text-black'}`} 
                      title={isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      <Heart size={20} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button className="hover:text-black transition-colors" title="Compare"><ArrowLeftRight size={20} /></button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductSection;
