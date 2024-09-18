<template>
  <div class="bg-slate-900 bottom-0">
    <div class="w-3/4 mx-auto block md:flex pt-12">
      
      <div class="w-full mt-2">
        <NuxtImg format="webp" src="/img/logo_zeramic.webp" class="w-52  mx-auto" alt="Zeramic" />
        
      </div>
      <div
        class="w-full hidden md:block text-gray-400 text-center md:text-left text-xl pl-0 md:pl-20"
      >
        <h2 class="pl-3 text-2xl border-l-4 border-white text-white mx-auto md:mx-0 mt-12 md:mt-0 w-32 font-bold">
          Sitio Web
        </h2>
        <div class="hover:text-white duration-100 border-l  hover:border-l-4 border-gray-600 hover:border-white pl-4 mt-2">
          <NuxtLink to="/"> Inicio </NuxtLink>
        </div>
        <div class="hover:text-white duration-100 border-l  hover:border-l-4 border-gray-600 hover:border-white pl-4">
          <NuxtLink to="/productos">Productos </NuxtLink>
        </div>

        <div class="hover:text-white duration-100 border-l  hover:border-l-4 border-gray-600 hover:border-white pl-4">
          <NuxtLink to="/nosotros">Sobre Nosotros </NuxtLink>
        </div>
        <div class="hover:text-white duration-100 border-l  hover:border-l-4 border-gray-600 hover:border-white pl-4">
          <NuxtLink to="/home">Contacto </NuxtLink>
        </div>
      </div>
      <div
        class="w-full hidden md:block text-gray-400 text-center md:text-left text-xl"
      >
        <h2
          class="pl-3 text-2xl border-l-4 border-white text-white mx-auto md:mx-0 mt-12 md:mt-0 w-28 font-bold"
        >
          Contacto
        </h2>
        <div class="">
          <div class="hover:text-white duration-100  hover:border-l-4 border-l border-gray-600 hover:border-white pl-4 mt-2">
            <a
            href="https://wa.me/+573002285505"
            class=""
            target="_blank"
            >
              Whatsapp
            </a>
          </div>
          <div class="hover:text-white duration-100  hover:border-l-4 border-l border-gray-600 hover:border-white pl-4">
            <a href="">Correo Electrónico </a>
          </div>

          <div class="hover:text-white duration-100  hover:border-l-4 border-l border-gray-600 hover:border-white pl-4">
            <a  href="https://www.instagram.com/zeramic.guatape/"
            target="_blank"
              >Instagram
            </a>
          </div>

          <div class="hover:text-white duration-100  hover:border-l-4 border-l border-gray-600 hover:border-white pl-4">
            <a  href="https://www.facebook.com/zeramic.guatape?_rdc=1&_rdr"
            target="_blank"
              >Facebook
            </a>
          </div>
        </div>
      </div>
      
    </div>
    
    <div class="py-6 w-3/4 mx-auto">
      <hr class="border-white opacity-60 pb-4 md:pb-3  md:pt-0 flex md:hidden " />
      <div class="flex md:hidden justify-center gap-4 mt-6">
        <div class="hover:scale-110 duration-200 hover:opacity-100 opacity-80">
          <a href="https://www.instagram.com/zeramic.guatape/" target="_blank">
            <IconsInstagram  class="w-8 fill-white"/>
          </a>
        </div>
        <div class="hover:scale-110 duration-200 hover:opacity-100 opacity-80">
          <a href="https://wa.me/+573002285505" target="_blank">
            <IconsWhatsapp class="w-8 fill-white" />
          </a>
        </div>
        <div class="hover:scale-110 duration-200 hover:opacity-100 opacity-80">
          <a href="https://www.facebook.com/zeramic.guatape?_rdc=1&_rdr" target="_blank">
            <IconsFacebook class="w-7 fill-white" />
          </a>
        </div>
        <div class="hover:scale-110 duration-200 hover:opacity-100 opacity-80">
          <a href="https://www.tiktok.com/" target="_blank">
            <IconsGmail class="w-7 fill-white" />
          </a>
        </div>
      </div>
      <hr class="hidden md:block border-white opacity-60 pb-4 md:pb-3 pt-14 md:pt-0 " />
      <h2 class="text-center text-white text-xl mt-4 pb-4 font-thin ">
        Designed by: Tailors dev
      </h2>
    </div>
  </div>
</template>
