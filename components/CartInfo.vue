<script setup lang="ts">
const { open } = useShopping();
const { cart, cartProducts, addProduct, delProduct } = useShopping();

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
  <div
    v-if="cart.size === 0"
    class="w-full md:w-1/2 h-full flex justify-center items-center pb-32 mx-auto"
  >
    <div class="text-center text-PRP mt-10">
      <h2
        class="font-bold"
        :class="$route.path === '/compras' ? 'text-4xl' : 'text-3xl'"
      >
        Carrito vacío
      </h2>
      <IconsShopping class="w-28 mt-5 mb-8 mx-auto fill-PRP" />
      <NuxtLink
        to="/productos"
        @click="open = false"
        class="px-6 py-2 ml-5 rounded-lg bg-PRP text-white"
      >
        Ver productos
      </NuxtLink>
    </div>
  </div>

  <div v-else class="max-w-4xl mx-auto rounded p-1">
    <hr />
    <div
      class="flex w-full p-2 hover:bg-gray-200 border-b"
      v-for="item in cartProducts"
      :key="item.slug"
    >
      <NuxtLink :to="item.slug" class="flex gap-2 items-center">
        <img :src="item.imagen" class="h-16 aspect-video rounded" alt="" />
      </NuxtLink>
      <div class="px-4 w-full">
        <div>
          <span class="font-normal w-full text-center text-gray-800">{{
            item.producto
          }}</span>
        </div>
        <div class="flex">
          <div class="flex gap-3 w-1/2 pb-3 h-10 mt-5">
            <button @click="less(item)" class="bg-gray-300 rounded-md">
              <IconsMinus
                v-if="item.cantidad > 1"
                class="w-4 mx-1 stroke-black"
              />
              <IconsDelete v-else class="w-4 mx-1 stroke-black" />
            </button>
            <p class="text-gray-600 font-normal text-lg">
              {{ item.cantidad }}
            </p>
            <button @click="more(item)" class="bg-gray-300 rounded-md">
              <IconsPlus class="w-4 mx-1 stroke-black" />
            </button>
          </div>
          <div>
            <h3 class="text-end font-bold text-sm mt-3">
              $ {{ formatMoneda(item.valor) }}
            </h3>
          </div>
        </div>
        <!--    <div class=" flex bg-red-900">
          <div class="flex w-full gap-2">

            
            
            <button @click="less(item)" class="bg-gray-400 rounded-md">
              <IconsMinus v-if="item.cantidad > 1" class="w-5 mx-1 stroke-black" />
                <IconsDelete v-else class="w-5 mx-1 py-1 stroke-black" />
              </button>
              <h3 class="text-gray-600 font-normal text-lg mb-2">
                
                {{ item.cantidad }}
              </h3>
              <button @click="more(item)" class="bg-gray-400 rounded-md">
                <IconsPlus class="w-5 mx-1 py-1 stroke-black" />
              </button>
              
            </div>
            <div>

              <h3 class="text-end font-normal text-sm">
                $ {{ formatMoneda(item.valor) }}
              </h3>
            </div>
        </div> -->
        <div class="flex justify-end"></div>
      </div>
      <!--   <div class="text-center w-1/5">$ {{ formatMoneda(item.valor) }}</div>
      <div class="text-center w-1/5">
        $ {{ formatMoneda(item.valor * item.cantidad) }}
      </div> -->
    </div>
    <div
      v-if="$route.path !== '/compras'"
      class="flex  bg-gray-100 text-lg "
    >
      <div class="w-full mx-auto justify-between flex px-4 py-2">
        <div class="w-1/3">
          <p class="mt-1 text-xl font-extralight">Valor total</p>
          
          
        </div>
        <div class="w-2/3 text-end">
          <p class="mt-1 font-extralight">$ {{ formatMoneda(total) }}</p>
          
        </div>
      </div>
    </div>
  </div>
</template>
