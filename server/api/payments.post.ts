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


    // TODO logica q recibe el evento de wompi
    // almacenar en coleccion transacciones
    // y eviar correo notificacion
    try {
        const { sendEmail } = useEmail()
        
        const data = await sendEmail(info)
        return data
    } catch (e) {
        console.error(e)
        return null
    }
})
