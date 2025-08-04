import { NextFunction, Request, Response } from "express";
import {
  UserActivityStatusEnumProps,
  UserRoleStatusEnumProps,
} from "../modules/user/user.types";
import safeAsync from "./safeAsync";
import AppError from "../errorHelper/appError";
import message, { MessageType } from "./message";
import { jwt } from "./jwt";
import { Users } from "../modules/user/user.models";
import { StatusCodes } from "http-status-codes";

const authorizeRole = (...roles: UserRoleStatusEnumProps[]) =>
  safeAsync(async (req: Request, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(message("notFound", "token"), 403);
    }
    const verify = jwt.verifyAccessToken(token);
    if (!verify) {
      throw new AppError(message("expired", "token"), 403);
    }
    if (!roles.includes(verify.role)) {
      throw new AppError(message("unauthorized", "user"), 403);
    }

    const user = await Users.findOne({ email: verify?.email });
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
    req.user = verify;
    next();
  });

export const auth = {
  authorizeRole,
};
