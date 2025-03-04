export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        const { sendEmail } = useEmail()
        const data = await sendEmail({
            type: "CONTACT",
            email: body?.email || 'roman.david@gmail.com',
            html: JSON.stringify(body)
        })
        return data
    } catch (e) {
        console.error(e)
        return null
    }
})
