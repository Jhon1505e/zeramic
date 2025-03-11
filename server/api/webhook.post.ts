export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    console.log('body', JSON.stringify(body));
    
    const changes = body?.entry?.changes[0];
    
    console.log('body', JSON.stringify(changes));

    return  { statusCode: 200, body: { message: 'ok' } }
})