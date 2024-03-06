<script setup lang="ts">
const { products, fetchProducts } = useProducts();

fetchProducts();
</script>
<template>
  <div class="bg-gray-200">
    <div class="bg-PRP pt-6  w-full ">
      
      <h2 class="text-4xl text-center md:text-left md:pl-28 font-bold pb-4 text-white">
        Productos Zeramic
      </h2>
      <div class="w-full md:w-5/6 mx-auto flex gap-4 justify-center md:justify-start pb-4 md:pb-0">
        <button
          class="text-white border border-white px-4 py-2 hover:bg-white/30 hover:scale duration-100 ease-in rounded-md fill-white flex gap-2"
        >
        <span class="hidden md:block">Todos</span> 
          <IconsBlock class="w-5 pt-0.5" />
        </button>
        <button
          class="text-white border border-white px-4 py-2 hover:bg-white/30 hover:scale duration-100 ease-in rounded-md fill-white flex gap-2"
        >
         <span class="hidden md:block">Cocina</span> 
          <IconsCocina class="w-5" />
        </button>
        <button
          class="text-white border border-white px-4 py-2 hover:bg-white/30 hover:scale duration-100 ease-in rounded-md fill-white flex gap-2"
        >
        <span class="hidden md:block">Decorativo</span> 
          <IconsSun class="w-5 pt-0.5" />
        </button>
        <button
          class="text-white border border-white px-4 py-2 hover:bg-white/30 hover:scale duration-100 ease-in rounded-md fill-white flex gap-2"
        >
        <span class="hidden md:block">Utilitario</span> 
          <IconsPortaLapiz class="w-5" />
        </button>
        <button
          class="text-white border border-white px-4 py-2 hover:bg-white/30 hover:scale duration-100 ease-in rounded-md fill-white flex gap-2"
        >
        <span class="hidden md:block">Materas</span>
          <IconsMatera class="w-4 pt-1" />
        </button>
      </div>
      <FooterImg class="fill-gray-200 mt-2" />
      
    </div>
    <div class="bg-gray-200">
      <div
        class="grid grid-cols  lg:grid-cols-3 gap-6 w-5/6 mx-auto py-10"
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
