import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Minus, Heart, Share2, Star, Truck, RotateCcw, Shield } from 'lucide-react';
import Navbar from './navbar';
import WhatsAppButton from './product_data/whatsapp';

const Description = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageArray, setImageArray] = useState([]);
  const [quantity, setQuantity] = useState(1);
useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://ecom-new-4bgv.onrender.com/seller/products/${id}/`);
      if (!response.ok) throw new Error('Failed to fetch product');
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (id) fetchProduct();
}, [id]);


  // Clean image paths
 useEffect(() => {
  if (product?.image) {
    setImageArray(product.image); // Use Cloudinary URLs directly
    setCurrentImageIndex(0);
  }
}, [product]);

  // Image navigation
  const nextImage = () => {
    if (imageArray.length > 1) setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
  };
  const prevImage = () => {
    if (imageArray.length > 1) setCurrentImageIndex((prev) => (prev === 0 ? imageArray.length - 1 : prev - 1));
  };

  // Quantity control
  const handleQuantityChange = (delta) => {
    const newQty = quantity + delta;
    if (newQty > 0 && newQty <= 9) setQuantity(newQty);
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-600 p-4">Error: {error}</div>;
  if (!product) return <div className="text-center p-4">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-60 md:h-72 lg:h-80 bg-white rounded-2xl overflow-hidden shadow-lg group">
              {imageArray.length > 0 ? (
                <>
                  <img
                    src={imageArray[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {imageArray.length > 1 && (
                    <>
                      <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                  No Image Available
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {imageArray.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {imageArray.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${currentImageIndex === index ? "border-blue-500" : "border-transparent"}`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <p className="text-blue-600 font-medium uppercase tracking-wide text-sm">{product.brand}</p>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              {product.rating && product.reviews && <span className="text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              {product.original_price && (
                <>
                  <span className="text-sm text-gray-500 line-through">₹{product.original_price}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                    {Math.round((1 - product.price / product.original_price) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center space-x-4">
              <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}><Minus className="w-4 h-4" /></button>
              <input type="text" value={quantity} readOnly className="w-12 text-center" />
              <button onClick={() => handleQuantityChange(1)} disabled={quantity >= 9}><Plus className="w-4 h-4" /></button>
              <span className="text-sm text-gray-500">Max 9 items</span>
            </div>

            {/* WhatsApp & Wishlist */}
            <div className="flex items-center justify-between mt-2">
              <WhatsAppButton product={product} />
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
                <span>Add to Wishlist</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <Feature icon={Truck} color="green" title="Free Delivery" subtitle="2-3 business days" />
              <Feature icon={RotateCcw} color="blue" title="Easy Returns" subtitle="30-day policy" />
              <Feature icon={Shield} color="purple" title="Secure Payment" subtitle="100% protected" />
            </div>
          </div>
        </div>

        {/* Description & Details */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Description</h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {product.details && (
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Details</h2>
              <ProductDetailsAccordion title="Composition & Care" content={`${product.details.composition}. ${product.details.care}`} />
              <ProductDetailsAccordion title="Delivery & Return" content={`${product.details.delivery}. Free returns within 30 days.`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductDetailsAccordion = ({ title, content }) => (
  <details className="border border-gray-200 rounded-lg p-4 group" open>
    <summary className="font-medium cursor-pointer flex items-center justify-between text-gray-900 hover:text-blue-600 transition-colors">
      {title}
      <Plus className="w-4 h-4 group-open:rotate-45 transition-transform" />
    </summary>
    <div className="mt-3 pt-3 border-t border-gray-100">
      <p className="text-gray-600 leading-relaxed">{content}</p>
    </div>
  </details>
);

const Feature = ({ icon: Icon, color, title, subtitle }) => (
  <div className="text-center">
    <div className={`bg-${color}-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2`}>
      <Icon className={`w-6 h-6 text-${color}-600`} />
    </div>
    <p className="text-sm font-medium text-gray-900">{title}</p>
    <p className="text-xs text-gray-500">{subtitle}</p>
  </div>
);

export default Description;
