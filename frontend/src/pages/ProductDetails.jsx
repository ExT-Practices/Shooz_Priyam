import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-2xl">Loading...</div>;
  if (!product) return <div className="text-center py-20 text-2xl">Product not found</div>;

  return (
    <div className="container mx-auto px-5 lg:px-10 py-16">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <img src={product.images && product.images[0]} alt={product.name} className="w-full h-auto bg-gray-50 object-cover rounded-lg" />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-500 mb-6">{product.brand}</p>
          <p className="text-3xl font-semibold mb-6">${product.price?.toFixed(2)}</p>
          <p className="text-gray-600 mb-8 leading-relaxed">{product.description || "A wonderful addition to your footwear collection. Crafted with high quality materials for long-lasting comfort and style."}</p>
          
          <button 
            onClick={() => { addToCart(product); }}
            className="w-full md:w-auto bg-[#bd4b5e] hover:bg-[#a03b4b] text-white px-10 py-4 font-semibold uppercase tracking-wider transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
