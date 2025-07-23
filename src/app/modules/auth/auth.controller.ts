import { Request, Response } from "express";
import safeAsync from "../../utils/safeAsync";
import resHandler from "../../utils/resHandler";
import { StatusCodes } from "http-status-codes";
import message from "../../utils/message";
import { authServices } from "./auth.service";

const credentialSignIn = safeAsync(async (req: Request, res: Response) => {
  const credential = await authServices.credentialSignIn(req.body);
  resHandler(res, {
    success: true,
    status: StatusCodes.OK,
    message: message("signIn", "user"),
    data: {
      accessToken: credential,
    },
  });
});

export const authControllers = {
  credentialSignIn,
};
