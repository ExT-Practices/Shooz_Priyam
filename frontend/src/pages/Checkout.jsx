import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: '', city: '', postalCode: '', country: ''
  });

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = (Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice)).toFixed(2);

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!user) {
        alert("Please log in to place an order");
        navigate('/register');
        return;
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          orderItems: cartItems.map(item => ({
             name: item.name,
             qty: item.quantity,
             image: item.images?.[0] || item.image1,
             price: item.price,
             product: item._id
          })),
          shippingAddress,
          paymentMethod: 'Credit Card',
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice
        })
      });

      if (res.ok) {
        clearCart();
        alert('Order placed successfully!');
        navigate('/account');
      } else {
        const error = await res.json();
        alert(error.message);
      }
    } catch (error) {
      console.error(error);
      alert('Error placing order');
    }
  };

  if (cartItems.length === 0) {
      return <div className="py-20 text-center text-xl">Your cart is empty. <br/><button onClick={() => navigate('/')} className="mt-4 text-blue-500 underline">Go Shopping</button></div>
  }

  return (
    <div className="container mx-auto px-5 lg:px-10 py-16">
      <h2 className="text-3xl font-bold mb-10">Checkout</h2>
      <div className="flex flex-col lg:flex-row gap-10">
        <form onSubmit={placeOrder} className="flex-1 space-y-6">
          <h3 className="text-xl font-semibold border-b pb-2">Shipping Address</h3>
          <input required type="text" placeholder="Address" value={shippingAddress.address} onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})} className="w-full border p-3" />
          <input required type="text" placeholder="City" value={shippingAddress.city} onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})} className="w-full border p-3" />
          <input required type="text" placeholder="Postal Code" value={shippingAddress.postalCode} onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})} className="w-full border p-3" />
          <input required type="text" placeholder="Country" value={shippingAddress.country} onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})} className="w-full border p-3" />
          
          <button type="submit" className="w-full bg-[#0a1e42] hover:bg-[#08152e] text-white py-4 text-lg font-semibold tracking-wider">PLACE ORDER</button>
        </form>
        
        <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold border-b pb-2 mb-4">Order Summary</h3>
          <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                  <div key={item._id} className="flex justify-between items-center text-sm">
                      <span className="flex-1">{item.name} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
              ))}
          </div>
          <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
              <div className="flex justify-between"><span>Items:</span> <span>${itemsPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping:</span> <span>${shippingPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax:</span> <span>${taxPrice.toFixed(2)}</span></div>
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
              <span>Total:</span> <span>${totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
