import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/helpers/error/appError";
import { Users } from "../user/user.models";
import { CreateUserProps } from "../user/user.types";
import { Bookings } from "./booking.models";
import { CreateBookingProps } from "./booking.types";
import message from "../../utils/message";
import { Tours } from "../tour/tour.models";
import { CreateTourProps } from "../tour/tour.types";
import { Payments } from "../payment/payment.models";
import { transactionIdGenerator } from "../payment/payment.helpers/transactionIdGenerator";

const createBooking = async (payload: CreateBookingProps) => {
  const user = (await Users.findById(payload.user)) as Partial<CreateUserProps>;

  if (!user?.phone) {
    throw new AppError(message("notFound", "phone"), StatusCodes.NOT_FOUND);
  }
  if (!user?.address) {
    throw new AppError(message("notFound", "address"), StatusCodes.NOT_FOUND);
  }

  const tour = (await Tours.findById(payload.tour).select(
    "costFrom"
  )) as Partial<CreateTourProps>;

  if (!tour?.costFrom) {
    throw new AppError(message("notFound", "tour cost"), StatusCodes.NOT_FOUND);
  }

  const bookingAmount = Number(tour.costFrom) * payload.guestCount;

  const latestBooking = await Bookings.create(payload);
  const latestPayment = await Payments.create({
    booking: latestBooking._id,
    amount: bookingAmount,
    transactionId: transactionIdGenerator(),
  });
  const updateBooking = await Bookings.findByIdAndUpdate(
    latestBooking._id,
    { payment: latestPayment._id },
    { new: true, runValidators: true }
  )
    .populate("user", ["name", "email", "phone", "address"])
    .populate("tour", ["title", "costFrom"])
    .populate("payment");
  return updateBooking;
};
const updateBooking = async (req: Request) => {
  console.log("");
};
const updateBookingStatus = async (req: Request) => {
  console.log("");
};
const deleteBooking = async (req: Request) => {
  console.log("");
};
const retrieveBookings = async (_req: Request) => {
  console.log("");
};
const retrieveBooking = async (req: Request) => {
  console.log("");
};
const retrieveBookingMe = async (req: Request) => {
  console.log("");
};
export const bookingServices = {
  createBooking,
  updateBooking,
  deleteBooking,
  retrieveBookings,
  retrieveBooking,
  retrieveBookingMe,
  updateBookingStatus,
};
