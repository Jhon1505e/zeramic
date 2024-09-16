<template>
  <div class="bg-PRP drop-shadow-xl sticky top-0 w-full z-20">
    <div class="w-full justify-around flex py-4">
      <NuxtLink to="/" class="w-full md:w-1/3 pl-0 md:pl-32">
        <ZeramicText class="w-56 mx-auto md:mx-0" />
      </NuxtLink>
      <ul class="hidden lg:flex gap-5 w-full pr-6 justify-end pt-4 pl-12">
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
            to="/contacto">Contacto</NuxtLink>
        </li>
      </ul>

      <div class="w-auto hidden hover:scale-110 duration-200 ease-in md:flex justify-end pt-1  pr-10"
        v-if="$route.path !== '/compras'">
        <NuxtLink @click="open = true" class="flex cursor-pointer">
          <span class="text-white border rounded-full px-2 py-1 text-xs bg-purple-500 absolute ml-5  ">

            {{ cart.size }}
          </span>
          <IconsBag class="w-7  fill-white" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ZeramicText from './ZeramicText.vue';

const modal = ref(false);
const { open, cart } = useShopping();
</script>
