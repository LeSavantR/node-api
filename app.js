import express, { json } from 'express' // require -> commonJS

import { corsMiddleware } from './middlewares/cors.middleware.js'
import { createMovieRouter } from './routes/movie.routes.js'
import { MovieModel } from './models/databases/movies.mysql.js'


const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

app.use('/movies', createMovieRouter({ movieModel: MovieModel }))

const PORT = process.env.PORT ?? 8000

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})