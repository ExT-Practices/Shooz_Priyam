import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Layers, Search, Upload, X, Package, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './admin.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Edit Modal State
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editUploading, setEditUploading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/products')
      ]);
      const catData = await catRes.json();
      const prodData = await prodRes.json();
      setCategories(Array.isArray(catData) ? catData : []);
      setProducts(Array.isArray(prodData) ? prodData : []);
    } catch (error) {
      console.error('Failed to fetch categories or products', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e, isEdit = false) => {
    const file = e.target.files[0];
    if (!file) return;

    if (isEdit) {
      setEditUploading(true);
    } else {
      setUploading(true);
    }

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
        if (isEdit) {
          setEditImage(data.imageUrl);
        } else {
          setImage(data.imageUrl);
        }
      } else {
        alert(data.message || 'Image upload failed');
      }
    } catch (err) {
      console.error('Failed to upload category image', err);
      alert('Upload failed. Please check network.');
    } finally {
      if (isEdit) {
        setEditUploading(false);
      } else {
        setUploading(false);
      }
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          name: name.trim(),
          image,
          description: description.trim()
        })
      });
      if (res.ok) {
        setName('');
        setImage('');
        setDescription('');
        fetchData();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to create category');
      }
    } catch (error) {
      console.error('Failed to create category', error);
    }
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setEditName(cat.name || '');
    setEditImage(cat.image || '');
    setEditDescription(cat.description || '');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingCategory || !editName.trim()) return;

    try {
      const res = await fetch(`/api/categories/${editingCategory._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          name: editName.trim(),
          image: editImage,
          description: editDescription.trim()
        })
      });

      if (res.ok) {
        setEditingCategory(null);
        fetchData();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to update category');
      }
    } catch (error) {
      console.error('Failed to update category', error);
    }
  };

  const deleteCategory = async (id, catName) => {
    const count = products.filter(p => p.category?.toLowerCase() === catName.toLowerCase()).length;
    const warning = count > 0 
      ? `Warning: ${count} product(s) are currently tagged with "${catName}". Are you sure you want to delete this category?`
      : `Are you sure you want to delete category "${catName}"?`;

    if (window.confirm(warning)) {
      try {
        const res = await fetch(`/api/categories/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${user.token}` }
        });
        if (res.ok) {
          fetchData();
        }
      } catch (error) {
        console.error('Failed to delete category', error);
      }
    }
  };

  const filtered = categories.filter(c =>
    c.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="py-[80px] text-center text-slate-400">
        <div className="w-[36px] h-[36px] border-[3px] border-[#ae3f4f] border-t-transparent rounded-full animate-spin mx-auto mb-[16px]" />
        <p className="text-[14px]">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="space-y-[28px] animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[16px]">
        <div>
          <h1 className="text-[26px] sm:text-[30px] font-black text-white tracking-tight leading-tight">
            Product Categories
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-start">
        {/* Form Card (5 cols) */}
        <div className="lg:col-span-5 bg-[#0f172a] border border-[#1e293b] rounded-[16px] p-[24px] sm:p-[28px] shadow-sm h-fit">
          <h2 className="text-[18px] font-bold text-white mb-[2px]">Add New Category</h2>
          <p className="text-[13px] text-slate-400 mb-[20px]">Create a category tag for catalog products</p>

          <form onSubmit={handleAdd} className="space-y-[18px]">
            <div>
              <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                Category Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Athletic Footwear, Casual Sneakers"
                className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] px-[16px] h-[44px] text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-[#ae3f4f] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                Description (Optional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. High-performance running footwear"
                className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] px-[16px] h-[44px] text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-[#ae3f4f] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                Thumbnail Image (Cloudinary)
              </label>
              <label className="cursor-pointer bg-[#090d16] hover:bg-[#1e293b] border border-[#1e293b] p-[16px] rounded-[12px] flex items-center justify-center gap-[10px] text-[13px] font-semibold text-slate-200 transition-colors">
                <Upload size={16} className="text-[#ae3f4f]" />
                {uploading ? 'Uploading to Cloudinary...' : 'Upload Category Image'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, false)}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              {image && (
                <div className="mt-[12px] relative w-[80px] h-[80px] rounded-[12px] overflow-hidden border border-[#334155] bg-slate-900 shadow-sm">
                  <img src={image} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-[#ae3f4f] hover:bg-[#963442] text-white text-[14px] font-bold h-[44px] rounded-[12px] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-[8px] disabled:opacity-50"
            >
              <Plus size={18} /> Create Category
            </button>
          </form>
        </div>

        {/* Categories List (7 cols) */}
        <div className="lg:col-span-7 bg-[#0f172a] border border-[#1e293b] rounded-[16px] p-[24px] sm:p-[28px] shadow-sm flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[16px] pb-[20px] border-b border-[#1e293b]">
            <div>
              <h2 className="text-[18px] font-bold text-white">Active Categories ({categories.length})</h2>
              <p className="text-[13px] text-slate-400 mt-[2px]">Manage catalog taxonomy and product groupings</p>
            </div>
            <div className="relative w-full sm:w-[240px]">
              <Search size={16} className="absolute left-[14px] top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories..."
                className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] pl-[40px] pr-[14px] h-[40px] text-[13px] text-white placeholder-slate-400 focus:outline-none focus:border-[#ae3f4f]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] mt-[20px]">
            {filtered.map((c) => {
              const productCount = products.filter(
                p => p.category?.toLowerCase() === c.name?.toLowerCase()
              ).length;

              return (
                <div
                  key={c._id}
                  className="flex items-center justify-between p-[16px] rounded-[14px] bg-[#090d16] border border-[#1e293b] hover:border-[#334155] transition-colors group"
                >
                  <div className="flex items-center gap-[14px] min-w-0">
                    {c.image ? (
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-[52px] h-[52px] rounded-[12px] object-cover bg-slate-800 border border-[#1e293b] shrink-0"
                      />
                    ) : (
                      <div className="w-[52px] h-[52px] rounded-[12px] bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                        <Layers size={22} />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="text-[15px] font-bold text-white leading-tight truncate">{c.name}</h4>
                      <div className="flex items-center gap-[8px] mt-[4px]">
                        <span className="inline-flex items-center gap-[4px] text-[12px] text-slate-400">
                          <Package size={12} className="text-slate-500" /> {productCount} {productCount === 1 ? 'product' : 'products'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-[6px] shrink-0">
                    <button
                      onClick={() => handleOpenEdit(c)}
                      className="p-[8px] text-slate-400 hover:text-white hover:bg-[#1e293b] rounded-[8px] transition-colors cursor-pointer"
                      title="Edit category"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => deleteCategory(c._id, c.name)}
                      className="p-[8px] text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-[8px] transition-colors cursor-pointer"
                      title="Delete category"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="col-span-2 py-[48px] text-center text-slate-400 text-[14px]">
                No categories found matching your query.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-[20px]">
          <div className="bg-[#0f172a] border border-[#334155] rounded-[20px] shadow-2xl w-full max-w-[480px] p-[28px] sm:p-[32px] animate-in fade-in duration-150">
            <div className="flex justify-between items-center pb-[18px] border-b border-[#1e293b] mb-[22px]">
              <div>
                <h3 className="text-[20px] font-bold text-white">Edit Category</h3>
                <p className="text-[13px] text-slate-400 mt-[3px]">Update category details and imagery</p>
              </div>
              <button
                onClick={() => setEditingCategory(null)}
                className="p-[8px] text-slate-400 hover:text-white rounded-[8px] hover:bg-[#1e293b] cursor-pointer transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-[18px]">
              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] px-[16px] h-[44px] text-[14px] text-white focus:outline-none focus:border-[#ae3f4f]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                  Description
                </label>
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full bg-[#090d16] border border-[#1e293b] rounded-[12px] px-[16px] h-[44px] text-[14px] text-white focus:outline-none focus:border-[#ae3f4f]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider text-slate-300 mb-[8px]">
                  Category Image
                </label>
                <label className="cursor-pointer bg-[#090d16] hover:bg-[#1e293b] border border-[#1e293b] p-[16px] rounded-[12px] flex items-center justify-center gap-[10px] text-[13px] font-semibold text-slate-200 transition-colors">
                  <Upload size={16} className="text-[#ae3f4f]" />
                  {editUploading ? 'Uploading to Cloudinary...' : 'Replace Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, true)}
                    className="hidden"
                    disabled={editUploading}
                  />
                </label>
                {editImage && (
                  <div className="mt-[12px] relative w-[80px] h-[80px] rounded-[12px] overflow-hidden border border-[#334155] bg-slate-900 shadow-sm">
                    <img src={editImage} alt="preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-[12px] pt-[20px] border-t border-[#1e293b]">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-[20px] h-[44px] rounded-[12px] text-[14px] font-semibold text-slate-400 hover:text-white bg-[#1e293b]/60 hover:bg-[#1e293b] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editUploading}
                  className="bg-[#ae3f4f] hover:bg-[#963442] text-white px-[24px] h-[44px] rounded-[12px] text-[14px] font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
