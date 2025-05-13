import { defineStore } from "pinia";
import {
  getCategories,
  getProducts,
  getProductsBySlug,
  getProductsByCategory,
} from "../api/main.js";
import { ref, computed } from "vue";

export const useProductStore = defineStore("product", () => {
  // State
  const categories = ref([]);
  const products = ref([]);
  const selectedCategoryId = ref(null);
  const sortOption = ref("default");
  const priceRange = ref({
    min: 0,
    max: 10000,
  });
  const loading = ref(false);

  // API calls
  const fetchCategories = async () => {
    try {
      loading.value = true;
      const res = await getCategories();
      categories.value = res.data;
      return res.data;
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchAllProducts = async () => {
    try {
      loading.value = true;
      const res = await getProducts();
      products.value = res.data;
      updatePriceRangeFromProducts();
      return res.data;
    } catch (err) {
      console.error("Failed to fetch products:", err);
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchProductsBySlug = async (slug) => {
    try {
      loading.value = true;
      const res = await getProductsBySlug(slug);
      return res.data;
    } catch (err) {
      console.error("Failed to fetch product by slug:", err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  const fetchProductsByCategory = async (categoryId) => {
    try {
      loading.value = true;
      selectedCategoryId.value = categoryId;
      const res = await getProductsByCategory(categoryId);
      products.value = res.data;
      updatePriceRangeFromProducts();
      return res.data;
    } catch (err) {
      console.error("Failed to fetch products by category:", err);
      return [];
    } finally {
      loading.value = false;
    }
  };

  const updatePriceRangeFromProducts = () => {
    if (products.value.length > 0) {
      const prices = products.value.map((product) => parseInt(product.price));
      priceRange.value = {
        min: Math.min(...prices),
        max: Math.max(...prices),
      };
    }
  };

  // Computed properties
  const minMaxPrices = computed(() => {
    if (!products.value.length) {
      return { 
        min: 0, 
        max: 10000 
      };
    }
    const prices = products.value.map((product) => parseInt(product.price));
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  });

  const selectedCategory = computed(() => {
    if (!selectedCategoryId.value) return null;
    return (
      categories.value.find((cat) => cat.id === selectedCategoryId.value) ||
      null
    );
  });

  const filteredProducts = computed(() => {
    let filtered = [...products.value];

    // Apply price range filter
    filtered = filtered.filter(
      (product) =>
        parseInt(product.price) >= priceRange.value.min &&
        parseInt(product.price) <= priceRange.value.max
    );

    // Apply sorting
    switch (sortOption.value) {
      case "price-low":
        filtered.sort((a, b) => parseInt(a.price) - parseInt(b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => parseInt(b.price) - parseInt(a.price));
        break;
      case "name-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return filtered;
  });

  // Actions
  const setSortOption = (option) => {
    sortOption.value = option;
  };

  const setPriceRange = (min, max) => {
    priceRange.value = {
      min: min || 0,
      max: max || 10000,
    };
  };

  const clearFilters = () => {
    selectedCategoryId.value = null;
    sortOption.value = "default";
    priceRange.value = {
      min: minMaxPrices.value.min,
      max: minMaxPrices.value.max,
    };
  };

  // Initialize from URL parameters
  const initFiltersFromURLParams = async (routeQuery) => {
    // First load categories if needed
    if (categories.value.length === 0) {
      await fetchCategories();
    }

    // Handle category filtering
    const categoryId = routeQuery.category_id;
    if (categoryId) {
      await fetchProductsByCategory(categoryId);
    } else {
      await fetchAllProducts();
    }

    // Handle price range
    const minPrice = parseInt(routeQuery.minPrice) || minMaxPrices.value.min;
    const maxPrice = parseInt(routeQuery.maxPrice) || minMaxPrices.value.max;
    priceRange.value = {
      min: minPrice,
      max: maxPrice,
    };

    // Handle sorting
    sortOption.value = routeQuery.sort || "default";
  };

  return {
    // State
    categories,
    products,
    selectedCategoryId,
    sortOption,
    priceRange,
    loading,

    // Computed
    minMaxPrices,
    filteredProducts,
    selectedCategory,

    // API
    fetchCategories,
    fetchAllProducts,
    fetchProductsBySlug,
    fetchProductsByCategory,

    // Actions
    setSortOption,
    setPriceRange,
    clearFilters,
    initFiltersFromURLParams,
  };
});
