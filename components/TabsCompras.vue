<script setup lang="ts">
const route = useRoute();
const isPath = (n: string) => route.name?.toString() === n;
</script>
<template>
  <div class="bg-white/80">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-3 gap-3 md:p-4 sticky top-32 mb-2 md:top-20 w-full z-10 backdrop-blur-lg">
        <NuxtLink to="/compras"
          class="md:flex justify-center items-center text-PRP fill-PRP text-center text-xs md:text-lg gap-2 p-2 rounded hover:bg-PRP/30 font-semibold duration-150 ease-in"
          :class="{ ' bg-PRP/30': isPath('compras') }">
          <IconsShopping class="h-10 mx-auto sm:mx-2 pb-2 sm:pb-0" />
          RESUMEN DE COMPRA
        </NuxtLink>
        <NuxtLink to="/compras/envio"
          class="md:flex justify-center text-center text-xs text-PRP fill-PRP md:text-lg items-center gap-2 p-2 pt-4 md:pt-2 rounded hover:bg-PRP/30 font-semibold duration-150 ease-in"
          :class="{ 'bg-PRP/30': isPath('compras-envio') }">
          <IconsEnvio class="h-10 mx-auto sm:mx-2 pb-1 sm:pb-0" />
          DATOS DE ENVÍO
        </NuxtLink>
        <NuxtLink to="/compras/pago"
          class="md:flex justify-center items-center text-PRP fill-PRP text-center text-sm md:text-lg gap-2 p-2 pt-3 md:pt-2 rounded hover:bg-PRP/30 font-semibold duration-150 ease-in"
          :class="{ 'bg-PRP/30': isPath('compras-pago') }">
          <IconsMoney class="h-10 mx-auto sm:mx-2 pb-1 sm:pb-0" />
          PAGO
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
