import { MongoClient } from "mongodb"
import { IClient } from "~/types/clients"
const config = useRuntimeConfig()
const uri = config.mongoURI
const client = new MongoClient(uri)

export default function fetchClient() {
  const database = client.db("tailorsdb")
  const clients = database.collection("clients")

  const getClients = async () => {
    try {
      await client.connect()
      return await clients.find({}).toArray()
    } catch (e) {
      console.error(e)
      return null
    } finally {
      await client.close()
    }
  }

  const findClient = async (email: string) => {
    try {
      await client.connect()
      return await clients.findOne({ email })
    } catch (e) {
      console.error(e)
      return null
    } finally {
      await client.close()
    }
  }

  const updateClient = async ({ _id, email, ...data }: IClient) => {
    try {
      await client.connect()
      const query = { email }
      return await clients.updateOne(query, { $set: data }, {})
    } catch (e) {
      console.error(e)
      return null
    } finally {
      await client.close()
    }
  }
  const insertClient = async (data: object) => {
    try {
      await client.connect()
      return await clients.insertOne(data)
    } catch (e) {
      console.error(e)
      return null
    } finally {
      await client.close()
    }
  }

  return { getClients, findClient, insertClient, updateClient }
}
