import express from 'express'
import helmet from 'helmet'
import passport from 'passport'
import routes from './src/routes'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import { connectMongo } from './src/services'
import env from './src/config/environment'

const app = express()

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: env.secret.sessionCookie,
  }),
)
app.use(helmet())
app.use(cookieParser())
app.use(express.json()).use(express.urlencoded({ extended: true }))

app.use(passport.initialize())
app.use(passport.session())

app.use(routes)

app.listen(env.express.port, () => {
  console.log(`\n⚡️Server running at ${env.express.port}\n`)
  connectMongo()
})
