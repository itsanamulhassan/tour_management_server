import { Router } from "express";
import { otpControllers } from "./otp.controllers";

const otpRouter = Router();

otpRouter.post("/send", otpControllers.sendOTP);
otpRouter.post("/verify", otpControllers.verifyOTP);

export default otpRouter;
