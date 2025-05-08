<template>
    <Topbar />
    <nav class="bg-white border-gray-100 primary-bg sticky top-0 z-50">
        <div
            class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 sm:space-x-4 sm:justify-between md:justify-center lg:justify-between">
            <a href="" class="flex items-center space-x-3 rtl:space-x-reverse">
                <svg-icon :name="'logo'" class="h-9 w-20" />
            </a>
            <div class="flex justify-center items-center md:order-2 m-0">
                <div class="relative hidden md:block">
                    <SearchBar />
                </div>
                <DarkModeToggle />
                <div class="hidden md:block">
                    <CartIcon />
                </div>
                <button @click="handleClick" type="button"
                    class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-search" :aria-expanded="isNavbarOpen.toString()">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
            </div>
            <transition name="slide-fade">
                <div v-if="props.isNavbarOpen || screenWidth >= 768" class=" items-center justify-between w-full
                    md:flex md:w-auto md:order-1" id="navbar-search">
                    <div class="relative mt-3 md:hidden">
                        <SearchBar />
                    </div>
                    <ul
                        class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-[#363535] dark:bg-[#282828] md:dark:bg-[#121212]">

                        <li>
                            <router-link to="/"
                                class="block py-2 px-3 rounded-sm text-gray-900 bg-gray-200 md:bg-transparent dark:text-white dark:bg-[#3f3f3f] md:dark:bg-transparent md:p-0 md:hover:text-gray-600 md:dark:hover:text-[#d9b7c0]">
                                Home
                            </router-link>
                        </li>

                        <li>
                            <router-link to="/products"
                                class="block py-2 px-3 rounded-sm text-gray-900 dark:text-white hover:bg-gray-100 md:bg-transparent md:hover:bg-transparent md:p-0 md:hover:text-gray-600 md:dark:hover:text-[#d9b7c0]">
                                Products
                            </router-link>
                        </li>

                        <li>
                            <router-link to=""
                                class="block py-2 px-3 rounded-sm text-gray-900 dark:text-white hover:bg-gray-100 md:bg-transparent md:hover:bg-transparent md:p-0 md:hover:text-gray-600 md:dark:hover:text-[#d9b7c0]">
                                Collections
                            </router-link>
                        </li>

                        <li>
                            <router-link to=""
                                class="block py-2 px-3 rounded-sm text-gray-900 dark:text-white hover:bg-gray-100 md:bg-transparent md:hover:bg-transparent md:p-0 md:hover:text-gray-600 md:dark:hover:text-[#d9b7c0]">
                                New & Featured
                            </router-link>
                        </li>

                        <li>
                            <router-link to=""
                                class="block py-2 px-3 rounded-sm text-gray-900 dark:text-white hover:bg-gray-100 md:bg-transparent md:hover:bg-transparent md:p-0 md:hover:text-gray-600 md:dark:hover:text-[#d9b7c0]">
                                Sale
                            </router-link>
                        </li>
                    </ul>
                </div>
            </transition>
        </div>
    </nav>
</template>

<script setup lang="js">
import DarkModeToggle from '../components/DarkModeToggle.vue'
import Topbar from './Topbar.vue'
import SearchBar from '../components/SearchBar.vue'
import CartIcon from '../components/CartIcon.vue'

import { ref, onMounted, onBeforeUnmount } from 'vue'

const screenWidth = ref(window.innerWidth)

const props = defineProps({
    isNavbarOpen: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['toggle-navbar'])

const handleClick = () => {
    emit('toggle-navbar')
}
const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth
}

onMounted(() => {
    window.addEventListener('resize', updateScreenWidth)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateScreenWidth)
})

</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.slide-fade-enter-to,
.slide-fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>
