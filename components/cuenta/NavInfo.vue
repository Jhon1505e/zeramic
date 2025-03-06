<script setup lang="ts">
const { client, logout } = useAuth();
const closeSession = () => {
    logout();
    navigateTo({ name: "micuenta" });
}
</script>
<template>
    <div class="bg-black/10 text-white rounded-xl border h-full w-full md:w-1/3">
        <h2 class="text-center mt-2">Mi cuenta</h2>
        <div class="justify-center mt-4 hidden md:flex">
            <NuxtImg v-if="client?.picture" :src="client.picture" alt="" class="w-32 h-32 rounded-full" />
            <IconsLogin v-else class="w-24 p-5 fill-white rounded-full bg-black/10 text-white" />
        </div>
        <!-- <h1 class="text-center font-thin text-xl px-4 pb-4">
            {{ client?.fullName }}
        </h1> -->
        <div class="flex md:flex-col text-center justify-between gap-1 px-2">
            <NuxtLink to="/micuenta" class="py-3 w-full hover:bg-white/10 md:flex gap-2 justify-center">
                <IconsUser class="w-5 mx-auto md:mx-1" />
                Mis Datos
            </NuxtLink>

            <NuxtLink to="/micuenta/compras" class="py-3 w-full hover:bg-white/10 md:flex gap-2 justify-center">
                <IconsBag class="w-5 mx-auto md:mx-1" />
                Mis Compras
            </NuxtLink>

            <NuxtLink to="/clientes/info" v-if="client?.admin" class="py-3 w-full hover:bg-white/10 md:flex gap-2 justify-center">
                <IconsUsers class="w-5 mx-auto md:mx-1" />
                Admin Clientes
            </NuxtLink>

            <button class="py-3 w-full hover:bg-white/10 md:flex gap-2 justify-center" @click="closeSession">
                <IconsExit class="w-5 mx-auto md:mx-1 rotate-180" />
                Cerrar Sesión
            </button>
        </div>
    </div>
</template>