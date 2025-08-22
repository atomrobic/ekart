import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    {
      title: "Summer Collection 2025",
      subtitle: "New arrivals for the season",
      description: "Discover our exclusive summer collection with fresh designs and vibrant colors",
      buttonText: "SHOP NOW",
      bgColor: "from-blue-900 to-indigo-900",
      image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      title: "Premium Accessories",
      subtitle: "Luxury watches & jewelry",
      description: "Elevate your style with our handcrafted premium accessories collection",
      buttonText: "EXPLORE",
      bgColor: "from-gray-800 to-gray-900",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      title: "Limited Time Offer",
      subtitle: "Up to 50% off",
      description: "Don't miss our seasonal sale with massive discounts on selected items",
      buttonText: "SHOP SALE",
      bgColor: "from-red-900 to-pink-900",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  const products = [
    {
      id: 1,
      name: "Classic Denim Jacket",
      price: 89.99,
      category: "Jackets",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      rating: 4.5
    },
    {
      id: 2,
      name: "Premium Leather Watch",
      price: 199.99,
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      rating: 5
    },
    {
      id: 3,
      name: "Casual Sneakers",
      price: 65.99,
      category: "Footwear",
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      rating: 4.2
    },
    {
      id: 4,
      name: "Minimalist Backpack",
      price: 79.99,
      category: "Bags",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      rating: 4.7
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">O</span>
            </div>
            <span className="font-bold text-lg">ORISE</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-gray-300 transition">Home</a>
            <a href="#" className="hover:text-gray-300 transition">Shop</a>
            <a href="#" className="hover:text-gray-300 transition">Collections</a>
            <a href="#" className="hover:text-gray-300 transition">About</a>
            <a href="#" className="hover:text-gray-300 transition">Contact</a>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hover:text-gray-300 transition">
              <FiShoppingCart className="w-5 h-5" />
            </button>
            <button className="hover:text-gray-300 transition">
              <FiUser className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Carousel */}
      <div className="relative h-screen overflow-hidden">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center z-20">
              <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-xl">
                  <p className="text-lg text-gray-300 mb-2">{item.subtitle}</p>
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    {item.title}
                  </h1>
                  <p className="text-lg mb-8 text-gray-300">
                    {item.description}
                  </p>
                  <button className="bg-white text-black px-8 py-3 font-semibold hover:bg-gray-100 transition transform hover:scale-105">
                    {item.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 rounded-full p-2 transition"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 rounded-full p-2 transition"
        >
          <FiChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-30">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${index === currentSlide ? 'bg-white' : 'bg-gray-500'}`}
            />
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative overflow-hidden rounded-lg">
              <div className="aspect-square bg-gray-800 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <button className="w-full bg-white text-black py-3 font-medium transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                  Add to Cart
                </button>
              </div>
              <div className="mt-4">
                <p className="text-gray-400 text-sm">{product.category}</p>
                <h3 className="font-medium">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border border-white px-8 py-3 hover:bg-white hover:text-black transition">
            VIEW ALL PRODUCTS
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our wide range of product categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="relative group overflow-hidden rounded-lg aspect-[4/3]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-900"></div>
            <img
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Men's Fashion"
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Men's Fashion</h3>
                <button className="border border-white px-6 py-2 hover:bg-white hover:text-black transition">
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-lg aspect-[4/3]">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-900 to-purple-900"></div>
            <img
              src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Women's Fashion"
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Women's Fashion</h3>
                <button className="border border-white px-6 py-2 hover:bg-white hover:text-black transition">
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-lg aspect-[4/3]">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
            <img
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Accessories"
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Accessories</h3>
                <button className="border border-white px-6 py-2 hover:bg-white hover:text-black transition">
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-300 mb-8">
            Subscribe to get updates on new arrivals, special offers and other discount information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-white"
            />
            <button className="bg-white text-black px-6 py-3 font-semibold hover:bg-gray-100 transition rounded">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">O</span>
                </div>
                <span className="font-bold text-lg">ORISE</span>
              </div>
              <p className="text-gray-400 text-sm">
                Premium fashion and lifestyle brand offering the latest trends and timeless classics.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition">Best Sellers</a></li>
                <li><a href="#" className="hover:text-white transition">Sale</a></li>
                <li><a href="#" className="hover:text-white transition">Collections</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-white transition">Size Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white transition">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
              </div>
              <p className="text-sm text-gray-400">
                Need help? <a href="#" className="underline hover:text-white transition">Contact our support</a>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Orise Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;