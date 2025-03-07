<script setup lang="ts">
const message = {
    email: "correoelectronico@correo.com",
    asunto: "Asunto",
    mensaje: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta unde officiis veniam nam cum rem quae, hic aut cumque quisquam inventore porro at rerum quidem eius illum asperiores quia earum.",
};
</script>

<template>
    <div style="padding-inline: 20px; padding-block: 16px; ">
        <h1 style="font-weight: 600; color: #000; text-align: center;"> Mensaje de Contacto</h1>
        <p style="font-size: 1rem; color: #4e4d4d; margin-block: 5px; text-align: center;">Hemos recibido tu mensaje y nuestro equipo se pondrá en contacto contigo lo antes posible.</p>
        
       <div style="padding-inline: 20px; padding-top: 10px;">

           <p style="font-size: 1rem; color: #696868">
               <strong style="color: #000">Enviado por:</strong>
      {{ message.email }}
    </p>

    <p style="font-size: 1rem; color: #696868">
      <strong style="color: #000">Asunto:</strong>
      {{ message.asunto }}
    </p>

    <p style="font-size: 1rem; color: #696868">
      <strong style="color: #000">Mensaje:</strong>
      {{ message.mensaje }}
    </p>
</div>
        
    </div>
</template>