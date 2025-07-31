import JWT, { JwtPayload, SignOptions } from "jsonwebtoken";
import env from "../configurations/env";
import { Users } from "../modules/user/user.model";
import { Types } from "mongoose";
import {
  CreateUserProps,
  UserActivityStatusEnumProps,
} from "../modules/user/user.types";
import AppError from "../errorHelper/appError";
import message, { MessageType } from "./message";
import { StatusCodes } from "http-status-codes";

const signAccessToken = (payload: JwtPayload): string => {
  return JWT.sign(payload, env.jwt_access_secret, {
    expiresIn: env.jwt_access_expires_in,
  } as SignOptions);
};
const signRefreshToken = (payload: JwtPayload): string => {
  return JWT.sign(payload, env.jwt_refresh_secret, {
    expiresIn: env.jwt_refresh_expires_in,
  } as SignOptions);
};

const createAccessTokenWithRefreshToken = async (refreshToken: string) => {
  const { email } = jwt.verifyRefreshToken(refreshToken);
  const user = (await Users.findOne({ email })) as Partial<
    CreateUserProps & { _id: Types.ObjectId }
  >;
  if (!user) {
    throw new AppError(message("notFound", "user"), StatusCodes.BAD_REQUEST);
  }
  if (
    ["BLOCKED", "INACTIVE"].includes(
      user.activityStatus as UserActivityStatusEnumProps
    )
  ) {
    throw new AppError(
      message(
        user.activityStatus?.toLowerCase() as MessageType,
        "access token"
      ),
      StatusCodes.BAD_REQUEST
    );
  }
  if (user.isDeleted) {
    throw new AppError(message("delete", "user"), StatusCodes.BAD_REQUEST);
  }

  const { _id, role } = user;
  const credential = {
    credentialId: _id,
    email,
    role,
  };
  const accessToken = signAccessToken(credential);
  return accessToken;
};

const verifyAccessToken = (token: string): JwtPayload => {
  return JWT.verify(token, env.jwt_access_secret) as JwtPayload;
};
const verifyRefreshToken = (token: string): JwtPayload => {
  return JWT.verify(token, env.jwt_refresh_secret) as JwtPayload;
};

export const jwt = {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  createAccessTokenWithRefreshToken,
};
