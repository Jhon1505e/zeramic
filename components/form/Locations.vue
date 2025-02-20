<script setup lang="ts">
import type { IClient } from '~/types/clients';

interface ILocation {
    locationCode: string;
    locationName: string;
}
interface IDeparment {
    departmentCode: string;
    departmentOrStateName: string;
}
const model = defineModel<IClient>({ required: true });

interface IData extends ILocation, IDeparment { }

const data = ref<IData[]>([]);

async function getData() {
    const data = await $fetch('https://api-v2.dev.mpr.mipaquete.com/getLocations', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'session-tracker': 'a0c96ea6-b22d-4fb7-a278-850678d5429c',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmYxZjA0MzMzNjk2M2YzMzBlN2FmOTYiLCJuYW1lIjoiRGF2aWQiLCJzdXJuYW1lIjoiUm9tYW4iLCJlbWFpbCI6InJvbWFuLmRhdmlkQGdtYWlsLmNvbSIsImNlbGxQaG9uZSI6IjMxMzY1OTI3MTYiLCJjcmVhdGVkQXQiOiIyMDI0LTA5LTIzVDIyOjQ4OjM1Ljc1MFoiLCJkYXRlIjoiMjAyNS0wMi0wNCAyMzowNTowNCIsImlhdCI6MTczODcyODMwNH0.QMAhuc2jtMZ6nF3W1rvt_93me50ntS8JbQrj1PFhAuE',
        }
    });
    return data as IData[];
}

const departments = computed(() => {
    const uniqueDepartments: Record<string, IDeparment> = {};
    data.value.forEach(item => {
        if (!uniqueDepartments[item.departmentCode]) {
            uniqueDepartments[item.departmentCode] = {
                departmentCode: item.departmentCode,
                departmentOrStateName: item.departmentOrStateName
            };
        }
    });
    return Object.values(uniqueDepartments).sort((a, b) => {
        if (a.departmentOrStateName < b.departmentOrStateName) return -1;
        if (a.departmentOrStateName > b.departmentOrStateName) return 1;
        return 0;
    });
});

const filteredLocations = computed(() => {
    if (!model.value.departmentCode) return [];
    const toOrder = data.value.filter(item => item.departmentCode === model.value.departmentCode);
    return toOrder.sort((a, b) => {
        if (a.locationName < b.locationName) return -1;
        if (a.locationName > b.locationName) return 1;
        return 0;
    })
});

onMounted(async () => {
    data.value = await getData();
});

</script>
<template>
    <div class="grid md:grid-cols-2 gap-3 p-2">
        <div class="w-full">
            <label for="state" class="text-white">Departamento:</label>
            <select v-model="model.departmentCode" id="state"
                class="w-full py-2.5 px-4 rounded-lg text-PRP bg-white mt-2 border">
                <option value="">Seleccionar</option>
                <option v-for="state in departments" :value="state.departmentCode">
                    {{ state.departmentOrStateName }}
                </option>
            </select>
        </div>
        <div class="w-full">
            <label for="city" class="text-white">Ciudad:</label>
            <select v-model="model.locationCode" id="city" class="w-full py-2.5 px-4 rounded-lg text-PRP bg-white mt-2 border">
                <option value="">Seleccionar</option>
                <option v-for="city in filteredLocations" :value="city.locationCode">
                    {{ city.locationName }}
                </option>
            </select>
        </div>
    </div>
</template>