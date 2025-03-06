<script setup lang="ts">
const { isLoading } = useLoadingIndicator();
</script>

<template>
  <div :class="{ 'scale-105 -translate-y-2 opacity-0 invisible': !isLoading }"
    class="w-full z-50 fixed top-0 bg-black/80 h-screen flex justify-center items-center duration-75">
    <div>
      <NuxtImg format="webp" src="/img/logo_zeramic.webp" class=" mx-auto" alt="Zeramic" />
      <div class="flex justify-center gap-3 animate-pulse mb-32">
        <IconsSpot class="w-4 animate-spin stroke-white fill-none" />
        <IconsSpot class="w-4 animate-bounce stroke-white fill-none" />
        <IconsSpot class="w-4 animate-spin stroke-white fill-none" />
      </div>
    </div>
  </div>
</template>
