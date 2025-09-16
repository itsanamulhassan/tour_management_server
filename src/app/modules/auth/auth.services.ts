/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Users } from "../user/user.models";
import AppError from "../../utils/helpers/error/appError";
import { StatusCodes } from "http-status-codes";
import message from "../../utils/message";
import bcrypt from "bcryptjs";
import { ResetPasswordProps, SetPasswordProps } from "./auth.types";
import env from "../../configurations/env";
import { Types } from "mongoose";
import { token } from "../../utils/token";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { AuthProviderProps } from "../user/user.types";

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
const changePassword = async (
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

const setPassword = async (req: Request) => {
  const userId = (req.user as JwtPayload).credentialId;
  const payload = req.body as SetPasswordProps;

  const user = await Users.findById(userId).select([
    "password",
    "auths",
    "email",
  ]);

  if (!user) {
    throw new AppError(message("notFound", "user"), StatusCodes.NOT_FOUND);
  }
  if (
    user?.password &&
    user?.auths.some(
      (auth: AuthProviderProps) => auth.provider === "CREDENTIAL"
    )
  ) {
    throw new AppError(
      message("alreadyExists", "password"),
      StatusCodes.BAD_REQUEST
    );
  }
  const updateAuths = [
    ...user!.auths,
    {
      provider: "CREDENTIAL",
      providerId: user?.email,
    },
  ] as AuthProviderProps[];

  const hash = await bcrypt.hash(payload.password, env.bcrypt_salt_round);

  user.password = hash;
  user.auths = updateAuths;

  user.save();
};

export const authServices = {
  retrieveLatestAccessToken,
  resetPassword,
  changePassword,
  setPassword,
};
