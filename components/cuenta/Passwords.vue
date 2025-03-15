<script setup lang="ts">
import { z } from 'zod'
const modal = defineModel({ default: false });
const { changePassword } = useAuth();
const init = {
  password: "",
  newPassword: "",
  confirmPassword: "",
};
const message = ref()
const client = reactive({ ...init });
const schema = z.object({
  password: z.string().min(1, "La contraseña es requerida"),
  newPassword: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: z.string().nonempty("La confirmación de la contraseña es requerida"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});
async function onSubmit() {
  message.value = await changePassword(client);
  Object.assign(client, init);
}
const ui = { label: { base: "text-white" } };
</script>

<template>
  <UModal v-model="modal">
    <UCard :ui="{ background: 'bg-PRP' }">
      <template #header>
        <h2 class="text-white text-center">Cambiar Contraseña</h2>
      </template>
      <div>{{ message }}</div>
      <UForm :state="client" :schema="schema" @submit="onSubmit" class="space-y-4 text-white pt-4">
        <UFormGroup :ui="ui" label="Contraseña Actual" name="password">
          <UInput v-model="client.password" type="password" icon="i-heroicons-user" placeholder="Contraseña Actual" />
        </UFormGroup>
        <UFormGroup :ui="ui" label="Nueva Contraseña" name="newPassword">
          <UInput v-model="client.newPassword" type="password" icon="i-heroicons-lock-closed"
            placeholder="Nueva Contraseña" />
        </UFormGroup>
        <UFormGroup :ui="ui" label="Confirmar Contraseña" name="confirmPassword">
          <UInput v-model="client.confirmPassword" type="password" icon="i-heroicons-lock-closed"
            placeholder="Confirmar Contraseña" />
        </UFormGroup>
        <div class="flex justify-center">

          <UButton type="submit" class="border  px-6 py-2 mt-4 bg-white/10 text-white rounded-lg"> Cambiar Contraseña
          </UButton>
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
