export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { getUser, createSending } = useEnvios();
    const { getCompras, updateCompra } = dataCompras();
    const { sendEmail } = useEmail();

    const { wompi, reference, status } = formatWompi(body.data.transaction);

    const clientIP = getRequestHeaders(event)['x-forwarded-for'] || event.node.req.socket.remoteAddress;
    console.log('clientIP', clientIP)

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
            process.env.VERCEL_ENV === 'production' && await sendEmail({
                type: "ALERT",
                info: { email: 'roman.david@gmail.com', ...compra },
            });
        }

        // HACER SOLICITUD DE ENVIO API DE mipaquete.com
        const data: any = await createSending(compra);
        console.log('send', data)
        if (data?.mpCode) mpCode = data?.mpCode;

    }

    try {
        const email = compra?.email || 'roman.david@gmail.com';
        await sendEmail({ type: "CONFIRM", info: { email, ...compra } });
        return  await updateCompra({ reference, wompi, mpCode })
    } catch (e: any) {
        console.error(e)
        return createError({ statusCode: 500, statusMessage: e?.message })
    }
})


// TODO validar IP Wompi

/* const clientIP = getRequestHeaders(event)['x-forwarded-for'] || event.node.req.socket.remoteAddress;
console.log('clientIP', clientIP)

// Permitir solo IPs locales o de un proxy confiable
if (!clientIP?.startsWith('192.168.') && clientIP !== '127.0.0.1' && clientIP !== '::1') {
    throw createError({ statusCode: 403, statusMessage: 'Acceso no permitido' });
} */
