import { OAuth2Client } from "google-auth-library"
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body?.credential) {
        throw createError({ statusCode: 400, statusMessage: 'No token' })
    }

    // verify credential, get google user
    const payload: any = await verify(body.credential)
    if (!payload?.email) {
        throw createError({ statusCode: 400, statusMessage: `${payload}` })
    }

    const { findClient, insertClient } = fetchClient()
    const { sendEmail } = useEmail()

    const { email, name, picture } = payload
    const user = await findClient(email) // find if exist

    if (!user) { // if not exist save in MongoDB
        const newPass = generatePassword()
        const password = await hashPassword(newPass)
        const data = await insertClient({ email, fullName: name, picture, password, state: 'active' })
        if (!data?.insertedId) {
            throw createError({ statusCode: 500, statusMessage: 'Error al guardar usuario' })
        }
        await sendEmail({
            type: 'SIGNUP',
            info: { fullName: name, email, password: newPass }
        })
        const _id = data?.insertedId
        const token = await createToken({ id: _id, email })
        setCookie(event, "__session", token)
        return { _id, email, fullName: name, picture }
    }

    const token = await createToken({ id: user._id, email: user.email })
    setCookie(event, "__session", token)

    const { password: _, ...dataUsr } = user
    return { ...dataUsr }

})

async function verify(token: string) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        return ticket.getPayload()
    } catch (e) {
        return e
    }

}