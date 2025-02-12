export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { findClient, updateClient } = fetchClient()
    const user = await findClient(body.email)

    if (!user) {
        return { message: 'Usuario no registrado' }
    }
    const { sendEmail } = useEmail()
    const newPass = generatePassword()
    const password = await hashPassword(newPass)

    const { password: _, ...userData } = user

    const data = await updateClient({
        email: body.email,
        password,
        state: 'active',
        ...userData
    })

    const dataEmail = await sendEmail({
        email: body.email,
        subject: 'Contraseña actualizada',
        html: `Tu nueva contraseña es: ${newPass}`
    })
    return { data, dataEmail }
})