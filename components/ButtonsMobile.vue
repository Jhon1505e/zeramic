<template>
  <div
    class="bg-PRP lg:hidden rounded-t-2xl z-20 h-16 fixed bottom-0 shadow shadow-black w-full"
  >
    <div class="flex pt-1"><NuxtLink
        to="/"
        class="w-1/5 text-center text-white opacity-80 fill-gray-400"
        :class="{
          ' rounded-t-xl bg-white/20 opacity-100 fill-white text-white border-b-2 border-white':
            $route.path === '/',
        }"
      >
        <IconsHome class="w-6 mx-auto" />
        <h3 class="pt-1 text-sm">Inicio</h3>
      </NuxtLink>
      <NuxtLink
        to="/productos"
        class="w-1/5 text-center text-white opacity-80 fill-white"
        :class="{
          'rounded-t-xl bg-white/20 opacity-100 fill-white text-white border-b-2 border-white rounded-tl-2xl':
            $route.path === '/productos',
        }"
      >
        <IconsCocina class="w-6 mx-auto" />
        <h3 class="pt-1 text-sm">Productos</h3>
      </NuxtLink> <NuxtLink
        to="/compras"
        class="w-1/5 text-center text-white opacity-80 fill-gray-400"
        :class="{
          ' rounded-t-xl bg-white/20 opacity-100 fill-white text-white border-b-2 border-white':
            $route.path === '/compras',
        }"
      >
        <span
          class="text-white rounded-full px-2 py-1 text-xs bg-PRP shadow-sm shadow-black absolute ml-3"
        >
          {{ cart.size }}
        </span>

        <IconsBag class="w-7 mx-auto fill-white" />
        <h3 class="pt-1 text-sm">Carrito</h3>
      </NuxtLink>
      <NuxtLink
        to="/nosotros"
        class="w-1/5 text-center text-white opacity-80 fill-gray-400"
        :class="{
          ' rounded-t-xl bg-white/20 opacity-100 fill-white  border-b-2 border-white':
            $route.path === '/nosotros',
        }"
      >
        <IconsUser class="w-7 mx-auto" />
        <h3 class="pt-1 text-sm">Cuenta</h3>
      </NuxtLink>
      
      <NuxtLink
        to="/contacto"
        class="w-1/5 text-center text-white opacity-80 fill-gray-400"
        :class="{
          ' rounded-t-xl bg-white/20 opacity-100 fill-white text-white border-b-2 border-white':
            $route.path === '/contacto',
        }"
      >
        <IconsContacto class="w-7 mx-auto" />
        <h3 class="pt-1 text-sm">Contacto</h3>
      </NuxtLink>
     
    </div>
  </div>
</template>
<script setup lang="ts">
const { cart } = useShopping();
</script>
