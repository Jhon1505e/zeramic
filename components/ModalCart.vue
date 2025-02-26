<script setup lang="ts">
const route = useRoute();
const isCompras = computed(() => route.name === 'compras');
const { cart } = useShopping();
const { open } = useShopping();
</script>
<template>
  <div v-if="!isCompras" :class="open ? 'opacity-100' : 'opacity-0 invisible'"
    class="z-50 duration-75 right-0 fixed inset-0  flex justify-end ">
    <div class="w-1/6 md:w-full bg-black opacity-50" @click="open = false"></div>
    <div class=" shadow max-w-sm w-full bg-white rounded-l-xl">
      <div class="flex">

        <h2 class="w-full text-center font-semibold pl-8 text-PRP">
          Resumen de compra
        </h2>

        <button class="top-0 rounded-full right-0 mt-2 mr-3" @click="open = false">
          <IconsClose class="w-7 stroke-PRP" />
        </button>
      </div>

      <div class="overflow-y-scroll duration-150 " :class="open ? 'opacity-100' : 'opacity-0 translate-x-20'">
        <div :class="cart.size === 0 ? 'pt-20 pb-40' : ''">
          <slot />
        </div>
      </div>
      <div v-if="cart.size > 0"
        class="p-2 text-center bg-PRP text-white w-5/6 mx-auto rounded-lg text-2xl font-thin mt-3">
        <NuxtLink @click="open = false" to="/compras" class="flex font-thin text-xl justify-center">
          Realizar compra
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
