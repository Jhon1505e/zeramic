<script setup lang="ts">
const model = defineModel<any>({ required: true })

const modal = computed({
    get: () => !!model.value,
    set: () => model.value = null
})

const columns = [
    {
        key: "producto",
        label: "Producto"
    },
    {
        key: "cantidad",
        label: "cantidad"
    },
    {
        key: "valor",
        label: "valor"
    }
]
const json = ref(false)
</script>
<template>
    <UModal v-model="modal">
        <UCard>
            <p>referencia: <small>{{ model?.reference }}</small></p>
            <hr>
            <small class="text-orange-500">crear vista info compra</small>
            <hr>
            <UTable v-if="model?.productos" :columns="columns" :rows="model.productos" />
            <UButton @click="json = !json">json</UButton>
            <div v-if="json" class="w-full overflow-auto">
                <pre class="text-xs">{{ model }}</pre>
            </div>
        </UCard>
    </UModal>
</template>