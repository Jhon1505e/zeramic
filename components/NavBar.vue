<template>
  <div class="bg-PRP h-20 sticky top-0 w-full z-20">
    <div class="w-full justify-center flex pt-3">
      <NuxtLink to="/" class=" md:w-1/3 pl-6 md:pl-32">
        <img src="/img/logo-zeramic.png" class="mx-auto md:mx-0 " alt="zeramic" />
      </NuxtLink>

      <div class="hidden lg:flex justify-end bg w-full pt-4 pl-20 duration-300">
        <NuxtLink class="text-white text-2xl pb-1 px-3 duration-100 ease-in font-extralight" to="/productos">
          Productos
        </NuxtLink>
        <NuxtLink class="text-white text-2xl pb-1 px-3 duration-100 ease-in font-extralight" to="/nosotros">
          Nosotros
        </NuxtLink>
        <NuxtLink class="text-white text-2xl pb-1 px-3 duration-100 ease-in font-extralight " to="/contacto">
          Contacto
        </NuxtLink>
        <NuxtLink class="text-white text-2xl pb-1 px-3 pr-20  duration-100 ease-in font-extralight " to="/cuenta">
          Mi Cuenta
        </NuxtLink>
      </div>

      <div @click="open = true" v-show="!isCompras"
        class="w-full sm:w-auto scale-95 cursor-pointer hover:scale-100 flex items-center relative mr-3 duration-75 ease-in-out">
        <div class="text-white border rounded-full px-2 py-1 text-xs bg-white/10 absolute top-0 right-0">
          {{ cart.size }}
        </div>
        <div class="p-5">
          <IconsBag class="w-7 z-10 fill-white" />
        </div>
      </div>

    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const isCompras = computed(() => route.name?.toString().startsWith('compras'));
const { open, cart } = useShopping();
</script>
