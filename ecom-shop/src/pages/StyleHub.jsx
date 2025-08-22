import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import HeroSection from "./Herosection";
import ProductGrid from "./ProductGrid";
import useProductStore from "./product_data/product"; // ✅ default export
import { Home, Heart, ShoppingCart, User } from "lucide-react"; // Icons

const BlackEcommerce = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Zustand store
  const { products, wishlist, fetchProducts, toggleWishlist } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col">
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        wishlistCount={wishlist.length}
      />
      <HeroSection />
      <ProductGrid
        products={products}
        wishlist={wishlist}
        onWishlistToggle={toggleWishlist}
      />

      {/* ✅ Bottom Navigation Bar (Mobile Only) */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 flex justify-around py-3 block md:hidden">
        <button className="flex flex-col items-center text-white hover:text-yellow-400">
          <Home size={22} />
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center text-white hover:text-yellow-400">
          <Heart size={22} />
          <span className="text-xs">Wishlist</span>
        </button>
        <button className="flex flex-col items-center text-white hover:text-yellow-400 relative">
          <ShoppingCart size={22} />
          <span className="text-xs">Cart</span>
          {/* Example cart badge */}
          <span className="absolute top-0 right-3 bg-red-500 text-white text-[10px] rounded-full px-1">
            2
          </span>
        </button>
        <button className="flex flex-col items-center text-white hover:text-yellow-400">
          <User size={22} />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default BlackEcommerce;
