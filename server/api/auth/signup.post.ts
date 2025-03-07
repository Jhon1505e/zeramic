export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    if (!body.email) {
        return { message: 'El correo es requerido' }
    }

    const { findClient, insertClient } = fetchClient()
    const { sendEmail } = useEmail()
    const exist = await findClient(body.email)

    if (exist) {
        return { message: 'El correo ya se encuentra registrado' }
    }

    const password = generatePassword()
    const newPass = await hashPassword(password)

    const data = await insertClient({
        fullName: body.fullName,
        email: body.email,
        password: newPass
    })

    await sendEmail({
        type: 'SIGNUP',
        info: { fullName: body.fullName, email: body.email, password }
    })

    return { message: 'Usuario registrado, revisa tu correo para continuar' }
})