<template>
  <div
    v-editable="blok"
    class="grid gap-12 py-12 place-items-center"
    :class="classNames"
  >
    <StoryblokComponent
      v-for="blok in blok.columns"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>

<script setup>
const props = defineProps({ blok: Object })

const { size } = props.blok

const SIZES = {
  sm: "md:grid-cols-4",
  md: "md:grid-cols-3",
  lg: "md:grid-cols-2",
}

const classNames = computed(() => {
  return SIZES[size] || ''
})
</script>
