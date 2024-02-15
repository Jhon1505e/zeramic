<script setup lang="ts">
defineProps<{
  uuid: string;
  content: any;
  slug: string;
}>();
</script>

<template>
  <article
    class="bg-gray-200 shadow-lg rounded-lg hover:scale-105 duration-300"
    :key="uuid"
  >
    <NuxtLink :to="`/productos/${slug}`">
      <NuxtImg
        v-if="content.Imagen?.filename"
        class="rounded-t-lg" provider="storyblok"
        :src="content.Imagen?.filename"
        alt=""
      />
      <NuxtImg v-else class="bg-gray-300 rounded-t-lg" src="/img/logo_zeramic.webp" alt="" />

      <div class="text-center bg-white w-full py-3 rounded-b-lg">
        <h2 class="font-bold text-2xl text-gray-800">{{ content.Nombre }}</h2>
        <p class="text-gray-600 font-extralight text-sm px-1">
          {{ content.Descripcion }}
        </p>
        <p class="text-gray-800 font-bold text-lg">${{ content.Precio }}</p>

        <div class="flex justify-center gap-2 mt-2">
          <div
            :to="`/productos/${slug}`"
            class="flex hover:scale-105 duration-300 p-2 px-4 text-white rounded-lg bg-PRP"
          >
            Añadir
            <IconsBagPlus class="w-5 ml-2 fill-white" />
          </div>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
