import React, { useState, useEffect } from 'react';
import { User, MapPin, Mail, X, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/images/product-1.jpg';
import img2 from '../assets/images/product-2.jpg';
import img3 from '../assets/images/product-3.jpg';
import img4 from '../assets/images/product-4.jpg';
import img7 from '../assets/images/product-7.jpg';

const CustomInput = ({ placeholder, value, onChange, type = "text" }) => {
  return (
    <input 
      type={type} 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange}
      className="w-full bg-white border border-gray-300 rounded-[6px] px-3.5 py-[11px] text-[14px] text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#1b4bc3] focus:ring-1 focus:ring-[#1b4bc3] transition-all"
    />
  );
};

const CustomSelect = ({ label, value, onChange, options }) => {
  return (
    <div className="relative w-full border border-gray-300 rounded-[6px] focus-within:border-[#1b4bc3] focus-within:ring-1 focus-within:ring-[#1b4bc3] transition-all bg-white">
      <label className="absolute left-3.5 top-1.5 text-[11px] text-gray-500 pointer-events-none">
        {label}
      </label>
      <select 
        value={value}
        onChange={onChange}
        className="w-full bg-transparent px-3.5 pt-[17px] pb-1.5 outline-none appearance-none text-[14px] text-gray-900 cursor-pointer border-none focus:ring-0"
      >
        <option value="" disabled hidden></option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
  );
};

