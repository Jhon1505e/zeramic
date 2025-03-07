export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    try {
        const { sendEmail } = useEmail()
        const data = await sendEmail({
            type: "CONTACT",
            info: body
        })
        return data
    } catch (e) {
        console.error(e)
        return null
    }
})
