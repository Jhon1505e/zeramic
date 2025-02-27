        
<script setup lang="ts">

const modal = defineModel()

defineProps({
    compras: Array,
})
const { isLoading } = useLoadingIndicator();

const columns = [
    {
        key: 'date',
        label: 'Fecha',
        sortable: true,
    },
    {
        key: 'total',
        label: 'Total',
        sortable: true,
    },
    {
        key: 'direccion',
        label: 'Direccion',
    },
    {
        key: 'deliveryCompanyName',
        label: 'Enviado por',
    },
    {
        key: 'wompi',
        label: 'wompi',
    }
]

</script>
<template>
    <UModal v-model="modal" :ui="{ width: 'w-full sm:max-w-4xl' }">
        <UCard>
            <UTable :loading="isLoading" :columns="columns" :rows="compras">
                <template #direccion-data="{ row }">
                    {{ row.address }} - {{ row.locationName }}, {{ row.departmentOrStateName }}
                </template>
                <template #date-data="{ row }">
                    {{ formatFecha(row.date) }}
                </template>
                <template #total-data="{ row }">
                    {{ formatMoneda(row.total) }}
                </template>
                <template #wompi-data="{ row }">
                    <UBadge variant="">{{ row?.wompi?.status || 'NUEVO' }}</UBadge>
                </template>
            </UTable>
            <UPagination :page-count="3" :total="compras.length" />
            <!-- <pre class="text-xs">{{ compras }}</pre> -->
        </UCard>
    </UModal>
</template>