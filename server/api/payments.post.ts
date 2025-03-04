export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { getUser, createSending } = useEnvios();
    const { getCompras, updateCompra } = dataCompras();
    const { formatEmail, sendEmail } = useEmail();

    const { wompi, reference, status } = formatWompi(body.data.transaction);

    // Traer compra de la coleccion
    const dataCompra = await getCompras({ reference });
    const compra = dataCompra?.[0];
    let mpCode

    if (status === "APPROVED") {

        // verificar si hay saldo suficiente
        const user: any = await getUser();
        const cash = user?.cash || 0;

        if (compra?.shippingCost > cash) {
            // enviar correo de alerta
            process.env.NODE_ENV === 'production' && await sendEmail({
                type: "ALERT",
                email: "roman.david@gmail.com",
                html: formatEmail({ ...compra, cash })
            });
        } else {

            // HACER SOLICITUD DE ENVIO API DE mipaquete.com
            const data: any = await createSending(compra);
            if (data?.mpCode) mpCode = data?.mpCode;
        }

    }

    try {
        const email = compra?.email
        const html = formatEmail(compra)
        await sendEmail({ type: "CONFIRM", email, html });
        const data = await updateCompra({ reference, wompi, mpCode })
        return data
    } catch (e: any) {
        console.error(e)
        return createError({ statusCode: 500, statusMessage: e?.message })
    }
})
