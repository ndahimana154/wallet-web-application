import express from 'express';

import authRouter from './authRoutes.js';
import accountRouter from './accountRoutes.js';
import transactionsRouter from './transactionsRoutes.js';

const router = express.Router();

router.use("/auth", authRouter);
router.use("/account", accountRouter);
router.use("/transaction", transactionsRouter);

export default router