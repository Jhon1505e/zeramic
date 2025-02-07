<script setup lang="ts">
const init = {
  email: "",
  subject: "",
  html: "",
}
const email = reactive({ ...init });
const mensaje = ref("");

const sendMail = async () => {
  mensaje.value = "Enviando...";
  const data = await $fetch('/api/send', {
    method: 'POST',
    body: email,
  });
  mensaje.value = "Mensaje Enviado";
  Object.assign(email, init);
};
</script>
<template>
  <div class="bg-PRP pb-32">
    <div class="py-16 text-center">
      <h2 class="text-4xl font-bold pb-4 text-white">¡Contáctanos!</h2>
      <p class="text-white p-4 text-sm">✨ Diseñamos, fabricamos y comercializamos cerámica de alta calidad, inspirada en
        el Zócalo Guatapense. ⭐️ Merchandising empresarial</p>
      <div class="w-full sm:w-1/3 mx-auto px-10 sm:px-0">
        <form @submit.prevent="sendMail">
          <input type="email" v-model="email.email" required
            class="border border-white px-4 py-2 w-full bg-white/10 rounded-lg mt-4" placeholder="Correo Electronico" />
          <input type="text" v-model="email.subject" required
            class="border border-white px-4 py-2 w-full bg-white/10 rounded-lg mt-4" placeholder="Asunto" />
          <textarea v-model="email.html" type="text" required rows="4"
            class="border border-white px-4 py-2 w-full bg-white/10 rounded-lg mt-4" placeholder="Mensaje"></textarea>
          <p>{{ mensaje }}</p>
          <button type="submit"
            class="border border-white px-4 py-2 w-full bg-white/30 text-white hover:bg-white/40  rounded-lg mt-4">
            Enviar
          </button>
        </form>
      </div>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-4 max-w-3xl gap-2 mx-auto text-center text-white">
      <a href="https://wa.me/+573002285505" class="underline" target="_blank">
        Whatsapp
      </a>
      <a href="mailto:zeramicguatape@gmail.com" class="underline" target="_blank">
        Correo Electrónico
      </a>
      <a href="https://www.instagram.com/zeramic.guatape/" class="underline" target="_blank">
        Instagram
      </a>
      <a href="https://www.facebook.com/zeramic.guatape?_rdc=1&_rdr" class="underline" target="_blank">
        Facebook
      </a>
    </div>
  </div>
</template>
