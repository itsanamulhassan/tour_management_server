import { StatusCodes } from "http-status-codes";
import { Request } from "express";
import { CreateTourDto } from "./tour.types";
import { Tours } from "./tour.models";
import AppError from "../../utils/helpers/error/appError";
import message from "../../utils/message";

const createTour = async (payload: CreateTourDto) => {
  const { title } = payload;
  const tourType = await Tours.exists({ title });
  if (tourType) {
    throw new AppError(
      message("alreadyExists", "tour"),
      StatusCodes.BAD_REQUEST
    );
  }
  const latestTour = await Tours.create(payload);
  return latestTour;
};
const updateTour = async (req: Request) => {
  const {
    params: { id: tourId },
    body: payload,
  } = req as Request;
  const isTourExist = await Tours.exists({ _id: tourId });
  if (!isTourExist) {
    throw new AppError(message("notFound", "tour"), StatusCodes.NOT_FOUND);
  }
  const isDuplicateExist = await Tours.findOne({
    name: payload.title,
    _id: { $ne: tourId },
  });
  if (isDuplicateExist) {
    throw new AppError(
      message("alreadyExists", "tour"),
      StatusCodes.BAD_REQUEST
    );
  }
  const latestTour = await Tours.findByIdAndUpdate(tourId, payload, {
    runValidators: true,
    new: true,
  });
  return latestTour;
};
const deleteTour = async (req: Request) => {
  const tourId = req.params.id;
  const isTourExist = await Tours.exists({ _id: tourId });
  if (!isTourExist) {
    throw new AppError(message("notFound", "tour"), StatusCodes.NOT_FOUND);
  }

  await Tours.findByIdAndDelete(tourId);
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const retrieveTours = async (_req: Request) => {
  const tourType = await Tours.find({});
  if (!tourType) {
    throw new AppError(message("notFound", "tour"), StatusCodes.NOT_FOUND);
  }
  return tourType;
};
const retrieveTour = async (req: Request) => {
  const tourTypeId = req.params.id;
  const isTourTypeExist = await Tours.findById(tourTypeId);
  if (!isTourTypeExist) {
    throw new AppError(message("notFound", "tour"), StatusCodes.NOT_FOUND);
  }

  return isTourTypeExist;
};
export const tourServices = {
  createTour,
  updateTour,
  retrieveTour,
  deleteTour,
  retrieveTours,
};
