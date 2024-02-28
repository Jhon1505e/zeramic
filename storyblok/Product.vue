<template>
  <div v-editable="blok">
  <div v-if="modal" class="bg-black/50  h-screen w-full fixed inset-0 flex justify-center items-center">
<div class="w-1/2 h-1/2 bg-white rounded-lg">
<button @click="modal = false">s</button>
</div>
  </div>  
    <div class="max-w-6xl  py-10 mx-auto">
      <div class="w-full  md:flex px-5 md:px-0">
        <div class="w-full md:w-1/2 mt-5">
          <NuxtImg
            v-if="Imagen?.filename"
            class="w-full bg-gray-300 rounded-lg"
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
        <div class="w-full md:w-1/2 text-center px-10 pt-6">
          <h1 class="text-3xl text-PRP font-bold">{{ Nombre }}</h1>
          <p class="p-4 font-light">{{ Descripcion }}</p>
          <button @click="modal = true"
            class="text-white bg-PRP font-normal mt-4 px-6 py-2 duration-100 ease-in rounded-md"
          >
            Comprar Producto
          </button>
        </div>
      </div>
      
      
    </div>
    <FooterImg class="fill-PRP" />
    <div class="bg-PRP ">
      
      <div v-editable="blok" class="px-10 ">
        <StoryblokComponent v-for="blok in blok.Body" :key="blok._uid" :blok="blok" />
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
