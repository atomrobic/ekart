import { ShoppingBag, User, X, ChevronRight } from "lucide-react";
import { useState } from "react";

const MobileMenu = ({ 
  categories, 
  activeCategory, 
  setActiveCategory, 
  wishlist, 
  setMobileMenuOpen,
  cartCount // Added separate cart count prop for better semantics
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    handleClose();
  };

  return (
    <div className={`fixed inset-0 z-50 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Menu Container */}
      <div className={`absolute top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-xl transform ${isClosing ? 'translate-x-[-100%]' : 'translate-x-0'} transition-transform duration-300 ease-in-out`}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
          <button 
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Categories */}
        <div className="overflow-y-auto h-[calc(100%-120px)]">
          <nav className="px-2 py-3 space-y-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-left ${
                  activeCategory === cat
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                } transition-colors duration-200`}
              >
                <span>{cat}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </nav>
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-4">
          <div className="flex justify-between items-center">
            <button 
              className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => {
                // Navigate to cart
                handleClose();
              }}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </button>
            
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              onClick={() => {
                // Handle sign in
                handleClose();
              }}
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;