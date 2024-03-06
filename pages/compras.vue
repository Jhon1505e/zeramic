import { NuxtLink } from '#build/components';
<template>
  <div class="bg-PRP h-screen">
    <div class="w-full md:w-1/2 h-full pt-20 mx-auto ">
      <div class="text-center">
        <h2 class="text-white text-5xl font-bold ">
          Todavía no has realizado ninguna compra
        </h2>
        <IconsShopping class="w-28 mt-5 fill-white mx-auto" />
        <NuxtLink to="/productos"
          ><button class="bg-white/20 border border-white text-white px-6  py-2 mt-6 rounded-lg">
            Ver productos
          </button></NuxtLink
        >
      </div>
    </div>
    <ImgRounded class="w-full fill-slate-900 absolute bottom-0" />
  </div>
</template>
