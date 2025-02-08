<template>
  <div class="bg-slate-900 bottom-0 pb-10">
    <div class="max-w-4xl mx-auto">
      <div class="md:flex justify-between items-center pt-12 ">
        <img
          src="/img/logo-zeramic.png"
          class="mx-auto md:mx-0 w-60 md:w-52"
          alt="zeramic"
        />
        <div class="flex gap-2 justify-center mt-12 sm:mt-0">
          <a
            href="https://www.instagram.com/zeramic.guatape/"
            target="_blank"
            class="bg-slate-800 p-3 rounded-full hover:bg-slate-700 duration-150 ease-in-out"
          >
            <IconsInstagram class="w-6 fill-white/80" />
          </a>
          <a
            href="https://wa.me/+573002285505"
            target="_blank"
            class="bg-slate-800 p-3 rounded-full hover:bg-slate-700 duration-150 ease-in-out"
          >
            <IconsWhatsapp class="w-6 fill-white/80" />
          </a>
          <a
            href="https://www.facebook.com/zeramic.guatape?_rdc=1&_rdr"
            target="_blank"
            class="bg-slate-800 p-3 rounded-full hover:bg-slate-700 duration-150 ease-in-out"
          >
            <IconsFacebook class="w-6 fill-white/80" />
          </a>
          <a
            href="https://www.tiktok.com/"
            target="_blank"
            class="bg-slate-800 p-3 rounded-full hover:bg-slate-700 duration-150 ease-in-out"
          >
            <IconsGmail class="w-6 fill-white/80" />
          </a>
        </div>
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
