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

const getMessages = async (item) => {
    try {
        const data = await db.collection('messages')
            .find({from: null}).toArray()
        return data
    } catch (error) {
        console.error(error)
    }
}

export { saveMessage, getMessages }