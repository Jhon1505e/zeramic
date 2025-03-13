<script setup lang="ts">
const model = defineModel();

const modal = computed({
    get: () => !!model.value,
    set: (value) => model.value = null,
})
</script>

<template>
    <UModal v-model="modal" >
        <UCard :ui="{ background: 'bg-PRP' }">
            <p class="text-white font-semibold text-xl"> ¿Está seguro de eliminar este registro?</p>
            <pre class="text-xs text-white">_id: {{ model }}</pre>
            <div class="w-full flex justify-end gap-5">
                <UButton color="red" @click="model = null">Cancelar</UButton>
                <UButton @click="model = null">Eliminar</UButton>
            </div>
        </UCard>
    </UModal>
</template>