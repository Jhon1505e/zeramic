<template>
  <div v-editable="blok" class="p-4 max-w-6xl m-auto"> 
    <h1 class="text-3xl font-bold p-2">{{ Nombre }}</h1>
    <div class="w-full flex">
      <NuxtImg v-if="Imagen?.filename" class="w-1/2 bg-gray-300" :src="Imagen?.filename" alt="" />
      <NuxtImg v-else class="w-1/2 bg-gray-300" src="/img/logo_zeramic.webp" alt="" />
      <p class="w-1/2 p-4">{{ Descripcion }}</p>
    </div>
    <hr class="my-3">
    {{ Imagen }}
    <NuxtLink to="/productos/" class="text-PRP font-bold">Productos</NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({ blok: Object })
const { Imagen, Nombre, Descripcion } = toRefs(props.blok)
</script>
