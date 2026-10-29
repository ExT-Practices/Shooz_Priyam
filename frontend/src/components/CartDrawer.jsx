import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Package, FileText, Ticket, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <>
      
      <div 
        className={`fixed inset-0 bg-black/50 z-[200] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsCartOpen(false)}
      ></div>

      
      <div 
        className={`fixed inset-y-0 right-0 p-6.5 w-[400px] md:w-[500px] bg-white z-[210] transform transition-transform duration-300 flex flex-col shadow-xl ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        
        <div className="flex items-center justify-between px-6 py-8 border-b border-gray-200">
          <h2 className="text-xl font-medium text-text-primary">Cart ({cartCount})</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 hover:text-black transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        
        <div className="px-6 py-8 flex flex-col gap-8">
          <div className="flex items-center gap-3 text-[14px] text-primary">
            <Package size={18} strokeWidth={1.5} className="text-gray-600" />
            <span>
              {cartTotal < 1000 
                ? `Spend $${(1000 - cartTotal).toFixed(2)} for Free Shipping` 
                : "Congratulations! You've got free shipping!"}
            </span>
          </div>
          <div className="w-full h-[4px] bg-gray-200 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-black transition-all duration-300"
              style={{ width: `${Math.min((cartTotal / 1000) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        
        <div className="flex-1 overflow-y-auto px-6 py-9 flex flex-col gap-6">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-9">
                <div className="w-[80px] h-[80px] bg-[#f8f8f8] flex-shrink-0">
                  <img src={item.images?.[0] || item.image1} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="text-[14px] text-text-primary mb-1 leading-tight">{item.name}</h3>
                  <p className="text-[14px] text-gray-500 mb-2">${item.price.toFixed(2)} x {item.quantity}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    
                    <div className="flex items-center border border-gray-200 text-text-primary">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2.5 py-1 text-gray-500 hover:text-black transition-colors"
                      >
                        -
                      </button>
                      <span className="px-2 text-[13px]">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2.5 py-1 text-gray-500 hover:text-black transition-colors"
                      >
                        +
                      </button>
                    </div>
                    
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[13px] text-gray-400 hover:text-black underline underline-offset-4 decoration-gray-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

          
          <div className="mt-6 mb-10">
            <h3 className="font-bold text-[20px] text-primary">You may also like</h3>
          </div>
        
        
        <div className="px-6 py-5 flex flex-col bg-white">
          <div className="flex items-center gap-10 mb-6 py-8 border-t border-b border-gray-200">
            <button className="flex items-center gap-2 text-[12px] text-gray-600 hover:text-black transition-colors">
              <FileText size={16} strokeWidth={1.5} /> Order Note
            </button>
            <button className="flex items-center gap-2 text-[12px] text-gray-600 hover:text-black transition-colors">
              <Ticket size={16} strokeWidth={1.5} /> Coupon
            </button>
            <button className="flex items-center gap-2 text-[12px] text-gray-600 hover:text-black transition-colors">
              <Truck size={16} strokeWidth={1.5} /> Shipping
            </button>
          </div>
          
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[16px] text-text-primary">Total:</span>
            <span className="font-bold text-[16px] text-text-primary">${cartTotal.toFixed(2)}</span>
          </div>
          
          <p className="text-[12px] text-gray-500 mb-5">Taxes and shipping calculated at checkout</p>
          
          <button 
            onClick={() => {
              setIsCartOpen(false);
              navigate('/checkout');
            }}
            className="bg-[#ae3f4f] w-[50%] self-end hover:bg-black text-white font-bold text-[14px] tracking-wide py-3.5 transition-colors duration-300">
            CHECK OUT
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
