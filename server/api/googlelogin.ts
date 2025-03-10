import { OAuth2Client } from "google-auth-library"
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)


export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body?.token) {
        throw createError({ statusCode: 400, statusMessage: 'No token' })
    }

    const payload: any = await verify(body.token) // verify token, get google user
    if (!payload?.email) { // return if no email
        throw createError({ statusCode: 400, statusMessage: `${payload}` })
    }

    const { findClient, insertClient } = fetchClient()  // get functions MongoDB
    const { email, name, picture } = payload
    const exist = await findClient(email) // find if exist
    console.log('exist', exist)
    if (!exist) { // if not exist save in MongoDB
        const data = await insertClient({ email, fullName: name, picture })
        console.log(data)
        return { email, name, picture }
    }
    return exist
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