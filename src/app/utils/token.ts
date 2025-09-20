import { Types } from "mongoose";
import { Users } from "../modules/user/user.models";
import {
  CreateUserDto,
  UserActivityStatusEnumDto,
} from "../modules/user/user.types";
import { StatusCodes } from "http-status-codes";
import message, { MessageType } from "./message";
import AppError from "./helpers/error/appError";
import { CreateAccessRefreshTokenProps } from "../types/utils.types";
import { jwt } from "../modules/auth/auth.helpers/jwt";

const createAccessTokenWithRefreshToken = async (refreshToken: string) => {
  const { email } = jwt.verifyRefreshToken(refreshToken);
  const user = (await Users.findOne({ email })) as Partial<
    CreateUserDto & { _id: Types.ObjectId }
  >;
  if (!user) {
    throw new AppError(message("notFound", "user"), StatusCodes.BAD_REQUEST);
  }
  if (
    ["BLOCKED", "INACTIVE"].includes(
      user.activityStatus as UserActivityStatusEnumDto
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
  const accessToken = jwt.signAccessToken(credential);
  return accessToken;
};
const createAccessRefreshToken = (
  payload: CreateAccessRefreshTokenProps
): { accessToken: string; refreshToken: string } => {
  const accessToken = jwt.signAccessToken(payload);
  const refreshToken = jwt.signRefreshToken(payload);
  return { accessToken, refreshToken };
};

export const token = {
  createAccessTokenWithRefreshToken,
  createAccessRefreshToken,
};
