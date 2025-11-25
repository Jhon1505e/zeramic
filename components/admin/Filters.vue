<template>
  <div class="pt-6 w-1/4">
    <p class="text-3xl font-bold text-white">Clientes</p>

    <div class="border rounded-xl mt-5 text-center text-white px-4 pb-3">
      <button
        class="p-2 w-full border rounded-xl bg-white/10 h-10 mt-3"
        v-for="i in 6"
        :key="i"
      ></button>
    </div>
  </div>
</template>