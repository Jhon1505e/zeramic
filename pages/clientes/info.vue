<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
const clients = ref();
const modal = ref(false);
const edit = ref(false);
const client = ref();
const toDelete = ref();
const compras = ref();
const modalCompras = ref(false);

const { getDataClients, deleteClient } = useClient();
const { getCompras } = useCompras();
const { isLoading } = useLoadingIndicator();

async function onGetClients() {
  clients.value = await getDataClients({ state: "active" });
}

function viewClient(item) {
  client.value = item;
  modal.value = true;
}

async function viewCompras({ email }) {
  compras.value = [];
  compras.value = await getCompras({ email });
  modalCompras.value = true
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
    label: "Acciones",
    key: "actions",
  },
];
</script>

<template>
  <div class="w-3/4 ">
    <div class="flex w-full justify-end pt-4">
      
      <UButton icon="i-heroicons-arrow-path" @click="onGetClients" label="Actualizar" class="text-white border bg-white/10 mt-2 rounded-xl" />
    </div>
    <div class="flex gap-3 pt-6  " >
      
      <div class="bg-white/90 p-4 rounded-xl w-full">

     
      <UTable :loading="isLoading" :columns="columns" :rows="clients">
        <template #actions-data="{ row }" >
          <!-- <pre>{{ row._id }}</pre> -->
          <button @click="viewClient(row)" class="rounded-xl bg-PRP/80 text-white p-1 border mx-1">
            <UTooltip text="Ver / Editar">
              <UIcon name="i-heroicons-clipboard-document-list" class="w-6 h-6" />
            </UTooltip>
          </button>
          <button @click="viewCompras(row)" class="rounded-xl bg-PRP/80 text-white  p-1 border mx-1">
            <UTooltip text="Ver Compras">
              <UIcon name="i-heroicons-shopping-bag" class="w-6 h-6" />
            </UTooltip>
          </button>

          <button @click="toDelete = row._id" class="rounded-xl bg-PRP/80 text-white  p-1 border mx-1">
            <UTooltip text="Eliminar Cliente">
              <UIcon name="i-heroicons-trash" class="w-6 h-6" />
            </UTooltip>
          </button>
        </template>
      </UTable> </div>
    </div>

    <AdminDeleteClient v-model="toDelete" />

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
        <div class="px-4" v-if="!edit">
          <div class="flex justify-between ">
            <p class="text-white text-2xl font-bold pt-1">Información del cliente</p>
            <div class="flex gap-2">

             
               <button @click="edit = true" class="bg-white/10 rounded-full p-2">
                <IconsPencil class="w-7 stroke-white" />
              </button>
            <button @click="modal = false" class="bg-white/10 rounded-full p-2">
              <IconsClose class="w-7 stroke-white" />
            </button> 
            </div>
          </div>
          <hr class="my-2 opacity-30">
          <div class=" md:flex gap-8">
            <div class="text-white font-thin pt-1">
              <p><b>Nombre:</b> {{ client?.fullName }}</p>
              <p><b>Email:</b> {{ client?.email }}</p>
              <p>
                <b>Celular:</b>
                {{ client?.phone ? client.phone : "Sin Número" }}
              </p>
              <p><b>Documento {{ client?.docType }}: </b> {{ client?.docId }}</p>
              <p><b>Estado:</b> {{ client?.status ? "Inactivo" : "Activo" }}</p>
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
