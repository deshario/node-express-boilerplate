import 'dotenv/config'

const environment = {
  express: {
    port: process.env.EXPRESS_PORT || 8080,
  },
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/nodeExpress',
  },
  secret: {
    accessToken: process.env.ACCESS_TOKEN_SECRET || '1A1zP1eP5QGefi2DM',
    refreshToken: process.env.REFRESH_TOKEN_SECRET || 'PTfTL5SLmv7DivfNa',
  },
}

export default environment
