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

onMounted(async () => {
  const auth = localStorage.getItem("auth");
  if (auth && !client.value) {
    const store = JSON.parse(auth);
    const credential = store.token;
    // handleLoginSuccess({ credential });
  }
})

</script>

<template>
  <div class="flex flex-col items-center justify-center max-w-5xl mx-auto pb-10">
    <Loading v-if="loading" />
    <div v-if="!client">
      <FormLogin />
      <div class="max-w-2xl mx-auto">
        <h3 class="text-white mt-2 pl-6 pr-4 md:pr-0 md:pl-0 font-extralight">
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
    <div v-else class="w-full p-4 space-y-2">
      <h1 class="text-2xl text-white font-extralight">
        ¡Hola, {{ client.fullName }}!
      </h1>
      <div class="md:flex justify-between md:items-center">
        <p class="text-white">Información de envio nacionales, confirmar dirección de entrega</p>
        <div class="my-6 sm:my-2">

          <NuxtLink to="/micuenta" class="bg-white/10 border    shadow text-center text-white px-6 py-2  rounded-lg">
            Actualizar Datos
          </NuxtLink>
        </div>

      </div>
      <div class="w-full grid md:grid-cols-3 gap-1 py-4 mt-3 px-6 border font-light text-PRP rounded-lg bg-white shadow">
        <div><b>Email:</b> {{ client.email }}</div>
        <div><b>Teléfono:</b> {{ client.phone }}</div>
        <div><b>Departamento:</b> {{ client.departmentOrStateName }}</div>
        <div><b>Ciudad:</b> {{ client.locationName }}</div>
        <div><b>Dirección:</b> {{ client.address }}</div>
        <div><b>Información adicional:</b> {{ client.infoDirection }}</div>
        
      </div>



      <div class="md:flex gap-5 space-y-2 w-full">
        <div class="w-full md:w-2/3 bg-white rounded-lg mt-2">
          <h3 class="text-PRP font-semibold text-center w-full">Elige el proveedor de envios de tu preferencia:</h3>
          <ComprasEnvio />
        </div>
        <ComprasResumen class="w-full md:w-1/3" />
      </div>

      <!-- <pre class="text-xs">{{ client }}</pre> -->
    </div>
  </div>
</template>
