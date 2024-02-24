<script setup>
const props = defineProps({ blok: Object });
const contenido = computed(() => renderRichText(props.blok.Contenido));
</script>

<template>
  <div v-editable="blok"
    class="py-20">
    <h2 class="text-3xl text-white  font-bold text-center">
      {{ blok.Titulo }}
    </h2>
    <div class="mt-6 font-light p-3 text-white" v-html="contenido" />
  </div>
</template>
