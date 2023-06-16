import { Router } from "express";

const authRouter = Router()

authRouter.post('/singup')
authRouter.post('/singin')
authRouter.post('/forgot-pass')

export { authRouter }