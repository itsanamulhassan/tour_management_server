import { StatusCodes } from "http-status-codes";
import AppError from "../../../utils/helpers/error/appError";
import { TourTypes } from "./tour.type.models";
import { CreateTourTypeProps } from "./tour.type.types";
import message from "../../../utils/message";
import { Request } from "express";

const createTourType = async (payload: CreateTourTypeProps) => {
  const { name } = payload;
  const tourType = await TourTypes.exists({ name });
  if (tourType) {
    throw new AppError(
      message("alreadyExists", "tour type"),
      StatusCodes.BAD_REQUEST
    );
  }
  const latestTourType = await TourTypes.create(payload);
  return latestTourType;
};
const updateTourType = async (req: Request) => {
  const {
    params: { tourTypeId },
    body: payload,
  } = req as Request;
  const isTourTypeExist = await TourTypes.exists({ _id: tourTypeId });
  if (!isTourTypeExist) {
    throw new AppError(message("notFound", "tour type"), StatusCodes.NOT_FOUND);
  }
  const isDuplicateExist = await TourTypes.findOne({
    name: payload.name,
    _id: { $ne: tourTypeId },
  });
  if (isDuplicateExist) {
    throw new AppError(
      message("alreadyExists", "tour type"),
      StatusCodes.BAD_REQUEST
    );
  }
  const latestTourType = await TourTypes.findByIdAndUpdate(
    tourTypeId,
    payload,
    { runValidators: true, new: true }
  );
  return latestTourType;
};
const deleteTourType = async (req: Request) => {
  const { tourTypeId } = req.params;
  const isTourTypeExist = await TourTypes.exists({ _id: tourTypeId });
  if (!isTourTypeExist) {
    throw new AppError(message("notFound", "tour type"), StatusCodes.NOT_FOUND);
  }

  await TourTypes.findByIdAndDelete(tourTypeId);
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const retrieveTourTypes = async (_req: Request) => {
  const tourType = await TourTypes.find({});
  if (!tourType) {
    throw new AppError(message("notFound", "tour type"), StatusCodes.NOT_FOUND);
  }
  return tourType;
};
const retrieveTourType = async (req: Request) => {
  const { tourTypeId } = req.params;
  const isTourTypeExist = await TourTypes.findById(tourTypeId);
  if (!isTourTypeExist) {
    throw new AppError(message("notFound", "tour type"), StatusCodes.NOT_FOUND);
  }

  return isTourTypeExist;
};
export const tourTypeServices = {
  createTourType,
  updateTourType,
  retrieveTourType,
  retrieveTourTypes,
  deleteTourType,
};
