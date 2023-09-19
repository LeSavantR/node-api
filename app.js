import express, { json } from 'express'
import 'dotenv/config'

import { corsMiddleware } from './middlewares/cors.middleware.js'
import { createMovieRouter } from './routes/movie.routes.js'


const createApp = ({ movieModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')
  app.use('/movies', createMovieRouter({ movieModel }))
  const PORT = process.env.PORT ?? 8000
  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}

export { createApp }
