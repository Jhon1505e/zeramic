<script setup lang="ts">
const { products, fetchProducts } = useProducts();

fetchProducts();
</script>
<template>
  <div class="bg-PRP">
    <div class="flex justify-center gap-6">
      <div class="hidden md:flex justify-center gap-4 items-center">
        <button
          class="text-white border-b pb-1 text-sm font-normal hover:scale-110 duration-100 easy-out"
        >
          TODOS
        </button>
        <button
          class="text-white border-b pb-1 text-sm font-normal hover:scale-110 duration-100 easy-out"
        >
          CASITA
        </button>
        <button
          class="text-white border-b pb-1 text-sm font-normal hover:scale-110 duration-100 easy-out"
        >
          CORDERO
        </button>
        <button
          class="text-white border-b pb-1 text-sm font-normal hover:scale-110 duration-100 easy-out"
        >
          TRIANGULAR
        </button>
      </div>

      <div>
        <img src="/img/logo_zeramic.webp" class="w-52" alt="" />
      </div>
      <div class="hidden md:flex justify-center gap-4 items-center">
        <button
          class="text-white border-b pb-1 text-sm font-normal hover:scale-110 duration-100 easy-out"
        >
          PLATO
        </button>
        <button
          class="text-white border-b pb-1 text-sm font-normal hover:scale-110 duration-100 easy-out"
        >
          REDONDA
        </button>
        <button
          class="text-white border-b pb-1 text-sm font-normal hover:scale-110 duration-100 easy-out"
        >
          VASO
        </button>
        <button
          class="text-white border-b pb-1 text-sm font-normal hover:scale-110 duration-100 easy-out"
        >
          VELA
        </button>
        <button
          class="text-white border-b pb-1 text-sm font-normal hover:scale-110 duration-100 easy-out"
        >
          CUADRADA
        </button>
      </div>
    </div>

    <div class="bg-white">
      <div
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-5/6 mx-auto pt-10"
      >
        <ProductoCard
          v-for="{ content, uuid, slug } in products"
          :uuid="uuid"
          :key="uuid"
          :content="content"
          :slug="slug"
        />
      </div>
    </div>
    <!-- <pre class="text-xs">{{ products }}</pre> -->
  </div>
</template>
