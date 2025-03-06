<script setup lang="ts">
const { reference } = useRoute().params;
const { getCompras } = useCompras();
const data = await getCompras({ reference });
if (!data?.length) navigateTo("/micuenta/compras");
const modal = ref(false);
const tracking = ref(false);

const compra = computed<any>(() => data && data.find(() => true));

const columns = [
  {
    key: "item",
    label: "Producto",
  },

  {
    key: "cantidad",
    label: "Cantidad",
  },
  {
    key: "valor",
    label: "Valor",
  },
  {
    key: "total",
    label: "Totales",
  },
];

const color = computed(() => COLORS[compra.value?.wompi?.status] || "cyan");
</script>

<template>
  <div class="md:flex gap-4 max-w-5xl mx-auto p-5">
    <!-- <CuentaNavInfo /> -->
    <div class="w-full text-white">
      <div
        class="md:flex justify-center items-center gap-5 bg-white/10 py-5 rounded-xl mx-auto px-6 md:px-0 w-4/5 md:w-2/3"
      >
        <button
          class="text-xl bg-white/20 mx-auto md:mx-0 flex gap-3 py-2 px-6 rounded-xl border font-bold"
          @click="tracking = true"
        >
          <IconsCar class="w-8 fill-white" />Seguimiento del envio
        </button>
        <div class="mt-4 md:mt-0">
          <NuxtLink
            to="/micuenta/compras"
            class="bg-white/20 flex gap-2 py-2.5 font-bold px-4 rounded-xl border text-xl"
          >
            <IconsBag class="w-5 fill-white" /> Volver a mis compras
          </NuxtLink>
        </div>
      </div>

      <div class="mt-4">
        <p class="text-2xl mt-6 mb-4 font-semibold">Resumen de la compra</p>

        <div class="border rounded-xl">
          <div class="flex justify-around bg-white/10 py-3">
            <div></div>
            <b>Producto</b>
            <b class="hidden sm:block">Cantidad</b>
            <b class="hidden sm:block">Valor</b>
            <b>Total</b>
          </div>
          <div
            class="flex gap-2 w-full p-2"
            v-for="item in compra?.productos"
            :key="item.id"
          >
            <NuxtLink>
              <img
                :src="item.imagen"
                class="h-16 aspect-video rounded"
                alt=""
              />
            </NuxtLink>
            <div class="w-full items-center flex justify-around">
              <b>
                {{ item.producto }} <br />
                <p class="sm:hidden font-thin">{{ item.cantidad }} unidades</p>
              </b>
              <p class="font-medium text-sm hidden sm:block">
                {{ item.cantidad }}
              </p>

              <p class="font-medium text-sm hidden sm:block">
                {{ formatMoneda(item.valor) }}
              </p>

              <p class="font-medium text-sm">
                {{ formatMoneda(item.valor * item.cantidad) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full mt-8 md:flex gap-3">
        <div class="md:w-3/5 bg-white/10 rounded-xl px-5 py-2 text-white">
          <p class="text-2xl text-center font-semibold">
            Información de la compra
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 font-thin mt-3">
            <p><b>Fecha:</b> {{ formatFecha(compra?.date) }}</p>
            <p>
              <b>Estado:</b>
              <UBadge :color="color" class="ml-2">{{
                compra?.wompi?.status || "NUEVA"
              }}</UBadge>
            </p>
            <p><b>Nombre:</b> {{ compra?.fullName }}</p>
            <p><b>Email:</b> {{ compra?.email }}</p>
            <p><b>Celular:</b> {{ compra?.phone }}</p>
            <p><b>Departamento:</b> {{ compra?.departmentOrStateName }}</p>
            <p><b>Ciudad:</b> {{ compra?.locationName }}</p>
            <p><b>Dirección:</b> {{ compra?.address }}</p>
          </div>
        </div>
        <div
          v-if="compra?.wompi"
          class="md:w-2/5 mt-4 md:mt-0 bg-white/10 text-white rounded-xl px-5 py-2"
        >
          <p class="text-2xl font-semibold text-center">Información del Pago</p>
          <div class="font-thin mt-3">
            <p class="flex justify-between">
              <b>Medio de pago:</b> {{ compra?.wompi.payment_method_type }}
            </p>
            <p class="flex justify-between">
              <b>Estado:</b> {{ compra?.wompi.status }}
            </p>
            <p class="flex justify-between"> <b>Costo de envio:</b> {{ formatMoneda(compra?.shippingCost) }}</p>

            <p class="flex justify-between">
              <b>Subtotal:</b>
              {{  formatMoneda(compra?.total) }}
            </p>
            <hr class="border-white/20 border-0.5 my-2" />
            <p class="flex justify-between">
              <b> Total: </b
              >{{ formatMoneda(compra?.total + compra?.shippingCost) }}
            </p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
       
      </div>
      <UModal v-model="tracking" :ui="{ width: 'w-full sm:max-w-md' }">
        <CuentaTrackingEnvio v-if="compra?.mpCode" :mpCode="compra.mpCode" />
      </UModal>

      <UButton class="mt-4" @click="modal = true">JSON</UButton>

      <UModal v-model="modal">
        <div class="overflow-auto">
          <pre class="text-xs p-4">{{ compra }}</pre>
        </div>
      </UModal>
    </div>
  </div>
</template>
