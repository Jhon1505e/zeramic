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
const login = ref(false);
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
  });
  infoGoogle.value = data.value || error.value;
}
function handleLoginError() {
  console.error("Login failed");
}
</script>

<template>
  <div class="bg-PRP">
    <div class="flex justify-center gap-10 py-4">
      <button
        @click="
          resumen = true;
          pagos = false;
        "
      >
        <div class="flex gap-2">
          <div class="text-lg text-PRP w-10 h-10 rounded-full pt-1.5 mt-2">
            <IconsShopping :class="resumen ? 'fill-white ' : 'fill-gray-400'" />
          </div>

          <h3
            class="text-sm font-normal mt-4 ml-2"
            :class="resumen ? 'text-white' : 'text-gray-400'"
          >
            RESUMEN DE COMPRA
          </h3>
        </div>
      </button>
      <div></div>
      <button
        @click="
          resumen = false;
          pagos = false;
          login = true
        "
      >
        <div class="flex gap-2">
          <div class="text-lg w-10 text-PRP h-10 rounded-full pt-1.5 mt-2">
            <IconsDocument :class="!pagos ? 'fill-gray-400 ' : 'fill-white'" />
          </div>

          <h3
            class="text-sm font-normal mt-4"
            :class="pagos ? 'text-white' : 'text-gray-400'"
          >
            ENVÍO Y PAGO
          </h3>
        </div>
      </button>
    </div>
    <div
      class="mx-auto max-w-6xl block md:flex gap-6 pb-20 pt-4"
      v-if="resumen"
    >
      <div class="w-full md:w-3/4 px-4 md:px-0">
        <CartInfo />
      </div>
      <div class="w-full md:w-1/3">
        <div class="bg-purple-900/20 rounded-xl text-white w-full">
          <h2 class="text-white font-normal text-center">Resumen del pedido</h2>
          <div class="px-6 pb-4">
            <div class="flex justify-between">
              <h3 class="font-thin">Productos</h3>
              <h3 class="font-extralight">
                {{ cartProducts.length }} productos
              </h3>
            </div>
            <div class="flex justify-between">
              <h3 class="font-thin">Subtotal</h3>
              <h3 class="font-extralight">Subtotal</h3>
            </div>
            <hr class="opacity-50 mt-4 mb-1" />
            <div class="flex justify-between">
              <h3>Total</h3>
              <h3>12.0000</h3>
            </div>
          </div>
        </div>
        <div>
          <button
            @click="(login = true), (resumen = false), (pagos = false)"
            class="bg-white/30 border border-white text-white px-6 py-2 mt-6 rounded-lg w-full"
          >
            Confirmar compra
          </button>
        </div>
      </div>
    </div>

    <div v-if="login">
      <div class="max-w-6xl text-center mx-auto py-10">
        <h1 class="text-2xl font-thin text-white">
          Ingresa tu correo electrónico para continuar la compra.
        </h1>
        <input
          type="text"
          class="mt-2 p-2 w-1/2 rounded-xl text-center"
          placeholder="Ingresa tu correo"
        />
        <button @click="login = false, pagos = true" class="bg-white/30 border border-white ml-2 text-white px-6 py-2 mt-6 rounded-lg">Continuar</button>
        <div class="w-full px-6 md:px-0 md:w-1/2 mx-auto">
        <h3 class="text-white mt-4 font-extralight">
          Guardamos tu correo electrónico de manera segura para:
        </h3>
          <ul class=" mt-2 w-3/5 mx-auto">
            <li class="text-white flex font-thin">
              <IconsCheck class="w-4 mr-2 " />
              Identificar su perfil
            </li>
            <li class="text-white flex font-thin">
              <IconsCheck class="w-4 mr-2 " />
              Guardar el historial de compras
            </li>
            <li class="text-white flex font-thin">
              <IconsCheck class="w-4 mr-2 " />
              Facilitar el proceso de compras
            </li>
            <li class="text-white flex font-thin">
              <IconsCheck class="w-4 mr-2 " />
              Notificar sobre los estados de su compra
            </li>
           
          </ul>
          
        </div>
        <button></button>
      </div>
    </div>

    <div v-if="pagos">
      <!--  <div class="text-center">
        <GoogleSignInButton
          @success="handleLoginSuccess"
          @error="handleLoginError"
        ></GoogleSignInButton>
        <small>
          <pre>{{ infoGoogle }}</pre>
        </small>
      </div> -->

      <div class="text-center max-w-3xl mx-auto p-6">
        <div>{{ message }}</div>
        <h2 class="text-3xl mb-3 font-bold text-white">Completa el formulario</h2>

        <div class="flex justify-center gap-3 p-2 ">
          <input v-model="dataClient.name" type="text" class="w-1/2 py-2 px-4 rounded-lg" placeholder="Nombres y Apellidos" />
          <input v-model="dataClient.email" type="email" class="w-1/2 py-2 px-4 rounded-lg" placeholder="Correo Electrónico" />
        </div>
        <div class="flex justify-center gap-3 p-2">
          <input
            v-model="dataClient.phone"
            type="number"
            class="w-1/2 py-2 px-4 rounded-lg"
            placeholder="Telefono"
          />
          <select v-model="dataClient.docType" class="w-1/2 py-2 px-4 rounded-lg" >
            <option value="TI">Tarjeta de identidad</option>
            <option value="CC">Cédula</option>
          </select>
          <input
            v-model="dataClient.docId"
            type="number"
            class="w-1/2 py-2 px-4 rounded-lg"
            placeholder="Número de ID"
          />
        </div>
        <div class="flex justify-center gap-3 p-2">
          <input
            v-model="dataClient.address"
            type="text"
            class="w-1/2 py-2 px-4 rounded-lg"
            placeholder="Dirección"
          />
          <select v-model="dataClient.state" class="w-1/2 py-2 px-4 rounded-lg">
            <option v-for="state in states" :value="state">{{ state }}</option>
          </select>
          <select v-model="dataClient.city" class="w-1/2 py-2 px-4 rounded-lg">
            <option v-for="city in cities" :value="city">{{ city }}</option>
          </select>
        </div>
        <!-- <div>Medios de Pago - logos - ir a Wompi pasarela</div> -->
        <!-- @click="goToCheckout" -->
        <button
          @click="saveDataClient"
          class="bg-white/20 border border-white text-white px-6 py-2 mt-6 rounded-lg"
        >
          Ir a Pagar
        </button>
      </div>
    </div>
  </div>
</template>
