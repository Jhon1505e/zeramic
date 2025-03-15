<script setup lang="ts">
import type { IEnvio } from '~/types/sends';

const { envio, saveEnvio, cotizarEnvio } = useEnvio();
const { client } = useAuth();
const { total } = useShopping();
const envios = ref<IEnvio[]>([]);

onMounted(async () => {
    if (!client.value?.locationCode)
        return navigateTo("/micuenta");
    const data = {
        locationCode: client.value.locationCode,
        declaredValue: total.value,
    }
    envios.value = await cotizarEnvio(data);
    !envio.value && saveEnvio(sortEnvios.value[0]);

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
    <div>
        <div class="grid grid-cols-1 md:grid-cols-2 duration-150 ease-in-out px-4 gap-4"
            :class="{ 'opacity-0 -translate-y-2': !envios.length }">
            <div v-for="item in sortEnvios" :key="item.deliveryCompanyName" @click="selectEnvio(item)"
                class="p-2 text-PRP cursor-pointer hover:bg-PRP/30 duration-150 text-sm border border-PRP/10 rounded-lg"
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
        <div v-if="!envios.length" class="col-span-2 flex items-center justify-center p-24">
            <div class="text-center w-full">
                <p class="text-xs text-gray-400">Cotizando envío...</p>
                <UProgress animation="carousel" />
            </div>
        </div>
    </div>
</template>