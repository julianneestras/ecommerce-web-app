<template>
    <div class="relative inline-block w-5.5 h-5.5">
        <svg-icon :name="'bag'" class="w-full h-full text-gray-900 dark:text-gray-300 cursor-pointer" />
        <div
            class="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center shadow-md">
            {{ cartCount }}
        </div>
    </div>

</template>

<script setup lang="js">
import { ref } from 'vue'

const cartCount = ref(0)
</script>