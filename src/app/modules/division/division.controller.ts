import { Request, Response } from "express";
import safeAsync from "../../utils/safeAsync";
import message from "../../utils/message";
import { StatusCodes } from "http-status-codes";
import resHandler from "../../utils/resHandler";
import { divisionServices } from "./division.service";

const createDivision = safeAsync(async (req: Request, res: Response) => {
  const division = await divisionServices.createDivision(req.body);

  resHandler(res, {
    status: StatusCodes.CREATED,
    message: message("create", "division"),
    success: true,
    data: division,
  });
});
const updateDivision = safeAsync(async (req: Request, res: Response) => {
  const division = await divisionServices.updateDivision(req);
  resHandler(res, {
    status: StatusCodes.OK,
    message: message("update", "division"),
    success: true,
    data: division,
  });
});
const deleteDivision = safeAsync(async (req: Request, res: Response) => {
  await divisionServices.deleteDivision(req);
  resHandler(res, {
    status: StatusCodes.OK,
    success: true,
    message: message("delete", "division"),
  });
});
const retrieveDivisions = safeAsync(async (req: Request, res: Response) => {
  const divisions = await divisionServices.retrieveDivisions(req);
  resHandler(res, {
    status: StatusCodes.OK,
    success: true,
    message: message("get", "divisions"),
    data: divisions,
  });
});
const retrievedDivision = safeAsync(async (req: Request, res: Response) => {
  const division = await divisionServices.retrieveDivision(req);
  resHandler(res, {
    status: StatusCodes.OK,
    success: true,
    message: message("get", "division"),
    data: division,
  });
});
export const divisionControllers = {
  createDivision,
  updateDivision,
  deleteDivision,
  retrieveDivisions,
  retrievedDivision,
};
