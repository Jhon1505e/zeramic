<script setup lang="ts">
const { client } = useClient();
const loading = ref(false);

async function handleLoginSuccess(response: any) {
  loading.value = true;
  const { credential } = response;
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
  <div class="bg-PRP pb-32">
    <Loading v-if="loading" />
    <TabsCompras />
    <div class="max-w-5xl mx-auto">
      <div v-if="!client" class="max-w-5xl mx-auto">
        <div class="text-center pt-10 ">
          <div>
            <h1 class="text-2xl font-semibold text-white">
              Ingresa tu correo electrónico para continuar la compra.
            </h1>
            <div class="text-center mt-8">
              <FormLogin @success="handleLoginSuccess" @error="handleLoginError" />
            </div>
          </div>
          <div class="w-full px-6 md:px-0 md:w-1/2 mx-auto">
            <h3 class="text-white mt-4 font-extralight">
              Guardamos tu correo electrónico de manera segura para:
            </h3>
            <ul class="mt-2 w-2/3 mx-auto">
              <li class="text-white flex font-thin">
                <IconsCheck class="w-4 mr-2 fill-green-600" />
                Identificar su perfil.
              </li>
              <li class="text-white flex font-thin">
                <IconsCheck class="w-4 mr-2 fill-green-600" />
                Guardar el historial de compras.
              </li>
              <li class="text-white flex font-thin">
                <IconsCheck class="w-4 mr-2 fill-green-600" />
                Facilitar el proceso de compras.
              </li>
              <li class="text-white flex font-thin">
                <IconsCheck class="w-4 mr-2 fill-green-600" />
                Notificar sobre los estados de su compra.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <FormClient v-else v-model="client" />
    </div>
  </div>
</template>
