/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Users } from "../user/user.models";
import AppError from "../../utils/helpers/error/appError";
import { StatusCodes } from "http-status-codes";
import message from "../../utils/message";
import bcrypt from "bcryptjs";
import { SetPasswordProps } from "./auth.types";
import env from "../../configurations/env";
import { token } from "../../utils/token";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { AuthProviderDto } from "../user/user.types";
import JWT from "jsonwebtoken";
import { CreateAccessRefreshTokenProps } from "../../types/utils.types";
import { validateUser } from "../user/user.helpers/validateUser";
import sendMail from "../../utils/sendEmail";
import { Types } from "mongoose";

const retrieveLatestAccessToken = async (refreshToken: string) => {
  const accessToken = await token.createAccessTokenWithRefreshToken(
    refreshToken
  );
  return { accessToken };
};
const changePassword = async (req: Request) => {
  const userId = (req.user as JwtPayload).credentialId;
  const { previousPassword, latestPassword } = req.body;
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
    user?.auths.some((auth: AuthProviderDto) => auth.provider === "CREDENTIAL")
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
  ] as Types.DocumentArray<AuthProviderDto>;

  const hash = await bcrypt.hash(payload.password, env.bcrypt_salt_round);

  user.password = hash;
  user.auths = updateAuths;

  user.save();
};

const forgetPassword = async (req: Request) => {
  const { email } = req.body;

  const user = await Users.findOne({ email }).select([
    "_id",
    "name",
    "role",
    "email",
    "activityStatus",
    "isDeleted",
    "isVerified",
  ]);
  if (!user) {
    throw new AppError(message("notFound", "user"), StatusCodes.BAD_REQUEST);
  }
  validateUser(user);
  const payload = {
    credentialId: user?._id,
    email,
    role: user!.role,
  } as CreateAccessRefreshTokenProps;

  const token = JWT.sign(payload, env.jwt_access_secret, {
    expiresIn: "10m",
  });
  const link = `${env.frontend_base_url}/forget_password?id=${
    user!._id
  }&token=${token}`;

  sendMail({
    to: user?.email as string,
    template: "resetPassword",
    subject: "Forget Password",
    data: { name: user?.name, link },
  });
};
const resetPassword = async (req: Request) => {
  const credentialId = (req.user as JwtPayload).credentialId;
  const { id, password } = req.body;

  if (id !== credentialId) {
    throw new AppError(message("expired", "token"), StatusCodes.BAD_REQUEST);
  }
  const user = await Users.findById(id);
  if (!user) {
    throw new AppError(message("notFound", "user"), StatusCodes.NOT_FOUND);
  }

  const hash = await bcrypt.hash(password, Number(env.bcrypt_salt_round));
  user.password = hash;
  await user.save();
};

export const authServices = {
  retrieveLatestAccessToken,
  resetPassword,
  changePassword,
  setPassword,
  forgetPassword,
};
