<script setup lang="ts">
const emit = defineEmits(["close"]);
</script>

<template>
  <div class="bg-black/60 h-screen fixed top-0 w-full z-20">
    <div class="flex justify-center items-center h-full">
      <div class="bg-PRP rounded-lg w-1/3 h-1/3">
        <div class="flex justify-between px-4">

            <h2 class="text-center text-white">Compras del cliente</h2>
            <button @click="emit('close')"><IconsClose  class="w-5 stroke-white" /></button>
        </div>
      </div>
    </div>
  </div>
</template>
