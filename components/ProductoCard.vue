<script setup lang="ts">
defineProps<{
  uuid: string;
  content: any;
  slug: string;
}>();
</script>

<template>
  <article
    class="shadow-lg rounded-lg hover:scale-105  duration-300"
    :key="uuid"
  >

   <NuxtLink :to="`/productos/${slug}`" >
      <NuxtImg
      v-if="content.Imagen?.filename"
      class="rounded-t-lg"
      provider="storyblok"
      :src="content.Imagen?.filename"
      alt=""
      />
      <NuxtImg
      v-else
      class="bg-gray-300 rounded-t-lg"
      src="/img/logo_zeramic.webp"
      alt=""
      />
      
   
      <div
        class="flex justify-center items-center text-center bg-white w-full py-3 px-6 rounded-b-lg h-38"
      >
        <div>
          <h2 class="font-extralight text-xl text-gray-800 pt-2">
            {{ content.Nombre }}
          </h2>

          <hr class="my-1" />
          <div class="flex justify-center gap-2 mt-2">
            <div
              :to="`/productos/${slug}`"
              class="flex hover:scale-105 duration-300 p-2 px-4 text-white rounded-lg bg-PRP"
            >
              <IconsBagPlus class="w-5 fill-white" />
            </div>
            <p
              class="text-PRP rounded-lg pt-0.5 px-2 font-normal text-lg border border-PRP"
            >
              ${{ content.Precio }}
            </p>
          </div>
        </div> 
      </div>
     </NuxtLink>

  </article>
</template>
