<script setup lang="ts">
const { products, fetchProducts } = useProducts();

fetchProducts();
</script>
<template>
  <div class="bg-gray-200">
    <div class="bg-PRP w-full">
      <h2
        class="text-4xl md:text-6xl py-20 w-3/4 mx-auto text-center font-bold text-white"
      >
        ¡ Todo lo que necesitas para decorar tu hogar !
      </h2>
    </div>
    <FooterImg class="fill-gray-400 rotate-180" />
    <div class="bg-gray-200 max-w-7xl mx-auto">
      <div
        class="w-full mt-10 mx-auto flex gap-4 justify-center md:justify-end pb-4 md:pb-0"
      >
        <button
          class="text-PRP border border-PRP px-4 hover:fill-white hover:text-white py-2 hover:bg-PRP hover:scale duration-100 ease-in rounded-md fill-PRP flex gap-2"
        >
          <span class="hidden md:block">Cocina</span>
          <IconsCocina class="w-5" />
        </button>
        <button
          class="text-PRP border border-PRP px-4 hover:text-white py-2 hover:bg-PRP hover:scale duration-100 ease-in rounded-md fill-PRP flex gap-2"
        >
          <span class="hidden md:block">Decorativo</span>
          <IconsSun class="w-5 pt-0.5" />
        </button>
        <button
          class="text-PRP border border-PRP px-4 hover:fill-white hover:text-white py-2 hover:bg-PRP hover:scale duration-100 ease-in rounded-md fill-PRP flex gap-2"
        >
          <span class="hidden md:block">Utilitario</span>
          <IconsPortaLapiz class="w-5" />
        </button>
        <button
          class="text-PRP border border-PRP px-4 hover:fill-white hover:text-white py-2 hover:bg-PRP hover:scale duration-100 ease-in rounded-md fill-PRP flex gap-2"
        >
          <span class="hidden md:block">Materas</span>
          <IconsMatera class="w-4 pt-1" />
        </button>
        <button
          class="text-PRP border border-PRP px-4 hover:text-white py-2 hover:bg-PRP hover:scale duration-100 ease-in rounded-md fill-PRP flex gap-2"
        >
          <span class="hidden md:block">Todos</span>
          <IconsBlock class="w-5 pt-0.5" />
        </button>
      </div>
      <div class="grid grid-cols lg:grid-cols-3 gap-6 mx-auto py-10">
        <ProductoCard
          v-for="{ content, uuid, slug } in products"
          :uuid="uuid"
          :key="uuid"
          :content="content"
          :slug="slug"
        />
      </div>
    </div>
    <div></div>
    <FooterImg class="fill-slate-900" />
  </div>
</template>
