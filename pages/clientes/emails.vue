<script lang="ts" setup>
const tab = ref(0);

const items = [
    { label: "Welcome" },
    { label: "Reset" },
    { label: "Alert" },
    { label: "Confirm" },
    { label: "Contact" },
]
</script>
<template>
    <div class="bg-white">
        <h1>Email Template</h1>
        <UTabs v-model="tab" :items="items" />
        <hr>
        <div class="p-6">
            <EmailsTemplate>
                <EmailsWelcome v-if="tab === 0" />
                <EmailsResetPass v-if="tab === 1" />
                <EmailsConfirm v-if="tab === 3" />
            </EmailsTemplate>
        </div>
    </div>
</template>