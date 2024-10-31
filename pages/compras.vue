<script setup lang="ts">
import type { NuxtLink } from '#build/components';
</script>

<template>
    <div class="text-center p-10">
        <div class="text-3xl pb-5">Carrito compras - paso a paso</div>
        <div class="flex gap-4 justify-around p-5">
            <NuxtLink class="py-2 px-10 rounded-sm bg-slate-400" to="/compras">1. confirmar</NuxtLink>
            <NuxtLink class="py-2 px-10 rounded-sm bg-slate-400" to="/compras/envio">2. envio</NuxtLink>
            <NuxtLink class="py-2 px-10 rounded-sm bg-slate-400" to="/compras/pagos">3. Pago</NuxtLink>
        </div>
        <NuxtPage></NuxtPage>
    </div>
</template>