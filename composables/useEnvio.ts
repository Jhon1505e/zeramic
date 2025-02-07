
interface IEnvio {
    deliveryCompanyImgUrl: string;
    deliveryCompanyName: string;
    routeType: string;
    insurancePercentage: number;
    shippingCost: number;
}
export function useEnvio() {
    const envio = useState<IEnvio | null>("envio", () => null);

    const saveEnvio = (item: IEnvio) => {
        envio.value = item;
    }
    const deleteEnvio = () => {
        envio.value = null;
    }

    return {
        envio,
        saveEnvio,
        deleteEnvio
    };
}