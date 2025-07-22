import { Request, Response } from "express";
import safeAsync from "../../utils/safeAsync";
import resHandler from "../../utils/resHandler";
import { StatusCodes } from "http-status-codes";
import resMessage from "../../utils/resMessage";
import { authServices } from "./auth.service";

const credentialSignIn = safeAsync(async (req: Request, res: Response) => {
  const credential = await authServices.credentialSignIn(req.body);
  resHandler(res, {
    success: true,
    status: StatusCodes.OK,
    message: resMessage("signIn", "user"),
    data: credential,
  });
});

export const authControllers = {
  credentialSignIn,
};
