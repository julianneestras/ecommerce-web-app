<template>
    <div class="container mx-auto px-4 py-8">
        <div v-if="cartStore.loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white">
            </div>
        </div>

        <div v-else-if="!cartStore.isEmpty">
            <!-- Cart Header -->
            <div class="mb-6 flex justify-between items-center">
                <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">My Bag ({{ cartStore.cartCount }})
                </h1>
                <button @click="toggleEditMode" class="text-gray-500 hover:text-blue-800 font-medium">
                    {{ isEditMode ? 'Done' : 'Edit' }}
                </button>
            </div>

            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Left Side - Cart Items -->
                <div class="w-full lg:w-2/3">
                    <!-- Store Name Section -->
                    <!-- <div class="flex items-center mb-4">
                        <div class="text-gray-800 font-medium">
                            Total (1/1) item
                        </div>
                    </div> -->
                    <!-- Edit Mode -->
                    <div v-if="isEditMode"
                        class="bg-white rounded-lg border border-gray-200 p-4 mb-4 flex justify-between items-center dark:bg-transparent dark:border-[#575757]">
                        <div class="flex items-center">
                            <input v-model="selectAll" id="select-all" @change="toggleSelectAll" type="checkbox"
                                class="w-4 h-4 rounded border-gray-300 bg-gray-100 rounded focus:ring-[#282828] dark:focus:ring-[#cca0ac] dark:ring-offset-gray-800 dark:bg-[#3f3f3f] dark:text-[#c594a2] dark:border-[#575757]">
                            <label for="select-all" class="ml-2 text-gray-700 font-medium dark:text-gray-300">
                                Select All Items
                            </label>
                        </div>
                        <button @click="openDeleteSelectedModal"
                            class="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
                            :disabled="!hasSelectedItems"
                            :class="{ 'opacity-50 cursor-not-allowed': !hasSelectedItems }">
                            Delete Selected
                        </button>
                    </div>
                    <!-- Product Card -->
                    <div v-for="(item, index) in cartStore.cartItems" :key="index"
                        class="bg-white rounded-lg border border-gray-200 dark:border-[#575757] mb-6 overflow-hidden dark:bg-transparent dark:border-[#575757]">
                        <div class="p-4">
                            <div class="flex items-start">
                                <!-- Checkbox -->
                                <div v-if="isEditMode" class="flex items-center h-5 mt-1 mr-4">
                                    <input :id="'product-' + item.product.id" v-model="selectedItems[item.product.id]"
                                        type="checkbox"
                                        class="w-4 h-4 rounded border-gray-300 bg-gray-100 rounded focus:ring-[#282828] dark:focus:ring-[#cca0ac] dark:ring-offset-gray-800 dark:bg-[#3f3f3f] dark:text-[#c594a2] dark:border-[#575757]">
                                </div>
                                <!-- Product Image -->
                                <div class="flex-shrink-0 mr-4">
                                    <img :src="item.product.images ? item.product.images[0] : ''"
                                        :alt="item.product.title" class="w-32 h-32 object-cover rounded">
                                </div>

                                <!-- Product Details -->
                                <div class="flex-1">
                                    <div class="flex justify-between items-start mb-2">
                                        <div class="max-w-full">
                                            <h3 class="font-medium text-gray-700 text-md dark:text-gray-200">{{
                                                item.product.title }}</h3>
                                            <p class="text-gray-600 text-sm dark:text-[#cca0ac]">{{
                                                item.product.category.name
                                            }}
                                            </p>

                                            <div @click="item.showFullDescription = !item.showFullDescription"
                                                class="cursor-pointer select-none max-w-full">
                                                <p :class="[
                                                    'text-gray-500 text-sm mt-1 transition-all duration-300 dark:text-gray-300',
                                                    item.showFullDescription ? 'whitespace-normal break-words' : 'line-clamp-2'
                                                ]">
                                                    {{ item.product.description }}
                                                </p>

                                                <svg class="w-4 h-4 text-gray-500 mt-1 transition-transform duration-300"
                                                    :class="{ 'rotate-180': item.showFullDescription }" fill="none"
                                                    stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>

                                        <!-- Remove Button -->
                                        <button @click="openDeleteModal(item.product.id)" type="button"
                                            class="text-gray-500 hover:text-gray-700 dark:hover:text-[#8b8b8b] cursor-pointer">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </button>
                                    </div>

                                    <!-- Quantity and Price -->
                                    <div class="flex justify-between items-end mt-4">
                                        <div class="relative">
                                            <div class="flex items-center rounded-lg overflow-hidden w-fit">
                                                <div class="relative flex items-center max-w-[8rem]">
                                                    <button @click="decreaseQuantity(item.product.id, item.quantity)"
                                                        type="button"
                                                        class="bg-gray-100 dark:bg-[#282828] dark:hover:bg-[#767676] dark:border-[#3f3f3f] dark:focus:ring-[#575757] focus:ring-1 focus:outline-none focus:ring-gray-400 dakrk:focus:border-[#575757] hover:bg-gray-200 border border-gray-300  rounded-s-lg p-3 h-11 cursor-pointer">
                                                        <svg class="w-3 h-3 text-gray-900 dark:text-white"
                                                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                            fill="none" viewBox="0 0 18 2">
                                                            <path stroke="currentColor" stroke-linecap="round"
                                                                stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                                        </svg>
                                                    </button>
                                                    <input type="text" id="quantity-input"
                                                        class="bg-gray-100 dark:bg-[#282828] border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-gray-500 dark:focus:ring-[#575757] focus:border-gray-500 block w-full py-2.5 dark:bg-[#282828] dark:border-[#3f3f3f] dark:placeholder-gray-400 dark:text-white dark:focus:border-[#575757] focus:outline-none"
                                                        :value="item.quantity" disabled />
                                                    <button @click="increaseQuantity(item.product.id, item.quantity)"
                                                        type="button"
                                                        class="bg-gray-100 dark:bg-[#282828] dark:hover:bg-[#767676] dark:border-[#3f3f3f] hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-400 dark:focus:ring-[#575757] focus:ring-1 focus:outline-none cursor-pointer">
                                                        <svg class="w-3 h-3 text-gray-900 dark:text-white"
                                                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                            fill="none" viewBox="0 0 18 18">
                                                            <path stroke="currentColor" stroke-linecap="round"
                                                                stroke-linejoin="round" stroke-width="2"
                                                                d="M9 1v16M1 9h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="font-medium text-gray-800 dark:text-white">
                                            Php {{ parseInt(item.product.price) * item.quantity }}.00
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Return & Sale Info -->
                            <div
                                class="flex items-center space-x-4 mt-4 text-sm text-gray-600 dark:text-[#717171] pl-12">
                                <div class="flex items-center">
                                    <svg class="w-4 h-4 mr-1 dark:stroke-[#717171]" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                        </path>
                                    </svg>
                                    30 Days Free Return
                                </div>
                                <div class="flex items-center">
                                    <svg class="w-4 h-4 mr-1 dark:stroke-[#717171]" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                        </path>
                                    </svg>
                                    Non - Sale
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Side - Order Summary -->
                <div class="w-full lg:w-1/3">
                    <div class="bg-white border dark:bg-[#282828] dark:border-none border-gray-200 rounded-lg p-6">
                        <h2 class="text-lg font-semibold text-gray-800 mb-4 dark:text-gray-100">
                            Order Summary
                        </h2>

                        <!-- Summary Items -->
                        <div class="flex justify-between mb-2">
                            <span class="text-gray-600 dark:text-gray-100">Sub-total ({{ cartStore.cartCount }}
                                items)</span>
                            <span class="font-medium">Php {{ cartStore.cartTotal }}.00</span>
                        </div>

                        <div class="flex justify-between mb-4">
                            <span class="text-gray-600 dark:text-gray-100">Shipping</span>
                            <span class="font-medium">-</span>
                        </div>

                        <div class="border-t border-gray-200 pt-4 mb-6">
                            <div class="flex justify-between">
                                <span class="font-medium text-gray-800 dark:text-gray-100">Total</span>
                                <span class="font-semibold text-gray-800 dark:text-gray-100">Php {{ cartStore.cartTotal
                                }}.00</span>
                            </div>
                            <span class="text-gray-500 text-sm dark:text-[#717171]">(Including GST)</span>
                        </div>

                        <!-- Checkout Button -->
                        <router-link to="/checkout"
                            class="flex items-center justify-center w-full bg-[#121212] hover:bg-[#282828] text-white font-medium py-3 px-4 rounded dark:bg-[#c594a2] dark:hover:bg-[#b07c8a] dark:text-[#121212]">
                            Checkout
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty Cart Message (hidden when cart has items) -->
        <div v-else
            class="bg-white rounded-lg border border-gray-200 p-8 text-center dark:bg-transparent dark:border-[#575757]">
            <h2 class="text-xl font-medium text-gray-800 mb-2 dark:text-gray-100">There are no items in your bag</h2>
            <p class="text-gray-600 mb-4 dark:text-[#717171]">Browse our products and discover our best deals!</p>
            <router-link to="/products"
                class="bg-[#121212] hover:bg-[#282828] dark:bg-[#c594a2] dark:hover:bg-[#b07c8a] dark:text-[#121212] text-white font-medium py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Start Shopping
            </router-link>
        </div>
    </div>

    <!-- Delete Single Items Modal Icon -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
        aria-modal="true">
        <div class="flex items-center justify-center min-h-full p-4">
            <div class="fixed inset-0 bg-black/75 transition-opacity" @click="showDeleteModal = false">
            </div>

            <div
                class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all max-w-md w-full p-6">
                <div class="text-center">
                    <svg class="mx-auto mb-4 text-gray-400 dark:text-gray-200 w-12 h-12" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to remove this product from your cart?
                    </h3>
                    <div class="flex justify-center space-x-4">
                        <button @click="confirmDelete" type="button"
                            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5">
                            Yes, remove it
                        </button>
                        <button @click="showDeleteModal = false" type="button"
                            class="py-2.5 px-5 text-sm font-medium text-gray-900 dark:text-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Delete Selected Modal Button -->
    <div v-if="showDeleteSelectedModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title"
        role="dialog" aria-modal="true">
        <div class="flex items-center justify-center min-h-full p-4">
            <div class="fixed inset-0 bg-black/75 transition-opacity" @click="showDeleteSelectedModal = false">
            </div>

            <div
                class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all max-w-md w-full p-6">
                <div class="text-center">
                    <svg class="mx-auto mb-4 text-gray-400 dark:text-gray-200 w-12 h-12" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to remove all selected items from your cart?
                    </h3>
                    <div class="flex justify-center space-x-4">
                        <button @click="confirmDeleteSelected" type="button"
                            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5">
                            Yes, remove all
                        </button>
                        <button @click="showDeleteSelectedModal = false" type="button"
                            class="py-2.5 px-5 text-sm font-medium text-gray-900 dark:text-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { onMounted, ref, reactive, computed } from 'vue';
