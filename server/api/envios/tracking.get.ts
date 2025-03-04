export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    const mpCode = params?.mpCode as string || ''
    const { getSendingTracking } = useEnvios();

    if (!mpCode) {
        return { error: 'No se proporcionó el código de seguimiento' }
    }

    try {
        const data = await getSendingTracking(mpCode)
        return { data }
    } catch (e: any) {
        const error: string = e?.data?.message?.detail || e?.message || 'Error'
        return { error }
    }

})
