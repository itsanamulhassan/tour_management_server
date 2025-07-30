import { NextFunction, Request, Response } from "express";
import safeAsync from "../../utils/safeAsync";
import resHandler from "../../utils/resHandler";
import { StatusCodes } from "http-status-codes";
import message from "../../utils/message";
import { authServices } from "./auth.service";
import AppError from "../../errorHelper/appError";
import { cookies } from "../../utils/cookies";

const credentialSignIn = safeAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken, user } =
    await authServices.credentialSignIn(req.body);
  cookies.setCookies(res, { accessToken, refreshToken });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: unusedPassword, ...rest } = user.toObject();

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
});

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
    });
  }
);

export const authControllers = {
  credentialSignIn,
  retrieveLatestAccessToken,
};
