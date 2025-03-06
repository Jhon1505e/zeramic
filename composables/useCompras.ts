export function useCompras() {
    const { start, finish } = useLoadingIndicator();

    const getCompras = async (params: any) => {
        start();
        const data = await $fetch('/api/compras', {
            method: 'GET',
            params
        })
        finish();
        return data
    }

    const saveCompra = async (item: any) => {
        const data = await $fetch('/api/compras/save', {
            method: 'POST',
            body: { ...item, date: new Date() }
        })
        return data
    }

    return { getCompras, saveCompra }
}