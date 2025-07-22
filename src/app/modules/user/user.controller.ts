import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userServices from "./user.service";
import safeAsync from "../../utils/safeAsync";
import resHandler from "../../utils/resHandler";
import resMessage from "../../utils/resMessage";
import { Users } from "./user.model";
import { AuthProviderProps, CreateUserProps } from "./user.types";
import AppError from "../../errorHelper/appError";

// ✅ Create a new user
const createUser = safeAsync(async (req: Request, res: Response) => {
  const user = await userServices.createUser(req.body);
  resHandler(res, {
    status: StatusCodes.CREATED,
    success: true,
    message: resMessage("user").create,
    data: user,
  });
});

const retrieveUsers = safeAsync(async (_req: Request, res: Response) => {
  const users = await userServices.retrieveUsers();
  resHandler(res, {
    status: StatusCodes.OK,
    success: true,
    message: resMessage("user").create,
    data: users,
  });
});

const userControllers = {
  createUser,
  retrieveUsers,
};

export default userControllers;
