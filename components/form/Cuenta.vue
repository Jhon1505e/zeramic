<script setup lang="ts">
import type { IClient } from '~/types/clients';
import { z } from 'zod'

const model = defineModel<IClient>({ required: true });
const { saveClient } = useClient()
const { saveEnvio } = useEnvio();
const { start, finish } = useLoadingIndicator();
const toast = useToast()

const client = reactive({ ...model.value });

const schema = z.object({
    fullName: z.string().min(1, 'Requerido'),
    email: z.string().email('Email inválido'),
    phone: z.string().regex(/^\d{10}$/, 'Número de celular inválido'),
    docType: z.string().min(1, 'Requerido'),
    docId: z.number().min(99999, 'Requerido'),
    address: z.string().min(1, 'Requerido'),
    infoDirection: z.string().min(1, 'Requerido'),
    departmentCode: z.string().min(1, 'Requerido'),
    locationCode: z.string().min(1, 'Requerido'),
})

async function onSubmit() {
    start();
    await saveClient(client)
    model.value = client
    saveEnvio()
    finish();
    toast.add({
        title: "Datos Actualizados",
        icon: "i-heroicons-check-circle",
        timeout: 3500,
        description: "Se actualizaron tus datos de cuenta",
        color: "emerald",
    });
};

const ui = { label: { base: 'text-white' } }
const size = 'md'

const docTypes = [
    { label: 'Tarjeta Identidad', value: 'TI' },
    { label: 'Cedula', value: 'CC' },
    { label: 'NIT', value: 'NIT' },
    { label: 'Pasaporte', value: 'PP' },
    { label: 'DNI', value: 'DNI' },
    { label: 'RG', value: 'RG' },
    { label: 'Otro', value: 'OTHER' },
]
</script>
<template>
    <div class="w-full">
        <UForm :schema="schema" :state="client" class="space-y-4" @submit="onSubmit">
            <div>
                <div class="grid md:grid-cols-2 gap-3 p-2">
                    <UFormGroup :ui="ui" label="Nombres y Apellidos" name="fullName">
                        <UInput size="xl" icon="i-heroicons-user" placeholder="Nombres y Apellidos"
                            v-model="client.fullName" />
                    </UFormGroup>
                    <UFormGroup :ui="ui" label="Email" name="email">
                        <UInput size="xl" icon="i-heroicons-envelope" placeholder="Email" v-model="client.email"
                            readonly />
                    </UFormGroup>
                </div>
                <div class="grid md:grid-cols-3 gap-3 p-2">
                    <UFormGroup :ui="ui" label="Celular" name="phone">
                        <UInput size="xl" type="text" icon="i-heroicons-phone" placeholder="Celular"
                            v-model.trim="client.phone" />
                    </UFormGroup>
                    <UFormGroup :ui="ui" label="Tipo de Documento" name="docType">
                        <USelect size="xl" icon="i-heroicons-identification" :options="docTypes"
                            placeholder="Tipo de Documento" v-model="client.docType" />
                    </UFormGroup>
                    <UFormGroup :ui="ui" label="Número de Documento" name="docId">
                        <UInput type="number" v-model="client.docId" size="xl" icon="i-heroicons-hashtag"
                            placeholder="Número de Documento" />
                    </UFormGroup>
                </div>
            </div>

            <FormLocations v-model="client" />

            <div class="grid md:grid-cols-2 gap-3 p-2">
                <UFormGroup :ui="ui" label="Dirección" name="address">
                    <UInput type="text" v-model="client.address" size="xl" icon="i-heroicons-map-pin"
                        placeholder="Dirección" />
                </UFormGroup>
                <UFormGroup :ui="ui" label="Información adicional" name="infoDirection">
                    <UInput type="text" v-model="client.infoDirection" size="xl" icon="i-heroicons-information-circle"
                        placeholder="Información adicional" />
                </UFormGroup>
            </div>

            <UButton type="submit" block label="Actualizar" trailing icon="i-heroicons-arrow-right"
                class="border mx-auto px-6 py-2 mt-4 w-1/3 bg-white/10 text-white rounded-lg" />
        </UForm>
    </div>
</template>