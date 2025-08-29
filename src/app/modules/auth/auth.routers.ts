import { NextFunction, Request, Response, Router } from "express";
import { authControllers } from "./auth.controllers";
import schemaValidator from "../../middlewares/validateRequest";
import { authSchemas } from "./auth.schemas";
import { userRoleStatusEnum } from "../user/user.schemas";
import passport from "passport";
import { auth } from "./auth.helpers/auth";

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
    failureRedirect: "/signin",
  }),
  authControllers.googleStrategyCallback
);
export default authRouter;
