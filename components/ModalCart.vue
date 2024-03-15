<script setup lang="ts">
const { open } = useShopping();
</script>
<template>
  <div
    v-if="open"
    :class="open ? 'block' : 'hidden'"
    class="bg-black/50 h-screen w-full fixed inset-0 flex justify-center items-center"
  >
    <div class="bg-white rounded-xl shadow w-1/2">
      <div class="flex">
      <h2 class="w-full px-5">Resumen de compra</h2>
        
        <button
        class="top-0 rounded-full right-0 bg-slate-500 p-2 m-2"
        @click="open = false"
      >
        x
      </button>
      </div>
      <slot />
      <div class="p-3 text-center text-2xl font-thin">
        <NuxtLink @click="open = false" to="/compras">Ir al carrito</NuxtLink>
      </div>
    </div>
  </div>
</template>
