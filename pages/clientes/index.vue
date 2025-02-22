<script lang="ts" setup>
const init = {
  fullName: '',
  email: '',
  password: '',
}
const user = reactive({ ...init });
const newUser = ref(false);
const reset = ref(false);
const loading = ref(false);
const message = ref('');

const { login, signup, resetPassword } = useAuth();

async function handleSubmit() {
  message.value = 'Loading...';
  loading.value = true;

  if (newUser.value) {
    const data = await signup(user);
    console.log(data);
    message.value = data?.message || '';
    newUser.value = false;
    loading.value = false;
    return;
  }

  if (reset.value) {
    const data = await resetPassword(user);
    console.log(data);
    message.value = data?.message || 'Mensaje enviado con nueva contraseña';
    Object.assign(user, init);
    reset.value = false;
    loading.value = false;
    return;
  }

  const data = await login(user);
  console.log(data);
  message.value = data?.message || '';
  loading.value = false;
}

</script>

<template>
  <div class="bg-PRP flex items-center justify-center pt-4 pb-20">
    <Loading v-if="loading" />
    <div class="bg-white/80 border p-6 rounded-lg shadow-lg w-full max-w-md m-6">
      <IconsLogin class="w-28 fill-PRP mx-auto" />
      <h2 class="text-xl text-PRP font-semibold text-center">
        {{ newUser ? 'Crea una cuenta' : 'Inicia sesión' }}
      </h2>
      <p v-if="message" class="text-center text-xs font-semibold text-amber-600 bg-orange-100 p-1 rounded-sm">{{ message
        }}</p>

      <form @submit.prevent="handleSubmit" class="space-y-2">

        <div v-if="newUser">
          <label for="fullName" class="block text-sm font-medium text-PRP">Nombre Completo</label>
          <input id="fullName" type="text" v-model="user.fullName"
            class="w-full px-3 py-2 border border-PRP bg-white rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Ingrese su nombre" required />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-PRP">Correo Electrónico</label>
          <input id="email" type="email" v-model="user.email"
            class="w-full px-3 py-2 mt-1 border border-PRP bg-white rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Ingresa el email" required />
          <div v-if="newUser" class="text-sm p-1 pt-2 flex w-full text-end justify-end">
            <input type="checkbox" required id="checkbox" class="mr-2" />
            <label for="checkbox">
              Acepto los <NuxtLink to="/" class="text-indigo-600 underline">Terminos y condiciones</NuxtLink>
            </label>
          </div>
        </div>

        <div v-if="!newUser">
          <label for="password" class="block text-sm font-medium text-PRP">Contraseña</label>
          <input v-if="!reset" id="password" type="password" v-model="user.password"
            class="w-full px-3 py-2 border mt-1 border-PRP bg-white rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            :class="reset ? 'bg-gray-200' : ''" placeholder="Ingresa la contraseña" />
          <input v-else type="text" class="w-full px-3 py-2 border border-PRP bg-white rounded-lg "
            placeholder="(crear nueva)" disabled />
          <div class="text-sm p-1 pt-2 w-full text-end flex justify-end">
            <input type="checkbox" v-model="reset" id="checkbox" class="mr-2" />
            <label for="checkbox">
              Si olvido la contraseña
            </label>
          </div>
        </div>

        <button type="submit"
          class="w-full bg-PRP text-white py-2 rounded-lg hover:bg-PRP/80 focus:ring focus:ring-green-300">
          {{ newUser ? 'Registrarse' : reset ? 'Enviar contraseña' : 'Ingresar' }}
        </button>
      </form>

      <p class="text-center text-sm mt-2">
        ¿{{ newUser ? 'Ya tienes una cuenta' : 'Primera vez' }}?
        <button type="button" class="text-indigo-600 underline" @click="newUser = !newUser">
          {{ newUser ? 'Ingresar' : 'Crea una cuenta' }}
        </button>
      </p>

    </div>
  </div>
</template>
