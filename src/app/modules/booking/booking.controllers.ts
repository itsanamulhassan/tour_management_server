import { StatusCodes } from "http-status-codes";
import resHandler from "../../utils/resHandler";
import safeAsync from "../../utils/safeAsync";
import { bookingServices } from "./booking.services";
import { Request, Response } from "express";
import message from "../../utils/message";

const createBooking = safeAsync(async (req: Request, res: Response) => {
  const booking = await bookingServices.createBooking(req.body);

  resHandler(res, {
    status: StatusCodes.CREATED,
    message: message("create", "booking"),
    success: true,
    data: booking,
  });
});
const updateBooking = safeAsync(async (req: Request, res: Response) => {
  const booking = await bookingServices.updateBooking(req.body);
  resHandler(res, {
    status: StatusCodes.OK,
    message: message("update", "booking"),
    success: true,
    data: booking,
  });
});
const updateBookingStatus = safeAsync(async (req: Request, res: Response) => {
  const booking = await bookingServices.updateBooking(req.body);
  resHandler(res, {
    status: StatusCodes.OK,
    message: message("update", "booking status"),
    success: true,
    data: booking,
  });
});
const deleteBooking = safeAsync(async (req: Request, res: Response) => {
  await bookingServices.deleteBooking(req.body);
  resHandler(res, {
    status: StatusCodes.OK,
    success: true,
    message: message("delete", "booking"),
  });
});
const retrieveBookings = safeAsync(async (req: Request, res: Response) => {
  const tours = await bookingServices.retrieveBookings(req.body);
  resHandler(res, {
    status: StatusCodes.OK,
    success: true,
    message: message("get", "bookings"),
    data: tours,
  });
});
const retrieveBooking = safeAsync(async (req: Request, res: Response) => {
  const tour = await bookingServices.retrieveBooking(req.body);
  resHandler(res, {
    status: StatusCodes.OK,
    success: true,
    message: message("get", "booking"),
    data: tour,
  });
});
const retrieveBookingMe = safeAsync(async (req: Request, res: Response) => {
  const tour = await bookingServices.retrieveBooking(req.body);
  resHandler(res, {
    status: StatusCodes.OK,
    success: true,
    message: message("get", "booking"),
    data: tour,
  });
});
export const bookingControllers = {
  createBooking,
  updateBooking,
  updateBookingStatus,
  deleteBooking,
  retrieveBooking,
  retrieveBookings,
  retrieveBookingMe,
};
