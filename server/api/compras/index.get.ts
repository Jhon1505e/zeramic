export default defineEventHandler(async (event) => {

    const clientIP = getRequestHeaders(event)['x-forwarded-for'] || event.node.req.socket.remoteAddress;
    console.log('clientIP', clientIP)

    // Permitir solo IPs locales o de un proxy confiable
    if (!clientIP?.startsWith('192.168.') && clientIP !== '127.0.0.1' && clientIP !== '::1') {
        throw createError({ statusCode: 403, statusMessage: 'Acceso no permitido' });
    }

    const query = getQuery(event)
    const { getCompras } = dataCompras()
    const data = await getCompras(query)

    return data
});