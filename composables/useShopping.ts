export function useShopping() {
  const cart = useState("cart", () => new Map());
  const open = useState("open", () => false);

  const loadCartFromLocalStorage = () => {
    if (process.client) {
      const cartArray = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.value = cartArray.reduce((map: Map<string, any>, product: any) => {
        map.set(product.uuid, product);
        return map;
      }, new Map());
    }
  };

  const cartProducts = computed(() =>
    Array.from(cart.value.entries()).map(([uuid, product]) => ({
      uuid,
      ...product,
    }))
  );

  const total = computed(() => {
    let total = 0;
    for (const item of cartProducts.value) {
      total += item.cantidad * item.valor;
    }
    return total;
  });

  const saveCartToLocalStorage = () => {
    if (process.client) {
      localStorage.setItem('cart', JSON.stringify(cartProducts.value));
    }
  };

  function addProduct({ uuid, ...product }: any) {
    cart.value.set(uuid, product);
    open.value = true;
    saveCartToLocalStorage();
  }

  function delProduct(uuid: string) {
    cart.value.delete(uuid);
    saveCartToLocalStorage();
  }

  return {
    open,
    cart,
    cartProducts,
    total,
    loadCartFromLocalStorage,
    addProduct,
    delProduct,
  };
}
