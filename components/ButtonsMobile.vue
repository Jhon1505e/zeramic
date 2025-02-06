<template>
  <div
    class="bg-gray-800 lg:hidden z-20 h-16 w-full mx-auto fixed mt-1  bottom-0 shadow shadow-black"
  >
    <div class="flex pt-1"><NuxtLink
        to="/"
        class="w-1/5 pt-1 text-center text-white opacity-80 fill-gray-400"
        :class="{
          ' rounded-t-xl bg-white/20 opacity-100 fill-white text-white  border-b-2 border-white':
            $route.path === '/',
        }"
      >
        <IconsHome class="w-6 mx-auto fill-white " />
        <h3 class="pt-1 text-sm">Inicio</h3>
      </NuxtLink>
      <NuxtLink
        to="/productos"
        class="w-1/5 pt-1 text-center text-white opacity-80 fill-white"
        :class="{
          'rounded-t-xl bg-white/20 opacity-100 fill-white text-white border-b-2 border-white rounded-tl-2xl':
            $route.path === '/productos',
        }"
      >
        <IconsProducts class="w-6 mx-auto" />
        <h3 class="pt-1 text-sm">Productos</h3>

      </NuxtLink> 
      <NuxtLink
        to="/nosotros"
        class="w-1/5 pt-1 text-center text-white opacity-80 fill-white"
        :class="{
          'rounded-t-xl bg-white/20 opacity-100 fill-white text-white border-b-2 border-white rounded-tl-2xl':
            $route.path === '/nosotros',
        }"
      >
        <IconsRocket class="w-6 mx-auto" />
        <h3 class="pt-1 text-sm">Nosotros</h3>
      </NuxtLink> 
      <NuxtLink
        to="/cuenta"
        class="w-1/5 pt-1 text-center text-white opacity-80 fill-gray-400"
        :class="{
          ' rounded-t-xl bg-white/20 opacity-100 fill-white  border-b-2 border-white':
            $route.path === '/cuenta',
        }"
      >
        <IconsUser class="w-7 mx-auto" />
        <h3 class="pt-0 text-sm">Cuenta</h3>
      </NuxtLink>
      
      <NuxtLink
        to="/contacto"
        class="w-1/5 pt-1 text-center text-white opacity-80 fill-gray-400"
        :class="{
          ' rounded-t-xl bg-white/20 opacity-100 fill-white text-white border-b-2 border-white':
            $route.path === '/contacto',
        }"
      >
        <IconsContacto class="w-7 mx-auto" />
        <h3 class="pt- text-sm">Contacto</h3>
      </NuxtLink>
     
    </div>
  </div>
</template>
<script setup lang="ts">


const { cart } = useShopping();
</script>
