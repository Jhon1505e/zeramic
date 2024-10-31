<template>
  <div class="bg-PRP pt-10 pb-52">
    <div class="flex justify-center max-w-5xl mx-auto items-center h-full">
      <div class="py-20 rounded-xl w-1/2 bg-black/10 flex justify-center">
        <div>
          <h2 class="text-white text-4xl font-bold text-center">Ingresar</h2>

          <form action="" class="w-full  flex flex-col justify-center">
            <input type="text" placeholder="Usuario"
              class="border w-full text-center p-2 bg-white/10 mt-4 rounded-lg text-white" />
            <input type="text" placeholder="Contraseña"
              class="border w-full p-2 text-center bg-white/10 mt-4 rounded-lg text-white" />

            <NuxtLink to="/clientes/info" class="w-full text-center">
              <div class="border w-full p-2 bg-white text-PRP mt-4 rounded-lg">
                Ingresar
              </div>
            </NuxtLink>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
