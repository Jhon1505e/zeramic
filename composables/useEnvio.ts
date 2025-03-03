
interface IEnvio {
    deliveryCompanyImgUrl: string;
    deliveryCompanyName: string;
    deliveryCompanyId: string;
    routeType: string;
    insurancePercentage: number;
    shippingCost: number;
}
export function useEnvio() {
    const envio = useState<IEnvio | null>("envio", () => null);

    const saveEnvio = (item?: any) => {
        let data = null
        if (item) {
            const {
                deliveryCompanyImgUrl,
                deliveryCompanyName,
                deliveryCompanyId,
                routeType,
                insurancePercentage,
                shippingCost
            } = item;
            data = {
                deliveryCompanyImgUrl,
                deliveryCompanyName,
                deliveryCompanyId,
                routeType,
                insurancePercentage,
                shippingCost
            };
        }
        envio.value = data;
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

    const getTracking = async (mpCode: string) => {
        const data = await $fetch('/api/envios/tracking', {
            method: 'GET',
            params: {
                mpCode
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
                width: 10,
                length: 10,
                height: 10,
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
        getTracking,
        deleteEnvio,
        cotizarEnvio
    };
}