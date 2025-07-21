import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userServices from "./user.service";
import safeAsync from "../../utils/safeAsync";
import resHandler from "../../utils/resHandler";
import { Users } from "./user.model";

// ✅ Create a new user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userServices.createUser(req.body);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User created successfully.",
      data: user,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
};

const retrieveUsers = safeAsync(async (_req: Request, res: Response) => {
  const users = await userServices.retrieveUsers();
  const totalUsers = await Users.countDocuments();
  resHandler(res, {
    status: StatusCodes.OK,
    success: true,
    message: "Users has been retrieved successfully",
    data: users,
    meta: {
      total: totalUsers,
    },
  });
});

const userControllers = {
  createUser,
  retrieveUsers,
};

export default userControllers;
