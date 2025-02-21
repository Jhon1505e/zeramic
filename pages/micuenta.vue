<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div class="bg-PRP">
    <NuxtPage></NuxtPage>
  </div>
</template>
