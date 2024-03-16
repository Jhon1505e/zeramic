<script setup lang="ts">
const { open } = useShopping();
</script>
<template>
  <div
    v-if="open"
    :class="open ? 'block' : 'hidden'"
  
    class="bg-black/60 z-30 h-screen w-full fixed inset-0 flex justify-end "
  >
    <div class="bg-white rounded-lg shadow w-full sm:w-1/2 lg:w-2/5">
      <div class="flex ">
      <h2 class="w-full text-center font-normal text-gray-700 px-5">Resumen de compra</h2>
        
        <button
        class="top-0 rounded-full right-0 m-3"
        @click="open = false"
      >
        <IconsClose class="w-7 fill-gray-700" />
      </button>
      </div>
      
      <div class="h-[80vh] overflow-y-scroll" >
        <slot />
      </div>
      <div class="p-2 text-center bg-PRP text-white w-5/6 mx-auto rounded-lg  text-2xl font-thin mt-3">
        <NuxtLink @click="open = false"  to="/compras">Continuar Compra</NuxtLink>
      </div>
    </div>
  </div>
</template>
