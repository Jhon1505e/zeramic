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

    return { authUser, login, logout }
}