import type { IClient } from "~/types/clients";
export function useClient() {
    const client = useState<IClient | null>("client", () => null);
    const user = reactive({
        email: "",
    });

    async function getDataClients() {
        const data = await $fetch("/api/pedidos/find", {
            method: "POST",
            body: {
                name: "",
            },
        });
        return data;
    }

    const getClient = async () => {
        const data = await $fetch<IClient>("/api/client", {
            method: "POST",
            body: user,
        });
        if (!data) {
            alert("No se encontro el usuario");
        } else {
            client.value = data;
        }
    };

    const saveClient = async () => {
        const data = await $fetch<IClient>("/api/clientes/update", {
            method: "POST",
            body: client.value,
        });
        return data
    }

    async function deleteClient(id: string) {
        const data = await $fetch("/api/pedidos/deleteOne", {
            method: "POST",
            body: {
                _id: id,
            },
        });
        return data
    }

    return { client, user, getDataClients, getClient, saveClient, deleteClient };
}