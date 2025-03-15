import { getMessages } from "../utils/messages";
export default defineEventHandler(async (event) => {

    const query = getQuery(event)
    const from = query?.from as string | undefined
    const data = await getMessages(from)
    return data
});