import { useCartStore } from '../store/cart.js';

const cartStore = useCartStore()

const showDeleteModal = ref(false)
const showDeleteSelectedModal = ref(false)
const productToDelete = ref(null)

const isEditMode = ref(false)
const selectedItems = reactive({})
const selectAll = ref(false)

const hasSelectedItems = computed(() => {
    return Object.values(selectedItems).some(value => value === true)
})

const increaseQuantity = (productId, currentQty) => {
    cartStore.updateQty(productId, currentQty + 1)
}

const decreaseQuantity = (productId, currentQty) => {
    if (currentQty > 1) {
        cartStore.updateQty(productId, currentQty - 1)
    }
}

const openDeleteModal = (productId) => {
    productToDelete.value = productId
    showDeleteModal.value = true
}

const confirmDelete = () => {
    cartStore.removeFromCart(productToDelete.value)
    showDeleteModal.value = false
    productToDelete.value = null
}

const toggleEditMode = () => {
    isEditMode.value = !isEditMode.value
    if (!isEditMode.value) {
        Object.keys(selectedItems).forEach(key => {
            selectedItems[key] = false
        })
        selectAll.value = false
    } else {
        cartStore.cartItems.forEach(item => {
            selectedItems[item.product.id] = false
        })
    }
}

const toggleSelectAll = () => {
    cartStore.cartItems.forEach(item => {
        selectedItems[item.product.id] = selectAll.value
    })
}

const openDeleteSelectedModal = () => {
    if (hasSelectedItems.value) {
        showDeleteSelectedModal.value = true
    }
}

const confirmDeleteSelected = () => {
    // Get all selected product IDs
    const selectedIds = Object.keys(selectedItems)
        .filter(key => selectedItems[key] === true)
        .map(id => Number(id));

    const allItemsSelected = cartStore.cartItems.length > 0 && selectedIds.length === cartStore.cartItems.length

    if (allItemsSelected) {
        cartStore.clearCart()
    } else {
        // Remove each selected item
        selectedIds.forEach(id => {
            cartStore.removeFromCart(id)
        })
    }

    showDeleteSelectedModal.value = false
    selectAll.value = false

    // Reset selected items
    Object.keys(selectedItems).forEach(key => {
        selectedItems[key] = false
    })

    // Exit edit mode if cart is now empty
    if (cartStore.isEmpty) {
        isEditMode.value = false
    }
}


onMounted(() => {
    cartStore.setLoading(true)
    setTimeout(() => {
        cartStore.setLoading(false)
    }, 1000)
})
</script>