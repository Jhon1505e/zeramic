export function useShopping() {

    const cart = useState('cart', () => new Map())
    const open = useState('open', () => false)

    function addProduct({ uuid, ...product }: any) {
        cart.value.set(uuid, product)
        open.value = true
    }
    
    function delProduct(uuid: string) {
        cart.value.delete(uuid)
    }

    return {
        open,
        cart,
        addProduct,
        delProduct
    }
}