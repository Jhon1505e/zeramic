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
    <div
      class="text-center text-PRP mt-10"
      
    >
      <h2
        class="font-bold"
        :class="$route.path === '/compras' ? 'text-4xl' : 'text-3xl'"
      >
        Carrito vacío
      </h2>
      <IconsShopping
        class="w-28 mt-5 mb-8 mx-auto fill-PRP"
        
      />
      <NuxtLink
        to="/productos"
        @click="open = false"
       
        class="px-6 py-2 ml-5 rounded-lg bg-PRP text-white"
      >
        Ver productos
      </NuxtLink>
    </div>
  </div>

  <div v-else class=" max-w-4xl mx-auto rounded p-1 bg-white">
    <div
      class="flex w-full p-2 hover:bg-gray-200 border-b"
      v-for="item in cartProducts"
      :key="item.slug"
    >
      <NuxtLink :to="item.slug" class="flex gap-2 items-center w-2/5">
        <img :src="item.imagen" class="h-24 aspect-video rounded" alt="" />
      </NuxtLink>
      <div class="pr-4 w-3/5">
        <span class="font-normal w-full text-center text-gray-800">{{
          item.producto
        }}</span>
        <div class="gap-3 flex items-center justify-start w-full">
          <h2 class="text-gray-600 font-normal text-sm">Cantidad:</h2>
          
          
            <button @click="less(item)">
            <IconsMinus v-if="item.cantidad > 1" class="w-5 mt-2 stroke-red-500" />
            <IconsDelete v-else class="w-5 mt-2 stroke-red-500" />
            </button>
            <h3 class="text-gray-600 font-normal text-sm">

              {{ item.cantidad }}
            </h3>
            <button @click="more(item)">
            <IconsPlus class="w-5 mt-2 stroke-green-700" />
            </button>
          
        </div>
        <div class="flex justify-end">

          <h3 class="text-end font-normal text-lg">
            $ {{ formatMoneda(item.valor) }}
          </h3>
        </div>
      </div>
      <!--   <div class="text-center w-1/5">$ {{ formatMoneda(item.valor) }}</div>
      <div class="text-center w-1/5">
        $ {{ formatMoneda(item.valor * item.cantidad) }}
      </div> -->
    </div>
    <div v-if="$route.path !== '/compras'"
      class=" w-full px-4 py-2 flex justify-end  font-bold text-lg  bg-slate-400/50"
    >
     
      <div>Total: $ {{ formatMoneda(total) }}</div>
    </div>
  </div>
</template>
