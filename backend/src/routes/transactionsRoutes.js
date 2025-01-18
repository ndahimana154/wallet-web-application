import express from 'express';

import { bodyValidation } from '../middlewares/validationMiddleware.js';
import { isUserAuthorized } from '../middlewares/authorizationMiddleware.js';
import { newTransactionSchema } from '../validation/transactionsValidations.js';
import transactionsControllers from '../controllers/transactionsControllers.js';
import { isAccountExists } from '../middlewares/accountMiddlewares.js';

const transactionsRouter = express.Router();

transactionsRouter.post("/new", isUserAuthorized, bodyValidation(newTransactionSchema), isAccountExists, transactionsControllers.recordTransaction)
transactionsRouter.get("/all", isUserAuthorized, transactionsControllers.getAllTransactions);
export default transactionsRouter