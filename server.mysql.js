import { createApp } from './app.js'
import { MovieModel } from './models/databases/movies.mysql.js'

createApp({ movieModel: MovieModel })
