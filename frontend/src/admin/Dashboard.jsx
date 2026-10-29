import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Package, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  TrendingUp, 
  Clock, 
  Plus, 
  ChevronRight, 
  CheckCircle,
  AlertCircle,
  Layers, 
  Image as ImageIcon,
  ExternalLink,
  Store
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './admin.css';

const StatCard = ({ title, value, icon: Icon, change, subtext, iconColor = 'text-[#ae3f4f]', iconBg = 'bg-[#ae3f4f]/15' }) => (
  <div className="bg-[#0f172a] border border-[#1e293b] rounded-[16px] p-[24px] shadow-sm hover:border-[#334155] transition-all flex flex-col justify-between">
    <div className="flex items-center justify-between">
      <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400">{title}</span>
      <div className={`w-[44px] h-[44px] rounded-[12px] ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
        <Icon size={22} />
      </div>
    </div>

    <div className="my-[16px]">
      <div className="text-[32px] font-black text-white tracking-tight leading-none">{value}</div>
    </div>

    <div className="flex items-center gap-[8px] text-[12px]">
      <span className="inline-flex items-center gap-[4px] font-bold text-emerald-400 bg-emerald-500/10 px-[8px] py-[3px] rounded-[6px]">
        <TrendingUp size={12} />
        {change}
      </span>
      <span className="text-slate-400 font-medium">{subtext}</span>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/orders/stats', {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to load dashboard metrics', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchStats();
    }
  }, [user]);

  return (
    <div className="space-y-[28px] animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-[#0f172a] border border-[#1e293b] rounded-[16px] p-[28px] sm:p-[32px] flex flex-col md:flex-row md:items-center justify-between gap-[20px] shadow-sm">
        <div>
          <h1 className="text-[26px] sm:text-[30px] font-black text-white tracking-tight leading-tight">
            Welcome back, {user?.name || user?.email?.split('@')[0] || 'Administrator'}
          </h1>
          <p className="text-[14px] text-slate-400 mt-[4px] max-w-2xl leading-relaxed">
            Monitor incoming customer orders, manage product catalog inventory, and track sales revenue in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-[12px] shrink-0">
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-[8px] bg-[#ae3f4f] hover:bg-[#963442] text-white text-[14px] font-bold px-[20px] h-[44px] rounded-[12px] shadow-sm transition-all"
          >
            <Plus size={18} /> Add New Product
          </Link>
          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-[8px] bg-[#1e293b] hover:bg-[#283548] text-slate-200 text-[14px] font-semibold px-[18px] h-[44px] rounded-[12px] border border-[#334155] transition-colors"
          >
            <Store size={18} className="text-[#ae3f4f]" /> View Storefront
          </Link>
        </div>
      </div>

      {/* 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
        <StatCard 
          title="Total Revenue" 
          value={`$${(stats.totalRevenue || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={DollarSign} 
          subtext="lifetime sales"
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/15"
        />
        <StatCard 
          title="Total Orders" 
          value={(stats.totalOrders || 0).toLocaleString()} 
          icon={ShoppingBag} 
          subtext="completed orders"
          iconColor="text-[#ae3f4f]"
          iconBg="bg-[#ae3f4f]/15"
        />
        <StatCard 
          title="Products" 
          value={(stats.totalProducts || 0).toLocaleString()} 
          icon={Package} 
          subtext="in database"
          iconColor="text-indigo-400"
          iconBg="bg-indigo-500/15"
        />
        <StatCard 
          title="Registered Users" 
          value={(stats.totalUsers || 0).toLocaleString()} 
          icon={Users} 
          change="Customer"
          subtext="accounts"
          iconColor="text-amber-400"
          iconBg="bg-amber-500/15"
        />
      </div>

      {/* Main Grid: Orders & Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-start">
        {/* Recent Orders Section (8 cols) */}
        <div className="lg:col-span-8 bg-[#0f172a] border border-[#1e293b] rounded-[16px] p-[24px] sm:p-[28px] shadow-sm">
          <div className="flex items-center justify-between pb-[20px] border-b border-[#1e293b]">
            <div>
              <h2 className="text-[18px] font-bold text-white">Recent Customer Orders</h2>
              <p className="text-[13px] text-slate-400 mt-[2px]">Latest purchases submitted on your storefront</p>
            </div>
            <Link 
              to="/admin/orders" 
              className="text-[13px] font-bold text-[#ae3f4f] hover:text-[#d35b6b] flex items-center gap-[4px] transition-colors"
            >
              View All Orders <ChevronRight size={16} />
            </Link>
          </div>

          <div className="overflow-x-auto mt-[16px]">
            {stats.recentOrders && stats.recentOrders.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[12px] font-bold uppercase tracking-wider text-slate-400 border-b border-[#1e293b] bg-[#0b101d]">
                    <th className="py-[14px] px-[18px]">Order ID</th>
                    <th className="py-[14px] px-[18px]">Customer</th>
                    <th className="py-[14px] px-[18px]">Date</th>
                    <th className="py-[14px] px-[18px]">Total</th>
                    <th className="py-[14px] px-[18px] text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e293b] text-[14px]">
                  {stats.recentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-[#1e293b]/40 transition-colors">
                      <td className="py-[16px] px-[18px] font-mono text-[13px] font-semibold text-slate-300">
                        #{order._id.substring(order._id.length - 6).toUpperCase()}
                      </td>
                      <td className="py-[16px] px-[18px]">
                        <div className="font-bold text-white leading-tight">{order.user?.name || 'Customer'}</div>
                        <div className="text-[12px] text-slate-400 mt-[2px]">{order.user?.email || 'N/A'}</div>
                      </td>
                      <td className="py-[16px] px-[18px] text-[13px] text-slate-400">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent'}
                      </td>
                      <td className="py-[16px] px-[18px] font-bold text-white text-[15px]">
                        ${order.totalPrice?.toFixed(2)}
                      </td>
                      <td className="py-[16px] px-[18px] text-right">
                        <span className={`inline-flex items-center px-[10px] py-[4px] rounded-full text-[12px] font-bold ${
                          order.isDelivered 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {order.isDelivered ? 'Delivered' : 'Processing'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-[48px] text-center text-slate-400 text-[14px]">
                <div className="w-[56px] h-[56px] rounded-[16px] bg-[#1e293b] flex items-center justify-center mx-auto mb-[12px] text-slate-500">
                  <ShoppingBag size={28} />
                </div>
                <h4 className="text-[16px] font-bold text-white mb-[4px]">No Orders Placed Yet</h4>
                <div className="mt-[20px]">
                  <Link
                    to="/"
                    target="_blank"
                    className="inline-flex items-center gap-[8px] text-[13px] font-bold text-white bg-[#1e293b] hover:bg-[#283548] px-[18px] py-[10px] rounded-[12px] border border-[#334155] transition-colors"
                  >
                    Open Storefront <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-[20px]">
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-[16px] p-[24px] shadow-sm">
            <h2 className="text-[18px] font-bold text-white mb-[2px]">Catalog Management</h2>
            <p className="text-[13px] text-slate-400 mb-[20px]">Quick access to manage your store's resources</p>

            <div className="space-y-[12px]">
              <Link 
                to="/admin/products"
                className="flex items-center justify-between p-[16px] rounded-[12px] bg-[#090d16] hover:bg-[#1e293b] border border-[#1e293b] hover:border-[#334155] transition-all group"
              >
                <div className="flex items-center gap-[14px]">
                  <div className="w-[42px] h-[42px] rounded-[10px] bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
                    <Package size={20} />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-white group-hover:text-[#ae3f4f] transition-colors">Manage Products</h4>
                    <p className="text-[12px] text-slate-400 mt-[2px]">{stats.totalProducts} items in database</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-white transition-colors" />
              </Link>

              <Link 
                to="/admin/categories"
                className="flex items-center justify-between p-[16px] rounded-[12px] bg-[#090d16] hover:bg-[#1e293b] border border-[#1e293b] hover:border-[#334155] transition-all group"
              >
                <div className="flex items-center gap-[14px]">
                  <div className="w-[42px] h-[42px] rounded-[10px] bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-white group-hover:text-[#ae3f4f] transition-colors">Product Categories</h4>
                    <p className="text-[12px] text-slate-400 mt-[2px]">Organize taxonomy & badges</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-white transition-colors" />
              </Link>

              <Link 
                to="/admin/banners"
                className="flex items-center justify-between p-[16px] rounded-[12px] bg-[#090d16] hover:bg-[#1e293b] border border-[#1e293b] hover:border-[#334155] transition-all group"
              >
                <div className="flex items-center gap-[14px]">
                  <div className="w-[42px] h-[42px] rounded-[10px] bg-rose-500/15 text-[#ae3f4f] flex items-center justify-center shrink-0">
                    <ImageIcon size={20} />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-white group-hover:text-[#ae3f4f] transition-colors">Hero Banners</h4>
                    <p className="text-[12px] text-slate-400 mt-[2px]">Homepage slides & promotions</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
