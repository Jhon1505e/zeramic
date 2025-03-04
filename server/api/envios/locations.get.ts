export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    const { getLocations } = useEnvios();
    return await getLocations(params?.locationCode as string)
})
