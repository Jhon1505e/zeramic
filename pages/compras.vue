<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>

<template>
    <div>
        <TabsCompras />
        <NuxtPage></NuxtPage>
    </div>
</template>