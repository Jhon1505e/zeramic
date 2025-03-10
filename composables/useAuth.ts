import type { IClient } from "~/types/clients";

export const useAuth = () => {
    const client = useState<IClient | null>("client", () => null);
    const { start, finish } = useLoadingIndicator();

    const incomplete = computed(
        () => Object.keys(client.value || {}).length < 12);

    const loginGoogle = async ({ credential }: any) => {
        start();
        try {
            const data = await $fetch<IClient>("/api/auth/logingoogle", {
                method: "POST",
                body: { credential },
            });
            client.value = data;
            return finish();
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    const login = async (user: any) => {
        start();
        try {
            const { message, data } = await $fetch("/api/auth/login", {
                method: "POST",
                body: user,
            });
            finish();
            client.value = data as IClient;
            return message
        } catch (error) {
            console.error(error);
        }
    }

    const signup = async (user: any) => {
        try {
            const data = await $fetch('/api/auth/signup', {
                method: 'POST',
                body: user,
            });
            finish();
            return data.message;
        } catch (error) {
            console.error(error);
            return JSON.stringify(error);
        }
    }

    const userLoggedIn = async () => {
        const { cookie } = useRequestHeaders(['cookie'])
        if (!client.value && cookie) {
            const data = await $fetch<IClient>('/api/auth/token', {
                headers: { cookie }
            })
            console.log('data', data.state);
            if (data.state === 'active')
                client.value = data;
            return;
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
        return data.message;
    }

    return { loginGoogle, login, signup, logout, resetPassword, userLoggedIn, client, incomplete };
}