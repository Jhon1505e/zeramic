<script setup lang="ts">

const { open } = useShopping();
</script>
<template>
  <div
    v-if="open"
    :class="open ? 'block' : 'hidden'"
    class="bg-black/60 z-30 h-screen w-full fixed inset-0 flex justify-end"
  >
    <div class="bg-white rounded-l-lg shadow w-full sm:w-1/2 lg:w-1/3">
      <div class="flex">
        <IconsBag class="w-10 ml-4 mt-1 fill-PRP" />
        <h2 class="w-full text-center font-extralight text-PRP">
          Resumen de compra
        </h2>

        <button
          class="top-0 rounded-full right-0 mt-2 mr-3"
          @click="open = false"
        >
          <IconsClose class="w-7 stroke-PRP" />
        </button>
      </div>

      <div class="h-[80vh] overflow-y-scroll">
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
          <IconsBag class="w-7 fill-white ml-4" />
          <hr class="w-7 mt-3 rotate-90" />

          Continuar compra
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
