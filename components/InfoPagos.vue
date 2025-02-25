<script setup lang="ts">
const emit = defineEmits(["close"]);
const model = defineModel({ required: true });
const html = `
    <p>INFORMACIÓN DE COMPRA</p>
    <p>Referencia: ${model.value?.reference}</p>
    <p>Nombre: ${model.value?.customerData?.fullName}</p>
    <p>Email: ${model.value?.customerEmail}</p>
    <p>Teléfono: ${model.value?.customerData?.phoneNumber}</p>
    <p>Método de Pago: ${model.value?.paymentMethodType}</p>
    <p>Estado: ${model.value?.status}</p>
    <p>${model.value?.statusMessage || ""}</p>
`

const mensaje = ref("");

const sendMail = async () => {
    mensaje.value = "Enviando correo";
    try {
        const response = await $fetch("/api/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: model.value?.customerEmail,
                subject: "Compra en Zeramic",
                html: html,
            }),
        });
        console.log("response", response);
        mensaje.value = "Correo enviado";
    } catch (error) {
        mensaje.value = "Error al enviar correo";
    }
}
</script>
<template>
    <div class="bg-black/60 fixed top-0 bottom-0 w-full z-20">
        <div class="flex justify-center items-center h-full text-white">
            <div class="bg-PRP rounded-lg max-w-3xl p-4">
                <div class="flex justify-end">

                    <button> <IconsClose class="w-6 fill-white " @click="$emit('close')" />   </button>
                </div>
                <div v-html="html" />
                <p class="text-sm text-center">{{ mensaje }}</p>
                <button class="bg-white/30 border border-PRP text-white px-6 py-2 w-full mt-3 rounded-lg" @click="sendMail">Enviar
                    correo</button>
            </div>
        </div>
    </div>
</template>