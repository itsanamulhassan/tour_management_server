import { Request, Response } from "express";
import safeAsync from "../../utils/safeAsync";
import { statisticServices } from "./statistic.services";
import resHandler from "../../utils/resHandler";
import message from "../../utils/message";
import { StatusCodes } from "http-status-codes";

const userStatistics = safeAsync(async (_req: Request, res: Response) => {
  const statistics = await statisticServices.userStatistics();
  resHandler(res, {
    message: message("get", "user statistics"),
    status: StatusCodes.OK,
    success: true,
    data: statistics,
  });
});
const tourStatistics = safeAsync(async (_req: Request, res: Response) => {
  const statistics = await statisticServices.tourStatistics();
  resHandler(res, {
    message: message("get", "tour statistics"),
    status: StatusCodes.OK,
    success: true,
    data: statistics,
  });
});
const bookingStatistics = safeAsync(async (_req: Request, res: Response) => {
  const statistics = await statisticServices.bookingStatistics();
  resHandler(res, {
    message: message("get", "booking statistics"),
    status: StatusCodes.OK,
    success: true,
    data: statistics,
  });
});
const paymentStatistics = safeAsync(async (_req: Request, res: Response) => {
  const statistics = await statisticServices.paymentStatistics();
  resHandler(res, {
    message: message("get", "payments statistics"),
    status: StatusCodes.OK,
    success: true,
    data: statistics,
  });
});

export const statisticControllers = {
  userStatistics,
  bookingStatistics,
  paymentStatistics,
  tourStatistics,
};
