import { IClient } from "~/types/clients"

export default defineEventHandler(async (event) => {

    const { findClient } = fetchClient()
    const { email, password } = await readBody(event)
    const user = await findClient(email)

    let data = null

    if (!user) {
        return { message: 'Usuario no registrado', data }
    }

    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
        return { message: 'Contraseña incorrecta', data }
    }

    const token = await createToken({ id: user._id, email: user.email })
    setCookie(event, "__session", token)

    const { password: _, ...dataUsr } = user
    return { message: 'Login exitoso', data: dataUsr as IClient }
})