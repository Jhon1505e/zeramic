<script setup lang="ts">
const { client } = useClient();
</script>
<template>
    <div class="md:flex gap-4 max-w-5xl mx-auto p-5">
        <CuentaNavInfo />
        <div class="w-full">
            <pre class="text-xs">{{ client }}</pre>
            <h2 class="text-white p-1 border-b my-3">Mis datos</h2>
            <FormCuenta />
        </div>
    </div>
</template>