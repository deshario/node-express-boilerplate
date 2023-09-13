import express from 'express'
import helmet from 'helmet'
import passport from 'passport'
import routes from './src/routes'
import { connectMongo } from './src/services'
import env from './src/config/environment'

const app = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())

app.use(routes)

app.listen(env.express.port, () => {
  console.log(`\n⚡️Server running at ${env.express.port}\n`)
  connectMongo()
})
