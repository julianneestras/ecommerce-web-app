import { defineStore } from "pinia";
import {
  getCategories,
  getCategoryBySlug,
  getProducts,
  getProductsBySlug,
} from "../api/main.js";
import { ref } from "vue";

// export const useProductStore = defineStore("product", {
//   state: () => ({
//     categories: [],
//   }),
//   actions: {
//     async fetchCategories() {
//       try {
//         const res = await getCategories();
//         this.categories = res.data;
//         console.log("categories", res.data);
//       } catch (err) {
//         console.log("Failed to fetch categories:", err);
//       }
//     },
//   },
// });

export const useProductStore = defineStore("product", () => {
  const categories = ref([]);
  const products = ref([]);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      categories.value = res.data;
      console.log("categories", res.data);
    } catch (err) {
      console.log("Failed to fetch categories:", err);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const res = await getProducts();
      products.value = res.data;
      console.log("products", res.data);
    } catch (err) {
      console.log("Failed to fetch products:", err);
    }
  };

  const fetchProductsBySlug = async (slug) => {
    try {
      const res = await getProductsBySlug(slug);
      return res.data;
    } catch (err) {
      console.log("Failed to fetch products by slug:", err);
    }
  };

  const fetchCategoryBySlug = async (slug) => {
    try {
      const res = await getCategoryBySlug(slug);
      return res.data;
    } catch (err) {
      console.log("Failed to fetch category by slug:", err);
    }
  };

  return {
    categories,
    fetchCategories,
    products,
    fetchAllProducts,
    fetchProductsBySlug,
    fetchCategoryBySlug,
  };
});
