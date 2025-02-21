<script setup lang="ts">
const { client } = useAuth();
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
    <div class="bg-PRP">
        <div class="max-w-5xl md:flex gap-2 w-full mx-auto py-10 md:pt-6">
            <div class="w-full md:w-2/3 text-center px-5">
                <div class="text-2xl text-white font-extralight">Información del Cliente</div>
                <div class="grid bg-white/70 text-PRP items-center gap-2 md:grid-cols-2 rounded-lg p-4 mt-4">
                    <div class="leading-5">
                        <p class="font-semibold text-sm">Nombre:</p>
                        <p class="font-thin text-lg">{{ client?.fullName }}</p>
                    </div>
                    <div class="leading-5">
                        <p class="font-semibold text-sm">Email:</p>
                        <p class="font-thin text-lg">{{ client?.email }}</p>
                    </div>
                    <div class="leading-5">
                        <p class="font-semibold text-sm">Tipo de Documento:</p>
                        <p class="font-thin text-lg">{{ client?.docType }}</p>
                    </div>
                    <div class="leading-5">
                        <p class="font-semibold text-sm">Numero de Documento:</p>
                        <p class="font-thin text-lg">{{ client?.docId }}</p>
                    </div>
                    <div class="leading-5">
                        <p class="font-semibold text-sm">Telefono:</p>
                        <p class="font-thin text-lg">{{ client?.phone }}</p>
                    </div>
                    <div class="leading-5">
                        <p class="font-semibold text-sm">Dirección:</p>
                        <p class="font-thin text-lg">{{ client?.address }}</p>
                        <p class="font-thin text-lg">{{ client?.departmentOrStateName }}, {{ client?.locationName }}</p>
                    </div>
                </div>

                <!-- <pre class="text-xs text-white">{{ client }}</pre> -->

                <div class="text-white font-extralight p-2 text-xl text-center">Medios de Pago</div>
                <div class="grid bg-white/70 items-center gap-3 grid-cols-4 rounded-lg p-2">
                    <NuxtImg src="/img/visa.svg" class="w-16 mx-auto" alt="" />
                    <NuxtImg src="/img/mastercard.svg" class="w-16 mx-auto" alt="" />
                    <NuxtImg format="webp" src="/img/amex.svg" class="w-16 mx-auto" alt="" />
                    <NuxtImg format="webp" src="/img/pse.png" class="w-16 mx-auto" alt="" />
                    <NuxtImg src="/img/bancolombia.png" class="w-60 mx-auto" alt="" />
                    <NuxtImg format="webp" src="/img/nequi.png" class="w-28 mx-auto" alt="" />
                    <NuxtImg format="webp" src="/img/daviplata.png" class="w-28 mx-auto" alt="" />
                    <NuxtImg src="/img/supay.svg" class="w-16 mx-auto" alt="" />
                </div>

                <div class="md:flex p-1 text-center justify-between w-full">
                    <div class="flex items-center justify-center flex-col">
                        <NuxtLink to="/compras/envio"
                            class="border px-6 py-2 mt-4 mr-2 bg-white/10 text-white rounded-lg">
                            Envio</NuxtLink>
                    </div>
                    <div>
                        <button :disabled="!envio"
                            class="border-2 w-56 py-2 mx-auto mt-4 bg-PRP font-light text-lg text-white duration-100 hover:font-semibold hover:bg-white/60 hover:text-PRP rounded-lg"
                            :class="{ 'cursor-not-allowed border-red-700': !envio }" @click="openWidget">
                            Iniciar Pago
                        </button>
                    </div>
                </div>
            </div>
            <div class="w-full md:w-1/3 p-4 md:p-0">
                <ComprasResumen />
            </div>
        </div>
        <!-- <pre class="text-xs text-white">{{ client }}</pre> -->


        <InfoPagos v-if="payment" v-model="payment" />

        <ClientOnly>
            <WidgetCheckout ref="wompiRef" :amount="amount" :customer="datos" @returnPayment="returnPayment" />
        </ClientOnly>
    </div>
</template>