import { saveMessage } from "../utils/messages";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    
    console.log('body', JSON.stringify(body));

    const entry = body?.entry;
    if (!entry) {
        // error
        return createError({ message: 'No entry' });
    }

    const changes = entry.find(() => true)?.changes;
    if (!changes || changes.length === 0) {
        // error
        return createError({ message: 'No changes' });
    }

    const value = changes.find(() => true)?.value;
    if (!value) {
        // error
        return createError({ message: 'No value' });
    }

    const messages = value?.messages
    if (!messages || messages.length === 0) {
        // error
        return createError({ message: 'No messages' });
    }
    const message = messages.find(() => true);

    const data = await saveMessage(message);
    console.log('data', data);
    console.log('message', message);

    return { statusCode: 200, body: { message: 'ok' } }
})