import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/appError";
import message from "../../utils/message";
import { Users } from "./user.model";
import { AuthProviderProps, CreateUserProps } from "./user.types";
import bcryptjs from "bcryptjs";
import env from "../../configurations/env";
import { Request } from "express";

const createUser = async (payload: Partial<CreateUserProps>) => {
  const { email, password, ...rest } = payload as CreateUserProps;

  if (["ADMIN", "SUPERADMIN"].includes(rest.role)) {
    throw new AppError(
      message("unauthorized", rest.role),
      StatusCodes.FORBIDDEN
    );
  }

  const isUserExist = await Users.findOne({ email });
  if (isUserExist) {
    throw new AppError(
      message("alreadyExists", "user"),
      StatusCodes.BAD_REQUEST
    );
  }

  const hashPassword = await bcryptjs.hash(
    password as string,
    env.bcrypt_salt_round
  );

  const authProvider: AuthProviderProps = {
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

const updateUser = async (req: Request) => {
  const {
    params: { id: userId },
    user: { role },
    body,
  } = req as Request;

  const isUserExist = await Users.findById(userId);
  if (!isUserExist) {
    throw new AppError(message("notFound", "user"), StatusCodes.NOT_FOUND);
  }

  if (["USER", "GUIDE"].includes(role)) {
    if (
      body.role ||
      (role === "ADMIN" && body.role === "SUPERADMIN") ||
      ["INACTIVE", "BLOCKED"].includes(body.activityStatus) ||
      body.isDeleted ||
      !body.isVerified
    ) {
      throw new AppError(message("forbidden", role), StatusCodes.FORBIDDEN);
    }
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

const userServices = {
  createUser,
  retrieveUsers,
  updateUser,
};

export default userServices;