const Account = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [isMarketingEmail, setIsMarketingEmail] = useState(false);
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);
  
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  const [tempFirstName, setTempFirstName] = useState('');
  const [tempLastName, setTempLastName] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  
  const [orders, setOrders] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchOrders();
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/users/profile', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setFirstName(data.firstName || '');
        setLastName(data.lastName || '');
        setEmail(data.email || '');
        setAddresses(data.addresses || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders/mine', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => (prev + 1) % 10);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [addressData, setAddressData] = useState({
    country: 'Australia',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    suburb: '',
    state: 'Australian Capital Territory',
    postcode: '',
    isDefault: false,
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleToggleClick = () => {
    if (isMarketingEmail) {
      setShowUnsubscribeModal(true);
    } else {
      setIsMarketingEmail(true);
    }
  };

  const handleUnsubscribe = () => {
    setIsMarketingEmail(false);
    setShowUnsubscribeModal(false);
  };

  const handleEditClick = () => {
    setTempFirstName(firstName);
    setTempLastName(lastName);
    setTempEmail(email);
    setShowEditProfileModal(true);
  };

  const handleSaveProfile = async () => {
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          firstName: tempFirstName,
          lastName: tempLastName,
          email: tempEmail
        })
      });
      if (res.ok) {
        setFirstName(tempFirstName);
        setLastName(tempLastName);
        setEmail(tempEmail);
        setShowEditProfileModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddAddressClick = () => {
    setAddressData({
      country: 'Australia',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      suburb: '',
      state: 'Australian Capital Territory',
      postcode: '',
      isDefault: addresses.length === 0,
    });
    setEditingAddressIndex(null);
    setShowAddressModal(true);
  };

  const handleEditAddressClick = (index) => {
    setAddressData(addresses[index]);
    setEditingAddressIndex(index);
    setShowAddressModal(true);
  };

  const handleSaveAddress = async () => {
    let updatedAddresses;
    if (editingAddressIndex !== null) {
      updatedAddresses = [...addresses];
      updatedAddresses[editingAddressIndex] = addressData;
    } else {
      updatedAddresses = [...addresses, addressData];
    }
    
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          addresses: updatedAddresses
        })
      });
      
      if (res.ok) {
        setAddresses(updatedAddresses);
        setShowAddressModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const hasChanges = tempFirstName !== firstName || tempLastName !== lastName || tempEmail !== email;

  const baseShoes = [img1, img2, img3, img4, img7];
  const allShoes = [...baseShoes, ...baseShoes];

  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-sans">
      
      <div className="w-full flex items-center justify-between px-8 py-6 max-w-[1200px] mx-auto">
        <h1 className="text-[20px] font-bold text-[#0a1e42] tracking-wide">
          Qx Shooz ( Password : 1 )
        </h1>
        <div 
          onClick={() => setActiveTab('profile')}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <User size={20} strokeWidth={1.5} />
        </div>
      </div>

      
      <div className="flex-1 w-full max-w-[1200px] mx-auto px-8 pt-10 flex gap-16">
        
        <div className="w-[200px] flex flex-col gap-2 shrink-0">
          <button 
            onClick={() => setActiveTab('orders')} 
            className={`text-[18px] text-left transition-colors ${activeTab === 'orders' ? 'font-bold text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Orders
          </button>
          <button 
            onClick={() => setActiveTab('profile')} 
            className={`text-[18px] text-left transition-colors ${activeTab === 'profile' ? 'font-bold text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Profile
          </button>
        </div>

        
        <div className="flex-1 w-full max-w-[700px]">
          {activeTab === 'orders' ? (
            <div className="w-full flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Order History</h3>
              </div>
              {orders.length === 0 ? (
                <div className="border border-gray-100 rounded-[12px] p-7 shadow-sm bg-white text-center">
                  <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                  <button onClick={() => navigate('/')} className="bg-[#1b4bc3] hover:bg-[#153ea3] text-white text-[15px] font-medium px-6 py-2.5 rounded-[8px] transition-colors">
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {orders.map((order) => (
                    <div key={order._id} className="border border-gray-100 rounded-[12px] p-6 shadow-sm bg-white flex flex-col gap-4">
                      <div className="flex justify-between items-center border-b pb-4">
                        <div>
                          <p className="text-sm text-gray-500">Order ID</p>
                          <p className="font-medium">{order._id.substring(0, 10)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-medium">{order.createdAt.substring(0, 10)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total</p>
                          <p className="font-medium">${order.totalPrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {order.isDelivered ? 'Delivered' : 'Processing'}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {order.orderItems.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover border" />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-gray-500">Qty: {item.qty} | ${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full flex flex-col gap-9">
              
              <div>
                <div className="flex justify-between items-center mb-7">
                  <h3 className="text-[16px] font-bold text-gray-900">Contact</h3>
                  <button onClick={handleEditClick} className="text-[14px] font-bold border border-gray-200 rounded-[6px] px-4 py-2 hover:bg-gray-50 transition-colors">Edit</button>
                </div>
                <div className="border border-gray-100 rounded-[12px] p-7 flex justify-between items-center shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] bg-white">
                  <span className="text-[14px] text-gray-400">Email</span>
                  <div className="flex flex-col items-end">
                    {firstName || lastName ? (
                      <>
                        <span className="text-[14px] text-gray-900 font-medium">{firstName} {lastName}</span>
                        <span className="text-[14px] text-gray-500">{email}</span>
                      </>
                    ) : (
                      <span className="text-[14px] text-gray-900 font-medium">{email}</span>
                    )}
                  </div>
                </div>
              </div>

              
              <div>
                <div className="flex justify-between items-center mb-7">
                  <h3 className="text-[16px] font-bold text-gray-900">Addresses</h3>
                  <button onClick={handleAddAddressClick} className="text-[14px] font-bold border border-gray-200 rounded-[6px] px-4 py-2 hover:bg-gray-50 transition-colors">Add</button>
                </div>
                {addresses.length === 0 ? (
                  <div className="border border-gray-100 rounded-[12px] p-7 flex items-center gap-3 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] bg-white">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      <MapPin size={16} strokeWidth={1.5} className="text-gray-500" />
                    </div>
                    <span className="text-[14px] text-gray-400">No addresses added</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {addresses.map((addr, index) => (
                      <div key={index} className="border border-gray-100 rounded-[12px] p-7 flex justify-between items-start shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] bg-white">
                        <div className="flex items-start gap-4">
                          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                            <MapPin size={16} strokeWidth={1.5} className="text-gray-500" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[14px] text-gray-900 font-medium">{addr.firstName} {addr.lastName}</span>
                            <span className="text-[14px] text-gray-500 mt-1">{addr.address}{addr.apartment ? `, ${addr.apartment}` : ''}</span>
                            <span className="text-[14px] text-gray-500">{addr.suburb}, {addr.state} {addr.postcode}</span>
                            <span className="text-[14px] text-gray-500">{addr.country}</span>
                            {addr.isDefault && (
                              <span className="text-[12px] text-[#1b4bc3] font-medium mt-2 bg-blue-50 px-2 py-1 rounded w-fit">Default address</span>
                            )}
                          </div>
                        </div>
                        <button onClick={() => handleEditAddressClick(index)} className="text-[14px] font-bold border border-gray-200 rounded-[6px] px-4 py-2 hover:bg-gray-50 transition-colors">Edit</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              
              <div>
                <div className="flex justify-between items-center mb-7">
                  <h3 className="text-[16px] font-bold text-gray-900">Marketing preferences</h3>
                </div>
                <div className="border border-gray-100 rounded-[12px] p-7 flex justify-between items-center shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] bg-white">
                  <div className="flex items-center gap-3">
                    <Mail size={18} strokeWidth={1.5} className="text-gray-500" />
                    <span className="text-[14px] text-gray-900">Email</span>
                  </div>
                  <div 
                    onClick={handleToggleClick}
                    className={`w-9 h-5.5 rounded-full flex items-center p-0.5 cursor-pointer transition-colors duration-300 ${isMarketingEmail ? 'bg-[#1b4bc3]' : 'bg-gray-200'}`}
                  >
                    <div className={`w-4.5 h-4.5 bg-white rounded-full shadow-sm transform transition-transform duration-300 flex items-center justify-center ${isMarketingEmail ? 'translate-x-[15px]' : 'translate-x-0'}`}>
                      {isMarketingEmail && <Check size={12} strokeWidth={3} className="text-[#1b4bc3]" />}
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="flex items-center gap-6 mt-2">
                <button 
                  onClick={handleLogout}
                  className="text-[14px] text-[#1b4bc3] font-semibold border border-gray-200 rounded-[6px] px-6 py-5 hover:bg-gray-50 transition-colors"
                >
                  Sign out
                </button>
                <button 
                  onClick={handleLogout}
                  className="text-[14px] text-[#1b4bc3] hover:underline"
                >
                  Sign out of all devices
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      
      <div className="w-full py-8 flex justify-center mt-auto">
        <a href="#" className="text-[14px] text-[#0058a3] hover:underline">Privacy policy</a>
      </div>

      
      {showUnsubscribeModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={() => setShowUnsubscribeModal(false)}></div>
          <div className="relative bg-white w-full max-w-[480px] p-7 rounded-[16px] shadow-2xl z-10 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[20px] font-bold text-gray-900">Unsubscribe from emails?</h3>
              <button onClick={() => setShowUnsubscribeModal(false)} className="text-gray-400 hover:text-gray-800 transition-colors">
                <X size={20} strokeWidth={2} />
              </button>
            </div>
            <p className="text-[14px] text-gray-700 leading-relaxed mb-8">
              You'll no longer receive email marketing from Qx Shooz ( Password : 1 )
            </p>
            <div className="flex justify-end items-center gap-6 mt-2">
              <button 
                onClick={() => setShowUnsubscribeModal(false)}
                className="text-[#1b4bc3] text-[14px] font-medium hover:underline underline-offset-2"
              >
                Cancel
              </button>
              <button 
                onClick={handleUnsubscribe}
                className="bg-[#1b4bc3] hover:bg-[#153ea3] text-white text-[14px] font-medium px-6 py-2.5 rounded-[8px] transition-colors"
              >
                Unsubscribe
              </button>
            </div>
          </div>
        </div>
      )}

      
      {showEditProfileModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={() => setShowEditProfileModal(false)}></div>
          <div className="relative bg-white w-full max-w-[600px] p-8 px-5.5 rounded-[16px] shadow-2xl z-10 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-[20px] font-bold text-gray-900">Edit profile</h3>
              <button onClick={() => setShowEditProfileModal(false)} className="text-gray-400 hover:text-gray-800 transition-colors">
                <X size={20} strokeWidth={2} />
              </button>
            </div>
            
            <div className="flex flex-col gap-8 mb-3">
              <div className="flex justify-center gap-8 w-full">
                <input type='text' placeholder='First Name' value={tempFirstName} onChange={(e) => setTempFirstName(e.target.value)} className='w-full border border-gray-300 rounded-[12px] p-2.5 text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                <input type='text' placeholder='Last Name' value={tempLastName} onChange={(e) => setTempLastName(e.target.value)} className='w-full border border-gray-300 rounded-[12px] p-2.5 text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500' />
              </div>
              <input type='email' placeholder='Email' value={tempEmail} onChange={(e) => setTempEmail(e.target.value)} className='border border-gray-300 rounded-[12px] p-2.5 text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </div>
            <p className="text-[12px] text-gray-500 mb-8 pl-1">This email is used for sign in and order updates.</p>
            
            <div className="flex justify-end items-center gap-8 mt-2">
              <button 
                onClick={() => setShowEditProfileModal(false)}
                className="text-[#1b4bc3] text-[14px] font-medium underline"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveProfile}
                disabled={!hasChanges}
                className={`text-[14px] font-medium px-6 py-5 rounded-[8px] transition-colors ${hasChanges ? 'bg-[#1b4bc3] hover:bg-[#153ea3] text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      
      {showAddressModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={() => setShowAddressModal(false)}></div>
          <div className="relative bg-white w-full max-w-[560px] p-7 rounded-[16px] shadow-2xl z-10 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[20px] font-bold text-gray-900">{editingAddressIndex !== null ? 'Edit address' : 'Add address'}</h3>
              <button onClick={() => setShowAddressModal(false)} className="text-gray-400 hover:text-gray-800 transition-colors">
                <X size={20} strokeWidth={2} />
              </button>
            </div>
            
            <div className="flex flex-col gap-3.5 mb-5">
              <CustomSelect 
                label="Country/region" 
                value={addressData.country} 
                onChange={(e) => setAddressData({...addressData, country: e.target.value})} 
                options={['Australia', 'United States', 'Canada', 'United Kingdom', 'India']} 
              />
              <div className="flex gap-3.5 w-full">
                <CustomInput placeholder="First name" value={addressData.firstName} onChange={(e) => setAddressData({...addressData, firstName: e.target.value})} />
                <CustomInput placeholder="Last name" value={addressData.lastName} onChange={(e) => setAddressData({...addressData, lastName: e.target.value})} />
              </div>
              <CustomInput placeholder="Address" value={addressData.address} onChange={(e) => setAddressData({...addressData, address: e.target.value})} />
              <CustomInput placeholder="Apartment, suite, etc (optional)" value={addressData.apartment} onChange={(e) => setAddressData({...addressData, apartment: e.target.value})} />
              <div className="flex gap-3.5 w-full">
                <div className="flex-1">
                  <CustomInput placeholder="Suburb" value={addressData.suburb} onChange={(e) => setAddressData({...addressData, suburb: e.target.value})} />
                </div>
                <div className="flex-[1.5]">
                  <CustomSelect 
                    label="State/territory" 
                    value={addressData.state} 
                    onChange={(e) => setAddressData({...addressData, state: e.target.value})} 
                    options={['Australian Capital Territory', 'New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'Northern Territory']} 
                  />
                </div>
                <div className="flex-1">
                  <CustomInput placeholder="Postcode" value={addressData.postcode} onChange={(e) => setAddressData({...addressData, postcode: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 mb-8 pl-5">
              <input 
                type="checkbox" 
                id="defaultAddress" 
                checked={addressData.isDefault}
                onChange={(e) => setAddressData({...addressData, isDefault: e.target.checked})}
                className="w-5.5 h-5.5 text-gray-900 border-gray-300 rounded-[10px] focus:ring-0 cursor-pointer"
              />
              <label htmlFor="defaultAddress" className="text-[14px] text-gray-800 cursor-pointer select-none">
                This is my default address
              </label>
            </div>
            
            <div className="flex justify-end items-center gap-8">
              <button 
                onClick={() => setShowAddressModal(false)}
                className="text-[#1b4bc3] text-[14px] font-medium underline"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveAddress}
                className={`text-[14px] font-medium px-6 py-5 rounded-[8px] transition-colors ${
                  addressData.firstName || addressData.address 
                    ? 'bg-[#1b4bc3] hover:bg-[#153ea3] text-white' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
