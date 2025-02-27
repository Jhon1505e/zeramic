<script setup lang="ts">
import Product from "~/storyblok/Product.vue";

const { client } = useAuth();
const compras = ref();

const { getCompras } = useCompras();

compras.value = await getCompras({ email: client.value?.email });
</script>
<template>
  <div class="md:flex gap-4 max-w-5xl mx-auto p-5">
    <CuentaNavInfo />
    <div class="w-full space-y-2">
      <div class="text-white p-1 text-2xl border-b mt-6 md:mt-0">Mis Compras</div>
      <div v-for="compra in compras" :key="compra.uuid" class="rounded">
        <div class="sm:flex text-gray-300 gap-2 rounded">
          <div class="sm:w-2/3">
            <div
              v-for="prod in compra.productos"
              :key="prod.uuid"
              class="flex bg-white/10 gap-6 rounded-xl mt-2 px-6"
            >
              <IconsCompras class="w-12 fill-white/70" />
              <!-- <img :src="prod.imagen" class="w-32 rounded-l-xl" alt="" /> -->
              <div class="py-2 font-thin">
                <b>{{ prod.producto }}</b>
                <div class="flex gap-4">
                  <p><b>Cantidad:</b> {{ prod.cantidad }}</p>
                  <p><b>Valor:</b> {{ prod.valor }}</p>
                </div>
              </div>
            </div>
            <div class="px-6 py-4 mt-4 flex gap-6 border rounded-xl bg-white/10">
              <IconsDomicilio class="w-12 fill-white/70" />
              <div class="font-thin">
                <p>
                  <b>Dirección:</b>
                  {{ compra.address }} - {{ compra.locationName }},
                  {{ compra.departmentOrStateName }}
                </p>
                <p><b>Enviado por:</b> {{ compra.deliveryCompanyName }}</p>
                <p><b>Estado:</b> {{ "Pendiente" }}</p>
              </div>
            </div>
          </div>
          <div class="sm:w-1/3 mt-2">
            <div class="bg-white/70 p-4 text-PRP rounded-xl font-thin">
              <IconsPagos class="w-16 fill-PRP mx-auto pb-4" />
              
              <p><b>SubTotal:</b> {{ formatMoneda(compra.total) }}</p>
                <p>
                  <b>Valor envio:</b> {{ formatMoneda(compra.shippingCost) }}
                </p>
                <p>
                  <b>Total:</b>
                  {{ formatMoneda(compra.total + compra.shippingCost) }}
                </p>
                <p><b>Medio de pago:</b> {{ "---" }}</p>
              
              <div class="mt-6 text-center w-full">
                <NuxtLink
                  class="bg-PRP text-white rounded-lg w-ful px-8 py-2 mx-auto "
                  :to="`/micuenta/${compra.reference}`"
                  >Ver Información</NuxtLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <pre class="text-xs">{{ compras }}</pre> -->
    </div>
  </div>
</template>
