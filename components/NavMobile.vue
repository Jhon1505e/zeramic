<script setup lang="ts">
const route = useRoute();
const emit = defineEmits(["close"]);
const index = computed(() => route.name?.toString().startsWith("index"));
</script>

<template>
  <div class="z-30 fixed w-full bg-black/80 h-full top-0">
    <div class="h-full right-0 w-5/6 absolute bg-PRP">
      <div class="flex justify-end">
        <button @click="emit('close')">
          <IconsClose class="w-10 mr-6 mt-6 stroke-white" />
        </button>
      </div>

      <div class="flex-1 justify-center pb-52 items-center text-center text-white font-thin text-4xl">
        <ul class="space-y-3">
          <li>
            <NuxtLink to="/" @click="emit('close')">Inicio</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/productos" @click="emit('close')">Productos</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/nosotros" @click="emit('close')">Nosotros</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/micuenta" @click="emit('close')">Mi Cuenta</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contacto" @click="emit('close')">Contacto</NuxtLink>
          </li>
        </ul>

        <img src="/img/logo-zeramic.png" class="w-52 mx-auto pt-24 pb-8" alt="" />

        <Redes />
      </div>
    </div>
  </div>
</template>
