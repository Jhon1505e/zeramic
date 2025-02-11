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

    await sendEmail({
        email: body.email,
        subject: 'Cuenta creada',
        html: `Tu contraseña es: ${newPass}`
    })

    return { message: 'Usuario registrado' }
})