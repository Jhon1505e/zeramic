<script setup lang="ts">
defineProps({
  compra: Object as () => any,
});
const nopadding = { padding: "" };
const ui = {
  body: nopadding,
  header: nopadding,
  footer: nopadding,
  background: "bg-white/70",
};
</script>

<template>
  <UCard :ui="ui" class="hover:bg-white/80">
    <NuxtLink
      class="md:flex py-2 w-full items-center"
      :to="`/micuenta/${compra.reference}`"
    >
      <div class="md:w-2/3 w-full space-y-1 font-thin text-PRP px-6">
        <p><b>Cantidad: </b> {{ compra?.productos.length }} Productos</p>
        <p><b>Fecha: </b> {{ formatFecha(compra?.date) }}</p>
        <p>
          <b>Dirección:</b> {{ compra?.address }} -
          {{ compra?.locationName }},{{ compra?.departmentOrStateName }}
        </p>
        <div>
          <b>Estado: </b>
          <UBadge class="ml-2" :color="COLORS[compra?.wompi?.status] || 'cyan'">
            {{ compra?.wompi?.status || "NUEVA" }}
          </UBadge>
        </div>
      </div>

      <div class="sm:w-1/3 w-full py-1 text-PRP font-thin border-l border-PRP/30 px-6">
        <!-- <IconsPagos class="w-16 fill-PRP mx-auto pb-4" /> -->
        <div class="grid grid-cols-2 md:text-end">
          <b>SubTotal:</b>
          <span>{{ formatMoneda(compra?.total) }}</span>
          <b>Valor envio:</b>
          <span> {{ formatMoneda(compra?.shippingCost) }}</span>
          <b>Total:</b>
          <span>{{ formatMoneda(compra?.total + compra?.shippingCost) }}</span>
        </div>
      </div>
    </NuxtLink>
  </UCard>
</template>
