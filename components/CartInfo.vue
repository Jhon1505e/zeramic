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
  <div v-if="cart.size === 0" class="w-full md:w-1/2 flex justify-center items-center pb-52 mx-auto" :class="cart.size === 0 ? 'h-screen' : 'h-full'">
    <div class="text-center " :class="$route.path === '/compras' ? 'mt-8' : 'mt-10'">
      <h2 class="font-semibold"
        :class="$route.path === '/compras' ? 'text-4xl text-white' : 'text-PRP text-3xl'">
        Carrito vacío
      </h2>
      <IconsShopping class="w-28 mt-5 mb-8 mx-auto"
        :class="$route.path === '/compras' ? 'fill-white' : 'fill-PRP'" />
      <NuxtLink to="/productos" @click="open = false"
        :class="$route.path === '/compras' ? 'bg-transparent border hover:bg-white/20' : 'bg-PRP '"
        class="px-6 py-2 ml-5 rounded-lg font-extralight  text-white">
        Añadir productos
      </NuxtLink>
    </div>
  </div>

  <div v-else class="max-w-4xl mx-auto rounded-xl p-1 overflow-auto"
    :class="$route.path === '/compras' ? 'bg-purple-900/20' : 'h-[80vh]'">
    <div class="flex justify-between pb-1" v-if="$route.path === '/compras'">
      <div class="w-2/5  pl-6">
        <h2 class="text-lg text-white font-extralight">Producto</h2>
      </div>
      <div class=" w-1/3">
        <h2 class="text-lg text-white text-center pr-12 font-extralight">Cantidad</h2>
      </div>
      <div class=" w-1/5">
        <h2 class="text-lg text-white font-extralight">Precio</h2>
      </div>
      <div class=" w-1/5">
        <h2 class="text-lg text-white text-center pl-6   font-extralight">Total</h2>
      </div>
    </div>
    <hr />
    <div class="flex w-full p-2 border-b"
      :class="$route.path === '/compras' ? ' hover:bg-purple-900/20' : 'hover:bg-gray-200'" v-for="item in cartProducts"
      :key="item.slug">
      <NuxtLink :to="item.slug" class="flex gap-2 items-center">
        <img :src="item.imagen" class="h-16 aspect-video rounded" alt="" />
      </NuxtLink>
      <div class="px-4  mr-2 mt-2 w-full" :class="$route.path === '/compras' ? 'flex ' : ''">
        <div :class="$route.path === '/compras' ? 'w-full md:w-1/3' : ''">
          <span class="font-normal  text-center "
            :class="$route.path === '/compras' ? 'text-white' : 'text-gray-800'">{{
              item.producto
            }}</span>
        </div>
        <div class="flex text-center " :class="$route.path === '/compras' ? 'w-full md:w-3/5' : 'w-full ml-2'">
          <div class="flex  gap-3 w-1/2 pb-3 h-10  mt-3 justify-start">
            <button @click="less(item)" class="bg-gray-300 rounded-md"
              :class="$route.path === '/compras' ? 'bg-transparent border hover:bg-white/20' : 'bg-gray-300'">
              <IconsMinus v-if="item.cantidad > 1" class="w-4 mx-1 "
                :class="$route.path === '/compras' ? 'stroke-white' : 'stroke-red-600'" />
              <IconsDelete v-else class="w-4 mx-1 "
                :class="$route.path === '/compras' ? 'stroke-white' : 'stroke-red-600'" />
            </button>
            <p class=" font-normal text-lg" :class="$route.path === '/compras' ? 'text-gray-300' : 'text-gray-700'">
              {{ item.cantidad }}
            </p>
            <button @click="more(item)" class="rounded-md"
              :class="$route.path === '/compras' ? 'bg-transparent border hover:bg-white/20' : 'bg-gray-300'">
              <IconsPlus class="w-4 mx-1 " :class="$route.path === '/compras' ? 'stroke-white' : 'stroke-green-800'" />
            </button>
          </div>
          <div class="w-full ">
            <h3 class=" font-bold text-sm mt-1"
              :class="$route.path === '/compras' ? 'text-white text-center pl-4' : 'text-gray-700 text-end'">
              $ {{ formatMoneda(item.valor) }}
            </h3>
          </div>
        </div>

        <div class=" w-1/4 " :class="$route.path === '/compras' ? '' : 'hidden'">
          <h3 class="text-end font-bold text-sm mt-1"
            :class="$route.path === '/compras' ? 'text-white' : 'text-gray-700'">
            $ {{ formatMoneda(item.valor * item.cantidad) }}
          </h3>
        </div>
      </div>

    </div>
    <div v-if="$route.path !== '/compras'" class="flex  text-lg "
      :class="$route.path === '/compras' ? 'bg-purple-900/30 rounded-b-xl text-white' : 'bg-gray-100'">
      <div class="w-full mx-auto justify-between flex px-4 py-2">
        <div class="w-1/3">
          <p class="mt-1 text-xl font-thin">Subtotal</p>
          <p class="mt-1 text-xl font-normal">Valor total</p>


        </div>
        <div class="w-2/3 text-end">
          <p class="mt-1 font-thin">$ {{ formatMoneda(total) }}</p>
          <p class="mt-1 font-normal">$ {{ formatMoneda(total) }}</p>

        </div>
      </div>
    </div>
  </div>

</template>
