<script setup lang="ts">
const { cart, total } = useShopping();
</script>
<template>
  <div class="bg-PRP pb-32">
    <!-- <pre>{{ cart }}</pre> -->
    <TabsCompras />
    <CartInfo />
    <div class="flex max-w-4xl mx-auto pt-10 gap-10" v-if="cart.size > 0">
      <div class="w-full bg-purple-900/20 rounded-xl px-10">
        <h2 class="text-white font-normal text-center">Código Promocional</h2>
        <p class="text-white/50 font-thin text-center px-10 pt-2">Si tienes un código promocional, puedes ingresarlo
          aquí.</p>
        <input placeholder="Ingresar Código" type="text"
          class="border  text-white border-white px-4 py-2 w-full bg-transparent mt-6 rounded-xl">
        <button class="bg-white/30 border border-white text-white px-6 py-2 w-full rounded-lg mt-4">Aplicar
          Código</button>
      </div>

      <div class="w-full">
        <ResumenCompra />
      </div>
    </div>
  </div>
</template>