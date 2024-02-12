<script setup lang="ts">
defineProps<{
  uuid: string
  content: any
  slug: string
}>()
</script>

<template>
    <article class="rounded-lg shadow-md p-2" :key="uuid">
        <NuxtLink :to="`/productos/${slug}`">
            <h2>{{ content.Nombre }}</h2>
            <img :src="content.Imagen?.filename" alt="">
        </NuxtLink>
    </article>
</template>