<script setup>
const props = defineProps({ blok: Object });
const contenido = computed(() => renderRichText(props.blok.Contenido));
</script>

<template>
  <div v-editable="blok"
    class="bg-PRP">
    <div class="md:w-1/2 mx-auto py-20">

      <h2 class="text-4xl text-white  font-bold text-center">
        {{ blok.Titulo }}
      </h2>
      <div class="mt-4 font-thin text-lg p-3 text-white text-center" v-html="contenido" />
    </div>
  </div>
</template>
