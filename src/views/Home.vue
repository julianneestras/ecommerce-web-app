<template>
    <div>
        <Navbar :isNavbarOpen="isNavbarOpen" @toggle-navbar="isNavbarOpen = !isNavbarOpen" />
        <main class="primary-bg max-w-screen-xl mx-auto">
            <router-view />
        </main>
        <Footer />
        <Bottombar class="block md:hidden" @toggle-navbar="isNavbarOpen = !isNavbarOpen" />
    </div>
</template>

<script setup lang="js">
import Navbar from '../layout/Navbar.vue'
import Bottombar from '../layout/Bottombar.vue'
import Footer from '../layout/Footer.vue';

import { ref } from 'vue';

const isNavbarOpen = ref(false)
</script>