<template>
  <div class="bg-PRP h-20 sticky top-0 w-full z-20">
  <div class="max-w-7xl mx-auto">

  
    <div class="w-full md:justify-center flex pt-3">
      <div class="md:w-1/3 pl-6 md:pl-32" :class="{ 'hidden md:flex ': index }">
        <NuxtLink to="/">
          <img
            src="/img/logo-zeramic.png"
            class="mx-auto md:mx-0 md:w-56"
            alt="zeramic"
          />
        </NuxtLink>
      </div>

      <div class="hidden lg:flex justify-end bg w-full pt-4 pl-20 duration-300">
        <NuxtLink
          class="text-white text-2xl pb-1 px-3 duration-100 ease-in font-extralight"
          to="/productos"
        >
          Productos
        </NuxtLink>
        <NuxtLink
          class="text-white text-2xl pb-1 px-3 duration-100 ease-in font-extralight"
          to="/nosotros"
        >
          Nosotros
        </NuxtLink>
        <NuxtLink
          class="text-white text-2xl pb-1 px-3  duration-100 ease-in font-extralight"
          to="/cuenta"
        >
          Mi Cuenta
        </NuxtLink>
        <NuxtLink
          class="text-white text-2xl pb-1 px-3 mr-10 duration-100 ease-in font-extralight"
          to="/contacto"
        >
          Contacto
        </NuxtLink>
      </div>
      <div class="flex w-full sm:w-auto justify-end gap-1 mt-3 md:mt-0">
        <div
          @click="open = true"
          v-show="!isCompras"
          class="sm:w-auto scale-95 cursor-pointer hover:scale-100 flex items-center relative mr-3 duration-75 ease-in-out"
        >
          <div
            class="text-white border rounded-full px-2 py-1 text-xs bg-white/10 absolute top-2 right-0 hidden sm:flex"
          >
            {{ cart.size }}
          </div>
          <div class="sm:p-5">
            <IconsBag class="w-8 sm:w-7 z-10 fill-white" />
          </div>
        </div>

        <div class="sm:hidden flex pr-6">
          <button @click="modal = true">
            <IconsMenu class="w-9 stroke-white" />
          </button>
        </div>
      </div>
    </div>
    <div v-if="modal">
      <NavMobile @close="modal = false" />
    </div>
  </div></div>
</template>
<script setup lang="ts">
const modal = ref(false);
const route = useRoute();
const index = computed(() => route.name?.toString().startsWith("index"));
const isCompras = computed(() => route.name?.toString().startsWith("compras"));
const { open, cart } = useShopping();
</script>
