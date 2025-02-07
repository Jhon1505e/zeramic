<script setup lang="ts">
const baseUrl = "https://sandbox.wompi.co/v1/";
const publicKey = "pub_test_DMVR3QF8b0wKGNOCFjrqoPqHgevA3Oj7";
const privateKey = "prv_test_S0q1mJqhJg6vC9CwNsO7swobRLkDzXwn";
const acceptanceToken = ref("");

async function getToken() {
    try {
        const response: any = await $fetch(`${baseUrl}merchants/${publicKey}`);
        acceptanceToken.value = response.data.presigned_acceptance;
    } catch (error) {
        console.log('response', error);
    }
}
await getToken();
</script>
<template>
    <div class="bg-PRP h-screen">
        <TabsCompras />
        <div class="max-w-3xl mx-auto">

            <ResumenCompra />
        </div>
    </div>
</template>