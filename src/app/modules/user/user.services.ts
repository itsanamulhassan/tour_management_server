import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/helpers/error/appError";
import message from "../../utils/message";
import { User, Users } from "./user.models";
import { AuthProviderDto, CreateUserDto } from "./user.types";
import bcryptjs from "bcryptjs";
import env from "../../configurations/env";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { withTransaction } from "../../database/transaction";
import { Guides } from "../guide/guide.model";
import { validateUser } from "./user.helpers/validateUser";

const createUser = async (payload: Partial<CreateUserDto>) => {
  const { email, password, ...rest } = payload as CreateUserDto;

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
const retrieveUser = async (req: Request) => {
  const user = await Users.findById(req.params.id);
  if (!user) {
    throw new AppError(message("notFound", "user"), StatusCodes.NOT_FOUND);
  }

  return user;
};
const deleteUser = async (req: Request) => {
  return withTransaction(async (session) => {
    const userId = req.params.id;
    const user = await Users.findById(userId);
    if (!user) {
      throw new AppError(message("notFound", "user"), StatusCodes.NOT_FOUND);
    }
    const guide = await Guides.findOne({ user: userId });
    if (user.role === "GUIDE" && !guide) {
      throw new AppError(message("notFound", "guide"), StatusCodes.NOT_FOUND);
    }

    if (guide && user.role === "GUIDE") {
      guide.status = "ARCHIVED";
      await guide.save({ session });
    }

    user.isDeleted = true;
    await user.save({ session });
  });
};
const retrieveMe = async (req: Request) => {
  const credential = (req.user as JwtPayload).credentialId;
  const user = await Users.findById(credential);

  return user;
};

const updateUser = async (req: Request) => {
  const {
    params: { id: userId },
    user: { role, credentialId },
    body,
  } = req as Request;

  const user = (await Users.findById(userId)) as User;
  validateUser(user);

  if (role === "ADMIN" && user.role === "SUPERADMIN") {
    throw new AppError(
      message("unauthorized", "user"),
      StatusCodes.BAD_REQUEST
    );
  }

  // USER or GUIDE restrictions
  if (["USER", "GUIDE"].includes(role)) {
    if (userId !== credentialId) {
      throw new AppError(
        message("unauthorized", "user"),
        StatusCodes.BAD_REQUEST
      );
    }
    if (body.role && body.role !== role) {
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
  deleteUser,
  retrieveUser,
};
