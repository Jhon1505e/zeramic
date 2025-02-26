<script setup lang="ts">
const { reference } = useRoute().params;
const { getCompras } = useCompras();
const data = await getCompras({ reference });

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
            <p>Información de la compra</p>
            <p>Nombre: {{ compra.fullName }}</p>
            <p>Email: {{ compra.email }}</p>
            <p>Teléfono: {{ compra.phone }}</p>
            <p>Departamento: {{ compra.departmentOrStateName }}</p>
            <p>Localidad: {{ compra.locationName }}</p>
            <p>Direccion: {{ compra.address }}</p>
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

            <hr class="my-4">
            <pre class="text-xs text-white">{{ compra }}</pre>
        </div>
    </div>
</template>