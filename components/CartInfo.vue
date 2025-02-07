<script setup lang="ts">
const { name } = useRoute();
const { open, total } = useShopping();
const { cart, cartProducts, addProduct, delProduct, loadCartFromLocalStorage } = useShopping();

function more(item: any) {
  item.cantidad++;
  addProduct(item);
}

const isCompras = computed(() => name === 'compras');

function less(item: any) {
  if (item.cantidad === 1) delProduct(item.uuid);
  else {
    item.cantidad--;
    addProduct(item);
  }
}

onMounted(() => {
  loadCartFromLocalStorage();
})
</script>

<template>
  <div v-if="cart?.size === 0" class="w-full md:w-1/2 flex justify-center items-center mx-auto">
    <div class="text-center">
      <p>
        Carrito vacío
      </p>
      <IconsShopping class="w-28 mt-5 mb-8 mx-auto" />
      <NuxtLink to="/productos" @click="open = false" class="border p-2 rounded-lg font-extralight">
        Añadir productos
      </NuxtLink>
    </div>
  </div>

  <div v-else class="max-w-4xl mx-auto rounded-xl p-1 overflow-auto">
    <hr />
    <div class="flex gap-2 w-full p-2 border-b" v-for="item in cartProducts" :key="item.slug">
      <NuxtLink :to="item.slug">
        <img :src="item.imagen" class="h-16 aspect-video rounded" alt="" />
      </NuxtLink>
      <div class="w-full items-center justify-between" :class="{ 'flex': isCompras }">
        <div class="font-semibold" :class="{ 'w-1/2': isCompras }">
          {{ item.producto }}
        </div>
        <div class="flex items-center w-full pt-2">
          <div class="flex gap-3 items-center w-1/2">
            <button @click="less(item)" class="rounded-md">
              <IconsMinus v-if="item.cantidad > 1" class="w-4 mx-1" />
              <IconsDelete v-else class="w-4 mx-1" />
            </button>
            <p class="font-medium text-sm">
              {{ item.cantidad }}
            </p>
            <button @click="more(item)" class="rounded-md">
              <IconsPlus class="w-4 mx-1" />
            </button>
          </div>
          <div v-if="isCompras" class="w-full text-sm text-center">{{ formatMoneda(item.valor) }}</div>
          <div class="w-full text-sm text-end">
            {{ formatMoneda(item.valor * item.cantidad) }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex text-lg bg-gray-400/30">
      <div class="w-full mx-auto justify-between flex px-4 py-2">
        <div class="w-1/3">
          <p class="mt-1 text-xl font-thin">Subtotal</p>
          <p class="mt-1 text-xl font-normal">Valor total</p>
        </div>
        <div class="w-2/3 text-end">
          <p class="mt-1 font-thin">{{ formatMoneda(total) }}</p>
          <p class="mt-1 font-normal">{{ formatMoneda(total) }}</p>
        </div>
      </div>
    </div>

  </div>
</template>
