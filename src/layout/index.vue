<template>
    <div class="flex flex-col gap-0 justify-center items-center px-4">
        <div id="default-carousel" class="relative w-full" data-carousel="slide">
            <div class="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
                <!-- Carousel items -->
                <div v-for="(img, index) in imageUrls" :key="index" class="hidden duration-700 ease-in-out"
                    data-carousel-item>
                    <img :src="img" class="w-full object-contain mx-auto" :alt="`Image ${index + 1}`">
                </div>
            </div>
            <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                <button v-for="(_, i) in imageUrls" :key="i" type="button" class="w-3 h-3 rounded-full"
                    :aria-label="`Slide ${i + 1}`" :aria-current="i === 0 ? 'true' : 'false'"
                    :data-carousel-slide-to="i"></button>
            </div>
        </div>
        <div class="flex flex-col items-start gap-3 my-6 md:my-12 md:items-center">
            <h2 class="text-md leading-none tracking-tight text-gray-900 md:text-lg dark:text-white">
                METRIX Urban Edge Collection
            </h2>
            <h1
                class="text-5xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-6xl md:text-6xl dark:text-white">
                GEAR UP. STAND OUT.
            </h1>
            <h3 class="text-md leading-none tracking-tight text-gray-900 md:text-lg dark:text-white">
                Bold colors, modern cuts, effortless comfort.
            </h3>
            <button type="button"
                class="text-gray-900 bg-white border border-gray-500 hover:bg-gray-100 font-bold rounded-lg text-sm px-5 py-2.5 mt-4 md:mt-8 dark:border-0 dark:bg-[#dfc3ca] dark:hover:bg-[#cca0ac] cursor-pointer">
                Shop Now
            </button>
        </div>
        <div>
            <ProductCard :products="productStore.categories" :hasShopByCategoriesTitle="true">
                <template v-slot:title>
                    <h1 class="text-2xl font-extrabold text-lg md:text-xl lg:text-2xl xl:text-2xl mt-4 lg:mt-12">
                        Shop by Categories
                    </h1>
                </template>
            </ProductCard>

            <!-- Products Carousel -->
            <div class="relative w-full my-8">
                <!-- Container for title and buttons -->
                <div class="flex justify-between items-center">
                    <h1 class="text-2xl font-extrabold text-lg md:text-xl lg:text-2xl xl:text-2xl lg:mt-12">
                        Explore All Items
                    </h1>

                    <!-- Navigation buttons -->
                    <div class="flex space-x-4 hidden md:block">
                        <button @click="prevSlide" class="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100"
                            :disabled="currentSlide === 0"
                            :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button @click="nextSlide" class="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100"
                            :disabled="currentSlide >= productChunks.length - 1"
                            :class="{ 'opacity-50 cursor-not-allowed': currentSlide >= productChunks.length - 1 }">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Carousel container -->
                <div class="relative overflow-hidden">
                    <div class="flex transition-transform duration-300 ease-in-out"
                        :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                        <div v-for="(chunk, index) in productChunks" :key="index" class="w-full flex-shrink-0">
                            <ProductCard :products="chunk" :hasExploreAllItemsTitle="true" />
                        </div>
                    </div>
                </div>

                <!-- Dots indicator -->
                <div class="flex justify-center mt-4 space-x-2">
                    <button v-for="(_, index) in productChunks" :key="index" @click="goToSlide(index)"
                        class="w-3 h-3 rounded-full transition-colors duration-200"
                        :class="currentSlide === index ? 'bg-gray-800' : 'bg-gray-300'"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="js">
import { ref, onMounted, computed } from 'vue';
import { useProductStore } from '../store/product.js';
import ProductCard from '../components/ProductCard.vue';

const productStore = useProductStore();
const chunkSize = 5;
const currentSlide = ref(0);

const productChunks = computed(() => {
    const chunks = [];
    for (let i = 0; i < productStore.products.length; i += chunkSize) {
        chunks.push(productStore.products.slice(i, i + chunkSize));
    }
    return chunks;
});

const nextSlide = () => {
    if (currentSlide.value < productChunks.value.length - 1) {
        currentSlide.value++;
    }
};

const prevSlide = () => {
    if (currentSlide.value > 0) {
        currentSlide.value--;
    }
};

const goToSlide = (index) => {
    currentSlide.value = index;
};

const imageUrls = ref([
    'https://images.unsplash.com/photo-1665832101859-5baac6b938ab?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1716951872043-9ece00ee1d90?q=80&w=2655&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1665832102556-ba212924f541?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1714317438040-0e8584215699?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1665832102316-9fd8e8f77c88?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]);

onMounted(() => {
    productStore.fetchCategories();
    productStore.fetchAllProducts();
});
</script>