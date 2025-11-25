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
const ui = { label: { base: 'text-white' } }

</script>
<template>
    <div class="grid md:grid-cols-2 gap-3 px-2">
        <UFormGroup :ui="ui" label="Departamento" name="departmentCode">
            <USelectMenu v-model="department" searchable option-attribute="departmentOrStateName" required
                @change="resetLocation" :options="departments" placeholder="Departamento" size="xl"
                icon="i-heroicons-globe-americas" />
        </UFormGroup>
        <UFormGroup :ui="ui" label="Ciudad" name="locationCode">
            <USelectMenu v-model="location" searchable option-attribute="locationName" required
                :options="filteredLocations" placeholder="Ciudad" size="xl" icon="i-heroicons-map" />
        </UFormGroup>
    </div>
</template>