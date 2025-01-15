<script setup lang="ts">
import type { NuxtLink } from '#build/components';
import ResumenCompra from '~/components/ResumenCompra.vue';
</script>

<template>
    <div class="text-center px-10 pt-4 pb-32 bg-PRP">
        <ResumenCompra/>
        
        <NuxtPage></NuxtPage>
    </div>
</template>