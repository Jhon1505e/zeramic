<script setup lang="ts">
const route = useRoute();
const modal = ref(false);
const loading = ref(false);
import { type IClient } from "~/types/clients";
const dataClient = defineModel<IClient>({ required: true });
const emit = defineEmits(["submit"]);
const { envio, saveEnvio } = useEnvio();
defineProps<{ save?: boolean }>();

interface IDeparment {
  departmentCode: string;
  departmentOrStateName: string;
}
interface ILocation {
  locationCode: string;
  locationName: string;
}

interface IData extends ILocation, IDeparment { }

const data = ref<IData[]>([]);

async function getData() {
  const data = await $fetch(
    "https://api-v2.dev.mpr.mipaquete.com/getLocations",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "session-tracker": "a0c96ea6-b22d-4fb7-a278-850678d5429c",
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmYxZjA0MzMzNjk2M2YzMzBlN2FmOTYiLCJuYW1lIjoiRGF2aWQiLCJzdXJuYW1lIjoiUm9tYW4iLCJlbWFpbCI6InJvbWFuLmRhdmlkQGdtYWlsLmNvbSIsImNlbGxQaG9uZSI6IjMxMzY1OTI3MTYiLCJjcmVhdGVkQXQiOiIyMDI0LTA5LTIzVDIyOjQ4OjM1Ljc1MFoiLCJkYXRlIjoiMjAyNS0wMi0wNCAyMzowNTowNCIsImlhdCI6MTczODcyODMwNH0.QMAhuc2jtMZ6nF3W1rvt_93me50ntS8JbQrj1PFhAuE",
      },
    }
  );
  return data as IData[];
}

data.value = await getData();

const departments = computed(() => {
  const uniqueDepartments: Record<string, IDeparment> = {};
  data.value.forEach((item) => {
    if (!uniqueDepartments[item.departmentCode]) {
      uniqueDepartments[item.departmentCode] = {
        departmentCode: item.departmentCode,
        departmentOrStateName: item.departmentOrStateName,
      };
    }
  });
  return Object.values(uniqueDepartments).sort((a, b) => {
    if (a.departmentOrStateName < b.departmentOrStateName) return -1;
    if (a.departmentOrStateName > b.departmentOrStateName) return 1;
    return 0;
  });
});

const filteredLocations = computed(() => {
  if (!dataClient.value.departmentCode) return [];
  const toOrder = data.value.filter(
    (item) => item.departmentCode === dataClient.value.departmentCode
  );
  return toOrder.sort((a, b) => {
    if (a.locationName < b.locationName) return -1;
    if (a.locationName > b.locationName) return 1;
    return 0;
  });
});

const envios = ref();
async function cotizarEnvio() {

  modal.value = true;
  envios.value = await $fetch("https://api-v2.mpr.mipaquete.com/quoteShipping", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "session-tracker": "a0c96ea6-b22d-4fb7-a278-850678d5429c",
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmYxZjA0MzMzNjk2M2YzMzBlN2FmOTYiLCJuYW1lIjoiRGF2aWQiLCJzdXJuYW1lIjoiUm9tYW4iLCJlbWFpbCI6InJvbWFuLmRhdmlkQGdtYWlsLmNvbSIsImNlbGxQaG9uZSI6IjMxMzY1OTI3MTYiLCJjcmVhdGVkQXQiOiIyMDI0LTA5LTIzVDIyOjQ4OjM1Ljc1MFoiLCJkYXRlIjoiMjAyNS0wMi0wNCAyMzowNTowNCIsImlhdCI6MTczODcyODMwNH0.QMAhuc2jtMZ6nF3W1rvt_93me50ntS8JbQrj1PFhAuE",
    },
    body: {
      originCountryCode: "170",
      originLocationCode: "05001000",
      destinyCountryCode: "170",
      destinyLocationCode: dataClient.value.locationCode,
      quantity: 1,
      width: 20,
      length: 20,
      height: 20,
      weight: 1,
      declaredValue: 20000,
    },
  });
}

