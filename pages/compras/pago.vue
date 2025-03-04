<script setup lang="ts">
const { client } = useAuth();
const { total, cartProducts } = useShopping();
const { envio } = useEnvio();
const { saveCompra } = useCompras();
const wompiRef = ref();
const payment = ref();
const modal = ref(false);
const route = useRoute();

const amount = computed(() => total.value) // + (envio.value?.shippingCost || 0));
const datos = computed(() => ({
  nombre: client.value?.fullName || "",
  email: client.value?.email || "",
  documento: client.value?.docId || "",
  tipo_doc: client.value?.docType || "",
  apellido: "",
  telefono: client.value?.phone || "",
}));

const returnPayment = (data: { transaction: any }) => {
  payment.value = data.transaction;
  modal.value = true
};

const startPayment = async () => {
  let reference = crypto.randomUUID();
  if (!client.value) return;
  const { fullName,
    email,
    address,
    infoDirection,
    locationCode,
    departmentOrStateName,
    phone,
    locationName } = client.value;
  const data = await saveCompra({
    reference,
    fullName,
    email,
    address,
    infoDirection,
    locationCode,
    departmentOrStateName,
    phone: `${phone}`,
    locationName,
    ...envio.value,
    total: total.value,
    productos: cartProducts.value,
  })
  wompiRef.value.openWidgetCheckout(reference);
};

const isProd = process.env.NODE_ENV === 'production';

const getPayment = async (id: string) => {
  try {
    const url = isProd ? 'production' : 'sandbox'
    const data: any = await $fetch(`https://${url}.wompi.co/v1/transactions/${id}`);
    return data.data
  } catch (error) {
    console.log(error);
    return
  }
}

if (route.query.id) {
  payment.value = await getPayment(`${route.query.id}`);
  modal.value = true
}

</script>
<template>
  <div class="bg-PRP">
    <div class="max-w-5xl md:flex gap-2 w-full mx-auto py-10 md:pt-6 ">
      <div class="w-full md:w-2/3 text-center px-5">
        <div class="text-2xl bg-white rounded-lg py-2 font-extralight">
          <div class="text-PRP font-semibold text-2xl"> Información del Cliente</div>

          <div class="grid text-PRP items-center gap-2 md:grid-cols-2 pt-3">
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
              <p class="font-semibold text-sm">Número de Documento:</p>
              <p class="font-thin text-lg">{{ client?.docId }}</p>
            </div>
            <div class="leading-5">
              <p class="font-semibold text-sm">Teléfono:</p>
              <p class="font-thin text-lg">{{ client?.phone }}</p>
            </div>
            <div class="leading-5">
              <p class="font-semibold text-sm">Dirección:</p>
              <p class="font-thin text-lg">{{ client?.address }}</p>
              <p class="font-thin text-lg">
                {{ client?.departmentOrStateName }}, {{ client?.locationName }}
              </p>
            </div>
          </div>
        </div>
        <!-- <pre class="text-xs text-white">{{ client }}</pre> -->
        <div class="mt-4">
          <!-- <ComprasResumen /> -->
          <div class="bg-white rounded-lg p-2 font-extralight text-xl text-center">
            <div class="text-PRP text-xl font-semibold">Medios de Pago</div>
            <div class="grid items-center gap-2 grid-cols-4 p-2">
              <NuxtImg src="/img/visa.svg" class="w-16 mx-auto" alt="" />
              <NuxtImg src="/img/mastercard.svg" class="w-16 mx-auto" alt="" />
              <NuxtImg format="webp" src="/img/amex.png" class="w-16 mx-auto" alt="" />
              <NuxtImg format="webp" src="/img/pse.png" class="w-16 mx-auto" alt="" />
              <NuxtImg src="/img/bancolombia.png" class="w-60 mx-auto" alt="" />
              <NuxtImg format="webp" src="/img/nequi.png" class="w-28 mx-auto" alt="" />
              <NuxtImg format="webp" src="/img/daviplata.png" class="w-28 mx-auto" alt="" />
              <NuxtImg src="/img/supay.svg" class="w-16 mx-auto" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="w-full px-5 mt-6 sm:mt-0 md:w-1/3  md:p-0">
        <ComprasResumen />

        <div class="text-center justify-between w-full mt-4">
          <div class="flex flex-col">
            <NuxtLink to="/compras/envio" class="border px-6 py-2 mt-4 mr-2 w-full bg-white/10 text-white rounded-lg">
              Cambiar Datos Envio</NuxtLink>
          </div>
          <div>
            <button :disabled="!envio"
              class="border-2 w-full py-2 mx-auto mt-4 bg-PRP font-light text-lg text-white duration-100 hover:font-semibold hover:bg-white/60 hover:text-PRP rounded-lg"
              :class="{ 'cursor-not-allowed border-red-700': !envio }" @click="startPayment">
              Iniciar Pago
            </button>
          </div>
        </div>
      </div>
    </div>

    <UModal v-model="modal">
      <InfoPagos :transaction="payment" />
    </UModal>

    <ClientOnly>
      <WidgetCheckout ref="wompiRef" :amount="amount" :customer="datos" @returnPayment="returnPayment" />
    </ClientOnly>
  </div>
</template>
