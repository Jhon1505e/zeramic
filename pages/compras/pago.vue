<script setup lang="ts">
const { client } = useClient();
const { total } = useShopping();
const { envio } = useEnvio();

/* async function getToken() {
    try {
        const response: any = await $fetch(`${baseUrl}merchants/${publicKey}`);
        acceptanceToken.value = response.data.presigned_acceptance;
    } catch (error) {
        console.log('response', error);
    }
}
await getToken();
 */

const wompiRef = ref();
const payment = ref();

const amount = computed(() => total.value + (envio.value?.shippingCost || 0));
const datos = computed(() => ({
    nombre: client.value?.fullName || "",
    email: client.value?.email || "",
    documento: client.value?.docId || "",
    tipo_doc: client.value?.docType || "",
    apellido: "",
    telefono: client.value?.phone || "",
}));

const returnPayment = (data: { transaction: any; }) => {
    console.log('data', data);
    payment.value = data.transaction;
}
const openWidget = () => {
    const random = Math.random().toString(36).substring(7);
    wompiRef.value.openWidgetCheckout(random + 'J53A');
}

</script>
<template>
    <div class="bg-PRP h-screen">
        <div class="max-w-3xl mx-auto px-6 pt-10 md:pt-6">
            <ResumenCompra />
        </div>
        <!-- <pre class="text-xs text-white">{{ client }}</pre> -->
        <div class="flex items-center justify-center">
            <NuxtLink to="/compras/envio" class="border px-6 py-2 mt-4 mr-2 bg-white/10 text-white rounded-lg">Seleccionar envio</NuxtLink>
            <button :disabled="!envio" :class="{ 'cursor-not-allowed border-red-700': !envio }" class="border px-6 py-2 mt-4 mr-2 bg-white/10 text-white rounded-lg"
                @click="openWidget">Iniciar Pago</button>
        </div>

        <InfoPagos v-if="payment" v-model="payment" />

        <ClientOnly>
            <WidgetCheckout ref="wompiRef" :amount="amount" :customer="datos" @returnPayment="returnPayment" />
        </ClientOnly>
    </div>
</template>