<template>
    <div
      v-editable="blok"
    >
      {{ blok }}
    </div>
  </template>
  
  <script setup>
  defineProps({ blok: Object })
  </script>