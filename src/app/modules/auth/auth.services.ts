/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Users } from "../user/user.models";
import AppError from "../../utils/helpers/error/appError";
import { StatusCodes } from "http-status-codes";
import message from "../../utils/message";
import bcrypt from "bcryptjs";
import { ResetPasswordProps } from "./auth.types";
import env from "../../configurations/env";
import { Types } from "mongoose";
import { token } from "../../utils/token";

const retrieveLatestAccessToken = async (refreshToken: string) => {
  const accessToken = await token.createAccessTokenWithRefreshToken(
    refreshToken
  );
  return { accessToken };
};
const resetPassword = async (
  { latestPassword, previousPassword }: ResetPasswordProps,
  userId: Types.ObjectId
) => {
  const user = await Users.findById(userId).select("+password");

  const isMatch = await bcrypt.compare(
    previousPassword,
    user!.password as string
  );
  if (!isMatch) {
    throw new AppError(
      message("badRequest", "reset password"),
      StatusCodes.BAD_REQUEST
    );
  }
  user!.password = await bcrypt.hash(latestPassword, env.bcrypt_salt_round);
  user!.save();
};

export const authServices = {
  retrieveLatestAccessToken,
  resetPassword,
};
