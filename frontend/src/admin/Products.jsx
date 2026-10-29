import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  Upload, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Star, 
  Flame, 
  Sparkles,
  Package,
  Layers,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './admin.css';

const SHOE_SIZES = ['5', '6', '7', '8', '9', '10', '11', '12', '13'];
const PRODUCT_TYPES = ['Sneakers', 'Boots', 'Loafers', 'Running Shoes', 'Work Shoes', 'Sandals', 'Moccasins', 'Flats', 'Heels'];
const MATERIAL_OPTIONS = ['Leather', 'Canvas', 'Suede', 'Mesh', 'Synthetic', 'Vegan Leather', 'Rubber', 'Knit'];

const initialForm = {
  name: '',
  brand: '',
  price: '',
  category: '',
  description: '',
  images: [],
  inStock: true,
  isFeatured: false,
  isNewArrival: false,
  isBestSeller: false,
  sizes: [],
  material: '',
  productType: '',
  tags: ''
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [formData, setFormData] = useState(initialForm);
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name || '',
      brand: product.brand || '',
      price: product.price || '',
      category: product.category || '',
      description: product.description || '',
      images: product.images || [],
      inStock: product.inStock !== undefined ? product.inStock : true,
      isFeatured: !!product.isFeatured,
      isNewArrival: !!product.isNewArrival,
      isBestSeller: !!product.isBestSeller,
      sizes: product.sizes || [],
      material: product.material || '',
      productType: product.productType || '',
      tags: (product.tags || []).join(', ')
    });
    setShowModal(true);
  };

  const toggleSize = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const toggleStockStatus = async (product) => {
    const updatedStatus = !product.inStock;
    try {
      const res = await fetch(`/api/products/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ inStock: updatedStatus })
      });
      if (res.ok) {
        setProducts(prev =>
          prev.map(p => (p._id === product._id ? { ...p, inStock: updatedStatus } : p))
        );
      }
    } catch (error) {
      console.error('Failed to toggle stock status', error);
    }
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const fd = new FormData();
    files.forEach(file => fd.append('images', file));

    try {
      const res = await fetch('/api/upload/multiple', {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.token}` },
        body: fd
      });
      const data = await res.json();
      if (res.ok && data.imageUrls) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...data.imageUrls]
        }));
      }
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = editingId ? `/api/products/${editingId}` : '/api/products';
      const method = editingId ? 'PUT' : 'POST';

      const tagsArray = formData.tags
        ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        : [];

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          tags: tagsArray
        })
      });

      if (res.ok) {
        setShowModal(false);
        fetchProducts();
        setFormData(initialForm);
        setEditingId(null);
      } else {
        const errData = await res.json();
        alert(errData.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Failed to save product', error);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you wish to delete this product?')) {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${user.token}` }
        });
        if (res.ok) {
          fetchProducts();
        }
      } catch (error) {
        console.error('Failed to delete product', error);
      }
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = 
      selectedCategory === 'All' || 
      p.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categoryListOptions = categories.map(c => c.name).sort((a, b) => a.localeCompare(b));

  if (loading) {
    return (
      <div className="py-[80px] text-center text-slate-400">
        <div className="w-[36px] h-[36px] border-[3px] border-[#ae3f4f] border-t-transparent rounded-full animate-spin mx-auto mb-[16px]" />
        <p className="text-[14px]">Loading catalog inventory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-[28px] animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[16px]">
        <div>
          <h1 className="text-[26px] sm:text-[30px] font-black text-white tracking-tight leading-tight">
            Products Management
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-[8px] bg-[#ae3f4f] hover:bg-[#963442] text-white text-[14px] font-bold px-[20px] h-[44px] rounded-[12px] shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Plus size={18} /> Add New Product
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-[16px] bg-[#0f172a] border border-[#1e293b] p-[20px] flex flex-col md:flex-row items-center justify-between gap-[16px] shadow-sm">
        <div className="relative w-full md:w-[380px]">
          <Search size={18} className="absolute left-[16px] top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product title or brand..."
            className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] pl-[44px] pr-[16px] h-[44px] text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-[#ae3f4f] transition-colors"
          />
        </div>

        <div className="flex items-center gap-[12px] w-full md:w-auto">
          <Filter size={18} className="text-slate-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-[260px] bg-[#090d16] border border-[#1e293b] rounded-[12px] px-[16px] h-[44px] text-[14px] text-white focus:outline-none focus:border-[#ae3f4f] transition-colors cursor-pointer"
          >
            <option value="All">All Categories ({products.length})</option>
            {categoryListOptions.map((catName) => {
              const count = products.filter(p => p.category?.toLowerCase() === catName.toLowerCase()).length;
              return (
                <option key={catName} value={catName}>
                  {catName} ({count})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-[16px] bg-[#0f172a] border border-[#1e293b] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[12px] font-bold uppercase tracking-wider text-slate-400 border-b border-[#1e293b] bg-[#0b101d]">
                <th className="py-[14px] px-[20px]">Item</th>
                <th className="py-[14px] px-[20px]">Brand & Category</th>
                <th className="py-[14px] px-[20px]">Price</th>
                <th className="py-[14px] px-[20px]">Merchandising</th>
                <th className="py-[14px] px-[20px]">Stock Status</th>
                <th className="py-[14px] px-[20px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b] text-[14px]">
              {filteredProducts.map((p) => (
                <tr key={p._id} className="hover:bg-[#1e293b]/40 transition-colors">
                  <td className="py-[16px] px-[20px]">
                    <div className="flex items-center gap-[14px]">
                      <img
                        src={p.images?.[0] || 'https://via.placeholder.com/80'}
                        alt={p.name}
                        className="w-[52px] h-[52px] object-cover rounded-[12px] bg-slate-900 border border-[#1e293b] shrink-0 shadow-sm"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-white truncate max-w-[240px] leading-tight text-[14px]">{p.name}</p>
                        <p className="text-[12px] font-mono text-slate-400 mt-[4px]">#{p._id.substring(p._id.length - 6).toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-[16px] px-[20px]">
                    <span className="text-slate-200 font-bold block leading-tight text-[14px]">{p.brand}</span>
                    <span className="text-[12px] font-medium text-slate-400 mt-[4px] inline-block bg-[#1e293b] px-[8px] py-[2px] rounded-[6px]">{p.category}</span>
                  </td>
                  <td className="py-[16px] px-[20px] font-black text-white text-[16px]">
                    ${p.price ? p.price.toFixed(2) : '0.00'}
                  </td>
                  <td className="py-[16px] px-[20px]">
                    <div className="flex flex-wrap gap-[6px]">
                      {p.isFeatured && (
                        <span className="inline-flex items-center gap-[4px] px-[10px] py-[3px] rounded-full text-[11px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <Star size={11} /> Featured
                        </span>
                      )}
                      {p.isNewArrival && (
                        <span className="inline-flex items-center gap-[4px] px-[10px] py-[3px] rounded-full text-[11px] font-bold uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          <Sparkles size={11} /> New
                        </span>
                      )}
                      {p.isBestSeller && (
                        <span className="inline-flex items-center gap-[4px] px-[10px] py-[3px] rounded-full text-[11px] font-bold uppercase bg-rose-500/10 text-[#ae3f4f] border border-rose-500/20">
                          <Flame size={11} /> Best
                        </span>
                      )}
                      {!p.isFeatured && !p.isNewArrival && !p.isBestSeller && (
                        <span className="text-[12px] text-slate-500 font-medium">Standard</span>
                      )}
                    </div>
                  </td>
                  <td className="py-[16px] px-[20px]">
                    <button
                      onClick={() => toggleStockStatus(p)}
                      className={`inline-flex items-center gap-[6px] px-[12px] py-[6px] rounded-full text-[12px] font-bold transition-all cursor-pointer ${
                        p.inStock
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20'
                      }`}
                      title="Click to toggle stock status"
                    >
                      {p.inStock ? (
                        <>
                          <CheckCircle2 size={14} /> In Stock
                        </>
                      ) : (
                        <>
                          <XCircle size={14} /> Out of Stock
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-[16px] px-[20px] text-right">
                    <div className="inline-flex items-center gap-[8px]">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-[8px] text-slate-400 hover:text-white hover:bg-[#1e293b] rounded-[8px] transition-colors cursor-pointer"
                        title="Edit product"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="p-[8px] text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-[8px] transition-colors cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-[48px] text-center text-slate-400 text-[14px]">
                    No products found matching your search query or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-[20px]">
          <div className="bg-[#0f172a] border border-[#334155] rounded-[20px] shadow-2xl w-full max-w-[680px] max-h-[90vh] overflow-y-auto p-[28px] sm:p-[36px] animate-in fade-in duration-150">
            <div className="flex justify-between items-center pb-[18px] border-b border-[#1e293b] mb-[24px]">
              <div>
                <h3 className="text-[20px] font-bold text-white">
                  {editingId ? 'Edit Product Details' : 'Add New Product'}
                </h3>
                <p className="text-[13px] text-slate-400 mt-[4px]">
                  Configure store pricing, category, images, and homepage merchandising tags
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-[8px] text-slate-400 hover:text-white rounded-[8px] hover:bg-[#1e293b] cursor-pointer transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-[20px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                    Product Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Air Zoom Runner"
                    className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] px-[16px] h-[44px] text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-[#ae3f4f]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. Nike, Adidas, Puma"
                    className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] px-[16px] h-[44px] text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-[#ae3f4f]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                    Price ($ USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="120.00"
                    className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] px-[16px] h-[44px] text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-[#ae3f4f]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] px-[16px] h-[44px] text-[14px] text-white focus:outline-none focus:border-[#ae3f4f] cursor-pointer"
                  >
                    <option value="" disabled>-- Select Category --</option>
                    {categoryListOptions.map((catName) => (
                      <option key={catName} value={catName}>{catName}</option>
                    ))}
                    {formData.category && !categoryListOptions.some(name => name.toLowerCase() === formData.category.toLowerCase()) && (
                      <option value={formData.category}>{formData.category}</option>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe footwear construction, materials, and features..."
                  className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] p-[14px] text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-[#ae3f4f]"
                />
              </div>

              {/* Images */}
              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                  Product Gallery Images
                </label>
                <div className="flex items-center gap-[14px]">
                  <label className="cursor-pointer bg-[#090d16] hover:bg-[#1e293b] border border-[#1e293b] px-[18px] py-[10px] rounded-[12px] text-[13px] font-bold text-slate-200 flex items-center gap-[8px] transition-colors">
                    <Upload size={16} className="text-[#ae3f4f]" />
                    {uploading ? 'Uploading to Cloudinary...' : 'Upload Photos'}
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                  <span className="text-[12px] text-slate-400">Supported formats: JPG, PNG, WEBP</span>
                </div>

                {formData.images.length > 0 && (
                  <div className="flex gap-[12px] mt-[14px] flex-wrap">
                    {formData.images.map((url, i) => (
                      <div key={i} className="relative group w-[76px] h-[76px] rounded-[12px] overflow-hidden border border-[#334155] bg-slate-900">
                        <img src={url} alt={`preview ${i}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          title="Remove image"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Status and Flags */}
              <div className="border-t border-[#1e293b] pt-[20px]">
                <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-400 mb-[12px]">
                  Merchandising Flags & Inventory
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-[12px]">
                  <label className="flex items-center gap-[10px] text-[13px] font-bold text-slate-200 bg-[#090d16] p-[12px] rounded-[12px] border border-[#1e293b] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      className="w-[16px] h-[16px] rounded accent-[#ae3f4f]"
                    />
                    In Stock
                  </label>
                  <label className="flex items-center gap-[10px] text-[13px] font-bold text-slate-200 bg-[#090d16] p-[12px] rounded-[12px] border border-[#1e293b] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-[16px] h-[16px] rounded accent-[#ae3f4f]"
                    />
                    Featured
                  </label>
                  <label className="flex items-center gap-[10px] text-[13px] font-bold text-slate-200 bg-[#090d16] p-[12px] rounded-[12px] border border-[#1e293b] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isNewArrival}
                      onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                      className="w-[16px] h-[16px] rounded accent-[#ae3f4f]"
                    />
                    New Arrival
                  </label>
                  <label className="flex items-center gap-[10px] text-[13px] font-bold text-slate-200 bg-[#090d16] p-[12px] rounded-[12px] border border-[#1e293b] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                      className="w-[16px] h-[16px] rounded accent-[#ae3f4f]"
                    />
                    Best Seller
                  </label>
                </div>
              </div>

              {/* Filter Fields */}
              <div className="border-t border-[#1e293b] pt-[20px] space-y-[18px]">
                <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-400 mb-[4px]">
                  Filter Attributes
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                      Material
                    </label>
                    <select
                      value={formData.material}
                      onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                      className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] px-[16px] h-[44px] text-[14px] text-white focus:outline-none focus:border-[#ae3f4f] cursor-pointer"
                    >
                      <option value="">-- Select Material --</option>
                      {MATERIAL_OPTIONS.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                      Product Type
                    </label>
                    <select
                      value={formData.productType}
                      onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                      className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] px-[16px] h-[44px] text-[14px] text-white focus:outline-none focus:border-[#ae3f4f] cursor-pointer"
                    >
                      <option value="">-- Select Type --</option>
                      {PRODUCT_TYPES.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                    Available Sizes
                  </label>
                  <div className="flex flex-wrap gap-[8px]">
                    {SHOE_SIZES.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={`w-[40px] h-[40px] rounded-[8px] text-[13px] font-bold border transition-colors cursor-pointer ${
                          formData.sizes.includes(size)
                            ? 'bg-[#ae3f4f] border-[#ae3f4f] text-white'
                            : 'bg-[#090d16] border-[#1e293b] text-slate-300 hover:border-[#ae3f4f]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="e.g. Casual, Lightweight, Eco-Friendly"
                    className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] px-[16px] h-[44px] text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-[#ae3f4f]"
                  />
                </div>
              </div>

              {/* Actions */}
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
                  className="bg-[#ae3f4f] hover:bg-[#963442] text-white px-[24px] h-[44px] rounded-[12px] text-[14px] font-bold shadow-sm transition-all cursor-pointer"
                >
                  {editingId ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
