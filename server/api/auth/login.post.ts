export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    console.log('login', body)
    const { findClient } = fetchClient()
    const { email, password } = body
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