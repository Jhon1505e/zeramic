<template>
    <div>
        <div class="w-1/2 mx-auto">

            <img v-for="image in blok.images" :key="image.id" :src="image.filename" alt="" >
    </div>
        <pre class="text-xs">{{ blok }}</pre>
        <div>nombre {{ blok.component }}</div>
    </div>
</template>

<script setup>
defineProps({ blok: Object })
</script>