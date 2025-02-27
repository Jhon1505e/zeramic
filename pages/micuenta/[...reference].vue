<script setup lang="ts">
const { reference } = useRoute().params;
const { getCompras } = useCompras();
const data = await getCompras({ reference });
const modal = ref(false);

const compra = computed<any>(() => data && data.find(() => true));

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
];
</script>

<template>
  <div class="md:flex gap-4 max-w-5xl mx-auto p-5">
    <!-- <CuentaNavInfo /> -->
    <div class="w-full text-white">
      <div>
        <NuxtLink
          to="/micuenta/compras"
          class="bg-white/10 py-2 px-4 rounded-xl"
        >
          <UIcon name="heroicons-outline:chevron-left" class="mr-2"></UIcon
          >Volver a mis compras</NuxtLink
        >
      </div>
      <div class="flex gap-4  w-full mt-5">
        <div class="w-full lg:flex gap-4">
          <div class="lg:w-3/5">
            <b class="text-2xl">Información de la compra</b>
            <div
              class="w-full grid grid-cols-1 md:grid-cols-2 bg-white/10 rounded-xl font-thin mt-3 px-4 py-5"
            >
              <p><b>Nombre:</b> {{ compra.fullName }}</p>
              <p><b>Email:</b> {{ compra.email }}</p>
              <p><b>Celular:</b> {{ compra.phone }}</p>
              <p><b>Departamento:</b> {{ compra.departmentOrStateName }}</p>
              <p><b>Ciudad:</b> {{ compra.locationName }}</p>
              <p><b>Dirección:</b> {{ compra.address }}</p>
            </div>
          </div>
          <div class="lg:w-2/5" >
            <h3>Información del Envio</h3>
            <div class="p-4 bg-white/10 rounded-xl flex gap-3">
              <img
                :src="compra.deliveryCompanyImgUrl"
                class="rounded-xl w-20"
                alt=""
              />
              <div class="font-thin">
                <p> <b>Empresa de envio:</b>  {{ compra.deliveryCompanyName }}</p>
                <p> <b>Tipo de envio:</b> {{ compra.routeType }}</p>
                <p> <b>Costo de envio:</b> {{ formatMoneda(compra.shippingCost) }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="compra.wompi" class="w-full">
          <b class="text-2xl">Información del Pago</b>
          <p>Medio de pago: {{ compra.wompi.payment_method_type }}</p>
          <p>Estado: {{ compra.wompi.status }}</p>
          <p>
            Total pagado: {{ formatMoneda(compra.wompi.amount_in_cents / 100) }}
          </p>
          <p>Total: {{ formatMoneda(compra.total + compra.shippingCost) }}</p>
        </div>
      </div>
      <div class=" mt-4">
        
          <p class="text-2xl my-2 font-semibold">Resumen de la compra</p>
          <div class="px-2 bg-white rounded-xl">
            <UTable :columns="columns" :rows="compra.productos">
              <template #item-data="{ row }">
                <div class="flex w-full gap-2 items-center">
                  <img :src="row.imagen" class="w-32 rounded-sm" alt="" />
                 <p class="pl-5">{{ row.producto }}</p> 
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
        
        
         
        
      </div>
      <!-- <UButton class="mt-4" @click="modal = true">JSON</UButton> -->

      <UModal v-model="modal">
        <div class="overflow-auto">
          <pre class="text-xs p-4">{{ compra }}</pre>
        </div>
      </UModal>
    </div>
  </div>
</template>
