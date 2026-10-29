import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Eye, 
  X, 
  Search, 
  User as UserIcon, 
  MapPin, 
  CreditCard 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './admin.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const { user } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    } finally {
      setLoading(false);
    }
  };

  const deliverOrder = async (id) => {
    try {
      const res = await fetch(`/api/orders/${id}/deliver`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (res.ok) {
        fetchOrders();
        if (selectedOrder && selectedOrder._id === id) {
          setSelectedOrder(prev => ({ ...prev, isDelivered: true }));
        }
      }
    } catch (error) {
      console.error('Failed to mark order as delivered', error);
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.user?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'All' ? true :
      statusFilter === 'Delivered' ? o.isDelivered :
      !o.isDelivered;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="py-[80px] text-center text-slate-400">
        <div className="w-[36px] h-[36px] border-[3px] border-[#ae3f4f] border-t-transparent rounded-full animate-spin mx-auto mb-[16px]" />
        <p className="text-[14px]">Loading customer orders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-[28px] animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[16px]">
        <div>
          <h1 className="text-[26px] sm:text-[30px] font-black text-white tracking-tight leading-tight">
            Customer Orders
          </h1>
          <p className="text-[14px] text-slate-400 mt-[4px]">
            Review checkout transactions, track shipping fulfillment, and inspect order invoices for {orders.length} orders.
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="rounded-[16px] bg-[#0f172a] border border-[#1e293b] p-[20px] flex flex-col sm:flex-row items-center justify-between gap-[16px] shadow-sm">
        <div className="relative w-full sm:w-[380px]">
          <Search size={18} className="absolute left-[16px] top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order ID, customer name, or email..."
            className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] pl-[44px] pr-[16px] h-[44px] text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-[#ae3f4f] transition-colors"
          />
        </div>

        <div className="flex items-center gap-[10px] w-full sm:w-auto">
          {['All', 'Processing', 'Delivered'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-[18px] h-[44px] rounded-[12px] text-[13px] font-bold transition-all cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#ae3f4f] text-white shadow-sm'
                  : 'bg-[#090d16] text-slate-300 hover:text-white border border-[#1e293b] hover:bg-[#1e293b]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-[16px] bg-[#0f172a] border border-[#1e293b] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[12px] font-bold uppercase tracking-wider text-slate-400 border-b border-[#1e293b] bg-[#0b101d]">
                <th className="py-[14px] px-[20px]">Order ID</th>
                <th className="py-[14px] px-[20px]">Customer</th>
                <th className="py-[14px] px-[20px]">Date</th>
                <th className="py-[14px] px-[20px]">Items</th>
                <th className="py-[14px] px-[20px]">Total</th>
                <th className="py-[14px] px-[20px]">Delivery Status</th>
                <th className="py-[14px] px-[20px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b] text-[14px]">
              {filteredOrders.map((o) => (
                <tr key={o._id} className="hover:bg-[#1e293b]/40 transition-colors">
                  <td className="py-[16px] px-[20px] font-mono text-[13px] font-bold text-slate-300">
                    #{o._id.substring(o._id.length - 8).toUpperCase()}
                  </td>
                  <td className="py-[16px] px-[20px]">
                    <p className="font-bold text-white leading-tight text-[14px]">{o.user?.name || 'Customer'}</p>
                    <p className="text-[12px] text-slate-400 mt-[2px]">{o.user?.email || 'N/A'}</p>
                  </td>
                  <td className="py-[16px] px-[20px] text-[13px] text-slate-400">
                    {o.createdAt ? new Date(o.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-[16px] px-[20px] text-[13px] text-slate-300 font-medium">
                    {o.orderItems?.length || 0} item(s)
                  </td>
                  <td className="py-[16px] px-[20px] font-black text-white text-[16px]">
                    ${o.totalPrice?.toFixed(2)}
                  </td>
                  <td className="py-[16px] px-[20px]">
                    <span className={`inline-flex items-center gap-[6px] px-[12px] py-[5px] rounded-full text-[12px] font-bold ${
                      o.isDelivered 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {o.isDelivered ? <CheckCircle2 size={13} /> : <Clock size={13} />}
                      {o.isDelivered ? 'Delivered' : 'Processing'}
                    </span>
                  </td>
                  <td className="py-[16px] px-[20px] text-right">
                    <div className="inline-flex items-center gap-[8px]">
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="p-[8px] text-slate-400 hover:text-white hover:bg-[#1e293b] rounded-[8px] transition-colors cursor-pointer"
                        title="View details"
                      >
                        <Eye size={18} />
                      </button>
                      {!o.isDelivered && (
                        <button
                          onClick={() => deliverOrder(o._id)}
                          className="inline-flex items-center gap-[6px] bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/25 px-[14px] h-[36px] rounded-[10px] text-[12px] font-bold transition-colors cursor-pointer"
                        >
                          <Truck size={14} /> Deliver
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-[48px] text-center text-slate-400 text-[14px]">
                    No orders found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-[20px]">
          <div className="bg-[#0f172a] border border-[#334155] rounded-[20px] shadow-2xl w-full max-w-[680px] max-h-[90vh] overflow-y-auto p-[28px] sm:p-[36px] animate-in fade-in duration-150">
            <div className="flex justify-between items-center pb-[18px] border-b border-[#1e293b] mb-[24px]">
              <div>
                <h3 className="text-[20px] font-bold text-white">
                  Order #{selectedOrder._id.substring(selectedOrder._id.length - 8).toUpperCase()}
                </h3>
                <p className="text-[13px] text-slate-400 mt-[4px]">
                  Placed on {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : 'Recent'}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-[8px] text-slate-400 hover:text-white rounded-[8px] hover:bg-[#1e293b] cursor-pointer transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-[20px]">
              {/* Customer & Shipping Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                <div className="bg-[#090d16] p-[18px] rounded-[14px] border border-[#1e293b]">
                  <div className="flex items-center gap-[8px] text-[12px] font-bold uppercase tracking-wider text-slate-400 mb-[10px]">
                    <UserIcon size={14} className="text-[#ae3f4f]" /> Customer Info
                  </div>
                  <p className="text-[14px] font-bold text-white">{selectedOrder.user?.name || 'Customer'}</p>
                  <p className="text-[12px] text-slate-400 mt-[2px]">{selectedOrder.user?.email || 'N/A'}</p>
                  <p className="text-[12px] text-slate-300 mt-[8px] font-semibold">Payment: {selectedOrder.paymentMethod || 'Credit Card'}</p>
                </div>

                <div className="bg-[#090d16] p-[18px] rounded-[14px] border border-[#1e293b]">
                  <div className="flex items-center gap-[8px] text-[12px] font-bold uppercase tracking-wider text-slate-400 mb-[10px]">
                    <MapPin size={14} className="text-emerald-400" /> Shipping Destination
                  </div>
                  <p className="text-[13px] text-slate-200 leading-relaxed">
                    {selectedOrder.shippingAddress?.address || 'Standard Address'}<br />
                    {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}<br />
                    {selectedOrder.shippingAddress?.country}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="text-[12px] font-bold uppercase tracking-wider text-slate-400 mb-[12px]">
                  Purchased Items ({selectedOrder.orderItems?.length || 0})
                </h4>
                <div className="space-y-[10px]">
                  {selectedOrder.orderItems?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-[14px] rounded-[12px] bg-[#090d16] border border-[#1e293b]">
                      <div className="flex items-center gap-[14px]">
                        <img
                          src={item.image || 'https://via.placeholder.com/60'}
                          alt={item.name}
                          className="w-[52px] h-[52px] rounded-[10px] object-cover bg-slate-800 border border-[#1e293b] shrink-0"
                        />
                        <div>
                          <p className="text-[14px] font-bold text-white leading-tight">{item.name}</p>
                          <p className="text-[12px] text-slate-400 mt-[4px]">Qty: {item.qty} × ${item.price?.toFixed(2)}</p>
                        </div>
                      </div>
                      <span className="font-extrabold text-white text-[15px]">
                        ${((item.qty || 1) * (item.price || 0)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Breakdown */}
              <div className="p-[18px] rounded-[14px] bg-[#090d16] border border-[#1e293b] space-y-[10px] text-[13px]">
                <div className="flex justify-between text-slate-400">
                  <span>Items Total:</span>
                  <span>${(selectedOrder.itemsPrice || selectedOrder.totalPrice)?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping Fee:</span>
                  <span>${(selectedOrder.shippingPrice || 0)?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax:</span>
                  <span>${(selectedOrder.taxPrice || 0)?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-[15px] pt-[10px] border-t border-[#1e293b]">
                  <span>Grand Total:</span>
                  <span className="text-[#ae3f4f] text-[18px] font-black">${selectedOrder.totalPrice?.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-[12px] pt-[16px] border-t border-[#1e293b]">
                {!selectedOrder.isDelivered && (
                  <button
                    onClick={() => deliverOrder(selectedOrder._id)}
                    className="inline-flex items-center gap-[8px] bg-emerald-600 hover:bg-emerald-700 text-white px-[20px] h-[44px] rounded-[12px] text-[13px] font-bold transition-colors cursor-pointer"
                  >
                    <Truck size={16} /> Mark as Delivered
                  </button>
                )}
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-[20px] h-[44px] rounded-[12px] text-[14px] font-semibold text-slate-400 hover:text-white bg-[#1e293b]/60 hover:bg-[#1e293b] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
