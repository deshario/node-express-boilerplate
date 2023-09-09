import express from 'express'
import routes from './src/routes'
import { connectMongo } from './src/services/mongo'
import 'dotenv/config'

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log(`\n⚡️Server running at ${port}\n`)
  connectMongo()
})
