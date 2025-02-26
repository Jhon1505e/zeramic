<script setup lang="ts">
const { client } = useAuth();
const compras = ref();

const { getCompras } = useCompras();

compras.value = await getCompras({ email: client.value?.email });
</script>
<template>
    <div class="md:flex gap-4 max-w-5xl mx-auto p-5">
        <CuentaNavInfo />
        <div class="w-full space-y-2">
            <div class="text-white p-1 text-2xl">
                Mis Compras
            </div>
            <div v-for="compra in compras" :key="compra.uuid" class="border p-2 rounded">
                <div class="py-2 flex p-1 text-gray-300 gap-2 rounded">
                    <div class="w-2/3">
                        <span v-for="prod in compra.productos" :key="prod.uuid">
                            {{ prod.cantidad }}. {{ prod.producto }},
                        </span>
                        <p>Direccion: {{ compra.address }} - {{ compra.locationName }}, {{ compra.departmentOrStateName
                            }}
                        </p>
                        <p>Enviado por: {{ compra.deliveryCompanyName }}
                        </p>
                        <p>Estado: {{ 'Pendiente' }}
                        </p>
                    </div>
                    <div class="w-1/3">
                        <p>Valor envio: {{ formatMoneda(compra.shippingCost) }}
                        </p>
                        <p>SubTotal: {{ formatMoneda(compra.total) }}
                        </p>
                        <p>Total: {{ formatMoneda(compra.total + compra.shippingCost) }}
                        </p>
                        <p>Medio de pago: {{ '---' }}
                        </p>
                    </div>
                </div>
                <div>
                    <NuxtLink class="bg-white rounded-lg mt-1 px-2 py-1" :to="`/micuenta/${compra.reference}`">Ver
                        Infortmacion</NuxtLink>
                </div>
            </div>

            <!-- <pre class="text-xs">{{ compras }}</pre> -->

        </div>
    </div>
</template>