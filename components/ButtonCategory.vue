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
    class="text-PRP border border-PRP px-4 hover:fill-white hover:text-white py-2 hover:bg-PRP hover:scale duration-100 ease-in rounded-md flex gap-2"
  >
    <span class="hidden md:block">{{ categoria }}</span>
    <slot />
  </button>
</template>
