<script setup lang="ts">
const documents = ref();
const productos = ref();

async function getDataClients() {
  const { data } = await useFetch("/api/pedidos/find", {
    method: "POST",
    body: {
      name: "",
    },
  });
  documents.value = data.value;
}

async function deleteClient(id: string) {
  const { data } = await useFetch("/api/pedidos/deleteOne", {
    method: "POST",
    body: {
      _id: id,
    },
  });
  console.log(data.value);
  getDataClients();
}

getDataClients();
</script>

<template>
  <div class="  bg-PRP">
    <div class="max-w-6xl mx-auto pt-10">

    
    <div class="flex justify-between">
      <h1 class="text-3xl text-white">Clientes</h1>
      <div><button class="p-2 text-white bg-white/10 border px-4 rounded-xl mt-2 flex gap-2 " @click="getDataClients">Actualizar <IconsRefresh class="w-5 mt-0.5" /> </button></div>
    </div>
    <div class="text-center border mt-6">
      <div class="flex p-2">
        <div class="w-full">Nombre</div>
        <div class="w-full">Email</div>
        <div class="w-full">Telefono</div>
        <div class="w-full">Dirección</div>
        <div class="w-full">Opciones</div>
      </div>
      <div class="p-2 flex border-b" v-for="doc in documents" :key="doc._id">
        <div class="w-full">{{ doc.name }}</div>
        <div class="w-full">{{ doc.email }}</div>
        <div class="w-full">{{ doc.phone }}</div>
        <div class="w-full">{{ doc.address }} - {{ doc.city }}, {{ doc.state }}</div>
        <div class="w-full flex text-sm justify-center gap-2">
          <button @click="productos = doc.productos" class="p-2 border rounded">
            {{ doc.productos?.length }} productos
          </button>
          <button @click="deleteClient(doc._id)" class="p-2 border rounded">Eliminar</button>
        </div>
      </div>
    </div>
    <div v-if="productos?.length" class="p-10">
      <strong>Productos</strong>
      <div class="flex">
        <div class="w-full">Nombre</div>
        <div class="w-full">valor</div>
        <div class="w-full">cantidad</div>
      </div>
      <div class="flex p-2" v-for="pro in productos" :key="pro">
        <div class="w-full">{{ pro.producto }}</div>
        <div class="w-full">{{ pro.valor }}</div>
        <div class="w-full">{{ pro.cantidad }}</div>
        <div class="w-full">{{ pro.valor * pro.cantidad }}</div>
      </div>
    </div></div>
  </div>
</template>
