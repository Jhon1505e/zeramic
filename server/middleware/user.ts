import { getUserToken } from "../utils/session"

export default defineEventHandler(async (event) => {
    // ...
    const user = await getUserToken(event)
    console.log(user);

    const requestHeaders = getRequestHeaders(event);

    const headers = getHeaders(event)


    console.log('requestHeaders => ', requestHeaders);
    
    console.log('- - - - - - -- - - - - --- - - -');
    
    console.log('headers => ', headers);

    if (!user) {
        event.context.user = null
    }
    if (user) {
        event.context.user = user
    }
})