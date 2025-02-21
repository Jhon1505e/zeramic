
interface IEnvio {
    deliveryCompanyImgUrl: string;
    deliveryCompanyName: string;
    routeType: string;
    insurancePercentage: number;
    shippingCost: number;
}
export function useEnvio() {
    const envio = useState<IEnvio | null>("envio", () => null);

    const saveEnvio = (item?: IEnvio) => {
        envio.value = item || null;
    }
    const deleteEnvio = () => {
        envio.value = null;
    }

    const getLocations = async (locationCode?: string) => {
        const data = await $fetch('/api/envios/locations', {
            method: 'GET',
            params: {
                locationCode
            }
        })
        return data as any;
    }

    const cotizarEnvio = async (item: { locationCode: string, declaredValue: number }) => {
        const data = await $fetch('/api/envios/quote', {
            method: 'POST',
            body: {
                originCountryCode: "170",
                originLocationCode: "05001000",
                destinyCountryCode: "170",
                destinyLocationCode: item.locationCode,
                quantity: 1,
                width: 20,
                length: 20,
                height: 20,
                weight: 1,
                declaredValue: item.declaredValue,
            }
        })
        return data as any;
    }

    return {
        envio,
        saveEnvio,
        getLocations,
        deleteEnvio,
        cotizarEnvio
    };
}