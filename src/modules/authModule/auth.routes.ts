import { Router } from "express";
import * as authController from './auth.controller.ts'
import validateSchema from "../../middlewares/validateSchema.ts";
import registerSchema from "../../schemas/register.schema.ts";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
const authRouter = Router();

authRouter.post('/login', authController.login)
authRouter.post('/register',validateSchema(registerSchema), authController.register)
authRouter.post('/logout', authController.logout)
authRouter.get('/me',authMiddleware, authController.getCurrentUser)

export default authRouter