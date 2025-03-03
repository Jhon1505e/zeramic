<script setup lang="ts">
const { getTracking } = useEnvio();
const seguimiento: ITracking = await getTracking('1580633');

type ITrack = {
    updateState: string;
    date: string;
}

interface ITracking {
    deliveryCompanyName: string;
    guideNumber: string;
    origin: string;
    destiny: string;
    tracking: ITrack[];
}
</script>

<template>
    <div>
        <h3>Seguimiento del Envio</h3>
        <div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-1 pb-2">
                <p>Empresa de envio: {{ seguimiento?.deliveryCompanyName }}</p>
                <p>Nro. Guia: {{ seguimiento?.guideNumber }}</p>
                <p>Origen: {{ seguimiento?.origin }}</p>
                <p>Destino: {{ seguimiento?.destiny }}</p>
            </div>
            <div class="p-4 bg-white/10 rounded-xl">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-1 items-center font-semibold">
                    <div>Fecha y hora:</div>
                    <div>Seguimiento:</div>
                </div>
                <div v-for="track in seguimiento?.tracking" :key="track.date"
                    class="grid grid-cols-1 md:grid-cols-2 gap-1 pt-1 items-center">
                    <div>{{ formatFecha(track.date) }}</div>
                    <div>{{ track.updateState }}</div>
                </div>
            </div>
        </div>
    </div>
</template>