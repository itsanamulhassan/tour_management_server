import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/appError";
import message from "../../utils/message";
import { Divisions } from "./division.models";
import { CreateDivisionProps } from "./division.types";
import { Request } from "express";

const createDivision = async (payload: CreateDivisionProps) => {
  const { name } = payload;
  const division = await Divisions.exists({ name });
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
    body: payload,
  } = req as Request;
  const isDivisionExist = await Divisions.exists({ _id: divisionId });
  if (!isDivisionExist) {
    throw new AppError(message("notFound", "division"), StatusCodes.NOT_FOUND);
  }
  const isDuplicateExist = await Divisions.findOne({
    name: payload.name,
    _id: { $ne: divisionId },
  });
  if (isDuplicateExist) {
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
