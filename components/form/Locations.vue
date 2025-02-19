<script setup lang="ts">
interface ILocation {
    locationCode: string;
    locationName: string;
}
interface IDeparment {
  departmentCode: string;
  departmentOrStateName: string;
}

const departments = ref<IDeparment[]>([]);
const filteredLocations = computed<ILocation[]>(() => {
    return [];
});
</script>
<template>
    <div class="grid md:grid-cols-2 gap-3 p-2">
        <div class="w-full">
            <label for="state" class="text-white">Departamento:</label>
            <select  id="state" class="w-full py-2.5 px-4 rounded-lg text-PRP bg-white mt-2 border">
                <option value="">Seleccionar</option>
                <option v-for="state in departments" :value="state.departmentCode">
                    {{ state.departmentOrStateName }}
                </option>
            </select>
        </div>
        <div class="w-full">
            <label for="city" class="text-white">Ciudad:</label>
            <select  id="city" class="w-full py-2.5 px-4 rounded-lg text-PRP bg-white mt-2 border">
                <option value="">Seleccionar</option>
                <option v-for="city in filteredLocations" :value="city.locationCode">
                    {{ city.locationName }}
                </option>
            </select>
        </div>
    </div>
</template>