<script setup lang="ts">
const emit = defineEmits(["close"]);
const edit = ref(false);
const model = defineModel({ required: true });
</script>

<template>
  <div class="bg-black/60 fixed top-0 w-full bottom-0 z-20">
    <div class="flex justify-center items-center h-full">
      <div class="bg-PRP rounded-lg px-4 pb-6 w-5/6 md:w-1/2">
        <div class="md:flex w-full justify-between items-center p-2">
          <h2 class="text-center text-white">Información del cliente</h2>
          <div class="flex gap-2 justify-center">
            <button @click="edit = !edit" class="px-3 py-2 border border-white rounded-full">
              <IconsPencil class="w-5 stroke-white" />
            </button>
            <button class="px-3 py-2 border border-white rounded-full">
              <IconsBag class="w-5 fill-white" />
            </button>

            <button
              @click="emit('close')"
              class="px-3 py-2 border border-white rounded-full"
            >
              <IconsClose class="w-5 stroke-white" />
            </button>
          </div>
        </div>
        <div v-if="edit">
<CuentaDatos/>
        </div>
        <div v-else class="px-5 md:flex gap-8">
          <div class="pt-3">
            <NuxtImg
              v-if="model?.picture"
              :src="model.picture"
              alt=""
              class="w-32 h-32 rounded-full mx-auto"
            />
            <IconsLogin
              v-else
              class="w-32 p-5 rounded-full bg-white/10 fill-white mx-auto"
            ></IconsLogin>
          </div>
          <div class="text-white font-thin pt-1 ">
            <p><b>Nombre:</b> {{ model?.fullName }}</p>
            <p><b>Email:</b> {{ model?.email }}</p>
            <p>
              <b>Celular:</b> {{ model?.phone ? model.phone : "Sin Número" }}
            </p>
            <p>
              <b>Dirección:</b> {{ model?.address }} {{ model?.infoDirection }}
            </p>
            <p><b>Departamento:</b> {{ model?.departmentCode }}</p>
            <p>
              <b>Documento {{ model?.docType }}: </b> {{ model?.docId }}
            </p>
          </div>
        </div>
        <!-- <pre class="text-xs text-white">{{ model }}</pre> -->
      </div>
    </div>
  </div>
</template>
