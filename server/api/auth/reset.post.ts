export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    console.log('reset', body)

    return body
})