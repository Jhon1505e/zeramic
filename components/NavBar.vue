<template>
  <div class="bg-PRP  shadow-md shadow-PRP">
    <div class="w-full md:w-1/2 mx-auto flex justify-center py-4">
      <ul class="hidden md:flex gap-5">
        <li>
          <NuxtLink
            class="text-white text-2xl pb-1 border-b border-PRP hover:border-white duration-100 ease-in font-thin opacity-80 hover:opacity-100"
            to="/">Inicio</NuxtLink>
        </li>
        <li>
          <NuxtLink
            class="text-white text-2xl pb-1 border-b border-PRP hover:border-white duration-100 ease-in font-thin opacity-80 hover:opacity-100"
            to="/productos">Productos</NuxtLink>
        </li>
        <li>
          <NuxtLink
            class="text-white text-2xl pb-1 border-b border-PRP hover:border-white duration-100 ease-in font-thin opacity-80 hover:opacity-100"
            to="/nosotros">Nosotros</NuxtLink>
        </li>
        <li>
          <NuxtLink
            class="text-white text-2xl pb-1 border-b border-PRP hover:border-white duration-100 ease-in font-thin opacity-80 hover:opacity-100"
            to="/home">Contacto</NuxtLink>
        </li>
      </ul>
      <div class="w-full text-end pr-10">

        <button class="" @click="modal = true">
          <IconsMenu class="w-10 stroke-white md:hidden" />
        </button>
      </div>
    </div>
    <div class="h-screen fixed inset-0 z-20 bg-PRP" v-if="modal">
    
      <div class="text-end pr-10 pt-4">
        <button @click="modal = false">
          <IconsClose class="w-10 stroke-white md:hidden" />
        </button>
      </div>
      <div class="text-center pt-10">
        

          <div>
            <NuxtLink to="/" class="text-white text-4xl font-thin" @click="modal = false">Inicio</NuxtLink>
          </div>
          <div class="mt-3">
            <NuxtLink to="/nosotros" class="text-white text-4xl font-thin " @click="modal = false">Nosotros</NuxtLink>
          </div>
          <div class="mt-3">
          <NuxtLink to="/productos" class="text-white text-4xl font-thin" @click="modal = false">Productos</NuxtLink>
        </div>
        <div class="mt-3">
          <NuxtLink to="/contacto" class="text-white text-4xl font-thin" @click="modal = false">Contacto</NuxtLink>
        </div>
        
      
    </div>
    <div class="pt-20">
      <img src="/img/logo_zeramic.webp" class="w-60 m-auto" alt="">
    </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const modal = ref(false)
</script>
