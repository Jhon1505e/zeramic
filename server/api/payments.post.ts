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

    const { updateCompra } = dataCompras();
    try {

        const data = await updateCompra({ reference, wompi: item })
        return data
    } catch (e: any) {
        console.error(e)
        return createError({ statusCode: 500, statusMessage: e?.message })
    }
})
