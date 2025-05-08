<template>
    <div class="flex flex-col gap-0 justify-center items-center px-3">
        <!-- Banner Carousel -->
        <div id="default-carousel" class="relative w-full" data-carousel="static">
            <!-- Carousel wrapper -->
            <div class="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
                <!-- Carousel items with horizontal scroll animation -->
                <div class="flex transition-transform duration-700 ease-in-out"
                    :style="{ transform: `translateX(-${activeSlide * 100}%)` }">
                    <div v-for="(img, index) in imageUrls" :key="index" class="w-full flex-shrink-0">
                        <img :src="img" class="w-full h-full object-cover mx-auto" :alt="`Image ${index + 1}`">
                    </div>
                </div>
            </div>

            <!-- Slider indicators -->
            <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                <button v-for="(_, i) in imageUrls" :key="i" @click="goToBannerSlide(i)" type="button"
                    class="w-3 h-3 rounded-full transition-colors duration-200"
                    :class="activeSlide === i ? 'bg-white dark:bg-gray-800' : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80'">
                </button>
            </div>
        </div>

        <!-- Banner Content -->
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
            <button type="button" @click="$router.push('/products')"
                class="text-gray-900 bg-white border border-gray-500 hover:bg-gray-100 font-bold rounded-lg text-sm px-5 py-2.5 mt-4 md:mt-8 dark:border-0 dark:bg-[#dfc3ca] dark:hover:bg-[#cca0ac] cursor-pointer">
                Shop Now
            </button>
        </div>

        <!-- Categories Section -->
        <div class="w-full">
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
                        <button @click="prevSlide"
                            class="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 dark:bg-[#282828] dark:hover:bg-[#222222]"
                            :disabled="currentSlide === 0"
                            :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button @click="nextSlide"
                            class="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 dark:bg-[#282828] dark:hover:bg-[#222222]"
                            :disabled="currentSlide >= productChunks.length - 1"
                            :class="{ 'opacity-50 cursor-not-allowed': currentSlide >= productChunks.length - 1 }">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Carousel container -->
                <div class="w-full overflow-hidden">
                    <!-- Desktop version -->
                    <div v-if="!isMobile" class="flex transition-transform duration-300 ease-in-out"
                        :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                        <div v-for="(chunk, index) in productChunks" :key="index" class="w-full flex-shrink-0">
                            <ProductCard :products="chunk" :hasExploreAllItemsTitle="true" />
                        </div>
                    </div>

                    <!-- Mobile scrollable version with scroll detection -->
                    <div v-else ref="scrollContainer" class="scrollbar-hide overflow-x-auto snap-x snap-mandatory"
                        style="-webkit-overflow-scrolling: touch; scroll-behavior: smooth;" @scroll="handleScroll">
                        <div class="flex">
                            <div v-for="(chunk, index) in productChunks" :key="index"
                                :ref="el => { if (el) scrollableItems[index] = el }"
                                class="w-full flex-shrink-0 snap-start">
                                <ProductCard :products="chunk" :hasExploreAllItemsTitle="true" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Dots indicator -->
                <div class="flex justify-center mt-4 space-x-2">
                    <button v-for="(_, index) in productChunks" :key="index"
                        @click="isMobile ? scrollToSlide(index) : goToSlide(index)"
                        class="w-3 h-3 rounded-full transition-colors duration-200"
                        :class="currentSlide === index ? 'bg-[#3f3f3f] dark:bg-gray-200' : 'bg-gray-300 dark:bg-[#282828]'"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue';
import { useProductStore } from '../store/product.js';
import ProductCard from '../components/ProductCard.vue';
import { onActivated, onDeactivated } from 'vue';

const productStore = useProductStore();
const isMobile = ref(window.innerWidth < 640);
const currentSlide = ref(0);
const scrollContainer = ref(null);
const scrollableItems = ref([]);
const isScrolling = ref(false);
const scrollTimeout = ref(null);

// Banner carousel state
const activeSlide = ref(0);
const bannerInterval = ref(null);
const autoplaySpeed = 5000; // 5 seconds between slides
const transitionSpeed = 700; // Matches the duration in the CSS transition

