import { defineStore } from "pinia";
import { getCategories, getProducts } from "../api/main.js";
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

  return { categories, fetchCategories, products, fetchAllProducts };
});
