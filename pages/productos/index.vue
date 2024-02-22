<script setup lang="ts">
const { products, fetchProducts } = useProducts();

fetchProducts();
</script>
<template>
  <div class="bg-PRP">
    <div class="bg-gray-100">
      <div class="bg-white py-10">

     <h2 class="text-4xl pl-28 font-bold pb-4 text-PRP">Productos Zeramic</h2>
      <div class="w-5/6 mx-auto flex gap-4 overflow-x-auto">
        <button class="text-PRP border border-PRP px-4 py-2 hover:bg-PRP hover:text-white duration-100 ease-in focus:bg-PRP focus:text-white rounded-md fill-PRP hover:fill-white focus:fill-white flex gap-2">
          Todos
         <IconsBlock class="w-5 pt-0.5" />  
        </button>
        <button class="text-PRP border border-PRP px-4 py-2 hover:bg-PRP hover:text-white duration-100 ease-in focus:bg-PRP focus:text-white rounded-md fill-PRP hover:fill-white focus:fill-white flex gap-2">
          Cocina
         <IconsCocina class="w-5" />  
        </button>
        <button class="text-PRP border border-PRP px-4 py-2 hover:bg-PRP hover:text-white duration-100 ease-in focus:bg-PRP focus:text-white rounded-md fill-PRP hover:fill-white focus:fill-white flex gap-2">
          Decorativo
         <IconsSun class="w-5 pt-0.5" />  
        </button>
        <button class="text-PRP border border-PRP px-4 py-2 hover:bg-PRP hover:text-white duration-100 ease-in focus:bg-PRP focus:text-white rounded-md fill-PRP hover:fill-white focus:fill-white flex gap-2">
          Utilitario
         <IconsPortaLapiz class="w-5 " />  
        </button>
        <button class="text-PRP border border-PRP px-4 py-2 hover:bg-PRP hover:text-white duration-100 ease-in focus:bg-PRP focus:text-white rounded-md fill-PRP hover:fill-white focus:fill-white flex gap-2">
          Materas
         <IconsMatera class="w-4 pt-1" />  
        </button>
        
      </div> </div>
      <div class="w-full">
        <img src="/img/wave.png" class="w-full h-10" alt="" />
      </div>
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
    <!-- <pre class="text-xs">{{ products }}</pre> -->
  </div>
</template>
