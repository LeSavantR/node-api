import { MovieController } from "../controller/movie.controller.js"
import { Router } from "express"


export const createMovieRouter = ({ movieModel }) => {
  const router = Router()
  const movieController = new MovieController({ movieModel })
  router.get('/', movieController.getAll)
  router.post('/', movieController.create)

  router.get('/:id', movieController.getById)
  router.delete('/:id', movieController.delete)
  router.patch('/:id', movieController.update)
  return router
}
