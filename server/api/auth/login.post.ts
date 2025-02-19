export default defineEventHandler(async (event) => {

    const { findClient } = fetchClient()
    const { email, password } = await readBody(event)
    const user = await findClient(email)

    if (!user) {
        return { message: 'Usuario no registrado' }
    }
    const isValid = await comparePassword(password, user.password)

    if (!isValid) {
        return { message: 'Contraseña incorrecta' }
    }

    const token = await createToken({ id: user._id, email: user.email })
    setCookie(event, "__session", token)

    const { password: _, ...userData } = user
    return userData
})