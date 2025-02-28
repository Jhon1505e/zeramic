<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
const clients = ref();
const modal = ref(false);
const edit = ref(false);
const client = ref();
const compras = ref();
const modalCompras = ref(false);

const { getDataClients, deleteClient } = useClient();
const { getCompras } = useCompras();
const { start, finish, isLoading } = useLoadingIndicator();

async function onGetClients() {
  start();
  clients.value = await getDataClients({ state: "active" });
  finish();
}

function viewClient(item) {
  client.value = item;
  modal.value = true;
}

async function viewCompras({ email }) {
  compras.value = [];
  modalCompras.value = true
  start();
  compras.value = await getCompras({ email });
  finish();
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
  <div class="max-w-6xl mx-auto">
    <div class="flex w-full justify-between items-center px-6">
      <h1 class="text-3xl text-white">Clientes</h1>
      <UButton icon="i-heroicons-arrow-path" @click="onGetClients" />
    </div>
    <div class="bg-white p-4 rounded-xl my-6">
      <UTable :columns="columns" :rows="clients">
        <template #actions-data="{ row }">
          <!-- <pre>{{ row._id }}</pre> -->
          <button @click="viewClient(row)" class="rounded bg-gray-200 p-1 border mx-1">
            <UTooltip text="Ver / Editar">
              <UIcon name="i-heroicons-clipboard-document-list" class="w-6 h-6" />
            </UTooltip>
          </button>
          <button @click="viewCompras(row)" class="rounded bg-gray-200 p-1 border mx-1">
            <UTooltip text="Ver Compras">
              <UIcon name="i-heroicons-shopping-bag" class="w-6 h-6" />
            </UTooltip>
          </button>

          <button  class="rounded bg-gray-200 p-1 border mx-1">
            <UTooltip text="Eliminar Cliente">
              <UIcon name="i-heroicons-trash" class="w-6 h-6" />
            </UTooltip>
          </button>
        </template>
      </UTable>
    </div>

    <AdminCompras v-model="modalCompras" :compras="compras" />

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
</template>
