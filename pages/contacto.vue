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
  <div class="bg-PRP h-screen">
    <div class="max-w-lg mx-auto">

    
    <div class="pt-5  text-center">
      <h2 class="text-4xl font-bold pb-4 text-white">¡Contáctanos!</h2>
      <p class="text-white p-4 text-sm">✨ Diseñamos, fabricamos y comercializamos cerámica de alta calidad, inspirada en
        el Zócalo Guatapense. ⭐️ Merchandising empresarial</p>
      <div class="w-full  mx-auto px-10 sm:px-0">
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
    <div class="grid grid-cols-2 sm:grid-cols-4 pt-12 max-w-3xl gap-2 px-10 mx-auto text-center text-white">
      <a href="https://wa.me/+573002285505" class="bg-white/10 flex justify-center gap-2 px-4 py-2 rounded-lg" target="_blank">
        <IconsWhatsapp class="w-6  fill-white" />
        Whatsapp
      </a>
      <a href="https://www.facebook.com/zeramic.guatape" class="bg-white/10 flex justify-center gap-2 px-4 py-2 rounded-lg" target="_blank">
        <IconsFacebook class="w-6  fill-white" />
        Facebook
      </a>

      <a href="https://www.instagram.com/zeramic.guatape/" class="bg-white/10 flex justify-center gap-2 px-4 py-2 rounded-lg" target="_blank">
        <IconsInstagram class="w-6  fill-white" />
        Instagram
      </a>
      <a href="mailto:zeramicguatape@gmail.com" class="bg-white/10 flex justify-center gap-2 px-4 py-2 rounded-lg" target="_blank">
        <IconsGmail class="w-6  fill-white" />
        Gmail
      </a>

      
    </div>
  </div>
  </div>
</template>
