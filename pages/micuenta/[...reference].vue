<script setup lang="ts">
const { reference } = useRoute().params;
const { getCompras } = useCompras();
const data = await getCompras({ reference });
const modal = ref(false);

const compra = computed<any>(
    () => data && data.find(() => true));


const columns = [
    {
        key: "item",
        label: "Producto",
    },
    {
        key: "cantvalor",
        label: "Cant/Valor",
    },
    {
        key: "total",
        label: "Totales",
    },
]
</script>

<template>
    <div class="md:flex gap-4 max-w-5xl mx-auto p-5">
        <CuentaNavInfo />
        <div class="w-full text-white">
            <div class="flex gap-4 w-full">
                <div class="w-full">
                    <p>Información de la compra</p>
                    <p>Nombre: {{ compra.fullName }}</p>
                    <p>Email: {{ compra.email }}</p>
                    <p>Teléfono: {{ compra.phone }}</p>
                    <p>Departamento: {{ compra.departmentOrStateName }}</p>
                    <p>Localidad: {{ compra.locationName }}</p>
                    <p>Direccion: {{ compra.address }}</p>
                </div>
                <div class="w-full">
                    <p>Información del Pago</p>
                    <p>Medio de pago: {{ compra.wompi.payment_method_type }}</p>
                    <p>Estado: {{ compra.wompi.status }}</p>
                    <p>Total pagado: {{ formatMoneda(compra.wompi.amount_in_cents/100) }}</p>
                    <p>Total: {{ formatMoneda(compra.total + compra.shippingCost) }}</p>
                </div>
            </div>
            <h3>Resumen de la compra</h3>
            <div class="p-2 bg-white rounded">
                <UTable :columns="columns" :rows="compra.productos">
                    <template #item-data="{ row }">
                        <div class="flex w-full gap-2 items-center">
                            <img :src="row.imagen" class="w-36 rounded-sm" alt="">
                            {{ row.producto }}
                        </div>
                    </template>
                    <template #cantvalor-data="{ row }">
                        {{ row.cantidad }} / {{ formatMoneda(row.valor) }}
                    </template>
                    <template #total-data="{ row }">
                        {{ formatMoneda(row.cantidad * row.valor) }}
                    </template>
                </UTable>
            </div>

            <h3>Información del Envio</h3>
            <div class="flex gap-4">
                <img :src="compra.deliveryCompanyImgUrl" class="w-24" alt="">
                <div>
                    <p>Empresa de envio: {{ compra.deliveryCompanyName }}</p>
                    <p>Tipo de envio: {{ compra.routeType }}</p>
                    <p>Costo de envio: {{ formatMoneda(compra.shippingCost) }}</p>
                </div>
            </div>

            <UButton class="mt-4" @click="modal = true">JSON</UButton>

            <UModal v-model="modal">
                <div class="overflow-auto">
                    <pre class="text-xs p-4">{{ compra }}</pre>
                </div>
            </UModal>
        </div>
    </div>
</template>