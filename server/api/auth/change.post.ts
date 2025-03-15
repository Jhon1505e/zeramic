export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const user = event.context?.user

    if (!user?.email) {
        return { message: 'No autorizado' }
    }
    const { findClient, updateClient } = fetchClient()
    const client = await findClient(user.email)

    if (!client) {
        return { message: 'Usuario no registrado' }
    }

    const isValid = await comparePassword(body.password, client.password)

    if (!isValid) {
        return { message: 'Contraseña incorrecta' }
    }

    const password = await hashPassword(body.newPassword)

    await updateClient({
        email: client.email,
        state: client.state,
        password
    })

    return { message: 'Contraseña actualizada' }
})