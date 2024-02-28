<script setup lang="ts">
const { products, fetchProducts } = useProducts();

fetchProducts();
</script>
<template>
  <div class="bg-gray-100">
    <div class="bg-PRP pt-2 fixed w-full z-20">
      <hr class="border-gray-500 w-5/6 mx-auto">
      <h2 class="text-4xl pl-28 font-bold pb-4 text-white">
        Productos Zeramic
      </h2>
      <div class="w-5/6 mx-auto flex gap-4 overflow-x-auto">
        <button
          class="text-white border border-white px-4 py-2 hover:bg-white/30 hover:scale duration-100 ease-in rounded-md fill-white flex gap-2"
        >
          Todos
          <IconsBlock class="w-5 pt-0.5" />
        </button>
        <button
          class="text-white border border-white px-4 py-2 hover:bg-white/30 hover:scale duration-100 ease-in rounded-md fill-white flex gap-2"
        >
          Cocina
          <IconsCocina class="w-5" />
        </button>
        <button
          class="text-white border border-white px-4 py-2 hover:bg-white/30 hover:scale duration-100 ease-in rounded-md fill-white flex gap-2"
        >
          Decorativo
          <IconsSun class="w-5 pt-0.5" />
        </button>
        <button
          class="text-white border border-white px-4 py-2 hover:bg-white/30 hover:scale duration-100 ease-in rounded-md fill-white flex gap-2"
        >
          Utilitario
          <IconsPortaLapiz class="w-5" />
        </button>
        <button
          class="text-white border border-white px-4 py-2 hover:bg-white/30 hover:scale duration-100 ease-in rounded-md fill-white flex gap-2"
        >
          Materas
          <IconsMatera class="w-4 pt-1" />
        </button>
      </div>
      <FooterImg class="fill-white mt-2" />
      
    </div>
    <div class="bg-white mt-40">
      <div
        class="grid grid-cols sm:grid-cols-3 lg:grid-cols-4 gap-6 w-5/6 mx-auto py-10"
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
    <div>
      
    </div>
    <FooterImg class="fill-slate-900" />

    <!-- <pre class="text-xs">{{ products }}</pre> -->
  </div>
</template>
