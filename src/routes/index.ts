import { Router } from "express";
import { authRouter } from "./authRoutes";

const router = Router()

// Rotas do projeto
router.use('/auth',authRouter)

export { router }