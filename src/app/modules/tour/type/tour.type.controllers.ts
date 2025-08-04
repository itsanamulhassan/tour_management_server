import { Request, Response } from "express";
import message from "../../../utils/message";
import resHandler from "../../../utils/resHandler";
import safeAsync from "../../../utils/safeAsync";
import { tourTypeServices } from "./tour.type.services";
import { StatusCodes } from "http-status-codes";

const createTourType = safeAsync(async (req: Request, res: Response) => {
  const division = await tourTypeServices.createTourType(req.body);

  resHandler(res, {
    status: StatusCodes.CREATED,
    message: message("create", "tour type"),
    success: true,
    data: division,
  });
});
const updateTourType = safeAsync(async (req: Request, res: Response) => {
  const division = await tourTypeServices.updateTourType(req);
  resHandler(res, {
    status: StatusCodes.OK,
    message: message("update", "tour type"),
    success: true,
    data: division,
  });
});
const deleteTourType = safeAsync(async (req: Request, res: Response) => {
  await tourTypeServices.deleteTourType(req);
  resHandler(res, {
    status: StatusCodes.OK,
    success: true,
    message: message("delete", "tour type"),
  });
});
const retrieveTourTypes = safeAsync(async (req: Request, res: Response) => {
  const divisions = await tourTypeServices.retrieveTourTypes(req);
  resHandler(res, {
    status: StatusCodes.OK,
    success: true,
    message: message("get", "tour types"),
    data: divisions,
  });
});
const retrieveTourType = safeAsync(async (req: Request, res: Response) => {
  const division = await tourTypeServices.retrieveTourType(req);
  resHandler(res, {
    status: StatusCodes.OK,
    success: true,
    message: message("get", "tour type"),
    data: division,
  });
});
export const tourTypeControllers = {
  createTourType,
  updateTourType,
  deleteTourType,
  retrieveTourType,
  retrieveTourTypes,
};
