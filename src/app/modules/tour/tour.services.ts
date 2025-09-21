import { StatusCodes } from "http-status-codes";
import { Request } from "express";
import { TourDocument, Tours } from "./tour.models";
import AppError from "../../utils/helpers/error/appError";
import message from "../../utils/message";
import { FileProps } from "../../types/global.types";
import { deleteCloudinaryFile } from "../../configurations/cloudinary";
import { TourTypes } from "./type/tour.type.models";

const createTour = async (req: Request) => {
  const thumbnails = Array.isArray(req.files)
    ? req.files.map((file: Express.Multer.File) => ({
        public_id: file.filename,
        url: file.path,
      }))
    : [];

  const payload = {
    ...req.body,
    thumbnails,
  };

  const { title } = payload;
  const tour = await Tours.exists({ title });
  if (tour) {
    throw new AppError(
      message("alreadyExists", "tour"),
      StatusCodes.BAD_REQUEST
    );
  }
  const tourType = await TourTypes.exists({ _id: payload.tourType });
  if (!tourType) {
    throw new AppError(message("notFound", "tour type"), StatusCodes.NOT_FOUND);
  }
  const latestTour = await Tours.create(payload);
  return latestTour;
};
const updateTour = async (req: Request) => {
  const newThumbnails = Array.isArray(req.files)
    ? req.files.map((file: Express.Multer.File) => ({
        public_id: file.filename,
        url: file.path,
      }))
    : [];

  const tour = (await Tours.findById(req.params.id).select(
    "thumbnails"
  )) as TourDocument;
  if (!tour) {
    throw new AppError(message("notFound", "tour"), StatusCodes.NOT_FOUND);
  }

  // Prevent duplicate name
  const duplicate = await Tours.findOne({
    name: req.body.title,
    _id: { $ne: req.params.id },
  });
  if (duplicate) {
    throw new AppError(
      message("alreadyExists", "tour"),
      StatusCodes.BAD_REQUEST
    );
  }

  let thumbnails = [...tour.thumbnails, ...newThumbnails];

  const selectedThumbnails = req.body.selectedThumbnails?.length
    ? new Set(req.body.selectedThumbnails.map(String))
    : new Set<string>();

  if (selectedThumbnails.size) {
    const results = await Promise.all(
      thumbnails.map(async (thumbnail): Promise<FileProps | undefined> => {
        if (selectedThumbnails.has(thumbnail.public_id)) {
          try {
            await deleteCloudinaryFile(thumbnail.public_id);
          } catch (error) {
            if (error instanceof Error) {
              throw new AppError(
                message("fail", "cloudinary delete", error.message),
                StatusCodes.BAD_REQUEST
              );
            }
          }
          return undefined;
        }
        return thumbnail;
      })
    );

    thumbnails = results.filter(
      (thumbnail): thumbnail is FileProps => thumbnail !== undefined
    );
  }

  const payload = {
    ...req.body,
    thumbnails,
  };

  return Tours.findByIdAndUpdate(req.params.id, payload, {
    runValidators: true,
    new: true,
  });
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
