import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { ShoppingCart, Heart, Eye, ChevronDown, ChevronUp, X, SlidersHorizontal, ChevronRight, ArrowLeftRight, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const SHOE_SIZES = ['S', 'M', 'L', '6', '7', '8', '9', '10', '11', '12', '13'];
const PRODUCT_TYPES = ['Sneakers', 'Boots', 'Loafers', 'Running Shoes', 'Work Shoes', 'Sandals', 'Moccasins', 'Flats', 'Heels'];
const MATERIAL_OPTIONS = ['Leather', 'Canvas', 'Suede', 'Mesh', 'Synthetic', 'Vegan Leather', 'Rubber', 'Knit'];
const TAGS_LIMIT = 8;
const PRODUCTS_PER_PAGE = 12;

const Toast = ({ toasts }) => (
  <div style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', pointerEvents: 'none' }}>
    {toasts.map(t => (
      <div key={t.id} style={{ background: '#111', color: '#fff', padding: '10px 20px', borderRadius: '24px', fontSize: '16px', fontWeight: '500', whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', animation: 'fadeInUp 0.3s ease' }}>
        {t.msg}
      </div>
    ))}
  </div>
);

const FilterAccordion = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid #e5e7eb' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#111', textAlign: 'left' }}>
        {title}
        {open ? <ChevronUp size={16} color="#666" /> : <ChevronRight size={16} color="#666" />}
      </button>
      {open && <div style={{ paddingBottom: '16px' }}>{children}</div>}
    </div>
  );
};

const DesktopFilterSection = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '12px', marginBottom: '12px' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: '600', color: '#111', textAlign: 'left' }}>
        {title}
        {open ? <ChevronUp size={14} color="#666" /> : <ChevronDown size={14} color="#666" />}
      </button>
      {open && <div style={{ marginTop: '8px' }}>{children}</div>}
    </div>
  );
};

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [showMoreTags, setShowMoreTags] = useState(false);
  const [gridCols, setGridCols] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [toasts, setToasts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || 'All');
  const [inStockFilter, setInStockFilter] = useState(searchParams.get('inStock') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'name_asc');
  const [priceRange, setPriceRange] = useState(searchParams.get('maxPrice') || '500');
  const [selectedSizes, setSelectedSizes] = useState(searchParams.get('size') ? searchParams.get('size').split(',') : []);
  const [selectedMaterial, setSelectedMaterial] = useState(searchParams.get('material') || '');
  const [selectedProductType, setSelectedProductType] = useState(searchParams.get('productType') || '');
  const [selectedTags, setSelectedTags] = useState(searchParams.get('tags') ? searchParams.get('tags').split(',') : []);

  const [draftBrand, setDraftBrand] = useState(selectedBrand);
  const [draftInStock, setDraftInStock] = useState(inStockFilter);
  const [draftPrice, setDraftPrice] = useState(priceRange);
  const [draftSizes, setDraftSizes] = useState(selectedSizes);
  const [draftMaterial, setDraftMaterial] = useState(selectedMaterial);
  const [draftProductType, setDraftProductType] = useState(selectedProductType);
  const [draftTags, setDraftTags] = useState(selectedTags);
  const [draftSort, setDraftSort] = useState(sortBy);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const showToast = (msg) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2500);
  };

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(setCategories).catch(() => { });
    fetch('/api/products').then(r => r.json()).then(setAllProducts).catch(() => { });
  }, []);

  useEffect(() => {
    const fetch_ = async () => {
      setLoading(true);
      try {
        const p = new URLSearchParams();
        if (selectedCategory !== 'All') p.append('category', selectedCategory);
        if (selectedBrand !== 'All') p.append('brand', selectedBrand);
        if (inStockFilter === 'inStock') p.append('inStock', 'true');
        if (inStockFilter === 'outStock') p.append('inStock', 'false');
        if (priceRange) p.append('maxPrice', priceRange);
        if (sortBy) p.append('sort', sortBy);
        if (selectedSizes.length > 0) p.append('size', selectedSizes.join(','));
        if (selectedMaterial) p.append('material', selectedMaterial);
        if (selectedProductType) p.append('productType', selectedProductType);
        if (selectedTags.length > 0) p.append('tags', selectedTags.join(','));
        const res = await fetch(`/api/products?${p.toString()}`);
        const data = await res.json();
        setProducts(data);
        setCurrentPage(1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, [selectedCategory, selectedBrand, inStockFilter, priceRange, sortBy, selectedSizes, selectedMaterial, selectedProductType, selectedTags]);

  const updateParam = (key, val) => {
    const p = new URLSearchParams(searchParams);
    if (val && val !== 'All') p.set(key, String(val));
    else p.delete(key);
    setSearchParams(p);
  };

  const handleCategoryClick = (name) => {
    setSelectedCategory(name);
    updateParam('category', name);
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setInStockFilter('all');
    setPriceRange('500');
    setSortBy('name_asc');
    setSelectedSizes([]);
    setSelectedMaterial('');
    setSelectedProductType('');
    setSelectedTags([]);
    setSearchParams({});
  };

  const openDrawer = () => {
    setDraftBrand(selectedBrand);
    setDraftInStock(inStockFilter);
    setDraftPrice(priceRange);
    setDraftSizes(selectedSizes);
    setDraftMaterial(selectedMaterial);
    setDraftProductType(selectedProductType);
    setDraftTags(selectedTags);
    setDraftSort(sortBy);
    setFilterDrawerOpen(true);
  };

  const applyDrawer = () => {
    setSelectedBrand(draftBrand);
    setInStockFilter(draftInStock);
    setPriceRange(draftPrice);
    setSelectedSizes(draftSizes);
    setSelectedMaterial(draftMaterial);
    setSelectedProductType(draftProductType);
    setSelectedTags(draftTags);
    setSortBy(draftSort);
    setFilterDrawerOpen(false);
  };

  const clearDrawer = () => {
    setDraftBrand('All');
    setDraftInStock('all');
    setDraftPrice('500');
    setDraftSizes([]);
    setDraftMaterial('');
    setDraftProductType('');
    setDraftTags([]);
    setDraftSort('name_asc');
  };

  const toggleDraftSize = (s) => setDraftSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleDraftTag = (t) => setDraftTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const allBrands = Array.from(new Set(allProducts.map(p => p.brand).filter(Boolean))).sort();
  const allTags = Array.from(new Set(allProducts.flatMap(p => p.tags || []).filter(Boolean))).sort();

  const getCatCount = (n) => allProducts.filter(p => p.category?.toLowerCase() === n.toLowerCase()).length;
  const getBrandCount = (b) => allProducts.filter(p => p.brand === b).length;
  const getMaterialCount = (m) => allProducts.filter(p => p.material === m).length;
  const getTypeCount = (t) => allProducts.filter(p => p.productType === t).length;
  const getTagCount = (t) => allProducts.filter(p => p.tags?.includes(t)).length;
  const getSizeCount = (s) => allProducts.filter(p => p.sizes?.includes(s)).length;

  const activeCategory = categories.find(c => c.name.toLowerCase() === selectedCategory.toLowerCase());
  const heroBg = activeCategory?.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&q=80';

  const sortOptions = [
    { value: 'name_asc', label: 'Alphabetically, A-Z' },
    { value: 'name_desc', label: 'Alphabetically, Z-A' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Arrivals' },
  ];

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = products.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

  const DesktopFilters = () => (
    <div>
      <DesktopFilterSection title="Collection">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {categories.map(c => (
            <button key={c._id} onClick={() => handleCategoryClick(c.name)} style={{ background: 'none', border: 'none', padding: '3px 0', textAlign: 'left', cursor: 'pointer', fontSize: '16px', color: selectedCategory === c.name ? '#111' : '#555', textDecoration: selectedCategory === c.name ? 'underline' : 'none', textUnderlineOffset: '3px', fontWeight: selectedCategory === c.name ? '600' : '400' }}>
              {c.name} <span style={{ color: '#ae3f4f' }}>({getCatCount(c.name)})</span>
            </button>
          ))}
        </div>
      </DesktopFilterSection>

      <DesktopFilterSection title="Availability">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[['inStock', 'In stock', allProducts.filter(p => p.inStock).length], ['outStock', 'Out of stock', allProducts.filter(p => !p.inStock).length]].map(([val, label, count]) => (
            <label key={val} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', color: '#333', cursor: 'pointer' }}>
              <input type="checkbox" checked={inStockFilter === val} onChange={() => { const v = inStockFilter === val ? 'all' : val; setInStockFilter(v); updateParam('inStock', v); }} style={{ width: '14px', height: '14px', cursor: 'pointer' }} />
              {label} ({count})
            </label>
          ))}
        </div>
      </DesktopFilterSection>

      <DesktopFilterSection title="Price">
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            <div style={{ flex: 1, border: '1px solid #ddd', borderRadius: '4px', padding: '6px 10px', fontSize: '16px', color: '#333' }}>$ 0</div>
            <div style={{ flex: 1, border: '1px solid #ddd', borderRadius: '4px', padding: '6px 10px', fontSize: '16px', color: '#333' }}>$ {priceRange}</div>
          </div>
          <input type="range" min="0" max="500" step="10" value={priceRange} onChange={(e) => { setPriceRange(e.target.value); updateParam('maxPrice', e.target.value); }} style={{ width: '100%', accentColor: '#111', cursor: 'pointer' }} />
        </div>
      </DesktopFilterSection>

      <DesktopFilterSection title="Brand">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {allBrands.map(b => (
            <label key={b} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', color: '#333', cursor: 'pointer' }}>
              <input type="checkbox" checked={selectedBrand === b} onChange={() => { const v = selectedBrand === b ? 'All' : b; setSelectedBrand(v); updateParam('brand', v); }} style={{ width: '14px', height: '14px', cursor: 'pointer', flexShrink: 0 }} />
              {b} <span style={{ color: '#ae3f4f' }}>({getBrandCount(b)})</span>
            </label>
          ))}
        </div>
      </DesktopFilterSection>

      {MATERIAL_OPTIONS.some(m => getMaterialCount(m) > 0) && (
        <DesktopFilterSection title="Material">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {MATERIAL_OPTIONS.map(m => {
              const c = getMaterialCount(m); if (!c) return null; return (
                <label key={m} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', color: '#333', cursor: 'pointer' }}>
                  <input type="checkbox" checked={selectedMaterial === m} onChange={() => { const v = selectedMaterial === m ? '' : m; setSelectedMaterial(v); updateParam('material', v); }} style={{ width: '14px', height: '14px', cursor: 'pointer', flexShrink: 0 }} />
                  {m} <span style={{ color: '#ae3f4f' }}>({c})</span>
                </label>
              );
            })}
          </div>
        </DesktopFilterSection>
      )}

      {allTags.length > 0 && (
        <DesktopFilterSection title="More filters" defaultOpen={true}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {(showMoreTags ? allTags : allTags.slice(0, TAGS_LIMIT)).map(tag => (
              <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', color: '#333', cursor: 'pointer' }}>
                <input type="checkbox" checked={selectedTags.includes(tag)} onChange={() => { const updated = selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag) : [...selectedTags, tag]; setSelectedTags(updated); const p = new URLSearchParams(searchParams); if (updated.length) p.set('tags', updated.join(',')); else p.delete('tags'); setSearchParams(p); }} style={{ width: '14px', height: '14px', cursor: 'pointer', flexShrink: 0 }} />
                {tag} <span style={{ color: '#ae3f4f' }}>({getTagCount(tag)})</span>
              </label>
            ))}
          </div>
          {allTags.length > TAGS_LIMIT && (
            <button onClick={() => setShowMoreTags(!showMoreTags)} style={{ background: 'none', border: 'none', color: '#333', fontSize: '16px', cursor: 'pointer', padding: '8px 0 0', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              {showMoreTags ? '- Show less' : '+ Show more'}
            </button>
          )}
        </DesktopFilterSection>
      )}

      <DesktopFilterSection title="Size">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {SHOE_SIZES.map(size => {
            const c = getSizeCount(size); if (!c) return null; return (
              <button key={size} onClick={() => { const updated = selectedSizes.includes(size) ? selectedSizes.filter(s => s !== size) : [...selectedSizes, size]; setSelectedSizes(updated); const p = new URLSearchParams(searchParams); if (updated.length) p.set('size', updated.join(',')); else p.delete('size'); setSearchParams(p); }} style={{ minWidth: '36px', height: '36px', padding: '0 6px', border: selectedSizes.includes(size) ? '2px solid #111' : '1px solid #ddd', background: selectedSizes.includes(size) ? '#111' : '#fff', color: selectedSizes.includes(size) ? '#fff' : '#333', fontSize: '16px', fontWeight: '500', cursor: 'pointer', borderRadius: '2px' }}>
                {size}
              </button>
            );
          })}
        </div>
      </DesktopFilterSection>

      {PRODUCT_TYPES.some(t => getTypeCount(t) > 0) && (
        <DesktopFilterSection title="Product type">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {PRODUCT_TYPES.map(type => {
              const c = getTypeCount(type); if (!c) return null; return (
                <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', color: '#333', cursor: 'pointer' }}>
                  <input type="checkbox" checked={selectedProductType === type} onChange={() => { const v = selectedProductType === type ? '' : type; setSelectedProductType(v); updateParam('productType', v); }} style={{ width: '14px', height: '14px', cursor: 'pointer', flexShrink: 0 }} />
                  {type} <span style={{ color: '#ae3f4f' }}>({c})</span>
                </label>
              );
            })}
          </div>
        </DesktopFilterSection>
      )}
    </div>
  );

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <Toast toasts={toasts} />

      <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
        <img src={heroBg} alt={selectedCategory} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: 'clamp(22px, 5vw, 36px)', fontWeight: '600', textAlign: 'center' }}>
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <Swiper modules={[FreeMode]} freeMode slidesPerView="auto" spaceBetween={0} style={{ width: '100%' }}>
            {categories.map(c => (
              <SwiperSlide key={c._id} style={{ width: 'auto' }}>
                <button onClick={() => handleCategoryClick(c.name)} style={{ whiteSpace: 'nowrap', padding: '14px 16px', background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: selectedCategory === c.name ? '#111' : '#666', fontWeight: selectedCategory === c.name ? '600' : '400', borderBottom: selectedCategory === c.name ? '2px solid #111' : '2px solid transparent', marginBottom: '-1px', display: 'block' }}>
                  {c.name} <span style={{ color: '#ae3f4f' }}>({getCatCount(c.name)})</span>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div style={{ margin: '16px 0' }}>
          <Swiper modules={[FreeMode]} freeMode slidesPerView="auto" spaceBetween={12}>
            {categories.map(c => (
              <SwiperSlide key={c._id} style={{ width: '200px', height: '200px' }}>
                <button onClick={() => handleCategoryClick(c.name)} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', border: 'none', padding: 0, cursor: 'pointer', borderRadius: '2px', display: 'block' }}>
                  <img src={c.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
                    <span style={{ color: '#fff', fontSize: '16px', fontWeight: '600', textAlign: 'center', lineHeight: 1.3 }}>{c.name}</span>
                    <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', marginTop: '3px' }}>{getCatCount(c.name)} products</span>
                  </div>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='flex lg:hidden' style={{ alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid #e5e7eb' }}>
          <button onClick={openDrawer} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: '500', color: '#111' }}>
            <SlidersHorizontal size={16} />
            Filter and sort
          </button>
          <span style={{ fontSize: '16px', color: '#555' }}>{products.length} Products</span>
        </div>

        <div style={{ display: 'flex', gap: '0', alignItems: 'flex-start' }}>
          <aside className="desktop-sidebar" style={{ width: '240px', flexShrink: 0, paddingRight: '24px', paddingTop: '8px' }}>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '16px', fontWeight: '700', color: '#111' }}>Filter:</span>
            </div>
            <DesktopFilters />
          </aside>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="desktop-toolbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[2, 3, 4].map(col => (
                  <button key={col} onClick={() => setGridCols(col)} style={{ width: '30px', height: '30px', border: gridCols === col ? '1px solid #111' : '1px solid #ddd', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px', padding: '5px', borderRadius: '2px' }}>
                    {Array.from({ length: col }).map((_, i) => <div key={i} style={{ flex: 1, height: '100%', background: gridCols === col ? '#111' : '#ccc', borderRadius: '1px' }} />)}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px', color: '#555' }}>Sort By</span>
                <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); updateParam('sort', e.target.value); }} style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '4px 8px', fontSize: '16px', color: '#333', cursor: 'pointer', background: '#fff' }}>
                  {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <span style={{ fontSize: '16px', color: '#555' }}>{products.length} Products</span>
              </div>
            </div>

            {loading ? (
              <div style={{ padding: '60px 0', textAlign: 'center', color: '#999' }}>
                <div style={{ width: '32px', height: '32px', border: '2px solid #ae3f4f', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
                <p>Loading...</p>
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div style={{ padding: '60px 0', textAlign: 'center' }}>
                <p style={{ fontSize: '16px', color: '#555', marginBottom: '16px' }}>No products found</p>
                <button onClick={resetFilters} style={{ padding: '10px 24px', background: '#111', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '16px', borderRadius: '4px' }}>Clear Filters</button>
              </div>
            ) : (
              <>
                <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: '10px' }}>
                  {paginatedProducts.map(product => {
                    const mainImage = product.images?.[0] || 'https://via.placeholder.com/400';
                    const secondImage = product.images?.[1] || mainImage;
                    const inWish = isInWishlist(product._id);

                    return (

                      <div
                        key={product._id}
                        className="group product-card-shop relative bg-white"
                        style={{
                          borderRight: '1px solid #e5e7eb',
                          borderBottom: '1px solid #e5e7eb',
                          overflow: 'visible',
                        }}
                      >
                        {/* Product image */}
                        <div
                          className="relative overflow-hidden"
                          style={{
                            paddingBottom: '100%',
                            background: '#f5f5f5',
                          }}
                        >
                          <Link
                            to={`/product/${product._id}`}
                            className="absolute inset-0 block"
                          >
                            <img
                              src={mainImage}
                              alt={product.name}
                              className="img-main h-full w-full object-cover transition-opacity duration-300"
                            />

                            <img
                              src={secondImage}
                              alt={product.name}
                              className="img-hover absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300"
                            />
                          </Link>

                          {!product.inStock && (
                            <div className="absolute left-2.5 top-2.5 border border-gray-200 bg-white px-2 py-1 text-sm font-semibold">
                              SOLD OUT
                            </div>
                          )}
                        </div>

                        <div
                          className="
                            relative z-10 bg-white p-3
                            transition-transform duration-300 ease-in-out
                            lg:group-hover:-translate-y-10
                          "
                        >
                          <p className="mb-1 text-base font-semibold text-[#ae3f4f]">
                            ${product.price?.toFixed(2)}
                          </p>

                          <Link
                            to={`/product/${product._id}`}
                            className="mb-1 block text-base font-bold leading-tight text-gray-900 no-underline"
                          >
                            {product.name}
                          </Link>

                          <p className="mb-2 text-base text-gray-500">
                            {product.brand}
                          </p>
                        </div>

                        <div
                          className="
                            relative z-20 flex items-center justify-between
                            gap-3 border-t border-dashed border-gray-200
                            bg-white px-3 py-5
                            lg:absolute lg:left-0 lg:right-0 lg:top-full
                            lg:mt-0 lg:-translate-y-3 lg:opacity-0
                            lg:invisible 
                            lg:transition-all lg:duration-300 lg:ease-in-out
                            lg:group-hover:-translate-y-9
                            lg:group-hover:opacity-100
                            lg:group-hover:visible
                            lg:group-hover:pointer-events-auto
                          "
                        >
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (!product.inStock) return;
                              addToCart(product);
                              showToast("Item Added to Cart");
                            }}
                            disabled={!product.inStock}
                            className="flex items-center gap-5 text-sm font-medium transition-colors hover:text-[#f15f6f] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <ShoppingCart size={20} />
                            <span>ADD TO CART</span>
                          </button>

                          <div className="hidden lg:flex items-center gap-8">
                            <button
                              title="Quick View"
                              className="transition-colors hover:text-[#f15f6f]"
                            >
                              <Eye size={20} />
                            </button>

                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleWishlist(product);
                                showToast(isInWishlist(product._id) ? "Removed from wishlist" : "Added to wishlist");
                              }}
                              title="Add to Wishlist"
                              className="transition-colors hover:text-[#f15f6f]"
                            >
                              <Heart
                                size={20}
                                fill={
                                  isInWishlist(product._id || product.id)
                                    ? 'currentColor'
                                    : 'none'
                                }
                              />
                            </button>

                            <button
                              title="Compare"
                              className="transition-colors hover:text-[#f15f6f]"
                            >
                              <ArrowLeftRight size={20} />
                            </button>
                          </div>
                        </div>
                      </div>

                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', padding: '32px 0' }}>
                    {currentPage > 1 && (
                      <button onClick={() => setCurrentPage(p => p - 1)} style={{ width: '36px', height: '36px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <button key={p} onClick={() => setCurrentPage(p)} style={{ width: '36px', height: '36px', border: '1px solid', borderColor: currentPage === p ? '#ae3f4f' : '#ddd', background: currentPage === p ? '#ae3f4f' : '#fff', color: currentPage === p ? '#fff' : '#333', cursor: 'pointer', fontSize: '16px', fontWeight: currentPage === p ? '700' : '400' }}>
                        {p}
                      </button>
                    ))}
                    {currentPage < totalPages && (
                      <button onClick={() => setCurrentPage(p => p + 1)} style={{ width: '36px', height: '36px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {filterDrawerOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} onClick={() => setFilterDrawerOpen(false)} />
          <div style={{ position: 'relative', width: '100%', maxWidth: '520px', margin: '0 auto', background: '#fff', borderRadius: '16px 16px 0 0', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '20px 20px 0', borderBottom: '1px solid #e5e7eb', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '17px', fontWeight: '700', color: '#111' }}>Filter and sort</span>
                <button onClick={() => setFilterDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                  <X size={20} color="#333" />
                </button>
              </div>
              <p style={{ fontSize: '16px', color: '#888', margin: '0 0 16px' }}>{products.length} products</p>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
              <FilterAccordion title="Availability">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[['inStock', 'In stock', allProducts.filter(p => p.inStock).length], ['outStock', 'Out of stock', allProducts.filter(p => !p.inStock).length]].map(([val, label, count]) => (
                    <label key={val} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={draftInStock === val} onChange={() => setDraftInStock(prev => prev === val ? 'all' : val)} style={{ width: '16px', height: '16px' }} />
                      {label} ({count})
                    </label>
                  ))}
                </div>
              </FilterAccordion>

              <FilterAccordion title="Price">
                <div>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                    <div style={{ flex: 1, border: '1px solid #ddd', borderRadius: '4px', padding: '8px 12px', fontSize: '16px' }}>$ 0</div>
                    <div style={{ flex: 1, border: '1px solid #ddd', borderRadius: '4px', padding: '8px 12px', fontSize: '16px' }}>$ {draftPrice}</div>
                  </div>
                  <input type="range" min="0" max="500" step="10" value={draftPrice} onChange={e => setDraftPrice(e.target.value)} style={{ width: '100%', accentColor: '#111' }} />
                </div>
              </FilterAccordion>

              <FilterAccordion title="Brand">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {allBrands.map(b => (
                    <label key={b} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={draftBrand === b} onChange={() => setDraftBrand(prev => prev === b ? 'All' : b)} style={{ width: '16px', height: '16px' }} />
                      {b} <span style={{ color: '#ae3f4f' }}>({getBrandCount(b)})</span>
                    </label>
                  ))}
                </div>
              </FilterAccordion>

              <FilterAccordion title="Category">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {categories.map(c => (
                    <label key={c._id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={selectedCategory === c.name} onChange={() => { handleCategoryClick(selectedCategory === c.name ? 'All' : c.name); setFilterDrawerOpen(false); }} style={{ width: '16px', height: '16px' }} />
                      {c.name} <span style={{ color: '#ae3f4f' }}>({getCatCount(c.name)})</span>
                    </label>
                  ))}
                </div>
              </FilterAccordion>

              {MATERIAL_OPTIONS.some(m => getMaterialCount(m) > 0) && (
                <FilterAccordion title="Material">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {MATERIAL_OPTIONS.map(m => {
                      const c = getMaterialCount(m); if (!c) return null; return (
                        <label key={m} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', cursor: 'pointer' }}>
                          <input type="checkbox" checked={draftMaterial === m} onChange={() => setDraftMaterial(prev => prev === m ? '' : m)} style={{ width: '16px', height: '16px' }} />
                          {m} ({c})
                        </label>
                      );
                    })}
                  </div>
                </FilterAccordion>
              )}

              {allTags.length > 0 && (
                <FilterAccordion title="More filters">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {allTags.map(tag => (
                      <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={draftTags.includes(tag)} onChange={() => toggleDraftTag(tag)} style={{ width: '16px', height: '16px' }} />
                        {tag} ({getTagCount(tag)})
                      </label>
                    ))}
                  </div>
                </FilterAccordion>
              )}

              <FilterAccordion title="Size">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {SHOE_SIZES.map(s => {
                    const c = getSizeCount(s); if (!c) return null; return (
                      <button key={s} onClick={() => toggleDraftSize(s)} style={{ minWidth: '40px', height: '40px', padding: '0 8px', border: draftSizes.includes(s) ? '2px solid #111' : '1px solid #ddd', background: draftSizes.includes(s) ? '#111' : '#fff', color: draftSizes.includes(s) ? '#fff' : '#333', fontSize: '16px', cursor: 'pointer', borderRadius: '2px' }}>
                        {s}
                      </button>
                    );
                  })}
                </div>
              </FilterAccordion>

              {PRODUCT_TYPES.some(t => getTypeCount(t) > 0) && (
                <FilterAccordion title="Product type">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {PRODUCT_TYPES.map(type => {
                      const c = getTypeCount(type); if (!c) return null; return (
                        <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', cursor: 'pointer' }}>
                          <input type="checkbox" checked={draftProductType === type} onChange={() => setDraftProductType(prev => prev === type ? '' : type)} style={{ width: '16px', height: '16px' }} />
                          {type} ({c})
                        </label>
                      );
                    })}
                  </div>
                </FilterAccordion>
              )}

              <div style={{ borderBottom: '1px solid #e5e7eb', padding: '16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '16px', color: '#111' }}>Sort by:</span>
                <select value={draftSort} onChange={e => setDraftSort(e.target.value)} style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '6px 10px', fontSize: '16px', cursor: 'pointer', background: '#fff' }}>
                  {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', padding: '16px 20px', borderTop: '1px solid #e5e7eb', flexShrink: 0 }}>
              <button onClick={clearDrawer} style={{ flex: 1, padding: '14px', background: '#fff', color: '#555', border: '1px solid #ddd', cursor: 'pointer', fontSize: '16px', fontWeight: '500', borderRadius: '4px' }}>Clear all</button>
              <button onClick={applyDrawer} style={{ flex: 2, padding: '14px', background: '#ae3f4f', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: '700', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>APPLY</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeInUp { from { opacity:0; transform: translateX(-50%) translateY(10px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }
        .product-card-shop:hover .img-main { opacity: 0 !important; }
        .product-card-shop:hover .img-hover { opacity: 1 !important; }
        .product-card-shop:hover .action-btn { opacity: 1 !important; }

        .desktop-sidebar { display: none; }
        .desktop-toolbar { display: none !important; }

        @media (min-width: 768px) {
          .desktop-sidebar { display: block !important; }
          .desktop-toolbar { display: flex !important; }
          .product-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }

        @media (max-width: 767px) {
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (min-width: 1024px) {
          .product-grid { grid-template-columns: repeat(${gridCols}, 1fr) !important; }
        }
      `}</style>
    </div>
  );
};

export default Shop;