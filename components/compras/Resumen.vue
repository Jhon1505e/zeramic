<script setup lang="ts">
const { cart, total } = useShopping();
const { envio } = useEnvio();

const route = useRoute();
const { path } = route;
const paths = [
  "/compras",
  "/compras/envio",
  "/compras/pago",
]

const index = paths.indexOf(path);

</script>

<template>
  <div class="bg-white/80 -mt-1 rounded-xl">
    <h2 class="text-PRP font-bold text-center">Resumen del pedido</h2>
    <div class="px-6 pb-4">
      <div class="flex justify-between text-PRP">
        <h3 class="font-thin ">Cantidad</h3>
        <h3 class="font-extralight ">{{ cart.size }} producto<span v-if="cart.size > 1">s</span> </h3>
      </div>
      <div class="flex justify-between text-PRP">
        <p class="font-thin text-xl">Unidades</p>
        <p class="font-extralight text-xl">{{ cart.size }} producto<span v-if="cart.size > 1">s</span> </p>
      </div>

      <hr class="opacity-50 mt-2 mb-1 border-PRP" />
      <div class="flex justify-between" :class="!envio ? 'text-red-500' : 'text-PRP'">
        <h4>Envio:</h4>
        <h4>{{ formatMoneda(envio?.shippingCost || 0) }}</h4>
      </div>
      <NuxtLink to="/compras/envio" class="text-xs rounded-lg mt-1 px-2 py-1 text-start bg-PRP/10 text-PRP block">
     Será enviado por  <b>{{ envio?.deliveryCompanyName || "Seleccionar" }}</b> 
      </NuxtLink>
      <div class="flex justify-between text-PRP">
        <h3>Total</h3>
        <h3>{{ formatMoneda(total + (envio?.shippingCost || 0)) }}</h3>
      </div>
      <div class="py-4 w-full flex justify-center" v-if="path !== '/compras/pago'">
        <NuxtLink :to="paths[index + 1]"
          class="bg-PRP border text-center text-white px-6 py-2 w-full rounded-lg ">
          Continuar compra
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
