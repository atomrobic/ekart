// src/store/useProductStore.js
import { create } from "zustand";
import axios from "axios";

const useProductStore = create((set) => ({
  products: [],

  fetchProducts: async ({ sortBy = "featured", categoryId = "" } = {}) => {
    try {
      let url = `https://ecom-new-4bgv.onrender.com/products?sort_by=${sortBy}`;
      if (categoryId) url += `&category_id=${categoryId}`;

      const response = await axios.get(url);
      set({ products: response.data });
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  },
}));

export default useProductStore;
