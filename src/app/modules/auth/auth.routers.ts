import { NextFunction, Request, Response, Router } from "express";
import { authControllers } from "./auth.controllers";
import schemaValidator from "../../middlewares/schemaValidator";
import { authSchemas } from "./auth.schemas";
import { userRoleStatusEnum } from "../user/user.schemas";
import passport from "passport";
import { auth } from "./auth.helpers/auth";
import env from "../../configurations/env";

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
authRouter.post(
  "/change_password",
  schemaValidator(authSchemas.changePasswordSchema),
  auth.authorizeRole(...userRoleStatusEnum),
  authControllers.changePassword
);
authRouter.post(
  "/set_password",
  schemaValidator(authSchemas.setPasswordSchema),
  auth.authorizeRole(...userRoleStatusEnum),
  authControllers.setPassword
);
authRouter.post(
  "/forget_password",
  schemaValidator(authSchemas.forgetPasswordSchema),
  authControllers.forgetPassword
);
authRouter.post(
  "/reset_password",
  schemaValidator(authSchemas.resetPasswordSchema),
  auth.authorizeRole(...userRoleStatusEnum),
  authControllers.resetPassword
);

authRouter.get(
  "/google",
  async (req: Request, res: Response, next: NextFunction) => {
    const redirect = (req.query.redirect || "/") as string;

    passport.authenticate("google", {
      scope: ["profile", "email"],
      state: redirect,
    })(req, res, next);
  }
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${env.frontend_base_url}/signin?error=There is some issues with your account. Please contact with out support team!`,
  }),
  authControllers.googleStrategyCallback
);
export default authRouter;
