import { NextFunction, Request, Response } from "express";
import { CreateUserProps } from "./user.types";
import { Users } from "./user.model";
import { StatusCodes } from "http-status-codes";

// ✅ Create a new user
export const createUser = async (
  req: Request,
  res: Response,
  nextF: NextFunction
) => {
  try {
    const { email, name } = req.body as CreateUserProps;
    const user = await Users.create({
      name,
      email,
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User created successfully.",
      data: user,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Registration failed",
      error: error.message || error.toString() || error,
    });
  }
};
