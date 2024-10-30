<script setup lang="ts">
let story = reactive({
  content: {},
  uuid: "",
});
const error = ref()
const { slug } = useRoute().params;
try {
  story = await useAsyncStoryblok(
    slug && typeof slug !== "string" && slug.length > 0 ? slug.join("/") : "contacto",
    { version: "draft" }
  );
} catch (err: any) {
  console.log(err);
  error.value = err.response
}

const isValidStory = computed(() => {
  return story.uuid !== "";
})
</script>

<template>
  <div class="text-center py-10 md:p-32 space-y-3">
    <StoryblokComponent v-if="isValidStory" :blok="story.content" :uuid="story.uuid" />
    <div v-else>
      <h2>Error 404</h2>
      <p class="text-lg p-2">Pagina no encontrada</p>
      <div>
        <NuxtLink class="text-PRP border rounded border-PRP p-2 mt-6" to="/">Inicio</NuxtLink>
      </div>
    </div>
    <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
  </div>
</template>
