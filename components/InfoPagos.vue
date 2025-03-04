<script setup lang="ts">
const props = defineProps({
    transaction: Object,
    default: () => ({} as any)
})
const json = ref(false)
</script>
<template>
    <UCard :ui="{ background: 'bg-PRP' }">
        <template #header>
            <h3 class="text-white text-center">Información de la transacción</h3>
        </template>
        <div class="p-2 overflow-auto text-white font-thin">
            <div v-if="transaction">
                <p> <b>Estado:</b>  {{ transaction?.status }}</p>
                <p> <b>Referencia:</b> {{ transaction?.reference }}</p>
                <p> <b>Fecha:</b> {{ formatFecha(transaction?.created_at || transaction?.createdAt) }} </p>
                <p> <b>Finalizado:</b> {{ formatFecha(transaction?.finalized_at || transaction?.finalizedAt) }}</p>
                <p> <b>Id:</b> {{ transaction?.id }}</p>
                <p> <b>Moneda:</b> {{ transaction?.currency }}</p>
                <p> <b>Monto:</b> {{ formatMoneda((transaction?.amount_in_cents || transaction?.amountInCents) / 100) }}</p>
                <p>  {{ transaction?.status_message }}</p>
                <p> <b>Medio de pago:</b> {{ transaction?.payment_method_type || transaction?.paymentMethodType }}</p>
            </div>
            <div v-else>
                <div>Información no encontrada</div>
            </div>
            
            <!-- <UButton class="mt-4" @click="json = !json">JSON</UButton>
            <pre v-if="json" class="text-xs">{{ transaction }}</pre> -->
        </div>
        <template #footer>
            <div class="flex justify-center gap-4">
                <NuxtLink class="bg-white/10 border text-white px-6 py-2 rounded-lg" to="/">Ir Al Inicio</NuxtLink>
                <NuxtLink class="bg-white/10 border text-white px-6 py-2 rounded-lg" to="/micuenta/compras">Ver Mis Compras</NuxtLink>
            </div>

        </template>
    </UCard>
</template>