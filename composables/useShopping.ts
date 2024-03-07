export function useShopping() {

    const cart = useState('cart', () => new Map())

    function addProduct({ uuid, ...product }: any) {
        cart.value.set(uuid, product)
    }
    
    function delProduct(uuid: string) {
        cart.value.delete(uuid)
    }

    return {
        cart,
        addProduct,
        delProduct
    }
}