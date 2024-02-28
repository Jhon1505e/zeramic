<template>
  <div v-editable="blok" class="bg-PRP p-10">
    <h3 class="text-3xl text-white font-bold border-b-2 pb-2 border-white">
      {{ blok.Titulo }}
    </h3>
    <div class="text-white text-lg space-y-3 p-2" v-html="contenido"></div>
  </div>
</template>
<script setup>
const props = defineProps({ blok: Object });
const contenido = computed(() => renderRichText(props.blok.Contenido));
</script>