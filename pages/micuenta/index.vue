<script setup lang="ts">
const { client, loginGoogle } = useAuth();
const { isLoading } = useLoadingIndicator();

const onSuccess = async ({ credential }: any) => {
    const data = await loginGoogle({ credential })
    console.log(data);
}
</script>
<template>
    <div class="md:flex items-center justify-center max-w-5xl mx-auto p-3 md:p-5">
        <Loading v-if="isLoading" />
        <div v-if="client" class="w-full md:flex gap-4">
            <CuentaNavInfo />
            <div class="w-full">
                <h2 class="text-white p-1 my-3">Mis datos</h2>
                <!-- <pre class="text-xs text-white">{{ client }}</pre> -->
                <FormCuenta v-model="client" />
            </div>
        </div>
        <FormLogin v-else @success="onSuccess" class="md:mt-10" />
    </div>
</template>