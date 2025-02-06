<script setup lang="ts">
const Router = useRouter();
const { user } = useClient();
const emit = defineEmits(['submit', 'success', 'error']);
</script>
<template>
  <form @submit.prevent="emit('submit')">
    <div class="mt-4 mx-8   md:mx-auto"
      :class="Router.currentRoute.value.path === '/compras/envio' ? 'flex gap-4 w-1/2' : 'block w-3/4'">
      <div class="w-full">
        <input id="email" type="email" class="rounded-xl text-center p-2 w-full border bg-transparent text-white"
          v-model="user.email" required placeholder="email@example.com" />

      </div>
      <button :class="Router.currentRoute.value.path === '/compras/envio' ? 'w-1/3 ' : 'w-full mt-4'"
        class="border bg-white/20 mx-auto block  rounded-xl p-2 text-white" type="submit">
        Ingresar
      </button>
    </div>
    <h2 class="text-center text-white font-thin text-sm mt-3">
      No tienes una cuenta? <strong>Registrarse</strong>
    </h2>
    <div class="flex justify-center mt-4">
      <GoogleSignInButton @success="emit('success', $event)" @error="emit('error', $event)" />
    </div>
  </form>
</template>