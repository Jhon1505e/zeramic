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

    await updateClient({
        email: body.email,
        password,
        state: 'active',
        ...userData
    })

    const data: any = await sendEmail({
        type: 'RESET',
        email: body.email,
        html: `Tu nueva contraseña es: <strong>${newPass}</strong>`
    })
    const message = data?.error ? data.error.message : 'Nueva contraseña enviada'
    return { message }
})