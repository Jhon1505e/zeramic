<script setup lang="ts">
defineProps<{
  uuid: string
  content: any
  slug: string
}>()
</script>

<template>
    <article class=" bg-gray-200 shadow-lg  rounded-lg hover:scale-105 duration-300 " :key="uuid">
        <NuxtLink :to="`/productos/${slug}`">
            <div class="">

                <img class="" :src="  content.Imagen?.filename ? content.Imagen.filename : 'img/logo_zeramic.webp'" alt="">
            </div>
            
            <div class=" text-center bg-white w-full py-3 h-32" >

                <!-- <h2 class="font-bold text-2xl text-gray-800">{{ content.Nombre }}</h2> -->
                <p class="text-gray-600 font-extralight text-lg">{{ content.Descripcion }}</p>
                <p class="text-gray-800 font-bold text-lg">{{ content.Precio }}</p>
                
                <div class="flex justify-center gap-2 mt-2">
                    <NuxtLink :to="`/productos/${slug}`" class="flex hover:scale-105 duration-300 p-2 px-4 text-white rounded-lg bg-PRP">Añadir
                        <IconsBagPlus class="w-5 ml-2 fill-white " />
                    </NuxtLink>

                </div>
            </div>
        </NuxtLink>
    </article>
</template>