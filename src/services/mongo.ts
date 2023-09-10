import mongoose from 'mongoose'
import env from '../config/environment'

export const connectMongo = async () => {
  try {
    await mongoose.connect(env.mongo.url)
    console.info('⚡️Connected to database')
  } catch (err) {
    console.log('Database connection failed')
  }
}
