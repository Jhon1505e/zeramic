export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const email = "roman.david@gmail.com"
    const subject = "Wompi - Evento de prueba"
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

    const item = {
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
    console.log("compra", compra)

    if (status === "APPROVED") {

        // HACER SOLICITUD DE ENVIO API DE mipaquete.com
        const sender = {
            name: "Zeramic co",
            surname: "Guatape",
            cellPhone: "3013528220",
            prefix: "+57",
            email: "zeramicguatape@gmail.com",
            pickupAddress: "Medellin - Antioquia",
            nit: "1152456886",
            nitType: "CC"
        }
        const receiver = {
            name: compra?.fullName,
            surname: "Guatape",
            email: compra?.email,
            prefix: "+57",
            cellPhone: compra?.phone,
            destinationAddress: compra?.locationName,
            nit: "323233",
            nitType: "CC"
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
            description: "Envio de prueba",
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
        }
        console.log('api envio', data)
        return data
    }
    /*
 
 
try {
await sendEmail(info);
const data = await updateCompra({ reference, wompi: item })
return data
} catch (e: any) {
console.error(e)
return createError({ statusCode: 500, statusMessage: e?.message })
} */
})
