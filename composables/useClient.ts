import type { IClient } from "~/types/clients";

export function useClient() {

    async function getDataClients() {
        const data = await $fetch("/api/pedidos/find", {
            method: "POST",
            body: {
                name: "",
            },
        });
        return data;
    }

    const getClient = async (user: any) => {
        const data = await $fetch<IClient>("/api/client", {
            method: "POST",
            body: user,
        });
        if (!data) {
            alert("No se encontro el usuario");
        }
        return data;
    };

    const saveClient = async (client: IClient) => {
        const data = await $fetch<IClient>("/api/clientes/update", {
            method: "POST",
            body: client,
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

    return { getDataClients, getClient, saveClient, deleteClient };
}