<script setup lang="ts">
const model = defineModel();

const modal = computed({
    get: () => !!model.value,
    set: (value) => model.value = null,
})
</script>

<template>
    <UModal v-model="modal">
        <UCard>
            <p>Esta seguro de eliminar este registro?</p>
            <pre class="text-xs">_id: {{ model }}</pre>
            <div class="w-full flex justify-end gap-5">
                <UButton color="red" @click="model = null">Cancel</UButton>
                <UButton @click="model = null">Confirm</UButton>
            </div>
        </UCard>
    </UModal>
</template>