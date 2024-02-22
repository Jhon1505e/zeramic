<script setup>
const { slug } = useRoute().params;
const story = await useAsyncStoryblok(
  slug && slug.length > 0 ? slug.join("/") : "contacto",
  { version: "draft" }
);
</script>

<template>
  <div>
    
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>
