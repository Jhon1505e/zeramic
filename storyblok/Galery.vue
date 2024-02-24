<template>
  <div id="default-carousel" class="relative w-full" :class="classNames">

    <div class="relative h-56 overflow-hidden rounded-lg md:h-[450px]">
      <div
        v-for="(image, i) in blok.images"
        :key="image.id"
        :class="{ 'opacity-0': id !== i + 1 }"
        class="duration-700 ease-in-out"
      >
        <img
          :src="image.filename"
          :alt="image.id"
          class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        />
      </div>
    </div>

    <button
      type="button"
      @click="prev"
      class="absolute top-0 start-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <IconsArrow class="w-5 p-1 text-white"></IconsArrow>
        <span class="sr-only">Previous</span>
      </span>
    </button>
    <button
      type="button"
      @click="next"
      class="absolute top-0 end-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <IconsArrow class="w-5 p-1 text-white rotate-180"></IconsArrow>
        <span class="sr-only">Next</span>
      </span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({ blok: Object })
const id = ref(1)
const { images, classNames } = props.blok
function prev() {
  id.value = id.value === 1 ? images.length : id.value - 1
}
function next() {
  id.value = id.value === images.length ? 1 : id.value + 1
}
</script>
