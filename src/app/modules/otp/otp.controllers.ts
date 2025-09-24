import { StatusCodes } from "http-status-codes";
import resHandler from "../../utils/resHandler";
import safeAsync from "../../utils/safeAsync";
import { otpServices } from "./otp.services";
import message from "../../utils/message";
import { Request, Response } from "express";

const sendOTP = safeAsync(async (req: Request, res: Response) => {
  await otpServices.sendOTP(req);

  resHandler(res, {
    success: true,
    status: StatusCodes.OK,
    message: message("success", "sending OTP"),
  });
});
const verifyOTP = safeAsync(async (req: Request, res: Response) => {
  await otpServices.verifyOTP(req);
  resHandler(res, {
    success: true,
    status: StatusCodes.OK,
    message: message("success", "account verification"),
  });
});

export const otpControllers = {
  sendOTP,
  verifyOTP,
};
