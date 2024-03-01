<template>
  <div v-editable="blok" class="bg-gray-200">
    <div
      v-if="modal"
      class="bg-black/50 h-screen w-full fixed inset-0 flex justify-center items-center"
    >
      <div class="w-1/2 h-1/2 bg-white rounded-lg">
        <button @click="modal = false">s</button>
      </div>
    </div>
    <div class="mx-auto">
      <div class="w-full">
        <NuxtImg
          v-if="Imagen?.filename"
          class="h-full w-full mx-auto bg-gray-300 rounded-lg"
          :src="Imagen?.filename"
          alt=""
        />
        <NuxtImg
          v-else
          class="w-full bg-gray-300"
          src="/img/logo_zeramic.webp"
          alt=""
        />
      </div>
    </div>
    <div class="w-full md:w-2/3 text-center mx-auto pb-20 px-10 pt-8 md:pt-16">
      <p class="p-4 font-light mt-2 text-gray-500 text-xl md:text-2xl">
        {{ Descripcion }}
      </p>
      <button
        @click="modal = true"
        class="text-white bg-PRP font-thin mt-4 px-6 py-2 text-xl md:text-2xl hover:scale-105 duration-100 ease-in rounded-md"
      >
        Comprar Producto
      </button>
    </div>
    <FooterImg class="fill-PRP" />
    <div class="bg-PRP">
      <div v-editable="blok" class="px-10">
        <StoryblokComponent
          v-for="blok in blok.Body"
          :key="blok._uid"
          :blok="blok"
        />
      </div>
      <FooterImg class="fill-slate-900" />
    </div>
  </div>
</template>

<script setup>
const modal = ref(false);
const props = defineProps({ blok: Object });
const { Imagen, Nombre, Descripcion, ImgMedidas, Medidas, Uso, Body } = toRefs(
  props.blok
);
</script>
