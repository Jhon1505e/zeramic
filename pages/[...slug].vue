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
  <div class="text-center ">
    <StoryblokComponent v-if="isValidStory" :blok="story.content" :uuid="story.uuid" />
    <div v-else class="py-28 bg-PRP flex justify-center items-center">
      <div>
        <IconsError class="w-40 mx-auto fill-white" />
        
        <p class="text-3xl mt-5 font-bold text-white">Pagina no encontrada</p>
        <div class="mt-6">
          <NuxtLink class="text-white bg-white/10 border  rounded-xl border-white px-6 py-2 text-xl " to="/">Inicio</NuxtLink>
        </div>
      </div>
    </div>
    <div  v-if="error" class="text-red-500 text-sm bg-PRP">{{ error }}</div>
  </div>
</template>
