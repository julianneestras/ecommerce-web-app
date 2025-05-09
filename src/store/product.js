import { defineStore } from "pinia";
import {
  getCategories,
  getCategoryBySlug,
  getProducts,
  getProductsBySlug,
} from "../api/main.js";
import { ref, computed } from "vue";

export const useProductStore = defineStore("product", () => {
  // State
  const categories = ref([]);
  const products = ref([]);
  const selectedCategorySlug = ref(null);
  const selectedCategory = ref(null);
  const sortOption = ref("default");
  const priceRange = ref({
    min: 0,
    max: 10000,
  });

  // API
  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      categories.value = res.data;
      console.log("categories", res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const res = await getProducts();
      products.value = res.data;
      console.log("products", res.data);

      // Initialize price range based on actual product prices
      if (products.value.length > 0) {
        const prices = products.value.map((product) => parseInt(product.price));
        priceRange.value = {
          min: Math.min(...prices),
          max: Math.max(...prices),
        };
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const fetchProductsBySlug = async (slug) => {
    try {
      const res = await getProductsBySlug(slug);
      return res.data;
    } catch (err) {
      console.error("Failed to fetch products by slug:", err);
    }
  };

  const fetchCategoryBySlug = async (slug) => {
    try {
      const res = await getCategoryBySlug(slug);
      return res.data;
    } catch (err) {
      console.error("Failed to fetch category by slug:", err);
    }
  };

  // Computed functions
  const minMaxPrices = computed(() => {
    if (!products.value.length)
      return {
        min: 0,
        max: 10000,
      };
    const prices = products.value.map((product) => parseInt(product.price));
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  });

  const filteredProducts = computed(() => {
    let filtered = [...products.value];

    // Filter by category - MODIFIED THIS PART
    if (selectedCategorySlug.value) {
      console.log("Filtering by category slug:", selectedCategorySlug.value);
      console.log("Current products:", filtered.length);

      filtered = filtered.filter((product) => {
        // Make sure product.category exists before accessing its properties
        if (!product.category) {
          return false;
        }

        // Check if the category slug matches (case insensitive)
        const categoryMatches =
          product.category.slug.toLowerCase() ===
          selectedCategorySlug.value.toLowerCase();

        // Debug logging
        console.log(
          `Product ${product.id} - category: ${product.category.slug}, match: ${categoryMatches}`
        );

        return categoryMatches;
      });

      console.log("Filtered products count:", filtered.length);
    }

    // Rest of the filtering logic remains the same
    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        parseInt(product.price) >= priceRange.value.min &&
        parseInt(product.price) <= priceRange.value.max
    );

    // Sort products
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
      default:
        break;
    }

    return filtered;
  });

  // Actions / Setters
  const setSelectedCategorySlug = (slug) => {
    selectedCategorySlug.value = slug;
  };

  const setSelectedCategory = (category) => {
    selectedCategory.value = category;
  };

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
    selectedCategorySlug.value = null;
    selectedCategory.value = null;
    sortOption.value = "default";
    priceRange.value = {
      min: minMaxPrices.value.min,
      max: minMaxPrices.value.max,
    };
  };

  const initFiltersFromURLParams = async (routeQuery) => {
    // Handle category filtering
    const categoryParam = routeQuery.category;
    if (categoryParam) {
      selectedCategorySlug.value = categoryParam;
      await loadCategoryDetails(categoryParam);
    } else {
      selectedCategorySlug.value = null;
      selectedCategory.value = null;
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

  const loadCategoryDetails = async (slug) => {
    if (slug) {
      try {
        const categoryData = await fetchCategoryBySlug(slug);
        selectedCategory.value = categoryData;
      } catch (err) {
        console.error("Failed to load category details:", err);
        selectedCategory.value = null;
      }
    } else {
      selectedCategory.value = null;
    }
  };

  return {
    // State
    categories,
    products,
    selectedCategory,
    selectedCategorySlug,
    sortOption,
    priceRange,

    // Computed
    minMaxPrices,
    filteredProducts,

    // API
    fetchCategories,
    fetchAllProducts,
    fetchProductsBySlug,
    fetchCategoryBySlug,

    // Actions
    setSelectedCategorySlug,
    setSelectedCategory,
    setSortOption,
    setPriceRange,
    clearFilters,
    initFiltersFromURLParams,
    loadCategoryDetails,
  };
});
