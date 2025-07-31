import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userServices from "./user.service";
import safeAsync from "../../utils/safeAsync";
import resHandler from "../../utils/resHandler";
import message from "../../utils/message";

// ✅ Create a new user
const createUser = safeAsync(async (req: Request, res: Response) => {
  const user = await userServices.createUser(req.body);
  resHandler(res, {
    status: StatusCodes.CREATED,
    success: true,
    message: message("create", "user"),
    data: user,
  });
});

const retrieveUsers = safeAsync(async (_req: Request, res: Response) => {
  const users = await userServices.retrieveUsers();
  resHandler(res, {
    status: StatusCodes.OK,
    success: true,
    message: message("get", "user"),
    data: users,
  });
});

const updateUser = safeAsync(async (req: Request, res: Response) => {
  const users = await userServices.updateUser(req);
  resHandler(res, {
    status: StatusCodes.OK,
    success: true,
    message: message("update", "user"),
    data: users,
  });
});

const userControllers = {
  createUser,
  retrieveUsers,
  updateUser,
};

export default userControllers;
