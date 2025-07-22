import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import resHandler from "../utils/resHandler";
import resMessage from "../utils/resMessage";

const invalidRoute = (req: Request, res: Response) => {
  resHandler(res, {
    success: false,
    status: StatusCodes.NOT_FOUND,
    message: resMessage("notFound", "route", "--> " + req.path + " <--"),
  });
};

export default invalidRoute;
