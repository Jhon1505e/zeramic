<script setup lang="ts">
const messages = ref();
async function getMessages(from?: string) {
    const params = from ? { from } : {};
    const data = await $fetch("/api/messages", {
        method: "GET",
        params,
    });
    data && (messages.value = data);
}
const newDate = (timestamp: string) =>
    formatFecha(String(new Date(parseInt(timestamp))));
</script>
<template>
    <div class="max-w-6xl mx-auto p-4">
        <UButton @click="getMessages()">Get Messages</UButton>
        <hr class="my-4" />
        <div class="flex w-full border-b justify-around">
            <div>Numero</div>
            <div>Fecha / hora</div>
            <div>Mensaje</div>
            <div>Opt</div>
        </div>
        <div v-if="messages" class="border p-4">
            <div class="flex w-full border-b" v-for="message in messages" :key="message.id">
                <div class="w-full">{{ message.from }}</div>
                <div class="w-full">{{ newDate(message.timestamp) }}</div>
                <div class="w-full">{{ message.text.body }}</div>
                <div class="w-full">
                    <UButton @click="getMessages(message.from)">Ver</UButton>
                </div>
            </div>
        </div>
    </div>
</template>