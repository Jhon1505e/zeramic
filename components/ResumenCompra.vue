<script setup lang="ts">
const Router = useRouter();

const resumen = ref(false);
const login = ref(false);
const pagos = ref(false);
</script>

<template>
  <div class="flex justify-center gap-10">
    <NuxtLink to="/compras">
      <div class="flex gap-2">
        <div class="text-lg w-10 h-10 rounded-full pt-1.5 mt-2">
          <IconsShopping
            :class="
              Router.currentRoute.value.path === '/compras'
                ? 'fill-white '
                : 'fill-green-500 '
            "
          />
        </div>

        <h3
          class="text-sm font-semibold mt-4 ml-2"
          :class="
            Router.currentRoute.value.path === '/compras'
              ? 'text-white'
              : 'text-green-500 '
          "
        >
          RESUMEN DE COMPRA
        </h3>
      </div>
    </NuxtLink>
    <div class="flex pt-4 gap-3">
      <div
        class="h-1 w-32 rounded-full mt-5"
        :class="
          Router.currentRoute.value.path === '/compras'
            ? 'bg-gray-400'
            : Router.currentRoute.value.path === '/compras/envio'
            ? 'bg-green-500'
            : 'bg-green-500'
        "
      ></div>
      <NuxtLink to="/compras/envio">
        <div class="flex gap-2 px-6">
          <div class="text-lg w-10 text-PRP h-10 rounded-full pt-1.5">
            <IconsEnvio
              :class="
                Router.currentRoute.value.path !== '/compras/envio'
                  ? 'fill-gray-400 '
                  : 'fill-white'
              "
            />
          </div>

          <h3
            class="text-sm font-semibold ml-1"
            :class="
              Router.currentRoute.value.path === '/compras/envio'
                ? 'text-white'
                : 'text-gray-400'
            "
          >
            DATOS DE ENVÍO
          </h3>
        </div>
      </NuxtLink>
      <div
        class="h-1 w-32 rounded-full mt-5"
        :class="
          Router.currentRoute.value.path === '/compras/pagos'
            ? 'bg-green-500'
            : Router.currentRoute.value.path === '/compras/'
            ? 'bg-gray-400'
            : 'bg-gray-400'
        "
      ></div>
    </div>
    <NuxtLink to="/compras/pagos">
      <div class="flex gap-2">
        <div class="text-lg w-10 text-PRP h-10 rounded-full pt-1.5 mt-2">
          <IconsMoney
            :class="
              Router.currentRoute.value.path !== '/compras/pagos'
                ? 'fill-gray-400 '
                : 'fill-white'
            "
          />
        </div>

        <h3
          class="text-sm font-semibold mt-2 ml-1"
          :class="
            Router.currentRoute.value.path === '/compras/pagos'
              ? 'text-white'
              : 'text-gray-400'
          "
        >
          PAGO
        </h3>
      </div>
    </NuxtLink>
  </div>
</template>
