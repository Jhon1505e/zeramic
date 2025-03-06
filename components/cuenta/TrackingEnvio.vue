<script setup lang="ts">
const { getTracking } = useEnvio();
const props = defineProps({ mpCode: String });
const seguimiento = ref<ITracking>();
const message = ref<String>();

type ITrack = {
  updateState: string;
  date: string;
};

interface ITracking {
  deliveryCompanyName: string;
  guideNumber: string;
  origin: string;
  destiny: string;
  tracking: ITrack[];
}

const handleTracking = async () => {
  if (!props.mpCode) return;
  const { data, error } = await getTracking(props.mpCode);
  if (error) {
    message.value = error;
    return;
  }
  seguimiento.value = data;
};

await handleTracking();
</script>

<template>
  <div class="px-5 py-2 bg-PRP rounded-lg text-white">
    <p class="text-2xl font-semibold pt-2">Seguimiento del Envio</p>
    <hr class="my-2 border-white/20" />
    <div>
      <p v-if="message" class="text-red-500 text-sm">{{ message }}</p>
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-1 px-4 bg-white/10 py-3 rounded-xl font-thin"
      >
        <p>
          <b>Empresa de envio: </b> <br />
          {{ seguimiento?.deliveryCompanyName }}
        </p>
        <p>
          <b>Nro. Guia: </b> <br />
          {{ seguimiento?.guideNumber }}
        </p>
        <p>
          <b>Origen: </b><br />
          {{ seguimiento?.origin }}
        </p>
        <p>
          <b>Destino: </b><br />
          {{ seguimiento?.destiny }}
        </p>
      </div>
      <hr class="my-4 border-white/20" />

      <div class="p-4 bg-white/10 rounded-xl overflow-auto h-80">
        <div
          v-for="track in seguimiento?.tracking"
          :key="track.date"
          class="flex gap-2"
        >
          <div>
            <div
              class="p-2 bg-white/10 rounded-full flex justify-center items-center"
            >
              <IconsCheck class="text-white w-7" />
            </div>
            <div class="rotate-90 p-1">
              <IconsMinus class="w-10 stroke-white stroke-4 rounded-xl" />
            </div>
          </div>
          <div>
            <b>{{ track.updateState }}</b>
            <p class="font-thin">{{ formatFecha(track.date) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
