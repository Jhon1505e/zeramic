<script setup lang="ts">
const { client, incomplete } = useAuth();

const json = ref(false)
</script>
<template>
    <div class="md:flex items-center justify-center max-w-5xl mx-auto p-3 md:p-5">
        <div v-if="client" class="w-full md:flex gap-4">
            <CuentaNavInfo />
            <div class="w-full">
                <h2 class="text-white p-1 my-3">Mis datos</h2>
                
                <div v-if="incomplete" class="bg-red-400 rounded p-1 text-sm">Completa los datos para poder comprar</div>
                <!-- <pre class="text-xs text-white">{{ client }}</pre> -->
                <FormCuenta v-model="client" />
                
                <DevOnly>
                    <UButton class="mt-4" @click="json = !json">json</UButton>
                    <div v-if="json" class="fixed z-30 bottom-1 right-1 bg-white/70 text-xs"><pre>{{ client }}</pre></div>
                </DevOnly>

            </div>
        </div>
        <FormLogin v-else class="md:mt-10" />
    </div>
</template>