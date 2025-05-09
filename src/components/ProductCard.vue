<template>
    <slot name="title" />
    <div :class="[
        'grid gap-2 py-6 sm:py-12 sm:gap-2 md:gap-4 lg:gap-4 xl:gap-6', isProductsPage ? 'px-2 xl:px-0 grid-cols-2 sm:grid-cols-5 md:grid-cols-3 xl:grid-cols-5' : (!isProductsPage && hasExploreAllItemsTitle ? 'grid-cols-3 sm:grid-cols-5 pb-3 sm:pb-5' : 'grid-cols-5')
    ]">
        <div v-for="(item, index) in discountedProducts" :key="index" class="flex flex-col items-center">
            <!-- Card container -->
            <div @click="handleItemClick(item)" :class="[
                'dark:bg-[#282828] rounded-lg shadow-sm hover:shadow-lg transition-shadow dark:border-0 flex flex-col w-full cursor-pointer',
                isProductsPage || hasExploreAllItemsTitle ? 'p-3 bg-white' : 'bg-[#e6e6e6]',
                hasShopByCategoriesTitle ? 'h-[70px] sm:h-[130px] md:h-[150px] lg:h-[170px] xl:h-[200px]' : '',
            ]">
                <div class="overflow-hidden rounded-t-lg">
                    <img :src="item.images ? (Array.isArray(item.images) ? item.images[0] : item.images) : item.image"
                        :alt="hasShopByCategoriesTitle ? item.name : item.title"
                        class="w-full aspect-square object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div class="flex-1 flex flex-col justify-center p-1 sm:p-2 md:p-2 sm:space-y-4 md:space-y-4">
                    <div :class="[
                        'flex',
                        isProductsPage || hasExploreAllItemsTitle ? 'flex-col items-left m-0' : 'm-0 uppercase justify-center items-center',
                    ]">
                        <h5 :class="[
                            'font-medium text-gray-900 dark:text-white truncate overflow-hidden whitespace-nowrap',
                            isProductsPage || hasExploreAllItemsTitle ? 'capitalize font-semibold ' : 'text-[11px] sm:text-[12px] md:text-[14px] lg:text-sm tracking-wider',
                            !isProductsPage || hasExploreAllItemsTitle ? 'text-sm sm:text-[12px] md:text-[12px] lg:text-sm leading-tight' : '',
                        ]">
                            {{ isProductsPage ? item.title : hasShopByCategoriesTitle ? item.name : item.title }}
                        </h5>
                        <div class="flex flex-col">
                            <p v-if="isProductsPage"
                                class="text-sm mt-0.5 text-gray-600 truncate overflow-hidden whitespace-nowrap dark:text-gray-400">
                                {{ item.description ? item.description.substring(0, 60) + '...' : '' }}
                            </p>
                            <div class="flex">
                                <!-- Category tag is now a button that prevents click propagation -->
                                <button
                                    v-if="(isProductsPage || (!isProductsPage && hasExploreAllItemsTitle)) && item.category"
                                    @click.stop="navigateToCategory(item.category.slug, item.category.id)"
                                    class="-ml-1 text-gray-500 text-xs sm:text-sm mt-2 inline-block w-auto border border-gray-200 rounded-full px-3 py-0.5 bg-gray-100 hover:bg-gray-200 cursor-pointer dark:bg-[#3a3a3a] dark:text-[#d2abb6] dark:border-[#575757] dark:hover:bg-[#444444] transition-colors">
                                    {{ item.category ? item.category.name : '' }}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="flex items-left space-x-1 mt-4" v-if="isVisible">
                            <template v-for="i in 5" :key="i">
                                <svg v-if="i <= item.rating" class="w-4 h-4 text-yellow-400 dark:text-[#c594a2]"
                                    fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg v-else class="w-4 h-4 text-gray-300 dark:text-[#575757]" fill="currentColor"
                                    viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                            </template>
                            <span class="ml-1 text-sm font-semibold text-gray-700 dark:text-[#c594a2]">
                                {{ item.rating.toFixed(1) }}
                            </span>
                        </div>
                        <div class="flex items-center justify-between mt-3"
                            v-if="isVisible || (!isProductsPage && hasExploreAllItemsTitle)">
                            <span class="text-md font-semibold text-gray-700 dark:text-white mt-1.5">
                                Php {{ item.price }}.00
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <p v-if="hasShopByCategoriesTitle"
                :class="hasShopByCategoriesTitle ? 'dark:text-[#c594a2] text-md text-gray-900 mt-3 text-center text-[11px] sm:text-[12px] md:text-[14px] lg:text-[16px] tracking-tighter leading-tight text-gray-900' : ''">
                UP TO {{ item.discount }}% OFF
            </p>
        </div>
    </div>
</template>

<script setup lang="js">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const discountedProducts = computed(() =>
    props.products.map((product) => ({
        ...product,
        discount: Math.floor(Math.random() * 51) + 10,
        rating: product.rating || Math.floor(Math.random() * 5) + 1
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

const isProductsPage = computed(() => route.path.includes('/products'))

// const navigateToProduct = (slug) => {
//     if (slug) {
//         router.push(`/product/${slug}`)
//     }
// }

// Updated to accept category ID as well
const navigateToCategory = (categorySlug, categoryId) => {
    if (categorySlug) {
        router.push({
            path: '/products',
            query: {
                category: categorySlug,
                category_id: categoryId // Store category ID in URL params
            }
        })
    }
}

const handleItemClick = (item) => {
    const slug = item.slug;
    const categorySlug = item.category?.slug;
    const categoryId = item.category?.id;

    if (isProductsPage.value || props.hasExploreAllItemsTitle) {
        if (slug) {
            router.push(`/product/${slug}`);
        }
    } else if (categorySlug && categoryId) {
        router.push({
            path: '/products',
            query: {
                category: categorySlug,
                category_id: categoryId
            }
        });
    }
};
</script>