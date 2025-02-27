<script setup lang="ts">
const { client } = useAuth();
const compras = ref();

const { getCompras } = useCompras();

compras.value = await getCompras({ email: client.value?.email });
</script>
<template>
  <div class="md:flex gap-4 max-w-5xl mx-auto p-5">
    <CuentaNavInfo />
    <div class="w-full space-y-2">
      <div class="text-white p-1 text-2xl border-b mt-6 md:mt-0">Mis Compras</div>
      <CuentaMisCompras v-for="compra in compras" :key="compra.uuid" :compra="compra" />
      <div v-if="!compras?.length">Aun no tienes compras, agrega una. <NuxtLink to="/productos">Productos</NuxtLink> </div>
    </div>
  </div>
</template>
