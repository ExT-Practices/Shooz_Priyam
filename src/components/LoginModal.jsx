import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setError('');
    login();
    onClose();
    navigate('/account');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      ></div>

      
      <div className="relative bg-white w-full max-w-[500px] p-15 shadow-xl z-10 mx-4">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-500 hover:text-black transition-colors focus-visible:outline-none"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        <div className="flex flex-col items-center">
          <h2 className="text-[30px] font-bold mb-9">Login</h2>
          <p className={`text-[16px] ${error ? 'mb-4' : 'mb-10'}`}>Please enter your e-mail and password:</p>

          {error && (
            <div className="w-full bg-red-50 text-red-600 px-4 py-3 mb-6 border border-red-200 text-[14px]">
              {error}
            </div>
          )}

          <form className="w-full flex flex-col gap-5" onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className={`w-full border px-8 py-7 mb-6.5 focus:outline-none transition-colors text-[15px] ${error && !email ? 'border-red-500' : 'border-gray-200 focus:border-gray-400'}`}
            />
            
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className={`w-full border px-8 py-7 mb-5 focus:outline-none transition-colors text-[15px] ${error && email && !password ? 'border-red-500' : 'border-gray-200 focus:border-gray-400'}`}
            />

            <div className="flex justify-end w-full mb-2">
              <a href="#" className="text-[13px] text-gray-500 hover:text-surface-raised transition-colors underline underline-offset-2">
                Forgot your password?
              </a>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#bd4b5e] hover:bg-[#a03b4b] text-white font-medium py-3.5 transition-colors text-[14px] tracking-wider uppercase"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-[16px] text-text-primary">
            New customer? <Link to="/register" onClick={onClose} className="hover:text-surface-raised text-gray-500 transition-colors underline underline-offset-2">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
