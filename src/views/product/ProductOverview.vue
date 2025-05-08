<template>
    <div v-if="product" class="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
        <!-- Product display code remains unchanged -->
        <div>
            <img :src="selectedImage" alt="product" class="rounded-xl w-full aspect-square object-cover mb-4" />
            <div class="flex gap-2">
                <img v-for="(img, index) in product.images" :key="index" :src="img" @click="selectedImage = img"
                    class="w-20 h-20 object-cover rounded-lg cursor-pointer hover:border-gray-600 transition"
                    :class="{ 'border-2 border-gray-800': selectedImage === img }" />
            </div>
        </div>
        <div class="space-y-4">
            <p
                class="-ml-1 text-gray-500 text-xs sm:text-sm mt-2 inline-block w-auto border border-gray-200 rounded-full px-3 py-0.5 bg-gray-100 hover:bg-gray-200 cursor-pointer dark:bg-[#3a3a3a] dark:text-[#d2abb6] dark:border-[#575757] dark:hover:bg-[#444444] transition-colors">
                {{ product.category.name }}
            </p>
            <h2 class="text-3xl font-bold text-gray-800 dark:text-white">{{ product.title }}</h2>
            <p class="text-gray-600 dark:text-gray-300 text-sm">{{ product.description }}</p>
            <p class="text-xl font-semibold text-gray-800 dark:text-[#d2abb6]">Php {{ product.price }}.00</p>
            <div class="flex items-center space-x-4 mt-4">
                <div class="flex items-center rounded-lg overflow-hidden w-fit">
                    <form class="max-w-xs mx-auto">
                        <label for="quantity-input"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose
                            quantity:
                        </label>
                        <div class="relative flex items-center max-w-[8rem]">
                            <button @click="decreaseQuantity" type="button" id="decrement-button"
                                data-input-counter-decrement="quantity-input"
                                class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none cursor-pointer">
                                <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M1 1h16" />
                                </svg>
                            </button>
                            <input type="text" id="quantity-input" data-input-counter data-input-counter-min="1"
                                data-input-counter-max="50" aria-describedby="helper-text-explanation"
                                class="bg-gray-100 dark:bg-[#282828] border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-gray-500 focus:border-gray-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                                placeholder="0" :value="quantity" required :disabled="quantity <= 1" />
                            <button @click="increaseQuantity" type="button" id="increment-button"
                                data-input-counter-increment="quantity-input"
                                class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none cursor-pointer">
                                <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <button
                class="mt-6 bg-red-600 dark:bg-[#dfc3ca] hover:bg-red-700 dark:hover:bg-[#cca0ac] text-white dark:text-gray-800 hover:text-white font-semibold px-6 py-3 rounded-lg shadow-sm transition flex items-center gap-2 w-full justify-center cursor-pointer"
                @click="addToCart">
                Add to Bag
            </button>

        </div>
    </div>

    <!-- Enhanced Product Not Found Section -->
    <div v-else
        class="flex flex-col items-center justify-center py-16 px-4 text-center bg-gradient-to-b from-white to-[#FAFAFA] dark:from-[#121212] dark:to-[#141414] min-h-[70vh] rounded-xl">
        <div class="relative mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="h-40 w-40">
                <path d="M50,60 L150,60 L170,180 L30,180 Z" fill="#c594a2" stroke="#c9718a" stroke-width="4"
                    stroke-linejoin="round" class="animate-pulse" />
                <path d="M65,60 Q65,30 100,30 Q135,30 135,60" fill="none" stroke="#c9718a" stroke-width="4"
                    stroke-linecap="round" />
                <!-- Bag Face -->
                <circle cx="80" cy="100" r="8" fill="#555" /> <!-- Left eye -->
                <circle cx="120" cy="100" r="8" fill="#555" /> <!-- Right eye -->
                <!-- Sad mouth (animated) -->
                <path d="M80,140 Q100,120 120,140" fill="none" stroke="#555" stroke-width="4" stroke-linecap="round"
                    class="animate-bounce" />
                <!-- Tear drops -->
                <path d="M75,110 Q73,120 70,125" fill="#8ab4f8" stroke="#8ab4f8" stroke-width="2"
                    class="animate-bounce fill-#363334">
                    <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                </path>
                <path d="M125,110 Q127,120 130,125" fill="#8ab4f8" stroke="#8ab4f8" stroke-width="2"
                    class="animate-bounce">
                    <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                </path>
            </svg>

            <!-- Question Mark with Animation -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                class="h-12 w-12 absolute top-0 right-0 text-pink-500 animate-bounce fill-gray-800 dark:fill-[#c9718a]">
                <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,18c-0.55,0-1-0.45-1-1s0.45-1,1-1
       s1,0.45,1,1S12.55,18,12,18z M13,14h-2v-6h2V14z" />
            </svg>

        </div>

        <!-- Main Message with improved design -->
        <h2 class="text-3xl font-bold text-gray-800 dark:text-[#c594a2] mb-3 tracking-tight">Oops! Product Not Found
        </h2>
        <p class="text-gray-600 dark:text-gray-200 max-w-md mb-6 text-lg">We looked everywhere, but this product seems
            to be hiding from us! It might be out of stock or no longer available.</p>

        <!-- Decorative Elements -->
        <div class="flex justify-center space-x-2 mb-8">
            <span class="inline-block w-2 h-2 bg-[#8b8b8b] dark:bg-[#e6cfd5] rounded-full animate-bounce"
                style="animation-delay: 0s;"></span>
            <span class="inline-block w-2 h-2 bg-[#575757] dark:bg-[#dfc3ca] rounded-full animate-bounce"
                style="animation-delay: 0.1s;"></span>
            <span class="inline-block w-2 h-2 bg-[#3f3f3f] dark:bg-[#d9b7c0] rounded-full animate-bounce"
                style="animation-delay: 0.2s;"></span>
            <span class="inline-block w-2 h-2 bg-[#282828] dark:bg-[#d2abb6] rounded-full animate-bounce"
                style="animation-delay: 0.3s;"></span>
            <span class="inline-block w-2 h-2 bg-[#121212] dark:bg-[#c594a2] rounded-full animate-bounce"
                style="animation-delay: 0.4s;"></span>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/products"
                class="inline-flex items-center gap-2 text-white bg-[#121212] dark:bg-[#cca0ac] hover:bg-[#c594a2] dark:text-black font-semibold px-6 py-3 rounded-full hover:shadow-lg transition-all transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Continue Shopping
            </router-link>

            <router-link to="/search"
                class="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#121212] border border-[#121212] px-6 py-3 rounded-full hover:shadow-lg transition-all transform hover:scale-105 hover:bg dark:bg-transparent dark:hover:bg-transparent dark:text-[#d2abb6] dark:border-[#cca0ac] dark:hover:shadow-lg dark:hover:shadow-[#363334] font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Products
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useProductStore } from '../../store/product.js';
import { ref, onMounted } from 'vue'

const route = useRoute()
const productStore = useProductStore()

const product = ref(null)
const quantity = ref(1)
const selectedImage = ref('')

onMounted(async () => {
    const slug = route.params.slug
    const fetchedProduct = await productStore.fetchProductsBySlug(slug)
    if (fetchedProduct) {
        product.value = fetchedProduct
        selectedImage.value = fetchedProduct.images[0]
    }
})

const increaseQuantity = () => {
    quantity.value += 1
}

const decreaseQuantity = () => {
    if (quantity.value > 1) {
        quantity.value -= 1
    }
}

const addToCart = () => {
    console.log('Added to cart:', {
        product: product.value,
        quantity: quantity.value
    })
}
</script>