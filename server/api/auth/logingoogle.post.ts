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

    const { email, name, picture } = payload
    const user = await findClient(email) // find if exist
    
    if (!user) { // if not exist save in MongoDB
        const data = await insertClient({ email, fullName: name, picture })
        return data
    }

    return { email, name, picture }
    
    //
    //
    //
    //const token = await createToken({ id: user._id, email: user.email })
    //setCookie(event, "__session", token)
//
    //const { password: _, ...userData } = user
    //return userData
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