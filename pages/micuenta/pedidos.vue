<script setup lang="ts">
const { client } = useAuth();
</script>
<template>
    <div class="md:flex gap-4 max-w-5xl mx-auto p-5">
        <CuentaNavInfo  />
        <div class="w-full">
            <div class="text-xs">{{ client }}</div>
        </div>
    </div>
</template>