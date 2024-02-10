<script setup>
const story = await useAsyncStoryblok("home", { version: "draft" })

const content = computed(() => {
  if (!story.value) return
  const items = story.value.content.body
  return items.find((item) => item.component === "purplerow")
})
</script>

<template>
  <div class="bg-PRP h-screen">
    <div class="flex justify-center w-1/2 pt-10 mx-auto">
      <img src="/img/logo_zeramic.webp" alt="" />
    </div>
    <div class="w-full bg-PRP">
      <img src="/img/products_index.webp" class="mx-auto" alt="" />
    </div>
    <div
      class="relative bg-fixed bg-cover bg-center h-full"
      style="background-image: url('/img/background.png')"
    >
      <div class="absolute inset-0 backdrop-brightness-50"></div>
      <div class="w-full flex justify-center items-center absolute inset-0">
        <div>
          <img src="/img/text_index.webp" class="w-2/3 mx-auto" alt="" />
          <h2 class="text-white text-md mt-8 py-3 font-bold">
            NOS INSPIRA A CREAR BELLAS PIEZAS QUE GUARDAN SU ESENCIA, SUS
            FORMAS, SUS COLORES...
          </h2>
        </div>
      </div>
    </div>

    <!-- <StoryblokComponent
      class="bg-PRP text-white text-center px-20"
      v-if="story"
      :blok="content"
    />
 -->
 <div class="h-96 bg-PRP">

 </div>
    <div class="w-full md:w-1/2 mx-auto px-6 md:px-0 py-10">
      <img src="/img/logos_index.png" alt="" />
    </div>
    <Footer />
  </div>
</template>
