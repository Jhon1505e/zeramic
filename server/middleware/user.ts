import { getUserToken } from "../utils/session"

export default defineEventHandler(async (event) => {

    const user = await getUserToken(event)

    if (!user) {
        event.context.user = null
    }
    if (user) {
        event.context.user = user
    }
    const allowedOrigin = 'http://localhost';
    const origin = getHeader(event, 'origin') || '';
    const referer = getHeader(event, 'referer') || '';

    event.context.valid = origin.includes(allowedOrigin) || referer.includes(allowedOrigin)
    //if (!isValid)
        //return { error: 'No autorizado' }

})