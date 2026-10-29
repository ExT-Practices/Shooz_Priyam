import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DiscountSection = () => {
  const [gridItems, setGridItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data && data.length >= 3) {
            // Replicate the 9-item grid pattern using the first 3 products
            setGridItems([
                data[0], data[0], data[0],
                data[1], data[1], data[1],
                data[2], data[2], data[2]
            ]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
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
            <Link 
              to={`/product/${item._id}`}
              key={index} 
              className={`flex items-center gap-6 py-8 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                index >= 6 ? 'md:border-b-0' : ''
              } ${index === 8 ? 'border-b-0' : ''}`}
            >
              <div className="w-24 h-24 bg-gray-50 flex items-center justify-center p-2 rounded-sm shrink-0">
                <img 
                  src={item.images && item.images.length > 0 ? item.images[0] : ''} 
                  alt={item.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-[20px] text-gray-900 font-medium mb-1 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-[18px] text-gray-600">
                  ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;
