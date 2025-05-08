<template>
    <ProductCard :products="productStore.products" :isVisible="true">
        <template v-slot:title>
            <h1 class="text-2xl font-extrabold text-lg md:text-xl lg:text-2xl xl:text-2xl lg:mt-12">
                Explore All Items
            </h1>
        </template>
    </ProductCard>
</template>

<script setup lang="js">
import { onMounted } from 'vue';
import { useProductStore } from '../store/product.js';
import ProductCard from '../components/ProductCard.vue';

const productStore = useProductStore();

onMounted(() => {
    productStore.fetchAllProducts()
})
</script>