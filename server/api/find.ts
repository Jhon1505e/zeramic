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
        const data: any = await $fetch(`${MONGO_URL_ENDPOINT}/action/find`, {
            method: 'POST',
            headers,
            body: body
        })
        
        const { documents } = data
        const result = documents.map((doc: any) => {
            const { productos } = doc
            if(!productos) doc.productos = []
            if (typeof productos === 'string') {
                doc.productos = [JSON.parse(productos)]
            }
            if(typeof productos === 'object') {
                doc.productos = productos.map((item: any) => JSON.parse(item))
            }
            return doc
        })
        return result
    } catch (error) {
        console.log(error)
        return error
    }
})