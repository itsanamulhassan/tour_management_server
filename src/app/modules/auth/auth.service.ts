/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CreateUserProps } from "../user/user.types";
import { Users } from "../user/user.model";
import AppError from "../../errorHelper/appError";
import { StatusCodes } from "http-status-codes";
import message from "../../utils/message";
import bcrypt from "bcryptjs";
import { jwt } from "../../utils/jwt";
import { ResetPasswordProps } from "./auth.types";
import env from "../../configurations/env";
import { Types } from "mongoose";
const credentialSignIn = async (payload: Partial<CreateUserProps>) => {
  const { email: inputEmail, password: inputPassword } = payload;

  const user = await Users.findOne({ email: inputEmail }).select("+password");

  if (!user || !user.password) {
    throw new AppError(message("notFound", "user"), StatusCodes.BAD_REQUEST);
  }

  const isMatch = await bcrypt.compare(inputPassword as string, user.password);
  if (!isMatch) {
    throw new AppError(
      message("badRequest", "sign in"),
      StatusCodes.UNAUTHORIZED
    );
  }

  const { _id, email, role } = user.toObject();
  const credential = {
    credentialId: _id,
    email,
    role,
  };
  const accessToken = jwt.signAccessToken(credential);
  const refreshToken = jwt.signRefreshToken(credential);

  return { accessToken, refreshToken, user };
};

const retrieveLatestAccessToken = async (refreshToken: string) => {
  const accessToken = await jwt.createAccessTokenWithRefreshToken(refreshToken);
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
  credentialSignIn,
  retrieveLatestAccessToken,
  resetPassword,
};
