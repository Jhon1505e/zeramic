<script setup lang="ts">
import type { IClient } from '~/types/clients';
import type { IDeparment, IData } from '~/types/sends';
const { getLocations } = useEnvio();

const model = defineModel<IClient>({ required: true });
const data = ref<IData[]>([]);

const departments = computed(() => {
    const uniqueDepartments: Record<string, IDeparment> = {};
    data.value.forEach((item) => {
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

const department = computed({
    get: () => ({
        departmentCode: model.value?.departmentCode || "",
        departmentOrStateName: model.value?.departmentOrStateName || ""
    }),
    set: (value) => {
        model.value.departmentCode = value.departmentCode;
        model.value.departmentOrStateName = value.departmentOrStateName;
    }
});

const location = computed({
    get: () => ({
        locationCode: model.value?.locationCode || "",
        locationName: model.value?.locationName || ""
    }),
    set: (value) => {
        model.value.locationCode = value.locationCode;
        model.value.locationName = value.locationName;
    }
});

const filteredLocations = computed(() => {
    if (!model.value?.departmentCode) return [];
    const toOrder = data.value.filter(
        (item) => item.departmentCode === model.value.departmentCode)
        .map((item) => ({
            locationCode: item.locationCode,
            locationName: item.locationName
        }));
    return toOrder.sort((a, b) => {
        if (a.locationName < b.locationName) return -1;
        if (a.locationName > b.locationName) return 1;
        return 0;
    })
});

const resetLocation = () => {
    location.value = {
        locationCode: "",
        locationName: ""
    };
};

onMounted(async () => {
    data.value = await getLocations();
});

</script>
<template>
    <div class="grid md:grid-cols-2 gap-3 p-2">
        <div class="w-full">
            <label for="state" class="text-white">Departamento:</label>
            <select v-model="department" id="state" required @change="resetLocation"
                class="w-full py-2.5 px-4 rounded-lg bg-white mt-2 border">
                <option value="" selected disabled>Seleccionar</option>
                <option v-for="state in departments" :value="state">
                    {{ state.departmentOrStateName }}
                </option>
            </select>
        </div>
        <div class="w-full">
            <label for="city" class="text-white">Ciudad:</label>
            <select v-model="location" id="city" required
                class="w-full py-2.5 px-4 rounded-lg bg-white mt-2 border">
                <option value="" selected disabled>Seleccionar</option>
                <option v-for="city in filteredLocations" :value="city">
                    {{ city.locationName }}
                </option>
            </select>
        </div>
    </div>
</template>