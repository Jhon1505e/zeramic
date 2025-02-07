<script lang="ts" setup>
const login = ref(false);
</script>

<template>
  <div class="bg-PRP h-screen">
    <div class="flex justify-center max-w-xl mx-auto items-center h-full">
      <div class="flex flex-col pb-32 w-2/3">
        <IconsLogin class="w-36 mx-auto fill-white" />
        <input
          placeholder="Correo Electrónico"
          type="text"
          class="border-b text-center text-white rounded-t-lg border-white px-4 py-2 w-full bg-white mt-10 bg-white/10"
        />
        <button
          @click="login = false"
          class="bg-white/30 border border-white text-white px-6 py-2 w-full rounded-lg mt-4"
        >
          Ingresar
        </button>
      </div>

      <div class="flex flex-col text-center pb-40 w-2/3 ">
        <h2 class="text-4xl font-bold text-white">Código de Verificación</h2>
        <p class="text-white font-thin text-2xl mt-4">
          Ingresa el código de 6 dígitos <br />
          enviado a tu correo electrónico.
        </p>
        <div class="flex gap-2 px-14">
          <input
            v-for="i in 6"
            :key="i"
            type="number"
            class="bg-white/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border border-white text-white p-2 w-full text-center rounded-lg mt-4"
          />
        </div>
        <div class="px-10">
          <button
            @click="login = true"
            class="bg-white/20 hover:bg-white/30 border border-white text-white py-2 w-full rounded-lg mt-8"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
