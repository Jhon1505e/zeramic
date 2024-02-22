<template>
  <div v-editable="blok">
    <div class="max-w-5xl py-10 mx-auto">
      <div class="w-full md:flex px-5 md:px-0">
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
          <button
            class="text-white bg-PRP font-normal mt-4 px-6 py-2 duration-100 ease-in rounded-md"
          >
            Comprar Producto
          </button>
        </div>
      </div>
    </div>

    <div v-editable="blok" class="px-4">
      <StoryblokComponent v-for="blok in blok.Body" :key="blok._uid" :blok="blok" />
    </div>

    <div class="bg-PRP">
      <div class="w-full">
        <img src="/img/wave.png" class="w-full h-16" alt="" />
      </div>

      <div class="w-full md:w-2/3 md:flex mx-auto">
        <div class="w-full md:w-1/2 flex justify-center pt-24">
          <div>
            <h3
              class="text-3xl text-white font-bold border-b-2 pb-2 border-white"
            >
              Especificaciones
            </h3>
            <p class="mt-6 text-xl text-white font-bold">
              Medidas: <span class="font-thin"> {{ Medidas }}</span>
            </p>
            <p class="text-white text-xl font-bold">
              Material:
              <span class="font-thin"> Cerámica de alta temperatura</span>
            </p>
            <p class="text-white text-xl font-bold">
              Pintura: <span class="font-thin"> Picmento Cerámico</span>
            </p>
            <p class="text-white text-xl font-bold">
              Uso: <span class="font-thin"> {{ Uso }}</span>
            </p>
          </div>
        </div>
        <div class="w-full md:w-1/2 p-16">
          <NuxtImg
            v-if="ImgMedidas?.filename"
            class="w-full rounded-lg"
            :src="ImgMedidas?.filename"
            alt=""
          />
          <NuxtImg v-else class="w-full" src="/img/logo_zeramic.webp" alt="" />
        </div>
      </div>
      <div class="pl-20 pb-10">
        <NuxtLink to="/productos/" class="text-white font-thin text-xl border border-white px-6 py-2 rounded-lg  hover:bg-white/20 hover:scale-105 duration-100 ease-in"> Ver otros productos</NuxtLink>
      </div>
    </div>
    

  </div>
</template>

<script setup>


const props = defineProps({ blok: Object });
const { Imagen, Nombre, Descripcion, ImgMedidas, Medidas, Uso, Body } = toRefs(
  props.blok
);
</script>
