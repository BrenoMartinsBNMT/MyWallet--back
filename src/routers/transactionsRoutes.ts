import { Router } from "express";
import {
  addBalance,
  getTransactions,
  subsBalance,
} from "../controllers/controllertransactions";
import middlewareValidatorSchema from "../middlewares/middlewareAuth";
import { authTransactions } from "../repositorys/repositoryTransactions";
import {
  schemaBalance,
  schemaGetTransactions,
} from "../schemas/schemaTransactions";

const transactionsRouter = Router();

transactionsRouter.post(
  "/transactions-history",
  middlewareValidatorSchema(schemaGetTransactions),
  authTransactions,
  getTransactions
);

transactionsRouter.post(
  "/transactions/addBalance",
  middlewareValidatorSchema(schemaBalance),
  authTransactions,
  addBalance
);
transactionsRouter.post(
  "/transactions/subsBalance",
  middlewareValidatorSchema(schemaBalance),
  authTransactions,
  subsBalance
);
export default transactionsRouter;
