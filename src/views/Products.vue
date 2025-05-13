<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Loading state -->
        <div v-if="loading || productStore.loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
        </div>

        <div v-else>
            <!-- Category Title when viewing a specific category -->
            <div v-if="productStore.selectedCategory" class="mb-6">
                <h1 class="text-3xl font-bold mb-2">{{ productStore.selectedCategory.name }}</h1>
                <p class="text-gray-600 dark:text-gray-400">{{ productStore.filteredProducts.length }} products found</p>
            </div>

            <!-- Filters section -->
            <div class="flex flex-col lg:flex-row gap-6 mb-8">
                <!-- Categories container -->
                <div class="w-full lg:w-1/4">
                    <div class="bg-white dark:bg-[#282828] rounded-lg shadow p-4">
                        <h2 class="text-lg font-semibold mb-4 border-b pb-2 dark:border-gray-700">Categories</h2>
                        <div class="flex flex-col space-y-2">
                            <div class="flex items-center">
                                <input id="all-categories" type="radio" name="category"
                                    :checked="!productStore.selectedCategoryId" @change="clearCategoryFilter"
                                    class="w-4 h-4 text-[#121212] dark:text-[#c594a2] bg-gray-100 border-gray-300 rounded focus:ring-[#282828] dark:focus:ring-[#cca0ac] dark:ring-offset-gray-800 dark:bg-[#3f3f3f] dark:border-[#575757]">
                                <label for="all-categories"
                                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    All Categories
                                </label>
                            </div>
                            <div v-for="category in productStore.categories" :key="category.id" class="flex items-center">
                                <input :id="`category-${category.id}`" type="radio" name="category"
                                    :checked="String(productStore.selectedCategoryId) === String(category.id)"
                                    @change="filterByCategory(category.slug, category.id)"
                                    class="w-4 h-4 text-[#121212] dark:text-[#c594a2] bg-gray-100 border-gray-300 rounded focus:ring-[#282828] dark:focus:ring-[#cca0ac] dark:ring-offset-[#3f3f3f] dark:bg-[#3f3f3f] dark:border-[#575757]">
                                <label :for="`category-${category.id}`"
                                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {{ category.name }}
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Price filter -->
                    <div class="bg-white dark:bg-[#282828] rounded-lg shadow p-4 mt-4">
                        <h2 class="text-lg font-semibold mb-4 border-b pb-2 dark:border-gray-700">Price Range</h2>
                        <div class="flex flex-col space-y-4">
                            <div>
                                <span class="text-sm text-gray-600 dark:text-gray-400">Min: Php {{ localPriceRange.min }}</span>
                                <input type="range" v-model="localPriceRange.min" :min="productStore.minMaxPrices.min"
                                    :max="productStore.minMaxPrices.max"
                                    class="w-full h-2 bg-gray-200 dark:bg-[#3f3f3f] rounded-lg appearance-none cursor-pointer">
                            </div>
                            <div>
                                <span class="text-sm text-gray-600 dark:text-gray-400">Max: Php {{ localPriceRange.max }}</span>
                                <input type="range" v-model="localPriceRange.max" :min="productStore.minMaxPrices.min"
                                    :max="productStore.minMaxPrices.max"
                                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-[#3f3f3f]">
                            </div>
                            <button @click="applyFilters"
                                class="bg-[#121212] text-white dark:text-black px-4 py-2 rounded hover:bg-[#282828] transition-colors duration-200 dark:bg-[#c594a2] dark:hover:bg-[#b07c8a] cursor-pointer">
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Products grid -->
                <div class="w-full lg:w-3/4">
                    <div v-if="productStore.filteredProducts.length === 0" class="flex flex-col items-center justify-center h-64">
                        <p class="text-xl text-gray-500 dark:text-gray-400">No products found</p>
                        <button @click="clearCategoryFilter" class="mt-4 text-[#121212] dark:text-[#c594a2] underline">
                            View all products
                        </button>
                    </div>
                    
                    <ProductCard v-else :products="productStore.filteredProducts" :isVisible="true" :hasExploreAllItemsTitle="true">
                        <template v-slot:title>
                            <div class="flex justify-between items-center mb-4">
                                <h1 class="text-2xl font-extrabold text-lg md:text-xl lg:text-2xl xl:text-2xl">
                                    {{ productStore.selectedCategory ? productStore.selectedCategory.name : 'All Products' }}
                                </h1>
                                <div class="flex items-center">
                                    <label for="sort" class="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sort
                                        by:</label>
                                    <select id="sort" v-model="localSortOption" @change="applyFilters"
                                        class="bg-gray-50 border border-gray-200 dark:border-[#3f3f3f] text-gray-900 text-sm rounded-lg block p-2 dark:bg-[#282828] focus:ring-gray-400 dark:focus:ring-[#575757] dark:text-white">
                                        <option value="default">Default</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="name-asc">Name: A-Z</option>
                                        <option value="name-desc">Name: Z-A</option>
                                    </select>
                                </div>
                            </div>
                        </template>
                    </ProductCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../store/product.js';
import ProductCard from '../components/ProductCard.vue';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const loading = ref(true);

const localPriceRange = ref({
    min: 0,
    max: 10000
});
const localSortOption = ref('default');

// Methods
const filterByCategory = (slug, categoryId) => {
    updateUrlParams({ 
        category: slug,
        category_id: categoryId 
    });
};

const clearCategoryFilter = () => {
    updateUrlParams({ 
        category: null,
        category_id: null 
    });
};

const applyFilters = () => {
    updateUrlParams({
        minPrice: localPriceRange.value.min,
        maxPrice: localPriceRange.value.max,
        sort: localSortOption.value
    });
};

const updateUrlParams = (params) => {
    // Merge current params with new ones
    const newQuery = { ...route.query };

    // Update or remove params
    Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined) {
            delete newQuery[key];
        } else {
            newQuery[key] = String(value);
        }
    });

    // Update route
    router.push({
        path: route.path,
        query: newQuery
    });
};

// Watch for route changes
watch(
    () => route.query,
    async (newQuery) => {
        loading.value = true;
        await productStore.initFiltersFromURLParams(newQuery);

        // Update local state to match store state
        localPriceRange.value = {
            min: productStore.priceRange.min,
            max: productStore.priceRange.max
        };
        localSortOption.value = productStore.sortOption;
        loading.value = false;
    },
    { deep: true, immediate: true }
);

watch(
    () => productStore.priceRange,
    (newPriceRange) => {
        localPriceRange.value = {
            min: newPriceRange.min,
            max: newPriceRange.max
        };
    },
    { deep: true }
);

// Initialize on component mount
onMounted(async () => {
    loading.value = true;
    await productStore.fetchCategories();
    
    // Initialize filters from URL
    await productStore.initFiltersFromURLParams(route.query);

    // Set local values
    localPriceRange.value = {
        min: productStore.priceRange.min,
        max: productStore.priceRange.max
    };
    localSortOption.value = productStore.sortOption;
    loading.value = false;
});
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
    background-color: #121212;
}

/* Firefox */
input[type="range"]::-moz-range-thumb {
    background-color: #121212;
}

/* IE */
input[type="range"]::-ms-thumb {
    background-color: #121212;
}

.dark input[type="range"]::-webkit-slider-thumb {
    background-color: #cca0ac;
}

.dark input[type="range"]::-moz-range-thumb {
    background-color: #cca0ac;
}

.dark input[type="range"]::-ms-thumb {
    background-color: #cca0ac;
}
</style>