<script setup lang="ts">
const { client } = useAuth();
</script>
<template>
    <div class="md:flex items-center justify-center max-w-5xl mx-auto p-5">
        <div v-if="client" class="w-full flex gap-4">
            <CuentaNavInfo />
            <div class="w-full">
                <h2 class="text-white p-1 border-b my-3">Mis datos</h2>
                <FormCuenta v-model="client" />
            </div>
        </div>
        <FormLogin v-else class="md:mt-10" />
    </div>
</template>