<script setup lang="ts">
const props = defineProps({
    transaction: Object,
    default: () => ({} as any)
})
const json = ref(false)
</script>
<template>
    <UCard>
        <template #header>
            <h3>Información de la transacción</h3>
        </template>
        <div class="p-2 overflow-auto">
            <div v-if="transaction">
                <p>Estado: {{ transaction?.status }}</p>
                <p>Referencia: {{ transaction?.reference }}</p>
                <p>Fecha: {{ transaction?.created_at || transaction?.createdAt }}</p>
                <p>Finalizado: {{ transaction?.finalized_at || transaction?.finalizedAt }}</p>
                <p>Id: {{ transaction?.id }}</p>
                <p>Moneda: {{ transaction?.currency }}</p>
                <p>Monto: {{ formatMoneda((transaction?.amount_in_cents || transaction?.amountInCents) / 100) }}</p>
                <p>{{ transaction?.status_message }}</p>
                <p>Medio de pago: {{ transaction?.payment_method_type || transaction?.paymentMethodType }}</p>
            </div>
            <div v-else>
                <div>Información no encontrada</div>
            </div>
            <div class="text-center p-2">
                <NuxtLink class="bg-PRP text-white px-6 py-2 rounded-lg" to="/micuenta/compras">Mis Compras</NuxtLink>
            </div>
            <hr class="my-4">
            <UButton class="mt-4" @click="json = !json">JSON</UButton>
            <pre v-if="json" class="text-xs">{{ transaction }}</pre>
        </div>
    </UCard>
</template>