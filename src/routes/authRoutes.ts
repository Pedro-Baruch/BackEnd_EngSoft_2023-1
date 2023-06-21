import { Router } from "express";
import { AuthController } from "../controllers/authController";

const authRouter = Router()
const authController = new AuthController()

authRouter.post('/singup',authController.singup)
authRouter.post('/singin',authController.singin)
authRouter.post('/forgot-pass',authController.forgotpass)
authRouter.post('/change-pass',authController.changepass)
authRouter.post('/me/:id', authController.me)
authRouter.get('/all-users', authController.getUser)

export { authRouter }