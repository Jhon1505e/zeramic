<template>
  <div class="bg-slate-900 bottom-0 pb-10">
    <div class="max-w-4xl mx-auto px-10">
      <div class="md:flex justify-between items-center pt-12 ">
        <img
          src="/img/logo-zeramic.png"
          class="mx-auto md:mx-0 w-60 md:w-52"
          alt="zeramic"
        />
       <Redes/>
      </div>
      <div class="hidden md:flex flex-col text-center sm:flex-row justify-center gap-4 text-white/60 font-thin text-xl mt-6 md:mt-10">
        <NuxtLink to="/" class="hover:text-white">Inicio</NuxtLink>
        <NuxtLink class="hover:text-white" to="/productos">Productos</NuxtLink>
        <NuxtLink class="hover:text-white" to="/nosotros">Sobre Nosotros</NuxtLink>
        <NuxtLink class="hover:text-white" to="/contacto">Contacto</NuxtLink>
        <NuxtLink class="hover:text-white" to="/cuenta">Mi Cuenta</NuxtLink>
      </div>
      <hr class="border-white opacity-20 mt-8 mb-4 w-3/4 md:w-full mx-auto">
      <div class="flex justify-center gap-6 md:justify-between text-white font-thin">
        <p>Creado por: <span class="font-normal">Tailors Dev</span></p>
        <p>© 2025 Zeramic.</p>

      </div>
    </div>
   
  </div>
</template>
