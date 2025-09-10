import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/helpers/error/appError";
import message from "../../utils/message";
import { Division, DivisionDocument, Divisions } from "./division.models";
import { Request } from "express";
import { deleteCloudinaryFile } from "../../configurations/cloudinary";

const createDivision = async (req: Request) => {
  const payload = {
    ...req.body,
    thumbnail: {
      url: req.file?.path,
      public_id: req.file?.filename,
    },
  } as Division;
  const division = await Divisions.exists({ name: payload?.name });
  if (division) {
    throw new AppError(
      message("alreadyExists", "division"),
      StatusCodes.BAD_REQUEST
    );
  }
  const latestDivision = await Divisions.create(payload);
  return latestDivision;
};
const updateDivision = async (req: Request) => {
  const {
    params: { id: divisionId },
    body,
    file,
  } = req as Request;

  const payload = {
    ...body,
    ...(file?.filename && {
      thumbnail: { public_id: file.filename, url: file.path },
    }),
  } as Division;

  const division = (await Divisions.exists({ _id: divisionId }).select(
    "thumbnail"
  )) as DivisionDocument;

  if (!division) {
    throw new AppError(message("notFound", "division"), StatusCodes.NOT_FOUND);
  }

  const duplicate = await Divisions.findOne({
    name: payload.name,
    _id: { $ne: divisionId },
  });

  if (duplicate) {
    throw new AppError(
      message("alreadyExists", "division"),
      StatusCodes.BAD_REQUEST
    );
  }
  const latestDivision = await Divisions.findByIdAndUpdate(
    divisionId,
    payload,
    { runValidators: true, new: true }
  );

  if (file?.filename && division.thumbnail?.public_id) {
    await deleteCloudinaryFile(division.thumbnail.public_id);
    console.log(division.thumbnail.public_id);
  }

  return latestDivision;
};
const deleteDivision = async (req: Request) => {
  const divisionId = req.params.id;
  const isDivisionExist = await Divisions.exists({ _id: divisionId });
  if (!isDivisionExist) {
    throw new AppError(message("notFound", "division"), StatusCodes.NOT_FOUND);
  }

  await Divisions.findByIdAndDelete(divisionId);
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const retrieveDivisions = async (_req: Request) => {
  const divisions = await Divisions.find({});
  if (!divisions) {
    throw new AppError(message("notFound", "division"), StatusCodes.NOT_FOUND);
  }
  return divisions;
};
const retrieveDivision = async (req: Request) => {
  const divisionId = req.params.id;
  const isDivisionExist = await Divisions.findById(divisionId);
  if (!isDivisionExist) {
    throw new AppError(message("notFound", "division"), StatusCodes.NOT_FOUND);
  }

  return isDivisionExist;
};
export const divisionServices = {
  createDivision,
  updateDivision,
  deleteDivision,
  retrieveDivisions,
  retrieveDivision,
};
