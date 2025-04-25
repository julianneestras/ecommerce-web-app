<script setup lang="js">
import { computed } from 'vue'

const props = defineProps({
    name: String,
    className: String
})

const iconName = computed(() => `#icon-${props.name || ''}`)
const svgClass = computed(() => props.className ? `svg-icon ${props.className}` : 'svg-icon')

const isExternalIcon = computed(() => props.name?.startsWith('http') || props.name?.startsWith('https'))

const styleExternalIcon = computed(() => ({
    mask: `url(${props.name}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${props.name}) no-repeat 50% 50%`,
    backgroundColor: 'currentColor',
    display: 'inline-block'
}))
</script>

<template>
    <div v-if="isExternalIcon" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-bind="$attrs" />
    <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
        <use :xlink:href="iconName" />
    </svg>
</template>

<style scoped>
.svg-icon {
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

.svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
}
</style>
