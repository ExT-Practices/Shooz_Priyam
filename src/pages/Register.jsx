import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const isActive = email.length > 0 || isFocused;

  const handleRegister = (e) => {
    if (e) e.preventDefault();
    
    if (!email) {
      setError('Please enter an email.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    login();
    navigate('/account');
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-sans">
      
      <div className="w-full py-10 text-center">
        <h1 className="text-[20px] font-bold text-[#0a1e42] tracking-wide">
          Qx Shooz ( Password : 1 )
        </h1>
      </div>

      
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-[400px] flex flex-col">
          <h2 className="text-[24px] font-bold text-gray-900 mb-1">Sign in</h2>
          <p className="text-[14px] text-gray-500 mb-6">Sign in or create an account</p>

          <button onClick={handleRegister} className="w-full bg-[#5a31f4] hover:bg-[#4a26d1] text-white rounded-[6px] py-3.5 flex justify-center items-center gap-1.5 transition-colors mb-6">
            <span className="text-[15px] font-medium tracking-wide">Continue with <span className="font-bold">shop</span></span>
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-[1px] bg-gray-200"></div>
            <span className="text-[12px] text-gray-400 uppercase tracking-widest">or</span>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>

          <div className={`relative w-full mb-4 rounded-[6px] bg-white border transition-all ${error ? 'border-red-500' : isFocused ? 'border-[#0058a3] ring-1 ring-[#0058a3]' : 'border-gray-300 hover:border-gray-400'}`}>
            <label 
              htmlFor="email-input"
              className={`absolute left-4 transition-all duration-200 pointer-events-none text-gray-500 ${isActive ? 'top-1.5 text-[11px]' : 'top-1/2 -translate-y-1/2 text-[15px]'}`}
            >
              Email
            </label>
            <input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full bg-transparent px-4 pr-12 pt-6 pb-2 outline-none border-none focus:outline-none focus:ring-0 focus:border-none text-[15px]"
            />
            <button onClick={handleRegister} className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-[4px] transition-colors ${email.length > 0 ? 'bg-[#0058a3] text-white hover:bg-[#004682]' : 'text-gray-400 hover:text-gray-600'}`}>
              <ArrowRight size={20} strokeWidth={1.5} />
            </button>
          </div>

          {error && <p className="text-red-500 text-[13px] -mt-2 mb-4 self-start pl-1">{error}</p>}

          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center">
              <input type="checkbox" className="peer appearance-none w-[18px] h-[18px] border border-gray-300 rounded-[3px] checked:bg-white checked:border-[#0058a3] cursor-pointer transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 pointer-events-none text-[#0058a3]">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <span className="text-[14px] text-gray-700">Email me with news and offers</span>
          </label>
        </div>
      </div>

      
      <div className="w-full py-8 flex justify-center mt-auto">
        <a href="#" className="text-[14px] text-[#0058a3] hover:underline">Privacy policy</a>
      </div>
    </div>
  );
};

export default Register;
