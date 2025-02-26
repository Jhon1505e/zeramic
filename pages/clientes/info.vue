<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
const clients = ref();
const modal = ref(false);
const edit = ref(false);
const client = ref();
const loading = ref(false);

const { getDataClients, deleteClient } = useClient();

async function onGetClients() {
  loading.value = true;
  clients.value = await getDataClients({ state: "active" });
  loading.value = false;
}

function viewClient(item) {
  client.value = item;
  modal.value = true;
}

await onGetClients();

const columns = [
  {
    label: "Nombre",
    key: "fullName",
  },
  {
    label: "Correo Electrónico",
    key: "email",
  },
  {
    label: "Celular",
    key: "phone",
  },
  {
    label: "Dirección",
    key: "address",
  },
  {
    label: "Acciones",
    key: "actions",
  },
];
</script>

<template>
  <div class="p-4 max-w-6xl mx-auto">
    <h1 class="text-3xl text-white">Clientes</h1>
    <div class="bg-white p-4 rounded-xl my-6">
      <UTable :columns="columns" :rows="clients">
        <template #actions-data="{ row }">
          <!-- <pre>{{ row._id }}</pre> -->
          <button
            @click="viewClient(row)"
            class="rounded bg-gray-200 p-1 border mx-1"
          >
            <UTooltip text="Ver / Editar">
              <UIcon
                name="i-heroicons-clipboard-document-list"
                class="w-6 h-6"
              />
            </UTooltip>
          </button>
          <button
            @click="viewClient(row)"
            class="rounded bg-gray-200 p-1 border mx-1"
          >
            <UTooltip text="Ver Compras">
              <UIcon name="i-heroicons-shopping-bag" class="w-6 h-6" />
            </UTooltip>
          </button>
        </template>
      </UTable>
    </div>

    <UModal v-model="edit" prevent-close :ui="{ width: 'w-full sm:max-w-4xl' }">
      <UCard :ui="{ background: 'bg-PRP' }">
        <div class="flex justify-between items-center p-4 text-white">
          <h3>Información del cliente</h3>
          <button @click="edit = false">
            <UIcon name="i-heroicons-x-circle" class="h-8 w-8" />
          </button>
        </div>
        <FormCuenta v-model="client" />
      </UCard>
    </UModal>
    <UModal v-model="modal" prevent-close>
      <UCard :ui="{ background: 'bg-PRP' }">
        <div class="p-4" v-if="!edit">
          <div class="flex gap-2 justify-end">
            <button @click="edit = true" class="px-3 py-2 border border-white rounded-full">
              <IconsPencil class="w-5 stroke-white" />
            </button>
            <button @click="modal = false" class="px-3 py-2 border border-white rounded-full">
              <IconsClose class="w-5 stroke-white" />
            </button>
          </div>
          <div class="px-5 md:flex gap-8">
            <div class="text-white font-thin pt-1">
              <p><b>Nombre:</b> {{ client?.fullName }}</p>
              <p><b>Email:</b> {{ client?.email }}</p>
              <p>
                <b>Celular:</b>
                {{ client?.phone ? client.phone : "Sin Número" }}
              </p>
              <p><b>Documento {{ client?.docType }}: </b> {{ client?.docId }}</p>
              <p><b>Departamento:</b> {{ client?.departmentOrStateName }}</p>
              <p><b>Ciudad:</b> {{ client?.locationName }}</p>
              <p><b>Dirección:</b> {{ client?.address }}</p>
            </div>
          </div>

          
        </div>
      </UCard>
    </UModal>
  </div>
  <!-- <div class="bg-black/40 fixed w-full top-0 z-20 bottom-0" v-if="delClient">
    <div class="flex justify-center items-center h-full">
      <div class="w-5/6 md:w-1/3 bg-white px-5 py-4 rounded-lg">
        <div class="flex justify-center ">
          <p class="font-normal text-2xl pt-1 pb-3 flex justify-center items-center">
            ¿Eliminar cliente?
          </p>
        </div>
        <div class="flex justify-center gap-3">
          <button @click="delClient = false" class="bg-gray-300 rounded-md border px-3 py-2 text-sm font-semibold text-gray-900">Cancelar</button>
          <button class="rounded-md bg-red-600 px-3 py-2 text-white" @click="onDelete(doc._id)">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-PRP">
    <Loading v-show="loading" />
    <div class="max-w-6xl mx-auto pt-10 pb-20 px-10 md:px-6">
      <div class="flex justify-between">
        <h1 class="text-3xl text-white">Clientes</h1>
        <div>
          <button
            class="p-2 text-white bg-white/10 border px-4 rounded-xl mt-2 flex gap-2"
            @click="onGetClients"
          >
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
        <div
          class="flex border-b text-white items-center font-thin"
          v-for="doc in clients"
          :key="doc._id"
        >
          <div class="w-full p-2">{{ doc.fullName }}</div>
          <div class="w-full p-2 justify-center hidden md:flex">
            {{ doc.email }}
          </div>
          <div class="w-full p-2 justify-center hidden md:flex">
            {{ doc.phone ? doc.phone : "Sin Número" }}
          </div>
          <div class="w-full p-2 justify-center hidden md:flex">
            {{ doc.address }} - {{ doc.city }}
          </div>
          <div class="w-full p-3 flex text-sm justify-center gap-2">
            
            <button
              @click="viewClient(doc)"
              class="p-2 border rounded flex bg-white/10 text-white"
            >
              <IconsEye class="w-5" />
            </button>
            <button
              @click="delClient = doc"
              class="p-2 border rounded bg-white/10 text-white flex gap-1"
            >
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
  </div> -->
</template>
