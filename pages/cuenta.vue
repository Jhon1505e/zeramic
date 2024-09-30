<script setup lang="ts">
import type { IClient } from "~/types/clients";

const client = ref<IClient | null>();
const loading = ref(false);
const pedido = ref(false);
const datos = ref(false);

const user = reactive({
  email: "",
});

const { start, finish } = useLoadingIndicator();

const getClient = async () => {
  start();
  const data = await $fetch<IClient>("/api/client", {
    method: "POST",
    body: user,
  });
  if (!data) {
    alert("No se encontro el usuario");
  } else {
    client.value = data;
  }
  finish();
};

async function handleLoginSuccess(response: any) {
  loading.value = true;
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
  client.value = data as any;
  loading.value = false;
}
function handleLoginError() {
  console.error("Login failed");
}
</script>

<template>
  <div class="bg-PRP h-full">
    <Loading v-if="loading" />
    <div class="max-w-6xl mx-auto p-5">
      <div v-if="client" class="flex gap-5 h-full px-20 pt-10 pb-32 ">
        <div class="w-1/3 bg-black/10 rounded-xl border h-full">
          <h2 class="text-center text-white">Mi cuenta</h2>
          <div class="flex justify-center mt-4">
            <IconsUser
              class="w-24 p-5 rounded-full bg-black/10 text-white"
            ></IconsUser>
          </div>
          <h1 class="text-center text-white font-thin text-xl px-4">
            {{ client.name }}
          </h1>
          <div class="flex flex-col mt-3">
            <button
              class="py-3 text-white hover:bg-white/10 border-y flex gap-2 justify-center"
            >
              <IconsUser class="w-5" /> Mis Datos
            </button>
            <button
              class="py-3 text-white hover:bg-white/10 border-b flex gap-2 justify-center"
            >
              <IconsBag class="w-5" /> Mis Pedidos
            </button>
            <button
              class="py-3 text-white hover:bg-white/10  flex gap-2 justify-center"
            >
              <IconsExit class="w-5 rotate-180" /> Cerrar Sesión
            </button>
          </div>
        </div>
        <div class="w-full bg-black/10 rounded-xl" v-if="pedido">
          <CartInfo />
        </div>
        <div v-else class="w-full bg-black/10 rounded-xl p-5 border" >
      
          <FormClient v-model="client"></FormClient>
        </div>
      </div>
      <div v-else class="md:w-1/2 p-5 mt-14 pb-48 mx-auto">
        <div class="flex justify-center">
          <IconsUser
            class="w-24 p-5 rounded-full bg-white/10 text-white"
          ></IconsUser>
        </div>
        <h2 class="text-center text-white font-thin mt-2">
          Ingresa tu correo electrónico
        </h2>
        <form action="" @submit.prevent="getClient">
          <div class="mt-4 mx-24">
            <input
              id="email"
              type="email"
              class="rounded-xl text-center p-2 w-full border bg-transparent text-white"
              v-model="user.email"
              required
              placeholder="email@example.com"
            />
            <button
              class="border w-full bg-white/20 mx-auto block mt-4 rounded-xl p-2 text-white"
              type="submit"
            >
              Ingresar
            </button>
          </div>
          <h2 class="text-center text-white font-thin text-sm mt-3">
            No tienes una cuenta? <strong>Registrarse</strong>
          </h2>
          <div class="flex justify-center mt-4">
            <GoogleSignInButton
              @success="handleLoginSuccess"
              @error="handleLoginError"
            ></GoogleSignInButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
