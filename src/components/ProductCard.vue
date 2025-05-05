<template>
    <slot name="title" />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-12">
        <div v-for="(item, index) in products" :key="index"
            class="w-full max-w-sm bg-white border border-gray-100 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="p-4 rounded-t-lg w-full h-full sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] object-cover mx-auto"
                    :src="item.image" alt="product image" />
            </a>
            <div class="px-5 pb-5">
                <h5
                    class="text-lg text-center sm:text-2xl md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {{ item.name }}
                </h5>
                <span>{{ item.description }}</span>
                <a href="#">
                </a>
                <div v-if="isVisible" class="flex items-center mt-2.5 mb-5">
                    <div class="flex items-center space-x-1 rtl:space-x-reverse">
                        <template v-for="index in 5" :key="index">
                            <svg v-if="index <= rating" class="w-4 h-4 text-yellow-300" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path
                                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg v-else class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path
                                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        </template>
                    </div>
                    <span
                        class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                        {{ rating.toFixed(1) }}
                    </span>
                </div>
                <div v-if="isVisible" class="flex items-center justify-between">
                    <span class="text-3xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        ₱{{ item.price }}
                    </span>
                    <button
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:text-base md:text-lg px-4 sm:px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="js">
import { ref, onMounted } from 'vue'

const rating = ref(0)
const isVisible = ref(false)

const props = defineProps({
    products: {
        type: Array,
        default: () => []
    }
})

onMounted(() => {
    rating.value = Math.floor(Math.random() * 5) + 1
})
</script>
