import { NextFunction, Request, Response } from "express";
import safeAsync from "../../utils/safeAsync";
import { statisticServices } from "./statistic.services";
import resHandler from "../../utils/resHandler";
import message from "../../utils/message";
import { StatusCodes } from "http-status-codes";

const userStatistics = safeAsync(async (req: Request, res: Response) => {
  const statistics = await statisticServices.userStatistics();
  resHandler(res, {
    message: message("get", "user statistics"),
    status: StatusCodes.OK,
    success: true,
    data: statistics,
  });
});
const tourStatistics = safeAsync(async (req: Request, res: Response) => {
  const statistics = await statisticServices.tourStatistics(req);
  resHandler(res, {
    message: message("get", "tour statistics"),
    status: StatusCodes.OK,
    success: true,
    data: statistics,
  });
});
const bookingStatistics = safeAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const statistics = await statisticServices.bookingStatistics(req);
    resHandler(res, {
      message: message("get", "booking statistics"),
      status: StatusCodes.OK,
      success: true,
      data: statistics,
    });
  }
);
const paymentStatistics = safeAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const statistics = await statisticServices.paymentStatistics(req);
    resHandler(res, {
      message: message("get", "payments statistics"),
      status: StatusCodes.OK,
      success: true,
      data: statistics,
    });
  }
);

export const statisticControllers = {
  userStatistics,
  bookingStatistics,
  paymentStatistics,
  tourStatistics,
};
