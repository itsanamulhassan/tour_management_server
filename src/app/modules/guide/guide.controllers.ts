import { Request, Response } from "express";
import safeAsync from "../../utils/safeAsync";
import { guideServices } from "./guide.services";
import resHandler from "../../utils/resHandler";
import { StatusCodes } from "http-status-codes";
import message from "../../utils/message";

const createGuide = safeAsync(async (req: Request, res: Response) => {
  const guide = await guideServices.createGuide(req);
  resHandler(res, {
    status: StatusCodes.CREATED,
    message: message("create", "guide"),
    success: true,
    data: guide,
  });
});

const deleteGuide = safeAsync(async (req: Request, res: Response) => {
  await guideServices.deleteGuide(req);
  resHandler(res, {
    success: true,
    message: message("delete", "guide"),
    status: StatusCodes.OK,
  });
});
const retrieveGuides = safeAsync(async (req: Request, res: Response) => {
  const guides = await guideServices.retrieveGuides();
  resHandler(res, {
    success: true,
    message: message("get", "guides"),
    status: StatusCodes.OK,
    data: guides,
  });
});
const retrieveGuide = safeAsync(async (req: Request, res: Response) => {
  const guide = await guideServices.retrieveGuide(req);
  resHandler(res, {
    success: true,
    message: message("get", "guide"),
    status: StatusCodes.OK,
    data: guide,
  });
});
const updateGuide = safeAsync(async (req: Request, res: Response) => {
  await guideServices.updateGuide(req);
  resHandler(res, {
    success: true,
    message: message("update", "guide"),
    status: StatusCodes.OK,
  });
});
const updateGuideStatus = safeAsync(async (req: Request, res: Response) => {
  await guideServices.updateGuideStatus(req);
  resHandler(res, {
    success: true,
    message: message("update", "guide"),
    status: StatusCodes.OK,
  });
});

export const guideControllers = {
  createGuide,
  deleteGuide,
  retrieveGuides,
  retrieveGuide,
  updateGuide,
  updateGuideStatus,
};
