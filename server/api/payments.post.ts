export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const email = "roman.david@gmail.com"
    const subject = "Zeramic - ALERTA DE PAGO"
    const html = JSON.stringify(body)

    const info = {
        email,
        subject,
        html
    }

    console.log("info", body.data.transaction)

    // TODO logica q recibe el evento de wompi
    // HACER SOLICITUD DE ENVIO API DE mipaquete.com
    // almacenar en coleccion compras
    // y eviar correo notificacion

    const {
        id,
        reference,
        payment_method_type,
        amount_in_cents,
        created_at,
        finalized_at,
        status,
        status_message,
    } = body.data.transaction;

    const wompi = {
        id,
        payment_method_type,
        amount_in_cents,
        created_at,
        finalized_at,
        status,
        status_message,
    }

    const { createSending } = useEnvios();
    const { getCompras, updateCompra } = dataCompras();
    const { sendEmail } = useEmail();

    // Traer compra de la coleccion
    const dataCompra = await getCompras({ reference });
    const compra = dataCompra?.[0];
    let mpCode
    console.log("compra", compra)

    if (status === "APPROVED") {

        // HACER SOLICITUD DE ENVIO API DE mipaquete.com
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
        const receiver = {
            name: compra?.fullName,
            surname: ".",
            email: compra?.email,
            prefix: "+57",
            cellPhone: compra?.phone,
            destinationAddress: compra?.address + compra?.infoDirection,
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

        const data: any = await createSending({
            deliveryCompany: compra?.deliveryCompanyId,
            description: "Cerámica 3D - Delicado",
            channel: "Tienda Zeramic Guatape",
            requestPickup: true,
            locate,
            sender,
            receiver,
            productInformation,
            paymentType: 101,
            adminTransactionData: {
                saleValue: compra?.total
            }
        })

        if (data?.data?.message?.code === 540) {
            // shipping cannot be paid
            await sendEmail(info);
        }
        console.log('api envio', data)
        if (data?.mpCode) mpCode = data?.mpCode
    }

    try {
        // await sendEmail(info);
        const data = await updateCompra({ reference, wompi, mpCode })
        return data
    } catch (e: any) {
        console.error(e)
        return createError({ statusCode: 500, statusMessage: e?.message })
    }
})
