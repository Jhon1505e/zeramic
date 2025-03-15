import type { IClient } from "~/types/clients";

export function useClient() {

    const getDataClients = async (user: any) => {
        const data = await $fetch("/api/clients/getAll", {
            method: "POST",
            body: user,
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
        const data = await $fetch<IClient>("/api/clients/update", {
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