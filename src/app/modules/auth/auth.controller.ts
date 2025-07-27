import { Request, Response } from "express";
import safeAsync from "../../utils/safeAsync";
import resHandler from "../../utils/resHandler";
import { StatusCodes } from "http-status-codes";
import message from "../../utils/message";
import { authServices } from "./auth.service";

const credentialSignIn = safeAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken, user } =
    await authServices.credentialSignIn(req.body);

  res.cookie("tour_management_refresh_token", refreshToken, {
    httpOnly: true,
    secure: false,
  });

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

export const authControllers = {
  credentialSignIn,
};
