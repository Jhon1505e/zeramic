<script setup lang="ts">
const { cart, cartProducts } = useShopping();

const total = computed(() => {
  let total = 0;
  for (const item of cartProducts.value) {
    total += item.cantidad * item.valor;
  }
  return total;
});

function formatMoneda(value: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(value);
}

</script>

<template>
  <div class="gap-10 mt-16">
    <div class="w-full md:w-3/4 px-4 md:px-0 mx-auto">
      <CartInfo />
    </div>
    <div class="flex max-w-4xl mx-auto pt-10 gap-10" v-if="cart.size > 0">
      <div class="w-full bg-purple-900/20 rounded-xl px-10">
        <h2 class="text-white font-normal text-center">Código Promocional</h2>
        <p class="text-white/50 font-thin text-center px-10 pt-2">Si tienes un código promocional, puedes ingresarlo aquí.</p>
        <input placeholder="Ingresar Código" type="text" class="border  text-white border-white px-4 py-2 w-full bg-transparent mt-6 rounded-xl">
        <button class="bg-white/30 border border-white text-white px-6 py-2 w-full rounded-lg mt-4">Aplicar Código</button>
      </div>

      <div class="w-full">
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
            <div class="py-4 w-full flex justify-center" >
              <NuxtLink
                to="compras/envio"
                class="bg-white/30 border border-white text-white px-6 py-2 w-full rounded-lg "
              >
                Confirmar compra
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
