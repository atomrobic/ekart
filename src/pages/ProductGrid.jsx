import React, { useState, useEffect } from "react";
import { Grid, List, ChevronLeft, ChevronRight, Filter, SortAsc } from "lucide-react";
import ProductCard from "./Productcard";
// Remove axios import - use your existing HTTP client or fetch API
// import axios from "axios";
import useProductStore from "../pages/product_data/category";

const ProductGrid = ({ wishlist, onWishlistToggle }) => {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { products, fetchProducts } = useProductStore();

  // Fetch categories - replace with your HTTP client
  useEffect(() => {
    // Replace with your existing HTTP client or fetch API
    fetch("http://127.0.0.1:8000/seller/categories")
      .then(res => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  // Enhanced fetch products with pagination
  const loadProducts = async (page = 1, itemsPerPage = 12, sort = sortBy, categoryId = selectedCategory) => {
    setIsLoading(true);
    try {
      // Modify this to match your actual API structure
      const response = await fetchProducts({ 
        sortBy: sort, 
        categoryId,
        page,
        limit: itemsPerPage 
      });
      
      // Assuming your API returns pagination info
      // You might need to adjust these based on your API response structure
      if (response && response.data) {
        setTotalPages(response.totalPages || Math.ceil(response.total / itemsPerPage) || 1);
        setTotalItems(response.total || response.data.length);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch products when filters change
  useEffect(() => {
    loadProducts(1, limit, sortBy, selectedCategory);
    setCurrentPage(1); // Reset to first page when filters change
  }, [sortBy, selectedCategory, limit]);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage && !isLoading) {
      loadProducts(page, limit, sortBy, selectedCategory);
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle limit change
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  // Pagination component
  const Pagination = () => {
    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = 5;
      
      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) pages.push(i);
          pages.push('...');
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
          pages.push('...');
          pages.push(totalPages);
        }
      }
      
      return pages;
    };

    if (totalPages <= 1) return null;

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-gray-800">
        {/* Page Info */}
        <div className="text-sm text-gray-400 order-2 sm:order-1">
          Showing {((currentPage - 1) * limit) + 1}-{Math.min(currentPage * limit, totalItems)} of {totalItems} products
        </div>
        
        {/* Pagination Controls */}
        <div className="flex items-center gap-2 order-1 sm:order-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft size={18} />
          </button>
          
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              disabled={isLoading || page === '...'}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                page === currentPage
                  ? 'bg-yellow-400 text-black'
                  : page === '...'
                  ? 'cursor-default text-gray-500'
                  : 'border border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-gray-300 text-lg">
            Find the perfect items from our curated collection
          </p>
        </div>

        {/* Enhanced Filter Bar */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Left Side - Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
              >
                <Filter size={18} />
                Filters
              </button>

              {/* Filters */}
              <div className={`flex flex-col sm:flex-row gap-4 w-full ${showFilters ? 'block' : 'hidden lg:flex'}`}>
                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 cursor-pointer min-w-[160px]"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 cursor-pointer min-w-[160px]"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {/* Items Per Page */}
                <div className="relative">
                 
                </div>
              </div>
            </div>

            {/* Right Side - View Mode */}
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm hidden sm:block">View:</span>
              <div className="flex items-center bg-gray-700 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === "grid" 
                      ? "bg-yellow-400 text-black shadow-lg" 
                      : "text-gray-300 hover:text-white hover:bg-gray-600"
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === "list" 
                      ? "bg-yellow-400 text-black shadow-lg" 
                      : "text-gray-300 hover:text-white hover:bg-gray-600"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700 border-t-yellow-400"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse h-4 w-4 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && (
          <>
            {products.length > 0 ? (
              <div className={`transition-all duration-500 ${
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                  : "flex flex-col gap-6"
              }`}>
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className="transform transition-all duration-500 hover:scale-[1.02]"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    <ProductCard
                      product={product}
                      isWishlisted={wishlist.some((p) => p.id === product.id)}
                      onWishlistToggle={onWishlistToggle}
                      viewMode={viewMode}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl text-gray-600 mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-white mb-2">No products found</h3>
                <p className="text-gray-400">Try adjusting your filters or search criteria</p>
              </div>
            )}

            {/* Pagination */}
            <Pagination />
          </>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProductGrid;