<template>
    <div class="relative w-full max-w-md">
        <!-- Search input -->
        <input type="text" placeholder="Search..."
            class="w-full py-2 pl-4 pr-12 text-gray-700 text-sm rounded-full border-0 bg-gray-200 text-gray-900 placeholder-gray-400" />

        <!-- Search button -->
        <button type="submit"
            class="absolute right-0 top-1 bottom-1 my-auto h-9 w-11 flex items-center justify-center rounded-full bg-gray-800 cursor-pointer">
            <svg-icon :name="'search'" class="text-white h-4.5" />
        </button>
    </div>
</template>