<script setup lang="ts">
const { client } = useAuth();
const { getCompras } = useCompras();
const compras = ref();

const data = await getCompras({ email: client.value?.email });
if (data) {
  compras.value = data;
}

</script>

<template>
  <div class="md:flex gap-4 max-w-5xl mx-auto p-5">
    <CuentaNavInfo />
    <div class="w-full">
      <div class="text-white p-1 text-2xl border-b mt-6 md:mt-0">Mis Compras</div>
      <div class="space-y-3">
        <CuentaMisCompras v-for="compra in compras" :key="compra.uuid" :compra="compra" />
      </div>
      <div v-if="!compras?.length" class="h-full flex justify-center items-center">
        <div class="pb-20 text-white text-center">
          <IconsNuevasCompras class="w-32 fill-white mx-auto" />
          <p class="py-4 text-2xl font-bold"> Aun no tienes compras</p>
          <NuxtLink to="/productos" class="mx-auto border bg-white/10 px-4 py-2 rounded-md">Agregar Productos</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
