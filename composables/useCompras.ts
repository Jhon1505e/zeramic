export function useCompras() {

    const getCompras = async (params: any) => {
        console.log(params)
        const data = await $fetch('/api/compras', {
            method: 'GET',
            params
        })
        return data
    }

    const saveCompra = async (item: any) => {
        const data = await $fetch('/api/compras/save', {
            method: 'POST',
            body: { ...item, status: "CREATED", date: new Date() }
        })
        return data
    }

    return { getCompras, saveCompra }
}