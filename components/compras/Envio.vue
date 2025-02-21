<script setup lang="ts">
import type { IEnvio } from '~/types/sends';

const { envio, saveEnvio, cotizarEnvio } = useEnvio();
const { client } = useAuth();
const envios = ref<IEnvio[]>([]);

onMounted(async () => {
    if (client.value?.locationCode) {
        const data = {
            locationCode: client.value.locationCode,
            declaredValue: 100000,
        }
        envios.value = await cotizarEnvio(data);
        !envio.value && saveEnvio(sortEnvios.value[0]);
    }
});

const sortEnvios = computed(() => {
    const items = [...envios.value];
    return items.sort((a, b) => a.shippingCost - b.shippingCost);
});

const selectEnvio = (item: IEnvio) => {
    saveEnvio(item);
}
</script>
<template>
    <div class="grid grid-cols-1 md:grid-cols-2 px-4 gap-4">
        <div v-for="item in envios" :key="item.deliveryCompanyName" @click="selectEnvio(item)"
            class="p-2 text-PRP cursor-pointer hover:bg-PRP/30 duration-100 text-sm border border-PRP/10 rounded-lg"
            :class="{ 'bg-indigo-800 text-white': envio?.deliveryCompanyName === item.deliveryCompanyName }">
            <div class="flex gap-4 items-center py-2 px-4 rounded">
                <img :src="item.deliveryCompanyImgUrl" class="h-14 rounded-xl" alt="" />
                <div class="font-thin text-sm">
                    <strong>{{ item.deliveryCompanyName }}</strong>
                    <p class="capitalize">{{ item.routeType }}</p>
                    <p><strong class="mr-1">Días habiles:</strong>{{ item.insurancePercentage * 100 }}</p>
                    <p class="font-semibold">Valor: {{ formatMoneda(item.shippingCost) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>