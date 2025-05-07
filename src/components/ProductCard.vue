<template>
    <slot name="title" />
    <div
        :class="[
            'grid gap-2 py-6 sm:py-12 sm:gap-8 md:gap-8', isProductsPage ? 'grid-cols-2 sm:grid-cols-5 md:grid-cols-3 xl:grid-cols-5' : (!isProductsPage && hasExploreAllItemsTitle ? 'grid-cols-3 sm:grid-cols-5 pb-3 sm:pb-5' : 'grid-cols-5')]">
        <div v-for="(item, index) in discountedProducts" :key="index" class="flex flex-col items-center">
            <!-- Card container -->
            <div :class="[
                'dark:bg-[#282828] rounded-lg shadow hover:shadow-lg transition-shadow dark:border-0 flex flex-col w-full',
                isProductsPage || hasExploreAllItemsTitle ? 'p-3 bg-white' : 'bg-[#e6e6e6]',
                hasShopByCategoriesTitle ? 'h-[70px] sm:h-[170px] md:h-[125px] lg:h-[160px] xl:h-[200px]' : '',
            ]">
                <a href="#" class="overflow-hidden rounded-t-lg">
                    <img :src="item.image" :alt="item.name"
                        class="w-full aspect-square object-cover hover:scale-105 transition-transform duration-300" />
                </a>
                <div class="flex-1 flex flex-col justify-center p-1 sm:p-2 md:p-2 sm:space-y-4 md:space-y-4">
                    <div :class="[
                        'flex justify-center items-center',
                        isProductsPage || hasExploreAllItemsTitle ? 'flex-col' : 'uppercase',
                    ]">
                        <h5 :class="[
                            'font-medium text-gray-900 dark:text-white text-center',
                            isProductsPage ? 'capitalize font-semibold' : 'text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] tracking-wider',
                        ]">
                            {{ isProductsPage ? item.title : item.name }}
                        </h5>
                        <p :class="[
                            'text-sm text-gray-600 dark:text-gray-300 mt-2 text-center truncate overflow-hidden whitespace-nowrap',
                            isProductsPage || hasExploreAllItemsTitle ? 'w-full' : '',
                        ]">
                            {{ item.description }}
                        </p>
                    </div>
                    <div v-if="isVisible">
                        <div class="flex items-center justify-center mt-2 space-x-1">
                            <template v-for="i in 5" :key="i">
                                <svg v-if="i <= item.rating" class="w-4 h-4 text-yellow-400" fill="currentColor"
                                    viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg v-else class="w-4 h-4 text-gray-300 dark:text-gray-600" fill="currentColor"
                                    viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                            </template>
                            <span class="ml-2 text-sm font-semibold text-blue-600 dark:text-blue-300">
                                {{ item.rating.toFixed(1) }}
                            </span>
                        </div>
                        <div class="flex items-center justify-between mt-4">
                            <span class="text-xl font-bold text-gray-900 dark:text-white">
                                ₱{{ item.price }}
                            </span>
                            <button
                                class="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <p v-if="hasShopByCategoriesTitle"
                :class="hasShopByCategoriesTitle ? 'dark:text-[#c594a2] text-md text-gray-900 mt-3 text-center mt-3 text-[11px] sm:text-[12px] md:text-[14px] lg:text-[16px] tracking-tighter leading-tight text-gray-900' : ''">
                UP TO {{ item.discount }}% OFF
            </p>
        </div>
    </div>
</template>


<script setup lang="js">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const discountedProducts = computed(() =>
    props.products.map((product) => ({
        ...product,
        discount: Math.floor(Math.random() * 51) + 10,
        rating: Math.floor(Math.random() * 5) + 1
    }))
)

const props = defineProps({
    products: {
        type: Array,
        default: () => []
    },
    isVisible: {
        type: Boolean,
        default: false
    },
    hasExploreAllItemsTitle: {
        type: Boolean,
        default: false
    },
    hasShopByCategoriesTitle: {
        type: Boolean,
        default: false
    }

})

const isProductsPage = computed(() => {
    return route.name?.toString().toLowerCase() === 'products' || route.path === '/products'
})
</script>
