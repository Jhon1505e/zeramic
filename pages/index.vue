<script setup lang="ts">
const story = await useAsyncStoryblok("home", { version: "draft" });

const { products, fetchProducts } = useProducts();

await fetchProducts();

const content = computed(() => {
  if (!story.value) return;
  const items = story.value.content.body;
  return items.find((item) => item.component === "purplerow");
});
</script>

<template>
  <div class="">
    <div class="max-w-7xl mx-auto"></div>
    <div class="flex justify-center pt-5 md:pt-10 mx-auto">
      <NuxtImg
        format="webp"
        src="/img/logo_zeramic.webp"
        class="w-1/2 md:w-80"
        alt=""
      />
    </div>
    <div class="flex justify-center pt-5 md:pt-0 mx-auto">
      <NuxtImg
        format="webp"
        src="/img/products_index.webp"
        class="w-full md:w-[1000px] z-10 absolute"
        alt=""
      />

      <img src="/img/ImgRounded3.svg" class="invert" alt="" />
    </div>

    <!--<div class="relative bg-fixed bg-cover bg-center h-[600px]" style="background-image: url('/img/background.webp')">
      <div class="absolute inset-0 bg-black/20"></div>
      <ImgRounded class="rotate-180 fill-PRP" />
      <div class="w-full flex justify-center text-center items-center absolute inset-0 pt-10 md:pt-0">
        <div class="max-w-7xl mx-auto ">

          <div>
            <NuxtImg format="webp" src="/img/text_index.webp" class="w-2/3  mx-auto" alt="" />
            <h4 class="text-white text-md mt-8 py-3 px-5 font-bold">
              NOS INSPIRA A CREAR BELLAS PIEZAS QUE GUARDAN SU ESENCIA, SUS
              FORMAS, SUS COLORES...
            </h4>
          </div>
        </div>
      </div>
    </div>

    <StoryblokComponent
      class="bg-PRP text-white text-center px-20"
      v-if="story"
      :blok="content"
    />  -->

    <div class="bg-white h-full pt-40 pb-20 p-6">
      <div class="max-w-7xl mx-auto">

        <h2 class="text-2xl md:text-5xl font-extrabold py-6 text-center text-PRP">Conoce cada uno <br> de nuestros productos</h2>
      
      <div
        class="w-5/6 grid grid-cols md:grid-cols-3 grid-flow-row gap-6 pb-10 md:pt-8 md:w-4/5 mx-auto justify-center"
      >
        <transition-group
          mode="out-in"
          leave-to-class="scale-95 opacity-0 transition-all"
          leave-active-class="transition-all duration-300"
        >
          <ProductoCard
            v-for="{ content, uuid, slug } in products"
            :key="uuid"
            :uuid="uuid"
            :content="content"
            :slug="slug"
          />
        </transition-group>
      </div>
    </div>
    </div>

    <div class="bg-PRP pt-10">
      <div class="max-w-7xl mx-auto">
        <div
          class="w-full md:w-1/2 pt-10 pb-16 sm:pb-32 px-6 mx-auto text-center max-w-6xl"
        >
          <h2 class="text-2xl md:text-5xl font-extrabold pb-4 text-white">
            Diseñamos y fabricamos
          </h2>
          <p class="text-white antialiased font-light md:text-2xl mt-4">
            Objetos exclusivos en cerámica de alta temperatura para todo tipo de
            usos en el hogar y el comercio. Zeramic es la combinación de
            técnicas tradicionales de fabricación de cerámica con nuevas
            tecnologías como el modelado y la impresión 3d, además de un
            profundo amor por Guatapé y su cultura del zócalo, que adorna sus
            casas y calles de colores e historias.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
