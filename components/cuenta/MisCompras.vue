<script setup lang="ts">
defineProps({
    compra: Object as () => any,
});
const nopadding = { padding: '' }
const ui = {
    body: nopadding,
    header: nopadding,
    footer: nopadding,
    background: 'bg-white/70'
};
</script>

<template>
    <UCard :ui="ui">
        <template #header>
            <div class="flex justify-between items-center p-2">
                <div>Fecha: {{ formatFecha(compra.date) }}</div>
                <div>Estado: <UBadge :color="COLORS[compra?.wompi?.status] || 'cyan'">
                        {{ compra?.wompi?.status || 'NUEVA' }}
                    </UBadge>
                </div>
                <NuxtLink :to="`/micuenta/${compra.reference}`"
                    class="bg-PRP text-white rounded-lg px-6 py-1 text-center font-thin">Ver
                    detalles</NuxtLink>
            </div>
        </template>
        <div class="md:flex px-3 w-full items-center">
            <div class="md:w-2/3 w-full space-y-1">
                <div v-for="prod in compra.productos" :key="prod.uuid" class="flex w-full gap-3 border-b pb-1">
                    <NuxtImg :src="prod.imagen" class="h-16 aspect-video rounded" alt="" />
                    <div class="py-2 font-thin w-full">
                        <b>{{ prod.producto }}</b>
                        <div class="flex w-full gap-4">
                            <p><b>Cantidad:</b> {{ prod.cantidad }}</p>
                            <p><b>Valor:</b> {{ prod.valor }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sm:w-1/3 w-full py-1 text-PRP font-thin border-l">
                <IconsPagos class="w-16 fill-PRP mx-auto pb-4" />
                <div class="grid grid-cols-2 text-end">
                    <b>SubTotal:</b>
                    <span>{{ formatMoneda(compra.total) }}</span>
                    <b>Valor envio:</b>
                    <span> {{ formatMoneda(compra.shippingCost) }}</span>
                    <b>Total:</b>
                    <span>{{ formatMoneda(compra.total + compra.shippingCost) }}</span>
                </div>
            </div>
        </div>
        <template #footer>
            <div class="flex w-full p-2 gap-6">
                <IconsDomicilio class="w-12 fill-PRP" />
                <div class="font-thin">
                    <p>
                        <b>Dirección:</b>
                        {{ compra.address }} - {{ compra.locationName }},
                        {{ compra.departmentOrStateName }}
                    </p>
                    <p><b>Enviado por:</b> {{ compra.deliveryCompanyName }}</p>
                </div>
            </div>
        </template>
    </UCard>
</template>