import { create } from "zustand";
import axios from "axios";

const useProductStore = create((set, get) => ({
  products: [],
  wishlist: [],
  selectedProduct: null,

  // Fetch all products
  fetchProducts: async () => {
    try {
      const response = await axios.get("https://ecom-new-4bgv.onrender.com/seller/products");
      set({ products: response.data });
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  },

  // Wishlist toggle
  toggleWishlist: (product) => {
    const { wishlist } = get();
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      set({ wishlist: wishlist.filter((item) => item.id !== product.id) });
    } else {
      set({ wishlist: [...wishlist, product] });
    }
  },

  // Fetch single product by ID
  handleQuickView: async (id) => {
    try {
      const response = await axios.get(`https://ecom-new-4bgv.onrender.com/seller/products?id=${id}`);
      const product = Array.isArray(response.data) ? response.data[0] : response.data;
      if (product) {
        set({ selectedProduct: product });
      } else {
        console.warn("Product not found");
      }
    } catch (error) {
      console.error("Quick view fetch failed", error);
    }
  },

  // Set product manually
  setSelectedProduct: (product) => set({ selectedProduct: product }),
}));

export default useProductStore;
