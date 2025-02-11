<script lang="ts" setup>

const init = {
  fullName: '',
  email: '',
  password: '',
}
const user = reactive({ ...init });
const newUser = ref(false);
const reset = ref(false);
const message = ref('');

const { login } = useAuth();

async function handleSubmit() {
  message.value = 'Loading...';
  
  if(newUser.value) {
    const data = await $fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(user),
    });
    console.log(data);
    message.value = data?.message || '';
    return;
  }

  if(reset.value) {
    const data = await $fetch('/api/auth/reset', {
      method: 'POST',
      body: JSON.stringify(user),
    });
    console.log(data);
    return;
  }

  const data = await login(user);
  console.log(data);
  message.value = data?.message || '';
}
</script>

<template>
  <div class="bg-PRP flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <IconsLogin class="w-36 mx-auto" />
      <h2 class="text-xl font-semibold text-center mb-4">
        {{ newUser ? 'Crea una cuenta' : 'Inicia sesión' }}
      </h2>

      <p class="text-center text-xs">{{ message }}</p>

      <form @submit.prevent="handleSubmit" class="space-y-2">

        <div v-if="newUser">
          <label for="fullName" class="block text-sm font-medium text-gray-700">Nombre Completo</label>
          <input id="fullName" type="text" v-model="user.fullName"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Ingrese su nombre" required />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input id="email" type="email" v-model="user.email"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Enter your email" required />
          <div v-if="newUser" class="text-sm p-1 w-full text-end">
            <input type="checkbox" required id="checkbox" class="mt-1 mr-2" />
            <label for="checkbox">
              Acepto los <NuxtLink to="/" class="text-green-500">Terminos y condiciones</NuxtLink>
            </label>
          </div>
        </div>

        <div v-if="!newUser">
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input v-if="!reset" id="password" type="password" v-model="user.password"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            :class="reset ? 'bg-gray-200' : ''" placeholder="Ingresa tu contraseña" />
          <input v-else type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-300"
            placeholder="(crear nueva)" disabled />
          <div class="text-sm p-1 w-full text-end">
            <input type="checkbox" v-model="reset" id="checkbox" class="mt-1 mr-2" />
            <label for="checkbox">
              Si olvido su contraseña
            </label>
          </div>
        </div>

        <button type="submit"
          class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:ring focus:ring-green-300">
          {{ newUser ? 'Registrarse' : reset ? 'Enviar contraseña' : 'Ingresar' }}
        </button>
      </form>

      <p class="text-center text-sm mt-2">
        ¿{{ newUser ? 'Ya tienes una cuenta' : 'Primera vez' }}?
        <button type="button" class="text-green-500" @click="newUser = !newUser">
          {{ newUser ? 'Ingresar' : 'Crea una cuenta' }}
        </button>
      </p>

    </div>
  </div>
  <!-- <div class="bg-PRP h-screen">
    <div class="flex justify-center max-w-xl mx-auto items-center h-full">
      <div class="flex flex-col pb-32 w-2/3">
        <IconsLogin class="w-36 mx-auto fill-white" />
        <input
          placeholder="Correo Electrónico"
          type="text"
          class="border-b text-center text-white rounded-t-lg border-white px-4 py-2 w-full bg-white mt-10 bg-white/10"
        />
        <button
          @click="login = false"
          class="bg-white/30 border border-white text-white px-6 py-2 w-full rounded-lg mt-4"
        >
          Ingresar
        </button>
      </div>

      <div class="flex flex-col text-center pb-40 w-2/3 ">
        <h2 class="text-4xl font-bold text-white">Código de Verificación</h2>
        <p class="text-white font-thin text-2xl mt-4">
          Ingresa el código de 6 dígitos <br />
          enviado a tu correo electrónico.
        </p>
        <div class="flex gap-2 px-14">
          <input
            v-for="i in 6"
            :key="i"
            type="number"
            class="bg-white/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border border-white text-white p-2 w-full text-center rounded-lg mt-4"
          />
        </div>
        <div class="px-10">
          <button
            @click="login = true"
            class="bg-white/20 hover:bg-white/30 border border-white text-white py-2 w-full rounded-lg mt-8"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  </div> -->
</template>
