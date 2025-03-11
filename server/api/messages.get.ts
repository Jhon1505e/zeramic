import { getMessages } from "../utils/messages";
export default defineEventHandler(async (event) => {
    
    const query = getQuery(event)
    const data = await getMessages(query)
    return data
});