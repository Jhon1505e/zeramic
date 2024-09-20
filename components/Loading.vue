<script setup lang="ts"></script>

<template>
  <div
    class="w-full h-screen z-20 fixed top-0 bg-black/80 flex justify-center items-center"
  >
    <div>
      <NuxtImg
        format="webp"
        src="/img/logo_zeramic.webp"
        class=" mx-auto"
        alt="Zeramic"
      />
      <div class="flex justify-center gap-3 animate-pulse mb-32">
        <IconsSpot class="w-4 fill-white" />
        <IconsSpot class="w-4 fill-white" />
        <IconsSpot class="w-4 fill-white" />
      </div>
    </div>
  </div>
</template>
