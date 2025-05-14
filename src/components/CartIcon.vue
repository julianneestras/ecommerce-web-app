<template>
    <button @click="$router.push('/cart')" class="relative inline-block w-5.5 h-5.5 cursor-pointer">
        <svg-icon :name="'bag'" class="w-full h-full text-gray-900 dark:text-gray-300" />
        <div v-if="cartCount > 0"
            class="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center shadow-md">
            {{ cartCount }}
        </div>
    </button>
</template>

<script setup lang="js">
import { ref, computed } from 'vue'
import { useCartStore } from '../store/cart.js';

const cartStore = useCartStore()
const cartCount = computed(() => cartStore.cartCount)
</script>