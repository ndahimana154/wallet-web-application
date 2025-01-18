import express from 'express';
import { bodyValidation } from '../middlewares/validationMiddleware.js';
import { newAccountSchema } from '../validation/accountValidation.js';
import { isUserAuthorized } from '../middlewares/authorizationMiddleware.js';
import { isAccountArleadyExists } from '../middlewares/accountMiddlewares.js';
import accountControllers from '../controllers/accountControllers.js';

const accountRouter = express.Router();

accountRouter.post("/new", isUserAuthorized, bodyValidation(newAccountSchema), isAccountArleadyExists, accountControllers.createNewAccount)
accountRouter.get("/all", isUserAuthorized, accountControllers.getAllAccounts)

export default accountRouter