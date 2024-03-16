<script setup lang="ts">
import { statesColombia } from "@/utils/datalist";

const { cartProducts } = useShopping();

const dataClient = ref({
  name: "",
  email: "",
  phone: "",
  docType: "",
  docId: "",
  address: "",
  city: "",
  state: "",
});

const message = ref();
const infoGoogle = ref();
const resumen = ref(true);
const pagos = ref(false);

const states = computed(() => Object.keys(statesColombia));

const cities = computed(() => statesColombia[dataClient.value.state]);


async function goToCheckout() {
  console.log(cartProducts.value);
  try {
    const { data, error } = await useFetch("/api/pedidos/insertOne", {
      method: "POST",
      query: {
        ...dataClient.value,
        productos: cartProducts.value,
      },
    });
    console.log("data", data.value);
    console.log("error", error.value);
  } catch (error) {
    console.log(error);
  }
}

async function saveDataClient() {
  const { data, error } = await useFetch("/api/pedidos/insertOne", {
    method: "POST",
    query: {
      ...dataClient.value,
      productos: cartProducts.value,
    },
  });
  message.value = data.value || error.value;
}

async function handleLoginSuccess(response: any) {
  const { credential } = response;
  console.log("Access token: ", credential);
  // hacer fetch al api del servidor nuxt
  // para verificar token con google-auth-library
  // devuelve el email y nombre
  // y consultar en la base de datos
  const { data, error } = await useFetch("/api/googlelogin", {
    method: "POST",
    body: {
      token: credential,
    },
  })
  infoGoogle.value = data.value || error.value;
}
function handleLoginError() {
  console.error("Login failed");
}
</script>

<template>
  <div class="bg-gray-200">
    <div class="flex justify-center gap-32 pt-8 ">
      <div >
        <IconsShopping class="w-10 fill-PRP mx-auto"
        :class="resumen ? 'fill-PRP' : 'fill-gray-400'" />
        <h3 class="text-sm"
        :class="resumen ? 'text-PRP' : 'text-gray-400'">Resumen de compra</h3>
      </div>
      <div >
        <IconsDocument class="w-10  mx-auto" :class="pagos ? 'fill-PRP' : 'fill-gray-400'" />
        <h3 class=" text-sm" :class="pagos ? 'text-PRP' : 'text-gray-400'">Información de envío</h3>
      </div>
    </div>
    <div class="max-w-5xl mx-auto block md:flex gap-6 pb-20 pt-10" v-if="resumen" >
      <div class="w-full md:w-3/5 mx-auto">

        <CartInfo />
      </div>
      <div class="w-full md:w-2/5" v-if="cartProducts.length > 0">
        <div class="text-center bg-white rounded-md  px-10">
          <h1 class="text-2xl font-bold text-gray-500">Valor a Pagar</h1>
          <div class="flex justify-between pt-8">
            <h2 class="text-xl font-normal">Subtotal </h2>
            <h2 class="text-xl font-normal "> $ 21000</h2>
          </div>
          <hr>  
          <div class="flex justify-between py-2">
            <h2 class="text-2xl font-bold">Total </h2>
            <h2 class="text-2xl font-bold "> $ 21000</h2>
          </div>
        </div>
        <button @click="pagos = true ; resumen = false" class="w-full mt-5 bg-gray-600 text-white p-2 rounded-lg">Comprar Ahora</button>
      </div>

    </div>


    <div v-if="pagos">
      <div class="text-center">
        <GoogleSignInButton
          @success="handleLoginSuccess"
          @error="handleLoginError"
        ></GoogleSignInButton>
        <small><pre>{{ infoGoogle }}</pre></small>
      </div>
  
      <div class="text-center p-6">
        <div>PENDIENTE</div>
        <div>{{ message }}</div>
        <div>Formulario de compra Usuario</div>
  
        <div class="flex justify-center gap-3 p-2">
          <input v-model="dataClient.name" type="text" placeholder="Nombre" />
          <input v-model="dataClient.email" type="email" placeholder="Email" />
          <input
            v-model="dataClient.phone"
            type="number"
            placeholder="Telefono"
          />
        </div>
        <div class="flex justify-center gap-3 p-2">
          <select v-model="dataClient.docType">
            <option value="TI">Tarjeta de identidad</option>
            <option value="CC">Cédula</option>
          </select>
          <input
            v-model="dataClient.docId"
            type="number"
            placeholder="Número de ID"
          />
          <input
            v-model="dataClient.address"
            type="text"
            placeholder="Dirección"
          />
        </div>
        <div class="flex justify-center gap-3 p-2">
          <select v-model="dataClient.state">
            <option v-for="state in states" :value="state">{{ state }}</option>
          </select>
          <select v-model="dataClient.city">
            <option v-for="city in cities" :value="city">{{ city }}</option>
          </select>
        </div>
        <div>Medios de Pago - logos - ir a Wompi pasarela</div>
        <!-- @click="goToCheckout" -->
        <button
          @click="saveDataClient"
          class="bg-white/20 border border-white text-white px-6 py-2 mt-6 rounded-lg"
        >
          Comprar
        </button>
      </div>

    </div>
    <ImgRounded class="w-full fill-slate-900" />
  </div>
</template>
