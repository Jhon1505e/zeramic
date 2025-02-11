<script setup lang="ts">
const { user, client, saveClient, getClient } = useClient();
const loading = ref(false);
const pedido = ref(false);

async function handleLoginSuccess(response: any) {
  loading.value = true;
  const { credential } = response;
  //*console.log("Access token: ", credential);
  // hacer fetch al api del servidor nuxt
  // para verificar token con google-auth-library
  // devuelve el email y nombre
  // y consultar en la base de datos
  const body = { token: credential }
  localStorage.setItem("auth", JSON.stringify(body));
  const data = await $fetch("/api/googlelogin", {
    method: "POST",
    body,
  });
  if (!data) {
    localStorage.removeItem("auth");
  }
  client.value = data as any;
  loading.value = false;
}
function handleLoginError() {
  console.error("Login failed");
}
async function saveDataClient() {
  loading.value = true;
  const data = await saveClient()
  if (!data) {
    alert("No se encontro el usuario");
    return;
  }
  console.log('data', data);
  loading.value = false;
}

function closeSession() {
  client.value = null;
  localStorage.removeItem("auth");
}

onMounted(() => {
  const auth = localStorage.getItem("auth");
  if (auth && !client.value) {
    const store = JSON.parse(auth);
    const credential = store.token;
    handleLoginSuccess({ credential });
  }
})
</script>

<template>
  <div class="bg-PRP h-screen">
    <!-- <div class="bg-white/70 text-xs fixed bottom-1 right-1 w-1/2 p-5 z-50">
      <pre>{{ client }}</pre>
    </div> -->
    <Loading v-show="loading" />
    <div class="max-w-6xl mx-auto p-5">
      <div v-if="client" class="md:flex gap-5 h-full px-20 pt-10 pb-32 ">
        <div class="md:w-1/3 bg-black/10 text-white rounded-xl border h-full">
          <h2 class="text-center mt-2">Mi cuenta</h2>

          <div class="flex justify-center mt-4">
            <NuxtImg v-if="client?.picture" :src="client.picture" alt="" class="w-24 h-24 rounded-full" />
            <IconsLogin v-else class="w-24 p-5 rounded-full bg-black/10 text-white"></IconsLogin>
          </div>
          <h1 class="text-center font-thin text-xl px-4 pb-4">

            {{ client.name }}
          </h1>
          <div class="flex flex-col mt-3">
            <button @click="pedido = false"
              class="py-3 hover:bg-white/10 border-y flex gap-2 justify-center">
              <IconsUser class="w-5" /> Mis Datos
            </button>
            <button @click="pedido = true"
              class="py-3 hover:bg-white/10 border-b flex gap-2 justify-center">

              <IconsBag class="w-5" /> Mis Pedidos
            </button>

            <button class="py-3 hover:bg-white/10  flex gap-2 justify-center" @click="closeSession">
              <IconsExit class="w-5 rotate-180" /> Cerrar Sesión
            </button>
          </div>
        </div>
        <div class="w-full bg-black/10 rounded-xl border  overflow-auto h-96" v-if="pedido">
        </div>
        <div v-else class="w-full bg-black/10 rounded-xl mt-10 md:mt-0 p-5 border">
          <FormClient save v-model="client" @submit="saveDataClient" />
        </div>
      </div>
      <div class="md:w-1/2 p-5 mt-2 md:mt-10  mx-auto ">

        <div class="flex justify-center">
          <IconsLogin class="w-24 p-5 rounded-full bg-white/10 fill-white"></IconsLogin>
        </div>
        <h2 class="text-center font-thin mt-2 text-white">
          Ingresa tu correo electrónico
        </h2>
        <FormLogin @success="handleLoginSuccess" @error="handleLoginError" />
      </div>
    </div>
  </div>
</template>
