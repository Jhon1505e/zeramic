<script setup>
const props = defineProps({ blok: Object });
const contenido = computed(() => renderRichText(props.blok.Contenido));
</script>

<template>
  <div v-editable="blok"
    class="py-20">
    <h2 class="font-bold text-4xl">
      {{ blok.Titulo }}
    </h2>
    <div class="text-xl mt-6 font-thin" v-html="contenido" />
  </div>
</template>
