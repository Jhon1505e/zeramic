<script setup>
const story = await useAsyncStoryblok("home", { version: "draft" });

const content = computed(() => {
  if (!story.value) return;
  const items = story.value.content.body;
  return items.find((item) => item.component === "purplerow");
});
</script>

<template>
  <div class="bg-PRP h-screen">
    <div class="flex justify-center w-full md:w-1/2 h-1/2 pt-6 mx-auto">
      <NuxtImg format="webp" src="/img/logo_zeramic.webp" alt="" />
    </div>

    <NuxtImg
      format="webp"
      src="/img/products_index.webp"
      class="mx-auto w-full md:w-3/4 z-10"
      alt=""
    />

    
      <ImgRounded2 class="w-full fill-white absolute bottom-0" />
    
    <div
      class="relative bg-fixed bg-cover bg-center h-screen"
      style="background-image: url('/img/background.png')"
    >
      <div class="absolute inset-0 backdrop-brightness-50"></div>
      <ImgRounded class="rotate-180 fill-PRP" />
      <div
        class="w-full flex justify-center text-center items-center absolute inset-0"
      >
        <div>
          <NuxtImg
            format="webp"
            src="/img/text_index.webp"
            class="w-2/3 mx-auto"
            alt=""
          />
          <h4 class="text-white text-md mt-8 py-3 px-5 font-bold">
            NOS INSPIRA A CREAR BELLAS PIEZAS QUE GUARDAN SU ESENCIA, SUS
            FORMAS, SUS COLORES...
          </h4>
        </div>
      </div>
      <FooterImg class="absolute bottom-0 fill-PRP" />
    </div>

    <!-- <StoryblokComponent
      class="bg-PRP text-white text-center px-20"
      v-if="story"
      :blok="content"
    />  -->

    <div class="bg-PRP">
      <div class="w-full md:w-5/6 pt-10 pb-16 px-6 mx-auto text-center">
        <h2 class="text-xl md:text-3xl font-semibold pb-4 text-white">
          DISEÑAMOS Y FABRICAMOS
        </h2>
        <p class="text-white antialiased font-light md:font-normal">
          Objetos exclusivos en cerámica de alta temperatura para todo tipo de
          usos en el hogar y el comercio. Zeramic es la combinación de técnicas
          tradicionales de fabricación de cerámica con nuevas tecnologías como
          el modelado y la impresión 3d, además de un profundo amor por Guatapé
          y su cultura del zócalo, que adorna sus casas y calles de colores e
          historias.
        </p>
      </div>
      <div class="w-full">
        <NuxtImg
          format="webp"
          src="/img/wave.png"
          class="w-full h-16 rotate-180"
          alt=""
        />
      </div>
    </div>
    <div class="w-full md:w-1/2 mx-auto px-6 md:px-0 py-10">
      <NuxtImg format="webp" src="/img/logos_index.png" class="w-full" alt="" />
    </div>

    <FooterImg class="fill-slate-900 ro" />
    <Footer />
  </div>
</template>