function selectEnvio(item: any) {
  saveEnvio({
    deliveryCompanyImgUrl: item.deliveryCompanyImgUrl,
    deliveryCompanyName: item.deliveryCompanyName,
    routeType: item.routeType,
    insurancePercentage: item.insurancePercentage,
    shippingCost: item.shippingCost,
  });
  // modal.value = false;
}
</script>
<template>
  <div v-if="modal" class="fixed z-20 top-0 h-screen left-0 right-0 bg-black/90">
    <div class="flex justify-center items-center h-full">
      <div class="w-1/2 bg-PRP rounded-lg">
        <div class="flex justify-between px-6">
          <h2 class="text-white">Seleccionr envio: {{ formatMoneda(envio?.shippingCost || 0) }}</h2>
          <button @click="modal = false">
            <IconsClose class="w-7 mt-2 stroke-white" />
          </button>
        </div>
        <div class="grid md:grid-cols-2 gap-3 px-5 pt-3 pb-5">
          <div v-for="item in envios" :key="item" @click="selectEnvio(item)"
            class="p-2 text-white cursor-pointer duration-100 hover:bg-white/30 text-sm border border-white/10 rounded-lg"
            :class="{ 'bg-indigo-800': envio?.deliveryCompanyName === item.deliveryCompanyName }">
            <div class="flex gap-4 items-center">
              <img :src="item.deliveryCompanyImgUrl" class="h-14 rounded-xl" alt="" />
              <div class="font-thin">
                <b>{{ item.deliveryCompanyName }}</b>
                <p class="capitalize">{{ item.routeType }}</p>
                <p> <b class="mr-1">Días habiles:</b>{{ item.insurancePercentage * 100 }}</p>
                <p> <b>Valor:</b> {{ formatMoneda(item.shippingCost) }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full text-center pb-3">
          <button @click="modal = false" class="px-6 py-2 bg-white/10 text-white rounded-lg">Aceptar</button>
        </div>
      </div>
    </div>
  </div>
  <loading v-if="loading" />

  <form @submit.prevent="emit('submit')">
    <!--  <pre class="text-xs">{{ dataClient }}</pre> -->
    <div v-if="route.path === '/cuenta'">
      <div class="grid md:grid-cols-2 gap-3 p-2">
        <div class="w-full">
          <label for="name" class="text-white">Nombres y Apellidos:</label>
          <input v-model="dataClient.name" type="text" required id="name"
            class="w-full py-2 px-4 mt-2 rounded-lg bg-white border text-PRP" placeholder="Nombres y Apellidos" />
        </div>
        <div class="w-full">
          <label for="email" class="text-white">Email:</label>
          <input v-model="dataClient.email" required id="email" type="email"
            class="py-2 w-full px-4 mt-2 rounded-lg text-PRP bg-white border" readonly />
        </div>
      </div>
      <div class="grid md:grid-cols-3 gap-3 p-2">
        <div class="w-full">
          <label for="phone" class="text-white">Celular:</label>
          <input v-model="dataClient.phone" required type="number"
            class="py-2 w-full px-4 rounded-lg text-PRP bg-white mt-2 border" placeholder="Celular" />
        </div>
        <div class="w-full">
          <label for="docType" class="text-white">Tipo de Documento:</label>
          <select v-model="dataClient.docType" required id="docType"
            class="py-2.5 w-full px-4 rounded-lg text-PRP bg-white mt-2 border">
            <option value="">Seleccionar</option>
            <option value="TI">Tarjeta de identidad</option>
            <option value="CC">Cédula</option>
          </select>
        </div>
        <div class="w-full">
          <label for="docId" class="text-white">Número de Documento:</label>
          <input v-model="dataClient.docId" required type="number"
            class="w-full py-2 px-4 rounded-lg text-PRP bg-white mt-2 border" placeholder="Número de Documento" />
        </div>
      </div>
    </div>
    <div class="grid md:grid-cols-2 gap-3 p-2">
      <div class="w-full">
        <label for="state" class="text-white">Departamento:</label>
        <select v-model="dataClient.departmentCode" required id="state"
          class="w-full py-2.5 px-4 rounded-lg text-PRP bg-white mt-2 border">
          <option value="">Seleccionar</option>
          <option v-for="state in departments" :value="state.departmentCode">
            {{ state.departmentOrStateName }}
          </option>
        </select>
      </div>
      <div class="w-full">
        <label for="city" class="text-white">Ciudad:</label>
        <select required id="city" v-model="dataClient.locationCode"
          class="w-full py-2.5 px-4 rounded-lg text-PRP bg-white mt-2 border">
          <option value="">Seleccionar</option>
          <option v-for="city in filteredLocations" :value="city.locationCode">
            {{ city.locationName }}
          </option>
        </select>
      </div>
      <div class="w-full">
        <label for="address" class="text-white">Dirección:</label>
        <input required v-model="dataClient.address" type="text" id="address"
          class="w-full py-2 px-4 rounded-lg text-PRP bg-white mt-2 border" placeholder="Dirección" />
      </div>
      <div class="w-full">
        <label for="infoDirection" class="text-white">Información adicional:</label>
        <input required v-model="dataClient.infoDirection" type="text" id="infoDirection"
          class="w-full py-2 px-4 rounded-lg text-PRP bg-white mt-2 border" placeholder="Información adicional" />
      </div>
    </div>

    <div class="flex justify-around gap-5 items-center py-2">
      <div v-if="envio" class="flex gap-4 items-center border py-2 px-4 rounded">
        <img :src="envio.deliveryCompanyImgUrl" class="h-14 rounded-xl" alt="" />
        <div class="font-thin text-sm text-white">
          <b>{{ envio.deliveryCompanyName }}</b>
          <p class="capitalize">{{ envio.routeType }}</p>
          <p> <b class="mr-1">Días habiles:</b>{{ envio.insurancePercentage * 100 }}</p>
          <p> <b>Valor:</b> {{ formatMoneda(envio.shippingCost) }}</p>
        </div>
      </div>

      <button type="button" class="border px-6 py-2 mt-4 mr-2 bg-white/10 text-white rounded-lg" @click="cotizarEnvio">
        Seleccionar Envio
      </button>
      <button type="submit" v-if="save" class="border px-6 py-2 mt-4 mr-2 bg-white/10 text-white rounded-lg">
        Guardar Datos
      </button>
      <NuxtLink v-else to="/compras/pago" class="border px-6 py-2 mt-4 mr-2 bg-white/10 text-white rounded-lg">
        Continuar Compra
      </NuxtLink>
    </div>

    <!-- <pre>{{ envio }}</pre> -->
  </form>
</template>
