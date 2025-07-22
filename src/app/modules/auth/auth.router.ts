import { Router } from "express";
import { authControllers } from "./auth.controller";
import schemaValidator from "../../middlewares/validateRequest";
import { authSchemas } from "./auth.schema";

const authRouter = Router();

authRouter.get(
  "/signin",
  schemaValidator(authSchemas.credentialSignInSchema),
  authControllers.credentialSignIn
);

export default authRouter;
