import { Router } from "express";
import { authControllers } from "./auth.controller";
import schemaValidator from "../../middlewares/validateRequest";
import { authSchemas } from "./auth.schema";
import { auth } from "../../utils/auth";
import { userRoleStatusEnum } from "../user/user.schema";

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
authRouter.post("/signout", authControllers.signOut);

authRouter.post(
  "/reset_password",
  schemaValidator(authSchemas.resetPasswordSchema),
  auth.authorizeRole(...userRoleStatusEnum),
  authControllers.resetPassword
);

export default authRouter;
