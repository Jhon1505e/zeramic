import { MongoClient } from "mongodb"
const config = useRuntimeConfig()
const uri = config.mongoURI
const mongo = new MongoClient(uri)

export default function dataCompras() {
    const database = mongo.db("tailorsdb")
    const compras = database.collection("compras")

    const getCompras = async (query: any) => {
        try {
            await mongo.connect()
            return await compras.find(query).toArray()
        } catch (e) {
            console.error(e)
            return null
        }
        finally {
            await mongo.close()
        }
    }

    const saveCompra = async (item: any) => {
        try {
            await mongo.connect()
            return await compras.insertOne(item)
        } catch (e) {
            console.error(e)
            return null
        } finally {
            await mongo.close()
        }
    }

    return { getCompras, saveCompra }
}