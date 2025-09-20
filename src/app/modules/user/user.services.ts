import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/helpers/error/appError";
import message from "../../utils/message";
import { Users } from "./user.models";
import { AuthProviderDto, CreateUserDto } from "./user.types";
import bcryptjs from "bcryptjs";
import env from "../../configurations/env";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

const createUser = async (payload: Partial<CreateUserDto>) => {
  const { email, password, ...rest } = payload as CreateUserDto;

  if (["ADMIN", "SUPERADMIN"].includes(rest.role)) {
    throw new AppError(
      message("unauthorized", rest.role),
      StatusCodes.FORBIDDEN
    );
  }

  const user = await Users.findOne({ email });
  if (user) {
    throw new AppError(
      message("alreadyExists", "user"),
      StatusCodes.BAD_REQUEST
    );
  }

  const hashPassword = await bcryptjs.hash(
    password as string,
    env.bcrypt_salt_round
  );

  const authProvider: AuthProviderDto = {
    provider: "CREDENTIAL",
    providerId: email,
  };
  return await Users.create({
    email,
    ...rest,
    auths: [authProvider],
    password: hashPassword,
  });
};

const retrieveUsers = async () => {
  const users = await Users.find();

  return users;
};
const retrieveMe = async (req: Request) => {
  const credential = (req.user as JwtPayload).credentialId;
  const user = await Users.findById(credential);

  return user;
};

const updateUser = async (req: Request) => {
  const {
    params: { id: userId },
    user: { role },
    body,
  } = req as Request & { user: { role: string } };

  const user = await Users.findById(userId);
  if (!user) {
    throw new AppError(message("notFound", "user"), StatusCodes.NOT_FOUND);
  }

  // USER or GUIDE restrictions
  if (["USER", "GUIDE"].includes(role)) {
    const forbidden =
      (body.role && body.role !== role) ||
      ["INACTIVE", "BLOCKED"].includes(body.activityStatus) ||
      body.isDeleted === true ||
      body.isVerified === false;

    if (forbidden) {
      throw new AppError(message("forbidden", role), StatusCodes.FORBIDDEN);
    }
  }

  // ADMIN restrictions
  if (role === "ADMIN" && body.role === "SUPERADMIN") {
    throw new AppError(
      message("forbidden", "ADMIN (cannot assign SUPERADMIN)"),
      StatusCodes.FORBIDDEN
    );
  }
  if (body.password) {
    body.password = await bcryptjs.hash(body.password, env.bcrypt_salt_round);
  }
  const updateUser = await Users.findByIdAndUpdate(userId, body, {
    new: true,
    runValidators: true,
  });
  return updateUser;
};

export const userServices = {
  createUser,
  retrieveUsers,
  updateUser,
  retrieveMe,
};
