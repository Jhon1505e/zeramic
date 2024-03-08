<script setup lang="ts">
import ButtonCategory from "~/components/ButtonCategory.vue";

const { products, fetchProducts } = useProducts();

const categoria = ref("Todos");

const categorias = ["Cocina", "Decorativo", "Utilitario", "Materas", "Todos"];

fetchProducts();

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
        ¡ Todo lo que necesitas para decorar tu hogar !
      </h2>
    </div>
    <FooterImg class="fill-gray-400 rotate-180" />
    <div class="bg-gray-200 max-w-7xl mx-auto">
      <div
        class="w-full mt-10 mx-auto  flex gap-4 justify-center md:justify-end pb-4 md:pb-0"
      >
        <template v-for="cat in categorias">
          <ButtonCategory v-model="categoria" :categoria="cat">
            <IconsCocina class="w-5" />
          </ButtonCategory>
        </template>
      </div>
      <!-- <div class="grid grid-cols lg:grid-cols-3 gap-6 mx-auto py-10"> -->
      <div class="w-5/6 grid  grid-cols md:grid-cols-3  grid-flow-row gap-6 py-10 md:w-4/5 mx-auto justify-center">
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
    <FooterImg class="fill-slate-900" />
  </div>
</template>
