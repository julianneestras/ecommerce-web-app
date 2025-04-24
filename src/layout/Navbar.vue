<template>
    <Topbar />
    <nav class="bg-white border-gray-200 light:bg-gray-200 dark:bg-gray-00">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="" class="flex items-center space-x-3 rtl:space-x-reverse">
                <svg-icon :name="'logo'" class="h-9 w-20" />
            </a>
            <div class="flex justify-center items-center md:order-2 gap-2">
                <div class="relative hidden md:block">
                    <SearchBar />
                </div>
                <DarkModeToggle />
                <button data-collapse-toggle="navbar-search" type="button"
                    class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-search" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
            </div>
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
                <div class="relative mt-3 md:hidden">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <SearchBar />
                </div>
                <ul
                    class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:border-gray-300">
                    <li>
                        <a href="#"
                            class="block py-2 px-3 text-gray-900 bg-gray-200 rounded-sm md:bg-transparent md:text-gray-900 md:p-0 md:dark:text-gray-900"
                            aria-current="page">Home</a>
                    </li>
                    <li>
                        <a href="#"
                            class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray md:dark:hover:bg-transparent dark:border-gray-700">Products</a>
                    </li>
                    <li>
                        <a href="#"
                            class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Collections</a>
                    </li>
                    <li>
                        <a href="#"
                            class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">New
                            & Featured</a>
                    </li>
                    <li>
                        <a href="#"
                            class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Sale</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup lang="js">
import DarkModeToggle from '../components/DarkModeToggle.vue'
import Topbar from './Topbar.vue'
import SearchBar from '../components/SearchBar.vue'
</script>
