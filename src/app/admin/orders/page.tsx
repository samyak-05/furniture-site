'use client';
import React, { useEffect, useState } from 'react';
import { Search, ClipboardList, Clock, Truck, CheckCircle2, Phone, MapPin } from 'lucide-react';
import axios from 'axios';
import Navbar from '@/components/Navbar';

interface IOrderItem {
  product: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface IOrderAddress {
  fullAddress: string;
  city: string;
  mobile: string;
  state: string;
  pincode: string;
}

interface IOrder {
  _id: string;
  user: string;
  items: IOrderItem[];
  totalAmount: number;
  paymentMethod: "COD" | "Online";
  address: IOrderAddress;
  status: "Manufacturing" | "Out For Delivery" | "Delivered";
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchAdminOrders() {
      try {
        const res = await axios.get('/api/admin/getOrders');
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed fetching admin order records:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAdminOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      // Direct optimistic state update to avoid reload lags
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus as any } : o));
      await axios.patch(`/api/admin/orders/${orderId}`, { status: newStatus });
    } catch (err) {
      console.error("Failed executing order status switch operation:", err);
    }
  };

  const filteredOrders = orders.filter(order => {
    const customerMobile = (order?.address?.mobile || "");
    const customerPincode = (order?.address?.pincode || "");
    const orderIdString = (order?._id || "");
    
    return customerMobile.includes(searchQuery) || 
           customerPincode.includes(searchQuery) || 
           orderIdString.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Manufacturing":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Out For Delivery":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-neutral-50 text-neutral-600 border-neutral-200";
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border border-neutral-300 border-t-black animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FAF9F6] text-neutral-800">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-black/5 pb-5 mb-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-black">Customer Orders</h1>
            <p className="text-xs text-gray-400 mt-0.5">Fulfill, monitor statuses, and check local Indore delivery paths.</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 bg-white border border-black/5 px-4 py-2 rounded-xl shadow-sm">
            <span className="flex items-center gap-1"><Clock size={14} className="text-orange-500" /> Mfg</span>
            <span className="flex items-center gap-1"><Truck size={14} className="text-blue-500" /> Out</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-emerald-500" /> Done</span>
          </div>
        </div>

        <div className="mb-6 max-w-xs">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Mobile, Pincode or ID..."
              className="w-full py-1.5 pl-9 pr-4 rounded-lg text-xs outline-none border border-neutral-200 bg-white focus:border-neutral-400 transition-colors"
            />
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="w-full py-16 text-center border border-dashed border-neutral-200 rounded-2xl bg-white">
            <ClipboardList size={32} className="mx-auto text-neutral-300 mb-2" />
            <p className="text-xs text-neutral-400">No matching logistical order profiles processed yet.</p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-sm">
            <table className="w-full border-collapse text-left text-xs min-w-[900px]">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/70 text-neutral-500 font-medium">
                  <th className="p-4 pl-5">Order ID & Date</th>
                  <th className="p-4">Purchased Items</th>
                  <th className="p-4">Delivery Coordinates</th>
                  <th className="p-4 text-center">Payment</th>
                  <th className="p-4">Total Value</th>
                  <th className="p-4">Workflow Status</th>
                  <th className="p-4 pr-5 text-right">Update Progression</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-neutral-50/40 transition-colors">
                    
                    <td className="p-4 pl-5 vertical-top">
                      <span className="font-mono text-[11px] font-semibold text-black block truncate max-w-[100px]">
                        #{order._id}
                      </span>
                      <span className="text-[10px] text-neutral-400 block mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric'
                        })}
                      </span>
                    </td>

                    <td className="p-4 max-w-[240px]">
                      <div className="flex flex-col gap-1.5">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-neutral-800">
                            <span className="font-mono text-[10px] bg-neutral-100 px-1.5 py-0.5 rounded font-bold text-neutral-600">
                              {item.quantity}x
                            </span>
                            <span className="truncate max-w-[160px] font-medium">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="p-4 max-w-[220px]">
                      <div className="flex flex-col gap-0.5 text-neutral-600">
                        <p className="truncate text-black font-medium">{order.address.fullAddress}</p>
                        <p className="text-[11px] flex items-center gap-1 text-neutral-400 mt-0.5">
                          <MapPin size={10} /> {order.address.city} — {order.address.pincode}
                        </p>
                        <p className="text-[11px] flex items-center gap-1 text-neutral-500 font-medium">
                          <Phone size={10} /> {order.address.mobile}
                        </p>
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${
                        order.paymentMethod === 'Online' 
                          ? 'bg-purple-50 text-purple-700 border-purple-200' 
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                      }`}>
                        {order.paymentMethod}
                      </span>
                    </td>

                    <td className="p-4 font-semibold text-black font-mono">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </td>

                    <td className="p-4">
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-semibold tracking-wide uppercase ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </td>

                    <td className="p-4 pr-5 text-right">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="text-xs py-1 px-2 rounded-lg border border-neutral-200 bg-neutral-50 outline-none text-neutral-800 font-medium focus:border-neutral-400 cursor-pointer transition-colors"
                      >
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Out For Delivery">Out For Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}