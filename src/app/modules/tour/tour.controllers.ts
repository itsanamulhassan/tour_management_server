import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import safeAsync from "../../utils/safeAsync";
import { tourServices } from "./tour.services";
import resHandler from "../../utils/resHandler";
import message from "../../utils/message";

const createTour = safeAsync(async (req: Request, res: Response) => {
  const tour = await tourServices.createTour(req.body);

  resHandler(res, {
    status: StatusCodes.CREATED,
    message: message("create", "tour"),
    success: true,
    data: tour,
  });
});
const updateTour = safeAsync(async (req: Request, res: Response) => {
  const tour = await tourServices.updateTour(req);
  resHandler(res, {
    status: StatusCodes.OK,
    message: message("update", "tour"),
    success: true,
    data: tour,
  });
});
const deleteTour = safeAsync(async (req: Request, res: Response) => {
  await tourServices.deleteTour(req);
  resHandler(res, {
    status: StatusCodes.OK,
    success: true,
    message: message("delete", "tour"),
  });
});
const retrieveTours = safeAsync(async (req: Request, res: Response) => {
  const tours = await tourServices.retrieveTours(req);
  resHandler(res, {
    status: StatusCodes.OK,
    success: true,
    message: message("get", "tours"),
    data: tours,
  });
});
const retrieveTour = safeAsync(async (req: Request, res: Response) => {
  const tour = await tourServices.retrieveTour(req);
  resHandler(res, {
    status: StatusCodes.OK,
    success: true,
    message: message("get", "tour"),
    data: tour,
  });
});
export const tourControllers = {
  createTour,
  updateTour,
  deleteTour,
  retrieveTour,
  retrieveTours,
};
