<script lang="ts" setup>
const compra = {
  _id: "67c98370392b92231b06f0aa",
  reference: "0597d45d-52ad-44ee-ab83-d0e09398dca5",
  fullName: "David Roman",
  email: "roman.david@gmail.com",
  address: "Carrera 29 A 9 - 12",
  infoDirection: "Villa del Carmen",
  locationCode: "05376000",
  departmentOrStateName: "ANTIOQUIA",
  phone: "3136592716",
  locationName: "LA CEJA",
  deliveryCompanyImgUrl: "https://s3.amazonaws.com/images.dev.mipaquete/tcc.png",
  deliveryCompanyName: "TCC",
  deliveryCompanyId: "5ca22d9587981510092322f6",
  routeType: "regional",
  insurancePercentage: 0.01,
  shippingCost: 8036,
  total: 40000,
  productos: [
    {
      uuid: "cf8dff30-b846-4edf-b40f-85d9d71d4611",
      producto: "Materita Cuatro Esquinas",
      valor: 15000,
      cantidad: 2,
      imagen: "https://a-us.storyblok.com/f/1018728/1920x1080/84741fc707/materita-cuatro-esquinas.webp",
      slug: "/productos/cuadrada"
    },
    {
      uuid: "3b028c79-84f4-425c-a8f9-188d3ddd3e21",
      producto: "Matera suculenta Triangular",
      valor: 10000,
      cantidad: 1,
      imagen: "https://a-us.storyblok.com/f/1018728/1920x1080/c3c326db4a/triagular-1920x1080.webp",
      slug: "/productos/triangular"
    }
  ],
  date: "2025-03-06T11:13:52.402Z",
  mpCode: 2010682,
  wompi: {
    id: "1113841-1741259701-95129",
    reference: "0597d45d-52ad-44ee-ab83-d0e09398dca5",
    payment_method_type: "NEQUI",
    amount_in_cents: 4803600,
    created_at: "2025-03-06T11:15:01.607Z",
    finalized_at: "2025-03-06T11:15:06.487Z",
    status: "APPROVED",
    status_message: null
  }
};

const {
  reference,
  fullName,
  email,
  date,
  address,
  locationName,
  deliveryCompanyName,
  departmentOrStateName,
  shippingCost,
  wompi,
  total,
  productos
} = compra
</script>

<template>
  <div style="padding-inline: 20px; font-size: 0.97rem; padding-block: 4px; color: #696868;">
    <div style="text-align: right; font-size: 0.9rem">${date}</div>

    <h1 style="font-weight: 600; text-align: center">
      Confirmación de tu pedido
    </h1>
    <p style="padding: 0 40px 10px 40px; text-align: center;">
      Gracias por tu compra en Zeramic; aquí tienes el resumen de tu pedido:
    </p>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0 10px">
      <div><strong>Nombre:</strong> ${fullName}</div>
      <div style="text-align: center;">${email}</div>
    </div>
    <div><strong>Dirección:</strong>
      ${address}. ${locationName}, ${departmentOrStateName}
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0 10px">
      <div><strong>Metodo de Pago:</strong> ${wompi.payment_method_type}</div>
      <div style="text-align: center;"><strong>Estado:</strong> ${wompi.status}</div>
      <div><strong>Enviado por:</strong> ${deliveryCompanyName}</div>
      <div style="text-align: center;"><strong>Valor Envio:</strong> ${shippingCost}</div>
    </div>
    <div style="text-align: center;"><small><strong>Id compra:</strong> ${reference}</small></div>

    <p style="font-weight: bolder; font-size: 20px; margin-top: 10px;">
      Productos:
    </p>

    <!-- tabla productos -->

    <div
      style="display: flex; padding-block: 10px; border-bottom: solid 1px #CCC; align-items: center; justify-content: space-between; gap: 10px;">
      <a :href="'https://www.zeramic.co' + prod.slug" target="_blank" style="width: 180px;">
        <img :src="prod.imagen" style="width: 120px; border-radius: 10px" alt="Zeramic" />
      </a>
      <div style="width: 100%;">
        <p style="font-weight: 600">${prod.producto}</p>
        <p style="font-size: 0.9rem">Cant: ${prod.cantidad} x ${prod.valor}</p>
      </div>
      <div style="font-weight: 600; text-align: right;">${prod.valor * prod.cantidad}</div>
    </div>

    <div style="display: flex; justify-content: end; gap: 6px; padding: 6px; align-items: center">
      <div style="text-align: end;">Subtotal: ${total}</div>
      <div>+ Envio: ${shippingCost}</div>
      <div style="font-weight: 600; font-size: 1.1rem;">= Total: ${total + shippingCost}</div>
    </div>

    <p style="margin-block:10px; text-align: center;">
      ¡Esperamos que disfrutes tu compra! <br />
      Puedes seguir el estado de tu pedido aquí:
    </p>

    <div style="display: flex; justify-content: center;">
      <a style=" padding: 8px 30px; background-color: #590bf9; color: #ffffff; border-radius: 5px; text-decoration: none; font-weight: 500;" href="https://www.zeramic.co/micuenta/compras" target="_blank">Seguir Pedido</a>
    </div>
  </div>
</template>