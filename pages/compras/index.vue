

<template>
    <div class="flex gap-10 mt-16">
      <div class="w-full md:w-3/4 px-4 md:px-0 mx-auto">
        <CartInfo />
      </div>
      <div class="w-full md:w-1/3" >
        <div class="bg-purple-900/20 rounded-xl text-white w-full">
          <h2 class="text-white font-normal text-center">Resumen del pedido</h2>
          <div class="px-6 pb-4">
            <div class="flex justify-between">
              <h3 class="font-thin">Productos</h3>
              <h3 class="font-extralight">
                2 productos
              </h3>
            </div>
            <div class="flex justify-between">
              <h3 class="font-thin">Subtotal</h3>
              <h3 class="font-extralight">Subtotal</h3>
            </div>
            <hr class="opacity-50 mt-4 mb-1" />
            <div class="flex justify-between">
              <h3>Total</h3>
              <h3>12.0000</h3>
            </div>
          </div>
        </div>
        <div>
          <NuxtLink
            to="compras/envio"
            class="bg-white/30 border border-white text-white px-6 py-2 mt-6 rounded-lg w-full"
          >
            Confirmar compra
          </NuxtLink>
        </div>
      </div>
    </div>
</template>