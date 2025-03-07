<script setup lang="ts">
const toast = useToast();
import { z } from 'zod'
const { start, finish } = useLoadingIndicator();
const init = {
  email: "",
  subject: "",
  message: "",
}
const info = reactive({ ...init });

const schema = z.object({
  email: z.string().email('Email inválido'),
  subject: z.string().min(1, 'Requerido'),
  message: z.string().min(1, 'Requerido'),
})

const sendMail = async () => {
  start();
  const data = await $fetch('/api/send', {
    method: 'POST',
    body: info,
  });
  toast.add({ title: "Mensaje enviado", color: "emerald" });
  Object.assign(info, init);
  finish();
};
const ui = { label: { base: 'text-white' } }
</script>
<template>
  <div class="bg-PRP">
    <div class="max-w-lg mx-auto pb-14">
      <div class="pt-5  text-center">
        <h2 class="text-4xl font-bold pb-4 text-white">¡Contáctanos!</h2>
        <p class="text-white p-4 text-sm">✨ Diseñamos, fabricamos y comercializamos cerámica de alta calidad, inspirada
          en el Zócalo Guatapense. ⭐️ Merchandising empresarial</p>
        <div class="w-full  mx-auto px-10 sm:px-0">
          <UForm :state="info" :schema="schema" @submit.prevent="sendMail" class="space-y-4">
            
            <UFormGroup :ui="ui" label="Correo Electronico" name="email">
              <UInput type="email" v-model="info.email"
                placeholder="Correo Electronico" size="lg" />
            </UFormGroup>

            <UFormGroup :ui="ui" label="Asunto" name="subject">
              <UInput type="text" v-model="info.subject"
                placeholder="Asunto" size="lg" />
            </UFormGroup>
            
            <UFormGroup :ui="ui" label="Mensaje" name="message">
              <UTextarea v-model="info.message" type="text"
                placeholder="Mensaje" size="lg" />
            </UFormGroup>

            <UButton block trailing icon="i-heroicons-arrow-right" size="lg" type="submit">
              Enviar
            </UButton>
          </UForm>
        </div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 pt-12 max-w-3xl gap-2 px-10 mx-auto text-center text-white">
        <a href="https://wa.me/+573002285505" class="bg-white/10 flex justify-center gap-2 px-4 py-2 rounded-lg"
          target="_blank">
          <IconsWhatsapp class="w-6  fill-white" />
          Whatsapp
        </a>
        <a href="https://www.facebook.com/zeramic.guatape"
          class="bg-white/10 flex justify-center gap-2 px-4 py-2 rounded-lg" target="_blank">
          <IconsFacebook class="w-6  fill-white" />
          Facebook
        </a>

        <a href="https://www.instagram.com/zeramic.guatape/"
          class="bg-white/10 flex justify-center gap-2 px-4 py-2 rounded-lg" target="_blank">
          <IconsInstagram class="w-6  fill-white" />
          Instagram
        </a>
        <a href="mailto:zeramicguatape@gmail.com" class="bg-white/10 flex justify-center gap-2 px-4 py-2 rounded-lg"
          target="_blank">
          <IconsGmail class="w-6  fill-white" />
          Gmail
        </a>


      </div>
    </div>
  </div>
</template>
