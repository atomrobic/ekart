import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import HeroSection from "./Herosection";
import ProductGrid from "./ProductGrid";
import useProductStore from "./product_data/product"; // ✅ default export

const BlackEcommerce = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Destructure from your store
  const { products, wishlist, fetchProducts, toggleWishlist } = useProductStore();

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        wishlistCount={wishlist.length}
      />
      <HeroSection />
      <ProductGrid
        products={products}           // products from Zustand
        wishlist={wishlist}           // wishlist from Zustand
        onWishlistToggle={toggleWishlist} // toggleWishlist function
      />
    </div>
  );
};

export default BlackEcommerce;
