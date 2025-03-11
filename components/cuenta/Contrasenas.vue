<script setup lang="ts">
const client = {
  password: "",
  newPassword: "",
  confirmPassword: "",
};
const ui = { label: { base: "text-white" } };
</script>
<template>
  <div class="px-10 py-5">
    <h2 class="text-white text-center">Cambiar Contraseña</h2>

    <UForm class="space-y-4 text-white pt-4">
      <UFormGroup :ui="ui" label="Contraseña Actual">
        <UInput
          v-model="client.password"
          type="password"
          icon="i-heroicons-user"
          placeholder="Contraseña Actual"
        />
      </UFormGroup>
      <UFormGroup :ui="ui" label="Nueva Contraseña">
        <UInput
          v-model="client.newPassword"
          type="password"
          icon="i-heroicons-lock-closed"
          placeholder="Nueva Contraseña"
        />
      </UFormGroup>
      <UFormGroup :ui="ui" label="Confirmar Contraseña">
        <UInput
          v-model="client.confirmPassword"
          type="password"
          icon="i-heroicons-lock-closed"
          placeholder="Confirmar Contraseña"
        />
      </UFormGroup>
      <div class="flex justify-center">

          <UButton type="submit" class="border  px-6 py-2 mt-4 bg-white/10 text-white rounded-lg"> Cambiar Contraseña  </UButton>
        </div>
        </UForm>
  </div>
</template>
