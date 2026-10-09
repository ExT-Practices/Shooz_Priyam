import React from 'react';
import img1 from '../assets/images/product-3.jpg';
import img2 from '../assets/images/product-4.jpg';
import img3 from '../assets/images/product-15.jpg';

const products = [
  { id: 1, name: 'Classic White Tennis Sneakers', price: '25.00', image: img2 },
  { id: 2, name: 'Waterproof Hiking Boots', price: '25.00', image: img3 },
  { id: 3, name: 'Classic Leather Sneakers', price: '21.00', image: img1 },
];


const gridItems = [
  products[0], products[0], products[0],
  products[1], products[1], products[1],
  products[2], products[2], products[2],
];

const DiscountSection = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gray-500 text-sm tracking-[0.2em] uppercase mb-6.5">
            SEASON'S END SALE
          </p>
          <h2 className="text-[30px] md:text-5xl font-bold mb-6.5 text-gray-900">
            Huge discounts on last season's styles
          </h2>
          <p className="text-gray-500 text-lg md:text-base max-w-2xl mx-auto leading-relaxed">
            Himenaeos nascetur tristique consequat mus ad.
            <br />
            Accumsan fringilla in laoreet id bibendum et.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10">
          {gridItems.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-6 py-8 border-b border-gray-200 ${
                index >= 6 ? 'md:border-b-0' : ''
              } ${index === 8 ? 'border-b-0' : ''}`}
            >
              <div className="w-24 h-24 bg-gray-50 flex items-center justify-center p-2 rounded-sm shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-[20px] text-gray-900 font-medium mb-1">
                  {item.name}
                </h3>
                <p className="text-[18px] text-gray-600">
                  ${item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;
