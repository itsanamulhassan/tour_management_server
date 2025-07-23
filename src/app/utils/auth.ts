import { NextFunction, Request, Response } from "express";
import { UserRoleStatusEnumProps } from "../modules/user/user.types";
import safeAsync from "./safeAsync";
import AppError from "../errorHelper/appError";
import message from "./message";
import { jwt } from "./jwt";

const authorizeRole = (...roles: UserRoleStatusEnumProps[]) =>
  safeAsync(async (req: Request, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(message("notFound", "token"), 403);
    }
    const verify = jwt.verifyToken(token);
    if (!verify) {
      throw new AppError(message("expired", "token"), 403);
    }
    if (!roles.includes(verify.role)) {
      throw new AppError(message("unauthorized", "user"), 403);
    }
    next();
  });

export const auth = {
  authorizeRole,
};
