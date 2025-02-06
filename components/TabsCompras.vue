<script setup lang="ts">
const { name } = useRoute();
const isPath = (n: string) => name === n;
</script>
<template>
    <div class="grid grid-cols-3 gap-3 p-4 bg-gray-100 mb-5">
        <NuxtLink to="/compras" class="flex justify-center items-center gap-2 p-2 rounded hover:bg-gray-200"
            :class="{ 'text-green-500 font-semibold fill-green-500 bg-gray-300': isPath('compras') }">
            <IconsShopping class="h-10" /> RESUMEN DE COMPRA
        </NuxtLink>
        <NuxtLink to="/compras/envio" class="flex justify-center items-center gap-2 p-2 rounded hover:bg-gray-200"
            :class="{ 'text-green-500 font-semibold fill-green-500 bg-gray-300': isPath('compras-envio') }">
            <IconsEnvio class="h-10" /> DATOS DE ENVÍO
        </NuxtLink>
        <NuxtLink to="/compras/pago" class="flex justify-center items-center gap-2 p-2 rounded hover:bg-gray-200"
            :class="{ 'text-green-500 font-semibold fill-green-500 bg-gray-300': isPath('compras-pago') }">
            <IconsMoney class="h-10" /> PAGO
        </NuxtLink>
    </div>
</template>