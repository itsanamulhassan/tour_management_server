import { Router } from "express";
import { authControllers } from "./auth.controller";
import schemaValidator from "../../middlewares/validateRequest";
import { authSchemas } from "./auth.schema";

const authRouter = Router();

authRouter.post(
  "/signin",
  schemaValidator(authSchemas.credentialSignInSchema),
  authControllers.credentialSignIn
);
authRouter.post(
  "/refresh_access_token",
  authControllers.retrieveLatestAccessToken
);

export default authRouter;
