import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Image as ImageIcon, 
  Layers, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  Shield, 
  ChevronRight, 
  User as UserIcon, 
  Store 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './admin.css';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Products', path: '/admin/products', icon: Package },
  { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
  { name: 'Categories', path: '/admin/categories', icon: Layers },
  { name: 'Banners', path: '/admin/banners', icon: ImageIcon },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') return null;

  const currentNav = navItems.find(item => 
    item.path === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(item.path)
  ) || { name: 'Admin Console' };

  return (
    <div className="flex h-screen bg-[#090d16] text-slate-100 font-sans overflow-hidden">
      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static top-0 bottom-0 left-0 z-50 w-[280px] bg-[#0f172a] border-r border-[#1e293b] flex flex-col shrink-0
        transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand */}
        <div className="h-[76px] px-[24px] border-b border-[#1e293b] flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-[12px] group">
            <div className="w-[42px] h-[42px] rounded-[12px] bg-[#ae3f4f] flex items-center justify-center text-white shadow-md shadow-[#ae3f4f]/30">
              <Shield size={22} className="text-white" />
            </div>
            <div>
              <div className="text-[18px] font-extrabold tracking-tight text-white leading-tight">SHOOZ</div>
              <div className="text-[11px] font-bold tracking-wider uppercase text-slate-400">Admin Console</div>
            </div>
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-[8px] rounded-[8px] hover:bg-[#1e293b] cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation list */}
        <div className="p-[16px] flex-1 overflow-y-auto space-y-[6px]">
          <div className="px-[14px] py-[8px] text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Store Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === '/admin' 
              ? location.pathname === '/admin' 
              : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center justify-between px-[16px] py-[12px] rounded-[12px] font-semibold text-[14px] transition-all duration-150
                  ${isActive 
                    ? 'bg-[#1e293b] text-white border-l-[4px] border-[#ae3f4f] shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#1e293b]/60'}
                `}
              >
                <div className="flex items-center gap-[14px]">
                  <Icon size={20} className={isActive ? 'text-[#ae3f4f]' : 'text-slate-400'} />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight size={16} className="text-slate-400" />}
              </Link>
            );
          })}
        </div>

        <div className="p-[16px] border-t border-[#1e293b] space-y-[12px] bg-[#0b101d]">

          <div className="flex items-center justify-between pt-[6px] px-[4px]">
            <div className="flex items-center gap-[12px] overflow-hidden">
              <div className="w-[38px] h-[38px] rounded-full bg-[#1e293b] border border-[#334155] flex items-center justify-center text-slate-300 font-bold text-[14px] shrink-0">
                {user.name ? user.name.charAt(0).toUpperCase() : <UserIcon size={18} />}
              </div>
              <div className="truncate text-left">
                <p className="text-[14px] font-semibold text-white truncate leading-tight">{user.name || 'Admin User'}</p>
                <p className="text-[12px] text-slate-400 truncate mt-[2px]">{user.email}</p>
              </div>
            </div>
            <button 
              onClick={() => { logout(); navigate('/admin/login'); }}
              className="p-[8px] text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-[8px] transition-colors ml-[4px] shrink-0 cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-[68px] bg-[#0f172a] border-b border-[#1e293b] px-[24px] sm:px-[32px] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-[14px]">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-[8px] text-slate-400 hover:text-white rounded-[8px] hover:bg-[#1e293b] cursor-pointer"
            >
              <Menu size={22} />
            </button>
            <div className="flex items-center gap-[10px] text-[14px]">
              <span className="text-slate-400 font-medium">SHOOZ</span>
              <span className="text-slate-600 font-bold">/</span>
              <span className="text-white font-bold">{currentNav.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-[14px]">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-[8px] text-[13px] font-semibold text-slate-300 hover:text-white bg-[#1e293b] hover:bg-[#283548] border border-[#334155] px-[14px] py-[8px] rounded-[10px] transition-colors"
            >
              <ExternalLink size={14} /> Open Store
            </Link>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-[24px] sm:p-[32px] lg:p-[40px] bg-[#090d16]">
          <div className="max-w-[1500px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
