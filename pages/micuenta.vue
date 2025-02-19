<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div class="bg-PRP h-screen">
    <NuxtPage></NuxtPage>
  </div>
</template>
