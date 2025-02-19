<script setup lang="ts">
const { client } = useAuth();
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
    // handleLoginSuccess({ credential });
  }
})
</script>

<template>
  <div class="bg-PRP h-screen ">
    <Loading v-if="loading" />
    <div class="max-w-2xl mx-auto">
      <h3 class="text-white mt-2 font-extralight">
        Guardamos tu correo electrónico de manera segura para:
      </h3>
      <ul class="mt-2 pl-6 md:pl-0 md:w-2/3 mx-auto">
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
</template>
