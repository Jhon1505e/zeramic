<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
})
const clients = ref([]);
const client = ref();
const productos = ref();
const modal = ref(false);
const loading = ref(false);

const { getDataClients, deleteClient } = useClient();

async function onDelete(id: string) {
  loading.value = true
  const data = await deleteClient(id);
  console.log(data);
  await onGetClients()
}

function viewClient(item) {
  client.value = item;
  modal.value = true;
}

async function onGetClients() {
  loading.value = true
  clients.value = await getDataClients();
  loading.value = false
}

await onGetClients()

</script>

<template>
  <div class="bg-PRP">
    <Loading v-show="loading" />
    <div class="max-w-6xl mx-auto pt-10 pb-20 px-10 md:px-6">
      <div class="flex justify-between">
        <h1 class="text-3xl text-white">Clientes</h1>
        <div>
          <button class="p-2 text-white bg-white/10 border px-4 rounded-xl mt-2 flex gap-2" @click="onGetClients">
            Actualizar
            <IconsRefresh class="w-5 mt-0.5" />
          </button>
        </div>
      </div>
      <div class="text-center border rounded-lg mt-6">
        <div class="flex p-2 text-white bg-white/10">
          <div class="w-full text-center justify-center">Nombre</div>
          <div class="w-full hidden md:flex justify-center">
            Correo Electrónico
          </div>
          <div class="w-full hidden md:flex justify-center">Celular</div>
          <div class="w-full hidden md:flex justify-center">Dirección</div>
          <div class="w-full"></div>
        </div>
        <hr />
        <div class="flex border-b text-white items-center" v-for="doc in clients" :key="doc._id">
          <div class="w-full p-2">{{ doc.name }}</div>
          <div class="w-full p-2 justify-center hidden md:flex">
            {{ doc.email }}
          </div>
          <div class="w-full p-2 justify-center hidden md:flex">
            {{ doc.phone }}
          </div>
          <div class="w-full p-2 justify-center hidden md:flex">
            {{ doc.address }} - {{ doc.city }}, {{ doc.state }}
          </div>
          <div class="w-full p-3 flex text-sm justify-center gap-2">
            <button class="py-2 px-3 flex border rounded md:hidden bg-white/10 text-white">
              <IconsEye class="w-5" />
            </button>
            <button @click="viewClient(doc)" class="p-2 border rounded flex bg-white/10 text-white">
              <IconsEye class="w-5" />
            </button>
            <button @click="onDelete(doc._id)" class="p-2 border rounded bg-white/10 text-white flex gap-1">
              <span class="hidden md:block">Eliminar</span>
              <IconsDelete class="w-5" />
            </button>
          </div>
        </div>
      </div>
      <div v-if="productos?.length" class="p-10">
        <strong>Productos</strong>
        <div class="flex">
          <div class="w-full">Nombre</div>
          <div class="w-full">valor</div>
          <div class="w-full">cantidad</div>
          <div class="w-full">Total</div>
        </div>
        <div class="flex p-2" v-for="pro in productos" :key="pro">
          <div class="w-full">{{ pro }}</div>
          <div class="w-full">{{ pro.valor }}</div>
          <div class="w-full">{{ pro.cantidad }}</div>
          <div class="w-full">{{ pro.valor * pro.cantidad }}</div>
        </div>
      </div>
    </div>
    <div v-if="modal">
      <ModalClients v-model="client" @close="modal = false" />
    </div>
  </div>
</template>
