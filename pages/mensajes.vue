<script setup lang="ts">
const messages = ref();
const showModal = ref(false);

function openMessage(message: any) {
    msg.to = message.from;
    showModal.value = true;
}

async function sendMessage(item: any) {
    console.log(item);
    const data = await $fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify(msg),
    });
    console.log(data);
    showModal.value = false;
    msg.text = "";
}

async function getMessages(from?: string) {
    const params = from ? { from } : {};
    const data = await $fetch("/api/messages", {
        method: "GET",
        params,
    });
    data && (messages.value = data);
}

const msg = reactive({
    to: "",
    text: "",
    token: "",
});

const newDate = (timestamp: string) =>
    formatFecha(String(new Date(parseInt(timestamp))));
</script>
<template>
    <div class="max-w-6xl mx-auto p-4">
        <UButton @click="getMessages()">Todos los Mensajes</UButton>
        <hr class="my-4" />
        <div class="flex p-2 w-full items-center border-b justify-around">
            <div class="w-1/4">Numero</div>
            <div class="w-1/4">Fecha / hora</div>
            <div class="w-full">Mensaje</div>
            <div class="w-1/4">Opt</div>
        </div>
        <div v-if="messages" class="p-4">
            <div class="flex w-full gap-3 items-center border-b" v-for="message in messages" :key="message.id">
                <div class="w-1/4">{{ message.from }}</div>
                <div class="w-1/4">{{ newDate(message.timestamp) }}</div>
                <div class="w-full">{{ message.text.body }}</div>
                <div class="w-1/4 flex justify-around">
                    <UButton icon="i-heroicons-eye" @click="getMessages(message.from)" />
                    <UButton icon="i-heroicons-chat-bubble-left" @click="openMessage(message)" />
                </div>
            </div>
        </div>
        <UModal v-model="showModal">
            <UCard>
                <form @submit.prevent="sendMessage" class="space-y-4">
                    <UFormGroup label="Telefono">
                        <UInput type="number" v-model="msg.to" readonly />
                    </UFormGroup>
                    <UFormGroup label="Mensaje">
                        <UInput v-model="msg.text" />
                    </UFormGroup>
                    <UTextarea v-model="msg.token" />
                    <div class="flex justify-end">
                        <UButton type="submit" icon="i-heroicons-arrow-right" />
                    </div>
                </form>
            </UCard>
        </UModal>
    </div>
</template>