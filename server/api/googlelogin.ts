import { OAuth2Client } from "google-auth-library"
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)


export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.token) {
        return
    }

    const payload = await verify(body.token)
    if (!payload?.email) {
        return
    }

    const { findClient, insertClient } = fetchClient()
    const { email, name, picture } = payload
    const exist = await findClient(email)
    if (!exist) {
        const data = await insertClient({ email, name, picture })
        return { email, name, picture }
    }
    return exist
})

async function verify(token: string) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    })
    return ticket.getPayload()
}