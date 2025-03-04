export default defineEventHandler((event) => {

    const proceso = JSON.parse(JSON.stringify(process));

    console.log('proceso', proceso);

    return {
        ...proceso
    }
})