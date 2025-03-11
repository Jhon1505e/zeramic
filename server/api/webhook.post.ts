export default defineEventHandler(async (event) => {

    const { entry } = await readBody(event);

    if (!entry) {
        // error
        return createError({ message: 'No entry' });
    }

    const { changes }= entry.find(() => true);
    const { value }= changes.find(() => true);
    
    // const changes = body?.entry?.changes[0];
    
    console.log('body', value?.messages);

    return  { statusCode: 200, body: { message: 'ok' } }
})