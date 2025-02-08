<script setup lang="ts">
const { categoria } = defineProps(["categoria"]);
const model = defineModel();
</script>

<template>
  <button
    @click="model = categoria === model ? 'Todos' : categoria"
    :class="
      model === categoria ? 'text-white bg-PRP fill-white' : 'fill-PRP'
    "
    class="text-PRP border border-PRP px-4 md:px-6 hover:fill-white hover:text-white py-2  hover:bg-PRP hover:scale duration-100 ease-in rounded-xl flex gap-2"
  >
  <slot></slot>
    <span class="hidden md:block">{{ categoria }}</span>
  
  </button>
</template>
