export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    let error, data

    try {
        data = await $fetch('https://graph.facebook.com/v22.0/567438449790536/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${body.token}`
            },
            body: {
                messaging_product: 'whatsapp',
                to: body.to,
                type: 'text',
                text: {
                    body: body.text
                }
            }
        })
    } catch (e: any) {
        console.log(JSON.stringify(e?.data))
        error = e?.data?.error
    }
    return { error, data }
});