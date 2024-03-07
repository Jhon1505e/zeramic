<script setup lang="ts">
const { cart, addProduct, delProduct } = useShopping();

const cartProducts = computed(() => {
  return Array.from(cart.value, ([clave, valor]) => {
    valor["uuid"] = clave;
    return valor;
  });
});

const total = computed(() => {
  let total = 0;
  for (const item of cartProducts.value) {
    total += item.cantidad * item.valor;
  }
  return total;
});

function more(item: any) {
  item.cantidad++;
  addProduct(item);
}
function less(item: any) {
  if (item.cantidad === 1) delProduct(item.uuid);
  else {
    item.cantidad--;
    addProduct(item);
  }
}

function formatMoneda(value: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(value);
}
</script>

<template>
  <div class="bg-PRP">
    <h2 class="text-center text-white text-4xl">Carrito de compras</h2>

    <div v-if="cart.size === 0" class="w-full md:w-1/2 h-full pt-20 mx-auto">
      <div class="text-center">
        <h2 class="text-white text-5xl font-bold">
          Todavía no has realizado ninguna compra
        </h2>
        <IconsShopping class="w-28 mt-5 fill-white mx-auto" />
        <NuxtLink
          to="/productos"
          class="bg-white/20 border border-white text-white px-6 py-2 mt-6 rounded-lg"
        >
          Ver productos
        </NuxtLink>
      </div>
    </div>

    <div v-else class="border max-w-4xl mx-auto mt-10 text-white rounded p-1">
      <div class="flex w-full p-2 bg-slate-400/50 text-center">
        <strong class="w-2/5">Producto</strong>
        <strong class="w-1/5">Cantidad</strong>
        <strong class="w-1/5">Valor / Unidad</strong>
        <strong class="w-1/5">Total</strong>
      </div>
      <hr>
      <div
        class="flex w-full p-2 items-center hover:bg-slate-400"
        v-for="item in cartProducts"
        :key="item.slug"
      >
        <NuxtLink :to="item.slug" class="flex gap-2 items-center w-2/5">
          <img :src="item.imagen" class="h-24 aspect-video rounded" alt="">
          <span class="font-bold w-full text-center">{{ item.producto }}</span>
        </NuxtLink>
        <div class="gap-3 flex items-center justify-center w-1/5">
          <button @click="less(item)">-</button>
          {{ item.cantidad }}
          <button @click="more(item)">+</button>
        </div>
        <div class="text-center w-1/5">$ {{ formatMoneda(item.valor) }}</div>
        <div class="text-center w-1/5">$ {{ formatMoneda(item.valor * item.cantidad) }}</div>
      </div>
      <hr>
      <div class="grid grid-cols-2 w-full p-2 font-bold text-lg text-right bg-slate-400/50">
        <div class="col-span-1">Total:</div>
        <div>$ {{ formatMoneda(total) }}</div>
      </div>
    </div>

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
