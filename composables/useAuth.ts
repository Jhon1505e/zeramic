export const useAuth = () => {

    const authUser = useState<any | null>('user', () => null)

    const login = async (user: any): Promise<any> => {
        try {
            const data = await $fetch("/api/auth/login", {
                method: "POST",
                body: user,
            });
            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    const logout = async () => { }

const reset = async (user: any) => { 




    const data = await $fetch('/api/auth/reset', {
      method: 'POST',
      body: JSON.stringify(user),
    });
    console.log(data);
    return data;
}

    return { authUser, login, logout, reset}
}