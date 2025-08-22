// Inside product_data/product.js (Zustand store)
import { create } from 'zustand';
import { useNavigate } from 'react-router-dom';

const useProductStore = create((set, get) => ({
  selectedProduct: null,
  handleQuickView: (product) => {
    set({ selectedProduct: product });
    // You should navigate here instead of just setting the product
  },
  // other state/actions...
}));
