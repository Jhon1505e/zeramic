<script setup lang="ts">
import type { IClient } from '~/types/clients';

const client = ref<IClient | null>();

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
}
function handleLoginError() {
  console.error("Login failed");
}
</script>

<template>
  <div class="min-h-[40vh] max-w-5xl mx-auto p-5">
    <h1>Mi Cuenta</h1>
    <div class="flex justify-center gap-5 border-b mb-5">
      <div class="border-t border-x rounded-t px-6 py-2">Información de contacto</div>
      <div class="border-t border-x rounded-t px-6 py-2">Mis Pedidos</div>
    </div>
    <GoogleSignInButton
            @success="handleLoginSuccess"
            @error="handleLoginError"
          ></GoogleSignInButton>
    <FormClient v-if="client" v-model="client"></FormClient>
    <form v-else action="" @submit.prevent="getClient">
      <div class="p-10 space-y-3 mx-20">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          class="border p-1 rounded w-full"
          v-model="user.email"
          required
          placeholder="email@example.com"
        />
        <button
          class="bg-PRP mx-auto block rounded p-2 text-white"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>
