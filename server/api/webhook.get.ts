export default defineEventHandler((event) => {
    const query = getQuery(event)
    console.log('query', query);

    if (query['hub.mode'] == 'subscribe' && query['hub.verify_token'] == 'my_secret_token') {
        return query['hub.challenge']
    }

    return null

})