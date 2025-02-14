export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    console.log('signup', body)

    if (!body.email) {
        return
    }

    const { findClient, insertClient } = fetchClient()
    const { sendEmail } = useEmail()
    const exist = await findClient(body.email)

    if (exist) {
        return { message: 'El correo ya se encuentra registrado' }
    }

    const newPass = generatePassword()
    const password = await hashPassword(newPass)

    const data = await insertClient({
        fullName: body.fullName,
        email: body.email,
        password
    })

    const html = `<h1>Bienvenido a Zeramic</h1>
    <p>Hola, ${body.fullName}</p>
    <p>Te damos la bienvenida a la comunidad de Zeramic</p>
    <p>Tu contraseña provisional es: <strong>${newPass}</strong></p>
    <p>Por favor, cambia tu contraseña en tu primer inicio de sesión</p>

    <p>Saludos</p>
    <p>Equipo de Zeramic</p>`

    await sendEmail({
        email: body.email,
        subject: 'Cuenta creada en Zeramic.co',
        html
    })

    return { message: 'Usuario registrado, revisa tu correo para continuar' }
})