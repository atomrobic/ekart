// src/store/useProductStore.js
import { create } from "zustand";
import axios from "axios";

const useProductStore = create((set) => ({
  products: [],

  fetchProducts: async ({ sortBy, categoryId = "" } = {}) => {
    try {
      let url = `https://ecomnew-atomrobic7620-zc1loemy.leapcell.dev/seller/products`;
      const params = [];

      if (sortBy) params.push(`sort_by=${sortBy}`);
      if (categoryId) params.push(`category_id=${categoryId}`);

      if (params.length) url += `?${params.join("&")}`;

      const response = await axios.get(url);
      set({ products: response.data });
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  },
}));

export default useProductStore;
