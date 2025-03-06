<script setup lang="ts">
const { signup, login, resetPassword } = useAuth();
const emit = defineEmits(['success', 'error']);

const newUser = ref(false);
const reset = ref(false);
const viewPass = ref(false);
const message = ref('');
const user = reactive({
  fullName: "",
  email: "",
  password: "",
});

async function handleSubmit() {
  message.value = 'Loading...';
  if (newUser.value) {
    message.value = await signup(user);
    newUser.value = false;
    return;
  }
  if (reset.value) {
    message.value = await resetPassword(user.email);
    reset.value = false;
    return;
  }
  message.value = await login(user) || '';
}
</script>
<template>
  <div class="bg-white border p-6 rounded-lg shadow-lg w-full max-w-md md:m-0">
    <IconsLogin class="w-28 mx-auto fill-PRP" />
    <h2 class="text-2xl text-PRP font-semibold text-center">
      {{ newUser ? 'Crea una cuenta' : 'Inicia sesión' }}
    </h2>

    <div class="flex justify-center py-2 w-full">
      <GoogleSignInButton state-cookie-domain="localhost" @success="emit('success', $event)"
        @error="emit('error', $event)" />
    </div>

    <p v-if="message" class="text-center text-xs font-semibold text-amber-600 bg-orange-100 p-1 rounded-sm">
      {{ message }}
    </p>

    <form @submit.prevent="handleSubmit" class="space-y-2">

      <div v-if="newUser">
        <label for="fullName" class="block text-sm font-medium text-PRP">Nombre Completo</label>
        <input id="fullName" type="text" v-model="user.fullName"
          class="w-full px-3 py-2 border rounded-lg border-PRP pl-4 mt-1 focus:outline-none focus:ring focus:ring-green-300"
          placeholder="Ingrese su nombre" required />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-PRP">Correo Electrónico</label>
        <input id="email" type="email" v-model="user.email"
          class="w-full px-3 py-2 border border-PRP rounded-lg bg-white pl-4 mt-1 focus:outline-none focus:ring focus:ring-green-300"
          placeholder="Ingresa el email" required />
        <div v-if="newUser" class="text-sm p-1 pt-2 flex w-full text-end justify-end">
          <input type="checkbox" required id="checkbox" class="mr-2" />
          <label for="checkbox" class="cursor-pointer">
            Acepto los <NuxtLink to="/" class="text-indigo-600 underline">Terminos y condiciones</NuxtLink>
          </label>
        </div>
      </div>

      <div v-if="!newUser">
        <label for="password" class="block text-sm font-medium text-PRP">Contraseña</label>
        <div v-if="!reset" class="relative">
          <input id="password" :type="viewPass ? 'text' : 'password'" v-model="user.password"
            class="w-full px-3 py-2 border border-PRP rounded-lg bg-white pl-4 mt-1 focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Ingresa la contraseña" required />
          <UButton icon="i-heroicons-eye" variant="soft" v-if="!viewPass" color="indigo" @click="viewPass = !viewPass"
            class="absolute right-1 bottom-1" />
          <UButton icon="i-heroicons-eye-slash" variant="soft" v-else color="indigo" @click="viewPass = !viewPass"
            class="absolute right-1 bottom-1" />
        </div>
        <input v-if="reset" type="text" class="w-full px-3 py-2 border border-gray-300 pl-4 mt-1 rounded-lg bg-gray-300"
          placeholder="(crear nueva)" disabled />
        <div class="text-sm p-1 pt-2 w-full text-end flex justify-end">
          <input type="checkbox" v-model="reset" id="checkbox" class="mr-2" />
          <label for="checkbox" class="cursor-pointer">
            Si olvidó su contraseña
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
</template>