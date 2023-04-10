import { Router } from "express";
import { postRoutes } from "./post";

const router = Router()

// Rotas do projeto
router.use('/posts', postRoutes)

export { router }