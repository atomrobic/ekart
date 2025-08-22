import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, ChevronRight, Share2, Heart, Plus, Minus, Truck, RotateCcw, Shield } from 'lucide-react';
import Navbar from './navbar';
import WhatsAppButton from './product_data/whatsapp';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgId, setImgId] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [imageArray, setImageArray] = useState([]);
  const imgShowcaseRef = useRef(null);

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://ecom-new-4bgv.onrender.com/seller/products/${id}`);
        console.log('Product fetched:', response.data);
        setProduct(response.data);
      } catch (err) {
        console.log('Error fetching product:', err);
        setError(err.message || 'Error fetching product');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // Set up image array when product is loaded
  useEffect(() => {
    if (product?.image) {
      setImageArray(product.image);
      setImgId(1);
    }
  }, [product]);

  // Handle image sliding
  useEffect(() => {
    slideImage();
  }, [imgId]);

  const slideImage = () => {
    if (imgShowcaseRef.current && imageArray.length > 0) {
      const displayWidth = imgShowcaseRef.current.children[0]?.clientWidth || 0;
      imgShowcaseRef.current.style.transform = `translateX(${-(imgId - 1) * displayWidth}px)`;
    }
  };

  const handleThumbnailClick = (id, e) => {
    e.preventDefault();
    setImgId(id);
  };

  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value);
    if (value < 1) value = 1;
    if (value > 9) value = 9;
    setQuantity(value);
  };

  const incrementQuantity = () => {
    if (quantity < 9) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Loading and error states
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center text-red-600">
            <p className="text-xl mb-2">Error loading product</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600 text-xl">Product not found</p>
        </div>
      </div>
    );
  }

  const discountPercentage = product.original_price 
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center p-4 pt-8">
        <div className="card-wrapper max-w-6xl w-full">
          <div className="card bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {/* Product Images - Left Side */}
              <div className="product-imgs p-6">
                <div className="img-display overflow-hidden rounded-xl shadow-lg">
                  <div 
                    ref={imgShowcaseRef}
                    className="img-showcase flex transition-all duration-500 ease-in-out"
                  >
                    {imageArray.length > 0 ? imageArray.map((img, index) => (
                      <img 
                        key={index}
                        src={img} 
                        alt={`${product.name} view ${index + 1}`}
                        className="min-w-full h-80 md:h-96 object-cover"
                      />
                    )) : (
                      <div className="min-w-full h-80 md:h-96 bg-gray-100 flex items-center justify-center text-gray-500">
                        No Image Available
                      </div>
                    )}
                  </div>
                </div>
                
                {imageArray.length > 1 && (
                  <div className="img-select flex mt-4 overflow-x-auto pb-2 gap-3">
                    {imageArray.map((img, index) => (
                      <div key={index} className="img-item flex-shrink-0">
                        <a
                          href="#"
                          data-id={index + 1}
                          onClick={(e) => handleThumbnailClick(index + 1, e)}
                          className={`block border-2 rounded-lg overflow-hidden transition-all duration-200 ${
                            imgId === index + 1 ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img 
                            src={img} 
                            alt={`${product.name} thumbnail ${index + 1}`}
                            className="w-20 h-20 object-cover"
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Content - Right Side */}
              <div className="product-content p-6">
                {/* Brand */}
                {product.brand && (
                  <p className="text-blue-600 font-medium uppercase tracking-wide text-sm mb-2">
                    {product.brand}
                  </p>
                )}

                {/* Product Title */}
                <h1 className="product-title text-3xl font-bold text-gray-900 capitalize relative pb-3 mb-4">
                  {product.name}
                  <span className="absolute bottom-0 left-0 h-1 w-20 bg-blue-600 rounded-full"></span>
                </h1>
                
                {/* Rating */}
                <div className="product-rating flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(product.rating || 0) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      } mr-1`}
                    />
                  ))}
                  {product.rating && (
                    <span className="text-sm text-gray-700 ml-2">
                      {product.rating} {product.reviews && `(${product.reviews} reviews)`}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="product-price mb-6">
                  {product.original_price && (
                    <p className="last-price text-gray-500 text-sm mb-1">
                      Original Price: <span className="line-through text-red-500">₹{product.original_price}</span>
                    </p>
                  )}
                  <div className="flex items-center gap-3">
                    <p className="new-price text-2xl font-bold text-blue-600">
                      ₹{product.price}
                    </p>
                    {discountPercentage > 0 && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                        {discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="product-detail mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-1 border-b">
                    About this item:
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>
                  
                  {/* Product attributes */}
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ChevronRight size={16} className="text-green-600 mr-2 mt-0.5" />
                      <span className="text-sm"><strong>Brand:</strong> {product.brand || 'N/A'}</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight size={16} className="text-green-600 mr-2 mt-0.5" />
                      <span className="text-sm"><strong>Available:</strong> In stock</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight size={16} className="text-green-600 mr-2 mt-0.5" />
                      <span className="text-sm"><strong>Shipping:</strong> Free delivery</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight size={16} className="text-green-600 mr-2 mt-0.5" />
                      <span className="text-sm"><strong>Returns:</strong> 30-day return policy</span>
                    </li>
                  </ul>
                </div>

                {/* Quantity and Purchase */}
                <div className="purchase-info mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden">
                      <button 
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <input 
                        type="number" 
                        min="1" 
                        max="9"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-16 text-center border-0 focus:ring-0 py-2"
                      />
                      <button 
                        onClick={incrementQuantity}
                        disabled={quantity >= 9}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">Max 9 items</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <button className="btn flex items-center bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-medium">
                      <ShoppingCart size={18} className="mr-2" />
                      Add to Cart
                    </button>
                    
                    <button className="flex items-center text-gray-600 hover:text-red-500 transition-colors px-4 py-3 border border-gray-300 rounded-full hover:border-red-500">
                      <Heart size={18} className="mr-2" />
                      Wishlist
                    </button>
                  </div>

                  {/* WhatsApp Button */}
                  <div className="mb-6">
                    <WhatsAppButton product={product} />
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 mb-6">
                  <div className="text-center">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Truck className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">Free Delivery</p>
                    <p className="text-xs text-gray-500">2-3 business days</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <RotateCcw className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                    <p className="text-xs text-gray-500">30-day policy</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                    <p className="text-xs text-gray-500">100% protected</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="social-links flex items-center pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mr-4">Share:</p>
                  <div className="flex gap-2">
                    <a href="#" className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors">
                      <Share2 size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Product Details */}
            {product.details && (
              <div className="border-t border-gray-200 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Details</h2>
                    <div className="space-y-3">
                      {product.details.composition && (
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">Composition & Care</h3>
                          <p className="text-gray-600 text-sm">{product.details.composition}. {product.details.care}</p>
                        </div>
                      )}
                      {product.details.delivery && (
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">Delivery & Return</h3>
                          <p className="text-gray-600 text-sm">{product.details.delivery}. Free returns within 30 days.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;