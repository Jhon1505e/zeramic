<script setup lang="ts">
const baseUrl = "https://sandbox.wompi.co/v1/";
const publicKey = "pub_test_DMVR3QF8b0wKGNOCFjrqoPqHgevA3Oj7";
const privateKey = "prv_test_S0q1mJqhJg6vC9CwNsO7swobRLkDzXwn";
const acceptanceToken = ref("");
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
    nombre: client.value?.nombre || "",
    email: client.value?.email || "",
    documento: client.value?.docId || "",
    tipo_doc: client.value?.docType || "",
    apellido: "",
    telefono: client.value?.phone || "",
}));

const returnPayment = (data) => {
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
        <TabsCompras />
        <div class="max-w-3xl mx-auto">
            <ResumenCompra />
        </div>
        <!-- <pre class="text-xs text-white">{{ client }}</pre> -->
        <div class="flex items-center justify-center">
            <button class="bg-white/30 border border-PRP text-white px-6 py-2 rounded-lg mt-4"
                @click="openWidget">Iniciar Pago</button>
        </div>

        <InfoPagos v-if="payment" v-model="payment" />

        <ClientOnly>
            <WidgetCheckout ref="wompiRef" :amount="amount" :customer="datos" @returnPayment="returnPayment" />
        </ClientOnly>
    </div>
</template>