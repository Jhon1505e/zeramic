export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const MONGO_URL_ENDPOINT = process.env.MONGO_URL_ENDPOINT
    const MONGO_API_KEY = process.env.MONGO_API_KEY

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': MONGO_API_KEY || ''
    }

    const body = {
        dataSource: 'Tailors',
        database: 'tailorsdb',
        collection: 'projects',
        filter: query
    }

    try {
        const data = await $fetch(`${MONGO_URL_ENDPOINT}/action/deleteOne`, {
            method: 'POST',
            headers,
            body: body
        })
        return data
    } catch (error) {
        console.log(error)
        return error
    }
})