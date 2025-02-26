import type { IClient } from "~/types/clients";

export const useAuth = () => {
    const client = useState<IClient | null>("client", () => null);
    const { start, finish } = useLoadingIndicator();

    const login = async (user: any) => {
        start();
        try {
            const data = await $fetch<IClient>("/api/auth/login", {
                method: "POST",
                body: user,
            });
            finish();
            return data.email
                ? client.value = data
                : data;
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
            finish();
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

    const logout = async () => {
        const data = await $fetch('/api/auth/logout');
        client.value = null;
        return data
    }

    const resetPassword = async (email: string) => {
        const data = await $fetch('/api/auth/reset', {
            method: 'POST',
            body: { email },
        });
        console.log(data);
        return data;
    }

    return { login, signup, logout, resetPassword, userLoggedIn, client };
}