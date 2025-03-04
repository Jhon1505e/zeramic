const MIPAQUETE_API_KEY = process.env.MIPAQUETE_API_KEY
const MIPAQUETE_URI = process.env.MIPAQUETE_URI
const headers = {
    'Content-Type': 'application/json',
    'session-tracker': 'a0c96ea6-b22d-4fb7-a278-850678d5429c',
    'apikey': MIPAQUETE_API_KEY || ''
}
const sender = {
    name: "Zeramic S.A.S.",
    surname: "Guatape",
    cellPhone: "3002285505",
    prefix: "+57",
    email: "zeramicguatape@gmail.com",
    pickupAddress: "Medellin - Antioquia",
    nit: "901591630-3",
    nitType: "Nit"
}

const formatSending = (compra: any) => {

    const receiver = {
        name: compra?.fullName,
        surname: ".",
        email: compra?.email,
        prefix: "+57",
        cellPhone: compra?.phone,
        destinationAddress: compra?.address + " - " + compra?.infoDirection,
        nit: compra?.docId,
        nitType: compra?.docType
    }

    const productInformation = {
        quantity: 1,
        width: 10,
        large: 10,
        height: 10,
        weight: 1,
        forbiddenProduct: true,
        productReference: compra?.reference,
        declaredValue: compra?.total,
    }

    const locate = {
        destinyDaneCode: compra?.locationCode,
        originDaneCode: "05001000",
        originCountryCode: "170",
        destinyCountryCode: "170",
    }

    return {
        deliveryCompany: compra?.deliveryCompanyId,
        description: "Cerámica 3D - Delicado",
        channel: "Tienda Zeramic Guatape",
        requestPickup: true,
        locate,
        sender,
        receiver,
        productInformation,
        paymentType: 101,
        valueCollection: compra?.total,
        adminTransactionData: {
            saleValue: 0,
        }
    }

}

export default function useEnvios() {

    const createSending = async (body: any) => {
        const data = await $fetch(`${MIPAQUETE_URI}/createSending`, {
            method: 'POST',
            headers,
            body: formatSending(body)
        })
        return data
    }

    const getSendingTracking = async (mpCode: string) => {
        const data = await $fetch(`${MIPAQUETE_URI}/getSendingTracking`, {
            method: 'GET',
            headers,
            params: { mpCode }
        })
        return data
    }

    const quoteShipping = async (body: any) => {
        const data = await $fetch(`${MIPAQUETE_URI}/quoteShipping`, {
            method: 'POST',
            headers,
            body
        })
        return data
    }

    const getLocations = async (locationCode?: string) => {
        const data = await $fetch(`${MIPAQUETE_URI}/getLocations`, {
            method: 'GET',
            headers,
            params: { locationCode }
        })
        return data
    }

    const getUser = async () => {
        const data = await $fetch(`${MIPAQUETE_URI}/getUser`, {
            method: 'GET',
            headers
        })
        return data
    }

    return { getUser, getLocations, quoteShipping, createSending, getSendingTracking }
}