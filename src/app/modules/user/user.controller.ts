import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userServices from "./user.service";

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

const userControllers = {
  createUser,
};

export default userControllers;
