<script setup>
const props = defineProps({ blok: Object });

</script>
<template>
    <div>Test

        <pre>{{ blok.name }}</pre>
    </div>
</template>