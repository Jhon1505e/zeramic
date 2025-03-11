import { MongoClient } from "mongodb"
const config = useRuntimeConfig()
const uri = config.mongoURI
const mongo = new MongoClient(uri)
const db = mongo.db('tailorsdb')

const saveMessage = async (message: any) => {
    try {
        const data = await db.collection('messages').insertOne(message)
        return data
    } catch (error) {
        console.error(error)
    }
}

const getMessages = async (from?: string) => {
    try {
        const messages = db.collection('messages')
        return from
            ? await messages.find({ from }).toArray()
            : await messages.find().toArray()
    } catch (error) {
        console.error(error)
    }
}

export { saveMessage, getMessages }