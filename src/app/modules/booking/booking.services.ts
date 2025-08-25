import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/helpers/error/appError";
import { Users } from "../user/user.models";
import { CreateUserProps } from "../user/user.types";
import { Bookings } from "./booking.models";
import { CreateBookingProps } from "./booking.types";
import message from "../../utils/message";

const createBooking = async (payload: CreateBookingProps, userId: string) => {
  const user = (await Users.findById(userId)) as Partial<CreateUserProps>;

  if (!user?.phone) {
    throw new AppError(message("notFound", "phone"), StatusCodes.BAD_REQUEST);
  }
  if (!user?.address) {
    throw new AppError(message("notFound", "address"), StatusCodes.BAD_REQUEST);
  }

  const latest = await Bookings.create(payload);
  return latest;
};
const updateBooking = async (req: Request) => {};
const updateBookingStatus = async (req: Request) => {};
const deleteBooking = async (req: Request) => {};
const retrieveBookings = async (_req: Request) => {};
const retrieveBooking = async (req: Request) => {};
const retrieveBookingMe = async (req: Request) => {};
export const bookingServices = {
  createBooking,
  updateBooking,
  deleteBooking,
  retrieveBookings,
  retrieveBooking,
  retrieveBookingMe,
  updateBookingStatus,
};
