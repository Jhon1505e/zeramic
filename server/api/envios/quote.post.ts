export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { quoteShipping } = useEnvios();
    return await quoteShipping(body)
})
