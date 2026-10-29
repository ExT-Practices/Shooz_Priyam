import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, X, Upload, Image as ImageIcon, Link as LinkIcon, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './admin.css';

const initialFormData = {
  title: '',
  subtitle: '',
  description: '',
  position: 'left',
  image: '',
  link: '/shop',
  isActive: true
};

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingBannerId, setEditingBannerId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useAuth();

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/banners');
      const data = await res.json();
      setBanners(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch banners', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingBannerId(null);
    setFormData(initialFormData);
    setShowModal(true);
  };

  const handleOpenEdit = (banner) => {
    setEditingBannerId(banner._id);
    setFormData({
      title: banner.title || '',
      subtitle: banner.subtitle || '',
      description: banner.description || '',
      position: banner.position || 'left',
      image: banner.image || '',
      link: banner.link || '/shop',
      isActive: banner.isActive !== false
    });
    setShowModal(true);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.token}` },
        body: fd
      });
      const data = await res.json();
      if (res.ok && data.imageUrl) {
        setFormData(prev => ({ ...prev, image: data.imageUrl }));
      } else {
        alert(data.message || 'Image upload failed');
      }
    } catch (error) {
      console.error('Upload failed', error);
      alert('Upload failed. Please check network and try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Please upload a banner image');
      return;
    }

    try {
      const url = editingBannerId ? `/api/banners/${editingBannerId}` : '/api/banners';
      const method = editingBannerId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setShowModal(false);
        setEditingBannerId(null);
        setFormData(initialFormData);
        fetchBanners();
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to save banner');
      }
    } catch (error) {
      console.error('Failed to save banner', error);
    }
  };

  const toggleActiveStatus = async (banner) => {
    try {
      const res = await fetch(`/api/banners/${banner._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ isActive: !banner.isActive })
      });
      if (res.ok) {
        fetchBanners();
      }
    } catch (error) {
      console.error('Failed to toggle status', error);
    }
  };

  const deleteBanner = async (id) => {
    if (window.confirm('Are you sure you want to delete this promotional banner?')) {
      try {
        const res = await fetch(`/api/banners/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${user.token}` }
        });
        if (res.ok) {
          fetchBanners();
        }
      } catch (error) {
        console.error('Failed to delete banner', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="py-[80px] text-center text-slate-400">
        <div className="w-[36px] h-[36px] border-[3px] border-[#ae3f4f] border-t-transparent rounded-full animate-spin mx-auto mb-[16px]" />
        <p className="text-[14px]">Loading banners...</p>
      </div>
    );
  }

  return (
    <div className="space-y-[28px] animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[16px]">
        <div>
          <h1 className="text-[26px] sm:text-[30px] font-black text-white tracking-tight leading-tight">
            Promotional Banners
          </h1>
          <p className="text-[14px] text-slate-400 mt-[4px]">
            Manage hero carousel slides and homepage promotional advertisements dynamically with Cloudinary.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-[8px] bg-[#ae3f4f] hover:bg-[#963442] text-white text-[14px] font-bold px-[20px] h-[44px] rounded-[12px] shadow-sm transition-all cursor-pointer"
        >
          <Plus size={18} /> Add New Banner
        </button>
      </div>

      {/* Banner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
        {banners.map((b) => (
          <div
            key={b._id}
            className="group rounded-[16px] bg-[#0f172a] border border-[#1e293b] overflow-hidden shadow-sm transition-all duration-200 hover:border-[#334155] flex flex-col justify-between"
          >
            {/* Banner Media Container */}
            <div className="relative h-[220px] sm:h-[240px] w-full overflow-hidden bg-slate-900">
              <img
                src={b.image}
                alt={b.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/30 to-transparent" />

              {/* Status & Position badges overlay */}
              <div className="absolute top-[12px] left-[12px] flex items-center gap-[8px] z-10">
                <span
                  className={`inline-flex items-center gap-[4px] px-[10px] py-[4px] rounded-full text-[11px] font-bold tracking-wide uppercase ${
                    b.isActive !== false
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-700/60 text-slate-400 border border-slate-600/30'
                  }`}
                >
                  <span
                    className={`w-[6px] h-[6px] rounded-full ${
                      b.isActive !== false ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'
                    }`}
                  />
                  {b.isActive !== false ? 'Active' : 'Hidden'}
                </span>

                <span className="px-[8px] py-[3px] rounded-[6px] text-[11px] font-semibold bg-black/60 text-slate-300 border border-white/10 uppercase">
                  Align: {b.position || 'left'}
                </span>
              </div>
            </div>

            {/* Banner Details */}
            <div className="p-[20px] flex-1 flex flex-col justify-between">
              <div>
                {b.subtitle && (
                  <span className="text-[12px] font-bold tracking-wider uppercase text-[#ae3f4f] block mb-[4px]">
                    {b.subtitle}
                  </span>
                )}
                <h3 className="text-[17px] font-bold text-white leading-snug mb-[8px] line-clamp-2">
                  {b.title}
                </h3>
                {b.description && (
                  <p className="text-[13px] text-slate-400 line-clamp-2 mb-[12px] leading-relaxed">
                    {b.description}
                  </p>
                )}
                {b.link && (
                  <span className="inline-flex items-center gap-[6px] text-[12px] text-slate-400 mb-[16px] truncate max-w-full">
                    <LinkIcon size={13} className="text-slate-500 shrink-0" /> {b.link}
                  </span>
                )}
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-[14px] border-t border-[#1e293b] gap-[8px]">
                <button
                  type="button"
                  onClick={() => toggleActiveStatus(b)}
                  className={`inline-flex items-center gap-[6px] text-[12px] font-semibold px-[12px] h-[34px] rounded-[8px] transition-colors cursor-pointer border ${
                    b.isActive !== false
                      ? 'text-slate-300 bg-[#1e293b]/60 hover:bg-[#1e293b] border-[#334155]'
                      : 'text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30'
                  }`}
                  title={b.isActive !== false ? 'Hide from storefront' : 'Show on storefront'}
                >
                  {b.isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                  {b.isActive !== false ? 'Hide' : 'Activate'}
                </button>

                <div className="flex items-center gap-[8px]">
                  <button
                    onClick={() => handleOpenEdit(b)}
                    className="p-[8px] rounded-[8px] bg-[#1e293b]/80 hover:bg-[#334155] text-slate-300 hover:text-white border border-[#334155] transition-colors cursor-pointer"
                    title="Edit banner"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={() => deleteBanner(b._id)}
                    className="p-[8px] rounded-[8px] bg-[#1e293b]/80 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-[#334155] transition-colors cursor-pointer"
                    title="Delete banner"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {banners.length === 0 && (
          <div className="col-span-full py-[64px] text-center text-slate-400 bg-[#0f172a] rounded-[16px] border border-[#1e293b]">
            <div className="w-[56px] h-[56px] rounded-[16px] bg-[#1e293b] flex items-center justify-center mx-auto mb-[12px] text-slate-500">
              <ImageIcon size={28} />
            </div>
            <h4 className="text-[16px] font-bold text-white mb-[4px]">No Banners Configured</h4>
            <p className="text-[13px] text-slate-400">Add banners to display on the storefront homepage hero slider.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-[20px] overflow-y-auto">
          <div className="bg-[#0f172a] border border-[#334155] rounded-[20px] shadow-2xl w-full max-w-[560px] p-[28px] sm:p-[34px] animate-in fade-in duration-150 my-[30px]">
            <div className="flex justify-between items-center pb-[18px] border-b border-[#1e293b] mb-[24px]">
              <div>
                <h3 className="text-[20px] font-bold text-white">
                  {editingBannerId ? 'Edit Hero Banner' : 'Add New Banner'}
                </h3>
                <p className="text-[13px] text-slate-400 mt-[4px]">
                  Configure homepage hero slide image and call-to-action details
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-[8px] text-slate-400 hover:text-white rounded-[8px] hover:bg-[#1e293b] cursor-pointer transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-[18px]">
              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                  Main Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Discover The Latest Trends In Footwear"
                  className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] px-[16px] h-[44px] text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-[#ae3f4f]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                    Subtitle / Eyebrow
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="e.g. STEP INTO STYLE"
                    className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] px-[16px] h-[44px] text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-[#ae3f4f]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                    Content Alignment
                  </label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] px-[16px] h-[44px] text-[14px] text-white focus:outline-none focus:border-[#ae3f4f] cursor-pointer"
                  >
                    <option value="left">Left Aligned</option>
                    <option value="right">Right Aligned</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                  Description / Paragraph
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. From classic sneakers to trendy boots, our collection has something for everyone."
                  className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] p-[14px] text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-[#ae3f4f] resize-none"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                  Destination Link
                </label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="e.g. /shop"
                  className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] px-[16px] h-[44px] text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-[#ae3f4f]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                  Banner Graphic Image (Cloudinary) *
                </label>
                <label className="cursor-pointer bg-[#090d16] hover:bg-[#1e293b] border border-[#1e293b] p-[16px] rounded-[12px] flex items-center justify-center gap-[10px] text-[13px] font-semibold text-slate-200 transition-colors">
                  <Upload size={16} className="text-[#ae3f4f]" />
                  {uploading ? 'Uploading to Cloudinary...' : 'Upload Image to Cloudinary'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
                {formData.image && (
                  <div className="mt-[12px] relative w-full h-[150px] rounded-[12px] overflow-hidden border border-[#334155] bg-slate-900 group">
                    <img src={formData.image} alt="preview" className="w-full h-full object-cover" />
                    <div className="absolute bottom-[8px] right-[8px] bg-black/75 px-[8px] py-[3px] rounded-[6px] text-[11px] text-emerald-400 font-semibold flex items-center gap-[4px]">
                      <CheckCircle2 size={12} /> Cloudinary Hosted
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-[10px] pt-[4px]">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-[18px] h-[18px] accent-[#ae3f4f] rounded cursor-pointer"
                />
                <label htmlFor="isActive" className="text-[14px] text-slate-300 font-medium cursor-pointer">
                  Display this banner actively on the storefront
                </label>
              </div>

              <div className="flex justify-end gap-[12px] pt-[20px] border-t border-[#1e293b]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-[20px] h-[44px] rounded-[12px] text-[14px] font-semibold text-slate-400 hover:text-white bg-[#1e293b]/60 hover:bg-[#1e293b] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-[#ae3f4f] hover:bg-[#963442] text-white px-[24px] h-[44px] rounded-[12px] text-[14px] font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  {editingBannerId ? 'Update Banner' : 'Save Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banners;
