<script setup lang="ts">


const { products, fetchProducts } = useProducts();

const categoria = ref("Todos");

const categorias = ["Todos", "Cocina", "Decorativo", "Utilitario", "Materas" ];

await fetchProducts();



const filterProducts = computed(() => {
  return products.value.filter(
    (item) => item.content?.Categoria === categoria.value || categoria.value === "Todos"
  );
});
</script>
<template>
  <div class="bg-gray-200">
    <div class="bg-PRP w-full">
      <h2
        class="text-4xl md:text-6xl py-10 md:py-20 w-3/4 mx-auto text-center font-bold text-white"
      >
        ¡ Todo lo que necesitas <br class="hidden md:block"> para decorar tu hogar !
      </h2>
    </div>
    <FooterImg class="fill-gray-400 rotate-180" />
    <div class="bg-gray-200 max-w-7xl mx-auto py-10">
      <div
        class="w-4/5 mt-0 md:mt-8 mx-auto  flex gap-4 justify-center md:justify-start "
      >
        <template v-for="cat in categorias">
          <ButtonCategory v-model="categoria" :categoria="cat">
            <IconsTodos v-if="cat === 'Todos'" class="w-5 md:pt-0.5" />
            <IconsCocina v-if="cat === 'Cocina'" class="w-5" />
            <IconsDecorativo v-if="cat === 'Decorativo'" class="w-5" />
            <IconsUtilitario v-if="cat === 'Utilitario'" class="w-5" />
            <IconsMateras v-if="cat === 'Materas'" class="w-5" />
          </ButtonCategory>
        </template>

      </div>
      <div class="text-center sm:hidden py-6">

        <p class="text-2xl font-bold text-PRP">
          <span v-if="categoria !== 'Todos'">Productos </span>
          <span v-if="categoria === 'Cocina' || categoria === 'Materas' ">de</span>
          {{ categoria }}<span v-if="categoria === 'Decorativo' || categoria === 'Utilitario' ">s</span> 
          <span v-if="categoria === 'Todos'"> los productos</span>
        </p>
      </div>
      <!-- <div class="grid grid-cols lg:grid-cols-3 gap-6 mx-auto py-10"> -->
      <div class="w-5/6 grid  grid-cols md:grid-cols-3  grid-flow-row gap-6 pb-10 md:pt-8 md:w-4/5 mx-auto justify-center">
        <transition-group mode="out-in"
        leave-to-class="scale-95 opacity-0 transition-all"
        leave-active-class="transition-all duration-300"
        >
          <ProductoCard
            v-for="{ content, uuid, slug } in filterProducts"
            :uuid="uuid"
            :key="uuid"
            :content="content"
            :slug="slug"
          />
        </transition-group>
      </div>
      <!-- </div> -->
    </div>
    <div></div>
  </div>
</template>
