        
<script setup lang="ts">
import { type TableRow } from '#ui/types';

const modal = defineModel({ default: false })
const compra = ref<TableRow[]>()

defineProps({
    compras: Array<TableRow>,
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
        key: 'deliveryCompanyName',
        label: 'Enviado por',
    },
    {
        key: 'wompi',
        label: 'Estado',
    },
    {
        key: 'actions',
        label: 'Acciones',
    }
]
const page = ref(1)

</script>
<template>
    <UModal v-model="modal" :ui="{ width: 'w-full sm:max-w-4xl' }">
        <AdminInfoCompra v-model="compra" />
        <UCard>
            <UTable :loading="isLoading" :columns="columns" :rows="compras">
                <template #date-data="{ row }">
                    {{ formatFecha(row.date) }}
                </template>
                <template #total-data="{ row }">
                    {{ formatMoneda(row.total) }}
                </template>
                <template #wompi-data="{ row }">
                    <UBadge :color="COLORS[row?.wompi?.status] || 'cyan'">
                        {{ row?.wompi?.status || 'NUEVO' }}</UBadge>
                </template>
                <template #actions-data="{ row }">
                    <UButton @click="compra = row" icon="i-heroicons-eye" />
                </template>
            </UTable>
            <UPagination v-model="page" :total="compras?.length || 0" />
            <!-- <pre class="text-xs">{{ compras }}</pre> -->
        </UCard>
    </UModal>
</template>