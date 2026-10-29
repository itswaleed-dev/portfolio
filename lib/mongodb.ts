import { MongoClient } from "mongodb"

declare global {
  var mongoClientPromise: Promise<MongoClient> | undefined
}

export async function getDatabase() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error("MONGODB_URI is not configured.")

  let clientPromise = global.mongoClientPromise
  if (!clientPromise) {
    clientPromise = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 }).connect()
    global.mongoClientPromise = clientPromise
    void clientPromise.catch(() => {
      if (global.mongoClientPromise === clientPromise) {
        global.mongoClientPromise = undefined
      }
    })
  }

  const client = await clientPromise
  return client.db(process.env.MONGODB_DB || "portfolio")
}
