<script lang="ts" setup>
const compra = {
  fullName: "Juan Perez",
  reference: "9325749103",
  date: "23/34/23 - 10:34:23 PM",
  wompi: "Pendiente",
  method: "Bancolombia",
  productName: "Materita Cuatro Esquinas",
  amount: "2 Unidades",
  total: "$ 40.000",
  address: "Calle 12 # 34 - 56 ",
  departmentOrStateName: "Bogotá",
  deliveryCompanyName: "COORDINADORA",
  shippingCost: "$ 5.000",
};
</script>

<template>
  <div style="padding-inline: 20px; padding-block: 16px">
    <h1 style="font-weight: 600; color: #000; text-align: center">
      Confirmación de tu pedido
    </h1>
    <p
      style="
        font-size: 1rem;
        color: #696868;
        margin-block: 5px;
        text-align: center;
      "
    >
      Gracias por tu compra en Zeramic, <br />
      aquí tienes el resumen de tu pedido:
    </p>
    <p
      style="
        font-weight: bolder;
        color: #000;
        font-size: 20px;
        margin-top: 10px;
      "
    >
      Detalles del Pedido:
    </p>
    <div style="display: flex; padding-block: 10px" v-for="i in 3" :key="i">
      <img
        src="https://www.zeramic.co/img/CorderoBG.webp"
        style="width: 120px; border-radius: 15px"
        alt=""
      />
      <div style="padding-inline: 20px; padding-block: 10px">
        <p style="font-size: 1rem; color: #000">{{ compra.productName }}</p>
        <p style="font-size: 1rem; color: #696868">{{ compra.amount }}</p>
      </div>
      <div style="display: flex; padding-left: 20px; align-items: center">
        <p style="font-weight: 600">{{ compra.total }}</p>
      </div>
    </div>
    <hr>
    <p
      style="
        font-weight: bolder;
        color: #000;
        font-size: 20px;
        margin-top: 10px;
      "
    >
      Datos del Pedido:
    </p>

    <p style="font-size: 1rem; color: #4e4d4d">
      <span style="color: #000">Nombre:</span> {{ compra.fullName }}
    </p>

    <p style="font-size: 1rem; color: #4e4d4d">
      <span style="color: #000">Fecha:</span> {{ compra.date }}
    </p>

    <p style="font-size: 1rem; color: #4e4d4d">
      <span style="color: #000">Nro Referencia:</span>
      {{ compra.reference }}
    </p>

    <p style="font-size: 1rem; color: #4e4d4d">
      <span style="color: #000">Estado:</span>
      {{ compra.wompi }}
    </p>

    <p style="font-size: 1rem; color: #4e4d4d">
      <span style="color: #000">Metodo de Pago:</span>
      {{ compra.method }}
    </p>

    <p
      style="
        font-weight: bolder;
        color: #000;
        font-size: 20px;
        margin-top: 10px;
      "
    >
      Datos del Envio:
    </p>
    <p style="font-size: 1rem; color: #4e4d4d">
      <span style="color: #000">Dirección:</span>
      {{ compra.address }} - {{ compra.departmentOrStateName }}
    </p>

    <p style="font-size: 1rem; color: #4e4d4d">
      <span style="color: #000">Empresa:</span>
      {{ compra.deliveryCompanyName }}
    </p>

    <p style="font-size: 1rem; color: #4e4d4d">
      <span style="color: #000">Valor de Envio:</span>
      {{ compra.shippingCost }}
    </p>

    <p
      style="
        font-size: 1rem;
        color: #696868;
        margin-block:10px;
        text-align: center;
      "
    >
    ¡Esperamos que disfrutes tu compra! <br />
    Puedes seguir el estado de tu pedido aquí:
    </p>
<div style="display: flex; justify-content: center;">

    <a
    style="
        
        
        padding: 8px 30px;
        background-color: #590bf9;
        color: #ffffff;
        border-radius: 5px;
        text-decoration: none;
        
        font-weight: 500;
      "
      href="https://www.zeramic.co/micuenta/compras"
      target="_blank"
      >Seguir Pedido</a
    >
        </div>
  </div>
</template>