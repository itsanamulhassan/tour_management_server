import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const invalidRoute = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "/" + req.path + "/" + " not found",
  });
};

export default invalidRoute;
