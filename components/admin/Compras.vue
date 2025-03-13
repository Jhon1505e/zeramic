        
<script setup lang="ts">
import { type TableRow } from "#ui/types";

const modal = defineModel({ default: false });
const compra = ref<TableRow[]>();

defineProps({
  compras: Array<TableRow>,
});
const { isLoading } = useLoadingIndicator();

const columns = [
  {
    key: "date",
    label: "Fecha",
    sortable: true,
  },
  {
    key: "total",
    label: "Total",
    sortable: true,
  },
  {
    key: "deliveryCompanyName",
    label: "Enviado por",
  },
  {
    key: "wompi",
    label: "Estado",
  },
  {
    key: "actions",
    label: "Acciones",
  },
];
const page = ref(1);
</script>
<template>
  <UModal
    v-model="modal"
    :ui="{ width: 'w-full sm:max-w-5xl', background: 'bg-PRP' }"
  >
    <div class="px-6 py-3">
      <div class="flex justify-between py-2">
        <p class="text-2xl font-semibold text-white pt-2">
          Compras de<span v-if="compras?.length === 0">l cliente</span>
          {{ compras?.[0]?.fullName }}
        </p>
        <button @click="modal = false" class="bg-white/10 rounded-full p-2">
          <IconsClose class="w-5 stroke-white" />
        </button>
      </div>
      <hr class="my-2 border-white/20" />
      <div
        v-if="compras?.length === 0"
        class="flex justify-center items-center py-10"
      >
        <h2 class="text-white">
          <IconsAlert class="w-10 mx-auto stroke-white" />
          No se encontraron compras
        </h2>
      </div>
      <div v-else class="py-4">
        <div class="flex  text-center text-white font-semibold border p-2 rounded-xl">
          <p class="w-1/4">Fecha</p>
          <p class="w-1/4">Cantidad</p>
          <p class="w-1/4">Estado</p>
          <p class="w-1/4">Total</p>
        </div>
        <div
          class=" bg-white/10 p-2 rounded-xl text-white mt-2 flex text-center hover:border-white/60 cursor-pointer border border-white/10"
          v-for="compra in compras"
          :key="compra.uuid"
          
        >
          <p class="w-1/4">{{ formatFecha(compra?.date) }}</p>
          <p class="w-1/4">{{ compra?.productos.length }} Productos</p>
          <p class="w-1/4">{{ compra?.wompi?.status }}</p>
          <p class="w-1/4">{{ formatMoneda(compra?.total) }}</p>
        </div>
      </div>

      <!--  <AdminInfoCompra v-model="compra" />
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
             <pre class="text-xs">{{ compras }}</pre> 
        </UCard> -->
    </div>
  </UModal>
</template>