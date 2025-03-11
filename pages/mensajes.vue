<script setup lang="ts">
const messages = ref();
async function getMessages() {
    const data = await $fetch("/api/messages", {
        method: "GET",
    });
    data && (messages.value = data);
}
</script>
<template>
    <div>
        <button @click="getMessages">Get Messages</button>
        <div v-if="messages">
            <div v-for="message in messages" :key="message.id">
                <p>{{ message.from }}</p>
                <p>{{ message.text }}</p>
            </div>
        </div>
    </div>
</template>