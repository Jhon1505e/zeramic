
const MIPAQUETE_API_KEY = process.env.MIPAQUETE_API_KEY
const MIPAQUETE_URI = process.env.MIPAQUETE_URI

export default defineEventHandler(async (event) => {
    const params = getQuery(event)

    const data = await $fetch(`${MIPAQUETE_URI}/getSendingTracking`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'session-tracker': 'a0c96ea6-b22d-4fb7-a278-850678d5429c',
            'apikey': MIPAQUETE_API_KEY || ''
        },
        params
    })

    return data
})
