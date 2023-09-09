import mongoose from 'mongoose'

export const connectMongo = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/nodeExpress')
    console.info('⚡️Connected to database')
  } catch (err) {
    console.log('Database connection failed')
  }
}
