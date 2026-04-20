import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI environment variable.")
}

type MongooseConnection = typeof mongoose

interface MongooseCache {
  conn: MongooseConnection | null
  promise: Promise<MongooseConnection> | null
}

declare global {
  var mongooseCache: MongooseCache | undefined
}

// Reuse a cached connection in development to avoid creating extra connections
// during hot reloads and repeated module imports.
const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache
}

const cached: MongooseCache = globalWithMongoose.mongooseCache ?? {
  conn: null,
  promise: null,
}

if (!globalWithMongoose.mongooseCache) {
  globalWithMongoose.mongooseCache = cached
}

export async function connectToDatabase(): Promise<MongooseConnection> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    // Create one shared connection promise to prevent race conditions when
    // multiple requests try to connect at the same time.
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongooseInstance) => mongooseInstance)
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    // Reset the cached promise so the next call can retry cleanly.
    cached.promise = null
    throw error
  }

  return cached.conn
}

export default connectToDatabase
