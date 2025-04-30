<template>
    <div class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white primary-bg md:hidden"
        :style="'box-shadow: 0 -4px 12px -1px rgba(0, 0, 0, 0.1)'">
        <div class="grid h-full max-w-lg grid-cols-3 mx-auto font-medium flex justify-center items-center">
            <button type="button"
                class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group gap-1">
                <svg-icon :name="'home'" class="text-gray-900 h-5.5 dark:text-gray-300" />
                <span
                    class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                    Home
                </span>
            </button>
            <button type="button"
                class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group gap-1">
                <Cart />
                <span
                    class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                    Cart
                </span>
            </button>
            <button type="button" @click="handleClick"
                class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group gap-1">
                <svg-icon :name="'search'" class="text-gray-700 w-5.5 h-5.5 dark:text-gray-300" />
                <span
                    class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                    Search
                </span>
            </button>
        </div>
    </div>

</template>

<script setup lang="js">
import Cart from '../components/Cart.vue';
const emit = defineEmits(['toggle-navbar'])

const handleClick = () => {
    emit('toggle-navbar')
}
</script>
