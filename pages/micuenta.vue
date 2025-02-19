<script setup lang="ts">
const { client } = useClient();
</script>

<template>
  <div class="bg-PRP h-screen">
    {{ client }}
    <NuxtPage></NuxtPage>
  </div>
</template>
