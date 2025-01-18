import express from 'express';
import { isPassworValid, isUserExistsByEmail } from '../middlewares/authMiddlewares.js';
import { bodyValidation } from '../middlewares/validationMiddleware.js';
import { loginSchema } from '../validation/authValidation.js';
import authControllers from '../controllers/authControllers.js';

const authRouter = express.Router();

authRouter.post("/login", bodyValidation(loginSchema), isUserExistsByEmail, isPassworValid, authControllers.userLogin)

export default authRouter