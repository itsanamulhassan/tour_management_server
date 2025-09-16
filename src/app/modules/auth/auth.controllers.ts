import { NextFunction, Request, Response } from "express";
import safeAsync from "../../utils/safeAsync";
import resHandler from "../../utils/resHandler";
import { StatusCodes } from "http-status-codes";
import message from "../../utils/message";
import { authServices } from "./auth.services";
import AppError from "../../utils/helpers/error/appError";
import { cookies } from "../../utils/cookies";
import { ResetPasswordProps } from "./auth.types";
import { JwtPayload } from "jsonwebtoken";
import { CreateUserProps } from "../user/user.types";
import env from "../../configurations/env";
import passport from "passport";
import { token } from "../../utils/token";
import { Types } from "mongoose";

const credentialSignIn = safeAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      async (
        error: string,
        user: CreateUserProps & { _id: Types.ObjectId },
        info: Record<string, string>
      ) => {
        if (error) {
          return next(new AppError(error, StatusCodes.BAD_REQUEST));
        }
        if (!user) {
          return next(new AppError(info.message, StatusCodes.BAD_REQUEST));
        }
        const payload = {
          credentialId: user._id,
          email: user.email,
          role: user.role,
        };
        const { accessToken, refreshToken } =
          token.createAccessRefreshToken(payload);
        cookies.setCookies(res, { accessToken, refreshToken });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: unusedPassword, ...rest } = user;

        resHandler(res, {
          success: true,
          status: StatusCodes.OK,
          message: message("signIn", "user"),
          data: {
            accessToken,
            refreshToken,
            user: rest,
          },
        });
      }
    )(req, res, next);
  }
);

const retrieveLatestAccessToken = safeAsync(
  async (req: Request, res: Response) => {
    const { tour_management_refresh_token: refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new AppError(
        message("notFound", "refresh token"),
        StatusCodes.BAD_REQUEST
      );
    }

    const { accessToken } = await authServices.retrieveLatestAccessToken(
      refreshToken
    );

    cookies.setCookies(res, { accessToken });

    resHandler(res, {
      success: true,
      message: message("create", "access token"),
      status: StatusCodes.CREATED,
      data: {
        accessToken,
      },
    });
  }
);

const signOut = safeAsync(async (_req: Request, res: Response) => {
  cookies.removeCookies(res, { accessToken: true, refreshToken: true });

  resHandler(res, {
    success: true,
    message: message("signOut", "user"),
    status: StatusCodes.OK,
  });
});

const resetPassword = safeAsync(async (req: Request, res: Response) => {
  const passwords = req.body as ResetPasswordProps;
  await authServices.resetPassword(
    passwords,
    (req?.user as JwtPayload)?.credentialId
  );
  resHandler(res, {
    success: true,
    message: message("update", "password"),
    status: StatusCodes.OK,
  });
});
const changePassword = safeAsync(async (req: Request, res: Response) => {
  const passwords = req.body as ResetPasswordProps;
  await authServices.changePassword(
    passwords,
    (req?.user as JwtPayload)?.credentialId
  );
  resHandler(res, {
    success: true,
    message: message("update", "password"),
    status: StatusCodes.OK,
  });
});

const setPassword = safeAsync(async (req: Request, res: Response) => {
  await authServices.setPassword(req);
  resHandler(res, {
    success: true,
    message: message("update", "password"),
    status: StatusCodes.OK,
  });
});

const googleStrategyCallback = safeAsync(
  async (req: Request, res: Response) => {
    const user = req.user as CreateUserProps & { _id: Types.ObjectId };
    let redirect = (req.query.state || "") as string;
    if (redirect.startsWith("/")) {
      redirect = redirect.slice(1);
    }

    const payload = {
      credentialId: user._id,
      email: user.email,
      role: user.role,
    };
    const { accessToken, refreshToken } =
      token.createAccessRefreshToken(payload);
    cookies.setCookies(res, { accessToken, refreshToken });

    res.redirect(env.frontend_base_url + "/" + redirect);
  }
);

export const authControllers = {
  credentialSignIn,
  retrieveLatestAccessToken,
  signOut,
  resetPassword,
  googleStrategyCallback,
  changePassword,
  setPassword,
};
