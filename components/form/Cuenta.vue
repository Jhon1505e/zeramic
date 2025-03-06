<script setup lang="ts">
import type { IClient } from '~/types/clients';

const client = defineModel<IClient>({ required: true });
const { saveClient } = useClient()
const { saveEnvio } = useEnvio();
const { isLoading } = useLoadingIndicator();

const handleSubmit = () => {
    saveClient(client.value)
    saveEnvio()
};
</script>
<template>
    <div class="w-full">
        <form @submit.prevent="handleSubmit">
            <div>
                <div class="grid md:grid-cols-2 gap-3 p-2">
                    <div class="w-full">
                        <label for="name" class="text-white">Nombres y Apellidos:</label>
                        <input v-model="client.fullName" type="text" required id="name"
                            class="w-full py-2 px-4 mt-2 rounded-lg border text-gray-700"
                            placeholder="Nombres y Apellidos" />
                    </div>
                    <div class="w-full">
                        <label for="email" class="text-white">Email:</label>
                        <input v-model="client.email" required id="email" type="email"
                            class="py-2 w-full px-4 mt-2 rounded-lg text-gray-700 bg-white border" readonly />
                    </div>
                </div>
                <div class="grid md:grid-cols-3 gap-3 p-2">
                    <div class="w-full">
                        <label for="phone" class="text-white">Celular:</label>
                        <input v-model="client.phone" required type="number"
                            class="py-2 w-full px-4 rounded-lg text-gray-700 bg-white mt-2 border"
                            placeholder="Celular" />
                    </div>
                    <div class="w-full">
                        <label for="docType" class="text-white">Tipo de Documento:</label>
                        <select v-model="client.docType" required id="docType"
                            class="py-2.5 w-full px-4 rounded-lg text-gray-700 bg-white mt-2 border">
                            <option value="">Seleccionar</option>
                            <option value="TI">Tarjeta de identidad</option>
                            <option value="CC">Cédula</option>
                        </select>
                    </div>
                    <div class="w-full">
                        <label for="docId" class="text-white">Número de Documento:</label>
                        <input v-model="client.docId" required type="number"
                            class="w-full py-2 px-4 rounded-lg text-gray-700 bg-white mt-2 border"
                            placeholder="Número de Documento" />
                    </div>
                </div>
            </div>

            <FormLocations v-model="client" />

            <div class="grid md:grid-cols-2 gap-3 p-2">
                <div class="w-full">
                    <label for="address" class="text-white">Dirección:</label>
                    <input required v-model="client.address" type="text" id="address"
                        class="w-full py-2 px-4 rounded-lg text-gray-700 bg-white mt-2 border"
                        placeholder="Dirección" />
                </div>
                <div class="w-full">
                    <label for="infoDirection" class="text-white">Información adicional:</label>
                    <input required v-model="client.infoDirection" type="text" id="infoDirection"
                        class="w-full py-2 px-4 rounded-lg text-gray-700 bg-white mt-2 border"
                        placeholder="Información adicional" />
                </div>
            </div>

            <UButton type="submit" block label="Actualizar" :loading="isLoading" trailing icon="i-heroicons-arrow-right"
                class="border mx-auto px-6 py-2 mt-4 w-1/3 bg-white/10 text-white rounded-lg" />
        </form>
    </div>
</template>