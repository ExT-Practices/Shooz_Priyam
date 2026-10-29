import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div className="flex flex-col bg-white w-full">
      
      <div className="container mx-auto px-5 lg:px-[70px] py-10 text-[14px]">
        <Link to="/" className="text-[#dcb14a] hover:text-[#dcb14a]/80 transition-colors">Home</Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-500">Wishlist</span>
      </div>

      
      <div className="flex-1 flex flex-col items-center justify-start pt-5 pb-32">
        <h1 className="text-[36px] font-bold mb-10 text-primary">Wishlist</h1>
        
        {wishlistItems.length === 0 ? (
          <div className="bg-[#fcf7e6] text-[#b38a36] px-10 py-6 text-[16px] font-medium rounded text-center">
            There are no products in your wishlist!
          </div>
        ) : (
          <div className="w-full px-10 lg:px-[70px]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full max-w-[1400px] mx-auto">
              {wishlistItems.map((product) => (
                <div key={product.id} className="flex flex-row items-center gap-6 pb-6 border-b lg:border-none border-gray-100">
                  <div className="w-[120px] h-[120px] bg-[#f8f8f8] flex-shrink-0 overflow-hidden">
                    <img src={product.images?.[0] || product.image1} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="text-3xl font-bold text-text-primary">{product.name}</h3>
                    <p className="text-gray-500">${product.price.toFixed(2)}</p>
                    <button 
                      onClick={() => removeFromWishlist(product.id)}
                      className="text-gray-400 hover:text-surface-raised text-[13px] transition-colors mt-1 underline underline-offset-4 decoration-gray-300 hover:decoration-surface-raised"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
