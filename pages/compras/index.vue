<script setup lang="ts">
const { cart, total } = useShopping();
</script>
<template>
  <div class="bg-PRP h-full pb-20">
    <!-- <pre>{{ cart }}</pre> -->
    <div v-if="cart?.size" class="flex justify-between pb-1 max-w-4xl text-white mx-auto">
      <div class="w-2/5 pl-6">
        <h2 class="text-lg font-extralight">Producto</h2>
      </div>
      <div class=" w-1/4">
        <h2 class="text-lg text-center pr-12 font-extralight">Cantidad</h2>
      </div>
      <div class=" w-1/5 ">
        <h2 class="text-lg text-start pl-2 font-extralight ">Precio</h2>
      </div>
      <div class=" w-1/5">
        <h2 class="text-lg text-center font-extralight">Total</h2>
      </div>
    </div>
    <CartInfo class="text-white px-4 md:px-0" />
    <div class="md:flex  space-y-6 md:space-y-0 px-4 max-w-4xl mx-auto pt-10  gap-10" v-if="cart.size > 0">
      <div class="w-full bg-white/80 rounded-xl px-10 py-4">
        <h2 class="text-PRP font-bold text-center">Código Promocional</h2>
        <p class="text-PRP font-thin text-center md:px-10 pt-2">Si tienes un código promocional, puedes ingresarlo
          aquí.</p>
        <input type="text" class="border  text-PRP text-center border-PRP px-4 py-2 w-full bg-PRP/20 mt-6 rounded-xl">
        <button class="bg-PRP border border-PRP text-white px-6 py-2 w-full rounded-lg mt-4">Aplicar
          Código</button>
      </div>

      <div class="w-full">
        <ResumenCompra start />
      </div>
    </div>
  </div>
</template>