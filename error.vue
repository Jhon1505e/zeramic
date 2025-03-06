<script setup lang="ts">
useHead({
  title: "Página no encontrada",
  
})
const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="bg-PRP h-screen flex items-center justify-center w-full">
    <div class="text-center">
      <img src="/img/logo-zeramic.png" class="mx-auto w-72" alt="">
      <div class="mt-10">
        <div>
          <b class="text-white text-3xl md:text-5xl ">Página no encontrada</b>
          <p class="text-white font-thin text-xl md:text-2xl mt-2">Regresa a la página principal</p>
        </div>
        <button @click="handleError" class="p-2 text-white bg-white/10 border px-10 w-auto rounded-xl mt-4 ">
          Ir a Inicio
        </button>
      </div>
    </div>
  </div>
</template>