const imageUrls = ref([
    'https://images.unsplash.com/photo-1665832101859-5baac6b938ab?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1716951872043-9ece00ee1d90?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1665832102556-ba212924f541?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1714317438040-0e8584215699?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1665832102316-9fd8e8f77c88?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]);

// Banner carousel functions
const nextBannerSlide = () => {
    // Add a smooth transition effect
    activeSlide.value = (activeSlide.value + 1) % imageUrls.value.length;
    resetBannerInterval();
};

const prevBannerSlide = () => {
    // Add a smooth transition effect
    activeSlide.value = (activeSlide.value - 1 + imageUrls.value.length) % imageUrls.value.length;
    resetBannerInterval();
};

const goToBannerSlide = (index) => {
    activeSlide.value = index;
    resetBannerInterval();
};

const startBannerInterval = () => {
    stopBannerInterval(); // Clear any existing interval first
    bannerInterval.value = setInterval(() => {
        nextBannerSlide();
    }, autoplaySpeed);
};

const stopBannerInterval = () => {
    if (bannerInterval.value) {
        clearInterval(bannerInterval.value);
        bannerInterval.value = null;
    }
};

const resetBannerInterval = () => {
    stopBannerInterval();
    startBannerInterval();
};

// Products carousel functions
const handleResize = () => {
    isMobile.value = window.innerWidth < 640;
}

const chunkSize = computed(() => (isMobile.value ? 3 : 5))

const productChunks = computed(() => {
    const chunks = [];
    for (let i = 0; i < productStore.products.length; i += chunkSize.value) {
        chunks.push(productStore.products.slice(i, i + chunkSize.value));
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

const scrollToSlide = (index) => {
    if (!scrollContainer.value || !scrollableItems.value[index]) return;

    isScrolling.value = true;
    scrollContainer.value.scrollTo({
        left: scrollableItems.value[index].offsetLeft,
        behavior: 'smooth'
    });

    // Update dots indicator
    currentSlide.value = index;

    // Reset scrolling flag after animation completes
    clearTimeout(scrollTimeout.value);
    scrollTimeout.value = setTimeout(() => {
        isScrolling.value = false;
    }, 300); // Match with the scroll animation duration
};

const handleScroll = () => {
    if (!scrollContainer.value || isScrolling.value) return;

    // Debounce scroll events
    clearTimeout(scrollTimeout.value);
    scrollTimeout.value = setTimeout(() => {
        // Find which slide is most visible in the viewport
        const containerLeft = scrollContainer.value.scrollLeft;
        const containerWidth = scrollContainer.value.offsetWidth;

        let closestSlide = 0;
        let closestDistance = Infinity;

        scrollableItems.value.forEach((item, index) => {
            if (!item) return;

            const itemLeft = item.offsetLeft;
            const distance = Math.abs(itemLeft - containerLeft);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestSlide = index;
            }
        });

        // Update current slide if different
        if (currentSlide.value !== closestSlide) {
            currentSlide.value = closestSlide;
        }
    }, 100);
};

// Reset scrollable items array when chunks change
watch(() => productChunks.value.length, () => {
    scrollableItems.value = [];
});

// Lifecycle hooks
onMounted(() => {
    productStore.fetchCategories();
    productStore.fetchAllProducts();

    window.addEventListener('resize', handleResize);
    handleResize();

    // Initialize scrollable items array
    scrollableItems.value = new Array(productChunks.value.length).fill(null);

    // Start banner autoplay
    startBannerInterval();

    // Add visibility change listener for carousel persistence
    document.addEventListener('visibilitychange', handleVisibilityChange);
});

// Cleanup when component is unmounted
onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    clearTimeout(scrollTimeout.value);
    stopBannerInterval();
    document.removeEventListener('visibilitychange', handleVisibilityChange);
});

// Handle page visibility changes
const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
        // Resume autoplay when page becomes visible
        startBannerInterval();
    } else {
        // Pause autoplay when page is hidden
        stopBannerInterval();
    }
};

// These hooks are specific for Vue's keep-alive components
onActivated(() => {
    // This runs when a cached component is re-displayed
    startBannerInterval();
});

onDeactivated(() => {
    // Component is being cached but not destroyed
    stopBannerInterval();
});
</script>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>