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
  const [email, setEmail] = useState('priyampatel968@gmail.com');
  
  const [tempFirstName, setTempFirstName] = useState('');
  const [tempLastName, setTempLastName] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  
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

  const { logout } = useAuth();
  const navigate = useNavigate();

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

  const handleSaveProfile = () => {
    setFirstName(tempFirstName);
    setLastName(tempLastName);
    setEmail(tempEmail);
    setShowEditProfileModal(false);
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

  const handleSaveAddress = () => {
    if (editingAddressIndex !== null) {
      const updatedAddresses = [...addresses];
      updatedAddresses[editingAddressIndex] = addressData;
      setAddresses(updatedAddresses);
    } else {
      setAddresses([...addresses, addressData]);
    }
    setShowAddressModal(false);
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
            <div className="w-full border border-gray-100 rounded-[20px] p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden bg-white">
              <div className="flex justify-between items-start mb-8 z-10 relative">
                <div className="flex flex-col gap-1">
                  <h2 className="text-[22px] font-bold text-gray-900">Welcome</h2>
                  <p className="text-[16px] text-gray-500">Ready to shop?</p>
                </div>
                <button className="bg-[#1b4bc3] hover:bg-[#153ea3] text-white text-[15px] font-medium px-6 py-2.5 rounded-[8px] transition-colors">
                  Shop now
                </button>
              </div>

              <div className="flex justify-center items-center mt-12 mb-4 relative z-0 h-[140px] w-full overflow-hidden">
                {allShoes.map((src, i) => {
                  const pos = (i - offset + 10) % 10;
                  let transform = '';
                  let opacity = 1;
                  let zIndex = 1;

                  switch(pos) {
                    case 0:
                      transform = 'translateX(-348px) translateY(24px) scale(0.5)';
                      opacity = 0;
                      break;
                    case 1:
                      transform = 'translateX(-232px) translateY(24px) rotate(-15deg) scale(0.9)';
                      break;
                    case 2:
                      transform = 'translateX(-116px) translateY(8px) rotate(-5deg) scale(1)';
                      zIndex = 2;
                      break;
                    case 3:
                      transform = 'translateX(0px) translateY(-8px) rotate(0deg) scale(1.1)';
                      zIndex = 10;
                      break;
                    case 4:
                      transform = 'translateX(116px) translateY(8px) rotate(5deg) scale(1)';
                      zIndex = 2;
                      break;
                    case 5:
                      transform = 'translateX(232px) translateY(24px) rotate(15deg) scale(0.9)';
                      break;
                    case 6:
                      transform = 'translateX(348px) translateY(24px) scale(0.5)';
                      opacity = 0;
                      break;
                    default:
                      transform = 'translateX(348px) translateY(24px) scale(0.5)';
                      opacity = 0;
                      break;
                  }

                  const transition = pos >= 7 || pos === 9 ? 'none' : 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

                  return (
                    <div 
                      key={i} 
                      className="absolute w-[100px] h-[100px] bg-gray-50 rounded-[16px] flex items-center justify-center p-3 shadow-sm"
                      style={{ transform, opacity, zIndex, transition }}
                    >
                      <img src={src} alt="shoe" className="object-contain w-full h-full mix-blend-multiply" />
                    </div>
                  );
                })}
              </div>
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
