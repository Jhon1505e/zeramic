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

const states = computed(() => Object.keys(statesColombia));

const cities = computed(() => statesColombia[dataClient.value.state]);

async function goToCheckout() {
  console.log(cartProducts.value);
  try {
    const { data, error } = await useFetch("/api/insertone", {
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
  const { data, error } = await useFetch("/api/insertone", {
    method: "POST",
    query: {
      ...dataClient.value,
      productos: cartProducts.value,
    },
  });
  message.value = data.value || error.value;
}

function handleLoginSuccess(response: any) {
  const { credential } = response;
  console.log("Access token: ", credential);
  // hacer fetch al api del servidor nuxt
  // para verificar token con google-auth-library
  // devuelve el email y nombre
  // y consultar en la base de datos
}
function handleLoginError() {
  console.error("Login failed");
}
</script>

<template>
  <div class="bg-PRP">
    <h2 class="text-center text-white text-4xl">Carrito de compras</h2>
    <div class="w-full flex justify-evenly p-4">
      tabs
      <button>Resumen de compra</button>
      <button>Información de envío</button>
      <button>Ir a pagos</button>
    </div>
    <hr />

    <CartInfo />

    <hr class="my-4" />
    <div class="text-center">
      <GoogleSignInButton
        @success="handleLoginSuccess"
        @error="handleLoginError"
      ></GoogleSignInButton>
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

    <ImgRounded class="w-full fill-slate-900" />
  </div>
</template>
