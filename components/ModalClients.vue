<script setup lang="ts">
const emit = defineEmits(["close"]);
const model = defineModel({ required: true });
</script>

<template>
  <div class="bg-black/60 h-screen fixed top-0 w-full z-20">
    <div class="flex justify-center items-center h-full">
      <div class="bg-PRP rounded-lg max-w-2xl h-1/3">
        <div class="flex w-full justify-between items-center p-2">
          <h2 class="text-center text-white">Información del cliente</h2>
          <button @click="emit('close')" class="p-1 border border-white rounded">
            <IconsClose class="w-5 stroke-white" />
          </button>
        </div>
        <pre class="text-xs text-white">{{ model }}</pre>
      </div>
    </div>
  </div>
</template>
