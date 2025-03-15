<script setup lang="ts">
const email = "correoelectronico@correo.com"
const subject = "Asunto"
const message = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta unde officiis veniam nam cum rem quae, hic aut cumque quisquam inventore porro at rerum quidem eius illum asperiores quia earum."
</script>

<template>
  <div style="padding: 10px 20px;">
    <h2 style="font-weight: 600; text-align: center;">Mensaje de Contacto</h2>
    <p style="margin-block: 5px; text-align: center;">
      Hemos recibido tu mensaje y nuestro equipo se pondrá en contacto contigo lo antes posible.
    </p>
    <div style="padding: 10px 20px;">
      <p><strong>Enviado por:</strong> ${email}</p>
      <p><strong>Asunto:</strong> ${subject}</p>
      <p><strong>Mensaje:</strong> ${message}</p>
    </div>
  </div>
</template>