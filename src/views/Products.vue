<template>
    <ProductCard :products="productStore.products">
        <template v-slot:title>
            <h1>Explore All Items</h1>
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