import { Router } from "express";
import { postRoutes } from "./post";
import { Express } from "express";

const router = Router()

// Rotas do projeto
router.use('/posts', postRoutes)

export { router }