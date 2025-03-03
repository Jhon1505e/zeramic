export default function useEnvios() {

    const createSending = async (body: any) => {
        try {
            const data = await $fetch('https://api-v2.mpr.mipaquete.com/createSending', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'session-tracker': 'a0c96ea6-b22d-4fb7-a278-850678d5429c',
                    'apikey': process.env.MIPAQUETE_API_KEY || ''
                },
                body
            })
            return data
        } catch (e: any) {
            console.log(e.message)
            return e
        }
    }

    const getSendingTracking = async (mpCode: string) => {
        const data = await $fetch(`https://api-v2.mpr.mipaquete.com/getSendingTracking`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'session-tracker': 'a0c96ea6-b22d-4fb7-a278-850678d5429c',
                'apikey': process.env.MIPAQUETE_API_KEY || ''
            },
            params: { mpCode }
        })
        console.log('data', data)
        return data
    }

    return { createSending, getSendingTracking }
}