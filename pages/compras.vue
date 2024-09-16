<script setup lang="ts">
import { statesColombia } from "@/utils/datalist";
import { type IClient }  from "~/types/clients"

const { cartProducts } = useShopping();

const dataClient = ref<IClient>({
  _id: undefined,
  name: "",
  email: "",
  picture: "",
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
  /* const { data, error } = await useFetch("/api/pedidos/insertOne", {
    method: "POST",
    query: {
      ...dataClient.value,
      productos: cartProducts.value,
    },
  });
  message.value = data.value || error.value; */
  const data = await $fetch("/api/clientes/update", {
    method: "POST",
    body: dataClient.value,
  })

  console.log(data);
}

async function handleLoginSuccess(response: any) {
  const { credential } = response;
  console.log("Access token: ", credential);
  // hacer fetch al api del servidor nuxt
  // para verificar token con google-auth-library
  // devuelve el email y nombre
  // y consultar en la base de datos
  const data = await $fetch("/api/googlelogin", {
    method: "POST",
    body: {
      token: credential,
    },
  });
  dataClient.value = data as any;
  pagos.value = true;
  resumen.value = false;
  login.value = false;
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
            <IconsShopping
              :class="resumen ? 'fill-white ' : 'fill-green-500 '"
            />
          </div>

          <h3
            class="text-sm font-semibold mt-4 ml-2"
            :class="resumen ? 'text-white' : 'text-green-500 '"
          >
            RESUMEN DE COMPRA
          </h3>
        </div>
      </button>
      <div class="flex pt-4 gap-3">
        <IconsCircle
          class="w-4 mt-2"
          :class="resumen ? 'fill-white' : 'fill-green-500'"
        />
        <div
          class="h-1 w-32 rounded-full mt-5"
          :class="resumen ? 'bg-gray-400' : login ? 'bg-white' : 'bg-green-500'"
        ></div>
        <IconsCircle
          class="w-4 mt-2"
          :class="
            resumen ? 'fill-gray-400' : login ? 'fill-white' : 'fill-green-500'
          "
        />
        <div
          class="bg-white h-1 w-32 rounded-full mt-5"
          :class="pagos ? 'bg-white' : 'bg-gray-400'"
        ></div>
        <IconsCircle
          class="w-4 mt-2"
          :class="pagos ? 'fill-white' : 'fill-gray-400'"
        />
      </div>
      <button
        @click="
          resumen = false;
          pagos = false;
          login = true;
        "
      >
        <div class="flex gap-2">
          <div class="text-lg w-10 text-PRP h-10 rounded-full pt-1.5 mt-2">
            <IconsMoney :class="!pagos ? 'fill-gray-400 ' : 'fill-white'" />
          </div>

          <h3
            class="text-sm font-semibold mt-2 ml-1"
            :class="pagos ? 'text-white' : 'text-gray-400'"
          >
            ENVÍO Y PAGO
          </h3>
        </div>
      </button>
    </div>
    
    {{ dataClient }}

    <div
      class="mx-auto max-w-6xl block md:flex gap-6 pb-20 pt-4"
      v-if="resumen"
    >
      <div class="w-full md:w-3/4 px-4 md:px-0 mx-auto">
        <CartInfo />
      </div>
      <div class="w-full md:w-1/3" v-if="cartProducts.length > 0">
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
      <div class="max-w-5xl text-center mx-auto pb-10">
        <h1 class="text-2xl font-thin text-white">
          Ingresa tu correo electrónico para continuar la compra.
        </h1>
        <div class="text-center mt-4">
          <GoogleSignInButton
            @success="handleLoginSuccess"
            @error="handleLoginError"
          ></GoogleSignInButton>
        </div>
        <form>
          <input
            type="text"
            required
            class="py-2 px-4 w-1/2 rounded-xl"
            placeholder="Ingresa tu correo"
          />
          <button
            type="submit"
            @click="
              login = false;
              pagos = true;
              resumen = false;
            "
            class="bg-white/30 border border-white ml-2 text-white px-6 py-2 mt-6 rounded-lg"
          >
            Continuar
          </button>
        </form>
        <div class="w-full px-6 md:px-0 md:w-1/2 mx-auto">
          <h3 class="text-white mt-4 font-extralight">
            Guardamos tu correo electrónico de manera segura para:
          </h3>
          <ul class="mt-2 w-2/3 mx-auto">
            <li class="text-white flex font-thin">
              <IconsCheck class="w-4 mr-2 fill-green-600" />
              Identificar su perfil
            </li>
            <li class="text-white flex font-thin">
              <IconsCheck class="w-4 mr-2 fill-green-600" />
              Guardar el historial de compras
            </li>
            <li class="text-white flex font-thin">
              <IconsCheck class="w-4 mr-2 fill-green-600" />
              Facilitar el proceso de compras
            </li>
            <li class="text-white flex font-thin">
              <IconsCheck class="w-4 mr-2 fill-green-600" />
              Notificar sobre los estados de su compra
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="pagos">
      <div class="text-center max-w-3xl mx-auto pb-6">
        <div>{{ message }}</div>
        <h2 class="text-3xl mb-3 font-bold text-white">
          Completa el formulario
        </h2>

        <form @submit.prevent="saveDataClient">
          <div class="flex justify-center gap-3 p-2">
            <input
              v-model="dataClient.name"
              type="text"
              required
              class="w-1/2 py-2 px-4 rounded-lg text-gray-600"
              placeholder="Nombres y Apellidos"
            />
            <input
              v-model="dataClient.email"
              required
              type="email"
              class="w-1/2 py-2 px-4 rounded-lg text-gray-600"
              placeholder="Correo Electrónico"
            />
          </div>
          <div class="flex justify-center gap-3 p-2">
            <input
              v-model="dataClient.phone"
              required
              type="number"
              class="w-1/2 py-2 px-4 rounded-lg text-gray-600"
              placeholder="Celular"
            />
            <select
              v-model="dataClient.docType"
              required
              class="w-1/2 py-2 px-4 rounded-lg text-gray-600"
            >
              <option value="">Tipo de Documento</option>
              <option value="TI">Tarjeta de identidad</option>
              <option value="CC">Cédula</option>
            </select>
            <input
              v-model="dataClient.docId"
              required
              type="number"
              class="w-1/2 py-2 px-4 rounded-lg text-gray-600"
              placeholder="Número de Documento"
            />
          </div>
          <div class="flex justify-center gap-3 p-2">
            <input
              required
              v-model="dataClient.address"
              type="text"
              class="w-1/2 py-2 px-4 rounded-lg"
              placeholder="Dirección"
            />
            <select
              v-model="dataClient.state"
              required
              class="w-1/2 py-2 px-4 rounded-lg text-gray-600"
            >
              <option value="">Departamento</option>
              <option v-for="state in states" :value="state">
                {{ state }}
              </option>
            </select>
            <select
              required
              v-model="dataClient.city"
              class="w-1/2 py-2 px-4 rounded-lg text-gray-600"
            >
              <option value="">Ciudad</option>
              <option v-for="city in cities" :value="city">{{ city }}</option>
            </select>
          </div>
          <hr class="mt-6 opacity-20" />
          <div>
            <h2 class="text-xl font-thin text-white">Metodos de Pago:</h2>
            <div class="flex justify-center gap-8">
              <img src="/img/bancolombia.svg" class="w-32 invert" alt="" />
              <img src="/img/nequi-2.svg" class="w-20" alt="" />
              <img src="/img/pse.svg" class="w-10" alt="" />
              <IconsEfectivo class="w-10" />
            </div>
          </div>

          <!-- @click="goToCheckout" -->
          <button
            type="submit"
            class="bg-white/20 border border-white text-white px-6 py-2 mt-6 rounded-lg"
          >
            Ir a Pagar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
