import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'secret',
  database: 'moviesdb'
}

const connectionString = process.env.DATABASE_URL // ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

const BASE_MOVIE_DATA_QUERY = 'SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate FROM movie'
const BASE_MOVIE_DATA_INSERT = 'INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES'

export class MovieModel {

  static async getAll ({ genre }) {

    if (genre) {
      const genreLowerCase = genre.toLowerCase()
      const [ genres, _tableInfo ] = await connection.query(
        'SELECT id FROM genre WHERE LOWER(name) = ?;', [genreLowerCase]
      )

      if (genres.length === 0) return []

      const [ { id }, ] = genres
      const [ filteredGenre, _ ] = await connection.query(
        `${BASE_MOVIE_DATA_QUERY} INNER JOIN movie_genre ON movie.id = movie_genre.movie_id AND movie_genre.genre_id = ?;`, [id]
      )
      return filteredGenre
    }

    const [ movies, _tableInfo ] = await connection.query(
      `${BASE_MOVIE_DATA_QUERY};`
    )
    return movies
  }

  static async getById ({ id }) {
    const [movie] = await connection.query(
      `${BASE_MOVIE_DATA_QUERY} WHERE ID = UUID_TO_BIN(?);`, [id]
    )

    if (movie.length === 0) return null
    return movie[0]
  }

  static async create ({ input }) {
    const { title, year, duration, director, rate, poster, genre } = input

    const [ uuidResult ] = await connection.query('SELECT UUID() uuid;')
    const [ { uuid } ] = uuidResult

    await connection.query(
      `${BASE_MOVIE_DATA_INSERT} (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
      [title, year, director, duration, poster, rate]
    )

    const [newMovie] = await connection.query(
      `${BASE_MOVIE_DATA_QUERY} WHERE ID = UUID_TO_BIN(?);`, [uuid]
    )

    return newMovie[0]
  }

  static async delete ({ id }) {}

  static async update ({ id, input }) {}
}