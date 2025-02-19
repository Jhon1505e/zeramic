import type { IClient } from "~/types/clients";

export const useAuth = () => {
    const client = useState<IClient | null>("client", () => null);

    const login = async (user: any) => {
        try {
            const data = await $fetch<IClient>("/api/auth/login", {
                method: "POST",
                body: user,
            });
            if (data)
                client.value = data;
            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    const signup = async (user: any) => {
        try {
            const data = await $fetch('/api/auth/signup', {
                method: 'POST',
                body: user,
            });
            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    const userLoggedIn = async () => {
        if (!client.value) {
            const data = await $fetch<IClient>('/api/auth/token', {
                headers: useRequestHeaders(['cookie'])
            })
            if (data)
                client.value = data;
            return data;
        }
    }

    const logout = async () => { }

    const resetPassword = async (user: any) => {
        const data = await $fetch('/api/auth/reset', {
            method: 'POST',
            body: JSON.stringify(user),
        });
        console.log(data);
        return data;
    }

    return { login, signup, logout, resetPassword, userLoggedIn, client };
}