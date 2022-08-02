import { Router } from "express";

import { userLogout, userSignUp } from "../controllers/controllersAuth";
import { hasNoEmail } from "../errors/errorsAuth";
import middlewareValidatorSchema from "../middlewares/middlewareAuth";
import { hasToken, ifHasEmail, userLogin } from "../repositorys/repositoryAuth";
import { schemaSignIn, schemaSignUp } from "../schemas/schemasAuth";

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
