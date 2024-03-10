<template>
  <div
    class="bg-PRP lg:hidden rounded-t-2xl z-20 h-16 fixed bottom-0 shadow shadow-black w-full"
  >
    <div class="flex pt-1">
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
      </NuxtLink>
      <NuxtLink
        to="/nosotros"
        class="w-1/5 text-center text-white opacity-80 fill-gray-400"
        :class="{
          ' rounded-t-xl bg-white/20 opacity-100 fill-white  border-b-2 border-white':
            $route.path === '/nosotros',
        }"
      >
        <IconsNosotros class="w-7 mx-auto" />
        <h3 class="pt-1 text-sm">Nosotros</h3>
      </NuxtLink>
      <NuxtLink
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
      <NuxtLink
        to="/compras"
        class="w-1/5 text-center text-white opacity-80 fill-gray-400"
        :class="{
          ' rounded-t-xl bg-white/20 opacity-100 fill-white text-white border-b-2 border-white':
            $route.path === '/compras',
        }"
      >
        <IconsBag class="w-7 mx-auto" />
        <h3 class="pt-1 text-sm">Carrito</h3>
      </NuxtLink>
    </div>
  </div>
</template>
