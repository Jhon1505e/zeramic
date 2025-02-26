<script setup lang="ts">
const { cart, total } = useShopping();
</script>
<template>
  <div class="bg-PRP h-full max-w-5xl mx-auto pb-20">
    <!-- <pre>{{ cart }}</pre> -->
    <div v-if="cart?.size" class="flex justify-between pb-1 text-white">
      <div class="w-2/5 pl-6">
        <h2 class="text-lg font-extralight">Producto</h2>
      </div>
      <div class=" w-1/4">
        <h2 class="text-lg text-center pl-14 sm:pl-0 md:pr-24 font-extralight">Cantidad</h2>
      </div>
      <div class=" w-1/5 ">
        <h2 class="text-lg text-start pl-2 font-extralight hidden sm:block">Precio</h2>
      </div>
      <div class=" w-1/5">
        <h2 class="text-lg text-end pr-10 font-extralight">Total</h2>
      </div>
    </div>
    <CartInfo class="text-white px-4 md:px-0" />
    <div class="md:flex space-y-6 md:space-y-0 p-4 gap-5" v-if="cart.size > 0">
      <div class="w-full bg-white rounded-xl px-10 py-4">
        <div class="text-PRP font-semibold text-xl text-center">Código Promocional</div>
        <p class="text-PRP text-center md:px-10 pt-2">Si tienes un código promocional, puedes ingresarlo
          aquí.</p>
        <input type="text" placeholder="Ingresa tu Código Promocional" class="border text-PRP text-center border-PRP px-4 py-2 w-full mt-6 rounded-xl">
        <button class="bg-PRP border border-PRP text-white px-6 py-2 w-full rounded-lg mt-4">Aplicar
          Código</button>
      </div>

      <div class="w-full">
        <ComprasResumen />
      </div>
    </div>
  </div>
</template>