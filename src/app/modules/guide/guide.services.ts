import { Request } from "express";
import { CreateGuideDto, UpdateGuideDto } from "./guide.types";
import { Guides } from "./guide.model";
import { Users } from "../user/user.models";
import AppError from "../../utils/helpers/error/appError";
import message from "../../utils/message";
import { StatusCodes } from "http-status-codes";
import { withTransaction } from "../../database/transaction";
import { deleteCloudinaryFile } from "../../configurations/cloudinary";
import { FileProps } from "../../types/global.types";

const createGuide = async (req: Request) => {
  const data = req.body as CreateGuideDto;
  const nid = req.file;
  const payload = {
    ...data,
    nid: {
      public_id: nid?.filename,
      url: nid?.path,
    },
  };
  const user = await Users.findById(payload.user).select("role");
  if (!user) {
    throw new AppError(message("notFound", "user"), StatusCodes.NOT_FOUND);
  }
  if (user.role !== "USER") {
    throw new AppError(message("forbidden", "user"), StatusCodes.FORBIDDEN);
  }
  const guide = await Guides.findOne({ user: payload.user });
  if (guide) {
    throw new AppError(
      message("alreadyExists", "guide"),
      StatusCodes.BAD_REQUEST
    );
  }
  const latestGuide = await Guides.create(payload);

  return latestGuide;
};

const deleteGuide = async (req: Request) => {
  return withTransaction(async (session) => {
    const guideId = req.params.id;

    const guide = await Guides.findById(guideId);
    if (!guide) {
      throw new AppError(message("notFound", "guide"), StatusCodes.BAD_REQUEST);
    }

    await Users.findByIdAndUpdate(
      {
        _id: guide.user,
      },
      { isDeleted: true },
      { runValidators: true, session }
    );

    await Guides.findByIdAndUpdate(
      { _id: guideId },
      {
        status: "ARCHIVED",
      },
      { runValidators: true, session }
    );
  });
};
const updateGuide = async (req: Request) => {
  const nid = {
    public_id: (req.file as Express.Multer.File)?.filename,
    url: req.file?.path,
  };
  const guideId = req.params.id;
  const payload = nid ? { ...req.body, nid } : req.body;

  const guide = await Guides.findById(guideId);

  if (!guide) {
    throw new AppError(message("notFound", "guide"), StatusCodes.NOT_FOUND);
  }
  const latestGuide = await Guides.findByIdAndUpdate(guideId, payload, {
    runValidators: true,
    new: true,
  });
  if (nid && guide.nid) {
    await deleteCloudinaryFile((guide.nid as FileProps).public_id);
  }
  return latestGuide;
};
const updateGuideStatus = async (req: Request) => {
  return withTransaction(async (session) => {
    const guideId = req.params.id;
    const payload = req.body as UpdateGuideDto;

    const guide = await Guides.findById(guideId).session(session);
    if (!guide) {
      throw new AppError(message("notFound", "guide"), StatusCodes.NOT_FOUND);
    }

    const user = await Users.findById(guide.user).session(session);
    if (!user) {
      throw new AppError(message("notFound", "user"), StatusCodes.NOT_FOUND);
    }
    if (user.role !== "USER") {
      throw new AppError(message("forbidden", "user"), StatusCodes.FORBIDDEN);
    }
    guide.status = payload.status;
    if (payload.status === "APPROVED") {
      user.role = "GUIDE";
    }

    await guide.save({ session });
    await user.save({ session });
  });
};

const retrieveGuides = async () => {
  const guides = await Guides.find();
  return guides;
};
const retrieveGuide = async (req: Request) => {
  const guideId = req.params.id;

  const guide = await Guides.findById(guideId);
  if (!guide) {
    throw new AppError(message("notFound", "guide"), StatusCodes.NOT_FOUND);
  }

  return guide;
};
export const guideServices = {
  createGuide,
  deleteGuide,
  updateGuide,
  updateGuideStatus,
  retrieveGuides,
  retrieveGuide,
};
