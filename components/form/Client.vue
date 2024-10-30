<script setup lang="ts">
import { type IClient } from "~/types/clients";
import { statesColombia } from "@/utils/datalist";
const dataClient = defineModel<IClient>({ default: () => {} });
const states = computed(() => Object.keys(statesColombia));
const cities = computed(() => statesColombia[dataClient.value.state]);
async function saveDataClient() {
  const data = await $fetch<IClient>("/api/clientes/update", {
    method: "POST",
    body: dataClient.value,
  });
  if (!data) {
    alert("No se encontro el usuario");
  } else {
    console.log("data", data);
  }
}
</script>
<template>
  <form @submit.prevent="saveDataClient">
    <div class="grid md:grid-cols-2 gap-3 p-2">
      <div class="w-full">
        <label for="name" class="text-white">Nombres y Apellidos:</label>
        <input
          v-model="dataClient.name"
          type="text"
          required
          id="name"
          class="w-full py-2 px-4 mt-2 rounded-lg bg-black/10 border text-white "
          placeholder="Nombres y Apellidos"
        />
      </div>
      <div class="w-full">
        <label for="email" class="text-white">Email:</label>
        <input
          v-model="dataClient.email"
          required
          id="email"
          type="email"
          class="py-2 w-full px-4 mt-2 rounded-lg text-white bg-black/10 border"
          readonly
        />
      </div>
    </div>
    <div class="grid md:grid-cols-3 gap-3 p-2">
      <div class="w-full">
        <label for="phone" class="text-white">Celular:</label>
        <input
          v-model="dataClient.phone"
          required
          type="number"
          class="py-2 w-full px-4 rounded-lg text-white bg-black/10 mt-2 border"
          placeholder="Celular"
        />
      </div>
      <div class="w-full">
        <label for="docType" class="text-white">Tipo de Documento:</label>
        <select
          v-model="dataClient.docType"
          required
          id="docType"
          class="py-2.5 w-full px-4 rounded-lg text-white bg-black/10 mt-2 border"
        >
          <option value="">Seleccionar</option>
          <option value="TI">Tarjeta de identidad</option>
          <option value="CC">Cédula</option>
        </select>
      </div>
      <div class="w-full">
        <label for="docId" class="text-white">Número de Documento:</label>
        <input
          v-model="dataClient.docId"
          required
          type="number"
          class="w-full py-2 px-4 rounded-lg text-white bg-black/10 mt-2 border"
          placeholder="Número de Documento"
        />
      </div>
    </div>
    <div class="grid md:grid-cols-3 gap-3 p-2">
      <div class="w-full">
        <label for="address" class="text-white">Dirección:</label>
        <input
          required
          v-model="dataClient.address"
          type="text"
          id="address"
          class="w-full py-2 px-4 rounded-lg text-white bg-black/10 mt-2 border"
          placeholder="Dirección"
        />
      </div>
      <div class="w-full">
        <label for="state" class="text-white">Departamento:</label>
        <select
          v-model="dataClient.state"
          required
          id="state"
          class="w-full py-2.5 px-4 rounded-lg text-white bg-black/10 mt-2 border"
        >
          <option value="">Seleccionar</option>
          <option v-for="state in states" :value="state">
            {{ state }}
          </option>
        </select>
      </div>
      <div class="w-full">
        <label for="city" class="text-white">Ciudad:</label>
        <select
          required
          id="city"
          v-model="dataClient.city"
          class="w-full py-2.5 px-4 rounded-lg text-white bg-black/10 mt-2 border"
        >
          <option value="">Seleccionar</option>
          <option v-for="city in cities" :value="city">{{ city }}</option>
        </select>
      </div>
    </div>
    <div class="flex justify-end">

      <button
      type="submit"
      class="border  px-6 py-2 mt-4 mr-2 bg-white/10 text-white rounded-lg"
      >
      Guardar Datos
    </button>
  </div>
  </form>
</template>
