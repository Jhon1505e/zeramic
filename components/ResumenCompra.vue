<script setup lang="ts">
const { cart, total } = useShopping();

</script>

<template>
  <div class="bg-purple-900/20 rounded-xl text-white ">
    <h2 class="text-white font-normal text-center">Resumen del pedido</h2>
    <div class="px-6 pb-4">
      <div class="flex justify-between">
        <h3 class="font-thin">Cantidad</h3>
        <h3 class="font-extralight">{{ cart.size }} producto<span v-if="cart.size > 1">s</span> </h3>
      </div>
      <div class="flex justify-between ">
        <p class="font-thin text-xl">Unidades</p>
        <p class="font-extralight text-xl">{{ cart.size }} producto<span v-if="cart.size > 1">s</span> </p>
      </div>

      <hr class="opacity-50 mt-2 mb-1" />
      <div class="flex justify-between">
        <h3>Total</h3>
        <h3>$ {{ formatMoneda(total) }}</h3>
      </div>
      <div class="py-4 w-full flex justify-center">
        <NuxtLink to="compras/envio" class="bg-white/30 border border-white text-white px-6 py-2 w-full rounded-lg ">
          Confirmar compra
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
