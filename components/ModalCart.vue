<script setup lang="ts">

const { open } = useShopping();
</script>
<template>
  <div
    :class="open ? 'opacity-100' : 'opacity-0 invisible'"
    class="z-50 h-screen duration-75 w-full fixed inset-0 flex justify-end"
  >
    <div class="w-full h-full bg-black opacity-50" @click="open = false"></div>
    <div class="bg-white rounded-l-lg shadow max-w-lg w-full">
      <div class="flex">
        
        <h2 class="w-full text-center font-extralight pl-8 text-black">
          Resumen de compra
        </h2>

        <button
          class="top-0 rounded-full right-0 mt-2 mr-3"
          @click="open = false"
        >
          <IconsClose class="w-7" />
        </button>
      </div>

      <div class="overflow-y-scroll duration-150" :class="open ? 'opacity-100' : 'opacity-0 translate-x-20'">
        <slot />
      </div>
      <div
        class="p-2 text-center bg-PRP text-white w-5/6 mx-auto rounded-lg text-2xl font-thin mt-3"
      >
        <NuxtLink
          
          @click="open = false"
          to="/compras"
          class="flex font-thin text-xl justify-center"
        >
         
          Terminar compra
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
