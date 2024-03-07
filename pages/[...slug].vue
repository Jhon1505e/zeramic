<script setup>
const { slug } = useRoute().params;
const story = await useAsyncStoryblok(
  slug && slug.length > 0 ? slug.join("/") : "contacto",
  { version: "draft" }
);
</script>

<template>
  <div class=" mx-auto">
    <StoryblokComponent v-if="story" :blok="story.content" :uuid="story.uuid" />
  </div>
  
</template>
