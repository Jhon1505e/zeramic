<template>
  <div v-editable="blok" >
    <h3 class="text-4xl text-white font-bold border-b-2 pb-2 border-white">
      {{ blok.Titulo }}
    </h3>
    <div class="text-white text-lg font-thin space-y-2 py-2 mt-6" v-html="contenido"></div>
  </div>
</template>
<script setup>
const props = defineProps({ blok: Object });
const contenido = computed(() => renderRichText(props.blok.Contenido));
</script>