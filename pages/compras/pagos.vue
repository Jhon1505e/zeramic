<script setup lang="ts">
const message = ref();


const dataClient = ref<IClient>({
  _id: undefined,
  name: "",
  email: "",
  picture: "",
  phone: "",
  docType: "",
  docId: "",
  address: "",
  city: "",
  state: "",
});
const { saveClient } = useClient();

const states = computed(() => Object.keys(statesColombia));

const cities = computed(() => statesColombia[dataClient.value.state]);

async function saveDataClient() {

const data = await saveClient()
if (!data) {
  alert("No se encontro el usuario");
  return;
}
}


</script>
<template>
    <div>
      <div class="text-center max-w-3xl mx-auto pt-10 pb-6">
        <div>{{ message }}</div>
        <h2 class="text-3xl mb-3 font-bold text-white">
          Completa el formulario
        </h2>

        <form @submit.prevent="saveDataClient">
          <div class="flex justify-center gap-3 p-2">
            <input
              v-model="dataClient.name"
              type="text"
              required
              class="w-1/2 py-2 px-4 rounded-lg text-white bg-black/10 border"
              placeholder="Nombres y Apellidos"
            />
            <input
              v-model="dataClient.email"
              required
              type="email"
              class="w-1/2 py-2 px-4 rounded-lg text-white bg-black/10 border"
              placeholder="Correo Electrónico"
            />
          </div>
          <div class="flex justify-center gap-3 p-2">
            <input
              v-model="dataClient.phone"
              required
              type="number"
              class="w-1/2 py-2 px-4 rounded-lg text-white bg-black/10 border"
              placeholder="Celular"
            />
            <select
              v-model="dataClient.docType"
              required
              class="w-1/2 py-2 px-4 rounded-lg text-white bg-black/10 border"
            >
              <option value="">Tipo de Documento</option>
              <option value="TI">Tarjeta de identidad</option>
              <option value="CC">Cédula</option>
            </select>
            <input
              v-model="dataClient.docId"
              required
              type="number"
              class="w-1/2 py-2 px-4 rounded-lg text-white bg-black/10 border"
              placeholder="Número de Documento"
            />
          </div>
          <div class="flex justify-center gap-3 p-2">
            <input
              required
              v-model="dataClient.address"
              type="text"
              class="w-1/2 py-2 px-4 rounded-lg text-white bg-black/10 border"
              placeholder="Dirección"
            />
            <select
              v-model="dataClient.state"
              required
              class="w-1/2 py-2 px-4 rounded-lg text-white bg-black/10 border"
            >
              <option value="">Departamento</option>
              <option v-for="state in states" :value="state">
                {{ state }}
              </option>
            </select>
            <select
              required
              v-model="dataClient.city"
              class="w-1/2 py-2 px-4 rounded-lg text-white bg-black/10 border"
            >
              <option value="">Ciudad</option>
              <option v-for="city in cities" :value="city">{{ city }}</option>
            </select>
          </div>
          <hr class="mt-6 opacity-20" />
          <div>
            <h2 class="text-xl font-thin text-white">Metodos de Pago:</h2>
            <div class="flex justify-center gap-8">
              <img src="/img/bancolombia.svg" class="w-32 invert" alt="" />
              <img src="/img/nequi-2.svg" class="w-20" alt="" />
              <img src="/img/pse.svg" class="w-10" alt="" />
              <IconsEfectivo class="w-10" />
            </div>
          </div>

          <!-- @click="goToCheckout" -->
          <button
            type="submit"
            class="bg-white/10 border border-white text-white px-6 py-2 mt-6 rounded-lg"
          >
            Ir a Pagar
          </button>
        </form>
      </div>
    </div>
</template>