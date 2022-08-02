import { Router } from "express";

import { userLogout, userSignUp } from "../controllers/controllersAuth.js";

import middlewareValidatorSchema from "../middlewares/middlewareAuth.js";
import {
  hasToken,
  ifHasEmail,
  userLogin,
} from "../repositorys/repositoryAuth.js";
import { schemaSignIn, schemaSignUp } from "../schemas/schemasAuth.js";

const authRoutes = Router();
authRoutes.post(
  "/signUp",
  middlewareValidatorSchema(schemaSignUp),
  ifHasEmail,
  userSignUp
);

authRoutes.post(
  "/login",
  middlewareValidatorSchema(schemaSignIn),
  hasToken,
  userLogin
);

authRoutes.post("/logout", userLogout);

export default authRoutes;
