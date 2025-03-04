export default defineEventHandler(async (event) => {
    const evento = JSON.parse(JSON.stringify(event));
    const proceso = JSON.parse(JSON.stringify(process));

    console.log('proceso', ...proceso);

    return {
        ...proceso
    }
})