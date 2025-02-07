<script setup lang="ts">
const { cart, total } = useShopping();
</script>
<template>
  <div class="bg-PRP pb-32">
    <!-- <pre>{{ cart }}</pre> -->
    <TabsCompras  />
    <CartInfo  />
    <div class="md:flex space-y-6 md:space-y-0 px-4 max-w-4xl mx-auto pt-10  gap-10" v-if="cart.size > 0">
      <div class="w-full bg-white/80 rounded-xl px-10">
        <h2 class="text-PRP font-bold text-center">Código Promocional</h2>
        <p class="text-PRP font-thin text-center px-10 pt-2">Si tienes un código promocional, puedes ingresarlo
          aquí.</p>
        <input  type="text"
          class="border  text-PRP text-center border-PRP px-4 py-2 w-full bg-PRP/20 mt-6 rounded-xl">
        <button class="bg-PRP border border-PRP text-white px-6 py-2 w-full rounded-lg mt-4">Aplicar
          Código</button>
      </div>

      <div class="w-full">
        <ResumenCompra />
      </div>
    </div>
  </div>
</template>