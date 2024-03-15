<template>
  <div class="bg-PRP drop-shadow-xl sticky top-0 w-full z-20">
    <div class="w-full justify-around flex py-4">
      <div class="w-full md:w-1/3 pl-0 md:pl-32">
        <NuxtImg
          format="webp"
          src="/img/zeramicText.png"
          class="w-36 mx-auto md:mx-0"
          alt=""
        />
      </div>
      <ul class="hidden lg:flex gap-5 w-1/3 justify-center pt-2 pl-12">
        <li>
          <NuxtLink
            class="text-white text-2xl pb-1 border-b border-PRP hover:border-white duration-100 ease-in font-thin opacity-80 hover:opacity-100"
            to="/"
            >Inicio</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            class="text-white text-2xl pb-1 border-b border-PRP hover:border-white duration-100 ease-in font-thin opacity-80 hover:opacity-100"
            to="/productos"
            >Productos</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            class="text-white text-2xl pb-1 border-b border-PRP hover:border-white duration-100 ease-in font-thin opacity-80 hover:opacity-100"
            to="/nosotros"
            >Nosotros</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            class="text-white text-2xl pb-1 border-b border-PRP hover:border-white duration-100 ease-in font-thin opacity-80 hover:opacity-100"
            to="/contacto"
            >Contacto</NuxtLink
          >
        </li>
      </ul>

      <div class="w-1/2 md:w-1/3 hidden md:flex justify-end pt-1 md:pt-2 pr-10">
        <NuxtLink
          @click="open = true"
          class="flex rounded-full border border-white hover:scale-105 duration-100 ease-in text-white bg-white/20 px-4 md:px-6 py-1 md:pt-2 gap-2 md:h-10"
        >
          <span class="hidden md:block">Carrito {{ cart.size }}</span>
          <IconsBag class="w-8 md:w-6 stroke-white" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const modal = ref(false);
const { open, cart } = useShopping();
</script>
