<template>
  <div class="bg-PRP  sticky top-0 w-full z-20">
    <div  class="w-full justify-center  flex pt-3 " :class="route.path === '/' ? 'pb-6' : 'pb-3'">
       <NuxtLink v-if="route.path !== '/'" to="/" class="w-full md:w-1/3 pl-0 md:pl-32">
        <img src="/img/logo-zeramic.png"  alt="zeramic" />
        
      </NuxtLink>
     
      <ul class="hidden lg:flex bg w-full   pt-4 pl-20 duration-300 " :class="route.path === '/' ? 'justify-center ml-32' : 'justify-end'">
        <li >
          <NuxtLink
            :class="route.path === '/' ? 'opacity-100  text-white' : 'opacity-70 hover:opacity-100'"
            class="text-white text-2xl  py-2 px-3  duration-100 ease-in font-extralight "
            to="/">Inicio</NuxtLink>
        </li>
        <li>
          <NuxtLink
            :class="route.path === '/productos' ? 'opacity-100  text-white' : 'opacity-70 hover:opacity-100'"
            class="text-white text-2xl pb-1 px-3   duration-100 ease-in font-extralight "
            to="/productos">Productos</NuxtLink>
        </li>
        <li>
          <NuxtLink
            :class="route.path === '/nosotros' ? 'opacity-100  text-white' : 'opacity-70 hover:opacity-100'"
          class="text-white text-2xl pb-1 px-3   duration-100 ease-in font-extralight "
          to="/nosotros">Nosotros</NuxtLink>
        </li>
        <li>
          <NuxtLink
            :class="route.path === '/compras' ? 'opacity-100  text-white' : 'opacity-70 hover:opacity-100'"
          class="text-white text-2xl pb-1 px-3   duration-100 ease-in font-extralight "
          to="/contacto">Contacto</NuxtLink>
        </li>
        <li>
          <NuxtLink
            :class="route.path === '/cuenta' ? 'opacity-100  text-white ' : '' && route.path === '/compras' ? ' ' : 'opacity-70 hover:opacity-100'"
            class="text-white text-2xl pb-1 px-3 pr-20  duration-100 ease-in font-extralight "
            to="/cuenta">Mi Cuenta</NuxtLink>
        </li>
      </ul>


      <div class="w-auto hidden hover:scale-110 duration-200 ease-in md:flex justify-end pt-1 pl-4 pr-10"
        v-if="$route.path !== '/compras'">
        <NuxtLink @click="open = true" class="flex cursor-pointer">
          <span class="text-white border rounded-full px-2 py-1   text-xs bg-white/10 absolute ml-5  ">
            {{ cart.size }}
          </span>
          <IconsBag class="w-7 z-10  stroke-white" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();

const modal = ref(false);
const { open, cart } = useShopping();
</script>
