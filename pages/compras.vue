<script setup lang="ts">

</script>

<template>
  <div class="bg-PRP">
    <h2 class="text-center text-white text-4xl">Carrito de compras</h2>
    <div class="w-full flex justify-evenly p-4">
      tabs
      <button>Resumen de compra</button>
      <button>Información de envío</button>
      <button>Ir a pagos</button>
    </div>
    <hr>
    <CartInfo />

    <hr class="my-4">

    <div class="text-center p-6">
      <div>PENDIENTE</div>
      <div>Formulario de compra Usuario</div>
      <div class="flex justify-center gap-3 p-2">
        <input type="text" placeholder="Nombre">
        <input type="email" placeholder="Email">
        <input type="email" placeholder="Telefono">
      </div>
      <div class="flex justify-center gap-3 p-2">
        <input type="text" placeholder="Tipo Documento">
        <input type="email" placeholder="ID">
        <input type="email" placeholder="Dirección">
      </div>
      <div>Medios de Pago - logos - ir a Wompi pasarela</div>
      <button class="bg-white/20 border border-white text-white px-6 py-2 mt-6 rounded-lg">Comprar</button>
    </div>

    <ImgRounded class="w-full fill-slate-900" />
  </div>
</template>
